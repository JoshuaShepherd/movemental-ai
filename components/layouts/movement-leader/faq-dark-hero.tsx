"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface FaqDarkHeroProps {
  className?: string;
}

export function FaqDarkHero({ className }: FaqDarkHeroProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "What resources are available for organizations to purchase and how are they different?", a: "We offer tailored packages for movement organizations including assessments, courses, coaching tools, and leadership pipelines." },
    { q: "I would like to offer Movemental to my team as a perk/benefit. Which product should I purchase?", a: "Our Team plan includes everything you need — unlimited assessments, courses, and AI coaching for your entire staff." },
    { q: "How does distribution work?", a: "Content is distributed through our platform with whitelabel options for your organization's branding." },
    { q: "Is Movemental available globally? What languages are supported?", a: "Yes! Movemental is available worldwide with support for English, Spanish, Portuguese, and French." },
  ];

  return (
    <section className={cn("relative w-full flex flex-col", className)} style={{ backgroundColor: "var(--mvmt-surface-dark)" }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-6 sm:px-12 py-4">
        <span className="text-sm font-semibold" style={{ color: "var(--mvmt-on-dark-primary)" }}>
          Movemental <span style={{ color: "var(--mvmt-on-dark-muted)" }}>at Work</span>
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: "var(--mvmt-on-dark-secondary)" }}>Log In</span>
          <Link
            href="/contact"
            className="px-4 py-2 text-xs font-semibold rounded-full"
            style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}
          >
            Contact Sales
          </Link>
        </div>
      </div>

      {/* Split Hero */}
      <div className="px-6 sm:px-12 lg:px-16 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div
          className="aspect-[4/3] rounded-lg"
          style={{ backgroundColor: "var(--mvmt-surface-dark-elevated)" }}
        />
        <div>
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "var(--mvmt-on-dark-primary)", fontFamily: "var(--mvmt-font-heading)" }}
          >
            Drive ministry outcomes
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--mvmt-on-dark-secondary)" }}>
            Help teams develop critical skills that support organizational goals as well as personal growth and transformation.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 text-xs font-semibold rounded-full"
            style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}
          >
            Contact Sales
          </Link>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-6 sm:px-12 lg:px-16 py-16">
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-10"
          style={{ color: "var(--mvmt-on-dark-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <button
              key={i}
              className="w-full text-left px-6 py-4 rounded-lg transition-colors"
              style={{ backgroundColor: "var(--mvmt-surface-dark-elevated)" }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium pr-4" style={{ color: "var(--mvmt-on-dark-primary)" }}>{faq.q}</span>
                <span style={{ color: "var(--mvmt-on-dark-muted)" }}>{openIndex === i ? "∧" : "∨"}</span>
              </div>
              {openIndex === i && (
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--mvmt-on-dark-secondary)" }}>
                  {faq.a}
                </p>
              )}
            </button>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/contact"
            className="inline-block px-8 py-3 text-sm font-semibold rounded-full"
            style={{ backgroundColor: "var(--mvmt-accent)", color: "var(--mvmt-cta-text)" }}
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}

FaqDarkHero.displayName = "FaqDarkHero";
