# Movemental Deployment & Governance Playbook

**Do this now:** Run a single multi-tenant Movemental Control Plane (Next.js + Supabase) that you host and govern, provision each leader as a managed tenant (config + data slice + domain), and enforce ownership through contract + tech guardrails so every deployment stays on Movemental rails while still giving leaders 90% revenue retention.

The rest of this guide unpacks how to execute that mandate.

---

## 1. Deployment & Code Architecture

### 1.1 Reference Stack
- **App layer:** The existing Next.js 15 + Tailwind + shadcn/ui codebase (`app/`) is the canonical product. Keep it single-repo for velocity; treat each leader as a configuration profile (theme, IA, feature flags).
- **Data layer:** Operate one Supabase project as the **Movemental Control Plane (MCP)**. Use schemas or table-level `leader_id` partitioning with Row Level Security (RLS) to isolate tenants while sharing indexes, stored procedures, and the enterprise-ready Alan Hirsch schema.
- **Infra:** Deploy core app to Vercel (preview + prod). Each leader receives a custom domain mapped to the same deployment via middleware that resolves tenant by domain or signed token.

### 1.2 Branching & Release Flow
1. `main`: integration + automated tests.
2. `release/*`: weekly cut for production; triggers Vercel production build + Supabase migrations (using `supabase/db/migrations`).
3. `tenant/<leader>` tags: capture the config snapshot (theme JSON, seed content) for each leader. These tags allow recreating a leader’s environment without forking code.

### 1.3 Provisioning a Leader
1. **Template seed:** Start from Alan Hirsch’s dataset (books, courses, taxonomies). Use SQL scripts that replace `leader_id` and `slug` during import.
2. **Config package:** Store per-leader settings in `leader_profiles` table (color tokens, navigation, feature flags, revenue accounts, domain metadata).
3. **Domain onboarding:** Issue SSL via Vercel, map DNS, verify email sending domain.
4. **Payments & rev-share:** Connect Stripe Connect account owned by Movemental; grant leaders access to their payouts while routing 10% platform take automatically.

### 1.4 Why One Database?
- Shared Supabase keeps feature velocity high (no schema drift across 1,000 tenants).
- RLS ensures data isolation while enabling cross-tenant analytics through secure service roles.
- Backup/restore is centralized; follower databases (Supabase PITR or read replicas) can be used for DR and analytics without duplicating schemas.

### 1.5 Ship Mode
- **CI/CD:** GitHub Actions (or Vercel git integration) runs lint/tests, then deploys preview per PR. On merge to `release`, run `supabase migration up` + `pnpm vercel deploy --prod`.
- **Observability:** Use Vercel Analytics + Log Drains, Supabase logs, and a central Metabase/Lightdash workspace fed by the MCP to monitor tenant health.

---

## 2. Connectedness Across Distributed Dashboards

### 2.1 Shared Graph
- Create `network_nodes`, `network_edges`, and `content_featured_links` tables to model how leaders, content, and campaigns relate.
- Each tenant’s dashboard queries their slice plus recommended cross-links sourced from this graph (via a service role).

### 2.2 Federation Layer
- Build a lightweight **Movemental Federation API** (Next.js route handler) that exposes:
  - Federated search (Elastic/LlamaIndex fed by Supabase) returning content from other leaders flagged as shareable.
  - Collaboration invites (shared events, co-branded courses) stored in a `collaboration_requests` table.
  - Network insights (e.g., “Brad’s audience overlaps 37% with yours”). Use aggregated metrics from analytics warehouse (BigQuery/SUP base replication).

### 2.3 UX Pattern
- Dashboards show a **Connectedness strip**: featured collaborators, network KPIs, suggested cross-promo actions.
- Contextual links embed deep links to other tenants using signed URLs that respect RLS (viewer can only see public/allowed assets).

### 2.4 Governance
- Leaders opt-in to sharing specific data fields (audience size, courses, events). Store permissions in `sharing_policies`.
- When data moves cross-tenant, log it in `data_sharing_audit` for transparency and compliance with trust-first revenue model.

---

## 3. Design Blueprint Leveraging the Alan Hirsch Database

### 3.1 Treat Alan’s Schema as the Golden Template
- Snapshot the Supabase schema (`supabase_schema.sql`) as **Template v1**. All new tenants inherit this baseline.
- Maintain migrations in `/supabase/migrations` with semantic versioning; never hand-edit tenant databases.

