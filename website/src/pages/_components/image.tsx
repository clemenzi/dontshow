import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const Image: React.FC<ImageProps> = props => {
  const { onClick, className, style, src, alt, srcSet, sizes, ...rest } = props;
  const [open, setOpen] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLImageElement> = useCallback(
    e => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      setOpen(true);
    },
    [onClick]
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <img
        {...rest}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={`cursor-zoom-in ${className}`}
        onClick={handleClick}
        style={style}
      />
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt ?? "Image preview"}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[2147483647] flex cursor-zoom-out items-center justify-center bg-black/85 p-4"
          >
            <img
              src={src}
              srcSet={srcSet}
              sizes={sizes}
              alt={alt}
              onClick={e => e.stopPropagation()}
              className="h-auto max-h-[90vh] w-auto max-w-[90vw] bg-transparent object-contain shadow-2xl"
            />
            <button
              aria-label="Chiudi"
              onClick={e => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="group fixed top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-sm backdrop-blur transition-all duration-200 ease-out hover:scale-105 hover:border-white/40 hover:bg-black/60 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 active:scale-95"
            >
              <X
                size={18}
                className="transition-transform duration-200 ease-out group-hover:scale-110"
              />
            </button>
          </div>,
          document.body
        )}
    </>
  );
};

export default Image;
