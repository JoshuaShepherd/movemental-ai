import { type AudienceId } from "./fragmentation-story-content";
import { FragmentationStageIntroBand } from "./fragmentation-stage-intro-band";
import { FragmentationStoryStageMovement } from "./fragmentation-story-stage-movement";

type Props = {
  audience: AudienceId;
  nodeCount: number;
  onNodeCountChange: (n: number) => void;
};

export function FragmentationStoryStageMovementNew({
  audience,
  nodeCount,
  onNodeCountChange,
}: Props) {
  return (
    <>
      <FragmentationStageIntroBand
        id="stage-movement-band"
        surface="section"
        number={6}
        name="Movement"
        lead="Your work becomes part of a connected field."
        knowledge="Your knowledge integrates with other systems, forming shared language and understanding."
        relationships="Your relationships connect across leaders, organizations, and communities."
        conclusion={[
          "What began as fragmented intelligence",
          "becomes a network of living systems.",
          "This is where individual work becomes collective momentum.",
        ]}
      />
      <FragmentationStoryStageMovement
        audience={audience}
        nodeCount={nodeCount}
        onNodeCountChange={onNodeCountChange}
      />
    </>
  );
}
