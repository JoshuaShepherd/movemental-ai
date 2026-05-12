/**
 * Shared Tailwind class strings for authenticated product homes.
 * @see docs/design/AUTHENTICATED_HOME_REGISTER.md
 */
export const editorialHome = {
  heroBand: "pt-[clamp(6rem,10vw,7.5rem)] pb-[clamp(4rem,8vw,6rem)]",
  eyebrow: "text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent",
  display: "font-serif text-[clamp(3rem,5.5vw,4rem)] italic leading-[1.05] tracking-tight text-foreground",
  lede: "max-w-[600px] text-[17px] leading-[1.65] text-muted-foreground",
  hairline: "border-t border-border",
  bandGap: "flex flex-col gap-10 pt-[clamp(3rem,6vw,4.5rem)]",
  bandSubhead: "font-serif text-[22px] italic leading-snug text-foreground",
  bandLede: "max-w-[600px] text-[15px] leading-[1.65] text-muted-foreground",
  editorialStatus: "font-serif text-[17px] italic leading-relaxed text-foreground",
  rowWrap: "border-t border-border first:border-t-0",
  rowLink:
    "group flex gap-6 py-6 pl-4 transition-colors hover:bg-section/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  rowCurrent: "border-l-[3px] border-pathway-accent pl-[calc(1rem-3px)]",
  rowInactive: "border-l-[3px] border-transparent pl-[calc(1rem-3px)]",
  rowNum32: "w-10 shrink-0 font-serif text-[32px] italic leading-none text-pathway-accent tabular-nums",
  rowNum24: "w-9 shrink-0 font-serif text-[24px] italic leading-none text-pathway-accent tabular-nums",
  rowTitle22: "font-serif text-[22px] italic leading-snug text-foreground group-hover:text-pathway-accent",
  rowDesc14: "text-[14px] leading-snug text-muted-foreground",
  rowMeta11: "text-[11px] italic leading-snug text-muted-foreground",
  textLink:
    "text-[15px] font-medium text-foreground underline decoration-border underline-offset-[0.22em] transition-colors hover:text-pathway-accent hover:decoration-pathway-accent/50",
  libraryLink:
    "font-medium text-foreground underline decoration-border underline-offset-[0.22em] transition-colors hover:text-pathway-accent hover:decoration-pathway-accent/50",
  primaryCta:
    "inline-flex w-fit items-center bg-pathway-accent px-6 py-3 text-[14px] font-medium text-[#19150f] transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
} as const;

/** First-line style preview from markdown for editorial row subtitles. */
export function editorialPreviewFromMarkdown(
  md: string | null | undefined,
  maxLen = 160,
): string {
  if (!md?.trim()) {
    return "Awaiting generated copy for this section.";
  }
  const plain = md
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*?/g, "")
    .replace(/\[(.*?)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLen) return plain;
  const cut = plain.slice(0, maxLen - 1).trimEnd();
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 40 ? cut.slice(0, lastSpace) : cut;
  return `${base}…`;
}

/** One paragraph lede from reflected-understanding markdown (overview hero). */
export function firstParagraphFromMarkdown(
  md: string | null | undefined,
  maxLen = 720,
): string | null {
  if (!md?.trim()) return null;
  const blocks = md.split(/\n\n+/);
  const first = blocks.find((b) => b.trim() && !b.trim().startsWith("#"));
  if (!first) return null;
  const plain = first
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*?/g, "")
    .replace(/\[(.*?)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (!plain) return null;
  if (plain.length <= maxLen) return plain;
  const cut = plain.slice(0, maxLen - 1).trimEnd();
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 80 ? cut.slice(0, lastSpace) : cut;
  return `${base}…`;
}
