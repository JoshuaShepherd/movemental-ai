import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getOptionalAuthUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Program",
  robots: { index: false, follow: false },
};

/**
 * Program hub stub — unauthenticated visitors go to login; authenticated users
 * see an honest holding page until the program workspace returns.
 */
export default async function ProgramPage() {
  const { user } = await getOptionalAuthUser();
  if (!user) {
    redirect("/login?next=/program");
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 md:py-16">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
        Program workspace
      </p>
      <h1 className="mt-3 text-3xl leading-tight">Program templates are not on this surface yet</h1>
      <p className="mt-4 text-base text-muted-foreground">
        Safety and Sandbox program workspaces will return in a future release. For now, use the
        agent room or enroll for the facilitated Safety path.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/agent">Talk to Movemental</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/enroll">Enroll in Safety</Link>
        </Button>
      </div>
    </main>
  );
}
