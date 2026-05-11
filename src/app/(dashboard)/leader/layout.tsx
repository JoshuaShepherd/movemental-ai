import { redirect } from "next/navigation";

import { getMovementLeaderByEmail } from "@/lib/movement-leaders/movement-leaders.server";
import { createClient } from "@/lib/supabase/server";

export default async function LeaderProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login?next=%2Fleader");
  }

  const leader = await getMovementLeaderByEmail(user.email);
  if (!leader) {
    redirect("/dashboard");
  }

  return children;
}
