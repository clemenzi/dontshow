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
import { Element as ExposingElement } from "@/types";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

interface ElementsTableProps {
  elements: ExposingElement[];
  onElementHover: (element: HTMLElement | null) => void;
  onElementRemove: (index: number, element: ExposingElement) => void;
}

export function ElementsTable({ elements, onElementHover, onElementRemove }: ElementsTableProps) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpanded = (i: number) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));

  if (elements.length === 0) return null;

  const middleEllipsis = (text: string, max = 60) => {
    if (!text) return "";
    if (text.length <= max) return text;
    const keep = Math.max(1, Math.floor((max - 3) / 2));
    return `${text.slice(0, keep)}...${text.slice(text.length - keep)}`;
  };

  return (
    <Card className="mb-3">
      <CardContent className="flex flex-col space-y-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-24">#</TableHead>
              <TableHead className="min-w-24">Selector</TableHead>
              <TableHead className="min-w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elements.map((element, index) => (
              <TableRow
                key={index}
                onMouseOver={() =>
                  onElementHover(document.querySelector(element.selector) as HTMLElement)
                }
                onMouseOut={() => onElementHover(null)}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <button
                    type="button"
                    className="w-full cursor-pointer text-left font-mono break-all underline-offset-2 hover:underline"
                    title={element.selector}
                    onClick={() => toggleExpanded(index)}
                  >
                    {expanded[index] ? element.selector : middleEllipsis(element.selector, 30)}
                  </button>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" onClick={() => onElementRemove(index, element)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
