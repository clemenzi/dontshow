import { Button } from "@/components/ui/button";
import { TrashIcon, XIcon } from "lucide-react";
import React from "react";

interface ControlButtonsProps {
  elements: any[];
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteAll: () => void;
}

export function ControlButtons({ elements, onClose, onDeleteAll }: ControlButtonsProps) {
  const { t } = useTranslation("elementSelection");

  return (
    <div className="flex items-center">
      <Button variant="outline" onClick={onClose}>
        <XIcon className="h-4 w-4" />
      </Button>
      {elements.length > 0 && (
        <Button variant="destructive" className="ml-2" onClick={onDeleteAll}>
          <TrashIcon className="h-4 w-4" />
          {t("deleteAll")}
        </Button>
      )}
    </div>
  );
}
