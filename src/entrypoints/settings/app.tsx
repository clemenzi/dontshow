import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import About from "./_components/sections/about";
import Elements from "./_components/sections/elements";
import Filters from "./_components/sections/filters";
import Settings from "./_components/sections/settings";

function App() {
  const { t } = useTranslation("settings.tabs");

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Tabs defaultValue="settings">
        <TabsList className="w-full">
          <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
          <TabsTrigger value="filters">{t("filters")}</TabsTrigger>
          <TabsTrigger value="elements">{t("elements")}</TabsTrigger>
          <TabsTrigger value="about">{t("about")}</TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
        <TabsContent value="filters">
          <Filters />
        </TabsContent>
        <TabsContent value="elements">
          <Elements />
        </TabsContent>
        <TabsContent value="about">
          <About />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
