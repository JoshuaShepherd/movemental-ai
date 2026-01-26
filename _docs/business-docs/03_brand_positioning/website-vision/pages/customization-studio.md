# Customization Studio (Dashboard Module)

## Purpose
Enable leaders to manage visual identity (colors, typography, layouts), session-based artwork overrides, and layout variants without compromising Movemental’s design rules or accessibility standards.

## Key Functions
1. Theme configuration (colors, fonts, spacing) via tokenized controls.
2. Session artwork upload + management for hero/cards/backgrounds.
3. Layout presets for key sections (hero, story blocks, resource grids).
4. Accessibility checker ensuring contrast compliance.

## Component Map
1. **Theme Overview**
   - Current palette preview, typography stack, spacing scale.
2. **Color & Typography Editors**
   - Sliders/dropdowns bound to Tailwind tokens with real-time preview.
   - Warning states if contrast rules violated.
3. **Artwork Manager**
   - Upload zone for hero/card/accent imagery.
   - Session scope indicator + TTL countdown.
   - Alt text inputs, gradient overlay controls, revert buttons.
4. **Layout Presets**
   - Gallery of recommended templates (Editorial, Network Grid, Case Study).
   - “Apply preset” actions with preview.
5. **Preview Pane**
   - Live rendering of leader site with selected theme/artwork/layout.
   - Device toggles (desktop/tablet/mobile).
6. **Accessibility & Governance Panel**
   - Contrast checker results, design rule compliance, outstanding issues list.

## Data / Integrations
- Theme tokens stored in Supabase `leader_profiles`.
- Session artwork storage (temp bucket + Redis metadata).
- Validation logic referencing design rules file.

## UX Notes
- Provide undo/redo history.
- Offer recommended palettes per Movemental directions.
- Allow copy/share of themes for multi-brand orgs.

## Open Questions
- Determine ability to save multiple artwork sets for quick switching.
- Evaluate future support for CSS/JS injection (likely disallowed for governance reasons).

