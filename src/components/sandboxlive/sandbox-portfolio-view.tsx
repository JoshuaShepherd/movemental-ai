"use client";

import { Flag, Menu, X } from "lucide-react";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import {
  type DiscernmentColumnId,
  type SandboxPortfolioDiscernmentCase,
  type SandboxPortfolioEthicalTag,
  type SandboxPortfolioSkill,
  type SandboxPortfolioSkillCategory,
  SANDBOX_PORTFOLIO_DISCERNMENT_CASES,
  SANDBOX_PORTFOLIO_ETHICAL_TAGS,
  SANDBOX_PORTFOLIO_SKILL_FILTERS,
  SANDBOX_PORTFOLIO_SKILL_SECTIONS,
  type SandboxPortfolioTitlePart,
} from "@/lib/sandboxlive/sandbox-portfolio-catalog";
import { cn } from "@/lib/utils";

const VIEW_LABELS: Record<"hub" | "lab" | "gov", string> = {
  hub: "Recipe Delivery Hub",
  lab: "Experimentation Wizard",
  gov: "Discernment Dashboard",
};

function buildInitialEthicalCounts(): Record<string, Partial<Record<SandboxPortfolioEthicalTag, number>>> {
  const out: Record<string, Partial<Record<SandboxPortfolioEthicalTag, number>>> = {};
  for (const c of SANDBOX_PORTFOLIO_DISCERNMENT_CASES) {
    if (c.initialEthicalCounts) {
      out[c.id] = { ...c.initialEthicalCounts };
    }
  }
  return out;
}

function formatFlagLogText(
  id: string,
  counts: Record<string, Partial<Record<SandboxPortfolioEthicalTag, number>>>,
): string {
  const row = counts[id];
  if (!row) return "";
  const keys = (Object.keys(row) as SandboxPortfolioEthicalTag[]).filter((k) => (row[k] ?? 0) > 0);
  if (keys.length === 0) return "";
  const total = keys.reduce((s, k) => s + (row[k] ?? 0), 0);
  if (keys.length === 1) {
    const k = keys[0];
    return `Logged ethical flags: ${row[k]} for ${k}`;
  }
  const parts = keys.map((k) => `${row[k]}× ${k}`);
  return `Logged ethical flags: ${total} total (${parts.join(", ")})`;
}

function SkillTitle({ parts }: { parts: SandboxPortfolioTitlePart[] }) {
  return (
    <h3 className="m-0 text-[1.1rem] font-semibold leading-snug tracking-tight text-foreground">
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <Fragment key={i}>{p}</Fragment>
        ) : (
          <em key={i} className="font-serif text-[1.04em] font-normal italic">
            {p.em}
          </em>
        ),
      )}
    </h3>
  );
}

function skillMatchesFilter(skill: SandboxPortfolioSkill, active: SandboxPortfolioSkillCategory | "all"): boolean {
  if (active === "all") return true;
  const tags = skill.tags.toLowerCase().split(/\s+/);
  return tags.includes(active);
}

function skillMatchesQuery(skill: SandboxPortfolioSkill, q: string): boolean {
  if (!q) return true;
  const hay = skill.search.toLowerCase();
  const body = `${skill.titleParts.map((p) => (typeof p === "string" ? p : p.em)).join("")} ${skill.dek}`.toLowerCase();
  return hay.includes(q) || body.includes(q);
}

