"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthTabbedFormProps {
  className?: string;
}

export function AuthTabbedForm({ className }: AuthTabbedFormProps) {
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <section className={cn("relative w-full min-h-screen flex items-center justify-center px-6 py-16", className)}
      style={{ background: "var(--mvmt-surface-light-muted)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-[var(--mvmt-text-primary)] font-mvmt-heading">
            Movemental
          </h1>
        </div>

        {/* Card */}
        <div className="rounded-xl overflow-hidden border shadow-sm bg-[var(--mvmt-surface-light)] border-[var(--mvmt-border-light)]">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-[var(--mvmt-border-light)]">
            <button
              onClick={() => setTab("login")}
              className={cn(
                "py-3 text-sm font-semibold transition-colors",
                tab === "login"
                  ? "text-[var(--mvmt-accent)] border-b-2 border-[var(--mvmt-accent)]"
                  : "text-[var(--mvmt-text-muted)] hover:text-[var(--mvmt-text-secondary)]"
              )}
            >
              Log In
            </button>
            <button
              onClick={() => setTab("signup")}
              className={cn(
                "py-3 text-sm font-semibold transition-colors",
                tab === "signup"
                  ? "text-[var(--mvmt-accent)] border-b-2 border-[var(--mvmt-accent)]"
                  : "text-[var(--mvmt-text-muted)] hover:text-[var(--mvmt-text-secondary)]"
              )}
            >
              Sign Up
            </button>
          </div>

          <div className="p-8">
            {tab === "signup" && (
              <label className="block mb-4">
                <span className="text-xs font-medium mb-1.5 block text-[var(--mvmt-text-secondary)]">Display name</span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors bg-[var(--mvmt-surface-light)] border-[var(--mvmt-border-light)] text-[var(--mvmt-text-primary)] placeholder:text-[var(--mvmt-text-muted)] focus:border-[var(--mvmt-accent)]"
                />
              </label>
            )}

            <label className="block mb-4">
              <span className="text-xs font-medium mb-1.5 block text-[var(--mvmt-text-secondary)]">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors bg-[var(--mvmt-surface-light)] border-[var(--mvmt-border-light)] text-[var(--mvmt-text-primary)] placeholder:text-[var(--mvmt-text-muted)] focus:border-[var(--mvmt-accent)]"
              />
            </label>

            <label className="block mb-2">
              <span className="text-xs font-medium mb-1.5 block text-[var(--mvmt-text-secondary)]">Password</span>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors bg-[var(--mvmt-surface-light)] border-[var(--mvmt-border-light)] text-[var(--mvmt-text-primary)] placeholder:text-[var(--mvmt-text-muted)] focus:border-[var(--mvmt-accent)]"
              />
            </label>

            {tab === "login" && (
              <div className="flex justify-end mb-4">
                <Link href="/forgot-password" className="text-xs text-[var(--mvmt-accent)] hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}
            {tab === "signup" && <div className="mb-4" />}

            <button className="w-full py-2.5 text-sm font-semibold rounded-md transition-colors text-[var(--mvmt-cta-text)] bg-[var(--mvmt-accent)] hover:bg-[var(--mvmt-accent-hover)]">
              {tab === "login" ? "Log In" : "Create Account"}
            </button>
          </div>
        </div>

        <p className="text-2xs mt-4 text-center text-[var(--mvmt-text-muted)]">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline">Terms of Service</Link> and{" "}
          <Link href="/privacy" className="underline">Privacy Policy</Link>.
        </p>
      </div>
    </section>
  );
}

AuthTabbedForm.displayName = "AuthTabbedForm";
