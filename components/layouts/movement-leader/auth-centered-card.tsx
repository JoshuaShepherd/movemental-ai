"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthCenteredCardProps {
  className?: string;
}

export function AuthCenteredCard({ className }: AuthCenteredCardProps) {
  return (
    <section className={cn("relative w-full min-h-screen flex items-center justify-center px-6 py-16", className)}
      style={{ background: "linear-gradient(135deg, var(--mvmt-surface-light-muted) 0%, var(--mvmt-surface-light) 50%, var(--mvmt-surface-light-muted) 100%)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center bg-mvmt-accent">
            <span className="text-lg font-bold text-mvmt-cta-text">M</span>
          </div>
          <h1 className="text-xl font-bold text-mvmt-text-primary font-mvmt-heading">
            Sign in to Movemental
          </h1>
        </div>

        {/* Card */}
        <div className="rounded-xl p-8 border shadow-sm bg-mvmt-surface-light border-mvmt-border-light">
          {/* Social Buttons */}
          <button className="w-full py-2.5 text-sm font-medium rounded-lg border transition-colors mb-3 border-mvmt-border-light text-mvmt-text-primary hover:bg-mvmt-surface-light-muted">
            Continue with Google
          </button>
          <button className="w-full py-2.5 text-sm font-medium rounded-lg border transition-colors mb-3 border-mvmt-border-light text-mvmt-text-primary hover:bg-mvmt-surface-light-muted">
            Continue with Apple
          </button>
          <button className="w-full py-2.5 text-sm font-medium rounded-lg border transition-colors border-mvmt-border-light text-mvmt-text-primary hover:bg-mvmt-surface-light-muted">
            Continue with Microsoft
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-mvmt-border-light" />
            <span className="text-xs text-mvmt-text-muted">or</span>
            <div className="flex-1 h-px bg-mvmt-border-light" />
          </div>

          {/* Email */}
          <label className="block mb-4">
            <span className="text-xs font-medium mb-1.5 block text-mvmt-text-secondary">Email address</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 text-sm rounded-lg border outline-none transition-colors bg-mvmt-surface-light border-mvmt-border-light text-mvmt-text-primary placeholder:text-mvmt-text-muted focus:border-mvmt-accent"
            />
          </label>

          {/* Password */}
          <label className="block mb-6">
            <span className="text-xs font-medium mb-1.5 block text-mvmt-text-secondary">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2.5 text-sm rounded-lg border outline-none transition-colors bg-mvmt-surface-light border-mvmt-border-light text-mvmt-text-primary placeholder:text-mvmt-text-muted focus:border-mvmt-accent"
            />
          </label>

          <button className="w-full py-2.5 text-sm font-semibold rounded-lg transition-colors text-mvmt-cta-text bg-mvmt-accent hover:bg-mvmt-accent-hover">
            Continue
          </button>
        </div>

        <p className="text-xs mt-6 text-center text-mvmt-text-muted">
          Don&rsquo;t have an account?{" "}
          <Link href="/signup" className="text-mvmt-accent hover:underline">Sign up</Link>
        </p>

        <p className="text-2xs mt-4 text-center text-mvmt-text-muted">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline">Terms</Link> and{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </section>
  );
}

AuthCenteredCard.displayName = "AuthCenteredCard";
