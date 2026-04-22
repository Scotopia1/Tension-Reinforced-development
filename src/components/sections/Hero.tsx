"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import FrameSequence from "../ui/FrameSequence";
import RevealText from "../ui/RevealText";
import NoiseOverlay from "../ui/NoiseOverlay";

/** Hero — pinned, frame-scrubbed cinematic + industrial-ease type reveal. */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [manifest, setManifest] = useState<{
    count: number;
    pattern?: string;
  } | null>(null);

  useEffect(() => {
    fetch("/frames/hero/manifest.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.count) setManifest({ count: d.count, pattern: d.pattern });
        else setManifest({ count: 0 });
      })
      .catch(() => setManifest({ count: 0 }));
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(contentRef.current, {
          y: -100,
          opacity: 0,
          filter: "blur(6px)",
          scrollTrigger: {
            trigger: ref.current,
            start: "12% top",
            end: "68% top",
            scrub: 1,
          },
        });

        gsap.to(".hero-vignette", {
          opacity: 0.9,
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(".hero-hud", {
          y: -20,
          opacity: 0,
          scrollTrigger: {
            trigger: ref.current,
            start: "20% top",
            end: "60% top",
            scrub: 1,
          },
        });

        return () => { /* matchMedia auto-reverts */ };
      });

      gsap.to(".hero-scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "power1.inOut",
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative h-[260vh] overflow-clip"
      aria-label="Hero"
      data-bg="#0A0A0A"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {manifest && manifest.count > 0 ? (
          <FrameSequence
            frameCount={manifest.count}
            pathPattern={manifest.pattern || "/frames/hero/{i}.jpeg"}
            trigger={ref}
            start="top top"
            end="bottom top"
            fallbackVideoSrc="/video/hero-loop.mp4"
            className="absolute inset-0"
          />
        ) : manifest ? (
          <video
            autoPlay
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/hero-loop.mp4" type="video/mp4" />
          </video>
        ) : null}

        <div className="hero-vignette absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(10,10,10,0.92)_100%)] opacity-65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/10 to-dark/95 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/75 via-transparent to-dark/40 pointer-events-none" />
        <NoiseOverlay opacity={0.08} className="mix-blend-overlay" />

        <div className="relative z-10 h-full flex items-center">
          <div
            ref={contentRef}
            className="mx-auto max-w-[1480px] px-6 md:px-10 lg:px-12 w-full"
          >
            <div className="max-w-[min(92vw,1180px)]">
              <p className="font-mono text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-amber mb-6 md:mb-8 flex items-center gap-3">
                <span className="block w-8 h-px bg-amber" />
                Post-Tension Specialists · Est. 2017 · Sydney
              </p>

              <h1 className="font-display leading-[0.86] text-bone">
                <RevealText
                  trigger="load"
                  block
                  className="text-[clamp(2.5rem,9.2vw,9rem)] xl:text-[10rem]"
                >
                  The structure
                </RevealText>
                <RevealText
                  trigger="load"
                  delay={0.12}
                  block
                  className="text-[clamp(2.5rem,9.2vw,9rem)] xl:text-[10rem]"
                >
                  beneath everything
                </RevealText>
                <RevealText
                  trigger="load"
                  delay={0.24}
                  block
                  className="text-[clamp(2.5rem,9.2vw,9rem)] xl:text-[10rem]"
                >
                  <span className="text-amber">that</span> stands.
                </RevealText>
              </h1>

              <div className="mt-7 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
                <p className="max-w-md text-steel text-sm md:text-base leading-relaxed">
                  Design. Supply. Install. Australia&rsquo;s trusted
                  post-tensioning, steel-fixing, and structural remedial
                  specialists — one family, one responsibility, every project.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#tendon"
                    data-magnetic
                    data-cursor-label="Explore"
                    className="group relative inline-flex items-center justify-center px-7 py-4 bg-amber hover:bg-amber-hover text-dark font-semibold text-[11px] tracking-[0.25em] uppercase transition-all duration-300"
                  >
                    <span className="relative z-10">Explore the System</span>
                    <svg
                      className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="square"
                        strokeWidth={2}
                        d="M5 12h14m0 0l-6-6m6 6l-6 6"
                      />
                    </svg>
                  </a>
                  <a
                    href="#contact"
                    data-magnetic
                    data-cursor-label="Contact"
                    className="inline-flex items-center justify-center px-7 py-4 border border-cream/20 hover:border-cream text-cream font-semibold text-[11px] tracking-[0.25em] uppercase transition-all duration-300"
                  >
                    Get a Consultation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-hud absolute left-4 md:left-10 bottom-10 hidden md:flex flex-col items-center gap-4 z-10">
          <span className="hero-scroll-indicator text-ash text-[10px] tracking-[0.4em] uppercase [writing-mode:vertical-rl]">
            Scroll to deploy
          </span>
          <span className="block w-px h-14 bg-gradient-to-b from-amber to-transparent" />
        </div>

        <div className="hero-hud absolute right-4 md:right-10 top-24 md:top-28 hidden md:flex flex-col items-end gap-2 z-10 font-mono text-[9px] md:text-[10px] text-ash tracking-widest">
          <span>LAT −33.9249°</span>
          <span>LNG 151.2045°</span>
          <span className="text-amber/70">— SYDNEY —</span>
        </div>

        <div className="hero-hud absolute right-4 md:right-10 bottom-10 hidden md:flex flex-col items-end gap-1 z-10 font-mono text-[9px] md:text-[10px] text-ash tracking-widest">
          <span>$2B+ DELIVERED</span>
          <span>200+ PROJECTS</span>
          <span className="text-amber/70">37 YRS EXPERIENCE</span>
        </div>
      </div>
    </section>
  );
}
