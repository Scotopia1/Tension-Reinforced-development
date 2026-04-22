# TRD Group — Content Generation Prompts

All assets feed into the 6-beat scroll experience at `localhost:3000`.
Output format for all images: **WebP, 1920×1080 minimum** unless specified.
Brand lock across every asset: warm 3400K–4200K colour temperature · f/2.0–f/2.8 DoF · dark, cinematic, heavy industrial tone · amber/gold as the only warm accent colour.

---

## Asset Index

| # | Title | Output Path | Type | Tool |
|---|-------|-------------|------|------|
| 1 | Post-Tensioning Service Hero | `/public/images/services/post-tensioning.webp` | Photo | Midjourney 6.1 |
| 2 | Steel Fixing Service Hero | `/public/images/services/steel-fixing.webp` | Photo | Midjourney 6.1 |
| 3 | Structural Remedial Service Hero | `/public/images/services/structural-remedial.webp` | Photo | Midjourney 6.1 |
| 4 | One Circular Quay Project Card | `/public/images/projects/one-circular-quay.webp` | Photo | Midjourney 6.1 |
| 5 | Parramatta Square Project Card | `/public/images/projects/parramatta-square.webp` | Photo | Midjourney 6.1 |
| 6 | Crown Residences Project Card | `/public/images/projects/crown-residences.webp` | Photo | Midjourney 6.1 |
| 7 | Atlassian HQ Project Card | `/public/images/projects/atlassian.webp` | Photo | Midjourney 6.1 |
| 8 | Western Sydney Airport Project Card | `/public/images/projects/western-sydney-airport.webp` | Photo | Midjourney 6.1 |
| 9 | Cable X-Ray Overlay | `/public/images/projects/cables/overlay.webp` | Graphic | Midjourney 6.1 + Photoshop |
| 10 | Fahed Nassif Portrait | `/public/images/team/fahed.webp` | Portrait | Midjourney 6.1 |
| 11 | Christopher Nassif Portrait | `/public/images/team/christopher.webp` | Portrait | Midjourney 6.1 |
| 12 | Charly Nassif Portrait | `/public/images/team/charly.webp` | Portrait | Midjourney 6.1 |
| 13 | Mobile Pour Loop Video | `/public/videos/pour-loop.mp4` | Video | Veo 3 / Kling 2.6 |

---

## Brand Consistency Lock

Apply these parameters to **every** asset. They are the visual glue of the site.

```
Colour temperature: 3400K–4200K (warm tungsten / late golden hour)
DoF: f/2.0–f/2.8 (subject sharp, environment soft)
Focal length family: 35mm / 50mm / 85mm only
Lighting mood: single dominant source (industrial overhead or raking side), deep shadow fill
Colour palette: near-black bg (#0A0A0A–#1A1410) · concrete greys (#888–#666) · amber/gold accent (#D4A537) only
Forbidden: blue tones, white backgrounds, lifestyle smiling, soft pastel grades
Atmosphere: raw, heavy, architectural precision
```

---

## 1 — Post-Tensioning Service Hero

**Path:** `/public/images/services/post-tensioning.webp`
**Aspect ratio:** 16:9 (1920×1080)
**Usage:** 60vh full-bleed image in TheWork Beat 3, clip-path revealed on scroll

### Midjourney Prompt

```
extreme close-up of post-tensioning steel cable strands being fed through a concrete slab formwork on an active high-rise construction site, Sydney, 7-wire strand in sharp focus, wet concrete pour visible in mid-ground, dramatic raking side light at 3800K casting deep amber shadows across the steel, industrial dust particles in air, shot on 85mm lens f/2.0, shallow depth of field, background concrete formwork blurred, high contrast black and shadow fill, editorial architectural photography style, no workers visible, purely material and structure, --ar 16:9 --style raw --v 6.1 --q 2
```

### Notes
- The cable strand should dominate the left-third of the frame
- Concrete texture must be raw and grey, not rendered/CGI
- If Midjourney adds yellow safety tape or PPE, regenerate — brand uses amber only as cable glow

---

## 2 — Steel Fixing Service Hero

