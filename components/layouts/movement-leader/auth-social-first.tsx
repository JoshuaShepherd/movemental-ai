"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthSocialFirstProps {
  className?: string;
}

export function AuthSocialFirst({ className }: AuthSocialFirstProps) {
  return (
    <section className={cn("relative w-full min-h-screen flex items-center justify-center px-6 py-16", className)}
      style={{ background: "var(--mvmt-surface-light)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-mvmt-text-primary font-mvmt-heading">
            Log in
          </h1>
          <p className="text-sm mt-1 text-mvmt-text-secondary">
            to continue to Movemental
          </p>
        </div>

        {/* Social Buttons — prominent */}
        <div className="space-y-2.5 mb-6">
          <button className="w-full py-3 text-sm font-medium rounded-md border transition-colors flex items-center justify-center gap-3 border-mvmt-border-light text-mvmt-text-primary hover:bg-mvmt-surface-light-muted">
            <span className="text-base">G</span> Continue with Google
          </button>
          <button className="w-full py-3 text-sm font-medium rounded-md border transition-colors flex items-center justify-center gap-3 border-mvmt-border-light text-mvmt-text-primary hover:bg-mvmt-surface-light-muted">
            <span className="text-base">🍎</span> Continue with Apple
          </button>
          <button className="w-full py-3 text-sm font-medium rounded-md border transition-colors flex items-center justify-center gap-3 border-mvmt-border-light text-mvmt-text-primary hover:bg-mvmt-surface-light-muted">
            <span className="text-base">✉</span> Continue with Email
          </button>
        </div>

        {/* Collapsed email form */}
        <div className="pt-6 border-t border-mvmt-border-light">
          <label className="block mb-4">
            <span className="text-xs font-medium mb-1.5 block text-mvmt-text-secondary">
              Or enter your email
            </span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors bg-mvmt-surface-light border-mvmt-border-light text-mvmt-text-primary placeholder:text-mvmt-text-muted focus:border-mvmt-accent"
            />
          </label>

          <button className="w-full py-2.5 text-sm font-semibold rounded-md transition-colors text-mvmt-cta-text bg-mvmt-cta-bg hover:opacity-90">
            Continue with Email
          </button>
        </div>

        <p className="text-xs mt-8 text-center text-mvmt-text-muted">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline">Terms</Link> &amp;{" "}
          <Link href="/privacy" className="underline">Privacy</Link>.
        </p>

        <p className="text-xs mt-3 text-center text-mvmt-text-muted">
          New to Movemental?{" "}
          <Link href="/signup" className="text-mvmt-accent hover:underline">Create account</Link>
        </p>
      </div>
    </section>
  );
}

AuthSocialFirst.displayName = "AuthSocialFirst";
