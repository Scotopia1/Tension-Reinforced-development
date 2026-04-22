"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Canvas-driven frame sequence with scroll scrub.
 * Frames are loaded as <img> objects and drawn into a canvas at the right index
 * computed from the ScrollTrigger progress. Falls back to a static last-frame
 * image (or video) on prefers-reduced-motion / mobile.
 */
export default function FrameSequence({
  frameCount,
  pathPattern = "/frames/hero/{i}.jpeg",
  trigger,
  start = "top top",
  end = "+=200%",
  fallbackVideoSrc,
  className = "",
}: {
  frameCount: number;
  pathPattern?: string;
  trigger: React.RefObject<HTMLElement | null>;
  start?: string;
  end?: string;
  fallbackVideoSrc?: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [reduced, setReduced] = useState(false);

  // Detect reduced motion
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => setReduced(mql.matches);
    f();
    mql.addEventListener?.("change", f);
    return () => mql.removeEventListener?.("change", f);
  }, []);

  // Preload all frames lazily as a sequence (pipelined)
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    const list: HTMLImageElement[] = [];
    const load = (i: number) => {
      if (cancelled || i > frameCount) return;
      const img = new window.Image();
      img.src = pathPattern.replace("{i}", String(i).padStart(4, "0"));
      img.onload = () => {
        list[i - 1] = img;
        // Draw first frame ASAP so canvas isn't blank
        if (i === 1 && canvasRef.current) {
          drawFrame(img, canvasRef.current);
        }
        load(i + 1);
      };
      img.onerror = () => load(i + 1);
    };
    load(1);
    imagesRef.current = list;
    return () => {
      cancelled = true;
    };
  }, [frameCount, pathPattern, reduced]);

  // Hook ScrollTrigger to draw the right frame for current progress
  useGSAP(
    () => {
      if (reduced || !trigger.current || !canvasRef.current) return;

      const obj = { f: 0 };
      gsap.to(obj, {
        f: frameCount - 1,
        ease: "none",
        snap: { f: 1 },
        scrollTrigger: {
          trigger: trigger.current,
          start,
          end,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const idx = Math.max(0, Math.min(frameCount - 1, Math.round(obj.f)));
          const img = imagesRef.current[idx];
          if (img && canvasRef.current) {
            drawFrame(img, canvasRef.current);
          }
        },
      });
    },
    { scope: wrapRef, dependencies: [reduced, frameCount] }
  );

  // Reduced motion: play video softly looping
  useEffect(() => {
    if (reduced && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [reduced]);

  return (
    <div ref={wrapRef} className={className}>
      {!reduced && (
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="w-full h-full object-cover"
        />
      )}
      {reduced && fallbackVideoSrc && (
        <video
          ref={videoRef}
          src={fallbackVideoSrc}
          muted
          playsInline
          loop
          autoPlay
          className="w-full h-full object-cover"
        />
      )}
      {!fallbackVideoSrc && reduced && (
        <div className="w-full h-full bg-dark" />
      )}
    </div>
  );
}

function drawFrame(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  // Cover semantics — fill the canvas, preserving AR
  const cw = canvas.width;
  const ch = canvas.height;
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = cw / ch;
  let dw = cw;
  let dh = ch;
  let dx = 0;
  let dy = 0;
  if (ir > cr) {
    dh = ch;
    dw = ch * ir;
    dx = (cw - dw) / 2;
  } else {
    dw = cw;
    dh = cw / ir;
    dy = (ch - dh) / 2;
  }
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}
