"use client";

import Link from "next/link";
import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { MvAuthLoading, MvAuthShell } from "@/components/mv/legacy/auth-shell";
import { MV_ROUTES } from "@/components/mv/routes";
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
    <MvAuthShell eyebrow="Sign in · Movemental" title="Welcome back.">
      <p className="mv-ut-body">Staff sign-in for agent runtime and workspace tools.</p>
      <p className="mv-fine">Use the email and password for your Movemental workspace.</p>

      {reason === "no_org" ? (
        <p className="mv-form-done">
          No organization membership was found for this account yet. <a href="mailto:josh@movemental.ai">Reach out to us</a>.
        </p>
      ) : null}
      {err === "auth" ? <p className="mv-form-done">Authentication did not complete. Sign in again below.</p> : null}

      <form onSubmit={submit} className="mv-form mv-form--full">
        <div className="mv-ff">
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            className="mv-input"
            type="email"
            required
            autoComplete="email"
            placeholder="name@organization.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mv-ff">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            className="mv-input"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mv-ut-row">
          <button type="submit" className="mv-btn-ink" disabled={status === "loading"}>
            {status === "loading" ? "Signing in…" : "Sign in"}
          </button>
          <Link href={MV_ROUTES.forgotPassword}>Forgot password?</Link>
        </div>
        {status === "error" && errorMessage ? (
          <p className="mv-form-error" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>

      <nav aria-label="Sign-in help" className="mv-ut-links">
        <Link href={MV_ROUTES.signUp}>First time? Check your enrollment email</Link>
        <Link href={MV_ROUTES.agent}>Back to the agent room</Link>
        <a href="mailto:josh@movemental.ai">Need help signing in?</a>
      </nav>
    </MvAuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<MvAuthLoading />}>
      <LoginForm />
    </Suspense>
  );
}
