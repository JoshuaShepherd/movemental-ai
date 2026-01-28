"use client";

import { cn } from "@/lib/utils";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface BooksFilteredGridProps {
  className?: string;
}

const filters = ["Category", "Topic", "Author", "Rating", "Sort by"];

const relatedAuthors = [
  { name: "Brad Brisco", rating: 4.8, reviews: 2525 },
  { name: "Alan Hirsch", rating: 4.9, reviews: 35679 },
  { name: "Dave Ferguson", rating: 4.7, reviews: 10064 },
  { name: "Neil Cole", rating: 4.6, reviews: 8200 },
  { name: "Mike Breen", rating: 4.5, reviews: 6100 },
  { name: "Jeff Vanderstelt", rating: 4.6, reviews: 4300 },
];

const discipleshipBooks = [
  { title: "The Missional Quest", author: "Brad Brisco", rating: 4.8, reviews: 159, price: "$18.99", sale: null },
  { title: "Covocational Church Planting", author: "Brad Brisco", rating: 4.9, reviews: 171, price: "$24.99", sale: null },
  { title: "The Forgotten Ways", author: "Alan Hirsch", rating: 4.9, reviews: 561, price: "$22.99", sale: null },
  { title: "Hero Maker", author: "Dave Ferguson", rating: 4.5, reviews: 561, price: "$19.99", sale: "71%" },
  { title: "Organic Church", author: "Neil Cole", rating: 4.6, reviews: 91, price: "$14.99", sale: "18%" },
  { title: "Building a Discipling Culture", author: "Mike Breen", rating: 4.8, reviews: 2857, price: "$25.00", sale: null },
];

export function BooksFilteredGrid({ className }: BooksFilteredGridProps) {
  const [searchValue, setSearchValue] = useState("movement books");

  return (
    <section
      className={cn("relative w-full min-h-screen", className)}
      style={{ backgroundColor: "var(--mvmt-surface-light)" }}
    >
      <div
        className="sticky top-0 z-30 px-6 py-3"
        style={{ backgroundColor: "var(--mvmt-surface-light)", borderBottom: "1px solid var(--mvmt-border-light)" }}
      >
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "var(--mvmt-text-muted)" }} />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-full text-sm outline-none"
            style={{
              backgroundColor: "var(--books-filter-bg)",
              color: "var(--mvmt-text-primary)",
              border: "1px solid var(--mvmt-border-light)",
            }}
          />
          {searchValue && (
            <button onClick={() => setSearchValue("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4" style={{ color: "var(--mvmt-text-muted)" }} />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              className="px-4 py-1.5 text-sm rounded-full transition-colors"
              style={{
                backgroundColor: "var(--books-filter-bg)",
                color: "var(--mvmt-text-secondary)",
                border: "1px solid var(--mvmt-border-light)",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Related Authors */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
              Related Authors
            </h3>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: "1px solid var(--mvmt-border-light)" }}>
                <ChevronLeft className="w-4 h-4" style={{ color: "var(--mvmt-text-muted)" }} />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: "1px solid var(--mvmt-border-light)" }}>
                <ChevronRight className="w-4 h-4" style={{ color: "var(--mvmt-text-muted)" }} />
              </button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {relatedAuthors.map((a) => (
              <div key={a.name} className="flex-shrink-0 w-40">
                <div className="w-full aspect-square rounded-lg" style={{ backgroundColor: "var(--books-filter-bg)" }} />
                <p className="mt-2 text-sm font-medium truncate" style={{ color: "var(--mvmt-text-primary)" }}>{a.name}</p>
                <p className="text-xs" style={{ color: "var(--mvmt-text-secondary)" }}>
                  ★{a.rating} ({a.reviews.toLocaleString()})
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Discipleship Books */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
              Discipleship Books
            </h3>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: "1px solid var(--mvmt-border-light)" }}>
                <ChevronLeft className="w-4 h-4" style={{ color: "var(--mvmt-text-muted)" }} />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ border: "1px solid var(--mvmt-border-light)" }}>
                <ChevronRight className="w-4 h-4" style={{ color: "var(--mvmt-text-muted)" }} />
              </button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {discipleshipBooks.map((book) => (
              <div key={book.title} className="flex-shrink-0 w-44">
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden" style={{ backgroundColor: "var(--books-filter-bg)" }}>
                  {book.sale && (
                    <span
                      className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold rounded-full"
                      style={{ backgroundColor: "var(--books-badge-sale)", color: "var(--mvmt-on-dark-primary)" }}
                    >
                      {book.sale}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs" style={{ color: "var(--mvmt-text-secondary)" }}>{book.author}</p>
                <p className="text-sm font-medium leading-tight mt-0.5" style={{ color: "var(--mvmt-text-primary)" }}>{book.title}</p>
                <p className="text-xs mt-1" style={{ color: "var(--mvmt-text-secondary)" }}>
                  ★{book.rating} ({book.reviews})
                </p>
                <p className="text-sm font-semibold mt-1" style={{ color: "var(--mvmt-text-primary)" }}>{book.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-lg font-bold" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
            Church Planting
          </h3>
        </div>
      </div>
    </section>
  );
}

BooksFilteredGrid.displayName = "BooksFilteredGrid";
