import { VoiceDetailPage } from "@/components/voices/voice-detail-page";
import type { CommittedVoice } from "@/lib/committed-voices";

interface VoiceProfileViewProps {
  voice: CommittedVoice;
}

/**
 * Staging view for Movemental Voice Profile.
 * Matches design specification in Movemental Voice Profile.dc.html.
 */
export function VoiceProfileView({ voice }: VoiceProfileViewProps) {
  return <VoiceDetailPage voice={voice} />;
}
