"use client";

import { cn } from "@/lib/utils";

interface BooksSpecCardsProps {
  className?: string;
}

const books = [
  {
    title: "The Missional Quest",
    author: "Brad Brisco & Lance Ford",
    rating: 4.8,
    reviews: 142,
    description: "A field guide for recovering the missionary imagination of the church in the West.",
    tags: ["Missional Living", "Church Planting"],
    specs: { pages: "224 pages", format: "Paperback", affordability: "$" },
    price: "$18.99",
  },
  {
    title: "The Forgotten Ways",
    author: "Alan Hirsch",
    rating: 4.9,
    reviews: 387,
    description: "Reactivating the missional DNA that powered the early church and Chinese underground movement.",
    tags: ["Apostolic Genius", "Movement DNA"],
    specs: { pages: "320 pages", format: "Paperback", affordability: "$$" },
    price: "$22.99",
  },
  {
    title: "Hero Maker",
    author: "Dave Ferguson & Warren Bird",
    rating: 4.7,
    reviews: 203,
    description: "Five essential practices for leaders who want to multiply leaders and spark movements.",
    tags: ["Leadership", "Multiplication"],
    specs: { pages: "256 pages", format: "Hardcover", affordability: "$$" },
    price: "$19.99",
  },
];

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="text-sm"
            style={{
              color: i < fullStars || (i === fullStars && hasHalf)
                ? "var(--books-rating-star)"
                : "var(--mvmt-border-light)",
            }}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-sm" style={{ color: "var(--mvmt-text-secondary)" }}>({reviews})</span>
    </div>
  );
}

export function BooksSpecCards({ className }: BooksSpecCardsProps) {
  return (
    <section
      className={cn("relative w-full py-16", className)}
      style={{ backgroundColor: "var(--mvmt-surface-light)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-3xl sm:text-4xl font-bold"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          Essential Books
        </h2>
        <h3
          className="mt-2 text-xl font-semibold"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          Movement Foundations
        </h3>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.title}
              className="flex flex-col overflow-hidden"
              style={{
                backgroundColor: "var(--mvmt-surface-light-muted)",
                borderRadius: "var(--mvmt-radius-lg)",
                border: "1px solid var(--mvmt-border-light)",
              }}
            >
              <div
                className="h-56 flex items-center justify-center"
                style={{ backgroundColor: "var(--mvmt-border-light)" }}
              >
                <div
                  className="w-28 h-40 rounded"
                  style={{
                    backgroundColor: "var(--mvmt-surface-light)",
                    boxShadow: "var(--mvmt-shadow-md)",
                  }}
                />
              </div>

              <div className="flex-1 flex flex-col p-6">
                <h4
                  className="text-lg font-bold"
                  style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
                >
                  {book.title}
                </h4>
                <p className="text-sm mt-0.5" style={{ color: "var(--mvmt-text-secondary)" }}>{book.author}</p>
                <div className="mt-2">
                  <StarRating rating={book.rating} reviews={book.reviews} />
                </div>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--mvmt-text-secondary)" }}>
                  {book.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor: "var(--books-tag-bg)",
                        color: "var(--mvmt-text-secondary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-sm" style={{ borderTop: "1px solid var(--mvmt-border-light)" }}>
                  <div className="flex justify-between pt-3">
                    <span style={{ color: "var(--mvmt-text-secondary)" }}>Pages</span>
                    <span style={{ color: "var(--mvmt-text-primary)" }}>{book.specs.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--mvmt-text-secondary)" }}>Format</span>
                    <span style={{ color: "var(--mvmt-text-primary)" }}>{book.specs.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--mvmt-text-secondary)" }}>Affordability</span>
                    <span style={{ color: "var(--mvmt-text-primary)" }}>{book.specs.affordability}</span>
                  </div>
                </div>

                <button
                  className="mt-6 w-full py-3 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: "var(--mvmt-cta-bg)",
                    color: "var(--mvmt-cta-text)",
                    borderRadius: "var(--mvmt-radius-full)",
                  }}
                >
                  Buy now – {book.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

BooksSpecCards.displayName = "BooksSpecCards";
