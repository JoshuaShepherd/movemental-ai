// Auto-generated Zod schemas from Drizzle schema
// Generated at: 2026-06-10T23:33:47.001Z
// Do not edit manually - regenerate with: pnpm generate:schemas

import { z } from "zod";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import {
  userProfiles,
  subscriptionPlans,
  organizations,
  contentCategories,
  courses,
  courseLessons,
  courseEnrollments,
  accessExpirations,
  affiliates,
  purchases,
  affiliateReferrals,
  agentGuardrailAssignments,
  agentGuardrails,
  corpusBindings,
  promptPacks,
  promptPackLayers,
  agents,
  agentHandoffs,
  agentInstances,
  contentItems,
  sermonPreparations,
  agentInteractions,
  agentMetrics,
  agentToolAssignments,
  agentTools,
  agentTraces,
  assessments,
  userAssessments,
  aiInsights,
  aiLabConversations,
  aiLabLiteConversations,
  aiLabTestTickets,
  aiLabTestRuns,
  aiLabTestFeedback,
  aiLabTestFlags,
  analyticsEvents,
  archiveCollections,
  archiveTopics,
  archiveItems,
  archiveItemRevisions,
  archiveMedia,
  archiveQuotes,
  assessmentCheckpoints,
  assessmentQuestions,
  assessmentResponses,
  assessmentShareTokens,
  courseAssignments,
  assignmentSubmissions,
  assignmentGrades,
  audienceProfiles,
  auditLogs,
  bookSeries,
  books,
  bookChapters,
  booksChapters,
  bookHighlights,
  bookPurchases,
  bookReadingProgress,
  bookReviews,
  bookmarks,
  certificateTemplates,
  certificates,
  ceCredits,
  checkpointQuestions,
  checkpointResponses,
  citations,
  residencyProjects,
  cohorts,
  coachingHuddles,
  cohortDiscussionMessages,
  cohortSessions,
  comments,
  communities,
  contentAnalytics,
  contentFormTemplates,
  contentTemplatePlacement,
  contentTemplates,
  contentVersions,
  contentWorkflows,
  contextSnapshots,
  coupons,
  courseAnnouncements,
  courseBundles,
  courseDripSchedules,
  courseModules,
  formationPracticeAssignments,
  courseOutcomes,
  coursePersonalization,
  coursePrerequisites,
  courseProgressionRules,
  courseSalesPages,
  courseWeeks,
  credibilityRubrics,
  digitalBadges,
  discernmentProcesses,
  discussionPrompts,
  donations,
  emailTemplates,
  eventRegistrations,
  exercises,
  exerciseCompletions,
  fieldExperiments,
  formationCheckins,
  formationGoals,
  formationExperiments,
  formationPracticeCompletions,
  handoffEvents,
  kairosMoments,
  lessonProgress,
  mediaItems,
  mediaUsageTracking,
  neighborhoodExegesisEntries,
  bookEmailSubscribers,
  bookMarginNotes,
  bookRevisions,
  bookEndorsements,
  newsletterSubscribers,
  notebookArtifacts,
  notebookConversations,
  notebookSourceChunks,
  notebookSources,
  notebooks,
  notificationDeliveries,
  onboardingResponses,
  organizationMemberships,
  pageViews,
  pathways,
  pathwaySections,
  performanceMetrics,
  podcastSeries,
  podcastEpisodes,
  prospects,
  questionBanks,
  reflectionJournals,
  reflectionQuestions,
  reflectionResponses,
  remotionDrafts,
  savedArchiveViews,
  searchAnalytics,
  searchHistory,
  sitePages,
  translationJobs,
  userCallingProfiles,
  userContextProfiles,
  userIdentityProfiles,
  userInterests,
  userMemory,
  userNeighborhoodContext,
  userNotifications,
  userPersonality,
  userStrengths,
  userStrugglesChallenges,
  userSubscriptions,
  userVocation,
  videoRecordings,
  videoAnnotations,
  videoRecordingSegments,
  videoRecordingSlides,
  videoRecordingWhiteboard,
  videoSeries,
  videos,
  videoWatchHistory,
  voiceBaselines,
  voiceFidelityEvalSamples,
  voiceFidelityFeedback,
  voiceIdentities,
  workflows,
  workspaceDocuments,
  workspaceLiveblocksSnapshots,
  write,
  writeContent,
  writingExamples,
  writingInteractions,
  writingSessionFeedback,
  writingSessions,
  writingStylePreferences,
  contactSubmissions,
  agentRoomLeads,
  leaderApplications,
  organizationInquiries,
  assessmentResults,
  systemReadinessAssessments,
  dualIntelligenceAssessments,
  integrityDiagnosticSubmissions,
  onboardingTasks,
  signedAgreements,
  organizationAssets,
  corpusReviewItems,
  consentRecords,
  staffUsers,
  bookPdfEditions,
  programEngagements,
  recipes,
  cohortMembers,
  futurePlans,
  futurePlanVersions,
  futurePlanRatifications,
  safetyArtifacts,
  safetyArtifactVersions,
  safetyArtifactPublications,
  stageTransitions,
  movementLeaders,
  movementLeaderGenerated,
  leaderRevisionRequests,
  movementLeaderSignings,
  movementLeaderApplications,
  movementLeaderPublicPages,
  movementLeaderPublicPageVersions,
  sandboxStaffReadinessSubmissions,
  sandboxStaffReadinessInvites,
  sandboxStaffReadinessAnonymousSubmissions,
  aiRealityInvites,
  aiRealityResults,
  aiRealityOrgResults,
  aiRealityShareTokens,
} from "@/lib/db/schema";

// ---- Base Filters ----

export const BaseFiltersSchema = z.object({
  limit: z.number().int().positive().max(100).optional(),
  offset: z.number().int().nonnegative().optional(),
  search: z.string().optional(),
});

export type BaseFilters = z.infer<typeof BaseFiltersSchema>;

// ---- Entity Schemas ----

// UserProfiles
export const UserProfilesSelectSchema = createSelectSchema(userProfiles);
export const UserProfilesInsertSchema = createInsertSchema(userProfiles);
export const UserProfilesUpdateSchema = createUpdateSchema(userProfiles);
export const UserProfilesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type UserProfiles = z.infer<typeof UserProfilesSelectSchema>;
export type UserProfilesCreate = z.infer<typeof UserProfilesInsertSchema>;
export type UserProfilesUpdate = z.infer<typeof UserProfilesUpdateSchema>;
export type UserProfilesFilters = z.infer<typeof UserProfilesFiltersSchema>;

// SubscriptionPlans
export const SubscriptionPlansSelectSchema = createSelectSchema(subscriptionPlans);
export const SubscriptionPlansInsertSchema = createInsertSchema(subscriptionPlans);
export const SubscriptionPlansUpdateSchema = createUpdateSchema(subscriptionPlans);
export const SubscriptionPlansFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type SubscriptionPlans = z.infer<typeof SubscriptionPlansSelectSchema>;
export type SubscriptionPlansCreate = z.infer<typeof SubscriptionPlansInsertSchema>;
export type SubscriptionPlansUpdate = z.infer<typeof SubscriptionPlansUpdateSchema>;
export type SubscriptionPlansFilters = z.infer<typeof SubscriptionPlansFiltersSchema>;

// Organizations
export const OrganizationsSelectSchema = createSelectSchema(organizations);
export const OrganizationsInsertSchema = createInsertSchema(organizations);
export const OrganizationsUpdateSchema = createUpdateSchema(organizations);
export const OrganizationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type Organizations = z.infer<typeof OrganizationsSelectSchema>;
export type OrganizationsCreate = z.infer<typeof OrganizationsInsertSchema>;
export type OrganizationsUpdate = z.infer<typeof OrganizationsUpdateSchema>;
export type OrganizationsFilters = z.infer<typeof OrganizationsFiltersSchema>;

// ContentCategories
export const ContentCategoriesSelectSchema = createSelectSchema(contentCategories);
export const ContentCategoriesInsertSchema = createInsertSchema(contentCategories);
export const ContentCategoriesUpdateSchema = createUpdateSchema(contentCategories);
export const ContentCategoriesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ContentCategories = z.infer<typeof ContentCategoriesSelectSchema>;
export type ContentCategoriesCreate = z.infer<typeof ContentCategoriesInsertSchema>;
export type ContentCategoriesUpdate = z.infer<typeof ContentCategoriesUpdateSchema>;
export type ContentCategoriesFilters = z.infer<typeof ContentCategoriesFiltersSchema>;

// Courses
export const CoursesSelectSchema = createSelectSchema(courses);
export const CoursesInsertSchema = createInsertSchema(courses);
export const CoursesUpdateSchema = createUpdateSchema(courses);
export const CoursesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type Courses = z.infer<typeof CoursesSelectSchema>;
export type CoursesCreate = z.infer<typeof CoursesInsertSchema>;
export type CoursesUpdate = z.infer<typeof CoursesUpdateSchema>;
export type CoursesFilters = z.infer<typeof CoursesFiltersSchema>;

// CourseLessons
export const CourseLessonsSelectSchema = createSelectSchema(courseLessons);
export const CourseLessonsInsertSchema = createInsertSchema(courseLessons);
export const CourseLessonsUpdateSchema = createUpdateSchema(courseLessons);
export const CourseLessonsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type CourseLessons = z.infer<typeof CourseLessonsSelectSchema>;
export type CourseLessonsCreate = z.infer<typeof CourseLessonsInsertSchema>;
export type CourseLessonsUpdate = z.infer<typeof CourseLessonsUpdateSchema>;
export type CourseLessonsFilters = z.infer<typeof CourseLessonsFiltersSchema>;

// CourseEnrollments
export const CourseEnrollmentsSelectSchema = createSelectSchema(courseEnrollments);
export const CourseEnrollmentsInsertSchema = createInsertSchema(courseEnrollments);
export const CourseEnrollmentsUpdateSchema = createUpdateSchema(courseEnrollments);
export const CourseEnrollmentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type CourseEnrollments = z.infer<typeof CourseEnrollmentsSelectSchema>;
export type CourseEnrollmentsCreate = z.infer<typeof CourseEnrollmentsInsertSchema>;
export type CourseEnrollmentsUpdate = z.infer<typeof CourseEnrollmentsUpdateSchema>;
export type CourseEnrollmentsFilters = z.infer<typeof CourseEnrollmentsFiltersSchema>;

// AccessExpirations
export const AccessExpirationsSelectSchema = createSelectSchema(accessExpirations);
export const AccessExpirationsInsertSchema = createInsertSchema(accessExpirations);
export const AccessExpirationsUpdateSchema = createUpdateSchema(accessExpirations);
export const AccessExpirationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type AccessExpirations = z.infer<typeof AccessExpirationsSelectSchema>;
export type AccessExpirationsCreate = z.infer<typeof AccessExpirationsInsertSchema>;
export type AccessExpirationsUpdate = z.infer<typeof AccessExpirationsUpdateSchema>;
export type AccessExpirationsFilters = z.infer<typeof AccessExpirationsFiltersSchema>;

// Affiliates
export const AffiliatesSelectSchema = createSelectSchema(affiliates);
export const AffiliatesInsertSchema = createInsertSchema(affiliates);
export const AffiliatesUpdateSchema = createUpdateSchema(affiliates);
export const AffiliatesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type Affiliates = z.infer<typeof AffiliatesSelectSchema>;
export type AffiliatesCreate = z.infer<typeof AffiliatesInsertSchema>;
export type AffiliatesUpdate = z.infer<typeof AffiliatesUpdateSchema>;
export type AffiliatesFilters = z.infer<typeof AffiliatesFiltersSchema>;

// Purchases
export const PurchasesSelectSchema = createSelectSchema(purchases);
export const PurchasesInsertSchema = createInsertSchema(purchases);
export const PurchasesUpdateSchema = createUpdateSchema(purchases);
export const PurchasesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type Purchases = z.infer<typeof PurchasesSelectSchema>;
export type PurchasesCreate = z.infer<typeof PurchasesInsertSchema>;
export type PurchasesUpdate = z.infer<typeof PurchasesUpdateSchema>;
export type PurchasesFilters = z.infer<typeof PurchasesFiltersSchema>;

// AffiliateReferrals
export const AffiliateReferralsSelectSchema = createSelectSchema(affiliateReferrals);
export const AffiliateReferralsInsertSchema = createInsertSchema(affiliateReferrals);
export const AffiliateReferralsUpdateSchema = createUpdateSchema(affiliateReferrals);
export const AffiliateReferralsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type AffiliateReferrals = z.infer<typeof AffiliateReferralsSelectSchema>;
export type AffiliateReferralsCreate = z.infer<typeof AffiliateReferralsInsertSchema>;
export type AffiliateReferralsUpdate = z.infer<typeof AffiliateReferralsUpdateSchema>;
export type AffiliateReferralsFilters = z.infer<typeof AffiliateReferralsFiltersSchema>;

// AgentGuardrailAssignments
export const AgentGuardrailAssignmentsSelectSchema = createSelectSchema(agentGuardrailAssignments);
export const AgentGuardrailAssignmentsInsertSchema = createInsertSchema(agentGuardrailAssignments);
export const AgentGuardrailAssignmentsUpdateSchema = createUpdateSchema(agentGuardrailAssignments);
export const AgentGuardrailAssignmentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AgentGuardrailAssignments = z.infer<typeof AgentGuardrailAssignmentsSelectSchema>;
export type AgentGuardrailAssignmentsCreate = z.infer<typeof AgentGuardrailAssignmentsInsertSchema>;
export type AgentGuardrailAssignmentsUpdate = z.infer<typeof AgentGuardrailAssignmentsUpdateSchema>;
export type AgentGuardrailAssignmentsFilters = z.infer<typeof AgentGuardrailAssignmentsFiltersSchema>;

// AgentGuardrails
export const AgentGuardrailsSelectSchema = createSelectSchema(agentGuardrails);
export const AgentGuardrailsInsertSchema = createInsertSchema(agentGuardrails);
export const AgentGuardrailsUpdateSchema = createUpdateSchema(agentGuardrails);
export const AgentGuardrailsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AgentGuardrails = z.infer<typeof AgentGuardrailsSelectSchema>;
export type AgentGuardrailsCreate = z.infer<typeof AgentGuardrailsInsertSchema>;
export type AgentGuardrailsUpdate = z.infer<typeof AgentGuardrailsUpdateSchema>;
export type AgentGuardrailsFilters = z.infer<typeof AgentGuardrailsFiltersSchema>;

// CorpusBindings
export const CorpusBindingsSelectSchema = createSelectSchema(corpusBindings);
export const CorpusBindingsInsertSchema = createInsertSchema(corpusBindings);
export const CorpusBindingsUpdateSchema = createUpdateSchema(corpusBindings);
export const CorpusBindingsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type CorpusBindings = z.infer<typeof CorpusBindingsSelectSchema>;
export type CorpusBindingsCreate = z.infer<typeof CorpusBindingsInsertSchema>;
export type CorpusBindingsUpdate = z.infer<typeof CorpusBindingsUpdateSchema>;
export type CorpusBindingsFilters = z.infer<typeof CorpusBindingsFiltersSchema>;

// PromptPacks
export const PromptPacksSelectSchema = createSelectSchema(promptPacks);
export const PromptPacksInsertSchema = createInsertSchema(promptPacks);
export const PromptPacksUpdateSchema = createUpdateSchema(promptPacks);
export const PromptPacksFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type PromptPacks = z.infer<typeof PromptPacksSelectSchema>;
export type PromptPacksCreate = z.infer<typeof PromptPacksInsertSchema>;
export type PromptPacksUpdate = z.infer<typeof PromptPacksUpdateSchema>;
export type PromptPacksFilters = z.infer<typeof PromptPacksFiltersSchema>;

// PromptPackLayers
export const PromptPackLayersSelectSchema = createSelectSchema(promptPackLayers);
export const PromptPackLayersInsertSchema = createInsertSchema(promptPackLayers);
export const PromptPackLayersUpdateSchema = createUpdateSchema(promptPackLayers);
export const PromptPackLayersFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type PromptPackLayers = z.infer<typeof PromptPackLayersSelectSchema>;
export type PromptPackLayersCreate = z.infer<typeof PromptPackLayersInsertSchema>;
export type PromptPackLayersUpdate = z.infer<typeof PromptPackLayersUpdateSchema>;
export type PromptPackLayersFilters = z.infer<typeof PromptPackLayersFiltersSchema>;

// Agents
export const AgentsSelectSchema = createSelectSchema(agents);
export const AgentsInsertSchema = createInsertSchema(agents);
export const AgentsUpdateSchema = createUpdateSchema(agents);
export const AgentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type Agents = z.infer<typeof AgentsSelectSchema>;
export type AgentsCreate = z.infer<typeof AgentsInsertSchema>;
export type AgentsUpdate = z.infer<typeof AgentsUpdateSchema>;
export type AgentsFilters = z.infer<typeof AgentsFiltersSchema>;

// AgentHandoffs
export const AgentHandoffsSelectSchema = createSelectSchema(agentHandoffs);
export const AgentHandoffsInsertSchema = createInsertSchema(agentHandoffs);
export const AgentHandoffsUpdateSchema = createUpdateSchema(agentHandoffs);
export const AgentHandoffsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AgentHandoffs = z.infer<typeof AgentHandoffsSelectSchema>;
export type AgentHandoffsCreate = z.infer<typeof AgentHandoffsInsertSchema>;
export type AgentHandoffsUpdate = z.infer<typeof AgentHandoffsUpdateSchema>;
export type AgentHandoffsFilters = z.infer<typeof AgentHandoffsFiltersSchema>;

// AgentInstances
export const AgentInstancesSelectSchema = createSelectSchema(agentInstances);
export const AgentInstancesInsertSchema = createInsertSchema(agentInstances);
export const AgentInstancesUpdateSchema = createUpdateSchema(agentInstances);
export const AgentInstancesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type AgentInstances = z.infer<typeof AgentInstancesSelectSchema>;
export type AgentInstancesCreate = z.infer<typeof AgentInstancesInsertSchema>;
export type AgentInstancesUpdate = z.infer<typeof AgentInstancesUpdateSchema>;
export type AgentInstancesFilters = z.infer<typeof AgentInstancesFiltersSchema>;

// ContentItems
export const ContentItemsSelectSchema = createSelectSchema(contentItems);
export const ContentItemsInsertSchema = createInsertSchema(contentItems);
export const ContentItemsUpdateSchema = createUpdateSchema(contentItems);
export const ContentItemsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type ContentItems = z.infer<typeof ContentItemsSelectSchema>;
export type ContentItemsCreate = z.infer<typeof ContentItemsInsertSchema>;
export type ContentItemsUpdate = z.infer<typeof ContentItemsUpdateSchema>;
export type ContentItemsFilters = z.infer<typeof ContentItemsFiltersSchema>;

// SermonPreparations
export const SermonPreparationsSelectSchema = createSelectSchema(sermonPreparations);
export const SermonPreparationsInsertSchema = createInsertSchema(sermonPreparations);
export const SermonPreparationsUpdateSchema = createUpdateSchema(sermonPreparations);
export const SermonPreparationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type SermonPreparations = z.infer<typeof SermonPreparationsSelectSchema>;
export type SermonPreparationsCreate = z.infer<typeof SermonPreparationsInsertSchema>;
export type SermonPreparationsUpdate = z.infer<typeof SermonPreparationsUpdateSchema>;
export type SermonPreparationsFilters = z.infer<typeof SermonPreparationsFiltersSchema>;

