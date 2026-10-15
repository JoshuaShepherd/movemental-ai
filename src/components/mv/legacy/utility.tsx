import Link from "next/link";
import type { ReactNode } from "react";

import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";
import { MV_ROUTES } from "@/components/mv/routes";

/**
 * Newsletter and sign-in states on Paper (board: Kept pages · Utility). Same props as the
 * Ink Band utility shell; a single card centred under the site header.
 */
export function MvUtility({
  eyebrow = "Newsletter",
  title,
  body,
  actionHref = MV_ROUTES.home,
  actionLabel = "Back to home →",
  children,
  hideAction = false,
}: {
  eyebrow?: string;
  title: string;
  body: ReactNode;
  actionHref?: string;
  actionLabel?: string;
  children?: ReactNode;
  hideAction?: boolean;
}) {
  return (
    <>
      <MvHeader />
      <div className="mv-ut">
        <div className="mv-ut-card">
          <p className="mv-kicker">{eyebrow}</p>
          <h1 className="mv-ut-title">{title}</h1>
          <div className="mv-ut-body">{body}</div>
          {children}
          {hideAction ? null : (
            <div>
              <Link className="mv-btn-quiet" href={actionHref}>
                {actionLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
      <MvFooter />
    </>
  );
}
