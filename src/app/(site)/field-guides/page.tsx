import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SAFETY_FIELD_GUIDE_COVER_IMAGE } from "@/lib/safety-field-guide";
import { SANDBOX_FIELD_GUIDE_COVER_IMAGE } from "@/lib/sandbox-field-guide";
import { canonicalPageUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Field Guides",
  description:
    "The Movemental Field Guides — printable artifacts that walk organizational leaders through each stage of the path. Volume One: It Starts With Safety. Volume Two: It Continues With Exploration.",
  alternates: { canonical: canonicalPageUrl("/field-guides") },
  openGraph: {
    url: canonicalPageUrl("/field-guides"),
    title: "Movemental Field Guides",
  },
};

type Volume = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  coverAlt: string;
  cta: { label: string; href: string };
  status: string;
};

const VOLUMES: readonly Volume[] = [
  {
    number: "Volume One",
    title: "It Starts With Safety",
    subtitle: "A field guide for organizational leaders navigating AI",
    description:
      "The first stage of the Movemental Path in printable form. Names the foundational decisions every executive director, senior pastor, and board chair has to make before AI spreads inside the organization — and the public refusals that hold under pressure.",
    cover: SAFETY_FIELD_GUIDE_COVER_IMAGE,
    coverAlt: "Cover of It Starts With Safety field guide, Volume One",
    cta: { label: "Read Volume One", href: "/field-guides/safety" },
    status: "Available now",
  },
  {
    number: "Volume Two",
    title: "It Continues With Exploration",
    subtitle: "A field guide for the Sandbox stage",
    description:
      "What disciplined experimentation actually looks like once Safety is in place. How to set up a sandbox, how to evaluate vendor claims aggressively, and how to build the portfolio of proof that earns the right to train your team.",
    cover: SANDBOX_FIELD_GUIDE_COVER_IMAGE,
    coverAlt: "Cover of It Continues With Exploration field guide, Volume Two",
    cta: { label: "Read Volume Two", href: "/field-guides/sandbox" },
    status: "Available now",
  },
];

export default function Page() {
  return (
    <div className="bg-background text-foreground">
      <div className="pt-24 md:pt-28">
        <section className="mx-auto max-w-[1200px] px-8 py-16 md:py-24">
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-widest text-primary">
            The Field Guides
          </p>
          <h1 className="mb-8 max-w-[900px] font-serif-display text-5xl italic leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Printable artifacts for the people actually doing the work.
          </h1>
          <p className="max-w-[680px] font-sans text-lg leading-relaxed text-muted-foreground md:text-xl">
            Each volume in the series corresponds to one stage of the Movemental Path. They are written to be read
            by a leadership team together — not by one person alone — and to leave a paper trail of the decisions
            your organization has actually made.
          </p>
        </section>

        <section className="bg-section py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-8">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
              {VOLUMES.map((volume) => (
                <article
                  key={volume.number}
                  className="flex flex-col bg-background p-8 md:p-10"
                >
                  <div className="mb-8 flex aspect-[3/4] items-center justify-center overflow-hidden bg-elevated">
                    <Image
                      src={volume.cover}
                      alt={volume.coverAlt}
                      width={600}
                      height={800}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-widest text-primary">
                    {volume.number} · {volume.status}
                  </p>
                  <h2 className="mb-2 font-serif-display text-3xl text-foreground">{volume.title}</h2>
                  <p className="mb-6 font-sans text-sm italic text-muted-foreground">{volume.subtitle}</p>
                  <p className="mb-8 font-sans text-base leading-relaxed text-muted-foreground">
                    {volume.description}
                  </p>
                  <Link
                    href={volume.cta.href}
                    className="mt-auto inline-flex w-fit items-center bg-primary px-8 py-4 font-sans text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary-dim"
                  >
                    {volume.cta.label}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[720px] px-8 py-24 text-center md:py-32">
          <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-primary">
            On the series
          </p>
          <h2 className="mb-6 font-serif-display text-3xl italic text-foreground md:text-4xl">
            One volume per stage. In order.
          </h2>
          <p className="font-sans text-lg leading-relaxed text-muted-foreground">
            The Skills and Solutions volumes are in development. Read{" "}
            <Link href="/the-path" className="text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary">
              the full path
            </Link>{" "}
            for the long-form essay that frames why the order matters and what each stage produces.
          </p>
        </section>
      </div>
    </div>
  );
}
