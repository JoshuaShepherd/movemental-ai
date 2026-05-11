"use client";

import Link from "next/link";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Container } from "@/components/primitives/container";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const reason = searchParams.get("reason");
  const err = searchParams.get("error");

  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(next)}`;
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: redirectTo },
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
          Enter the email address associated with your Movemental workspace. We&apos;ll send you a secure
          sign-in link.
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
            Authentication did not complete. Request a new sign-in link below.
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
          <Button type="submit" variant="primary" disabled={status === "loading" || status === "sent"}>
            {status === "sent" ? "Link sent" : status === "loading" ? "Sending…" : "Email me a sign-in link"}
          </Button>
          {status === "error" ? (
            <p className="text-sm text-muted-foreground">
              Could not send the link. Try again in a moment.
            </p>
          ) : null}
          {status === "sent" ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Check your inbox for the sign-in link. It will be from{" "}
              <span className="text-foreground">josh@movemental.ai</span> — check spam if you don&apos;t see
              it within a minute or two.
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
