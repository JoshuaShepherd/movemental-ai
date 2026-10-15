"use client";

import Link from "next/link";
import * as React from "react";
import { Suspense } from "react";

import { MvAuthLoading, MvAuthShell } from "@/components/mv/legacy/auth-shell";
import { MV_ROUTES } from "@/components/mv/routes";
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
    <MvAuthShell eyebrow="Reset password" title="Forgot your password?">
      <p className="mv-ut-body">Enter the email for your Movemental workspace. If an account exists, we will send reset instructions.</p>

      <form onSubmit={submit} className="mv-form mv-form--full">
        <div className="mv-ff">
          <label htmlFor="forgot-email">Email address</label>
          <input
            id="forgot-email"
            className="mv-input"
            type="email"
            required
            autoComplete="email"
            placeholder="name@organization.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "sent"}
          />
        </div>
        <div>
          <button type="submit" className="mv-btn-ink" disabled={status === "loading" || status === "sent"}>
            {status === "sent" ? "Email sent" : status === "loading" ? "Sending…" : "Send reset link"}
          </button>
        </div>
        {status === "error" ? (
          <p className="mv-form-error" role="alert">
            Could not send reset email. Try again in a moment.
          </p>
        ) : null}
        {status === "sent" ? (
          <p className="mv-form-done" role="status">
            Check your inbox for a reset link. If it does not arrive within a few minutes, check spam or contact your administrator.
          </p>
        ) : null}
      </form>

      <nav aria-label="Reset help" className="mv-ut-links">
        <Link href={MV_ROUTES.signIn}>Back to sign in</Link>
      </nav>
    </MvAuthShell>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<MvAuthLoading />}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
