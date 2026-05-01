"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Section } from "@/components/site/section";
import { useSectionReset } from "@/components/site/use-replay-on-hash";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const GOALS = [
  {
    title: "Make snow sports accessible",
    body: "Good gear shouldn’t cost a paycheck. Snow days are for everyone.",
  },
  {
    title: "Back the next generation",
    body: "We’re backing the riders chasing their first sponsorship. You bring the talent, we’ve got your back.",
  },
  {
    title: "Have some fun",
    body: "Loud, playful, all in. Made by Jerrys, for Jerrys.",
  },
] as const;

export function Goal() {
  const root = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasFiredRef = useRef(false);

  useSectionReset("goal", tlRef, hasFiredRef);

  useGSAP(
    () => {
      const ctx = root.current;
      if (!ctx) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // "Simple." — clean and snappy. No bounce, no rotation.
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        "[data-anim='eyebrow']",
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      )
        .fromTo(
          "[data-anim='word']",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.1"
        )
        .fromTo(
          "[data-anim='card']",
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.2"
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
    <div ref={root}>
      <Section
        id="goal"
        eyebrow="Goal"
        title="Our mission is"
        titleAccent="simple."
      >
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {GOALS.map((goal, i) => (
            <li
              key={goal.title}
              data-anim="card"
              className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <span className="font-mono text-xs font-semibold text-primary">
                0{i + 1}
              </span>
              <h3 className="font-heading text-xl font-bold text-foreground">
                {goal.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {goal.body}
              </p>
              <span
                aria-hidden
                className="absolute right-5 bottom-5 text-primary opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              >
                &rarr;
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
