import Link from "next/link";

import { MvFlourish } from "./brand/flourish";
import { MV_ROUTES } from "./routes";

/** Site footer for the Paper design system: the flourish lockup, then the links. */
export function MvFooter() {
  return (
    <footer className="mv-wrap mv-footer mv-no-print">
      <div className="mv-footer-top">
        <Link href={MV_ROUTES.home} aria-label="Movemental home" className="mv-footer-mark">
          <MvFlourish width={340} />
        </Link>
        <nav aria-label="Footer" className="mv-footer-nav">
          <Link href={MV_ROUTES.resolve}>Resolve</Link>
          <Link href={MV_ROUTES.map}>The Map</Link>
          <Link href={MV_ROUTES.work}>Work with us</Link>
          <Link href={MV_ROUTES.guidebook}>Guidebook</Link>
          <Link href={MV_ROUTES.leaders}>Leaders</Link>
          <Link href={MV_ROUTES.about}>About</Link>
          <Link href={MV_ROUTES.sources}>Sources</Link>
        </nav>
      </div>
      <div className="mv-footer-base">
        <span>Movemental, LLC</span>
      </div>
    </footer>
  );
}
