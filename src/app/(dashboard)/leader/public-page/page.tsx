import type { Metadata } from "next";
import Link from "next/link";

import { Display } from "@/components/primitives/display";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Prose } from "@/components/primitives/prose";
import { Section } from "@/components/primitives/section";
import { getMovementLeaderByEmail } from "@/lib/movement-leaders/movement-leaders.server";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Public page",
};

function fmt(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function LeaderPublicPagePreview() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const leader = await getMovementLeaderByEmail(user?.email ?? null);
  if (!leader) {
    return null;
  }

  const published = Boolean(leader.public_page_published_at);
  const publicUrl = `/movement-leaders/${leader.slug}`;

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <Eyebrow>Trusted voices</Eyebrow>
        <Display as="h1" size="sm" className="text-balance">
          Public leader page
        </Display>
        <p className="max-w-(--prose-max) text-muted-foreground">
          Preview and approval gates for your public profile. Publishing sets{" "}
          <code className="text-foreground">public_page_published_at</code> and exposes{" "}
          <span className="text-foreground">{publicUrl}</span> to visitors.
        </p>
      </header>
      <Section variant="section" spacing="sm" className="rounded-xl">
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Slug</dt>
            <dd className="font-medium text-foreground">{leader.slug}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Status</dt>
            <dd className="font-medium text-foreground">{leader.status}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Reflected understanding endorsed</dt>
            <dd className="font-medium text-foreground">{fmt(leader.reflected_understanding_endorsed_at)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Public page approved</dt>
            <dd className="font-medium text-foreground">{fmt(leader.public_page_approved_at)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Public page published</dt>
            <dd className="font-medium text-foreground">{fmt(leader.public_page_published_at)}</dd>
          </div>
        </dl>
        <div className="mt-8 border-t border-border-soft pt-8">
          {published ? (
            <Prose>
              <p>
                Your page is live.{" "}
                <Link href={publicUrl} className="text-foreground">
                  View public page →
                </Link>
              </p>
            </Prose>
          ) : (
            <Prose>
              <p>
                The public route returns 404 until <code className="text-foreground">public_page_published_at</code>{" "}
                is set (staff tooling or a future publish step). Stitch layouts will replace this
                preview when templates land.
              </p>
            </Prose>
          )}
        </div>
      </Section>
    </div>
  );
}
