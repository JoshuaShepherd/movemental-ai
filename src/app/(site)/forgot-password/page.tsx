"use client";

import Link from "next/link";
import * as React from "react";
import { Suspense } from "react";

import { Container } from "@/components/primitives/container";
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
    <Container width="reading" className="py-20 md:py-28">
      <div className="max-w-xl">
        <p className="mb-6 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
          Reset password
        </p>
        <h1 className="font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl">
          Forgot your password?
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Enter the email for your Movemental workspace. If an account exists, we will send reset instructions.
        </p>

        <form onSubmit={submit} className="mt-10 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
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
              className="w-full rounded-lg bg-background px-4 py-3 text-base text-foreground outline-none ring-1 ring-border transition-shadow placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
            />
          </label>
          <Button type="submit" variant="primary" disabled={status === "loading" || status === "sent"}>
            {status === "sent" ? "Email sent" : status === "loading" ? "Sending…" : "Send reset link"}
          </Button>
          {status === "error" ? (
            <p className="text-sm text-muted-foreground" role="alert">
              Could not send reset email. Try again in a moment.
            </p>
          ) : null}
          {status === "sent" ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Check your inbox for a reset link. If it does not arrive within a few minutes, check spam or contact
              your administrator — your email may not be on file yet.
            </p>
          ) : null}
        </form>

        <p className="mt-12 text-sm text-muted-foreground">
          <Link href="/login" className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
            Back to sign in
          </Link>
        </p>
      </div>
    </Container>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <Container width="reading" className="py-20">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </Container>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  );
}
