"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useTransition, type ReactNode } from "react";

import { DashboardPublicSiteLink } from "@/components/authenticated/dashboard-public-site-link";
import { MovementLeaderPublicPageView } from "@/components/movement-leaders/movement-leader-public-page-view";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  formatBioSectionEdit,
  parseBioSectionEdit,
  type PublicLeaderIdentity,
  type PublicPageSectionId,
  type PublicPageSnapshot,
  publicLeaderPageModelFromSnapshot,
} from "@/lib/movement-leaders/public-page-model";

import {
  approvePublicPageAction,
  republishPublicPageAction,
  requestPublicPageEditsAction,
  savePublicPageDraftAction,
  unpublishPublicPageAction,
} from "./actions";

export type LeaderPublicPageRatificationLeaderProps = {
  id: string;
  slug: string;
  full_name: string;
  photo_url: string | null;
  primary_role: string | null;
  primary_organization: string | null;
};

type Props = {
  leader: LeaderPublicPageRatificationLeaderProps;
  initialSnapshot: PublicPageSnapshot;
  isLive: boolean;
  publicPath: string;
};

const SECTION_LABEL: Record<PublicPageSectionId, string> = {
  bio: "Bio",
  personal_piece: "Personal piece",
  frameworks: "Frameworks",
  organizational_footprint: "Organizational footprint",
  endorsements: "Endorsements",
};

function EditLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left text-[12px] font-normal text-pathway-accent underline decoration-pathway-accent/50 underline-offset-4 transition-colors hover:text-foreground"
    >
      Edit this section
    </button>
  );
}

function PreviewBanner({
  mode,
  publicPath,
}: {
  mode: "preview" | "live";
  publicPath: string;
}) {
  const siteBase = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  const absolute = siteBase ? `${siteBase}${publicPath}` : publicPath;
  if (mode === "live") {
    return (
      <div className="border-l-[3px] border-pathway-accent bg-section px-5 py-6 pr-6">
        <p className="text-[11px] font-medium uppercase tracking-widest text-pathway-accent">
          Published · live at {publicPath}
        </p>
        <p className="mt-2 font-serif text-[28px] italic leading-snug tracking-tight text-foreground">
          Your page is live.
        </p>
        <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-muted-foreground">
          Visitors see this content on the public site. You can still edit sections below; use{" "}
          <span className="font-medium text-foreground">Update and re-publish</span> when you are ready for changes to
          go live, or <span className="font-medium text-foreground">Unpublish</span> to remove the page from the{" "}
          <DashboardPublicSiteLink href="/voices">trusted-voices directory</DashboardPublicSiteLink> while you revise.
        </p>
        {siteBase ? (
          <p className="mt-2 text-xs text-muted-foreground">
            <DashboardPublicSiteLink href={absolute}>Open the live public page →</DashboardPublicSiteLink>
          </p>
        ) : null}
      </div>
    );
  }
  return (
    <div className="border-l-[3px] border-pathway-accent bg-section px-5 py-6 pr-6">
      <p className="text-[11px] font-medium uppercase tracking-widest text-pathway-accent">
        Preview — not yet public
      </p>
      <p className="mt-2 font-serif text-[28px] italic leading-snug tracking-tight text-foreground">
        This is what the world would see. Approve when ready.
      </p>
      <p className="mt-3 max-w-[680px] text-[14px] leading-relaxed text-muted-foreground">
        Once approved, your page becomes visible at {publicPath} and appears in the{" "}
        <DashboardPublicSiteLink href="/voices">public directory of trusted voices</DashboardPublicSiteLink>. You can
        request changes or withdraw at any time.
      </p>
    </div>
  );
}

