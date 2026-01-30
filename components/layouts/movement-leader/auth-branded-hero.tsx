"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthBrandedHeroProps {
  className?: string;
}

export function AuthBrandedHero({ className }: AuthBrandedHeroProps) {
  return (
    <section className={cn("relative w-full min-h-screen grid md:grid-cols-2", className)}>
      {/* Left: Brand Story */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-16 bg-[var(--mvmt-surface-dark)]">
        <p className="text-xs font-bold tracking-widest uppercase mb-4 text-[var(--mvmt-accent)]">
          Movemental
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight text-[var(--mvmt-on-dark-primary)] font-mvmt-heading">
          Tools built for the people building movements
        </h2>
        <p className="text-sm leading-relaxed mb-10 text-[var(--mvmt-on-dark-secondary)]">
          Join thousands of movement leaders using AI-powered assessments, curated content, and proven frameworks to multiply their impact.
        </p>

        <div className="space-y-4">
          {["Personalized fit-check assessments", "Curated content from leading practitioners", "AI-powered research and insights"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-2xs shrink-0 text-[var(--mvmt-cta-text)] bg-[var(--mvmt-accent)]">
                ✓
              </div>
              <p className="text-sm text-[var(--mvmt-on-dark-secondary)]">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-16 bg-[var(--mvmt-surface-light)]">
        <div className="max-w-sm w-full mx-auto">
          <h1 className="text-2xl font-bold mb-2 text-[var(--mvmt-text-primary)] font-mvmt-heading">
            Create your account
          </h1>
          <p className="text-sm mb-8 text-[var(--mvmt-text-secondary)]">
            Start your free trial — no credit card required
          </p>

          {/* Name */}
          <label className="block mb-4">
            <span className="text-xs font-medium mb-1.5 block text-[var(--mvmt-text-primary)]">Full name</span>
            <input
              type="text"
              placeholder="Brad Brisco"
              className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors bg-[var(--mvmt-surface-light)] border-[var(--mvmt-border-light)] text-[var(--mvmt-text-primary)] placeholder:text-[var(--mvmt-text-muted)] focus:border-[var(--mvmt-accent)]"
            />
          </label>

          {/* Email */}
          <label className="block mb-4">
            <span className="text-xs font-medium mb-1.5 block text-[var(--mvmt-text-primary)]">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors bg-[var(--mvmt-surface-light)] border-[var(--mvmt-border-light)] text-[var(--mvmt-text-primary)] placeholder:text-[var(--mvmt-text-muted)] focus:border-[var(--mvmt-accent)]"
            />
          </label>

          {/* Password */}
          <label className="block mb-6">
            <span className="text-xs font-medium mb-1.5 block text-[var(--mvmt-text-primary)]">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors bg-[var(--mvmt-surface-light)] border-[var(--mvmt-border-light)] text-[var(--mvmt-text-primary)] placeholder:text-[var(--mvmt-text-muted)] focus:border-[var(--mvmt-accent)]"
            />
          </label>

          <button className="w-full py-2.5 text-sm font-semibold rounded-md transition-colors text-[var(--mvmt-cta-text)] bg-[var(--mvmt-accent)] hover:bg-[var(--mvmt-accent-hover)]">
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[var(--mvmt-border-light)]" />
            <span className="text-xs text-[var(--mvmt-text-muted)]">or</span>
            <div className="flex-1 h-px bg-[var(--mvmt-border-light)]" />
          </div>

          <button className="w-full py-2.5 text-sm font-medium rounded-md border transition-colors border-[var(--mvmt-border-light)] text-[var(--mvmt-text-primary)] hover:bg-[var(--mvmt-surface-light-muted)]">
            Continue with Google
          </button>

          <p className="text-xs mt-8 text-center text-[var(--mvmt-text-muted)]">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--mvmt-accent)] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

AuthBrandedHero.displayName = "AuthBrandedHero";
