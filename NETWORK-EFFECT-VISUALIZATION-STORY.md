# Network Effect Visualization — Story & Design (why-movemental-final)

**Purpose:** Design and narrative decisions for the scroll-driven network panel on the final Why Movemental page. The panel shows the scenius—the collective credibility network—and will sit **near first** in the final page order.

**Context:** See `_docs/` (product reframe, book ch. 8 scenius, scroll-driven panel spec, reflected-understanding). Current implementation: `SceniusVisualization` + `network-data.ts` (Alan → tiers 0–12, ~100 nodes; known authors tiers 0–4, mock nodes 5–12).

---

## 1. Circles: Headshots vs on-brand illustrations

**Option A — Writer headshots (current direction)**  
- **Pros:** Real people, instant credibility, “these are the actual voices.” Click → modal with name, role, bio reinforces that this is a *verified* network. Aligns with “scenius = networks of verified humans” (ch. 8).  
- **Cons:** Need assets for every real node; mock/future nodes either stay as initials/avatars or break the metaphor. Inconsistent treatment (photo vs generated avatar) can feel like two different products.

**Option B — On-brand illustrations (similar vibe)**  
- **Pros:** One visual language for everyone; no photo dependency; “future” nodes can use the same style so the line between real and projected is purely in the data/label, not the asset. Can feel more “movement” than “rolodex.”  
- **Cons:** Less immediate “these are real leaders”; risk of feeling abstract or generic. Credibility is partly “I know that person.”

**Recommendation:**  
- **Known writers (tiers 0–4):** Prefer **headshots** where we have them. They carry the credibility signal; the modal is the payoff.  
- **Projected/future (tiers 5+):** Use **on-brand illustrations** (or a single “persona” illustration set) so the transition is clear: real faces → representative “who’s next” faces. That way we don’t pretend mock names are real people, and we still tell a persona-based story (see §3).  
- **Hybrid:** Real headshots for in-network; a small set of 3–5 illustrated “personas” (e.g. “Church planter,” “Researcher,” “Trainer”) that we reuse for future nodes, with a clear label or treatment (e.g. “Coming to the network”) so the story is “this is who joins next.”

---

## 2. Story beyond growth + progressive disclosure

The visualization already does: (1) **network growth** (one hero → many nodes on scroll), (2) **progressive disclosure** (click node → modal with writer).

**What else to tell:**

- **Credibility amplification**  
  The idea: your work doesn’t just sit next to others’; it’s *amplified* by the network—links, references, shared themes. That can be told **outside** the graph (copy above/below) and/or **inside** the UI:
  - **Number in the card:** e.g. in the modal or on a small card near the viz: “Cited by 12 network pieces” or “Connected to 8 leaders in this scenius.” Gives a concrete “credibility metric” that grows as the network grows.  
  - **In-graph signal:** Optional subtle treatment (e.g. glow, weight) on nodes/edges that “carry” the most links or references—readable as “this is where credibility concentrates.”

- **Discovery and movement**  
  Short line above or below: “Your content doesn’t just sit next to theirs—it becomes discoverable *through* them.” Ties the viz to “content that moves” (reframe doc).

- **One line in the modal**  
  For known authors, one sentence that ties them to the platform: e.g. “Part of the Movemental network” or “Content linked and discoverable with the movement.” For future nodes, “Representative of who’s next in the network.”

So: **story = growth (scroll) + who they are (modal) + credibility amplification (number/label/copy).** The number in the card is the clearest “credibility amplification” hook; we can start with a static or mock value and wire real data later.

---

## 3. Future vs existing: placeholders and the “in / projection” line

**Goal:** Once we’re past known writers (tiers 0–4), the viz clearly shows **future**—who could be in the network—without pretending they’re already in.

**Options:**

- **Placeholder treatment**  
  Future nodes (tiers 5+) look different: e.g. outline-only circle, muted color, or icon instead of photo. Label: “Coming to the network” or “Next in the scenius.” No fake names required; we can use **persona labels** (“Church planter,” “Researcher,” “Trainer”) and 2–3 short lines of persona copy in the modal so it’s “this is the kind of voice that joins.”

- **Persona-based story**  
  Don’t show 80 fake names. Show a smaller set of **persona nodes** (e.g. 6–12), each with:
  - An on-brand illustration or shared “future” asset.
  - A role/persona label (Church planter, Theologian, Trainer, etc.).
  - One line: “The kind of leader who’s next in the network” or “Where the scenius is growing.”
  - Optional: “Join as the next [persona].”

