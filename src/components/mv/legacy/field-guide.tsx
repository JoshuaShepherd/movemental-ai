"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import { SAFETY_GUIDEBOOK } from "@/lib/agent-room/naming";
import { FIELD_GUIDE_PAGE_COPY, resolveFieldGuideKind, type FieldGuideKind } from "@/lib/field-guide-page";
import {
  SAFETY_HANDBOOK_COVER_ALT,
  SAFETY_HANDBOOK_COVER_HEIGHT,
  SAFETY_HANDBOOK_COVER_IMAGE,
  SAFETY_HANDBOOK_COVER_WIDTH,
} from "@/lib/safety-field-guide";

/** `/field-guide` on Paper (board: Kept pages · Field guide). Copy, API and messages unchanged. */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function FieldGuideForm({ guide }: { guide: FieldGuideKind }) {
  const copy = FIELD_GUIDE_PAGE_COPY[guide];
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setErrorMsg("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/toolkit-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), organization: org.trim() || undefined, fieldGuide: guide, source: "field-guide-page" }),
      });
      const data = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          data?.error?.message ??
            (res.status === 429 ? "Too many attempts. Please wait a bit and try again." : "Something went wrong. Try again, or email josh@movemental.ai."),
        );
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again, or email josh@movemental.ai.");
    }
  };

  if (status === "done") return <p className="mv-form-done" role="status">{copy.success}</p>;

  return (
    <form className="mv-form" onSubmit={submit} noValidate id="download">
      <div className="mv-ff">
        <label htmlFor="fg-email">Email</label>
        <input
          id="fg-email"
          className="mv-input"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
        />
      </div>
      <div className="mv-ff">
        <label htmlFor="fg-org">
          Organization <span>(optional)</span>
        </label>
        <input id="fg-org" className="mv-input" type="text" autoComplete="organization" value={org} onChange={(e) => setOrg(e.target.value)} />
      </div>
      {status === "error" && errorMsg ? (
        <p className="mv-form-error" role="alert">
          {errorMsg}
        </p>
      ) : null}
      <div>
        <button type="submit" className="mv-btn-ink" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : guide === "safety" ? `Send me the ${SAFETY_GUIDEBOOK.shortLabel}` : "Send me the field guide"}
        </button>
      </div>
      <p className="mv-form-note">We send the PDF immediately and one follow-up email a week later. Unsubscribe anytime.</p>
      <p className="mv-form-note">
        Prefer a file right now?{" "}
        <a href={copy.pdfPath} download={copy.pdfFilename}>
          Download the PDF
        </a>
      </p>
    </form>
  );
}

export function FieldGuidePage() {
  const params = useSearchParams();
  const guide = resolveFieldGuideKind(params.get("guide"));
  const copy = FIELD_GUIDE_PAGE_COPY[guide];
  const hasCover = guide === "safety";

  return (
    <div className="mv-wrap">
      <div className="mv-fg" data-cover={hasCover ? "true" : "false"}>
        {hasCover ? (
          <div className="mv-fg-cover">
            <Image
              src={SAFETY_HANDBOOK_COVER_IMAGE}
              alt={SAFETY_HANDBOOK_COVER_ALT}
              width={SAFETY_HANDBOOK_COVER_WIDTH}
              height={SAFETY_HANDBOOK_COVER_HEIGHT}
              sizes="(max-width: 900px) 70vw, 340px"
              priority
            />
          </div>
        ) : null}
        <div className="mv-fg-main">
          <p className="mv-kicker">{copy.eyebrow}</p>
          <h1 className="mv-ph-title">{copy.title}</h1>
          <p className="mv-ph-deck">{copy.lede}</p>
          <div className="mv-fg-meta" aria-label="Field guide details">
            {copy.meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <FieldGuideForm key={guide} guide={guide} />
        </div>
      </div>
      <section className="mv-fg-inside" aria-labelledby="field-guide-inside-heading">
        <h2 id="field-guide-inside-heading" className="mv-dk-h2">
          {copy.insideHeading}
        </h2>
        <div className="mv-cards">
          {copy.inside.map((i) => (
            <div className="mv-card" key={i.title}>
              <p className="mv-card-label">{i.label}</p>
              <p className="mv-card-title">{i.title}</p>
              <p className="mv-card-body">{i.body}</p>
            </div>
          ))}
        </div>
      </section>
      <p className="mv-fine mv-page-end">
        Also available: <Link href={copy.otherGuide.href}>{copy.otherGuide.label}</Link>
        <span aria-hidden="true"> · </span>
        <a href="mailto:josh@movemental.ai">Questions?</a>
      </p>
    </div>
  );
}
