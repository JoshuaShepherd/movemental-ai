# Fragmentation → Movement — React migration plan

**Route.** [`src/app/(site)/fragmentation/page.tsx`](../../src/app/(site)/fragmentation/page.tsx)

**Scope.** Convert the current six-section fragmentation story into the final canonical version of a six-stage narrative: **Fragmentation → Integration → Activation → Formation → Multiplication → Movement**, with Movement becoming a first-class stage rather than a placeholder.

---

## 1. Introduction

The current fragmentation story is strong on emotional setup (Part I) and partial on resolution (Part II). It needs four upgrades before it can ship as the canonical narrative:

- A clearer six-stage sequence, with Movement promoted to a real stage.
- A sharper distinction between **Multiplication** (reproduction through infrastructure) and **Movement** (networked platforms as a field-level phenomenon).
- An explicit dual-intelligence model — **informational** and **relational** — carried through every stage rather than surfaced only in the audience toggle.
- A concrete React migration path from the current component tree into stage-scoped subcomponents with an extended content module.

This document describes the target state, audits the current implementation, and gives step-by-step migration instructions keyed to the actual files in this repo.

---

## 2. Current state audit (condensed)

- Route works: `/(site)/fragmentation` reads `searchParams`, resolves audience + field defaults, renders the shell.
- Audience switcher and informational ↔ relational field toggle exist and are URL-synced.
- **Part I (fragmentation acts + scatter climax) is production-quality.** Cross-fading sticky stage, 15-tile scatter, cost ledger, primary-flash climax — keep as-is.
- **Part II (integration → movement) is largely shipped in React.** Stage-scoped files (`fragmentation-story-stage-*.tsx`) + a thin `fragmentation-story-part-two.tsx` orchestrator replaced the monolithic Part II file.
  - Integration and Formation retain scrubbed motion.
  - Activation includes a scroll-scrubbed workspace beat (spokes, hub, side columns) on desktop.
  - Multiplication includes the **tenant ecosystem + infrastructure overlay** (informational + relational infra cards) and a scroll-scrubbed “contract → infra → captions” timeline on desktop.
  - Movement includes an interactive **network** visualization, URL-synced density (`nodes`), a one-time scroll intro on desktop, and reduced-motion / mobile fallbacks.
- **Audience dock** uses **Institutions** as the fourth tab (intel-artifact mapping still uses `seminary` where required for registered surfaces).
- **Remaining polish (non-blocking):** optional deeper “Approach B echo” geometry inside multiplication; continued copy passes in `fragmentation-story-content.ts` for dual-intelligence parity by audience.

---

## 3. Final canonical conceptual model

### Fragmentation

Informational artifacts (books, documents, frameworks, media, training content, structured knowledge, data) and relational artifacts (people, communications, networks, stakeholder records, donor records, peer ecosystems) coexist in the same space but do not connect. Everything exists. Nothing relates.

### Integration

The intelligence is gathered, organized, and structured into a coherent system. This stage covers:

- File and folder architecture for the informational corpus.
- Knowledge architecture — taxonomies, canonical slugs, versioning.
- Relational mapping — who relates to whom, with what role, through what history.
- A shared source-of-truth structure that both intelligences can point at.

### Activation

The system becomes usable and accessible. This stage covers:

- Database, CMS, CRM, LMS.
- Internal and external communication layers.
- AI and grounded agents, file search, citation-ready retrieval.
- Interfaces that let the right person reach the right artifact at the right time.

### Formation

Informational and relational intelligence converge into transformation.

- **Informational side** — dissonance, action, reflection, structured learning, embodied practice in community.
- **Relational side** — recognition, belonging, alignment, accountability, imitation and apprenticeship.

Formation is the stage where the two intelligences stop feeling separate and become one lived system.

### Multiplication

The formed system reproduces through infrastructure.

