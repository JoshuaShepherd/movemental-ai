/**
 * For Nonprofits — the path-sticky experience.
 *
 * Renders the four-stage Movemental AI Path with the Northbridge Youth
 * Mission case study and a "For nonprofit leaders." wrap-up. Body content
 * (Safety / Sandbox / Skills / Solutions) is shared with /churches and
 * /institutions; only the case study and footer audience-tag differ.
 *
 * See `src/components/path/` for the component tree, and
 * `docs/html/nonprofits-path-sticky-mockup.html` for the source mockup.
 */

import { nonprofitsAudience, PathExperience } from "@/components/path";

export function NonprofitsContent() {
  return <PathExperience audience={nonprofitsAudience} />;
}
