import { log } from "@/lib/log";
import { Filter } from "@/types";

export const updateDynamicFilters = {
  ip: async () => {
    const data = await fetch("https://ipinfo.io/json").then(res => res.json());

    if (!data.ip) return;

    const filters = (await storage.getItem<Filter[]>("local:filters")) || [];

    if (filters.some(filter => filter.expression === data.ip)) return;

    const newFilter: Filter = {
      expression: data.ip,
      domain: "*",
      type: "censor",
      automatic: true,
      enabled: true,
    };

    filters.push(newFilter);
    await storage.setItem("local:filters", filters);

    log.info(`Added dynamic filter for IP: ${data.ip}`);
  },
};
