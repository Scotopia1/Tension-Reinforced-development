"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Magnetic custom cursor.
 * - Dot: tight quickTo (0.15s, power3) — tracks real cursor closely.
 * - Ring: looser quickTo (0.4s, power3) — trails with inertia.
 * - On [data-magnetic] elements the ring scales 1→2.4 + opacity drops; dot centers on element.
 * - On [data-cursor-label] elements the ring becomes a labeled pill.
 * - Hidden on touch/coarse-pointer devices.
 */
export default function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        if (rootRef.current) rootRef.current.style.display = "none";
        return;
      }

      const dot = dotRef.current!;
      const ring = ringRef.current!;
      const label = labelRef.current!;

      gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 });
      gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });

      const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3" });
      const ringScale = gsap.quickTo(ring, "scale", { duration: 0.35, ease: "power3" });

      let visible = false;
      const show = () => {
        if (visible) return;
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25, overwrite: true });
      };
      const hide = () => {
        visible = false;
        gsap.to([dot, ring], { opacity: 0, duration: 0.2, overwrite: true });
      };

      const onMove = (e: MouseEvent) => {
        show();
        const magnetic = (e.target as HTMLElement)?.closest?.(
          "[data-magnetic], a, button"
        ) as HTMLElement | null;

        if (magnetic) {
          const r = magnetic.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          // Snap dot to element center with gentle offset
          dotX(cx + (e.clientX - cx) * 0.25);
          dotY(cy + (e.clientY - cy) * 0.25);
          ringX(cx);
          ringY(cy);
          ringScale(2.2);

          const lbl = magnetic.getAttribute("data-cursor-label");
          if (lbl) {
            label.textContent = lbl;
            gsap.to(label, { opacity: 1, duration: 0.2, overwrite: true });
          } else {
            gsap.to(label, { opacity: 0, duration: 0.2, overwrite: true });
          }
        } else {
          dotX(e.clientX);
          dotY(e.clientY);
          ringX(e.clientX);
          ringY(e.clientY);
          ringScale(1);
          gsap.to(label, { opacity: 0, duration: 0.15, overwrite: true });
        }
      };

      const onDown = () => ringScale(0.7);
      const onUp = () => ringScale(1);

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mousedown", onDown);
      window.addEventListener("mouseup", onUp);
      window.addEventListener("mouseleave", hide);

      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mousedown", onDown);
        window.removeEventListener("mouseup", onUp);
        window.removeEventListener("mouseleave", hide);
      };
    },
    { scope: rootRef }
  );

  // hide native cursor on devices where we render the custom one
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const prev = document.documentElement.style.cursor;
    document.documentElement.style.cursor = "none";
    return () => {
      document.documentElement.style.cursor = prev;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference"
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-cream will-change-transform"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-10 w-10 rounded-full border border-cream will-change-transform flex items-center justify-center"
      >
        <span
          ref={labelRef}
          className="font-mono text-[9px] uppercase tracking-[0.25em] text-cream opacity-0 whitespace-nowrap"
        />
      </div>
    </div>
  );
}
