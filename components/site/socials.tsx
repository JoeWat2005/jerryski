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

type IconProps = React.SVGProps<SVGSVGElement>;

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.696 4.533-4.696 1.312 0 2.686.235 2.686.235v2.971h-1.514c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "X", href: "#", icon: XIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
] as const;

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

      // "Follow the ride." — words sweep left→right (the lead);
      // icons rocket in right→left in sequence (the pack following).
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
          { opacity: 0, x: 140, rotation: -25, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .fromTo(
          "[data-anim='featured']",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
          "-=0.15"
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
        <ul className="flex flex-wrap gap-4">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                data-anim="icon"
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex size-14 items-center justify-center rounded-full border border-border bg-card text-foreground transition-[border-color,background-color,color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
              >
                <Icon className="size-6" />
              </a>
            </li>
          ))}
        </ul>

        <div
          data-anim="featured"
          className="mt-10 flex max-w-2xl flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:gap-6"
        >
          <p className="text-balance text-base text-muted-foreground sm:flex-1">
            <span className="font-bold text-foreground">Tag us.</span> Drop{" "}
            <span className="font-bold text-primary">{HASHTAG}</span> on your
            next send and we might feature you in our launch blog.
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