- **Informational multiplication infrastructure** — ecommerce, subscriptions / user systems, SEO, GEO, AI agents, translation, organizational learning systems.
- **Relational multiplication infrastructure** — CRM / identity and memory layer, integrated communications, network awareness, group participation systems, contextual AI relational support.

Multiplication is what makes the single platform reproducible. It is **not** just "more nodes" and it is **not** the same as movement.

### Movement

Multiple platforms become a visible network. Each node in the network is a full platform carrying its own informational and relational intelligence. Value emerges from networked relation — cross-pollination, shared canon, relational trust between platforms — not just isolated platform capability.

This is the field-level or ecosystem-level expression of what multiplication makes possible.

---

## 4. Required narrative revision for the React route

- **Fragmentation** remains the emotional opening. No copy rewrite needed beyond small adjustments for the new audience set.
- **Integration, Activation, Formation, Multiplication** remain stage-based, but each needs explicit dual-intelligence representation in both copy and visuals.
- **Movement becomes a real final stage** — a live node network, not a hold band. It gets the closing "this is what you were building toward" weight that the outro CTA currently absorbs alone.
- **Multiplication and Movement must not collapse into one scene.** Multiplication shows infrastructure (how a single platform becomes reproducible). Movement shows networked platforms (how many platforms become one field).
- **Audiences** become: Movement Leaders, Nonprofits, Churches, Institutions. Seminary copy survives as an institution subtype example.

---

## 5. Final visual logic per stage

### Fragmentation

- Scattered artifacts across the field.
- Informational and relational types mixed, not grouped.
- No connections drawn.
- Slight drift motion on each artifact.

### Integration

- Clustering and grouping emerges.
- Connection lines drawn between artifact and hub.
- A visible file/folder or taxonomy layer reads as informational architecture.
- A visible relational graph reads as stakeholder/role mapping.
- Both clusters bridge to show one system, not two.

### Activation

- A functional interface layer appears — search bar, selection highlight, context panel.
- Underlying systems implied: CMS, CRM, LMS, database.
- Selecting one artifact reveals related artifacts and context.
- Optional: subtle grounded-AI panel.

### Formation

- A pathway appears through the integrated system.
- A user / participant indicator moves through the path.
- Artifacts activate in sequence as the user passes through.
- Informational transformation (learning) and relational transformation (belonging) are rendered as two complementary lines that converge.

### Multiplication

- The main system contracts toward the center.
- Infrastructure overlays surface around it in a ring or grid.
- Informational overlays: SEO/GEO rank card, AI response card, translation variants card, ecommerce / subscription card.
- Relational overlays: CRM memory card, communications card, network awareness card, group participation card.
- The feeling is "the system has grown the limbs needed to reproduce itself."

### Movement

- Platform nodes appear across the field, each rendered as a disc containing a miniature of the integrated system (small info + rel glyphs inside).
- Lines connect nodes. Edge density grows with node count.
- Existing named leader nodes appear first (for the Movement Leaders audience): Alan Hirsch, Brad Brisco, JR Woodward, Josh Shepherd, Tim Catchim.
- A scaling dial / slider from 0 to 100 lets the user grow the network from these named nodes outward.
- Labels and node examples change per audience (see §8).
- At high counts, individual names fade and the network reads as a field.

---

## 6. React architecture migration plan

All paths are under `src/components/sections/fragmentation-story/` unless stated.

### `src/app/(site)/fragmentation/page.tsx`

- Unchanged structurally. Metadata description may mention Movement explicitly once it ships.

### `fragmentation-story-page-content.tsx`

- Stays as composition shell.
- No changes required beyond potentially passing additional `searchParams` keys if Movement accepts a `nodes` query param (e.g. `?nodes=42`).

### `fragmentation-story-shell.tsx`

- Continues to own `audience`, `field`, `activeChapter` state.
- Add optional `movementNodeCount: number` state (default a sensible midrange like 24) and corresponding URL sync.
- Stage ids must cover the full six-stage sequence. Update any enum / discriminated union of stage ids used downstream.
- Pass `movementNodeCount` + setter down to `PartTwo`/`StageMovement`.

