"use client";

import { Link2, Mail, MessageCircle, Share2 } from "lucide-react";
import { useCallback, useState, useSyncExternalStore } from "react";

import {
  shareBlueskyCompose,
  shareEmail,
  shareFacebookSharer,
  shareLinkedInOffsite,
  shareTwitterIntent,
} from "@/lib/share-links";
import { cn } from "@/lib/utils";

type ShareToolbarProps = {
  title: string;
  url: string;
  className?: string;
};

const subscribeNativeShare = () => () => {};
const getNativeShare = () =>
  typeof navigator !== "undefined" && typeof navigator.share === "function";
const getNativeShareServer = () => false;

export function ShareToolbar({ title, url, className }: ShareToolbarProps) {
  const [copied, setCopied] = useState(false);
  const nativeShare = useSyncExternalStore(
    subscribeNativeShare,
    getNativeShare,
    getNativeShareServer,
  );

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }, [url]);

  const onNativeShare = useCallback(async () => {
    try {
      await navigator.share({ title, text: title, url });
    } catch {
      /* user cancel */
    }
  }, [title, url]);

  const open = useCallback((href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <div
      data-slot="share-toolbar"
      className={cn("flex flex-wrap items-center gap-1.5", className)}
    >
      <span className="mr-1 text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
        Share
      </span>

      {nativeShare ? (
        <button
          type="button"
          onClick={onNativeShare}
          className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Share using your device"
        >
          <Share2 className="h-4 w-4" />
        </button>
      ) : null}

      <button
        type="button"
        onClick={copyLink}
        className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={copied ? "Link copied" : "Copy link"}
      >
        <Link2 className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => open(shareTwitterIntent(title, url))}
        className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Share on X"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => open(shareLinkedInOffsite(url))}
        className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Share on LinkedIn"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => open(shareFacebookSharer(url))}
        className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Share on Facebook"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => open(shareBlueskyCompose(title, url))}
        className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Share on Bluesky"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
      </button>

      <a
        href={shareEmail(title, url)}
        className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Share by email"
      >
        <Mail className="h-4 w-4" />
      </a>
    </div>
  );
}
