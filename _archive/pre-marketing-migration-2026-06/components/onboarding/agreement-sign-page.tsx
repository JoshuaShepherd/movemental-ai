"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCompleteOnboardingTask } from "@/hooks/onboarding/use-onboarding-state";

type SignStatusResponse = {
  success: boolean;
  organizationSlug: string;
  agreementType: string;
  agreementVersion: string;
  documentHref: string | null;
  signed: boolean;
  signedAt: string | null;
  error?: { code?: string; message?: string };
};

export function AgreementSignPage() {
  const organizationSlug = useDashboardOrganizationSlug();
  const router = useRouter();
  const complete = useCompleteOnboardingTask(organizationSlug || null);

  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState<SignStatusResponse | null>(null);
  const [legalName, setLegalName] = React.useState("");
  const [consentReview, setConsentReview] = React.useState(false);
  const [consentEsign, setConsentEsign] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);

  const backHref = organizationSlug
    ? `/welcome?org=${encodeURIComponent(organizationSlug)}`
    : "/welcome";
  const agreementsHref = organizationSlug
    ? `/sandboxlive/org/agreements?org=${encodeURIComponent(organizationSlug)}`
    : "/sandboxlive/org/agreements";

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = organizationSlug ? `?organizationSlug=${encodeURIComponent(organizationSlug)}` : "";
      const res = await fetch(`/api/onboarding/sign-organization-agreement${q}`);
      const json = (await res.json()) as SignStatusResponse;
      if (!res.ok) {
        setError(json.error?.message ?? "Could not load signing status.");
        setStatus(null);
        return;
      }
      setStatus(json);
    } catch {
      setError("Network error loading signing status.");
      setStatus(null);
    } finally {
      setLoading(false);
    }
  }, [organizationSlug]);

  React.useEffect(() => {
    void load();
  }, [load]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!legalName.trim()) {
      setError("Enter your full legal name.");
      return;
    }
    if (!consentReview || !consentEsign) {
      setError("Confirm both checkboxes before signing.");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/onboarding/sign-organization-agreement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationSlug: organizationSlug ?? undefined,
          signatoryLegalName: legalName,
          consentReviewedAgreement: consentReview,
          consentElectronicSignature: consentEsign,
        }),
      });
      const json = (await res.json()) as {
        success?: boolean;
        alreadySigned?: boolean;
        error?: { message?: string };
      };
      if (!res.ok) {
        setError(json.error?.message ?? "Could not record your signature.");
        return;
      }
      try {
        await complete.mutateAsync({ taskKey: "sign_agreement" });
      } catch {
        // Task-complete failure is non-fatal — the signature is already recorded.
      }
      setDone(true);
      window.setTimeout(() => router.push(backHref), 1200);
    } catch {
      setError("Network error — try again.");
    } finally {
      setPending(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!status?.success) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-start gap-4 py-16">
        <p className="text-sm text-destructive">{error ?? "Something went wrong."}</p>
        <Button asChild variant="ghost" size="sm">
          <Link href={backHref}>Back to checklist</Link>
        </Button>
      </div>
    );
  }

  if (status.signed) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 py-24 text-center">
        <Eyebrow>Implementation MOU</Eyebrow>
        <h1 className="text-3xl tracking-[-0.02em] text-foreground sm:text-4xl">
          Signed and on file
        </h1>
        <p className="text-muted-foreground">
          Version {status.agreementVersion}
          {status.signedAt
            ? ` · Recorded ${new Date(status.signedAt).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}`
            : null}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button asChild variant="primary">
            <Link href={backHref}>Back to checklist</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href={agreementsHref}>View register</Link>
          </Button>
        </div>
      </div>
    );
  }

  const docHref = status.documentHref;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Onboarding</Eyebrow>
          <h1 className="mt-2 text-3xl tracking-[-0.02em] text-foreground sm:text-4xl">
            Implementation MOU
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Version {status.agreementVersion} · {status.organizationSlug}
          </p>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link href={backHref}>Back to checklist</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        {docHref ? (
          <iframe
            title="Memorandum of Understanding"
            src={`${docHref}#view=FitH`}
            className="h-[80vh] min-h-[520px] w-full bg-section"
          />
        ) : (
          <div className="flex h-[80vh] min-h-[520px] items-center justify-center bg-section px-8 text-center">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Your Movemental lead provides the authoritative MOU for this engagement. Confirm
              below only after you have reviewed that document and are authorized to sign for{" "}
              <span className="font-medium text-foreground">{status.organizationSlug}</span>.
            </p>
          </div>
        )}

        <form
          onSubmit={(ev) => void onSubmit(ev)}
          className="flex h-fit flex-col gap-5 bg-card p-6 lg:sticky lg:top-24"
        >
          <div>
            <p className="text-base font-semibold text-foreground">Sign this document</p>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              Your typed legal name is your electronic signature.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="signatory-legal-name" className="text-sm font-medium text-foreground">
              Full legal name
            </Label>
            <Input
              id="signatory-legal-name"
              name="signatoryLegalName"
              autoComplete="name"
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
              placeholder="First and last name"
              disabled={pending || done}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-start gap-3 text-[13px] leading-relaxed text-muted-foreground">
              <input
                type="checkbox"
                checked={consentReview}
                onChange={(e) => setConsentReview(e.target.checked)}
                disabled={pending || done}
                className="mt-0.5 size-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <span>I have reviewed the MOU.</span>
            </label>
            <label className="flex items-start gap-3 text-[13px] leading-relaxed text-muted-foreground">
              <input
                type="checkbox"
                checked={consentEsign}
                onChange={(e) => setConsentEsign(e.target.checked)}
                disabled={pending || done}
                className="mt-0.5 size-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <span>
                Typing my name and submitting constitutes my electronic signature and intent to be
                bound.
              </span>
            </label>
          </div>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          <Button type="submit" variant="primary" disabled={pending || done} className="w-full">
            {done ? "Signed" : pending ? "Recording…" : "Sign and record"}
          </Button>

          {docHref ? (
            <a
              href={docHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-[12px] font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Open PDF in a new tab
            </a>
          ) : null}
        </form>
      </div>
    </div>
  );
}
