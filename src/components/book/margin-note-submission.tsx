"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";

type Props = {
  chapterSlug: string;
  defaultAnchorId: string;
};

export function MarginNoteSubmission({ chapterSlug, defaultAnchorId }: Props) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"question" | "feedback" | "criticism">("question");
  const [anchorId, setAnchorId] = useState(defaultAnchorId);
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [magicStatus, setMagicStatus] = useState<"idle" | "sent" | "error">("idle");

  const submit = async () => {
    if (!consent || !name.trim() || body.trim().length < 10) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/book/margin-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapter_slug: chapterSlug,
          anchor_paragraph_id: anchorId,
          type,
          body: body.trim(),
          contributor_display_name: name.trim(),
          contributor_title: title.trim() || null,
          contributor_url: url.trim() || null,
          contact_email: contactEmail.trim() || null,
          consent: true as const,
        }),
      });
      if (!res.ok) throw new Error("bad");
      setBody("");
      setConsent(false);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const sendMagicLink = async () => {
    if (!contactEmail.trim()) return;
    setMagicStatus("idle");
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOtp({
        email: contactEmail.trim(),
        options: { emailRedirectTo: `${origin}/book/read/${chapterSlug}` },
      });
      if (error) throw error;
      setMagicStatus("sent");
    } catch {
      setMagicStatus("error");
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-30 lg:bottom-8 lg:right-8">
        <Button
          type="button"
          size="icon"
          className="h-12 w-12 rounded-full shadow-ambient"
          onClick={() => setOpen(true)}
          aria-label="Add a margin note"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Add to the margin</SheetTitle>
            <SheetDescription>
              Questions, feedback, and constructive critique are reviewed before they appear publicly.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 px-4 pb-2">
            <fieldset>
              <legend className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                What kind of note?
              </legend>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                {(
                  [
                    ["question", "Question"],
                    ["feedback", "Feedback"],
                    ["criticism", "Critique"],
                  ] as const
                ).map(([value, label]) => (
                  <label key={value} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="note-type"
                      checked={type === value}
                      onChange={() => setType(value)}
                      className="accent-primary"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="anchor-id" className="text-xs font-medium text-muted-foreground">
                Paragraph anchor
              </label>
              <input
                id="anchor-id"
                value={anchorId}
                onChange={(e) => setAnchorId(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label htmlFor="note-body" className="text-xs font-medium text-muted-foreground">
                Your note
              </label>
              <textarea
                id="note-body"
                maxLength={1000}
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What's on your mind? Be specific — grounded notes are most useful."
                className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label htmlFor="credit-name" className="text-xs font-medium text-muted-foreground">
                How should we credit you? (name) *
              </label>
              <input
                id="credit-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="credit-title" className="text-xs font-medium text-muted-foreground">
                Title / organization (optional)
              </label>
              <input
                id="credit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="credit-url" className="text-xs font-medium text-muted-foreground">
                URL (optional)
              </label>
              <input
                id="credit-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              />
            </div>

            <div className="rounded-lg bg-section p-3">
              <p className="text-xs font-medium text-foreground">Verify identity (optional)</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Magic link ties submissions to your account when you are signed in.
              </p>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Email for magic link"
                  className="min-w-0 flex-1 rounded-md border border-border bg-card px-2 py-1.5 text-xs"
                />
                <Button type="button" size="sm" variant="secondary" onClick={sendMagicLink}>
                  Send link
                </Button>
              </div>
              {magicStatus === "sent" && (
                <p className="mt-2 text-xs text-muted-foreground">Check your inbox to finish sign-in.</p>
              )}
              {magicStatus === "error" && (
                <p className="mt-2 text-xs text-destructive">Could not send magic link.</p>
              )}
            </div>

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 accent-primary"
              />
              <span>
                I understand this will be reviewed before publishing and may be cited in future revisions.
              </span>
            </label>
          </div>

          <SheetFooter className="flex-col gap-2 border-t border-border/50 sm:flex-col">
            {status === "done" && (
              <p className="text-sm text-muted-foreground">Submitted — thank you. Our team will review it.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-destructive">Could not submit. Please try again.</p>
            )}
            <Button type="button" onClick={submit} disabled={status === "loading" || !consent}>
              {status === "loading" ? "Submitting…" : "Submit for review"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
