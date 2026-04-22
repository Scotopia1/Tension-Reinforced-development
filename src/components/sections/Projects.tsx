"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const PROJECTS = [
  { n: "01", name: "Florence & Capri", builder: "Mascon", loc: "Wentworth Point, NSW", value: "$520M", year: "2025", desc: "Two residential towers up to 15 storeys, 155 premium apartments, resort-style amenities.", image: "/images/construction-aerial.png" },
  { n: "02", name: "Archibald Gosford", builder: "ALAND", loc: "Gosford, NSW", value: "$400M", year: "2025", desc: "Mixed-use landmark redefining luxury living with premium residential and commercial spaces.", image: "/images/truck-crane.png" },
  { n: "03", name: "Paramount on Parkes", builder: "ALAND", loc: "Parramatta, NSW", value: "$357M", year: "2024", desc: "46-level landmark with 331 apartments and 3,000+ sqm of premium commercial space.", image: "/images/hero-truck.jpg" },
  { n: "04", name: "Garden Island Naval Base", builder: "Lendlease", loc: "Woolloomooloo, NSW", value: "$286M", year: "2020", desc: "Critical infrastructure upgrades to Australia's principal east coast naval base.", image: "/images/construction-workers.png" },
  { n: "05", name: "Jasmine Schofields", builder: "ALAND", loc: "Schofields, NSW", value: "$272M", year: "2025", desc: "405 apartments across three low-rise buildings in a master-planned community.", image: "/images/construction-aerial.png" },
  { n: "06", name: "Balfour Place", builder: "Conquest", loc: "Lindfield, NSW", value: "$180M", year: "2024", desc: "Mixed-use development with 59 premium apartments and expanded retail spaces.", image: "/images/truck-crane.png" },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Sticky title scale-fade as user scrolls through cards
      gsap.to(".projects-title", {
        scale: 0.92,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom 80%",
          scrub: 1.5,
        },
      });

      // Cards stream in on enter
      gsap.utils.toArray<HTMLElement>(".proj-card").forEach((card, i) => {
        gsap.from(card, {
          y: 120,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          delay: (i % 2) * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });

      // Parallax image within each card (quickSetter)
      const cards = gsap.utils.toArray<HTMLElement>(".proj-card");
      cards.forEach((card) => {
        const img = card.querySelector<HTMLDivElement>(".proj-img");
        if (!img) return;
        gsap.to(img, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="projects"
      data-bg="#1A140E"
      className="relative bg-dark-surface"
    >
      <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Sticky title column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <div className="projects-title origin-left">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber/70 mb-6 flex items-center gap-3">
                <span className="w-6 h-px bg-amber/50" />
                04 — Work of record
              </p>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.9] mb-8">
                Proof in
                <br />
                <span className="text-amber">concrete.</span>
              </h2>
              <p className="text-steel text-base md:text-lg leading-relaxed max-w-md mb-10">
                Over $2 billion in project value delivered across residential,
                commercial, and critical infrastructure. A selection.
              </p>
              <div className="flex items-center gap-4 font-mono text-xs text-ash tracking-[0.2em] uppercase">
                <span className="w-8 h-px bg-amber/30" />
                6 of 200+
              </div>
            </div>
          </div>

          {/* Cards column */}
          <div className="lg:col-span-8 space-y-16 md:space-y-24">
            {PROJECTS.map((p, i) => (
              <article
                key={p.n}
                className={`proj-card group relative ${i % 2 === 1 ? "lg:translate-x-10" : ""}`}
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <div
                    className="proj-img absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-700 group-hover:scale-125"
                    style={{ backgroundImage: `url(${p.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                  {/* Top-right value tag */}
                  <div className="absolute top-5 right-5 bg-amber text-dark px-3 py-1.5 font-mono text-xs tracking-wider">
                    {p.value}
                  </div>
                  {/* Number */}
                  <div className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.4em] uppercase text-cream/80">
                    {p.n} / {p.year}
                  </div>
                  {/* Footer overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-amber mb-2">
                      {p.builder}
                    </p>
                    <h3 className="font-display text-3xl md:text-5xl text-cream leading-none mb-2">
                      {p.name}
                    </h3>
                    <p className="text-ash text-xs md:text-sm">{p.loc}</p>
                  </div>
                </div>

                <p className="text-steel text-sm md:text-base leading-relaxed mt-6 max-w-2xl">
                  {p.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
