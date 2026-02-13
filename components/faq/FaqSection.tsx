"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { FAQ_ITEMS_FLAT, type FaqItem } from "@/content/faq";

interface FaqSectionProps {
  /** FAQ entries to render. Defaults to full list from content/faq. */
  items?: FaqItem[];
  /** Show dark header bar (Framer-style). */
  showHeader?: boolean;
  /** Show category headings between groups. */
  groupedByCategory?: boolean;
  /** Optional title override. */
  title?: string;
  className?: string;
}

export function FaqSection({
  items,
  showHeader = true,
  groupedByCategory = false,
  title = "FAQ",
  className,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const list = Array.isArray(items) && items.length > 0 ? items : FAQ_ITEMS_FLAT;

  return (
    <section
      className={cn(
        "relative w-full flex flex-col bg-[var(--mvmt-surface-dark)] min-h-screen",
        className
      )}
    >
      {showHeader && (
        <div className="flex items-center justify-between px-6 sm:px-12 py-3 bg-[var(--mvmt-surface-dark)] border-b border-[var(--mvmt-border-on-dark)]">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-bold text-[var(--mvmt-on-dark-primary)]"
            >
              Movemental
            </Link>
            <nav className="hidden sm:flex items-center gap-6">
              <Link
                href="/why-movemental"
                className="text-sm text-[var(--mvmt-on-dark-secondary)] hover:text-[var(--mvmt-on-dark-primary)]"
              >
                Why Movemental
              </Link>
              <Link
                href="/how-it-works"
                className="text-sm text-[var(--mvmt-on-dark-secondary)] hover:text-[var(--mvmt-on-dark-primary)]"
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-[var(--mvmt-on-dark-secondary)] hover:text-[var(--mvmt-on-dark-primary)]"
              >
                Pricing
              </Link>
              <Link
                href="/faq"
                className="text-sm text-[var(--mvmt-on-dark-secondary)] hover:text-[var(--mvmt-on-dark-primary)]"
              >
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/fit-check"
              className="text-sm px-4 py-1.5 rounded font-medium text-[var(--mvmt-cta-text)] bg-[var(--mvmt-accent)] hover:opacity-90"
            >
              Start for free
            </Link>
          </div>
        </div>
      )}

      <div className="flex-1 px-6 sm:px-12 lg:px-16 py-12 max-w-3xl mx-auto w-full">
        <h2 className="text-4xl sm:text-5xl font-black text-center mb-12 text-[var(--mvmt-on-dark-primary)] font-[var(--mvmt-font-heading)]">
          {title}
        </h2>

        <div className="space-y-0">
          {list.map((faq, i) => (
            <div
              key={i}
              className="border-b border-[var(--mvmt-border-on-dark)]"
            >
              <button
                type="button"
                className="w-full text-left py-5 pr-4 flex items-start justify-between gap-4 rounded-none bg-transparent hover:bg-white/[0.03] transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-base font-medium text-[var(--mvmt-on-dark-primary)]">
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-xl text-[var(--mvmt-on-dark-muted)]"
                  aria-hidden
                >
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="pb-5 pr-12">
                  <p className="text-sm leading-relaxed text-[var(--mvmt-on-dark-secondary)]">
                    {faq.answer}
                    {faq.link && (
                      <>
                        {" "}
                        <Link
                          href={faq.link.href}
                          className="text-[var(--mvmt-accent)] hover:underline"
                        >
                          {faq.link.text}
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

FaqSection.displayName = "FaqSection";
