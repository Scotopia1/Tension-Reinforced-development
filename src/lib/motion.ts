"use client";

import { gsap, CustomEase } from "./gsap";

export const DURATION = {
  micro: 0.18,
  fast: 0.32,
  base: 0.6,
  slow: 1.0,
  hero: 1.4,
  cinematic: 1.8,
  epic: 2.4,
} as const;

export const EASE = {
  out: "power3.out",
  in: "power2.in",
  inOut: "power3.inOut",
  expo: "expo.out",
  expoInOut: "expo.inOut",
  back: "back.out(1.2)",
  concrete: "concrete-settle",
  steel: "steel-tension",
  machinery: "machinery-stop",
  cable: "cable-pull",
  hydraulic: "hydraulic",
} as const;

if (typeof window !== "undefined") {
  // concrete-settle — slow start, hard stop (mass coming to rest)
  CustomEase.create("concrete-settle", "M0,0 C0.2,0 0.1,1 1,1");
  // steel-tension — delayed acceleration then snap to rest (cable pulled taut)
  CustomEase.create("steel-tension", "M0,0 C0.6,0 0.2,1 1,1");
  // machinery-stop — heavy decisive expo.inOut variant (hydraulic press)
  CustomEase.create("machinery-stop", "M0,0 C0.85,0 0.15,1 1,1");
  // cable-pull — long ramp, abrupt termination (anchor locking)
  CustomEase.create("cable-pull", "M0,0 C0.4,0 0,1 1,1");
  // hydraulic — symmetrical press-and-release
  CustomEase.create("hydraulic", "M0,0 C0.7,0 0.3,1 1,1");
}

export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
  hero: 0.12,
} as const;

export type MotionConditions = {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  reduceMotion: boolean;
};

/**
 * Standard breakpoints + reduced-motion gate.
 * Use inside useGSAP() like:
 *   const mm = gsap.matchMedia(scope);
 *   mm.add(MOTION_QUERIES, (ctx) => { const c = ctx.conditions as MotionConditions; ... });
 */
export const MOTION_QUERIES = {
  isDesktop: "(min-width: 1024px)",
  isTablet: "(min-width: 768px) and (max-width: 1023px)",
  isMobile: "(max-width: 767px)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

/**
 * Reduce-motion preset that collapses any tween to ~instant and skips ScrollTriggers.
 * Wrap entrance animations: if (reduceMotion) return gsap.set(target, finalState);
 */
export function instantSet(target: gsap.TweenTarget, vars: gsap.TweenVars) {
  gsap.set(target, vars);
}