### `fragmentation-story-dock.tsx`

- Replace the audience list. Canonical order:
  1. `leader` → **Movement Leaders**
  2. `nonprofit` → **Nonprofits**
  3. `church` → **Churches**
  4. `institution` → **Institutions** (rename from `seminary`; keep seminary copy as a subtype example)
- Update `AUDIENCE_LABEL`, `AUDIENCE_PANEL_META`, and any glyph map in `fragmentation-story-content.ts` accordingly.
- Update the URL param parser to accept `institution` (with backwards-compat for `seminary` mapping to `institution` for six months).
- Field toggle (Informational / Relational) stays the same.

### `fragmentation-story-acts.tsx` / `fragmentation-story-stage-layers.tsx` / `fragmentation-story-scatter.tsx`

- Part I is strong. Do not rewrite.
- Audit chapter copy and cost-ledger copy to ensure every paragraph explicitly reads as either informational or relational fragmentation, and that no copy references "Seminaries" without the Institutions rename.
- No motion changes.

### `fragmentation-story-part-two.tsx`

This file is the biggest migration target. At 1,155 lines it bundles every Part II stage plus the final CTA, which makes stage-scoped work unsafe.

Split into one file per Section:

- `fragmentation-story-stage-integration.tsx`
- `fragmentation-story-stage-activation.tsx`
- `fragmentation-story-stage-formation.tsx`
- `fragmentation-story-stage-multiplication.tsx`
- `fragmentation-story-stage-movement.tsx`
- `fragmentation-story-outro-cta.tsx`

`part-two.tsx` becomes a thin composition file that imports the six and passes through `audience` / `field` / `movementNodeCount`. The existing `useLayoutEffect` that owns integration + formation scrub timelines moves into the respective stage components.

Rationale:

- Each stage file becomes independently testable / Storybook-able.
- Motion timelines live next to their DOM targets.
- Movement stage can carry its own interactive state (node count slider) without polluting other stages.
- Future additions (new audience, new infrastructure card, new node type) are one-file edits.

### `fragmentation-story-content.ts`

Extend the pure-data module. Keep the existing shapes where possible.

- **Audience type.** Rename `AudienceId = "leader" | "nonprofit" | "church" | "seminary"` → `"leader" | "nonprofit" | "church" | "institution"`. Update `AUDIENCE_ORDER`, `AUDIENCE_LABEL`, `AUDIENCE_PANEL_META`. Keep `parseAudienceParam` defensive; map legacy `seminary` to `institution`.
- **Chapter copy.** Pass through unchanged but re-audit for any "seminary"-specific accents under `informationalAccent` / `relationalAccent` — rewrite to read at the institution level with seminary as one example.
- **Stage copy module.** Add a new exported object per stage (Integration, Activation, Formation, Multiplication, Movement) with headline, lede, caption cards, and an optional audience × field accent map. Naming convention: `getIntegrationCopy(audience, field)`, etc.
- **Multiplication infrastructure.** Add a typed list of infrastructure cards for the multiplication overlay:
  ```ts
  export type InfraChannel = {
    id: string;
    kind: "informational" | "relational";
    label: string;
    example: string; // short tagline
    body: string;    // one-sentence caption
  };
  export const MULTIPLICATION_INFRA: InfraChannel[] = [...];
  ```
  Channels: SEO & Discovery, AI Response, Translation, Ecommerce / Subscriptions, CRM Memory, Communications, Network Awareness, Group Participation.
