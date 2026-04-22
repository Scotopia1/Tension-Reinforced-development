"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import Marquee from "./ui/Marquee";

const LINKS = {
  Services: [
    { label: "Post-Tensioning", href: "#services" },
    { label: "Steel Fixing", href: "#services" },
    { label: "Structural Remedial", href: "#services" },
  ],
  Company: [
    { label: "Why TRD", href: "#why-trd" },
    { label: "Process", href: "#process" },
    { label: "Team", href: "#team" },
    { label: "Projects", href: "#projects" },
  ],
  Contact: [
    { label: "thetrdgroup.com.au", href: "https://thetrdgroup.com.au" },
    { label: "2 Beryl Place, Greenacre NSW", href: "#" },
    { label: "Get a Quote", href: "#contact" },
  ],
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".footer-col", {
        y: 30,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.8,
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      });
      gsap.from(".footer-mega", {
        scale: 0.96,
        autoAlpha: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".footer-mega", start: "top 90%" },
      });
    },
    { scope: ref }
  );

  return (
    <footer ref={ref} className="relative bg-dark-card border-t border-dark-border overflow-hidden">
      <Marquee
        items={["TENSION", "REINFORCED", "DEVELOPMENTS", "·", "SYDNEY", "EST. 2017", "·"]}
      />

      <div className="mx-auto max-w-[1480px] px-6 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="footer-col lg:col-span-1">
            <Image
              src="/images/logo.svg"
              alt="TRD Group"
              width={70}
              height={30}
              className="brightness-0 invert mb-6"
            />
            <p className="text-steel text-sm leading-relaxed mb-6">
              Tension Reinforced Developments. Sydney&rsquo;s trusted post-tensioning
              and structural remedial specialists since 2017.
            </p>
            <p className="text-ash text-xs tracking-wide">
              ABN registered &middot; Licensed Builder NSW & ACT
            </p>
          </div>

          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title} className="footer-col">
              <h4 className="font-mono text-xs text-amber tracking-[0.3em] uppercase mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-cream/70 hover:text-amber text-sm transition-colors duration-300"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mega-typographic footer line */}
        <div className="footer-mega -mx-6 md:-mx-12 mb-10">
          <h2 className="font-display text-[18vw] leading-[0.85] text-cream/[0.07] text-center select-none">
            TRD
          </h2>
        </div>

        <div className="pt-8 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ash text-xs">
            &copy; {new Date().getFullYear()} TRD Group. The structure beneath everything.
          </p>
          <p className="text-ash text-xs font-mono tracking-wider">
            v1.0 — built with intent
          </p>
        </div>
      </div>
    </footer>
  );
}
