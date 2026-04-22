"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    // Radial glow from cross-section centre
    float dist = length(vUv - vec2(0.5)) * 2.0;
    float glow  = 1.0 - smoothstep(0.0, 1.0, dist);
    glow = pow(glow, 1.3);

    // Pulse wave travelling along the cable
    float wave = sin(vUv.x * 6.2832 * 3.0 - uTime * 1.6) * 0.5 + 0.5;
    float pulse = mix(0.55, 1.0, wave);

    // Slow breath
    float breathe = sin(uTime * 0.65) * 0.12 + 0.88;

    // Amber #D4A537 → bright core
    vec3 amber = vec3(0.831, 0.647, 0.216);
    vec3 core  = vec3(1.0,   0.86,  0.45);
    vec3 col   = mix(amber, core, glow * 0.55);

    float alpha = glow * pulse * breathe * 0.92;
    gl_FragColor = vec4(col, alpha);
  }
`;

function buildCatenary(): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const n       = 80;
  const span    = 8.0;
  const a       = 4.0;
  const topY    = 1.0;
  const halfSpan = span / 2;
  const offset  = topY - a * Math.cosh(halfSpan / a);

  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = (t - 0.5) * span;
    const y = a * Math.cosh(x / a) + offset;
    pts.push(new THREE.Vector3(x, y, 0));
  }
  return pts;
}

export default function CableScene() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const elapsed = useRef(0);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(buildCatenary());
    return new THREE.TubeGeometry(curve, 300, 0.036, 8, false);
  }, []);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (matRef.current) matRef.current.uniforms.uTime.value = elapsed.current;
  });

  return (
    <mesh geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
