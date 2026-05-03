/** Intelligence artifact views — wired into `/fragmentation` and previewed at `/system/intel-artifacts`. */

export type {
  IntelArtifactBaseProps,
  IntelAudience,
  IntelField,
  IntelSlug,
  IntelVariant,
  NarrativeIntelSlug,
  OperationalIntelSlug,
} from "./types";
export { NARRATIVE_INTEL_SLUGS, OPERATIONAL_INTEL_SLUGS } from "./types";

export {
  IntelView,
  IvAvatar,
  IvBar,
  IvChip,
  IvCol,
  IvEyebrow,
  IvMeter,
  IvNode,
  IvNodeGroup,
  IvPdfBadge,
  IvPlayGlyph,
  IvRow,
  IvRule,
  IvSticky,
} from "./primitives";

export {
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

export {
  IntelAiAgentWorkpack,
  IntelEcommerceShelf,
  IntelGeoEntityCard,
  IntelSeoSurface,
  IntelSubscriptionLedger,
  IntelTranslationLocaleStack,
} from "./operational-views";

export {
  isNarrativeIntelSlug,
  isOperationalIntelSlug,
  NARRATIVE_INTEL_REGISTRY,
  OPERATIONAL_INTEL_REGISTRY,
} from "./registry";

export {
  IntelArtifactBySlug,
  IntelNarrativeArtifact,
  IntelOperationalArtifact,
  type IntelArtifactBySlugProps,
  type IntelNarrativeArtifactProps,
  type IntelOperationalArtifactProps,
} from "./intel-artifact";
