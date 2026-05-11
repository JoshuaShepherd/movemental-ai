import type { Config } from "tailwindcss";

/**
 * Tailwind v4 config — Concept Modern ("warm editorial") design system.
 *
 * Most tokens live in `src/app/globals.css` under `@theme inline` so they
 * become utility classes (bg-background, text-foreground, etc.). This file
 * extends the v3-style legacy surface with fonts, type scale, radii, motion,
 * and keyframes that need to stay JS-accessible.
 *
 * DESIGN.md is canonical — when this file and DESIGN.md disagree, DESIGN.md
 * wins.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /** Matches `docs/html/master-components/css/nav-demos.css` (nav-01 @ 900px). */
      screens: {
        nav: "901px",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        /** Instrument Serif — italic emphasis layer (headings, pull quotes). */
        serif: [
          "var(--font-serif-display)",
          "Instrument Serif",
          "Iowan Old Style",
          "Georgia",
          "ui-serif",
          "serif",
        ],
        /** Kept as alias for components still importing the Stitch-era name. */
        "serif-display": [
          "var(--font-serif-display)",
          "Instrument Serif",
          "Iowan Old Style",
          "Georgia",
          "ui-serif",
          "serif",
        ],
        /** Stitch program templates — headline italic Instrument layer */
        headline: [
          "var(--font-serif-display)",
          "Instrument Serif",
          "Iowan Old Style",
          "Georgia",
          "ui-serif",
          "serif",
        ],
        body: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        label: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      /** Type scale — Concept Modern uses 500 weight + tight tracking for
       *  hierarchy, rather than 700/800 heft. All sizes are fluid `clamp`s
       *  so the editorial proportions hold from phone to wide desktop. */
      fontSize: {
        display: [
          "clamp(2.6rem, 6.4vw, 5.5rem)",
          {
            lineHeight: "1.02",
            letterSpacing: "-0.028em",
            fontWeight: "500",
          },
        ],
        h1: [
          "clamp(2.3rem, 5.2vw, 4.2rem)",
          {
            lineHeight: "1.05",
            letterSpacing: "-0.028em",
            fontWeight: "500",
          },
        ],
        h2: [
          "clamp(2rem, 4.4vw, 3.4rem)",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.028em",
            fontWeight: "500",
          },
        ],
        h3: [
          "clamp(1.5rem, 2.4vw, 1.875rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        h4: [
          "1.25rem",
          { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "500" },
        ],
        "body-lg": ["1.1rem", { lineHeight: "1.7", fontWeight: "400" }],
        body: ["1.0625rem", { lineHeight: "1.55", fontWeight: "400" }],
        small: ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }],
        label: [
          "0.78rem",
          {
            lineHeight: "1.4",
            letterSpacing: "0.09em",
            fontWeight: "500",
          },
        ],
        button: ["0.9rem", { lineHeight: "1.2", fontWeight: "500" }],
        micro: [
          "0.72rem",
          {
            lineHeight: "1.4",
            letterSpacing: "0.09em",
            fontWeight: "500",
          },
        ],
      },
      letterSpacing: {
        display: "-0.028em",
        tight: "-0.022em",
        eyebrow: "0.09em",
      },
      borderRadius: {
        /** Legacy Stitch-era alias — preserved so components importing
         *  `rounded-card-lg` still resolve. Prefer `rounded-card`. */
        "card-lg": "2.5rem",
        card: "var(--radius-card)",
        pill: "9999px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      maxWidth: {
        content: "var(--container-max)",
        narrow: "var(--container-narrow)",
        prose: "var(--prose-max)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up-sm": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.97)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up":
          "fade-up var(--duration-reveal, 700ms) cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-up-sm":
          "fade-up-sm 500ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 400ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in":
          "scale-in var(--duration-normal, 300ms) cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      transitionDuration: {
        fast: "var(--duration-fast, 150ms)",
        normal: "var(--duration-normal, 300ms)",
        slow: "var(--duration-slow, 450ms)",
        reveal: "var(--duration-reveal, 700ms)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        expressive: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      boxShadow: {
        /** Used only for dialogs (see DESIGN.md §3.3). Prefer tonal stacking. */
        ambient: "var(--shadow-ambient, 0 24px 80px rgba(25, 21, 15, 0.12))",
        "nav-scroll": "0 1px 0 var(--border)",
        "hero-image": "0 24px 60px rgba(25, 21, 15, 0.18)",
      },
    },
  },
};

export default config;
