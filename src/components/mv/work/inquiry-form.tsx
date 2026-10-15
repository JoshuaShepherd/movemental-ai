"use client";

import Link from "next/link";
import { useState } from "react";

import { Check } from "../resolve/dialog";
import { MV_ROUTES } from "../routes";

/**
 * The inquiry form (/work-with-us/inquire). Board: Work-Inquire, with its Form and Sent states.
 *
 * Check-then-branch: `src/app/api/contact/route.ts` exists (stores the submission, notifies the
 * team inbox, sends one acknowledgement). This form posts there with
 * `audience_segment: "Organization / institution"` and folds the structured answers into the
 * message. TODO(back-end merge): a dedicated inquiry record with these fields as columns.
 */

const TYPES = ["Church", "Nonprofit", "Seminary or college", "Denomination or network", "Other"];
const AREAS = [
  "Organizational guidance",
  "Context reconstruction",
  "Custom platforms and agents",
  "Ongoing stewardship",
  "Not sure yet",
];
const NEXTS = [
  ["talk", "A conversation", "a conversation"],
  ["read", "Something to read first", "something to read first"],
  ["network", "A conversation about our whole network", "a conversation about your network"],
] as const;

type Next = (typeof NEXTS)[number][0];

export function InquiryForm() {
  const [org, setOrg] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [web, setWeb] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [areas, setAreas] = useState<string[]>([]);
  const [need, setNeed] = useState("");
  const [next, setNext] = useState<Next>("talk");
  const [consent, setConsent] = useState(false);
  const [needConsent, setNeedConsent] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const nextText = NEXTS.find((n) => n[0] === next)![2];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setProblem(null);
    if (!consent) {
      setNeedConsent(true);
      return;
    }
    const message = [
      type ? `Type: ${type}` : null,
      role ? `Role: ${role}` : null,
      web ? `Website: ${web}` : null,
      areas.length ? `Where we could help: ${areas.join(", ")}` : null,
      `Next step: ${NEXTS.find((n) => n[0] === next)![1]}`,
      "",
      need.trim(),
    ]
      .filter((l): l is string => l !== null)
      .join("\n");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          organization: org.trim() || undefined,
          audience_segment: "Organization / institution",
          message,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
        setProblem(body?.error?.message ?? "This didn’t send. Try again in a moment.");
        return;
      }
      setSent(true);
      window.scrollTo({ top: 0 });
    } catch {
      setProblem("This didn’t send. Try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="mv-wrap mv-stack mv-settle" style={{ maxWidth: 820, paddingTop: 96, paddingBottom: 120, gap: 26 }}>
        <h1 className="mv-h1">
          Thank you. We have it.
        </h1>
        <p className="mv-reading-lg mv-soft" style={{ fontSize: 21 }}>
          A person will read what you wrote and reply to you by email. You asked for {nextText}.
        </p>
        <div className="mv-stack" style={{ borderTop: "1px solid var(--mv-rule)", borderBottom: "1px solid var(--mv-rule)" }}>
          <p style={{ padding: "16px 0 6px", fontSize: 15, fontWeight: 500 }}>While you wait</p>
          {(
            [
              [MV_ROUTES.resolve, "Write your own Resolution", "About four minutes"],
              [MV_ROUTES.assessment, "Start the Reality Assessment", "See what is actually happening"],
              [MV_ROUTES.guidebook, "Read the guidebook", "The whole method, free"],
            ] as const
          ).map(([href, t, sub]) => (
            <Link
              key={t}
              href={href}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                gap: 16,
                alignItems: "baseline",
                padding: "16px 0",
                borderTop: "1px solid var(--mv-rule)",
                textDecoration: "none",
              }}
            >
              <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 26 }}>{t}</span>
              <span className="mv-caption mv-muted">{sub}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mv-wrap mv-form-grid" style={{ paddingBottom: 104 }}>
      <form onSubmit={submit} className="mv-stack" style={{ gap: 30, minWidth: 0 }}>
        <div className="mv-stack" style={{ gap: 14 }}>
          <h1 className="mv-rz-title">Discuss your organization’s response</h1>
          <p className="mv-reading mv-soft" style={{ fontSize: 20, lineHeight: 1.5 }}>
            Tell us a little about your organization and what is in front of you. It takes about two
            minutes, and a person reads every one.
          </p>
        </div>

        <fieldset className="mv-stack" style={{ margin: 0, padding: 0, border: "none", gap: 16 }} aria-labelledby="f-org">
          <h2 id="f-org" className="mv-form-h">
            Your organization
          </h2>
          <div className="mv-field-group">
            <label htmlFor="org" className="mv-label">
              Name
            </label>
            <input id="org" className="mv-field" type="text" autoComplete="organization" value={org} onChange={(e) => setOrg(e.target.value)} />
          </div>
          <div className="mv-field-group" style={{ gap: 10 }}>
            <p id="kind" className="mv-label">
              What kind of organization?
            </p>
            <div role="radiogroup" aria-labelledby="kind" className="mv-chips">
              {TYPES.map((t) => (
                <button key={t} type="button" role="radio" aria-checked={type === t} className="mv-pick" onClick={() => setType(t)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="mv-field-group">
            <label htmlFor="web" className="mv-label">
              Website <span className="mv-label-note">Optional</span>
            </label>
            <input id="web" className="mv-field" type="url" placeholder="https://" value={web} onChange={(e) => setWeb(e.target.value)} />
          </div>
        </fieldset>

        <fieldset className="mv-form-section" style={{ margin: 0, border: "none", borderTop: "1px solid var(--mv-rule)" }} aria-labelledby="f-you">
          <h2 id="f-you" className="mv-form-h">
            You
          </h2>
          <div className="mv-choice-grid" style={{ maxWidth: "none", gap: 14 }}>
            <div className="mv-field-group">
              <label htmlFor="nm" className="mv-label">
                Your name
              </label>
              <input id="nm" className="mv-field" type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mv-field-group">
              <label htmlFor="rl" className="mv-label">
                Your role
              </label>
              <input
                id="rl"
                className="mv-field"
                type="text"
                autoComplete="organization-title"
                placeholder="Executive director, pastor, dean…"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>
          <div className="mv-field-group">
            <label htmlFor="em" className="mv-label">
              Email
            </label>
            <input id="em" className="mv-field" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </fieldset>

        <fieldset className="mv-form-section" style={{ margin: 0, border: "none", borderTop: "1px solid var(--mv-rule)", gap: 18 }} aria-labelledby="f-look">
          <h2 id="f-look" className="mv-form-h">
            What you’re looking for
          </h2>
          <div className="mv-field-group" style={{ gap: 10 }}>
            <p id="area" className="mv-label">
              Where could we help? <span className="mv-label-note">Choose any</span>
            </p>
            <div role="group" aria-labelledby="area" className="mv-chips">
              {AREAS.map((a) => (
                <button
                  key={a}
                  type="button"
                  aria-pressed={areas.includes(a)}
                  className="mv-pick"
                  onClick={() => setAreas((xs) => (xs.includes(a) ? xs.filter((x) => x !== a) : [...xs, a]))}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div className="mv-field-group">
            <label htmlFor="need" className="mv-label">
              In a sentence or two, what’s in front of you?
            </label>
            <textarea
              id="need"
              className="mv-field"
              rows={4}
              required
              minLength={10}
              placeholder="Our staff are using AI without any shared guidance, and our board has started asking questions."
              value={need}
              onChange={(e) => setNeed(e.target.value)}
            />
          </div>
          <div className="mv-field-group" style={{ gap: 10 }}>
            <p id="next" className="mv-label">
              What would be most useful next?
            </p>
            <div role="radiogroup" aria-labelledby="next" className="mv-stack" style={{ gap: 6 }}>
              {NEXTS.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={next === key}
                  className="mv-choice"
                  style={{ minHeight: 52, display: "flex", gap: 12, alignItems: "center", fontSize: 15.5 }}
                  onClick={() => setNext(key)}
                >
                  <span aria-hidden="true" className="mv-radio-dot" style={{ marginTop: 0 }} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </fieldset>

        <div className="mv-form-section" style={{ gap: 18, paddingTop: 22 }}>
          <Check
            checked={consent}
            onToggle={() => {
              setConsent((c) => !c);
              setNeedConsent(false);
            }}
          >
            You may contact me about this inquiry. Nothing else: no newsletter, and it isn’t shared
            with anyone.
          </Check>
          {needConsent ? (
            <p role="alert" className="mv-note mv-settle" style={{ fontSize: 14.5, padding: "12px 14px" }}>
              We need your yes to reply.
            </p>
          ) : null}
          {problem ? (
            <p role="alert" className="mv-note mv-settle" style={{ fontSize: 14.5, padding: "12px 14px" }}>
              {problem}
            </p>
          ) : null}
          <div>
            <button type="submit" className="mv-pill" disabled={sending}>
              {sending ? "Sending…" : "Send"}
            </button>
          </div>
        </div>
      </form>

      <aside className="mv-stack mv-rz-aside" style={{ gap: 28 }}>
        <div className="mv-stack" style={{ gap: 4, padding: "26px 26px 22px", background: "var(--mv-sheet)", borderRadius: 4 }}>
          <h2 className="mv-form-h" style={{ marginBottom: 10 }}>
            What happens next
          </h2>
          {[
            "A person reads what you wrote. No automated sequence.",
            "We reply by email, with a time to talk or what you asked to read.",
            "If it makes sense to keep going, we write a proposal for your organization alone.",
          ].map((t, i) => (
            <div
              key={t}
              style={{ display: "grid", gridTemplateColumns: "28px minmax(0, 1fr)", gap: 10, padding: "12px 0", borderTop: "1px solid var(--mv-rule)" }}
            >
              <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 22, lineHeight: 1 }}>{i + 1}</span>
              <span className="mv-small">{t}</span>
            </div>
          ))}
        </div>
        <p className="mv-caption mv-muted">
          You don’t need us to begin. The Map, the guidebook and the Reality Assessment are free.
        </p>
        <div className="mv-stack">
          <Link className="mv-link-target" href={MV_ROUTES.map}>
            See the Map
          </Link>
          <Link className="mv-link-target" href={MV_ROUTES.assessment}>
            Take the Reality Assessment
          </Link>
        </div>
      </aside>
    </div>
  );
}
