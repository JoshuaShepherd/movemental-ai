"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import { ToolkitCover } from "./ToolkitCover";
import { ToolkitDownloadForm } from "./ToolkitDownloadForm";
import { useToolkitModal } from "./toolkit-modal-context";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

/**
 * Toolkit download modal — global, opened via {@link useToolkitModal}.
 *
 * Renders into document.body via portal. Traps focus, closes on Esc and
 * click-outside, and returns focus to the original trigger on close.
 */
export function ToolkitDownloadModal() {
  const { isOpen, openContext, close } = useToolkitModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // SSR portal guard — document.body is only available client-side.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <ToolkitDialog onClose={close} source={openContext?.source} />,
    document.body,
  );
}

/**
 * Inner dialog body — only mounted while the modal is open, so its `submitted`
 * state naturally resets on every reopen.
 */
function ToolkitDialog({ onClose, source }: { onClose: () => void; source?: string }) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Capture the previously-focused element on mount; restore on unmount.
  useEffect(() => {
    triggerRef.current = document.activeElement;
    const dialog = dialogRef.current;
    if (dialog) {
      const first = dialog.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      first?.focus();
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, []);

  // Esc + focus trap
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
      <button
        type="button"
        aria-label="Close toolkit dialog"
        className="absolute inset-0 cursor-default bg-foreground/40 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          "relative z-10 w-full max-w-[560px] overflow-hidden bg-card text-foreground shadow-ambient",
          "border border-border-soft",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-section hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-4" aria-hidden />
        </button>

        {submitted ? (
          <ConfirmationState onClose={onClose} titleId={titleId} descriptionId={descriptionId} />
        ) : (
          <DownloadState
            onSuccess={() => setSubmitted(true)}
            titleId={titleId}
            descriptionId={descriptionId}
            source={source}
          />
        )}
      </div>
    </div>
  );
}

function DownloadState({
  onSuccess,
  titleId,
  descriptionId,
  source,
}: {
  onSuccess: () => void;
  titleId: string;
  descriptionId: string;
  source?: string;
}) {
  return (
    <div className="flex flex-col items-center px-8 py-10 text-center sm:px-10">
      <div className="mb-6 w-32">
        <ToolkitCover size="sm" />
      </div>
      <h2 id={titleId} className="font-serif-display text-3xl tracking-tight text-foreground sm:text-4xl">
        Send the Field Guide to your inbox.
      </h2>
      <p id={descriptionId} className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
        We&apos;ll send the PDF immediately and follow up once over the following week. That&apos;s it.
      </p>

      <div className="mt-8 w-full">
        <ToolkitDownloadForm
          source={source ?? "modal"}
          variant="modal"
          layout="stacked"
          onSuccess={onSuccess}
        />
      </div>

      <Link
        href="/toolkit"
        className="mt-6 inline-flex items-center gap-1 border-b border-transparent pb-0.5 text-[11px] font-semibold uppercase tracking-eyebrow text-foreground transition-colors hover:border-foreground"
      >
        Read more about the Field Guide first <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function ConfirmationState({
  onClose,
  titleId,
  descriptionId,
}: {
  onClose: () => void;
  titleId: string;
  descriptionId: string;
}) {
  return (
    <div className="flex min-h-[440px] flex-col items-center justify-center px-10 py-12 text-center">
      <h2 id={titleId} className="font-serif-display text-3xl italic tracking-tight text-foreground sm:text-4xl">
        On its way.
      </h2>
      <p id={descriptionId} className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
        Check your inbox in the next few minutes. If you don&apos;t see it, check spam — the email will be from{" "}
        <span className="text-foreground">josh@movemental.ai</span>.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="btn-pill btn-pill--ghost mt-10"
      >
        Close
      </button>
    </div>
  );
}
