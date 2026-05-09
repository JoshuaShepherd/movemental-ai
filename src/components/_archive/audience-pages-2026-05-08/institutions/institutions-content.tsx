/**
 * For Institutions — the path-sticky experience.
 *
 * Renders the four-stage Movemental AI Path with the Westbridge Seminary
 * case study and a "For institutional leaders." wrap-up. Body content
 * (Safety / Sandbox / Skills / Solutions) is shared with /nonprofits and
 * /churches; only the case study and footer audience-tag differ.
 *
 * See `src/components/path/` for the component tree, and
 * `docs/html/institutions-path-sticky-mockup.html` for the source mockup.
 */

import { institutionsAudience, PathExperience } from "@/components/path";

export function InstitutionsContent() {
  return <PathExperience audience={institutionsAudience} />;
}
