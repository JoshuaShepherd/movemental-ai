# Why Movemental vs How It Works — Reframe & Show > Tell

**Purpose**: Audit current pages, propose narrative starts and transitions, design show-don’t-tell UI modules, and document implementation.

**Thesis to lead with**: *"You already have transformative content. The problem is your content does not MOVE."*

**Differentiation**: credibility in the AI age, scenius/networked credibility, content that moves (discoverable, connected, legible, compounding), formation over virality.

---

## 1. Current inventory

### 1.1 Route paths + primary components + where copy lives

| Page | Route | Primary component | Copy location |
|------|--------|-------------------|----------------|
| Why Movemental | `/why-movemental` | `WhyMovementalContainer` | Inline in `components/why-movemental/WhyMovementalContainer.tsx` |
| How It Works | `/how-it-works` | `OnboardingPathContainer` | Hero/CTA inline in onboarding-path components; phases in `lib/schemas/onboarding-path.ts` |

**Why Movemental**  
- **Route**: `app/(public)/why-movemental/page.tsx` (metadata only; renders `<WhyMovementalContainer />`).  
- **Components**: `ScrollProgress`, `SectionNav`, `NarrativeSection`, `NarrativeStatement`, `PullQuote`.  
- **Copy**: All narrative text is inside `WhyMovementalContainer.tsx` (no separate copy file).

**How It Works**  
- **Route**: `app/(public)/how-it-works/page.tsx` → `OnboardingPathContainer`.  
- **Components**: `OnboardingHero`, `Timeline` / `TimelineHorizontal`, `PhaseCard`, `OnboardingCTA`.  
- **Copy**: `OnboardingHero.tsx` (hero), `OnboardingPathContainer.tsx` (“What Makes This Different” + section headers), `lib/schemas/onboarding-path.ts` (phase titles, descriptions, activities).

### 1.2 Section-by-section (render order)

**Why Movemental**

| Section | id | Background | Content summary |
|---------|-----|------------|------------------|
| 1. Intro | `intro` | dark | “The problem is not that movement leaders lack transformative content.” → “The problem is that their content does not move.” |
| 2. Part I | `problem` | default | Definition of “move” (circulate, connect, compound, carry credibility). Pull quote (content locked in formats). Four structural reasons (offline, siloed, not legible, not linked). “Historical constraints—not personal failures.” |
| 3. Part II | `shift` | muted | “Built for a specific kind of leader.” For you / not for you two-column. “We are trying to serve you well.” |
| 4. Part III | `solution` | default | “Relational credibility network.” Discoverable, trusted peers, AI as translation layer. Book → living content vignette. |
| 5. Stewardship | (none) | dark | “Time returned.” Three outcomes: Ownership, Sustainability, Connection. |
| 6. Outro | `outro` | default | “Movemental exists to help content that matters find the people it was made for.” CTAs: Fit Check, AI Vision. |

**How It Works**

| Section | id | Content summary |
|---------|-----|------------------|
| Hero | — | “Your Path to Platform Launch.” 3–4 weeks. Four phase pills (Discovery, Research, Architecture, Launch). Benefits: movement-first, evidence-based, launch-ready. CTAs: Start Your Journey, Explore the Phases. |
| Phases | `phases` | “Four Phases to Launch.” Horizontal timeline + vertical expandable phase cards (Discovery & Vision, Content Research, Platform Architecture, Network & Launch). |
| What Makes This Different | — | Six cards: Movement-First, Evidence-Based, Launch-Ready, Network Effects, Owned Not Rented, AI-Amplified. |
| CTA | — | “Ready to Begin?” Schedule discovery call / Ask a question → links to `/contact`. |

### 1.3 What’s strong vs misaligned

**Why Movemental — strong**  
- Intro already states the “content does not move” thesis clearly.  
- Section nav + scroll progress support long-form reading.  
- Typography system (`NarrativeStatement`, `PullQuote`, `NarrativeSection`) is consistent.  
- Four structural reasons map well to “content that moves” (offline → siloed → not legible → not linked).

**Why Movemental — misaligned**  
- Opening is two text statements only; no visual “first 10 seconds.”  
- No bridge to How It Works; user must use global nav.  
- Part I is copy-heavy; “four structural reasons” could be reinforced with a small diagnostic visual.  
- No show-don’t-tell modules (e.g. content movement spectrum, credibility network, content system map).

**How It Works — strong**  
- Phases and timeline are clear and scannable.  
- “What Makes This Different” reinforces differentiation.  
- CTA is visible.

**How It Works — misaligned**  
- Hero leads with “Platform Launch,” not “how we get your content to move.”  
- No explicit handoff from Why (“you’ve seen the problem — here’s the path”).  
- No opening that ties “content that moves” to the four phases.  
- `/contact` is linked but route does not exist (broken link).

---

## 2. Proposed narrative options

### 2.1 Why Movemental — opening (first 10 seconds)

