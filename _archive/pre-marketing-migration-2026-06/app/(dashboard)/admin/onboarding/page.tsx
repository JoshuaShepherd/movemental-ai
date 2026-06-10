import { redirect } from "next/navigation";

import { AdminOnboardingClient } from "./admin-onboarding-client";
import {
  isUserStaff,
  listAdminOnboardingSummaries,
} from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export default async function AdminOnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    redirect("/login?next=/admin/onboarding");
  }

  if (!(await isUserStaff(user.id))) {
    redirect("/dashboard");
  }

  const rows = await listAdminOnboardingSummaries();

  return <AdminOnboardingClient initialRows={rows} />;
}
