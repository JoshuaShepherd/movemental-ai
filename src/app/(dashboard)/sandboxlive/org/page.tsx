import Link from "next/link";

import {
  engagementStatusLabel,
  engagementTypeLabelFromSettings,
  loadSandboxLiveOrgProfile,
  requireSandboxLiveOrgAdminSession,
} from "@/lib/sandboxlive/org-admin.server";
import { editorialHome } from "@/lib/authenticated/editorial-home";
import { submitSandboxLiveOrgProfileForm } from "@/app/(dashboard)/sandboxlive/org/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const metadata = { title: "Your organization · SandboxLive" };

export default async function SandboxLiveOrgHomePage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const sp = await searchParams;
  const { organizationId, slug } = await requireSandboxLiveOrgAdminSession(sp.org);
  const profile = await loadSandboxLiveOrgProfile(organizationId);
  if (!profile) {
    return <p className="text-muted-foreground">Organization not found.</p>;
  }

  const engagement = engagementTypeLabelFromSettings(profile.settings);
  const statusLine = engagementStatusLabel(profile);
  const q = `?org=${encodeURIComponent(slug)}`;
  const settingsObj =
    profile.settings && typeof profile.settings === "object" && profile.settings !== null
      ? (profile.settings as Record<string, unknown>)
      : {};
  const engagementValue =
    settingsObj.engagement_type === "safestart" || settingsObj.engagement_type === "safe_start"
      ? "safestart"
      : "sandboxlive";

  return (
    <div className="flex flex-col">
      <section className={editorialHome.heroBand}>
        <p className={editorialHome.eyebrow}>YOUR ORGANIZATION</p>
        <h1
          className={cn(
            editorialHome.display,
            "mt-4 max-w-[min(100%,52rem)] text-[clamp(3rem,4.5vw,3.5rem)]",
          )}
        >
          {profile.name}
        </h1>
        <p className={cn(editorialHome.lede, "mt-6")}>
          The live profile Movemental and your cohort use to stay aligned — name, contact, cohort
          assignment, and engagement posture.
        </p>
      </section>

      <div className={editorialHome.hairline} aria-hidden />

      <section className={cn(editorialHome.bandGap, "pb-10")}>
        <header className="flex flex-col gap-2">
          <p className={editorialHome.eyebrow}>Profile</p>
          <h2 className={editorialHome.bandSubhead}>What the cohort sees on the roster</h2>
          <p className={editorialHome.bandLede}>
            Record updates deliberately. The logo field expects an HTTPS image URL you already host.
          </p>
        </header>

        <form action={submitSandboxLiveOrgProfileForm} className="mx-auto flex max-w-[40rem] flex-col gap-5">
          <input type="hidden" name="orgSlug" value={slug} />
          <div className="space-y-2">
            <Label htmlFor="name">Legal / roster name</Label>
            <Input id="name" name="name" defaultValue={profile.name} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Short description</Label>
            <Textarea id="description" name="description" rows={4} defaultValue={profile.description ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Primary contact email</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              defaultValue={profile.contactEmail ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo URL</Label>
            <Input id="logoUrl" name="logoUrl" type="url" placeholder="https://…" defaultValue={profile.logoUrl ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cohortId">Cohort assignment (UUID)</Label>
            <Input id="cohortId" name="cohortId" defaultValue={profile.cohortId ?? ""} placeholder="Optional" />
            <p className="text-[12px] text-muted-foreground">
              When set, this id groups your organization with others in the same SandboxLive cohort.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cohortStartDate">Engagement start date</Label>
            <Input
              id="cohortStartDate"
              name="cohortStartDate"
              type="date"
              defaultValue={profile.cohortStartDate ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="engagementType">Engagement type</Label>
            <select
              id="engagementType"
              name="engagementType"
              defaultValue={engagementValue}
              className="flex h-10 w-full rounded-none border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="sandboxlive">SandboxLive</option>
              <option value="safestart">SafeStart</option>
            </select>
          </div>
          <div className="border-[0.5px] border-border bg-section px-4 py-3 text-[14px] text-muted-foreground">
            <p className="font-medium text-foreground">Engagement status</p>
            <p className="mt-1">{statusLine}</p>
            <p className="mt-2">
              Current product label: <span className="text-foreground">{engagement}</span>
            </p>
          </div>
          <Button type="submit" variant="pathway" className="w-fit">
            Record profile
          </Button>
        </form>
      </section>

      <div className={editorialHome.hairline} aria-hidden />

      <section className={cn(editorialHome.bandGap, "pb-[clamp(3rem,8vw,5rem)]")}>
        <p className={editorialHome.eyebrow}>Navigate</p>
        <ol className="list-none p-0">
          <li className={editorialHome.rowWrap}>
            <Link href={`/sandboxlive/org/members${q}`} className={cn(editorialHome.rowLink, editorialHome.rowInactive)}>
              <span className={editorialHome.rowNum24}>01</span>
              <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className={editorialHome.rowTitle22}>Manage your members</span>
                <span className={editorialHome.rowDesc14}>
                  Roster, invitations, roles, and each person&apos;s onboarding signal — written as an editorial
                  register, not a grid of SaaS controls.
                </span>
              </span>
            </Link>
          </li>
          <li className={editorialHome.rowWrap}>
            <Link href={`/sandboxlive/org/settings${q}`} className={cn(editorialHome.rowLink, editorialHome.rowInactive)}>
              <span className={editorialHome.rowNum24}>02</span>
              <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className={editorialHome.rowTitle22}>Engagement settings</span>
                <span className={editorialHome.rowDesc14}>
                  Communications, persona, display name in the cohort, and timezone — the knobs your
                  administrators hold between facilitated sessions.
                </span>
              </span>
            </Link>
          </li>
          <li className={editorialHome.rowWrap}>
            <Link href={`/sandboxlive/org/agreements${q}`} className={cn(editorialHome.rowLink, editorialHome.rowInactive)}>
              <span className={editorialHome.rowNum24}>03</span>
              <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className={editorialHome.rowTitle22}>Signed agreements</span>
                <span className={editorialHome.rowDesc14}>
                  Engagement contract, Movement Voice Commitments where applicable, and sponsorship
                  paperwork — each with version, signatory, and date.
                </span>
              </span>
            </Link>
          </li>
          <li className={editorialHome.rowWrap}>
            <Link href={`/sandboxlive/org/billing${q}`} className={cn(editorialHome.rowLink, editorialHome.rowInactive)}>
              <span className={editorialHome.rowNum24}>04</span>
              <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className={editorialHome.rowTitle22}>Billing</span>
                <span className={editorialHome.rowDesc14}>
                  Commercial posture for the engagement — routed to Movemental finance and your facilitator.
                </span>
              </span>
            </Link>
          </li>
        </ol>
      </section>
    </div>
  );
}
