import React from "react";
import Link from "next/link";
import { LEADERS_V4 } from "@/v2/lib/leaders-v4";

export function LeaderBandV4() {
  return (
    <div
      id="builtwith"
      className="border-t border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] py-6 sm:py-8"
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
            Built with twenty-five trusted church, non-profit, and institutional leaders
          </p>
          <Link
            href="/voices"
            className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-blue)] hover:underline"
          >
            See who →
          </Link>
        </div>

        {/* 25 Avatars Grid */}
        <div className="mt-5 grid grid-cols-5 gap-2.5 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-[repeat(25,minmax(0,1fr))]">
          {LEADERS_V4.map((leader) => (
            <Link
              key={leader.name}
              href="/voices"
              title={leader.name}
              className="group relative block aspect-square rounded-full border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-0.5 transition-all hover:scale-110 hover:border-[var(--color-ink-band-ink)] hover:shadow-md"
            >
              <div
                className="h-full w-full rounded-full bg-cover bg-top grayscale contrast-105 transition-all group-hover:grayscale-0"
                style={{ backgroundImage: `url('${leader.fullImageUrl}')` }}
                role="img"
                aria-label={leader.name}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
