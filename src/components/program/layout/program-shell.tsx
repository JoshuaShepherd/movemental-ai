import Link from "next/link";

import type { ProgramFixtureShell } from "@/lib/program/types/stitch-screen-family";

export function ProgramShell({
  shell,
  sourceBadge,
  children,
  footerLinks,
}: {
  shell: ProgramFixtureShell;
  sourceBadge?: string;
  children: React.ReactNode;
  /** Override footer links (defaults to shell.footerLinks) */
  footerLinks?: Array<{ label: string; href: string }>;
}) {
  const brand = shell.brandLine ?? "MOVEMENTAL";
  const links = footerLinks ?? shell.footerLinks ?? [];

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] flex-col bg-safestart-bg text-safestart-ink selection:bg-pathway-accent/20">
      <header className="z-50 flex h-20 w-full shrink-0 items-center justify-between border-b border-safestart-hairline bg-movemental-midnight px-8 text-white md:px-12">
        <div className="font-headline text-2xl font-bold italic tracking-tighter">{brand}</div>
        <div className="flex items-center gap-4 font-body text-[13px]">
          {sourceBadge ? (
            <span className="rounded-none border border-white/20 px-2 py-1 text-[10px] uppercase tracking-widest text-white/70">
              {sourceBadge}
            </span>
          ) : null}
          {shell.modeBadge ? (
            <span className="rounded border border-pathway-accent/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-pathway-accent">
              {shell.modeBadge}
            </span>
          ) : null}
          {shell.tenantName ? <span>{shell.tenantName}</span> : null}
          {shell.tenantName ? <span className="opacity-50">•</span> : null}
          {shell.userInitials ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xs font-bold">
              {shell.userInitials}
            </div>
          ) : null}
        </div>
      </header>

      {children}

      <footer className="mt-auto flex min-h-20 w-full shrink-0 flex-col items-center justify-between gap-4 bg-movemental-midnight px-8 py-6 text-white md:flex-row md:px-12">
        <div className="font-headline text-lg italic">{brand}</div>
        {links.length > 0 ? (
          <nav className="flex flex-wrap justify-center gap-6 font-body text-[13px]">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="opacity-80 transition-colors hover:text-pathway-accent hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </footer>
    </div>
  );
}
