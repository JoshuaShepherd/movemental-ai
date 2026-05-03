/**
 * For Churches — the path-sticky experience.
 *
 * Renders the four-stage Movemental AI Path with the Riverside Church case
 * study and a "For church leaders." wrap-up. Body content
 * (Safety / Sandbox / Skills / Solutions) is shared with /nonprofits and
 * /institutions; only the case study and footer audience-tag differ.
 *
 * See `src/components/path/` for the component tree, and
 * `docs/html/churches-path-sticky-mockup.html` for the source mockup.
 */

import { churchesAudience, PathExperience } from "@/components/path";

export function ChurchesContent() {
  return <PathExperience audience={churchesAudience} />;
}
