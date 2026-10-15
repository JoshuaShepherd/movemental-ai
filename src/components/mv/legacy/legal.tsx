import Link from "next/link";

import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

import { MvToc } from "./toc";

type LegalSection = { id: string; title: string; paragraphs: string[] };

/** Privacy, terms and cookies on Paper (board: Kept pages · Legal). Same props as the Ink Band version. */
export function MvLegal({
  eyebrow,
  title,
  lede,
  sections,
  footerLinks,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  sections: LegalSection[];
  footerLinks?: { href: string; label: string }[];
}) {
  return (
    <>
      <MvHeader />
      {/* [LEGAL REVIEW REQUIRED] — placeholder structure only; counsel must approve before launch. */}
      <div className="mv-wrap mv-rd mv-page-end">
        <MvToc label="On this page" items={sections.map((s) => ({ id: s.id, text: s.title }))} />
        <article>
          <header className="mv-rd-head">
            <p className="mv-kicker">{eyebrow}</p>
            <h1 className="mv-rd-title">{title}</h1>
            <p className="mv-rd-deck mv-rd-deck--plain">{lede}</p>
          </header>
          <div className="mv-read mv-read--legal">
            {sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`}>
                <h2 id={`${s.id}-heading`}>{s.title}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
          </div>
          {footerLinks?.length ? (
            <nav className="mv-related" aria-label="Related policies">
              <p className="mv-kicker">Related policies</p>
              {footerLinks.map((l) => (
                <Link key={l.href} className="mv-related-link" href={l.href}>
                  {l.label} <span>→</span>
                </Link>
              ))}
            </nav>
          ) : null}
          <p className="mv-fine mv-fine--gap">
            Questions? <a href="mailto:josh@movemental.ai">josh@movemental.ai</a>
          </p>
        </article>
        <div />
      </div>
      <MvFooter />
    </>
  );
}
