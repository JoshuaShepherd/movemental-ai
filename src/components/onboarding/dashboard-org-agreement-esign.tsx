"use client";

import Link from "next/link";
import * as React from "react";

import { useDashboardOrganizationSlug } from "@/components/dashboard/dashboard-org-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { appendOrgQuery } from "@/lib/authenticated/workspace-primary-nav";
import { cn } from "@/lib/utils";

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

export function DashboardOrgAgreementEsign({ className }: { className?: string }) {
  const organizationSlug = useDashboardOrganizationSlug();
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState<SignStatusResponse | null>(null);
  const [legalName, setLegalName] = React.useState("");
  const [consentReview, setConsentReview] = React.useState(false);
  const [consentEsign, setConsentEsign] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const q = organizationSlug ? `?organizationSlug=${encodeURIComponent(organizationSlug)}` : "";
      const res = await fetch(`/api/onboarding/sign-organization-agreement${q}`, { method: "GET" });
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

  const agreementsHref = organizationSlug
    ? appendOrgQuery("/sandboxlive/org/agreements", organizationSlug)
    : "/sandboxlive/org/agreements";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);
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
      setMessage(
        json.alreadySigned
          ? "This organization already has this agreement on file."
          : "Signed. Your agreements register is updated.",
      );
      await load();
      setConsentReview(false);
      setConsentEsign(false);
    } catch {
      setError("Network error — try again.");
    } finally {
      setPending(false);
    }
  }

  if (loading) {
    return (
      <div className={cn("rounded-md border border-border bg-card px-4 py-6", className)}>
        <p className="text-sm text-muted-foreground">Loading signing status…</p>
      </div>
    );
  }

  if (!status?.success) {
    return (
      <div className={cn("rounded-md border border-border bg-card px-4 py-6", className)}>
        <p className="text-sm text-destructive">{error ?? "Something went wrong."}</p>
      </div>
    );
  }

  if (status.signed) {
    return (
      <div className={cn("flex flex-col gap-3 rounded-md border border-border bg-card px-4 py-6", className)}>
        <p className="text-sm font-semibold text-foreground">Implementation MOU — on file</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Version {status.agreementVersion}
          {status.signedAt
            ? ` · Recorded ${new Date(status.signedAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}`
            : null}
          . View it anytime in your{" "}
          <Link href={agreementsHref} className="font-medium text-primary underline underline-offset-4">
            signed agreements register
          </Link>
          .
        </p>
      </div>
    );
  }

  const docHref = status.documentHref;

  return (
    <form
      onSubmit={(ev) => void onSubmit(ev)}
      className={cn("flex flex-col gap-5 rounded-md border border-border bg-card px-4 py-6", className)}
    >
      <div>
        <p className="text-sm font-semibold text-foreground">Sign the implementation MOU in this workspace</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Implementation MOU · version {status.agreementVersion}. This records a typed electronic signature for your
          organization and appears in your{" "}
          <Link href={agreementsHref} className="font-medium text-primary underline underline-offset-4">
            signed agreements register
          </Link>
          .
        </p>
      </div>

      {docHref ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-[0.05em] text-muted-foreground">Document</p>
          <iframe
            title="Memorandum of Understanding"
            src={docHref}
            className="h-[min(70vh,520px)] w-full rounded-md border border-border bg-section"
          />
          <a
            href={docHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary underline underline-offset-4"
          >
            Open PDF in a new tab
          </a>
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your Movemental lead provides the authoritative MOU text for this engagement. Confirm below only after you
          have reviewed that document (email, DocuShare, or packet) and are authorized to sign for{" "}
          <span className="font-medium text-foreground">{status.organizationSlug}</span>.
        </p>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="signatory-legal-name" className="text-sm font-medium text-foreground">
          Full legal name (signatory)
        </Label>
        <Input
          id="signatory-legal-name"
          name="signatoryLegalName"
          autoComplete="name"
          value={legalName}
          onChange={(e) => setLegalName(e.target.value)}
          placeholder="First and last name"
          disabled={pending}
          className="max-w-md"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <input
            id="consent-review"
            type="checkbox"
            checked={consentReview}
            onChange={(e) => setConsentReview(e.target.checked)}
            disabled={pending}
            className="mt-1 size-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Label htmlFor="consent-review" className="text-sm leading-relaxed text-muted-foreground">
            {docHref
              ? "I have read the Memorandum of Understanding shown above in full."
              : "I have reviewed the implementation MOU for this engagement (as provided by Movemental) and I am authorized to sign for this organization."}
          </Label>
        </div>
        <div className="flex items-start gap-3">
          <input
            id="consent-esign"
            type="checkbox"
            checked={consentEsign}
            onChange={(e) => setConsentEsign(e.target.checked)}
            disabled={pending}
            className="mt-1 size-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Label htmlFor="consent-esign" className="text-sm leading-relaxed text-muted-foreground">
            I agree that typing my full legal name and submitting this form constitutes my electronic signature and
            intent to be bound, consistent with applicable electronic signature laws.
          </Label>
        </div>
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="text-sm text-muted-foreground" role="status">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Recording…" : "Sign and record"}
        </Button>
      </div>
    </form>
  );
}
