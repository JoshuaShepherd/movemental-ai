"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Save, Sparkles } from "lucide-react";

import {
  FUTURE_PLAN_SECTIONS,
  type FuturePlanContent,
  type FuturePlanSectionSlug,
} from "@/lib/sandboxlive/future-plan.server";
import { cn } from "@/lib/utils";

import type { SaveSectionResult } from "@/app/(dashboard)/sandboxlive/phase/08-future-plan/actions";

export interface FuturePlanEditorProps {
  organizationName: string;
  content: FuturePlanContent;
  currentVersion: number;
  status: "draft" | "under_review" | "ratified" | "archived";
  orgSlug: string | undefined;
  /** Server action — passed in to keep this component framework-pure. */
  onSaveSection: (params: {
    orgSlug: string | undefined;
    sectionSlug: FuturePlanSectionSlug;
    bodyMarkdown: string;
  }) => Promise<SaveSectionResult>;
}

export function FuturePlanEditor({
  organizationName,
  content,
  currentVersion,
  status,
  orgSlug,
  onSaveSection,
}: FuturePlanEditorProps) {
  const [activeSlug, setActiveSlug] = useState<FuturePlanSectionSlug>(
    FUTURE_PLAN_SECTIONS[0].slug,
  );

  // Per-section local draft (initialized from server content; diverges as the
  // user edits; reconciled on save).
  const [drafts, setDrafts] = useState<Record<FuturePlanSectionSlug, string>>(() => {
    const init = {} as Record<FuturePlanSectionSlug, string>;
    for (const section of FUTURE_PLAN_SECTIONS) {
      init[section.slug] = content[section.slug]?.body_md ?? "";
    }
    return init;
  });

  const [version, setVersion] = useState(currentVersion);
  const [saveMessage, setSaveMessage] = useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const activeSection =
    FUTURE_PLAN_SECTIONS.find((s) => s.slug === activeSlug) ??
    FUTURE_PLAN_SECTIONS[0];

  const handleSave = () => {
    setSaveMessage(null);
    startTransition(async () => {
      const result = await onSaveSection({
        orgSlug,
        sectionSlug: activeSlug,
        bodyMarkdown: drafts[activeSlug] ?? "",
      });
      if (result.ok) {
        setVersion(result.version);
        setSaveMessage({ tone: "success", text: `Saved as version ${result.version}.` });
      } else {
        setSaveMessage({ tone: "error", text: result.reason });
      }
    });
  };

  const draftValue = drafts[activeSlug] ?? "";
  const serverValue = content[activeSlug]?.body_md ?? "";
  const dirty = draftValue !== serverValue;

  return (
    <div className="flex h-full flex-1 overflow-hidden">
      {/* Drafting column */}
      <div className="flex flex-1 flex-col overflow-y-auto border-r border-safestart-hairline">
        <header className="sticky top-0 z-10 border-b border-safestart-hairline bg-safestart-bg px-8 py-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-serif text-[24px] italic leading-tight text-safestart-ink">
              Future Plan Workspace
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-safestart-muted">
              <CheckCircle2 className="size-3.5" aria-hidden />
              {status === "draft"
                ? `Draft · v${version}`
                : status === "under_review"
                  ? `Under review · v${version}`
                  : status === "ratified"
                    ? `Ratified · v${version}`
                    : `Archived · v${version}`}
            </div>
          </div>
          <nav className="flex gap-6 overflow-x-auto border-b border-safestart-hairline" aria-label="Future Plan sections">
            {FUTURE_PLAN_SECTIONS.map((section) => {
              const isActive = section.slug === activeSlug;
              const isDirty = (drafts[section.slug] ?? "") !== (content[section.slug]?.body_md ?? "");
              return (
                <button
                  key={section.slug}
                  type="button"
                  onClick={() => {
                    setActiveSlug(section.slug);
                    setSaveMessage(null);
                  }}
                  className={cn(
                    "shrink-0 whitespace-nowrap pb-2 text-[10px] font-medium uppercase tracking-[0.1em] transition-colors",
                    isActive
                      ? "border-b-2 border-pathway-accent text-safestart-ink"
                      : "text-safestart-muted hover:text-pathway-accent",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {String(section.order).padStart(2, "0")}: {section.name}
                  {isDirty && !isActive ? (
                    <span aria-label="Unsaved changes" className="ml-1 text-pathway-accent">
                      •
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </header>

        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-8">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
              {activeSection.eyebrow}
            </p>
            <h3 className="font-serif text-[clamp(2rem,3.6vw,2.5rem)] italic leading-tight text-safestart-ink">
              {activeSection.heading}
            </h3>
            <p className="text-[14px] leading-relaxed text-safestart-muted">
              {activeSection.prompt}
            </p>
          </div>

          <div className="relative flex-1">
            <div className="absolute -left-6 top-2 bottom-0 w-px bg-pathway-accent/20" aria-hidden />
            <textarea
              value={draftValue}
              onChange={(e) =>
                setDrafts((prev) => ({ ...prev, [activeSlug]: e.target.value }))
              }
              className="min-h-[420px] w-full resize-none bg-transparent p-0 text-[16px] leading-relaxed text-safestart-ink placeholder:text-safestart-muted/60 focus:outline-none"
              placeholder={activeSection.placeholder}
              aria-label={`${activeSection.name} section body`}
            />
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-safestart-hairline pt-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending || !dirty}
                className={cn(
                  "inline-flex items-center gap-2 bg-safestart-ink px-4 py-2 text-[12px] font-medium text-safestart-bg transition-opacity",
                  isPending || !dirty
                    ? "cursor-not-allowed opacity-40"
                    : "hover:opacity-90",
                )}
              >
                <Save className="size-3.5" aria-hidden />
                {isPending ? "Saving…" : dirty ? "Save section" : "Saved"}
              </button>
              {saveMessage ? (
                <span
                  className={cn(
                    "text-[12px]",
                    saveMessage.tone === "success"
                      ? "text-[color:var(--color-status-go)]"
                      : "text-[color:var(--destructive)]",
                  )}
                  role="status"
                >
                  {saveMessage.text}
                </span>
              ) : null}
            </div>
            <span className="text-[11px] uppercase tracking-[0.08em] text-safestart-muted">
              {organizationName}
            </span>
          </div>
        </div>
      </div>

      {/* Synthesis assistant column — Stitch design's right pane; agent runtime
          integration is a follow-up. */}
      <aside className="hidden h-full w-96 shrink-0 flex-col border-l border-safestart-hairline bg-safestart-surface-container lg:flex">
        <div className="border-b border-safestart-hairline bg-section p-6">
          <div className="mb-2 flex items-center gap-3">
            <Sparkles className="size-4 text-pathway-accent" aria-hidden />
            <h3 className="font-serif text-[20px] italic leading-tight text-safestart-ink">
              Synthesis assistant
            </h3>
          </div>
          <p className="text-[12px] text-safestart-muted">
            Pulls evidence from the cohort&rsquo;s Current Reality Maps, Ethics
            Review verdicts, and Discerning verdicts — drop the relevant pieces
            into the section you&rsquo;re writing.
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
          <div className="border-l-2 border-pathway-accent/30 bg-safestart-bg p-4">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
              Planned
            </p>
            <p className="text-[13px] leading-relaxed text-safestart-ink">
              The synthesis assistant pulls from your Phase 02 Current Reality
              Maps, Phase 06 Ethics Review verdicts, and Phase 07 Discerning
              verdicts. Wired up once the SandboxLive cohort data layer is
              populated.
            </p>
          </div>
          <ul className="flex flex-col gap-3 text-[13px] text-safestart-muted">
            <li>
              <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-safestart-muted">
                Source — Current Reality Maps
              </p>
              <p className="text-safestart-ink">Will surface map findings relevant to {activeSection.name}.</p>
            </li>
            <li>
              <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-safestart-muted">
                Source — Ethics Review
              </p>
              <p className="text-safestart-ink">Will surface green/yellow/red verdicts touching {activeSection.name}.</p>
            </li>
            <li>
              <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-safestart-muted">
                Source — Discerning
              </p>
              <p className="text-safestart-ink">Will surface the cohort&rsquo;s final adjudications for this section.</p>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
