import { redirect } from "next/navigation";
import { getOptionalAuthUser } from "@/lib/supabase/server";

/**
 * Workspace entry for v2 dashboard staging.
 */
export default async function V2DashboardPage() {
  const { user } = await getOptionalAuthUser();
  if (!user) {
    redirect("/login?next=/dashboard");
  }

  redirect("/dashboard/safety");
}
