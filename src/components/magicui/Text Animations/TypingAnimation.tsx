"use client";

import { motion, type MotionProps, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../utils/cn";

interface TypingAnimationProps extends MotionProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
}

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  // Use a stable wrapper element for IntersectionObserver to avoid ref forwarding issues
  const elementRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(elementRef, {
    amount: 0.3,
    // Don't restrict to once; we gate actual start with `started`
    once: false,
  });

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    if (!isInView) return;

    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay, startOnView, isInView]);

  useEffect(() => {
    if (!started) return;

    const graphemes = Array.from(children);
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < graphemes.length) {
        setDisplayedText(graphemes.slice(0, i + 1).join(""));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [children, duration, started]);

  return (
    <div ref={elementRef}>
      <MotionComponent
        className={cn(
          "text-4xl font-bold leading-[5rem] tracking-[-0.02em]",
          className
        )}
        {...props}
      >
        {displayedText}
      </MotionComponent>
    </div>
  );
}
