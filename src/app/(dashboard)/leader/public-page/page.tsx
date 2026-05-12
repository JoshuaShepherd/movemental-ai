import type { Metadata } from "next";

import { getMovementLeaderByEmail } from "@/lib/movement-leaders/movement-leaders.server";
import { snapshotFromLeader } from "@/lib/movement-leaders/public-page-model";
import {
  getLatestDraftSnapshot,
  getMovementLeaderPublicPageGate,
  listPublicPageVersions,
} from "@/lib/movement-leaders/public-page-ratification.server";
import { createClient } from "@/lib/supabase/server";

import { LeaderPublicPageRatificationClient } from "./leader-public-page-ratification-client";

export const metadata: Metadata = {
  title: "Public page",
};

export default async function LeaderPublicPagePreview() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const leader = await getMovementLeaderByEmail(user?.email ?? null);
  if (!leader) {
    return null;
  }

  const gate = await getMovementLeaderPublicPageGate(leader.id);
  const isLive = Boolean(leader.public_page_published_at) && !gate?.unpublished_at;
  const draft = await getLatestDraftSnapshot(leader.id);
  const initialSnapshot = draft ?? snapshotFromLeader(leader);
  const versions = await listPublicPageVersions(leader.id);
  const snapshotRevision = versions[0]?.version_number ?? 0;
  const publicPath = `/movement-leaders/${leader.slug}`;

  return (
    <LeaderPublicPageRatificationClient
      key={snapshotRevision}
      leader={{
        id: leader.id,
        slug: leader.slug,
        full_name: leader.full_name,
        photo_url: leader.photo_url,
        primary_role: leader.primary_role,
        primary_organization: leader.primary_organization,
      }}
      initialSnapshot={initialSnapshot}
      isLive={isLive}
      publicPath={publicPath}
    />
  );
}
