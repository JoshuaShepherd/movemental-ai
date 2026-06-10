import Link from "next/link";

import { cn } from "@/lib/utils";
import type { TocEntry } from "@/lib/articles";

/**
 * Collapsible table of contents for narrow viewports (hidden on `lg`). Uses
 * a native `<details>` block so no JS is required for disclosure.
 */
export function ArticleTocMobile({ items }: { items: TocEntry[] }) {
  if (!items.length) return null;

  return (
    <details className="mb-10 rounded-lg bg-card p-4 shadow-ambient lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
        <span>On this page</span>
        <span
          aria-hidden="true"
          className="ml-3 size-2.5 rotate-45 border-r-[1.5px] border-b-[1.5px] border-muted-foreground transition-transform"
        />
      </summary>
      <nav aria-label="Table of contents" className="mt-4">
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={cn(
                  "block py-1 text-[0.84rem] leading-snug font-medium text-muted-foreground hover:text-foreground",
                  item.depth === 3 && "pl-5 text-[0.8rem] font-normal"
                )}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
