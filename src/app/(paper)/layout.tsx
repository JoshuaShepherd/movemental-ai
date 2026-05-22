import type { ReactNode } from "react";

/**
 * `(paper)` route group — standalone marketing surfaces that render their own
 * self-contained chrome and must not inherit the SiteHeader/SiteFooter from
 * the root layout.
 *
 * The root layout is always rendered, so we can't *prevent* the marketing
 * chrome from existing in the DOM; we *suppress* it with an inline
 * critical-path stylesheet that targets the chrome by its semantic anchors
 * and is scoped to pages that opt in via `data-paper-shell` on this layout
 * wrapper. Inline so it applies at first paint with no FOUC and no need for
 * a working proxy (proxy.ts is not registered for header injection in this
 * project's Turbopack setup).
 */
const CHROME_SUPPRESSION_CSS = `
body:has([data-paper-shell]) > header[role="banner"],
body:has([data-paper-shell]) > footer,
body:has([data-paper-shell]) > a.skip-link {
  display: none !important;
}
body:has([data-paper-shell]) > main {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  flex: 1 1 auto !important;
}
`;

export default function PaperLayout({ children }: { children: ReactNode }) {
  return (
    <div data-paper-shell="true">
      <style dangerouslySetInnerHTML={{ __html: CHROME_SUPPRESSION_CSS }} />
      {children}
    </div>
  );
}
