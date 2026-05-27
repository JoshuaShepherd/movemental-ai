"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthDarkMinimalProps {
  className?: string;
}

export function AuthDarkMinimal({ className }: AuthDarkMinimalProps) {
  return (
    <section className={cn("relative w-full min-h-screen flex items-center justify-center px-6 py-16", className)}
      style={{ background: "var(--mvmt-surface-dark)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-mvmt-on-dark-primary font-mvmt-heading">
            Movemental
          </h1>
          <p className="text-sm mt-2 text-mvmt-on-dark-secondary">
            Sign in to continue
          </p>
        </div>

        {/* Email */}
        <label className="block mb-4">
          <span className="text-xs font-medium mb-1.5 block text-mvmt-on-dark-secondary">Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors bg-mvmt-surface-dark-elevated border-mvmt-border-dark text-mvmt-on-dark-primary placeholder:text-mvmt-on-dark-muted focus:border-mvmt-accent"
          />
        </label>

        {/* Password */}
        <label className="block mb-2">
          <span className="text-xs font-medium mb-1.5 block text-mvmt-on-dark-secondary">Password</span>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors bg-mvmt-surface-dark-elevated border-mvmt-border-dark text-mvmt-on-dark-primary placeholder:text-mvmt-on-dark-muted focus:border-mvmt-accent"
          />
        </label>

        <div className="flex justify-end mb-6">
          <Link href="/forgot-password" className="text-xs text-mvmt-accent hover:underline">
            Forgot password?
          </Link>
        </div>

        <button className="w-full py-2.5 text-sm font-semibold rounded-md transition-colors text-mvmt-cta-text bg-mvmt-accent hover:bg-mvmt-accent-hover">
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-mvmt-border-dark" />
          <span className="text-xs text-mvmt-on-dark-muted">or</span>
          <div className="flex-1 h-px bg-mvmt-border-dark" />
        </div>

        <button className="w-full py-2.5 text-sm font-medium rounded-md border transition-colors mb-3 border-mvmt-border-dark text-mvmt-on-dark-primary bg-mvmt-surface-dark-elevated hover:opacity-90">
          Continue with Google
        </button>
        <button className="w-full py-2.5 text-sm font-medium rounded-md border transition-colors border-mvmt-border-dark text-mvmt-on-dark-primary bg-mvmt-surface-dark-elevated hover:opacity-90">
          Continue with GitHub
        </button>

        <p className="text-xs mt-8 text-center text-mvmt-on-dark-muted">
          Don&rsquo;t have an account?{" "}
          <Link href="/signup" className="text-mvmt-accent hover:underline">Sign up</Link>
        </p>
      </div>
    </section>
  );
}

AuthDarkMinimal.displayName = "AuthDarkMinimal";
