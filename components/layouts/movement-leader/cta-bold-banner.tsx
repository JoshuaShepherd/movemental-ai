"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface CtaBoldBannerProps {
  className?: string;
}

export function CtaBoldBanner({ className }: CtaBoldBannerProps) {
  const groups = [
    { region: "North America", subtitle: "Movemental for US Leaders" },
    { region: "Southeast Asia", subtitle: "Movemental for Filipino Leaders" },
    { region: "Europe", subtitle: "Movemental for European Leaders" },
  ];

  const footerColumns = [
    { title: "Features", links: ["Assessment Builder", "Course Creator", "AI Coaching", "Resource Library"] },
    { title: "Explore", links: ["Training Ideas", "Custom Templates", "Font Pairing", "Color Palettes"] },
    { title: "Community", links: ["Online Communities", "Movement Creators", "Global Network", "Developers"] },
    { title: "Download", links: ["iOS", "Android", "Windows", "Mac"] },
    { title: "Company", links: ["About", "Newsroom", "Careers", "Sustainability"] },
  ];

  return (
    <section className={cn("relative w-full flex flex-col bg-mvmt-surface-light", className)} >
      {/* Nav */}
      <div className="flex items-center gap-6 px-6 sm:px-12 py-4 border-b border-b-mvmt-border-light">
        <span className="text-sm font-semibold text-mvmt-text-primary">Join the community</span>
        <span className="text-sm text-mvmt-text-secondary">Overview</span>
        <span
          className="text-sm font-medium px-3 py-1 rounded-full text-mvmt-on-dark-primary bg-mvmt-surface-dark"
        >
          Leaders
        </span>
      </div>

      {/* Community Cards */}
      <div className="px-6 sm:px-12 lg:px-16 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
          {groups.map((g) => (
            <div key={g.region}>
              <div
                className="aspect-[3/2] rounded-lg mb-3"
                style={{ backgroundColor: "var(--mvmt-border-light)" }}
              />
              <p className="text-2xs font-bold uppercase tracking-widest mb-1 text-mvmt-accent">
                Community Group
              </p>
              <p className="text-sm font-bold text-mvmt-text-primary">{g.region}</p>
              <p className="text-xs text-mvmt-text-secondary">{g.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bold Banner */}
      <div className="px-6 sm:px-12 lg:px-16 pb-12">
        <div
          className="rounded-2xl px-8 sm:px-12 py-12 md:py-16 relative overflow-hidden bg-mvmt-surface-dark"
        >
          <div className="relative z-10 max-w-xl">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-mvmt-on-dark-primary font-mvmt-heading"
            >
              Educate the world. Earn with Movemental.
            </h2>
            <p className="text-sm leading-relaxed mb-6 text-mvmt-on-dark-secondary">
              Education Creators is a program within Movemental that allows leaders to create, publish and earn from their educational templates on Movemental.
            </p>
            <Link
              href="/creators"
              className="inline-block px-6 py-3 text-sm font-medium rounded-lg text-mvmt-cta-text bg-mvmt-accent"
            >
              Learn more
            </Link>
          </div>
          {/* Decorative element */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block opacity-20">
            <svg width="200" height="200" viewBox="0 0 200 200" className="text-mvmt-on-dark-muted">
              <path d="M100,20 L160,60 L160,140 L100,180 L40,140 L40,60 Z" fill="none" stroke="currentColor" strokeWidth="3" />
              <path d="M100,40 L140,70 L140,130 L100,160 L60,130 L60,70 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 sm:px-12 lg:px-16 py-10 border-t border-t-mvmt-border-light">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-bold mb-3 text-mvmt-text-primary">{col.title}</p>
              <div className="space-y-2">
                {col.links.map((link) => (
                  <p key={link} className="text-xs text-mvmt-text-secondary">{link}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

CtaBoldBanner.displayName = "CtaBoldBanner";
