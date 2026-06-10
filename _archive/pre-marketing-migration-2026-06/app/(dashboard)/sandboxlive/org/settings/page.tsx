import Link from "next/link";

import { submitSandboxLiveOrgSettingsForm } from "@/app/(dashboard)/sandboxlive/org/actions";
import { editorialHome } from "@/lib/authenticated/editorial-home";
import { loadSandboxLiveOrgProfile, requireSandboxLiveOrgAdminSession } from "@/lib/sandboxlive/org-admin.server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const metadata = { title: "Engagement settings · SandboxLive" };

export default async function SandboxLiveOrgSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const sp = await searchParams;
  const { organizationId, slug } = await requireSandboxLiveOrgAdminSession(sp.org);
  const profile = await loadSandboxLiveOrgProfile(organizationId);
  if (!profile) return <p className="text-muted-foreground">Organization not found.</p>;

  const settings =
    profile.settings && typeof profile.settings === "object" && profile.settings !== null
      ? (profile.settings as Record<string, unknown>)
      : {};
  const prefs =
    settings.org_shell_prefs && typeof settings.org_shell_prefs === "object" && settings.org_shell_prefs !== null
      ? (settings.org_shell_prefs as Record<string, unknown>)
      : {};

  const emailFrequency = (prefs.email_frequency as string) || "digest";
  const notifyProduct = Boolean(prefs.notify_product);
  const notifyOps = Boolean(prefs.notify_ops);
  const displayName = (prefs.display_name_in_cohort as string) || profile.name;
  const timezone = (prefs.timezone as string) || "";

  return (
    <div className="flex flex-col">
      <section className={editorialHome.heroBand}>
        <p className={editorialHome.eyebrow}>YOUR ORGANIZATION</p>
        <h1 className={cn(editorialHome.display, "mt-4 max-w-[min(100%,52rem)] text-[clamp(2.5rem,4vw,3.25rem)]")}>
          Engagement settings
        </h1>
        <p className={cn(editorialHome.lede, "mt-6")}>
          Preferences your administrators control between facilitated touches.{" "}
          <Link className={editorialHome.textLink} href={`/sandboxlive/org?org=${encodeURIComponent(slug)}`}>
            Organization home
          </Link>
          .
        </p>
      </section>

      <div className={editorialHome.hairline} aria-hidden />

      <section className={cn(editorialHome.bandGap, "pb-10")}>
        <form action={submitSandboxLiveOrgSettingsForm} className="mx-auto flex max-w-[40rem] flex-col gap-5">
          <input type="hidden" name="orgSlug" value={slug} />

          <div className="space-y-2">
            <Label htmlFor="emailFrequency">Email frequency</Label>
            <select
              id="emailFrequency"
              name="emailFrequency"
              defaultValue={emailFrequency}
              className="flex h-10 w-full rounded-none border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="digest">Digest — batched a few times per week</option>
              <option value="immediate">Immediate — each operational event</option>
              <option value="quiet">Quiet — only critical interruptions</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 border-[0.5px] border-border bg-section px-4 py-4">
            <p className="text-[13px] font-medium text-foreground">Notification routing</p>
            <label className="flex items-center gap-2 text-[14px] text-foreground">
              <input type="checkbox" name="notifyProduct" defaultChecked={notifyProduct} className="size-4 rounded-none border-border" />
              Product & cohort updates to primary contact
            </label>
            <label className="flex items-center gap-2 text-[14px] text-foreground">
              <input type="checkbox" name="notifyOps" defaultChecked={notifyOps} className="size-4 rounded-none border-border" />
              Operational notices (session changes, facilitator notes)
            </label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="persona">Dashboard persona</Label>
            <select
              id="persona"
              name="persona"
              defaultValue={profile.persona}
              className="flex h-10 w-full rounded-none border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="movement_leader">Movement leader</option>
              <option value="implementation_org">Implementation organization</option>
            </select>
            <p className="text-[12px] text-muted-foreground">
              Controls copy and checklist tone across Safety &amp; Sandbox — see dashboard persona charter.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayNameInCohort">Preferred name in cohort view</Label>
            <Input id="displayNameInCohort" name="displayNameInCohort" defaultValue={displayName} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone for scheduling</Label>
            <Input id="timezone" name="timezone" placeholder="e.g. America/Chicago" defaultValue={timezone} />
          </div>

          <Button type="submit" variant="pathway" className="w-fit">
            Record settings
          </Button>
        </form>
      </section>

      <div className={editorialHome.hairline} aria-hidden />

      <section className={cn(editorialHome.bandGap, "pb-[clamp(3rem,8vw,5rem)]")}>
        <p className={editorialHome.eyebrow}>Staff-managed fields</p>
        <h2 className={editorialHome.bandSubhead}>When you need Movemental in the loop</h2>
        <p className={editorialHome.bandLede}>
          Cohort reassignment, engagement-type changes, and some commercial moves are intentionally not self-serve —
          they touch facilitation risk, sponsor optics, and billing. Message your facilitator or open a thread with
          the team.
        </p>
        <Link href="/contact" className={cn(editorialHome.primaryCta, "mt-4 w-fit")}>
          Contact facilitator →
        </Link>
      </section>
    </div>
  );
}
