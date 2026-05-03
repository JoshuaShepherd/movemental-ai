---
title: "PII and Nonprofits: How to Build a Private Agentic RAG System Without Handing Donor Data to Any Tech Company"
slug: nonprofits-pii-private-agentic-rag
shape: ai-note
author: Josh Shepherd
audience: [nonprofit]
topics: [ai-governance]
---
# PII and Nonprofits: How to Build a Private Agentic RAG System Without Handing Donor Data to Any Tech Company

The single most consequential question facing nonprofits adopting AI is not *what model should we use*. It is *where does our data actually go when we use it*. For a nonprofit, that question is unusually heavy. The data you hold is not just commercially sensitive — it is fiduciary. Donor records, beneficiary intake, minor enrollments, immigration information, medical history, religious affiliation, political giving patterns, addresses of people fleeing abuse — this is the kind of data whose breach does not just cost money, it destroys the trust that the organization was built on.

And yet the dominant pattern in current AI adoption — pasting documents into ChatGPT, dropping a CRM export into a chat window, pointing an off-the-shelf assistant at a shared drive — sends exactly that data, in plaintext, to the servers of a third-party tech company. Even when the company promises not to train on it, the data has crossed a boundary that most nonprofit boards would never have authorized had they understood the architecture.

This article walks through how to do this properly. It is written for the executive director or operations lead who has a developer (in-house or contracted) and is trying to decide what is actually safe and what is theater. It covers four things:

1. What counts as PII for a nonprofit and why the category is wider than most leaders realize.
2. The threat model — exactly where data leaks in a typical AI build, including during the build itself.
3. How to develop with AI agents (Claude Code, Cursor, etc.) on a real codebase without ever exposing real donor data.
4. How to deploy a production agentic RAG system that gives your team genuine AI capability while keeping every byte of PII inside your boundary.

There is a clean architecture that achieves all of this. The hard part is discipline, not technology.

---

## Part 1: What PII Actually Means for a Nonprofit

The traditional definition of personally identifiable information — name, address, email, phone, SSN, credit card — covers only the obvious surface. Nonprofits routinely hold several broader categories that legally and ethically qualify as sensitive data, and that need to be handled with the same (or greater) care.

**Direct identifiers.** Names, addresses, phone numbers, email addresses, donor IDs, account numbers, payment card data (subject to PCI DSS 4.0, mandatory as of March 31, 2025), Social Security or tax ID numbers.

**Financial PII.** Donation history, pledge schedules, recurring gift amounts, capital campaign commitments, donor advised fund affiliations. In the United States, IRS Form 990 requires public disclosure of the largest donors only in narrow contexts; everything else is private and a leak is reportable in many states.

**Sensitive categories (special category data under GDPR; analogous protections elsewhere).** Religious affiliation, political opinions, racial or ethnic origin, sexual orientation, health status, immigration status, biometric data, criminal history. Mission-driven nonprofits routinely hold this kind of data because it is mission-relevant — a faith-based organization holds religious affiliation by definition, a refugee services agency holds immigration status by definition, a healthcare nonprofit holds protected health information governed by HIPAA.

**Minor data.** Any record involving someone under 18 carries elevated obligations under COPPA in the United States and similar regimes elsewhere. Youth-serving organizations are sitting on what is, from a regulatory standpoint, the most sensitive data in their files.

**Educational records.** If your nonprofit operates educational programs, student data may be subject to FERPA. Even when not formally subject, it should be treated with FERPA-like care.

**Beneficiary intake and case notes.** Whatever your CRM or case management system stores about the people you serve — including narrative case notes — is almost always more sensitive than donor data. In a breach, this is the data that does the most human harm.

**Internal staff PII.** HR records, performance reviews, compensation data, background checks. Less mission-critical to the public but a major liability.

**Indirect identifiers and quasi-identifiers.** A combination of fields that can re-identify a person even after direct identifiers are stripped — date of birth + ZIP code + gender, for example, can re-identify the majority of US adults. Naive anonymization does not solve this.

