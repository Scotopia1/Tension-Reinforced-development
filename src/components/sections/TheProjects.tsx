"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { DURATION, EASE, STAGGER } from "@/lib/motion";

const PROJECTS = [
  {
    name: "One Circular Quay",
    location: "Sydney CBD, NSW",
    scale: "72-storey residential tower",
    image: "/images/projects/one-circular-quay.webp",
  },
  {
    name: "Parramatta Square",
    location: "Parramatta, NSW",
    scale: "Mixed-use 68,000 m² precinct",
    image: "/images/projects/parramatta-square.webp",
  },
  {
    name: "Crown Residences",
    location: "Barangaroo, NSW",
    scale: "275 m supertall — highest PT slab in Australia",
    image: "/images/projects/crown-residences.webp",
  },
  {
    name: "Atlassian HQ",
    location: "Tech Central, Sydney",
    scale: "40-storey hybrid timber-concrete tower",
    image: "/images/projects/atlassian.webp",
  },
  {
    name: "Western Sydney Airport",
    location: "Badgerys Creek, NSW",
    scale: "Post-tensioned terminal infrastructure",
    image: "/images/projects/western-sydney-airport.webp",
  },
];

export default function TheProjects() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();

      // Desktop: horizontal scroll pin
      mm.add("(min-width: 768px)", () => {
        const totalWidth = track.scrollWidth - window.innerWidth;

        ScrollTrigger.create({
          trigger: ref.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          animation: gsap.to(track, {
            x: -totalWidth,
            ease: "none",
          }),
        });

        return () => {
          gsap.set(track, { x: 0 });
        };
      });

      // Mobile: stagger entrance
      mm.add("(max-width: 767px)", () => {
        gsap.from(".project-card", {
          y: 60,
          autoAlpha: 0,
          stagger: STAGGER.base,
          duration: DURATION.slow,
          ease: EASE.steel,
          scrollTrigger: { trigger: track, start: "top 80%" },
        });
      });

      void ScrollTrigger;
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="projects"
      data-bg="#100E0A"
      className="relative bg-dark overflow-hidden"
    >
      {/* Section label — visible above the scroll track */}
      <div className="absolute top-8 left-6 md:left-12 z-20 pointer-events-none">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber/70 flex items-center gap-3">
          <span className="w-6 h-px bg-amber/50" />
          04 — Projects
        </p>
      </div>

      {/* Desktop: horizontal track */}
      <div className="hidden md:block w-full h-screen">
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${PROJECTS.length * 80}vw` }}
        >
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              className="project-card group relative flex-none w-[80vw] h-full overflow-hidden"
            >
              {/* Background image */}
              <div className="absolute inset-0 bg-dark-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-700"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              {/* X-ray cable overlay — revealed on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                style={{ mixBlendMode: "screen" }}
                aria-hidden="true"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/projects/cables/overlay.webp"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />

              {/* Card content */}
              <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14">
                <p
                  className="font-mono text-[10px] tracking-[0.4em] uppercase text-amber/60 mb-4"
                  aria-hidden="true"
                >
                  0{i + 1}
                </p>
                <h3
                  className="font-display text-bone uppercase leading-[0.9] mb-4"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)" }}
                >
                  {p.name}
                </h3>
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-ash mb-1">
                  {p.location}
                </p>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-steel/60">
                  {p.scale}
                </p>
              </div>

              {/* Right border separator */}
              {i < PROJECTS.length - 1 && (
                <div className="absolute right-0 top-0 bottom-0 w-px bg-dark-border/60" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden pt-20 pb-12 px-6 space-y-px">
        {PROJECTS.map((p, i) => (
          <div
            key={p.name}
            className="project-card group relative w-full overflow-hidden bg-dark-surface"
            style={{ height: "60vw" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-cover opacity-50"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-amber/60 mb-2">
                0{i + 1}
              </p>
              <h3 className="font-display text-bone text-2xl uppercase leading-none mb-2">
                {p.name}
              </h3>
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-ash">
                {p.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
