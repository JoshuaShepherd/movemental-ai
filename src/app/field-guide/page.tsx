import { Suspense } from "react";
import type { Metadata } from "next";
import { FieldGuidePageContent } from "@/components/field-guide/field-guide-page-content";

export const metadata: Metadata = {
  title: "Field Guide: AI Safety Handbook | Movemental",
  description: "First response documentation for non-profits, churches, and institutions. Get the free field guide.",
  alternates: {
    canonical: "/field-guide",
  },
};

export default function V2FieldGuidePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-2xl px-4 py-20">
          <p className="font-mono text-sm text-[var(--color-ink-band-ink-muted)]">Loading field guide…</p>
        </div>
      }
    >
      <FieldGuidePageContent />
    </Suspense>
  );
}
