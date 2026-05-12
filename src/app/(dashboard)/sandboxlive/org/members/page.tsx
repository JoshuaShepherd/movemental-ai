import Link from "next/link";

import { submitSandboxLiveOrgInviteForm } from "@/app/(dashboard)/sandboxlive/org/actions";
import { SandboxLiveOrgMembersClient } from "@/app/(dashboard)/sandboxlive/org/_components/org-members-client";
import { editorialHome } from "@/lib/authenticated/editorial-home";
import { listOrgMemberRoster, requireSandboxLiveOrgParticipantSession } from "@/lib/sandboxlive/org-admin.server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const metadata = { title: "Members · SandboxLive" };

export default async function SandboxLiveOrgMembersPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const sp = await searchParams;
  const ctx = await requireSandboxLiveOrgParticipantSession(sp.org);
  const members = await listOrgMemberRoster(ctx.organizationId);

  return (
    <div className="flex flex-col">
      <section className={editorialHome.heroBand}>
        <p className={editorialHome.eyebrow}>YOUR ORGANIZATION</p>
        <h1 className={cn(editorialHome.display, "mt-4 max-w-[min(100%,52rem)] text-[clamp(2.5rem,4vw,3.25rem)]")}>
          Cohort members
        </h1>
        <p className={cn(editorialHome.lede, "mt-6")}>
          Everyone enrolled in this engagement — names, roles, onboarding posture, and last activity.{" "}
          <Link className={editorialHome.textLink} href={`/sandboxlive/org?org=${encodeURIComponent(ctx.slug)}`}>
            Back to organization home
          </Link>
          .
        </p>
      </section>

      <div className={editorialHome.hairline} aria-hidden />

      {ctx.isOrgAdmin ? (
        <section className={cn(editorialHome.bandGap, "pb-10")}>
          <header className="flex flex-col gap-2">
            <p className={editorialHome.eyebrow}>Invite</p>
            <h2 className={editorialHome.bandSubhead}>Bring someone into the cohort</h2>
            <p className={editorialHome.bandLede}>
              If they already have a Movemental account, they are added immediately. Otherwise we send a Supabase
              invitation email when <code className="text-[13px]">SUPABASE_SERVICE_ROLE_KEY</code> is configured.
            </p>
          </header>
          <form action={submitSandboxLiveOrgInviteForm} className="mx-auto flex max-w-[32rem] flex-col gap-4 sm:flex-row sm:items-end">
            <input type="hidden" name="orgSlug" value={ctx.slug} />
            <div className="min-w-0 flex-1 space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="name@organization.org" />
            </div>
            <Button type="submit" className="shrink-0 bg-primary text-primary-foreground">
              Send invite
            </Button>
          </form>
        </section>
      ) : null}

      <section className={cn(editorialHome.bandGap, "pb-[clamp(3rem,8vw,5rem)]")}>
        <header className="flex flex-col gap-2">
          <p className={editorialHome.eyebrow}>Roster</p>
          <h2 className={editorialHome.bandSubhead}>Who is in the room</h2>
        </header>
        <SandboxLiveOrgMembersClient
          orgSlug={ctx.slug}
          members={members}
          currentUserId={ctx.userId}
          isOrgAdmin={ctx.isOrgAdmin}
        />
      </section>
    </div>
  );
}
