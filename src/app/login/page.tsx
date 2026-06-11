"use client";

import Link from "next/link";
import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { sanitizeAuthRedirectNext } from "@/lib/auth/safe-redirect";
import { createClient } from "@/lib/supabase/client";

function mapSignInErrorMessage(message: string | undefined): string {
  if (!message) return "Could not sign in. Try again.";
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Email or password is incorrect.";
  if (m.includes("email not confirmed")) return "Confirm your email before signing in.";
  if (m.includes("too many requests")) return "Too many attempts. Wait a moment and try again.";
  return "Could not sign in. Try again.";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next");
  const next = React.useMemo(() => sanitizeAuthRedirectNext(nextParam), [nextParam]);
  const reason = searchParams.get("reason");
  const err = searchParams.get("error");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setStatus("loading");
    setErrorMessage(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        setErrorMessage(mapSignInErrorMessage(error.message));
        setStatus("error");
        return;
      }
      router.replace(next);
    } catch {
      setErrorMessage("Could not sign in. Try again.");
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 md:py-28">
      <p className="mb-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
        Sign in · Movemental
      </p>
      <h1 className="text-4xl leading-tight md:text-5xl">Welcome back.</h1>
      <p className="mt-8 text-lg leading-relaxed text-foreground">
        Staff sign-in for agent runtime and workspace tools.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Use the email and password for your Movemental workspace.
      </p>

      {reason === "no_org" ? (
        <p className="mt-6 border-l-2 border-[var(--color-ink-band-blue)] bg-card px-5 py-4 text-sm leading-relaxed">
          No organization membership was found for this account yet.{" "}
          <a
            href="mailto:josh@movemental.ai"
            className="text-[var(--color-ink-band-blue)] underline underline-offset-4"
          >
            Reach out to us
          </a>
          .
        </p>
      ) : null}
      {err === "auth" ? (
        <p className="mt-6 border-l-2 border-[var(--color-ink-band-blue)] bg-card px-5 py-4 text-sm leading-relaxed">
          Authentication did not complete. Sign in again below.
        </p>
      ) : null}

      <form onSubmit={submit} className="mt-12 flex flex-col gap-5">
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
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none transition-shadow placeholder:text-muted-foreground/60 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
            Password
          </span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none transition-shadow focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Signing in…" : "Sign in"}
          </Button>
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:text-foreground"
          >
            Forgot password?
          </Link>
        </div>
        {status === "error" && errorMessage ? (
          <p className="text-sm text-muted-foreground" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>

      <nav
        aria-label="Sign-in help"
        className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8 text-sm text-muted-foreground"
      >
        <Link href="/signup" className="transition-colors hover:text-foreground">
          First time? Check your enrollment email
        </Link>
        <span aria-hidden className="text-muted-foreground/40">
          ·
        </span>
        <Link href="/agent" className="transition-colors hover:text-foreground">
          Back to the agent room
        </Link>
        <span aria-hidden className="text-muted-foreground/40">
          ·
        </span>
        <a
          href="mailto:josh@movemental.ai"
          className="transition-colors hover:text-foreground"
        >
          Need help signing in?
        </a>
      </nav>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-xl px-4 py-20">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
