import Link from "next/link";

import { loadStitchTemplatesManifest } from "@/lib/program/stitch-manifest";

export default function ProgramIndexPage() {
  const { templates, subgroupLabels } = loadStitchTemplatesManifest();
  const safety = templates.filter((t) => t.category === "safety");
  const sandbox = templates.filter((t) => t.category === "sandbox");

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-[-0.02em] text-foreground">Program templates</h1>
      <p className="mt-2 max-w-prose text-sm text-muted-foreground">
        Authenticated-only Stitch migration hub. Routes mirror the consolidated manifest from{" "}
        <code className="rounded bg-muted px-1 text-xs">movemental-stitch-dashboard</code>. Marketing pathway
        pages on the public site are unrelated.
      </p>

      <section className="mt-10">
        <h2 className="font-headline text-base italic text-foreground">Safety ({safety.length})</h2>
        <ul className="mt-4 columns-1 gap-x-8 text-sm text-muted-foreground md:columns-2">
          {safety.map((t) => (
            <li key={t.id} className="mb-2 break-inside-avoid">
              <Link href={`/program/safety/${t.id}`} className="hover:text-pathway-accent hover:underline">
                {t.title}
              </Link>
              <span className="ml-2 text-xs opacity-80">
                ({subgroupLabels[t.subgroup] ?? t.subgroup})
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-headline text-base italic text-foreground">Sandbox ({sandbox.length})</h2>
        <ul className="mt-4 columns-1 gap-x-8 text-sm text-muted-foreground md:columns-2">
          {sandbox.map((t) => (
            <li key={t.id} className="mb-2 break-inside-avoid">
              <Link href={`/program/sandbox/${t.id}`} className="hover:text-pathway-accent hover:underline">
                {t.title}
              </Link>
              <span className="ml-2 text-xs opacity-80">
                ({subgroupLabels[t.subgroup] ?? t.subgroup})
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
