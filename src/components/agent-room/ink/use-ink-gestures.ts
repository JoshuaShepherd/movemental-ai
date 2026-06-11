"use client";

import { useCallback, useEffect, useRef } from "react";

import type { GestureKind } from "@/lib/agent-room/acts";
import styles from "../ink-band.module.css";
import { arrowPaths, circlePath, underlinePath, type LocalRect } from "./gesture-paths";

const SVG_NS = "http://www.w3.org/2000/svg";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const raf = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

/**
 * Resolve a gesture target inside the sheet, waiting a bounded number of frames
 * for it to mount. In the live stream a gesture chunk can arrive in the same
 * drain batch as the `ui_render` that mounts its target (and the screen remounts
 * on a new key), so the element may not exist on the first frame. Poll up to
 * `maxFrames` rAFs, then give up — a stale/never-rendered target is a safe
 * no-op, never a throw. The stub's authored scenes find the element on frame 1,
 * so this adds no delay on the happy path.
 */
const TARGET_WAIT_FRAMES = 20;
async function resolveTarget(
  roots: (HTMLElement | null)[],
  target: string | HTMLElement,
  maxFrames = TARGET_WAIT_FRAMES,
): Promise<Element | null> {
  if (typeof target !== "string") return target;
  for (let i = 0; i < maxFrames; i++) {
    for (const root of roots) {
      const el = root?.querySelector(target) ?? null;
      if (el) return el;
    }
    const docEl =
      typeof document !== "undefined" ? document.querySelector(target) : null;
    if (docEl) return docEl;
    await raf();
  }
  return null;
}

/** Match the ink SVG to the stage box (prototype `sizeOverlay`). */
function syncOverlay(screen: HTMLElement | null, svg: SVGSVGElement | null) {
  if (!screen || !svg) return;
  const { width, height } = screen.getBoundingClientRect();
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
}

/** Element box relative to the stage (prototype `localRect`). */
function localRect(screen: HTMLElement, el: Element): LocalRect {
  const r = el.getBoundingClientRect();
  const o = screen.getBoundingClientRect();
  return {
    x: r.left - o.left,
    y: r.top - o.top,
    w: r.width,
    h: r.height,
    cx: r.left - o.left + r.width / 2,
    cy: r.top - o.top + r.height / 2,
  };
}

/** Append one roughened stroke and animate it on via stroke-dashoffset. */
function drawPath(svg: SVGSVGElement, d: string, dur: number, delay = 0): Promise<void> {
  return new Promise<void>((resolve) => {
    const p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", d);
    p.setAttribute("class", styles.stroke);
    svg.appendChild(p);
    if (prefersReduced()) return resolve();
    const len = p.getTotalLength();
    p.style.strokeDasharray = String(len);
    p.style.strokeDashoffset = String(len);
    void p.getBoundingClientRect(); // flush before transitioning
    window.setTimeout(() => {
      p.style.transition = `stroke-dashoffset ${dur}ms cubic-bezier(.4,.05,.25,1)`;
      p.style.strokeDashoffset = "0";
      window.setTimeout(resolve, dur + 40);
    }, delay);
  });
}

/**
 * The gesture half of the ink layer (prototype `js/ink.js`): roughened SVG
 * strokes drawn over the stage — `drawGesture` (underline / circle / arrow),
 * `clearInk` (wipe strokes), and `sizeOverlay` (keep the SVG matched to the
 * stage box, on resize + font load). Purely imperative against `inkSvg` — no
 * React state — so a stroke never triggers a re-render. The runner (AF-05) calls
 * `drawGesture`/`clearInk`; this hook never imports the runner.
 *
 * Helpers are module-scoped (taking the DOM nodes as args) so each callback
 * depends only on the stage refs — no chained memoization.
 *
 * The hook OWNS the three stage refs (`useRef`, not params) and returns them for
 * the shell zones to attach. Locally-created refs are exempt from exhaustive-deps
 * and stable for the compiler — which a `refs`-as-param shape would not be.
 */
export function useInkGestures() {
  const gestureRootEl = useRef<HTMLDivElement | null>(null);
  const screenEl = useRef<HTMLElement | null>(null);
  const sheetEl = useRef<HTMLDivElement | null>(null);
  const inkSvg = useRef<SVGSVGElement | null>(null);

  // These read only refs, which are stable for the component's lifetime — so
  // (like the stream hook's callbacks) they take no reactive deps.
  const sizeOverlay = useCallback(() => {
    syncOverlay(gestureRootEl.current ?? screenEl.current, inkSvg.current);
  }, []);

  const clearInk = useCallback(() => {
    inkSvg.current?.querySelectorAll("path").forEach((p) => p.remove());
  }, []);

  const drawGesture = useCallback(
    async (kind: GestureKind, target: string | HTMLElement): Promise<void> => {
      await raf();
      const overlayRoot = gestureRootEl.current ?? screenEl.current;
      const svg = inkSvg.current;
      if (!overlayRoot || !svg) return;
      const el = await resolveTarget(
        [sheetEl.current, gestureRootEl.current, screenEl.current],
        target,
      );
      if (!el) return;
      const rect = localRect(overlayRoot, el);
      syncOverlay(overlayRoot, svg);
      if (kind === "underline") {
        await drawPath(svg, underlinePath(rect), 520);
      } else if (kind === "circle") {
        await drawPath(svg, circlePath(rect), 760);
      } else if (kind === "arrow") {
        const { shaft, head } = arrowPaths(rect, overlayRoot.getBoundingClientRect().height);
        await drawPath(svg, shaft, 560);
        await drawPath(svg, head, 200);
      }
    },
    [],
  );

  // Keep the overlay matched to the stage on resize and once fonts settle
  // (font swap reflows the sheet, moving gesture targets).
  useEffect(() => {
    const observed = gestureRootEl.current ?? screenEl.current;
    if (!observed) return;
    sizeOverlay();
    const ro = new ResizeObserver(() => sizeOverlay());
    ro.observe(observed);
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => sizeOverlay()).catch(() => {});
    }
    return () => ro.disconnect();
  }, [sizeOverlay]);

  return { gestureRootEl, screenEl, sheetEl, inkSvg, drawGesture, clearInk, sizeOverlay };
}
