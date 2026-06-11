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

import { Button } from "@/components/ui/button";
import { StepSpine } from "@/components/ink-band/step-spine";
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
    <div className="mx-auto w-full max-w-xl px-4 py-20 md:py-28">
      <StepSpine label="Safety · Charter dashboard" title="Create your account." />
      <p className="mt-8 text-lg leading-relaxed text-foreground">
        After enrollment, we provision your private workspace and send this link. Enter your enrolled
        email, we&apos;ll send a one-tap magic link to open your Safety dashboard.
      </p>

      {status === "sent" ? (
        <p className="mt-10 border-l-2 border-[var(--color-ink-band-blue)] bg-card px-5 py-4 text-base leading-relaxed">
          Check your inbox, tap the link we just sent to {email.trim()} to open your Safety
          dashboard.
        </p>
      ) : (
        <form className="mt-10 space-y-5" onSubmit={submit} noValidate>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              readOnly={emailLocked}
              onChange={(e) => {
                if (!emailLocked) setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-base outline-none focus:border-[var(--color-ink-band-blue)] read-only:opacity-80"
            />
          </label>
          {status === "error" && errorMsg ? (
            <p className="text-sm text-destructive" role="alert">
              {errorMsg}
            </p>
          ) : null}
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send magic link"}
          </Button>
        </form>
      )}

      <nav
        aria-label="Signup help"
        className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8 text-sm text-muted-foreground"
      >
        <Link href="/login" className="transition-colors hover:text-foreground">
          Already have an account? Sign in
        </Link>
        <span aria-hidden className="text-muted-foreground/40">
          ·
        </span>
        <a href="mailto:josh@movemental.ai" className="transition-colors hover:text-foreground">
          Need help?
        </a>
      </nav>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-xl px-4 py-20">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
