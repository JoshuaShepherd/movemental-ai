import Link from "next/link";

import { MvSignet } from "./brand/mark";
import { MV_ROUTES } from "./routes";

/**
 * The home page's header: the signet and two calls, Resolve and Respond. On hover each rolls to
 * who it is for. Board: Home-Headline-C (docs/handoff/home-headline/README.md).
 */
export function MvHomeHeader() {
  return (
    <header className="mv-hh mv-no-print">
      <div className="mv-wrap mv-hh-in">
        <Link href={MV_ROUTES.home} className="mv-nb-brand" aria-label="Movemental home">
          <MvSignet size={27} className="mv-hh-signet" />
        </Link>
        <nav className="mv-hh-ctas" aria-label="Begin">
          <Link className="mv-hh-cta mv-hh-cta--fill" href={MV_ROUTES.resolve} aria-label="Resolve, for you as an individual">
            <span className="mv-hh-roll">
              <span>Resolve</span>
              <span aria-hidden="true">Individual</span>
            </span>
          </Link>
          <Link className="mv-hh-cta mv-hh-cta--line" href={MV_ROUTES.map} aria-label="Respond, for your organization">
            <span className="mv-hh-roll">
              <span>Respond</span>
              <span aria-hidden="true">Organizational</span>
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
