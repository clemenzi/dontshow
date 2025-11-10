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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Element } from "@/types";
import { TrashIcon } from "lucide-react";

export default function Elements() {
  const { t } = useTranslation("settings.elements");
  const [elements, setElements] = useStorage<Element[]>("local:elements", []);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (content.trim() !== "") return;

    setContent(elements.map(el => `${el.website} {${el.selector}}`).join("\n"));
  }, [elements]);

  const handleDelete = (index: number) => {
    const updatedElements = elements.filter((_, i) => i !== index);

    setElements(updatedElements);
  };

  const handleSave = () => {
    const newElements = content
      .split("\n")
      .filter(line => line.trim() !== "")
      .map(line => {
        const [website, selector] = line.split("{");
        return {
          website: website.trim(),
          selector: selector.replace("}", "").trim(),
          action: "censor" as const,
        };
      });

    setElements(newElements);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">{t("title")}</h2>
        <p className="text-muted-foreground max-w-2xl text-base">{t("description")}</p>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="w-full">
          <TabsTrigger value="list">{t("tabs.list")}</TabsTrigger>
          <TabsTrigger value="raw">{t("tabs.raw")}</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("list.website")}</TableHead>
                <TableHead>{t("list.selector")}</TableHead>
                <TableHead>{t("list.action")}</TableHead>
                <TableHead className="text-right">{t("list.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {elements.map((el, i) => (
                <TableRow>
                  <TableCell>{el.website}</TableCell>
                  <TableCell>{el.selector}</TableCell>
                  <TableCell>{el.action}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="destructive" onClick={() => handleDelete(i)}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="raw">
          <Textarea value={content} onChange={e => setContent(e.target.value)} />
          <Button className="mt-2 w-full" onClick={handleSave}>
            {t("raw.save")}
          </Button>
          <Card className="mt-4">
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {t("raw.help.pattern")} <code>{"website{selector}"}</code>
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
