"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface FaqMinimalAccordionProps {
  className?: string;
}

export function FaqMinimalAccordion({ className }: FaqMinimalAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const plans = [
    { name: "Free", price: "$0/mo", highlight: false },
    { name: "Basic", price: "$20/mo", highlight: true },
    { name: "Pro", price: "$30/mo", highlight: true },
    { name: "Business", price: "Custom", highlight: false },
  ];

  const faqs = [
    { q: "How are additional editors billed?", a: "Each additional editor is billed at the per-seat rate of your current plan." },
    { q: "Can I trial Movemental before paying?", a: "Yes! Our Free plan gives you full access to explore the platform before upgrading." },
    { q: "What payment methods do you offer?", a: "We accept all major credit cards, PayPal, and wire transfer for Business plans." },
    { q: "Can I cancel my site plan at any time?", a: "Absolutely. You can cancel or downgrade at any time from your account settings." },
    { q: "How can I manage my invoices and charges?", a: "Visit your Billing page in Settings to view all invoices and manage payment methods." },
  ];

  return (
    <section className={cn("relative w-full flex flex-col", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      {/* Dark Nav */}
      <div className="flex items-center justify-between px-6 sm:px-12 py-3" style={{ backgroundColor: "var(--mvmt-surface-dark)" }}>
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold" style={{ color: "var(--mvmt-on-dark-primary)" }}>Movemental</span>
          {["Templates", "Plugins", "Learn", "Gallery"].map((item) => (
            <span key={item} className="text-sm hidden sm:inline" style={{ color: "var(--mvmt-on-dark-secondary)" }}>{item}</span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-sm px-3 py-1 rounded"
            style={{ border: "1px solid var(--mvmt-border-on-dark)", color: "var(--mvmt-on-dark-primary)" }}
          >
            Pricing
          </span>
          <Link
            href="/signup"
            className="text-sm px-4 py-1.5 rounded font-medium"
            style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}
          >
            Start for free
          </Link>
        </div>
      </div>

      {/* Pricing Row */}
      <div className="px-6 sm:px-12 lg:px-16 py-6" style={{ borderBottom: "1px solid var(--mvmt-border-light)" }}>
        <div className="flex items-baseline gap-8">
          <span className="text-sm font-semibold" style={{ color: "var(--mvmt-text-primary)" }}>Site plans</span>
          {plans.map((p) => (
            <div key={p.name} className="text-center">
              <p className="text-sm font-medium" style={{ color: p.highlight ? "var(--mvmt-accent)" : "var(--mvmt-text-primary)" }}>{p.name}</p>
              <p className="text-sm" style={{ color: p.highlight ? "var(--mvmt-accent)" : "var(--mvmt-text-secondary)" }}>{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-4 mx-6 sm:mx-12 lg:mx-16" style={{ borderBottom: "1px solid var(--mvmt-border-light)" }} />

      {/* FAQ */}
      <div className="flex-1 px-6 sm:px-12 lg:px-16 py-12 max-w-3xl mx-auto w-full">
        <h2
          className="text-4xl sm:text-5xl font-black text-center mb-12"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          FAQ
        </h2>
        <div>
          {faqs.map((faq, i) => (
            <button
              key={i}
              className="w-full text-left py-6"
              style={{ borderBottom: "1px solid var(--mvmt-border-light)" }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <span className="text-base" style={{ color: "var(--mvmt-text-primary)" }}>{faq.q}</span>
                <span className="text-xl ml-4 flex-shrink-0" style={{ color: "var(--mvmt-text-muted)" }}>
                  {openIndex === i ? "−" : "+"}
                </span>
              </div>
              {openIndex === i && (
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--mvmt-text-secondary)" }}>
                  {faq.a}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

FaqMinimalAccordion.displayName = "FaqMinimalAccordion";
