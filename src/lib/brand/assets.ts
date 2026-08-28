/** Raster wordmark — source PNGs in public/images/brand/; run `pnpm brand:logo` after updates. */
export const MOVEMENTAL_LOGO_LIGHT_SRC = "/images/brand/movemental-logo-light.webp";
export const MOVEMENTAL_LOGO_DARK_SRC = "/images/brand/movemental-logo-dark.webp";

export const MOVEMENTAL_LOGO = {
  lightSrc: MOVEMENTAL_LOGO_LIGHT_SRC,
  darkSrc: MOVEMENTAL_LOGO_DARK_SRC,
  width: 1021,
  height: 135,
  alt: "Movemental",
} as const;
