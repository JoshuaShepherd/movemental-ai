# Step 7 — AI agent specification template

Define **3–6** agents. Each agent gets its own copy of the block below.

---

## Agent roster overview

| Agent key | Mission (6–10 words) | Primary user | Model posture |
|-----------|----------------------|--------------|---------------|
| | | | fast / reasoning / hybrid |
| | | | |
| | | | |

**Escalation graph (when Agent A hands to B):**


---

## Agent template (duplicate per agent)

### Agent key / display name


### One-sentence mission


### Primary users + permissions


### Inputs (sources)

- User message / UI context:
- Supabase tables (read/write):
- Storage objects:
- Webhooks / jobs:
- External APIs (if any):

### Tools (explicit)

| Tool | Read/Write | Tenant scope | Idempotency | Failure UX |
|------|------------|--------------|-------------|------------|
| | | | | |

### RAG policy

- Corpus / collections:
- Chunking / metadata strategy (conceptual):
- **Citation rules** (required format):
- When to refuse / defer to human:

### Voice baseline

- Tone:
- Taboo phrases:
- Structure of responses (bullets vs prose):

### Safety / PII / compliance

- PII handling:
- Redaction rules:
- Human-in-the-loop triggers:
- Logging boundaries (what never logs):

### Evaluation (demo-grade)

| Scenario | Expected behavior | Pass/fail signal |
|----------|-------------------|------------------|
| | | |
| | | |

### Cost / latency guardrails

- Max tokens / turns:
- When to use cheaper model:
- Caching strategy (if any):
