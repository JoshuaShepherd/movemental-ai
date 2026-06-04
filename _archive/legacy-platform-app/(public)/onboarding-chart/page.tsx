"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

const ONBOARDING_CHART = `
flowchart TD
  %% ── STAGE 1: ARRIVAL ──────────────────────────────────────
  subgraph S1["① ARRIVAL"]
    direction TB
    A1[/"Invite Link (Pre-Approved)"/]
    A2[/"Organic Discovery"/]
    A3[/"Referral / Network Link"/]
  end

  A1 --> FC
  A2 --> FC
  A3 --> FC

  FC{"Fit Check
  (Movement alignment,
  audience, content,
  revenue readiness)"}

  FC -- "Non-Fit" --> EXIT1(["Exit w/ Graceful Redirect"])
  FC -- "Uncertain" --> REVIEW["Manual Review Queue"]
  FC -- "Fit Confirmed ✓" --> S2

  %% ── STAGE 2: TEMPLATE SHOWROOM ────────────────────────────
  subgraph S2["② TEMPLATE SHOWROOM · Pre-Acceptance Experience"]
    direction TB
    SH1["Personalized Template Views
    (20+ home pages, books, content,
    about pages, all content types)"]
    SH2["Progressive Disclosure:
    Platform Strategy Layer
    (Digital Playbook)"]
    SH3["Progressive Disclosure:
    AI Strategy Layer
    (What We Built & Why)"]
    SH1 --> SH2 --> SH3
  end

  S2 --> ACTION{"Candidate Takes Action
  to Advance Conversation"}

  ACTION -- "Not Accepted" --> WAITLIST["Waitlist / Follow-Up"]
  ACTION -- "Accepted ✓" --> S3

  %% ── STAGE 3: DESIGN PREFERENCES ──────────────────────────
  subgraph S3["③ DESIGN PREFERENCE SELECTION · Signed-In User"]
    direction TB
    DP1["Browse Template Showroom
    (now as authenticated user)"]
    DP2["Select Preferred
    Design Patterns"]
    DP3["Choose Specific Templates
    or Upload Reference Images"]
    DP4["Front-End Design Brief
    Generated"]
    DP1 --> DP2 --> DP3 --> DP4
  end

  S3 --> HANDOFF["Design Preferences
  Received by Team"]
  HANDOFF --> S4

  %% ── STAGE 4: CONTENT & VOICE DEVELOPMENT ─────────────────
  subgraph S4["④ CONTENT FOUNDATION · Author Identity & Voice Fidelity"]
    direction TB

    subgraph S4A["Profile & Strategy"]
      P1["Author Profile
      (bio, credentials, movemental calling)"]
      P2["Audience Profile
      (TAM, segments, engagement)"]
      P3["Content Audit
      (existing assets inventory)"]
      P4["Content Strategy
      Development"]
      P1 --> P2 --> P3 --> P4
    end

    subgraph S4B["Voice & Fidelity Fit"]
      V1["Writing Assistant:
      Core Evergreen Content"]
      V2["Aggregate Editing
      Feedback Collection"]
      V3["Iterative AI Voice
      Refinement"]
      V1 --> V2 --> V3
    end

    S4A --> S4B
  end

  S4 --> S5

  %% ── STAGE 5: PRICING & LAUNCH ────────────────────────────
  subgraph S5["⑤ PRICING WIZARD · Constrained Best-Practice Options"]
    direction TB
    PR1["Research-Backed
    Pricing Suggestions"]
    PR2["Subscription Tiers
    Configuration"]
    PR3["Course / eBook
    Pricing Setup"]
    PR4["Revenue Share
    Confirmation (10%)"]
    PR1 --> PR2 --> PR3 --> PR4
  end

  S5 --> LAUNCH

  %% ── LAUNCH ────────────────────────────────────────────────
  LAUNCH(["🚀 Platform Goes Live
  (with content, not empty templates)"])

  %% ── STYLING ───────────────────────────────────────────────
  classDef arrival fill:#e0f2fe,stroke:#0284c7,color:#0c4a6e
  classDef showroom fill:#fef3c7,stroke:#d97706,color:#78350f
  classDef design fill:#ede9fe,stroke:#7c3aed,color:#3b0764
  classDef content fill:#dcfce7,stroke:#16a34a,color:#14532d
  classDef pricing fill:#fce7f3,stroke:#db2777,color:#831843
  classDef decision fill:#fff7ed,stroke:#ea580c,color:#7c2d12
  classDef endpoint fill:#f1f5f9,stroke:#64748b,color:#1e293b

  class A1,A2,A3 arrival
  class SH1,SH2,SH3 showroom
  class DP1,DP2,DP3,DP4 design
  class P1,P2,P3,P4,V1,V2,V3 content
  class PR1,PR2,PR3,PR4 pricing
  class FC,ACTION decision
  class EXIT1,WAITLIST,REVIEW,LAUNCH,HANDOFF endpoint
`;

