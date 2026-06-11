import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { InviteManager } from "@/components/ai-reality/invite-manager";
import { getOptionalAuthUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Invite your team",
  robots: { index: false, follow: false },
};

export default async function AgentInvitePage() {
  const { user } = await getOptionalAuthUser();
  if (!user) {
    redirect("/assess");
  }
  return (
    <main>
      <InviteManager />
    </main>
  );
}
