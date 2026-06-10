"use client";

import { useState } from "react";

import {
  Container,
  Display,
  Eyebrow,
  Prose,
  Section,
} from "@/components/primitives";
import type { ChapterKind } from "@/lib/book-types";
import { chapterLabel } from "@/lib/book-types";
import { BOOK_TITLE } from "@/lib/book-meta";

type ChapterOption = {
  slug: string;
  number: number;
  title: string;
  chapterKind: ChapterKind;
};

type Props = {
  chapters: ChapterOption[];
};

export function EndorseForm({ chapters }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const quote = String(fd.get("quote") ?? "").trim();
    const name = String(fd.get("name") ?? "").trim();
    const title = String(fd.get("title") ?? "").trim();
    const organization = String(fd.get("organization") ?? "").trim();
    const audience = String(fd.get("audience") ?? "movement-leaders");
    const chapterSlug = String(fd.get("chapter_slug") ?? "").trim() || null;

    try {
      const res = await fetch("/api/book/endorsements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote,
          endorser_name: name,
          endorser_title: title,
          endorser_org: organization || null,
          audience_lens: audience as
            | "movement-leaders"
            | "churches"
            | "nonprofits"
            | "institutions"
            | "other",
          chapter_slug: chapterSlug,
        }),
      });
      if (!res.ok) throw new Error("bad");
      setSubmitted(true);
    } catch {
      setError(true);
    }
  };

  if (submitted) {
    return (
      <Section spacing="lg" className="-mt-16 pt-[calc(4rem+clamp(4rem,10vw,7rem))]">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <Display size="sm" as="h1">
              Thank you
            </Display>
            <Prose className="mx-auto mt-4">
              <p>
                Your endorsement has been submitted for review. Once approved, it will appear on
                the book page — and may be included in future editions.
              </p>
            </Prose>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <Section spacing="lg" className="-mt-16 pt-[calc(4rem+clamp(4rem,10vw,7rem))]">
        <Container>
          <div className="mx-auto max-w-xl">
            <Eyebrow className="mb-4">Add your voice</Eyebrow>
            <Display size="sm" as="h1">
              Endorse this book
            </Display>
            <Prose className="mt-4">
              <p>
                If <em>{BOOK_TITLE}</em> shaped how you think about fragmentation, integration, and
                human intelligence in an AI age, we&apos;d welcome your words. They&apos;ll appear
                on the book page and may be included in future editions.
              </p>
            </Prose>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="endorser-name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="endorser-name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="endorser-title"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Title <span className="text-destructive">*</span>
                </label>
                <input
                  id="endorser-title"
                  name="title"
                  type="text"
                  required
                  className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder="e.g. Church Planter, Executive Director"
                />
              </div>

              <div>
                <label
                  htmlFor="endorser-org"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Organization
                </label>
                <input
                  id="endorser-org"
                  name="organization"
                  type="text"
                  className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label
                  htmlFor="endorser-quote"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Your endorsement <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="endorser-quote"
                  name="quote"
                  required
                  maxLength={500}
                  rows={4}
                  className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder="1–3 sentences on how this book shaped your thinking"
                />
                <p className="mt-1 text-xs text-muted-foreground">Max 500 characters</p>
              </div>

              <fieldset>
                <legend className="mb-1.5 text-sm font-medium text-foreground">
                  Which audience are you?
                </legend>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: "movement-leaders", label: "Movement leader" },
                    { value: "churches", label: "Church leader" },
                    { value: "nonprofits", label: "Nonprofit leader" },
                    { value: "institutions", label: "Institution" },
                    { value: "other", label: "Other" },
                  ].map((opt, i) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <input
                        type="radio"
                        name="audience"
                        value={opt.value}
                        defaultChecked={i === 0}
                        className="accent-primary"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="endorser-chapter"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Which chapter spoke to you most?
                </label>
                <select
                  id="endorser-chapter"
                  name="chapter_slug"
                  className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  defaultValue=""
                >
                  <option value="">No preference</option>
                  {chapters.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {chapterLabel({ number: c.number, chapterKind: c.chapterKind })}: {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input type="checkbox" name="consent" required className="mt-0.5 accent-primary" />
                <span>
                  I understand this will be reviewed before publishing and may be cited in future
                  editions of the book.
                </span>
              </label>

              {error && (
                <p className="text-sm text-destructive">Could not submit. Please try again shortly.</p>
              )}

              <button
                type="submit"
                className="w-full rounded-md bg-linear-to-br from-primary to-primary-dim px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Submit endorsement
              </button>
            </form>
          </div>
        </Container>
      </Section>
    </>
  );
}
