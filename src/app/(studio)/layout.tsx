import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { isUserStaff } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Agent runtime",
  robots: { index: false, follow: false },
};

export default async function StudioLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    const h = await headers();
    const path = h.get("x-pathname") ?? "/agent-runtime";
    redirect(`/login?next=${encodeURIComponent(path)}`);
  }

  const staff = await isUserStaff(user.id);
  if (!staff) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto w-full max-w-[var(--container-max)] px-4 py-10 md:px-6">
      {children}
    </div>
  );
}
