"use client";

import { useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import {
  useSectionReset,
  SECTION_RESET_EVENT,
} from "@/components/site/use-replay-on-hash";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EMAIL = "contact@jerryski.com";

export function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const shakeRef = useRef<gsap.core.Timeline | null>(null);
  const hasFiredRef = useRef(false);

  useSectionReset("contact", tlRef, hasFiredRef);

  // Also stop the buzzing on reset.
  useEffect(() => {
    const handle = () => shakeRef.current?.pause(0);
    window.addEventListener(SECTION_RESET_EVENT, handle);
    return () => window.removeEventListener(SECTION_RESET_EVENT, handle);
  }, []);

  useGSAP(
    () => {
      const ctx = root.current;
      if (!ctx) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // "Get in touch." — words converge from outside toward center, then the button taps in.
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        "[data-anim='eyebrow']",
        { opacity: 0, letterSpacing: "0.6em" },
        { opacity: 1, letterSpacing: "0.25em", duration: 0.5, ease: "power3.out" }
      );

      const words = Array.from(
        ctx.querySelectorAll<HTMLElement>("[data-anim='word']")
      );
      const mid = (words.length - 1) / 2;
      words.forEach((el, i) => {
        const offset = i - mid;
        tl.fromTo(
          el,
          { opacity: 0, x: offset * -120, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            ease: "expo.out",
          },
          i === 0 ? "-=0.2" : "<"
        );
      });

      tl.fromTo(
        "[data-anim='lede']",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        "-=0.3"
      ).fromTo(
        "[data-anim='cta']",
        { opacity: 0, scale: 0.85, y: 8 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: "back.out(2.4)",
        },
        "-=0.2"
      );

      tlRef.current = tl;

      // Phone-vibration buzz: quick jitter, pause, repeat.
      const cta = ctx.querySelector<HTMLElement>("[data-anim='cta']");
      if (cta) {
        const shake = gsap.timeline({
          paused: true,
          repeat: -1,
          repeatDelay: 2.4,
          defaults: { duration: 0.05, ease: "power1.inOut" },
        });
        const pattern: Array<[number, number]> = [
          [-3, -2],
          [3, 2],
          [-3, -2],
          [3, 2],
          [-2, -1],
          [2, 1],
        ];
        pattern.forEach(([x, rot]) => shake.to(cta, { x, rotation: rot }));
        shake.to(cta, { x: 0, rotation: 0, duration: 0.06 });
        shakeRef.current = shake;
      }

      // Start buzzing once the entrance finishes (set once on the timeline).
      tl.eventCallback("onComplete", () => shakeRef.current?.play(0));

      const playIfFresh = () => {
        if (!hasFiredRef.current) {
          shakeRef.current?.pause(0);
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

      // Pause the buzzing whenever the section is fully off-screen
      // so it doesn't burn CPU while the user is reading other parts.
      ScrollTrigger.create({
        trigger: ctx,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (!shakeRef.current) return;
          if (self.isActive) {
            // Only resume if the section's already played its entrance
            if (hasFiredRef.current) shakeRef.current.resume();
          } else {
            shakeRef.current.pause();
          }
        },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <Section id="contact" eyebrow="Contact" title="Get in" titleAccent="touch.">
        <div className="flex flex-col items-start gap-6">
          <p
            data-anim="lede"
            className="max-w-xl text-lg text-muted-foreground"
          >
            Press, partnerships, athletes, or just want to say hey? We&rsquo;d
            love to hear from you.
          </p>
          <div data-anim="cta" className="inline-block max-w-full">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href={`mailto:${EMAIL}`} />}
              className="max-w-full text-sm sm:text-base"
            >
              <Mail data-icon="inline-start" />
              <span className="truncate">{EMAIL}</span>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
