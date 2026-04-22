"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import RevealText from "@/components/ui/RevealText";

const SERVICES = [
  {
    index: "01",
    name: "Post-Tensioning",
    description:
      "We design and install high-strength tendon systems that allow concrete to carry loads it would otherwise never survive. Every structure we touch carries our name inside it.",
    image: "/images/services/post-tensioning.webp",
    rust: false,
  },
  {
    index: "02",
    name: "Steel Fixing",
    description:
      "Precise placement of reinforcement steel is the difference between a structure that performs and one that doesn't. Our fixers operate with zero-tolerance accuracy on every pour.",
    image: "/images/services/steel-fixing.webp",
    rust: false,
  },
  {
    index: "03",
    name: "Structural Remedial",
    description:
      "When concrete fails or corrodes, the invisible becomes critical. We diagnose, engineer, and restore structural integrity — often without a single day of downtime.",
    image: "/images/services/structural-remedial.webp",
    rust: true,
  },
];

export default function TheWork() {
  const ref = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Service entry entrances
      SERVICES.forEach((_, i) => {
        const entry = ref.current!.querySelector(`.service-entry-${i}`);
        if (!entry) return;
        gsap.from(entry, {
          y: 80,
          autoAlpha: 0,
          duration: DURATION.slow,
          ease: EASE.steel,
          scrollTrigger: { trigger: entry, start: "top 78%" },
        });
      });

      // Image clip-path reveals (scrub)
      ref.current!.querySelectorAll(".service-img-wrap").forEach((wrap) => {
        gsap.fromTo(
          wrap,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      });

      // $2B+ counter
      if (counterRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 2,
          duration: DURATION.cinematic,
          ease: "power2.out",
          scrollTrigger: { trigger: counterRef.current, start: "top 80%" },
          onUpdate: () => {
            if (counterRef.current)
              counterRef.current.textContent = obj.val.toFixed(1);
          },
        });
      }

      void STAGGER; // imported per convention
      void ScrollTrigger;
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="the-work"
      data-bg="#0E1620"
      className="relative bg-dark py-24 md:py-40"
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        {/* Section label */}
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber/70 mb-20 md:mb-28 flex items-center gap-3">
          <span className="w-6 h-px bg-amber/50" />
          03 — The Work
        </p>

        {/* Service entries */}
        <div className="space-y-28 md:space-y-40">
          {SERVICES.map((s, i) => (
            <div key={s.name} className={`service-entry-${i}`}>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 md:gap-20">
                {/* Left: index + text */}
                <div>
                  <p
                    className="font-display leading-none mb-4 tabular-nums"
                    style={{
                      fontSize: "clamp(5rem, 10vw, 8rem)",
                      color: s.rust ? "#8B3A1F" : "rgb(var(--color-amber) / 1)",
                    }}
                    aria-hidden="true"
                  >
                    {s.index}
                  </p>
                  <h2
                    className="font-display text-bone uppercase leading-[0.9] mb-6"
                    style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
                  >
                    {s.name}
                  </h2>
                  <p className="text-steel text-base leading-relaxed max-w-[480px]">
                    {s.description}
                  </p>
                </div>

                {/* Right: image */}
                <div
                  className="service-img-wrap w-full overflow-hidden bg-dark-surface"
                  style={{ height: "60vh", clipPath: "inset(100% 0 0 0)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover opacity-60"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* $2B+ stat */}
        <div className="mt-32 md:mt-48 border-t border-dark-border pt-16 md:pt-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p
                className="font-display text-bone leading-none tabular-nums"
                style={{ fontSize: "clamp(5rem, 12vw, 13rem)" }}
              >
                $<span ref={counterRef}>0.0</span>B+
              </p>
              <p className="font-display text-amber/60 uppercase text-xl mt-2">
                Delivered
              </p>
            </div>
            <div className="space-y-2 text-right">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-ash">
                148 Projects
              </p>
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-ash">
                Sydney NSW
              </p>
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-ash">
                Since 2017
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
