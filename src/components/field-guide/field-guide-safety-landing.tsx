import { ClipboardCheck, ListOrdered, Route, ScrollText, Users } from "lucide-react";
import { Fragment } from "react";
import Link from "next/link";

import { ToolkitDownloadForm } from "@/components/toolkit/ToolkitDownloadForm";

const PDF_HREF = "/downloads/it-starts-with-safety-v1.pdf";

const fieldGuideDisclaimer = (
  <>
    We send the Field Guide immediately and one follow-up email a week later asking how it went. Nothing else.
  </>
);

function MetaStrip() {
  const items = ["Sixteen pages", "Free", "Self-assessment included", "No drip campaign"];
  return (
    <div
      className="my-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-4 font-sans text-sm font-semibold uppercase tracking-wider text-outline"
      aria-label="Field guide details"
    >
      {items.map((label, i) => (
        <Fragment key={label}>
          {i > 0 ? <span className="size-1 shrink-0 rounded-none bg-outline" aria-hidden /> : null}
          <span>{label}</span>
        </Fragment>
      ))}
    </div>
  );
}

export function FieldGuideSafetyLanding() {
  return (
    <div className="bg-background text-foreground">
      <div className="pt-24 md:pt-28">
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 px-8 py-16 md:py-24 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <span className="font-sans text-sm font-semibold uppercase tracking-widest text-primary">
              FREE FIELD GUIDE
            </span>
            <h1 className="font-serif-display text-6xl font-normal italic leading-tight tracking-tight text-foreground md:text-7xl">
              It Starts With Safety.
            </h1>
            <p className="max-w-xl font-sans text-xl leading-relaxed text-muted-foreground md:text-2xl">
              A sixteen-page protocol defining the seven foundational decisions required to protect your
              organization&apos;s mission and people in the era of artificial intelligence.
            </p>
            <MetaStrip />
            <div id="download" className="scroll-mt-28">
              <ToolkitDownloadForm
                source="field-guide-safety-hero"
                variant="page"
                layout="stacked"
                submitLabel="Send me the Field Guide"
                emailLabel="Email Address"
                organizationLabel="Organization"
                organizationOptional={false}
                disclaimer={fieldGuideDisclaimer}
                successMessage="Check your email for the Field Guide."
                className="mt-4 border-l-4 border-primary bg-elevated p-8"
                buttonClassName="!rounded-none w-full bg-inverse-surface text-inverse-foreground hover:bg-primary-dim"
              />
            </div>
          </div>
          <div className="relative flex aspect-3/4 w-full items-center justify-center border border-border bg-section p-12 shadow-ambient">
            <div className="absolute inset-0 bg-linear-to-br from-background to-section opacity-50" aria-hidden />
            <div className="relative z-10 flex h-full w-full flex-col justify-between border-2 border-primary bg-card p-8">
              <div className="flex items-start justify-between">
                <span className="font-serif-display text-2xl font-semibold text-primary">Movemental</span>
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-outline">
                  STAGE 01 · VOL. 01
                </span>
              </div>
              <div className="text-center">
                <h2 className="mb-4 font-serif-display text-5xl font-semibold italic leading-tight text-foreground">
                  The AI Safety
                  <br />
                  Field Guide
                </h2>
                <div className="mx-auto mb-4 h-px w-16 bg-primary" aria-hidden />
                <p className="font-sans text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Seven Decisions for Leaders
                </p>
              </div>
              <div className="text-right">
                <span className="font-serif-display text-lg italic text-primary">A Protocol for Action</span>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-section px-8 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <h2 className="mx-auto mb-16 max-w-3xl text-center font-serif-display text-4xl font-semibold italic md:text-5xl">
              The seven decisions, the self-assessment, and the framework that holds them.
            </h2>
            <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
              {[
                {
                  icon: ScrollText,
                  title: "Why Safety First",
                  body: "Before leveraging AI for operational efficiency or missional reach, leaders must establish boundaries. The guide articulates why technological adoption without theological and ethical constraints is a profound risk to institutional trust.",
                },
                {
                  icon: ListOrdered,
                  title: "The Seven Decisions",
                  body: "We outline the specific, actionable policies every organization needs: Acceptable Use Statement, Care Boundaries, Disclosure Standards, Vendor and Tool Inventory, Data Handling Protocol, Incident Response Plan, and Named Refusals.",
                },
                {
                  icon: ClipboardCheck,
                  title: "The Self-Assessment",
                  body: "A ten-point diagnostic tool designed for leadership teams to take together. It reveals gaps in current practice and provides a clear, objective starting point for necessary conversations.",
                },
                {
                  icon: Route,
                  title: "Next Stages",
                  body: "Safety is Stage 01. The guide previews how establishing these boundaries prepares an organization for Stage 02 (Strategy) and Stage 03 (Deployment), ensuring future integration is built on solid ground.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex flex-col gap-6 bg-section p-12">
                  <Icon className="size-8 text-primary" strokeWidth={1.25} aria-hidden />
                  <h3 className="font-serif-display text-2xl font-semibold italic">{title}</h3>
                  <p className="font-sans text-lg leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audiences */}
        <section className="bg-background px-8 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <h2 className="mx-auto mb-16 max-w-2xl text-center font-serif-display text-4xl font-semibold italic">
              Written for senior leaders at three kinds of mission-driven organizations.
            </h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {[
                {
                  title: "Executive Pastors",
                  body: "For leaders managing complex congregational dynamics, staff teams, and sensitive pastoral care data. The guide provides clarity on what AI should never touch, preserving the sanctity of human ministry.",
                },
                {
                  title: "Executive Directors",
                  body: "For non-profit leaders handling donor information, beneficiary data, and public trust. The guide offers a framework to ensure efficiency tools do not compromise ethical commitments or legal compliance.",
                },
                {
                  title: "Institutional Presidents",
                  body: "For heads of educational or legacy institutions overseeing academic integrity and institutional reputation. The guide establishes high-level policy requirements to guide faculty, staff, and student engagement.",
                },
              ].map((col) => (
                <div key={col.title} className="flex flex-col gap-4 border-t border-border pt-8">
                  <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-primary">{col.title}</h3>
                  <p className="font-sans leading-relaxed text-muted-foreground">{col.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Self-assessment band */}
        <section className="bg-elevated px-8 py-24 md:py-32">
          <div className="mx-auto flex max-w-3xl flex-col gap-8 text-center">
            <Users className="mx-auto size-10 text-primary" strokeWidth={1.25} aria-hidden />
            <h2 className="font-serif-display text-3xl font-semibold italic leading-snug text-foreground md:text-4xl">
              Most leadership teams take the self-assessment within two weeks of receiving the Field Guide.
            </h2>
            <p className="font-sans text-xl leading-relaxed text-muted-foreground">
              The Field Guide is designed to be self-explanatory. Many teams use it independently to draft their initial
              AI policies. For organizations requiring deeper alignment, expert facilitation, or customized policy
              drafting, we offer dedicated engagement models following the self-assessment.
            </p>
          </div>
        </section>

        {/* Midnight + form */}
        <section className="bg-inverse-surface px-8 py-24 text-inverse-foreground md:py-32">
          <div className="mx-auto flex max-w-3xl flex-col gap-12 text-center">
            <div>
              <h2 className="mb-4 font-serif-display text-4xl font-semibold italic md:text-5xl">
                Sixteen pages. Free. Read it in an evening.
              </h2>
              <p className="font-sans text-lg text-inverse-muted">The definitive starting point for institutional AI safety.</p>
            </div>
            <ToolkitDownloadForm
              source="field-guide-safety-footer"
              variant="page"
              layout="stacked"
              submitLabel="Send me the Field Guide"
              emailLabel="Email Address"
              organizationLabel="Organization"
              organizationOptional={false}
              disclaimer={fieldGuideDisclaimer}
              successMessage="Check your email for the Field Guide."
              className="border-l-4 border-inverse-border bg-inverse-surface/80 p-8 text-left"
              labelClassName="text-inverse-muted"
              footerClassName="text-center text-inverse-muted italic"
              successClassName="text-inverse-muted"
              inputClassName="border-inverse-border text-inverse-foreground placeholder:text-inverse-muted/50 focus:border-inverse-foreground"
              buttonClassName="!rounded-none w-full bg-inverse-foreground font-bold text-inverse-surface hover:bg-card"
            />
            <p className="font-sans text-sm text-inverse-muted">
              Prefer a file right now?{" "}
              <a href={PDF_HREF} className="underline underline-offset-4 hover:text-inverse-foreground" download>
                Download the PDF
              </a>{" "}
              ·{" "}
              <Link href="/pathway/safety" className="underline underline-offset-4 hover:text-inverse-foreground">
                Safety stage on the Path
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