**Relational metadata.** Who introduced a donor to the organization, who attends which events together, who is connected to whom on the board. This is rarely classified as PII in formal policy, but in practice it is — and a leak of the *connection graph* of a major-donor file would do enormous reputational damage even without disclosing names.

The compliance landscape that governs this data, as of early 2026, includes at least: CCPA/CPRA (California), CDPA (Virginia), CPA (Colorado), CTDPA (Connecticut), TDPSA (Texas), and active comprehensive privacy laws in roughly twenty US states; GDPR for any EU data subject regardless of where your nonprofit is based; HIPAA for protected health information; FERPA for educational records; PCI DSS 4.0 for payment data; and the IRS rules governing donor disclosure on Form 990. Your specific obligations depend on where your data subjects live, not where your nonprofit is incorporated.

The practical implication: the working assumption should be that almost everything in your CRM, your case management system, your donor research files, your inboxes, and your shared drives is PII or contains PII. Plan accordingly.

---

## Part 2: The Threat Model — Where Data Actually Leaks

Before designing a private system, it helps to be precise about where leaks happen in a typical AI-enabled nonprofit. There are five distinct leak points, and most organizations are exposed at all five.

**Leak point 1: Consumer AI tools.** Staff paste donor names, gift histories, case notes, and intake forms into ChatGPT, Claude.ai, or Gemini to "help me draft a thank-you" or "summarize this." MIT's 2025 GenAI Divide report found that 90% of workers use personal AI tools daily for work tasks while only 40% of organizations have official subscriptions. The shadow AI economy is very real, and in nonprofits it is the single largest source of unauthorized PII transmission.

**Leak point 2: Cloud AI APIs called from official tools.** An "AI feature" added to your CRM or a custom assistant built by a vendor often calls OpenAI, Anthropic, or Google APIs in the background. Even when the vendor says "we don't store the data," your data is still transiting and being processed by a third-party tech company. Whether that is acceptable depends on the contractual terms — and most boards have never read those terms.

**Leak point 3: Development tooling.** When your developer (in-house or contracted) uses Claude Code, Cursor, GitHub Copilot, or any similar agent to work on the codebase, those tools may send file contents, code, and any data fixtures to the underlying model provider. If your developer is "just testing with a real export," that export may have been transmitted to a third party. This leak vector is almost never on anyone's policy radar.

**Leak point 4: Logging and observability.** AI applications generate enormous logs. Prompts, completions, retrieved chunks, tool calls, errors. If these logs are sent to a third-party observability service (LangSmith, Helicone, generic APM tools) without scrubbing, PII flows out through telemetry rather than through the primary API.

**Leak point 5: The training data question.** Even when a provider promises "we do not train on your data," the contractual surface around that promise matters. Default consumer terms differ from enterprise terms differ from BAA-covered terms. Some providers offer Zero Data Retention (ZDR) on specific endpoints; others retain inputs for 30 days for abuse monitoring even when not training on them. The contract is the architecture.

The two principles that follow from this threat model are simple to state and demanding to follow:

1. **Minimize what crosses the boundary.** The smallest amount of PII that leaves your environment is the safest amount. The ideal amount is zero.
2. **Control what does cross.** Where data must leave (e.g., a frontier model call), it crosses through a deliberate, audited, contractually governed channel with redaction in front and logging discipline behind.

Everything that follows is an application of those two principles.

---

## Part 3: Developing With Agents Without Exposing Real Data

Most articles about private AI jump straight to production architecture. This is a mistake. The largest single leak in most nonprofit AI projects happens during development, when a developer points Claude Code or Cursor at the codebase and starts iterating with "real" data because synthetic data was inconvenient to generate.

The discipline here is unglamorous and absolute.

### Synthetic data for development

Before any AI-assisted coding begins, generate a synthetic dataset that mirrors the schema and statistical shape of the real data, but contains no real records. There are three ways to do this, in order of preference for nonprofit contexts:

