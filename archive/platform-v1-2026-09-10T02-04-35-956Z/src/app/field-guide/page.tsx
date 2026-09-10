import { Suspense } from "react";

import { FieldGuidePageContent } from "@/components/field-guide/field-guide-page-content";

export default function FieldGuidePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-2xl px-4 py-20">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      }
    >
      <FieldGuidePageContent />
    </Suspense>
  );
}
