"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { DURATION, EASE } from "@/lib/motion";

const PourCanvas = dynamic(() => import("@/components/three/PourCanvas"), { ssr: false });

export default function ThePour() {
  const ref      = useRef<HTMLElement>(null);
  const spec1Ref = useRef<HTMLDivElement>(null);
  const spec2Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const shown = { s1: false, s2: false, l1: false, l2: false };

    ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;

        // Write to CSS var so PourShader reads it each frame
        document.documentElement.style.setProperty(
          "--pour-progress",
          p.toFixed(4)
        );

        if (p > 0.27 && !shown.s1) {
          shown.s1 = true;
          gsap.to(spec1Ref.current, {
            autoAlpha: 1,
            x: 0,
            duration: DURATION.base,
            ease: EASE.steel,
          });
        }
        if (p > 0.47 && !shown.s2) {
          shown.s2 = true;
          gsap.to(spec2Ref.current, {
            autoAlpha: 1,
            x: 0,
            duration: DURATION.base,
            ease: EASE.steel,
          });
        }
        if (p > 0.67 && !shown.l1) {
          shown.l1 = true;
          gsap.to(line1Ref.current, {
            autoAlpha: 1,
            y: 0,
            duration: DURATION.slow,
            ease: EASE.steel,
          });
        }
        if (p > 0.87 && !shown.l2) {
          shown.l2 = true;
          gsap.to(line2Ref.current, {
            autoAlpha: 1,
            y: 0,
            duration: DURATION.slow,
            ease: EASE.steel,
          });
        }
      },
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      id="the-pour"
      data-bg="#0A0A0A"
      className="relative bg-dark"
      style={{ height: "350vh" }}
      aria-label="The invisible made visible"
    >
      {/* Sticky viewport — 100vh, houses canvas + all overlays */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* WebGL dissolution shader */}
        <div className="absolute inset-0" aria-hidden="true">
          <PourCanvas />
        </div>

        {/* Spec label 1 — 7-Wire */}
        <div
          ref={spec1Ref}
          className="absolute top-[28%] left-6 md:left-16 font-mono text-[10px] tracking-[0.45em] uppercase text-amber pointer-events-none"
          style={{ opacity: 0, transform: "translateX(-24px)" }}
          aria-hidden="true"
        >
          7-Wire Strand
        </div>

        {/* Spec label 2 — dimensions */}
        <div
          ref={spec2Ref}
          className="absolute top-[36%] left-6 md:left-16 font-mono text-[10px] tracking-[0.45em] uppercase text-amber pointer-events-none"
          style={{ opacity: 0, transform: "translateX(-24px)" }}
          aria-hidden="true"
        >
          15.2mm — 1860 MPa Tensile Strength
        </div>

        {/* Amber hairline rule above reveal text */}
        <div className="absolute bottom-[22%] left-6 md:left-16 w-8 h-px bg-amber/50 pointer-events-none" aria-hidden="true" />

        {/* Reveal headline — line 1 */}
        <div
          ref={line1Ref}
          className="absolute bottom-[14%] left-6 md:left-16 pointer-events-none"
          style={{ opacity: 0, transform: "translateY(32px)" }}
        >
          <h2
            className="font-display text-bone uppercase leading-[0.88]"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)" }}
          >
            This is what holds it up.
          </h2>
        </div>

        {/* Reveal headline — line 2 */}
        <div
          ref={line2Ref}
          className="absolute bottom-[6%] left-6 md:left-16 pointer-events-none"
          style={{ opacity: 0, transform: "translateY(32px)" }}
        >
          <h2
            className="font-display text-amber uppercase leading-[0.88]"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)" }}
          >
            You just couldn't see it.
          </h2>
        </div>
      </div>
    </section>
  );
}
