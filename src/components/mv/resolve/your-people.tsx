"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { MV_ROUTES } from "../routes";
import { MvDialog } from "./dialog";
import { useDraft } from "./draft";
import { SAMPLE_INVITEES, SAMPLE_ROAD, SAMPLE_WRITTEN } from "./fixtures";

const ROLES: readonly [string, string, string][] = [
  [
    "Someone who decides",
    "The person or people who would have to say yes. Your Resolution is most useful in front of them.",
    "James, I’ve written down what I believe Riverbend should do about AI, and I’d value yours too. It takes about four minutes.",
  ],
  [
    "Someone who knows how the work actually moves",
    "The person who knows where the real workflows run, and where AI is already in them.",
    "You know how our work actually gets done better than anyone. I’d like to know what you think Riverbend should do about AI.",
  ],
  [
    "Someone close to the people you serve",
    "Someone who would notice first if care started to feel automated.",
    "You’re closest to the families we serve. Would you say what you think Riverbend should do about AI? About four minutes.",
  ],
  [
    "Someone outside your walls walking the same road",
    "A peer at another organization working through the same questions.",
    "I wrote a Resolution about what my organization should do with AI. I’d love to see what you’d write for yours.",
  ],
];

const TABS = [
  ["line", "Starred the same line"],
  ["kind", "Same kind of organization"],
  ["near", "Nearby"],
] as const;

type Tab = (typeof TABS)[number][0];

/**
 * Your people (flow document 5.4). Board: R4-People, in its below-five state.
 */
