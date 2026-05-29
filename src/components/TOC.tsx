import React from "react";
import { clsx } from "clsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "./shadcn/tooltip";

export interface TocSection {
  id: string;
  title: string;
}

interface TOCProps {
  sections: TocSection[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

function ZigZagTrail({ count = 6 }: { count?: number }) {
  const dots = Array.from({ length: count }, (_, i) => {
    const isEven = i % 2 === 0;
    return (
      <span
        key={i}
        className="absolute w-1 h-1 rounded-full bg-gray-400 opacity-60"
        style={{
          top: `${(i / (count - 1)) * 80}%`,
          left: isEven ? "45%" : "55%", // tighter zig-zag
          transform: "translateX(-50%)",
        }}
      />
    );
  });

  return <div className="relative w-4 h-8">{dots}</div>;
}

export default function TOC({ sections, activeId, onSelect }: TOCProps) {
  return (
    <div
      className={clsx(
        "fixed right-4 top-1/2 -translate-y-1/2 z-[9000]",
        "bg-white/10 rounded-full p-2",
        "transition-all duration-300 ease-out",
        "hover:bg-white hover:shadow-lg hover:scale-130"
      )}
      aria-label="Table of contents"
    >
      <div className="flex flex-col items-center select-none">
        {sections.map((s, i) => {
          const isActive = activeId === s.id;
          return (
            <React.Fragment key={s.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onSelect(s.id)}
                    className={clsx(
                      "size-3 rounded-full bg-gray-400 cursor-pointer",
                      "transition-all duration-300 ease-out",
                      "hover:scale-110",
                      isActive && "bg-red-500 size-4"
                    )}
                    aria-label={s.title}
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  sideOffset={16}
                  className="flex text-white font-semibold text-base bg-gray-700 rounded-2xl"
                >
                  {s.title}
                </TooltipContent>
              </Tooltip>

              {i < sections.length - 1 && <ZigZagTrail count={6} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
