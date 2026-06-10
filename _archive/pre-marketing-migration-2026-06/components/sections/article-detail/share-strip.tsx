"use client";

import { Share2 } from "lucide-react";
import { useCallback, useState, useSyncExternalStore } from "react";

import {
  shareBlueskyCompose,
  shareEmail,
  shareFacebookSharer,
  shareLinkedInOffsite,
  shareTwitterIntent,
} from "@/lib/share-links";

type ShareStripProps = {
  title: string;
  /** Canonical page URL from the server (preview-safe). */
  canonicalUrl: string;
};

const subscribeNativeShare = () => () => {};
const getNativeShare = () =>
  typeof navigator !== "undefined" && typeof navigator.share === "function";
const getNativeShareServer = () => false;

/**
 * Share strip below the article body — Web Share when available, plus network fallbacks.
 */
export function ShareStrip({ title, canonicalUrl }: ShareStripProps) {
  const [copied, setCopied] = useState(false);
  const nativeShare = useSyncExternalStore(
    subscribeNativeShare,
    getNativeShare,
    getNativeShareServer,
  );

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* link buttons still work */
    }
  }, [canonicalUrl]);

  const onNativeShare = useCallback(async () => {
    try {
      await navigator.share({ title, text: title, url: canonicalUrl });
    } catch {
      /* user cancel or unsupported */
    }
  }, [canonicalUrl, title]);

  const open = useCallback((href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div className="mt-12 flex max-w-(--prose-max) flex-wrap items-center gap-3 pt-6">
      <span className="mr-1 text-[0.78rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        Share
      </span>
      {nativeShare ? (
        <button
          type="button"
          onClick={onNativeShare}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label="Share using your device"
        >
          <Share2 className="h-4 w-4 shrink-0" aria-hidden />
          Share…
        </button>
      ) : null}
      <button
        type="button"
        onClick={() => open(shareTwitterIntent(title, canonicalUrl))}
        className="rounded-md bg-section px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-elevated focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label="Share on X"
      >
        X
      </button>
      <button
        type="button"
        onClick={() => open(shareLinkedInOffsite(canonicalUrl))}
        className="rounded-md bg-section px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-elevated focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </button>
      <button
        type="button"
        onClick={() => open(shareFacebookSharer(canonicalUrl))}
        className="rounded-md bg-section px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-elevated focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label="Share on Facebook"
      >
        Facebook
      </button>
      <button
        type="button"
        onClick={() => open(shareBlueskyCompose(title, canonicalUrl))}
        className="rounded-md bg-section px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-elevated focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label="Share on Bluesky"
      >
        Bluesky
      </button>
      <a
        href={shareEmail(title, canonicalUrl)}
        className="rounded-md bg-section px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-elevated focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label="Share by email"
      >
        Email
      </a>
      <button
        type="button"
        onClick={onCopy}
        className="rounded-md bg-section px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-elevated focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label="Copy link to clipboard"
      >
        {copied ? "Copied ✓" : "Copy link"}
      </button>
    </div>
  );
}
