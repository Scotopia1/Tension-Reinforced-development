# TRD-Website-New — Agent Instructions

Immersive 3D scrolling experience for TRD Group (Tension Reinforced Developments).
This is a ground-up rebuild — separate from the existing flat marketing site at `../TRD-website/`.

## Critical: Next.js 16

This is **not** the Next.js you know. APIs and conventions may differ from training data.
Before writing routing, server-component, or config code, mirror patterns from the working
companion project at `../TRD-website/src/`. Heed deprecation notices.

## Stack (locked)

- Next.js 16 App Router + React 19 + TypeScript + Tailwind 4
- GSAP 3.14 (all plugins free since the Webflow acquisition) — ScrollTrigger,
  ScrollSmoother, SplitText, DrawSVG, MotionPath, MorphSVG, Observer, CustomEase,
  ScrambleText, ScrollToPlugin, Flip, Draggable, InertiaPlugin
- @react-three/fiber + drei + three (one canvas, lazy, ssr:false)
- Lenis is installed as a Plan B if ScrollSmoother misbehaves; ScrollSmoother is the default
- sharp for the frame-sequence build pipeline

## Hard rules

- Never animate `width` / `height` / `top` / `left` — use `x`, `y`, `scale`
- Always use `useGSAP({ scope: ref })` so selectors are scoped
- All GSAP imports through `@/lib/gsap` (registers plugins exactly once)
- All motion presets through `@/lib/motion` (durations, eases, matchMedia)
- `prefers-reduced-motion` MUST collapse all animations to ~0.01s and disable pinning
- Mobile (<768px) replaces R3F + frame-scrub with simple looping video / static image
- Lighthouse perf budget: ≥90 mobile, ≥95 desktop. CLS <0.05. LCP <2.5s.
- Three.js: <12k triangles total, single canvas, Draco-compressed glTF, Suspense boundary
- Frame sequence: max ~120 frames at 1280×720 webp, lazily fetched

## Brand

TRD = Tension Reinforced Developments. Sydney, NSW. Founded 2017. $2B+ delivered.
Three Nassif brothers (engineer / architect / builder).
Services: Post-Tensioning, Steel Fixing, Structural Remedial.
Tone: heavy industrial, cinematic, premium. Black + amber + cream + concrete grey + a single rust accent for "Remedial."
