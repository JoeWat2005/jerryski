"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FLAKE_COUNT = 50;
const MOBILE_FLAKE_COUNT = 24;

export function Snowfall() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Honor prefers-reduced-motion: don't animate at all.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const flakes = root.current?.querySelectorAll<HTMLSpanElement>(
        "[data-flake]"
      );
      if (!flakes) return;

      // Halve per-frame work on small screens.
      const animatedCount =
        window.innerWidth < 768 ? MOBILE_FLAKE_COUNT : FLAKE_COUNT;

      const tweens: gsap.core.Tween[] = [];

      flakes.forEach((flake, i) => {
        if (i >= animatedCount) return;

        // Constant per-flake opacity — visible the whole way down,
        // not just at the end of the fall.
        gsap.set(flake, { opacity: gsap.utils.random(0.45, 0.9) });

        const tween = gsap.fromTo(
          flake,
          { y: "-10%", x: 0 },
          {
            y: "110vh",
            x: gsap.utils.random(-40, 40),
            duration: gsap.utils.random(6, 12),
            delay: gsap.utils.random(-6, 4),
            ease: "none",
            repeat: -1,
          }
        );
        tweens.push(tween);
      });

      // Pause every tween when the hero scrolls out of view.
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          tweens.forEach((t) =>
            self.isActive ? t.resume() : t.pause()
          );
        },
      });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {Array.from({ length: FLAKE_COUNT }).map((_, i) => {
        const left = (i * 137) % 100;
        const size = 3 + ((i * 11) % 5);
        return (
          <span
            key={i}
            data-flake
            className="absolute top-0 block rounded-full bg-foreground/60"
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