// AgentInteractions
export const AgentInteractionsSelectSchema = createSelectSchema(agentInteractions);
export const AgentInteractionsInsertSchema = createInsertSchema(agentInteractions);
export const AgentInteractionsUpdateSchema = createUpdateSchema(agentInteractions);
export const AgentInteractionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AgentInteractions = z.infer<typeof AgentInteractionsSelectSchema>;
export type AgentInteractionsCreate = z.infer<typeof AgentInteractionsInsertSchema>;
export type AgentInteractionsUpdate = z.infer<typeof AgentInteractionsUpdateSchema>;
export type AgentInteractionsFilters = z.infer<typeof AgentInteractionsFiltersSchema>;

// AgentMetrics
export const AgentMetricsSelectSchema = createSelectSchema(agentMetrics);
export const AgentMetricsInsertSchema = createInsertSchema(agentMetrics);
export const AgentMetricsUpdateSchema = createUpdateSchema(agentMetrics);
export const AgentMetricsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AgentMetrics = z.infer<typeof AgentMetricsSelectSchema>;
export type AgentMetricsCreate = z.infer<typeof AgentMetricsInsertSchema>;
export type AgentMetricsUpdate = z.infer<typeof AgentMetricsUpdateSchema>;
export type AgentMetricsFilters = z.infer<typeof AgentMetricsFiltersSchema>;

// AgentToolAssignments
export const AgentToolAssignmentsSelectSchema = createSelectSchema(agentToolAssignments);
export const AgentToolAssignmentsInsertSchema = createInsertSchema(agentToolAssignments);
export const AgentToolAssignmentsUpdateSchema = createUpdateSchema(agentToolAssignments);
export const AgentToolAssignmentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AgentToolAssignments = z.infer<typeof AgentToolAssignmentsSelectSchema>;
export type AgentToolAssignmentsCreate = z.infer<typeof AgentToolAssignmentsInsertSchema>;
export type AgentToolAssignmentsUpdate = z.infer<typeof AgentToolAssignmentsUpdateSchema>;
export type AgentToolAssignmentsFilters = z.infer<typeof AgentToolAssignmentsFiltersSchema>;

// AgentTools
export const AgentToolsSelectSchema = createSelectSchema(agentTools);
export const AgentToolsInsertSchema = createInsertSchema(agentTools);
export const AgentToolsUpdateSchema = createUpdateSchema(agentTools);
export const AgentToolsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AgentTools = z.infer<typeof AgentToolsSelectSchema>;
export type AgentToolsCreate = z.infer<typeof AgentToolsInsertSchema>;
export type AgentToolsUpdate = z.infer<typeof AgentToolsUpdateSchema>;
export type AgentToolsFilters = z.infer<typeof AgentToolsFiltersSchema>;

// AgentTraces
export const AgentTracesSelectSchema = createSelectSchema(agentTraces);
export const AgentTracesInsertSchema = createInsertSchema(agentTraces);
export const AgentTracesUpdateSchema = createUpdateSchema(agentTraces);
export const AgentTracesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AgentTraces = z.infer<typeof AgentTracesSelectSchema>;
export type AgentTracesCreate = z.infer<typeof AgentTracesInsertSchema>;
export type AgentTracesUpdate = z.infer<typeof AgentTracesUpdateSchema>;
export type AgentTracesFilters = z.infer<typeof AgentTracesFiltersSchema>;

// Assessments
export const AssessmentsSelectSchema = createSelectSchema(assessments);
export const AssessmentsInsertSchema = createInsertSchema(assessments);
export const AssessmentsUpdateSchema = createUpdateSchema(assessments);
export const AssessmentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type Assessments = z.infer<typeof AssessmentsSelectSchema>;
export type AssessmentsCreate = z.infer<typeof AssessmentsInsertSchema>;
export type AssessmentsUpdate = z.infer<typeof AssessmentsUpdateSchema>;
export type AssessmentsFilters = z.infer<typeof AssessmentsFiltersSchema>;

// UserAssessments
export const UserAssessmentsSelectSchema = createSelectSchema(userAssessments);
export const UserAssessmentsInsertSchema = createInsertSchema(userAssessments);
export const UserAssessmentsUpdateSchema = createUpdateSchema(userAssessments);
export const UserAssessmentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type UserAssessments = z.infer<typeof UserAssessmentsSelectSchema>;
export type UserAssessmentsCreate = z.infer<typeof UserAssessmentsInsertSchema>;
export type UserAssessmentsUpdate = z.infer<typeof UserAssessmentsUpdateSchema>;
export type UserAssessmentsFilters = z.infer<typeof UserAssessmentsFiltersSchema>;

// AiInsights
export const AiInsightsSelectSchema = createSelectSchema(aiInsights);
export const AiInsightsInsertSchema = createInsertSchema(aiInsights);
export const AiInsightsUpdateSchema = createUpdateSchema(aiInsights);
export const AiInsightsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type AiInsights = z.infer<typeof AiInsightsSelectSchema>;
export type AiInsightsCreate = z.infer<typeof AiInsightsInsertSchema>;
export type AiInsightsUpdate = z.infer<typeof AiInsightsUpdateSchema>;
export type AiInsightsFilters = z.infer<typeof AiInsightsFiltersSchema>;

// AiLabConversations
export const AiLabConversationsSelectSchema = createSelectSchema(aiLabConversations);
export const AiLabConversationsInsertSchema = createInsertSchema(aiLabConversations);
export const AiLabConversationsUpdateSchema = createUpdateSchema(aiLabConversations);
export const AiLabConversationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type AiLabConversations = z.infer<typeof AiLabConversationsSelectSchema>;
export type AiLabConversationsCreate = z.infer<typeof AiLabConversationsInsertSchema>;
export type AiLabConversationsUpdate = z.infer<typeof AiLabConversationsUpdateSchema>;
export type AiLabConversationsFilters = z.infer<typeof AiLabConversationsFiltersSchema>;

// AiLabLiteConversations
export const AiLabLiteConversationsSelectSchema = createSelectSchema(aiLabLiteConversations);
export const AiLabLiteConversationsInsertSchema = createInsertSchema(aiLabLiteConversations);
export const AiLabLiteConversationsUpdateSchema = createUpdateSchema(aiLabLiteConversations);
export const AiLabLiteConversationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type AiLabLiteConversations = z.infer<typeof AiLabLiteConversationsSelectSchema>;
export type AiLabLiteConversationsCreate = z.infer<typeof AiLabLiteConversationsInsertSchema>;
export type AiLabLiteConversationsUpdate = z.infer<typeof AiLabLiteConversationsUpdateSchema>;
export type AiLabLiteConversationsFilters = z.infer<typeof AiLabLiteConversationsFiltersSchema>;

// AiLabTestTickets
export const AiLabTestTicketsSelectSchema = createSelectSchema(aiLabTestTickets);
export const AiLabTestTicketsInsertSchema = createInsertSchema(aiLabTestTickets);
export const AiLabTestTicketsUpdateSchema = createUpdateSchema(aiLabTestTickets);
export const AiLabTestTicketsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type AiLabTestTickets = z.infer<typeof AiLabTestTicketsSelectSchema>;
export type AiLabTestTicketsCreate = z.infer<typeof AiLabTestTicketsInsertSchema>;
export type AiLabTestTicketsUpdate = z.infer<typeof AiLabTestTicketsUpdateSchema>;
export type AiLabTestTicketsFilters = z.infer<typeof AiLabTestTicketsFiltersSchema>;

// AiLabTestRuns
export const AiLabTestRunsSelectSchema = createSelectSchema(aiLabTestRuns);
export const AiLabTestRunsInsertSchema = createInsertSchema(aiLabTestRuns);
export const AiLabTestRunsUpdateSchema = createUpdateSchema(aiLabTestRuns);
export const AiLabTestRunsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type AiLabTestRuns = z.infer<typeof AiLabTestRunsSelectSchema>;
export type AiLabTestRunsCreate = z.infer<typeof AiLabTestRunsInsertSchema>;
export type AiLabTestRunsUpdate = z.infer<typeof AiLabTestRunsUpdateSchema>;
export type AiLabTestRunsFilters = z.infer<typeof AiLabTestRunsFiltersSchema>;

// AiLabTestFeedback
export const AiLabTestFeedbackSelectSchema = createSelectSchema(aiLabTestFeedback);
export const AiLabTestFeedbackInsertSchema = createInsertSchema(aiLabTestFeedback);
export const AiLabTestFeedbackUpdateSchema = createUpdateSchema(aiLabTestFeedback);
export const AiLabTestFeedbackFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type AiLabTestFeedback = z.infer<typeof AiLabTestFeedbackSelectSchema>;
export type AiLabTestFeedbackCreate = z.infer<typeof AiLabTestFeedbackInsertSchema>;
export type AiLabTestFeedbackUpdate = z.infer<typeof AiLabTestFeedbackUpdateSchema>;
export type AiLabTestFeedbackFilters = z.infer<typeof AiLabTestFeedbackFiltersSchema>;

// AiLabTestFlags
export const AiLabTestFlagsSelectSchema = createSelectSchema(aiLabTestFlags);
export const AiLabTestFlagsInsertSchema = createInsertSchema(aiLabTestFlags);
export const AiLabTestFlagsUpdateSchema = createUpdateSchema(aiLabTestFlags);
export const AiLabTestFlagsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type AiLabTestFlags = z.infer<typeof AiLabTestFlagsSelectSchema>;
export type AiLabTestFlagsCreate = z.infer<typeof AiLabTestFlagsInsertSchema>;
export type AiLabTestFlagsUpdate = z.infer<typeof AiLabTestFlagsUpdateSchema>;
export type AiLabTestFlagsFilters = z.infer<typeof AiLabTestFlagsFiltersSchema>;

// AnalyticsEvents
export const AnalyticsEventsSelectSchema = createSelectSchema(analyticsEvents);
export const AnalyticsEventsInsertSchema = createInsertSchema(analyticsEvents);
export const AnalyticsEventsUpdateSchema = createUpdateSchema(analyticsEvents);
export const AnalyticsEventsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type AnalyticsEvents = z.infer<typeof AnalyticsEventsSelectSchema>;
export type AnalyticsEventsCreate = z.infer<typeof AnalyticsEventsInsertSchema>;
export type AnalyticsEventsUpdate = z.infer<typeof AnalyticsEventsUpdateSchema>;
export type AnalyticsEventsFilters = z.infer<typeof AnalyticsEventsFiltersSchema>;

// ArchiveCollections
export const ArchiveCollectionsSelectSchema = createSelectSchema(archiveCollections);
export const ArchiveCollectionsInsertSchema = createInsertSchema(archiveCollections);
export const ArchiveCollectionsUpdateSchema = createUpdateSchema(archiveCollections);
export const ArchiveCollectionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ArchiveCollections = z.infer<typeof ArchiveCollectionsSelectSchema>;
export type ArchiveCollectionsCreate = z.infer<typeof ArchiveCollectionsInsertSchema>;
export type ArchiveCollectionsUpdate = z.infer<typeof ArchiveCollectionsUpdateSchema>;
export type ArchiveCollectionsFilters = z.infer<typeof ArchiveCollectionsFiltersSchema>;

// ArchiveTopics
export const ArchiveTopicsSelectSchema = createSelectSchema(archiveTopics);
export const ArchiveTopicsInsertSchema = createInsertSchema(archiveTopics);
export const ArchiveTopicsUpdateSchema = createUpdateSchema(archiveTopics);
export const ArchiveTopicsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ArchiveTopics = z.infer<typeof ArchiveTopicsSelectSchema>;
export type ArchiveTopicsCreate = z.infer<typeof ArchiveTopicsInsertSchema>;
export type ArchiveTopicsUpdate = z.infer<typeof ArchiveTopicsUpdateSchema>;
export type ArchiveTopicsFilters = z.infer<typeof ArchiveTopicsFiltersSchema>;

// ArchiveItems
export const ArchiveItemsSelectSchema = createSelectSchema(archiveItems);
export const ArchiveItemsInsertSchema = createInsertSchema(archiveItems);
export const ArchiveItemsUpdateSchema = createUpdateSchema(archiveItems);
export const ArchiveItemsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ArchiveItems = z.infer<typeof ArchiveItemsSelectSchema>;
export type ArchiveItemsCreate = z.infer<typeof ArchiveItemsInsertSchema>;
export type ArchiveItemsUpdate = z.infer<typeof ArchiveItemsUpdateSchema>;
export type ArchiveItemsFilters = z.infer<typeof ArchiveItemsFiltersSchema>;

// ArchiveItemRevisions
export const ArchiveItemRevisionsSelectSchema = createSelectSchema(archiveItemRevisions);
export const ArchiveItemRevisionsInsertSchema = createInsertSchema(archiveItemRevisions);
export const ArchiveItemRevisionsUpdateSchema = createUpdateSchema(archiveItemRevisions);
export const ArchiveItemRevisionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ArchiveItemRevisions = z.infer<typeof ArchiveItemRevisionsSelectSchema>;
export type ArchiveItemRevisionsCreate = z.infer<typeof ArchiveItemRevisionsInsertSchema>;
export type ArchiveItemRevisionsUpdate = z.infer<typeof ArchiveItemRevisionsUpdateSchema>;
export type ArchiveItemRevisionsFilters = z.infer<typeof ArchiveItemRevisionsFiltersSchema>;

// ArchiveMedia
export const ArchiveMediaSelectSchema = createSelectSchema(archiveMedia);
export const ArchiveMediaInsertSchema = createInsertSchema(archiveMedia);
export const ArchiveMediaUpdateSchema = createUpdateSchema(archiveMedia);
export const ArchiveMediaFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ArchiveMedia = z.infer<typeof ArchiveMediaSelectSchema>;
export type ArchiveMediaCreate = z.infer<typeof ArchiveMediaInsertSchema>;
export type ArchiveMediaUpdate = z.infer<typeof ArchiveMediaUpdateSchema>;
export type ArchiveMediaFilters = z.infer<typeof ArchiveMediaFiltersSchema>;

// ArchiveQuotes
export const ArchiveQuotesSelectSchema = createSelectSchema(archiveQuotes);
export const ArchiveQuotesInsertSchema = createInsertSchema(archiveQuotes);
export const ArchiveQuotesUpdateSchema = createUpdateSchema(archiveQuotes);
export const ArchiveQuotesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ArchiveQuotes = z.infer<typeof ArchiveQuotesSelectSchema>;
export type ArchiveQuotesCreate = z.infer<typeof ArchiveQuotesInsertSchema>;
export type ArchiveQuotesUpdate = z.infer<typeof ArchiveQuotesUpdateSchema>;
export type ArchiveQuotesFilters = z.infer<typeof ArchiveQuotesFiltersSchema>;

// AssessmentCheckpoints
export const AssessmentCheckpointsSelectSchema = createSelectSchema(assessmentCheckpoints);
export const AssessmentCheckpointsInsertSchema = createInsertSchema(assessmentCheckpoints);
export const AssessmentCheckpointsUpdateSchema = createUpdateSchema(assessmentCheckpoints);
export const AssessmentCheckpointsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AssessmentCheckpoints = z.infer<typeof AssessmentCheckpointsSelectSchema>;
export type AssessmentCheckpointsCreate = z.infer<typeof AssessmentCheckpointsInsertSchema>;
export type AssessmentCheckpointsUpdate = z.infer<typeof AssessmentCheckpointsUpdateSchema>;
export type AssessmentCheckpointsFilters = z.infer<typeof AssessmentCheckpointsFiltersSchema>;

// AssessmentQuestions
export const AssessmentQuestionsSelectSchema = createSelectSchema(assessmentQuestions);
export const AssessmentQuestionsInsertSchema = createInsertSchema(assessmentQuestions);
export const AssessmentQuestionsUpdateSchema = createUpdateSchema(assessmentQuestions);
export const AssessmentQuestionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AssessmentQuestions = z.infer<typeof AssessmentQuestionsSelectSchema>;
export type AssessmentQuestionsCreate = z.infer<typeof AssessmentQuestionsInsertSchema>;
export type AssessmentQuestionsUpdate = z.infer<typeof AssessmentQuestionsUpdateSchema>;
export type AssessmentQuestionsFilters = z.infer<typeof AssessmentQuestionsFiltersSchema>;

// AssessmentResponses
export const AssessmentResponsesSelectSchema = createSelectSchema(assessmentResponses);
export const AssessmentResponsesInsertSchema = createInsertSchema(assessmentResponses);
export const AssessmentResponsesUpdateSchema = createUpdateSchema(assessmentResponses);
export const AssessmentResponsesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AssessmentResponses = z.infer<typeof AssessmentResponsesSelectSchema>;
export type AssessmentResponsesCreate = z.infer<typeof AssessmentResponsesInsertSchema>;
export type AssessmentResponsesUpdate = z.infer<typeof AssessmentResponsesUpdateSchema>;
export type AssessmentResponsesFilters = z.infer<typeof AssessmentResponsesFiltersSchema>;

// AssessmentShareTokens
export const AssessmentShareTokensSelectSchema = createSelectSchema(assessmentShareTokens);
export const AssessmentShareTokensInsertSchema = createInsertSchema(assessmentShareTokens);
export const AssessmentShareTokensUpdateSchema = createUpdateSchema(assessmentShareTokens);
export const AssessmentShareTokensFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AssessmentShareTokens = z.infer<typeof AssessmentShareTokensSelectSchema>;
export type AssessmentShareTokensCreate = z.infer<typeof AssessmentShareTokensInsertSchema>;
export type AssessmentShareTokensUpdate = z.infer<typeof AssessmentShareTokensUpdateSchema>;
export type AssessmentShareTokensFilters = z.infer<typeof AssessmentShareTokensFiltersSchema>;

// CourseAssignments
export const CourseAssignmentsSelectSchema = createSelectSchema(courseAssignments);
export const CourseAssignmentsInsertSchema = createInsertSchema(courseAssignments);
export const CourseAssignmentsUpdateSchema = createUpdateSchema(courseAssignments);
export const CourseAssignmentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type CourseAssignments = z.infer<typeof CourseAssignmentsSelectSchema>;
export type CourseAssignmentsCreate = z.infer<typeof CourseAssignmentsInsertSchema>;
export type CourseAssignmentsUpdate = z.infer<typeof CourseAssignmentsUpdateSchema>;
export type CourseAssignmentsFilters = z.infer<typeof CourseAssignmentsFiltersSchema>;

// AssignmentSubmissions
export const AssignmentSubmissionsSelectSchema = createSelectSchema(assignmentSubmissions);
export const AssignmentSubmissionsInsertSchema = createInsertSchema(assignmentSubmissions);
export const AssignmentSubmissionsUpdateSchema = createUpdateSchema(assignmentSubmissions);
export const AssignmentSubmissionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type AssignmentSubmissions = z.infer<typeof AssignmentSubmissionsSelectSchema>;
export type AssignmentSubmissionsCreate = z.infer<typeof AssignmentSubmissionsInsertSchema>;
export type AssignmentSubmissionsUpdate = z.infer<typeof AssignmentSubmissionsUpdateSchema>;
export type AssignmentSubmissionsFilters = z.infer<typeof AssignmentSubmissionsFiltersSchema>;

// AssignmentGrades
export const AssignmentGradesSelectSchema = createSelectSchema(assignmentGrades);
export const AssignmentGradesInsertSchema = createInsertSchema(assignmentGrades);
export const AssignmentGradesUpdateSchema = createUpdateSchema(assignmentGrades);
export const AssignmentGradesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AssignmentGrades = z.infer<typeof AssignmentGradesSelectSchema>;
export type AssignmentGradesCreate = z.infer<typeof AssignmentGradesInsertSchema>;
export type AssignmentGradesUpdate = z.infer<typeof AssignmentGradesUpdateSchema>;
export type AssignmentGradesFilters = z.infer<typeof AssignmentGradesFiltersSchema>;

