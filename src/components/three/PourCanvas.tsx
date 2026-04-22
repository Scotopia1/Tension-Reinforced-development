"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import PourShader from "./PourShader";

export default function PourCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      style={{ background: "#0A0A0A" }}
    >
      <Suspense fallback={null}>
        <PourShader />
      </Suspense>
    </Canvas>
  );
}
