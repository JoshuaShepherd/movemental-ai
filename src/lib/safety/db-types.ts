import type { Database } from "@/lib/supabase/database.types";

export type SafetyTables = Database["public"]["Tables"];

export type SafetyGuidebookRow = SafetyTables["safety_guidebooks"]["Row"];
export type SafetyEngagementRow = SafetyTables["safety_engagements"]["Row"];
export type SafetyArtifactRow = SafetyTables["safety_artifacts"]["Row"];
export type SafetyArtifactVersionRow = SafetyTables["safety_artifact_versions"]["Row"];
export type SafetyLayerChecklistItemRow = SafetyTables["safety_layer_checklist_items"]["Row"];
export type SafetyArtifactCommentRow = SafetyTables["safety_artifact_comments"]["Row"];
export type SafetyGuidebookSignatureRow = SafetyTables["safety_guidebook_signatures"]["Row"];
export type SafetyGuidebookRatificationRow = SafetyTables["safety_guidebook_ratifications"]["Row"];
export type SafetyRolloutArtifactRow = SafetyTables["safety_rollout_artifacts"]["Row"];
export type SafetyEnrollmentRow = SafetyTables["safety_enrollments"]["Row"];
export type SafetyQuestionRow = SafetyTables["safety_questions"]["Row"];
export type SafetyRoleAccessRow = SafetyTables["safety_role_access"]["Row"];

export type SafetyReviewStatus = Database["public"]["Enums"]["safety_review_status"];
export type SafetyEngagementStatus = Database["public"]["Enums"]["safety_engagement_status"];
export type SafetyEnrollmentStatus = Database["public"]["Enums"]["safety_enrollment_status"];
export type SafetyRolloutKind = Database["public"]["Enums"]["safety_rollout_kind"];
export type SafetyCommentStatus = Database["public"]["Enums"]["safety_comment_status"];
export type SafetySignatureStatus = Database["public"]["Enums"]["safety_signature_status"];
