import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";
import { ONBUILDING_ADMIN_EMAIL, requireOnbuildingAdmin } from "@/lib/auth/require-onbuilding-admin";

export const metadata: Metadata = {
  title: "Onbuilding composition",
  robots: { index: false, follow: false },
};

export default async function OnbuildingAdminLayout({ children }: { children: ReactNode }) {
  const auth = await requireOnbuildingAdmin();

  if ("error" in auth) {
    const h = await headers();
    const path = h.get("x-pathname") ?? "/admin/onbuilding";
    if (auth.error.status === 401) {
      redirect(`/login?next=${encodeURIComponent(path)}`);
    }
    redirect("/agent");
  }

  return (
    <InkBandUtilityShell>
      <div className="mx-auto w-full max-w-[var(--container-max)] px-4 py-10 md:px-6">
        <p className="sr-only">Signed in as {ONBUILDING_ADMIN_EMAIL}</p>
        {children}
      </div>
    </InkBandUtilityShell>
  );
}
