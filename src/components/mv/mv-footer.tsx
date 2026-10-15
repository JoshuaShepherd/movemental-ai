import Link from "next/link";

import { MovementalLogo } from "@/components/brand/movemental-logo";

import { MV_ROUTES } from "./routes";

/** Site footer for the Paper design system. */
export function MvFooter() {
  return (
    <footer className="mv-wrap mv-footer">
      <MovementalLogo className="h-5" />
      <nav aria-label="Footer" style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        <Link href={MV_ROUTES.resolve}>Resolve</Link>
        <Link href={MV_ROUTES.map}>The Map</Link>
        <Link href={MV_ROUTES.work}>Work with us</Link>
        <Link href={MV_ROUTES.guidebook}>Guidebook</Link>
        <Link href={MV_ROUTES.leaders}>Leaders</Link>
        <Link href={MV_ROUTES.about}>About</Link>
        <Link href={MV_ROUTES.sources}>Sources</Link>
      </nav>
      <span>Movemental, LLC</span>
    </footer>
  );
}
