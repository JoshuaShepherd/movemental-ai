"use client";

/**
 * ADR — Safety customer signup uses magic link (not password).
 * Rationale: mirrors `/assess` low-friction OTP flow; app-level gating on
 * `organization_inquiries.status === "provisioned"` replaces open registration.
 * Staff continue to use password sign-in at `/login`.
 */

import Link from "next/link";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { MvAuthLoading, MvAuthShell } from "@/components/mv/legacy/auth-shell";
import { MV_ROUTES } from "@/components/mv/routes";
import { sanitizeAuthRedirectNext } from "@/lib/auth/safe-redirect";
import { createClient } from "@/lib/supabase/client";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function SignupForm() {
  const searchParams = useSearchParams();
  const prefilledEmail = searchParams.get("email") ?? "";
  const inquiryId = searchParams.get("inquiry");
  const next = React.useMemo(
    () => sanitizeAuthRedirectNext(searchParams.get("next"), "/dashboard/safety"),
    [searchParams],
  );
  const errorParam = searchParams.get("error");

  const [email, setEmail] = React.useState(prefilledEmail);
  const [status, setStatus] = React.useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const emailLocked = prefilledEmail.length > 0;

  React.useEffect(() => {
    if (errorParam === "email_mismatch") {
      setErrorMsg("Use the same email address you used to enroll.");
      setStatus("error");
    }
  }, [errorParam]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    setErrorMsg(null);

    try {
      const gateRes = await fetch("/api/safety/signup-gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!gateRes.ok) {
        setStatus("error");
        setErrorMsg(
          "Check your enrollment email, signup opens after your dashboard is provisioned.",
        );
        return;
      }

      const supabase = createClient();
      const inquiryQuery = inquiryId ? `&inquiry=${encodeURIComponent(inquiryId)}` : "";
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}${inquiryQuery}`;
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: { emailRedirectTo: redirectTo, shouldCreateUser: true },
      });
      if (error) {
        setStatus("error");
        setErrorMsg("Could not send the link. Try again in a moment.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Could not send the link. Try again in a moment.");
    }
  };

  return (
    <MvAuthShell eyebrow="Safety · Charter dashboard" title="Create your account.">
      <p className="mv-ut-body">
        After enrollment, we provision your private workspace and send this link. Enter your enrolled email, we&apos;ll send a one-tap magic link to open
        your Safety dashboard.
      </p>

      {status === "sent" ? (
        <p className="mv-form-done" role="status">
          Check your inbox, tap the link we just sent to {email.trim()} to open your Safety dashboard.
        </p>
      ) : (
        <form className="mv-form mv-form--full" onSubmit={submit} noValidate>
          <div className="mv-ff">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              className="mv-input"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              readOnly={emailLocked}
              onChange={(e) => {
                if (!emailLocked) setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
            />
          </div>
          {status === "error" && errorMsg ? (
            <p className="mv-form-error" role="alert">
              {errorMsg}
            </p>
          ) : null}
          <div>
            <button type="submit" className="mv-btn-ink" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Send magic link"}
            </button>
          </div>
        </form>
      )}

      <nav aria-label="Signup help" className="mv-ut-links">
        <Link href={MV_ROUTES.signIn}>Already have an account? Sign in</Link>
        <a href="mailto:josh@movemental.ai">Need help?</a>
      </nav>
    </MvAuthShell>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<MvAuthLoading />}>
      <SignupForm />
    </Suspense>
  );
}
