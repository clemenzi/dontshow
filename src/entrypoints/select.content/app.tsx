import { useSiteElements } from "@/hooks/elements";
import { Element as ExposingElement } from "@/types";
import { getCssSelector } from "css-selector-generator";
import React, { useEffect, useState } from "react";
import { ControlButtons } from "./_components/control-buttons";
import { ElementOverlay } from "./_components/element-overlay";
import { ElementsTable } from "./_components/elements-table";
import { HighlightOverlay } from "./_components/highlight-overlay";

interface Props {
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function App({ onClose }: Props) {
  const { elements, add, removeAt, clear } = useSiteElements();
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [isHoverUI, setIsHoverUI] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);

  const handleElementHover = (element: HTMLElement | null) => {
    setHighlightedElement(element);
  };

  const handleElementRemove = (index: number, _element: ExposingElement) => removeAt(index);

  const handleDeleteAll = () => clear();

  const handleClose: React.MouseEventHandler<HTMLButtonElement> = event => {
    setIsHoverUI(true);
    setHoveredElement(null);
    onClose?.(event);
  };

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      if (isHoverUI) return;
      const target = event.target as HTMLElement;

      if (target.textContent?.trim() === "") return;
      setHoveredElement(target);
    };

    const handleMouseOut = (event: MouseEvent) => {
      if (isHoverUI) return;
      setHoveredElement(null);
    };

    const handleClick = async (event: MouseEvent) => {
      if (isHoverUI) return;

      event.preventDefault();
      event.stopPropagation();

      const target = event.target as HTMLElement;
      const selector = getCssSelector(target);

      await add({ selector, action: "censor" });
      setHoveredElement(null);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("click", handleClick);
    };
  }, [elements, isHoverUI, add]);

  return (
    <>
      <div
        className="fixed bottom-0 left-0 z-[99999] p-4"
        onMouseOver={() => {
          setHoveredElement(null);
          setIsHoverUI(true);
        }}
        onMouseOut={() => setIsHoverUI(false)}
      >
        <ElementsTable
          elements={elements}
          onElementHover={handleElementHover}
          onElementRemove={handleElementRemove}
        />
        <ControlButtons elements={elements} onClose={handleClose} onDeleteAll={handleDeleteAll} />
      </div>

      {elements.map((element, index) => (
        <ElementOverlay
          key={index}
          element={element}
          index={index}
          hoveredElement={hoveredElement}
          onElementHover={setHoveredElement}
          onElementRemove={(idx, _elem) => removeAt(idx)}
        />
      ))}

      {hoveredElement && <HighlightOverlay element={hoveredElement} color="red" />}
      {highlightedElement && <HighlightOverlay element={highlightedElement} color="green" />}
    </>
  );
}
