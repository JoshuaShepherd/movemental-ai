import { redirect } from "next/navigation";

import { RecipeLibrary } from "@/components/sandboxlive/recipe-library";
import { RECIPE_CATALOG } from "@/lib/sandboxlive/recipe-catalog";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Recipe Library · SandboxLive",
};

export default async function SandboxLiveRecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ recipe?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=/sandboxlive/recipes");
  }

  const sp = await searchParams;

  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
          SandboxLive · Recipe Library
        </span>
        <h1 className="font-serif text-[clamp(2.25rem,4.5vw,2.75rem)] italic leading-tight tracking-tight text-foreground">
          Working recipes
        </h1>
        <p className="max-w-[680px] text-[15px] leading-relaxed text-muted-foreground">
          Recipes the cohort has tried, refined, and would recommend to another
          organization doing similar work. Filter by function or data sensitivity.
          Click any recipe to see the full document and a transcript excerpt.
        </p>
      </header>

      <RecipeLibrary
        recipes={RECIPE_CATALOG}
        initialSelectedSlug={sp.recipe ?? null}
      />
    </div>
  );
}
