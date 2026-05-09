"use client";

import { useToolkitModal } from "@/components/toolkit/toolkit-modal-context";
import { cn } from "@/lib/utils";

/**
 * HowWeUseAiToolkitTrigger — closing CTA on /how-we-use-ai. Opens the shared
 * `<ToolkitDownloadModal />`. The `source` is recorded on the lead so the
 * day-0 / day-3 / day-7 follow-up can segment by surface.
 */
export function HowWeUseAiToolkitTrigger({
  source = "how-we-use-ai-closing",
  className,
}: {
  source?: string;
  className?: string;
}) {
  const { open } = useToolkitModal();
  return (
    <button
      type="button"
      onClick={() => open({ source })}
      className={cn("btn-pill btn-pill--primary", className)}
    >
      Download the Safety toolkit
    </button>
  );
}
