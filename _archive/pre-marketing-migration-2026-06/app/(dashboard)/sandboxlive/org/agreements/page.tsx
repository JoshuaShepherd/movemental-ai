import Link from "next/link";

import { EditorialEmptyState } from "@/components/authenticated/editorial-empty-state";
import { DashboardPublicSiteLink } from "@/components/authenticated/dashboard-public-site-link";
import { editorialHome } from "@/lib/authenticated/editorial-home";
import {
  listMovementVoiceCommitmentRowsForOrg,
  listOrgSignedAgreements,
  loadSandboxLiveOrgProfile,
  requireSandboxLiveOrgParticipantOrAdminForReadPages,
} from "@/lib/sandboxlive/org-admin.server";
import { cn } from "@/lib/utils";

export const metadata = { title: "Agreements · SandboxLive" };

export default async function SandboxLiveOrgAgreementsPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const sp = await searchParams;
  const { organizationId, slug } = await requireSandboxLiveOrgParticipantOrAdminForReadPages(sp.org);
  const profile = await loadSandboxLiveOrgProfile(organizationId);
  const signed = await listOrgSignedAgreements(organizationId);
  const voice = await listMovementVoiceCommitmentRowsForOrg(organizationId);

  return (
    <div className="flex flex-col">
      <section className={editorialHome.heroBand}>
        <p className={editorialHome.eyebrow}>YOUR ORGANIZATION</p>
        <h1 className={cn(editorialHome.display, "mt-4 max-w-[min(100%,52rem)] text-[clamp(2.5rem,4vw,3.25rem)]")}>
          Signed agreements
        </h1>
        <p className={cn(editorialHome.lede, "mt-6")}>
          Read-only register of what the organization has executed — engagement contract, Movement Voice
          Commitments for leaders in this org, and sponsorship paperwork when present.{" "}
          <Link className={editorialHome.textLink} href={`/sandboxlive/org?org=${encodeURIComponent(slug)}`}>
            Organization home
          </Link>
          .
        </p>
      </section>

      <div className={editorialHome.hairline} aria-hidden />

      <section className={cn(editorialHome.bandGap, "pb-[clamp(3rem,8vw,5rem)]")}>
        <ol className="list-none divide-y divide-[0.5px] divide-rule p-0">
          {signed.map((a) => (
            <li key={a.id} className="py-6">
              <p className={editorialHome.rowTitle22}>{a.agreementType.replace(/_/g, " ")}</p>
              <p className={editorialHome.rowDesc14}>
                Version {a.agreementVersion} · Signed {new Date(a.signedAt).toLocaleDateString()}
                {a.signatoryLabel ? ` · ${a.signatoryLabel}` : ""}
              </p>
              <p className={editorialHome.rowMeta11}>Status: recorded</p>
              {a.documentUrl ? (
                <a href={a.documentUrl} className={cn(editorialHome.textLink, "mt-2 inline-block text-[14px]")}>
                  Download or open document →
                </a>
              ) : (
                <p className="mt-2 max-w-prose text-[13px] leading-relaxed text-muted-foreground">
                  A hosted document link has not been attached to this row yet.
                </p>
              )}
            </li>
          ))}
          {voice.map((v, i) => (
            <li key={`${v.leaderEmail}-${i}`} className="py-6">
              <p className={editorialHome.rowTitle22}>Movement Voice Commitments</p>
              <p className={editorialHome.rowDesc14}>
                {v.leaderName} · Version {v.versionSigned} · Signed {new Date(v.signedAt).toLocaleDateString()}
              </p>
              <p className={editorialHome.rowMeta11}>Status: active commitment on file</p>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-4">
                <DashboardPublicSiteLink href="/movement-voice-commitments">
                  Read the public Movement Voice Commitments →
                </DashboardPublicSiteLink>
                <Link href="/leader/sign-commitments" className={cn(editorialHome.textLink, "text-[14px]")}>
                  Open the signing flow in your leader workspace →
                </Link>
              </div>
            </li>
          ))}
          {signed.length === 0 && voice.length === 0 ? (
            <li className="py-10">
              <EditorialEmptyState
                eyebrow="Agreements register"
                title="Nothing recorded for this organization yet."
                tone="default"
                className="max-w-2xl"
              >
                <p>
                  When engagement contracts, leader commitments, or sponsorship paperwork are executed, they will
                  appear in this list in the order they were recorded.
                </p>
              </EditorialEmptyState>
            </li>
          ) : null}
        </ol>
      </section>
    </div>
  );
}
