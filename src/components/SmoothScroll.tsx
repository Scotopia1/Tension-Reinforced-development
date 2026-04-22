"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Smooth-scroll wrapper.
 * Uses Lenis (free, framework-agnostic, plays nice with ScrollTrigger via the
 * scroll/raf bridge below). If GSAP ScrollSmoother is bundled and licensed it
 * could replace this — Lenis keeps us safe in any environment.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      syncTouch: false,
    });

    // Forward Lenis scroll updates into ScrollTrigger.
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Honor reduced motion: disable lerping (instant snap)
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyReduced = () => {
      lenis.options.lerp = mql.matches ? 1 : 0.1;
    };
    applyReduced();
    mql.addEventListener?.("change", applyReduced);

    return () => {
      mql.removeEventListener?.("change", applyReduced);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
