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
      className={cn("relative w-full min-h-screen bg-mvmt-surface-light", className)}
    >
      {/* Nav */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-b-mvmt-border-light">
        <span className="text-sm italic font-semibold text-mvmt-text-primary font-mvmt-heading">
          Movemental Books
        </span>
        <nav className="hidden md:flex items-center gap-6 text-sm text-mvmt-text-secondary">
          <span>Browse all</span>
          <span>Categories</span>
          <span>Collections</span>
          <span>About</span>
        </nav>
        <button
          className="px-4 py-1.5 text-sm font-medium rounded-full text-mvmt-cta-text bg-mvmt-accent"
        >
          Cart 0
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="flex items-center justify-center p-12 min-h-[400px] lg:min-h-[600px] bg-mvmt-surface-light-muted">
          <div
            className="w-48 h-64 rounded-md shadow-mvmt-lg bg-mvmt-border-light"
            
          />
        </div>

        {/* Details */}
        <div className="p-8 lg:p-16 flex flex-col justify-center">
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight text-mvmt-text-primary font-mvmt-heading"
          >
            The Missional Quest
          </h1>
          <p className="mt-2 text-sm uppercase tracking-wider underline text-mvmt-text-secondary">
            MOVEMENTAL FOUNDATIONS COLLECTION
          </p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-wider text-mvmt-text-secondary">PRICE</p>
            <p className="text-2xl font-bold mt-1 text-mvmt-text-primary">$18.99</p>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-mvmt-text-secondary">QUANTITY</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              className="mt-2 w-16 px-3 py-2 text-sm text-center text-mvmt-text-primary bg-mvmt-surface-light rounded-mvmt-sm border border-mvmt-border-light"
            />
          </div>

          <div className="mt-8 flex gap-3">
            <button
              className="px-6 py-3 text-sm font-medium text-mvmt-cta-text bg-mvmt-cta-bg rounded-mvmt-sm"
            >
              Add to cart
            </button>
            <button
              className="px-6 py-3 text-sm font-medium text-mvmt-cta-text bg-mvmt-cta-bg rounded-mvmt-sm"
            >
              Buy now
            </button>
          </div>

          <hr className="my-10 border-mvmt-border-light"  />

          <div>
            <p className="text-xs uppercase tracking-wider font-bold text-mvmt-text-secondary">DETAILS</p>
            <p className="mt-4 text-sm leading-relaxed text-mvmt-text-secondary">
              Become a church of the long run. Brad Brisco and Lance Ford guide readers through recovering the missionary imagination that shaped the early church. This practical field guide equips movement leaders with frameworks for incarnational mission, neighborhood presence, and sustainable discipleship rhythms.
            </p>
            <ul className="mt-4 text-sm space-y-1 text-mvmt-text-secondary">
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
