"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface BooksMinimalGridProps {
  className?: string;
}

const books = [
  { title: "The Missional Quest — Leader's Guide", author: "Brad Brisco", price: "$25.99", hasSwatches: false },
  { title: "The Missional Quest — Study Edition", author: "Brad Brisco", price: "$39.49", hasSwatches: false },
  { title: "Covocational Church Planting", author: "Brad Brisco", price: "$19.99", hasSwatches: false },
  { title: "The Forgotten Ways — Anniversary Edition", author: "Alan Hirsch", price: "$19.49", hasSwatches: true },
  { title: "Hero Maker — Deluxe Edition", author: "Dave Ferguson", price: "$28.99", hasSwatches: false },
  { title: "Organic Church — Updated", author: "Neil Cole", price: "$17.99", hasSwatches: false },
  { title: "Building a Discipling Culture", author: "Mike Breen", price: "$24.99", hasSwatches: false },
  { title: "Saturate — Field Guide", author: "Jeff Vanderstelt", price: "$15.99", hasSwatches: false },
];

export function BooksMinimalGrid({ className }: BooksMinimalGridProps) {
  return (
    <section
      className={cn("relative w-full min-h-screen py-12", className)}
      style={{ backgroundColor: "var(--mvmt-surface-light)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs uppercase tracking-wider" style={{ color: "var(--mvmt-text-secondary)" }}>HOME</p>
        <h1
          className="mt-2 text-4xl sm:text-5xl font-bold"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          All Books
        </h1>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {books.map((book) => (
            <div key={book.title} className="group cursor-pointer">
              <div
                className="aspect-square flex items-center justify-center rounded-lg"
                style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}
              >
                <div
                  className="w-24 h-36 rounded"
                  style={{ backgroundColor: "var(--mvmt-border-light)", boxShadow: "var(--mvmt-shadow-sm)" }}
                />
              </div>

              <div className="mt-3 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  {book.hasSwatches ? (
                    <div className="flex gap-1">
                      {["var(--books-color-swatch-1)", "var(--books-color-swatch-2)"].map((c, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: c,
                            border: i === 0 ? "2px solid var(--mvmt-text-primary)" : "1px solid var(--mvmt-border-light)",
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <Check className="w-4 h-4" style={{ color: "var(--mvmt-text-muted)" }} />
                  )}
                </div>
                <p className="mt-1.5 text-sm leading-tight" style={{ color: "var(--mvmt-text-primary)" }}>{book.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--mvmt-text-secondary)" }}>{book.author}</p>
                <p className="mt-1 text-sm font-medium" style={{ color: "var(--mvmt-text-primary)" }}>{book.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

BooksMinimalGrid.displayName = "BooksMinimalGrid";