// AudienceProfiles
export const AudienceProfilesSelectSchema = createSelectSchema(audienceProfiles);
export const AudienceProfilesInsertSchema = createInsertSchema(audienceProfiles);
export const AudienceProfilesUpdateSchema = createUpdateSchema(audienceProfiles);
export const AudienceProfilesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type AudienceProfiles = z.infer<typeof AudienceProfilesSelectSchema>;
export type AudienceProfilesCreate = z.infer<typeof AudienceProfilesInsertSchema>;
export type AudienceProfilesUpdate = z.infer<typeof AudienceProfilesUpdateSchema>;
export type AudienceProfilesFilters = z.infer<typeof AudienceProfilesFiltersSchema>;

// AuditLogs
export const AuditLogsSelectSchema = createSelectSchema(auditLogs);
export const AuditLogsInsertSchema = createInsertSchema(auditLogs);
export const AuditLogsUpdateSchema = createUpdateSchema(auditLogs);
export const AuditLogsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type AuditLogs = z.infer<typeof AuditLogsSelectSchema>;
export type AuditLogsCreate = z.infer<typeof AuditLogsInsertSchema>;
export type AuditLogsUpdate = z.infer<typeof AuditLogsUpdateSchema>;
export type AuditLogsFilters = z.infer<typeof AuditLogsFiltersSchema>;

// BookSeries
export const BookSeriesSelectSchema = createSelectSchema(bookSeries);
export const BookSeriesInsertSchema = createInsertSchema(bookSeries);
export const BookSeriesUpdateSchema = createUpdateSchema(bookSeries);
export const BookSeriesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type BookSeries = z.infer<typeof BookSeriesSelectSchema>;
export type BookSeriesCreate = z.infer<typeof BookSeriesInsertSchema>;
export type BookSeriesUpdate = z.infer<typeof BookSeriesUpdateSchema>;
export type BookSeriesFilters = z.infer<typeof BookSeriesFiltersSchema>;

// Books
export const BooksSelectSchema = createSelectSchema(books);
export const BooksInsertSchema = createInsertSchema(books);
export const BooksUpdateSchema = createUpdateSchema(books);
export const BooksFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type Books = z.infer<typeof BooksSelectSchema>;
export type BooksCreate = z.infer<typeof BooksInsertSchema>;
export type BooksUpdate = z.infer<typeof BooksUpdateSchema>;
export type BooksFilters = z.infer<typeof BooksFiltersSchema>;

// BookChapters
export const BookChaptersSelectSchema = createSelectSchema(bookChapters);
export const BookChaptersInsertSchema = createInsertSchema(bookChapters);
export const BookChaptersUpdateSchema = createUpdateSchema(bookChapters);
export const BookChaptersFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type BookChapters = z.infer<typeof BookChaptersSelectSchema>;
export type BookChaptersCreate = z.infer<typeof BookChaptersInsertSchema>;
export type BookChaptersUpdate = z.infer<typeof BookChaptersUpdateSchema>;
export type BookChaptersFilters = z.infer<typeof BookChaptersFiltersSchema>;

// BooksChapters
export const BooksChaptersSelectSchema = createSelectSchema(booksChapters);
export const BooksChaptersInsertSchema = createInsertSchema(booksChapters);
export const BooksChaptersUpdateSchema = createUpdateSchema(booksChapters);
export const BooksChaptersFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type BooksChapters = z.infer<typeof BooksChaptersSelectSchema>;
export type BooksChaptersCreate = z.infer<typeof BooksChaptersInsertSchema>;
export type BooksChaptersUpdate = z.infer<typeof BooksChaptersUpdateSchema>;
export type BooksChaptersFilters = z.infer<typeof BooksChaptersFiltersSchema>;

// BookHighlights
export const BookHighlightsSelectSchema = createSelectSchema(bookHighlights);
export const BookHighlightsInsertSchema = createInsertSchema(bookHighlights);
export const BookHighlightsUpdateSchema = createUpdateSchema(bookHighlights);
export const BookHighlightsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type BookHighlights = z.infer<typeof BookHighlightsSelectSchema>;
export type BookHighlightsCreate = z.infer<typeof BookHighlightsInsertSchema>;
export type BookHighlightsUpdate = z.infer<typeof BookHighlightsUpdateSchema>;
export type BookHighlightsFilters = z.infer<typeof BookHighlightsFiltersSchema>;

// BookPurchases
export const BookPurchasesSelectSchema = createSelectSchema(bookPurchases);
export const BookPurchasesInsertSchema = createInsertSchema(bookPurchases);
export const BookPurchasesUpdateSchema = createUpdateSchema(bookPurchases);
export const BookPurchasesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type BookPurchases = z.infer<typeof BookPurchasesSelectSchema>;
export type BookPurchasesCreate = z.infer<typeof BookPurchasesInsertSchema>;
export type BookPurchasesUpdate = z.infer<typeof BookPurchasesUpdateSchema>;
export type BookPurchasesFilters = z.infer<typeof BookPurchasesFiltersSchema>;

// BookReadingProgress
export const BookReadingProgressSelectSchema = createSelectSchema(bookReadingProgress);
export const BookReadingProgressInsertSchema = createInsertSchema(bookReadingProgress);
export const BookReadingProgressUpdateSchema = createUpdateSchema(bookReadingProgress);
export const BookReadingProgressFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type BookReadingProgress = z.infer<typeof BookReadingProgressSelectSchema>;
export type BookReadingProgressCreate = z.infer<typeof BookReadingProgressInsertSchema>;
export type BookReadingProgressUpdate = z.infer<typeof BookReadingProgressUpdateSchema>;
export type BookReadingProgressFilters = z.infer<typeof BookReadingProgressFiltersSchema>;

// BookReviews
export const BookReviewsSelectSchema = createSelectSchema(bookReviews);
export const BookReviewsInsertSchema = createInsertSchema(bookReviews);
export const BookReviewsUpdateSchema = createUpdateSchema(bookReviews);
export const BookReviewsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type BookReviews = z.infer<typeof BookReviewsSelectSchema>;
export type BookReviewsCreate = z.infer<typeof BookReviewsInsertSchema>;
export type BookReviewsUpdate = z.infer<typeof BookReviewsUpdateSchema>;
export type BookReviewsFilters = z.infer<typeof BookReviewsFiltersSchema>;

// Bookmarks
export const BookmarksSelectSchema = createSelectSchema(bookmarks);
export const BookmarksInsertSchema = createInsertSchema(bookmarks);
export const BookmarksUpdateSchema = createUpdateSchema(bookmarks);
export const BookmarksFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type Bookmarks = z.infer<typeof BookmarksSelectSchema>;
export type BookmarksCreate = z.infer<typeof BookmarksInsertSchema>;
export type BookmarksUpdate = z.infer<typeof BookmarksUpdateSchema>;
export type BookmarksFilters = z.infer<typeof BookmarksFiltersSchema>;

// CertificateTemplates
export const CertificateTemplatesSelectSchema = createSelectSchema(certificateTemplates);
export const CertificateTemplatesInsertSchema = createInsertSchema(certificateTemplates);
export const CertificateTemplatesUpdateSchema = createUpdateSchema(certificateTemplates);
export const CertificateTemplatesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CertificateTemplates = z.infer<typeof CertificateTemplatesSelectSchema>;
export type CertificateTemplatesCreate = z.infer<typeof CertificateTemplatesInsertSchema>;
export type CertificateTemplatesUpdate = z.infer<typeof CertificateTemplatesUpdateSchema>;
export type CertificateTemplatesFilters = z.infer<typeof CertificateTemplatesFiltersSchema>;

// Certificates
export const CertificatesSelectSchema = createSelectSchema(certificates);
export const CertificatesInsertSchema = createInsertSchema(certificates);
export const CertificatesUpdateSchema = createUpdateSchema(certificates);
export const CertificatesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type Certificates = z.infer<typeof CertificatesSelectSchema>;
export type CertificatesCreate = z.infer<typeof CertificatesInsertSchema>;
export type CertificatesUpdate = z.infer<typeof CertificatesUpdateSchema>;
export type CertificatesFilters = z.infer<typeof CertificatesFiltersSchema>;

// CeCredits
export const CeCreditsSelectSchema = createSelectSchema(ceCredits);
export const CeCreditsInsertSchema = createInsertSchema(ceCredits);
export const CeCreditsUpdateSchema = createUpdateSchema(ceCredits);
export const CeCreditsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type CeCredits = z.infer<typeof CeCreditsSelectSchema>;
export type CeCreditsCreate = z.infer<typeof CeCreditsInsertSchema>;
export type CeCreditsUpdate = z.infer<typeof CeCreditsUpdateSchema>;
export type CeCreditsFilters = z.infer<typeof CeCreditsFiltersSchema>;

// CheckpointQuestions
export const CheckpointQuestionsSelectSchema = createSelectSchema(checkpointQuestions);
export const CheckpointQuestionsInsertSchema = createInsertSchema(checkpointQuestions);
export const CheckpointQuestionsUpdateSchema = createUpdateSchema(checkpointQuestions);
export const CheckpointQuestionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CheckpointQuestions = z.infer<typeof CheckpointQuestionsSelectSchema>;
export type CheckpointQuestionsCreate = z.infer<typeof CheckpointQuestionsInsertSchema>;
export type CheckpointQuestionsUpdate = z.infer<typeof CheckpointQuestionsUpdateSchema>;
export type CheckpointQuestionsFilters = z.infer<typeof CheckpointQuestionsFiltersSchema>;

// CheckpointResponses
export const CheckpointResponsesSelectSchema = createSelectSchema(checkpointResponses);
export const CheckpointResponsesInsertSchema = createInsertSchema(checkpointResponses);
export const CheckpointResponsesUpdateSchema = createUpdateSchema(checkpointResponses);
export const CheckpointResponsesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CheckpointResponses = z.infer<typeof CheckpointResponsesSelectSchema>;
export type CheckpointResponsesCreate = z.infer<typeof CheckpointResponsesInsertSchema>;
export type CheckpointResponsesUpdate = z.infer<typeof CheckpointResponsesUpdateSchema>;
export type CheckpointResponsesFilters = z.infer<typeof CheckpointResponsesFiltersSchema>;

// Citations
export const CitationsSelectSchema = createSelectSchema(citations);
export const CitationsInsertSchema = createInsertSchema(citations);
export const CitationsUpdateSchema = createUpdateSchema(citations);
export const CitationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type Citations = z.infer<typeof CitationsSelectSchema>;
export type CitationsCreate = z.infer<typeof CitationsInsertSchema>;
export type CitationsUpdate = z.infer<typeof CitationsUpdateSchema>;
export type CitationsFilters = z.infer<typeof CitationsFiltersSchema>;

// ResidencyProjects
export const ResidencyProjectsSelectSchema = createSelectSchema(residencyProjects);
export const ResidencyProjectsInsertSchema = createInsertSchema(residencyProjects);
export const ResidencyProjectsUpdateSchema = createUpdateSchema(residencyProjects);
export const ResidencyProjectsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type ResidencyProjects = z.infer<typeof ResidencyProjectsSelectSchema>;
export type ResidencyProjectsCreate = z.infer<typeof ResidencyProjectsInsertSchema>;
export type ResidencyProjectsUpdate = z.infer<typeof ResidencyProjectsUpdateSchema>;
export type ResidencyProjectsFilters = z.infer<typeof ResidencyProjectsFiltersSchema>;

// Cohorts
export const CohortsSelectSchema = createSelectSchema(cohorts);
export const CohortsInsertSchema = createInsertSchema(cohorts);
export const CohortsUpdateSchema = createUpdateSchema(cohorts);
export const CohortsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type Cohorts = z.infer<typeof CohortsSelectSchema>;
export type CohortsCreate = z.infer<typeof CohortsInsertSchema>;
export type CohortsUpdate = z.infer<typeof CohortsUpdateSchema>;
export type CohortsFilters = z.infer<typeof CohortsFiltersSchema>;

// CoachingHuddles
export const CoachingHuddlesSelectSchema = createSelectSchema(coachingHuddles);
export const CoachingHuddlesInsertSchema = createInsertSchema(coachingHuddles);
export const CoachingHuddlesUpdateSchema = createUpdateSchema(coachingHuddles);
export const CoachingHuddlesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CoachingHuddles = z.infer<typeof CoachingHuddlesSelectSchema>;
export type CoachingHuddlesCreate = z.infer<typeof CoachingHuddlesInsertSchema>;
export type CoachingHuddlesUpdate = z.infer<typeof CoachingHuddlesUpdateSchema>;
export type CoachingHuddlesFilters = z.infer<typeof CoachingHuddlesFiltersSchema>;

// CohortDiscussionMessages
export const CohortDiscussionMessagesSelectSchema = createSelectSchema(cohortDiscussionMessages);
export const CohortDiscussionMessagesInsertSchema = createInsertSchema(cohortDiscussionMessages);
export const CohortDiscussionMessagesUpdateSchema = createUpdateSchema(cohortDiscussionMessages);
export const CohortDiscussionMessagesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type CohortDiscussionMessages = z.infer<typeof CohortDiscussionMessagesSelectSchema>;
export type CohortDiscussionMessagesCreate = z.infer<typeof CohortDiscussionMessagesInsertSchema>;
export type CohortDiscussionMessagesUpdate = z.infer<typeof CohortDiscussionMessagesUpdateSchema>;
export type CohortDiscussionMessagesFilters = z.infer<typeof CohortDiscussionMessagesFiltersSchema>;

// CohortSessions
export const CohortSessionsSelectSchema = createSelectSchema(cohortSessions);
export const CohortSessionsInsertSchema = createInsertSchema(cohortSessions);
export const CohortSessionsUpdateSchema = createUpdateSchema(cohortSessions);
export const CohortSessionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CohortSessions = z.infer<typeof CohortSessionsSelectSchema>;
export type CohortSessionsCreate = z.infer<typeof CohortSessionsInsertSchema>;
export type CohortSessionsUpdate = z.infer<typeof CohortSessionsUpdateSchema>;
export type CohortSessionsFilters = z.infer<typeof CohortSessionsFiltersSchema>;

// Comments
export const CommentsSelectSchema = createSelectSchema(comments);
export const CommentsInsertSchema = createInsertSchema(comments);
export const CommentsUpdateSchema = createUpdateSchema(comments);
export const CommentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type Comments = z.infer<typeof CommentsSelectSchema>;
export type CommentsCreate = z.infer<typeof CommentsInsertSchema>;
export type CommentsUpdate = z.infer<typeof CommentsUpdateSchema>;
export type CommentsFilters = z.infer<typeof CommentsFiltersSchema>;

// Communities
export const CommunitiesSelectSchema = createSelectSchema(communities);
export const CommunitiesInsertSchema = createInsertSchema(communities);
export const CommunitiesUpdateSchema = createUpdateSchema(communities);
export const CommunitiesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type Communities = z.infer<typeof CommunitiesSelectSchema>;
export type CommunitiesCreate = z.infer<typeof CommunitiesInsertSchema>;
export type CommunitiesUpdate = z.infer<typeof CommunitiesUpdateSchema>;
export type CommunitiesFilters = z.infer<typeof CommunitiesFiltersSchema>;

// ContentAnalytics
export const ContentAnalyticsSelectSchema = createSelectSchema(contentAnalytics);
export const ContentAnalyticsInsertSchema = createInsertSchema(contentAnalytics);
export const ContentAnalyticsUpdateSchema = createUpdateSchema(contentAnalytics);
export const ContentAnalyticsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type ContentAnalytics = z.infer<typeof ContentAnalyticsSelectSchema>;
export type ContentAnalyticsCreate = z.infer<typeof ContentAnalyticsInsertSchema>;
export type ContentAnalyticsUpdate = z.infer<typeof ContentAnalyticsUpdateSchema>;
export type ContentAnalyticsFilters = z.infer<typeof ContentAnalyticsFiltersSchema>;

// ContentFormTemplates
export const ContentFormTemplatesSelectSchema = createSelectSchema(contentFormTemplates);
export const ContentFormTemplatesInsertSchema = createInsertSchema(contentFormTemplates);
export const ContentFormTemplatesUpdateSchema = createUpdateSchema(contentFormTemplates);
export const ContentFormTemplatesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ContentFormTemplates = z.infer<typeof ContentFormTemplatesSelectSchema>;
export type ContentFormTemplatesCreate = z.infer<typeof ContentFormTemplatesInsertSchema>;
export type ContentFormTemplatesUpdate = z.infer<typeof ContentFormTemplatesUpdateSchema>;
export type ContentFormTemplatesFilters = z.infer<typeof ContentFormTemplatesFiltersSchema>;

// ContentTemplatePlacement
export const ContentTemplatePlacementSelectSchema = createSelectSchema(contentTemplatePlacement);
export const ContentTemplatePlacementInsertSchema = createInsertSchema(contentTemplatePlacement);
export const ContentTemplatePlacementUpdateSchema = createUpdateSchema(contentTemplatePlacement);
export const ContentTemplatePlacementFiltersSchema = BaseFiltersSchema;

export type ContentTemplatePlacement = z.infer<typeof ContentTemplatePlacementSelectSchema>;
export type ContentTemplatePlacementCreate = z.infer<typeof ContentTemplatePlacementInsertSchema>;
export type ContentTemplatePlacementUpdate = z.infer<typeof ContentTemplatePlacementUpdateSchema>;
export type ContentTemplatePlacementFilters = z.infer<typeof ContentTemplatePlacementFiltersSchema>;

// ContentTemplates
export const ContentTemplatesSelectSchema = createSelectSchema(contentTemplates);
export const ContentTemplatesInsertSchema = createInsertSchema(contentTemplates);
export const ContentTemplatesUpdateSchema = createUpdateSchema(contentTemplates);
export const ContentTemplatesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ContentTemplates = z.infer<typeof ContentTemplatesSelectSchema>;
export type ContentTemplatesCreate = z.infer<typeof ContentTemplatesInsertSchema>;
export type ContentTemplatesUpdate = z.infer<typeof ContentTemplatesUpdateSchema>;
export type ContentTemplatesFilters = z.infer<typeof ContentTemplatesFiltersSchema>;

// ContentVersions
export const ContentVersionsSelectSchema = createSelectSchema(contentVersions);
export const ContentVersionsInsertSchema = createInsertSchema(contentVersions);
export const ContentVersionsUpdateSchema = createUpdateSchema(contentVersions);
export const ContentVersionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ContentVersions = z.infer<typeof ContentVersionsSelectSchema>;
export type ContentVersionsCreate = z.infer<typeof ContentVersionsInsertSchema>;
export type ContentVersionsUpdate = z.infer<typeof ContentVersionsUpdateSchema>;
export type ContentVersionsFilters = z.infer<typeof ContentVersionsFiltersSchema>;

// ContentWorkflows
export const ContentWorkflowsSelectSchema = createSelectSchema(contentWorkflows);
export const ContentWorkflowsInsertSchema = createInsertSchema(contentWorkflows);
export const ContentWorkflowsUpdateSchema = createUpdateSchema(contentWorkflows);
export const ContentWorkflowsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type ContentWorkflows = z.infer<typeof ContentWorkflowsSelectSchema>;
export type ContentWorkflowsCreate = z.infer<typeof ContentWorkflowsInsertSchema>;
export type ContentWorkflowsUpdate = z.infer<typeof ContentWorkflowsUpdateSchema>;
export type ContentWorkflowsFilters = z.infer<typeof ContentWorkflowsFiltersSchema>;

