"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE } from "@/lib/motion";

export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const obj = { v: 0 };
      const arcLength = 2 * Math.PI * 90;

      // Initialize arc as fully hidden
      gsap.set(arcRef.current, {
        strokeDasharray: arcLength,
        strokeDashoffset: arcLength,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          // Reveal mask outwards, fade root, then unmount
          gsap
            .timeline({ onComplete: () => setDone(true) })
            .to(".loader-mask", {
              clipPath: "inset(0 0 0 0)",
              duration: DURATION.hero,
              ease: "expo.inOut",
            })
            .to(
              rootRef.current,
              { autoAlpha: 0, duration: DURATION.fast, ease: EASE.in },
              "-=0.3"
            );
        },
      });

      tl.to(obj, {
        v: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(obj.v).toString().padStart(3, "0");
          }
          if (arcRef.current) {
            const offset = arcLength - (arcLength * obj.v) / 100;
            arcRef.current.style.strokeDashoffset = String(offset);
          }
        },
      });

      tl.to(".loader-letter", {
        y: -10,
        opacity: 1,
        stagger: 0.05,
        duration: DURATION.fast,
        ease: EASE.out,
      }, 0.2);
    },
    { scope: rootRef }
  );

  // Lock body scroll while loader is up
  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      {/* Mask covering hero — clips outward */}
      <div
        className="loader-mask absolute inset-0 bg-dark"
        style={{ clipPath: "inset(0 0 0 0)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Counter + Arc */}
        <div className="relative w-[220px] h-[220px] flex items-center justify-center">
          <svg className="absolute inset-0" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="var(--color-dark-border)"
              strokeWidth="1"
            />
            <circle
              ref={arcRef}
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="var(--color-amber)"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
          </svg>
          <span
            ref={counterRef}
            className="font-display text-6xl text-cream tabular-nums"
          >
            000
          </span>
        </div>

        {/* TRD letters */}
        <div className="flex gap-3 overflow-hidden">
          {["T", "R", "D"].map((l) => (
            <span
              key={l}
              className="loader-letter font-display text-3xl tracking-[0.3em] text-amber"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              {l}
            </span>
          ))}
        </div>
        <p className="text-ash text-xs tracking-[0.3em] uppercase">
          Tension Reinforced Developments
        </p>
      </div>
    </div>
  );
}
