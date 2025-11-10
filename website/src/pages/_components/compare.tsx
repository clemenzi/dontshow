import vs1n from "@/assets/vs1n.png";
import vs1w from "@/assets/vs1w.png";
import vs2n from "@/assets/vs2n.png";
import vs2w from "@/assets/vs2w.png";
import vs3n from "@/assets/vs3n.png";
import vs3w from "@/assets/vs3w.png";
import { useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export default function Compare() {
  const [section, setSection] = useState<"ip" | "amz" | "pp">("ip");
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-stretch justify-center space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <button
          className={
            section === "amz"
              ? "rounded-full border-2 border-white bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
              : "rounded-full border-2 border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-black"
          }
          onClick={() => setSection("amz")}
        >
          amazon.com
        </button>
        <button
          className={
            section === "ip"
              ? "rounded-full border-2 border-white bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
              : "rounded-full border-2 border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-black"
          }
          onClick={() => setSection("ip")}
        >
          whatismyipaddress.com
        </button>
        <button
          className={
            section === "pp"
              ? "rounded-full border-2 border-white bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
              : "rounded-full border-2 border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-black"
          }
          onClick={() => setSection("pp")}
        >
          paypal.com
        </button>
      </div>
      <div>
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={
                section === "ip"
                  ? vs1n.src
                  : section === "amz"
                    ? vs2n.src
                    : section === "pp"
                      ? vs3n.src
                      : vs3w.src
              }
              alt="Image one"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={
                section === "ip"
                  ? vs1w.src
                  : section === "amz"
                    ? vs2w.src
                    : section === "pp"
                      ? vs3w.src
                      : vs3n.src
              }
              alt="Image two"
            />
          }
        />
      </div>
    </div>
  );
}
