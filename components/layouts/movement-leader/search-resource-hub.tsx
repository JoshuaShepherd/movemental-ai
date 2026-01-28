"use client";

import { cn } from "@/lib/utils";

interface SearchResourceHubProps {
  className?: string;
}

export function SearchResourceHub({ className }: SearchResourceHubProps) {
  const navLinks = ["Home", "Help center", "Academy", "Community", "Developers"];
  const paths = [
    "Getting Started",
    "Building Leaders",
    "Scaling Movements",
    "Advanced Strategy",
  ];

  return (
    <section className={cn("relative w-full flex flex-col", className)} style={{ backgroundColor: "var(--mvmt-surface-light)" }}>
      {/* Top Utility Bar */}
      <div className="flex items-center justify-between px-6 sm:px-12 py-2 text-xs" style={{ backgroundColor: "var(--mvmt-surface-dark)" }}>
        <div className="flex items-center gap-4">
          {["Home", "Help center", "Enterprise", "Partners"].map((item) => (
            <span key={item} style={{ color: "var(--mvmt-on-dark-secondary)" }}>{item}</span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span style={{ color: "var(--mvmt-on-dark-secondary)" }}>● All systems operational</span>
          <span style={{ color: "var(--mvmt-on-dark-muted)" }}>🔍</span>
          <span style={{ color: "var(--mvmt-on-dark-secondary)" }}>Log in</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex items-center justify-between px-6 sm:px-12 py-3" style={{ borderBottom: "1px solid var(--mvmt-border-light)" }}>
        <div className="flex items-center gap-6">
          <div>
            <p className="text-sm font-bold" style={{ color: "var(--mvmt-text-primary)" }}>Movemental</p>
            <p className="text-[10px] tracking-widest uppercase" style={{ color: "var(--mvmt-text-muted)" }}>THE POWER UP</p>
          </div>
          {["Help center", "Academy", "Community", "Developers"].map((item) => (
            <span key={item} className="text-sm hidden sm:inline" style={{ color: "var(--mvmt-text-secondary)" }}>{item}</span>
          ))}
        </div>
        <button
          className="text-sm px-4 py-2 rounded-full"
          style={{ backgroundColor: "var(--mvmt-surface-dark)", color: "var(--mvmt-on-dark-primary)" }}
        >
          Contact us
        </button>
      </div>

      {/* Breadcrumb */}
      <div className="px-6 sm:px-12 py-2">
        <span className="text-xs" style={{ color: "var(--mvmt-text-muted)" }}>Home</span>
        <span className="text-xs mx-1" style={{ color: "var(--mvmt-text-muted)" }}>/</span>
        <span className="text-xs font-medium" style={{ color: "var(--mvmt-text-primary)" }}>Customer resources</span>
      </div>

      {/* Hero Section */}
      <div
        className="relative px-6 sm:px-12 lg:px-16 py-16 text-center overflow-hidden"
        style={{ background: "var(--mvmt-gradient-hero-brand)" }}
      >
        {/* Floating Avatars */}
        <div className="absolute left-12 top-12 hidden md:block">
          <div className="w-16 h-16 rounded-full mb-2" style={{ backgroundColor: "var(--mvmt-border-medium)", opacity: 0.5 }} />
          <div className="w-10 h-10 rounded-full ml-4" style={{ backgroundColor: "var(--mvmt-border-medium)", opacity: 0.4 }} />
        </div>
        <div className="absolute right-12 top-8 hidden md:block">
          <div className="w-20 h-20 rounded-full mb-2" style={{ backgroundColor: "var(--mvmt-border-medium)", opacity: 0.5 }} />
          <div className="w-12 h-12 rounded-full ml-8 mt-2" style={{ backgroundColor: "var(--mvmt-border-medium)", opacity: 0.4 }} />
        </div>

        <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: "var(--mvmt-text-secondary)" }}>
          Learn. Connect. Grow.
        </p>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          The Movemental Power Up
        </h1>
        <p className="text-sm mb-8 max-w-lg mx-auto" style={{ color: "var(--mvmt-text-secondary)" }}>
          Welcome to your all-in-one success center. Find answers, resources, and community to keep you growing.
        </p>
        <div
          className="w-full max-w-lg mx-auto flex items-center gap-3 px-4 py-3 rounded-lg"
          style={{ backgroundColor: "var(--mvmt-surface-light)", border: "1px solid var(--mvmt-border-light)" }}
        >
          <span style={{ color: "var(--mvmt-text-muted)" }}>🔍</span>
          <input
            type="text"
            placeholder="Search by topic or keyword"
            className="flex-1 text-sm outline-none"
            style={{ color: "var(--mvmt-text-primary)", backgroundColor: "transparent" }}
            readOnly
          />
        </div>
      </div>

      {/* Power Paths Section */}
      <div className="px-6 sm:px-12 lg:px-16 py-12 text-center">
        <h2
          className="text-2xl sm:text-3xl font-semibold mb-2"
          style={{ color: "var(--mvmt-text-primary)", fontFamily: "var(--mvmt-font-heading)" }}
        >
          Choose a Power Path: resources to guide your growth
        </h2>
        <p className="text-sm mb-10" style={{ color: "var(--mvmt-text-secondary)" }}>
          Power Paths meet you where you are and guide you on your journey towards your goals.
        </p>
        <div className="flex justify-center gap-8">
          {paths.map((p) => (
            <div key={p} className="flex flex-col items-center">
              <div
                className="w-32 h-32 rounded-full mb-3"
                style={{ backgroundColor: "var(--mvmt-surface-light-muted)", border: "1px solid var(--mvmt-border-light)" }}
              />
              <p className="text-sm font-medium" style={{ color: "var(--mvmt-text-primary)" }}>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

SearchResourceHub.displayName = "SearchResourceHub";
