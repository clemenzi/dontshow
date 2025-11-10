import { Element as ExposingElement } from "@/types";
import { TrashIcon } from "lucide-react";

interface ElementOverlayProps {
  element: ExposingElement;
  index: number;
  hoveredElement: HTMLElement | null;
  onElementHover: (element: HTMLElement | null) => void;
  onElementRemove: (index: number, element: ExposingElement) => void;
}

export function ElementOverlay({
  element,
  index,
  hoveredElement,
  onElementHover,
  onElementRemove,
}: ElementOverlayProps) {
  const domElement = document.querySelector(element.selector) as HTMLElement;

  if (!domElement) {
    console.warn(`Element with selector "${element.selector}" not found.`);
    return null;
  }

  if (domElement.textContent?.trim() === "") return null;

  return (
    <div
      className="absolute cursor-pointer border-2 border-red-500"
      onMouseOver={() => onElementHover(domElement)}
      onMouseOut={() => onElementHover(null)}
      style={{
        top: domElement.getBoundingClientRect().top + window.scrollY,
        left: domElement.getBoundingClientRect().left + window.scrollX,
        width: domElement.getBoundingClientRect().width,
        height: domElement.getBoundingClientRect().height,
      }}
    >
      {hoveredElement === domElement && (
        <button
          className="flex h-full w-full items-center justify-center bg-red-400 text-center"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onElementRemove(index, element);
          }}
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
