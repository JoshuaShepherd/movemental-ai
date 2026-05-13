"use client";

import Link from "next/link";

import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";

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
              Authoritative legal text is the version shown in the in-dashboard signing flow. After execution, the
              signed file appears in your{" "}
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
            <p className="text-sm font-semibold text-foreground">E-sign in this workspace</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              You will review the agreement, consent to sign electronically, then capture your signature here in the
              dashboard. Your Movemental contact can confirm when your organization is ready to open the signing steps.
            </p>
          </div>
        </li>

        <li className="flex gap-4">
          <StepNumber n={4} />
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-sm font-semibold text-foreground">Already signed offline?</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              If counsel executed paper or a separate tool, keep copies with your records and coordinate with
              Movemental so your agreements register reflects what is on file.
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
