import {
  type AudienceId,
  type IntelligenceField,
} from "./fragmentation-story-content";
import { FragmentationStageIntroBand } from "./fragmentation-stage-intro-band";
import { FragmentationStoryStageFormation } from "./fragmentation-story-stage-formation";

type Props = {
  audience: AudienceId;
  field: IntelligenceField;
};

export function FragmentationStoryStageFormationNew({ audience, field }: Props) {
  return (
    <>
      <FragmentationStageIntroBand
        id="stage-formation-band"
        surface="section"
        number={4}
        name="Formation"
        lead="People are shaped, not just informed."
        knowledge="Your knowledge is experienced through intentional pathways, not random consumption."
        relationships="Your relationships reinforce learning through shared practice, accountability, and alignment."
        conclusion={[
          "Information creates clarity.",
          "Relationships create change.",
          "Together, they form people who can carry the work forward.",
        ]}
      />
      <FragmentationStoryStageFormation audience={audience} field={field} />
    </>
  );
}
