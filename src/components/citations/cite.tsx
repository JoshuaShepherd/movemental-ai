"use client";

import { useEffect, useId, useRef, useState } from "react";

import { type CitationId } from "@/lib/citations/claims";
import {
  getRegistryIdForCitation,
  getTooltipFootnoteForCitation,
} from "@/lib/citations/eeat-registry";

import { useCitationNumber } from "./citations-provider";

/**
 * Inline citation chip — the Ledger edition.
 *
 * Renders a small amber-pill button inline with the surrounding prose. Click
 * (or Enter / Space when focused) opens a popover anchored beneath the chip
 * with reader-facing note text only (no confidence tags or sample metadata).
 * A link opens the matching row on `/footnotes` for the full bibliography-style
 * source block.
 *
 * Single-instance behavior: opening one chip's popover closes any other one.
 * Esc closes. Click outside closes. Matches the JS in the original mockup
 * (`docs/html/home-citations-ledger.html`).
 *
 * The chip number is sourced from `<CitationsProvider />` — declared per page
 * in document order, so SSR delivers the right number on first paint.
 */

export type CiteProps = {
  claimId: CitationId;
  /** Optional aria-label override; defaults to a trimmed preview of the EEAT note */
  ariaLabel?: string;
  className?: string;
};

export function Cite({ claimId, ariaLabel, className }: CiteProps) {
  const number = useCitationNumber(claimId);
  const registryId = getRegistryIdForCitation(claimId);
  const footnote = registryId ? getTooltipFootnoteForCitation(claimId) : "";

  const [open, setOpen] = useState(false);
  const popoverId = useId();
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleDocumentPointer(event: MouseEvent | PointerEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (target && wrapperRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentPointer, true);
    document.addEventListener("touchstart", handleDocumentPointer, true);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleDocumentPointer, true);
      document.removeEventListener("touchstart", handleDocumentPointer, true);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  // Close any other open chip when this one opens — emulates the mockup's
  // "single-instance" rule by dispatching a custom event the other chips listen
  // for. Avoids hoisting open state into a global store.
  useEffect(() => {
    function handleOpened(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (detail !== popoverId) {
        setOpen(false);
      }
    }
    document.addEventListener("movemental:cite-opened", handleOpened);
    return () => document.removeEventListener("movemental:cite-opened", handleOpened);
  }, [popoverId]);

  // No provider in scope (the host page hasn't opted into citations) — render
  // nothing so shared components stay usable in standalone contexts. Placed
  // after all hooks to keep call order stable across renders.
  if (number === 0) {
    return null;
  }

  function toggle() {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        document.dispatchEvent(
          new CustomEvent("movemental:cite-opened", { detail: popoverId }),
        );
      }
      return next;
    });
  }

  const labelText =
    ariaLabel ??
    `Source note ${number || "?"}${footnote ? `: ${footnote.slice(0, 120)}${footnote.length > 120 ? "…" : ""}` : ""}`;

  return (
    <span
      className={`cite${className ? ` ${className}` : ""}`}
      ref={wrapperRef}
      data-cite-open={open ? "true" : undefined}
    >
      <span className="cite__trigger-wrap">
        <button
          type="button"
          className="cite__btn"
          aria-expanded={open}
          aria-controls={popoverId}
          aria-label={labelText}
          onClick={toggle}
        >
          {number || "?"}
        </button>
      </span>
      <span
        className="cite__pop"
        id={popoverId}
        role="dialog"
        aria-label={`Source note ${number || "?"}`}
      >
        <span className="cite__pop__footnote">{footnote}</span>
        {registryId ? (
          <a className="cite__pop__link" href={`/footnotes#ref-${registryId}`}>
            Full source and citation ↗
          </a>
        ) : null}
      </span>
    </span>
  );
}