export default function OnboardingChartPage() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: {
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "14px",
      },
      flowchart: {
        htmlLabels: true,
        curve: "basis",
        padding: 16,
        nodeSpacing: 30,
        rankSpacing: 40,
        useMaxWidth: true,
      },
    });

    const renderChart = async () => {
      if (!chartRef.current) return;
      chartRef.current.innerHTML = "";
      const { svg } = await mermaid.render("onboarding-flow", ONBOARDING_CHART);
      chartRef.current.innerHTML = svg;
    };

    renderChart();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Movemental Onboarding Flow
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            From first contact to live platform — the automated pipeline with
            human touchpoints built in.
          </p>
        </header>

        {/* Legend */}
        <div className="mb-8 flex flex-wrap justify-center gap-4 text-sm">
          {[
            { label: "① Arrival", color: "bg-sky-100 text-sky-900 border-sky-500" },
            { label: "② Template Showroom", color: "bg-amber-100 text-amber-900 border-amber-500" },
            { label: "③ Design Selection", color: "bg-violet-100 text-violet-900 border-violet-500" },
            { label: "④ Content & Voice", color: "bg-green-100 text-green-900 border-green-500" },
            { label: "⑤ Pricing Wizard", color: "bg-pink-100 text-pink-900 border-pink-500" },
          ].map((item) => (
            <span
              key={item.label}
              className={`rounded-full border px-3 py-1 font-medium ${item.color}`}
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* Chart */}
        <div
          ref={chartRef}
          className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-6"
        />

        {/* Stage Summaries */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StageCard
            number="①"
            title="Arrival & Fit Check"
            color="border-sky-500"
            points={[
              "Invite link, organic discovery, or referral",
              "Fit Check evaluates movement alignment, audience, content readiness",
              "Non-fits exit gracefully; uncertain candidates enter manual review",
            ]}
          />
          <StageCard
            number="②"
            title="Template Showroom"
            color="border-amber-500"
            points={[
              "20+ personalized template views across all content types",
              "Progressive disclosure teaches platform strategy (digital playbook)",
              "AI strategy layer conveys what we built and why",
              "Available pre-acceptance — no sign-in required",
            ]}
          />
          <StageCard
            number="③"
            title="Design Preference Selection"
            color="border-violet-500"
            points={[
              "Same showroom, now authenticated",
              "Select preferred design patterns and specific templates",
              "Upload reference images for custom direction",
              "Generates a front-end design brief",
            ]}
          />
          <StageCard
            number="④"
            title="Content & Voice Foundation"
            color="border-green-500"
            points={[
              "Author profile, audience profile (TAM), content audit",
              "Content strategy development",
              "Writing assistant for core evergreen content",
              "Iterative AI voice refinement via editing feedback loop",
            ]}
          />
          <StageCard
            number="⑤"
            title="Pricing Wizard"
            color="border-pink-500"
            points={[
              "Research-backed pricing suggestions with constrained options",
              "Subscription tiers, course/eBook pricing configuration",
              "Revenue share confirmation (10%)",
              "Autonomy + best-practice guardrails",
            ]}
          />
          <StageCard
            number="🚀"
            title="Launch"
            color="border-gray-500"
            points={[
              "Platform goes live with content — not empty templates",
              "Network integration and cross-promotion ready",
              "Voice-preserved, transparency-enabled, analytics configured",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function StageCard({
  number,
  title,
  color,
  points,
}: {
  number: string;
  title: string;
  color: string;
  points: string[];
}) {
  return (
    <div className={`rounded-lg border-l-4 ${color} bg-white p-5 shadow-sm`}>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">
        {number} {title}
      </h3>
      <ul className="space-y-1 text-sm text-gray-600">
        {points.map((point) => (
          <li key={point} className="flex gap-2">
            <span className="mt-1 text-gray-400">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
