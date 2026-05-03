import {
  type AudienceId,
  type IntelligenceField,
} from "./fragmentation-story-content";
import { FragmentationStageIntroBand } from "./fragmentation-stage-intro-band";
import { FragmentationStoryStageMultiplication } from "./fragmentation-story-stage-multiplication";

type Props = {
  audience: AudienceId;
  field: IntelligenceField;
};

export function FragmentationStoryStageMultiplicationNew({ audience, field }: Props) {
  return (
    <>
      <FragmentationStageIntroBand
        id="stage-multiplication-band"
        surface="section"
        number={5}
        name="Multiplication"
        lead="Your work begins to scale through systems."
        knowledge="Your knowledge expands through search, translation, AI, and structured distribution."
        relationships="Your relationships deepen and grow through coordinated communication and network awareness."
        conclusion={[
          "This isn’t just more reach.",
          "It’s the ability for your work to reproduce—consistently, coherently, and at scale.",
        ]}
      />
      <FragmentationStoryStageMultiplication audience={audience} field={field} />
    </>
  );
}
