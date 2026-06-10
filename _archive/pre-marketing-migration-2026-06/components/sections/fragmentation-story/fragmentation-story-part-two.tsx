"use client";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";

import {
  type AudienceId,
  type IntelligenceField,
} from "./fragmentation-story-content";
import { FragmentationStoryOutroCta } from "./fragmentation-story-outro-cta";
import { FragmentationStoryStageActivation } from "./fragmentation-story-stage-activation";
import { FragmentationStoryStageFormation } from "./fragmentation-story-stage-formation";
import { FragmentationStoryStageIntegration } from "./fragmentation-story-stage-integration";
import { FragmentationStoryStageMovement } from "./fragmentation-story-stage-movement";
import { FragmentationStoryStageMultiplication } from "./fragmentation-story-stage-multiplication";

type Props = {
  audience: AudienceId;
  field: IntelligenceField;
  movementNodeCount: number;
  onMovementNodeCountChange: (n: number) => void;
};

export function FragmentationStoryPartTwo({
  audience,
  field,
  movementNodeCount,
  onMovementNodeCountChange,
}: Props) {
  return (
    <>
      <Section id="bridge-part-two" variant="section" spacing="lg">
        <Container className="grid gap-8 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              Part II · The system
            </p>
            <p className="mt-4 max-w-xl text-balance text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              We don&apos;t generate a new scene for each stage.{" "}
              <em className="not-italic text-primary">We re-compose the same intelligence.</em>
            </p>
          </div>
          <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
            Every artifact you&apos;ve just seen is reusable. What changes is how{" "}
            <strong className="text-foreground">informational</strong> and{" "}
            <strong className="text-foreground">relational</strong> intelligence get arranged,
            connected, made usable, brought into formation, reproduced through infrastructure—and
            how whole platforms meet as a field.{" "}
            <strong className="text-foreground">
              Six stages—from fragmentation to movement. One library.
            </strong>
          </p>
        </Container>
      </Section>

      <FragmentationStoryStageIntegration audience={audience} field={field} />
      <FragmentationStoryStageActivation audience={audience} field={field} />
      <FragmentationStoryStageFormation audience={audience} field={field} />
      <FragmentationStoryStageMultiplication audience={audience} field={field} />
      <FragmentationStoryStageMovement
        audience={audience}
        nodeCount={movementNodeCount}
        onNodeCountChange={onMovementNodeCountChange}
      />
      <FragmentationStoryOutroCta />
    </>
  );
}
