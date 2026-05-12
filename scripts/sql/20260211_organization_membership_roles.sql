-- Normalize organization_memberships.role to member | admin | sponsor.
-- Promote one admin per org when none exists (earliest joined_at / created_at).

BEGIN;

UPDATE organization_memberships
SET role = 'admin'
WHERE lower(trim(role)) IN (
  'owner',
  'org_owner',
  'org_admin',
  'organization_admin',
  'administrator'
);

UPDATE organization_memberships
SET role = 'member'
WHERE lower(trim(role)) NOT IN ('member', 'admin', 'sponsor');

WITH ranked AS (
  SELECT
    id,
    organization_id,
    row_number() OVER (
      PARTITION BY organization_id
      ORDER BY joined_at ASC NULLS LAST, created_at ASC NULLS LAST, id ASC
    ) AS rn
  FROM organization_memberships
  WHERE status IN ('active', 'pending')
),
orgs_missing_admin AS (
  SELECT DISTINCT m.organization_id
  FROM organization_memberships m
  WHERE m.status IN ('active', 'pending')
  GROUP BY m.organization_id
  HAVING count(*) FILTER (WHERE m.role = 'admin') = 0
)
UPDATE organization_memberships m
SET role = 'admin'
FROM ranked r
JOIN orgs_missing_admin o ON o.organization_id = r.organization_id
WHERE m.id = r.id
  AND r.rn = 1;

COMMIT;
