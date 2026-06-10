"use client";

import Link from "next/link";
import { ArrowLeft, Download, Share2 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AudienceLens } from "@/lib/book-types";
import { formatLens } from "@/lib/book-types";
import { BOOK_SHORT_NAME } from "@/lib/book-meta";

type ReadingToolbarProps = {
  chapterLabel: string;
  chapterTitle: string;
  chapterIndex: number;
  totalChapters: number;
  lens?: AudienceLens;
  className?: string;
};

export function ReadingToolbar({
  chapterLabel,
  chapterTitle,
  chapterIndex,
  totalChapters,
  lens,
  className,
}: ReadingToolbarProps) {
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: chapterTitle, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div
      data-slot="reading-toolbar"
      className={cn(
        "sticky top-16 z-40 border-b border-border/50 bg-card/80 backdrop-blur-xl",
        className
      )}
    >
      <div className="mx-auto flex h-12 max-w-(--container-max) items-center gap-4 px-4 sm:px-6 lg:px-12">
        {/* Back */}
        <Link
          href="/book"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">{BOOK_SHORT_NAME}</span>
        </Link>

        {/* Center */}
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <span className="truncate text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{chapterLabel}</span>
            <span className="mx-1.5">&middot;</span>
            <span className="hidden sm:inline">{chapterTitle}</span>
            <span className="sm:hidden">
              {chapterIndex + 1} of {totalChapters}
            </span>
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {lens && lens !== "movement-leaders" && (
            <span className="hidden rounded-full bg-section px-2.5 py-1 text-[0.65rem] font-medium text-muted-foreground sm:inline">
              {formatLens(lens)} Edition
            </span>
          )}
          <button
            type="button"
            onClick={handleShare}
            className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Share this chapter"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <Link
            href="/book#download"
            className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Download book"
          >
            <Download className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
