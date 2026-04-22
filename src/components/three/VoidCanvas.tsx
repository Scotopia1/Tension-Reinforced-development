"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import CableScene from "./CableScene";

export default function VoidCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 7], fov: 45 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <CableScene />
      </Suspense>
    </Canvas>
  );
}
