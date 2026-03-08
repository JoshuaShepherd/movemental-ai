# Content Workbench (Dashboard Module)

## Purpose
Provide leaders with a unified environment for drafting, editing, scheduling, and publishing content across articles, courses, podcasts, and resource bundles—optimized for Movemental’s AI + transparency workflows.

## Key Capabilities
1. Multi-format editor (markdown + blocks) with sermon-to-article templates.
2. AI copilot side panel for ideation, editing, translation, disclosure tagging.
3. Content scheduling and syndication to Movemental network + leader site.
4. Collaboration tools (comments, assigned editors, approval workflow).

## Component Map
1. **Content List View**
   - Filters (status, format, tag, collaboration), search, bulk actions.
2. **Editor Workspace**
   - Rich text editor with block library (quotes, scripture embeds, callouts).
   - Sidebar toggles for SEO checklist, AI copilot, voice/theology checks.
3. **AI Copilot Panel**
   - Prompt interface, voice-preservation guardrails, suggestion history.
   - Buttons for “Generate outline”, “Refine paragraph”, “Translate”.
4. **Transparency Badge Selector**
   - Required step before publishing; includes explanation and additional disclosure fields.
5. **Media Attachments**
   - Upload area for hero images, attachments, session artwork references (ties into customization system).
6. **Publishing Controls**
   - Schedule, immediate publish, syndication options (network share, newsletter, RSS feed).
7. **Collaboration Footer**
   - Comment thread, assign reviewer, version history.

## Data / Integrations
- Supabase content tables (per leader partition).
- AI service integration (OpenAI/Anthropic) via copilot service.
- Transparency/logging pipeline to track badge usage.
- Scheduling integration with newsletter + RSS.

## UX Considerations
- Provide voice/style hints derived from leader profile.
- Autosave + offline resilience.
- Surface SEO keywords + network cross-link recommendations.

## Open Questions
- Determine if long-form course creation is handled here or in LMS builder (or both with shared components).
- Finalize AI cost tracking per tenant for billing transparency.

