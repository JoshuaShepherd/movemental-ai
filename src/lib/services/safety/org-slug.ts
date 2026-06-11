import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { slugifyHeading } from "@/lib/slugify-heading";

/** Derive a unique organizations.slug from a display name (dedupe with numeric suffix). */
export async function uniqueOrgSlugFromName(name: string): Promise<string> {
  const base = slugifyHeading(name) || "org";
  let candidate = base;
  let n = 2;
  while (true) {
    const [row] = await db
      .select({ id: organizations.id })
      .from(organizations)
      .where(eq(organizations.slug, candidate))
      .limit(1);
    if (!row) return candidate;
    candidate = `${base}-${n}`;
    n += 1;
  }
}
