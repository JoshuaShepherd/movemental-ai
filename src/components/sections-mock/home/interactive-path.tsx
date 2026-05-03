"use client";

import { useRef, useState, type KeyboardEvent } from "react";

interface Stage {
  number: 1 | 2 | 3 | 4;
  title: string;
  body: string;
  workProducts: readonly string[];
  definitionOfDone: readonly string[];
  ifSkipped: readonly string[];
}

const STAGES: readonly Stage[] = [
  {
    number: 1,
    title: "Safety",
    body: "Establish clear guardrails before adoption spreads. Define what responsible AI use looks like across your organization.",
    workProducts: [
      "AI usage policy",
      "Data and confidentiality boundaries",
      "Leadership alignment artifacts",
    ],
    definitionOfDone: [
      "Clear guidelines documented",
      "Leadership aligned and communicated",
      "Staff understand expectations",
      "No unmanaged AI usage",
    ],
    ifSkipped: [
      "Inconsistent AI use across the org",
      "Hidden risk in unsanctioned tools",
      "Fragmentation across teams",
    ],
  },
  {
    number: 2,
    title: "Sandbox",
    body: "Create a safe environment to explore AI without pressure, exposure, or fragmentation.",
    workProducts: [
      "Controlled experimentation environment",
      "Curated set of approved tools",
      "Shared learning space for leaders",
    ],
    definitionOfDone: [
      "Leaders have explored AI firsthand",
      "Shared vocabulary is forming",
      "Real use cases are surfacing",
      "Safe exploration of tools",
    ],
    ifSkipped: [
      "Adoption gets driven by individuals",
      "No common reference point",
      "Tools evaluated in isolation",
    ],
  },
  {
    number: 3,
    title: "Skills",
    body: "Build real capability so AI becomes a responsible discipline — not a scattered habit.",
    workProducts: [
      "Practical staff training",
      "Use-case development guides",
      "Shared organizational language",
    ],
    definitionOfDone: [
      "Staff trained in responsible use",
      "Consistent practices across teams",
      "Reduced fragmentation",
    ],
    ifSkipped: [
      "AI literacy stays uneven",
      "A few power users, everyone else guesses",
      "Quality of work drifts",
    ],
  },
  {
    number: 4,
    title: "Solutions",
    body: "Only now do you build tools, workflows, and systems — on top of a human foundation.",
    workProducts: [
      "Custom AI assistants",
      "Workflow integration",
      "Organization-specific solutions",
    ],
    definitionOfDone: [
      "Systems built on a human foundation",
      "Tools fit the actual work",
      "Compounding gains across teams",
    ],
    ifSkipped: [
      "Tools built without aligned users",
      "Solutions that don't stick",
      "Investment without compound return",
    ],
  },
];

export function InteractivePath() {
  const [activeNumber, setActiveNumber] = useState<Stage["number"]>(1);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = STAGES.findIndex((s) => s.number === activeNumber);
  const stage = STAGES[activeIndex];

  const focusTab = (idx: number) => {
    const next = STAGES[idx];
    setActiveNumber(next.number);
    tabsRef.current[idx]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab((idx + 1) % STAGES.length);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab((idx - 1 + STAGES.length) % STAGES.length);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(STAGES.length - 1);
        break;
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="The Movemental AI Path stages"
        className="grid grid-cols-1 gap-x-6 md:grid-cols-4"
      >
        {STAGES.map((s, idx) => {
          const isActive = s.number === activeNumber;
          return (
            <button
              key={s.number}
              ref={(el) => {
                tabsRef.current[idx] = el;
              }}
              type="button"
              role="tab"
              id={`path-tab-${s.number}`}
              aria-selected={isActive}
              aria-controls={`path-panel-${s.number}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveNumber(s.number)}
              onKeyDown={(event) => handleKeyDown(event, idx)}
              className={[
                "group flex w-full items-baseline gap-3 border-t-2 py-4 text-left",
                "transition-[color,border-color,opacity] duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
                isActive
                  ? "border-primary text-foreground opacity-100"
                  : "border-border text-muted-foreground opacity-70 hover:border-foreground/30 hover:text-foreground hover:opacity-100",
              ].join(" ")}
            >
              <span
                className={[
                  "text-xs font-medium uppercase tracking-eyebrow",
                  isActive ? "text-primary" : "text-muted-foreground/80",
                ].join(" ")}
              >
                Stage {s.number}
              </span>
              <span className="text-base font-semibold tracking-tight md:text-lg">
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`path-panel-${stage.number}`}
        aria-labelledby={`path-tab-${stage.number}`}
        key={stage.number}
        className="mt-10 animate-in fade-in duration-200 md:mt-12"
      >
        <p className="max-w-(--prose-max) font-serif text-xl italic leading-snug tracking-tight text-foreground md:text-2xl">
          {stage.body}
        </p>

        <div className="mt-10 grid gap-x-12 gap-y-10 md:mt-12 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              What this stage produces
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-base leading-relaxed text-foreground">
              {stage.workProducts.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              How you know it&apos;s in place
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-base leading-relaxed text-foreground">
              {stage.definitionOfDone.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 md:mt-12">
          <h3 className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            If this stage is skipped
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm leading-relaxed text-muted-foreground">
            {stage.ifSkipped.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
