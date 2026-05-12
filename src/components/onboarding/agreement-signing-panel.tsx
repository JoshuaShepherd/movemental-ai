"use client";

import Link from "next/link";

import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";

const DOCUSIGN_ENGAGEMENT = process.env.NEXT_PUBLIC_DOCUSIGN_ENGAGEMENT_URL;
const DOCUSIGN_MOU = process.env.NEXT_PUBLIC_DOCUSIGN_MOU_URL;

function StepNumber({ n }: { n: number }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center bg-section text-sm font-semibold text-primary">
      {n}
    </span>
  );
}

export function AgreementSigningPanel() {
  const organizationSlug = useDashboardOrganizationSlug();
  const orgLabel = organizationSlug ? `Organization: ${organizationSlug}` : "Active organization";
  const agreementsHref = organizationSlug
    ? `/sandboxlive/org/agreements?org=${encodeURIComponent(organizationSlug)}`
    : "/sandboxlive/org/agreements";

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <ol className="flex list-none flex-col gap-8 p-0">
        <li className="flex gap-4">
          <StepNumber n={1} />
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-sm font-semibold text-foreground">Who this covers</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {orgLabel}. Documents you sign are recorded against this organization for audit and Sandbox access.
            </p>
          </div>
        </li>

        <li className="flex gap-4">
          <StepNumber n={2} />
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-sm font-semibold text-foreground">What you are signing</p>
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">MOU</span> — relationship, governance expectations, and
                how we work together at a board- and operations-ready level.
              </li>
              <li>
                <span className="font-medium text-foreground">Engagement (MSA / SOW)</span> — commercial scope, fees or
                invoicing mechanics, and delivery responsibilities.
              </li>
            </ul>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Authoritative legal text lives in the envelopes your counsel configures. After execution, completed files
              appear in your{" "}
              <Link href={agreementsHref} className="font-medium text-primary underline underline-offset-4">
                signed agreements register
              </Link>
              .
            </p>
          </div>
        </li>

        <li className="flex gap-4">
          <StepNumber n={3} />
          <div className="flex min-w-0 flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">E-sign</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Open each envelope when your Movemental contact confirms they are ready. DocuSign Connect can record
              completion automatically when webhooks are configured.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {DOCUSIGN_MOU ? (
                <Link
                  href={DOCUSIGN_MOU}
                  className="inline-flex items-center justify-center bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Open MOU envelope
                </Link>
              ) : null}
              {DOCUSIGN_ENGAGEMENT ? (
                <Link
                  href={DOCUSIGN_ENGAGEMENT}
                  className={`inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium transition-colors ${
                    DOCUSIGN_MOU
                      ? "bg-card text-foreground ring-1 ring-border hover:bg-elevated"
                      : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {DOCUSIGN_MOU ? "Open engagement envelope" : "Open signing envelope"}
                </Link>
              ) : null}
            </div>
            {!DOCUSIGN_ENGAGEMENT && !DOCUSIGN_MOU ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Your Movemental contact will send signing links. Until then, you can mark this step complete after you
                have signed offline.
              </p>
            ) : null}
          </div>
        </li>

        <li className="flex gap-4">
          <StepNumber n={4} />
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-sm font-semibold text-foreground">Already signed offline?</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              If counsel executed paper or a separate e-sign tool, keep copies with your records and mark this step
              complete here once Movemental has mirrored the row in your agreements register.
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