**Path:** `/public/images/services/steel-fixing.webp`
**Aspect ratio:** 16:9 (1920×1080)
**Usage:** 60vh full-bleed image in TheWork Beat 3

### Midjourney Prompt

```
top-down bird's eye view of a precisely laid reinforcement steel rebar grid on a large concrete slab, perfectly geometric pattern, early morning industrial site, harsh directional overhead light at 4200K, long shadows between bars, concrete substrate visible underneath, shot on 50mm lens f/2.8, ultra sharp rebar in focus, slight vignette at edges, dark moody industrial atmosphere, rust and grey tones with warm golden light hitting the top surface of each bar, no humans, no equipment, purely structural material, monumental scale, --ar 16:9 --style raw --v 6.1 --q 2
```

### Notes
- The top-down angle must read as an abstract grid — almost like a technical drawing brought to life
- Rust on the rebar is acceptable and desired (industrial authenticity)
- Avoid bright daylight overexposure — shadows are essential

---

## 3 — Structural Remedial Service Hero

**Path:** `/public/images/services/structural-remedial.webp`
**Aspect ratio:** 16:9 (1920×1080)
**Usage:** 60vh full-bleed image in TheWork Beat 3 — index number is rust `#8B3A1F`

### Midjourney Prompt

```
close-up detail of deteriorated concrete bridge soffit showing exposed corroded reinforcement steel bars, concrete spalling and delamination visible, dramatic underlighting from below at 3600K warm tungsten, amber light raking across cracked concrete surface revealing internal rebar structure, shot on 85mm macro f/2.0, extreme texture detail, deep shadow fill above, forensic diagnostic quality, dark and serious atmosphere, editorial infrastructure photography, no people, no equipment in frame, purely the failing structure as subject matter, --ar 16:9 --style raw --v 6.1 --q 2
```

### Notes
- This image must feel diagnostic and serious — the "before" state that TRD fixes
- The amber underlighting connects visually to the brand but represents the damage being revealed
- Colour grade: desaturate concrete to near-grey, preserve the amber warm cast on the steel

---

## 4 — One Circular Quay Project Card

**Path:** `/public/images/projects/one-circular-quay.webp`
**Aspect ratio:** 9:16 vertical (1080×1920) — cards are tall on desktop horizontal scroll
**Usage:** Project card hero, Beat 4 horizontal scroll

### Midjourney Prompt

```
dramatic low-angle looking up at a luxury residential supertall tower under construction in Sydney CBD, glass and concrete curtain wall, harbour bridge and opera house faintly visible in blurred background, dusk golden hour sky at 3400K, amber construction lighting on facade, crane silhouette at top, shot on 24mm wide lens f/4.0, strong vertical lines converging at vanishing point above frame, deep dark foreground, cinematic grade, premium architectural photography, --ar 9:16 --style raw --v 6.1 --q 2
```

---

## 5 — Parramatta Square Project Card

**Path:** `/public/images/projects/parramatta-square.webp`
**Aspect ratio:** 9:16
**Usage:** Project card hero, Beat 4

### Midjourney Prompt

```
wide establishing shot of a large mixed-use urban precinct under construction in Western Sydney, multiple tower cranes in formation, concrete cores rising from a massive basement excavation, late afternoon directional light at 4000K, amber haze from concrete dust in air, shot on 35mm lens f/2.8, foreground construction fence blurred, mid-ground concrete structure sharp, background towers soft, cinematic editorial architecture photography, dark moody industrial sky, --ar 9:16 --style raw --v 6.1 --q 2
```

---

## 6 — Crown Residences Project Card

**Path:** `/public/images/projects/crown-residences.webp`
**Aspect ratio:** 9:16
**Usage:** Project card hero, Beat 4 — tallest PT slab in Australia

### Midjourney Prompt

```
extreme vertical composition looking straight up the facade of a 275 metre supertall luxury tower under construction, glass panels partially installed, concrete structural core exposed, construction lighting at 3200K warm amber glowing from within the building floors, dusk sky above, shot on 14mm ultra-wide lens looking directly vertical, fisheye-adjacent perspective compressing height, dark and foreboding scale, Barangaroo Sydney waterfront context blurred below, cinematic awe-inspiring architecture, --ar 9:16 --style raw --v 6.1 --q 2
```