- **Clear “in” vs “projection”**  
  - **In:** Real names, headshots (where we have them), “In the network” or “Part of the Movemental scenius” in modal.  
  - **Projection:** Persona nodes or clearly labeled “Representative of who’s next”; no real names, or “Name TBD” if we keep some mock names for layout density.  
  Visual distinction (e.g. solid fill + photo vs outline + illustration) + one line of copy in the modal or in a legend: “Solid = in the network today. Outlined = the kind of voice joining next.”

**Recommendation:**  
- Known (0–4): real nodes, headshots, “In the network” in modal.  
- Future (5+): **persona-based** nodes (fewer, with role + one line of story); on-brand illustration or shared asset; label/legend: “Who’s next in the scenius.” That keeps the story about *kinds* of leaders and avoids implying 80 specific people are already signed on.

---

## 4. Story around, through, above, below the visualization

**Above (intro):**  
- Set the stakes in one line: e.g. “Credibility in the AI age doesn’t come from going viral. It comes from being part of a **network of verified voices**.”  
- Optional second line: “The scenius behind the missional movement—and who’s next.”  
- So the reader knows: this is about *credibility through connection*, not follower count.

**Through (the scroll):**  
- The scroll *is* the story: one voice → connected to another → then to many. The graph is “credibility as a network.” No need to over-narrate; optional short step labels (e.g. “Connected voices,” “Growing scenius”) only if they add clarity.

**Below (payoff):**  
- One or two sentences: “Your content doesn’t sit alone. It becomes discoverable through this network—linked, referenced, and amplified by trusted peers.”  
- Optional: “The number next to each voice will grow as more content and links are added—that’s credibility amplification in real time.” (If we add the number-in-card.)

**Lateral (if we add a legend or key):**  
- “In the network today” vs “Who’s next” (if we do persona-based future).  
- Optional: “Click a node to see their role and how they’re connected.”

**Through-line:**  
*Individual credibility is fragile; scenius is the solution. This is that scenius—who’s in it, how it grows, and how your work gets amplified when you’re part of it. The visualization shows the “who”; the copy and the number (if we add it) show the “so what.”*

---

## 5. Placement: near first in why-movemental-final

- The reframe doc and book argue **lead with the problem** (“content doesn’t move”) then **solution** (discoverable, connected, credible). The network viz is the **solution made visible**—relational credibility, not just claims.  
- Putting it **near first** (e.g. after a short hero or one intro block) means: we show the scenius before we talk playbook, linking, or cost. So the order could be:  
  1. Short hero (thesis: content that moves / credibility through network).  
  2. **Network effect visualization** (this panel).  
  3. Rest of why-movemental (playbook, linking, layering, cost, etc.).  

- That way the “why” is: you’re not building in isolation; you’re joining *this*—and here’s what “this” looks like.

---

## 6. What else?

- **Data strategy:**  
  - Known nodes: keep real names, bios, roles; add optional “cited by N” / “connected to N” when we have data.  
  - Future: replace mock names with persona nodes (fewer, with role + one-line story) and shared illustration set.

- **Accessibility:**  
  - Ensure node labels and modal are keyboard- and screen-reader friendly; “In the network” vs “Who’s next” in copy, not only in color.

- **Performance:**  
  - If we reduce future nodes to personas (e.g. 6–12 instead of 80), the graph is simpler and the “future” story is clearer.

- **Copy hooks to draft:**  
  - Hero above: “Credibility through connection, not clicks.”  
  - Below: “Your content, discoverable through the people who already trust you.”  
  - Modal (known): “Part of the Movemental network—content linked and discoverable with the movement.”  
  - Modal (persona): “The kind of voice joining the scenius next.”

- **Open questions:**  
  - Do we want a single “You could be here” node (e.g. outlined “Your voice” that links to CTA)?  
  - Do we add the “cited by N” / “connected to N” in v1 or as a follow-up when we have real data?  
  - Final order of why-movemental-final sections once this is “near first” (hero → network → playbook → …).

---

**Summary**

| Topic | Direction |
|-------|-----------|
| Circles | Headshots for known writers; on-brand illustrations or persona set for future. |
| Story beyond growth | Credibility amplification via number in card + copy above/below; “content that moves through the network.” |
| Future vs existing | Persona-based future nodes; clear “in the network” vs “who’s next”; legend + modal copy. |
| Story arc | Above: credibility through network. Through: scroll = growth of scenius. Below: amplification, discoverability. |
| Placement | Near first in why-movemental-final, after short hero. |
| What else | Persona nodes reduce mock clutter; “You could be here” and “cited by N” left as open decisions. |
