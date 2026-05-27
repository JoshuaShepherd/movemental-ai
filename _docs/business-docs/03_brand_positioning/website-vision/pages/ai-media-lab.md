# AI Media Lab (Dashboard Module)

## Purpose
Give leaders and orgs a guided workflow for submitting source materials and receiving AI-generated podcasts, video decks, and clip kits—while maintaining editorial control and transparency.

## Workflow Stages
1. **Source Intake** – Upload documents, link sermons/podcasts, select thematic focus.
2. **Brief Configuration** – Choose desired outputs (podcast, deck, clip kit), audience persona, tone.
3. **AI Processing** – NotebookLM orchestration with Movemental guardrails.
4. **Review & Edit** – Human-in-the-loop review, voice adjustments, badge tagging.
5. **Distribution** – Publish to leader platform, share to network, download packages.

## Component Map
1. **Project Dashboard**
   - List of active/completed media lab projects with status indicators.
2. **Submission Wizard**
   - Stepper UI for uploading documents, selecting outputs, setting context.
3. **Processing Monitor**
   - Progress indicator, estimated completion time, logs.
4. **Review Workspace**
   - Audio player with transcript editor.
   - Slide deck preview with text editing.
   - Clip list with trimming controls.
   - Transparency badge + disclosure fields.
5. **Distribution Panel**
   - Buttons to publish to platform, share to network, download assets, schedule announcements.
6. **History & Analytics**
   - Completion dates, performance metrics (plays, downloads, citations).

## Data / Integrations
- File storage (Supabase/S3) for source and outputs.
- NotebookLM API orchestration.
- Version control for outputs + manual edits.
- Analytics feed for media performance.

## UX Notes
- Provide guardrails for maximum file size, supported formats.
- Offer templates for common briefs (launch announcement, cohort recap, research summary).
- Ensure easy re-run with updated sources.

## Open Questions
- Determine SLA for Movemental human review.
- Decide if orgs can create internal reviewers vs. Movemental-only.

