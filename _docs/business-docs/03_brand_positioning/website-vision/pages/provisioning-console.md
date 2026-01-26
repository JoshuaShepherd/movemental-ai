# Provisioning Console (Internal Module)

## Purpose
Support Movemental’s technical team in creating, configuring, and managing tenant deployments (leaders, org bundles, cohorts) on the Movemental Control Plane.

## Core Functions
1. Launch new tenants from Alan Hirsch template seed + config package.
2. Manage domains, SSL, email sending, and environment variables.
3. Trigger Stripe Connect onboarding and ownership covenant documents.
4. Monitor provisioning status and automate offboarding/archival workflows.

## Component Map
1. **Tenant List**
   - Filterable table with leader/org name, status (Provisioning, Active, Archived), last deployment date.
2. **Create Tenant Wizard**
   - Steps: Basic info, domain config, feature flags, Stripe Connect, content imports, training schedule.
3. **Config Editor**
   - JSON/YAML editor for tokens (colors, navigation, feature toggles) with validation.
4. **Automation Panel**
   - Buttons for running scripts (seed content, sync assets, issue feature key, send onboarding emails).
5. **Domain & DNS Manager**
   - Status indicators for DNS/SSL, re-try actions, documentation links.
6. **Stripe Connect & Billing**
   - View payout setup, status of rev-share automation, manual overrides.
7. **Audit & Logs**
   - Timeline of provisioning actions, user, timestamp.
8. **Offboarding Workflow**
   - Steps for disabling keys, archiving data, delivering exports, revoking domains.

## Data / Integrations
- Supabase Leader Profiles, config tables.
- CLI/automation scripts for seeding.
- Stripe Connect API.
- DNS/SSL monitoring.

## UX Notes
- Require confirmation dialogs for destructive actions.
- Provide templated emails/document downloads.
- Support search across tenants by name, domain, feature flag.

## Open Questions
- Determine if console lives within Movemental dashboard or separate admin app.
- Setup integration with project management tools for onboarding tasks.

