# Design System: TRD Group — Tension Reinforced Developments
**Project:** TRD-Website-New (Immersive Scrolling Experience)
**Client:** TRD Group, Sydney NSW — Post-Tensioning, Steel Fixing, Structural Remedial
**Aesthetic Codename:** INDUSTRIAL CINEMA

---

## 1. Visual Theme & Atmosphere

**Mood:** Brutal precision. The site should feel like walking through a construction site at golden hour — raw, monumental, expensive. Every pixel carries physical weight. There is no decoration that doesn't earn its place. If it isn't structural, cut it.

**Density:** High contrast, low clutter. Massive typography dominates negative space. Content is sparse per section but typographically overwhelming in scale. The page breathes through deliberate emptiness, then commands attention through scale.

**Philosophy:** Three pillars drive every decision — structural weight (heavy type, dark mass), cinematic depth (layered gradients, grain, frame-sequence video), industrial precision (monospaced labels, hairline borders, calibrated amber accents). No softness. No playfulness. No friendly. This is a site for engineers and architects placing hundred-million-dollar contracts.

**References:** Awwwards SOTD construction firms, Zaha Hadid Architects digital presence, Leica camera product sites, Swiss Army knife of dark-mode industrial portfolios.

---

## 2. Color Palette & Roles

### Primary Surface Colors
- **Void Black** (`#0A0A0A`) — Page base, hero background, the negative space everything lives against. Not pure black — just barely off, giving depth.
- **Carbon Surface** (`#141414`) — Card backgrounds, form panels, elevated containers. One step above void.
- **Lifted Dark** (`#1A1A1A`) — Hover state backgrounds, raised elements, active states.
- **Dark Card** (`#111111`) — Trust strip/ticker background, secondary containers.
- **Industrial Border** (`#2A2A2A`) — All dividers, card borders, input underlines, hairlines. 1px only.
- **Concrete Grey** (`#3A3A3A`) — Inactive dots, progress indicators, muted borders.

### Accent Colors
- **Amber** (`#D4A537`) — THE accent. Every CTA, every highlighted word, every active number, every hover line. Used sparingly so it commands authority when it appears. Think molten steel, construction tape, warning-grade importance.
- **Amber Hover** (`#E5B84A`) — Brighter amber for button hover states only.
- **Amber Muted** (`#D4A53726`) — 15% opacity amber for glow backgrounds, subtle shimmer behind numbers.
- **Amber Glow** (`#D4A53780`) — 50% opacity for box-shadows, dot glows on scroll activation.
- **Rust** (`#8B3A1F`) — Single-use only. Structural Remedial service accent. Aged iron, oxidized steel. Never used anywhere except that one service card.

### Text Colors
- **Cream** (`#F5F0EB`) — All body text, secondary headings, form field text. Warm off-white, never pure white.
- **Bone** (`#E8E0D6`) — Hero headline specifically. Slightly warmer and more tactile than cream.
- **Steel** (`#9CA3AF`) — Secondary/supporting body copy, card descriptions. Cool grey, recedes behind cream.
- **Ash** (`#6B7280`) — All monospaced labels, metadata, form field labels, HUD data. Barely visible — functional only.

### Scroll-Driven Background Gradient
The page background (`--bg` CSS var) slowly interpolates across scroll:
- Hero → `#0A0A0A` (void)
- Why TRD section → `#0E1620` (dark navy tinge — industrial blueprint)
- Team section → `#14100A` (dark warm brown — oak/leather)
- CTA section → `#1F1509` (darkest warm — aged timber, cognac)
This creates a slow color temperature drift from cold industrial to warm human as the user descends.

---

## 3. Typography Rules

### Font Stack
1. **Anton** (Display) — ALL headings H1–H3 without exception. Regular weight (400) only — Anton has no other weight. Uppercase mandatory. Line-height 0.86–0.92 (tighter than comfortable — this is intentional, creates mass). Letter-spacing +0.005em. Renders like structural concrete panels stacked.

2. **Inter Tight** (Body) — All paragraph text, descriptions, card bodies. Tracking -0.005em (slightly condensed). 16–18px for body, 14px for secondary. Anti-aliased to maximum smoothness. Never bold in body context.

