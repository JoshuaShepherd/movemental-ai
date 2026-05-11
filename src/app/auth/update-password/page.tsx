"use client";

import Link from "next/link";
import * as React from "react";
import { useRouter } from "next/navigation";

import { Container } from "@/components/primitives/container";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const MIN_LEN = 8;

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [sessionReady, setSessionReady] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (!data.session) {
        router.replace("/login?error=auth");
        return;
      }
      setSessionReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (password.length < MIN_LEN) {
      setErrorMessage(`Use at least ${MIN_LEN} characters.`);
      setStatus("error");
      return;
    }
    if (password !== confirm) {
      setErrorMessage("Passwords do not match.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setErrorMessage(error.message || "Could not update password.");
        setStatus("error");
        return;
      }
      router.replace("/dashboard");
    } catch {
      setErrorMessage("Could not update password. Try again.");
      setStatus("error");
    }
  };

  if (!sessionReady) {
    return (
      <Container width="reading" className="py-20">
        <p className="text-sm text-muted-foreground">Checking session…</p>
      </Container>
    );
  }

  return (
    <Container width="reading" className="py-20 md:py-28">
      <div className="max-w-xl">
        <p className="mb-6 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
          Set new password
        </p>
        <h1 className="font-serif-display text-4xl italic leading-tight tracking-tight text-foreground md:text-5xl">
          Choose a new password
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Your reset link was valid. Enter a new password below, then you will be signed in to your dashboard.
        </p>

        <form onSubmit={submit} className="mt-10 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              New password
            </span>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-background px-4 py-3 text-base text-foreground outline-none ring-1 ring-border transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
              Confirm password
            </span>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-lg bg-background px-4 py-3 text-base text-foreground outline-none ring-1 ring-border transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          <Button type="submit" variant="primary" disabled={status === "loading"}>
            {status === "loading" ? "Saving…" : "Update password"}
          </Button>
          {status === "error" && errorMessage ? (
            <p className="text-sm text-muted-foreground" role="alert">
              {errorMessage}
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
