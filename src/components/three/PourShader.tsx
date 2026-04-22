"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
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
  uniform float uReveal;
  uniform float uTime;

  // ---- helpers ----
  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 17.5);
    return fract(p.x * p.y);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),             hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2  s = vec2(1.0);
    for (int i = 0; i < 4; i++) {
      v += a * vnoise(p);
      p  = p * 2.1 + s * 0.01 * uTime;
      a *= 0.5;
    }
    return v;
  }

  // Horizontal cable lines (procedural grid)
  float cableField(vec2 uv) {
    float rows = 7.0;
    float gy   = fract(uv.y * rows);
    float wave = sin(uv.x * 6.2832 * 1.5 - uTime * 0.4) * 0.05;
    float dist = abs(gy - 0.5 + wave);
    return smoothstep(0.07, 0.015, dist);
  }

  void main() {
    vec2 uv = vUv;

    // ---- concrete surface ----
    float grain = fbm(uv * 22.0) * 0.35 + 0.65;
    vec3  concrete = vec3(0.115, 0.105, 0.095) * grain;

    // ---- dissolve noise ----
    float n  = fbm(uv * 4.5 + vec2(0.0, 0.1 * uTime));
    float n2 = fbm(uv * 9.0 + vec2(5.3, 2.1));
    float dn = n * 0.55 + n2 * 0.45;

    // Bias: dissolve radiates from centre-bottom outward
    float bias     = length(uv - vec2(0.5, 0.25)) * 0.35;
    float threshold = uReveal * 1.55 - bias;

    float solidMask = 1.0 - smoothstep(threshold - 0.07, threshold,       dn);
    float edgeMask  =       smoothstep(threshold - 0.16, threshold - 0.07, dn)
                      * (1.0 - smoothstep(threshold - 0.07, threshold, dn));

    // ---- amber colour ----
    vec3 amber       = vec3(0.831, 0.647, 0.216);
    vec3 amberBright = vec3(1.0,   0.87,  0.42);

    // ---- underground (cable network) ----
    float cables    = cableField(uv) * smoothstep(0.3, 1.0, uReveal);
    vec3  cableCol  = mix(amber * 0.6, amberBright, cables);
    vec3  underground = mix(
      vec3(0.04, 0.035, 0.025),
      cableCol,
      cables * 0.9 + uReveal * 0.12
    );

    // ---- compose ----
    vec3 surface   = concrete + amber * edgeMask * 2.8;
    vec3 finalCol  = mix(underground, surface, solidMask);

    // Vignette
    float vig = smoothstep(0.85, 0.3, length(uv - vec2(0.5)) * 1.3);
    finalCol  *= mix(0.6, 1.0, vig);

    gl_FragColor = vec4(finalCol, 1.0);
  }
`;

export default function PourShader() {
  const { viewport } = useThree();
  const matRef  = useRef<THREE.ShaderMaterial>(null);
  const elapsed = useRef(0);

  const uniforms = useMemo(
    () => ({
      uReveal: { value: 0 },
      uTime:   { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!matRef.current) return;
    elapsed.current += delta;
    matRef.current.uniforms.uTime.value = elapsed.current;

    // Read CSS var written by ThePour ScrollTrigger — ~0.05 ms, fine at 60 fps
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--pour-progress");
    matRef.current.uniforms.uReveal.value = parseFloat(raw) || 0;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
      />
    </mesh>
  );
}
