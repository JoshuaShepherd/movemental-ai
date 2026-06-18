import Link from "next/link";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";

type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  lede: string;
  sections: LegalSection[];
  footerLinks?: { href: string; label: string }[];
};

/**
 * Ink Band utility layout for legal pages. Marked for counsel review in HTML comments.
 */
export function LegalPageContent({
  eyebrow,
  title,
  lede,
  sections,
  footerLinks,
}: LegalPageProps) {
  return (
    <InkBandUtilityShell>
      {/* [LEGAL REVIEW REQUIRED] — placeholder structure only; counsel must approve before launch. */}
      <article className="mx-auto w-full max-w-2xl px-4 py-16 md:py-24">
        <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="font-serif text-4xl leading-tight md:text-5xl">{title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{lede}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
              <h2
                id={`${section.id}-heading`}
                className="font-serif text-2xl leading-snug md:text-3xl"
              >
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-foreground">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        {footerLinks && footerLinks.length > 0 ? (
          <nav
            className="mt-14 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-8 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground"
            aria-label="Related policies"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--color-ink-band-blue)] underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}

        <p className="mt-10 text-sm text-muted-foreground">
          Questions?{" "}
          <a
            href="mailto:josh@movemental.ai"
            className="text-[var(--color-ink-band-blue)] underline underline-offset-4"
          >
            josh@movemental.ai
          </a>
        </p>
      </article>
    </InkBandUtilityShell>
  );
}

export type { LegalSection, LegalPageProps };
