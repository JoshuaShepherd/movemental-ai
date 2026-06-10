"use client";

import Link from "next/link";
import * as React from "react";
import { useRouter } from "next/navigation";

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
      router.replace("/agent-runtime");
    } catch {
      setErrorMessage("Could not update password. Try again.");
      setStatus("error");
    }
  };

  if (!sessionReady) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-20">
        <p className="text-sm text-muted-foreground">Checking session…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 md:py-28">
      <p className="mb-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
        Set new password
      </p>
      <h1 className="text-4xl leading-tight md:text-5xl">Choose a new password</h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground">
        Your reset link was valid. Enter a new password below.
      </p>

      <form onSubmit={submit} className="mt-10 flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
            New password
          </span>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
            Confirm password
          </span>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Saving…" : "Update password"}
        </Button>
        {status === "error" && errorMessage ? (
          <p className="text-sm text-muted-foreground" role="alert">
            {errorMessage}
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