**Option A — Single line + visual**  
- One line: “Your content is transformative. It doesn’t move.”  
- Immediately below: Content Movement Diagnostic (spectrum: offline → siloed → unstructured → unlinked → moving).  
- Rationale: States thesis and shows the problem in one glance.  
- Keep: Dark intro block. Move: Second sentence into the visual label or subline. Remove: Second full sentence as separate line. Collapsible: None here.

**Option B — Question first**  
- “What if your best work is already written—but the world can’t find it?”  
- Then: “The problem isn’t more content. It’s that your content doesn’t move.”  
- Rationale: Question creates identification; second line delivers thesis.  
- Keep: Both lines. Add: Small diagnostic or icon row. Collapsible: Definition of “move” (current Part I opener).

**Option C — Keep current, add visual**  
- Keep current two-sentence intro as-is.  
- Add Content Movement Diagnostic directly below.  
- Rationale: Minimal change; visual does the “show.”  
- Keep: Everything. Add: One module. Collapsible: None in opening.

**Recommendation**: **Option A** for strongest “show”; Option C if you want zero copy change.

### 2.2 Handoff from Why → How It Works

**Option A — Outro CTA block**  
- In Why outro, add a second CTA: “See how we get you there” → `/how-it-works`.  
- Short line: “From fit to launch in 3–4 weeks.”  
- Rationale: Clear next step without changing section order.

**Option B — Dedicated bridge section**  
- New section before Why outro: “So how does it work?” One short paragraph + button to How It Works.  
- Rationale: Explicit narrative bridge; more space to set expectations.

**Option C — Nav-only**  
- Rely on main nav (Why Movemental / How It Works). No new copy.  
- Rationale: Minimal; no duplication.

**Recommendation**: **Option A** (add “See how it works” in Why outro). Option B if you want a full bridge section.

### 2.3 How It Works — opening (first 10 seconds)

**Option A — “From why to how” line**  
- Above or inside hero: “You’ve seen the problem. Here’s the path.”  
- Subline: “Four phases to make your content discoverable, connected, and moving.”  
- Keep current hero (time, phases, CTAs).  
- Rationale: Connects to Why without rewriting the hero.

**Option B — Reframe hero headline**  
- Headline: “From content that’s stuck to content that moves.”  
- Subline: “A 3–4 week path to a platform that reflects your voice and connects to the movement.”  
- Rationale: Puts “content that moves” in the first line.

**Option C — Short bridge section then hero**  
- New section: one sentence (“We get you from fit to launch in four phases.”) + Content System Map (books → articles → courses → network).  
- Then existing hero.  
- Rationale: Show the end-state (content system) before the process.

**Recommendation**: **Option A** (one line + subline) for minimal change and clear continuity from Why.

---

## 3. Proposed “show > tell” UI modules

### 3.1 Content Movement Diagnostic

- **Name**: Content Movement Diagnostic  
- **Where**: Why Movemental — opening (right after intro statements).  
- **Data model** (static):

```ts
// types or inline
const STAGES = [
  { id: 'offline', label: 'Offline', short: 'Not online', description: 'Books, talks, notes that aren’t digitized or searchable.' },
  { id: 'siloed', label: 'Siloed', short: 'Scattered', description: 'Content lives in many places, no single home.' },
  { id: 'unstructured', label: 'Unstructured', short: 'Unreadable by systems', description: 'Search and AI can’t reliably find or use it.' },
  { id: 'unlinked', label: 'Unlinked', short: 'No credibility network', description: 'Not connected to peers or trusted contexts.' },
  { id: 'moving', label: 'Moving', short: 'Discoverable & connected', description: 'Finds the right people and compounds over time.' },
]
```

- **Interaction**: Horizontal spectrum (steps or segments). Optional: click/tap for short description (tooltip or small expand).  
- **Implementation**: Single client component, e.g. `components/why-movemental/ContentMovementDiagnostic.tsx`. Use `div` + Tailwind (flex, borders, badges). Optional: `Tooltip` or inline expand. No new shadcn parts required; Card/Badge if desired.

### 3.2 Scenius credibility network (simplified)

- **Name**: Scenius Credibility Network  
- **Where**: Why Movemental — Part III (solution), or How It Works “What Makes This Different.”  
- **Data model** (static):

```ts
const NODES = [
  { id: 'you', label: 'Your work', type: 'leader' },
  { id: 'a', label: 'Peer A', type: 'peer' },
  { id: 'b', label: 'Peer B', type: 'peer' },
  { id: 'c', label: 'Peer C', type: 'peer' },
]
const LINKS = [
  { from: 'you', to: 'a' }, { from: 'you', to: 'b' }, { from: 'a', to: 'b' }, { from: 'b', to: 'c' },
]
```

- **Interaction**: Static or hover: highlight node + its connections. Tabs optional (e.g. “Your content” / “With Movemental”).  
- **Implementation**: `components/why-movemental/SceniusCredibilityViz.tsx`. SVG or div-based “bubbles” + lines; state for highlighted node. Tailwind + maybe `Card` for legend.

