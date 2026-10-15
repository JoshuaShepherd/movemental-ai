"use client";

import Link from "next/link";
import * as React from "react";
import { useRouter } from "next/navigation";

import { MvAuthLoading, MvAuthShell } from "@/components/mv/legacy/auth-shell";
import { MV_ROUTES } from "@/components/mv/routes";
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

  if (!sessionReady) return <MvAuthLoading label="Checking session…" />;

  return (
    <MvAuthShell eyebrow="Set new password" title="Choose a new password">
      <p className="mv-ut-body">Your reset link was valid. Enter a new password below.</p>

      <form onSubmit={submit} className="mv-form mv-form--full">
        <div className="mv-ff">
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            className="mv-input"
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mv-ff">
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            id="confirm-password"
            className="mv-input"
            type="password"
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="mv-btn-ink" disabled={status === "loading"}>
            {status === "loading" ? "Saving…" : "Update password"}
          </button>
        </div>
        {status === "error" && errorMessage ? (
          <p className="mv-form-error" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>

      <nav aria-label="Reset help" className="mv-ut-links">
        <Link href={MV_ROUTES.signIn}>Back to sign in</Link>
      </nav>
    </MvAuthShell>
  );
}