3. **JetBrains Mono** (Mono) — ALL labels, metadata, section numbers, form field labels, HUD data, coordinates, stats. Always uppercase. Always tracking 0.3em–0.4em minimum. Size 9–11px. This font signals precision, calibration, machine-readability.

### Scale
- Hero H1: `clamp(2.5rem, 9.2vw, 9rem)` desktop → `10rem` at XL. Brutalist scale that fills the viewport.
- Section H2: `5.5rem–7rem` desktop. Never smaller than 5xl on any breakpoint.
- Card H3: `3xl–5xl` Anton.
- Body: `base (16px) to lg (18px)`.
- Mono labels: `10–11px` with extreme tracking.

### Color Usage in Type
- Main headlines: Bone (`#E8E0D6`) or Cream (`#F5F0EB`)
- Key word per headline (always last word or phrase): Amber (`#D4A537`) — one amber word per heading, never two
- Body copy: Steel (`#9CA3AF`)
- Labels/metadata: Ash (`#6B7280`)
- Section numbers + active states: Amber (`#D4A537`)

### Section Label Pattern (universal)
Every section opens with:
```
[amber hairline 6px wide] [MONO 10px 0.4em tracking] [XX — Section name] [text-amber/70]
```
This is the site's visual grammar. It appears on every single section without exception.

---

## 4. Component Stylings

### Buttons
- **Primary CTA:** Sharp rectangular, zero border-radius, `bg-amber` → `bg-amber-hover`, text in `text-dark font-semibold text-[11px] tracking-[0.25em] uppercase`. Padding `px-7 py-4`. Right-pointing arrow icon that translates +4px on hover. `transition-colors duration-300`.
- **Secondary/Ghost CTA:** Same dimensions, transparent background, `border border-cream/20` → `border-cream` on hover, `text-cream`. Never filled.
- **Submit Button:** Full-width amber, same text treatment. Magnetic: drifts 20% toward cursor on mousemove, snaps back on mouseleave. On success: amber stays, text becomes "✓ Sent — We'll reply within 1 business day".

### Cards
- **Why TRD Cards:** `bg-dark-surface border border-dark-border hover:border-amber/40`. Absolutely sharp corners. Interior padding `p-8 md:p-12`. Bottom accent: 1px amber line that animates from `width: 0` to `width: 100%` on hover over 500ms. Magnetic hover — card content shifts 10% toward cursor position.
- **Team Cards:** Same dark surface background. No outer border — separated by 1px gap (`bg-dark-border` grid gap). Giant letter watermark (first initial, Anton 18–22rem) positioned top-right as near-invisible amber overlay (`text-amber/6`), brightening to `text-amber/20` on hover. Minimum height 360px.
- **Form Panel:** `bg-dark-surface/90 backdrop-blur-sm border border-dark-border`. Only blur element on the site — used once for the CTA form to separate it from the video background.
- **Process Steps:** No card container. Just content in open space with a left-rail timeline. Each step at 40% opacity, animating to 100% as scroll brings it into view.

### Form Inputs
- Transparent background, zero border-radius. Only a `border-b border-dark-border` bottom rule — no box, no background fill.
- Focus state: bottom border transitions to amber (`border-amber`). No outline, no shadow.
- Placeholder text in ash/steel color.
- Select dropdown: same bottom-border only treatment, `appearance-none`, custom caret implied by context.
- All field labels: JetBrains Mono 10px tracking-[0.3em] uppercase text-ash, displayed as a block above the input.

### Navigation
- Minimal fixed nav, dark/90 background with backdrop blur. Left: TRD monogram in Anton. Right: section anchor links in mono 11px uppercase tracking + amber CTA button.

### Noise Overlay
Applied as an absolutely-positioned SVG noise layer at 6–8% opacity with `mix-blend-mode: overlay` on top of video/gradient backgrounds. Creates physical film-grain texture. Used on Hero and CTA sections.

---

## 5. Layout Principles

### Grid & Spacing
- **Content max-width:** 1480px centered, never wider.
- **Horizontal padding:** `px-6 md:px-12` — tight on mobile, generous on desktop.
- **Vertical rhythm:** All sections `py-24 md:py-32`. No exceptions. Consistent breathing room between sections.
- **Section-title block:** Always `mb-16 md:mb-20 max-w-2xl` — gives the heading room to be the loudest thing in the room before content starts.