// ContextSnapshots
export const ContextSnapshotsSelectSchema = createSelectSchema(contextSnapshots);
export const ContextSnapshotsInsertSchema = createInsertSchema(contextSnapshots);
export const ContextSnapshotsUpdateSchema = createUpdateSchema(contextSnapshots);
export const ContextSnapshotsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type ContextSnapshots = z.infer<typeof ContextSnapshotsSelectSchema>;
export type ContextSnapshotsCreate = z.infer<typeof ContextSnapshotsInsertSchema>;
export type ContextSnapshotsUpdate = z.infer<typeof ContextSnapshotsUpdateSchema>;
export type ContextSnapshotsFilters = z.infer<typeof ContextSnapshotsFiltersSchema>;

// Coupons
export const CouponsSelectSchema = createSelectSchema(coupons);
export const CouponsInsertSchema = createInsertSchema(coupons);
export const CouponsUpdateSchema = createUpdateSchema(coupons);
export const CouponsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type Coupons = z.infer<typeof CouponsSelectSchema>;
export type CouponsCreate = z.infer<typeof CouponsInsertSchema>;
export type CouponsUpdate = z.infer<typeof CouponsUpdateSchema>;
export type CouponsFilters = z.infer<typeof CouponsFiltersSchema>;

// CourseAnnouncements
export const CourseAnnouncementsSelectSchema = createSelectSchema(courseAnnouncements);
export const CourseAnnouncementsInsertSchema = createInsertSchema(courseAnnouncements);
export const CourseAnnouncementsUpdateSchema = createUpdateSchema(courseAnnouncements);
export const CourseAnnouncementsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type CourseAnnouncements = z.infer<typeof CourseAnnouncementsSelectSchema>;
export type CourseAnnouncementsCreate = z.infer<typeof CourseAnnouncementsInsertSchema>;
export type CourseAnnouncementsUpdate = z.infer<typeof CourseAnnouncementsUpdateSchema>;
export type CourseAnnouncementsFilters = z.infer<typeof CourseAnnouncementsFiltersSchema>;

// CourseBundles
export const CourseBundlesSelectSchema = createSelectSchema(courseBundles);
export const CourseBundlesInsertSchema = createInsertSchema(courseBundles);
export const CourseBundlesUpdateSchema = createUpdateSchema(courseBundles);
export const CourseBundlesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type CourseBundles = z.infer<typeof CourseBundlesSelectSchema>;
export type CourseBundlesCreate = z.infer<typeof CourseBundlesInsertSchema>;
export type CourseBundlesUpdate = z.infer<typeof CourseBundlesUpdateSchema>;
export type CourseBundlesFilters = z.infer<typeof CourseBundlesFiltersSchema>;

// CourseDripSchedules
export const CourseDripSchedulesSelectSchema = createSelectSchema(courseDripSchedules);
export const CourseDripSchedulesInsertSchema = createInsertSchema(courseDripSchedules);
export const CourseDripSchedulesUpdateSchema = createUpdateSchema(courseDripSchedules);
export const CourseDripSchedulesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CourseDripSchedules = z.infer<typeof CourseDripSchedulesSelectSchema>;
export type CourseDripSchedulesCreate = z.infer<typeof CourseDripSchedulesInsertSchema>;
export type CourseDripSchedulesUpdate = z.infer<typeof CourseDripSchedulesUpdateSchema>;
export type CourseDripSchedulesFilters = z.infer<typeof CourseDripSchedulesFiltersSchema>;

// CourseModules
export const CourseModulesSelectSchema = createSelectSchema(courseModules);
export const CourseModulesInsertSchema = createInsertSchema(courseModules);
export const CourseModulesUpdateSchema = createUpdateSchema(courseModules);
export const CourseModulesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CourseModules = z.infer<typeof CourseModulesSelectSchema>;
export type CourseModulesCreate = z.infer<typeof CourseModulesInsertSchema>;
export type CourseModulesUpdate = z.infer<typeof CourseModulesUpdateSchema>;
export type CourseModulesFilters = z.infer<typeof CourseModulesFiltersSchema>;

// FormationPracticeAssignments
export const FormationPracticeAssignmentsSelectSchema = createSelectSchema(formationPracticeAssignments);
export const FormationPracticeAssignmentsInsertSchema = createInsertSchema(formationPracticeAssignments);
export const FormationPracticeAssignmentsUpdateSchema = createUpdateSchema(formationPracticeAssignments);
export const FormationPracticeAssignmentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type FormationPracticeAssignments = z.infer<typeof FormationPracticeAssignmentsSelectSchema>;
export type FormationPracticeAssignmentsCreate = z.infer<typeof FormationPracticeAssignmentsInsertSchema>;
export type FormationPracticeAssignmentsUpdate = z.infer<typeof FormationPracticeAssignmentsUpdateSchema>;
export type FormationPracticeAssignmentsFilters = z.infer<typeof FormationPracticeAssignmentsFiltersSchema>;

// CourseOutcomes
export const CourseOutcomesSelectSchema = createSelectSchema(courseOutcomes);
export const CourseOutcomesInsertSchema = createInsertSchema(courseOutcomes);
export const CourseOutcomesUpdateSchema = createUpdateSchema(courseOutcomes);
export const CourseOutcomesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type CourseOutcomes = z.infer<typeof CourseOutcomesSelectSchema>;
export type CourseOutcomesCreate = z.infer<typeof CourseOutcomesInsertSchema>;
export type CourseOutcomesUpdate = z.infer<typeof CourseOutcomesUpdateSchema>;
export type CourseOutcomesFilters = z.infer<typeof CourseOutcomesFiltersSchema>;

// CoursePersonalization
export const CoursePersonalizationSelectSchema = createSelectSchema(coursePersonalization);
export const CoursePersonalizationInsertSchema = createInsertSchema(coursePersonalization);
export const CoursePersonalizationUpdateSchema = createUpdateSchema(coursePersonalization);
export const CoursePersonalizationFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CoursePersonalization = z.infer<typeof CoursePersonalizationSelectSchema>;
export type CoursePersonalizationCreate = z.infer<typeof CoursePersonalizationInsertSchema>;
export type CoursePersonalizationUpdate = z.infer<typeof CoursePersonalizationUpdateSchema>;
export type CoursePersonalizationFilters = z.infer<typeof CoursePersonalizationFiltersSchema>;

// CoursePrerequisites
export const CoursePrerequisitesSelectSchema = createSelectSchema(coursePrerequisites);
export const CoursePrerequisitesInsertSchema = createInsertSchema(coursePrerequisites);
export const CoursePrerequisitesUpdateSchema = createUpdateSchema(coursePrerequisites);
export const CoursePrerequisitesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CoursePrerequisites = z.infer<typeof CoursePrerequisitesSelectSchema>;
export type CoursePrerequisitesCreate = z.infer<typeof CoursePrerequisitesInsertSchema>;
export type CoursePrerequisitesUpdate = z.infer<typeof CoursePrerequisitesUpdateSchema>;
export type CoursePrerequisitesFilters = z.infer<typeof CoursePrerequisitesFiltersSchema>;

// CourseProgressionRules
export const CourseProgressionRulesSelectSchema = createSelectSchema(courseProgressionRules);
export const CourseProgressionRulesInsertSchema = createInsertSchema(courseProgressionRules);
export const CourseProgressionRulesUpdateSchema = createUpdateSchema(courseProgressionRules);
export const CourseProgressionRulesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CourseProgressionRules = z.infer<typeof CourseProgressionRulesSelectSchema>;
export type CourseProgressionRulesCreate = z.infer<typeof CourseProgressionRulesInsertSchema>;
export type CourseProgressionRulesUpdate = z.infer<typeof CourseProgressionRulesUpdateSchema>;
export type CourseProgressionRulesFilters = z.infer<typeof CourseProgressionRulesFiltersSchema>;

// CourseSalesPages
export const CourseSalesPagesSelectSchema = createSelectSchema(courseSalesPages);
export const CourseSalesPagesInsertSchema = createInsertSchema(courseSalesPages);
export const CourseSalesPagesUpdateSchema = createUpdateSchema(courseSalesPages);
export const CourseSalesPagesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CourseSalesPages = z.infer<typeof CourseSalesPagesSelectSchema>;
export type CourseSalesPagesCreate = z.infer<typeof CourseSalesPagesInsertSchema>;
export type CourseSalesPagesUpdate = z.infer<typeof CourseSalesPagesUpdateSchema>;
export type CourseSalesPagesFilters = z.infer<typeof CourseSalesPagesFiltersSchema>;

// CourseWeeks
export const CourseWeeksSelectSchema = createSelectSchema(courseWeeks);
export const CourseWeeksInsertSchema = createInsertSchema(courseWeeks);
export const CourseWeeksUpdateSchema = createUpdateSchema(courseWeeks);
export const CourseWeeksFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CourseWeeks = z.infer<typeof CourseWeeksSelectSchema>;
export type CourseWeeksCreate = z.infer<typeof CourseWeeksInsertSchema>;
export type CourseWeeksUpdate = z.infer<typeof CourseWeeksUpdateSchema>;
export type CourseWeeksFilters = z.infer<typeof CourseWeeksFiltersSchema>;

// CredibilityRubrics
export const CredibilityRubricsSelectSchema = createSelectSchema(credibilityRubrics);
export const CredibilityRubricsInsertSchema = createInsertSchema(credibilityRubrics);
export const CredibilityRubricsUpdateSchema = createUpdateSchema(credibilityRubrics);
export const CredibilityRubricsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CredibilityRubrics = z.infer<typeof CredibilityRubricsSelectSchema>;
export type CredibilityRubricsCreate = z.infer<typeof CredibilityRubricsInsertSchema>;
export type CredibilityRubricsUpdate = z.infer<typeof CredibilityRubricsUpdateSchema>;
export type CredibilityRubricsFilters = z.infer<typeof CredibilityRubricsFiltersSchema>;

// DigitalBadges
export const DigitalBadgesSelectSchema = createSelectSchema(digitalBadges);
export const DigitalBadgesInsertSchema = createInsertSchema(digitalBadges);
export const DigitalBadgesUpdateSchema = createUpdateSchema(digitalBadges);
export const DigitalBadgesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type DigitalBadges = z.infer<typeof DigitalBadgesSelectSchema>;
export type DigitalBadgesCreate = z.infer<typeof DigitalBadgesInsertSchema>;
export type DigitalBadgesUpdate = z.infer<typeof DigitalBadgesUpdateSchema>;
export type DigitalBadgesFilters = z.infer<typeof DigitalBadgesFiltersSchema>;

// DiscernmentProcesses
export const DiscernmentProcessesSelectSchema = createSelectSchema(discernmentProcesses);
export const DiscernmentProcessesInsertSchema = createInsertSchema(discernmentProcesses);
export const DiscernmentProcessesUpdateSchema = createUpdateSchema(discernmentProcesses);
export const DiscernmentProcessesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type DiscernmentProcesses = z.infer<typeof DiscernmentProcessesSelectSchema>;
export type DiscernmentProcessesCreate = z.infer<typeof DiscernmentProcessesInsertSchema>;
export type DiscernmentProcessesUpdate = z.infer<typeof DiscernmentProcessesUpdateSchema>;
export type DiscernmentProcessesFilters = z.infer<typeof DiscernmentProcessesFiltersSchema>;

// DiscussionPrompts
export const DiscussionPromptsSelectSchema = createSelectSchema(discussionPrompts);
export const DiscussionPromptsInsertSchema = createInsertSchema(discussionPrompts);
export const DiscussionPromptsUpdateSchema = createUpdateSchema(discussionPrompts);
export const DiscussionPromptsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type DiscussionPrompts = z.infer<typeof DiscussionPromptsSelectSchema>;
export type DiscussionPromptsCreate = z.infer<typeof DiscussionPromptsInsertSchema>;
export type DiscussionPromptsUpdate = z.infer<typeof DiscussionPromptsUpdateSchema>;
export type DiscussionPromptsFilters = z.infer<typeof DiscussionPromptsFiltersSchema>;

// Donations
export const DonationsSelectSchema = createSelectSchema(donations);
export const DonationsInsertSchema = createInsertSchema(donations);
export const DonationsUpdateSchema = createUpdateSchema(donations);
export const DonationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type Donations = z.infer<typeof DonationsSelectSchema>;
export type DonationsCreate = z.infer<typeof DonationsInsertSchema>;
export type DonationsUpdate = z.infer<typeof DonationsUpdateSchema>;
export type DonationsFilters = z.infer<typeof DonationsFiltersSchema>;

// EmailTemplates
export const EmailTemplatesSelectSchema = createSelectSchema(emailTemplates);
export const EmailTemplatesInsertSchema = createInsertSchema(emailTemplates);
export const EmailTemplatesUpdateSchema = createUpdateSchema(emailTemplates);
export const EmailTemplatesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type EmailTemplates = z.infer<typeof EmailTemplatesSelectSchema>;
export type EmailTemplatesCreate = z.infer<typeof EmailTemplatesInsertSchema>;
export type EmailTemplatesUpdate = z.infer<typeof EmailTemplatesUpdateSchema>;
export type EmailTemplatesFilters = z.infer<typeof EmailTemplatesFiltersSchema>;

// EventRegistrations
export const EventRegistrationsSelectSchema = createSelectSchema(eventRegistrations);
export const EventRegistrationsInsertSchema = createInsertSchema(eventRegistrations);
export const EventRegistrationsUpdateSchema = createUpdateSchema(eventRegistrations);
export const EventRegistrationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type EventRegistrations = z.infer<typeof EventRegistrationsSelectSchema>;
export type EventRegistrationsCreate = z.infer<typeof EventRegistrationsInsertSchema>;
export type EventRegistrationsUpdate = z.infer<typeof EventRegistrationsUpdateSchema>;
export type EventRegistrationsFilters = z.infer<typeof EventRegistrationsFiltersSchema>;

// Exercises
export const ExercisesSelectSchema = createSelectSchema(exercises);
export const ExercisesInsertSchema = createInsertSchema(exercises);
export const ExercisesUpdateSchema = createUpdateSchema(exercises);
export const ExercisesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type Exercises = z.infer<typeof ExercisesSelectSchema>;
export type ExercisesCreate = z.infer<typeof ExercisesInsertSchema>;
export type ExercisesUpdate = z.infer<typeof ExercisesUpdateSchema>;
export type ExercisesFilters = z.infer<typeof ExercisesFiltersSchema>;

// ExerciseCompletions
export const ExerciseCompletionsSelectSchema = createSelectSchema(exerciseCompletions);
export const ExerciseCompletionsInsertSchema = createInsertSchema(exerciseCompletions);
export const ExerciseCompletionsUpdateSchema = createUpdateSchema(exerciseCompletions);
export const ExerciseCompletionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ExerciseCompletions = z.infer<typeof ExerciseCompletionsSelectSchema>;
export type ExerciseCompletionsCreate = z.infer<typeof ExerciseCompletionsInsertSchema>;
export type ExerciseCompletionsUpdate = z.infer<typeof ExerciseCompletionsUpdateSchema>;
export type ExerciseCompletionsFilters = z.infer<typeof ExerciseCompletionsFiltersSchema>;

// FieldExperiments
export const FieldExperimentsSelectSchema = createSelectSchema(fieldExperiments);
export const FieldExperimentsInsertSchema = createInsertSchema(fieldExperiments);
export const FieldExperimentsUpdateSchema = createUpdateSchema(fieldExperiments);
export const FieldExperimentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type FieldExperiments = z.infer<typeof FieldExperimentsSelectSchema>;
export type FieldExperimentsCreate = z.infer<typeof FieldExperimentsInsertSchema>;
export type FieldExperimentsUpdate = z.infer<typeof FieldExperimentsUpdateSchema>;
export type FieldExperimentsFilters = z.infer<typeof FieldExperimentsFiltersSchema>;

// FormationCheckins
export const FormationCheckinsSelectSchema = createSelectSchema(formationCheckins);
export const FormationCheckinsInsertSchema = createInsertSchema(formationCheckins);
export const FormationCheckinsUpdateSchema = createUpdateSchema(formationCheckins);
export const FormationCheckinsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type FormationCheckins = z.infer<typeof FormationCheckinsSelectSchema>;
export type FormationCheckinsCreate = z.infer<typeof FormationCheckinsInsertSchema>;
export type FormationCheckinsUpdate = z.infer<typeof FormationCheckinsUpdateSchema>;
export type FormationCheckinsFilters = z.infer<typeof FormationCheckinsFiltersSchema>;

// FormationGoals
export const FormationGoalsSelectSchema = createSelectSchema(formationGoals);
export const FormationGoalsInsertSchema = createInsertSchema(formationGoals);
export const FormationGoalsUpdateSchema = createUpdateSchema(formationGoals);
export const FormationGoalsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type FormationGoals = z.infer<typeof FormationGoalsSelectSchema>;
export type FormationGoalsCreate = z.infer<typeof FormationGoalsInsertSchema>;
export type FormationGoalsUpdate = z.infer<typeof FormationGoalsUpdateSchema>;
export type FormationGoalsFilters = z.infer<typeof FormationGoalsFiltersSchema>;

// FormationExperiments
export const FormationExperimentsSelectSchema = createSelectSchema(formationExperiments);
export const FormationExperimentsInsertSchema = createInsertSchema(formationExperiments);
export const FormationExperimentsUpdateSchema = createUpdateSchema(formationExperiments);
export const FormationExperimentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type FormationExperiments = z.infer<typeof FormationExperimentsSelectSchema>;
export type FormationExperimentsCreate = z.infer<typeof FormationExperimentsInsertSchema>;
export type FormationExperimentsUpdate = z.infer<typeof FormationExperimentsUpdateSchema>;
export type FormationExperimentsFilters = z.infer<typeof FormationExperimentsFiltersSchema>;

// FormationPracticeCompletions
export const FormationPracticeCompletionsSelectSchema = createSelectSchema(formationPracticeCompletions);
export const FormationPracticeCompletionsInsertSchema = createInsertSchema(formationPracticeCompletions);
export const FormationPracticeCompletionsUpdateSchema = createUpdateSchema(formationPracticeCompletions);
export const FormationPracticeCompletionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type FormationPracticeCompletions = z.infer<typeof FormationPracticeCompletionsSelectSchema>;
export type FormationPracticeCompletionsCreate = z.infer<typeof FormationPracticeCompletionsInsertSchema>;
export type FormationPracticeCompletionsUpdate = z.infer<typeof FormationPracticeCompletionsUpdateSchema>;
export type FormationPracticeCompletionsFilters = z.infer<typeof FormationPracticeCompletionsFiltersSchema>;

// HandoffEvents
export const HandoffEventsSelectSchema = createSelectSchema(handoffEvents);
export const HandoffEventsInsertSchema = createInsertSchema(handoffEvents);
export const HandoffEventsUpdateSchema = createUpdateSchema(handoffEvents);
export const HandoffEventsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type HandoffEvents = z.infer<typeof HandoffEventsSelectSchema>;
export type HandoffEventsCreate = z.infer<typeof HandoffEventsInsertSchema>;
export type HandoffEventsUpdate = z.infer<typeof HandoffEventsUpdateSchema>;
export type HandoffEventsFilters = z.infer<typeof HandoffEventsFiltersSchema>;

