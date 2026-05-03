# Nine-step process framework — reference

This document expands the **nine-step** method used by the Platform Demo Architect (Claude skill + Custom GPT). It includes **signals of done-ness** and **anti-patterns**.

---

## Step 1 — Audience definition and intelligence gathering

### Outcomes

- Named **roles** (economic buyer, champion, daily user, blocker).
- A **JTBD** statement in the audience’s vocabulary.
- **Constraints** that will not move (compliance, procurement, brand, languages, regions, integrations).
- A **proof culture** map: what evidence they treat as real.
- Ranked **failure modes** and realistic **alternatives**.
- A crisp **demo win condition**.

### Done when

You can write a **one-paragraph audience brief** without hedging, and the user agrees it matches reality.

### Anti-patterns

- “Enterprise leaders” with no department or buying path.
- JTBD that is really a feature list (“they need dashboards”).

### Example (compressed)

> **Buyer:** CFO + CIO joint sponsor for a mid-market manufacturer (400–2k employees). **Users:** plant managers + quality leads daily; IT security weekly. **JTBD:** reduce unplanned downtime attribution errors in 90 days. **Proof:** reference calls + live pilot on one line + SOC2 Type II. **Win:** click from alert → RAG-sourced root-cause hypothesis with cited work orders — in under 3 minutes on a cold laptop.

---

## Step 2 — Unique problem thesis

### Outcomes

- **Thesis sentence** (mechanism, not slogan).
- **Three claims** the product must prove in the demo world.
- **Falsifiers** — what would prove you wrong?

### Done when

A skeptical operator reads the thesis and says: **“That’s us, specifically.”**

### Anti-patterns

- “AI will make them more productive.”
- “Single source of truth” with no data-shape specificity.

### Example (compressed)

> **Thesis:** Downtime postmortems fail because signal lives across CMMS, MES, and chat — not because teams lack effort. **Claims:** (1) 80% of RCA time is retrieval, not reasoning. (2) The fastest wins come from **scoped** RAG + permissions, not bigger models. (3) If citations aren’t machine-checkable, floor staff will ignore the system. **Falsifier:** if median RCA time doesn’t move after structured ingestion + RLS-scoped retrieval, the thesis is wrong.

---

## Step 3 — Capability mapping (existing vs audience needs)

### Outcomes

A table:

| Audience need | Capability | Posture | Primary surface | Proof |
|---------------|------------|---------|-----------------|-------|
| … | reuse / extend / net-new | … | marketing / app / admin / agent | … |

### Must explicitly cover

- **RLS** and tenant isolation story
- **PII** and retention posture
- **Stripe vs Shopify** ownership (who is merchant of record, what’s subscription vs SKU)
- **Resend** triggers (who gets what, when, and why)

### Anti-patterns

- “We’ll integrate with everything.”
- Security as a single bullet (“secure”).

---

## Step 4 — Platform personality and theming

### Outcomes

- Voice rules (banned phrases, required cadence, reading level if relevant)
- Visual system: **density**, **motion**, photography vs illustration
- **Token strategy** (semantic colors; dark regions only where justified)
- Accessibility bar (WCAG target; keyboard-first flows for critical paths)
- **Never do this** list (brand + UX + AI safety)

### Anti-patterns

- Mood boards without **decision rules**.
- Per-page hex palettes that break tenant theming.

---

## Step 5 — Page-by-page blueprint (post-LOCK)

### Outcomes

- Full **sitemap** with routes as paths.
- Per route: **purpose**, **primary CTA**, **auth + RLS posture**, **entities**, **integrations**.

### Anti-patterns

- Orphan routes with no CTA or no owner.
- “Admin” as a junk drawer without workflows.

---

## Step 6 — Component-level template (post-LOCK)

### Outcomes

For each major page:

- Layout **regions**
- **Components** with prop-level intent
- Critical **empty / loading / error** states
- **Telemetry** for pilot learning (events, not vanity counts)

### Anti-patterns

- Components named after widgets (“DashboardWidget2”).
- Missing empty states on data-heavy surfaces.

---

## Step 7 — AI agent customization (post-LOCK)

### Outcomes

**3–6** agents, each with:

- Mission (one sentence)
- Inputs (user, files, DB, webhooks)
- Tools (read vs write; side effects)
- Tenant scope + RLS assumptions
- Model posture (fast vs reasoning; escalation rules)
- Voice baseline + RAG citation rules
- Safety: PII minimization, HITL gates, logging red lines

### Anti-patterns

- One “do everything” agent.
- RAG without citation discipline or without failure behavior.

---

## Step 8 — Validation and proof layer

### Outcomes

- **Pilot metrics** (3–5) tied to thesis
- **Demo script** (10–15 minutes) with ordered clicks
- **Compliance** checklist (even if short: data residency, retention, audit logs)
- **Test plan sketch**: RLS matrix, Stripe/Shopify test mode, Resend sandbox, agent evals

---

## Step 9 — Implementation plan

### Outcomes

Phased epics with:

- **Outcome** per epic
- **Dependencies** (hard ordering)
- **Cut lines** if schedule slips

### Default epic order

1. Tenant shell + auth + RLS scaffolding  
2. Data model + migrations + policies  
3. Marketing surfaces + `tenant.config.ts`  
4. Commerce boundary (Stripe vs Shopify)  
5. Resend flows  
6. Agents + RAG + voice + eval harness  
7. Hardening + pilot instrumentation  

---

## LOCK / UNLOCK rules

- **LOCK** means Steps 1–4 summaries are treated as authoritative for Steps 5–7.
- **UNLOCK** only when the user explicitly revises a prior step; then **re-LOCK** before regenerating downstream artifacts.
