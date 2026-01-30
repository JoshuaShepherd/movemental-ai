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
      <span className="text-sm text-mvmt-text-secondary">({reviews})</span>
    </div>
  );
}

export function BooksSpecCards({ className }: BooksSpecCardsProps) {
  return (
    <section
      className={cn("relative w-full py-16 bg-mvmt-surface-light", className)}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-3xl sm:text-4xl font-bold text-mvmt-text-primary font-mvmt-heading"
        >
          Essential Books
        </h2>
        <h3
          className="mt-2 text-xl font-semibold text-mvmt-text-primary font-mvmt-heading"
        >
          Movement Foundations
        </h3>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.title}
              className="flex flex-col overflow-hidden bg-mvmt-surface-light-muted rounded-mvmt-lg border border-mvmt-border-light"
            >
              <div
                className="h-56 flex items-center justify-center"
                style={{ backgroundColor: "var(--mvmt-border-light)" }}
              >
                <div
                  className="w-28 h-40 rounded bg-mvmt-surface-light shadow-mvmt-md"
                />
              </div>

              <div className="flex-1 flex flex-col p-6">
                <h4
                  className="text-lg font-bold text-mvmt-text-primary font-mvmt-heading"
                >
                  {book.title}
                </h4>
                <p className="text-sm mt-0.5 text-mvmt-text-secondary">{book.author}</p>
                <div className="mt-2">
                  <StarRating rating={book.rating} reviews={book.reviews} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mvmt-text-secondary">
                  {book.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-full text-mvmt-text-secondary"
                      style={{ backgroundColor: "var(--books-tag-bg)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-sm border-t border-t-mvmt-border-light">
                  <div className="flex justify-between pt-3">
                    <span className="text-mvmt-text-secondary">Pages</span>
                    <span className="text-mvmt-text-primary">{book.specs.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mvmt-text-secondary">Format</span>
                    <span className="text-mvmt-text-primary">{book.specs.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mvmt-text-secondary">Affordability</span>
                    <span className="text-mvmt-text-primary">{book.specs.affordability}</span>
                  </div>
                </div>

                <button
                  className="mt-6 w-full py-3 text-sm font-medium transition-colors text-mvmt-cta-text bg-mvmt-cta-bg rounded-full"
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
