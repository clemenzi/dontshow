import { defaultSettings } from "@/const";
import { log } from "@/lib/log";
import { Filter, Settings } from "@/types";
import { updateDynamicFilters } from "./dynamic";

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(async e => {
    if (e.reason === "install" || e.reason === "update") {
      const isEnabled = (await storage.getItem("local:enabled")) ?? true;
      storage.setItem("local:enabled", isEnabled);

      const settings = (await storage.getItem<Settings>("local:settings")) || defaultSettings;
      storage.setItem("local:settings", settings);
    }

    if (e.reason === "update") {
      const settings = await storage.getItem<Settings>(`local:settings`);

      if (!settings) {
        storage.setItem(`local:settings`, defaultSettings);
        return;
      }

      const updatedSettings = Object.fromEntries(
        // @ts-ignore
        Object.entries(defaultSettings).map(([key, value]) => [key, settings?.[key] ?? value])
      );

      storage.setItem(`local:settings`, updatedSettings);

      // Migrate filters from v0 to v1
      const filters = (await storage.getItem<Filter[]>("local:filters")) || [];
      const updatedFilters = filters.map(filter => ({
        ...filter,
        enabled: filter.enabled ?? true,
        automatic: filter.automatic ?? false,
      }));

      storage.setItem("local:filters", updatedFilters);
    }
  });

  browser.runtime.onStartup.addListener(async () => {
    const settings = (await storage.getItem<Settings>("local:settings")) || defaultSettings;
    console.log("Current settings:", settings);

    if (settings.dynamicFiltersIp) updateDynamicFilters.ip();
  });

  browser.contextMenus.create({
    id: "filter-menu",
    title: "Add to word filters",
    contexts: ["selection"],
  });

  browser.contextMenus.create({
    id: "add-to-global-filters",
    title: "All websites",
    contexts: ["selection"],
    parentId: "filter-menu",
  });

  browser.contextMenus.create({
    id: "add-to-filters",
    title: "Only this website",
    contexts: ["selection"],
    parentId: "filter-menu",
  });

  browser.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "add-to-global-filters" || info.menuItemId === "add-to-filters") {
      const filters = (await storage.getItem<Filter[]>("local:filters")) || [];
      const newFilter = info.selectionText?.trim();

      if (newFilter && !filters.some(filter => filter.expression === newFilter)) {
        filters.push({
          expression: newFilter,
          type: "censor",
          domain: info.menuItemId === "add-to-global-filters" ? "*" : tab?.url || "*",
          enabled: true,
          automatic: false,
        });
        storage.setItem("local:filters", filters);
        log.info(`Added filter: ${newFilter}`);
      } else {
        log.warn(`Filter already exists or is empty: ${newFilter}`);
      }
    }
  });

  browser.runtime.onMessage.addListener(async (message, sender) => {
    if (message.type === "itemsProcessed") {
      const { count } = message;

      browser.action.setBadgeText({
        text: count > 0 ? count.toString() : "",
        tabId: sender.tab?.id || -1,
      });
    } else if (message.type === "dynamicFilters:ip") {
      if (!message.enable) {
        const filters = (await storage.getItem<Filter[]>("local:filters")) || [];
        const updatedFilters = filters.filter(
          filter =>
            !filter.automatic && !filter.expression.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)
        );

        storage.setItem("local:filters", updatedFilters);
      }

      updateDynamicFilters.ip();
    }
  });
});
