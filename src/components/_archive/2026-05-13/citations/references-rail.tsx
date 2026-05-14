"use client";

import { citations, resolveTag } from "@/lib/citations/claims";
import { getSource } from "@/lib/citations/sources";

import { Container, Section } from "@/components/primitives";

import { useCitations } from "./citations-provider";

/**
 * `<ReferencesRail />` — legacy page-closing references list (Ledger edition).
 *
 * Prefer `/footnotes` + EEAT registry for new work; avoid mounting this above
 * the global footer. Kept for archived compositions and design previews.
 */

export function ReferencesRail({ note }: { note?: string } = {}) {
  const { claims } = useCitations();

  if (claims.length === 0) {
    return null;
  }

  return (
    <Section variant="section" spacing="sm" id="references">
      <Container>
        <div className="refs-section__head">
          <h2 className="refs-section__title">References</h2>
          <p className="refs-section__meta">
            {note ??
              "All claims on this page are tied back to primary sources. Confidence tags follow the Movemental research corpus (May 8, 2026)."}
          </p>
        </div>
        <ol className="refs-list">
          {claims.map((claimId) => {
            const claim = citations[claimId];
            const source = getSource(claim.source);
            const tag = resolveTag(claimId);
            const host = (() => {
              try {
                return new URL(source.url).hostname.replace(/^www\./, "");
              } catch {
                return source.url;
              }
            })();

            return (
              <li key={claimId} id={`ref-${claimId}`}>
                <strong>{source.author}.</strong> <em>{source.title}.</em>{" "}
                {source.date}.
                <span className="refs-meta-row">
                  {source.sample ? <span>{source.sample}</span> : null}
                  <span>Tag: {tag}</span>
                  <span>
                    <a href={source.url} rel="noopener" target="_blank">
                      {host}
                    </a>
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
