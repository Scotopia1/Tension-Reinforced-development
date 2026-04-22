"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.35,
}: {
  children: ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      const inner = innerRef.current;
      if (!el || !inner || !contextSafe) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      const ixTo = gsap.quickTo(inner, "x", { duration: 0.6, ease: "power3" });
      const iyTo = gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3" });

      const move = contextSafe((evt: Event) => {
        const e = evt as MouseEvent;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        xTo(dx * strength);
        yTo(dy * strength);
        ixTo(dx * strength * 0.4);
        iyTo(dy * strength * 0.4);
      }) as EventListener;

      const reset = contextSafe(() => {
        xTo(0);
        yTo(0);
        ixTo(0);
        iyTo(0);
      }) as EventListener;

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", reset);
      };
    },
    { scope: ref }
  );

  const baseClass = cn(
    "relative inline-flex items-center justify-center will-change-transform",
    className
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={baseClass}
      >
        <span ref={innerRef} className="relative inline-flex items-center gap-2">
          {children}
        </span>
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClass}
    >
      <span ref={innerRef} className="relative inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
