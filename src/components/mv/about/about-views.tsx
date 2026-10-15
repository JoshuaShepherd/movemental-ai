/* eslint-disable @next/next/no-img-element -- remote leader headshots from the shared media library; same rationale as voices-grid */
import Link from "next/link";

import { FOUNDERS_AND_ROLES, FOUNDER_PROFILES, FOUNDING_STORY } from "@/lib/founders/content";

import { ClosingBand, CompanySection } from "../home/sections";
import { leaderBySlug } from "../leaders/leaders";
import { MV_ROUTES } from "../routes";

/**
 * /about and /story.
 * About has no board of its own: it is composed from the site's existing approved copy
 * (src/lib/founders/content.ts, the same text the current /about uses) and the home page's
 * "Movemental is a company" and closing sections. Story is the canvas board LongForm.
 */

const FOUNDERS = ["alan-hirsch", "brad-brisco", "josh-shepherd"] as const;

export function AboutPage() {
  return (
    <>
      <section className="mv-wrap" style={{ paddingTop: 96, paddingBottom: 88 }}>
        <div className="mv-split mv-split--end">
          <div className="mv-stack" style={{ gap: 20 }}>
            <p className="mv-eyebrow">ABOUT MOVEMENTAL</p>
            <h1 className="mv-h1">{FOUNDING_STORY.lead}</h1>
          </div>
          <div className="mv-stack" style={{ gap: 16, maxWidth: 640 }}>
            {FOUNDING_STORY.paragraphs.map((p) => (
              <p key={p} className="mv-reading" style={{ fontSize: 20, lineHeight: 1.6 }}>
                {p}
              </p>
            ))}
            <Link className="mv-link-target" href={MV_ROUTES.story}>
              Read the whole story
            </Link>
          </div>
        </div>
      </section>

      <section className="mv-section--sheet" style={{ padding: "96px 0" }}>
        <div className="mv-wrap mv-stack" style={{ gap: 40 }}>
          <div className="mv-split">
            <h2 className="mv-h2">{FOUNDERS_AND_ROLES.lead}</h2>
            <div className="mv-stack" style={{ gap: 16, maxWidth: 640 }}>
              {FOUNDERS_AND_ROLES.body.map((p) => (
                <p key={p} className="mv-reading mv-soft" style={{ fontSize: 19, lineHeight: 1.6 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <ul className="mv-three" style={{ listStyle: "none", padding: 0, gap: 28 }}>
            {FOUNDERS.map((slug) => {
              const f = FOUNDER_PROFILES[slug];
              const l = leaderBySlug(slug);
              return (
                <li key={slug}>
                  {/* Founder profiles stay at /about/[slug] (kept, restyled after launch). */}
                  <Link className="mv-leader-card" href={`/about/${slug}`}>
                    {l ? <img src={l.photo} alt="" loading="lazy" className="mv-headshot" /> : null}
                    <span className="mv-stack" style={{ gap: 4 }}>
                      <span className="mv-leader-name">{f.name}</span>
                      <span className="mv-caption mv-muted">{f.jobTitle}</span>
                      <span className="mv-reading mv-soft" style={{ fontSize: 16, lineHeight: 1.5, marginTop: 6 }}>
                        {f.oneLine}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CompanySection />

      <section style={{ borderTop: "1px solid var(--mv-rule)", padding: "72px 0" }}>
        <div className="mv-wrap mv-three">
          {(
            [
              ["The movement leaders", "The people Movemental is built from, and their own sites.", MV_ROUTES.leaders],
              ["How we use AI", "Our own practice: what we use, what we refuse, and who is accountable.", MV_ROUTES.howWeUseAi],
              ["Sources", "Every figure on the site, and where it comes from.", MV_ROUTES.sources],
            ] as const
          ).map(([t, d, href]) => (
            <Link key={t} href={href} className="mv-stack" style={{ gap: 8, paddingTop: 16, borderTop: "1px solid var(--mv-ink)", textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 28 }}>{t}</span>
              <span className="mv-small mv-soft">{d}</span>
            </Link>
          ))}
        </div>
      </section>

      <ClosingBand />
    </>
  );
}

const SECTIONS = [
  ["scattered", "A body of work, scattered"],
  ["many", "From one leader to many"],
  ["organizations", "The same problem, inside organizations"],
  ["resolve", "Resolve and respond"],
] as const;

export function StoryPage() {
  return (
    <>
      <section className="mv-wrap mv-stack" style={{ paddingTop: 88, paddingBottom: 48, gap: 20, maxWidth: 1000 }}>
        <p className="mv-small mv-muted">Our story</p>
        <h1 className="mv-h1">We met this problem first in one person’s body of work</h1>
        <p className="mv-reading-lg mv-soft" style={{ maxWidth: 720 }}>
          Movemental began as an attempt to gather a lifetime of writing into one place. What we
          learned there is what we now offer churches, nonprofits and institutions.
        </p>
        <p className="mv-caption mv-muted">Josh Shepherd · About 6 minutes</p>
      </section>
      <div className="mv-wrap mv-reader" style={{ paddingTop: 24 }}>
        <article className="mv-prose" style={{ order: 1 }}>
          <h2 id={SECTIONS[0][0]}>{SECTIONS[0][1]}</h2>
          <p>
            Alan Hirsch’s thinking about movements runs across eleven books, along with talks,
            articles and courses in many places. Readers met it in pieces. No single place held the
            whole of it, and nothing could answer a question from all of it at once.
          </p>
          <p>
            So we began rebuilding it: gathering what existed, repairing what had been lost in
            conversion, and organizing it so the work could answer for itself.
          </p>
          <h2 id={SECTIONS[1][0]}>{SECTIONS[1][1]}</h2>
          <p>
            Other movement leaders had the same problem. Their work was scattered too, and the
            platforms available to them took most of what it earned. We built shared infrastructure
            so that each could have a home for their own work. They keep all rights to it, they can
            take their readers with them, and they keep 90 percent of what it earns.
          </p>
          <figure style={{ margin: "12px 0 32px" }}>
            <blockquote style={{ margin: 0, fontFamily: "var(--mv-font-display)", fontSize: 34, lineHeight: 1.2, paddingLeft: 22, borderLeft: "2px solid var(--mv-ink)" }}>
              Institutions had the same problem. Their knowledge was scattered, and AI was arriving
              before anyone had decided anything.
            </blockquote>
          </figure>
          <h2 id={SECTIONS[2][0]}>{SECTIONS[2][1]}</h2>
          <p>
            When we turned to the churches, nonprofits and institutions these leaders serve, we found
            the same fragmentation. What an organization knows lives in drives, inboxes and people’s
            heads. And AI was already in the work, through individual staff and personal tools, long
            before any leadership team had decided how it should be used.
            <sup>
              <a href="#n1" style={{ fontFamily: "var(--mv-font-ui)", fontSize: 13, marginLeft: 2 }}>
                1
              </a>
            </sup>
          </p>
          <h2 id={SECTIONS[3][0]}>{SECTIONS[3][1]}</h2>
          <p>
            That is why the method begins with belief. Before any tool, people say what they believe
            their organization should do. Then the organization takes up the work together: a
            charter, the context AI should work from, formed people, only the tools that belong in
            the work, and a habit of reviewing what changes.
          </p>
          <p>We are doing this in our own organizations first.</p>
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid var(--mv-rule)" }}>
            <h2 style={{ marginTop: 0, fontSize: 24 }}>Notes</h2>
            <ol style={{ paddingLeft: 20, fontSize: 15, lineHeight: 1.6 }}>
              <li id="n1">
                Virtuous and Fundraising.AI, 2026 Nonprofit AI Adoption Report, 346 nonprofits: 81% of
                nonprofits using AI use it individually. <Link href={MV_ROUTES.sources}>Source</Link>
              </li>
            </ol>
          </div>
          <p style={{ marginTop: 32, fontFamily: "var(--mv-font-ui)", fontSize: 16 }}>
            What do you believe your organization should do about AI?{" "}
            <Link href={MV_ROUTES.resolve}>Write your Resolution</Link>. About four minutes.
          </p>
        </article>
        <aside className="mv-toc" style={{ order: 2, gap: 24 }}>
          <div className="mv-stack" style={{ gap: 4 }}>
            <span className="mv-caption mv-muted" style={{ marginBottom: 4 }}>
              In this piece
            </span>
            {SECTIONS.map(([id, t]) => (
              <a key={id} className="mv-toc-item" href={`#${id}`}>
                {t}
              </a>
            ))}
          </div>
          <div className="mv-stack" style={{ gap: 4 }}>
            <span className="mv-caption mv-muted" style={{ marginBottom: 4 }}>
              Related
            </span>
            <Link className="mv-toc-item" href={MV_ROUTES.leaders}>
              The movement leaders
            </Link>
            <Link className="mv-toc-item" href={MV_ROUTES.howWeUseAi}>
              How we use AI
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
