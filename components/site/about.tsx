"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Section } from "@/components/site/section";
import { MountainBackdrop } from "@/components/site/mountain-backdrop";
import { useSectionReset } from "@/components/site/use-replay-on-hash";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function About() {
  const root = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasFiredRef = useRef(false);

  useSectionReset("about", tlRef, hasFiredRef);

  useGSAP(
    () => {
      const ctx = root.current;
      if (!ctx) return;

      // "Send it." — words slam in from the right with momentum.
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        "[data-anim='eyebrow']",
        { opacity: 0, x: 24 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }
      )
        .fromTo(
          "[data-anim='word']",
          { opacity: 0, x: 240, scale: 0.85, skewX: -8 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            skewX: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: "power4.out",
          },
          "-=0.15"
        )
        .fromTo(
          "[data-anim='body']",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
          "-=0.2"
        )
        .fromTo(
          "[data-anim='mountain']",
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        );

      tlRef.current = tl;

      const playIfFresh = () => {
        if (!hasFiredRef.current) {
          tl.play(0);
          hasFiredRef.current = true;
        }
      };

      ScrollTrigger.create({
        trigger: ctx,
        start: "top 90%",
        invalidateOnRefresh: true,
        onEnter: playIfFresh,
        onEnterBack: playIfFresh,
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative">
      <MountainBackdrop data-anim="mountain" />
      <Section
        id="about"
        eyebrow="About"
        title="Built for the riders who"
        titleAccent="send it."
      >
        <p
          data-anim="body"
          className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          JerrySki is building affordable ski and snowboard gear and a community
          for beginners, riders, and future extreme sports athletes. No
          gatekeeping, no inflated price tags &mdash; just gear that gets you
          out there.
        </p>
      </Section>
    </div>
  );
}
