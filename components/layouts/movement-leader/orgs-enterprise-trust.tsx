"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface OrgsEnterpriseTrustProps {
  className?: string;
}

export function OrgsEnterpriseTrust({ className }: OrgsEnterpriseTrustProps) {
  const logos = ["Cru", "NAMB", "Exponential", "Redeemer", "Lausanne"];

  return (
    <section className={cn("relative w-full flex flex-col bg-mvmt-surface-dark", className)} >
      {/* Nav */}
      <div className="flex items-center justify-between px-6 sm:px-12 py-4">
        <span className="text-sm font-semibold text-mvmt-on-dark-primary">
          Movemental <span className="text-mvmt-on-dark-muted">at Work</span>
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-mvmt-on-dark-secondary">Log In</span>
          <Link
            href="/contact"
            className="px-4 py-2 text-xs font-semibold rounded-full text-mvmt-cta-text bg-mvmt-accent"
          >
            Contact Sales
          </Link>
        </div>
      </div>

      {/* Trust Logos */}
      <div className="px-6 sm:px-12 lg:px-16 py-12 text-center">
        <p className="text-sm font-bold mb-8 text-mvmt-on-dark-primary">
          Trusted by the best in the business
        </p>
        <div className="flex items-center justify-center gap-12 flex-wrap">
          {logos.map((name) => (
            <span key={name} className="text-lg font-bold opacity-60 text-mvmt-on-dark-primary">
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-6 sm:mx-12 lg:mx-16 border-b border-b-mvmt-border-on-dark"  />

      {/* Testimonial */}
      <div className="px-6 sm:px-12 lg:px-16 py-16 text-center max-w-3xl mx-auto">
        <p className="text-sm font-bold tracking-wider mb-6 text-mvmt-on-dark-primary">
          NAMB
        </p>
        <blockquote
          className="text-xl sm:text-2xl font-medium leading-relaxed mb-6 text-mvmt-on-dark-primary font-mvmt-heading"
        >
          &ldquo;Movemental is great for teams because it&rsquo;s easy to set up and the offerings touch on a vast array of leadership development focus areas, which not only build role-related talents but also enable team members to grow their whole selves beyond work.&rdquo;
        </blockquote>
        <div className="w-6 h-1 mx-auto mb-4 bg-mvmt-accent"  />
        <p className="text-xs text-mvmt-on-dark-muted">
          Church Planting Team at NAMB
        </p>
      </div>

      <div className="mx-6 sm:mx-12 lg:mx-16 border-b border-b-mvmt-border-on-dark"  />

      {/* Bottom CTA Heading */}
      <div className="px-6 sm:px-12 lg:px-16 py-16">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-3xl text-mvmt-on-dark-primary font-mvmt-heading"
        >
          Encourage your team to grow with lessons from the best in the movement
        </h2>
      </div>
    </section>
  );
}

OrgsEnterpriseTrust.displayName = "OrgsEnterpriseTrust";