- **Movement nodes.** Add a typed shape for named nodes and audience-specific node catalogs:
  ```ts
  export type MovementNode = {
    id: string;
    name: string;
    role?: string;
    kind: "seed" | "expansion";
  };
  export const MOVEMENT_NODES: Record<AudienceId, MovementNode[]> = {
    leader: [
      { id: "ah", name: "Alan Hirsch", role: "Author · Movement architect", kind: "seed" },
      { id: "bb", name: "Brad Brisco", role: "Missional strategist", kind: "seed" },
      { id: "jrw", name: "JR Woodward", role: "Network leader", kind: "seed" },
      { id: "js", name: "Josh Shepherd", role: "Platform builder", kind: "seed" },
      { id: "tc", name: "Tim Catchim", role: "APE practitioner", kind: "seed" },
    ],
    nonprofit: [ /* ED + partners + stakeholders + thought leaders */ ],
    church: [ /* senior pastor + staff + ministry partners + congregational leaders */ ],
    institution: [ /* departments + faculty + researchers + external collaborators */ ],
  };
  ```
- **Movement network generator.** A helper that takes a node count and an audience and returns an array of nodes plus a list of edges. Named seeds always come first; expansion nodes are synthesized with stable labels (e.g. `leader-24`, `church-17`).
  ```ts
  export function getMovementNetwork(
    audience: AudienceId,
    count: number
  ): { nodes: MovementNodeResolved[]; edges: [string, string][] };
  ```

---

## 7. Stage-by-stage implementation instructions

### Integration — `fragmentation-story-stage-integration.tsx`

- JSX: `Section id="stage-integration" variant="midnight"`, center header, a 16:10 canvas with a central hub node and ~8 satellite artifacts, SVG lines between hub and each satellite.
- Add a secondary layer: a faint **relational graph** (small circles with role labels) offset behind the informational hub to show both intelligences being integrated. Tint the two layers distinctly via `--primary` vs `--primary-dim` (or opacity).
- Data: reuse existing `IMG` constants. Relational layer uses glyph-only circles keyed off audience.
- Animation: keep the current scrubbed timeline — fade + scale satellites, draw SVG lines via `stroke-dasharray`. Add the relational layer to the same timeline at a small offset (`0.3`).

### Activation — `fragmentation-story-stage-activation.tsx`

- JSX: two-column layout. Left column retains the existing IDE workspace (file tree + editor + schema). Right column adds a **systems layer** — four stacked tiles labeled CMS, CRM, LMS, Database, each showing a small activity indicator.
- Below, a horizontal row of three interface affordances: search bar, context panel, grounded-AI response.
- Data: new tile metadata in `content.ts`, keyed by audience.
- Animation: on-scroll fade-in only. No scrub. Selection states can be CSS-driven (`:hover`, `:focus-within`).

### Formation — `fragmentation-story-stage-formation.tsx`

- JSX: keep the current pathway arc with five stops.
- Add a parallel **relational rail** beneath the informational pathway showing: recognition → belonging → alignment → accountability → imitation.
- The two rails converge visually at the final stop (single combined marker at "Local embodied practice").
- Data: relational arc is a static typed array in `content.ts`.
- Animation: keep the current trail-draw + stop stagger. Add a second trail for the relational rail that draws slightly offset.

### Multiplication — `fragmentation-story-stage-multiplication.tsx`

- JSX: keep the existing `MultiplicationNetwork` (central platform + six tenant clusters).
- **Port the infrastructure overlay from the HTML mockup.** Render a 2×4 grid (or 1×4 on mobile) of `InfraChannel` cards below the tenant network.
  - Info cards: SEO & Discovery, AI Response, Translation, Ecommerce/Subscriptions.
  - Rel cards: CRM Memory, Communications, Network Awareness, Group Participation.
  - Each card carries `label`, `kind`, `example`, `body`, with relational cards taking a primary-tinted background.
- **Correct the current React mismatch.** Replace the three caption cards ("Tenants / Users compound / Network returns") with three re-framed captions: Tenants (organizational), Informational infrastructure, Relational infrastructure.
- Data: `MULTIPLICATION_INFRA` array from `content.ts`. No per-audience variation in v1.
- Animation: no scrub required. Card entry can be a staggered fade-in via ScrollTrigger `onEnter`.

### Movement — `fragmentation-story-stage-movement.tsx`

