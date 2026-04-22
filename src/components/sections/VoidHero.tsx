"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE } from "@/lib/motion";
import RevealText from "@/components/ui/RevealText";

const VoidCanvas = dynamic(() => import("@/components/three/VoidCanvas"), { ssr: false });

export default function VoidHero() {
  const ref       = useRef<HTMLElement>(null);
  const labelRef  = useRef<HTMLParagraphElement>(null);
  const lineRef   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Label floats in 3.2 s after load
    gsap.from(labelRef.current, {
      autoAlpha: 0,
      y: 10,
      duration: DURATION.base,
      ease: EASE.out,
      delay: 3.2,
    });

    // Scroll indicator — infinite scaleY pulse
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        duration: 1.1,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        delay: 3.6,
      }
    );
  }, { scope: ref });

  return (
    <section
      ref={ref}
      id="hero"
      data-bg="#0A0A0A"
      className="relative w-full h-screen overflow-hidden bg-dark"
      aria-label="TRD Group — The Structure Beneath Everything"
    >
      {/* WebGL cable canvas — behind everything */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <VoidCanvas />
      </div>

      {/* Headline — lower third of viewport */}
      <div className="relative z-10 flex flex-col justify-end h-full max-w-[1480px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <h1 className="font-display uppercase leading-[0.88]">
          <span
            className="block text-bone"
            style={{ fontSize: "clamp(3rem, 9.2vw, 9rem)" }}
          >
            <RevealText
              trigger="load"
              duration={DURATION.cinematic}
              stagger={0.08}
              delay={0.3}
              ease={EASE.steel}
              block
            >
              The Structure
            </RevealText>
          </span>

          <span
            className="block text-bone"
            style={{ fontSize: "clamp(3rem, 9.2vw, 9rem)" }}
          >
            <RevealText
              trigger="load"
              duration={DURATION.cinematic}
              stagger={0.08}
              delay={0.55}
              ease={EASE.steel}
              block
            >
              Beneath
            </RevealText>
          </span>

          <span
            className="block text-amber"
            style={{ fontSize: "clamp(3rem, 9.2vw, 9rem)" }}
          >
            <RevealText
              trigger="load"
              duration={DURATION.cinematic}
              stagger={0.08}
              delay={0.75}
              ease={EASE.steel}
              block
            >
              Everything.
            </RevealText>
          </span>
        </h1>
      </div>

      {/* Bottom-left meta label */}
      <p
        ref={labelRef}
        className="absolute bottom-8 left-6 md:left-12 font-mono text-[10px] tracking-[0.4em] uppercase text-ash"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        Post-Tensioning Specialists — Sydney, NSW — Est. 2017
      </p>

      {/* Bottom-right scroll indicator */}
      <div
        className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-ash/60 mb-1">
          Scroll
        </span>
        <div
          ref={lineRef}
          className="w-px h-10 bg-amber"
          style={{ transform: "scaleY(0)", transformOrigin: "top center" }}
        />
      </div>
    </section>
  );
}
