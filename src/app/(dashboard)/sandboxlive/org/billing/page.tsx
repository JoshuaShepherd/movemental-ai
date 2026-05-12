import Link from "next/link";

import { editorialHome } from "@/lib/authenticated/editorial-home";
import { requireSandboxLiveOrgParticipantOrAdminForReadPages } from "@/lib/sandboxlive/org-admin.server";
import { cn } from "@/lib/utils";

export const metadata = { title: "Billing · SandboxLive" };

export default async function SandboxLiveOrgBillingPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const sp = await searchParams;
  const { slug } = await requireSandboxLiveOrgParticipantOrAdminForReadPages(sp.org);

  return (
    <div className="flex flex-col">
      <section className={editorialHome.heroBand}>
        <p className={editorialHome.eyebrow}>YOUR ORGANIZATION</p>
        <h1 className={cn(editorialHome.display, "mt-4 max-w-[min(100%,52rem)] text-[clamp(2.5rem,4vw,3.25rem)]")}>
          Billing
        </h1>
        <p className={cn(editorialHome.lede, "mt-6")}>
          Commercial records for this engagement live outside the product shell today. This page exists so
          administrators know where to go — and so finance has a stable anchor in the cohort IA.
        </p>
      </section>

      <div className={editorialHome.hairline} aria-hidden />

      <section className={cn(editorialHome.bandGap, "pb-[clamp(3rem,8vw,5rem)]")}>
        <div className="mx-auto max-w-[40rem] space-y-4 rounded-xl bg-section px-6 py-8 text-[15px] leading-relaxed text-muted-foreground">
          <p className="text-foreground">
            Your engagement is billed by Movemental. For invoices, purchase orders, or procurement questions, contact
            your facilitator or write to{" "}
            <a className={editorialHome.textLink} href="mailto:billing@movemental.ai">
              billing@movemental.ai
            </a>
            .
          </p>
          <p>
            When Stripe-backed self-serve billing is wired for SandboxLive orgs, this surface will summarize plan,
            renewal date, and payment methods — without duplicating the finance system of record.
          </p>
          <Link href={`/sandboxlive/org?org=${encodeURIComponent(slug)}`} className={cn(editorialHome.primaryCta, "mt-4 inline-flex")}>
            Back to organization home →
          </Link>
        </div>
      </section>
    </div>
  );
}
