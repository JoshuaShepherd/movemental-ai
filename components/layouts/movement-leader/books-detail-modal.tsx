"use client";

import { cn } from "@/lib/utils";
import { X, Minus, Plus, Star, Pencil } from "lucide-react";
import { useState } from "react";

interface BooksDetailModalProps {
  className?: string;
}

export function BooksDetailModal({ className }: BooksDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <section
      className={cn("relative w-full min-h-screen flex items-center justify-center py-16", className)}
      style={{ backgroundColor: "var(--books-overlay-bg)" }}
    >
      <div
        className="w-full max-w-4xl mx-6 grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
        style={{
          backgroundColor: "var(--mvmt-surface-light)",
          borderRadius: "var(--mvmt-radius-lg)",
          boxShadow: "var(--books-modal-shadow)",
        }}
      >
        {/* Left: Image */}
        <div className="p-8 flex flex-col">
          <div
            className="flex-1 flex items-center justify-center rounded-lg min-h-[300px]"
            style={{ backgroundColor: "var(--mvmt-surface-light-muted)" }}
          >
            <div
              className="w-40 h-56 rounded"
              style={{ backgroundColor: "var(--mvmt-border-light)", boxShadow: "var(--mvmt-shadow-md)" }}
            />
          </div>
          <div className="mt-4 flex gap-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="w-14 h-14 rounded"
                style={{
                  backgroundColor: "var(--mvmt-surface-light-muted)",
                  border: i === 0 ? "2px solid var(--mvmt-accent)" : "1px solid var(--mvmt-border-light)",
                }}
              />
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--mvmt-text-secondary)" }}>
            <strong style={{ color: "var(--mvmt-text-primary)" }}>Read this if</strong> you want a practical framework for becoming a hero-making leader who multiplies disciples, leaders, and movements.
          </p>
        </div>

        {/* Right: Details */}
        <div className="p-8 flex flex-col relative">
          <button className="absolute top-4 right-4">
            <X className="w-5 h-5" style={{ color: "var(--mvmt-text-muted)" }} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: "var(--mvmt-border-light)" }} />
            <span className="text-sm" style={{ color: "var(--mvmt-text-secondary)" }}>Movemental Press</span>
          </div>

          <h2
            className="mt-3 text-2xl font-bold leading-tight"
            style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
          >
            Hero Maker — Five Essential Practices
          </h2>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4"
                  fill={i < 4 ? "var(--mvmt-accent)" : "none"}
                  style={{ color: "var(--mvmt-accent)" }}
                />
              ))}
            </div>
            <span className="text-sm" style={{ color: "var(--mvmt-text-secondary)" }}>4.5 (1,535)</span>
          </div>

          {/* Price */}
          <div
            className="mt-4 p-4 rounded-lg"
            style={{ backgroundColor: "var(--mvmt-surface-light-muted)", border: "1px solid var(--mvmt-border-light)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: "var(--mvmt-text-secondary)" }}>Total</span>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "var(--mvmt-surface-light-muted)", color: "var(--mvmt-text-secondary)", border: "1px solid var(--mvmt-border-light)" }}
                >
                  15% OFF
                </span>
                <span className="text-lg font-bold" style={{ color: "var(--mvmt-text-primary)" }}>$16.99</span>
              </div>
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--mvmt-accent)" }}>FREE Shipping</p>
          </div>

          {/* Shipping */}
          <div
            className="mt-3 p-4 rounded-lg flex items-center justify-between"
            style={{ border: "1px solid var(--mvmt-border-light)" }}
          >
            <div>
              <p className="text-xs" style={{ color: "var(--mvmt-text-muted)" }}>Shipping To</p>
              <p className="text-sm font-medium" style={{ color: "var(--mvmt-text-primary)" }}>
                Your Church <span style={{ color: "var(--mvmt-text-secondary)" }}>in</span> Your City, ST
              </p>
            </div>
            <Pencil className="w-4 h-4" style={{ color: "var(--mvmt-text-muted)" }} />
          </div>

          <div className="flex-1" />

          <button
            className="mt-4 w-full py-3 text-sm"
            style={{
              color: "var(--mvmt-text-secondary)",
              border: "1px solid var(--mvmt-border-light)",
              borderRadius: "var(--mvmt-radius-md)",
            }}
          >
            Add Purchase Notes
          </button>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center" style={{ border: "1px solid var(--mvmt-border-light)", borderRadius: "var(--mvmt-radius-md)" }}>
              <button className="px-3 py-2.5" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="w-4 h-4" style={{ color: "var(--mvmt-text-muted)" }} />
              </button>
              <span className="px-3 text-sm" style={{ color: "var(--mvmt-text-primary)" }}>{quantity}</span>
              <button className="px-3 py-2.5" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="w-4 h-4" style={{ color: "var(--mvmt-text-muted)" }} />
              </button>
            </div>
            <button
              className="flex-1 py-3 text-sm font-medium"
              style={{
                backgroundColor: "var(--mvmt-cta-bg)",
                color: "var(--mvmt-cta-text)",
                borderRadius: "var(--mvmt-radius-md)",
              }}
            >
              Buy Now
            </button>
          </div>
          <p className="mt-2 text-xs text-center" style={{ color: "var(--mvmt-text-muted)" }}>
            You will receive an email with order details once confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}

BooksDetailModal.displayName = "BooksDetailModal";
