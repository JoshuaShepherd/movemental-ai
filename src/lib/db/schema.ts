/**
 * Drizzle schema — single source of truth for the movemental database.
 *
 * Auto-generated from live Supabase database (public schema) on 2026-04-13.
 *
 * Layer 1 of the six-layer type safety chain (see CLAUDE.md):
 *   Drizzle → Zod → Services → API → Hooks → UI
 *
 * Types flow downstream only — never import from higher layers.
 * Add tables here first; regenerate Zod schemas from this file.
 */

import {
  bigint,
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
  unique,
} from "drizzle-orm/pg-core";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function id(name: string) {
  return uuid(name).primaryKey().defaultRandom().notNull();
}

function createdAt(name: string) {
  return timestamp(name, { withTimezone: true, mode: "string" }).notNull().defaultNow();
}

function updatedAt(name: string) {
  return timestamp(name, { withTimezone: true, mode: "string" }).notNull().defaultNow();
}

// ---------------------------------------------------------------------------
// Tables
// ---------------------------------------------------------------------------

export const userProfiles = pgTable("user_profiles", {
  id: id("id"),
  email: text("email").notNull().unique(),
  first_name: text("first_name"),
  last_name: text("last_name"),
  display_name: text("display_name"),
  bio: text("bio"),
  avatar_url: text("avatar_url"),
  ministry_role: text("ministry_role"),
  denomination: text("denomination"),
  organization_name: text("organization_name"),
  years_in_ministry: integer("years_in_ministry"),
  country_code: text("country_code"),
  timezone: text("timezone"),
  language_primary: text("language_primary").default("en"),
  cultural_context: text("cultural_context"),
  assessment_movement_alignment: integer("assessment_movement_alignment"),
  assessment_audience_engagement: integer("assessment_audience_engagement"),
  assessment_content_readiness: integer("assessment_content_readiness"),
  assessment_revenue_potential: integer("assessment_revenue_potential"),
  assessment_network_effects: integer("assessment_network_effects"),
  assessment_strategic_fit: integer("assessment_strategic_fit"),
  assessment_total: integer("assessment_total"),
  leader_tier: text("leader_tier"),
  subdomain: text("subdomain").unique(),
  custom_domain: text("custom_domain").unique(),
  platform_title: text("platform_title"),
  subscription_tier: text("subscription_tier").default("free"),
  theological_focus: jsonb("theological_focus"),
  brand_colors: jsonb("brand_colors"),
  email_notifications: jsonb("email_notifications"),
  privacy_settings: jsonb("privacy_settings"),
  onboarding_completed: boolean("onboarding_completed").default(false),
  onboarding_step: integer("onboarding_step").default(1),
  account_status: text("account_status").default("pending_verification"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  last_active_at: timestamp("last_active_at", { withTimezone: true, mode: "string" }).defaultNow(),
  role: text("role").default("user"),
  unified_movemental_profile: jsonb("unified_movemental_profile"),
});

export const subscriptionPlans = pgTable("subscription_plans", {
  id: id("id"),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  plan_type: text("plan_type").notNull(),
  price_monthly: numeric("price_monthly"),
  price_annual: numeric("price_annual"),
  currency: text("currency").default("USD"),
  content_access_level: text("content_access_level").notNull(),
  features: jsonb("features").notNull(),
  max_users: integer("max_users").default(1),
  storage_limit: integer("storage_limit"),
  bandwidth_limit: integer("bandwidth_limit"),
  stripe_product_id: text("stripe_product_id").unique(),
  stripe_price_id_monthly: text("stripe_price_id_monthly"),
  stripe_price_id_annual: text("stripe_price_id_annual"),
  is_active: boolean("is_active").default(true),
  is_popular: boolean("is_popular").default(false),
  sort_order: integer("sort_order").default(0),
  trial_days: integer("trial_days").default(0),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const organizations = pgTable("organizations", {
  id: id("id"),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  website: text("website"),
  logo_url: text("logo_url"),
  organization_type: text("organization_type").notNull(),
  size_category: text("size_category"),
  contact_email: text("contact_email"),
  contact_phone: text("contact_phone"),
  address: jsonb("address"),
  license_type: text("license_type").default("individual"),
  max_users: integer("max_users").default(1),
  billing_email: text("billing_email"),
  account_owner_id: uuid("account_owner_id").references(() => userProfiles.id),
  status: text("status").default("trial"),
  subdomain: text("subdomain").unique(),
  custom_domain: text("custom_domain").unique(),
  is_active: boolean("is_active").default(true),
  plan_id: uuid("plan_id").references(() => subscriptionPlans.id),
  settings: jsonb("settings"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  city: text("city"),
  country: text("country"),
  member_count: integer("member_count").default(0),
  type: text("type"),
  is_verified: boolean("is_verified").default(false),
  onboarding_started_at: timestamp("onboarding_started_at", {
    withTimezone: true,
    mode: "string",
  }),
  onboarding_completed_at: timestamp("onboarding_completed_at", {
    withTimezone: true,
    mode: "string",
  }),
  onboarding_state: jsonb("onboarding_state").notNull().default({}),
  cohort_start_date: date("cohort_start_date"),
});

export const contentCategories = pgTable("content_categories", {
  id: id("id"),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  parent_id: uuid("parent_id").references((): AnyPgColumn => contentCategories.id),
  order_index: integer("order_index").default(0),
  theological_discipline: text("theological_discipline"),
  movement_relevance_score: integer("movement_relevance_score").default(5),
  apest_relevance: jsonb("apest_relevance"),
  meta_description: text("meta_description"),
  keywords: jsonb("keywords"),
  is_active: boolean("is_active").default(true),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const courses = pgTable("courses", {
  id: id("id"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  author_id: uuid("author_id").notNull().references(() => userProfiles.id),
  cover_image_url: text("cover_image_url"),
  trailer_video_url: text("trailer_video_url"),
  difficulty_level: text("difficulty_level").default("beginner"),
  estimated_hours: integer("estimated_hours"),
  language: text("language").default("en"),
  price_usd: numeric("price_usd").notNull().default("0"),
  sale_price_usd: numeric("sale_price_usd"),
  sale_ends_at: timestamp("sale_ends_at", { withTimezone: true, mode: "string" }),
  access_type: text("access_type").default("purchase"),
  student_count: integer("student_count").default(0),
  max_students: integer("max_students"),
  lessons_count: integer("lessons_count").default(0),
  primary_category_id: uuid("primary_category_id").references((): AnyPgColumn => contentCategories.id),
  tags: jsonb("tags"),
  status: text("status").default("draft"),
  published_at: timestamp("published_at", { withTimezone: true, mode: "string" }),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  course_type: text("course_type"),
  duration_weeks: integer("duration_weeks"),
  phase_type: text("phase_type"),
  cohort_size: integer("cohort_size"),
  certificate_enabled: boolean("certificate_enabled").default(false),
  certificate_template_id: uuid("certificate_template_id"),
  certificate_requires_completion: boolean("certificate_requires_completion").default(false),
  structure_type: text("structure_type"),
  portal_themes: jsonb("portal_themes"),
  learning_outcomes: jsonb("learning_outcomes"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const courseLessons = pgTable("course_lessons", {
  id: id("id"),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  module_number: integer("module_number").notNull(),
  lesson_number: integer("lesson_number").notNull(),
  content_type: text("content_type").notNull(),
  video_url: text("video_url"),
  video_duration_seconds: integer("video_duration_seconds"),
  content: text("content"),
  attachments: jsonb("attachments"),
  resources: jsonb("resources"),
  is_preview: boolean("is_preview").default(false),
  status: text("status").default("draft"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull(),
  week_number: integer("week_number"),
  module_type: text("module_type"),
  field_experiment_id: uuid("field_experiment_id"),
  journal_prompt_id: uuid("journal_prompt_id"),
  content_item_id: uuid("content_item_id"),
  video_id: uuid("video_id"),
  media_id: uuid("media_id"),
  content_source: text("content_source"),
  module_id: uuid("module_id"),
  week_id: uuid("week_id"),
  section_type: text("section_type"),
  section_order: integer("section_order").default(0),
  audio_id: uuid("audio_id"),
  audio_url: text("audio_url"),
  embed_code: text("embed_code"),
  nav_title: text("nav_title"),
  transcript: text("transcript"),
});

export const courseEnrollments = pgTable("course_enrollments", {
  id: id("id"),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  enrolled_at: timestamp("enrolled_at", { withTimezone: true, mode: "string" }).defaultNow(),
  enrollment_type: text("enrollment_type").notNull(),
  amount_paid: numeric("amount_paid"),
  stripe_payment_intent_id: text("stripe_payment_intent_id"),
  progress_percentage: integer("progress_percentage").default(0),
  completed_lessons: integer("completed_lessons").default(0),
  last_accessed_lesson_id: uuid("last_accessed_lesson_id").references(() => courseLessons.id),
  last_accessed_at: timestamp("last_accessed_at", { withTimezone: true, mode: "string" }),
  completed_at: timestamp("completed_at", { withTimezone: true, mode: "string" }),
  certificate_issued: boolean("certificate_issued").default(false),
  certificate_id: uuid("certificate_id"),
  certificate_url: text("certificate_url"),
  certificate_issued_at: timestamp("certificate_issued_at", { withTimezone: true, mode: "string" }),
  status: text("status").default("active"),
  track_assignment: text("track_assignment"),
  limiting_factor: text("limiting_factor"),
  cohort_id: uuid("cohort_id"),
  residency_project_id: uuid("residency_project_id"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  progress_data: jsonb("progress_data"),
});

export const accessExpirations = pgTable("access_expirations", {
  id: id("id"),
  enrollment_id: uuid("enrollment_id").notNull().references(() => courseEnrollments.id),
  expires_at: timestamp("expires_at", { withTimezone: true, mode: "string" }).notNull(),
  extended_at: timestamp("extended_at", { withTimezone: true, mode: "string" }),
  extended_by: uuid("extended_by").references(() => userProfiles.id),
  status: text("status").default("active"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const affiliates = pgTable("affiliates", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  affiliate_code: text("affiliate_code").notNull(),
  commission_rate: numeric("commission_rate").notNull(),
  total_earnings: numeric("total_earnings").default("0"),
  status: text("status").default("active"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const purchases = pgTable("purchases", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  course_id: uuid("course_id").references(() => courses.id),
  amount_paid: numeric("amount_paid").notNull(),
  currency: text("currency").default("USD"),
  payment_method: text("payment_method"),
  payment_intent_id: text("payment_intent_id"),
  invoice_number: text("invoice_number"),
  receipt_url: text("receipt_url"),
  purchased_at: timestamp("purchased_at", { withTimezone: true, mode: "string" }).defaultNow(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const affiliateReferrals = pgTable("affiliate_referrals", {
  id: id("id"),
  affiliate_id: uuid("affiliate_id").notNull().references(() => affiliates.id),
  referred_user_id: uuid("referred_user_id").notNull().references(() => userProfiles.id),
  course_id: uuid("course_id").references(() => courses.id),
  purchase_id: uuid("purchase_id").references(() => purchases.id),
  commission_amount: numeric("commission_amount"),
  status: text("status").default("pending"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const agentGuardrailAssignments = pgTable("agent_guardrail_assignments", {
  id: id("id"),
  agent_id: uuid("agent_id").notNull(),
  guardrail_id: uuid("guardrail_id").notNull(),
  created_at: createdAt("created_at"),
  organization_id: uuid("organization_id").notNull(),
  order: integer("order").default(0),
  config: jsonb("config"),
  enabled: boolean("enabled").default(true),
  updated_at: updatedAt("updated_at"),
});

export const agentGuardrails = pgTable("agent_guardrails", {
  id: id("id"),
  name: text("name").notNull(),
  description: text("description"),
  guardrail_type: text("guardrail_type").notNull(),
  guardrail_data: jsonb("guardrail_data").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  type: text("type"),
  config: jsonb("config"),
  implementation: text("implementation"),
  is_active: boolean("is_active").default(true),
  execution_phase: text("execution_phase").default("both"),
  execution_mode: text("execution_mode").default("blocking"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

/** Retrieval / file-search backend binding per tenant (vector store id, RAG corpus, etc.). */
export const corpusBindings = pgTable(
  "corpus_bindings",
  {
    id: id("id"),
    organization_id: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    /** e.g. openai_vector_store | openai_file_search | supabase_pgvector | gemini_file | vertex_rag */
    provider: text("provider").notNull(),
    provider_resource_id: text("provider_resource_id"),
    provider_secondary_id: text("provider_secondary_id"),
    filter_defaults: jsonb("filter_defaults").notNull().default({}),
    metadata: jsonb("metadata").notNull().default({}),
    status: text("status").default("active"),
    created_at: createdAt("created_at"),
    updated_at: updatedAt("updated_at"),
  },
  (t) => [unique("corpus_bindings_organization_id_slug_unique").on(t.organization_id, t.slug)],
);

/** Versioned composable prompt (layers assembled server-side into system prompt). */
export const promptPacks = pgTable(
  "prompt_packs",
  {
    id: id("id"),
    organization_id: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    version: integer("version").notNull().default(1),
    label: text("label"),
    status: text("status").default("active"),
    created_at: createdAt("created_at"),
    updated_at: updatedAt("updated_at"),
  },
  (t) => [unique("prompt_packs_organization_id_slug_version_unique").on(t.organization_id, t.slug, t.version)],
);

export const promptPackLayers = pgTable("prompt_pack_layers", {
  id: id("id"),
  prompt_pack_id: uuid("prompt_pack_id")
    .notNull()
    .references(() => promptPacks.id, { onDelete: "cascade" }),
  /** Convention: base | voice | safety | surface */
  layer_key: text("layer_key").notNull(),
  content: text("content").notNull(),
  sort_order: integer("sort_order").default(0),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const agents = pgTable("agents", {
  id: id("id"),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  agent_type: text("agent_type"),
  system_prompt: text("system_prompt").notNull(),
  model: text("model").default("gpt-4o"),
  temperature: numeric("temperature").default("0.7"),
  max_tokens: integer("max_tokens").default(2000),
  status: text("status").default("active"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  instructions: text("instructions"),
  top_p: numeric("top_p"),
  version: integer("version").default(1),
  created_by: uuid("created_by"),
  organization_id: uuid("organization_id").notNull(),
  metadata: jsonb("metadata"),
  stream_enabled: boolean("stream_enabled").default(true),
  stream_chunk_size: integer("stream_chunk_size").default(100),
  stream_format: text("stream_format").default("text"),
  corpus_binding_id: uuid("corpus_binding_id").references(() => corpusBindings.id, {
    onDelete: "set null",
  }),
  prompt_pack_id: uuid("prompt_pack_id").references(() => promptPacks.id, { onDelete: "set null" }),
});

export const agentHandoffs = pgTable("agent_handoffs", {
  id: id("id"),
  from_agent_id: uuid("from_agent_id").notNull().references(() => agents.id),
  to_agent_id: uuid("to_agent_id").notNull().references(() => agents.id),
  trigger_rules: jsonb("trigger_rules"),
  priority: integer("priority").default(0),
  is_active: boolean("is_active").default(true),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const agentInstances = pgTable("agent_instances", {
  id: id("id"),
  agent_id: uuid("agent_id").notNull().references(() => agents.id),
  user_id: uuid("user_id").notNull(),
  conversation_id: uuid("conversation_id"),
  instance_data: jsonb("instance_data"),
  status: text("status").default("active"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull(),
  context: jsonb("context"),
  started_at: timestamp("started_at", { withTimezone: true, mode: "string" }),
  completed_at: timestamp("completed_at", { withTimezone: true, mode: "string" }),
  error_message: text("error_message"),
  session_id: uuid("session_id"),
  thread_id: uuid("thread_id"),
  assistant_id: text("assistant_id"),
});

export const contentItems = pgTable("content_items", {
  id: id("id"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content"),
  author_id: uuid("author_id").notNull().references(() => userProfiles.id),
  co_authors: jsonb("co_authors"),
  content_type: text("content_type").notNull(),
  format: text("format").default("text"),
  word_count: integer("word_count"),
  estimated_reading_time: integer("estimated_reading_time"),
  view_count: integer("view_count").default(0),
  like_count: integer("like_count").default(0),
  share_count: integer("share_count").default(0),
  comment_count: integer("comment_count").default(0),
  bookmark_count: integer("bookmark_count").default(0),
  primary_category_id: uuid("primary_category_id").references((): AnyPgColumn => contentCategories.id),
  secondary_categories: jsonb("secondary_categories"),
  tags: jsonb("tags"),
  theological_themes: jsonb("theological_themes"),
  series_id: uuid("series_id"),
  series_order: integer("series_order"),
  visibility: text("visibility").default("public"),
  status: text("status").default("draft"),
  network_amplification_score: numeric("network_amplification_score").default("0"),
  cross_reference_count: integer("cross_reference_count").default(0),
  ai_enhanced: boolean("ai_enhanced").default(false),
  ai_summary: text("ai_summary"),
  ai_key_points: jsonb("ai_key_points"),
  featured_image_url: text("featured_image_url"),
  video_url: text("video_url"),
  audio_url: text("audio_url"),
  attachments: jsonb("attachments"),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  canonical_url: text("canonical_url"),
  original_source: text("original_source"),
  license_type: text("license_type").default("all_rights_reserved"),
  attribution_required: boolean("attribution_required").default(true),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  published_at: timestamp("published_at", { withTimezone: true, mode: "string" }),
  scheduled_at: timestamp("scheduled_at", { withTimezone: true, mode: "string" }),
  search_vector: text("search_vector") /* unmapped type: vector */,
  duration_seconds: integer("duration_seconds"),
  episode_number: integer("episode_number"),
  season_number: integer("season_number"),
  transcript: text("transcript"),
  event_start_date: timestamp("event_start_date", { withTimezone: true, mode: "string" }),
  event_end_date: timestamp("event_end_date", { withTimezone: true, mode: "string" }),
  event_location: text("event_location"),
  event_type: text("event_type"),
  event_capacity: integer("event_capacity"),
  event_price: numeric("event_price"),
  event_registration_url: text("event_registration_url"),
  event_meeting_url: text("event_meeting_url"),
  testimonial_author: text("testimonial_author"),
  testimonial_role: text("testimonial_role"),
  testimonial_organization: text("testimonial_organization"),
  testimonial_image_url: text("testimonial_image_url"),
  testimonial_rating: integer("testimonial_rating"),
  testimonial_type: text("testimonial_type"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const sermonPreparations = pgTable("sermon_preparations", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  content_id: uuid("content_id").references(() => contentItems.id),
  biblical_reference: text("biblical_reference"),
  title: text("title"),
  status: text("status").notNull().default("draft"),
  workflow_id: uuid("workflow_id"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const agentInteractions = pgTable("agent_interactions", {
  id: id("id"),
  sermon_preparation_id: uuid("sermon_preparation_id").references(() => sermonPreparations.id),
  agent_id: text("agent_id").notNull(),
  agent_name: text("agent_name").notNull(),
  message: text("message").notNull(),
  response: text("response"),
  tools_used: jsonb("tools_used"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
});

export const agentMetrics = pgTable("agent_metrics", {
  id: id("id"),
  agent_id: uuid("agent_id").notNull().references(() => agents.id),
  date: date("date").notNull(),
  usage_count: integer("usage_count").default(0),
  avg_response_time: integer("avg_response_time"),
  success_rate: numeric("success_rate"),
  cost_total: numeric("cost_total").default("0"),
  tokens_total: integer("tokens_total").default(0),
  error_count: integer("error_count").default(0),
  user_rating: numeric("user_rating"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const agentToolAssignments = pgTable("agent_tool_assignments", {
  id: id("id"),
  agent_id: uuid("agent_id").notNull(),
  tool_id: uuid("tool_id").notNull(),
  created_at: createdAt("created_at"),
  enabled: boolean("enabled").default(true),
  config: jsonb("config"),
  order: integer("order").default(0),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const agentTools = pgTable("agent_tools", {
  id: id("id"),
  name: text("name").notNull(),
  tool_type: text("tool_type").notNull(),
  tool_config: jsonb("tool_config").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  description: text("description"),
  config: jsonb("config"),
  implementation: text("implementation"),
  is_active: boolean("is_active").default(true),
  tool_category: text("tool_category"),
  execution_type: text("execution_type"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const agentTraces = pgTable("agent_traces", {
  id: id("id"),
  agent_instance_id: uuid("agent_instance_id").references(() => agentInstances.id),
  trace_type: text("trace_type").notNull(),
  trace_data: jsonb("trace_data").notNull(),
  created_at: createdAt("created_at"),
  agent_id: uuid("agent_id"),
  agent_name: text("agent_name"),
  conversation_id: uuid("conversation_id"),
  instance_id: uuid("instance_id"),
  start_time: timestamp("start_time", { withTimezone: true, mode: "string" }),
  end_time: timestamp("end_time", { withTimezone: true, mode: "string" }),
  duration: integer("duration"),
  events: jsonb("events"),
  output_length: integer("output_length"),
  tool_calls_count: integer("tool_calls_count"),
  error_message: text("error_message"),
  metadata: jsonb("metadata"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const assessments = pgTable("assessments", {
  id: id("id"),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  assessment_type: text("assessment_type").notNull(),
  questions_count: integer("questions_count").notNull(),
  estimated_duration: integer("estimated_duration"),
  passing_score: integer("passing_score"),
  version: text("version").default("1.0"),
  language: text("language").default("en"),
  cultural_adaptation: text("cultural_adaptation").default("universal"),
  research_backed: boolean("research_backed").default(false),
  validity_score: numeric("validity_score"),
  reliability_score: numeric("reliability_score"),
  instructions: text("instructions"),
  scoring_method: text("scoring_method").default("likert_5"),
  status: text("status").default("draft"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  published_at: timestamp("published_at", { withTimezone: true, mode: "string" }),
  certificate_enabled: boolean("certificate_enabled").default(false),
  certificate_template_id: uuid("certificate_template_id"),
  certificate_minimum_score: numeric("certificate_minimum_score"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const userAssessments = pgTable("user_assessments", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  assessment_id: uuid("assessment_id").notNull().references((): AnyPgColumn => userAssessments.id),
  started_at: timestamp("started_at", { withTimezone: true, mode: "string" }).defaultNow(),
  completed_at: timestamp("completed_at", { withTimezone: true, mode: "string" }),
  completion_percentage: integer("completion_percentage").default(0),
  raw_scores: jsonb("raw_scores"),
  total_score: integer("total_score"),
  max_possible_score: integer("max_possible_score"),
  apostolic_score: integer("apostolic_score"),
  prophetic_score: integer("prophetic_score"),
  evangelistic_score: integer("evangelistic_score"),
  shepherding_score: integer("shepherding_score"),
  teaching_score: integer("teaching_score"),
  normalized_scores: jsonb("normalized_scores"),
  primary_gift: text("primary_gift"),
  secondary_gift: text("secondary_gift"),
  response_consistency: numeric("response_consistency"),
  completion_time: integer("completion_time"),
  confidence_level: integer("confidence_level"),
  cultural_adjustment_applied: boolean("cultural_adjustment_applied").default(false),
  cultural_adjustment_factor: numeric("cultural_adjustment_factor"),
  ai_insights: text("ai_insights"),
  personalized_recommendations: jsonb("personalized_recommendations"),
  suggested_peers: jsonb("suggested_peers"),
  complementary_gifts: jsonb("complementary_gifts"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  jesus_is_lord_score: integer("jesus_is_lord_score"),
  jesus_is_lord_level: integer("jesus_is_lord_level"),
  disciple_making_score: integer("disciple_making_score"),
  disciple_making_level: integer("disciple_making_level"),
  missional_incarnational_score: integer("missional_incarnational_score"),
  missional_incarnational_level: integer("missional_incarnational_level"),
  apostolic_environment_score: integer("apostolic_environment_score"),
  apostolic_environment_level: integer("apostolic_environment_level"),
  organic_systems_score: integer("organic_systems_score"),
  organic_systems_level: integer("organic_systems_level"),
  liminality_communitas_score: integer("liminality_communitas_score"),
  liminality_communitas_level: integer("liminality_communitas_level"),
  overall_maturity_level: integer("overall_maturity_level"),
  overall_maturity_label: text("overall_maturity_label"),
  geometric_mean: numeric("geometric_mean"),
  limiting_factor: text("limiting_factor"),
  lordship_gate_applied: boolean("lordship_gate_applied").default(false),
  element_scores: jsonb("element_scores"),
  assessment_context: jsonb("assessment_context"),
  sprint_pathway: jsonb("sprint_pathway"),
  sprint_start_date: timestamp("sprint_start_date", { withTimezone: true, mode: "string" }),
  sprint_progress: jsonb("sprint_progress"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const aiInsights = pgTable("ai_insights", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  insight_type: text("insight_type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  source_conversation_id: uuid("source_conversation_id"),
  source_assessment_id: uuid("source_assessment_id").references((): AnyPgColumn => userAssessments.id),
  related_entities: jsonb("related_entities"),
  confidence_score: numeric("confidence_score"),
  user_accepted: boolean("user_accepted").default(false),
  user_feedback: text("user_feedback"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const aiLabConversations = pgTable("ai_lab_conversations", {
  id: id("id"),
  user_id: uuid("user_id"),
  title: text("title"),
  conversation_data: jsonb("conversation_data"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  theme: text("theme"),
  mode: text("mode"),
  style: text("style"),
  messages: jsonb("messages"),
  topics: text("topics").array(),
  session_id: uuid("session_id"),
  context: jsonb("context"),
  organization_id: uuid("organization_id").references(() => organizations.id),
});

export const aiLabLiteConversations = pgTable("ai_lab_lite_conversations", {
  id: id("id"),
  user_id: uuid("user_id").notNull(),
  conversation_data: jsonb("conversation_data"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  title: text("title"),
  messages: jsonb("messages"),
  topics: text("topics").array(),
  session_id: uuid("session_id"),
  context: jsonb("context"),
  organization_id: uuid("organization_id").notNull(),
  theme: text("theme"),
});

export const aiLabTestTickets = pgTable("ai_lab_test_tickets", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  difficulty: text("difficulty").default("moderate"),
  goal: text("goal"),
  prompt_starter: text("prompt_starter").notNull(),
  suggested_followups: jsonb("suggested_followups"),
  success_criteria: text("success_criteria"),
  risk_tags: jsonb("risk_tags"),
  display_order: integer("display_order").default(0),
  status: text("status").default("active"),
  is_featured: boolean("is_featured").default(false),
  estimated_minutes: integer("estimated_minutes").default(10),
  audience: text("audience"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const aiLabTestRuns = pgTable("ai_lab_test_runs", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  ticket_id: uuid("ticket_id").notNull().references(() => aiLabTestTickets.id),
  user_id: uuid("user_id"),
  session_id: uuid("session_id"),
  started_at: timestamp("started_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  completed_at: timestamp("completed_at", { withTimezone: true, mode: "string" }),
  status: text("status").default("in_progress"),
  entry_context: jsonb("entry_context"),
  model_name: text("model_name"),
  agent_name: text("agent_name"),
  transcript_excerpt: text("transcript_excerpt"),
  trace_id: text("trace_id"),
  metrics_snapshot: jsonb("metrics_snapshot"),
});

export const aiLabTestFeedback = pgTable("ai_lab_test_feedback", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  test_run_id: uuid("test_run_id").notNull().references(() => aiLabTestRuns.id),
  ticket_id: uuid("ticket_id").notNull().references(() => aiLabTestTickets.id),
  user_id: uuid("user_id"),
  outcome_rating: text("outcome_rating").notNull(),
  groundedness_rating: integer("groundedness_rating"),
  safety_rating: integer("safety_rating"),
  voice_authenticity_rating: integer("voice_authenticity_rating"),
  helpfulness_rating: integer("helpfulness_rating"),
  confidence_rating: integer("confidence_rating"),
  would_quote_publicly: boolean("would_quote_publicly"),
  did_speculate: boolean("did_speculate").default(false),
  did_feel_off_brand: boolean("did_feel_off_brand").default(false),
  notes: text("notes"),
  recommended_followup: text("recommended_followup"),
  created_at: createdAt("created_at"),
});

export const aiLabTestFlags = pgTable("ai_lab_test_flags", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  test_run_id: uuid("test_run_id").notNull().references(() => aiLabTestRuns.id),
  feedback_id: uuid("feedback_id").references(() => aiLabTestFeedback.id),
  severity: text("severity").notNull(),
  flag_type: text("flag_type").notNull(),
  summary: text("summary").notNull(),
  details: text("details"),
  status: text("status").default("open"),
  created_by_user_id: uuid("created_by_user_id"),
  created_at: createdAt("created_at"),
  resolved_at: timestamp("resolved_at", { withTimezone: true, mode: "string" }),
});

export const analyticsEvents = pgTable("analytics_events", {
  id: id("id"),
  event_type: text("event_type").notNull(),
  event_category: text("event_category").notNull(),
  event_action: text("event_action").notNull(),
  event_label: text("event_label"),
  user_id: uuid("user_id"),
  resource_type: text("resource_type"),
  resource_id: uuid("resource_id"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
});

export const archiveCollections = pgTable("archive_collections", {
  id: id("id"),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  title: text("title"),
  order_index: integer("order_index").default(0),
  is_active: boolean("is_active").default(true),
  metadata: jsonb("metadata"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const archiveTopics = pgTable("archive_topics", {
  id: id("id"),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  collection_id: uuid("collection_id"),
  parent_topic_id: uuid("parent_topic_id"),
  title: text("title"),
  depth: integer("depth").default(0),
  order_index: integer("order_index").default(0),
  metadata: jsonb("metadata"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const archiveItems = pgTable("archive_items", {
  id: id("id"),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  content: text("content").notNull(),
  collection_id: uuid("collection_id").references(() => archiveCollections.id),
  topic_id: uuid("topic_id").references(() => archiveTopics.id),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const archiveItemRevisions = pgTable("archive_item_revisions", {
  id: id("id"),
  archive_item_id: uuid("archive_item_id").notNull().references(() => archiveItems.id),
  version_number: integer("version_number").default(1),
  title: text("title"),
  summary: text("summary"),
  content_markdown: text("content_markdown"),
  content_html: text("content_html"),
  metadata: jsonb("metadata"),
  created_by: uuid("created_by").references(() => userProfiles.id),
  created_at: createdAt("created_at"),
});

export const archiveMedia = pgTable("archive_media", {
  id: id("id"),
  archive_item_id: uuid("archive_item_id").notNull().references(() => archiveItems.id),
  media_type: text("media_type").notNull(),
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  order_index: integer("order_index").default(0),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const archiveQuotes = pgTable("archive_quotes", {
  id: id("id"),
  archive_item_id: uuid("archive_item_id").notNull().references(() => archiveItems.id),
  quote: text("quote").notNull(),
  attribution: text("attribution"),
  source: text("source"),
  page_reference: text("page_reference"),
  tags: jsonb("tags"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const assessmentCheckpoints = pgTable("assessment_checkpoints", {
  id: id("id"),
  lesson_id: uuid("lesson_id").references(() => courseLessons.id),
  course_id: uuid("course_id").references(() => courses.id),
  title: text("title").notNull(),
  description: text("description"),
  is_optional: boolean("is_optional").default(false),
  block_order: integer("block_order").default(0),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const assessmentQuestions = pgTable("assessment_questions", {
  id: id("id"),
  assessment_id: uuid("assessment_id").notNull().references(() => assessments.id),
  question_text: text("question_text").notNull(),
  question_type: text("question_type").notNull(),
  order_index: integer("order_index").notNull(),
  is_required: boolean("is_required").default(true),
  category: text("category"),
  weight: numeric("weight").default("1"),
  reverse_scored: boolean("reverse_scored").default(false),
  apest_dimension: text("apest_dimension"),
  answer_options: jsonb("answer_options"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  mdna_element: text("mdna_element"),
  maturity_level: integer("maturity_level"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const assessmentResponses = pgTable("assessment_responses", {
  id: id("id"),
  user_assessment_id: uuid("user_assessment_id").notNull().references((): AnyPgColumn => userAssessments.id),
  question_id: uuid("question_id").notNull().references(() => assessmentQuestions.id),
  response_value: integer("response_value"),
  response_text: text("response_text"),
  response_time: integer("response_time"),
  confidence: integer("confidence"),
  skipped: boolean("skipped").default(false),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const assessmentShareTokens = pgTable("assessment_share_tokens", {
  id: id("id"),
  user_assessment_id: uuid("user_assessment_id").notNull().references((): AnyPgColumn => userAssessments.id),
  share_token: text("share_token").notNull(),
  expires_at: timestamp("expires_at", { withTimezone: true, mode: "string" }).notNull(),
  include_personal_info: boolean("include_personal_info").default(false),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const courseAssignments = pgTable("course_assignments", {
  id: id("id"),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  lesson_id: uuid("lesson_id").references(() => courseLessons.id),
  title: text("title").notNull(),
  description: text("description"),
  instructions: text("instructions"),
  due_date: timestamp("due_date", { withTimezone: true, mode: "string" }),
  max_score: integer("max_score"),
  rubric: jsonb("rubric"),
  status: text("status").default("active"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const assignmentSubmissions = pgTable("assignment_submissions", {
  id: id("id"),
  assignment_id: uuid("assignment_id").notNull().references(() => courseAssignments.id),
  enrollment_id: uuid("enrollment_id").notNull().references(() => courseEnrollments.id),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  content: text("content").notNull(),
  attachments: jsonb("attachments"),
  submitted_at: timestamp("submitted_at", { withTimezone: true, mode: "string" }).defaultNow(),
  graded_at: timestamp("graded_at", { withTimezone: true, mode: "string" }),
  score: integer("score"),
  feedback: text("feedback"),
  status: text("status").default("submitted"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const assignmentGrades = pgTable("assignment_grades", {
  id: id("id"),
  submission_id: uuid("submission_id").notNull().references(() => assignmentSubmissions.id),
  grader_id: uuid("grader_id").notNull().references(() => userProfiles.id),
  score: integer("score").notNull(),
  feedback: text("feedback"),
  rubric_scores: jsonb("rubric_scores"),
  graded_at: timestamp("graded_at", { withTimezone: true, mode: "string" }).defaultNow(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const audienceProfiles = pgTable("audience_profiles", {
  id: id("id"),
  user_id: uuid("user_id").notNull(),
  audience_name: text("audience_name").notNull(),
  description: text("description"),
  demographics: jsonb("demographics"),
  size_estimate: text("size_estimate"),
  engagement_metrics: jsonb("engagement_metrics"),
  content_preferences: jsonb("content_preferences"),
  growth_trends: jsonb("growth_trends"),
  primary_channel: text("primary_channel"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const auditLogs = pgTable("audit_logs", {
  id: id("id"),
  user_id: uuid("user_id").references(() => userProfiles.id),
  action: text("action").notNull(),
  resource_type: text("resource_type").notNull(),
  resource_id: uuid("resource_id"),
  changes: jsonb("changes"),
  ip_address: text("ip_address"),
  user_agent: text("user_agent"),
  created_at: createdAt("created_at"),
});

export const bookSeries = pgTable("book_series", {
  id: id("id"),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  author_id: uuid("author_id").references(() => userProfiles.id),
  cover_image_url: text("cover_image_url"),
  book_count: integer("book_count").default(0),
  total_pages: integer("total_pages").default(0),
  status: text("status").default("active"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const books = pgTable("books", {
  id: id("id"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  subtitle: text("subtitle"),
  description: text("description"),
  isbn: text("isbn").unique(),
  asin: text("asin"),
  publication_date: date("publication_date"),
  page_count: integer("page_count"),
  word_count: integer("word_count"),
  author_id: uuid("author_id").references(() => userProfiles.id),
  co_authors: jsonb("co_authors"),
  editor: text("editor"),
  publisher: text("publisher"),
  excerpt: text("excerpt"),
  mdx_source_url: text("mdx_source_url"),
  cover_image_url: text("cover_image_url"),
  preview_chapters: integer("preview_chapters").default(1),
  sample_content_url: text("sample_content_url"),
  primary_category_id: uuid("primary_category_id").references((): AnyPgColumn => contentCategories.id),
  secondary_categories: jsonb("secondary_categories"),
  tags: jsonb("tags"),
  theological_themes: jsonb("theological_themes"),
  target_audience: text("target_audience").array(),
  difficulty_level: text("difficulty_level"),
  price_usd: numeric("price_usd"),
  price_eur: numeric("price_eur"),
  price_gbp: numeric("price_gbp"),
  currency: text("currency").default("USD"),
  discount_percentage: integer("discount_percentage").default(0),
  sale_price_usd: numeric("sale_price_usd"),
  sale_ends_at: timestamp("sale_ends_at", { withTimezone: true, mode: "string" }),
  stripe_product_id: text("stripe_product_id").unique(),
  stripe_price_id: text("stripe_price_id"),
  access_type: text("access_type").default("purchase"),
  required_plan_tier: text("required_plan_tier"),
  is_included_in_subscription: boolean("is_included_in_subscription").default(false),
  status: text("status").default("draft"),
  published_at: timestamp("published_at", { withTimezone: true, mode: "string" }),
  view_count: integer("view_count").default(0),
  purchase_count: integer("purchase_count").default(0),
  review_count: integer("review_count").default(0),
  average_rating: numeric("average_rating"),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  series_id: uuid("series_id").references(() => bookSeries.id),
  series_order: integer("series_order"),
  copyright_year: integer("copyright_year"),
  license_type: text("license_type").default("all_rights_reserved"),
  drm_enabled: boolean("drm_enabled").default(true),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  chapters: jsonb("chapters"),
  search_vector: text("search_vector") /* unmapped type: vector */,
  total_chapters: integer("total_chapters").default(0),
  preview_chapters_count: integer("preview_chapters_count").default(1),
  has_audio: boolean("has_audio").default(false),
  has_discussion_questions: boolean("has_discussion_questions").default(false),
  book_id: text("book_id").references((): AnyPgColumn => books.id),
  key_topics: jsonb("key_topics"),
  cover_image: text("cover_image"),
  cover_image_fallback: text("cover_image_fallback"),
  formats: jsonb("formats"),
  price_range: jsonb("price_range"),
  purchase_links: jsonb("purchase_links"),
  seo_keywords: jsonb("seo_keywords"),
  related_books: jsonb("related_books"),
  language: text("language"),
  chapter_count: integer("chapter_count"),
  is_active: boolean("is_active").default(true),
  portal_themes: jsonb("portal_themes"),
  original_book_id: text("original_book_id"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const bookChapters = pgTable("book_chapters", {
  id: id("id"),
  book_id: uuid("book_id").notNull().references((): AnyPgColumn => books.id),
  chapter_number: integer("chapter_number").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  word_count: integer("word_count"),
  estimated_reading_time: integer("estimated_reading_time"),
  status: text("status").default("published"),
  published_at: timestamp("published_at", { withTimezone: true, mode: "string" }),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  has_table_of_contents: boolean("has_table_of_contents").default(false),
  has_discussion_questions: boolean("has_discussion_questions").default(false),
  has_audio_version: boolean("has_audio_version").default(false),
  audio_url: text("audio_url"),
  sort_order: integer("sort_order").default(0),
  is_preview: boolean("is_preview").default(false),
  view_count: integer("view_count").default(0),
  like_count: integer("like_count").default(0),
  bookmark_count: integer("bookmark_count").default(0),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const booksChapters = pgTable("books_chapters", {
  id: id("id"),
  book_id: uuid("book_id").notNull(),
  chapter_number: integer("chapter_number").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  word_count: integer("word_count"),
  estimated_reading_time: integer("estimated_reading_time"),
  status: text("status").default("published"),
  published_at: timestamp("published_at", { withTimezone: true, mode: "string" }),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  has_table_of_contents: boolean("has_table_of_contents").default(false),
  has_discussion_questions: boolean("has_discussion_questions").default(false),
  has_audio_version: boolean("has_audio_version").default(false),
  audio_url: text("audio_url"),
  sort_order: integer("sort_order").default(0),
  is_preview: boolean("is_preview").default(false),
  view_count: integer("view_count").default(0),
  like_count: integer("like_count").default(0),
  bookmark_count: integer("bookmark_count").default(0),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  is_active: boolean("is_active").default(true),
  order_index: integer("order_index").default(0),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const bookHighlights = pgTable("book_highlights", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  book_id: uuid("book_id").notNull().references((): AnyPgColumn => books.id),
  chapter_id: uuid("chapter_id").references(() => booksChapters.id),
  selected_text: text("selected_text").notNull(),
  position_start: integer("position_start").notNull(),
  position_end: integer("position_end").notNull(),
  color: text("color").default("yellow"),
  note: text("note"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const bookPurchases = pgTable("book_purchases", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  book_id: uuid("book_id").notNull().references((): AnyPgColumn => books.id),
  purchase_date: timestamp("purchase_date", { withTimezone: true, mode: "string" }).defaultNow(),
  amount_paid: numeric("amount_paid").notNull(),
  currency: text("currency").default("USD"),
  discount_applied: numeric("discount_applied").default("0"),
  stripe_payment_intent_id: text("stripe_payment_intent_id"),
  stripe_charge_id: text("stripe_charge_id"),
  shopify_order_id: text("shopify_order_id"),
  shopify_line_item_id: text("shopify_line_item_id"),
  shopify_product_id: text("shopify_product_id"),
  shopify_customer_id: text("shopify_customer_id"),
  payment_method: text("payment_method"),
  access_granted_at: timestamp("access_granted_at", { withTimezone: true, mode: "string" }).defaultNow(),
  access_expires_at: timestamp("access_expires_at", { withTimezone: true, mode: "string" }),
  is_gift: boolean("is_gift").default(false),
  gift_recipient_email: text("gift_recipient_email"),
  status: text("status").default("completed"),
  refunded_at: timestamp("refunded_at", { withTimezone: true, mode: "string" }),
  refund_amount: numeric("refund_amount"),
  refund_reason: text("refund_reason"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const bookReadingProgress = pgTable("book_reading_progress", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  book_id: uuid("book_id").notNull().references((): AnyPgColumn => books.id),
  chapter_id: uuid("chapter_id").references(() => booksChapters.id),
  scroll_position: numeric("scroll_position").default("0"),
  reading_time_seconds: integer("reading_time_seconds").default(0),
  percentage_complete: integer("percentage_complete"),
  bookmarks: jsonb("bookmarks"),
  reading_speed_wpm: integer("reading_speed_wpm"),
  last_read_at: timestamp("last_read_at", { withTimezone: true, mode: "string" }).defaultNow(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const bookReviews = pgTable("book_reviews", {
  id: id("id"),
  book_id: uuid("book_id").notNull().references((): AnyPgColumn => books.id),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  rating: integer("rating").notNull(),
  title: text("title"),
  content: text("content").notNull(),
  helpful_count: integer("helpful_count").default(0),
  verified_purchase: boolean("verified_purchase").default(false),
  status: text("status").default("published"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const bookmarks = pgTable("bookmarks", {
  id: id("id"),
  user_id: uuid("user_id").notNull(),
  resource_type: text("resource_type").notNull(),
  resource_id: uuid("resource_id").notNull(),
  folder: text("folder").default("default"),
  tags: jsonb("tags"),
  notes: text("notes"),
  bookmarked_at: timestamp("bookmarked_at", { withTimezone: true, mode: "string" }).defaultNow(),
  created_at: createdAt("created_at"),
});

export const certificateTemplates = pgTable("certificate_templates", {
  id: id("id"),
  name: text("name").notNull(),
  description: text("description"),
  certificate_type: text("certificate_type").notNull(),
  template_data: jsonb("template_data"),
  background_image_url: text("background_image_url"),
  logo_url: text("logo_url"),
  header_text: text("header_text"),
  body_text_template: text("body_text_template"),
  footer_text: text("footer_text"),
  signature_image_url: text("signature_image_url"),
  signature_name: text("signature_name"),
  signature_title: text("signature_title"),
  is_default: boolean("is_default").default(false),
  is_active: boolean("is_active").default(true),
  created_by: uuid("created_by").references(() => userProfiles.id),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const certificates = pgTable("certificates", {
  id: id("id"),
  certificate_type: text("certificate_type").notNull(),
  entity_type: text("entity_type"),
  entity_id: uuid("entity_id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  enrollment_id: uuid("enrollment_id").references(() => courseEnrollments.id),
  user_assessment_id: uuid("user_assessment_id").references((): AnyPgColumn => userAssessments.id),
  title: text("title").notNull(),
  description: text("description"),
  template_id: uuid("template_id").references(() => certificateTemplates.id),
  verification_code: text("verification_code").notNull(),
  issued_at: timestamp("issued_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  expires_at: timestamp("expires_at", { withTimezone: true, mode: "string" }),
  certificate_url: text("certificate_url"),
  certificate_image_url: text("certificate_image_url"),
  metadata: jsonb("metadata"),
  status: text("status").default("issued"),
  revoked_at: timestamp("revoked_at", { withTimezone: true, mode: "string" }),
  revoked_reason: text("revoked_reason"),
  shareable: boolean("shareable").default(true),
  public_url: text("public_url"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const ceCredits = pgTable("ce_credits", {
  id: id("id"),
  certificate_id: uuid("certificate_id").references(() => certificates.id),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  entity_type: text("entity_type").notNull(),
  entity_id: uuid("entity_id").notNull(),
  credit_type: text("credit_type").notNull(),
  credit_hours: numeric("credit_hours").notNull(),
  issuing_organization: text("issuing_organization").notNull(),
  accreditation_body: text("accreditation_body"),
  issued_at: timestamp("issued_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  expires_at: timestamp("expires_at", { withTimezone: true, mode: "string" }),
  status: text("status").default("active"),
  verification_url: text("verification_url"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const checkpointQuestions = pgTable("checkpoint_questions", {
  id: id("id"),
  checkpoint_id: uuid("checkpoint_id").notNull().references(() => assessmentCheckpoints.id),
  question: text("question").notNull(),
  question_type: text("question_type").notNull(),
  options: jsonb("options"),
  correct_answer: text("correct_answer"),
  max_length: integer("max_length"),
  question_order: integer("question_order").default(0),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const checkpointResponses = pgTable("checkpoint_responses", {
  id: id("id"),
  checkpoint_id: uuid("checkpoint_id").notNull().references(() => assessmentCheckpoints.id),
  question_id: uuid("question_id").notNull().references(() => checkpointQuestions.id),
  enrollment_id: uuid("enrollment_id").notNull().references(() => courseEnrollments.id),
  response: text("response").notNull(),
  is_correct: boolean("is_correct"),
  score: integer("score"),
  submitted_at: timestamp("submitted_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const citations = pgTable("citations", {
  id: id("id"),
  citation_type: text("citation_type").notNull(),
  title: text("title").notNull(),
  authors: jsonb("authors"),
  publication_date: date("publication_date"),
  publisher: text("publisher"),
  url: text("url"),
  doi: text("doi"),
  isbn: text("isbn"),
  content_item_id: uuid("content_item_id"),
  quote_text: text("quote_text"),
  page_numbers: text("page_numbers"),
  citation_style: text("citation_style").default("chicago"),
  formatted_citation: text("formatted_citation"),
  notes: text("notes"),
  tags: jsonb("tags"),
  collections: jsonb("collections"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const residencyProjects = pgTable("residency_projects", {
  id: id("id"),
  enrollment_id: uuid("enrollment_id").notNull().references(() => courseEnrollments.id),
  project_type: text("project_type"),
  title: text("title").notNull(),
  description: text("description"),
  focus_element: text("focus_element").notNull(),
  objectives: jsonb("objectives"),
  deliverables: jsonb("deliverables"),
  started_at: timestamp("started_at", { withTimezone: true, mode: "string" }),
  completed_at: timestamp("completed_at", { withTimezone: true, mode: "string" }),
  outcomes: text("outcomes"),
  reproduction_evidence: jsonb("reproduction_evidence"),
  status: text("status").default("draft"),
  coach_id: uuid("coach_id").references(() => userProfiles.id),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const cohorts = pgTable("cohorts", {
  id: id("id"),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  name: text("name").notNull(),
  start_date: timestamp("start_date", { withTimezone: true, mode: "string" }).notNull(),
  end_date: timestamp("end_date", { withTimezone: true, mode: "string" }).notNull(),
  facilitator_id: uuid("facilitator_id").references(() => userProfiles.id),
  max_participants: integer("max_participants").default(12),
  participant_ids: jsonb("participant_ids"),
  track_assignment: text("track_assignment"),
  status: text("status").default("active"),
  settings: jsonb("settings"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const coachingHuddles = pgTable("coaching_huddles", {
  id: id("id"),
  residency_project_id: uuid("residency_project_id").references(() => residencyProjects.id),
  cohort_id: uuid("cohort_id").references(() => cohorts.id),
  scheduled_at: timestamp("scheduled_at", { withTimezone: true, mode: "string" }).notNull(),
  duration_minutes: integer("duration_minutes").default(60),
  coach_id: uuid("coach_id").references(() => userProfiles.id),
  participants: jsonb("participants"),
  agenda: text("agenda"),
  notes: text("notes"),
  outcomes: text("outcomes"),
  recording_url: text("recording_url"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const cohortDiscussionMessages = pgTable("cohort_discussion_messages", {
  id: id("id"),
  cohort_id: uuid("cohort_id").notNull(),
  session_id: uuid("session_id"),
  user_id: uuid("user_id").notNull(),
  parent_id: uuid("parent_id"),
  title: text("title"),
  content: text("content").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const cohortSessions = pgTable("cohort_sessions", {
  id: id("id"),
  cohort_id: uuid("cohort_id").notNull().references(() => cohorts.id),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  week_number: integer("week_number").notNull(),
  scheduled_at: timestamp("scheduled_at", { withTimezone: true, mode: "string" }).notNull(),
  duration_minutes: integer("duration_minutes").default(90),
  facilitator_id: uuid("facilitator_id").references(() => userProfiles.id),
  meeting_url: text("meeting_url"),
  session_type: text("session_type"),
  recording_url: text("recording_url"),
  transcript: text("transcript"),
  attendance: jsonb("attendance"),
  notes: text("notes"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const comments = pgTable("comments", {
  id: id("id"),
  content_item_id: uuid("content_item_id").notNull(),
  user_id: uuid("user_id").notNull(),
  author_name: text("author_name").notNull(),
  author_email: text("author_email").notNull(),
  author_avatar_url: text("author_avatar_url"),
  content: text("content").notNull(),
  html_content: text("html_content"),
  parent_id: uuid("parent_id"),
  thread_level: integer("thread_level").default(0),
  status: text("status").default("published"),
  is_pinned: boolean("is_pinned").default(false),
  is_author_reply: boolean("is_author_reply").default(false),
  like_count: integer("like_count").default(0),
  reply_count: integer("reply_count").default(0),
  ip_address: text("ip_address"),
  user_agent: text("user_agent"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  edited_at: timestamp("edited_at", { withTimezone: true, mode: "string" }),
});

export const communities = pgTable("communities", {
  id: id("id"),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  community_type: text("community_type").notNull(),
  geographic_focus: jsonb("geographic_focus"),
  cultural_context: text("cultural_context").default("global"),
  language_primary: text("language_primary").default("en"),
  languages_supported: jsonb("languages_supported"),
  visibility: text("visibility").default("public"),
  join_approval_required: boolean("join_approval_required").default(false),
  max_members: integer("max_members"),
  allow_guest_posts: boolean("allow_guest_posts").default(false),
  moderation_level: text("moderation_level").default("moderated"),
  current_member_count: integer("current_member_count").default(0),
  total_posts_count: integer("total_posts_count").default(0),
  guidelines: text("guidelines"),
  rules: jsonb("rules"),
  created_by: uuid("created_by").notNull().references(() => userProfiles.id),
  moderators: jsonb("moderators"),
  is_active: boolean("is_active").default(true),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const contentAnalytics = pgTable("content_analytics", {
  id: id("id"),
  content_item_id: uuid("content_item_id").notNull().references(() => contentItems.id),
  event_type: text("event_type").notNull(),
  user_id: uuid("user_id").references(() => userProfiles.id),
  session_id: text("session_id"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
});

export const contentFormTemplates = pgTable("content_form_templates", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull(),
  form_key: text("form_key").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  structure: text("structure").notNull(),
  tone_notes: text("tone_notes").notNull(),
  length_guidance: text("length_guidance").notNull(),
  voice_adjustments: text("voice_adjustments").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const contentTemplatePlacement = pgTable("content_template_placement", {
  template_slug: text("template_slug").primaryKey().notNull(),
  template_title: text("template_title"),
  placement: text("placement"),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow(),
  updated_by: text("updated_by"),
});

export const contentTemplates = pgTable("content_templates", {
  id: id("id"),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  content_type: text("content_type").notNull(),
  template_data: jsonb("template_data").notNull(),
  category: text("category"),
  tags: jsonb("tags"),
  is_public: boolean("is_public").default(false),
  is_default: boolean("is_default").default(false),
  usage_count: integer("usage_count").default(0),
  author_id: uuid("author_id").notNull().references(() => userProfiles.id),
  organization_id: uuid("organization_id").references(() => organizations.id),
  version: text("version").default("1.0"),
  is_active: boolean("is_active").default(true),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const contentVersions = pgTable("content_versions", {
  id: id("id"),
  content_item_id: uuid("content_item_id").notNull().references(() => contentItems.id),
  version_number: integer("version_number").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  excerpt: text("excerpt"),
  changed_by: uuid("changed_by").references(() => userProfiles.id),
  change_summary: text("change_summary"),
  change_type: text("change_type").default("update"),
  word_count: integer("word_count"),
  character_count: integer("character_count"),
  created_at: createdAt("created_at"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const contentWorkflows = pgTable("content_workflows", {
  id: id("id"),
  content_item_id: uuid("content_item_id").notNull().references(() => contentItems.id),
  status: text("status").notNull(),
  assigned_to: uuid("assigned_to").references(() => userProfiles.id),
  reviewer_id: uuid("reviewer_id").references(() => userProfiles.id),
  priority: text("priority").default("medium"),
  due_date: timestamp("due_date", { withTimezone: true, mode: "string" }),
  notes: text("notes"),
  workflow_data: jsonb("workflow_data"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const contextSnapshots = pgTable("context_snapshots", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  snapshot_type: text("snapshot_type").notNull(),
  interpretive_summary: text("interpretive_summary").notNull(),
  redacted_data: jsonb("redacted_data"),
  categories: jsonb("categories"),
  version: integer("version").notNull().default(1),
  created_at: createdAt("created_at"),
  expires_at: timestamp("expires_at", { withTimezone: true, mode: "string" }),
});

export const coupons = pgTable("coupons", {
  id: id("id"),
  code: text("code").notNull(),
  discount_type: text("discount_type").notNull(),
  discount_value: numeric("discount_value").notNull(),
  min_purchase: numeric("min_purchase"),
  max_uses: integer("max_uses"),
  used_count: integer("used_count").default(0),
  valid_from: timestamp("valid_from", { withTimezone: true, mode: "string" }),
  valid_until: timestamp("valid_until", { withTimezone: true, mode: "string" }),
  applicable_to: jsonb("applicable_to"),
  status: text("status").default("active"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const courseAnnouncements = pgTable("course_announcements", {
  id: id("id"),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  author_id: uuid("author_id").notNull().references(() => userProfiles.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  send_email: boolean("send_email").default(false),
  send_in_app: boolean("send_in_app").default(true),
  scheduled_at: timestamp("scheduled_at", { withTimezone: true, mode: "string" }),
  sent_at: timestamp("sent_at", { withTimezone: true, mode: "string" }),
  status: text("status").default("draft"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const courseBundles = pgTable("course_bundles", {
  id: id("id"),
  name: text("name").notNull(),
  description: text("description"),
  course_ids: jsonb("course_ids"),
  price_usd: numeric("price_usd").notNull(),
  sale_price_usd: numeric("sale_price_usd"),
  status: text("status").default("active"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const courseDripSchedules = pgTable("course_drip_schedules", {
  id: id("id"),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  lesson_id: uuid("lesson_id").notNull().references(() => courseLessons.id),
  release_type: text("release_type").notNull(),
  release_days: integer("release_days"),
  release_date: timestamp("release_date", { withTimezone: true, mode: "string" }),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const courseModules = pgTable("course_modules", {
  id: id("id"),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  module_number: integer("module_number").notNull(),
  order_index: integer("order_index").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const formationPracticeAssignments = pgTable("formation_practice_assignments", {
  id: id("id"),
  user_id: uuid("user_id").notNull(),
  assignment_type: text("assignment_type").notNull(),
  assignment_data: jsonb("assignment_data").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const courseOutcomes = pgTable("course_outcomes", {
  id: id("id"),
  enrollment_id: uuid("enrollment_id").notNull().references(() => courseEnrollments.id),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  outcome_type: text("outcome_type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  impact_level: text("impact_level"),
  affecting_elements: jsonb("affecting_elements"),
  affecting_gifts: jsonb("affecting_gifts"),
  related_practice_id: uuid("related_practice_id").references(() => formationPracticeAssignments.id),
  related_goal_id: uuid("related_goal_id"),
  documented_at: timestamp("documented_at", { withTimezone: true, mode: "string" }).defaultNow(),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const coursePersonalization = pgTable("course_personalization", {
  id: id("id"),
  enrollment_id: uuid("enrollment_id").notNull().references(() => courseEnrollments.id),
  assessment_id: uuid("assessment_id").references((): AnyPgColumn => userAssessments.id),
  track_assignment: text("track_assignment"),
  limiting_factor: text("limiting_factor").notNull(),
  baseline_scores: jsonb("baseline_scores").notNull(),
  current_scores: jsonb("current_scores"),
  personalized_pathway: jsonb("personalized_pathway"),
  focus_elements: jsonb("focus_elements"),
  adaptations: jsonb("adaptations"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const coursePrerequisites = pgTable("course_prerequisites", {
  id: id("id"),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  required_course_id: uuid("required_course_id").references(() => courses.id),
  required_lesson_id: uuid("required_lesson_id").references(() => courseLessons.id),
  requirement_type: text("requirement_type").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const courseProgressionRules = pgTable("course_progression_rules", {
  id: id("id"),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  lesson_id: uuid("lesson_id").references(() => courseLessons.id),
  required_lesson_ids: jsonb("required_lesson_ids"),
  unlock_type: text("unlock_type").notNull().default("free"),
  completion_requirement: text("completion_requirement").default("none"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const courseSalesPages = pgTable("course_sales_pages", {
  id: id("id"),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  sections: jsonb("sections"),
  testimonials: jsonb("testimonials"),
  faqs: jsonb("faqs"),
  cta_text: text("cta_text"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const courseWeeks = pgTable("course_weeks", {
  id: id("id"),
  course_id: uuid("course_id").notNull().references(() => courses.id),
  week_number: integer("week_number").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  objectives: jsonb("objectives"),
  order_index: integer("order_index").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  slug: text("slug"),
  theme: text("theme"),
  duration: text("duration"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  cover_image_url: text("cover_image_url"),
});

export const credibilityRubrics = pgTable("credibility_rubrics", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull(),
  name: text("name").notNull(),
  dimensions: jsonb("dimensions").notNull(),
  critical_constraints: text("critical_constraints"),
  instructions_template: text("instructions_template").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const digitalBadges = pgTable("digital_badges", {
  id: id("id"),
  certificate_id: uuid("certificate_id").references(() => certificates.id),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  badge_type: text("badge_type").notNull(),
  entity_type: text("entity_type"),
  entity_id: uuid("entity_id"),
  title: text("title").notNull(),
  description: text("description"),
  icon_url: text("icon_url"),
  criteria: jsonb("criteria"),
  issued_at: timestamp("issued_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  expires_at: timestamp("expires_at", { withTimezone: true, mode: "string" }),
  is_public: boolean("is_public").default(true),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const discernmentProcesses = pgTable("discernment_processes", {
  id: id("id"),
  user_id: uuid("user_id").notNull(),
  title: text("title").notNull(),
  decision_type: text("decision_type").notNull(),
  question: text("question").notNull(),
  process_description: text("process_description"),
  decision_outcome: text("decision_outcome"),
  confidence_level: text("confidence_level"),
  participants: jsonb("participants"),
  kairos_moment_id: uuid("kairos_moment_id"),
  related_vocation_id: uuid("related_vocation_id"),
  started_at: timestamp("started_at", { withTimezone: true, mode: "string" }).defaultNow(),
  decided_at: timestamp("decided_at", { withTimezone: true, mode: "string" }),
  reflection_text: text("reflection_text"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const discussionPrompts = pgTable("discussion_prompts", {
  id: id("id"),
  lesson_id: uuid("lesson_id").references(() => courseLessons.id),
  course_id: uuid("course_id").references(() => courses.id),
  title: text("title").notNull(),
  prompt: text("prompt").notNull(),
  prompt_type: text("prompt_type").notNull(),
  block_order: integer("block_order").default(0),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const donations = pgTable("donations", {
  id: id("id"),
  donor_user_id: uuid("donor_user_id").references(() => userProfiles.id),
  amount: numeric("amount").notNull(),
  currency: text("currency").default("USD"),
  donation_type: text("donation_type").default("one_time"),
  campaign: text("campaign"),
  designation: text("designation"),
  message: text("message"),
  is_anonymous: boolean("is_anonymous").default(false),
  stripe_payment_intent_id: text("stripe_payment_intent_id"),
  payment_status: text("payment_status").default("pending"),
  payment_method: text("payment_method"),
  receipt_sent: boolean("receipt_sent").default(false),
  receipt_url: text("receipt_url"),
  tax_deductible: boolean("tax_deductible").default(true),
  status: text("status").default("completed"),
  refunded_at: timestamp("refunded_at", { withTimezone: true, mode: "string" }),
  refund_amount: numeric("refund_amount"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const emailTemplates = pgTable("email_templates", {
  id: id("id"),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  variables: jsonb("variables"),
  category: text("category"),
  status: text("status").default("active"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const eventRegistrations = pgTable("event_registrations", {
  id: id("id"),
  event_id: uuid("event_id").notNull().references(() => contentItems.id),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  registration_date: timestamp("registration_date", { withTimezone: true, mode: "string" }).defaultNow(),
  status: text("status").default("registered"),
  payment_status: text("payment_status").default("pending"),
  payment_amount: numeric("payment_amount"),
  stripe_payment_intent_id: text("stripe_payment_intent_id"),
  notes: text("notes"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const exercises = pgTable("exercises", {
  id: id("id"),
  lesson_id: uuid("lesson_id").references(() => courseLessons.id),
  course_id: uuid("course_id").references(() => courses.id),
  title: text("title").notNull(),
  description: text("description"),
  instructions: text("instructions").notNull(),
  purpose: text("purpose"),
  estimated_time_minutes: integer("estimated_time_minutes"),
  deliverables: text("deliverables"),
  block_order: integer("block_order").default(0),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const exerciseCompletions = pgTable("exercise_completions", {
  id: id("id"),
  exercise_id: uuid("exercise_id").notNull().references(() => exercises.id),
  enrollment_id: uuid("enrollment_id").notNull().references(() => courseEnrollments.id),
  deliverable: text("deliverable"),
  reflection: text("reflection"),
  completed_at: timestamp("completed_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const fieldExperiments = pgTable("field_experiments", {
  id: id("id"),
  enrollment_id: uuid("enrollment_id").notNull().references(() => courseEnrollments.id),
  lesson_id: uuid("lesson_id").notNull().references(() => courseLessons.id),
  week_number: integer("week_number").notNull(),
  experiment_type: text("experiment_type"),
  title: text("title").notNull(),
  description: text("description"),
  instructions: text("instructions"),
  success_criteria: text("success_criteria"),
  started_at: timestamp("started_at", { withTimezone: true, mode: "string" }),
  completed_at: timestamp("completed_at", { withTimezone: true, mode: "string" }),
  outcomes: text("outcomes"),
  evidence: jsonb("evidence"),
  reflection: text("reflection"),
  status: text("status").default("assigned"),
  reviewed_by: uuid("reviewed_by").references(() => userProfiles.id),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const formationCheckins = pgTable("formation_checkins", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  checkin_type: text("checkin_type").notNull(),
  related_entity_type: text("related_entity_type").notNull(),
  related_entity_id: uuid("related_entity_id"),
  checkin_date: timestamp("checkin_date", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  reflection: text("reflection"),
  progress_rating: integer("progress_rating"),
  obstacles: text("obstacles"),
  insights: text("insights"),
  next_steps: text("next_steps"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const formationGoals = pgTable("formation_goals", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  title: text("title").notNull(),
  description: text("description"),
  goal_type: text("goal_type").notNull(),
  related_element: text("related_element"),
  target_date: timestamp("target_date", { withTimezone: true, mode: "string" }),
  status: text("status").notNull().default("active"),
  progress_notes: text("progress_notes"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const formationExperiments = pgTable("formation_experiments", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  title: text("title").notNull(),
  description: text("description"),
  experiment_type: text("experiment_type").notNull(),
  related_context_id: uuid("related_context_id"),
  related_goal_id: uuid("related_goal_id").references(() => formationGoals.id),
  started_at: timestamp("started_at", { withTimezone: true, mode: "string" }),
  completed_at: timestamp("completed_at", { withTimezone: true, mode: "string" }),
  status: text("status").notNull().default("planned"),
  outcomes: text("outcomes"),
  learnings: text("learnings"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const formationPracticeCompletions = pgTable("formation_practice_completions", {
  id: id("id"),
  assignment_id: uuid("assignment_id").notNull().references(() => formationPracticeAssignments.id),
  week_number: integer("week_number").notNull(),
  completed_at: timestamp("completed_at", { withTimezone: true, mode: "string" }).defaultNow(),
  reflection_text: text("reflection_text"),
  obstacles_encountered: text("obstacles_encountered"),
  insights_gained: text("insights_gained"),
  created_at: createdAt("created_at"),
});

export const handoffEvents = pgTable("handoff_events", {
  id: id("id"),
  sermon_preparation_id: uuid("sermon_preparation_id").references(() => sermonPreparations.id),
  from_agent: text("from_agent").notNull(),
  to_agent: text("to_agent").notNull(),
  reason: text("reason"),
  context: jsonb("context"),
  timestamp: timestamp("timestamp", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
});

export const kairosMoments = pgTable("kairos_moments", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  moment_type: text("moment_type").notNull(),
  occurred_at: timestamp("occurred_at", { withTimezone: true, mode: "string" }).notNull(),
  significance_level: text("significance_level"),
  formation_impact: text("formation_impact"),
  related_assessment_id: uuid("related_assessment_id").references((): AnyPgColumn => userAssessments.id),
  related_goal_id: uuid("related_goal_id"),
  related_experiment_id: uuid("related_experiment_id"),
  reflection_text: text("reflection_text"),
  tags: jsonb("tags"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const lessonProgress = pgTable("lesson_progress", {
  id: id("id"),
  enrollment_id: uuid("enrollment_id").notNull().references(() => courseEnrollments.id),
  lesson_id: uuid("lesson_id").notNull().references(() => courseLessons.id),
  status: text("status").default("not_started"),
  progress_percentage: integer("progress_percentage").default(0),
  time_spent_seconds: integer("time_spent_seconds").default(0),
  completed_at: timestamp("completed_at", { withTimezone: true, mode: "string" }),
  notes: text("notes"),
  experiment_completed: boolean("experiment_completed").default(false),
  reflection_submitted: boolean("reflection_submitted").default(false),
  cohort_participation: boolean("cohort_participation").default(false),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const mediaItems = pgTable("media_items", {
  id: id("id"),
  name: text("name").notNull(),
  original_name: text("original_name").notNull(),
  type: text("type").notNull(),
  mime_type: text("mime_type").notNull(),
  size: integer("size").notNull(),
  url: text("url").notNull(),
  thumbnail_url: text("thumbnail_url"),
  alt_text: text("alt_text"),
  caption: text("caption"),
  tags: jsonb("tags"),
  folder: text("folder"),
  is_starred: boolean("is_starred").default(false),
  usage_count: integer("usage_count").default(0),
  author_id: uuid("author_id").notNull().references(() => userProfiles.id),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  width: integer("width"),
  height: integer("height"),
  dominant_color: text("dominant_color"),
  metadata: jsonb("metadata"),
});

export const mediaUsageTracking = pgTable("media_usage_tracking", {
  id: id("id"),
  media_item_id: uuid("media_item_id").notNull(),
  content_item_id: uuid("content_item_id"),
  usage_type: text("usage_type").notNull(),
  content_type: text("content_type"),
  usage_context: jsonb("usage_context"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const neighborhoodExegesisEntries = pgTable("neighborhood_exegesis_entries", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  title: text("title").notNull(),
  observation_type: text("observation_type").notNull(),
  content: text("content").notNull(),
  tags: jsonb("tags"),
  related_context_id: uuid("related_context_id"),
  recorded_at: timestamp("recorded_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

/** Living book — email capture (lens selector, chapter end, export). */
export const bookEmailSubscribers = pgTable("book_email_subscribers", {
  id: id("id"),
  email: text("email").notNull(),
  /** movement-leaders | churches | nonprofits */
  lens: text("lens").notNull().default("movement-leaders"),
  /** lens_selector | chapter_end | pdf_export */
  source: text("source").notNull(),
  chapter_slug: text("chapter_slug"),
  user_id: uuid("user_id"),
  created_at: createdAt("created_at"),
});

/** Living book — margin / community notes (moderated). */
export const bookMarginNotes = pgTable("book_margin_notes", {
  id: id("id"),
  chapter_slug: text("chapter_slug").notNull(),
  anchor_paragraph_id: text("anchor_paragraph_id").notNull(),
  /** author_note | question | feedback | criticism */
  type: text("type").notNull(),
  body: text("body").notNull(),
  /** pending | approved | rejected | archived */
  status: text("status").notNull().default("pending"),
  contributor_id: uuid("contributor_id"),
  contributor_display_name: text("contributor_display_name").notNull(),
  contributor_title: text("contributor_title"),
  contributor_url: text("contributor_url"),
  contact_email: text("contact_email"),
  featured: boolean("featured").notNull().default(false),
  created_at: createdAt("created_at"),
  approved_at: timestamp("approved_at", { withTimezone: true, mode: "string" }),
});

/** Living book — revision credits linked to margin notes. */
export const bookRevisions = pgTable("book_revisions", {
  id: id("id"),
  chapter_slug: text("chapter_slug").notNull(),
  paragraph_id: text("paragraph_id").notNull(),
  revision_summary: text("revision_summary").notNull(),
  before_text: text("before_text"),
  after_text: text("after_text"),
  credited_note_ids: jsonb("credited_note_ids").$type<string[]>().notNull().default([]),
  revised_at: timestamp("revised_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
});

/** Living book — endorsements (moderated). */
export const bookEndorsements = pgTable("book_endorsements", {
  id: id("id"),
  quote: text("quote").notNull(),
  context: text("context"),
  endorser_name: text("endorser_name").notNull(),
  endorser_title: text("endorser_title").notNull(),
  endorser_org: text("endorser_org"),
  endorser_avatar_url: text("endorser_avatar_url"),
  endorser_url: text("endorser_url"),
  /** movement-leaders | churches | nonprofits | other */
  audience_lens: text("audience_lens"),
  chapter_slug: text("chapter_slug"),
  /** pending | approved */
  status: text("status").notNull().default("pending"),
  featured: boolean("featured").notNull().default(false),
  created_at: createdAt("created_at"),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: id("id"),
  email: text("email").notNull(),
  name: text("name"),
  source: text("source").default("homepage"),
  status: text("status").notNull().default("pending"),
  confirmation_token: text("confirmation_token"),
  confirmed_at: timestamp("confirmed_at", { withTimezone: true, mode: "string" }),
  unsubscribed_at: timestamp("unsubscribed_at", { withTimezone: true, mode: "string" }),
  organization_id: uuid("organization_id").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const notebookArtifacts = pgTable("notebook_artifacts", {
  id: id("id"),
  notebook_id: uuid("notebook_id").notNull(),
  organization_id: uuid("organization_id").notNull(),
  artifact_type: text("artifact_type").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  structured_data: jsonb("structured_data"),
  status: text("status").default("pending"),
  source_ids: text("source_ids") /* unmapped type: _uuid */,
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const notebookConversations = pgTable("notebook_conversations", {
  id: id("id"),
  notebook_id: uuid("notebook_id").notNull(),
  user_id: uuid("user_id"),
  anon_id: text("anon_id"),
  organization_id: uuid("organization_id").notNull(),
  title: text("title"),
  messages: jsonb("messages"),
  session_id: uuid("session_id"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const notebookSourceChunks = pgTable("notebook_source_chunks", {
  id: id("id"),
  source_id: uuid("source_id").notNull(),
  notebook_id: uuid("notebook_id").notNull(),
  organization_id: uuid("organization_id").notNull(),
  chunk_index: integer("chunk_index").notNull(),
  content: text("content").notNull(),
  token_count: integer("token_count"),
  embedding: jsonb("embedding"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
});

export const notebookSources = pgTable("notebook_sources", {
  id: id("id"),
  notebook_id: uuid("notebook_id").notNull(),
  organization_id: uuid("organization_id").notNull(),
  title: text("title").notNull(),
  source_type: text("source_type").notNull(),
  url: text("url"),
  storage_path: text("storage_path"),
  content: text("content"),
  metadata: jsonb("metadata"),
  status: text("status").default("pending"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const notebooks = pgTable("notebooks", {
  id: id("id"),
  user_id: uuid("user_id"),
  anon_id: text("anon_id"),
  organization_id: uuid("organization_id").notNull(),
  title: text("title").default("Untitled Notebook"),
  description: text("description"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const notificationDeliveries = pgTable("notification_deliveries", {
  id: id("id"),
  notification_id: uuid("notification_id").notNull(),
  user_id: uuid("user_id").notNull(),
  channel: text("channel").notNull(),
  status: text("status").notNull(),
  sent_at: timestamp("sent_at", { withTimezone: true, mode: "string" }),
  read_at: timestamp("read_at", { withTimezone: true, mode: "string" }),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const onboardingResponses = pgTable("onboarding_responses", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  best_work_content: jsonb("best_work_content"),
  best_work_selected: jsonb("best_work_selected"),
  brand_colors: text("brand_colors"),
  font_preferences: text("font_preferences"),
  admired_websites: jsonb("admired_websites"),
  site_feel_description: text("site_feel_description"),
  visitor_feeling: text("visitor_feeling"),
  style_constraints: jsonb("style_constraints"),
  movemental_story: text("movemental_story"),
  movemental_conversation: text("movemental_conversation"),
  target_audience: text("target_audience"),
  three_year_impact: text("three_year_impact"),
  movemental_calling: text("movemental_calling"),
  twelve_month_success: text("twelve_month_success"),
  what_excites_him: text("what_excites_him"),
  who_to_reach: text("who_to_reach"),
  audience_questions: jsonb("audience_questions"),
  current_content_locations: jsonb("current_content_locations"),
  audience_needs: text("audience_needs"),
  regular_content_types: jsonb("regular_content_types"),
  archive_content_to_import: jsonb("archive_content_to_import"),
  existing_blog_urls: jsonb("existing_blog_urls"),
  content_sources: jsonb("content_sources"),
  time_per_week: text("time_per_week"),
  publishing_cadence: text("publishing_cadence"),
  call_availability: jsonb("call_availability"),
  timeline_expectations: text("timeline_expectations"),
  income_goal: text("income_goal"),
  content_goals: text("content_goals"),
  audience_growth_goals: text("audience_growth_goals"),
  digital_publishing_concerns: text("digital_publishing_concerns"),
  quit_risk_factors: text("quit_risk_factors"),
  support_needs: text("support_needs"),
  design_review_preference: text("design_review_preference"),
  preferred_domain: text("preferred_domain"),
  domain_ownership: text("domain_ownership"),
  email_sending_domain: text("email_sending_domain"),
  payment_processing_preferences: jsonb("payment_processing_preferences"),
  feature_preferences: jsonb("feature_preferences"),
  network_participation: boolean("network_participation").default(true),
  network_cross_references: boolean("network_cross_references").default(true),
  network_discovery: boolean("network_discovery").default(true),
  network_introduction_preferences: jsonb("network_introduction_preferences"),
  collaboration_interests: text("collaboration_interests"),
  bio: text("bio"),
  photo_url: text("photo_url"),
  social_media_links: jsonb("social_media_links"),
  email: text("email").notNull(),
  contact_information: jsonb("contact_information"),
  current_step: text("current_step"),
  is_complete: boolean("is_complete").default(false),
  submitted_at: timestamp("submitted_at", { withTimezone: true, mode: "string" }),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const organizationMemberships = pgTable("organization_memberships", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  role: text("role").notNull(),
  permissions: jsonb("permissions"),
  status: text("status").default("pending"),
  joined_at: timestamp("joined_at", { withTimezone: true, mode: "string" }),
  invited_at: timestamp("invited_at", { withTimezone: true, mode: "string" }),
  invited_by: uuid("invited_by"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const pageViews = pgTable("page_views", {
  id: id("id"),
  resource_type: text("resource_type").notNull(),
  resource_id: uuid("resource_id").notNull(),
  user_id: uuid("user_id"),
  session_id: uuid("session_id").notNull(),
  ip_address: text("ip_address"),
  user_agent: text("user_agent"),
  country: text("country"),
  city: text("city"),
  referrer: text("referrer"),
  utm_source: text("utm_source"),
  utm_medium: text("utm_medium"),
  utm_campaign: text("utm_campaign"),
  time_on_page: integer("time_on_page"),
  scroll_depth: integer("scroll_depth"),
  viewed_at: timestamp("viewed_at", { withTimezone: true, mode: "string" }).defaultNow(),
});

export const pathways = pgTable("pathways", {
  id: id("id"),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  inventory_id: text("inventory_id"),
  source_type: text("source_type"),
  placement: text("placement"),
  portal: text("portal"),
  content_path: text("content_path").notNull(),
  order_index: integer("order_index").default(0),
  organization_id: uuid("organization_id"),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow(),
  status: text("status").default("draft"),
  attachments: jsonb("attachments"),
});

export const pathwaySections = pgTable("pathway_sections", {
  id: id("id"),
  pathway_id: uuid("pathway_id").notNull().references(() => pathways.id),
  section_type: text("section_type").notNull(),
  title: text("title"),
  slug: text("slug").notNull(),
  body: text("body"),
  structured: jsonb("structured"),
  order_index: integer("order_index").default(0),
  status: text("status").default("draft"),
  organization_id: uuid("organization_id"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const performanceMetrics = pgTable("performance_metrics", {
  id: id("id"),
  metric_type: text("metric_type").notNull(),
  metric_name: text("metric_name").notNull(),
  metric_value: numeric("metric_value").notNull(),
  resource_type: text("resource_type"),
  resource_id: uuid("resource_id"),
  user_id: uuid("user_id"),
  session_id: uuid("session_id"),
  metadata: jsonb("metadata"),
  measured_at: timestamp("measured_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  created_at: createdAt("created_at"),
});

export const podcastSeries = pgTable("podcast_series", {
  id: id("id"),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  author_id: uuid("author_id").notNull().references(() => userProfiles.id),
  cover_image_url: text("cover_image_url"),
  website_url: text("website_url"),
  language: text("language").default("en"),
  copyright: text("copyright"),
  categories: jsonb("categories"),
  explicit: boolean("explicit").default(false),
  itunes_category: text("itunes_category"),
  itunes_subcategory: text("itunes_subcategory"),
  spotify_url: text("spotify_url"),
  apple_podcasts_url: text("apple_podcasts_url"),
  episode_count: integer("episode_count").default(0),
  total_duration_seconds: integer("total_duration_seconds").default(0),
  status: text("status").default("active"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const podcastEpisodes = pgTable("podcast_episodes", {
  id: id("id"),
  series_id: uuid("series_id").references(() => podcastSeries.id),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  audio_url: text("audio_url").notNull(),
  duration_seconds: integer("duration_seconds"),
  episode_number: integer("episode_number"),
  season_number: integer("season_number"),
  published_at: timestamp("published_at", { withTimezone: true, mode: "string" }),
  author_id: uuid("author_id").references(() => userProfiles.id),
  thumbnail_url: text("thumbnail_url"),
  transcript: text("transcript"),
  hosting_provider: text("hosting_provider").default("rss"),
  external_id: text("external_id"),
  external_url: text("external_url"),
  source_type: text("source_type").default("podcast"),
  tags: jsonb("tags"),
  access_type: text("access_type").default("free"),
  status: text("status").default("draft"),
  listen_count: integer("listen_count").default(0),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  organization_id: uuid("organization_id").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const prospects = pgTable("prospects", {
  pk: bigint("pk", { mode: "number" }).generatedAlwaysAsIdentity().primaryKey(),
  harvest_id: text("harvest_id").notNull().unique(),
  name: text("name").notNull(),
  name_normalized: text("name_normalized"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
  employer: text("employer"),
  occupation: text("occupation"),
  score_composite: smallint("score_composite").notNull().default(0),
  score_capacity: smallint("score_capacity").notNull().default(0),
  score_affinity: smallint("score_affinity").notNull().default(0),
  score_engagement: smallint("score_engagement").notNull().default(0),
  score_recency: smallint("score_recency").notNull().default(0),
  score_original: smallint("score_original").notNull().default(0),
  tier: smallint("tier").notNull().default(4),
  persona: text("persona"),
  pipeline_stage: text("pipeline_stage").notNull().default("identified"),
  enrichment_status: text("enrichment_status").notNull().default("not_enriched"),
  enrichment_fields: jsonb("enrichment_fields").notNull(),
  sources: text("sources").array().notNull(),
  signal_types: text("signal_types").array().notNull(),
  cross_source_hits: smallint("cross_source_hits").notNull().default(0),
  fields: jsonb("fields").notNull(),
  confidence: text("confidence"),
  created_at: createdAt("created_at"),
  enriched_at: date("enriched_at"),
  inserted_at: timestamp("inserted_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
});

export const questionBanks = pgTable("question_banks", {
  id: id("id"),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  questions: jsonb("questions"),
  created_by: uuid("created_by").references(() => userProfiles.id),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const reflectionJournals = pgTable("reflection_journals", {
  id: id("id"),
  enrollment_id: uuid("enrollment_id").notNull().references(() => courseEnrollments.id),
  week_number: integer("week_number").notNull(),
  lesson_id: uuid("lesson_id").references(() => courseLessons.id),
  journal_prompt: text("journal_prompt").notNull(),
  response: text("response").notNull(),
  experiment_outcomes: text("experiment_outcomes"),
  learnings: text("learnings"),
  next_steps: text("next_steps"),
  submitted_at: timestamp("submitted_at", { withTimezone: true, mode: "string" }).defaultNow(),
  reviewed_by: uuid("reviewed_by").references(() => userProfiles.id),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const reflectionQuestions = pgTable("reflection_questions", {
  id: id("id"),
  lesson_id: uuid("lesson_id").references(() => courseLessons.id),
  course_id: uuid("course_id").references(() => courses.id),
  question: text("question").notNull(),
  question_type: text("question_type").notNull(),
  guidance: text("guidance"),
  block_order: integer("block_order").default(0),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const reflectionResponses = pgTable("reflection_responses", {
  id: id("id"),
  question_id: uuid("question_id").notNull().references(() => reflectionQuestions.id),
  enrollment_id: uuid("enrollment_id").notNull().references(() => courseEnrollments.id),
  response: text("response").notNull(),
  submitted_at: timestamp("submitted_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const remotionDrafts = pgTable("remotion_drafts", {
  id: id("id"),
  user_id: uuid("user_id").notNull(),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  composition_id: text("composition_id").notNull(),
  title: text("title").default("Untitled"),
  props: jsonb("props"),
  status: text("status").default("draft"),
  rendered_video_url: text("rendered_video_url"),
  error_message: text("error_message"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const savedArchiveViews = pgTable("saved_archive_views", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  name: text("name").notNull(),
  description: text("description"),
  filters: jsonb("filters").notNull(),
  is_public: boolean("is_public").default(false),
  share_token: text("share_token"),
  view_count: integer("view_count").default(0),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const searchAnalytics = pgTable("search_analytics", {
  id: id("id"),
  search_query: text("search_query").notNull(),
  user_id: uuid("user_id"),
  session_id: uuid("session_id"),
  results_count: integer("results_count").default(0),
  clicked_result_id: uuid("clicked_result_id"),
  metadata: jsonb("metadata"),
  searched_at: timestamp("searched_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  created_at: createdAt("created_at"),
});

export const searchHistory = pgTable("search_history", {
  id: id("id"),
  user_id: uuid("user_id").notNull(),
  query: text("query").notNull(),
  result_count: integer("result_count").default(0),
  clicked_result_id: uuid("clicked_result_id"),
  clicked_result_type: text("clicked_result_type"),
  created_at: createdAt("created_at"),
});

export const sitePages = pgTable("site_pages", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  page_type: text("page_type").notNull().default("landing"),
  entity_id: uuid("entity_id"),
  puck_data: jsonb("puck_data").notNull(),
  status: text("status").notNull().default("draft"),
  published_at: timestamp("published_at", { withTimezone: true, mode: "string" }),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  allowed_component_types: text("allowed_component_types").array(),
});

export const translationJobs = pgTable("translation_jobs", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  batch_id: text("batch_id"),
  input_file_path: text("input_file_path"),
  input_file_name: text("input_file_name"),
  target_language: text("target_language").notNull(),
  source_language: text("source_language"),
  status: text("status").notNull().default("pending"),
  error_message: text("error_message"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  output_file_url: text("output_file_url"),
  output_file_path: text("output_file_path"),
});

export const userCallingProfiles = pgTable("user_calling_profiles", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  primary_vocation: text("primary_vocation"),
  secondary_vocation: text("secondary_vocation"),
  ap_primary: text("ap_primary"),
  ap_secondary: text("ap_secondary"),
  sense_of_call_summary: text("sense_of_call_summary"),
  focus_populations: jsonb("focus_populations"),
  focus_contexts: jsonb("focus_contexts"),
  discernment_notes: jsonb("discernment_notes"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const userContextProfiles = pgTable("user_context_profiles", {
  id: id("id"),
  user_id: uuid("user_id").notNull(),
  context_data: jsonb("context_data").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const userIdentityProfiles = pgTable("user_identity_profiles", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  mbti_type: text("mbti_type"),
  enneagram_type: text("enneagram_type"),
  big_five: jsonb("big_five"),
  other_typologies: jsonb("other_typologies"),
  source: text("source"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const userInterests = pgTable("user_interests", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  favorite_books: jsonb("favorite_books"),
  favorite_authors: jsonb("favorite_authors"),
  theology_influences: jsonb("theology_influences"),
  custom_tags: jsonb("custom_tags"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const userMemory = pgTable("user_memory", {
  id: id("id"),
  user_id: uuid("user_id").notNull(),
  memory_type: text("memory_type").notNull(),
  memory_key: text("memory_key").notNull(),
  memory_value: jsonb("memory_value").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const userNeighborhoodContext = pgTable("user_neighborhood_context", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  demographic_summary: text("demographic_summary"),
  pain_points: jsonb("pain_points"),
  opportunities: jsonb("opportunities"),
  missional_map: jsonb("missional_map"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const userNotifications = pgTable("user_notifications", {
  id: id("id"),
  user_id: uuid("user_id").notNull(),
  notification_type: text("notification_type").notNull(),
  channel: text("channel").notNull(),
  enabled: boolean("enabled").default(true),
  preferences: jsonb("preferences"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const userPersonality = pgTable("user_personality", {
  id: id("id"),
  user_id: uuid("user_id").notNull(),
  personality_type: text("personality_type").notNull(),
  personality_data: jsonb("personality_data").notNull(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const userStrengths = pgTable("user_strengths", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  apest_gift: text("apest_gift"),
  application_context: text("application_context"),
  utilization_level: text("utilization_level"),
  related_vocation_id: uuid("related_vocation_id").references(() => userCallingProfiles.id),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const userStrugglesChallenges = pgTable("user_struggles_challenges", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  impact_level: text("impact_level"),
  affecting_elements: jsonb("affecting_elements"),
  current_status: text("current_status").notNull().default("active"),
  coping_strategies: text("coping_strategies"),
  support_needed: text("support_needed"),
  related_goal_id: uuid("related_goal_id"),
  related_practice_id: uuid("related_practice_id").references(() => formationPracticeAssignments.id),
  started_at: timestamp("started_at", { withTimezone: true, mode: "string" }).defaultNow(),
  resolved_at: timestamp("resolved_at", { withTimezone: true, mode: "string" }),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const userSubscriptions = pgTable("user_subscriptions", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  plan_id: uuid("plan_id").notNull().references(() => subscriptionPlans.id),
  leader_profile_id: uuid("leader_profile_id").references(() => userProfiles.id),
  organization_id: uuid("organization_id").references(() => organizations.id),
  status: text("status").notNull(),
  amount: numeric("amount").notNull(),
  currency: text("currency").default("USD"),
  billing_cycle: text("billing_cycle").notNull(),
  ai_interactions_used: integer("ai_interactions_used").default(0),
  ai_interactions_limit: integer("ai_interactions_limit"),
  storage_used: integer("storage_used").default(0),
  trial_ends_at: timestamp("trial_ends_at", { withTimezone: true, mode: "string" }),
  current_period_start: timestamp("current_period_start", { withTimezone: true, mode: "string" }).notNull(),
  current_period_end: timestamp("current_period_end", { withTimezone: true, mode: "string" }).notNull(),
  cancelled_at: timestamp("cancelled_at", { withTimezone: true, mode: "string" }),
  cancel_at_period_end: boolean("cancel_at_period_end").default(false),
  stripe_subscription_id: text("stripe_subscription_id"),
  stripe_customer_id: text("stripe_customer_id"),
  months_subscribed: integer("months_subscribed").default(0),
  total_revenue: numeric("total_revenue").default("0"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const userVocation = pgTable("user_vocation", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  calling_summary: text("calling_summary"),
  roles: jsonb("roles"),
  ministry_context: text("ministry_context"),
  preferred_leadership_style: text("preferred_leadership_style"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const videoRecordings = pgTable("video_recordings", {
  id: id("id"),
  user_id: uuid("user_id").notNull(),
  title: text("title"),
  recording_url: text("recording_url"),
  thumbnail_url: text("thumbnail_url"),
  duration_seconds: integer("duration_seconds"),
  status: text("status").default("pending"),
  transcription: text("transcription"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const videoAnnotations = pgTable("video_annotations", {
  id: id("id"),
  recording_id: uuid("recording_id").notNull().references(() => videoRecordings.id),
  annotation_type: text("annotation_type").notNull(),
  start_time_seconds: numeric("start_time_seconds").notNull(),
  end_time_seconds: numeric("end_time_seconds"),
  position: jsonb("position"),
  style: jsonb("style"),
  data: jsonb("data"),
  layer: integer("layer").default(0),
  visible: boolean("visible").default(true),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const videoRecordingSegments = pgTable("video_recording_segments", {
  id: id("id"),
  recording_id: uuid("recording_id").notNull().references(() => videoRecordings.id),
  segment_index: integer("segment_index").notNull(),
  start_time_seconds: numeric("start_time_seconds").notNull(),
  duration_seconds: numeric("duration_seconds").notNull(),
  file_url: text("file_url").notNull(),
  file_size_bytes: bigint("file_size_bytes", { mode: "number" }),
  status: text("status").default("uploaded"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const videoRecordingSlides = pgTable("video_recording_slides", {
  id: id("id"),
  recording_id: uuid("recording_id").notNull().references(() => videoRecordings.id),
  slide_index: integer("slide_index").notNull(),
  slide_url: text("slide_url").notNull(),
  thumbnail_url: text("thumbnail_url"),
  start_time_seconds: numeric("start_time_seconds"),
  end_time_seconds: numeric("end_time_seconds"),
  duration_seconds: numeric("duration_seconds"),
  notes: text("notes"),
  annotations: jsonb("annotations"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const videoRecordingWhiteboard = pgTable("video_recording_whiteboard", {
  id: id("id"),
  recording_id: uuid("recording_id").notNull().references(() => videoRecordings.id),
  frame_time_seconds: numeric("frame_time_seconds").notNull(),
  canvas_data: text("canvas_data").notNull(),
  thumbnail_url: text("thumbnail_url"),
  layer: integer("layer").default(0),
  created_at: createdAt("created_at"),
});

export const videoSeries = pgTable("video_series", {
  id: id("id"),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  author_id: uuid("author_id").references(() => userProfiles.id),
  thumbnail_url: text("thumbnail_url"),
  video_count: integer("video_count").default(0),
  total_duration_seconds: integer("total_duration_seconds").default(0),
  status: text("status").default("active"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
});

export const videos = pgTable("videos", {
  id: id("id"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  video_url: text("video_url").notNull(),
  thumbnail_url: text("thumbnail_url"),
  poster_image_url: text("poster_image_url"),
  duration_seconds: integer("duration_seconds"),
  hosting_provider: text("hosting_provider").default("supabase"),
  external_id: text("external_id"),
  embed_code: text("embed_code"),
  resolutions: jsonb("resolutions"),
  file_size_mb: numeric("file_size_mb"),
  codec: text("codec"),
  author_id: uuid("author_id").notNull().references(() => userProfiles.id),
  transcript: text("transcript"),
  captions_url: text("captions_url"),
  primary_category_id: uuid("primary_category_id").references((): AnyPgColumn => contentCategories.id),
  secondary_categories: jsonb("secondary_categories"),
  tags: jsonb("tags"),
  series_id: uuid("series_id").references(() => videoSeries.id),
  series_order: integer("series_order"),
  access_type: text("access_type").default("free"),
  required_plan_tier: text("required_plan_tier"),
  price_usd: numeric("price_usd"),
  status: text("status").default("draft"),
  published_at: timestamp("published_at", { withTimezone: true, mode: "string" }),
  view_count: integer("view_count").default(0),
  like_count: integer("like_count").default(0),
  comment_count: integer("comment_count").default(0),
  average_watch_time_seconds: integer("average_watch_time_seconds"),
  completion_rate: numeric("completion_rate"),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  search_vector: text("search_vector") /* unmapped type: vector */,
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  source_recording_id: uuid("source_recording_id").references(() => videoRecordings.id),
});

export const videoWatchHistory = pgTable("video_watch_history", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  video_id: uuid("video_id").notNull().references(() => videos.id),
  progress_seconds: integer("progress_seconds").default(0),
  completed: boolean("completed").default(false),
  last_watched_at: timestamp("last_watched_at", { withTimezone: true, mode: "string" }).defaultNow(),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const voiceBaselines = pgTable("voice_baselines", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  content_samples: jsonb("content_samples").notNull(),
  voice_fingerprint: jsonb("voice_fingerprint").notNull(),
  sample_count: integer("sample_count").default(0),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const voiceFidelityEvalSamples = pgTable("voice_fidelity_eval_samples", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  content_hash: text("content_hash").notNull(),
  article_text_slice: text("article_text_slice"),
  article_title: text("article_title"),
  agent_overall_score: integer("agent_overall_score"),
  agent_dimension_scores: jsonb("agent_dimension_scores"),
  human_overall_score: integer("human_overall_score"),
  human_dimension_scores: jsonb("human_dimension_scores"),
  human_ratings_by_user: jsonb("human_ratings_by_user"),
  created_at: createdAt("created_at"),
});

export const voiceFidelityFeedback = pgTable("voice_fidelity_feedback", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  evaluation_id: text("evaluation_id"),
  content_hash: text("content_hash"),
  dimension_key: text("dimension_key"),
  feedback_type: text("feedback_type").notNull(),
  user_comment: text("user_comment"),
  created_at: createdAt("created_at"),
});

export const voiceIdentities = pgTable("voice_identities", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull().unique(),
  name: text("name").notNull(),
  header_template: text("header_template").notNull(),
  core_identity: text("core_identity").notNull(),
  platform_context: text("platform_context"),
  is_active: boolean("is_active").default(true),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const workflows = pgTable("workflows", {
  id: id("id"),
  sermon_preparation_id: uuid("sermon_preparation_id").references(() => sermonPreparations.id),
  name: text("name").notNull(),
  workflow_definition: jsonb("workflow_definition").notNull(),
  current_step: integer("current_step").default(0),
  status: text("status").notNull().default("not-started"),
  results: jsonb("results"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const workspaceDocuments = pgTable("workspace_documents", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  section: text("section").notNull(),
  description: text("description").notNull().default(""),
  sort_order: integer("sort_order").notNull().default(0),
  created_by: uuid("created_by").references(() => userProfiles.id),
  archived_at: timestamp("archived_at", { withTimezone: true, mode: "string" }),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const workspaceLiveblocksSnapshots = pgTable("workspace_liveblocks_snapshots", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull().references(() => organizations.id),
  room_id: text("room_id").notNull(),
  slug: text("slug").notNull(),
  ydoc: jsonb("ydoc").notNull(),
  updated_at: updatedAt("updated_at"),
});

export const write = pgTable("write", {
  id: id("id"),
  full_name: text("full_name").notNull(),
  email: text("email"),
  slug: text("slug").unique(),
  bio: text("bio"),
  avatar_url: text("avatar_url"),
  role: text("role"),
  organization: text("organization"),
  tags: jsonb("tags"),
  linked_user_id: uuid("linked_user_id"),
  linked_at: timestamp("linked_at", { withTimezone: true, mode: "string" }),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  profile_data: jsonb("profile_data"),
  network_data: jsonb("network_data"),
  digital_presence: jsonb("digital_presence"),
  movemental_fit: jsonb("movemental_fit"),
});

export const writeContent = pgTable("write_content", {
  id: id("id"),
  write_id: uuid("write_id").notNull().references(() => write.id),
  title: text("title").notNull(),
  content_type: text("content_type").notNull(),
  body_excerpt: text("body_excerpt"),
  body_full: text("body_full"),
  url: text("url"),
  metadata: jsonb("metadata"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const writingExamples = pgTable("writing_examples", {
  id: id("id"),
  organization_id: uuid("organization_id").notNull(),
  example_number: integer("example_number").notNull(),
  form_keys: text("form_keys").array(),
  title: text("title").notNull(),
  source: text("source"),
  content: text("content").notNull(),
  voice_markers: text("voice_markers"),
  form_technique: text("form_technique"),
});

export const writingInteractions = pgTable("writing_interactions", {
  id: id("id"),
  session_id: uuid("session_id").notNull(),
  type: text("type").notNull(),
  selection_scope: text("selection_scope"),
  input_text: text("input_text"),
  output_text: text("output_text"),
  guidance: text("guidance"),
  accepted: boolean("accepted"),
  model_id: text("model_id"),
  token_count_input: integer("token_count_input"),
  token_count_output: integer("token_count_output"),
  latency_ms: integer("latency_ms"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
  prompt_metadata: jsonb("prompt_metadata"),
  trace_id: text("trace_id"),
});

export const writingSessionFeedback = pgTable("writing_session_feedback", {
  id: id("id"),
  session_id: uuid("session_id").notNull(),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  quality_rating: integer("quality_rating"),
  voice_fidelity_rating: integer("voice_fidelity_rating"),
  content_depth_rating: integer("content_depth_rating"),
  usefulness_rating: integer("usefulness_rating"),
  marker_ratings: jsonb("marker_ratings"),
  free_text: text("free_text"),
  improvement_signals: jsonb("improvement_signals"),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const writingSessions = pgTable("writing_sessions", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  content_form: text("content_form").notNull(),
  title: text("title"),
  brief: text("brief"),
  initial_content: text("initial_content"),
  final_content: text("final_content"),
  status: text("status").default("active"),
  word_count_initial: integer("word_count_initial"),
  word_count_final: integer("word_count_final"),
  interaction_count: integer("interaction_count").default(0),
  accepted_count: integer("accepted_count").default(0),
  rejected_count: integer("rejected_count").default(0),
  completed_at: timestamp("completed_at", { withTimezone: true, mode: "string" }),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

export const writingStylePreferences = pgTable("writing_style_preferences", {
  id: id("id"),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  content_form: text("content_form"),
  voice_adjustments: jsonb("voice_adjustments"),
  corrections: jsonb("corrections"),
  tone_notes: text("tone_notes"),
  custom_instructions: text("custom_instructions"),
  is_active: boolean("is_active").default(true),
  session_count: integer("session_count").default(0),
  last_aggregated_at: timestamp("last_aggregated_at", { withTimezone: true, mode: "string" }),
  created_at: createdAt("created_at"),
  updated_at: updatedAt("updated_at"),
});

// ---------------------------------------------------------------------------
// Funnel & Lead Capture Tables
// ---------------------------------------------------------------------------

export const contactSubmissions = pgTable("contact_submissions", {
  id: id("id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organization: text("organization"),
  audience_segment: text("audience_segment").notNull(),
  message: text("message").notNull(),
  status: text("status").default("new"),
  created_at: createdAt("created_at"),
});

export const leaderApplications = pgTable("leader_applications", {
  id: id("id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  website_url: text("website_url").notNull(),
  content_type: text("content_type").notNull(),
  audience_size: text("audience_size").notNull(),
  message: text("message").notNull(),
  referral_source: text("referral_source"),
  referral_name: text("referral_name"),
  status: text("status").default("new"),
  created_at: createdAt("created_at"),
});

export const organizationInquiries = pgTable("organization_inquiries", {
  id: id("id"),
  org_name: text("org_name").notNull(),
  contact_name: text("contact_name").notNull(),
  email: text("email").notNull(),
  org_type: text("org_type").notNull(),
  team_size: text("team_size").notNull(),
  current_tools: jsonb("current_tools"),
  message: text("message").notNull(),
  timeline: text("timeline").notNull(),
  budget_range: text("budget_range"),
  status: text("status").default("new"),
  created_at: createdAt("created_at"),
});

export const assessmentResults = pgTable("assessment_results", {
  id: id("id"),
  email: text("email").notNull(),
  scores: jsonb("scores").notNull(),
  total_score: integer("total_score").notNull(),
  created_at: createdAt("created_at"),
});

/** System Readiness Diagnostic (marketing) — scoped to `organizations.id` via TENANT_ORG_ID. */
export const systemReadinessAssessments = pgTable("system_readiness_assessments", {
  id: id("id"),
  organization_id: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  email: text("email"),
  reality_situation: text("reality_situation").notNull(),
  audience_context: text("audience_context").notNull(),
  /** Twenty-five likert values 0–4 in question order (see `SYSTEM_READINESS_QUESTION_ORDER`). */
  likert_scores: jsonb("likert_scores").notNull(),
  bottleneck_note: text("bottleneck_note"),
  /** Full computed diagnosis + routing (server-authored JSON). */
  result_payload: jsonb("result_payload").notNull(),
  assessment_version: text("assessment_version").notNull().default("sr-v1"),
  created_at: createdAt("created_at"),
});

/** Dual-intelligence infrastructure diagnostic (marketing) — di-v1 likert bank in `src/lib/dual-intelligence-assessment/`. */
export const dualIntelligenceAssessments = pgTable("dual_intelligence_assessments", {
  id: id("id"),
  organization_id: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  email: text("email"),
  situation_id: text("situation_id").notNull(),
  audience_context: text("audience_context").notNull(),
  /** Thirty likert values 0–4 in question order (see `DUAL_INTELLIGENCE_QUESTIONS`). */
  likert_scores: jsonb("likert_scores").notNull(),
  succession_note: text("succession_note"),
  /** Full computed readout (server-authored JSON). */
  result_payload: jsonb("result_payload").notNull(),
  assessment_version: text("assessment_version").notNull().default("di-v1"),
  created_at: createdAt("created_at"),
});

/**
 * Integrity Diagnostic submissions — Movemental's qualitative diagnostic
 * for senior leaders. No scoring; the team writes a narrative read-back
 * within five business days. Question bank + dimensions live in
 * `src/lib/integrity-diagnostic/` (id-v1).
 *
 * Tenant-scoped to `organizations.id` via `TENANT_ORG_ID`.
 */
export const integrityDiagnosticSubmissions = pgTable(
  "integrity_diagnostic_submissions",
  {
    id: id("id"),
    organization_id: uuid("organization_id")
      .notNull()
      .references(() => organizations.id),
    email: text("email").notNull(),
    name: text("name").notNull(),
    organization_name: text("organization_name"),
    role: text("role"),
    /** Twenty-two answers in question order — each entry is the chosen option index 0–3. */
    answers: jsonb("answers").notNull(),
    /** Six optional narrative follow-ups, one per dimension, keyed by dimension id. */
    follow_ups: jsonb("follow_ups"),
    closing_note: text("closing_note"),
    diagnostic_version: text("diagnostic_version").notNull().default("id-v1"),
    status: text("status").default("new"),
    created_at: createdAt("created_at"),
  },
);

/** Per-organization onboarding checklist rows — definition in code (`src/lib/onboarding/tasks.ts`). */
export const onboardingTasks = pgTable(
  "onboarding_tasks",
  {
    id: id("id"),
    organization_id: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    task_key: text("task_key").notNull(),
    status: text("status").notNull().default("locked"),
    movemental_unlocked: boolean("movemental_unlocked").notNull().default(true),
    completed_at: timestamp("completed_at", { withTimezone: true, mode: "string" }),
    completed_by_user_id: uuid("completed_by_user_id").references(() => userProfiles.id),
    metadata: jsonb("metadata").notNull().default({}),
    created_at: createdAt("created_at"),
    updated_at: updatedAt("updated_at"),
  },
  (t) => [unique("onboarding_tasks_organization_id_task_key_unique").on(t.organization_id, t.task_key)],
);

export const signedAgreements = pgTable("signed_agreements", {
  id: id("id"),
  organization_id: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  agreement_type: text("agreement_type").notNull(),
  agreement_version: text("agreement_version").notNull(),
  signed_at: timestamp("signed_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  signed_by_user_id: uuid("signed_by_user_id").references(() => userProfiles.id),
  document_url: text("document_url"),
  metadata: jsonb("metadata").notNull().default({}),
});

export const organizationAssets = pgTable("organization_assets", {
  id: id("id"),
  organization_id: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  asset_type: text("asset_type").notNull(),
  storage_path: text("storage_path").notNull(),
  uploaded_at: timestamp("uploaded_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  uploaded_by_user_id: uuid("uploaded_by_user_id").references(() => userProfiles.id),
  metadata: jsonb("metadata").notNull().default({}),
});

export const corpusReviewItems = pgTable("corpus_review_items", {
  id: id("id"),
  organization_id: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  item_type: text("item_type").notNull(),
  movemental_compiled_data: jsonb("movemental_compiled_data").notNull(),
  leader_feedback: jsonb("leader_feedback"),
  status: text("status").notNull().default("pending_review"),
  reviewed_at: timestamp("reviewed_at", { withTimezone: true, mode: "string" }),
  reviewed_by_user_id: uuid("reviewed_by_user_id").references(() => userProfiles.id),
});

export const consentRecords = pgTable("consent_records", {
  id: id("id"),
  organization_id: uuid("organization_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),
  user_id: uuid("user_id").notNull().references(() => userProfiles.id),
  consent_type: text("consent_type").notNull(),
  granted: boolean("granted").notNull(),
  granted_at: timestamp("granted_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  consent_version: text("consent_version").notNull(),
  metadata: jsonb("metadata").notNull().default({}),
});

/** Movemental staff allowlist — drives admin onboarding tools and RLS `is_movemental_staff`. */
export const staffUsers = pgTable("staff_users", {
  user_id: uuid("user_id").primaryKey().references(() => userProfiles.id, { onDelete: "cascade" }),
  granted_at: timestamp("granted_at", { withTimezone: true, mode: "string" }).notNull().defaultNow(),
  granted_by: uuid("granted_by").references(() => userProfiles.id),
});