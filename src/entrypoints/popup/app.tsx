import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useCurrentTab } from "@/hooks/browser";
import { useStorage } from "@/hooks/storage";
import { MousePointerClick, RefreshCwIcon, SettingsIcon } from "lucide-react";
import Disabled from "./_components/disabled";

function App() {
  const { t } = useTranslation("popup");
  const currentTab = useCurrentTab();
  const [askToReload, setAskToReload] = useState<boolean>(false);
  const [disabledWebsites, setDisabledWebsites] = useStorage<string[]>(
    "local:disabledWebsites",
    []
  );

  const handleDisableWebsite = (checked: boolean) => {
    if (!currentTab || !currentTab.url) return;

    const hostname = new URL(currentTab.url!).hostname;

    if (checked) {
      setDisabledWebsites(disabledWebsites.filter((site: string) => site !== hostname));
    } else {
      setDisabledWebsites([...disabledWebsites, hostname]);
    }

    setAskToReload(true);
  };

  if (
    !currentTab ||
    !currentTab.url ||
    currentTab.url.startsWith("about:") ||
    currentTab.url.startsWith("chrome://") ||
    currentTab.url.startsWith("chrome-extension://") ||
    currentTab.url.startsWith("file://") ||
    currentTab.url.startsWith("moz-extension://")
  ) {
    return <Disabled />;
  }

  return (
    <div className="h-[300px] w-[250px] overflow-hidden">
      <Card className="flex h-[50px] w-full items-center justify-center rounded-none border-x-0 border-t-0">
        <h1 className="text-center text-lg font-semibold">{new URL(currentTab.url).hostname}</h1>
      </Card>
      {askToReload && (
        <Button
          size={"sm"}
          className="absolute top-14 right-1 text-xs"
          onClick={async () => {
            await browser.tabs.reload(currentTab.id!);
            setAskToReload(false);
          }}
        >
          <RefreshCwIcon className="inline h-4 w-4" />
          {t("reload")}
        </Button>
      )}
      <div className="flex h-[calc(100vh-50px)] w-full flex-col items-center justify-center gap-4">
        <Switch
          className="scale-[400%]"
          checked={!disabledWebsites.includes(new URL(currentTab.url!).hostname)}
          onCheckedChange={handleDisableWebsite}
        />
      </div>
      <div className="absolute bottom-0 flex w-full justify-end p-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={async () =>
            await browser.tabs
              .sendMessage(currentTab.id!, "exposing-element-selection")
              .then(() => window.close())
          }
        >
          <MousePointerClick />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => browser.runtime.openOptionsPage()}>
          <SettingsIcon />
        </Button>
      </div>
    </div>
  );
}

export default App;