---

## 7 — Atlassian HQ Project Card

**Path:** `/public/images/projects/atlassian.webp`
**Aspect ratio:** 9:16
**Usage:** Project card hero, Beat 4 — hybrid timber-concrete

### Midjourney Prompt

```
close detail of a hybrid mass-timber and concrete structural floor plate under construction, exposed cross-laminated timber panels sitting on concrete post-tensioned slab, warm amber interior construction lighting at 3000K glowing between floors, shot on 50mm lens f/2.0, sharp timber grain texture in foreground, concrete columns disappearing into dark background, craft and precision atmosphere, editorial architectural photography, tech campus construction Sydney, --ar 9:16 --style raw --v 6.1 --q 2
```

---

## 8 — Western Sydney Airport Project Card

**Path:** `/public/images/projects/western-sydney-airport.webp`
**Aspect ratio:** 9:16
**Usage:** Project card hero, Beat 4 — infrastructure scale

### Midjourney Prompt

```
vast airport terminal infrastructure under construction at sunrise, enormous post-tensioned concrete roof canopy spanning hundreds of metres, warm 3800K orange dawn light raking horizontally across the underside of the concrete structure, dramatic shadow play on the coffered slab soffit, shot on 24mm wide lens f/5.6 for depth, foreground construction equipment silhouettes, monumental engineering scale, cinematic golden light, Badgerys Creek NSW context, --ar 9:16 --style raw --v 6.1 --q 2
```

---

## 9 — Cable X-Ray Overlay

**Path:** `/public/images/projects/cables/overlay.webp`
**Aspect ratio:** 16:9 (1920×1080)
**Usage:** `mix-blend-mode: screen` overlay on project cards at 60% opacity on hover — reveals "hidden" cable network inside the building

