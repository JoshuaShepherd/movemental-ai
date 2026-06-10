"use client";

import { useState, type FormEvent } from "react";

type OrgType = "church" | "nonprofit" | "institution" | "movement-leader" | "other";

const AUDIENCE_MAP: Record<OrgType, "Movement leader" | "Organization / institution" | "Other"> = {
  church: "Organization / institution",
  nonprofit: "Organization / institution",
  institution: "Organization / institution",
  "movement-leader": "Movement leader",
  other: "Other",
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "submitting" });

    const fd = new FormData(event.currentTarget);
    const orgType = (fd.get("orgType") as OrgType) || "other";
    const role = (fd.get("role") as string) || "";
    const messageRaw = (fd.get("message") as string) || "";
    const message = role ? `[Role: ${role}]\n\n${messageRaw}` : messageRaw;

    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      organization: fd.get("organization") || undefined,
      audience_segment: AUDIENCE_MAP[orgType],
      message,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const detail =
          data?.error?.message ??
          (res.status === 429
            ? "Too many submissions. Please try again later."
            : "Something went wrong. Please try again.");
        setStatus({ kind: "error", message: detail });
        return;
      }
      setStatus({ kind: "success" });
      event.currentTarget.reset();
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="contact-form" role="status" aria-live="polite">
        <p
          className="form-help"
          style={{ fontSize: "1.05rem", color: "var(--foreground)" }}
        >
          <strong>Thanks.</strong> Your note is in. We&rsquo;ll write back
          within two business days.
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-name" className="form-label">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className="form-input"
            autoComplete="name"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email" className="form-label">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="form-input"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contact-org" className="form-label">
            Organization
          </label>
          <input
            id="contact-org"
            name="organization"
            type="text"
            className="form-input"
            autoComplete="organization"
          />
        </div>
        <div className="form-field">
          <label htmlFor="contact-role" className="form-label">
            Your role
          </label>
          <input
            id="contact-role"
            name="role"
            type="text"
            className="form-input"
            autoComplete="organization-title"
            placeholder="Senior pastor, executive director, provost…"
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="contact-type" className="form-label">
          What kind of organization?
        </label>
        <select
          id="contact-type"
          name="orgType"
          className="form-select"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Choose one
          </option>
          <option value="church">Church</option>
          <option value="nonprofit">Nonprofit</option>
          <option value="institution">
            Institution (seminary, school, other)
          </option>
          <option value="movement-leader">Movement leader</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="contact-message" className="form-label">
          What is on your desk?
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="form-textarea"
          rows={6}
          placeholder="Two or three sentences are plenty. Where you are stuck, what your board is asking, or what you have already tried."
          required
        />
        <p className="form-help">
          We read every note. Drafts are fine. We will write back within two
          business days.
        </p>
      </div>

      {status.kind === "error" ? (
        <p
          role="alert"
          className="form-help"
          style={{ color: "var(--destructive)" }}
        >
          {status.message}
        </p>
      ) : null}

      <div className="form-actions">
        <button
          type="submit"
          className="btn-pill btn-pill--primary"
          disabled={status.kind === "submitting"}
        >
          {status.kind === "submitting" ? "Sending…" : "Send the note"}
        </button>
        <p className="form-fineprint">
          We do not sell, share, or train models on this email. Privacy
          policy applies.
        </p>
      </div>
    </form>
  );
}
