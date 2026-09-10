import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getOptionalAuthUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Program template",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ category: string; templateId: string }> };

/** Stub for `/program/:category/:templateId` bookmarks and e2e expectations. */
export default async function ProgramTemplatePage({ params }: Props) {
  const { category, templateId } = await params;
  const { user } = await getOptionalAuthUser();
  const returnPath = `/program/${category}/${templateId}`;

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(returnPath)}`);
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 md:py-16">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
        Program · {category}
      </p>
      <h1 className="mt-3 text-3xl leading-tight">Template not available here yet</h1>
      <p className="mt-4 text-base text-muted-foreground">
        <strong>{templateId}</strong> is not rendered on this surface yet. Continue in the agent
        room or enroll for guided Safety work.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/agent">Talk to Movemental</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/program">Program hub</Link>
        </Button>
      </div>
    </main>
  );
}
