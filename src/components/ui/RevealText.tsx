"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Mask-reveal text. Splits string children by whitespace into word spans
 * wrapped in overflow-hidden masks; each word slides up from below on enter.
 *
 * Renders as an inline <span> so parents can compose it inside any heading or
 * paragraph. If the children aren't a plain string we fall through to a
 * simple span wrapper without splitting.
 */
export default function RevealText({
  children,
  className = "",
  stagger = 0.05,
  duration = 1.15,
  delay = 0,
  trigger = "self",
  start = "top 85%",
  block = false,
  ease = "steel-tension",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  trigger?: "self" | "load";
  start?: string;
  /** Render as a block instead of inline (useful for stacked headlines). */
  block?: boolean;
  /** Ease name — defaults to industrial "steel-tension" CustomEase. */
  ease?: string;
}) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [host, setHost] = useState<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      if (!host) return;
      const words = host.querySelectorAll(".reveal-word > span");
      if (!words || words.length === 0) return;

      // Multi-property entrance — y + scale + opacity + blur offset starts.
      gsap.set(words, {
        yPercent: 115,
        opacity: 0,
        scale: 1.04,
        filter: "blur(6px)",
      });

      const tween: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration,
        stagger,
        ease,
        delay,
      };

      if (trigger === "load") {
        gsap.to(words, tween);
      } else {
        gsap.to(words, {
          ...tween,
          scrollTrigger: { trigger: host, start, once: true },
        });
      }
    },
    { scope: scopeRef, dependencies: [host] }
  );

  const wrapClass = cn(block ? "block" : "inline", className);

  if (typeof children !== "string") {
    return (
      <span ref={setHost} className={wrapClass}>
        {children}
      </span>
    );
  }

  const parts = children.split(/(\s+)/);

  return (
    <div ref={scopeRef} className="contents">
      <span ref={setHost} className={wrapClass}>
        {parts.map((w, i) =>
          /\s+/.test(w) ? (
            <span key={i}>{w}</span>
          ) : (
            <span
              key={i}
              className="reveal-word inline-block overflow-hidden align-bottom"
            >
              <span className="inline-block will-change-transform">{w}</span>
            </span>
          )
        )}
      </span>
    </div>
  );
}
