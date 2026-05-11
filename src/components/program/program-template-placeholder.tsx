import Link from "next/link";

import { loadStitchTemplatesManifest } from "@/lib/program/stitch-manifest";
import { getStitchContentEntry, getStitchScreenFamily } from "@/lib/program/template-content-meta";

const PILOT_ID = "safestart_dashboard_home_pre_kickoff";

export function ProgramTemplatePlaceholder({
  category,
  templateId,
}: {
  category: "safety" | "sandbox";
  templateId: string;
}) {
  const manifest = loadStitchTemplatesManifest();
  const meta = manifest.templates.find((t) => t.id === templateId);
  const title = meta?.title ?? templateId;
  const subgroupLabel = meta?.subgroup ? manifest.subgroupLabels[meta.subgroup] : undefined;
  const screenFamily = getStitchScreenFamily(templateId);
  const entry = getStitchContentEntry(templateId);
  const base = category === "safety" ? "/program/safety" : "/program/sandbox";

  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-body text-xs font-semibold uppercase tracking-widest text-safestart-muted">
        Program route ({category})
      </p>
      <h1 className="mt-2 font-headline text-3xl italic text-safestart-ink">{title}</h1>
      {subgroupLabel ? (
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{subgroupLabel}</span>
          {screenFamily ? (
            <>
              {" "}
              · screen family: <code className="text-xs">{screenFamily}</code>
            </>
          ) : null}
        </p>
      ) : null}
      <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
        Reserved for Stitch migration. Static HTML and fixtures live in the{" "}
        <code className="rounded bg-muted px-1">movemental-stitch-dashboard</code> repo
        {entry?.fixturePath ? (
          <>
            : <code className="break-all text-xs">{entry.fixturePath}</code>
          </>
        ) : null}
        .
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Implement shared building blocks for <strong>{screenFamily ?? "this template"}</strong> per Stitch{" "}
        <code className="text-xs">docs/fixtures-screen-families.md</code>, then replace this placeholder.
      </p>
      {category === "safety" && templateId !== PILOT_ID ? (
        <Link
          href={`${base}/${PILOT_ID}`}
          className="mt-8 inline-block font-body text-sm font-semibold text-pathway-accent underline"
        >
          View pilot implementation →
        </Link>
      ) : null}
    </div>
  );
}
