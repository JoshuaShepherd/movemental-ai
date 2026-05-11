import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RecipeLibrary } from "@/components/sandboxlive/recipe-library";
import { RECIPE_CATALOG } from "@/lib/sandboxlive/recipe-catalog";
import { canonicalPageUrl } from "@/lib/site-url";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Recipe Library",
  description:
    "A public preview of the working recipes that cohorts try, refine, and would recommend to another organization doing similar work — across writing, research, analysis, planning, communication, and operations.",
  alternates: { canonical: canonicalPageUrl("/recipes") },
  openGraph: {
    url: canonicalPageUrl("/recipes"),
    title: "Movemental Recipe Library",
    description:
      "Public preview of cohort-tested AI recipes. Filter by function and data sensitivity; each recipe links to its authored visual reference.",
  },
};

export default async function RecipesPublicPreviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The catalog is in-memory until the `recipes` DB table is migrated. The
  // public preview shows recipes where `cohort_specific_for IS NULL`. With no
  // cohort-pinned recipes seeded today, the entire catalog is public.
  const publicRecipes = RECIPE_CATALOG;

  return (
    <div className="flex flex-col gap-16 px-[clamp(1.25rem,4vw,2.5rem)] py-16 md:gap-20 md:py-24">
      {/* Hero */}
      <header className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-6">
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
          Recipe Library · Public preview
        </span>
        <h1 className="font-serif text-[clamp(2.5rem,6vw,4.25rem)] italic leading-[1.02] tracking-tight text-foreground">
          Working recipes from the cohort.
        </h1>
        <p className="max-w-[680px] text-[17px] leading-relaxed text-foreground">
          Patterns that organizations doing similar work to yours have tried,
          refined, and would teach to another team. Each recipe names what it
          produces, how long it takes, and the data sensitivity to plan for.
        </p>
        <p className="max-w-[680px] text-[14px] leading-relaxed text-muted-foreground">
          This is the public preview — a generic catalog. Inside SandboxLive, your
          cohort sees a customized library with the recipes your peers have
          actually tried, with cohort-specific trial counts and value-record
          annotations.
        </p>
      </header>

      {/* Session-aware banner */}
      {user ? (
        <aside className="mx-auto flex w-full max-w-[var(--container-max)] items-center justify-between gap-4 border border-pathway-accent/40 bg-section px-6 py-5">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
              Signed in
            </span>
            <p className="text-[14px] leading-relaxed text-foreground">
              Looking for your cohort&rsquo;s customized recipes? Open the
              SandboxLive library.
            </p>
          </div>
          <Link
            href="/sandboxlive/recipes"
            className="shrink-0 inline-flex items-center gap-2 bg-foreground px-4 py-2.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Open SandboxLive library
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </aside>
      ) : null}

      {/* Library */}
      <section className="mx-auto w-full max-w-[var(--container-max)]">
        <RecipeLibrary recipes={publicRecipes} />
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-6 border-t border-border-soft pt-12">
        <h2 className="font-serif text-[clamp(1.75rem,3.4vw,2.4rem)] italic leading-tight tracking-tight text-foreground">
          Want recipes built for your organization?
        </h2>
        <p className="max-w-[620px] text-[15px] leading-relaxed text-muted-foreground">
          SandboxLive is the cohort engagement where this library gets written.
          Eight phases, six months, a cohort of peer organizations, and a working
          library of recipes you actually use — not a generic catalog.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/pathway/sandbox"
            className="inline-flex items-center gap-2 bg-foreground px-5 py-2.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Learn about SandboxLive
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-border-soft bg-card px-5 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-section"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
