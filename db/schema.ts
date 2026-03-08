import { pgTable, uuid, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Helper functions for common fields
function id() {
  return uuid("id").primaryKey().defaultRandom();
}

function createdAt() {
  return timestamp("created_at", { withTimezone: true }).defaultNow().notNull();
}

function updatedAt() {
  return timestamp("updated_at", { withTimezone: true }).defaultNow().notNull();
}

// Organizations table (tenant root)
export const organizations = pgTable("organizations", {
  id: id(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  organizationType: text("organization_type").notNull(),
  accountOwnerId: uuid("account_owner_id").notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

// Onboarding responses table (tenant-scoped)
export const onboardingResponses = pgTable("onboarding_responses", {
  id: id(),
  organizationId: uuid("organization_id").references(() => organizations.id).notNull(),
  
  // Voice & Content Samples
  bestWorkContent: jsonb("best_work_content"),
  bestWorkSelected: jsonb("best_work_selected"),
  
  // Brand Assets
  brandColors: text("brand_colors"),
  fontPreferences: text("font_preferences"),
  admiredWebsites: jsonb("admired_websites"),
  siteFeelDescription: text("site_feel_description"),
  visitorFeeling: text("visitor_feeling"),
  styleConstraints: jsonb("style_constraints"),
  
  // Vision & Movemental Calling
  movementalStory: text("movemental_story"),
  movementalConversation: text("movemental_conversation"),
  targetAudience: text("target_audience"),
  threeYearImpact: text("three_year_impact"),
  movementalCalling: text("movemental_calling"),
  twelveMonthSuccess: text("twelve_month_success"),
  whatExcitesHim: text("what_excites_him"),
  
  // Audience Understanding
  whoToReach: text("who_to_reach"),
  audienceQuestions: jsonb("audience_questions"),
  currentContentLocations: jsonb("current_content_locations"),
  audienceNeeds: text("audience_needs"),
  
  // Content Inventory
  regularContentTypes: jsonb("regular_content_types"),
  archiveContentToImport: jsonb("archive_content_to_import"),
  existingBlogUrls: jsonb("existing_blog_urls"),
  contentSources: jsonb("content_sources"),
  
  // Capacity & Timeline
  timePerWeek: text("time_per_week"),
  publishingCadence: text("publishing_cadence"),
  callAvailability: jsonb("call_availability"),
  timelineExpectations: text("timeline_expectations"),
  
  // Goals & Concerns
  incomeGoal: text("income_goal"),
  contentGoals: text("content_goals"),
  audienceGrowthGoals: text("audience_growth_goals"),
  digitalPublishingConcerns: text("digital_publishing_concerns"),
  quitRiskFactors: text("quit_risk_factors"),
  supportNeeds: text("support_needs"),
  
  // Decisions & Approvals
  designReviewPreference: text("design_review_preference"),
  preferredDomain: text("preferred_domain"),
  domainOwnership: text("domain_ownership"),
  emailSendingDomain: text("email_sending_domain"),
  paymentProcessingPreferences: jsonb("payment_processing_preferences"),
  featurePreferences: jsonb("feature_preferences"),
  networkParticipation: boolean("network_participation").default(true),
  networkCrossReferences: boolean("network_cross_references").default(true),
  networkDiscovery: boolean("network_discovery").default(true),
  networkIntroductionPreferences: jsonb("network_introduction_preferences"),
  collaborationInterests: text("collaboration_interests"),
  
  // Profile Information
  bio: text("bio"),
  photoUrl: text("photo_url"),
  socialMediaLinks: jsonb("social_media_links"),
  email: text("email").notNull(),
  contactInformation: jsonb("contact_information"),
  
  // Status & Progress
  currentStep: text("current_step"),
  isComplete: boolean("is_complete").default(false),
  submittedAt: timestamp("submitted_at", { withTimezone: true }),
  
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

// ---------------------------------------------------------------------------
// Prospective writers ("write" table) — platform-level, not tenant-scoped
// Linked to a user when they create an account (matched by full_name).
// ---------------------------------------------------------------------------
export const write = pgTable("write", {
  id: id(),
  fullName: text("full_name").notNull(),
  email: text("email"),
  slug: text("slug").unique(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  role: text("role"),
  organization: text("organization"),
  tags: jsonb("tags"), // string[] stored as jsonb
  linkedUserId: uuid("linked_user_id"),
  linkedAt: timestamp("linked_at", { withTimezone: true }),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

// Content belonging to a prospective writer (for retrieval and display)
export const writeContent = pgTable("write_content", {
  id: id(),
  writeId: uuid("write_id")
    .references(() => write.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  contentType: text("content_type").notNull(), // e.g. article, book, talk, quote
  bodyExcerpt: text("body_excerpt"),
  bodyFull: text("body_full"),
  url: text("url"),
  metadata: jsonb("metadata"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
