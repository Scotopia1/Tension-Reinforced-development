export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const clamp = (n: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, n));

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const mapRange = (
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  v: number
): number => outMin + ((v - inMin) * (outMax - outMin)) / (inMax - inMin);