- JSX:
  - `Section id="stage-movement" variant="elevated"` (or midnight — match the band cadence).
  - Header with audience-adaptive copy (`getMovementCopy(audience)`).
  - Node network canvas, 16:10 aspect, SVG-based.
  - Below the canvas: a node-count dial — a styled `input[type="range"]` from 0 to 100 with a numeric readout and tick marks at 5 (seeds only), 25, 50, 100.
  - Audience-aware legend: for Leaders, show the five named seeds with role labels; for other audiences, show the four primary node kinds.
- Data: `MOVEMENT_NODES[audience]` + `getMovementNetwork(audience, count)`.
- Interactivity: dragging the dial updates a local state `count`, which regenerates nodes/edges via the content helper. Debounce if needed.
- Animation:
  - Nodes fade/scale in when they first appear; fade out when count decreases.
  - Edges draw via `stroke-dasharray` transitions — tween length on change.
  - Named seed nodes keep labels visible up to ~25; at higher counts, labels fade to glyph-only to avoid clutter.

### Outro CTA — `fragmentation-story-outro-cta.tsx`

- Lift out of `part-two.tsx`. No behavior change.

---

## 8. Movement stage detailed requirements

The movement stage must render a live network whose labels and node archetypes change per audience.

### Movement Leaders

- Named seed nodes (always visible at any count > 0):
  - Alan Hirsch — Author · Movement architect
  - Brad Brisco — Missional strategist
  - JR Woodward — Network leader
  - Josh Shepherd — Platform builder
  - Tim Catchim — APE practitioner
- Expansion nodes are unnamed cohort leaders / platform operators. Labels fade at count > 25.
- Legend: "Five movement leaders, each a platform. Add peers to see the field take shape."

### Nonprofits

- Central organization node ("Your org").
- Seed expansion ring: Executive Director, Program Director, Development Lead, Board Chair.
- Secondary ring: partner orgs, major donors, thought leaders, institutional collaborators.
- Expansion nodes: stakeholders, grant officers, volunteer leads.
- Legend: "Your org, your partners, and the stakeholders who carry the work."

### Churches

- Central church node.
- Seed expansion: Senior Pastor, Teaching Team, Elders, Ministry Leads.
- Secondary ring: partner churches, parachurch partners, denominational leaders.
- Expansion nodes: small-group leaders, congregational stewards.
- Legend: "Your church, your pastors, the partners and leaders who carry the practice."

### Institutions

- Central institution node.
- Seed expansion: Department Heads, Senior Faculty, Research Leads, Registrar.
- Secondary ring: peer institutions, external research collaborators, funders.
- Expansion nodes: student cohorts, alumni, embedded practitioners.
- Legend: "Your institution, its departments, and the collaborators who extend its reach."

The same underlying node + edge system is reused for all four audiences — only labels, archetype lists, and legend copy differ. `getMovementNetwork(audience, count)` owns all four variants.

Node-count behavior:

- `0` — no nodes, faint background graph.
- `1–5` (leaders) / `1–4` (other audiences) — seed nodes only, labels on.
- `6–25` — seeds + first expansion ring, labels on seeds only.
- `26–60` — full expansion, labels fade.
- `61–100` — dense field, node radius shrinks slightly, edges get thinner.

---

## 9. GSAP and interaction guidance

General rule: **scrub when scroll position should map continuously to state; tween when audience or count state changes.**

| Stage | Motion treatment |
|---|---|
| Fragmentation (Part I) | Existing cross-fades on sticky stage. onEnter/onEnterBack only, no scrub. Keep as-is. |
| Scatter climax | Existing scrubbed timeline. Keep as-is. |
| Integration | Scrubbed. Existing pattern (nodes fade/scale + stroke-dashoffset). Add relational-layer tween at offset `0.3`. |
| Activation | No scrub. `onEnter` fade-in. Interaction is hover/focus driven. |
| Formation | Scrubbed trail draw + stop stagger. Existing pattern. Add parallel relational rail. |
| Multiplication | No scrub. Tenant network is static. Infrastructure cards stagger-fade on `onEnter`. |
| Movement | No scrub. Tweened response to audience change and node-count change. Use `gsap.to()` for node position/scale/opacity transitions when count updates. |

