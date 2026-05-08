"use client";

import { useState } from "react";

import { ToolkitDownloadForm } from "./ToolkitDownloadForm";

/**
 * Client-side wrapper for the long-form download form on `/toolkit`. Swaps to
 * a confirmation state once the lead is captured.
 */
export function ToolkitPageForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
        <h3 className="font-serif-display text-3xl italic tracking-tight text-foreground">On its way.</h3>
        <p className="text-base leading-relaxed text-muted-foreground">
          Check your inbox in the next few minutes. If you don&apos;t see it, check spam — the email will be from{" "}
          <span className="text-foreground">josh@movemental.ai</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <ToolkitDownloadForm
        source="toolkit-page"
        variant="page"
        layout="stacked"
        onSuccess={() => setSubmitted(true)}
      />
    </div>
  );
}
