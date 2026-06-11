# Safety dashboard RLS — follow-up (Phase 7)

Server-side entitlement checks ship in domain routes under `/api/safety/*` and RSC guards via
`requireSafetyDashboardSession`. Treat Supabase RLS on `safety_artifacts*` as defense in depth.

## Before production promotion

1. Audit existing RLS on `safety_artifacts`, `safety_artifact_versions`, `safety_artifact_publications`.
2. Policies should allow read/write only when `organization_id` matches an org in
   `organization_memberships` for `auth.uid()` (= `user_profiles.id`).
3. Re-verify with Supabase MCP read-only queries impersonating a test JWT.

Service role (`SUPABASE_SERVICE_ROLE_KEY`) remains server-only for staff provisioning at
`POST /api/admin/safety/provision-enrollment`.
