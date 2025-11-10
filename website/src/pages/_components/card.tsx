import type { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function Card({ title, description, icon: Icon }: CardProps) {
  return (
    <div className="group w-full rounded-xl border-2 border-white/15 bg-white/10 p-5 shadow-2xl transition-all duration-200 ease-out hover:border-white/30 hover:bg-white/15 sm:p-6 md:p-8">
      <div className="flex flex-col items-center text-center">
        <span
          className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-black/30 text-white shadow-sm backdrop-blur transition-transform duration-200 ease-out group-hover:scale-[1.03] sm:mb-4 sm:h-20 sm:w-20"
          aria-hidden
        >
          <Icon className="h-8 w-8 sm:h-10 sm:w-10" />
        </span>
        <h3 className="text-lg font-semibold sm:text-xl md:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-white/80 sm:text-base">{description}</p>
      </div>
    </div>
  );
}
