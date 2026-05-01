"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Snowfall } from "@/components/site/snowfall";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.9 },
      });

      tl.from("[data-hero='logo']", { opacity: 0, scale: 0.9, y: 24 })
        .from(
          "[data-hero='badge']",
          { opacity: 0, y: 12, duration: 0.6 },
          "-=0.4"
        )
        .from(
          "[data-hero='desc']",
          { opacity: 0, y: 16, duration: 0.7 },
          "-=0.3"
        )
        .from(
          "[data-hero='scroll']",
          { opacity: 0, y: 8, duration: 0.5 },
          "-=0.3"
        );

      gsap.to("[data-hero='dot']", {
        opacity: 0.25,
        scale: 0.7,
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to("[data-hero='scroll-dot']", {
        y: 8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 0.9,
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative isolate flex h-[100svh] min-h-[640px] w-full flex-col items-center justify-center overflow-hidden bg-background px-4 pt-10 pb-24 sm:px-6"
    >
      <Snowfall />

      <div className="flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-6 text-center sm:gap-8">
        <div
          data-hero="logo"
          className="relative h-52 w-full max-w-md sm:h-72 sm:max-w-2xl md:h-[24rem] md:max-w-4xl lg:h-[30rem] lg:max-w-6xl"
        >
          <Image
            src="/main-logo.png"
            alt="JerrySki — Own the mountain. Full send. Be a Jerry."
            fill
            priority
            sizes="(min-width: 1024px) 80rem, (min-width: 768px) 56rem, (min-width: 640px) 42rem, 28rem"
            className="object-contain"
          />
        </div>

        <span
          data-hero="badge"
          className="inline-flex items-center gap-2.5 rounded-full border border-foreground/15 bg-background/80 px-4 py-1.5 text-xs font-semibold tracking-[0.25em] text-foreground uppercase shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:text-sm"
        >
          <span
            data-hero="dot"
            className="size-2 rounded-full bg-[var(--brand-yellow)] shadow-[0_0_12px_2px_rgba(255,214,10,0.7)]"
          />
          Coming Soon
        </span>

        <p
          data-hero="desc"
          className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          Ski and snowboard gear that doesn&rsquo;t cost a fortune. For
          everyone who&rsquo;d rather be on the mountain.
        </p>
      </div>

      <div
        data-hero="scroll"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground"
        aria-hidden
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-border p-1">
          <span
            data-hero="scroll-dot"
            className="block size-1.5 rounded-full bg-foreground/70"
          />
        </div>
      </div>
    </section>
  );
}
