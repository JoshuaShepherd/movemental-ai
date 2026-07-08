/**
 * Palette generator color math — pure functions for React port.
 */
export function rand(a, b) { return a + Math.random() * (b - a); }
export function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
export function pickS(f, t) {
  return t === 'neutral' ? f.neutralS : t === 'base' ? f.baseS : t === 'accent' ? f.accentS : t === 'inkS' ? [8, 16] : t === 'baseLow' ? [8, 18] : [10, 20];
}
export function hsl2hex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const k = (n) => (n + h / 30) % 12;
  const f = (n) => {
    const c = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return '#' + f(0) + f(8) + f(4);
}
export function hexToRgb(h) {
  h = h.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
export function lum(h) {
  const c = hexToRgb(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
export function contrast(a, b) {
  const la = lum(a), lb = lum(b);
  const hi = Math.max(la, lb), lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}
export function bestText(hex) {
  const w = contrast(hex, '#ffffff'), b = contrast(hex, '#111111');
  return w >= b ? { t: '#fff', r: w } : { t: '#111', r: b };
}