1. **Schema-faithful synthetic data.** Use a tool like Faker (Python), Mimesis, or a custom generator to produce realistic but invented donors, gifts, addresses, case notes, and intake records. The synthetic dataset matches every column in your real schema, has realistic value distributions (so AI-generated queries hit the same edge cases), and can be checked into a private repo or stored in a dev environment without legal risk.

2. **Differentially private synthetic data.** For more sophisticated use cases — for example, when you need the AI to reason about distributional patterns that mirror your real data — use a synthesizer that generates data drawn from the real distribution while providing formal differential privacy guarantees. Tools like SmartNoise (also from Microsoft) and a number of open synthesizers can do this. Higher complexity, much stronger privacy properties.

3. **Aggressively redacted real data.** As a fallback when synthetic generation cannot capture some specific characteristic of the real data, take a small sample, run it through a redaction pipeline (described below), and use the redacted output in dev. Even here, treat the redacted file as sensitive and never check it in.

The non-negotiable rule: real, unredacted PII never enters the development environment. Period. No "I'll just test with this one export." That one export is the breach.

### Environment separation

A clean nonprofit AI project has at least three environments, with hard boundaries between them:

- **Local development.** Synthetic data only. Developer's machine. Agents like Claude Code can be used freely against the codebase and synthetic fixtures.
- **Staging.** Either synthetic data or differentially private synthetic data drawn from production patterns. Mirrors production architecture but is not connected to real PII stores.
- **Production.** Real data. Locked down. Access requires explicit credentials, MFA, audit logging, and a clear legitimate purpose. AI agents do not have access to production data during development sessions.

The `.env` discipline that supports this:

- `.env.local` for the developer's local synthetic-data environment.
- `.env.staging` for staging.
- `.env.production` exists only on the production server, never on a developer's machine, never in any chat with an AI agent.

If your developer has a shell open with production credentials loaded and is also running Claude Code in another window, you have a leak waiting to happen. The discipline is environment isolation.

### How to use AI coding agents safely

With these environments in place, AI coding assistants become enormously useful — and safe.

- The developer uses Claude Code, Cursor, or similar to work on the application code, schema, retrieval logic, redaction rules, prompts, and so on. The agent sees code, configuration, synthetic data, and tests. It never sees real donor records.
- For any task that requires reasoning about real data shape (e.g., "this query is failing on production"), the developer reproduces the issue in staging with synthetic data first. Only if the issue is provably production-specific does it get debugged in production — and then with no AI agent in the loop and with a tight audit log.
- Vendor tooling that processes code (Copilot, Cursor, Claude Code) should be configured under the most privacy-preserving plan available. As of early 2026, Anthropic, OpenAI, and GitHub all offer enterprise tiers with stronger contractual data terms than consumer tiers. Use them.
- Pre-commit hooks should scan for accidental commits of real data. Tools like `gitleaks`, `trufflehog`, or a custom regex for your CRM ID format catch the obvious mistakes before they leave the developer's machine.

This discipline is not theoretical. Most nonprofit AI breaches that I have seen in practice happen during development, not production. Solving for production while leaving development unprotected is solving the wrong half of the problem.

---

## Part 4: The Production Architecture — A Private Agentic RAG Stack

Now to the core architectural question: how do you build an agentic RAG system that is genuinely useful — that can answer questions about your actual donors, retrieve from your actual case files, draft in your actual voice — without sending your data to OpenAI, Anthropic, Google, or anyone else?

There are two viable architectures. The right choice depends on your sensitivity tolerance and your operational sophistication.

### Architecture A: Fully local (maximum privacy)

Every component runs inside your own infrastructure. No data ever leaves your boundary. This is the architecture for organizations holding the most sensitive data — health records, immigration status, minor case files, anything where you would not be comfortable explaining a third-party transmission to a court.

**Components:**

