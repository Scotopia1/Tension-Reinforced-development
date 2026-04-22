"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const TEAM = [
  {
    i: "F",
    name: "Fahed Nassif",
    role: "Director · Principal Engineer",
    years: "15",
    qual: "Bachelor of Civil Engineering (ABET Accredited)",
    memb: "MIEAust · Order of Engineers & Architects",
  },
  {
    i: "C",
    name: "Christopher Nassif",
    role: "Director · Architect",
    years: "12",
    qual: "Bachelor of Architecture (Honours)",
    memb: "Order of Engineers & Architects",
  },
  {
    i: "Ch",
    name: "Charly Nassif",
    role: "Managing Director",
    years: "10",
    qual: "Bachelor of Construction Management & Property",
    memb: "Licensed Builder (ACT & NSW)",
  },
];

export default function Team() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".team-title", {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });

      gsap.from(".team-card", {
        y: 120,
        autoAlpha: 0,
        rotateX: 15,
        stagger: 0.15,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".team-grid", start: "top 75%" },
      });

      // Hover reveal — enlarge initial, dim siblings
      ref.current?.querySelectorAll<HTMLElement>(".team-card").forEach((card) => {
        const init = card.querySelector<HTMLElement>(".team-initial");
        if (!init) return;
        card.addEventListener("mouseenter", () => {
          gsap.to(init, { scale: 1.15, duration: 0.6, ease: "expo.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(init, { scale: 1, duration: 0.6, ease: "expo.out" });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="team"
      data-bg="#14100A"
      className="relative py-24 md:py-32 bg-dark overflow-hidden"
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        <div className="team-title mb-16 md:mb-24 max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber/70 mb-6 flex items-center gap-3">
            <span className="w-6 h-px bg-amber/50" />
            07 — The leadership
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] text-cream leading-[0.9] mb-6">
            Three brothers.
            <br />
            <span className="text-amber">One structure.</span>
          </h2>
          <p className="text-steel text-base md:text-lg leading-relaxed max-w-xl">
            As brothers, we share a common goal — best practice across the sector.
            Always seeking innovative solutions with an eye on reshaping the
            industry we love.
          </p>
        </div>

        <div className="team-grid grid grid-cols-1 md:grid-cols-3 gap-px bg-dark-border">
          {TEAM.map((t) => (
            <article
              key={t.name}
              className="team-card group relative bg-dark-surface p-8 md:p-10 overflow-hidden transition-colors duration-500 hover:bg-dark-elevated"
              style={{ perspective: "1000px" }}
            >
              {/* Huge initial as watermark */}
              <div className="team-initial absolute -top-4 -right-4 font-display text-[18rem] md:text-[22rem] text-amber/[0.06] leading-none pointer-events-none select-none transition-colors duration-500 group-hover:text-amber/20">
                {t.i}
              </div>

              <div className="relative flex flex-col h-full min-h-[360px]">
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber mb-10">
                  {t.role}
                </p>

                <div className="mt-auto">
                  <h3 className="font-display text-4xl md:text-5xl text-cream mb-4 leading-none">
                    {t.name}
                  </h3>

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] tracking-widest text-ash uppercase w-20">
                        Years
                      </span>
                      <span className="font-display text-2xl text-amber tabular-nums">
                        {t.years}
                      </span>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-[10px] tracking-widest text-ash uppercase w-20 shrink-0 pt-0.5">
                        Qual
                      </span>
                      <span className="text-steel leading-relaxed">
                        {t.qual}
                      </span>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-[10px] tracking-widest text-ash uppercase w-20 shrink-0 pt-0.5">
                        Memb
                      </span>
                      <span className="text-ash text-xs leading-relaxed">
                        {t.memb}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
