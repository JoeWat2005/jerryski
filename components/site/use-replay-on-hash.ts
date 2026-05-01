"use client";

import { useEffect, type RefObject, type MutableRefObject } from "react";
import type gsap from "gsap";

const RESET_EVENT = "jerryski:section-reset";

export const SECTION_RESET_EVENT = RESET_EVENT;

type ResetDetail = {
  /** When provided, only the matching section resets. Omit for "reset all". */
  sectionId?: string;
};

export function dispatchSectionReset(detail?: ResetDetail) {
  window.dispatchEvent(new CustomEvent(RESET_EVENT, { detail }));
}

/**
 * Listens for the global section-reset event. On reset (matching this section
 * id, or unscoped) rewinds the timeline to its from-state and clears the
 * "has fired" guard so the ScrollTrigger can play it again on the next entry.
 */
export function useSectionReset(
  sectionId: string,
  tlRef: RefObject<gsap.core.Timeline | null>,
  hasFiredRef: MutableRefObject<boolean>
) {
  useEffect(() => {
    const handle = (e: Event) => {
      const detail = (e as CustomEvent<ResetDetail | undefined>).detail;
      if (detail?.sectionId && detail.sectionId !== sectionId) return;
      tlRef.current?.pause(0);
      hasFiredRef.current = false;
    };
    window.addEventListener(RESET_EVENT, handle);
    return () => window.removeEventListener(RESET_EVENT, handle);
  }, [sectionId, tlRef, hasFiredRef]);
}