- **LLM:** A locally-hosted open-weights model. As of early 2026, the strong choices include Llama 3.x, Mistral, Mixtral, and the Qwen 2.x family, served via Ollama (easy mode) or vLLM (production-grade throughput). Hardware requirement: a single GPU server (one or two NVIDIA L40S, A100, or H100 GPUs) handles a small-to-mid nonprofit's load comfortably.
- **Embeddings:** A local embedding model — `bge-large-en-v1.5`, `nomic-embed-text`, or `e5-large`. Run via the same serving infrastructure or a dedicated embedding container.
- **Vector store:** Self-hosted. Postgres with `pgvector` is the simplest and integrates cleanly with your existing relational database. For higher scale, Qdrant, Weaviate, or Milvus, all self-hostable.
- **Document store:** Your existing database (Postgres, typically), with encryption at rest and standard backup discipline.
- **Orchestration:** A simple agent framework. LangGraph, LlamaIndex, or a custom Python application using direct SDK calls. The orchestrator runs in your environment and calls only your own services.
- **PII detection and redaction:** Microsoft Presidio (open source, self-hostable), running as a service inside your boundary. More on this below.
- **Observability:** Self-hosted (Langfuse OSS, Phoenix, or just structured logging into your existing stack). No third-party telemetry.
- **Deployment:** A small Kubernetes cluster, a single beefy server, or a private cloud (AWS, Azure, GCP) in a VPC with no egress to public LLM APIs.

**Trade-offs:** Open-weights models in early 2026 are extremely capable for retrieval-grounded tasks. They are not equivalent to frontier closed models for the hardest reasoning. For 90% of nonprofit use cases — drafting, summarization, retrieval-grounded Q&A, classification — a 70B-class open model is more than sufficient and produces output that is noticeably grounded by the retrieval rather than by raw model intelligence. Operationally, this stack requires an engineer who is comfortable running infrastructure. If you do not have that, see Architecture B.

### Architecture B: Hybrid with redaction (high privacy, frontier capability)

Some tasks genuinely benefit from frontier model capability — complex multi-step reasoning, very long-document synthesis, advanced coding agents. For those, you can keep your data inside your boundary while still calling a frontier API, by routing every outgoing call through a redaction proxy.

**Components:**

