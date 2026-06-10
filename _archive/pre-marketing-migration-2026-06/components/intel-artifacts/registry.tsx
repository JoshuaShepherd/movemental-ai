import type { ComponentType } from "react";

import {
  BookFragmentsOfFormIntel,
  CoreHubToFragmentNodesIntel,
  CoverPrinciplesDesignFragmentationIntel,
  CoverStructuralFragmentsInvestigationIntel,
  CrmPersonCardIntel,
  DocPdfGenericIntel,
  EmailThreadMultiParticipantIntel,
  FormalDesignSystemsSplitFlowIntel,
  MessageThreadStaggeredFragmentsIntel,
  MobileChatSkeletonBubblesIntel,
  ModuleFormalSystemsIntroIntel,
  NodeGroupIntel,
  NodeSingleIntel,
  NotesStickySketchIntel,
  OrderOfServiceStructuredUnitsIntel,
  PodcastCardAbstractStructuresIntel,
  SessionEssentialStructuresCardIntel,
  SketchConvergeDivergeFlowIntel,
  StagePresentationThreeShapesIntel,
  VideoFrameTimestampedIntel,
} from "./narrative-artifacts";
import {
  IntelAiAgentWorkpack,
  IntelEcommerceShelf,
  IntelGeoEntityCard,
  IntelSeoSurface,
  IntelSubscriptionLedger,
  IntelTranslationLocaleStack,
} from "./operational-views";
import type { IntelArtifactBaseProps, NarrativeIntelSlug, OperationalIntelSlug } from "./types";

/** Narrative slugs → React view (drop-in replacement for story images). */
export const NARRATIVE_INTEL_REGISTRY: Record<NarrativeIntelSlug, ComponentType<IntelArtifactBaseProps>> = {
  "order-of-service-structured-units": OrderOfServiceStructuredUnitsIntel,
  "session-essential-structures-card": SessionEssentialStructuresCardIntel,
  "formal-design-systems-split-flow": FormalDesignSystemsSplitFlowIntel,
  "book-fragments-of-form": BookFragmentsOfFormIntel,
  "module-formal-systems-intro": ModuleFormalSystemsIntroIntel,
  "cover-principles-design-fragmentation": CoverPrinciplesDesignFragmentationIntel,
  "cover-structural-fragments-investigation": CoverStructuralFragmentsInvestigationIntel,
  "podcast-card-abstract-structures": PodcastCardAbstractStructuresIntel,
  "mobile-chat-skeleton-bubbles": MobileChatSkeletonBubblesIntel,
  "email-thread-multi-participant": EmailThreadMultiParticipantIntel,
  "message-thread-staggered-fragments": MessageThreadStaggeredFragmentsIntel,
  "core-hub-to-fragment-nodes": CoreHubToFragmentNodesIntel,
  "sketch-converge-diverge-flow": SketchConvergeDivergeFlowIntel,
  "stage-presentation-three-shapes": StagePresentationThreeShapesIntel,
  "doc-pdf-generic": DocPdfGenericIntel,
  "video-frame-timestamped": VideoFrameTimestampedIntel,
  "notes-sticky-sketch": NotesStickySketchIntel,
  "crm-person-card": CrmPersonCardIntel,
  "node-single": NodeSingleIntel,
  "node-group": NodeGroupIntel,
};

/** Operational intelligence surfaces (SEO, GEO, commerce, etc.). */
export const OPERATIONAL_INTEL_REGISTRY: Record<OperationalIntelSlug, ComponentType<IntelArtifactBaseProps>> = {
  "intel-seo-surface": IntelSeoSurface,
  "intel-geo-entity": IntelGeoEntityCard,
  "intel-translation-stack": IntelTranslationLocaleStack,
  "intel-ecommerce-shelf": IntelEcommerceShelf,
  "intel-subscription-ledger": IntelSubscriptionLedger,
  "intel-ai-agent-workpack": IntelAiAgentWorkpack,
};

export function isNarrativeIntelSlug(s: string): s is NarrativeIntelSlug {
  return s in NARRATIVE_INTEL_REGISTRY;
}

export function isOperationalIntelSlug(s: string): s is OperationalIntelSlug {
  return s in OPERATIONAL_INTEL_REGISTRY;
}
