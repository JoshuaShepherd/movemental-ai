"use client";

import { useState } from "react";

import type { AudienceLens } from "@/lib/book-types";

type ChapterSubscribeCardProps = {
  chapterSlug: string;
  lens: AudienceLens;
  className?: string;
};

export function ChapterSubscribeCard({ chapterSlug, lens, className }: ChapterSubscribeCardProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/book/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          lens,
          source: "chapter_end",
          chapter_slug: chapterSlug,
        }),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={className}>
      <p className="text-sm font-semibold text-foreground">This chapter is still being refined.</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Get notified when it changes — and see who influenced the revision.
      </p>
      {status === "done" ? (
        <p className="mt-4 text-sm text-muted-foreground">
          You&apos;re subscribed for this chapter. Thank you.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
          >
            {status === "loading" ? "…" : "Notify me"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-2 text-xs text-destructive">Something went wrong. Try again in a moment.</p>
      )}
    </div>
  );
}
