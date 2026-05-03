import {
  type AudienceId,
  type IntelligenceField,
} from "./fragmentation-story-content";
import { FragmentationStageIntroBand } from "./fragmentation-stage-intro-band";
import { FragmentationStoryStageIntegration } from "./fragmentation-story-stage-integration";

type Props = {
  audience: AudienceId;
  field: IntelligenceField;
};

/**
 * Integration stage on `/fragmentation-new` — the canonical intro band sits
 * above the reused integration visualization so the six stages read as peers.
 */
export function FragmentationStoryStageIntegrationNew({ audience, field }: Props) {
  return (
    <>
      <FragmentationStageIntroBand
        id="stage-integration-band"
        surface="section"
        number={2}
        name="Integration"
        lead="Everything is brought into one system."
        knowledge="Your knowledge becomes structured, connected, and coherent."
        relationships="Your relationships become visible, mapped, and contextual."
        conclusion={[
          "Now what you know and who you know begin to work together.",
          "Instead of scattered pieces, you have a unified source of intelligence.",
        ]}
      />
      <FragmentationStoryStageIntegration audience={audience} field={field} />
    </>
  );
}
