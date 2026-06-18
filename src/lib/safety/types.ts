import type {
  SafetyArtifactCommentRow,
  SafetyArtifactRow,
  SafetyArtifactVersionRow,
  SafetyEngagementRow,
  SafetyGuidebookRatificationRow,
  SafetyGuidebookRow,
  SafetyGuidebookSignatureRow,
  SafetyLayerChecklistItemRow,
  SafetyReviewStatus,
  SafetyRolloutArtifactRow,
  SafetyRoleAccessRow,
} from "@/lib/safety/db-types";

export interface GuidebookLayerCard {
  artifactId: string;
  guidebookId: string | null;
  layerOrder: number | null;
  kind: string;
  title: string;
  slug: string;
  deck: string | null;
  reviewStatus: SafetyReviewStatus;
  publicationStatus: string;
}

export interface EngagementProgress {
  engagementId: string;
  organizationId: string;
  plan: string;
  status: string;
  currentStep: number;
  week: number;
  kickoffAt: string | null;
  dashboardProvisionedAt: string | null;
  completedAt: string | null;
  guidebookId: string | null;
}

export interface GuidebookSummary {
  guidebookId: string;
  organizationId: string;
  title: string;
  status: SafetyReviewStatus;
  currentVersion: number;
  ratifiedAt: string | null;
  layers: GuidebookLayerCard[];
}

export interface ChecklistItemVM {
  id: string;
  label: string;
  isComplete: boolean;
  sortOrder: number;
}

export interface LayerDetailVM extends GuidebookLayerCard {
  bodyMd: string;
  versionNumber: number;
  checklist: ChecklistItemVM[];
}

export interface ReviewCommentVM {
  id: string;
  artifactId: string;
  clauseRef: string | null;
  quotedSnippet: string | null;
  body: string;
  status: "open" | "resolved";
  parentId: string | null;
  authorUserId: string | null;
  resolvedAt: string | null;
  createdAt: string;
}

export interface SignatureVM {
  id: string;
  signerName: string;
  signerRole: string | null;
  status: "awaiting" | "signed";
  signedAt: string | null;
  versionNumber: number | null;
}

export interface RatificationVM {
  id: string;
  versionNumber: number;
  boardChairName: string | null;
  facilitatorName: string | null;
  ratifiedAt: string;
  signedAt: string | null;
  notes: string | null;
}

export interface RolloutArtifactVM {
  id: string;
  kind: string;
  title: string;
  status: "locked" | "ready";
  fileUrl: string | null;
  generatedAt: string | null;
}

export interface RoleAccessMatrixEntry {
  role: string;
  area: string;
  canView: boolean;
}

export interface AskGuidebookResultVM {
  questionId: string;
  matchedArtifactId: string | null;
  matchedClauseRef: string | null;
  answerSnippet: string | null;
}

export function toLayerCard(row: SafetyArtifactRow): GuidebookLayerCard {
  return {
    artifactId: row.id,
    guidebookId: row.guidebook_id,
    layerOrder: row.layer_order,
    kind: row.kind,
    title: row.title,
    slug: row.slug,
    deck: row.deck,
    reviewStatus: row.review_status,
    publicationStatus: row.status,
  };
}

export function toEngagementProgress(row: SafetyEngagementRow): EngagementProgress {
  return {
    engagementId: row.id,
    organizationId: row.organization_id,
    plan: row.plan,
    status: row.status,
    currentStep: row.current_step,
    week: row.week,
    kickoffAt: row.kickoff_at,
    dashboardProvisionedAt: row.dashboard_provisioned_at,
    completedAt: row.completed_at,
    guidebookId: row.guidebook_id,
  };
}

export function toGuidebookSummary(
  guidebook: SafetyGuidebookRow,
  layers: SafetyArtifactRow[],
): GuidebookSummary {
  return {
    guidebookId: guidebook.id,
    organizationId: guidebook.organization_id,
    title: guidebook.title,
    status: guidebook.status,
    currentVersion: guidebook.current_version,
    ratifiedAt: guidebook.ratified_at,
    layers: layers
      .filter((l) => l.guidebook_id === guidebook.id)
      .sort((a, b) => (a.layer_order ?? 0) - (b.layer_order ?? 0))
      .map(toLayerCard),
  };
}

export function toChecklistItemVM(row: SafetyLayerChecklistItemRow): ChecklistItemVM {
  return {
    id: row.id,
    label: row.label,
    isComplete: row.is_complete,
    sortOrder: row.sort_order,
  };
}

export function toLayerDetailVM(
  artifact: SafetyArtifactRow,
  version: SafetyArtifactVersionRow | null,
  checklist: SafetyLayerChecklistItemRow[],
): LayerDetailVM {
  return {
    ...toLayerCard(artifact),
    bodyMd: version?.body_md ?? "",
    versionNumber: version?.version_number ?? 1,
    checklist: checklist
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(toChecklistItemVM),
  };
}

export function toReviewCommentVM(row: SafetyArtifactCommentRow): ReviewCommentVM {
  return {
    id: row.id,
    artifactId: row.artifact_id,
    clauseRef: row.clause_ref,
    quotedSnippet: row.quoted_snippet,
    body: row.body,
    status: row.status,
    parentId: row.parent_id,
    authorUserId: row.author_user_id,
    resolvedAt: row.resolved_at,
    createdAt: row.created_at,
  };
}

export function toSignatureVM(row: SafetyGuidebookSignatureRow): SignatureVM {
  return {
    id: row.id,
    signerName: row.signer_name,
    signerRole: row.signer_role,
    status: row.status,
    signedAt: row.signed_at,
    versionNumber: row.version_number,
  };
}

export function toRatificationVM(row: SafetyGuidebookRatificationRow): RatificationVM {
  return {
    id: row.id,
    versionNumber: row.version_number,
    boardChairName: row.board_chair_name,
    facilitatorName: row.facilitator_name,
    ratifiedAt: row.ratified_at,
    signedAt: row.signed_at,
    notes: row.notes,
  };
}

export function toRolloutArtifactVM(row: SafetyRolloutArtifactRow): RolloutArtifactVM {
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    status: row.status === "ready" ? "ready" : "locked",
    fileUrl: row.file_url,
    generatedAt: row.generated_at,
  };
}

export function toRoleAccessEntry(row: SafetyRoleAccessRow): RoleAccessMatrixEntry {
  return {
    role: row.role,
    area: row.area,
    canView: row.can_view,
  };
}