### How It Works
This image uses `mix-blend-mode: screen` — the **black areas disappear** and only the light amber cable network shows through. The image must be:
- **Pure black background** (#000000)
- **Amber/gold glowing cable lines** (#D4A537 → #FFD080 with glow)

### Midjourney Prompt

```
technical schematic x-ray diagram of post-tensioning cable tendons running through a concrete floor slab, viewed from above as a flat plan drawing, glowing amber and gold cable lines on pure black background, 7-wire strand bundles shown in cross-section and longitudinal profile, engineering blueprint aesthetic, cables radiate outward from anchor points in geometric tension patterns, soft radial glow around each cable filament, luminous amber light on pure black, no text, no dimensions, no annotations, purely glowing structural cable geometry, --ar 16:9 --style raw --v 6.1 --q 2
```

### Photoshop Post-Processing (Required)
1. Open Midjourney output
2. Image → Adjustments → Curves → pull black point to pure 0,0,0
3. Hue/Saturation → Colorize → Hue 38 (amber), Saturation 85
4. Gaussian Blur (0.5px) on a duplicate layer blended with Screen for soft glow
5. Export as WebP, quality 85
6. Verify: hold Shift in browser DevTools → toggle blend mode manually

---

## 10 — Fahed Nassif Portrait

**Path:** `/public/images/team/fahed.webp`
**Aspect ratio:** 3:4 portrait (900×1200)
**Usage:** TheBrothers Beat 5 — appears at 40% opacity on card hover over initial watermark

> **Preferred:** Real photograph of Fahed Nassif. Use the Midjourney prompt below only if a real photo is unavailable.

### Midjourney Placeholder Prompt

```
professional portrait of a Lebanese-Australian male civil engineer in his late 30s, confident and composed, wearing a dark charcoal business shirt, industrial construction site in soft focus background, dramatic single side-key light at 4200K from left creating strong facial shadow, shot on 85mm lens f/1.8, sharp eyes in focus, dark background, editorial magazine portrait style, premium architectural firm aesthetic, no smile — serious professional authority, --ar 3:4 --style raw --v 6.1 --q 2
```

### Photo Direction (Real Shoot)
- Location: TRD site or industrial/concrete environment
- Wardrobe: dark charcoal or black shirt, no tie
- Lighting: single Profoto key from 45° left, black reflector fill (ratio 3:1)
- Expression: composed authority, direct eye contact
- Lens: 85mm f/1.8, background at minimum 3m distance
- Grade: desaturate background, warm face tones to 4000K

---

## 11 — Christopher Nassif Portrait

**Path:** `/public/images/team/christopher.webp`
**Aspect ratio:** 3:4 portrait (900×1200)
**Usage:** TheBrothers Beat 5

> **Preferred:** Real photograph of Christopher Nassif.

### Midjourney Placeholder Prompt

```
professional portrait of a Lebanese-Australian male architect in his mid-30s, thoughtful and precise, wearing a black turtleneck, modern architecture studio background in soft focus, dramatic window light at 5000K from right side, shot on 85mm lens f/1.8, architectural drawings faintly visible in background, editorial portrait photography, premium design firm aesthetic, direct gaze, no smile, intellectual authority, --ar 3:4 --style raw --v 6.1 --q 2
```

---

## 12 — Charly Nassif Portrait

**Path:** `/public/images/team/charly.webp`
**Aspect ratio:** 3:4 portrait (900×1200)
**Usage:** TheBrothers Beat 5

> **Preferred:** Real photograph of Charly Nassif.

### Midjourney Placeholder Prompt

```
professional portrait of a Lebanese-Australian male managing director in his early 30s, commanding presence, wearing a dark navy suit jacket open collar, modern Sydney CBD office background in soft focus, dramatic overhead and side light at 3800K, shot on 85mm lens f/1.8, strong direct eye contact, premium business editorial portrait style, confident energy, no smile — decisive authority, --ar 3:4 --style raw --v 6.1 --q 2
```

---

## 13 — Mobile Pour Loop Video

**Path:** `/public/videos/pour-loop.mp4`
**Specs:** 15s loop · 1080×1920 (portrait for mobile) · H.264 · max 8MB · no audio
**Usage:** Beat 2 mobile fallback — replaces the WebGL PourShader on screens < 768px

### Primary Tool: Veo 3

```
slow motion macro footage of liquid concrete being poured over post-tensioning steel cable strands on a construction site, amber warm construction lighting at 3600K, concrete cascading across 7-wire strand tendons revealing the steel beneath, shot at 0.3x speed, 100mm macro lens f/2.0, shallow depth of field with cable sharp and concrete blur in motion, amber glowing light catching the wet concrete surface, heavy industrial atmosphere, seamlessly loopable 15 seconds, no people in frame, cinematic dark mood
```

### Alternative Tool: Kling 2.6 (cheaper, for iteration)

```
cinematic slow-motion close-up of concrete pour over steel reinforcement cables, warm amber industrial lighting, macro lens, loopable, dark industrial mood, 3600K colour temperature, post-tensioning tendons visible beneath wet concrete, 15 seconds
```

### Technical Requirements
1. Export at 1080×1920 (portrait) for mobile
2. Compress with HandBrake: CRF 28, H.264, AAC audio removed
3. The last frame must match the first frame for seamless loop
4. Verify loop in VLC before deploying
5. Place at `/public/videos/pour-loop.mp4`

### Implementation Note
The video is already wired in `ThePour.tsx` — once the file exists at the correct path, it will automatically replace the WebGL shader on mobile (`< 768px`).

> To implement mobile fallback, add to `ThePour.tsx` inside the sticky container:
> ```tsx
> <video
>   className="md:hidden absolute inset-0 w-full h-full object-cover"
>   src="/videos/pour-loop.mp4"
>   autoPlay muted loop playsInline
> />
> ```

---

## Delivery Checklist

- [ ] 3 × service photos WebP 1920×1080
- [ ] 5 × project photos WebP 1080×1920 (portrait)
- [ ] 1 × cable overlay WebP 1920×1080 (black bg, amber lines)
- [ ] 3 × team portraits WebP 900×1200 (real preferred, AI placeholder acceptable)
- [ ] 1 × pour loop MP4 1080×1920 portrait, ≤8MB, seamless loop
- [ ] All images compressed through `squoosh.app` or `sharp` CLI before committing
- [ ] Verify no image exceeds 400KB (project cards) or 600KB (service full-bleed)
