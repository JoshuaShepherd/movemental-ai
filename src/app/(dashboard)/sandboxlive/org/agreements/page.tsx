import Link from "next/link";

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
        <ol className="list-none divide-y divide-border p-0">
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
                <p className="mt-2 text-[13px] text-muted-foreground">No document URL on file.</p>
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
              <Link href="/leader/sign-commitments" className={cn(editorialHome.textLink, "mt-2 inline-block text-[14px]")}>
                Open signing reference (leader workspace) →
              </Link>
            </li>
          ))}
          {signed.length === 0 && voice.length === 0 ? (
            <li className="py-10 text-muted-foreground">
              No signed agreements are recorded for {profile?.name ?? "this organization"} yet. They appear here
              after DocuSign or in-product signing flows complete.
            </li>
          ) : null}
        </ol>
      </section>
    </div>
  );
}
