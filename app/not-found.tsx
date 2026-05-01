"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

gsap.registerPlugin(useGSAP);

const REDIRECT_MS = 3000;

export default function NotFound() {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setTimeout(() => router.replace("/"), REDIRECT_MS);
    return () => window.clearTimeout(id);
  }, [router]);

  useGSAP(
    () => {
      gsap.from("[data-404='card']", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from("[data-404='item']", {
        opacity: 0,
        y: 12,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.fromTo(
        "[data-404='bar']",
        { width: "0%" },
        {
          width: "100%",
          duration: REDIRECT_MS / 1000,
          ease: "none",
        }
      );
    },
    { scope: root }
  );

  return (
    <main
      ref={root}
      className="flex min-h-[100svh] w-full items-center justify-center bg-secondary px-4 py-12"
    >
      <Card
        data-404="card"
        className="w-full max-w-md border-border bg-card shadow-xl"
      >
        <CardHeader className="items-center text-center">
          <p
            data-404="item"
            className="font-mono text-xs font-semibold tracking-[0.3em] text-primary uppercase"
          >
            Lost?
          </p>
          <CardTitle
            data-404="item"
            className="font-heading text-7xl font-black tracking-tight text-foreground sm:text-8xl"
          >
            4<span className="text-primary">0</span>4
          </CardTitle>
          <CardDescription data-404="item" className="text-base">
            Page not found.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          <p
            data-404="item"
            className="text-center text-sm text-muted-foreground"
          >
            Redirecting to the JerrySki landing page&hellip;
          </p>
          <div
            data-404="item"
            className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-label="Redirecting"
          >
            <div data-404="bar" className="h-full bg-primary" />
          </div>
        </CardContent>

        <CardFooter className="justify-center">
          <Button
            data-404="item"
            size="lg"
            nativeButton={false}
            render={<Link href="/" />}
          >
            Go to landing page
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
