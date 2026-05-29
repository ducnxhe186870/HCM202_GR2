import type React from "react";
import clsx from "clsx";

type PaperNoteProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

function NoteLayer({
  children,
  className,
  style,
  ...rest
}: PaperNoteProps & { isTop?: boolean }) {
  return (
    <div
      {...rest}
      className={clsx(
        "absolute inset-0 p-8 md:p-10 border border-black/10 shadow-md font-handwriting text-gray-800",
        className
      )}
      style={{
        backgroundColor: "#fbf3df",
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(0,0,0,0.05) 0 1px, transparent 1px 28px)",
        backgroundSize: "100% 28px",
        WebkitMaskImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='2' result='turb'/><feDisplacementMap in2='turb' in='SourceGraphic' scale='3'/></filter><rect width='100%' height='100%' filter='url(%23f)' fill='white'/></svg>\")",
        maskImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='2' result='turb'/><feDisplacementMap in2='turb' in='SourceGraphic' scale='3'/></filter><rect width='100%' height='100%' filter='url(%23f)' fill='white'/></svg>\")",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "cover",
        maskSize: "cover",
        ...style,
      }}
    >
      {/* stains for realism */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 40%, rgba(0,0,0,0.05), transparent 30%), radial-gradient(circle at 75% 65%, rgba(0,0,0,0.04), transparent 30%)",
          mixBlendMode: "multiply",
          opacity: 0.4,
        }}
      />
      {/* margin line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-red-400/50 -translate-x-3" />
      <div className="relative pl-8">{children}</div>
    </div>
  );
}

export default function PaperNote({ children, className, ...rest }: PaperNoteProps) {
  return (
    <div className={clsx("relative inline-block", className)} {...rest}>
      {/* Back layers (the “stack”) */}
      <NoteLayer className="translate-x-2 translate-y-2 opacity-70" />
      <NoteLayer className="translate-x-1 translate-y-1 opacity-85" />

      {/* Top visible layer */}
      <NoteLayer className="relative z-10 shadow-xl">{children}</NoteLayer>
    </div>
  );
}
