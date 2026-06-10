"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link2 } from "lucide-react";

import { BOOK_TITLE } from "@/lib/book-meta";

/**
 * HighlightShare — floating toolbar that appears when a reader selects text
 * inside the chapter body. Allows copying the selected passage as a quote
 * or sharing it via a text fragment URL.
 *
 * Render this component once inside the chapter reader; it listens to the
 * global selectionchange event and positions itself above the selection.
 */
export function HighlightShare() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      setVisible(false);
      return;
    }

    // Only activate inside the chapter prose area
    const anchor = selection.anchorNode?.parentElement?.closest(
      '[data-slot="chapter-body"]'
    );
    if (!anchor) {
      setVisible(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    setPosition({
      top: rect.top + window.scrollY - 48,
      left: rect.left + rect.width / 2,
    });
    setVisible(true);
  }, []);

  useEffect(() => {
    const onSelectionChange = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(handleSelection, 300);
    };
    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", onSelectionChange);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [handleSelection]);

  const copyQuote = async () => {
    const selection = window.getSelection();
    if (!selection) return;
    const text = selection.toString().trim();
    const url = window.location.href;
    const quote = `"${text}"\n\n— ${BOOK_TITLE}\n${url}`;
    await navigator.clipboard.writeText(quote);
    setVisible(false);
    selection.removeAllRanges();
  };

  const sharePassage = async () => {
    const selection = window.getSelection();
    if (!selection) return;
    const text = selection.toString().trim();
    const fragment = encodeURIComponent(text.slice(0, 100));
    const url = `${window.location.origin}${window.location.pathname}#:~:text=${fragment}`;

    if (navigator.share) {
      await navigator.share({ title: BOOK_TITLE, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
    setVisible(false);
    selection.removeAllRanges();
  };

  if (!visible) return null;

  return (
    <div
      ref={ref}
      data-slot="highlight-share"
      className="pointer-events-auto fixed z-50 flex -translate-x-1/2 items-center gap-1 rounded-lg bg-inverse-surface p-1 shadow-ambient"
      style={{ top: position.top, left: position.left, position: "absolute" }}
    >
      <button
        type="button"
        onClick={copyQuote}
        className="rounded-md px-3 py-1.5 text-xs font-medium text-inverse-foreground hover:bg-inverse-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-foreground"
      >
        Copy quote
      </button>
      <button
        type="button"
        onClick={sharePassage}
        className="flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-inverse-foreground hover:bg-inverse-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inverse-foreground"
      >
        <Link2 className="h-3 w-3" aria-hidden />
        Share
      </button>
    </div>
  );
}
