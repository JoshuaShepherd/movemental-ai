"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface BooksDetailCleanProps {
  className?: string;
}

export function BooksDetailClean({ className }: BooksDetailCleanProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <section
      className={cn("relative w-full min-h-screen", className)}
      style={{ backgroundColor: "var(--mvmt-surface-light)" }}
    >
      {/* Nav */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--mvmt-border-light)" }}>
        <span className="text-sm italic font-semibold" style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
          Movemental Books
        </span>
        <nav className="hidden md:flex items-center gap-6 text-sm" style={{ color: "var(--mvmt-text-secondary)" }}>
          <span>Browse all</span>
          <span>Categories</span>
          <span>Collections</span>
          <span>About</span>
        </nav>
        <button
          className="px-4 py-1.5 text-sm font-medium rounded-full"
          style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}
        >
          Cart 0
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="flex items-center justify-center p-12 min-h-[400px] lg:min-h-[600px]" style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}>
          <div
            className="w-48 h-64 rounded-md"
            style={{ backgroundColor: "var(--mvmt-border-light)", boxShadow: "var(--mvmt-shadow-lg)" }}
          />
        </div>

        {/* Details */}
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
          >
            The Missional Quest
          </h1>
          <p className="mt-2 text-sm uppercase tracking-wider underline" style={{ color: "var(--mvmt-text-secondary)" }}>
            MOVEMENTAL FOUNDATIONS COLLECTION
          </p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-wider" style={{ color: "var(--mvmt-text-secondary)" }}>PRICE</p>
            <p className="text-2xl font-bold mt-1" style={{ color: "var(--mvmt-text-primary)" }}>$18.99</p>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider" style={{ color: "var(--mvmt-text-secondary)" }}>QUANTITY</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              className="mt-2 w-16 px-3 py-2 text-sm text-center"
              style={{
                border: "1px solid var(--mvmt-border-light)",
                color: "var(--mvmt-text-primary)",
                backgroundColor: "var(--mvmt-surface-light)",
                borderRadius: "var(--mvmt-radius-sm)",
              }}
            />
          </div>

          <div className="mt-8 flex gap-3">
            <button
              className="px-6 py-3 text-sm font-medium"
              style={{ backgroundColor: "var(--mvmt-cta-bg)", color: "var(--mvmt-cta-text)", borderRadius: "var(--mvmt-radius-sm)" }}
            >
              Add to cart
            </button>
            <button
              className="px-6 py-3 text-sm font-medium"
              style={{ backgroundColor: "var(--mvmt-cta-bg)", color: "var(--mvmt-cta-text)", borderRadius: "var(--mvmt-radius-sm)" }}
            >
              Buy now
            </button>
          </div>

          <hr className="my-10" style={{ borderColor: "var(--mvmt-border-light)" }} />

          <div>
            <p className="text-xs uppercase tracking-wider font-bold" style={{ color: "var(--mvmt-text-secondary)" }}>DETAILS</p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--mvmt-text-secondary)" }}>
              Become a church of the long run. Brad Brisco and Lance Ford guide readers through recovering the missionary imagination that shaped the early church. This practical field guide equips movement leaders with frameworks for incarnational mission, neighborhood presence, and sustainable discipleship rhythms.
            </p>
            <ul className="mt-4 text-sm space-y-1" style={{ color: "var(--mvmt-text-secondary)" }}>
              <li>• 224 pages, paperback</li>
              <li>• Includes discussion questions per chapter</li>
              <li>• Published by InterVarsity Press</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

BooksDetailClean.displayName = "BooksDetailClean";
