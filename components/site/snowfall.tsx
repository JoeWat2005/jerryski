"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const FLAKE_COUNT = 36;

export function Snowfall() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const flakes = root.current?.querySelectorAll<HTMLSpanElement>(
        "[data-flake]"
      );
      if (!flakes) return;
      flakes.forEach((flake) => {
        const duration = gsap.utils.random(8, 16);
        const delay = gsap.utils.random(0, 8);
        const drift = gsap.utils.random(-30, 30);
        gsap.fromTo(
          flake,
          { y: -40, x: 0, opacity: 0 },
          {
            y: "110vh",
            x: drift,
            opacity: gsap.utils.random(0.35, 0.8),
            duration,
            delay,
            ease: "none",
            repeat: -1,
          }
        );
      });
    },
    { scope: root }
  );

  // Avoid hydration mismatch: render a stable shell, randomize on client only.
  useEffect(() => {}, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {Array.from({ length: FLAKE_COUNT }).map((_, i) => {
        const left = ((i * 137) % 100) + (i % 7) * 0.3;
        const size = 3 + ((i * 11) % 5);
        return (
          <span
            key={i}
            data-flake
            className="absolute top-0 block rounded-full bg-foreground/40"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              opacity: 0,
            }}
          />
        );
      })}
    </div>
  );
}
