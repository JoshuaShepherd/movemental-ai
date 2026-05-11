"use client";

import Link from "next/link";
import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Container } from "@/components/primitives/container";
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
    <Container width="reading" className="py-20 md:py-28">
      <div className="max-w-xl">
        <p className="mb-6 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
          Sign in · Movemental Dashboard
        </p>
        <h1 className="font-serif-display text-5xl italic leading-tight tracking-tight text-foreground md:text-6xl">
          Welcome back.
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-foreground">
          Your dashboard is where the work lives — your Field Guide, your Sandbox phases, your recipe
          library, and your Future Plan.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Sign in with the email and password for your Movemental workspace.
        </p>

        {reason === "no_org" ? (
          <p className="mt-6 border-l-2 border-pathway-accent bg-section/60 px-5 py-4 text-sm leading-relaxed text-foreground">
            No organization membership was found for this account yet. If you believe this is a mistake,{" "}
            <Link href="/contact" className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
              reach out to us
            </Link>
            .
          </p>
        ) : null}
        {err === "auth" ? (
          <p className="mt-6 border-l-2 border-pathway-accent bg-section/60 px-5 py-4 text-sm leading-relaxed text-foreground">
            Authentication did not complete. Sign in again below.
          </p>
        ) : null}

        <form onSubmit={submit} className="mt-12 flex flex-col gap-5">
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
              className="w-full rounded-lg bg-background px-4 py-3 text-base text-foreground outline-none ring-1 ring-border transition-shadow placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Password
            </span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-background px-4 py-3 text-base text-foreground outline-none ring-1 ring-border transition-shadow placeholder:text-muted-foreground/60 focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button type="submit" variant="primary" disabled={status === "loading"}>
              {status === "loading" ? "Signing in…" : "Sign in"}
            </Button>
            <Link
              href="/forgot-password"
              className="text-sm text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/40"
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
          <Link
            href="/field-guides/safety"
            className="transition-colors hover:text-foreground"
          >
            Not yet a customer? Read the field guide.
          </Link>
          <span aria-hidden className="text-muted-foreground/40">
            ·
          </span>
          <Link
            href="/contact"
            className="transition-colors hover:text-foreground"
          >
            Need help signing in?
          </Link>
          <span aria-hidden className="text-muted-foreground/40">
            ·
          </span>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground"
          >
            About Movemental
          </Link>
        </nav>
      </div>
    </Container>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <Container width="reading" className="py-20">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </Container>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
