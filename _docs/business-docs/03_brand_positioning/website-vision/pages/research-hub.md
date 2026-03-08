# Research Hub (Dashboard Module)

## Purpose
Provide dedicated tooling for research-oriented leaders (e.g., Daniel Yang, Send Institute) to publish data-rich briefs, interactive charts, and multilingual insights within Movemental’s ecosystem.

## Capabilities
1. Upload/manage datasets, charts, and narratives.
2. Generate interactive visualizations and embed them in leader sites.
3. Offer AI translation/localization for diaspora audiences.
4. Control access levels (public, members-only, partner-only).

## Component Map
1. **Project Overview**
   - List of research projects with status, topic, audience, publish dates.
2. **Data Manager**
   - CSV/JSON upload, schema preview, data cleansing tools, connection to warehouse tables.
3. **Visualization Builder**
   - Chart templates (bar, line, map, funnel), styling options, accessibility checks.
4. **Narrative Composer**
   - Combine narrative text with charts, callouts, citations.
   - AI assistant for summarizing insights + generating localization drafts.
5. **Localization Panel**
   - Manage translations, select target languages, review AI-generated text, assign translators.
6. **Access & Distribution Settings**
   - Define who can view (public, subscriber, partner), generate embed codes, network share toggles.
7. **Engagement Analytics**
   - Track views, shares, downloads, citations.

## Data Requirements
- Secure storage for datasets.
- Visualization engine (e.g., Vega-Lite, custom library).
- Localization service integration.

## UX Notes
- Emphasize clarity of data provenance and citation.
- Provide template for diaspora impact briefs (Daniel Yang use case).
- Include governance reminders for sensitive data (consent, anonymization).

## Open Questions
- Determine long-term storage/retention policy for datasets.
- Decide if research hubs can syndicate to external partners via API.

