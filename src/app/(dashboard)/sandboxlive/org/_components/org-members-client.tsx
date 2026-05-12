"use client";

import * as React from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import {
  removeSandboxLiveOrgMemberAction,
  updateSandboxLiveOrgMemberRoleAction,
} from "@/app/(dashboard)/sandboxlive/org/actions";
import type { OrgMembershipRole } from "@/lib/organizations/org-membership-role";
import { editorialHome } from "@/lib/authenticated/editorial-home";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type OrgMemberRosterClientRow = {
  membershipId: string;
  userId: string;
  email: string;
  displayName: string;
  ministryRole: string | null;
  membershipRole: string;
  membershipStatus: string | null;
  lastActiveAt: string | null;
  userOnboardingCompleted: boolean | null;
  userOnboardingStep: number | null;
};

function orgQ(slug: string) {
  return `?org=${encodeURIComponent(slug)}`;
}

export function SandboxLiveOrgMembersClient({
  orgSlug,
  members,
  currentUserId,
  isOrgAdmin,
}: {
  orgSlug: string;
  members: OrgMemberRosterClientRow[];
  currentUserId: string;
  isOrgAdmin: boolean;
}) {
  const [message, setMessage] = React.useState<string | null>(null);
  const q = orgQ(orgSlug);

  const setRole = async (membershipId: string, role: OrgMembershipRole) => {
    setMessage(null);
    const res = await updateSandboxLiveOrgMemberRoleAction({ orgSlug, membershipId, role });
    setMessage(res.ok ? null : res.message);
  };

  const remove = async (membershipId: string) => {
    if (!window.confirm("Remove this person from the cohort roster? Their account remains; they lose access to this organization.")) {
      return;
    }
    setMessage(null);
    const res = await removeSandboxLiveOrgMemberAction({ orgSlug, membershipId });
    setMessage(res.ok ? null : res.message);
  };

  return (
    <div className="flex flex-col gap-6">
      {message ? <p className="text-sm text-destructive">{message}</p> : null}
      <ol className="list-none divide-y divide-border p-0">
        {members.map((m) => {
          const isSelf = m.userId === currentUserId;
          const onboardingLabel =
            m.userOnboardingCompleted === true
              ? "Platform onboarding complete"
              : m.userOnboardingStep != null
                ? `Platform onboarding — step ${m.userOnboardingStep}`
                : "Platform onboarding — not started";
          return (
            <li key={m.membershipId} className="py-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-1">
                  <p className={cn(editorialHome.rowTitle22, "not-italic")}>{m.displayName}</p>
                  <p className={editorialHome.rowDesc14}>{m.email}</p>
                  <p className={editorialHome.rowMeta11}>
                    {m.ministryRole ? `${m.ministryRole} · ` : ""}
                    Membership: {m.membershipRole}
                    {m.membershipStatus === "pending" ? " (pending)" : ""}
                  </p>
                  <p className={editorialHome.rowMeta11}>{onboardingLabel}</p>
                  <p className={editorialHome.rowMeta11}>
                    Last activity: {m.lastActiveAt ? new Date(m.lastActiveAt).toLocaleString() : "—"}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/sandboxlive/phase/02-assessment${q}`}
                      className={cn(editorialHome.textLink, "text-[14px]")}
                    >
                      Open your Current Reality Map workspace (Phase 02)
                    </Link>
                    <span className="mx-2 text-muted-foreground">·</span>
                    <Link href={`/welcome${q}`} className={cn(editorialHome.textLink, "text-[14px]")}>
                      View your onboarding checklist
                    </Link>
                  </div>
                </div>
                {isOrgAdmin && !isSelf ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" variant="outline" size="sm" className="shrink-0 gap-2">
                        <MoreHorizontal className="size-4" aria-hidden />
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[12rem]">
                      <DropdownMenuItem onClick={() => void setRole(m.membershipId, "admin")}>
                        Make admin
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => void setRole(m.membershipId, "member")}>
                        Make member
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => void setRole(m.membershipId, "sponsor")}>
                        Make sponsor (read-only oversight)
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => void remove(m.membershipId)}
                      >
                        Remove from cohort
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
