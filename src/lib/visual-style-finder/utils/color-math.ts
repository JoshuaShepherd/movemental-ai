import type { ColorFamilySeed } from "../types";

export function rand(a: number, b: number): number {
  return a + Math.random() * (b - a);
}

export function pick<T>(a: T[]): T {
  return a[Math.floor(Math.random() * a.length)]!;
}

export function pickS(f: ColorFamilySeed, t: string): [number, number] {
  if (t === "neutral") return f.neutralS;
  if (t === "base") return f.baseS;
  if (t === "accent") return f.accentS;
  if (t === "inkS") return [8, 16];
  if (t === "baseLow") return [8, 18];
  return [10, 20];
}

export function hsl2hex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const k = (n: number) => (n + h / 30) % 12;
  const f = (n: number) => {
    const c = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function hexToRgb(h: string): [number, number, number] {
  const hex = h.replace("#", "");
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
}

export function lum(h: string): number {
  const c = hexToRgb(h).map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0]! + 0.7152 * c[1]! + 0.0722 * c[2]!;
}

export function contrast(a: string, b: string): number {
  const la = lum(a);
  const lb = lum(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

export function bestText(hex: string): { t: string; r: number } {
  const w = contrast(hex, "#ffffff");
  const b = contrast(hex, "#111111");
  return w >= b ? { t: "#fff", r: w } : { t: "#111", r: b };
}
