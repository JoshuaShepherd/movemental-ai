import Link from "next/link";
import { redirect } from "next/navigation";

import { RATIFICATION_STEPS } from "@/lib/safestart/workspace-manifest";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Board ratification · SafeStart",
};

export default async function SafeStartRatificationOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/safestart/ratification");
  }

  const sp = await searchParams;
  const orgQuery = sp.org ? `?org=${sp.org}` : "";
  const firstStep = RATIFICATION_STEPS[0];

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
          SafeStart · Board ratification
        </span>
        <h1 className="font-serif text-[clamp(2.25rem,4.5vw,2.75rem)] italic leading-tight tracking-tight text-foreground">
          Take the Guidebook to the board
        </h1>
        <p className="max-w-[680px] text-[15px] leading-relaxed text-muted-foreground">
          Ratification is a six-step flow — preparation through to confirmation.
          Each step has its own Stitch-authored surface. Work through them in
          order; the cohort can pause and resume between steps.
        </p>
      </header>

      <section className="flex flex-col">
        <h2 className="font-serif text-[20px] italic text-foreground">The six steps</h2>
        <ol className="mt-6 flex flex-col">
          {RATIFICATION_STEPS.map((step) => (
            <li
              key={step.slug}
              className="flex items-baseline gap-4 border-b border-border-soft py-4 last:border-b-0"
            >
              <span className="w-8 shrink-0 font-serif text-[18px] italic text-pathway-accent">
                {String(step.order).padStart(2, "0")}
              </span>
              <Link
                href={`/safestart/ratification/${step.slug}${orgQuery}`}
                className="group flex flex-1 flex-col gap-1"
              >
                <span className="text-[15px] font-medium text-foreground group-hover:text-pathway-accent">
                  {step.name}
                </span>
                <span className="text-[13px] text-muted-foreground">{step.description}</span>
              </Link>
              <Link
                href={`/safestart/ratification/${step.slug}${orgQuery}`}
                className="shrink-0 text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent underline decoration-pathway-accent/60 underline-offset-4 transition-colors hover:text-foreground"
              >
                Open →
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-4 border-t border-border-soft pt-8">
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Begin
        </span>
        <p className="text-[15px] leading-relaxed text-foreground">
          Start with{" "}
          <strong className="font-medium">
            {firstStep.name}
          </strong>{" "}
          — {firstStep.description.toLowerCase()}
        </p>
        <Link
          href={`/safestart/ratification/${firstStep.slug}${orgQuery}`}
          className="self-start bg-foreground px-5 py-2.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
        >
          Open {firstStep.name} →
        </Link>
      </section>
    </div>
  );
}
