import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Display } from "@/components/primitives/display";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Section } from "@/components/primitives/section";
import { isUserStaff } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Design tokens (Stitch-surface)",
};

/** Mirrors `src/app/globals.css` `@theme inline` — keep in sync when tokens change. */
const TOKEN_GROUPS: Array<{
  title: string;
  description: string;
  tokens: Array<{
    label: string;
    /** Tailwind utility for the main swatch fill or stroke demo */
    swatchClass: string;
    /** Optional text utility on top of swatch (e.g. ink on paper) */
    textClass?: string;
    hex: string;
    notes?: string;
  }>;
}> = [
  {
    title: "Safestart (Stitch MD3 product paper)",
    description: "Warm surfaces and hairlines for lifted Stitch screens under /sandboxlive and /safestart.",
    tokens: [
      { label: "safestart-bg", swatchClass: "bg-safestart-bg", textClass: "text-safestart-ink", hex: "#faf8f4" },
      { label: "safestart-ink", swatchClass: "bg-safestart-ink", textClass: "text-inverse-foreground", hex: "#1a1a1a" },
      { label: "safestart-muted", swatchClass: "bg-safestart-muted", textClass: "text-inverse-foreground", hex: "#666557" },
      { label: "safestart-hairline", swatchClass: "bg-safestart-hairline", hex: "#ece8d7", notes: "Use as border/hairline on safestart-bg." },
      { label: "safestart-completed", swatchClass: "bg-safestart-completed", textClass: "text-inverse-foreground", hex: "#4a6b47" },
      {
        label: "safestart-surface-container",
        swatchClass: "bg-safestart-surface-container",
        textClass: "text-safestart-ink",
        hex: "#f7f4e7",
      },
    ],
  },
  {
    title: "Midnight chrome",
    description: "Authenticated header/sidebar and Stitch midnight bands.",
    tokens: [{ label: "movemental-midnight", swatchClass: "bg-movemental-midnight", textClass: "text-inverse-foreground", hex: "#141110" }],
  },
  {
    title: "SandboxLive sidebar rail",
    description: "Midnight-adjacent workspace chrome.",
    tokens: [
      { label: "sandbox-sidebar", swatchClass: "bg-sandbox-sidebar", textClass: "text-sandbox-sidebar-ink", hex: "#0f1624" },
      {
        label: "sandbox-sidebar-ink",
        swatchClass: "bg-sandbox-sidebar-ink",
        textClass: "text-sandbox-sidebar",
        hex: "#f4f1ea",
        notes: "Primary text on sandbox-sidebar.",
      },
      { label: "sandbox-border", swatchClass: "bg-sandbox-border", textClass: "text-sandbox-sidebar-ink", hex: "#1e2a3d" },
      {
        label: "sandbox-muted",
        swatchClass: "bg-sandbox-sidebar text-sandbox-muted",
        hex: "#9aa4b5",
        notes: "Muted meta on sandbox-sidebar (utility is text-sandbox-muted).",
      },
    ],
  },
  {
    title: "Pathway accent",
    description: "Editorial accent for Safety/Sandbox program surfaces (not generic marketing).",
    tokens: [
      {
        label: "pathway-accent",
        swatchClass: "bg-pathway-accent",
        textClass: "text-safestart-ink",
        hex: "#b8893a",
      },
    ],
  },
  {
    title: "Program status signals",
    description: "Sandbox-style go / caution / stop lights on cream paper.",
    tokens: [
      { label: "status-go", swatchClass: "bg-status-go", textClass: "text-inverse-foreground", hex: "#6b7e3f" },
      { label: "status-caution", swatchClass: "bg-status-caution", textClass: "text-inverse-foreground", hex: "#a07a25" },
      { label: "status-stop", swatchClass: "bg-status-stop", textClass: "text-inverse-foreground", hex: "#9c2d20" },
    ],
  },
];

function TokenSwatch({
  label,
  swatchClass,
  textClass,
  hex,
  notes,
}: {
  label: string;
  swatchClass: string;
  textClass?: string;
  hex: string;
  notes?: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-[0.5px] border-border-soft bg-card p-4">
      <div
        className={`flex min-h-[4.5rem] items-end justify-start border-[0.5px] border-border/40 p-3 ${swatchClass} ${textClass ?? ""}`}
      >
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.06em] opacity-90">Aa</span>
      </div>
      <div>
        <p className="font-mono text-[0.8rem] font-medium text-foreground">{label}</p>
        <p className="mt-0.5 font-mono text-[0.72rem] text-muted-foreground">{hex}</p>
        <p className="mt-1 text-[0.72rem] text-muted-foreground">
          Example:{" "}
          <code className="break-all rounded bg-muted px-1 py-0.5 text-[0.68rem] text-foreground">{swatchClass}</code>
        </p>
        {notes ? <p className="mt-1 text-[0.72rem] text-muted-foreground">{notes}</p> : null}
      </div>
    </div>
  );
}

export default async function AdminDesignTokensPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=%2Fadmin%2Fdesign-tokens");
  }
  if (!(await isUserStaff(user.id))) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <Eyebrow>Staff</Eyebrow>
        <Display as="h1" size="sm">
          Stitch-surface design tokens
        </Display>
        <p className="max-w-(--prose-max) text-sm text-muted-foreground">
          Reference swatches for the <code className="text-foreground">safestart-*</code>,{" "}
          <code className="text-foreground">movemental-midnight</code>,{" "}
          <code className="text-foreground">sandbox-*</code>, <code className="text-foreground">pathway-accent</code>,
          and <code className="text-foreground">status-*</code> utilities. Canonical charter:{" "}
          <span className="text-foreground">docs/design/DESIGN.md §18</span>. Source values:{" "}
          <code className="text-foreground">src/app/globals.css</code> (<code>@theme inline</code>).
        </p>
      </header>

      {TOKEN_GROUPS.map((group) => (
        <Section key={group.title} variant="section" spacing="sm" className="border-[0.5px] border-border-soft">
          <h2 className="font-serif text-lg font-medium text-foreground">{group.title}</h2>
          <p className="mt-2 max-w-(--prose-max) text-sm text-muted-foreground">{group.description}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.tokens.map((t) => (
              <TokenSwatch key={t.label} {...t} />
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}
