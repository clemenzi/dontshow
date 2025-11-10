interface HighlightOverlayProps {
  element: HTMLElement;
  color: "green" | "red";
}

export function HighlightOverlay({ element, color }: HighlightOverlayProps) {
  return (
    <div
      data-color={color}
      className="pointer-events-none absolute z-[9999] border-2 data-[color=green]:border-green-500 data-[color=red]:border-red-500"
      style={{
        top: element.getBoundingClientRect().top + window.scrollY,
        left: element.getBoundingClientRect().left + window.scrollX,
        width: element.getBoundingClientRect().width,
        height: element.getBoundingClientRect().height,
      }}
    />
  );
}