Node-count dial behavior:

- Debounce slider input to ~60ms to avoid recomputing edges on every pixel.
- Transition duration 400ms, ease `power2.out` for appearing nodes; 300ms `power1.in` for disappearing nodes.
- Edges: use SVG `stroke-dasharray` trick for draw-in, fade for draw-out.
- Respect `prefers-reduced-motion: reduce` — fall back to instant state swaps.

Implementation notes:

- CSS / SVG / DOM are sufficient for every stage. **No Canvas or WebGL required.**
- Use CSS custom properties (`--x`, `--y`, `--s`, `--o`) on node elements and tween the variables where practical; keeps the DOM queryable and accessible.
- Edges: one SVG overlay per stage canvas, paths rendered from computed node coordinates.
- Avoid heavy filters (blur, shadow on shadow). Use `box-shadow: var(--shadow-ambient)` once per node.

---

## 10. Recommended final build order

1. **Update audience and content model.**
   - Rename `seminary` → `institution` in `fragmentation-story-content.ts` and `fragmentation-story-dock.tsx`.
   - Add `MULTIPLICATION_INFRA` and `MOVEMENT_NODES` + `getMovementNetwork` to `content.ts`.
   - Add per-stage copy helpers (`getIntegrationCopy`, `getActivationCopy`, `getFormationCopy`, `getMultiplicationCopy`, `getMovementCopy`).

2. **Split `part-two.tsx` into stage-scoped files.**
   - Create `fragmentation-story-stage-{integration,activation,formation,multiplication,movement}.tsx` and `fragmentation-story-outro-cta.tsx`.
   - Move existing JSX + timelines into each. Keep `part-two.tsx` as a thin composition.
   - Confirm no regression on Integration and Formation motion.

3. **Port the multiplication infrastructure overlay.**
   - Add the 2×4 infra-card grid under the tenant network.
   - Replace the three existing caption cards with the three re-framed captions.
   - Source all content from `MULTIPLICATION_INFRA` + updated copy helpers.

4. **Build the Movement stage.**
   - Implement the node network in `fragmentation-story-stage-movement.tsx`.
   - Wire `MOVEMENT_NODES[audience]` and `getMovementNetwork`.
   - Default node count via `movementNodeCount` state in the shell.

5. **Connect audience-aware node labels.**
   - Verify all four audience variants render correctly at counts 5, 25, 60, 100.
   - Confirm seed nodes (including the five named leaders) are always present when count > 0.

6. **Add node-count dial and scaling logic.**
   - Styled range slider with tick marks and numeric readout.
   - Debounced GSAP tween transitions on node/edge changes.
   - URL sync `?nodes=42` through the shell.

7. **Polish animation and reduced-motion fallbacks.**
   - Verify `prefers-reduced-motion: reduce` short-circuits every stage's motion.
   - Verify mobile layouts (stack infra cards 1×4, shrink movement canvas, hide dial if width < 360px or render as number input).
   - Verify keyboard accessibility on the dial (`aria-valuemin/max/now`, arrow-key stepping).

8. **Remove placeholder logic and old terminology.**
   - Delete the `#stage-movement` placeholder block and its "narrative TBD" copy.
   - Remove any remaining references to `seminary` in copy (keep in the URL-param parser as a back-compat alias).
   - Update `<title>` and `<meta description>` in [`fragmentation/page.tsx`](../../src/app/(site)/fragmentation/page.tsx) to mention Movement.

Once these steps are complete, the React route matches the canonical six-stage narrative, carries the dual-intelligence model visually as well as editorially, and gives Movement the full-stage visual treatment that makes the page feel finished rather than paused at stage five.
