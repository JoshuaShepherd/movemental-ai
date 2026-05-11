import Link from "next/link";

import type { RosterColumn } from "@/lib/program/types/safe-start-hero";

/** Three-column roster — safestart-hero-timeline family. */
export function SafeStartRosterGrid({ columns }: { columns: RosterColumn[] }) {
  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-12">
      {columns.map((col) => (
        <div key={col.title} className="flex flex-col gap-4">
          <span className="font-body text-xs font-semibold uppercase tracking-widest text-safestart-muted">
            {col.title}
          </span>
          <ul className="flex flex-col gap-3 font-body text-sm">
            {col.items.map((item) => (
              <li key={item.name}>
                <div className="font-semibold">{item.name}</div>
                {item.subtitle ? <div className="text-xs text-safestart-muted">{item.subtitle}</div> : null}
              </li>
            ))}
          </ul>
          {col.aside?.lines?.length ? (
            <div className="mt-4 border-t border-safestart-hairline/60 pt-4 font-body text-xs leading-relaxed text-safestart-muted">
              {col.aside.lines.map((line) => (
                <span key={line} className="block">
                  {line.includes("@") ? (
                    <Link className="transition-colors hover:text-pathway-accent" href={`mailto:${line}`}>
                      {line}
                    </Link>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </section>
  );
}
