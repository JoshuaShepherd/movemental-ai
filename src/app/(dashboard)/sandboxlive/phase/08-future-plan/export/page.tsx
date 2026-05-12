import Link from "next/link";
import { redirect } from "next/navigation";

import { EditorialEmptyState } from "@/components/authenticated/editorial-empty-state";
import { PrintButton } from "@/components/sandboxlive/print-button";
import {
  FUTURE_PLAN_SECTIONS,
  budgetTotal,
  type FuturePlanContent,
} from "@/lib/sandboxlive/future-plan.catalog";
import { loadFuturePlanState } from "@/lib/sandboxlive/future-plan.server";
import { resolveActiveOrganizationId } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Future Plan — Board export · SandboxLive",
};

export default async function FuturePlanExportPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/sandboxlive/phase/08-future-plan/export");
  }

  const sp = await searchParams;
  const resolved = await resolveActiveOrganizationId(user.id, sp.org);
  if (!resolved.success) {
    redirect("/dashboard");
  }

  const state = await loadFuturePlanState(resolved.data.organizationId);
  const orgQuery = sp.org ? `?org=${sp.org}` : "";
  const now = new Date();
  const exportDate = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const submittedDate = state.content.board_approval?.submitted_date
    ? new Date(state.content.board_approval.submitted_date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : exportDate;

  return (
    <div className="-mx-[clamp(1.25rem,4vw,2.5rem)] -my-8 flex min-h-[calc(100dvh-4rem)] flex-col bg-background text-foreground print:m-0 print:bg-white">
      {/* Screen-only action bar */}
      <div className="flex items-center justify-between gap-4 border-b border-border-soft bg-section px-8 py-4 print:hidden">
        <Link
          href={`/sandboxlive/phase/08-future-plan/edit${orgQuery}`}
          className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-pathway-accent"
        >
          ← Back to editor
        </Link>
        <PrintButton label="Print to PDF" />
      </div>

      {/* Cover page */}
      <section
        className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-6 px-8 pt-32 pb-24 text-center print:max-w-none print:break-after-page print:px-0 print:pt-16 print:pb-16"
        aria-label="Cover"
      >
        <p
          className="font-serif text-[24px] italic leading-tight text-foreground"
          aria-label="Movemental"
        >
          movemental
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          SandboxLive · Phase 08 · Future Plan
        </p>
        <h1 className="font-serif text-[clamp(3rem,7vw,5rem)] italic leading-[1.02] tracking-tight text-foreground">
          Future Plan
        </h1>
        <p className="font-serif text-[clamp(1.4rem,3vw,1.75rem)] italic leading-snug text-muted-foreground">
          {state.organizationName}
        </p>
        <p className="text-[12px] uppercase tracking-[0.1em] text-muted-foreground">
          {state.cohortName}
        </p>
        <div className="mt-8 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3 border-t border-border-soft pt-6 text-[12px] text-muted-foreground">
          <Meta label="Submitted">{submittedDate}</Meta>
          <Meta label="Edition">v{state.currentVersion}</Meta>
          <Meta label="Status">
            <span className="capitalize">{state.status.replace(/_/g, " ")}</span>
          </Meta>
        </div>
        <p className="mt-12 max-w-[520px] font-serif text-[16px] italic leading-relaxed text-muted-foreground">
          The cumulative deliverable of the SandboxLive engagement. Suitable
          for board distribution.
        </p>
      </section>

      <article
        className="mx-auto w-full max-w-3xl px-8 pb-32 print:max-w-none print:px-0 print:pb-0"
        aria-label="Future Plan sections"
      >
        {FUTURE_PLAN_SECTIONS.map((section) => (
          <section
            key={section.slug}
            className="border-t border-border-soft py-16 first:border-t-0 first:pt-0 print:break-before-page print:py-12 print:first:break-before-auto print:first:pt-0"
          >
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.15em] text-pathway-accent">
              {section.eyebrow}
            </p>
            <h2 className="mb-4 font-serif text-[clamp(2rem,4vw,2.75rem)] italic leading-[1.1] tracking-tight text-foreground">
              {section.heading}
            </h2>
            <p className="mb-10 max-w-[620px] font-serif text-[18px] italic leading-relaxed text-muted-foreground">
              {section.prompt}
            </p>
            {renderSectionForExport(section.slug, state.content)}
          </section>
        ))}

        {/* Board signature block — always rendered, even if approval block is empty. */}
        <section className="border-t border-border-soft py-16 print:break-before-page print:py-12">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.15em] text-pathway-accent">
            Ratification
          </p>
          <h2 className="mb-4 font-serif text-[clamp(2rem,4vw,2.75rem)] italic leading-[1.1] tracking-tight text-foreground">
            Board approval.
          </h2>
          <SignatureBlock
            content={state.content}
            signedAt={state.latestRatification?.signedAt ?? null}
            boardChairSignature={state.latestRatification?.boardChairSignature ?? null}
          />
        </section>
      </article>

      <footer className="mx-auto w-full max-w-3xl border-t border-border-soft px-8 py-12 text-center print:max-w-none print:px-0 print:py-8">
        <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          {state.organizationName} · {state.cohortName} · Future Plan · v{state.currentVersion} ·{" "}
          {exportDate}
        </p>
      </footer>
    </div>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.1em]">{label}</p>
      <p className="text-foreground">{children}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Per-section export renderers
