"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthMagicLinkProps {
  className?: string;
}

export function AuthMagicLink({ className }: AuthMagicLinkProps) {
  return (
    <section className={cn("relative w-full min-h-screen flex items-center justify-center px-6 py-16", className)}
      style={{ background: "var(--mvmt-surface-dark)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center bg-[var(--mvmt-accent)]">
            <span className="text-lg font-bold text-[var(--mvmt-cta-text)]">M</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--mvmt-on-dark-primary)] font-mvmt-heading">
            Sign in with magic link
          </h1>
          <p className="text-sm mt-2 text-[var(--mvmt-on-dark-secondary)]">
            We&rsquo;ll email you a link — no password needed
          </p>
        </div>

        {/* Email only */}
        <label className="block mb-6">
          <span className="text-xs font-medium mb-1.5 block text-[var(--mvmt-on-dark-secondary)]">Email address</span>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors bg-[var(--mvmt-surface-dark-elevated)] border-[var(--mvmt-border-dark)] text-[var(--mvmt-on-dark-primary)] placeholder:text-[var(--mvmt-on-dark-muted)] focus:border-[var(--mvmt-accent)]"
          />
        </label>

        <button className="w-full py-2.5 text-sm font-semibold rounded-md transition-colors text-[var(--mvmt-cta-text)] bg-[var(--mvmt-accent)] hover:bg-[var(--mvmt-accent-hover)]">
          Send Magic Link
        </button>

        {/* Info */}
        <div className="mt-8 p-4 rounded-lg border border-[var(--mvmt-border-dark)] bg-[var(--mvmt-surface-dark-elevated)]">
          <p className="text-xs leading-relaxed text-[var(--mvmt-on-dark-muted)]">
            Check your inbox for an email with a sign-in link. The link expires in 10 minutes. If you don&rsquo;t see it, check your spam folder.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[var(--mvmt-border-dark)]" />
          <span className="text-xs text-[var(--mvmt-on-dark-muted)]">or sign in with</span>
          <div className="flex-1 h-px bg-[var(--mvmt-border-dark)]" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="py-2.5 text-sm font-medium rounded-md border transition-colors border-[var(--mvmt-border-dark)] text-[var(--mvmt-on-dark-primary)] bg-[var(--mvmt-surface-dark-elevated)] hover:opacity-90">
            Google
          </button>
          <button className="py-2.5 text-sm font-medium rounded-md border transition-colors border-[var(--mvmt-border-dark)] text-[var(--mvmt-on-dark-primary)] bg-[var(--mvmt-surface-dark-elevated)] hover:opacity-90">
            Password
          </button>
        </div>

        <p className="text-xs mt-8 text-center text-[var(--mvmt-on-dark-muted)]">
          New here?{" "}
          <Link href="/signup" className="text-[var(--mvmt-accent)] hover:underline">Create account</Link>
        </p>
      </div>
    </section>
  );
}

AuthMagicLink.displayName = "AuthMagicLink";