// KairosMoments
export const KairosMomentsSelectSchema = createSelectSchema(kairosMoments);
export const KairosMomentsInsertSchema = createInsertSchema(kairosMoments);
export const KairosMomentsUpdateSchema = createUpdateSchema(kairosMoments);
export const KairosMomentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type KairosMoments = z.infer<typeof KairosMomentsSelectSchema>;
export type KairosMomentsCreate = z.infer<typeof KairosMomentsInsertSchema>;
export type KairosMomentsUpdate = z.infer<typeof KairosMomentsUpdateSchema>;
export type KairosMomentsFilters = z.infer<typeof KairosMomentsFiltersSchema>;

// LessonProgress
export const LessonProgressSelectSchema = createSelectSchema(lessonProgress);
export const LessonProgressInsertSchema = createInsertSchema(lessonProgress);
export const LessonProgressUpdateSchema = createUpdateSchema(lessonProgress);
export const LessonProgressFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type LessonProgress = z.infer<typeof LessonProgressSelectSchema>;
export type LessonProgressCreate = z.infer<typeof LessonProgressInsertSchema>;
export type LessonProgressUpdate = z.infer<typeof LessonProgressUpdateSchema>;
export type LessonProgressFilters = z.infer<typeof LessonProgressFiltersSchema>;

// MediaItems
export const MediaItemsSelectSchema = createSelectSchema(mediaItems);
export const MediaItemsInsertSchema = createInsertSchema(mediaItems);
export const MediaItemsUpdateSchema = createUpdateSchema(mediaItems);
export const MediaItemsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type MediaItems = z.infer<typeof MediaItemsSelectSchema>;
export type MediaItemsCreate = z.infer<typeof MediaItemsInsertSchema>;
export type MediaItemsUpdate = z.infer<typeof MediaItemsUpdateSchema>;
export type MediaItemsFilters = z.infer<typeof MediaItemsFiltersSchema>;

// MediaUsageTracking
export const MediaUsageTrackingSelectSchema = createSelectSchema(mediaUsageTracking);
export const MediaUsageTrackingInsertSchema = createInsertSchema(mediaUsageTracking);
export const MediaUsageTrackingUpdateSchema = createUpdateSchema(mediaUsageTracking);
export const MediaUsageTrackingFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type MediaUsageTracking = z.infer<typeof MediaUsageTrackingSelectSchema>;
export type MediaUsageTrackingCreate = z.infer<typeof MediaUsageTrackingInsertSchema>;
export type MediaUsageTrackingUpdate = z.infer<typeof MediaUsageTrackingUpdateSchema>;
export type MediaUsageTrackingFilters = z.infer<typeof MediaUsageTrackingFiltersSchema>;

// NeighborhoodExegesisEntries
export const NeighborhoodExegesisEntriesSelectSchema = createSelectSchema(neighborhoodExegesisEntries);
export const NeighborhoodExegesisEntriesInsertSchema = createInsertSchema(neighborhoodExegesisEntries);
export const NeighborhoodExegesisEntriesUpdateSchema = createUpdateSchema(neighborhoodExegesisEntries);
export const NeighborhoodExegesisEntriesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type NeighborhoodExegesisEntries = z.infer<typeof NeighborhoodExegesisEntriesSelectSchema>;
export type NeighborhoodExegesisEntriesCreate = z.infer<typeof NeighborhoodExegesisEntriesInsertSchema>;
export type NeighborhoodExegesisEntriesUpdate = z.infer<typeof NeighborhoodExegesisEntriesUpdateSchema>;
export type NeighborhoodExegesisEntriesFilters = z.infer<typeof NeighborhoodExegesisEntriesFiltersSchema>;

// BookEmailSubscribers
export const BookEmailSubscribersSelectSchema = createSelectSchema(bookEmailSubscribers);
export const BookEmailSubscribersInsertSchema = createInsertSchema(bookEmailSubscribers);
export const BookEmailSubscribersUpdateSchema = createUpdateSchema(bookEmailSubscribers);
export const BookEmailSubscribersFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type BookEmailSubscribers = z.infer<typeof BookEmailSubscribersSelectSchema>;
export type BookEmailSubscribersCreate = z.infer<typeof BookEmailSubscribersInsertSchema>;
export type BookEmailSubscribersUpdate = z.infer<typeof BookEmailSubscribersUpdateSchema>;
export type BookEmailSubscribersFilters = z.infer<typeof BookEmailSubscribersFiltersSchema>;

// BookMarginNotes
export const BookMarginNotesSelectSchema = createSelectSchema(bookMarginNotes);
export const BookMarginNotesInsertSchema = createInsertSchema(bookMarginNotes);
export const BookMarginNotesUpdateSchema = createUpdateSchema(bookMarginNotes);
export const BookMarginNotesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type BookMarginNotes = z.infer<typeof BookMarginNotesSelectSchema>;
export type BookMarginNotesCreate = z.infer<typeof BookMarginNotesInsertSchema>;
export type BookMarginNotesUpdate = z.infer<typeof BookMarginNotesUpdateSchema>;
export type BookMarginNotesFilters = z.infer<typeof BookMarginNotesFiltersSchema>;

// BookRevisions
export const BookRevisionsSelectSchema = createSelectSchema(bookRevisions);
export const BookRevisionsInsertSchema = createInsertSchema(bookRevisions);
export const BookRevisionsUpdateSchema = createUpdateSchema(bookRevisions);
export const BookRevisionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type BookRevisions = z.infer<typeof BookRevisionsSelectSchema>;
export type BookRevisionsCreate = z.infer<typeof BookRevisionsInsertSchema>;
export type BookRevisionsUpdate = z.infer<typeof BookRevisionsUpdateSchema>;
export type BookRevisionsFilters = z.infer<typeof BookRevisionsFiltersSchema>;

// BookEndorsements
export const BookEndorsementsSelectSchema = createSelectSchema(bookEndorsements);
export const BookEndorsementsInsertSchema = createInsertSchema(bookEndorsements);
export const BookEndorsementsUpdateSchema = createUpdateSchema(bookEndorsements);
export const BookEndorsementsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type BookEndorsements = z.infer<typeof BookEndorsementsSelectSchema>;
export type BookEndorsementsCreate = z.infer<typeof BookEndorsementsInsertSchema>;
export type BookEndorsementsUpdate = z.infer<typeof BookEndorsementsUpdateSchema>;
export type BookEndorsementsFilters = z.infer<typeof BookEndorsementsFiltersSchema>;

// NewsletterSubscribers
export const NewsletterSubscribersSelectSchema = createSelectSchema(newsletterSubscribers);
export const NewsletterSubscribersInsertSchema = createInsertSchema(newsletterSubscribers);
export const NewsletterSubscribersUpdateSchema = createUpdateSchema(newsletterSubscribers);
export const NewsletterSubscribersFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type NewsletterSubscribers = z.infer<typeof NewsletterSubscribersSelectSchema>;
export type NewsletterSubscribersCreate = z.infer<typeof NewsletterSubscribersInsertSchema>;
export type NewsletterSubscribersUpdate = z.infer<typeof NewsletterSubscribersUpdateSchema>;
export type NewsletterSubscribersFilters = z.infer<typeof NewsletterSubscribersFiltersSchema>;

// NotebookArtifacts
export const NotebookArtifactsSelectSchema = createSelectSchema(notebookArtifacts);
export const NotebookArtifactsInsertSchema = createInsertSchema(notebookArtifacts);
export const NotebookArtifactsUpdateSchema = createUpdateSchema(notebookArtifacts);
export const NotebookArtifactsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type NotebookArtifacts = z.infer<typeof NotebookArtifactsSelectSchema>;
export type NotebookArtifactsCreate = z.infer<typeof NotebookArtifactsInsertSchema>;
export type NotebookArtifactsUpdate = z.infer<typeof NotebookArtifactsUpdateSchema>;
export type NotebookArtifactsFilters = z.infer<typeof NotebookArtifactsFiltersSchema>;

// NotebookConversations
export const NotebookConversationsSelectSchema = createSelectSchema(notebookConversations);
export const NotebookConversationsInsertSchema = createInsertSchema(notebookConversations);
export const NotebookConversationsUpdateSchema = createUpdateSchema(notebookConversations);
export const NotebookConversationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type NotebookConversations = z.infer<typeof NotebookConversationsSelectSchema>;
export type NotebookConversationsCreate = z.infer<typeof NotebookConversationsInsertSchema>;
export type NotebookConversationsUpdate = z.infer<typeof NotebookConversationsUpdateSchema>;
export type NotebookConversationsFilters = z.infer<typeof NotebookConversationsFiltersSchema>;

// NotebookSourceChunks
export const NotebookSourceChunksSelectSchema = createSelectSchema(notebookSourceChunks);
export const NotebookSourceChunksInsertSchema = createInsertSchema(notebookSourceChunks);
export const NotebookSourceChunksUpdateSchema = createUpdateSchema(notebookSourceChunks);
export const NotebookSourceChunksFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type NotebookSourceChunks = z.infer<typeof NotebookSourceChunksSelectSchema>;
export type NotebookSourceChunksCreate = z.infer<typeof NotebookSourceChunksInsertSchema>;
export type NotebookSourceChunksUpdate = z.infer<typeof NotebookSourceChunksUpdateSchema>;
export type NotebookSourceChunksFilters = z.infer<typeof NotebookSourceChunksFiltersSchema>;

// NotebookSources
export const NotebookSourcesSelectSchema = createSelectSchema(notebookSources);
export const NotebookSourcesInsertSchema = createInsertSchema(notebookSources);
export const NotebookSourcesUpdateSchema = createUpdateSchema(notebookSources);
export const NotebookSourcesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type NotebookSources = z.infer<typeof NotebookSourcesSelectSchema>;
export type NotebookSourcesCreate = z.infer<typeof NotebookSourcesInsertSchema>;
export type NotebookSourcesUpdate = z.infer<typeof NotebookSourcesUpdateSchema>;
export type NotebookSourcesFilters = z.infer<typeof NotebookSourcesFiltersSchema>;

// Notebooks
export const NotebooksSelectSchema = createSelectSchema(notebooks);
export const NotebooksInsertSchema = createInsertSchema(notebooks);
export const NotebooksUpdateSchema = createUpdateSchema(notebooks);
export const NotebooksFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type Notebooks = z.infer<typeof NotebooksSelectSchema>;
export type NotebooksCreate = z.infer<typeof NotebooksInsertSchema>;
export type NotebooksUpdate = z.infer<typeof NotebooksUpdateSchema>;
export type NotebooksFilters = z.infer<typeof NotebooksFiltersSchema>;

// NotificationDeliveries
export const NotificationDeliveriesSelectSchema = createSelectSchema(notificationDeliveries);
export const NotificationDeliveriesInsertSchema = createInsertSchema(notificationDeliveries);
export const NotificationDeliveriesUpdateSchema = createUpdateSchema(notificationDeliveries);
export const NotificationDeliveriesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type NotificationDeliveries = z.infer<typeof NotificationDeliveriesSelectSchema>;
export type NotificationDeliveriesCreate = z.infer<typeof NotificationDeliveriesInsertSchema>;
export type NotificationDeliveriesUpdate = z.infer<typeof NotificationDeliveriesUpdateSchema>;
export type NotificationDeliveriesFilters = z.infer<typeof NotificationDeliveriesFiltersSchema>;

// OnboardingResponses
export const OnboardingResponsesSelectSchema = createSelectSchema(onboardingResponses);
export const OnboardingResponsesInsertSchema = createInsertSchema(onboardingResponses);
export const OnboardingResponsesUpdateSchema = createUpdateSchema(onboardingResponses);
export const OnboardingResponsesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type OnboardingResponses = z.infer<typeof OnboardingResponsesSelectSchema>;
export type OnboardingResponsesCreate = z.infer<typeof OnboardingResponsesInsertSchema>;
export type OnboardingResponsesUpdate = z.infer<typeof OnboardingResponsesUpdateSchema>;
export type OnboardingResponsesFilters = z.infer<typeof OnboardingResponsesFiltersSchema>;

// OrganizationMemberships
export const OrganizationMembershipsSelectSchema = createSelectSchema(organizationMemberships);
export const OrganizationMembershipsInsertSchema = createInsertSchema(organizationMemberships);
export const OrganizationMembershipsUpdateSchema = createUpdateSchema(organizationMemberships);
export const OrganizationMembershipsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type OrganizationMemberships = z.infer<typeof OrganizationMembershipsSelectSchema>;
export type OrganizationMembershipsCreate = z.infer<typeof OrganizationMembershipsInsertSchema>;
export type OrganizationMembershipsUpdate = z.infer<typeof OrganizationMembershipsUpdateSchema>;
export type OrganizationMembershipsFilters = z.infer<typeof OrganizationMembershipsFiltersSchema>;

// PageViews
export const PageViewsSelectSchema = createSelectSchema(pageViews);
export const PageViewsInsertSchema = createInsertSchema(pageViews);
export const PageViewsUpdateSchema = createUpdateSchema(pageViews);
export const PageViewsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type PageViews = z.infer<typeof PageViewsSelectSchema>;
export type PageViewsCreate = z.infer<typeof PageViewsInsertSchema>;
export type PageViewsUpdate = z.infer<typeof PageViewsUpdateSchema>;
export type PageViewsFilters = z.infer<typeof PageViewsFiltersSchema>;

// Pathways
export const PathwaysSelectSchema = createSelectSchema(pathways);
export const PathwaysInsertSchema = createInsertSchema(pathways);
export const PathwaysUpdateSchema = createUpdateSchema(pathways);
export const PathwaysFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type Pathways = z.infer<typeof PathwaysSelectSchema>;
export type PathwaysCreate = z.infer<typeof PathwaysInsertSchema>;
export type PathwaysUpdate = z.infer<typeof PathwaysUpdateSchema>;
export type PathwaysFilters = z.infer<typeof PathwaysFiltersSchema>;

// PathwaySections
export const PathwaySectionsSelectSchema = createSelectSchema(pathwaySections);
export const PathwaySectionsInsertSchema = createInsertSchema(pathwaySections);
export const PathwaySectionsUpdateSchema = createUpdateSchema(pathwaySections);
export const PathwaySectionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type PathwaySections = z.infer<typeof PathwaySectionsSelectSchema>;
export type PathwaySectionsCreate = z.infer<typeof PathwaySectionsInsertSchema>;
export type PathwaySectionsUpdate = z.infer<typeof PathwaySectionsUpdateSchema>;
export type PathwaySectionsFilters = z.infer<typeof PathwaySectionsFiltersSchema>;

// PerformanceMetrics
export const PerformanceMetricsSelectSchema = createSelectSchema(performanceMetrics);
export const PerformanceMetricsInsertSchema = createInsertSchema(performanceMetrics);
export const PerformanceMetricsUpdateSchema = createUpdateSchema(performanceMetrics);
export const PerformanceMetricsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type PerformanceMetrics = z.infer<typeof PerformanceMetricsSelectSchema>;
export type PerformanceMetricsCreate = z.infer<typeof PerformanceMetricsInsertSchema>;
export type PerformanceMetricsUpdate = z.infer<typeof PerformanceMetricsUpdateSchema>;
export type PerformanceMetricsFilters = z.infer<typeof PerformanceMetricsFiltersSchema>;

// PodcastSeries
export const PodcastSeriesSelectSchema = createSelectSchema(podcastSeries);
export const PodcastSeriesInsertSchema = createInsertSchema(podcastSeries);
export const PodcastSeriesUpdateSchema = createUpdateSchema(podcastSeries);
export const PodcastSeriesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type PodcastSeries = z.infer<typeof PodcastSeriesSelectSchema>;
export type PodcastSeriesCreate = z.infer<typeof PodcastSeriesInsertSchema>;
export type PodcastSeriesUpdate = z.infer<typeof PodcastSeriesUpdateSchema>;
export type PodcastSeriesFilters = z.infer<typeof PodcastSeriesFiltersSchema>;

// PodcastEpisodes
export const PodcastEpisodesSelectSchema = createSelectSchema(podcastEpisodes);
export const PodcastEpisodesInsertSchema = createInsertSchema(podcastEpisodes);
export const PodcastEpisodesUpdateSchema = createUpdateSchema(podcastEpisodes);
export const PodcastEpisodesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type PodcastEpisodes = z.infer<typeof PodcastEpisodesSelectSchema>;
export type PodcastEpisodesCreate = z.infer<typeof PodcastEpisodesInsertSchema>;
export type PodcastEpisodesUpdate = z.infer<typeof PodcastEpisodesUpdateSchema>;
export type PodcastEpisodesFilters = z.infer<typeof PodcastEpisodesFiltersSchema>;

// Prospects
export const ProspectsSelectSchema = createSelectSchema(prospects);
export const ProspectsInsertSchema = createInsertSchema(prospects);
export const ProspectsUpdateSchema = createUpdateSchema(prospects);
export const ProspectsFiltersSchema = BaseFiltersSchema;

export type Prospects = z.infer<typeof ProspectsSelectSchema>;
export type ProspectsCreate = z.infer<typeof ProspectsInsertSchema>;
export type ProspectsUpdate = z.infer<typeof ProspectsUpdateSchema>;
export type ProspectsFilters = z.infer<typeof ProspectsFiltersSchema>;

// QuestionBanks
export const QuestionBanksSelectSchema = createSelectSchema(questionBanks);
export const QuestionBanksInsertSchema = createInsertSchema(questionBanks);
export const QuestionBanksUpdateSchema = createUpdateSchema(questionBanks);
export const QuestionBanksFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type QuestionBanks = z.infer<typeof QuestionBanksSelectSchema>;
export type QuestionBanksCreate = z.infer<typeof QuestionBanksInsertSchema>;
export type QuestionBanksUpdate = z.infer<typeof QuestionBanksUpdateSchema>;
export type QuestionBanksFilters = z.infer<typeof QuestionBanksFiltersSchema>;

// ReflectionJournals
export const ReflectionJournalsSelectSchema = createSelectSchema(reflectionJournals);
export const ReflectionJournalsInsertSchema = createInsertSchema(reflectionJournals);
export const ReflectionJournalsUpdateSchema = createUpdateSchema(reflectionJournals);
export const ReflectionJournalsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ReflectionJournals = z.infer<typeof ReflectionJournalsSelectSchema>;
export type ReflectionJournalsCreate = z.infer<typeof ReflectionJournalsInsertSchema>;
export type ReflectionJournalsUpdate = z.infer<typeof ReflectionJournalsUpdateSchema>;
export type ReflectionJournalsFilters = z.infer<typeof ReflectionJournalsFiltersSchema>;

// ReflectionQuestions
export const ReflectionQuestionsSelectSchema = createSelectSchema(reflectionQuestions);
export const ReflectionQuestionsInsertSchema = createInsertSchema(reflectionQuestions);
export const ReflectionQuestionsUpdateSchema = createUpdateSchema(reflectionQuestions);
export const ReflectionQuestionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ReflectionQuestions = z.infer<typeof ReflectionQuestionsSelectSchema>;
export type ReflectionQuestionsCreate = z.infer<typeof ReflectionQuestionsInsertSchema>;
export type ReflectionQuestionsUpdate = z.infer<typeof ReflectionQuestionsUpdateSchema>;
export type ReflectionQuestionsFilters = z.infer<typeof ReflectionQuestionsFiltersSchema>;

// ReflectionResponses
export const ReflectionResponsesSelectSchema = createSelectSchema(reflectionResponses);
export const ReflectionResponsesInsertSchema = createInsertSchema(reflectionResponses);
export const ReflectionResponsesUpdateSchema = createUpdateSchema(reflectionResponses);
export const ReflectionResponsesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ReflectionResponses = z.infer<typeof ReflectionResponsesSelectSchema>;
export type ReflectionResponsesCreate = z.infer<typeof ReflectionResponsesInsertSchema>;
export type ReflectionResponsesUpdate = z.infer<typeof ReflectionResponsesUpdateSchema>;
export type ReflectionResponsesFilters = z.infer<typeof ReflectionResponsesFiltersSchema>;

