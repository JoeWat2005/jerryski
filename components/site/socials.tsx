"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { useSectionReset } from "@/components/site/use-replay-on-hash";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HASHTAG = "#jerryski";
const INSTAGRAM_HANDLE = "@jerryskiltd";
const INSTAGRAM_URL = "https://instagram.com/jerryskiltd";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Socials() {
  const root = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hasFiredRef = useRef(false);
  const [copied, setCopied] = useState(false);

  useSectionReset("socials", tlRef, hasFiredRef);

  const onCopy = async () => {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(HASHTAG);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — silently no-op */
    }
  };

  useGSAP(
    () => {
      const ctx = root.current;
      if (!ctx) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // "Follow the ride." — words sweep left→right (the lead);
      // the social pill rockets in right→left (the pack following).
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        "[data-anim='eyebrow']",
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }
      )
        .fromTo(
          "[data-anim='word']",
          { opacity: 0, x: -120 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.1"
        )
        .fromTo(
          "[data-anim='icon']",
          { opacity: 0, x: 140, rotation: -8, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .fromTo(
          "[data-anim='featured']",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
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
      <Section id="socials" eyebrow="Socials" title="Follow the" titleAccent="ride.">
        <a
          data-anim="icon"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
          className="group inline-flex items-center gap-4 rounded-full border border-border bg-card pr-6 pl-2 py-2 text-foreground transition-[border-color,background-color,color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
        >
          <span className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors duration-300 group-hover:border-primary-foreground/30 group-hover:bg-primary-foreground/10 group-hover:text-primary-foreground">
            <InstagramIcon className="size-6" />
          </span>
          <span className="text-lg font-semibold tracking-tight sm:text-xl">
            {INSTAGRAM_HANDLE}
          </span>
        </a>

        <div
          data-anim="featured"
          className="mt-10 flex max-w-2xl flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:gap-6"
        >
          <p className="text-balance text-base text-muted-foreground sm:flex-1">
            <span className="font-bold text-foreground">Tag us.</span> Drop{" "}
            <span className="font-bold text-primary">{HASHTAG}</span> or{" "}
            <span className="font-bold text-primary">{INSTAGRAM_HANDLE}</span>{" "}
            on your next send and you might end up in our launch blog.
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={onCopy}
            aria-label={`Copy ${HASHTAG} to clipboard`}
            className="self-start sm:self-auto"
          >
            {copied ? (
              <>
                <Check data-icon="inline-start" />
                <span aria-live="polite">Copied!</span>
              </>
            ) : (
              <>
                <Copy data-icon="inline-start" />
                Copy {HASHTAG}
              </>
            )}
          </Button>
        </div>
      </Section>
    </div>
  );
}
