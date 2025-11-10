import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Settings } from "@/types";
import { Trash2Icon } from "lucide-react";
import { Setting } from "../ui/setting";

export default function SettingsComponent() {
  const { t } = useTranslation("settings.settings");
  const [enable, setEnable] = useStorage<boolean>("local:enabled", true);
  const [settings, setSettings] = useStorage<Settings>("local:settings", {});
  const [disabledWebsites, setDisabledWebsites] = useStorage<string[]>(
    "local:disabledWebsites",
    []
  );

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="text-muted-foreground text-base">{t("description")}</p>

      <div>
        <Setting
          title={t("enableExtension.title")}
          description={t("enableExtension.description")}
          checked={enable}
          onChange={value => setEnable(value)}
        />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">{t("general.title")}</h2>
      <div className="mt-4 flex flex-col gap-2">
        <Setting
          title={t("general.sensitiveAlert.title")}
          description={t("general.sensitiveAlert.description")}
          checked={settings.sensitiveAlert}
          onChange={value => setSettings({ ...settings, sensitiveAlert: value })}
        />
        <Setting
          title={t("general.inputCensoring.title")}
          description={t("general.inputCensoring.description")}
          checked={settings.inputCensoring}
          onChange={value => setSettings({ ...settings, inputCensoring: value })}
        />
        <Setting
          title={t("general.uncensorOnFocus.title")}
          description={t("general.uncensorOnFocus.description")}
          checked={settings.uncensorOnFocus}
          onChange={value => setSettings({ ...settings, uncensorOnFocus: value })}
        />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">{t("dynamicFilters.title")}</h2>
      <div className="mt-4 flex flex-col gap-2">
        <Setting
          title={t("dynamicFilters.ip.title")}
          description={t("dynamicFilters.ip.description")}
          checked={settings.dynamicFiltersIp}
          onChange={value => {
            setSettings({ ...settings, dynamicFiltersIp: value });

            browser.runtime.sendMessage({ type: `dynamicFilters:ip`, enable: value });
          }}
        />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">{t("websites.title")}</h2>
      <div className="mt-4 flex flex-col gap-2">
        <Setting
          title={t("websites.enableOnLocalhost.title")}
          description={t("websites.enableOnLocalhost.description")}
          checked={settings.enableOnLocalhost}
          onChange={value => setSettings({ ...settings, enableOnLocalhost: value })}
        />
        {disabledWebsites.length > 0 && (
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">{t("websites.disabledWebsites.title")}</h3>
              <p className="text-muted-foreground text-base">
                {t("websites.disabledWebsites.description")}
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("websites.disabledWebsites.table.website")}</TableHead>
                    <TableHead>{t("websites.disabledWebsites.table.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disabledWebsites.map(website => (
                    <TableRow key={website}>
                      <TableCell>{website}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            setDisabledWebsites(disabledWebsites.filter(w => w !== website))
                          }
                          variant="destructive"
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      <h2 className="mt-6 text-2xl font-semibold">{t("developer.title")}</h2>
      <div className="mt-4 flex flex-col gap-2">
        <Setting
          title={t("developer.debugMessages.title")}
          description={t("developer.debugMessages.description")}
          checked={settings.debugMessages}
          onChange={value => setSettings({ ...settings, debugMessages: value })}
        />
      </div>
    </div>
  );
}
