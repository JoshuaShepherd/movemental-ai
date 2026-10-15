import Link from "next/link";

import { MovementalLogo } from "@/components/brand/movemental-logo";

import { MV_ROUTES } from "./routes";

/** Site header for the Paper design system (docs/design/MV_DESIGN_CHARTER.md). */
export function MvHeader() {
  return (
    <header className="mv-wrap mv-header">
      <Link href={MV_ROUTES.home} aria-label="Movemental home" style={{ display: "flex" }}>
        <MovementalLogo className="h-6" priority />
      </Link>
      <nav className="mv-nav" aria-label="Main">
        <Link href={MV_ROUTES.resolve}>Resolve</Link>
        <Link href={MV_ROUTES.map}>The Map</Link>
        <Link href={MV_ROUTES.guidebook}>Guidebook</Link>
        <Link href={MV_ROUTES.leaders}>Leaders</Link>
        <Link href={MV_ROUTES.about}>About</Link>
        <Link href={MV_ROUTES.signIn}>Sign in</Link>
      </nav>
    </header>
  );
}
