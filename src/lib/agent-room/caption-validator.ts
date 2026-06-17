/**
 * Ink caption validator (conversation choreography SSOT §7, I5).
 * Every string bound for the collapsed ink band must pass this gate.
 */

/** Conservative fallback when band width is unknown (SSOT §11 open question #1). */
export const CAPTION_CHAR_FALLBACK = 80;

export type CaptionValidation = { eligible: true; caption: string } | { eligible: false };

/**
 * Returns whether `text` is eligible for the one-line ink caption band.
 * When `bandWidthPx` is provided, uses canvas measure; otherwise char fallback.
 */
export function validateCaption(
  text: string,
  options?: { bandWidthPx?: number; fontSizePx?: number },
): CaptionValidation {
  const trimmed = text.trim();
  if (!trimmed) return { eligible: false };

  if (trimmed.includes("\n")) return { eligible: false };

  const bandWidth = options?.bandWidthPx;
  if (bandWidth && bandWidth > 0 && typeof document !== "undefined") {
    const fontSize = options?.fontSizePx ?? 26;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.font = `${fontSize}px "Caveat", cursive`;
      const width = ctx.measureText(trimmed).width;
      if (width > bandWidth * 0.95) return { eligible: false };
    }
  } else if (trimmed.length > CAPTION_CHAR_FALLBACK) {
    return { eligible: false };
  }

  return { eligible: true, caption: trimmed };
}