### 3.2 Parameterize Content Domains
- Replace Alan-specific literals with lookup tables:
  - `leaders` (profile, theology stream, brand system)
  - `content_collections` (books, courses, liturgies)
  - `engagement_models` (subscriptions, community tiers, donations)
- Use view layers (e.g., `leader_books_view`) that filter by `leader_id`, allowing React components to stay generic.

### 3.3 Multi-Tenant Theming
- Store typography, color tokens, and layout toggles in JSONB columns. Hydrate Tailwind CSS variables at runtime via CSS custom properties set per tenant.
- Media assets (hero images, author portraits) live in Supabase Storage bucket namespaced by tenant; signed URLs ensure isolation.

### 3.4 Operational Dashboards
- Standardize dashboard widgets (revenue, engagement, top content) by building them against analytic views (Materialized or derived). Each new leader gets the same enterprise dashboard day one.
- Expose overrides only where differentiation is missiologically necessary; everything else stays shared to minimize support load.

---

## 4. Ownership, Control, and the 10% Covenant

### 4.1 Legal & Commercial Backbone
- **Platform Ownership Covenant:** Movemental owns the codebase + managed infrastructure. Leaders own their content, first-party data, and brand assets.
- **Managed Service Agreement:** Codify $1,000 upfront, 10% gross platform revenue, and Movemental’s obligation to host, secure, and improve the platform.
- **License Clause:** Leaders receive a non-transferable license to use the platform; exporting the code or self-hosting requires a negotiated exit fee and 12-month notice.

### 4.2 Technical Guardrails
- Hosting + CI/CD stay inside Movemental accounts. Leaders get dashboard-level access, not root servers.
- Stripe Connect keeps payouts flowing while letting Movemental skim 10% before disbursement—no manual invoicing.
- Feature keys issued per tenant; platform won’t boot without a valid key signed by the MCP (prevents running a rogue copy).

### 4.3 Data Portability with Accountability
- Provide automated exports (content, contacts) so leaders feel secure, but watermark exports with cryptographic signatures + license metadata to deter unauthorized cloning.
- Maintain a `platform_usage_audit` table; if a tenant disconnects, you can prove breach (important for “don’t take the tech and run” concern).

### 4.4 Onboarding & Offboarding
- **Onboarding:** Movemental configures domain, payments, data import, and trains the leader’s team. Access is role-based (Admin, Author, Editor, Subscriber, User) per existing platform capabilities.
- **Offboarding:** Disable feature key, archive tenant schema slice, retain backups for 12 months, and revoke domain routing. Provide content export per contract.

### 4.5 Maintaining Influence & Community
- Keep Movemental-branded surfaces (e.g., footer “Powered by Movemental”) unless a tenant buys white-label upgrade (priced to preserve margin).
- Run quarterly cohort reviews where leaders see comparative benchmarks (while anonymized), reminding them of the value they receive by staying connected.

---

## 5. End-to-End Best Practices Checklist

| Goal | Practice | Owner |
| --- | --- | --- |
| Reliable deployments | Single repo, IaC migrations, CI gating, automated Supabase deploys | Founder/CTO |
| Tenant isolation with shared efficiency | RLS, `leader_id` partitioning, config-first customization | Platform team |
| Network connectedness | Federation API, shared graph tables, opt-in sharing policies | Product + Data |
| Scalable template reuse | Treat Alan’s schema as versioned template; use seeds + config packages | Engineering |
| Control without distrust | Managed hosting, license clauses, Stripe Connect rev-share, audit trails | Ops + Legal |
| Community influence | Benchmarks, cross-promo programs, Powered-by branding | Growth |

---

## 6. Recommended Next Steps
1. **Codify governance:** Finalize Platform Ownership Covenant + Managed Service Agreement aligning with trust-first revenue model.
2. **Productize provisioning:** Build CLI or script (`pnpm create-tenant --leader alan-hirsch`) that seeds DB, uploads assets, issues feature key, and registers domain.
3. **Implement Federation API:** Ship network graph + cross-tenant recommendations so connectedness becomes a tangible product value.
4. **Automate rev-share:** Finish Stripe Connect + accounting automation to guarantee the 10% take with zero manual reconciliation.
5. **Publish this playbook:** Share internally so every future hire understands why Movemental runs a managed multi-tenant platform instead of handing over codebases.

Deliver these and Movemental can keep pricing revolutionary, enforce the 10% partnership, and ensure leaders stay inside the Movemental ecosystem because it is both ethically governed and technically indispensable.

