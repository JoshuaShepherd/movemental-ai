import Link from "next/link";

import { MovementalLogo } from "@/components/brand/movemental-logo";

import { MV_ROUTES } from "./routes";

/**
 * Header for task screens (the Resolution and its account pages): the logo and one or two
 * quiet links, no site navigation. Boards: R3-Flow, R4-Result, R4-People.
 */
export function MvTaskHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="mv-task-header mv-no-print">
      <Link href={MV_ROUTES.home} aria-label="Movemental home" style={{ display: "flex" }}>
        <MovementalLogo className="h-6" />
      </Link>
      {children ? <nav aria-label="Your account">{children}</nav> : null}
    </header>
  );
}
