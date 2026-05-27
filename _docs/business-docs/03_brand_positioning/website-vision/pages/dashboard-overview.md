# Dashboard Overview (Internal)

## Purpose
Describe the authenticated Movemental dashboard landing page that greets leaders after login, surfacing key metrics, tasks, and navigation to specialized modules (Content OS, Media Lab, Analytics, Pipeline).

## Primary Users
- Individual leaders + their teams
- Organizational administrators (Forge, Wesleyan, Tampa Underground)
- Movemental staff (for support mode)

## Core Objectives
1. Provide at-a-glance metrics (revenue, reach, content cadence, AI QA status).
2. Surface prioritized tasks (publish draft, tag AI usage, review collaboration invite).
3. Route users into module-specific workspaces via quick actions.

## Component Map
1. **Global Header**
   - Tenant switcher (for org admins), notifications, help menu, profile menu.
2. **Metric Tiles**
   - Revenue (MTD + 90-day trend), Audience reach (28x amplification gauge), Content cadence (published vs. goal), AI QA status (badge adoption, voice/theology score).
3. **Task List**
   - Personalized tasks (review AI disclosure, approve collaboration, upload resources).
4. **Quick Actions**
   - Buttons: `Create Content`, `Launch Media Lab`, `Invite Collaborator`, `View Analytics`.
5. **Connectedness Strip**
   - Suggested cross-links, audience overlap stats, collaboration invites.
6. **Announcements & Resources**
   - Movemental updates, upcoming labs, relevant resources from `/resources`.
7. **Support CTA**
   - Link to help center, chat, or concierge.

## Data Requirements
- Aggregated analytics from Supabase/warehouse.
- Task engine feeding from Content OS + governance workflows.
- Collaboration data (network graph).

## UX Notes
- Keep layout modular for tenant theming.
- Support light/dark per design rules.
- Provide quick view of badge compliance and gating status for multi-author orgs.

## Dependencies
- Feature flags for modules (Media Lab, Research Hub).
- Role-based permissions for org admins vs. individual creators.

