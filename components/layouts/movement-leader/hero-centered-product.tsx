"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroCenteredProductProps {
  className?: string;
}

/**
 * Centered Product Hero — Based on NYT Cooking reference
 * Light background, centered serif headline, product images below, warm editorial feel
 */
export function HeroCenteredProduct({ className }: HeroCenteredProductProps) {
  const features = [
    {
      image: "/media-library/images/headshots/brad-brisco/brad-brisco-library-rays-3x4.webp",
      title: "Field-tested frameworks.",
      subtitle: "Books written from the trenches of movement leadership.",
    },
    {
      image: "/media-library/images/headshots/brad-brisco/brad-brisco-studio-backdrop-3x4.webp",
      title: "Let us equip your team.",
      subtitle: "Courses built for practitioners, not theorists.",
    },
    {
      image: "/media-library/images/headshots/brad-brisco/brad-brisco-office-bw-3x4.webp",
      title: "The only Resource Hub you'll need.",
      subtitle: "Books, podcasts, assessments — all in one place.",
    },
  ];

  return (
    <section className={cn("relative w-full", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      {/* Hero area */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-8 text-center">
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-2"
          style={{ color: "var(--mvmt-accent)", fontFamily: "var(--mvmt-font-body)" }}
        >
          Movemental
        </p>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl leading-tight"
          style={{
            color: "var(--mvmt-text-primary)",
            fontFamily: "var(--mvmt-font-heading)",
            fontWeight: 400,
          }}
        >
          Resources from practitioners
          <br />
          for any leader or context.
        </h1>
        <p
          className="mt-4 text-base max-w-xl mx-auto"
          style={{ color: "var(--mvmt-text-secondary)" }}
        >
          Includes books, online courses, a personal Resource Library, assessments, and more.
        </p>
        <div className="mt-6">
          <Link
            href="/fit-check"
            className="inline-block px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors"
            style={{
              backgroundColor: "var(--mvmt-cta-bg)",
              color: "var(--mvmt-cta-text)",
              borderRadius: "var(--mvmt-radius-sm)",
            }}
          >
            Subscribe Now
          </Link>
        </div>
      </div>

      {/* Feature cards */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden mb-4">
                <Image src={f.image} alt={f.title} fill className="object-cover" />
              </div>
              <h3
                className="text-base font-semibold"
                style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
              >
                {f.title}
              </h3>
              <p className="mt-1 text-sm" style={{ color: "var(--mvmt-text-secondary)" }}>
                {f.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

HeroCenteredProduct.displayName = "HeroCenteredProduct";