### 3.3 Content system map (books → articles → courses → network)

- **Name**: Content System Map  
- **Where**: How It Works — above or below hero, or as “What you get” section.  
- **Data model** (static):

```ts
const CONTENT_NODES = [
  { id: 'books', label: 'Books', description: 'Chapters & ideas surface in search' },
  { id: 'articles', label: 'Articles', description: 'Essays linked to your themes' },
  { id: 'courses', label: 'Courses', description: 'Structured learning from your content' },
  { id: 'network', label: 'Network', description: 'Connected to trusted leaders' },
]
const EDGES = [ { from: 'books', to: 'articles' }, { from: 'articles', to: 'courses' }, { from: 'courses', to: 'network' }, ... ]
```

- **Interaction**: Horizontal or grid; arrows between nodes. Optional: accordion per node with one line of copy.  
- **Implementation**: `components/how-it-works/ContentSystemMap.tsx`. Flex/grid + arrows (SVG or CSS). Optional: Collapsible or Accordion for “Learn more” per node.

### 3.4 Trust signals panel (human-centric)

- **Name**: Trust Signals Panel  
- **Where**: Why Movemental (Part III or stewardship) or How It Works (differentiation).  
- **Data model** (static):

```ts
const TRUST_SIGNALS = [
  { icon: 'voice', title: 'Your voice', detail: 'AI reflects your actual body of work' },
  { icon: 'peers', title: 'Peers, not ads', detail: 'Credibility through connection, not promotion' },
  { icon: 'ownership', title: 'You own it', detail: 'Your platform, audience, and data' },
]
```

- **Interaction**: Row of cards or icon + title + short detail. Optional: tabs or accordion for “Why this matters.”  
- **Implementation**: `components/why-movemental/TrustSignalsPanel.tsx`. Card grid; icons (lucide-react). No heavy animation.

### 3.5 Before/after discovery (mini simulation)

- **Name**: Before/After Discovery  
- **Where**: Why Movemental — Part I (problem) or after diagnostic.  
- **Data model** (static): Two states — “Before”: one search query, few or no results from leader; “After”: same query, result from leader’s content + source label.  
- **Interaction**: Tabs “Before” / “After” or toggle. Simple side-by-side.  
- **Implementation**: `components/why-movemental/BeforeAfterDiscovery.tsx`. Two panels; optional Tabs (custom or state). Static copy for “query” and “results.”

---

## 4. Implementation plan and file map

### 4.1 Chosen options (for this implementation)

- **Why opening**: Option A — single line + Content Movement Diagnostic.  
- **Handoff**: Option A — add “See how it works” CTA in Why outro.  
- **How opening**: Option A — “You’ve seen the problem. Here’s the path.” + subline in hero area.  
- **Modules to implement first**: (1) Content Movement Diagnostic, (2) Trust Signals Panel and/or Content System Map (at least two total).

### 4.2 File map

| Action | File |
|--------|------|
| Report | `_docs/product/why-vs-how-reframe.md` (this file) |
| New component | `components/why-movemental/ContentMovementDiagnostic.tsx` |
| New component | `components/why-movemental/TrustSignalsPanel.tsx` and/or `components/how-it-works/ContentSystemMap.tsx` |
| Integrate diagnostic | `WhyMovementalContainer.tsx`: intro section |
| Integrate trust signals | `WhyMovementalContainer.tsx`: Part III or stewardship |
| Outro CTA | `WhyMovementalContainer.tsx`: add link to `/how-it-works` |
| How hero | `OnboardingHero.tsx`: add bridge line + subline (or wrapper) |
| Optional bridge component | `components/how-it-works/HowItWorksBridge.tsx` (if using wrapper) |
| Broken link | `OnboardingCTA.tsx`: `/contact` → `/fit-check` (or future contact route) |
| Exports | `components/why-movemental/index.ts`; create `components/how-it-works/index.ts` if new folder |

### 4.3 Order of work

1. Add `ContentMovementDiagnostic` and data; mount in Why intro.  
2. Add `TrustSignalsPanel` (and/or `ContentSystemMap`); mount in Why Part III.  
3. Reframe Why intro to one line + diagnostic; add “See how it works” in outro.  
4. Add bridge line + subline to How It Works hero.  
5. Fix OnboardingCTA `/contact` → `/fit-check`.  
6. Smoke-test both pages and nav; fix any other broken links found.

---

## 5. Post-implementation checklist

- [ ] Why Movemental: opening is one line + diagnostic; SectionNav still works.  
- [ ] Why Movemental: Trust Signals (or Content System Map) in solution/stewardship.  
- [ ] Why Movemental: outro includes “See how it works” → `/how-it-works`.  
- [ ] How It Works: hero has “From why to how” line and subline.  
- [ ] How It Works: no links to `/contact` (or contact route exists).  
- [ ] No new heavy animation libs; client components only where needed.  
- [ ] New components under `components/why-movemental/` and `components/how-it-works/` as above.
