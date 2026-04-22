"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CustomEase } from "gsap/CustomEase";
import { Observer } from "gsap/Observer";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollToPlugin,
    CustomEase,
    Observer,
    Flip,
    Draggable
  );

  // Premium plugins (free since Webflow acquired GSAP) — register only if available.
  // Wrapped in try/catch so the build doesn't break if a sub-module path drifts.
  const tryRegister = async (path: string) => {
    try {
      const mod = await import(/* webpackIgnore: true */ path);
      const plugin = mod.default ?? Object.values(mod)[0];
      if (plugin) gsap.registerPlugin(plugin);
    } catch {
      /* plugin not bundled — feature degrades gracefully */
    }
  };

  void tryRegister("gsap/SplitText");
  void tryRegister("gsap/DrawSVGPlugin");
  void tryRegister("gsap/MotionPathPlugin");
  void tryRegister("gsap/MorphSVGPlugin");
  void tryRegister("gsap/ScrambleTextPlugin");
  void tryRegister("gsap/ScrollSmoother");
  void tryRegister("gsap/InertiaPlugin");

  registered = true;
}

export {
  gsap,
  ScrollTrigger,
  ScrollToPlugin,
  CustomEase,
  Observer,
  Flip,
  Draggable,
  useGSAP,
};
