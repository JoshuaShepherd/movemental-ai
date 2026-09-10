import { FounderProfilePage } from "@/components/founders/founder-profile-page";
import type { FounderProfile } from "@/lib/founders/content";

interface FounderDetailViewProps {
  profile: FounderProfile;
}

/**
 * Staging view for Movemental Founder Detail.
 * Matches design specification in Movemental Founder Profile.dc.html.
 */
export function FounderDetailView({ profile }: FounderDetailViewProps) {
  return <FounderProfilePage profile={profile} />;
}
