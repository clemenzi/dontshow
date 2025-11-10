import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/hooks/i18n";
import { SettingsIcon } from "lucide-react";

export default function Disabled() {
  const { t } = useTranslation("popup");
  const currentTab = useCurrentTab();

  return (
    <div className="h-[300px] w-[250px] overflow-hidden">
      <Card className="flex h-[50px] w-full items-center justify-center rounded-none border-x-0 border-t-0">
        <h1 className="text-center text-lg font-semibold">
          {currentTab?.title
            ? currentTab.title.substring(0, 20) + (currentTab.title.length > 20 ? "..." : "")
            : t("disabled")}
        </h1>
      </Card>
      <div className="absolute top-14 right-1 rounded-md bg-amber-300 px-2 py-0.5 text-amber-900">
        <p className="mr-0.5 text-sm font-semibold">{t("notAvailable")}</p>
      </div>
      <div className="flex h-[calc(100vh-50px)] w-full flex-col items-center justify-center gap-4">
        <Switch className="scale-[400%]" disabled />
      </div>
      <div>
        <Button
          className="absolute right-2 bottom-2"
          variant="ghost"
          size="icon"
          onClick={() => browser.runtime.openOptionsPage()}
        >
          <SettingsIcon />
        </Button>
      </div>
    </div>
  );
}
