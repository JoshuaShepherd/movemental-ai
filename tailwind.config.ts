import type { Config } from "tailwindcss";

/**
 * Tailwind v4 config — Ink Band design system.
 * Tokens live in src/app/globals.css; this file extends fonts and radii.
 * Canon: docs/design/INK_BAND_DESIGN_CHAIN.md
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-ink-display-face)",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        mono: [
          "var(--font-ink-mono-face)",
          "IBM Plex Mono",
          "ui-monospace",
          "monospace",
        ],
      },
      borderRadius: {
        pill: "9999px",
      },
      maxWidth: {
        content: "var(--container-max)",
        prose: "var(--prose-max)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
    },
  },
  plugins: [],
};

export default config;
