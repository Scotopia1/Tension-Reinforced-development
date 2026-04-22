"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Writes the current scroll velocity (clamped, smoothed) to CSS vars on :root.
 *   --scroll-skew  — degrees (-3 to 3), lerp-smoothed
 *   --scroll-vel   — raw px/s
 *
 * Any element can read: transform: skewY(calc(var(--scroll-skew) * 1deg));
 */
export default function ScrollVelocity() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    const docEl = document.documentElement;
    const maxSkew = 3;
    let smoothed = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();

    const update = () => {
      const nowY = window.scrollY;
      const nowT = performance.now();
      const dt = Math.max(1, nowT - lastT);
      const vel = ((nowY - lastY) / dt) * 1000; // px/s
      lastY = nowY;
      lastT = nowT;

      const target = gsap.utils.clamp(-maxSkew, maxSkew, -vel / 400);
      smoothed += (target - smoothed) * 0.18;
      docEl.style.setProperty("--scroll-skew", smoothed.toFixed(3));
      docEl.style.setProperty("--scroll-vel", vel.toFixed(0));
    };

    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
      docEl.style.removeProperty("--scroll-skew");
      docEl.style.removeProperty("--scroll-vel");
    };
  }, { scope: rootRef });

  return <div ref={rootRef} style={{ display: "none" }} aria-hidden />;
}
