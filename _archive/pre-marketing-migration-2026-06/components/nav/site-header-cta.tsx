import Link from "next/link";

import { getMovementLeaderByEmail } from "@/lib/movement-leaders/movement-leaders.server";
import { listMembershipOrganizations } from "@/lib/services/onboarding/onboarding.service";
import { getOptionalAuthUser } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

function contactCta(variant: "desktop" | "mobile") {
  const isDesktop = variant === "desktop";
  return (
    <Link
      href="/contact?interest=safestart"
      aria-label="Start SafeStart — the $1,000 facilitated engagement"
      className={cn(
        "btn-pill btn-pill--primary",
        isDesktop ? "py-2.5" : "mt-4 flex w-full justify-center py-3 text-center",
      )}
    >
      Start SafeStart
    </Link>
  );
}

function leaderCta(variant: "desktop" | "mobile") {
  const isDesktop = variant === "desktop";
  return (
    <Link
      href="/leader"
      className={cn(
        "btn-pill btn-pill--primary",
        isDesktop ? "py-2.5" : "mt-4 flex w-full justify-center py-3 text-center",
      )}
    >
      Go to your Leader workspace →
    </Link>
  );
}

function bothCtas(variant: "desktop" | "mobile") {
  const isDesktop = variant === "desktop";
  if (!isDesktop) {
    return (
      <div className="mt-4 flex flex-col gap-2">
        <Link href="/leader" className="btn-pill btn-pill--primary flex w-full justify-center py-3 text-center">
          Go to your Leader workspace →
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <Link href="/leader" className="btn-pill btn-pill--primary py-2.5">
        Go to your Leader workspace →
      </Link>
    </div>
  );
}

/**
 * Session-aware primary CTA for the marketing header (desktop + mobile slots).
 * Rendered from the root layout as a Server Component and passed into {@link SiteHeader}.
 */
export async function SiteHeaderCta({ variant }: { variant: "desktop" | "mobile" }) {
  try {
    const { user } = await getOptionalAuthUser();
    if (!user?.id) {
      return contactCta(variant);
    }

    const [memberships, leader] = await Promise.all([
      listMembershipOrganizations(user.id),
      getMovementLeaderByEmail(user.email ?? ""),
    ]);
    const hasOrg = memberships.length > 0;
    const hasLeader = Boolean(leader);

    if (!hasOrg && !hasLeader) {
      return contactCta(variant);
    }
    if (hasOrg && hasLeader) {
      return bothCtas(variant);
    }
    if (hasOrg) {
      return contactCta(variant);
    }
    return leaderCta(variant);
  } catch {
    return contactCta(variant);
  }
}
