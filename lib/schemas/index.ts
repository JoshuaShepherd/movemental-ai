import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';
import * as schema from '../../db/schema';
import { BaseFiltersSchema, IdSchema } from './base';

// ============================================================================
// Organizations Schemas
// ============================================================================

// Select Schema
export const OrganizationsSelectSchema = createSelectSchema(schema.organizations);
export type Organizations = z.infer<typeof OrganizationsSelectSchema>;

// Insert Schema
export const OrganizationsInsertSchema = createInsertSchema(schema.organizations);
export type OrganizationsCreate = z.infer<typeof OrganizationsInsertSchema>;

// Update Schema
export const OrganizationsUpdateSchema = createUpdateSchema(schema.organizations);
export type OrganizationsUpdate = z.infer<typeof OrganizationsUpdateSchema>;

// Filters Schema
export const OrganizationsFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  slug: z.string().optional(),
  organizationType: z.string().optional(),
});
export type OrganizationsFilters = z.infer<typeof OrganizationsFiltersSchema>;

// ============================================================================
// Onboarding Responses Schemas
// ============================================================================

// Select Schema
export const OnboardingResponsesSelectSchema = createSelectSchema(schema.onboardingResponses);
export type OnboardingResponses = z.infer<typeof OnboardingResponsesSelectSchema>;

// Insert Schema
export const OnboardingResponsesInsertSchema = createInsertSchema(schema.onboardingResponses);
export type OnboardingResponsesCreate = z.infer<typeof OnboardingResponsesInsertSchema>;

// Update Schema
export const OnboardingResponsesUpdateSchema = createUpdateSchema(schema.onboardingResponses);
export type OnboardingResponsesUpdate = z.infer<typeof OnboardingResponsesUpdateSchema>;

// Filters Schema
export const OnboardingResponsesFiltersSchema = BaseFiltersSchema.extend({
  id: IdSchema.optional(),
  organizationId: IdSchema.optional(),
  isComplete: z.boolean().optional(),
  currentStep: z.string().optional(),
});
export type OnboardingResponsesFilters = z.infer<typeof OnboardingResponsesFiltersSchema>;

// ============================================================================
// Form-Specific Schemas for Multi-Step Validation
// ============================================================================

export const VoiceContentSamplesSchema = z.object({
  bestWorkContent: z.array(z.object({
    id: z.string(),
    title: z.string(),
    type: z.enum(['sermon', 'talk', 'article', 'email', 'other']),
    url: z.string().url().optional(),
    file: z.instanceof(File).optional(),
  })).optional(),
  bestWorkSelected: z.array(z.string()).optional(), // IDs of selected items
});

export const BrandAssetsSchema = z.object({
  brandColors: z.string().optional(), // Comma-separated hex codes or JSON
  fontPreferences: z.string().optional(),
  admiredWebsites: z.array(z.string().url()).optional(),
  siteFeelDescription: z.string().min(1).max(50), // 3-word description
  visitorFeeling: z.string().min(1).max(200), // One sentence
  styleConstraints: z.object({
    dontUse: z.array(z.string()).optional(),
    mustInclude: z.array(z.string()).optional(),
    mustAvoid: z.array(z.string()).optional(),
  }).optional(),
});

export const VisionCallingSchema = z.object({
  movementalStory: z.string().min(50).max(2000),
  movementalConversation: z.string().min(20).max(500),
  targetAudience: z.string().min(20).max(500),
  threeYearImpact: z.string().min(20).max(500),
  movementalCalling: z.string().min(20).max(500),
  twelveMonthSuccess: z.string().min(20).max(500),
  whatExcitesHim: z.string().min(20).max(500),
});

export const AudienceUnderstandingSchema = z.object({
  whoToReach: z.string().min(20).max(500),
  audienceQuestions: z.array(z.string().min(10).max(200)),
  currentContentLocations: z.array(z.enum(['email', 'social', 'blog', 'sermons', 'other'])),
  audienceNeeds: z.string().min(20).max(500),
});

export const ContentInventorySchema = z.object({
  regularContentTypes: z.array(z.enum(['sermons', 'talks', 'emails', 'articles', 'videos', 'other'])),
  archiveContentToImport: z.string().optional(),
  existingBlogUrls: z.array(z.string().url()).optional(),
  contentSources: z.array(z.string()).optional(),
});

export const CapacityTimelineSchema = z.object({
  timePerWeek: z.string().min(1),
  publishingCadence: z.enum(['daily', 'weekly', 'bi-weekly', 'monthly', 'as-needed']),
  callAvailability: z.array(z.string()), // Array of preferred times
  timelineExpectations: z.string().min(1),
});

export const GoalsConcernsSchema = z.object({
  incomeGoal: z.string().optional(),
  contentGoals: z.string().min(20).max(500),
  audienceGrowthGoals: z.string().optional(),
  digitalPublishingConcerns: z.string().min(20).max(500),
  quitRiskFactors: z.string().min(20).max(500),
  supportNeeds: z.string().min(20).max(500),
});

export const DecisionsApprovalsSchema = z.object({
  designReviewPreference: z.enum(['trust-judgment', 'see-options', 'review-all']),
  preferredDomain: z.string().optional(),
  domainOwnership: z.string().optional(),
  emailSendingDomain: z.string().optional(),
  paymentProcessingPreferences: z.object({
    stripeAccountId: z.string().optional(),
  }).optional(),
  featurePreferences: z.array(z.string()).optional(),
  networkParticipation: z.boolean().default(true),
  networkCrossReferences: z.boolean().default(true),
  networkDiscovery: z.boolean().default(true),
  networkIntroductionPreferences: z.array(z.string()).optional(),
  collaborationInterests: z.string().optional(),
});

export const ProfileInformationSchema = z.object({
  bio: z.string().min(100).max(2000),
  photo: z.instanceof(File).optional(),
  socialMediaLinks: z.object({
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    website: z.string().url().optional(),
  }).optional(),
  email: z.string().email(),
  contactInformation: z.object({
    phone: z.string().optional(),
    address: z.string().optional(),
  }).optional(),
});

// Combined form schema for step-by-step validation
export const OnboardingFormSchema = z.object({
  step1: VoiceContentSamplesSchema,
  step2: BrandAssetsSchema,
  step3: VisionCallingSchema,
  step4: AudienceUnderstandingSchema,
  step5: ContentInventorySchema,
  step6: CapacityTimelineSchema,
  step7: GoalsConcernsSchema,
  step8: DecisionsApprovalsSchema,
  step9: ProfileInformationSchema,
});