export function YourPeople() {
  const d = useDraft();
  const [dialog, setDialog] = useState<{ title: string; note: string } | null>(null);
  const [nudged, setNudged] = useState<Record<number, boolean>>({});
  const [tab, setTab] = useState<Tab>("line");
  const [asked, setAsked] = useState<Record<string, boolean>>({});

  const org = d?.org.trim() || "Riverbend Youth & Family";
  const [stats, setStats] = useState<{
    unlocked: boolean;
    contributorCount: number;
    threshold: number;
    message: string;
  } | null>(null);

  const [inviteEmails, setInviteEmails] = useState("");
  const [inviteOrg, setInviteOrg] = useState(org);
  const [inviteNote, setInviteNote] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [inviteFeedback, setInviteFeedback] = useState<string | null>(null);

  useEffect(() => {
    setInviteOrg(org);
  }, [org]);

  useEffect(() => {
    let active = true;
    async function fetchStats() {
      try {
        const res = await fetch(`/api/resolve/people?org=${encodeURIComponent(org)}`);
        if (res.ok) {
          const json = await res.json();
          if (active && json.ok && json.data) {
            setStats(json.data);
          }
        }
      } catch {
        // Fallback to sample data gracefully
      }
    }
    void fetchStats();
    return () => {
      active = false;
    };
  }, [org]);

  const privateMe = d ? d.visibility !== "public" : true;
  const count = stats ? stats.contributorCount : SAMPLE_WRITTEN;
  const unlocked = stats ? stats.unlocked : count >= 5;

  return (
    <div className="mv-rz mv-rz--people" style={{ gap: 52 }}>
      <div className="mv-stack" style={{ gap: 14 }}>
        <h1 className="mv-rz-title">Your people</h1>
        <p className="mv-reading mv-soft" style={{ maxWidth: 640, fontSize: 19, lineHeight: 1.5 }}>
          The people you’ve brought into this, and people elsewhere walking the same road. No one
          here can see what you chose unless you shared it with them.
        </p>
        <div style={{ paddingTop: 6 }}>
          <button
            type="button"
            className="mv-pill"
            onClick={() => {
              setInviteNote("");
              setInviteFeedback(null);
              setDialog({ title: "Invite someone to write theirs", note: "" });
            }}
          >
            Invite someone to write theirs
          </button>
        </div>
        {stats ? (
          <p className="mv-caption mv-muted">
            Live counts for {org} · {count} contributor{count === 1 ? "" : "s"}
          </p>
        ) : (
          <p className="mv-caption mv-muted">Sample data.</p>
        )}
      </div>

      <section aria-labelledby="agree" className="mv-stack" style={{ gap: 16 }}>
        <h2 id="agree" className="mv-rz-h2">
          Where your people from {org} agree
        </h2>
        <div className="mv-stack" style={{ gap: 12, padding: "22px 24px", background: "var(--mv-sheet)", borderRadius: 4 }}>
          <div className="mv-tally" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} data-on={i < count} />
            ))}
          </div>
          <p className="mv-reading" style={{ lineHeight: 1.5 }}>
            {unlocked
              ? `${count} people from ${org} have written their Resolution. Aggregated common grounds are unsealed.`
              : `${count} of 5 people from ${org} have written theirs. You’ll see where you agree once five have.`}
          </p>
          <p className="mv-caption mv-muted">
            Five keeps anyone’s choices from being guessed. Until then, nothing here shows what
            anyone chose.
          </p>
        </div>
      </section>

      <section aria-labelledby="inv" className="mv-stack" style={{ gap: 12 }}>
        <h2 id="inv" className="mv-rz-h2">
          Who you invited
        </h2>
        <p className="mv-small mv-muted">
          You see whether each person has written theirs, if they agree to let you know. You never
          see what they chose.
        </p>
        <ul style={{ listStyle: "none", padding: 0, borderBottom: "1px solid var(--mv-rule)" }}>
          {SAMPLE_INVITEES.map(([name, sub, status], i) => (
            <li key={name} className="mv-prow">
              <span className="mv-stack" style={{ gap: 2 }}>
                <span style={{ fontWeight: 500 }}>{name}</span>
                <span className="mv-caption mv-muted">{sub}</span>
              </span>
              <span className="mv-prow-actions">
                <span className={status === "Written theirs" ? undefined : "mv-muted"} style={{ fontSize: 14.5 }}>
                  {status}
                </span>
                {status === "Not yet" ? (
                  <button
                    type="button"
                    className="mv-textbtn"
                    style={{ fontSize: 14.5 }}
                    onClick={() => setNudged((n) => ({ ...n, [i]: true }))}
                  >
                    {nudged[i] ? "Reminder sent" : "Send a reminder"}
                  </button>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ask" className="mv-stack" style={{ gap: 14 }}>
        <h2 id="ask" className="mv-rz-h2">
          People you might ask
        </h2>
        <p className="mv-small mv-muted">
          A Resolution travels best when it reaches a few different kinds of people. You know who
          they are; we don’t look through your contacts.
        </p>
        <div className="mv-roles">
          {ROLES.map(([title, why, note]) => (
            <div key={title} className="mv-role">
              <p style={{ fontFamily: "var(--mv-font-display)", fontSize: 23, lineHeight: 1.15 }}>{title}</p>
              <p className="mv-reading mv-soft" style={{ fontSize: 16, lineHeight: 1.5 }}>
                {why}
              </p>
              <button
                type="button"
                className="mv-textbtn"
                style={{ alignSelf: "flex-start" }}
                onClick={() =>
                  setDialog({ title: `Invite ${title.charAt(0).toLowerCase()}${title.slice(1)}`, note })
                }
              >
                Write an invitation
              </button>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="road" className="mv-stack" style={{ gap: 14 }}>
        <h2 id="road" className="mv-rz-h2">
          People walking the same road
        </h2>
        <p className="mv-small mv-muted">
          Only people who made their Resolution public appear here. Connecting takes a yes from both
          of you, and no one sees how many connections anyone has.
        </p>
        {privateMe ? (
          <p className="mv-callout">
            Your Resolution is private, so you can see people here but they can’t find you.{" "}
            <Link href={MV_ROUTES.resolveDocument}>Change who can see it</Link>
          </p>
        ) : null}
        <div role="tablist" aria-label="Show people who" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TABS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              className="mv-tab"
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <ul role="tabpanel" style={{ listStyle: "none", padding: 0, borderBottom: "1px solid var(--mv-rule)" }}>
          {SAMPLE_ROAD[tab].map(([name, org, why, line]) => {
            const k = tab + name;
            const on = !!asked[k];
            return (
              <li key={k} className="mv-prow" style={{ padding: "16px 0" }}>
                <span className="mv-stack" style={{ gap: 4 }}>
                  <span style={{ fontWeight: 500 }}>
                    {name} <span className="mv-muted" style={{ fontWeight: 400 }}>· {org}</span>
                  </span>
                  <span className="mv-muted" style={{ fontSize: 13 }}>
                    {why}
                  </span>
                  <span className="mv-reading" style={{ fontSize: 17 }}>
                    {line}
                  </span>
                </span>
                <span className="mv-prow-actions">
                  <Link className="mv-link-target" style={{ fontSize: 14.5 }} href={MV_ROUTES.resolveSharedSample}>
                    Read theirs
                  </Link>
                  <button
                    type="button"
                    className="mv-pill mv-pill--outline"
                    aria-pressed={on}
                    onClick={() => setAsked((a) => ({ ...a, [k]: !on }))}
                  >
                    {on ? "Asked. Waiting for their yes" : "Ask to connect"}
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
        {tab === "near" ? (
          <p className="mv-muted" style={{ fontSize: 14.5, lineHeight: 1.55 }}>
            Nearby shows only people who chose to show their city. You haven’t shown yours, and you
            don’t have to.
          </p>
        ) : null}
      </section>

      {/* Movement leaders who resolved what you did: hidden until leaders publish (5.6, no placeholders). */}

      {dialog ? (
        <MvDialog title={dialog.title} onClose={() => setDialog(null)}>
          <div className="mv-field-group">
            <label htmlFor="ie" className="mv-label">
              Email addresses
            </label>
            <input
              id="ie"
              type="text"
              className="mv-field"
              placeholder="Separate with commas"
              value={inviteEmails}
              onChange={(e) => setInviteEmails(e.target.value)}
            />
          </div>
          <div className="mv-field-group">
            <label htmlFor="io" className="mv-label">
              For
            </label>
            <input
              id="io"
              type="text"
              className="mv-field"
              value={inviteOrg}
              onChange={(e) => setInviteOrg(e.target.value)}
            />
            <span className="mv-caption mv-muted">
              Their Resolution counts with yours for {inviteOrg} only if they say yes.
            </span>
          </div>
          <div className="mv-field-group">
            <label htmlFor="in" className="mv-label">
              Note
            </label>
            <textarea
              id="in"
              rows={4}
              className="mv-field"
              value={
                inviteNote ||
                dialog.note ||
                `I’ve written down what I believe ${inviteOrg} should do about AI. I’d value knowing what you think. It takes about four minutes.`
              }
              onChange={(e) => setInviteNote(e.target.value)}
            />
          </div>
          <div className="mv-preview-note">
            <p>What they will see</p>
            <p>
              Your note, your name, and a link to write their own. None of your choices, and none of
              anyone else’s until they finish theirs.
            </p>
          </div>
          {inviteFeedback ? (
            <p className="mv-caption" style={{ color: "var(--mv-accent, #2b6cb0)", fontWeight: 500 }}>
              {inviteFeedback}
            </p>
          ) : null}
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <button
              type="button"
              className="mv-pill"
              disabled={isInviting || !inviteEmails.trim()}
              onClick={async () => {
                const emails = inviteEmails
                  .split(",")
                  .map((e) => e.trim())
                  .filter((e) => e.includes("@"));
                if (!emails.length) {
                  setInviteFeedback("Please provide at least one valid email address.");
                  return;
                }
                setIsInviting(true);
                setInviteFeedback(null);
                try {
                  let sentCount = 0;
                  for (const targetEmail of emails) {
                    const res = await fetch("/api/resolve/invite", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        inviterEmail: d?.saved?.email || "contributor@movemental.ai",
                        inviteeEmail: targetEmail,
                        organizationLabel: inviteOrg,
                        note:
                          inviteNote ||
                          dialog.note ||
                          `I’ve written down what I believe ${inviteOrg} should do about AI. I’d value knowing what you think. It takes about four minutes.`,
                      }),
                    });
                    if (res.ok) sentCount++;
                  }
                  setIsInviting(false);
                  setInviteFeedback(`Sent ${sentCount} invitation${sentCount === 1 ? "" : "s"}!`);
                  setInviteEmails("");
                  setTimeout(() => setDialog(null), 1200);
                } catch {
                  setIsInviting(false);
                  setInviteFeedback("Network error sending invitations.");
                }
              }}
            >
              {isInviting ? "Sending…" : "Send invitations"}
            </button>
            <button
              type="button"
              className="mv-textbtn"
              onClick={() => {
                const origin = typeof window !== "undefined" ? window.location.origin : "https://movemental.ai";
                const link = `${origin}/resolve?org=${encodeURIComponent(inviteOrg)}`;
                try {
                  void navigator.clipboard?.writeText(link);
                  setInviteFeedback("Invitation link copied to clipboard!");
                } catch {
                  setInviteFeedback(`Link: ${link}`);
                }
              }}
            >
              Copy an invitation link instead
            </button>
          </div>
        </MvDialog>
      ) : null}
    </div>
  );
}
