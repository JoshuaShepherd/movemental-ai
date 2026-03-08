# Template directories

This folder contains design-mode HTML/CSS/JS prototypes and assets (e.g. `minimal-contemplative/`, `editorial-light/`, `data/`, `images/`). Templates here are the visual and structural source for the Movemental public surface.

---

## Required components and backend hooks

Templates must include the **UI elements and controls** that the backend expects, so the front end can connect to existing services. A generic chatbot, generic assessment flow, or missing chapter/checkout controls will not hook up correctly.

**Single source of truth:**

- **[_docs/design-instructional-guides/UI_ELEMENTS_FOR_MOVEMENTAL_TEMPLATES_SERVICE_HOOKS.md](../_docs/design-instructional-guides/UI_ELEMENTS_FOR_MOVEMENTAL_TEMPLATES_SERVICE_HOOKS.md)** — Required controls and exact enum values: AI Lab (Theme/Mode/Style), Alan Mode (Topic/Approach), AI Lab Lite (no selectors), assessment modality (Voice/Form/Text + routes), book checkout (bookId, successUrl, cancelUrl), book reader (chapter selector + content), courses, pricing.

- **[_docs/design-instructional-guides/COMPONENTS_BY_PAGE.md](../_docs/design-instructional-guides/COMPONENTS_BY_PAGE.md)** — Which components are required per page (AILabHeader, AlanModeSelector, AssessmentModalitySelector, Chapter selector, PurchaseButton, etc.).

When building or extending templates in this directory, ensure each page includes the components and controls listed in those docs so the app can be wired to the backend without rework.
