"use client";

import Link from "next/link";

import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { DashboardOrgAgreementEsign } from "@/components/onboarding/dashboard-org-agreement-esign";
import {
  YOUTHFRONT_IMPLEMENTATION_MOU_PDF_HREF,
  YOUTHFRONT_ORG_SLUG,
} from "@/lib/legal/agreement-catalog";

function StepNumber({ n }: { n: number }) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center bg-section text-sm font-semibold text-primary">
      {n}
    </span>
  );
}

export function AgreementSigningPanel() {
  const organizationSlug = useDashboardOrganizationSlug();
  const isYouthfrontOrg = organizationSlug === YOUTHFRONT_ORG_SLUG;
  const orgLabel = organizationSlug ? `Organization: ${organizationSlug}` : "Active organization";
  const agreementsHref = organizationSlug
    ? `/sandboxlive/org/agreements?org=${encodeURIComponent(organizationSlug)}`
    : "/sandboxlive/org/agreements";

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
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
            {isYouthfrontOrg ? (
              <div className="flex flex-col gap-3 rounded-md bg-section px-4 py-3">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Authoritative legal text for this engagement is the PDF below (same version counsel approved).
                  After execution, the signed file appears in your{" "}
                  <Link href={agreementsHref} className="font-medium text-primary underline underline-offset-4">
                    signed agreements register
                  </Link>
                  .
                </p>
                <a
                  href={YOUTHFRONT_IMPLEMENTATION_MOU_PDF_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center text-sm font-semibold text-primary underline underline-offset-4"
                >
                  Open Memorandum of Understanding (PDF)
                </a>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Authoritative legal text is the version your Movemental lead provides for this engagement. After
                execution, the signed file appears in your{" "}
                <Link href={agreementsHref} className="font-medium text-primary underline underline-offset-4">
                  signed agreements register
                </Link>{" "}
                once it has been recorded.
              </p>
            )}
          </div>
        </li>

        <li className="flex gap-4">
          <StepNumber n={3} />
          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-foreground">Sign the implementation MOU</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Review the MOU text, enter your full legal name, confirm the checkboxes, and submit. Your signature is
                stored with the organization record and listed in the signed agreements register. Engagement (MSA /
                SOW) may still be executed separately when your Movemental lead sends it.
              </p>
            </div>
            <DashboardOrgAgreementEsign />
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
