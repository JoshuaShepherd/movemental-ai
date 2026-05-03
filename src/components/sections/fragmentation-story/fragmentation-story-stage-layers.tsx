import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { AudienceId, ChapterId, IntelligenceField } from "./fragmentation-story-content";
import { FragmentationIntelArtifact } from "./fragmentation-story-intel-artifact";

/**
 * Sticky-stage composites — pixel-aligned to docs/build/fragmentation-sticky-mockup.html
 * (artifact layers per data-chapter).
 */
export function FragmentationStoryStageLayers({
  active,
  audience,
  field,
}: {
  active: ChapterId;
  audience: AudienceId;
  field: IntelligenceField;
}) {
  return (
    <div className="relative mx-auto flex min-h-[min(28rem,70dvh)] w-full max-w-[min(26rem,100%)] items-center justify-center">
      {/* Act I — Unity */}
      <StageShell id="unity" active={active}>
        <div
          data-scrub-card
          className="relative aspect-[927/1152] w-full overflow-hidden rounded-[var(--radius-md)] bg-card shadow-ambient"
        >
          <div className="absolute inset-0 min-h-0 min-w-0">
            <FragmentationIntelArtifact
              slug="order-of-service-structured-units"
              audience={audience}
              field={field}
              className="h-full w-full"
              embedded
              aria-label=""
            />
          </div>
        </div>
      </StageShell>

      {/* Act I.b — Session */}
      <StageShell id="session" active={active}>
        <div
          data-scrub-card
          className="relative aspect-[928/1152] w-full overflow-hidden rounded-[var(--radius-md)] bg-card shadow-ambient"
        >
          <div className="absolute inset-0 min-h-0 min-w-0">
            <FragmentationIntelArtifact
              slug="session-essential-structures-card"
              audience={audience}
              field={field}
              className="h-full w-full"
              embedded
              aria-label=""
            />
          </div>
        </div>
      </StageShell>

      {/* Act II — First break (ghost + card, landscape) */}
      <StageShell id="first-break" active={active}>
        <div className="relative aspect-[1312/816] w-full max-w-md">
          <div
            className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] shadow-ambient"
            style={{
              transform: "translate(-10%, -4%) rotate(-2deg)",
            }}
          >
            <div
              data-scrub-ghost
              className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] bg-card opacity-55"
            >
              <div className="absolute inset-0 min-h-0 min-w-0">
                <FragmentationIntelArtifact
                  slug="formal-design-systems-split-flow"
                  audience={audience}
                  field={field}
                  className="h-full w-full"
                  embedded
                  aria-label=""
                />
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] shadow-ambient"
            style={{
              transform: "translate(4%, 2%) rotate(1.2deg)",
            }}
          >
            <div
              data-scrub-card
              className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] bg-card"
            >
              <div className="absolute inset-0 min-h-0 min-w-0">
                <FragmentationIntelArtifact
                  slug="formal-design-systems-split-flow"
                  audience={audience}
                  field={field}
                  className="h-full w-full"
                  embedded
                  aria-label=""
                />
              </div>
            </div>
          </div>
        </div>
      </StageShell>

      {/* Act III — Divergence */}
      <StageShell id="divergence" active={active}>
        <div className="relative aspect-[896/1200] w-full max-w-[min(22rem,100%)]">
          <div
            className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] shadow-ambient"
            style={{ transform: "translate(14%, 6%) rotate(2.5deg)" }}
          >
            <div
              data-scrub-ghost
              className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] bg-card opacity-55"
            >
              <div className="absolute inset-0 min-h-0 min-w-0">
                <FragmentationIntelArtifact
                  slug="module-formal-systems-intro"
                  audience={audience}
                  field={field}
                  className="h-full w-full"
                  embedded
                  aria-label=""
                />
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] shadow-ambient"
            style={{ transform: "translate(-12%, -8%) rotate(-2deg)" }}
          >
            <div
              data-scrub-ghost
              className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] bg-card opacity-55"
            >
              <div className="absolute inset-0 min-h-0 min-w-0">
                <FragmentationIntelArtifact
                  slug="cover-principles-design-fragmentation"
                  audience={audience}
                  field={field}
                  className="h-full w-full"
                  embedded
                  aria-label=""
                />
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] shadow-ambient"
            style={{ transform: "translate(-3%, 2%) rotate(0.8deg)" }}
          >
            <div
              data-scrub-card
              className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] bg-card"
            >
              <div className="absolute inset-0 min-h-0 min-w-0">
                <FragmentationIntelArtifact
                  slug="book-fragments-of-form"
                  audience={audience}
                  field={field}
                  className="h-full w-full"
                  embedded
                  aria-label=""
                />
              </div>
            </div>
          </div>
        </div>
      </StageShell>

      {/* Act IV — Channels */}
      <StageShell id="channels" active={active}>
        <div className="relative aspect-[928/1152] w-full max-w-[min(22rem,100%)]">
          <div
            className="absolute flex items-center justify-center"
            style={{ transform: "translate(-18%, 6%) rotate(-1.5deg)" }}
          >
            <div
              data-scrub-ghost
              className="relative aspect-square w-[min(42%,10.5rem)] overflow-hidden rounded-[var(--radius-md)] bg-card opacity-55 shadow-ambient"
            >
              <div className="absolute inset-0 min-h-0 min-w-0">
                <FragmentationIntelArtifact
                  slug="podcast-card-abstract-structures"
                  audience={audience}
                  field={field}
                  className="h-full w-full"
                  embedded
                  aria-label=""
                />
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] shadow-ambient"
            style={{ transform: "translate(10%, -4%) rotate(1.8deg)" }}
          >
            <div
              data-scrub-card
              className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] bg-card"
            >
              <div className="absolute inset-0 min-h-0 min-w-0">
                <FragmentationIntelArtifact
                  slug="mobile-chat-skeleton-bubbles"
                  audience={audience}
                  field={field}
                  className="h-full w-full"
                  embedded
                  aria-label=""
                />
              </div>
            </div>
          </div>
        </div>
      </StageShell>

      {/* Act V — Misalignment */}
      <StageShell id="misalignment" active={active}>
        <div className="relative aspect-[927/1152] w-full max-w-[min(22rem,100%)]">
          <div
            className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] shadow-ambient"
            style={{ transform: "translate(-22%, 10%) rotate(-2.2deg)" }}
          >
            <div
              data-scrub-ghost
              className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] bg-card opacity-55"
            >
              <div className="absolute inset-0 min-h-0 min-w-0">
                <FragmentationIntelArtifact
                  slug="cover-structural-fragments-investigation"
                  audience={audience}
                  field={field}
                  className="h-full w-full"
                  embedded
                  aria-label=""
                />
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] shadow-ambient"
            style={{ transform: "translate(14%, -8%) rotate(2deg)" }}
          >
            <div
              data-scrub-ghost
              className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] bg-card opacity-55"
            >
              <div className="absolute inset-0 min-h-0 min-w-0">
                <FragmentationIntelArtifact
                  slug="message-thread-staggered-fragments"
                  audience={audience}
                  field={field}
                  className="h-full w-full"
                  embedded
                  aria-label=""
                />
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] shadow-ambient"
            style={{ transform: "translate(-6%, 4%) rotate(-1.2deg)" }}
          >
            <div
              data-scrub-card
              className="absolute inset-0 overflow-hidden rounded-[var(--radius-md)] bg-card"
            >
              <div className="absolute inset-0 min-h-0 min-w-0">
                <FragmentationIntelArtifact
                  slug="email-thread-multi-participant"
                  audience={audience}
                  field={field}
                  className="h-full w-full"
                  embedded
                  aria-label=""
                />
              </div>
            </div>
          </div>
        </div>
      </StageShell>
    </div>
  );
}

function StageShell({
  id,
  active,
  children,
}: {
  id: ChapterId;
  active: ChapterId;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-out",
        active === id ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      data-chapter-artifact={id}
    >
      {children}
    </div>
  );
}
