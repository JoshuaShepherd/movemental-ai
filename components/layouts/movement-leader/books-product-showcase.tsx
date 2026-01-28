"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface BooksProductShowcaseProps {
  className?: string;
}

const books = [
  {
    title: "The Missional Quest",
    author: "Brad Brisco & Lance Ford",
    description: "Becoming a church of the long run — rediscovering the missionary nature of the church in the West.",
    price: "$18.99",
    badge: null,
  },
  {
    title: "The Forgotten Ways",
    author: "Alan Hirsch",
    description: "Reactivating apostolic genius — the missional church movement and its DNA for multiplication.",
    price: "$22.99",
    badge: "BESTSELLER",
  },
  {
    title: "Hero Maker",
    author: "Dave Ferguson & Warren Bird",
    description: "Five essential practices for leaders to multiply other leaders and spark movements.",
    price: "$16.99",
    badge: "NEW",
  },
  {
    title: "Organic Church",
    author: "Neil Cole",
    description: "Growing faith where life happens — simple, organic, and reproducible church planting.",
    price: "$14.99",
    badge: null,
  },
];

export function BooksProductShowcase({ className }: BooksProductShowcaseProps) {
  return (
    <section
      className={cn("relative w-full py-16", className)}
      style={{ backgroundColor: "var(--mvmt-surface-light)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-4xl sm:text-5xl font-bold tracking-tight"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          Essential Reading
        </h2>
        <p className="mt-2 text-lg" style={{ color: "var(--mvmt-text-secondary)" }}>
          All titles. <span style={{ color: "var(--mvmt-text-muted)" }}>Take your pick.</span>
        </p>

        <div className="mt-10 flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 scroll-smooth snap-x">
          {books.map((book) => (
            <div
              key={book.title}
              className="flex-shrink-0 w-72 sm:w-80 snap-start flex flex-col"
              style={{
                backgroundColor: "var(--mvmt-surface-light-muted)",
                borderRadius: "var(--mvmt-radius-lg)",
              }}
            >
              {book.badge && (
                <div className="px-6 pt-5">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--mvmt-accent)" }}
                  >
                    {book.badge}
                  </span>
                </div>
              )}

              <div className={cn("px-6", book.badge ? "pt-1" : "pt-6")}>
                <h3
                  className="text-xl font-bold"
                  style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
                >
                  {book.title}
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--mvmt-text-secondary)" }}>
                  {book.author}
                </p>
              </div>

              <div className="flex-1 flex items-center justify-center px-6 py-8">
                <div
                  className="w-36 h-52 rounded-md flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--mvmt-border-light)",
                    boxShadow: "var(--mvmt-shadow-lg)",
                  }}
                >
                  <span className="text-xs font-medium" style={{ color: "var(--mvmt-text-muted)" }}>
                    Cover
                  </span>
                </div>
              </div>

              <div className="px-6 pb-6 flex items-center justify-between">
                <p className="text-sm" style={{ color: "var(--mvmt-text-secondary)" }}>
                  {book.price}
                </p>
                <button
                  className="px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: "var(--mvmt-cta-bg)",
                    color: "var(--mvmt-cta-text)",
                    borderRadius: "var(--mvmt-radius-full)",
                  }}
                >
                  Get Book
                </button>
              </div>
            </div>
          ))}

          <div className="flex-shrink-0 w-16 flex items-center justify-center">
            <ChevronRight className="w-8 h-8" style={{ color: "var(--mvmt-text-muted)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

BooksProductShowcase.displayName = "BooksProductShowcase";
