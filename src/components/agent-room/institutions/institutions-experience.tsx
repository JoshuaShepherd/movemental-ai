import { AudiencePageExperience } from "@/components/agent-room/audience/audience-page-experience";
import { INSTITUTIONS_PAGE_CONFIG } from "@/components/agent-room/audience/institutions-config";

/** `/agent/institutions` — thin wrapper around the shared audience template. */
export function InstitutionsExperience({ letterMarkdown }: { letterMarkdown: string }) {
  return (
    <AudiencePageExperience config={INSTITUTIONS_PAGE_CONFIG} letterMarkdown={letterMarkdown} />
  );
}
