"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
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
    <Container width="reading" className="py-16">
      <Eyebrow className="mb-2">Sign in</Eyebrow>
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-foreground">Dashboard access</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Enter the email address associated with your Movemental workspace. We will send you a secure
        link.
      </p>
      {reason === "no_org" ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No organization membership was found for this account yet. Contact Movemental if you believe
          this is a mistake.
        </p>
      ) : null}
      {err === "auth" ? (
        <p className="mt-4 text-sm text-muted-foreground">Authentication did not complete. Try again.</p>
      ) : null}

      <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-foreground">
          <span className="font-medium">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-background px-3 py-2 text-foreground outline-none ring-1 ring-border focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        <Button type="submit" variant="primary" disabled={status === "loading" || status === "sent"}>
          {status === "sent" ? "Link sent" : status === "loading" ? "Sending…" : "Email me a link"}
        </Button>
        {status === "error" ? (
          <p className="text-sm text-muted-foreground">Could not send link. Try again shortly.</p>
        ) : null}
        {status === "sent" ? (
          <p className="text-sm text-muted-foreground">Check your inbox for the sign-in link.</p>
        ) : null}
      </form>
    </Container>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-sm text-muted-foreground">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