### Geometry
- **Zero border-radius everywhere.** Cards, buttons, inputs, badges — all sharp rectangles. This is non-negotiable. Round corners = consumer app = wrong brand.
- **No drop shadows.** No `box-shadow` anywhere. Depth is created through color layering and opacity, never elevation shadows.
- **1px borders only.** Never 2px or thicker except for SVG stroke elements (1.5px).

### Depth System
Depth is created through 4 techniques:
1. **Color layering:** Multiple translucent dark gradients stacked over video backgrounds
2. **Grain overlay:** SVG feTurbulence noise at 6–8% opacity, `mix-blend-mode: overlay`
3. **Typography scale contrast:** 10rem headline vs 10px mono label = 100:1 scale ratio
4. **Opacity hierarchy:** Amber/70 labels, cream body, bone headlines — progressive brightness toward importance

### Whitespace Strategy
- Hero: 260vh total height — 160% of it is the sticky visual. The scroll is the experience.
- Between section label and heading: `mb-6` — tight, creates a unit.
- Between heading block and content: `mb-16 md:mb-24` — generous, lets heading breathe.
- Between cards: `gap-5 md:gap-6` — close enough to read as a group, separate enough to be individual.

### Responsive Behavior
- Hero: Frame sequence (150 JPEG frames) on desktop → looping video on mobile
- 3D/R3F elements: Hidden below 768px, replaced with static or video fallback
- Navigation: Full desktop links → hamburger on mobile
- HUD elements (coordinates, stats, scroll indicator): `hidden md:flex` — desktop only
- Typography scales down gracefully via `clamp()` — never breaks layout

---

## 6. Motion Language

### Philosophy
All scroll is storytelling. Each section change is a scene change. The user's scroll position is a scrubber through a cinematic timeline — not a way to access information, but a way to experience a narrative. Motion should feel physical — like actual mass, tension, and momentum.

### Easing Vocabulary (5 Industrial Curves)
- `concrete-settle` (bezier 0.2,0 0.1,1) — slow start, abrupt stop. Like concrete block placed on ground.
- `steel-tension` (bezier 0.6,0 0.2,1) — long delay then snap. Cable pulled to its limit.
- `machinery-stop` (bezier 0.85,0 0.15,1) — heavy symmetric expo. Hydraulic press completing stroke.
- `cable-pull` (bezier 0.4,0 0,1) — long ramp, abrupt end. Anchor engaging.
- `hydraulic` (bezier 0.7,0 0.3,1) — symmetric press-and-release. Controlled industrial motion.

### Heading Entrance (Universal)
All headings use **RevealText** — words clip behind overflow:hidden mask containers and animate: `yPercent: 115 → 0`, `opacity: 0 → 1`, `scale: 1.04 → 1`, `filter: blur(6px) → blur(0)` simultaneously on `steel-tension` ease. Stagger 0.08s between words. Duration 0.9s hero, 0.6s body.

### Scroll-Driven Highlights
- Process timeline path draws itself (SVG stroke-dashoffset) as the section scrolls into view
- Process step dots scale 1.5x and glow amber as each reaches scroll threshold
- Background color interpolates from section to section via CSS var
- Hero content parallaxes up and blurs out as user scrolls past (y: -100, blur: 6px)

---

## 7. Interactive Microinteractions

- **Custom cursor:** 8px amber filled dot (quickTo 0.15s) + 32px transparent ring with `mix-blend-difference` (quickTo 0.4s). Snaps to interactive elements at 2.2x scale. Label text appears inside ring for key CTAs.
- **Card hover lines:** Amber 1px rule animates `w-0 → w-full` along card bottom edge. 500ms.
- **Magnetic elements:** Submit button and hero CTAs drift 20% toward cursor on hover, spring-reset on leave.
- **Scrollbar:** Custom — dark track, amber thumb, amber-hover on hover. 8px width.
- **Text selection:** Amber/30 highlight background, cream text.
- **Focus rings:** 2px amber outline, 4px offset. Amber color only, never browser-default blue.

---

*This design system is for an immersive, Awwwards-level construction industry site. Every decision prioritizes cinematic weight and industrial authority. No consumer softness. No startup playfulness. Physical. Heavy. Precise.*
