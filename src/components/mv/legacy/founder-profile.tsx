/* eslint-disable @next/next/no-img-element -- static founder portrait */
import Link from "next/link";

import { MV_ROUTES } from "@/components/mv/routes";
import type { FounderProfile } from "@/lib/founders/content";

import { MvBackArrow } from "./page-header";

/** `/about/[slug]` on Paper (board: Kept pages · Founder). Profile content unchanged. */
export function FounderProfileView({ profile }: { profile: FounderProfile }) {
  return (
    <div className="mv-wrap">
      <div className="mv-pf mv-page-end">
        <div className="mv-pf-side">
          <img className="mv-pf-photo" src={profile.portrait} alt={profile.name} loading="eager" />
        </div>
        <article className="mv-pf-main">
          <Link className="mv-back" href={MV_ROUTES.about}>
            <MvBackArrow /> About Movemental
          </Link>
          <p className="mv-kicker">Founder profile</p>
          <h1 className="mv-ph-title">{profile.name}</h1>
          <p className="mv-pf-role">{profile.jobTitle}</p>
          <p className="mv-ph-deck">{profile.mediumBio}</p>
          <div className="mv-read">
            {profile.fullBio.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
          {profile.trustLine ? <p className="mv-pf-trust">{profile.trustLine}</p> : null}
          <section className="mv-pf-sec" aria-labelledby="founder-arc">
            <p className="mv-kicker" id="founder-arc">
              The arc
            </p>
            <h2 className="mv-pf-h2">Career timeline</h2>
            <ol className="mv-tl">
              {profile.arc.map((a) => (
                <li key={a.period}>
                  <span className="mv-tl-k">{a.period}</span>
                  <span className="mv-tl-v">{a.detail}</span>
                </li>
              ))}
            </ol>
          </section>
          <section className="mv-pf-sec" aria-labelledby="founder-work">
            <p className="mv-kicker" id="founder-work">
              Selected work
            </p>
            <h2 className="mv-pf-h2">Credibility list</h2>
            <ul className="mv-tl">
              {profile.selectedWork.map((w) => (
                <li key={w.title}>
                  <span className="mv-tl-k">{w.title}</span>
                  <span className="mv-tl-v">{w.detail}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="mv-pf-sec" aria-labelledby="founder-formation">
            <p className="mv-kicker" id="founder-formation">
              Formation &amp; strengths
            </p>
            <h2 className="mv-pf-h2">Formation and strengths</h2>
            <ul className="mv-tags">
              {profile.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
