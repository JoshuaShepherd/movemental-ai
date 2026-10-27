"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { MV_ROUTES } from "../routes";
import { MvTaskHeader } from "../mv-task-header";
import { Check, MvDialog } from "./dialog";
import {
  type QuestionLines,
  type ResolutionDraft,
  type Visibility,
  beliefLines,
  chosenActs,
  formatDate,
  hardestLine,
  hasOrgName,
  orgLineParts,
  orgName,
  orgTitle,
  syncResolutionToBackend,
  updateDraft,
  useDraft,
} from "./draft";
import { FlowLoading } from "./resolve-flow";
import { SAMPLE_SHARED } from "./fixtures";

const LEVELS: readonly [Visibility, string, (org: string) => string][] = [
  ["private", "Private", () => "Only you. The default."],
  ["link", "Anyone with the link", () => "Not listed anywhere. You choose who gets it."],
  [
    "public",
    "Public",
    (org) =>
      `Listed among public Resolutions with your name and ${org}’s. People working through the same questions can find it.`,
  ],
];

const VIS_WORD: Record<Visibility, string> = {
  private: "Private",
  link: "Anyone with the link can read it",
  public: "Public",
};

function Rows({ rows }: { rows: QuestionLines[] }) {
  return (
    <ol className="mv-doc-rows">
      {rows.map((l) => (
        <li key={l.qid}>
          <span>{l.label}</span>
          <span>
            <span className="mv-doc-lead" data-empty={!l.lead}>
              {l.lead ? l.lead.text : l.none ? "None of the options fit my view." : "Not answered."}
            </span>
            {l.others.map((o) => (
              <span key={o} className="mv-doc-other">
                {o}
              </span>
            ))}
            {l.own ? (
              <span className="mv-doc-other">
                <span className="mv-caption mv-muted">In my words: </span>
                {l.own}
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ol>
  );
}

/**
 * My Resolution. Board: canvas "Resolve: Fourteen Questions", Document and Document-Saved.
 * Own words show here, on this device, and are never sent to the server.
 */
export function ResolutionDocument() {
  const d = useDraft();
  const router = useRouter();
  const [send, setSend] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [shownName, setShownName] = useState<string | null>(null);
  const [orgRole, setOrgRole] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [toEmail, setToEmail] = useState("");
  const [sendNote, setSendNote] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const unfinished = d === null || (d !== undefined && !d.finishedAt);
  useEffect(() => {
    if (unfinished) router.replace(MV_ROUTES.resolve);
  }, [unfinished, router]);

  if (d === undefined || d === null || !d.finishedAt) {
    return (
      <>
        <MvTaskHeader />
        <FlowLoading />
      </>
    );
  }

  const named = hasOrgName(d);
  const org = orgName(d);
  const saved = !!d.saved;
  const vis = d.visibility;
  const beliefs = beliefLines(d);
  const parts = orgLineParts(d);
  const hard = hardestLine(d);
  const acts = chosenActs(d);
  const amended = d.versions.length > 1;
  const date = formatDate(d.finishedAt);
  const statusLine = !saved
    ? "Not saved yet. It stays on this device until you save it."
    : `${amended ? `Updated ${date}` : `Saved ${formatDate(d.saved!.at)}`} · ${VIS_WORD[vis]}`;
  const signer = d.name ? d.name + (d.role ? `, ${d.role}` : "") : `A member of ${org}`;
  const set = (patch: Partial<ResolutionDraft>) => updateDraft((cur) => ({ ...cur, ...patch }));

  return (
    <>
      <MvTaskHeader>
        <Link href={MV_ROUTES.resolvePeople}>Your people</Link>
      </MvTaskHeader>
      <div className="mv-rz mv-minegrid">
        <div className="mv-stack" style={{ gap: 18, minWidth: 0 }}>
          <div
            className="mv-no-print"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}
          >
            <p className="mv-muted" style={{ fontSize: 14.5 }}>
              {statusLine}
            </p>
            <Link className="mv-link-target" href={MV_ROUTES.resolve}>
              Edit my Resolution
            </Link>
          </div>
          <article className="mv-doc">
            <p className="mv-caption mv-muted">My Resolution on AI{named ? ` for ${org}` : ""}</p>
            <h1 className="mv-doc-title">I believe</h1>
            <Rows rows={beliefs} />
            <h2 className="mv-doc-title mv-doc-h2">Resolved, that {orgTitle(d)} should</h2>
            {parts.map((p) => (
              <div key={p.name}>
                <p className="mv-doc-part">{p.name}</p>
                <Rows rows={p.rows} />
              </div>
            ))}
            {hard ? (
              <div className="mv-doc-block">
                <p>Hardest for us to do today</p>
                <p>{hard}</p>
              </div>
            ) : null}
            {acts.length ? (
              <div className="mv-doc-block">
                <p>What I’ll do</p>
                {acts.map((a) => (
                  <p key={a}>{a}</p>
                ))}
              </div>
            ) : null}
            {d.two.trim() ? (
              <div className="mv-doc-block">
                <p>If I had two minutes</p>
                <p>{d.two}</p>
              </div>
            ) : null}
            <div className="mv-doc-sign">
              <div />
              <p className="mv-soft" style={{ fontSize: 14 }}>
                {signer}
              </p>
              <p className="mv-muted" style={{ fontSize: 13.5 }}>
                {amended ? `Updated ${date}` : date}
              </p>
            </div>
          </article>
          <p className="mv-caption mv-muted" style={{ fontSize: 14, lineHeight: 1.55 }}>
            This is what I believe my organization should do. It becomes the organization’s position
            only when its leaders adopt it.
          </p>
          {amended ? (
            <details className="mv-details mv-no-print" style={{ fontSize: 15 }}>
              <summary>Earlier versions ({d.versions.length - 1})</summary>
              <ul
                className="mv-stack"
                style={{ margin: "4px 0 0", padding: "0 0 0 18px", gap: 6, listStyle: "none", borderLeft: "2px solid var(--mv-rule)" }}
              >
                {d.versions
                  .slice(0, -1)
                  .reverse()
                  .map((v, i, arr) => (
                    <li key={v.at}>
                      {formatDate(v.at)}{" "}
                      {i === arr.length - 1 ? <span className="mv-muted">· first version</span> : null}
                    </li>
                  ))}
              </ul>
              <p className="mv-caption mv-muted" style={{ marginTop: 10 }}>
                A shared link always shows the current version.
                {named ? ` ${org}’s view counts only the current version.` : ""}
              </p>
            </details>
          ) : null}
        </div>

        <aside className="mv-side mv-no-print">
          {!saved ? (
            <section aria-labelledby="keep" className="mv-stack" style={{ gap: 14 }}>
              <h2 id="keep" className="mv-rz-h2--sm">
                Keep it
              </h2>
              <p className="mv-small mv-soft">
                It stays on this device until you save it. Saving lets you share it, invite people
                and come back to change it.
              </p>
              <div className="mv-field-group">
                <label htmlFor="em" className="mv-label">
                  Email
                </label>
                <input
                  id="em"
                  type="email"
                  className="mv-field"
                  placeholder="you@yourorganization.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="mv-caption mv-muted">We’ll send a link to sign in. No password.</span>
              </div>
              <div className="mv-field-group">
                <label htmlFor="nm" className="mv-label">
                  Name to show if you share it
                </label>
                <input
                  id="nm"
                  type="text"
                  className="mv-field"
                  value={shownName ?? d.name}
                  onChange={(e) => setShownName(e.target.value)}
                />
              </div>
              {named ? (
                <div className="mv-field-group">
                  <label htmlFor="rl" className="mv-label">
                    Your role at {org} <span className="mv-label-note">(optional)</span>
                  </label>
                  <input
                    id="rl"
                    type="text"
                    className="mv-field"
                    placeholder={`Staff, board, volunteer, member, or someone ${org} serves`}
                    value={orgRole}
                    onChange={(e) => setOrgRole(e.target.value)}
                  />
                  <span className="mv-caption mv-muted">
                    Only ever shown as a count, once five people share it.
                  </span>
                </div>
              ) : null}
              {saveError ? (
                <p className="mv-caption" style={{ color: "var(--mv-danger, #d93838)" }}>
                  {saveError}
                </p>
              ) : null}
              <button
                type="button"
                className="mv-pill mv-pill--block"
                disabled={isSaving}
                onClick={async () => {
                  const targetEmail = email.trim() || d.saved?.email;
                  if (!targetEmail) {
                    setSaveError("Please enter your email to save.");
                    return;
                  }
                  setIsSaving(true);
                  setSaveError(null);
                  const res = await syncResolutionToBackend(d, {
                    email: targetEmail,
                    name: shownName ?? d.name,
                    role: orgRole || d.role,
                  });
                  setIsSaving(false);
                  if (!res.ok) {
                    setSaveError(res.error || "Failed to save Resolution.");
                  }
                }}
              >
                {isSaving ? "Saving…" : "Save my Resolution"}
              </button>
            </section>
          ) : (
            <section className="mv-stack" style={{ gap: 4 }}>
              <button type="button" className="mv-pill mv-pill--block" onClick={() => setSend(true)}>
                Bring this to someone who decides
              </button>
              <Link className="mv-link-target" style={{ marginTop: 6 }} href={MV_ROUTES.resolvePeople}>
                Invite people to write theirs
              </Link>
              <Link className="mv-link-target" href={MV_ROUTES.respondBegin}>
                {named ? `Begin ${org}’s response` : "Begin your organization’s response"}
              </Link>
              <div style={{ display: "flex", gap: 22 }}>
                <button type="button" className="mv-textbtn" onClick={() => window.print()}>
                  Print
                </button>
                <button type="button" className="mv-textbtn" onClick={() => window.print()}>
                  Download as PDF
                </button>
              </div>
            </section>
          )}

          <section aria-labelledby="vis" className="mv-side-section">
            <h2 id="vis" className="mv-side-h">
              Who can see it
            </h2>
            <div role="radiogroup" aria-labelledby="vis" className="mv-stack" style={{ gap: 4 }}>
              {LEVELS.map(([key, title, desc]) => (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={vis === key}
                  className="mv-radio"
                  onClick={async () => {
                    setCopied(false);
                    set({ visibility: key });
                    if (saved) {
                      await syncResolutionToBackend({ ...d, visibility: key });
                    }
                  }}
                >
                  <span aria-hidden="true" className="mv-radio-dot" />
                  <span className="mv-stack" style={{ gap: 2 }}>
                    <span style={{ fontSize: 15.5, fontWeight: 500 }}>{title}</span>
                    <span className="mv-caption mv-muted" style={{ lineHeight: 1.5 }}>
                      {desc(named ? org : "your organization")}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            {!saved && vis !== "private" ? (
              <p className="mv-callout mv-settle" style={{ fontSize: 14.5 }}>
                Save it first, above. We need an email to keep the link working and to let you
                change it later.
              </p>
            ) : null}
            {saved && vis === "link" ? (
              <div className="mv-settle" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <label htmlFor="lk" className="mv-sr-only">
                  Link to your Resolution
                </label>
                <input
                  id="lk"
                  type="text"
                  readOnly
                  className="mv-field"
                  style={{ fontSize: 14.5 }}
                  value={`movemental.ai/r/${d.shareToken || SAMPLE_SHARED.token}`}
                />
                <button
                  type="button"
                  className="mv-pill mv-pill--outline"
                  style={{ flex: "0 0 auto" }}
                  onClick={() => {
                    const token = d.shareToken || SAMPLE_SHARED.token;
                    const url = typeof window !== "undefined"
                      ? `${window.location.origin}/r/${token}`
                      : `https://movemental.ai/r/${token}`;
                    try {
                      void navigator.clipboard?.writeText(url);
                    } catch {
                      // Clipboard can be unavailable; the field stays selectable.
                    }
                    setCopied(true);
                  }}
                >
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            ) : null}
            {vis === "public" ? (
              <div
                className="mv-settle mv-stack"
                style={{ gap: 4, padding: "12px 14px", border: "1px solid var(--mv-rule)", borderRadius: 6 }}
              >
                <Check checked={d.research} onToggle={() => set({ research: !d.research })}>
                  Also count my answers in Movemental’s published research
                </Check>
                <p className="mv-caption mv-muted" style={{ marginLeft: 34, lineHeight: 1.5 }}>
                  Research shows only totals across many Resolutions, with how many each is based on.
                  Nothing published can identify you{named ? ` or ${org}` : ""}. We ask once.
                </p>
              </div>
            ) : null}
          </section>

          {named ? (
            <section aria-labelledby="org" className="mv-side-section">
              <h2 id="org" className="mv-side-h">
                {org}’s view
              </h2>
              {d.invitation ? (
                <>
                  <Check checked={d.countInOrg} onToggle={() => set({ countInOrg: !d.countInOrg })}>
                    Count my answers in {org}’s view. Your name is never shown.
                  </Check>
                  <p className="mv-caption mv-muted">
                    This is on because you came through {d.invitation.from}’s invitation for {org}.
                    Turn it off and your Resolution stays yours alone.
                  </p>
                  <p className="mv-caption mv-muted">
                    {org}’s view shows counts only, and only once five people have written theirs.
                  </p>
                </>
              ) : (
                <>
                  <p className="mv-small mv-soft">
                    Your Resolution names {org}, but it isn’t counted in anyone’s view. Only people{" "}
                    {org} invites are counted together.
                  </p>
                  <Link className="mv-link-target" href={MV_ROUTES.resolvePeople}>
                    Invite people from {org}
                  </Link>
                  <p className="mv-caption mv-muted">
                    Once five of them have written theirs, you’ll all see where you agree.
                  </p>
                </>
              )}
            </section>
          ) : null}

          <section className="mv-side-section" style={{ gap: 4 }}>
            <p className="mv-caption mv-muted">
              Inviting someone never shows them your answers. They see yours only if you share it.
            </p>
            <Link className="mv-link-target" href={MV_ROUTES.resolveOthers}>
              See how others answered
            </Link>
          </section>
        </aside>
      </div>

      {send ? (
        <MvDialog title="Bring this to someone who decides" onClose={() => setSend(false)}>
          <div className="mv-field-group">
            <label htmlFor="to" className="mv-label">
              Send to
            </label>
            <input
              id="to"
              type="email"
              className="mv-field"
              placeholder="colleague@yourorganization.org"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
            />
          </div>
          <div className="mv-field-group">
            <label htmlFor="nt" className="mv-label">
              Note
            </label>
            <textarea
              id="nt"
              rows={3}
              className="mv-field"
              value={
                sendNote ||
                `I wrote down what I think ${org} should do about AI. I’d like twenty minutes on it at our next leadership meeting.`
              }
              onChange={(e) => setSendNote(e.target.value)}
            />
          </div>
          <div className="mv-preview-note">
            <p>What they will see</p>
            <p>
              Your note and your Resolution as it reads now. If you change it later, their link
              shows the new version, marked “Updated.” Your own words stay private.
            </p>
          </div>
          <p className="mv-small mv-muted">Sending it this way doesn’t change who else can see it.</p>
          {sendError ? (
            <p className="mv-caption" style={{ color: "var(--mv-danger, #d93838)" }}>
              {sendError}
            </p>
          ) : null}
          <div>
            <button
              type="button"
              className="mv-pill"
              disabled={isSending || !toEmail.trim()}
              onClick={async () => {
                if (!toEmail.trim()) return;
                setIsSending(true);
                setSendError(null);
                try {
                  const res = await fetch("/api/resolve/invite", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      inviterEmail: d.saved?.email || email || "contributor@movemental.ai",
                      inviteeEmail: toEmail.trim(),
                      organizationLabel: org,
                      note:
                        sendNote ||
                        `I wrote down what I think ${org} should do about AI. I’d like twenty minutes on it at our next leadership meeting.`,
                    }),
                  });
                  const json = await res.json();
                  if (json.ok) {
                    setSend(false);
                    setToEmail("");
                    setSendNote("");
                  } else {
                    setSendError(json.error?.message || "Failed to send invitation.");
                  }
                } catch {
                  setSendError("Network error sending invitation.");
                } finally {
                  setIsSending(false);
                }
              }}
            >
              {isSending ? "Sending…" : "Send"}
            </button>
          </div>
        </MvDialog>
      ) : null}
    </>
  );
}
