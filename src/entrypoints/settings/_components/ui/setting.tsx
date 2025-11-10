import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface Props {
  title: string;
  description?: string;
  checked?: boolean;
  onChange?: (status: boolean) => void;
}

export function Setting({ title, description, checked, onChange }: Props) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
          </div>
          <div>
            <Switch checked={checked} onCheckedChange={onChange} className="scale-150" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
