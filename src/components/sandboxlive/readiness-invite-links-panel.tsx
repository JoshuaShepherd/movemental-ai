"use client";

import { Link2, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  createReadinessInviteLinkAction,
  revokeReadinessInviteLinkAction,
} from "@/app/(dashboard)/sandboxlive/readiness/invite-actions";
import { Button } from "@/components/ui/button";
import type { ReadinessInviteListRow } from "@/lib/sandboxlive/readiness-invite.server";
import { cn } from "@/lib/utils";

export function ReadinessInviteLinksPanel({
  orgSlug,
  initialInvites,
}: {
  orgSlug: string;
  initialInvites: ReadinessInviteListRow[];
}) {
  const router = useRouter();
  const [invites, setInvites] = useState(initialInvites);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function handleCreate() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const result = await createReadinessInviteLinkAction({ orgSlug });
      if (!result.ok) {
        setError(result.reason);
        return;
      }
      setMessage(
        "Link copied to your clipboard. Send it only over private channels — it will not be shown again.",
      );
      try {
        await navigator.clipboard.writeText(result.url);
      } catch {
        setMessage(
          `Copy this URL manually (shown once): ${result.url}`,
        );
      }
      setInvites((prev) => [
        {
          id: result.inviteId,
          label: null,
          expiresAt: null,
          revokedAt: null,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      router.refresh();
    });
  }

  async function handleRevoke(inviteId: string) {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const result = await revokeReadinessInviteLinkAction({ orgSlug, inviteId });
      if (!result.ok) {
        setError(result.reason);
        return;
      }
      setInvites((prev) =>
        prev.map((r) =>
          r.id === inviteId ? { ...r, revokedAt: new Date().toISOString() } : r,
        ),
      );
      setMessage("That invite link has been revoked.");
      router.refresh();
    });
  }

  return (
    <section
      className={cn(
        "mx-auto mb-10 w-full max-w-3xl rounded-xl border border-border bg-card px-6 py-6 text-card-foreground shadow-ambient",
      )}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Team link (no sign-in)
          </h2>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
            For staff who cannot use the dashboard. Each link is private — do not post it on your
            public website. Revoke a link when the cohort is done.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="shrink-0 gap-2"
          disabled={pending}
          onClick={() => void handleCreate()}
        >
          <Link2 size={16} aria-hidden />
          New invite link
        </Button>
      </div>

      {message ? (
        <p className="mt-4 text-sm text-muted-foreground" role="status">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 flex items-start gap-2 text-sm text-destructive" role="alert">
          <ShieldAlert size={16} className="mt-0.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : null}

      {invites.length > 0 ? (
        <ul className="mt-6 divide-y divide-border border-t border-border pt-4">
          {invites.map((inv) => (
            <li
              key={inv.id}
              className="flex flex-col gap-2 py-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 text-sm">
                <span className="font-medium text-foreground">
                  {inv.revokedAt ? "Revoked invite" : "Active invite"}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Created {new Date(inv.createdAt).toLocaleString()}
                  {inv.label ? ` · ${inv.label}` : ""}
                </span>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                {!inv.revokedAt ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    disabled={pending}
                    onClick={() => void handleRevoke(inv.id)}
                  >
                    Revoke
                  </Button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          No invite links yet. Create one and share it privately with your team.
        </p>
      )}
    </section>
  );
}