// RemotionDrafts
export const RemotionDraftsSelectSchema = createSelectSchema(remotionDrafts);
export const RemotionDraftsInsertSchema = createInsertSchema(remotionDrafts);
export const RemotionDraftsUpdateSchema = createUpdateSchema(remotionDrafts);
export const RemotionDraftsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type RemotionDrafts = z.infer<typeof RemotionDraftsSelectSchema>;
export type RemotionDraftsCreate = z.infer<typeof RemotionDraftsInsertSchema>;
export type RemotionDraftsUpdate = z.infer<typeof RemotionDraftsUpdateSchema>;
export type RemotionDraftsFilters = z.infer<typeof RemotionDraftsFiltersSchema>;

// SavedArchiveViews
export const SavedArchiveViewsSelectSchema = createSelectSchema(savedArchiveViews);
export const SavedArchiveViewsInsertSchema = createInsertSchema(savedArchiveViews);
export const SavedArchiveViewsUpdateSchema = createUpdateSchema(savedArchiveViews);
export const SavedArchiveViewsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type SavedArchiveViews = z.infer<typeof SavedArchiveViewsSelectSchema>;
export type SavedArchiveViewsCreate = z.infer<typeof SavedArchiveViewsInsertSchema>;
export type SavedArchiveViewsUpdate = z.infer<typeof SavedArchiveViewsUpdateSchema>;
export type SavedArchiveViewsFilters = z.infer<typeof SavedArchiveViewsFiltersSchema>;

// SearchAnalytics
export const SearchAnalyticsSelectSchema = createSelectSchema(searchAnalytics);
export const SearchAnalyticsInsertSchema = createInsertSchema(searchAnalytics);
export const SearchAnalyticsUpdateSchema = createUpdateSchema(searchAnalytics);
export const SearchAnalyticsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type SearchAnalytics = z.infer<typeof SearchAnalyticsSelectSchema>;
export type SearchAnalyticsCreate = z.infer<typeof SearchAnalyticsInsertSchema>;
export type SearchAnalyticsUpdate = z.infer<typeof SearchAnalyticsUpdateSchema>;
export type SearchAnalyticsFilters = z.infer<typeof SearchAnalyticsFiltersSchema>;

// SearchHistory
export const SearchHistorySelectSchema = createSelectSchema(searchHistory);
export const SearchHistoryInsertSchema = createInsertSchema(searchHistory);
export const SearchHistoryUpdateSchema = createUpdateSchema(searchHistory);
export const SearchHistoryFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type SearchHistory = z.infer<typeof SearchHistorySelectSchema>;
export type SearchHistoryCreate = z.infer<typeof SearchHistoryInsertSchema>;
export type SearchHistoryUpdate = z.infer<typeof SearchHistoryUpdateSchema>;
export type SearchHistoryFilters = z.infer<typeof SearchHistoryFiltersSchema>;

// SitePages
export const SitePagesSelectSchema = createSelectSchema(sitePages);
export const SitePagesInsertSchema = createInsertSchema(sitePages);
export const SitePagesUpdateSchema = createUpdateSchema(sitePages);
export const SitePagesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type SitePages = z.infer<typeof SitePagesSelectSchema>;
export type SitePagesCreate = z.infer<typeof SitePagesInsertSchema>;
export type SitePagesUpdate = z.infer<typeof SitePagesUpdateSchema>;
export type SitePagesFilters = z.infer<typeof SitePagesFiltersSchema>;

// TranslationJobs
export const TranslationJobsSelectSchema = createSelectSchema(translationJobs);
export const TranslationJobsInsertSchema = createInsertSchema(translationJobs);
export const TranslationJobsUpdateSchema = createUpdateSchema(translationJobs);
export const TranslationJobsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type TranslationJobs = z.infer<typeof TranslationJobsSelectSchema>;
export type TranslationJobsCreate = z.infer<typeof TranslationJobsInsertSchema>;
export type TranslationJobsUpdate = z.infer<typeof TranslationJobsUpdateSchema>;
export type TranslationJobsFilters = z.infer<typeof TranslationJobsFiltersSchema>;

// UserCallingProfiles
export const UserCallingProfilesSelectSchema = createSelectSchema(userCallingProfiles);
export const UserCallingProfilesInsertSchema = createInsertSchema(userCallingProfiles);
export const UserCallingProfilesUpdateSchema = createUpdateSchema(userCallingProfiles);
export const UserCallingProfilesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type UserCallingProfiles = z.infer<typeof UserCallingProfilesSelectSchema>;
export type UserCallingProfilesCreate = z.infer<typeof UserCallingProfilesInsertSchema>;
export type UserCallingProfilesUpdate = z.infer<typeof UserCallingProfilesUpdateSchema>;
export type UserCallingProfilesFilters = z.infer<typeof UserCallingProfilesFiltersSchema>;

// UserContextProfiles
export const UserContextProfilesSelectSchema = createSelectSchema(userContextProfiles);
export const UserContextProfilesInsertSchema = createInsertSchema(userContextProfiles);
export const UserContextProfilesUpdateSchema = createUpdateSchema(userContextProfiles);
export const UserContextProfilesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type UserContextProfiles = z.infer<typeof UserContextProfilesSelectSchema>;
export type UserContextProfilesCreate = z.infer<typeof UserContextProfilesInsertSchema>;
export type UserContextProfilesUpdate = z.infer<typeof UserContextProfilesUpdateSchema>;
export type UserContextProfilesFilters = z.infer<typeof UserContextProfilesFiltersSchema>;

// UserIdentityProfiles
export const UserIdentityProfilesSelectSchema = createSelectSchema(userIdentityProfiles);
export const UserIdentityProfilesInsertSchema = createInsertSchema(userIdentityProfiles);
export const UserIdentityProfilesUpdateSchema = createUpdateSchema(userIdentityProfiles);
export const UserIdentityProfilesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type UserIdentityProfiles = z.infer<typeof UserIdentityProfilesSelectSchema>;
export type UserIdentityProfilesCreate = z.infer<typeof UserIdentityProfilesInsertSchema>;
export type UserIdentityProfilesUpdate = z.infer<typeof UserIdentityProfilesUpdateSchema>;
export type UserIdentityProfilesFilters = z.infer<typeof UserIdentityProfilesFiltersSchema>;

// UserInterests
export const UserInterestsSelectSchema = createSelectSchema(userInterests);
export const UserInterestsInsertSchema = createInsertSchema(userInterests);
export const UserInterestsUpdateSchema = createUpdateSchema(userInterests);
export const UserInterestsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type UserInterests = z.infer<typeof UserInterestsSelectSchema>;
export type UserInterestsCreate = z.infer<typeof UserInterestsInsertSchema>;
export type UserInterestsUpdate = z.infer<typeof UserInterestsUpdateSchema>;
export type UserInterestsFilters = z.infer<typeof UserInterestsFiltersSchema>;

// UserMemory
export const UserMemorySelectSchema = createSelectSchema(userMemory);
export const UserMemoryInsertSchema = createInsertSchema(userMemory);
export const UserMemoryUpdateSchema = createUpdateSchema(userMemory);
export const UserMemoryFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type UserMemory = z.infer<typeof UserMemorySelectSchema>;
export type UserMemoryCreate = z.infer<typeof UserMemoryInsertSchema>;
export type UserMemoryUpdate = z.infer<typeof UserMemoryUpdateSchema>;
export type UserMemoryFilters = z.infer<typeof UserMemoryFiltersSchema>;

// UserNeighborhoodContext
export const UserNeighborhoodContextSelectSchema = createSelectSchema(userNeighborhoodContext);
export const UserNeighborhoodContextInsertSchema = createInsertSchema(userNeighborhoodContext);
export const UserNeighborhoodContextUpdateSchema = createUpdateSchema(userNeighborhoodContext);
export const UserNeighborhoodContextFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type UserNeighborhoodContext = z.infer<typeof UserNeighborhoodContextSelectSchema>;
export type UserNeighborhoodContextCreate = z.infer<typeof UserNeighborhoodContextInsertSchema>;
export type UserNeighborhoodContextUpdate = z.infer<typeof UserNeighborhoodContextUpdateSchema>;
export type UserNeighborhoodContextFilters = z.infer<typeof UserNeighborhoodContextFiltersSchema>;

// UserNotifications
export const UserNotificationsSelectSchema = createSelectSchema(userNotifications);
export const UserNotificationsInsertSchema = createInsertSchema(userNotifications);
export const UserNotificationsUpdateSchema = createUpdateSchema(userNotifications);
export const UserNotificationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type UserNotifications = z.infer<typeof UserNotificationsSelectSchema>;
export type UserNotificationsCreate = z.infer<typeof UserNotificationsInsertSchema>;
export type UserNotificationsUpdate = z.infer<typeof UserNotificationsUpdateSchema>;
export type UserNotificationsFilters = z.infer<typeof UserNotificationsFiltersSchema>;

// UserPersonality
export const UserPersonalitySelectSchema = createSelectSchema(userPersonality);
export const UserPersonalityInsertSchema = createInsertSchema(userPersonality);
export const UserPersonalityUpdateSchema = createUpdateSchema(userPersonality);
export const UserPersonalityFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type UserPersonality = z.infer<typeof UserPersonalitySelectSchema>;
export type UserPersonalityCreate = z.infer<typeof UserPersonalityInsertSchema>;
export type UserPersonalityUpdate = z.infer<typeof UserPersonalityUpdateSchema>;
export type UserPersonalityFilters = z.infer<typeof UserPersonalityFiltersSchema>;

// UserStrengths
export const UserStrengthsSelectSchema = createSelectSchema(userStrengths);
export const UserStrengthsInsertSchema = createInsertSchema(userStrengths);
export const UserStrengthsUpdateSchema = createUpdateSchema(userStrengths);
export const UserStrengthsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type UserStrengths = z.infer<typeof UserStrengthsSelectSchema>;
export type UserStrengthsCreate = z.infer<typeof UserStrengthsInsertSchema>;
export type UserStrengthsUpdate = z.infer<typeof UserStrengthsUpdateSchema>;
export type UserStrengthsFilters = z.infer<typeof UserStrengthsFiltersSchema>;

// UserStrugglesChallenges
export const UserStrugglesChallengesSelectSchema = createSelectSchema(userStrugglesChallenges);
export const UserStrugglesChallengesInsertSchema = createInsertSchema(userStrugglesChallenges);
export const UserStrugglesChallengesUpdateSchema = createUpdateSchema(userStrugglesChallenges);
export const UserStrugglesChallengesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type UserStrugglesChallenges = z.infer<typeof UserStrugglesChallengesSelectSchema>;
export type UserStrugglesChallengesCreate = z.infer<typeof UserStrugglesChallengesInsertSchema>;
export type UserStrugglesChallengesUpdate = z.infer<typeof UserStrugglesChallengesUpdateSchema>;
export type UserStrugglesChallengesFilters = z.infer<typeof UserStrugglesChallengesFiltersSchema>;

// UserSubscriptions
export const UserSubscriptionsSelectSchema = createSelectSchema(userSubscriptions);
export const UserSubscriptionsInsertSchema = createInsertSchema(userSubscriptions);
export const UserSubscriptionsUpdateSchema = createUpdateSchema(userSubscriptions);
export const UserSubscriptionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type UserSubscriptions = z.infer<typeof UserSubscriptionsSelectSchema>;
export type UserSubscriptionsCreate = z.infer<typeof UserSubscriptionsInsertSchema>;
export type UserSubscriptionsUpdate = z.infer<typeof UserSubscriptionsUpdateSchema>;
export type UserSubscriptionsFilters = z.infer<typeof UserSubscriptionsFiltersSchema>;

// UserVocation
export const UserVocationSelectSchema = createSelectSchema(userVocation);
export const UserVocationInsertSchema = createInsertSchema(userVocation);
export const UserVocationUpdateSchema = createUpdateSchema(userVocation);
export const UserVocationFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type UserVocation = z.infer<typeof UserVocationSelectSchema>;
export type UserVocationCreate = z.infer<typeof UserVocationInsertSchema>;
export type UserVocationUpdate = z.infer<typeof UserVocationUpdateSchema>;
export type UserVocationFilters = z.infer<typeof UserVocationFiltersSchema>;

// VideoRecordings
export const VideoRecordingsSelectSchema = createSelectSchema(videoRecordings);
export const VideoRecordingsInsertSchema = createInsertSchema(videoRecordings);
export const VideoRecordingsUpdateSchema = createUpdateSchema(videoRecordings);
export const VideoRecordingsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type VideoRecordings = z.infer<typeof VideoRecordingsSelectSchema>;
export type VideoRecordingsCreate = z.infer<typeof VideoRecordingsInsertSchema>;
export type VideoRecordingsUpdate = z.infer<typeof VideoRecordingsUpdateSchema>;
export type VideoRecordingsFilters = z.infer<typeof VideoRecordingsFiltersSchema>;

// VideoAnnotations
export const VideoAnnotationsSelectSchema = createSelectSchema(videoAnnotations);
export const VideoAnnotationsInsertSchema = createInsertSchema(videoAnnotations);
export const VideoAnnotationsUpdateSchema = createUpdateSchema(videoAnnotations);
export const VideoAnnotationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type VideoAnnotations = z.infer<typeof VideoAnnotationsSelectSchema>;
export type VideoAnnotationsCreate = z.infer<typeof VideoAnnotationsInsertSchema>;
export type VideoAnnotationsUpdate = z.infer<typeof VideoAnnotationsUpdateSchema>;
export type VideoAnnotationsFilters = z.infer<typeof VideoAnnotationsFiltersSchema>;

// VideoRecordingSegments
export const VideoRecordingSegmentsSelectSchema = createSelectSchema(videoRecordingSegments);
export const VideoRecordingSegmentsInsertSchema = createInsertSchema(videoRecordingSegments);
export const VideoRecordingSegmentsUpdateSchema = createUpdateSchema(videoRecordingSegments);
export const VideoRecordingSegmentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type VideoRecordingSegments = z.infer<typeof VideoRecordingSegmentsSelectSchema>;
export type VideoRecordingSegmentsCreate = z.infer<typeof VideoRecordingSegmentsInsertSchema>;
export type VideoRecordingSegmentsUpdate = z.infer<typeof VideoRecordingSegmentsUpdateSchema>;
export type VideoRecordingSegmentsFilters = z.infer<typeof VideoRecordingSegmentsFiltersSchema>;

// VideoRecordingSlides
export const VideoRecordingSlidesSelectSchema = createSelectSchema(videoRecordingSlides);
export const VideoRecordingSlidesInsertSchema = createInsertSchema(videoRecordingSlides);
export const VideoRecordingSlidesUpdateSchema = createUpdateSchema(videoRecordingSlides);
export const VideoRecordingSlidesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type VideoRecordingSlides = z.infer<typeof VideoRecordingSlidesSelectSchema>;
export type VideoRecordingSlidesCreate = z.infer<typeof VideoRecordingSlidesInsertSchema>;
export type VideoRecordingSlidesUpdate = z.infer<typeof VideoRecordingSlidesUpdateSchema>;
export type VideoRecordingSlidesFilters = z.infer<typeof VideoRecordingSlidesFiltersSchema>;

// VideoRecordingWhiteboard
export const VideoRecordingWhiteboardSelectSchema = createSelectSchema(videoRecordingWhiteboard);
export const VideoRecordingWhiteboardInsertSchema = createInsertSchema(videoRecordingWhiteboard);
export const VideoRecordingWhiteboardUpdateSchema = createUpdateSchema(videoRecordingWhiteboard);
export const VideoRecordingWhiteboardFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type VideoRecordingWhiteboard = z.infer<typeof VideoRecordingWhiteboardSelectSchema>;
export type VideoRecordingWhiteboardCreate = z.infer<typeof VideoRecordingWhiteboardInsertSchema>;
export type VideoRecordingWhiteboardUpdate = z.infer<typeof VideoRecordingWhiteboardUpdateSchema>;
export type VideoRecordingWhiteboardFilters = z.infer<typeof VideoRecordingWhiteboardFiltersSchema>;

// VideoSeries
export const VideoSeriesSelectSchema = createSelectSchema(videoSeries);
export const VideoSeriesInsertSchema = createInsertSchema(videoSeries);
export const VideoSeriesUpdateSchema = createUpdateSchema(videoSeries);
export const VideoSeriesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type VideoSeries = z.infer<typeof VideoSeriesSelectSchema>;
export type VideoSeriesCreate = z.infer<typeof VideoSeriesInsertSchema>;
export type VideoSeriesUpdate = z.infer<typeof VideoSeriesUpdateSchema>;
export type VideoSeriesFilters = z.infer<typeof VideoSeriesFiltersSchema>;

// Videos
export const VideosSelectSchema = createSelectSchema(videos);
export const VideosInsertSchema = createInsertSchema(videos);
export const VideosUpdateSchema = createUpdateSchema(videos);
export const VideosFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type Videos = z.infer<typeof VideosSelectSchema>;
export type VideosCreate = z.infer<typeof VideosInsertSchema>;
export type VideosUpdate = z.infer<typeof VideosUpdateSchema>;
export type VideosFilters = z.infer<typeof VideosFiltersSchema>;

// VideoWatchHistory
export const VideoWatchHistorySelectSchema = createSelectSchema(videoWatchHistory);
export const VideoWatchHistoryInsertSchema = createInsertSchema(videoWatchHistory);
export const VideoWatchHistoryUpdateSchema = createUpdateSchema(videoWatchHistory);
export const VideoWatchHistoryFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type VideoWatchHistory = z.infer<typeof VideoWatchHistorySelectSchema>;
export type VideoWatchHistoryCreate = z.infer<typeof VideoWatchHistoryInsertSchema>;
export type VideoWatchHistoryUpdate = z.infer<typeof VideoWatchHistoryUpdateSchema>;
export type VideoWatchHistoryFilters = z.infer<typeof VideoWatchHistoryFiltersSchema>;

// VoiceBaselines
export const VoiceBaselinesSelectSchema = createSelectSchema(voiceBaselines);
export const VoiceBaselinesInsertSchema = createInsertSchema(voiceBaselines);
export const VoiceBaselinesUpdateSchema = createUpdateSchema(voiceBaselines);
export const VoiceBaselinesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type VoiceBaselines = z.infer<typeof VoiceBaselinesSelectSchema>;
export type VoiceBaselinesCreate = z.infer<typeof VoiceBaselinesInsertSchema>;
export type VoiceBaselinesUpdate = z.infer<typeof VoiceBaselinesUpdateSchema>;
export type VoiceBaselinesFilters = z.infer<typeof VoiceBaselinesFiltersSchema>;

// VoiceFidelityEvalSamples
export const VoiceFidelityEvalSamplesSelectSchema = createSelectSchema(voiceFidelityEvalSamples);
export const VoiceFidelityEvalSamplesInsertSchema = createInsertSchema(voiceFidelityEvalSamples);
export const VoiceFidelityEvalSamplesUpdateSchema = createUpdateSchema(voiceFidelityEvalSamples);
export const VoiceFidelityEvalSamplesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type VoiceFidelityEvalSamples = z.infer<typeof VoiceFidelityEvalSamplesSelectSchema>;
export type VoiceFidelityEvalSamplesCreate = z.infer<typeof VoiceFidelityEvalSamplesInsertSchema>;
export type VoiceFidelityEvalSamplesUpdate = z.infer<typeof VoiceFidelityEvalSamplesUpdateSchema>;
export type VoiceFidelityEvalSamplesFilters = z.infer<typeof VoiceFidelityEvalSamplesFiltersSchema>;

