"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SERVICES = [
  {
    num: "01",
    title: "Post-Tensioning",
    tag: "Design · Supply · Install",
    description:
      "Enhance structural strength, reduce construction time, and maximise design flexibility — across high-rise residential, commercial, and critical infrastructure.",
    features: [
      "Unbonded & bonded systems",
      "End-to-end project delivery",
      "Licensed PE on staff",
      "PTI-certified tooling",
    ],
    image: "/images/construction-aerial.png",
    accent: "text-amber",
    ruleColor: "bg-amber",
  },
  {
    num: "02",
    title: "Steel Fixing",
    tag: "Precision reinforcement",
    description:
      "Walls, foundations, stairs, groundworks, slabs. Quality steel fixing across every sector — residential, commercial, industrial, infrastructure.",
    features: [
      "Full-scale reinforcement",
      "Complex structural geometry",
      "Safety-first methodology",
      "Seamless trade coordination",
    ],
    image: "/images/construction-workers.png",
    accent: "text-cream",
    ruleColor: "bg-cream",
  },
  {
    num: "03",
    title: "Structural Remedial",
    tag: "Repair. Strengthen. Recover.",
    description:
      "Carbon fibre systems, steel strengthening, crack injection, slab scanning, structural alterations, and carpark utilities — bringing structures back to spec.",
    features: [
      "Carbon fibre strengthening",
      "Concrete crack injection",
      "Structural diagnostics",
      "Non-destructive assessment",
    ],
    image: "/images/truck-crane.png",
    accent: "text-rust-hover",
    ruleColor: "bg-rust",
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pinned horizontal scroll across 3 panels
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        if (!track) return;
        const totalWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        const distance = totalWidth - windowWidth;

        const scrollTween = gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            pin: true,
            start: "top top",
            end: () => `+=${distance}`,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Parallax title tied to horizontal tween
        gsap.utils.toArray<HTMLElement>(".service-panel").forEach((panel) => {
          const title = panel.querySelector(".service-title");
          const copy = panel.querySelector(".service-copy");
          if (title) {
            gsap.from(title, {
              y: 80,
              autoAlpha: 0,
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 80%",
                toggleActions: "play none none reverse",
              },
            });
          }
          if (copy) {
            gsap.from(copy, {
              y: 30,
              autoAlpha: 0,
              duration: 0.8,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left 70%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      });

      // Mobile / reduced motion: stagger reveal per card
      mm.add(
        "(max-width: 1023px), (prefers-reduced-motion: reduce)",
        () => {
          gsap.from(".service-panel", {
            y: 80,
            autoAlpha: 0,
            stagger: 0.2,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: ref.current, start: "top 75%" },
          });
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="services"
      data-bg="#0A0A0A"
      className="relative lg:h-screen lg:overflow-hidden bg-dark"
      aria-label="Services"
    >
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row lg:w-[300vw] lg:h-screen"
      >
        {SERVICES.map((s) => (
          <div
            key={s.num}
            className="service-panel relative lg:w-screen lg:h-screen flex flex-col lg:flex-row border-b lg:border-b-0 lg:border-r border-dark-border"
          >
            {/* Image half */}
            <div className="relative lg:w-1/2 h-[50vh] lg:h-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center scale-110"
                style={{ backgroundImage: `url(${s.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark/50 lg:from-transparent to-dark/80 lg:to-dark" />

              {/* Number watermark */}
              <div className="absolute top-10 left-10 font-mono text-[10px] tracking-[0.4em] uppercase text-amber/70">
                Service / {s.num}
              </div>
              <div className="absolute bottom-10 left-10 font-display text-[18vw] lg:text-[14vw] leading-none text-cream/[0.12] select-none pointer-events-none">
                {s.num}
              </div>
            </div>

            {/* Copy half */}
            <div className="relative lg:w-1/2 lg:h-full flex flex-col justify-center p-10 md:p-16 lg:p-20 bg-dark-surface">
              <p
                className={`service-copy font-mono text-[10px] tracking-[0.4em] uppercase ${s.accent} mb-6 flex items-center gap-3`}
              >
                <span className={`inline-block w-8 h-px ${s.ruleColor}`} />
                {s.tag}
              </p>
              <h2 className="service-title font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.9] mb-8">
                {s.title}
              </h2>
              <p className="service-copy text-steel text-base md:text-lg leading-relaxed mb-10 max-w-lg">
                {s.description}
              </p>

              <ul className="service-copy grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-lg">
                {s.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-cream/90"
                  >
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full ${s.ruleColor} flex-shrink-0`}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