// ---------------------------------------------------------------------------

function renderSectionForExport(slug: string, content: FuturePlanContent): React.ReactNode {
  switch (slug) {
    case "executive_summary": {
      const body = content.executive_summary?.body_md ?? "";
      const paragraphs = body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
      if (paragraphs.length === 0) return <ExportDraftGap />;
      return (
        <div className="font-serif italic text-[18px] leading-[1.8] text-foreground">
          {paragraphs.map((p, i) => (
            <p key={i} className="mb-4">
              {p}
            </p>
          ))}
        </div>
      );
    }
    case "green_lights":
      return (
        <LightsExport
          entries={content.green_lights?.entries ?? []}
          kind="green"
        />
      );
    case "yellow_lights":
      return (
        <LightsExport
          entries={content.yellow_lights?.entries ?? []}
          kind="yellow"
        />
      );
    case "red_lights":
      return (
        <LightsExport
          entries={content.red_lights?.entries ?? []}
          kind="red"
        />
      );
    case "implementation_schedule": {
      const quarters = content.implementation_schedule?.quarters ?? [];
      if (quarters.length === 0) return <ExportDraftGap />;
      return (
        <ol className="ml-2 flex flex-col gap-8 border-l-2 border-pathway-accent/30 pl-6">
          {quarters.map((q) => (
            <li key={q.id}>
              <p className="font-serif text-[22px] italic leading-tight text-foreground">
                {q.quarter}
              </p>
              {q.notes ? (
                <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                  {q.notes}
                </p>
              ) : null}
              {q.green_light_names.length > 0 ? (
                <ul className="mt-3 list-disc pl-5 text-[14px] text-foreground">
                  {q.green_light_names.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      );
    }
    case "budget": {
      const items = content.budget?.items ?? [];
      const currency = content.budget?.currency ?? "USD";
      const total = budgetTotal(content.budget);
      if (items.length === 0) return <ExportDraftGap />;
      return (
        <div className="flex flex-col gap-4">
          <table className="w-full border border-border-soft">
            <thead className="bg-section text-left">
              <tr>
                <th className="px-3 py-2 text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                  Description
                </th>
                <th className="px-3 py-2 text-right text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-border-soft">
                  <td className="px-3 py-2 text-[14px] text-foreground">{item.description}</td>
                  <td className="px-3 py-2 text-right font-mono text-[14px] tabular-nums text-foreground">
                    {formatCurrency(item.amount, currency)}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-foreground bg-section">
                <td className="px-3 py-2 text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                  Total
                </td>
                <td className="px-3 py-2 text-right font-mono text-[15px] font-semibold tabular-nums text-foreground">
                  {formatCurrency(total, currency)}
                </td>
              </tr>
            </tbody>
          </table>
          {content.budget?.notes ? (
            <p className="text-[14px] italic leading-relaxed text-muted-foreground">
              {content.budget.notes}
            </p>
          ) : null}
        </div>
      );
    }
    case "board_approval": {
      const b = content.board_approval;
      if (!b) return <ExportDraftGap />;
      return (
        <dl className="grid gap-4 text-[14px] text-muted-foreground sm:grid-cols-3">
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.1em]">Facilitator</dt>
            <dd className="mt-0.5 text-foreground">{b.facilitator_name || "—"}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.1em]">Submitted</dt>
            <dd className="mt-0.5 text-foreground">{b.submitted_date || "—"}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-medium uppercase tracking-[0.1em]">Board chair</dt>
            <dd className="mt-0.5 text-foreground">{b.board_chair_name || "—"}</dd>
          </div>
          {b.notes ? (
            <div className="sm:col-span-3">
              <dt className="text-[10px] font-medium uppercase tracking-[0.1em]">Notes</dt>
              <dd className="mt-0.5 text-foreground">{b.notes}</dd>
            </div>
          ) : null}
        </dl>
      );
    }
  }
}

function SignatureBlock({
  content,
  signedAt,
  boardChairSignature,
}: {
  content: FuturePlanContent;
  signedAt: string | null;
  boardChairSignature: string | null;
}) {
  const b = content.board_approval;
  const signed = Boolean(boardChairSignature);
  const signedDate = signedAt
    ? new Date(signedAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  return (
    <div className="border-[0.5px] border-border-soft bg-section p-8">
      {signed && boardChairSignature ? (
        <>
          <p className="font-serif text-[36px] italic leading-tight text-foreground">
            {boardChairSignature}
          </p>
          <p className="mt-2 text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
            {b?.board_chair_name ?? "Board chair"}
          </p>
          {signedDate ? (
            <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              Signed {signedDate}
            </p>
          ) : null}
        </>
      ) : (
        <>
          <div className="border-b border-foreground pb-2">
            <span className="font-serif text-[24px] italic text-muted-foreground/60">
              {b?.board_chair_name || "Awaiting board chair signature"}
            </span>
          </div>
          <p className="mt-3 text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
            Board chair · {b?.board_chair_name || "—"}
          </p>
          <p className="mt-1 text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
            Submitted by · {b?.facilitator_name || "—"}
          </p>
        </>
      )}
    </div>
  );
}

function LightsExport<TEntry extends { id: string; name: string; rationale: string; proposed_owner: string; timeline: string; success_criteria: string[]; risk_mitigation: string }>({
  entries,
  kind,
}: {
  entries: TEntry[];
  kind: "green" | "yellow" | "red";
}) {
  if (entries.length === 0) return <ExportDraftGap />;
  const dotClass =
    kind === "green"
      ? "bg-[color:var(--color-status-go)]"
      : kind === "yellow"
        ? "bg-[color:var(--color-status-caution)]"
        : "bg-[color:var(--destructive)]";
  return (
    <ol className="flex flex-col gap-10">
      {entries.map((e, idx) => (
        <li key={e.id}>
          <p className="mb-1 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
            <span aria-hidden className={`size-2 rounded-none ${dotClass}`} />
            {kind === "green" ? "Green Light" : kind === "yellow" ? "Yellow Light" : "Red Light"} ·{" "}
            {String(idx + 1).padStart(2, "0")}
          </p>
          <h3 className="font-serif text-[26px] italic leading-tight text-foreground">
            {e.name || "(untitled)"}
          </h3>
          {e.rationale ? (
            <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.75] text-muted-foreground">
              {e.rationale}
            </p>
          ) : null}
          <dl className="mt-4 grid gap-2 text-[13px] text-muted-foreground sm:grid-cols-2">
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.1em]">
                Proposed owner
              </dt>
              <dd className="mt-0.5 text-foreground">{e.proposed_owner || "—"}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-medium uppercase tracking-[0.1em]">Timeline</dt>
              <dd className="mt-0.5 text-foreground">{e.timeline || "—"}</dd>
            </div>
          </dl>
          {e.success_criteria.length > 0 ? (
            <div className="mt-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                Success criteria
              </p>
              <ul className="mt-1 list-disc pl-5 text-[14px] text-foreground">
                {e.success_criteria
                  .filter((c) => c.trim().length > 0)
                  .map((c, i) => (
                    <li key={i} className="my-0.5">
                      {c}
                    </li>
                  ))}
              </ul>
            </div>
          ) : null}
          {e.risk_mitigation ? (
            <p className="mt-4 border-l-[0.5px] border-border-soft pl-4 text-[13px] italic leading-relaxed text-muted-foreground">
              <span className="not-italic font-medium text-foreground">Risk mitigation. </span>
              {e.risk_mitigation}
            </p>
          ) : null}
          {kind === "yellow" && "further_work" in e ? (
            <p className="mt-3 border-l-[0.5px] border-[color:var(--color-status-caution)]/40 pl-4 text-[13px] leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Further work required. </span>
              {(e as unknown as { further_work: string }).further_work}
            </p>
          ) : null}
          {kind === "red" && "refusal_rationale" in e ? (
            <p className="mt-3 border-l-[0.5px] border-[color:var(--destructive)]/40 pl-4 text-[13px] leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Why refused. </span>
              {(e as unknown as { refusal_rationale: string }).refusal_rationale}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function ExportDraftGap() {
  return (
    <EditorialEmptyState
      eyebrow="Still in draft"
      title="This portion does not have finished copy yet."
      tone="default"
      className="max-w-2xl border border-[0.5px] border-border-soft bg-section px-5 py-6 print:border-none print:bg-transparent"
    >
      <p>
        Return to the Future Plan editor, place language in this block, then export again when the packet should read
        as complete for your board.
      </p>
    </EditorialEmptyState>
  );
}

function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}
