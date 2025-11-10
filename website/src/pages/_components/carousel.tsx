import p1 from "@/assets/p-1.png";
import p2 from "@/assets/p-2.png";
import p3 from "@/assets/p-3.png";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import Image from "./image";

export default function Carousel() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  return (
    <div className="embla relative" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <Image src={p1.src} alt="Image 1" />
        </div>
        <div className="embla__slide">
          <Image src={p2.src} alt="Image 2" />
        </div>
        <div className="embla__slide">
          <Image src={p3.src} alt="Image 3" />
        </div>
      </div>

      {/* Prev/Next buttons */}
      <button
        aria-label="previous"
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        aria-label="next"
        onClick={scrollNext}
        className="absolute top-1/2 right-2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
