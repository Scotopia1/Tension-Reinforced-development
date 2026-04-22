"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * Drives document-level CSS vars --bg and --accent via ScrollTrigger scrub
 * across any section with [data-bg] (and optional [data-accent]) in doc order.
 *
 * Sections declare their frame color; between two adjacent sections, the var
 * interpolates smoothly through the scrub window that spans section A's bottom
 * to section B's top in the viewport.
 *
 * Consumers use var(--bg) / var(--accent) in CSS — e.g. `background: var(--bg)`
 * on main, or mix blend overlays keyed to --accent.
 */
export default function BackgroundDriver() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-bg]")
    );
    if (sections.length < 2) return;

    const root = document.documentElement;

    // initialize to first section's colors
    root.style.setProperty("--bg", sections[0].dataset.bg || "#0A0A0A");
    root.style.setProperty(
      "--accent",
      sections[0].dataset.accent || "#D4A537"
    );

    const triggers: ScrollTrigger[] = [];

    for (let i = 0; i < sections.length - 1; i++) {
      const from = sections[i];
      const to = sections[i + 1];
      const fromBg = from.dataset.bg || "#0A0A0A";
      const toBg = to.dataset.bg || "#0A0A0A";
      const fromAccent = from.dataset.accent || "#D4A537";
      const toAccent = to.dataset.accent || "#D4A537";

      const st = ScrollTrigger.create({
        trigger: to,
        start: "top 80%",
        end: "top 30%",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          const bg = gsap.utils.interpolate(fromBg, toBg, p);
          const accent = gsap.utils.interpolate(fromAccent, toAccent, p);
          root.style.setProperty("--bg", bg);
          root.style.setProperty("--accent", accent);
        },
      });
      triggers.push(st);
    }

    return () => {
      triggers.forEach((t) => t.kill());
      root.style.removeProperty("--bg");
      root.style.removeProperty("--accent");
    };
  }, { scope: scopeRef });

  return <div ref={scopeRef} style={{ display: "none" }} aria-hidden />;
}
