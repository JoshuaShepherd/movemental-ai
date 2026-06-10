import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getMovementLeaderByEmail } from "@/lib/movement-leaders/movement-leaders.server";

export default async function LeaderOnboardingLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const leader = await getMovementLeaderByEmail(user?.email ?? null);
  if (!leader) {
    redirect("/dashboard");
  }
  return <>{children}</>;
}
