"use client";

import Link from "next/link";
import * as React from "react";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const RESET_NEXT = "/auth/update-password";

function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(RESET_NEXT)}`;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });
      if (error) throw error;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 md:py-28">
      <p className="mb-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
        Reset password
      </p>
      <h1 className="text-4xl leading-tight md:text-5xl">Forgot your password?</h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        Enter the email for your Movemental workspace. If an account exists, we will send reset
        instructions.
      </p>

      <form onSubmit={submit} className="mt-10 flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
            Email address
          </span>
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="name@organization.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "sent"}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none transition-shadow placeholder:text-muted-foreground/60 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          />
        </label>
        <Button type="submit" disabled={status === "loading" || status === "sent"}>
          {status === "sent" ? "Email sent" : status === "loading" ? "Sending…" : "Send reset link"}
        </Button>
        {status === "error" ? (
          <p className="text-sm text-muted-foreground" role="alert">
            Could not send reset email. Try again in a moment.
          </p>
        ) : null}
        {status === "sent" ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            Check your inbox for a reset link. If it does not arrive within a few minutes, check spam
            or contact your administrator.
          </p>
        ) : null}
      </form>

      <p className="mt-12 text-sm text-muted-foreground">
        <Link
          href="/login"
          className="text-[var(--color-ink-band-blue)] underline underline-offset-4"
        >
          Back to sign in
        </Link>
      </p>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-xl px-4 py-20">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  );
}
