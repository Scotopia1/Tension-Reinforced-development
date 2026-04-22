"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Marquee({
  items,
  speed = 60,
  className = "",
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current?.querySelector(".marquee-track") as HTMLElement | null;
      if (!track) return;
      const totalWidth = track.scrollWidth / 2; // because we duplicate the items
      gsap.to(track, {
        x: -totalWidth,
        duration: totalWidth / speed,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: ref }
  );

  // duplicate items so the loop is seamless
  const doubled = [...items, ...items];

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden border-y border-dark-border bg-dark py-6 ${className}`}
      aria-hidden="true"
    >
      <div className="marquee-track flex gap-12 whitespace-nowrap will-change-transform">
        {doubled.map((it, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-4xl tracking-[0.15em] text-cream/30"
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
