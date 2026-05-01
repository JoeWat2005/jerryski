"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  delay?: number;
  y?: number;
};

export function Reveal({
  className,
  children,
  delay = 0,
  y = 28,
  ...props
}: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = root.current;
      if (!ctx) return;
      gsap.from(ctx, {
        opacity: 0,
        y,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctx,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
