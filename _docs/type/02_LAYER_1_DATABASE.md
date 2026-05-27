# Layer 1: Database (Drizzle Schema)

> **The Single Source of Truth** for all data structures

**Layer**: 1 of 6  
**File**: `db/schema.ts`  
**Validation**: `pnpm db:check` → required `{"status":"LOCKED"}` (or `npx tsc --noEmit`)  
**Status**: ✅ LOCKED (2026-02-15)

---

## Overview

The Drizzle schema is the **immutable source of truth for data structure**. It defines the database structure using Drizzle ORM and is the only place where new data structures originate. All other layers derive from this schema.

### Key Principles

1. **Database-First Design**: Schema matches production database exactly
2. **Migration-Based Changes**: All changes go through Drizzle migrations
3. **Type Generation**: Drizzle types are automatically inferred by TypeScript
4. **No Direct Edits**: Never edit the database directly—always use migrations

---

## File Location

```
db/
├── index.ts     # Database connection configuration
└── schema.ts    # Drizzle schema definitions (SINGLE SOURCE OF TRUTH)
```

---

## Current Schema

### Helper Functions

The schema uses helper functions for common fields, ensuring consistency across all tables:

```typescript
import { pgTable, uuid, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Common field helpers
function id() {
  return uuid("id").primaryKey().defaultRandom();
}

function createdAt() {
  return timestamp("created_at", { withTimezone: true }).defaultNow().notNull();
}

function updatedAt() {
  return timestamp("updated_at", { withTimezone: true }).defaultNow().notNull();
}
```

### Current Tables

#### Organizations (Tenant Root)

```typescript
export const organizations = pgTable("organizations", {
  id: id(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  organizationType: text("organization_type").notNull(),
  accountOwnerId: uuid("account_owner_id").notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
```

**Purpose**: Root entity for multi-tenant architecture. Every tenant-scoped entity references this table.

#### Onboarding Responses (Tenant-Scoped)

```typescript
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
```

**Purpose**: Captures comprehensive onboarding data from movement leaders. This multi-step form collects everything needed to configure a tenant's platform.

---

## Migration Workflow

**CRITICAL**: You must **never** edit the database directly. All changes must go through Drizzle migrations.

### Why Migrations Matter

1. **Version Control**: Migrations are tracked in git
2. **Reproducibility**: Same migrations work in dev, staging, production
3. **Rollback Safety**: Migrations can be reversed
4. **Team Coordination**: Everyone applies the same changes in order

### Commands

```bash
# 1. Edit db/schema.ts (make your changes)

# 2. Generate migration
npm run db:generate

# 3. Review generated migration file in drizzle/ folder

# 4. Apply migration to database
npm run db:push

# 5. Validate - no TypeScript errors
npx tsc --noEmit
```

---

## How to Add a New Table

### Step 1: Define Table in Schema

Edit `db/schema.ts`:

```typescript
// Example: Adding a new books table
export const books = pgTable('books', {
  id: id(),
  title: text('title').notNull(),
  description: text('description'),
  organizationId: uuid('organization_id')
    .references(() => organizations.id)
    .notNull(),  // Required for tenant scoping
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
```

### Step 2: Generate Migration

```bash
npm run db:generate
```

### Step 3: Apply Migration

```bash
npm run db:push
```

### Step 4: Validate

```bash
npx tsc --noEmit
# Check for TypeScript errors - no errors means Layer 1 is LOCKED
```

### Step 5: Continue to Layer 2

Once Layer 1 has no TypeScript errors, proceed to [03_LAYER_2_ZOD.md](./03_LAYER_2_ZOD.md).

---

## Multi-Tenant Architecture

### Tenant Scoping Pattern

Every table that contains tenant-specific data **MUST** include an `organizationId` field:

```typescript
organizationId: uuid('organization_id')
  .references(() => organizations.id)
  .notNull(),  // Required for tenant scoping
```

### Current Tenant-Scoped Tables

| Table | Tenant-Scoped | Organization Reference |
|-------|--------------|------------------------|
| `organizations` | No (tenant root) | N/A |
| `onboardingResponses` | ✅ Yes | `organizationId → organizations.id` |

### Tenant Resolution Flow

1. **Middleware** resolves tenant from subdomain/custom domain
2. **Services** (Layer 3) automatically filter by `organizationId`
3. **UI** (Layer 6) never directly accesses tenant—it's transparent

---

## Required Fields

Every table **MUST** include these three fields using helper functions:

```typescript
{
  id: id(),                    // UUID primary key (auto-generated)
  createdAt: createdAt(),      // Timestamp with timezone (auto-set)
  updatedAt: updatedAt(),      // Timestamp with timezone (auto-set)
}
```

---

## Common Patterns

### Foreign Keys

```typescript
authorId: uuid('author_id')
  .references(() => userProfiles.id)
  .notNull(),
```

### Optional Fields

```typescript
description: text('description'),  // Optional (no .notNull())
```

### Default Values

```typescript
status: text('status').default('draft'),
isActive: boolean('is_active').default(true),
```

### Unique Constraints

```typescript
slug: text('slug').notNull().unique(),
```

### JSONB Fields

```typescript
metadata: jsonb('metadata'),
socialMediaLinks: jsonb('social_media_links'),
```

---

## Validation

After making any schema changes:

```bash
npx tsc --noEmit
```

**Required Status**: No TypeScript errors (Layer 1 LOCKED)

If validation fails:
1. Check for missing required fields (`id`, `createdAt`, `updatedAt`)
2. Verify migrations were applied (`npm run db:push`)
3. Check for syntax errors in schema definitions

---

## Rules

### ✅ Always Do

- Use helper functions: `id()`, `createdAt()`, `updatedAt()`
- Include `organizationId` for tenant-scoped tables
- Define foreign keys with `.references()`
- Run `npx tsc --noEmit` after EVERY schema change
- Generate migrations before applying changes
- Review migration files before applying

### ❌ Never Do

- Edit database directly (bypass migrations)
- Skip migration generation
- Proceed to Layer 2 if TypeScript compilation fails
- Modify schema based on UI convenience
- Add fields without proper types
- Create tenant-scoped tables without `organizationId`

---

## Troubleshooting

### Migration Fails

**Problem**: `npm run db:push` fails

**Solution**:
1. Check migration file for syntax errors
2. Verify database connection (`DATABASE_URL` in `.env.local`)
3. Check for conflicting migrations
4. Review error message for specific issue

### Validation Fails

**Problem**: `npx tsc --noEmit` shows errors

**Solution**:
1. Check for missing required fields
2. Verify all migrations were applied
3. Check for schema drift (schema.ts vs actual database)
4. Review TypeScript error messages for specific issues

### Type Errors After Schema Change

**Problem**: TypeScript errors appear after schema change

**Solution**:
1. Ensure migration was applied (`npm run db:push`)
2. Validate Layer 1 (`npx tsc --noEmit`)
3. Proceed to Layer 2—types will flow automatically via `drizzle-zod`

---

## Next Steps

- **Layer 2**: [03_LAYER_2_ZOD.md](./03_LAYER_2_ZOD.md) - Zod schemas (Types SSOT)
- **Workflow**: [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) - Complete workflow
- **Multi-Tenant**: [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) - Tenant scoping details

---

**Remember**: The database schema is the foundation. Get it right here, and everything else flows naturally.
