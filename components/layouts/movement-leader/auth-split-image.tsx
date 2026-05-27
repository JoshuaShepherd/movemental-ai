"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthSplitImageProps {
  className?: string;
}

export function AuthSplitImage({ className }: AuthSplitImageProps) {
  return (
    <section className={cn("relative w-full min-h-screen grid md:grid-cols-2", className)}>
      {/* Left: Form */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16 bg-mvmt-surface-light">
        <div className="max-w-sm w-full mx-auto">
          <h1 className="text-2xl font-bold mb-2 text-mvmt-text-primary font-mvmt-heading">
            Welcome back
          </h1>
          <p className="text-sm mb-8 text-mvmt-text-secondary">
            Sign in to your Movemental account
          </p>

          {/* Email */}
          <label className="block mb-4">
            <span className="text-xs font-medium uppercase tracking-wider mb-1.5 block text-mvmt-text-primary">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors bg-mvmt-surface-light border-mvmt-border-light text-mvmt-text-primary placeholder:text-mvmt-text-muted focus:border-mvmt-accent"
            />
          </label>

          {/* Password */}
          <label className="block mb-2">
            <span className="text-xs font-medium uppercase tracking-wider mb-1.5 block text-mvmt-text-primary">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2.5 text-sm rounded-md border outline-none transition-colors bg-mvmt-surface-light border-mvmt-border-light text-mvmt-text-primary placeholder:text-mvmt-text-muted focus:border-mvmt-accent"
            />
          </label>

          <div className="flex justify-end mb-6">
            <Link href="/forgot-password" className="text-xs text-mvmt-accent hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button className="w-full py-2.5 text-sm font-semibold rounded-md transition-colors text-mvmt-cta-text bg-mvmt-cta-bg hover:opacity-90">
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-mvmt-border-light" />
            <span className="text-xs text-mvmt-text-muted">or</span>
            <div className="flex-1 h-px bg-mvmt-border-light" />
          </div>

          {/* Social */}
          <button className="w-full py-2.5 text-sm font-medium rounded-md border transition-colors mb-3 border-mvmt-border-light text-mvmt-text-primary bg-mvmt-surface-light hover:bg-mvmt-surface-light-muted">
            Continue with Google
          </button>
          <button className="w-full py-2.5 text-sm font-medium rounded-md border transition-colors border-mvmt-border-light text-mvmt-text-primary bg-mvmt-surface-light hover:bg-mvmt-surface-light-muted">
            Continue with Apple
          </button>

          <p className="text-xs mt-8 text-center text-mvmt-text-muted">
            Don&rsquo;t have an account?{" "}
            <Link href="/signup" className="text-mvmt-accent hover:underline">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Right: Image placeholder */}
      <div className="hidden md:flex items-center justify-center bg-mvmt-surface-light-muted">
        <div className="text-center px-12">
          <div className="w-24 h-24 rounded-xl mx-auto mb-6 flex items-center justify-center bg-mvmt-surface-dark">
            <span className="text-3xl font-bold text-mvmt-on-dark-primary">M</span>
          </div>
          <p className="text-lg font-semibold mb-2 text-mvmt-text-primary font-mvmt-heading">Movemental</p>
          <p className="text-sm text-mvmt-text-secondary">Tools for movement leaders</p>
        </div>
      </div>
    </section>
  );
}

AuthSplitImage.displayName = "AuthSplitImage";