export function LeaderPublicPageRatificationClient({
  leader,
  initialSnapshot,
  isLive,
  publicPath,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [snapshot, setSnapshot] = useState<PublicPageSnapshot>(initialSnapshot);
  const [editSection, setEditSection] = useState<PublicPageSectionId | null>(null);
  const [editText, setEditText] = useState("");
  const [approveOpen, setApproveOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [unpublishOpen, setUnpublishOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const identity: PublicLeaderIdentity = useMemo(
    () => ({
      full_name: leader.full_name,
      slug: leader.slug,
      photo_url: leader.photo_url,
      primary_role: leader.primary_role,
      primary_organization: leader.primary_organization,
    }),
    [leader.full_name, leader.slug, leader.photo_url, leader.primary_role, leader.primary_organization],
  );

  const model = useMemo(() => publicLeaderPageModelFromSnapshot(identity, snapshot), [identity, snapshot]);

  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const openEdit = (section: PublicPageSectionId) => {
    setError(null);
    setEditSection(section);
    if (section === "bio") {
      setEditText(formatBioSectionEdit(snapshot));
    } else if (section === "personal_piece") {
      setEditText(snapshot.personal_piece ?? "");
    } else if (section === "frameworks") {
      setEditText(snapshot.frameworks_markdown ?? "");
    } else if (section === "organizational_footprint") {
      setEditText(snapshot.organizational_footprint_markdown ?? "");
    } else {
      setEditText(snapshot.endorsements_markdown ?? "");
    }
  };

  const applySectionEdit = () => {
    if (!editSection) return;
    setSnapshot((prev) => {
      const next = { ...prev };
      if (editSection === "bio") {
        const parsed = parseBioSectionEdit(editText);
        next.bio_short = parsed.bio_short;
        next.bio_long = parsed.bio_long;
      } else if (editSection === "personal_piece") {
        next.personal_piece = editText.trim() || null;
      } else if (editSection === "frameworks") {
        next.frameworks_markdown = editText.trim() || null;
      } else if (editSection === "organizational_footprint") {
        next.organizational_footprint_markdown = editText.trim() || null;
      } else {
        next.endorsements_markdown = editText.trim() || null;
      }
      return next;
    });
    setEditSection(null);
  };

  const sectionActions: Partial<Record<PublicPageSectionId, ReactNode>> = {
    bio: <EditLink onClick={() => openEdit("bio")} />,
    personal_piece: <EditLink onClick={() => openEdit("personal_piece")} />,
    frameworks: <EditLink onClick={() => openEdit("frameworks")} />,
    organizational_footprint: <EditLink onClick={() => openEdit("organizational_footprint")} />,
    endorsements: <EditLink onClick={() => openEdit("endorsements")} />,
  };

  const run = (fn: () => Promise<unknown>) => {
    setError(null);
    startTransition(async () => {
      try {
        await fn();
        refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  };

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Trusted voices</p>
        <h1 className="font-serif text-[clamp(1.75rem,3.5vw,2.25rem)] italic leading-tight tracking-tight text-foreground">
          Public page
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/leader/public-page/history" className="text-foreground underline underline-offset-4">
            Version history
          </Link>
          {isLive ? (
            <Link href={publicPath} className="text-foreground underline underline-offset-4">
              View live public page
            </Link>
          ) : null}
        </div>
      </header>

      <PreviewBanner mode={isLive ? "live" : "preview"} publicPath={publicPath} />

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="overflow-hidden border-[0.5px] border-border-soft bg-background">
        <MovementLeaderPublicPageView model={model} sectionActions={sectionActions} wrapWithSection={false} />
      </div>

      <div className="border-t border-border-soft pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          {!isLive ? (
            <Button
              type="button"
              variant="pathway"
              disabled={pending}
              onClick={() => setApproveOpen(true)}
            >
              Approve for publication
            </Button>
          ) : (
            <Button
              type="button"
              variant="pathway"
              disabled={pending}
              onClick={() =>
                run(async () => {
                  await republishPublicPageAction(snapshot);
                })
              }
            >
              Update and re-publish
            </Button>
          )}
          <Button type="button" variant="outline" disabled={pending} onClick={() => setRequestOpen(true)} className="rounded-none">
            Request edits
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={pending}
            className="rounded-none text-muted-foreground"
            onClick={() =>
              run(async () => {
                await savePublicPageDraftAction(snapshot);
              })
            }
          >
            Record a preview without publishing
          </Button>
          {isLive ? (
            <Button type="button" variant="ghost" disabled={pending} onClick={() => setUnpublishOpen(true)}>
              Unpublish
            </Button>
          ) : null}
        </div>
      </div>

      <Dialog open={Boolean(editSection)} onOpenChange={(o) => !o && setEditSection(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit {editSection ? SECTION_LABEL[editSection] : ""}</DialogTitle>
            <DialogDescription>
              {editSection === "bio"
                ? "Put a short one-line summary first, then a line containing only three dashes (---), then your longer bio."
                : "Markdown is supported in this field."}
            </DialogDescription>
          </DialogHeader>
          <Textarea value={editText} onChange={(e) => setEditText(e.target.value)} rows={12} className="font-mono text-sm" />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="ghost" className="rounded-none" onClick={() => setEditSection(null)}>
              Close editor
            </Button>
            <Button type="button" variant="pathway" onClick={applySectionEdit}>
              Apply to preview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish this page?</DialogTitle>
            <DialogDescription>
              This will publish your page at {publicPath} and add you to the public directory. You can request changes
              or withdraw at any time. Continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="ghost" className="rounded-none" onClick={() => setApproveOpen(false)}>
              Not now
            </Button>
            <Button
              type="button"
              variant="pathway"
              disabled={pending}
              onClick={() => {
                setApproveOpen(false);
                run(async () => {
                  await approvePublicPageAction(snapshot);
                });
              }}
            >
              Publish now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request edits from Movemental</DialogTitle>
            <DialogDescription>
              Describe what you would like the editorial team to change on your public page.
            </DialogDescription>
          </DialogHeader>
          <Textarea value={requestText} onChange={(e) => setRequestText(e.target.value)} rows={6} />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="ghost" className="rounded-none" onClick={() => setRequestOpen(false)}>
              Close
            </Button>
            <Button
              type="button"
              variant="pathway"
              disabled={pending}
              onClick={() => {
                const t = requestText;
                setRequestOpen(false);
                setRequestText("");
                run(async () => {
                  await requestPublicPageEditsAction(t);
                });
              }}
            >
              Send request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={unpublishOpen} onOpenChange={setUnpublishOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unpublish your page?</DialogTitle>
            <DialogDescription>
              Your public profile will return to private. You can publish again whenever you are ready.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="ghost" className="rounded-none" onClick={() => setUnpublishOpen(false)}>
              Keep published
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="rounded-none"
              disabled={pending}
              onClick={() => {
                setUnpublishOpen(false);
                run(async () => {
                  await unpublishPublicPageAction();
                });
              }}
            >
              Unpublish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
