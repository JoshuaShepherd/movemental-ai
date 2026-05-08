"use client";

import { Check, LucideIcon, X } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";
import { SectionHead } from "@/components/studio/SectionHead";

type OrgKind = "church" | "nonprofit" | "institution" | "movement" | "other" | "";

type AudienceSegmentApi = "Movement leader" | "Organization / institution" | "Media / research" | "Other";

function orgKindToAudienceSegment(kind: Exclude<OrgKind, "">): AudienceSegmentApi {
  if (kind === "movement") return "Movement leader";
  if (kind === "other") return "Other";
  return "Organization / institution";
}

interface ContactPayload {
  name: string;
  email: string;
  organization?: string;
  audience_segment: AudienceSegmentApi;
  message: string;
}

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    orgKind: "" as OrgKind,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Talk With Us | Movemental";
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    if (!formData.orgKind) {
      setStatus("error");
      setErrorMessage("Please select what kind of organization you represent.");
      return;
    }

    let messageBody = formData.message.trim();
    const roleTrim = formData.role.trim();
    if (roleTrim) {
      messageBody += `\n\nRole: ${roleTrim}`;
    }

    const orgLabel =
      formData.orgKind === "church"
        ? "Church"
        : formData.orgKind === "nonprofit"
          ? "Nonprofit"
          : formData.orgKind === "institution"
            ? "Institution"
            : formData.orgKind === "movement"
              ? "Movement leader"
              : "Other";
    messageBody += `\n\nOrganization type indicated: ${orgLabel}`;

    const payload: ContactPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      audience_segment: orgKindToAudienceSegment(formData.orgKind),
      message: messageBody,
    };
    const orgTrim = formData.organization.trim();
    if (orgTrim) payload.organization = orgTrim;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: unknown = await res.json();

      if (!res.ok) {
        const msg =
          typeof data === "object" && data !== null && "error" in data
            ? String((data as { error?: { message?: string } }).error?.message ?? "Request failed")
            : "Something went wrong.";
        setStatus("error");
        setErrorMessage(msg);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="contact-page flex min-h-[70vh] items-center">
        <Container width="narrow">
          <div className="rounded-card border border-border bg-card p-12 text-center">
            <h2 className="mb-4 font-serif-display text-3xl italic text-foreground">Thanks.</h2>
            <p className="text-lg text-muted-foreground">We&apos;ll write back within two business days.</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <section className="band-midnight hero" aria-labelledby="contact-hero-h1">
        <Container>
          <Reveal>
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <span className="section-eyebrow">Start the conversation</span>
              <h1 id="contact-hero-h1" className="display hero-headline max-w-4xl">
                Let&apos;s talk about where your organization <em>actually is.</em>
              </h1>
              <p className="hero-subhead lede lede--regular mb-10 max-w-2xl text-inverse-foreground/80">
                You don&apos;t need to have a plan yet — just start the conversation.
              </p>
              <div className="hero-actions flex flex-wrap justify-center gap-4">
                <a href="#contact-method" className="btn-pill btn-pill--primary">
                  Send a note
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="reassurance">
        <Container>
          <Reveal>
            <div className="mx-auto flex max-w-4xl flex-col gap-16 md:flex-row">
              <div className="md:w-1/3">
                <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-muted-foreground">Low pressure</span>
                <h2 className="mb-6 font-serif-display text-4xl italic text-foreground">
                  This is <em>not a sales call.</em>
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Our first conversation is about establishing context, not pushing a solution.
                </p>
              </div>
              <div className="md:w-2/3">
                <ul className="flex flex-col gap-8">
                  {[
                    "We don't pitch software or tools. We listen to where your organization is currently feeling the tension.",
                    "We will tell you honestly if we think you are further along than you realize, or if you need to slow down.",
                    "If Movemental isn't the right fit, we will point you to resources that are.",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-4">
                      <span className="mt-2 size-2 shrink-0 bg-primary" aria-hidden />
                      <p className="text-lg leading-relaxed text-foreground">{line}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="what-happens-next">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="What happens next"
              display={<>What happens when you reach out.</>}
              lede="A simple, straightforward process."
            />
            <div className="relative grid gap-8 md:grid-cols-3">
              <div className="pointer-events-none absolute left-[10%] right-[10%] top-6 z-0 hidden h-px bg-border/50 md:block" aria-hidden />
              <div className="relative z-10 flex flex-col items-center px-4 text-center">
                <div className="mb-6 flex h-12 w-12 items-center justify-center border border-border bg-background text-xs font-semibold uppercase tracking-widest text-primary">
                  01
                </div>
                <h3 className="mb-4 font-serif-display text-2xl italic text-foreground">We reply</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">Within two business days, a founder will reply to your note.</p>
              </div>
              <div className="relative z-10 flex flex-col items-center px-4 pt-12 text-center md:pt-0">
                <div className="mb-6 flex h-12 w-12 items-center justify-center border border-border bg-background text-xs font-semibold uppercase tracking-widest text-primary">
                  02
                </div>
                <h3 className="mb-4 font-serif-display text-2xl italic text-foreground">Initial call</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Thirty minutes. You share the context; we outline how we would approach it collaboratively.
                </p>
              </div>
              <div className="relative z-10 flex flex-col items-center px-4 pt-12 text-center md:pt-0">
                <div className="mb-6 flex h-12 w-12 items-center justify-center border border-border bg-background text-xs font-semibold uppercase tracking-widest text-primary">
                  03
                </div>
                <h3 className="mb-4 font-serif-display text-2xl italic text-foreground">Clarify</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  If it&apos;s a fit, we map out a structured diagnostic or a specific engagement path.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="who-this-is-for">
        <Container>
          <Reveal>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-6 bg-section p-10 md:p-12">
                <span className="block text-sm font-semibold uppercase tracking-widest text-muted-foreground">Who this is for</span>
                <h3 className="font-serif-display text-3xl italic leading-snug text-foreground">
                  This conversation is most helpful <em>if you are:</em>
                </h3>
                <ul className="flex flex-col gap-6">
                  {[
                    "Senior leader carrying responsibility for mission, people, and data integrity.",
                    'Looking for a structured sequence to navigate AI adoption safely rather than just "tips and tricks."',
                    "Ready to prioritize the slow work of discernment over the fast work of deployment.",
                  ].map((text) => (
                    <WhoRow key={text} Icon={Check} affirmative text={text} />
                  ))}
                </ul>
              </div>
              <div className="space-y-6 bg-section p-10 md:p-12">
                <span className="block text-sm font-semibold uppercase tracking-widest text-muted-foreground">Who this is not for</span>
                <h3 className="font-serif-display text-3xl italic leading-snug text-foreground">
                  Movemental is likely <em>not the right fit</em> if you are:
                </h3>
                <ul className="flex flex-col gap-6">
                  {[
                    "Looking for a traditional software demo or a sales pitch for a specific tool.",
                    'Seeking "growth hacks" or using AI primarily for aggressive lead generation.',
                    "Unwilling to include senior organizational leadership in the initial discovery process.",
                  ].map((text) => (
                    <WhoRow key={text} Icon={X} affirmative={false} text={text} />
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="contact-method">
        <Container width="narrow">
          <Reveal>
            <SectionHead
              eyebrow="Send a note"
              display={<>Tell us what you are <em>actually facing.</em></>}
              lede="Fill out the form below. The more context you can provide, the better our first conversation will be."
            />

            <form onSubmit={handleSubmit} className="space-y-10 border-t border-border pt-12">
              {status === "error" && errorMessage ? (
                <p className="text-sm font-medium text-destructive" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <div className="grid gap-10 md:grid-cols-2">
                <TypeField
                  label="Your name (required)"
                  htmlFor="name"
                  component="input"
                  required
                  value={formData.name}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                />
                <TypeField
                  label="Email (required)"
                  htmlFor="email"
                  component="input"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                />
              </div>

              <div className="grid gap-10 md:grid-cols-2">
                <TypeField
                  label="Organization"
                  htmlFor="org"
                  component="input"
                  value={formData.organization}
                  onChange={(v) => setFormData({ ...formData, organization: v })}
                  placeholder="Organization name"
                />
                <TypeField
                  label="Your role"
                  htmlFor="role"
                  component="input"
                  value={formData.role}
                  onChange={(v) => setFormData({ ...formData, role: v })}
                  placeholder="Senior pastor, executive director, provost…"
                />
              </div>

              <div>
                <label htmlFor="org_type" className="mb-2 block font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  What kind of organization? (required)
                </label>
                <select
                  id="org_type"
                  required
                  value={formData.orgKind}
                  onChange={(e) => setFormData({ ...formData, orgKind: e.target.value as OrgKind })}
                  className="w-full border-0 border-b border-border bg-transparent pb-3 text-base text-foreground outline-none focus:border-primary"
                >
                  <option disabled value="">
                    Select an option…
                  </option>
                  <option value="church">Church</option>
                  <option value="nonprofit">Nonprofit</option>
                  <option value="institution">Institution (seminary, school, other)</option>
                  <option value="movement">Movement leader</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  What is on your desk? (required)
                </label>
                <p className="mb-3 text-xs text-muted-foreground">
                  Share context, where the friction is, and what you&apos;re hoping to achieve (at least a few sentences).
                </p>
                <textarea
                  id="message"
                  required
                  rows={5}
                  minLength={10}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-y border-0 border-b border-border bg-transparent py-3 text-base text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
                  placeholder='e.g. "Our board wants an AI policy, but staff are split on tools..."'
                />
              </div>

              <div className="flex flex-col items-stretch gap-4 border-t border-border pt-8 md:items-end">
                <button type="submit" disabled={status === "submitting"} className="btn-pill btn-pill--primary w-full md:w-auto">
                  {status === "submitting" ? "Sending…" : "Send the note"}
                </button>
                <p className="max-w-md text-xs text-muted-foreground md:text-right">
                  By submitting, you agree to our{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
            </form>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}

function WhoRow({ Icon, affirmative, text }: { Icon: LucideIcon; affirmative: boolean; text: string }) {
  return (
    <li className="flex items-start gap-4">
      <Icon className={`mt-0.5 size-5 shrink-0 ${affirmative ? "text-primary" : "text-muted-foreground"}`} aria-hidden />
      <span className={`text-base leading-relaxed ${affirmative ? "text-foreground" : "text-muted-foreground"}`}>{text}</span>
    </li>
  );
}

function TypeField({
  label,
  htmlFor,
  component,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  htmlFor: string;
  component: "input" | "textarea";
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  const common =
    "w-full border-0 border-b border-border bg-transparent pb-3 text-base text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary";

  return (
    <div className="flex flex-col">
      <label htmlFor={htmlFor} className="mb-2 block font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      {component === "input" ? (
        <input
          id={htmlFor}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={common}
          placeholder={placeholder}
        />
      ) : (
        <textarea id={htmlFor} value={value} onChange={(e) => onChange(e.target.value)} className={`${common} resize-y py-3`} />
      )}
    </div>
  );
}