// VoiceFidelityFeedback
export const VoiceFidelityFeedbackSelectSchema = createSelectSchema(voiceFidelityFeedback);
export const VoiceFidelityFeedbackInsertSchema = createInsertSchema(voiceFidelityFeedback);
export const VoiceFidelityFeedbackUpdateSchema = createUpdateSchema(voiceFidelityFeedback);
export const VoiceFidelityFeedbackFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type VoiceFidelityFeedback = z.infer<typeof VoiceFidelityFeedbackSelectSchema>;
export type VoiceFidelityFeedbackCreate = z.infer<typeof VoiceFidelityFeedbackInsertSchema>;
export type VoiceFidelityFeedbackUpdate = z.infer<typeof VoiceFidelityFeedbackUpdateSchema>;
export type VoiceFidelityFeedbackFilters = z.infer<typeof VoiceFidelityFeedbackFiltersSchema>;

// VoiceIdentities
export const VoiceIdentitiesSelectSchema = createSelectSchema(voiceIdentities);
export const VoiceIdentitiesInsertSchema = createInsertSchema(voiceIdentities);
export const VoiceIdentitiesUpdateSchema = createUpdateSchema(voiceIdentities);
export const VoiceIdentitiesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type VoiceIdentities = z.infer<typeof VoiceIdentitiesSelectSchema>;
export type VoiceIdentitiesCreate = z.infer<typeof VoiceIdentitiesInsertSchema>;
export type VoiceIdentitiesUpdate = z.infer<typeof VoiceIdentitiesUpdateSchema>;
export type VoiceIdentitiesFilters = z.infer<typeof VoiceIdentitiesFiltersSchema>;

// Workflows
export const WorkflowsSelectSchema = createSelectSchema(workflows);
export const WorkflowsInsertSchema = createInsertSchema(workflows);
export const WorkflowsUpdateSchema = createUpdateSchema(workflows);
export const WorkflowsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type Workflows = z.infer<typeof WorkflowsSelectSchema>;
export type WorkflowsCreate = z.infer<typeof WorkflowsInsertSchema>;
export type WorkflowsUpdate = z.infer<typeof WorkflowsUpdateSchema>;
export type WorkflowsFilters = z.infer<typeof WorkflowsFiltersSchema>;

// WorkspaceDocuments
export const WorkspaceDocumentsSelectSchema = createSelectSchema(workspaceDocuments);
export const WorkspaceDocumentsInsertSchema = createInsertSchema(workspaceDocuments);
export const WorkspaceDocumentsUpdateSchema = createUpdateSchema(workspaceDocuments);
export const WorkspaceDocumentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type WorkspaceDocuments = z.infer<typeof WorkspaceDocumentsSelectSchema>;
export type WorkspaceDocumentsCreate = z.infer<typeof WorkspaceDocumentsInsertSchema>;
export type WorkspaceDocumentsUpdate = z.infer<typeof WorkspaceDocumentsUpdateSchema>;
export type WorkspaceDocumentsFilters = z.infer<typeof WorkspaceDocumentsFiltersSchema>;

// WorkspaceLiveblocksSnapshots
export const WorkspaceLiveblocksSnapshotsSelectSchema = createSelectSchema(workspaceLiveblocksSnapshots);
export const WorkspaceLiveblocksSnapshotsInsertSchema = createInsertSchema(workspaceLiveblocksSnapshots);
export const WorkspaceLiveblocksSnapshotsUpdateSchema = createUpdateSchema(workspaceLiveblocksSnapshots);
export const WorkspaceLiveblocksSnapshotsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type WorkspaceLiveblocksSnapshots = z.infer<typeof WorkspaceLiveblocksSnapshotsSelectSchema>;
export type WorkspaceLiveblocksSnapshotsCreate = z.infer<typeof WorkspaceLiveblocksSnapshotsInsertSchema>;
export type WorkspaceLiveblocksSnapshotsUpdate = z.infer<typeof WorkspaceLiveblocksSnapshotsUpdateSchema>;
export type WorkspaceLiveblocksSnapshotsFilters = z.infer<typeof WorkspaceLiveblocksSnapshotsFiltersSchema>;

// Write
export const WriteSelectSchema = createSelectSchema(write);
export const WriteInsertSchema = createInsertSchema(write);
export const WriteUpdateSchema = createUpdateSchema(write);
export const WriteFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type Write = z.infer<typeof WriteSelectSchema>;
export type WriteCreate = z.infer<typeof WriteInsertSchema>;
export type WriteUpdate = z.infer<typeof WriteUpdateSchema>;
export type WriteFilters = z.infer<typeof WriteFiltersSchema>;

// WriteContent
export const WriteContentSelectSchema = createSelectSchema(writeContent);
export const WriteContentInsertSchema = createInsertSchema(writeContent);
export const WriteContentUpdateSchema = createUpdateSchema(writeContent);
export const WriteContentFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type WriteContent = z.infer<typeof WriteContentSelectSchema>;
export type WriteContentCreate = z.infer<typeof WriteContentInsertSchema>;
export type WriteContentUpdate = z.infer<typeof WriteContentUpdateSchema>;
export type WriteContentFilters = z.infer<typeof WriteContentFiltersSchema>;

// WritingExamples
export const WritingExamplesSelectSchema = createSelectSchema(writingExamples);
export const WritingExamplesInsertSchema = createInsertSchema(writingExamples);
export const WritingExamplesUpdateSchema = createUpdateSchema(writingExamples);
export const WritingExamplesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type WritingExamples = z.infer<typeof WritingExamplesSelectSchema>;
export type WritingExamplesCreate = z.infer<typeof WritingExamplesInsertSchema>;
export type WritingExamplesUpdate = z.infer<typeof WritingExamplesUpdateSchema>;
export type WritingExamplesFilters = z.infer<typeof WritingExamplesFiltersSchema>;

// WritingInteractions
export const WritingInteractionsSelectSchema = createSelectSchema(writingInteractions);
export const WritingInteractionsInsertSchema = createInsertSchema(writingInteractions);
export const WritingInteractionsUpdateSchema = createUpdateSchema(writingInteractions);
export const WritingInteractionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type WritingInteractions = z.infer<typeof WritingInteractionsSelectSchema>;
export type WritingInteractionsCreate = z.infer<typeof WritingInteractionsInsertSchema>;
export type WritingInteractionsUpdate = z.infer<typeof WritingInteractionsUpdateSchema>;
export type WritingInteractionsFilters = z.infer<typeof WritingInteractionsFiltersSchema>;

// WritingSessionFeedback
export const WritingSessionFeedbackSelectSchema = createSelectSchema(writingSessionFeedback);
export const WritingSessionFeedbackInsertSchema = createInsertSchema(writingSessionFeedback);
export const WritingSessionFeedbackUpdateSchema = createUpdateSchema(writingSessionFeedback);
export const WritingSessionFeedbackFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type WritingSessionFeedback = z.infer<typeof WritingSessionFeedbackSelectSchema>;
export type WritingSessionFeedbackCreate = z.infer<typeof WritingSessionFeedbackInsertSchema>;
export type WritingSessionFeedbackUpdate = z.infer<typeof WritingSessionFeedbackUpdateSchema>;
export type WritingSessionFeedbackFilters = z.infer<typeof WritingSessionFeedbackFiltersSchema>;

// WritingSessions
export const WritingSessionsSelectSchema = createSelectSchema(writingSessions);
export const WritingSessionsInsertSchema = createInsertSchema(writingSessions);
export const WritingSessionsUpdateSchema = createUpdateSchema(writingSessions);
export const WritingSessionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export type WritingSessions = z.infer<typeof WritingSessionsSelectSchema>;
export type WritingSessionsCreate = z.infer<typeof WritingSessionsInsertSchema>;
export type WritingSessionsUpdate = z.infer<typeof WritingSessionsUpdateSchema>;
export type WritingSessionsFilters = z.infer<typeof WritingSessionsFiltersSchema>;

// WritingStylePreferences
export const WritingStylePreferencesSelectSchema = createSelectSchema(writingStylePreferences);
export const WritingStylePreferencesInsertSchema = createInsertSchema(writingStylePreferences);
export const WritingStylePreferencesUpdateSchema = createUpdateSchema(writingStylePreferences);
export const WritingStylePreferencesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type WritingStylePreferences = z.infer<typeof WritingStylePreferencesSelectSchema>;
export type WritingStylePreferencesCreate = z.infer<typeof WritingStylePreferencesInsertSchema>;
export type WritingStylePreferencesUpdate = z.infer<typeof WritingStylePreferencesUpdateSchema>;
export type WritingStylePreferencesFilters = z.infer<typeof WritingStylePreferencesFiltersSchema>;

// ContactSubmissions
export const ContactSubmissionsSelectSchema = createSelectSchema(contactSubmissions);
export const ContactSubmissionsInsertSchema = createInsertSchema(contactSubmissions);
export const ContactSubmissionsUpdateSchema = createUpdateSchema(contactSubmissions);
export const ContactSubmissionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type ContactSubmissions = z.infer<typeof ContactSubmissionsSelectSchema>;
export type ContactSubmissionsCreate = z.infer<typeof ContactSubmissionsInsertSchema>;
export type ContactSubmissionsUpdate = z.infer<typeof ContactSubmissionsUpdateSchema>;
export type ContactSubmissionsFilters = z.infer<typeof ContactSubmissionsFiltersSchema>;

// AgentRoomLeads
export const AgentRoomLeadsSelectSchema = createSelectSchema(agentRoomLeads);
export const AgentRoomLeadsInsertSchema = createInsertSchema(agentRoomLeads);
export const AgentRoomLeadsUpdateSchema = createUpdateSchema(agentRoomLeads);
export const AgentRoomLeadsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type AgentRoomLeads = z.infer<typeof AgentRoomLeadsSelectSchema>;
export type AgentRoomLeadsCreate = z.infer<typeof AgentRoomLeadsInsertSchema>;
export type AgentRoomLeadsUpdate = z.infer<typeof AgentRoomLeadsUpdateSchema>;
export type AgentRoomLeadsFilters = z.infer<typeof AgentRoomLeadsFiltersSchema>;

// LeaderApplications
export const LeaderApplicationsSelectSchema = createSelectSchema(leaderApplications);
export const LeaderApplicationsInsertSchema = createInsertSchema(leaderApplications);
export const LeaderApplicationsUpdateSchema = createUpdateSchema(leaderApplications);
export const LeaderApplicationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type LeaderApplications = z.infer<typeof LeaderApplicationsSelectSchema>;
export type LeaderApplicationsCreate = z.infer<typeof LeaderApplicationsInsertSchema>;
export type LeaderApplicationsUpdate = z.infer<typeof LeaderApplicationsUpdateSchema>;
export type LeaderApplicationsFilters = z.infer<typeof LeaderApplicationsFiltersSchema>;

// OrganizationInquiries
export const OrganizationInquiriesSelectSchema = createSelectSchema(organizationInquiries);
export const OrganizationInquiriesInsertSchema = createInsertSchema(organizationInquiries);
export const OrganizationInquiriesUpdateSchema = createUpdateSchema(organizationInquiries);
export const OrganizationInquiriesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type OrganizationInquiries = z.infer<typeof OrganizationInquiriesSelectSchema>;
export type OrganizationInquiriesCreate = z.infer<typeof OrganizationInquiriesInsertSchema>;
export type OrganizationInquiriesUpdate = z.infer<typeof OrganizationInquiriesUpdateSchema>;
export type OrganizationInquiriesFilters = z.infer<typeof OrganizationInquiriesFiltersSchema>;

// AssessmentResults
export const AssessmentResultsSelectSchema = createSelectSchema(assessmentResults);
export const AssessmentResultsInsertSchema = createInsertSchema(assessmentResults);
export const AssessmentResultsUpdateSchema = createUpdateSchema(assessmentResults);
export const AssessmentResultsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AssessmentResults = z.infer<typeof AssessmentResultsSelectSchema>;
export type AssessmentResultsCreate = z.infer<typeof AssessmentResultsInsertSchema>;
export type AssessmentResultsUpdate = z.infer<typeof AssessmentResultsUpdateSchema>;
export type AssessmentResultsFilters = z.infer<typeof AssessmentResultsFiltersSchema>;

// SystemReadinessAssessments
export const SystemReadinessAssessmentsSelectSchema = createSelectSchema(systemReadinessAssessments);
export const SystemReadinessAssessmentsInsertSchema = createInsertSchema(systemReadinessAssessments);
export const SystemReadinessAssessmentsUpdateSchema = createUpdateSchema(systemReadinessAssessments);
export const SystemReadinessAssessmentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type SystemReadinessAssessments = z.infer<typeof SystemReadinessAssessmentsSelectSchema>;
export type SystemReadinessAssessmentsCreate = z.infer<typeof SystemReadinessAssessmentsInsertSchema>;
export type SystemReadinessAssessmentsUpdate = z.infer<typeof SystemReadinessAssessmentsUpdateSchema>;
export type SystemReadinessAssessmentsFilters = z.infer<typeof SystemReadinessAssessmentsFiltersSchema>;

// DualIntelligenceAssessments
export const DualIntelligenceAssessmentsSelectSchema = createSelectSchema(dualIntelligenceAssessments);
export const DualIntelligenceAssessmentsInsertSchema = createInsertSchema(dualIntelligenceAssessments);
export const DualIntelligenceAssessmentsUpdateSchema = createUpdateSchema(dualIntelligenceAssessments);
export const DualIntelligenceAssessmentsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type DualIntelligenceAssessments = z.infer<typeof DualIntelligenceAssessmentsSelectSchema>;
export type DualIntelligenceAssessmentsCreate = z.infer<typeof DualIntelligenceAssessmentsInsertSchema>;
export type DualIntelligenceAssessmentsUpdate = z.infer<typeof DualIntelligenceAssessmentsUpdateSchema>;
export type DualIntelligenceAssessmentsFilters = z.infer<typeof DualIntelligenceAssessmentsFiltersSchema>;

// IntegrityDiagnosticSubmissions
export const IntegrityDiagnosticSubmissionsSelectSchema = createSelectSchema(integrityDiagnosticSubmissions);
export const IntegrityDiagnosticSubmissionsInsertSchema = createInsertSchema(integrityDiagnosticSubmissions);
export const IntegrityDiagnosticSubmissionsUpdateSchema = createUpdateSchema(integrityDiagnosticSubmissions);
export const IntegrityDiagnosticSubmissionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type IntegrityDiagnosticSubmissions = z.infer<typeof IntegrityDiagnosticSubmissionsSelectSchema>;
export type IntegrityDiagnosticSubmissionsCreate = z.infer<typeof IntegrityDiagnosticSubmissionsInsertSchema>;
export type IntegrityDiagnosticSubmissionsUpdate = z.infer<typeof IntegrityDiagnosticSubmissionsUpdateSchema>;
export type IntegrityDiagnosticSubmissionsFilters = z.infer<typeof IntegrityDiagnosticSubmissionsFiltersSchema>;

// OnboardingTasks
export const OnboardingTasksSelectSchema = createSelectSchema(onboardingTasks);
export const OnboardingTasksInsertSchema = createInsertSchema(onboardingTasks);
export const OnboardingTasksUpdateSchema = createUpdateSchema(onboardingTasks);
export const OnboardingTasksFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type OnboardingTasks = z.infer<typeof OnboardingTasksSelectSchema>;
export type OnboardingTasksCreate = z.infer<typeof OnboardingTasksInsertSchema>;
export type OnboardingTasksUpdate = z.infer<typeof OnboardingTasksUpdateSchema>;
export type OnboardingTasksFilters = z.infer<typeof OnboardingTasksFiltersSchema>;

// SignedAgreements
export const SignedAgreementsSelectSchema = createSelectSchema(signedAgreements);
export const SignedAgreementsInsertSchema = createInsertSchema(signedAgreements);
export const SignedAgreementsUpdateSchema = createUpdateSchema(signedAgreements);
export const SignedAgreementsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type SignedAgreements = z.infer<typeof SignedAgreementsSelectSchema>;
export type SignedAgreementsCreate = z.infer<typeof SignedAgreementsInsertSchema>;
export type SignedAgreementsUpdate = z.infer<typeof SignedAgreementsUpdateSchema>;
export type SignedAgreementsFilters = z.infer<typeof SignedAgreementsFiltersSchema>;

// OrganizationAssets
export const OrganizationAssetsSelectSchema = createSelectSchema(organizationAssets);
export const OrganizationAssetsInsertSchema = createInsertSchema(organizationAssets);
export const OrganizationAssetsUpdateSchema = createUpdateSchema(organizationAssets);
export const OrganizationAssetsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type OrganizationAssets = z.infer<typeof OrganizationAssetsSelectSchema>;
export type OrganizationAssetsCreate = z.infer<typeof OrganizationAssetsInsertSchema>;
export type OrganizationAssetsUpdate = z.infer<typeof OrganizationAssetsUpdateSchema>;
export type OrganizationAssetsFilters = z.infer<typeof OrganizationAssetsFiltersSchema>;

// CorpusReviewItems
export const CorpusReviewItemsSelectSchema = createSelectSchema(corpusReviewItems);
export const CorpusReviewItemsInsertSchema = createInsertSchema(corpusReviewItems);
export const CorpusReviewItemsUpdateSchema = createUpdateSchema(corpusReviewItems);
export const CorpusReviewItemsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type CorpusReviewItems = z.infer<typeof CorpusReviewItemsSelectSchema>;
export type CorpusReviewItemsCreate = z.infer<typeof CorpusReviewItemsInsertSchema>;
export type CorpusReviewItemsUpdate = z.infer<typeof CorpusReviewItemsUpdateSchema>;
export type CorpusReviewItemsFilters = z.infer<typeof CorpusReviewItemsFiltersSchema>;

// ConsentRecords
export const ConsentRecordsSelectSchema = createSelectSchema(consentRecords);
export const ConsentRecordsInsertSchema = createInsertSchema(consentRecords);
export const ConsentRecordsUpdateSchema = createUpdateSchema(consentRecords);
export const ConsentRecordsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type ConsentRecords = z.infer<typeof ConsentRecordsSelectSchema>;
export type ConsentRecordsCreate = z.infer<typeof ConsentRecordsInsertSchema>;
export type ConsentRecordsUpdate = z.infer<typeof ConsentRecordsUpdateSchema>;
export type ConsentRecordsFilters = z.infer<typeof ConsentRecordsFiltersSchema>;

// StaffUsers
export const StaffUsersSelectSchema = createSelectSchema(staffUsers);
export const StaffUsersInsertSchema = createInsertSchema(staffUsers);
export const StaffUsersUpdateSchema = createUpdateSchema(staffUsers);
export const StaffUsersFiltersSchema = BaseFiltersSchema.extend({
  userId: z.string().uuid().optional(),
});

export type StaffUsers = z.infer<typeof StaffUsersSelectSchema>;
export type StaffUsersCreate = z.infer<typeof StaffUsersInsertSchema>;
export type StaffUsersUpdate = z.infer<typeof StaffUsersUpdateSchema>;
export type StaffUsersFilters = z.infer<typeof StaffUsersFiltersSchema>;

