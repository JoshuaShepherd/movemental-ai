"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface BooksDetailSplitProps {
  className?: string;
}

const formatOptions = ["Paperback", "Hardcover", "eBook"];

export function BooksDetailSplit({ className }: BooksDetailSplitProps) {
  const [selectedFormat, setSelectedFormat] = useState("Paperback");
  const [quantity, setQuantity] = useState(1);

  return (
    <section
      className={cn("relative w-full min-h-screen bg-mvmt-surface-light", className)}
    >
      {/* Top nav */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-b-mvmt-border-light">
        <span className="text-sm font-bold uppercase tracking-wider text-mvmt-text-primary">BROWSE ALL</span>
        <span className="text-sm font-bold uppercase text-mvmt-text-primary font-mvmt-heading">MOVEMENTAL BOOKS</span>
        <span className="text-sm font-bold uppercase text-mvmt-text-primary">CART (0)</span>
      </div>

      {/* Breadcrumbs */}
      <div className="px-6 py-3">
        <span className="text-xs uppercase tracking-wider text-mvmt-text-secondary">
          BOOKS → FOUNDATIONS → HERO MAKER
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Image */}
        <div className="flex items-center justify-center min-h-[500px] bg-mvmt-surface-light-muted">
          <div
            className="w-52 h-72 rounded-md shadow-mvmt-lg"
            style={{ backgroundColor: "var(--mvmt-border-light)" }}
          />
        </div>

        {/* Details */}
        <div className="p-8 lg:p-12">
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none text-mvmt-text-primary font-mvmt-heading"
          >
            Hero Maker
          </h1>
          <p className="mt-3 text-sm text-mvmt-text-secondary">
            Five essential practices for leaders to multiply.
          </p>
          <p className="mt-1 text-sm text-mvmt-text-secondary">
            By Dave Ferguson &amp; Warren Bird.
          </p>
          <p className="mt-6 text-3xl font-bold text-mvmt-text-primary">$19.99</p>

          {/* Format */}
          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-wider mb-3 text-mvmt-text-primary">FORMAT</p>
            <div className="flex gap-2 flex-wrap">
              {formatOptions.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFormat(f)}
                  className="px-4 py-2 text-sm font-medium transition-colors rounded-mvmt-sm"
                  style={{ backgroundColor: selectedFormat === f ? "var(--mvmt-text-primary)" : "transparent",
                    color: selectedFormat === f ? "var(--mvmt-surface-light)" : "var(--mvmt-text-primary)",
                    border: selectedFormat === f ? "none" : "1px solid var(--mvmt-border-medium)" }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-3 text-mvmt-text-primary">QUANTITY</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              className="w-16 px-3 py-2 text-sm text-center text-mvmt-text-primary bg-mvmt-surface-light rounded-mvmt-sm border border-mvmt-border-light"
            />
          </div>

          {/* Spec rows */}
          <div className="mt-8 space-y-0">
            {[
              { label: "COLLECTION", value: "FOUNDATIONS", linked: true },
              { label: "AUTHOR", value: "DAVE FERGUSON & WARREN BIRD", linked: false },
              { label: "PAGES", value: "256", linked: false },
              { label: "ISBN", value: "978-0310536963", linked: false },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-3 text-sm border-b border-b-mvmt-border-light"
              >
                <span className="font-bold uppercase tracking-wider text-mvmt-text-primary">{row.label}</span>
                <span
                  className={row.linked ? "underline" : ""}
                  style={{ color: row.linked ? "var(--mvmt-text-primary)" : "var(--mvmt-text-secondary)" }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

BooksDetailSplit.displayName = "BooksDetailSplit";
