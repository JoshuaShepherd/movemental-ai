"use client";

import { cn } from "@/lib/utils";

interface BooksRelatedProductsProps {
  className?: string;
}

const relatedBooks = [
  { title: "The Missional Quest", price: "$18.99", collection: null },
  { title: "Covocational Church Planting", price: "$24.99", collection: null },
  { title: "The Forgotten Ways", price: "$22.99", collection: "FOUNDATIONS COLLECTION" },
  { title: "Hero Maker", price: "$19.99", collection: "FOUNDATIONS COLLECTION" },
  { title: "Organic Church", price: "$14.99", collection: null },
  { title: "Building a Discipling Culture", price: "$24.99", collection: null },
  { title: "Saturate", price: "$17.99", collection: "ESSENTIALS COLLECTION" },
  { title: "The Permanent Revolution", price: "$21.99", collection: "ESSENTIALS COLLECTION" },
];

export function BooksRelatedProducts({ className }: BooksRelatedProductsProps) {
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
          Related Books
        </h2>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedBooks.map((book) => (
            <div key={book.title} className="group cursor-pointer">
              <div
                className="aspect-square flex flex-col items-center justify-center rounded-lg relative"
                style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}
              >
                <div
                  className="w-24 h-36 rounded"
                  style={{ backgroundColor: "var(--mvmt-border-light)", boxShadow: "var(--mvmt-shadow-sm)" }}
                />
                {book.collection && (
                  <span
                    className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-wider underline"
                    style={{ color: "var(--mvmt-accent)" }}
                  >
                    {book.collection}
                  </span>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm" style={{ color: "var(--mvmt-text-primary)" }}>{book.title}</p>
                <p className="text-sm" style={{ color: "var(--mvmt-text-primary)" }}>{book.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

BooksRelatedProducts.displayName = "BooksRelatedProducts";
