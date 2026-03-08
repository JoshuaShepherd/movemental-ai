# Org Ops Console (Dashboard Module)

## Purpose
Give organizational partners (Forge America/Canada, Wesleyan Church, Tampa Underground) tools to manage multi-leader deployments, permissions, billing, and shared resources.

## Key Functions
1. Manage sub-tenants (faculty, cohort leaders, alumni) from one console.
2. Configure shared resource libraries and cross-tenant content syndication.
3. Monitor aggregate analytics, revenue share, and compliance for the org.
4. Coordinate onboarding/offboarding tasks and governance documents.

## Component Map
1. **Org Overview**
   - Snapshot of active leaders, cohorts, revenue, content output.
2. **Team & Tenant Management**
   - Table of sub-tenants with status, feature access, role assignments.
   - Actions: invite, suspend, reassign, impersonate (support mode).
3. **Resource Library Manager**
   - Upload/manage org-level resources, assign to leaders/cohorts.
   - Permissions and tagging.
4. **Analytics Rollup**
   - Aggregated metrics (revenue, reach, transparency compliance) across all sub-tenants.
   - Filters by region/cohort.
5. **Billing & Agreements**
   - View invoices, rev-share statements, covenant documents.
6. **Task & Workflow Center**
   - Onboarding checklists for new leaders, training modules, design labs.
7. **Support & Escalations**
   - Direct channel to Movemental success team, log of tickets.

## Data / Integrations
- Tenant metadata from Supabase.
- Shared resource storage buckets.
- Billing integration (Stripe), document storage for covenants.

## UX Notes
- Must respect role-based permissions (org admin vs. coach vs. viewer).
- Provide export capabilities for denominational reporting.
- Include audit logging of administrative actions.

## Open Questions
- Determine pricing tiers/feature flags for org console.
- Define how org-level analytics integrate with public case studies.

