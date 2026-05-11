import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Display } from "@/components/primitives/display";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Section } from "@/components/primitives/section";
import {
  listMovementLeaderApplicationsForAdmin,
  listMovementLeadersForAdmin,
} from "@/lib/movement-leaders/movement-leaders.server";
import { isUserStaff } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Movement leaders (admin)",
};

export default async function AdminLeadersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    redirect("/login?next=%2Fadmin%2Fleaders");
  }
  if (!(await isUserStaff(user.id))) {
    redirect("/dashboard");
  }

  const leaders = await listMovementLeadersForAdmin();
  const applications = await listMovementLeaderApplicationsForAdmin();

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <Eyebrow>Staff</Eyebrow>
        <Display as="h1" size="sm">
          Movement leaders
        </Display>
        <p className="max-w-(--prose-max) text-sm text-muted-foreground">
          Provisioned leader rows and inbound applications. Editing flows land with Stitch admin
          templates; this console is a read-first index until those surfaces ship.
        </p>
      </header>

      <Section variant="section" spacing="sm" className="rounded-xl">
        <h2 className="font-serif text-lg font-medium text-foreground">Leader profiles</h2>
        {leaders.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No rows (or tables not migrated).</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border-soft text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Slug</th>
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 font-medium">Published</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((l) => (
                  <tr key={l.id} className="border-b border-border-soft/60">
                    <td className="py-2 pr-4 text-foreground">{l.full_name}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{l.slug}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{l.email}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{l.status}</td>
                    <td className="py-2 text-muted-foreground">
                      {l.public_page_published_at ? "Yes" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <Section variant="section" spacing="sm" className="rounded-xl">
        <h2 className="font-serif text-lg font-medium text-foreground">Applications</h2>
        {applications.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No applications yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border-soft text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 pr-4 font-medium">Org</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a.id} className="border-b border-border-soft/60">
                    <td className="py-2 pr-4 text-foreground">{a.full_name}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{a.email}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{a.organization ?? "—"}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{a.status}</td>
                    <td className="py-2 text-muted-foreground">
                      {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
                        new Date(a.created_at),
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </div>
  );
}
