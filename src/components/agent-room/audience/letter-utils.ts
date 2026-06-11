/** On-page letter embed starts at a marker paragraph (opening pain lives in Section 2). */
export function getLetterEmbedParagraphs(
  markdown: string,
  embedStartMarker: string,
): string[] {
  const paragraphs = markdown
    .replace(/^#\s+.+\n+/, "")
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const startIdx = paragraphs.findIndex((p) => p.startsWith(embedStartMarker));
  return startIdx === -1 ? paragraphs : paragraphs.slice(startIdx);
}

/** Full letter for download / mailto — unchanged artifact. */
export function getLetterFullText(markdown: string): string {
  const title = markdown.match(/^#\s+(.+)/)?.[1] ?? "Letter";
  const body = markdown.replace(/^#\s+.+\n+/, "").trim();
  return `${title}\n\n${body}`;
}
