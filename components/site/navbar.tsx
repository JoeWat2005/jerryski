"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/components/site/nav-links";
import { dispatchSectionReset } from "@/components/site/use-replay-on-hash";

const sectionIdFromHref = (href: string) =>
  href.startsWith("#") ? href.slice(1) : undefined;

const SHOW_AFTER_PX = 80;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > Math.min(SHOW_AFTER_PX, window.innerHeight - 200));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur transition-all duration-300 ease-out supports-[backdrop-filter]:bg-background/60",
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      )}
    >
      <nav className="mx-auto flex h-24 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          aria-label="JerrySki home — back to top"
          className="flex items-center"
          onClick={(e) => {
            e.preventDefault();
            // Rewind every section before scrolling, so they replay as the
            // user re-encounters them on the way down.
            dispatchSectionReset();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="relative h-14 w-56 sm:h-16 sm:w-72">
            <Image
              src="/wordmark.png"
              alt="JerrySki"
              fill
              priority
              sizes="(min-width: 640px) 18rem, 14rem"
              className="object-contain object-left"
            />
          </div>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={
                  <a
                    href={link.href}
                    onClick={() => {
                      const id = sectionIdFromHref(link.href);
                      if (id) dispatchSectionReset({ sectionId: id });
                    }}
                  />
                }
              >
                {link.label}
              </Button>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-8 p-6">
              <SheetTitle className="sr-only">JerrySki menu</SheetTitle>
              <div className="relative h-14 w-56">
                <Image
                  src="/wordmark.png"
                  alt="JerrySki"
                  fill
                  sizes="14rem"
                  className="object-contain object-left"
                />
              </div>
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <SheetClose
                      nativeButton={false}
                      render={
                        <a
                          href={link.href}
                          onClick={() => {
                            const id = sectionIdFromHref(link.href);
                            if (id) dispatchSectionReset({ sectionId: id });
                          }}
                          className="block rounded-md px-3 py-3 text-lg font-semibold text-foreground transition-colors hover:bg-accent hover:text-primary"
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
