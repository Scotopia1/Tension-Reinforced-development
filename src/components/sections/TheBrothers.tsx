"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, STAGGER } from "@/lib/motion";
import RevealText from "@/components/ui/RevealText";

const TEAM = [
  {
    initial: "F",
    name: "Fahed Nassif",
    role: "Director · Principal Engineer",
    years: "15",
    qual: "Bachelor of Civil Engineering (ABET Accredited)",
    memb: "MIEAust · Order of Engineers & Architects",
    portrait: "/images/team/fahed.webp",
  },
  {
    initial: "C",
    name: "Christopher Nassif",
    role: "Director · Architect",
    years: "12",
    qual: "Bachelor of Architecture (Honours)",
    memb: "Order of Engineers & Architects",
    portrait: "/images/team/christopher.webp",
  },
  {
    initial: "Ch",
    name: "Charly Nassif",
    role: "Managing Director",
    years: "10",
    qual: "Bachelor of Construction Management & Property",
    memb: "Licensed Builder NSW & ACT",
    portrait: "/images/team/charly.webp",
  },
];

type TeamMember = (typeof TEAM)[number];

function BrotherCard({ member: t }: { member: TeamMember }) {
  return (
    <article className="group relative overflow-hidden bg-dark-surface min-h-[420px] p-8 md:p-10 cursor-default">
      {/* Portrait photograph — revealed on hover */}
      <Image
        src={t.portrait}
        alt={t.name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-700"
        unoptimized
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />

      {/* Dark gradient over portrait */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Giant initial watermark */}
      <div
        className="absolute -top-4 -right-4 font-display leading-none select-none pointer-events-none text-amber/[0.06] group-hover:text-amber/[0.02] transition-colors duration-700"
        style={{ fontSize: "18rem" }}
        aria-hidden="true"
      >
        {t.initial}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber mb-auto">
          {t.role}
        </p>

        <div className="mt-auto">
          <h3 className="font-display text-3xl md:text-4xl text-bone leading-none mb-6 mt-8">
            {t.name}
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] tracking-widest text-ash uppercase w-20 shrink-0">
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
              <span className="text-steel text-sm leading-relaxed">
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
  );
}

export default function TheBrothers() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".brothers-grid article", {
        y: 60,
        autoAlpha: 0,
        stagger: STAGGER.base,
        duration: DURATION.slow,
        ease: EASE.steel,
        scrollTrigger: { trigger: ".brothers-grid", start: "top 75%" },
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
        {/* Heading — NO section label; this IS the label */}
        <h2
          className="font-display uppercase leading-[0.88] mb-20 md:mb-28"
          style={{ fontSize: "clamp(2.8rem, 7vw, 8rem)" }}
        >
          <RevealText block trigger="self" start="top 80%">
            Three Brothers.
          </RevealText>
          <span className="text-amber">
            <RevealText block trigger="self" start="top 75%" delay={0.18}>
              One Structure.
            </RevealText>
          </span>
        </h2>

        {/* Grid */}
        <div className="brothers-grid grid grid-cols-1 md:grid-cols-3 gap-px bg-dark-border">
          {TEAM.map((t) => (
            <BrotherCard key={t.name} member={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
