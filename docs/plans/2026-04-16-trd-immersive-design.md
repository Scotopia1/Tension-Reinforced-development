# TRD-Website-New — Immersive Design (2026-04-16)

## Summary

Ground-up rebuild of the TRD Group marketing site as a cinematic, scroll-driven, partially-3D immersive experience. Existing flat site at `../TRD-website/` is preserved. New site lives in `TRD-Website-New/` and is a fresh Next.js 16 + React 19 + Tailwind 4 + GSAP 3.14 + R3F project.

## Brand context

TRD = **Tension Reinforced Developments**. Sydney, NSW. Founded 2017. $2B+ delivered.
Three Nassif brothers as directors (engineer / architect / builder).
Services: Post-Tensioning, Steel Fixing, Structural Remedial.

## Archetype: "Forge"

Shape B from the agency doctrine (video-background scroll storytelling) + a single Shape-A R3F moment (interactive post-tensioning tendon). Leverages the existing AI-rendered cinematic video and webp frame sequences in `../TRD-content/Generations/Final Renders/`.

## Tech stack

| Layer | Pick |
|---|---|
| Framework | Next.js 16 App Router + React 19 + TS + Tailwind 4 |
| Animation | GSAP 3.14 (all premium plugins free post-Webflow acquisition) |
| Smooth scroll | GSAP ScrollSmoother (Lenis as fallback, both installed) |
| 3D | @react-three/fiber + drei + three (one canvas, lazy, `ssr:false`) |
| Asset pipeline | sharp (frame webp optimization) |
| Fonts | Anton (display) + Inter Tight (body) + JetBrains Mono (specs) |

## Color tokens (additions over existing palette)

- `concrete` `#3A3A3A` — mid-grey elevated surfaces
- `rust` `#8B3A1F` — earned accent for "Remedial" service
- `bone` `#E8E0D6` — warmer cream for hero text on dark video
- `amber-glow` `#D4A53780` — soft amber for halos & gradients

## Section storyboard

| # | Section | Mechanic | GSAP / 3D primitives |
|---|---|---|---|
| 0 | Loader | Bebas-style "TRD" countdown 0→100, masked reveal | DrawSVG progress arc |
| 1 | Hero | Pinned full-viewport, frame-scrub of `frames-12_webp` cinematic; SplitText character shred | ScrollTrigger pin+scrub, FrameSequence component, SplitText |
| 2 | Trust Anchor | Scroll-scrubbed counters; client logos drift opposite | ScrollTrigger scrub, mapRange util |
| 3 | Tendon (R3F) | Interactive 3D post-tension strand+anchor; auto-rotate, drag, scroll-driven exploded view + stress arrows | R3F + drei + Draggable + MotionPath |
| 4 | Services | Three horizontal containerAnimation panels | ScrollTrigger horizontal pattern, DrawSVG icons |
| 5 | Projects | Sticky title col + cards stream up, Flip on click-expand | ScrollTrigger.batch, gsap.quickTo, Flip |
| 6 | Why TRD | Magnetic bento cards | quickTo cursor tracking |
| 7 | Process | Vertical SVG path drawn on scroll, dot pulses per step | DrawSVG scrub |
| 8 | Team | Three Nassif portrait panels, Observer-driven horizontal swap | Observer |
| 9 | CTA | Form over Ken-Burns video; magnetic submit | quickTo, looped MP4 |
| 10 | Footer | Infinite marquee | wrap util + ScrollTo |

## Motion grammar (locked)

- **Eases**: entrance `power3.out`, exit `power2.in`, hero `expo.out` + custom `trd-signature` (`M0,0 C0.18,0 0.04,1 1,1`)
- **Durations**: micro 0.18s, base 0.6s, hero 1.4s
- **Stagger**: 0.06–0.08; `from: "center"` for hero lines
- **Reduced motion**: `gsap.matchMedia()` collapses to ~0.01s, disables pinning

## Performance budget

- Lighthouse perf ≥ 90 mobile / ≥ 95 desktop
- LCP < 2.5s; CLS < 0.05; INP < 200ms
- Frame sequence: max 96 frames @ 1280px-wide webp (~1–1.5 MB total)
- R3F: <12k triangles, single canvas, Suspense boundary, mobile fallback to webm
- Mobile (<768px) replaces R3F + horizontal scroll with stacked vertical layout

## File layout

```
TRD-Website-New/
├─ AGENTS.md, CLAUDE.md, README.md
├─ package.json, next.config.ts, tsconfig.json, postcss.config.mjs, eslint.config.mjs
├─ scripts/build-frames.ts        # sharp pipeline → public/frames/hero
├─ docs/plans/                    # this file
├─ public/{images,video,frames}/
└─ src/
   ├─ app/{layout,page,globals.css}
   ├─ lib/{gsap,motion,utils}.ts
   └─ components/
      ├─ Header.tsx, Footer.tsx, Loader.tsx, SmoothScroll.tsx
      ├─ three/{TendonScene,Tendon,TendonControls}.tsx
      ├─ sections/{Hero,TrustAnchor,Tendon,Services,Projects,WhyTRD,Process,Team,CTA}.tsx
      └─ ui/{MagneticButton,FrameSequence,RevealText,NoiseOverlay,Marquee}.tsx
```

## Build order

1. Foundation (this commit): scaffold dirs, configs, tokens, libs, design doc
2. `npm install` (background)
3. `npm run frames` (background) — builds `public/frames/hero/`
4. Parallel batch 1 — Header, Footer, Loader, SmoothScroll, motion utilities
5. Parallel batch 2 — Hero, TrustAnchor, Services, Projects
6. Parallel batch 3 — WhyTRD, Process, Team, CTA, Tendon (R3F)
7. QA: lint, typecheck, build, Lighthouse
8. Visual verification

## Out of scope

CMS, analytics, i18n, auth, form backend, backwards-compat with old site, Storybook.