function DiscernmentColumn({
  column,
  title,
  cases,
  ethicalFlagCounts,
  onOpenPopover,
  openPopoverFor,
  selectedEthicalTags,
  toggleEthicalTag,
  onSubmitEthical,
  flagContextById,
  setFlagContext,
}: {
  column: DiscernmentColumnId;
  title: string;
  cases: SandboxPortfolioDiscernmentCase[];
  ethicalFlagCounts: Record<string, Partial<Record<SandboxPortfolioEthicalTag, number>>>;
  onOpenPopover: (id: string | null) => void;
  openPopoverFor: string | null;
  selectedEthicalTags: Set<SandboxPortfolioEthicalTag>;
  toggleEthicalTag: (tag: SandboxPortfolioEthicalTag) => void;
  onSubmitEthical: (useCaseId: string) => void;
  flagContextById: Record<string, string>;
  setFlagContext: (id: string, v: string) => void;
}) {
  const meta = {
    deploy: {
      eyebrow: "Green light",
      eyebrowClass: "text-status-go",
      headerBorder: "border-border",
    },
    modify: {
      eyebrow: "Yellow light",
      eyebrowClass: "text-status-caution",
      headerBorder: "border-border",
    },
    refuse: {
      eyebrow: "Red light",
      eyebrowClass: "text-destructive",
      headerBorder: "border-destructive/25 bg-destructive/5",
    },
  }[column];

  const colCases = cases.filter((c) => c.column === column);
  return (
    <section
      className={cn(
        "flex min-w-[260px] flex-1 flex-col rounded-card border border-border bg-card",
        column === "refuse" && "border-destructive/30",
      )}
    >
      <header className={cn("border-b px-4 py-3", meta.headerBorder)}>
        <p className={cn("text-[11px] font-medium uppercase tracking-[0.09em]", meta.eyebrowClass)}>{meta.eyebrow}</p>
        <h3 className="mt-1 text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {column === "deploy" && "Clear human benefit; data posture approved."}
          {column === "modify" && "Real benefit; needs guardrails or narrower scope."}
          {column === "refuse" && "Harms flourishing, dignity risk, or unacceptable data exposure."}
        </p>
      </header>
      <div className="flex flex-1 flex-col gap-3 bg-background/50 p-3">
        {colCases.map((c) => (
          <article
            key={c.id}
            className={cn(
              "relative rounded-card border bg-card p-4",
              column === "refuse" ? "border-destructive/40" : "border-border-soft",
            )}
          >
            <h4
              className={cn(
                "text-sm font-semibold",
                c.titleTone === "destructive" ? "text-destructive" : "text-foreground",
              )}
            >
              {c.title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.description}</p>
            <dl className="mt-3 grid gap-1.5 rounded-lg border border-border bg-background/60 px-3 py-2.5 text-[11px] text-muted-foreground">
              <div className="flex justify-between gap-2">
                <dt>Total hours saved</dt>
                <dd className="font-semibold text-foreground">{c.hoursSaved}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>Cost avoidance</dt>
                <dd className="font-semibold text-foreground">{c.costAvoidance}</dd>
              </div>
            </dl>
            {c.owner ? (
              <>
                <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.09em] text-ink-soft">Owner</p>
                <p className="text-xs text-muted-foreground">{c.owner}</p>
              </>
            ) : null}
            {c.statusHeading ? (
              <>
                <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.09em] text-destructive/90">
                  {c.statusHeading}
                </p>
                <p className="text-xs text-muted-foreground">{c.statusText}</p>
              </>
            ) : null}
            {(() => {
              const log = formatFlagLogText(c.id, ethicalFlagCounts);
              return (
                <div
                  className={cn("mt-2 text-[11px] text-muted-foreground", !log && "hidden")}
                  aria-live="polite"
                >
                  {log}
                </div>
              );
            })()}
            <div
              data-ethical-popover
              className={cn(
                "absolute bottom-[2.85rem] right-3 z-20 w-[min(292px,calc(100%-1.5rem))] rounded-card border border-border bg-card p-4 shadow-ambient",
                openPopoverFor !== c.id && "hidden",
              )}
              role="dialog"
              aria-label="Flag ethical concern"
            >
              <p className="text-[11px] font-semibold text-foreground">What kind of tension does this create?</p>
              <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Tension categories">
                {SANDBOX_PORTFOLIO_ETHICAL_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={cn(
                      "rounded-full border border-border bg-background px-2.5 py-1 text-[10.5px] font-medium text-muted-foreground transition-colors hover:border-foreground/20",
                      selectedEthicalTags.has(tag) && "border-transparent bg-foreground text-background",
                    )}
                    onClick={() => toggleEthicalTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <label className="mt-3 block text-[10.5px] font-medium text-foreground" htmlFor={`flag-ctx-${c.id}`}>
                Briefly, what did you see?
              </label>
              <input
                id={`flag-ctx-${c.id}`}
                type="text"
                value={flagContextById[c.id] ?? ""}
                onChange={(e) => setFlagContext(c.id, e.target.value)}
                className="mt-1 w-full rounded-card border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Optional detail"
                autoComplete="off"
              />
              <button
                type="button"
                className="mt-3 w-full rounded-full bg-foreground py-2 text-xs font-medium text-background"
                onClick={() => onSubmitEthical(c.id)}
              >
                Submit Flag
              </button>
            </div>
            <button
              type="button"
              className="flag-concern-trigger mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-ink-soft hover:text-muted-foreground"
              aria-expanded={openPopoverFor === c.id}
              aria-haspopup="dialog"
              onClick={(e) => {
                e.stopPropagation();
                onOpenPopover(openPopoverFor === c.id ? null : c.id);
              }}
            >
              <Flag className="size-3.5 shrink-0 text-muted-foreground" strokeWidth={1.75} aria-hidden />
              Flag Concern
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SandboxPortfolioView() {
  const [activeView, setActiveView] = useState<"hub" | "lab" | "gov">("hub");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [skillQuery, setSkillQuery] = useState("");
  const [activeSkillFilter, setActiveSkillFilter] = useState<SandboxPortfolioSkillCategory | "all">("all");
  const [downloadModal, setDownloadModal] = useState<{ open: boolean; body: string }>({ open: false, body: "" });
  const [toastOpen, setToastOpen] = useState(false);
  const [ethicalFlagCounts, setEthicalFlagCounts] =
    useState<Record<string, Partial<Record<SandboxPortfolioEthicalTag, number>>>>(buildInitialEthicalCounts);
  const [openPopoverFor, setOpenPopoverFor] = useState<string | null>(null);
  const [selectedEthicalTags, setSelectedEthicalTags] = useState<Set<SandboxPortfolioEthicalTag>>(new Set());
  const [flagContextById, setFlagContextById] = useState<Record<string, string>>({});

  const setEthicalPopover = useCallback((id: string | null) => {
    setOpenPopoverFor(id);
    setSelectedEthicalTags(new Set());
  }, []);

  const q = skillQuery.trim().toLowerCase();

  const { visibleSkillIds, visibleCount } = useMemo(() => {
    const ids = new Set<string>();
    let n = 0;
    for (const sec of SANDBOX_PORTFOLIO_SKILL_SECTIONS) {
      for (const sk of sec.skills) {
        const show = skillMatchesFilter(sk, activeSkillFilter) && skillMatchesQuery(sk, q);
        if (show) {
          ids.add(sk.id);
          n += 1;
        }
      }
    }
    return { visibleSkillIds: ids, visibleCount: n };
  }, [activeSkillFilter, q]);

  const setShellOpen = useCallback((open: boolean) => {
    setSidebarOpen(open);
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = open ? "hidden" : "";
    }
  }, []);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setShellOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setShellOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openPopoverFor) {
        setEthicalPopover(null);
        return;
      }
      if (downloadModal.open) {
        setDownloadModal({ open: false, body: "" });
        return;
      }
      if (toastOpen) {
        setToastOpen(false);
        return;
      }
      setShellOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [downloadModal.open, openPopoverFor, setEthicalPopover, setShellOpen, toastOpen]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (t.closest("[data-ethical-popover]")) return;
      if (t.closest(".flag-concern-trigger")) return;
      setEthicalPopover(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [setEthicalPopover]);

  const toggleEthicalTag = (tag: SandboxPortfolioEthicalTag) => {
    setSelectedEthicalTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const submitEthical = (useCaseId: string) => {
    if (selectedEthicalTags.size === 0) {
      window.alert("Select at least one tension tag.");
      return;
    }
    setEthicalFlagCounts((prev) => {
      const row = { ...(prev[useCaseId] ?? {}) };
      for (const label of selectedEthicalTags) {
        row[label] = (row[label] ?? 0) + 1;
      }
      return { ...prev, [useCaseId]: row };
    });
    setEthicalPopover(null);
    setFlagContextById((prev) => ({ ...prev, [useCaseId]: "" }));
  };

  const onTab = (id: "hub" | "lab" | "gov") => {
    setActiveView(id);
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      setShellOpen(false);
    }
  };

  return (
    <div className="flex min-h-[min(100dvh,960px)] flex-col lg:min-h-0">
      <a
        href="#sandbox-portfolio-main"
        className="absolute left-[9999px] top-4 z-[100] whitespace-nowrap rounded-md bg-foreground px-3 py-2 text-[0.8125rem] font-medium text-background focus:left-4 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>

      <div
        className={cn(
          "fixed inset-0 z-30 bg-foreground/35 transition-opacity duration-200 ease-out lg:hidden",
          sidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden
        onClick={() => setShellOpen(false)}
      />

      <div className="flex min-h-0 flex-1">
        <aside
          id="sandbox-portfolio-sidebar"
          aria-label="Primary"
          className={cn(
            "flex w-[min(100%,300px)] shrink-0 flex-col border-r border-border bg-background px-7 py-8",
            "z-40 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "fixed inset-y-0 left-0 shadow-[8px_0_32px_rgba(25,21,15,0.12)] lg:relative lg:inset-auto lg:translate-x-0 lg:shadow-none",
            "lg:sticky lg:top-0 lg:h-[min(100dvh,100vh)]",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
        >
          <div className="flex items-start justify-between gap-3 lg:block">
            <div className="mb-8">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.09em] text-muted-foreground">Companion app</p>
              <h1 className="mt-2 text-[15px] font-semibold leading-snug tracking-tight text-foreground">
                Sandbox <span className="font-serif text-[1.05em] font-medium italic">Portfolio</span>
              </h1>
            </div>
            <button
              type="button"
              className="rounded-md p-2 text-muted-foreground hover:bg-section hover:text-foreground lg:hidden"
              aria-label="Close menu"
              onClick={() => setShellOpen(false)}
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="mb-8 flex flex-col gap-1.5" role="tablist" aria-label="Main sections">
            {(["hub", "lab", "gov"] as const).map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={activeView === id}
                className={cn(
                  "tab-btn flex w-full items-start gap-2 rounded-md px-2 py-2.5 text-left text-[13.5px] transition-colors",
                  activeView === id
                    ? "bg-section font-medium text-foreground"
                    : "text-muted-foreground hover:bg-section/60 hover:text-foreground",
                )}
                onClick={() => onTab(id)}
              >
                <span
                  className={cn(
                    "mt-[0.35rem] size-1.5 shrink-0 rounded-full",
                    activeView === id ? "bg-foreground" : "bg-border",
                  )}
                  aria-hidden
                />
                <span>{VIEW_LABELS[id]}</span>
              </button>
            ))}
          </div>
        </aside>

        <main id="sandbox-portfolio-main" className="min-w-0 flex-1 overflow-y-auto">
          <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 sm:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-section hover:text-foreground lg:hidden"
                aria-expanded={sidebarOpen}
                aria-controls="sandbox-portfolio-sidebar"
                aria-label="Open menu"
                onClick={() => setShellOpen(true)}
              >
                <Menu className="size-[22px]" aria-hidden />
              </button>
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground sm:gap-x-3">
                <span className="shrink-0">Companion app</span>
                <span className="shrink-0" aria-hidden>
                  /
                </span>
                <span className="min-w-0 truncate text-foreground">Sandbox portfolio</span>
                <span className="hidden shrink-0 sm:inline" aria-hidden>
                  /
                </span>
                <span className="hidden min-w-0 truncate font-medium text-foreground sm:inline">
                  {VIEW_LABELS[activeView]}
                </span>
              </div>
            </div>
          </div>

          {/* Hub */}
          <section
            className={cn(activeView !== "hub" && "hidden")}
            role="tabpanel"
            aria-labelledby={undefined}
            hidden={activeView !== "hub"}
          >
            <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8 sm:py-10">
              <header className="mb-6 rounded-card border border-border bg-card p-8 sm:p-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-muted-foreground">
                  Discovery · Sourced from Movemental
                </p>
                <h2 className="mt-3 text-[clamp(1.65rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
                  Organizational <span className="font-serif font-medium italic">Skills</span> Library
                </h2>
              </header>

              <div
                className="sticky top-0 z-10 mb-5 rounded-card border border-border bg-background/90 p-4 backdrop-blur-sm sm:px-5"
                role="search"
              >
                <label className="sr-only" htmlFor="skill-search">
                  Search skills
                </label>
                <input
                  id="skill-search"
                  type="search"
                  value={skillQuery}
                  onChange={(e) => setSkillQuery(e.target.value)}
                  className="mb-3 w-full rounded-card border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Search by skill name, slug, nonprofit use case, or path…"
                  autoComplete="off"
                  aria-controls="skill-catalog"
                />
                <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter by nonprofit workstream">
                  {SANDBOX_PORTFOLIO_SKILL_FILTERS.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      className={cn(
                        "rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
                        activeSkillFilter === chip.id && "border-transparent bg-foreground text-background",
                      )}
                      onClick={() => setActiveSkillFilter(chip.id)}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mb-4 text-[13px] text-muted-foreground" aria-live="polite">
                {visibleCount} skills visible.
              </p>
              <div
                className={cn(
                  "mb-8 rounded-card border border-dashed border-border bg-section/40 px-6 py-8 text-center text-sm text-muted-foreground",
                  visibleCount > 0 && "hidden",
                )}
                hidden={visibleCount > 0}
              >
                No skills match this filter. Clear search or choose <strong className="text-foreground">All</strong>.
              </div>

              <div id="skill-catalog">
                {SANDBOX_PORTFOLIO_SKILL_SECTIONS.map((sec) => {
                  const anyVisible = sec.skills.some((s) => visibleSkillIds.has(s.id));
                  return (
                    <section
                      key={sec.category}
                      className={cn("mb-10", !anyVisible && "hidden")}
                      aria-labelledby={`cat-${sec.category}`}
                    >
                      <h3
                        id={`cat-${sec.category}`}
                        className="mb-4 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground"
                      >
                        {sec.heading}
                      </h3>
                      <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {sec.skills.map((skill) => (
                          <SkillCard
                            key={skill.id}
                            skill={skill}
                            visible={visibleSkillIds.has(skill.id)}
                            onDownload={(name) =>
                              setDownloadModal({
                                open: true,
                                body: `Your browser would download ${name}. Upload the extracted folder to Claude Enterprise as an organizational skill. This mockup does not perform a real download.`,
                              })
                            }
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Lab */}
          <section className={cn(activeView !== "lab" && "hidden")} role="tabpanel" hidden={activeView !== "lab"}>
            <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8 sm:py-10">
              <header className="mb-10 rounded-card border border-border bg-card p-8 sm:p-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-muted-foreground">
                  The lab & logging
                </p>
                <h2 className="mt-3 text-[clamp(1.65rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
                  Log a Sandbox Experiment
                </h2>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
                  Capture the before-and-after of a sandbox test so finance, programs, and leadership share one honest
                  record of value — and surprises.
                </p>
              </header>

              <form
                className="grid gap-6 lg:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setToastOpen(true);
                }}
              >
                <div className="rounded-card border border-border bg-card p-6 sm:p-8">
                  <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-ink-soft">Pre-flight checklist</p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">Before using Claude</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Ground the test in baselines and named risks so results are comparable — not anecdotal.
                  </p>
                  <label className="mt-6 block text-sm font-medium text-foreground" htmlFor="hypothesis">
                    Hypothesis
                  </label>
                  <input
                    id="hypothesis"
                    name="hypothesis"
                    className="mt-2 w-full rounded-card border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="e.g., This recipe will reduce drafting time from 45 mins to 10 mins."
                  />
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-foreground" htmlFor="time-baseline">
                        Time baseline
                      </label>
                      <p className="mt-1 text-xs text-muted-foreground">How long does this task currently take?</p>
                      <input
                        id="time-baseline"
                        inputMode="decimal"
                        className="mt-2 w-full rounded-card border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="e.g., 45 min or 6.5 hrs"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground" htmlFor="cost-baseline">
                        Cost baseline
                      </label>
                      <p className="mt-1 text-xs text-muted-foreground">Estimated human or agency cost today.</p>
                      <input
                        id="cost-baseline"
                        inputMode="decimal"
                        className="mt-2 w-full rounded-card border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="e.g., $800 agency memo"
                      />
                    </div>
                  </div>
                  <label className="mt-5 block text-sm font-medium text-foreground" htmlFor="quality-baseline">
                    Quality baseline
                  </label>
                  <p className="mt-1 text-xs text-muted-foreground">
                    What does the work look like at the organization&apos;s best? Establish the human standard to compare
                    against.
                  </p>
                  <textarea
                    id="quality-baseline"
                    rows={4}
                    className="mt-2 w-full resize-y rounded-card border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="e.g., ED-approved tone; every claim tied to CRM source; plain-language reading level for major donors."
                  />
                  <label className="mt-5 block text-sm font-medium text-foreground" htmlFor="failure-modes">
                    Anticipated failure modes
                  </label>
                  <p className="mt-1 text-xs text-muted-foreground">Name what could go wrong before you run it.</p>
                  <input
                    id="failure-modes"
                    className="mt-2 w-full rounded-card border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="e.g., AI might invent facts; might sound too generic."
                  />
                </div>

                <div className="rounded-card border border-border bg-card p-6 sm:p-8">
                  <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-ink-soft">
                    Post-flight / value record
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">After using Claude</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Log outcomes on the three Sandbox value axes. Ethical tensions are flagged from the Discernment
                    Dashboard.
                  </p>
                  <label className="mt-6 block text-sm font-medium text-foreground" htmlFor="efficiency-hours">
                    Efficiency (time saved wisely)
                  </label>
                  <p className="mt-1 text-xs text-muted-foreground">Hours saved (or fraction of an hour).</p>
                  <input
                    id="efficiency-hours"
                    inputMode="decimal"
                    className="mt-2 w-full rounded-card border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="e.g., 2.25"
                  />
                  <label className="mt-5 block text-sm font-medium text-foreground" htmlFor="revenue-avoidance">
                    Revenue / cost avoidance
                  </label>
                  <p className="mt-1 text-xs text-muted-foreground">Dollars saved or earned (e.g., agency costs avoided).</p>
                  <input
                    id="revenue-avoidance"
                    inputMode="decimal"
                    className="mt-2 w-full rounded-card border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="e.g., 2500"
                  />
                  <label className="mt-5 block text-sm font-medium text-foreground" htmlFor="quality-improved">
                    Quality improved
                  </label>
                  <p className="mt-1 text-xs text-muted-foreground">How was the work made better or more accessible?</p>
                  <textarea
                    id="quality-improved"
                    rows={5}
                    className="mt-2 w-full resize-y rounded-card border border-border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="e.g., First draft matched house style; added alt text suggestions for fundraising microsite."
                  />
                  <button
                    type="submit"
                    className="mt-8 w-full rounded-full bg-foreground py-3 text-sm font-medium text-background sm:w-auto sm:px-10"
                  >
                    Save Value Record
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Gov */}
          <section className={cn(activeView !== "gov" && "hidden")} role="tabpanel" hidden={activeView !== "gov"}>
            <header className="border-b border-border bg-inverse-surface px-4 py-10 text-inverse-foreground sm:px-8 lg:px-10">
              <div className="mx-auto max-w-[1100px]">
                <p className="text-[11px] font-medium uppercase tracking-[0.09em] text-inverse-muted">Governance</p>
                <h2 className="mt-3 text-[clamp(1.65rem,3.5vw,2.5rem)] font-semibold leading-[1.1] tracking-tight text-inverse-foreground">
                  Discernment{" "}
                  <span className="font-serif text-[1.05em] font-medium italic text-inverse-foreground">Dashboard</span>
                </h2>
              </div>
            </header>

            <div className="border-b border-border bg-section px-4 py-6 sm:px-8 lg:px-10">
              <div className="mx-auto grid max-w-[1100px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { k: "847", d: "Total hours saved · YTD logged across 14 teams" },
                  { k: "34", d: "Use cases tested · 18 in discernment review" },
                  { k: "9", d: "Green-lit (deploy) · With written playbooks" },
                  { k: "4", d: "Red-lit (refuse) · Archived with rationale", red: true },
                ].map((m) => (
                  <div
                    key={m.k}
                    className="flex min-h-0 flex-col gap-3 rounded-card border border-border-soft bg-card p-5 transition-[transform,border-color] duration-300 ease-out motion-reduce:transition-none hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:border-border"
                  >
                    <p className="m-0 text-[0.72rem] font-medium uppercase tracking-[0.09em] text-muted-foreground">
                      Metric
                    </p>
                    <p className={cn("m-0 text-2xl font-semibold tracking-tight", m.red && "text-destructive")}>{m.k}</p>
                    <p className="m-0 text-[13px] text-muted-foreground">{m.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
              <div className="mx-auto flex min-w-[880px] max-w-[1100px] gap-4 lg:min-w-0">
                <DiscernmentColumn
                  column="deploy"
                  title="Deploy"
                  cases={SANDBOX_PORTFOLIO_DISCERNMENT_CASES}
                  ethicalFlagCounts={ethicalFlagCounts}
                  onOpenPopover={setEthicalPopover}
                  openPopoverFor={openPopoverFor}
                  selectedEthicalTags={selectedEthicalTags}
                  toggleEthicalTag={toggleEthicalTag}
                  onSubmitEthical={submitEthical}
                  flagContextById={flagContextById}
                  setFlagContext={(id, v) => setFlagContextById((p) => ({ ...p, [id]: v }))}
                />
                <DiscernmentColumn
                  column="modify"
                  title="Modify"
                  cases={SANDBOX_PORTFOLIO_DISCERNMENT_CASES}
                  ethicalFlagCounts={ethicalFlagCounts}
                  onOpenPopover={setEthicalPopover}
                  openPopoverFor={openPopoverFor}
                  selectedEthicalTags={selectedEthicalTags}
                  toggleEthicalTag={toggleEthicalTag}
                  onSubmitEthical={submitEthical}
                  flagContextById={flagContextById}
                  setFlagContext={(id, v) => setFlagContextById((p) => ({ ...p, [id]: v }))}
                />
                <DiscernmentColumn
                  column="refuse"
                  title="Refuse"
                  cases={SANDBOX_PORTFOLIO_DISCERNMENT_CASES}
                  ethicalFlagCounts={ethicalFlagCounts}
                  onOpenPopover={setEthicalPopover}
                  openPopoverFor={openPopoverFor}
                  selectedEthicalTags={selectedEthicalTags}
                  toggleEthicalTag={toggleEthicalTag}
                  onSubmitEthical={submitEthical}
                  flagContextById={flagContextById}
                  setFlagContext={(id, v) => setFlagContextById((p) => ({ ...p, [id]: v }))}
                />
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Download modal */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex items-center justify-center bg-inverse-surface/40 p-4",
          !downloadModal.open && "hidden",
        )}
        role="dialog"
        aria-modal
        aria-labelledby="sandbox-portfolio-modal-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) setDownloadModal({ open: false, body: "" });
        }}
      >
        <div className="w-full max-w-md rounded-card border border-border bg-card p-6 shadow-ambient">
          <h2 id="sandbox-portfolio-modal-title" className="text-lg font-semibold text-foreground">
            Skill package ready
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{downloadModal.body}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
              onClick={() => setDownloadModal({ open: false, body: "" })}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div
        className={cn(
          "fixed inset-0 z-[60] flex items-end justify-center bg-transparent p-4 sm:items-center",
          !toastOpen && "hidden",
        )}
        role="dialog"
        aria-modal
        aria-labelledby="sandbox-portfolio-toast-title"
      >
        <div className="w-full max-w-sm rounded-card border border-border bg-card p-5 shadow-ambient">
          <p id="sandbox-portfolio-toast-title" className="text-sm font-semibold text-foreground">
            Value record saved
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Logged to the sandbox portfolio (demo). In production this would sync to your governance ledger.
          </p>
          <button
            type="button"
            className="mt-4 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground"
            onClick={() => setToastOpen(false)}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

function SkillCard({
  skill,
  visible,
  onDownload,
}: {
  skill: SandboxPortfolioSkill;
  visible: boolean;
  onDownload: (packageName: string) => void;
}) {
  const label = skill.downloadLabel ?? "Download";
  return (
    <article
      className={cn(
        "flex min-h-[200px] flex-col gap-3 rounded-card border border-border-soft bg-card p-7 transition-[transform,border-color] duration-300 ease-out motion-reduce:transition-none hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 hover:border-border",
        skill.gridClass,
        !visible && "hidden",
      )}
    >
      <p className="m-0 text-[0.72rem] font-medium uppercase tracking-[0.09em] text-muted-foreground">Claude skill</p>
      <SkillTitle parts={skill.titleParts} />
      <p className="m-0 flex-1 text-[0.9rem] leading-[1.55] text-muted-foreground">{skill.dek}</p>
      <p className="font-mono text-[0.6875rem] tracking-wide text-ink-soft">{skill.path}</p>
      <p className="mb-0 mt-1 text-[0.625rem] font-medium uppercase tracking-[0.09em] text-ink-soft">{skill.tierLabel}</p>
      <p className="m-0 text-[0.8125rem] text-muted-foreground">{skill.tier}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border-soft pt-3">
        <span className="text-[12px] text-muted-foreground">.zip</span>
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          onClick={() => onDownload(skill.packageFile)}
        >
          {label}
        </button>
      </div>
    </article>
  );
}
