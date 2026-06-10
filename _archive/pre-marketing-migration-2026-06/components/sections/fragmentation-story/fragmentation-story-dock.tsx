"use client";

import { cn } from "@/lib/utils";

import {
  AUDIENCE_LABEL,
  AUDIENCE_ORDER,
  type AudienceId,
  type IntelligenceField,
} from "./fragmentation-story-content";

type Props = {
  audience: AudienceId;
  onAudienceChange: (id: AudienceId) => void;
  field: IntelligenceField;
  onFieldChange: (f: IntelligenceField) => void;
};

const AUDIENCE_GLYPHS: Record<AudienceId, React.ReactNode> = {
  leader: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="8" r="2.25" />
      <circle cx="18" cy="6" r="2.25" />
      <circle cx="15" cy="17" r="2.25" />
      <path
        d="M7.8 9.2L13.2 15.5M16.2 7.8L14.8 15M8.5 9.5L13.5 6.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  nonprofit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M12 21s-7-4.35-7-11a7 7 0 0 1 14 0c0 6.65-7 11-7 11Z"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  church: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3 19 8v13H5V8l7-5Z" strokeLinejoin="round" />
      <path d="M10 21v-6h4v6" />
    </svg>
  ),
  institution: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        d="M4 20V10L12 5L20 10V20M4 20H20M8 20V14H12V20M16 14V20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const FIELD_GLYPHS: Record<IntelligenceField, React.ReactNode> = {
  informational: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <rect x="4" y="4" width="7" height="9" rx="1" />
      <rect x="13" y="4" width="7" height="5" rx="1" />
      <rect x="13" y="11" width="7" height="9" rx="1" />
      <rect x="4" y="15" width="7" height="5" rx="1" />
    </svg>
  ),
  relational: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <circle cx="9" cy="10" r="3" />
      <circle cx="16" cy="8" r="2.5" />
      <path
        d="M4 20c1.2-3.5 4.5-6 8-6s6.8 2.5 8 6"
        strokeLinecap="round"
      />
      <path d="M17 12h3v3" strokeLinecap="round" />
    </svg>
  ),
};

export function FragmentationStoryDock({
  audience,
  onAudienceChange,
  field,
  onFieldChange,
}: Props) {
  return (
    <div
      id="audience-dock"
      className="bg-inverse-surface/[0.97] text-inverse-foreground shadow-ambient backdrop-blur-sm supports-[backdrop-filter]:bg-inverse-surface/[0.94]"
      data-slot="fragmentation-dock"
    >
      <div className="mx-auto flex w-full max-w-(--container-max) flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-12">
        <nav
          aria-label="Audience type"
          className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
        >
          {AUDIENCE_ORDER.map((id) => {
            const active = audience === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                data-tab={id}
                aria-selected={active}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-inverse-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface focus-visible:outline-none",
                  active
                    ? "bg-inverse-foreground/10 text-inverse-foreground ring-1 ring-inverse-foreground/45"
                    : "text-inverse-foreground/80 hover:bg-inverse-foreground/10"
                )}
                onClick={() => onAudienceChange(id)}
              >
                <span aria-hidden="true" className="grid h-4 w-4 place-items-center">
                  {AUDIENCE_GLYPHS[id]}
                </span>
                <span>{AUDIENCE_LABEL[id]}</span>
              </button>
            );
          })}
        </nav>

        <div
          className="flex shrink-0 items-center gap-2"
          role="group"
          aria-label="Intelligence field"
        >
          <span className="text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/55">
            View
          </span>
          <div className="flex items-center gap-1 rounded-full bg-inverse-foreground/5 p-0.5">
            {(
              [
                ["informational", "Informational"],
                ["relational", "Relational"],
              ] as const
            ).map(([key, label]) => {
              const active = field === key;
              return (
                <button
                  key={key}
                  type="button"
                  data-view={key === "informational" ? "info" : "rel"}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-medium uppercase tracking-eyebrow transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-inverse-foreground focus-visible:outline-none",
                    active
                      ? "bg-inverse-foreground/12 text-inverse-foreground"
                      : "text-inverse-foreground/60 hover:text-inverse-foreground"
                  )}
                  onClick={() => onFieldChange(key)}
                >
                  {FIELD_GLYPHS[key]}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
