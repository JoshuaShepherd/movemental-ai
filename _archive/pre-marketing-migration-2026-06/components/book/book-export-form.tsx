"use client";

import { useState } from "react";
import { Download } from "lucide-react";

import type { AudienceLens } from "@/lib/book-types";

type BookExportFormProps = {
  lens: AudienceLens;
};

export function BookExportForm({ lens }: BookExportFormProps) {
  const [email, setEmail] = useState("");
  const [format, setFormat] = useState<"pdf" | "epub">("pdf");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/book/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          lens,
          format,
        }),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-md">
      <div className="mb-3 flex justify-center gap-2 text-xs">
        <label className="flex items-center gap-1.5 text-muted-foreground">
          <input
            type="radio"
            name="export-format"
            checked={format === "pdf"}
            onChange={() => setFormat("pdf")}
            className="accent-primary"
          />
          PDF
        </label>
        <label className="flex items-center gap-1.5 text-muted-foreground">
          <input
            type="radio"
            name="export-format"
            checked={format === "epub"}
            onChange={() => setFormat("epub")}
            className="accent-primary"
          />
          EPUB
        </label>
      </div>
      {status === "done" ? (
        <p className="rounded-xl bg-section p-4 text-center text-sm text-muted-foreground">
          Check your email — we&apos;ve queued your {format.toUpperCase()} and sent your reading link.
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row sm:gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="flex-1 rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
          >
            <Download className="mr-2 h-4 w-4" aria-hidden />
            {status === "loading" ? "…" : "Request download"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-2 text-center text-xs text-destructive">Could not submit. Try again shortly.</p>
      )}
    </div>
  );
}