- **Redaction proxy.** A service inside your environment that sits between your application and the frontier API. Every prompt is run through PII detection (Presidio plus custom recognizers tuned to your CRM's ID formats, donor naming conventions, etc.), every detected entity is replaced with a reversible token (`[DONOR_42]`, `[ADDRESS_17]`), and the redacted prompt is sent to the model. The completion comes back, the proxy un-tokenizes the entities for internal use, and the redacted version is what is logged.
- **Contract terms.** The frontier API call is governed by an enterprise agreement with Zero Data Retention or equivalent terms, an executed Data Processing Addendum, and (if PHI is involved) a Business Associate Agreement. The major options as of early 2026:
  - Azure OpenAI Service with a signed BAA and ZDR endpoints. Azure offers the strongest contractual posture for healthcare-adjacent nonprofits.
  - AWS Bedrock with the appropriate enterprise terms and a VPC-locked configuration. Models do not train on inputs by default.
  - Anthropic's enterprise tier with ZDR. Strong contractual terms; verify current specifics.
  - Google Cloud Vertex AI with enterprise terms.
- **Everything else** — embeddings, vector store, document store, orchestration, observability — stays local exactly as in Architecture A.

**Trade-offs:** This gives you frontier capability with a much smaller PII surface area than naive direct API calls. The redaction layer is the entire safety story, so it has to be excellent: tested against your actual data formats, regularly evaluated for false negatives (PII that slipped through), and monitored for drift. The contractual terms with the frontier provider are the second half of the safety story; they need to be reviewed by counsel, not by a developer.

### What "agentic" means in this stack

In both architectures, "agentic" RAG means the system can plan, retrieve, reason, and act in multiple steps rather than answering a single retrieval-then-generation pass. For a nonprofit, the practical agent loops include:

- **Donor research agent.** Given a prospect, retrieve from the CRM, the connections graph, the institutional archive, and (optionally) approved external data sources; cross-reference; draft a brief; cite sources.
- **Drafting agent.** Given a memo prompt, retrieve relevant prior memos, board minutes, the voice/style guide, and program data; produce a draft in the organization's voice with citations.
- **Risk-surfacing agent.** Periodically scan the integrated CRM and communications archive for at-risk donor relationships, lapsing pledges, missed touchpoints, or anomalies; produce a watchlist for the development team.
- **Onboarding agent.** Answer questions from new staff against the integrated institutional archive, with citations and provenance.

In the local architecture, every step happens inside your boundary. In the hybrid architecture, only the model call leaves the boundary, and only after redaction.

---

## Part 5: The Redaction Layer in Detail

The redaction layer is the most important component in both architectures, because in the hybrid model it is your entire defense, and in the local model it is still your defense against accidental egress in logs and exports. It deserves a section of its own.

**Microsoft Presidio** is the open-source standard. It has two main components: an **Analyzer** that detects PII using a combination of named entity recognition (via spaCy or Stanza), regular expressions, checksums, and contextual rules; and an **Anonymizer** that replaces detected entities with placeholders, hashes, or encrypted tokens. It supports text, structured data, and (with extensions) images.

A production redaction pipeline for a nonprofit looks like this:

1. **Custom recognizers tuned to your environment.** Out of the box, Presidio recognizes generic entities (PERSON, LOCATION, EMAIL_ADDRESS, etc.). You add custom recognizers for the specific shapes of your data: your CRM's ID format, your donor portal's account number pattern, your case management system's intake number, your specific naming conventions. These custom recognizers are where false negatives get prevented.

2. **Reversible tokenization, not just masking.** For most internal use cases, you want the system to know that `[DONOR_42]` consistently refers to the same person across a document, and to be able to un-tokenize on the way back. Use a reversible tokenization scheme (a deterministic mapping stored in your secure environment), not a one-way redaction.

3. **Layered detection.** No single detector catches everything. Use Presidio + a regex layer for your custom formats + a small classifier for sensitive narrative content + a final human review step for the highest-stakes outputs (e.g., anything going into a public-facing channel).

4. **Continuous evaluation.** Build an evaluation set of real (carefully handled) and synthetic prompts and measure recall on PII detection on every release. False negatives are the failure mode that matters; a missed redaction is a leak. Track the rate, drive it toward zero, and treat it as a release-blocking metric.

5. **Apply redaction in both directions.** Redact before the prompt leaves your boundary. Redact before logs are stored. Redact before any output goes to a third-party observability tool. The discipline applies to every place data could exit.

6. **Treat the redaction service itself as sensitive infrastructure.** It sees everything, by definition. Run it inside your boundary, restrict access, audit it, and treat its logs with the same care as the data it protects.

LiteLLM, LangChain, LangGraph, and LlamaIndex all have integration patterns for Presidio. Pick one and standardize on it.

---

## Part 6: Observability, Audit, and Governance

A private architecture is not just about where the model runs. It is about whether you can answer, after the fact, what happened to which data when.

**Observability.** Every prompt, retrieval, tool call, and completion should be logged in a structured format inside your environment. Use Langfuse OSS, Phoenix, or a custom logging schema in Postgres. Apply the redaction pipeline before logs are written. Ensure your logging system itself has the same access controls as the underlying data.

**Audit.** For every interaction with PII-bearing data, log: who initiated the action (user ID), what data was retrieved (record IDs, not full content), which prompt template was used, which model was called, how long it took, and whether any PII was detected and redacted. This audit trail is what allows you to answer a board or regulator question six months later.

**Access control.** Different staff roles should have access to different subsets of the system. A development officer needs donor data; a program associate may not. The agent inherits the access controls of the user invoking it — never bypasses them. Row-level security in Postgres (or equivalent) is the cleanest way to enforce this.

**Governance documents.** A real nonprofit AI program produces and maintains:

- An **AI Acceptable Use Policy** — what tools staff may use, what data may be used with which tools, what the explicit prohibitions are.
- A **Data Protection Impact Assessment (DPIA)** for any new AI feature that processes PII. Required under GDPR for high-risk processing; good practice everywhere.
- A **Vendor Privacy Review** for any third-party AI service touching the system, including a review of the DPA, BAA (if applicable), data residency, retention terms, and ZDR availability.
- A **Donor and Beneficiary Privacy Notice** that discloses how AI is used. Regulators and donors increasingly expect this level of transparency.
- An **Incident Response Plan** specific to AI — what to do if PII is suspected to have leaked through a prompt, a log, or a model interaction.

These are not boilerplate. The AI section of your privacy program is what regulators, donors, and (eventually) plaintiffs' attorneys will read first.

---

## Part 7: A Reference Architecture, Plain Text

For clarity, here is the end-to-end picture for a fully local deployment:

```
┌──────────────────────────────────────────────────────────────────┐
│                       Your nonprofit's boundary                   │
│                                                                   │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐   │
│   │    Users     │─────▶│  Application │─────▶│  Orchestrator│   │
│   │ (staff, RBAC)│      │  (web/API)   │      │  (LangGraph) │   │
│   └──────────────┘      └──────────────┘      └──────┬───────┘   │
│                                                      │           │
│                          ┌───────────────────────────┼───────┐   │
│                          ▼                           ▼       ▼   │
│                  ┌──────────────┐            ┌──────────────┐   │
│                  │  Redaction   │            │  Retrieval   │   │
│                  │  (Presidio)  │            │  (pgvector)  │   │
│                  └──────┬───────┘            └──────┬───────┘   │
│                         │                           │           │
│                         ▼                           ▼           │
│                  ┌──────────────┐            ┌──────────────┐   │
│                  │  Local LLM   │            │  Postgres    │   │
│                  │ (Ollama/vLLM)│            │  (CRM, docs) │   │
│                  └──────────────┘            └──────────────┘   │
│                                                                   │
│   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐   │
│   │  Audit log   │      │ Observability│      │  Backups     │   │
│   │ (Postgres)   │      │ (Langfuse)   │      │ (encrypted)  │   │
│   └──────────────┘      └──────────────┘      └──────────────┘   │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
                              │
                              │ NO outbound traffic to LLM providers
                              ▼
                         (the boundary)
```

For the hybrid architecture, replace the local LLM box with a redaction proxy and an outbound TLS connection to the contracted frontier provider (Azure OpenAI, AWS Bedrock, Anthropic enterprise, Vertex AI). Everything else stays inside the boundary.

---

## Part 8: A Buildout Sequence That Actually Works

If you are starting from zero, the order of operations matters. Most nonprofit AI projects fail because they reverse this sequence and end up with a working chatbot before they have a working data discipline.

1. **Data inventory.** Map every system that holds PII. Classify by sensitivity. Identify the highest-value, lowest-risk use case to build first.
2. **Governance scaffolding.** Draft the AI Acceptable Use Policy, board-approve it, and roll out the approved-tools list to staff. This is what stops the shadow AI leak while you build.
3. **Synthetic data generation.** Build the synthetic dataset that will support all dev and staging work.
4. **Redaction pipeline.** Stand up Presidio, configure custom recognizers for your data, and build the evaluation harness. This is the foundation for everything that follows.
5. **Local infrastructure.** Stand up the local LLM, embedding service, and vector store inside your boundary. Use synthetic data end-to-end first.
6. **First agent loop.** Ship one narrow agent (e.g., the onboarding Q&A agent) against the synthetic data, evaluate it carefully, and only then connect it to a small slice of real data with full audit logging.
7. **Expand by use case, not by capability.** Each new use case gets its own DPIA, its own evaluation set, its own access controls, its own audit trail.
8. **Periodic review.** Quarterly review of audit logs, redaction false-negative rates, and policy compliance. Annual review by counsel. Both reviews land at the board.

This sequence is slow. It is also the sequence that actually produces a working, trustworthy system. Skip steps and you end up with one of two failure modes: a useful system that leaks data, or a safe system that no one uses.

---

## Part 9: What Not to Do

A short list of patterns that are common, plausible-looking, and wrong.

- **"We'll just use ChatGPT Team — it doesn't train on our data."** Better than consumer ChatGPT, still sends your data to a third-party processor, still requires a real DPA review, and still leaves you exposed if a staff member uses the personal account instead.
- **"We added an AI chat to our CRM and the vendor says it's secure."** Read the vendor's documentation on which model they call, where it runs, and what their data terms are. "Secure" is not a technical term.
- **"We anonymized the data before uploading."** Anonymization that strips only direct identifiers usually fails. Quasi-identifier re-identification is well established in the literature. Use a real redaction pipeline with evaluation, not a column-drop.
- **"We're a small nonprofit, we don't need this level of rigor."** State privacy laws apply based on the data subject's residence, not the nonprofit's size. Donor trust is the asset; the cost of a breach is not proportional to organizational scale.
- **"Our developer has it handled."** Maybe. Ask your developer the seven questions in Part 6. The answers tell you whether your program is real.

---

## Conclusion

A nonprofit can have full agentic AI capability — research agents, drafting agents, risk-surfacing agents, onboarding agents, all the use cases that the integrated-context conversation now demands — without ever transmitting PII to a third-party tech company. The architecture is not exotic. It uses well-established components: open-weights LLMs, self-hosted vector stores, Microsoft Presidio for redaction, your existing Postgres database, a local orchestrator, and disciplined environment separation during development.

The two principles that make this work are the same two principles that make any privacy program work: minimize what crosses the boundary, and control what does. Applied consistently from the development environment through the production stack and into observability, those principles produce a system that gives your team genuine AI capability and gives your board, your donors, and the people you serve a defensible answer to the question they are increasingly going to ask: *where does our data actually go when you use AI?*

The answer should be: it stays here.

---

## Sources

- [Earning trust: the imperative of data privacy for nonprofits — National Council of Nonprofits](https://www.councilofnonprofits.org/articles/earning-trust-imperative-data-privacy-nonprofits)
- [Nonprofit Donor Data Security: The Complete Guide — StratusLIVE](https://stratuslive.com/blog/nonprofit-donor-data-security-guide/)
- [Beyond Compliance: Prioritizing Donor Data Privacy in the Non-Profit Sector — CRI](https://www.criadv.com/insight/beyond-compliance-prioritizing-donor-data-privacy-in-the-non-profit-sector/)
- [A Nonprofit's Guide to Navigating Data Privacy Laws — Deep Sync](https://deepsync.com/nonprofit-data-privacy/)
- [New State Data Privacy Laws Affect Nonprofits — Wagenmaker & Oberly](https://www.wagenmakerlaw.com/blog/new-state-data-privacy-laws-affect-nonprofits)
- [Avoiding Legal Pitfalls with AI — LawHelp DC](https://www.lawhelp.org/dc/resource/nonprofit-news-spring-2025-avoiding-legal-pitfalls-with-ai)
- [Microsoft Presidio (GitHub)](https://github.com/microsoft/presidio)
- [Microsoft Presidio documentation](https://microsoft.github.io/presidio/)
- [Preventing PII leakage when using LLMs: An introduction to Microsoft's Presidio — Ploomber](https://ploomber.io/blog/presidio/)
- [PII Detector for RAG: Presidio Masking Guide — LlamaIndex](https://www.llamaindex.ai/blog/pii-detector-hacking-privacy-in-rag)
- [Privacy-Aware AI Agents: PII Protection with Microsoft Presidio — Medium / Sammeta](https://laxmikumars.medium.com/llms-protecting-sensitive-data-with-microsoft-presidio-33265c887f95)
- [Presidio PII Masking with LiteLLM — Tutorial](https://docs.litellm.ai/docs/tutorials/presidio_pii_masking)