// BookPdfEditions
export const BookPdfEditionsSelectSchema = createSelectSchema(bookPdfEditions);
export const BookPdfEditionsInsertSchema = createInsertSchema(bookPdfEditions);
export const BookPdfEditionsUpdateSchema = createUpdateSchema(bookPdfEditions);
export const BookPdfEditionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type BookPdfEditions = z.infer<typeof BookPdfEditionsSelectSchema>;
export type BookPdfEditionsCreate = z.infer<typeof BookPdfEditionsInsertSchema>;
export type BookPdfEditionsUpdate = z.infer<typeof BookPdfEditionsUpdateSchema>;
export type BookPdfEditionsFilters = z.infer<typeof BookPdfEditionsFiltersSchema>;

// ProgramEngagements
export const ProgramEngagementsSelectSchema = createSelectSchema(programEngagements);
export const ProgramEngagementsInsertSchema = createInsertSchema(programEngagements);
export const ProgramEngagementsUpdateSchema = createUpdateSchema(programEngagements);
export const ProgramEngagementsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type ProgramEngagements = z.infer<typeof ProgramEngagementsSelectSchema>;
export type ProgramEngagementsCreate = z.infer<typeof ProgramEngagementsInsertSchema>;
export type ProgramEngagementsUpdate = z.infer<typeof ProgramEngagementsUpdateSchema>;
export type ProgramEngagementsFilters = z.infer<typeof ProgramEngagementsFiltersSchema>;

// Recipes
export const RecipesSelectSchema = createSelectSchema(recipes);
export const RecipesInsertSchema = createInsertSchema(recipes);
export const RecipesUpdateSchema = createUpdateSchema(recipes);
export const RecipesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type Recipes = z.infer<typeof RecipesSelectSchema>;
export type RecipesCreate = z.infer<typeof RecipesInsertSchema>;
export type RecipesUpdate = z.infer<typeof RecipesUpdateSchema>;
export type RecipesFilters = z.infer<typeof RecipesFiltersSchema>;

// CohortMembers
export const CohortMembersSelectSchema = createSelectSchema(cohortMembers);
export const CohortMembersInsertSchema = createInsertSchema(cohortMembers);
export const CohortMembersUpdateSchema = createUpdateSchema(cohortMembers);
export const CohortMembersFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type CohortMembers = z.infer<typeof CohortMembersSelectSchema>;
export type CohortMembersCreate = z.infer<typeof CohortMembersInsertSchema>;
export type CohortMembersUpdate = z.infer<typeof CohortMembersUpdateSchema>;
export type CohortMembersFilters = z.infer<typeof CohortMembersFiltersSchema>;

// FuturePlans
export const FuturePlansSelectSchema = createSelectSchema(futurePlans);
export const FuturePlansInsertSchema = createInsertSchema(futurePlans);
export const FuturePlansUpdateSchema = createUpdateSchema(futurePlans);
export const FuturePlansFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type FuturePlans = z.infer<typeof FuturePlansSelectSchema>;
export type FuturePlansCreate = z.infer<typeof FuturePlansInsertSchema>;
export type FuturePlansUpdate = z.infer<typeof FuturePlansUpdateSchema>;
export type FuturePlansFilters = z.infer<typeof FuturePlansFiltersSchema>;

// FuturePlanVersions
export const FuturePlanVersionsSelectSchema = createSelectSchema(futurePlanVersions);
export const FuturePlanVersionsInsertSchema = createInsertSchema(futurePlanVersions);
export const FuturePlanVersionsUpdateSchema = createUpdateSchema(futurePlanVersions);
export const FuturePlanVersionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type FuturePlanVersions = z.infer<typeof FuturePlanVersionsSelectSchema>;
export type FuturePlanVersionsCreate = z.infer<typeof FuturePlanVersionsInsertSchema>;
export type FuturePlanVersionsUpdate = z.infer<typeof FuturePlanVersionsUpdateSchema>;
export type FuturePlanVersionsFilters = z.infer<typeof FuturePlanVersionsFiltersSchema>;

// FuturePlanRatifications
export const FuturePlanRatificationsSelectSchema = createSelectSchema(futurePlanRatifications);
export const FuturePlanRatificationsInsertSchema = createInsertSchema(futurePlanRatifications);
export const FuturePlanRatificationsUpdateSchema = createUpdateSchema(futurePlanRatifications);
export const FuturePlanRatificationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type FuturePlanRatifications = z.infer<typeof FuturePlanRatificationsSelectSchema>;
export type FuturePlanRatificationsCreate = z.infer<typeof FuturePlanRatificationsInsertSchema>;
export type FuturePlanRatificationsUpdate = z.infer<typeof FuturePlanRatificationsUpdateSchema>;
export type FuturePlanRatificationsFilters = z.infer<typeof FuturePlanRatificationsFiltersSchema>;

// SafetyArtifacts
export const SafetyArtifactsSelectSchema = createSelectSchema(safetyArtifacts);
export const SafetyArtifactsInsertSchema = createInsertSchema(safetyArtifacts);
export const SafetyArtifactsUpdateSchema = createUpdateSchema(safetyArtifacts);
export const SafetyArtifactsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type SafetyArtifacts = z.infer<typeof SafetyArtifactsSelectSchema>;
export type SafetyArtifactsCreate = z.infer<typeof SafetyArtifactsInsertSchema>;
export type SafetyArtifactsUpdate = z.infer<typeof SafetyArtifactsUpdateSchema>;
export type SafetyArtifactsFilters = z.infer<typeof SafetyArtifactsFiltersSchema>;

// SafetyArtifactVersions
export const SafetyArtifactVersionsSelectSchema = createSelectSchema(safetyArtifactVersions);
export const SafetyArtifactVersionsInsertSchema = createInsertSchema(safetyArtifactVersions);
export const SafetyArtifactVersionsUpdateSchema = createUpdateSchema(safetyArtifactVersions);
export const SafetyArtifactVersionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type SafetyArtifactVersions = z.infer<typeof SafetyArtifactVersionsSelectSchema>;
export type SafetyArtifactVersionsCreate = z.infer<typeof SafetyArtifactVersionsInsertSchema>;
export type SafetyArtifactVersionsUpdate = z.infer<typeof SafetyArtifactVersionsUpdateSchema>;
export type SafetyArtifactVersionsFilters = z.infer<typeof SafetyArtifactVersionsFiltersSchema>;

// SafetyArtifactPublications
export const SafetyArtifactPublicationsSelectSchema = createSelectSchema(safetyArtifactPublications);
export const SafetyArtifactPublicationsInsertSchema = createInsertSchema(safetyArtifactPublications);
export const SafetyArtifactPublicationsUpdateSchema = createUpdateSchema(safetyArtifactPublications);
export const SafetyArtifactPublicationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type SafetyArtifactPublications = z.infer<typeof SafetyArtifactPublicationsSelectSchema>;
export type SafetyArtifactPublicationsCreate = z.infer<typeof SafetyArtifactPublicationsInsertSchema>;
export type SafetyArtifactPublicationsUpdate = z.infer<typeof SafetyArtifactPublicationsUpdateSchema>;
export type SafetyArtifactPublicationsFilters = z.infer<typeof SafetyArtifactPublicationsFiltersSchema>;

// StageTransitions
export const StageTransitionsSelectSchema = createSelectSchema(stageTransitions);
export const StageTransitionsInsertSchema = createInsertSchema(stageTransitions);
export const StageTransitionsUpdateSchema = createUpdateSchema(stageTransitions);
export const StageTransitionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type StageTransitions = z.infer<typeof StageTransitionsSelectSchema>;
export type StageTransitionsCreate = z.infer<typeof StageTransitionsInsertSchema>;
export type StageTransitionsUpdate = z.infer<typeof StageTransitionsUpdateSchema>;
export type StageTransitionsFilters = z.infer<typeof StageTransitionsFiltersSchema>;

// MovementLeaders
export const MovementLeadersSelectSchema = createSelectSchema(movementLeaders);
export const MovementLeadersInsertSchema = createInsertSchema(movementLeaders);
export const MovementLeadersUpdateSchema = createUpdateSchema(movementLeaders);
export const MovementLeadersFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type MovementLeaders = z.infer<typeof MovementLeadersSelectSchema>;
export type MovementLeadersCreate = z.infer<typeof MovementLeadersInsertSchema>;
export type MovementLeadersUpdate = z.infer<typeof MovementLeadersUpdateSchema>;
export type MovementLeadersFilters = z.infer<typeof MovementLeadersFiltersSchema>;

// MovementLeaderGenerated
export const MovementLeaderGeneratedSelectSchema = createSelectSchema(movementLeaderGenerated);
export const MovementLeaderGeneratedInsertSchema = createInsertSchema(movementLeaderGenerated);
export const MovementLeaderGeneratedUpdateSchema = createUpdateSchema(movementLeaderGenerated);
export const MovementLeaderGeneratedFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type MovementLeaderGenerated = z.infer<typeof MovementLeaderGeneratedSelectSchema>;
export type MovementLeaderGeneratedCreate = z.infer<typeof MovementLeaderGeneratedInsertSchema>;
export type MovementLeaderGeneratedUpdate = z.infer<typeof MovementLeaderGeneratedUpdateSchema>;
export type MovementLeaderGeneratedFilters = z.infer<typeof MovementLeaderGeneratedFiltersSchema>;

// LeaderRevisionRequests
export const LeaderRevisionRequestsSelectSchema = createSelectSchema(leaderRevisionRequests);
export const LeaderRevisionRequestsInsertSchema = createInsertSchema(leaderRevisionRequests);
export const LeaderRevisionRequestsUpdateSchema = createUpdateSchema(leaderRevisionRequests);
export const LeaderRevisionRequestsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type LeaderRevisionRequests = z.infer<typeof LeaderRevisionRequestsSelectSchema>;
export type LeaderRevisionRequestsCreate = z.infer<typeof LeaderRevisionRequestsInsertSchema>;
export type LeaderRevisionRequestsUpdate = z.infer<typeof LeaderRevisionRequestsUpdateSchema>;
export type LeaderRevisionRequestsFilters = z.infer<typeof LeaderRevisionRequestsFiltersSchema>;

// MovementLeaderSignings
export const MovementLeaderSigningsSelectSchema = createSelectSchema(movementLeaderSignings);
export const MovementLeaderSigningsInsertSchema = createInsertSchema(movementLeaderSignings);
export const MovementLeaderSigningsUpdateSchema = createUpdateSchema(movementLeaderSignings);
export const MovementLeaderSigningsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type MovementLeaderSignings = z.infer<typeof MovementLeaderSigningsSelectSchema>;
export type MovementLeaderSigningsCreate = z.infer<typeof MovementLeaderSigningsInsertSchema>;
export type MovementLeaderSigningsUpdate = z.infer<typeof MovementLeaderSigningsUpdateSchema>;
export type MovementLeaderSigningsFilters = z.infer<typeof MovementLeaderSigningsFiltersSchema>;

// MovementLeaderApplications
export const MovementLeaderApplicationsSelectSchema = createSelectSchema(movementLeaderApplications);
export const MovementLeaderApplicationsInsertSchema = createInsertSchema(movementLeaderApplications);
export const MovementLeaderApplicationsUpdateSchema = createUpdateSchema(movementLeaderApplications);
export const MovementLeaderApplicationsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type MovementLeaderApplications = z.infer<typeof MovementLeaderApplicationsSelectSchema>;
export type MovementLeaderApplicationsCreate = z.infer<typeof MovementLeaderApplicationsInsertSchema>;
export type MovementLeaderApplicationsUpdate = z.infer<typeof MovementLeaderApplicationsUpdateSchema>;
export type MovementLeaderApplicationsFilters = z.infer<typeof MovementLeaderApplicationsFiltersSchema>;

// MovementLeaderPublicPages
export const MovementLeaderPublicPagesSelectSchema = createSelectSchema(movementLeaderPublicPages);
export const MovementLeaderPublicPagesInsertSchema = createInsertSchema(movementLeaderPublicPages);
export const MovementLeaderPublicPagesUpdateSchema = createUpdateSchema(movementLeaderPublicPages);
export const MovementLeaderPublicPagesFiltersSchema = BaseFiltersSchema;

export type MovementLeaderPublicPages = z.infer<typeof MovementLeaderPublicPagesSelectSchema>;
export type MovementLeaderPublicPagesCreate = z.infer<typeof MovementLeaderPublicPagesInsertSchema>;
export type MovementLeaderPublicPagesUpdate = z.infer<typeof MovementLeaderPublicPagesUpdateSchema>;
export type MovementLeaderPublicPagesFilters = z.infer<typeof MovementLeaderPublicPagesFiltersSchema>;

// MovementLeaderPublicPageVersions
export const MovementLeaderPublicPageVersionsSelectSchema = createSelectSchema(movementLeaderPublicPageVersions);
export const MovementLeaderPublicPageVersionsInsertSchema = createInsertSchema(movementLeaderPublicPageVersions);
export const MovementLeaderPublicPageVersionsUpdateSchema = createUpdateSchema(movementLeaderPublicPageVersions);
export const MovementLeaderPublicPageVersionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  status: z.string().optional(),
});

export type MovementLeaderPublicPageVersions = z.infer<typeof MovementLeaderPublicPageVersionsSelectSchema>;
export type MovementLeaderPublicPageVersionsCreate = z.infer<typeof MovementLeaderPublicPageVersionsInsertSchema>;
export type MovementLeaderPublicPageVersionsUpdate = z.infer<typeof MovementLeaderPublicPageVersionsUpdateSchema>;
export type MovementLeaderPublicPageVersionsFilters = z.infer<typeof MovementLeaderPublicPageVersionsFiltersSchema>;

// SandboxStaffReadinessSubmissions
export const SandboxStaffReadinessSubmissionsSelectSchema = createSelectSchema(sandboxStaffReadinessSubmissions);
export const SandboxStaffReadinessSubmissionsInsertSchema = createInsertSchema(sandboxStaffReadinessSubmissions);
export const SandboxStaffReadinessSubmissionsUpdateSchema = createUpdateSchema(sandboxStaffReadinessSubmissions);
export const SandboxStaffReadinessSubmissionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type SandboxStaffReadinessSubmissions = z.infer<typeof SandboxStaffReadinessSubmissionsSelectSchema>;
export type SandboxStaffReadinessSubmissionsCreate = z.infer<typeof SandboxStaffReadinessSubmissionsInsertSchema>;
export type SandboxStaffReadinessSubmissionsUpdate = z.infer<typeof SandboxStaffReadinessSubmissionsUpdateSchema>;
export type SandboxStaffReadinessSubmissionsFilters = z.infer<typeof SandboxStaffReadinessSubmissionsFiltersSchema>;

// SandboxStaffReadinessInvites
export const SandboxStaffReadinessInvitesSelectSchema = createSelectSchema(sandboxStaffReadinessInvites);
export const SandboxStaffReadinessInvitesInsertSchema = createInsertSchema(sandboxStaffReadinessInvites);
export const SandboxStaffReadinessInvitesUpdateSchema = createUpdateSchema(sandboxStaffReadinessInvites);
export const SandboxStaffReadinessInvitesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type SandboxStaffReadinessInvites = z.infer<typeof SandboxStaffReadinessInvitesSelectSchema>;
export type SandboxStaffReadinessInvitesCreate = z.infer<typeof SandboxStaffReadinessInvitesInsertSchema>;
export type SandboxStaffReadinessInvitesUpdate = z.infer<typeof SandboxStaffReadinessInvitesUpdateSchema>;
export type SandboxStaffReadinessInvitesFilters = z.infer<typeof SandboxStaffReadinessInvitesFiltersSchema>;

// SandboxStaffReadinessAnonymousSubmissions
export const SandboxStaffReadinessAnonymousSubmissionsSelectSchema = createSelectSchema(sandboxStaffReadinessAnonymousSubmissions);
export const SandboxStaffReadinessAnonymousSubmissionsInsertSchema = createInsertSchema(sandboxStaffReadinessAnonymousSubmissions);
export const SandboxStaffReadinessAnonymousSubmissionsUpdateSchema = createUpdateSchema(sandboxStaffReadinessAnonymousSubmissions);
export const SandboxStaffReadinessAnonymousSubmissionsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type SandboxStaffReadinessAnonymousSubmissions = z.infer<typeof SandboxStaffReadinessAnonymousSubmissionsSelectSchema>;
export type SandboxStaffReadinessAnonymousSubmissionsCreate = z.infer<typeof SandboxStaffReadinessAnonymousSubmissionsInsertSchema>;
export type SandboxStaffReadinessAnonymousSubmissionsUpdate = z.infer<typeof SandboxStaffReadinessAnonymousSubmissionsUpdateSchema>;
export type SandboxStaffReadinessAnonymousSubmissionsFilters = z.infer<typeof SandboxStaffReadinessAnonymousSubmissionsFiltersSchema>;

// AiRealityInvites
export const AiRealityInvitesSelectSchema = createSelectSchema(aiRealityInvites);
export const AiRealityInvitesInsertSchema = createInsertSchema(aiRealityInvites);
export const AiRealityInvitesUpdateSchema = createUpdateSchema(aiRealityInvites);
export const AiRealityInvitesFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AiRealityInvites = z.infer<typeof AiRealityInvitesSelectSchema>;
export type AiRealityInvitesCreate = z.infer<typeof AiRealityInvitesInsertSchema>;
export type AiRealityInvitesUpdate = z.infer<typeof AiRealityInvitesUpdateSchema>;
export type AiRealityInvitesFilters = z.infer<typeof AiRealityInvitesFiltersSchema>;

// AiRealityResults
export const AiRealityResultsSelectSchema = createSelectSchema(aiRealityResults);
export const AiRealityResultsInsertSchema = createInsertSchema(aiRealityResults);
export const AiRealityResultsUpdateSchema = createUpdateSchema(aiRealityResults);
export const AiRealityResultsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

export type AiRealityResults = z.infer<typeof AiRealityResultsSelectSchema>;
export type AiRealityResultsCreate = z.infer<typeof AiRealityResultsInsertSchema>;
export type AiRealityResultsUpdate = z.infer<typeof AiRealityResultsUpdateSchema>;
export type AiRealityResultsFilters = z.infer<typeof AiRealityResultsFiltersSchema>;

// AiRealityOrgResults
export const AiRealityOrgResultsSelectSchema = createSelectSchema(aiRealityOrgResults);
export const AiRealityOrgResultsInsertSchema = createInsertSchema(aiRealityOrgResults);
export const AiRealityOrgResultsUpdateSchema = createUpdateSchema(aiRealityOrgResults);
export const AiRealityOrgResultsFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AiRealityOrgResults = z.infer<typeof AiRealityOrgResultsSelectSchema>;
export type AiRealityOrgResultsCreate = z.infer<typeof AiRealityOrgResultsInsertSchema>;
export type AiRealityOrgResultsUpdate = z.infer<typeof AiRealityOrgResultsUpdateSchema>;
export type AiRealityOrgResultsFilters = z.infer<typeof AiRealityOrgResultsFiltersSchema>;

// AiRealityShareTokens
export const AiRealityShareTokensSelectSchema = createSelectSchema(aiRealityShareTokens);
export const AiRealityShareTokensInsertSchema = createInsertSchema(aiRealityShareTokens);
export const AiRealityShareTokensUpdateSchema = createUpdateSchema(aiRealityShareTokens);
export const AiRealityShareTokensFiltersSchema = BaseFiltersSchema.extend({
  id: z.string().uuid().optional(),
});

export type AiRealityShareTokens = z.infer<typeof AiRealityShareTokensSelectSchema>;
export type AiRealityShareTokensCreate = z.infer<typeof AiRealityShareTokensInsertSchema>;
export type AiRealityShareTokensUpdate = z.infer<typeof AiRealityShareTokensUpdateSchema>;
export type AiRealityShareTokensFilters = z.infer<typeof AiRealityShareTokensFiltersSchema>;
