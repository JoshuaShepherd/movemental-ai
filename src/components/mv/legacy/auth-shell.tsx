import type { ReactNode } from "react";

import { MvFooter } from "@/components/mv/mv-footer";
import { MvHeader } from "@/components/mv/mv-header";

/** Sign-in, sign-up and password pages on Paper (board: Kept pages · Utility). */
export function MvAuthShell({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <>
      <MvHeader />
      <div className="mv-ut">
        <div className="mv-ut-card">
          <p className="mv-kicker">{eyebrow}</p>
          <h1 className="mv-ut-title">{title}</h1>
          {children}
        </div>
      </div>
      <MvFooter />
    </>
  );
}

/** Loading state that keeps the card's footprint so the page does not jump. */
export function MvAuthLoading({ label = "Loading…" }: { label?: string }) {
  return (
    <>
      <MvHeader />
      <div className="mv-ut">
        <div className="mv-ut-card">
          <p className="mv-ut-body">{label}</p>
        </div>
      </div>
      <MvFooter />
    </>
  );
}
