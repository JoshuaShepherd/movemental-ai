"use client";

import { cn } from "@/lib/utils";
import { X, Minus, Plus } from "lucide-react";
import { useState } from "react";

interface BooksDetailCartProps {
  className?: string;
}

const formats = [
  { label: "Paperback", selected: false },
  { label: "Hardcover", selected: true },
  { label: "eBook", selected: false },
];

export function BooksDetailCart({ className }: BooksDetailCartProps) {
  const [cartOpen, setCartOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);

  return (
    <section className={cn("relative w-full min-h-screen", className)} style={{ backgroundColor: "var(--mvmt-surface-dark)" }}>
      {/* Top nav */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--mvmt-border-on-dark)" }}>
        <span className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--mvmt-on-dark-primary)" }}>
          BROWSE ALL
        </span>
        <span className="text-sm font-bold uppercase tracking-wider" style={{ color: "var(--mvmt-on-dark-primary)", fontFamily: "var(--mvmt-font-heading)" }}>
          MOVEMENTAL BOOKS
        </span>
        <button
          onClick={() => setCartOpen(true)}
          className="text-sm font-bold uppercase tracking-wider"
          style={{ color: "var(--mvmt-on-dark-primary)" }}
        >
          CART (1)
        </button>
      </div>

      {/* Breadcrumbs */}
      <div className="px-6 py-3">
        <span className="text-xs uppercase tracking-wider" style={{ color: "var(--mvmt-on-dark-muted)" }}>
          BOOKS → DISCIPLESHIP → THE FORGOTTEN WAYS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Book cover */}
        <div className="flex items-center justify-center p-12" style={{ backgroundColor: "var(--mvmt-surface-dark-elevated)" }}>
          <div
            className="w-64 h-80 rounded-md flex items-center justify-center"
            style={{ backgroundColor: "var(--mvmt-surface-dark)", boxShadow: "var(--mvmt-shadow-lg)" }}
          >
            <span className="text-xs" style={{ color: "var(--mvmt-on-dark-muted)" }}>Book Cover</span>
          </div>
        </div>

        {/* Details */}
        <div className="p-8 lg:p-12">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none"
            style={{ color: "var(--mvmt-on-dark-primary)", fontFamily: "var(--mvmt-font-heading)" }}
          >
            The Forgotten Ways
          </h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--mvmt-on-dark-secondary)" }}>
            Reactivating apostolic genius. A groundbreaking exploration of the missional DNA of the early church.
          </p>
          <p className="mt-4 text-3xl font-bold" style={{ color: "var(--mvmt-on-dark-primary)" }}>$22.99</p>

          {/* Format selector */}
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--mvmt-on-dark-primary)" }}>FORMAT</p>
            <div className="flex gap-2">
              {formats.map((f) => (
                <button
                  key={f.label}
                  className="px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: f.selected ? "var(--mvmt-on-dark-primary)" : "transparent",
                    color: f.selected ? "var(--mvmt-surface-dark)" : "var(--mvmt-on-dark-secondary)",
                    border: f.selected ? "none" : "1px solid var(--mvmt-border-on-dark)",
                    borderRadius: "var(--mvmt-radius-sm)",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--mvmt-on-dark-primary)" }}>QUANTITY</p>
            <div className="inline-flex items-center" style={{ border: "1px solid var(--mvmt-border-on-dark)", borderRadius: "var(--mvmt-radius-sm)" }}>
              <button className="px-3 py-2" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="w-4 h-4" style={{ color: "var(--mvmt-on-dark-secondary)" }} />
              </button>
              <span className="px-4 py-2 text-sm" style={{ color: "var(--mvmt-on-dark-primary)" }}>{quantity}</span>
              <button className="px-3 py-2" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="w-4 h-4" style={{ color: "var(--mvmt-on-dark-secondary)" }} />
              </button>
            </div>
          </div>

          {/* Spec rows */}
          <div className="mt-8 space-y-0">
            {[
              { label: "COLLECTION", value: "FOUNDATIONS" },
              { label: "AUTHOR", value: "ALAN HIRSCH" },
              { label: "PAGES", value: "320" },
              { label: "FORMAT", value: "PAPERBACK / HARDCOVER / EBOOK" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-3 text-sm"
                style={{ borderBottom: "1px solid var(--mvmt-border-on-dark)" }}
              >
                <span className="font-bold uppercase tracking-wider" style={{ color: "var(--mvmt-on-dark-primary)" }}>{row.label}</span>
                <span style={{ color: "var(--mvmt-on-dark-secondary)" }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="w-full py-4 text-sm font-bold uppercase tracking-wider"
              style={{ backgroundColor: "var(--mvmt-cta-bg)", color: "var(--mvmt-cta-text)", borderRadius: "var(--mvmt-radius-sm)" }}
            >
              ADD TO CART
            </button>
            <button
              className="w-full py-4 text-sm font-bold uppercase tracking-wider"
              style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)", borderRadius: "var(--mvmt-radius-sm)" }}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      {/* Cart drawer */}
      {cartOpen && (
        <>
          <div className="fixed inset-0 z-40" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} onClick={() => setCartOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col" style={{ backgroundColor: "var(--books-cart-bg)" }}>
            <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid var(--mvmt-border-light)" }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--books-cart-text)" }}>YOUR CART</h2>
              <button onClick={() => setCartOpen(false)}>
                <X className="w-5 h-5" style={{ color: "var(--books-cart-text)" }} />
              </button>
            </div>
            <div className="flex-1 p-6">
              <div className="flex gap-4">
                <div className="w-16 h-20 rounded flex-shrink-0" style={{ backgroundColor: "var(--mvmt-border-light)" }} />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-bold" style={{ color: "var(--books-cart-text)" }}>The Forgotten Ways</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--mvmt-text-secondary)" }}>Format: Hardcover</p>
                    </div>
                    <p className="text-sm font-bold" style={{ color: "var(--books-cart-text)" }}>$22.99</p>
                  </div>
                  <button className="mt-2 text-xs underline" style={{ color: "var(--books-cart-text)" }}>REMOVE</button>
                </div>
              </div>
            </div>
            <div className="p-6" style={{ borderTop: "1px solid var(--mvmt-border-light)" }}>
              <div className="flex justify-between mb-4">
                <span className="text-sm font-bold uppercase" style={{ color: "var(--books-cart-text)" }}>SUBTOTAL</span>
                <span className="text-sm font-bold" style={{ color: "var(--books-cart-text)" }}>$22.99</span>
              </div>
              <button
                className="w-full py-3 text-sm font-bold uppercase tracking-wider"
                style={{ backgroundColor: "var(--mvmt-cta-bg)", color: "var(--mvmt-cta-text)", borderRadius: "var(--mvmt-radius-sm)" }}
              >
                CONTINUE TO CHECKOUT
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

BooksDetailCart.displayName = "BooksDetailCart";
