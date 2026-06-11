"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import styles from "../ink-band.module.css";

/**
 * Markdown for Discuss *passages* only — the editorial reading surface where the
 * diagnostician writes longer read-backs. Lists, emphasis, and links render as
 * ink on paper. The live ink voice line and margin notes stay plain text so the
 * nib write-on animation is unaffected; this is reading prose, not handwriting.
 *
 * Links open in a new tab (the room is a single-page surface we don't want to
 * navigate away from); everything else maps to scoped Ink Band classes.
 */
export function PassageMarkdown({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => (
          <a
            href={href}
            className={styles.passageLink}
            target="_blank"
            rel="noreferrer"
          >
            {children}
          </a>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
