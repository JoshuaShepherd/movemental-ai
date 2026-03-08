# Write Like Alan Hirsch: Custom GPT Experiment Suite

## Purpose

This directory contains **10 progressively sophisticated custom GPT instruction sets** for emulating Alan Hirsch's writing voice. Each approach represents a distinct prompting strategy, escalating from zero-shot ("Write like Alan Hirsch") through full agentic systems with RAG, scoring engines, and dynamic context assembly.

The goal: **empirically measure how different prompting strategies affect voice emulation quality** using a standardized rubric.

## How to Use This

### Step 1: Build Custom GPTs

Each file in `approaches/` is a standalone custom GPT instruction set. Create 10 Custom GPTs in OpenAI's platform, one per file:

| # | Approach | File | Complexity |
|---|----------|------|------------|
| 01 | Bare Minimum | `approaches/01-bare-minimum.md` | Zero-shot |
| 02 | Persona + Context | `approaches/02-persona-plus-context.md` | Light persona |
| 03 | Voice Markers Only | `approaches/03-voice-markers-only.md` | Constrained generation |
| 04 | Few-Shot Examples | `approaches/04-few-shot-examples.md` | Example-driven |
| 05 | Failure Mode Guards | `approaches/05-failure-modes-guard.md` | Guardrails focus |
| 06 | Structured Rubric | `approaches/06-structured-rubric.md` | Self-scoring |
| 07 | Corpus-Grounded | `approaches/07-corpus-grounded.md` | RAG + file search |
| 08 | AI Lab Faithful | `approaches/08-ai-lab-faithful.md` | Full AI Lab replica |
| 09 | Writing Studio Full | `approaches/09-writing-studio-full.md` | Full Writing Studio |
| 10 | Best-Case Synthesis | `approaches/10-best-case-synthesis.md` | Everything integrated |

### Step 2: Upload Reference Materials (for approaches 07-10)

Approaches 07-10 benefit from uploaded files. Use the materials in `reference-materials/` as Knowledge files in the Custom GPT configuration:

- `ALAN_HIRSCH_BIOGRAPHY.md` — Core biographical context
- `VOICE_MARKERS.md` — The 5 validated voice markers with scoring weights
- `WRITING_EXAMPLES.md` — 10 verified corpus examples from 8 books
- `FAILURE_MODES.md` — Anti-patterns and prohibited constructions
- `STORIES_AND_REFERENCES.md` — Canonical stories, historical examples, cultural references

### Step 3: Test Each GPT

Give every Custom GPT the **same set of prompts** (suggested below) and collect the outputs.

**Suggested test prompts:**

1. "Write a 500-word article opening about why the Western church needs to recover apostolic genius."
2. "Write a blog post about what it means to say 'Jesus is Lord' in a post-Christendom context."
3. "Explain the missional-incarnational impulse using a personal story from Alan's ministry."
4. "Write a prophetic challenge to churches that have reduced the Great Commission to evangelism alone."
5. "Describe the APEST framework in Alan's voice for someone encountering it for the first time."

### Step 4: Score with the Rubric

Use `rubric/VOICE_SCORING_RUBRIC.md` to score each output (0-100). The rubric is designed to be applied by a human evaluator or by a separate AI scoring agent.

### Step 5: Compare Results

Track scores across approaches to see where the quality jumps occur. Key questions:

- Does adding voice markers improve over bare persona?
- Do few-shot examples outperform explicit rules?
- At what point do failure mode guards make a measurable difference?
- Does corpus grounding (RAG) produce noticeably more authentic output?
- Is there a diminishing return beyond a certain complexity level?

## Directory Structure

```
write-like-alan-hirsch/
  README.md                              # This file
  rubric/
    VOICE_SCORING_RUBRIC.md              # Universal 0-100 scoring rubric
  reference-materials/
    ALAN_HIRSCH_BIOGRAPHY.md             # Who Alan Hirsch is
    VOICE_MARKERS.md                     # The 5 voice markers (weighted)
    WRITING_EXAMPLES.md                  # 10 verified corpus examples
    FAILURE_MODES.md                     # Anti-patterns to avoid
    STORIES_AND_REFERENCES.md            # Canonical stories and references
  approaches/
    01-bare-minimum.md                   # "Write like Alan Hirsch."
    02-persona-plus-context.md           # Persona + biography
    03-voice-markers-only.md             # 5 markers as constraints
    04-few-shot-examples.md              # Example-driven, no theory
    05-failure-modes-guard.md            # Markers + guardrails
    06-structured-rubric.md              # Self-scoring loop
    07-corpus-grounded.md                # RAG + file search
    08-ai-lab-faithful.md                # AI Lab replica
    09-writing-studio-full.md            # Writing Studio system
    10-best-case-synthesis.md            # Everything integrated
```

## What This Experiment Tests

| Variable | Approaches That Test It |
|----------|------------------------|
| Zero-shot vs. guided | 01 vs. 02-10 |
| Rules vs. examples | 03 vs. 04 |
| Presence of guardrails | 03 vs. 05 |
| Self-evaluation loop | 05 vs. 06 |
| RAG/retrieval augmentation | 06 vs. 07 |
| Conversational vs. writing mode | 08 vs. 09 |
| Component integration | 09 vs. 10 |
| Diminishing returns | Track score progression 01-10 |

## Provenance

All voice markers, examples, scoring weights, and constraints are derived from the production Alan Hirsch platform at `alanhirsch.com`, specifically:

- `src/agents/ai-lab/instructions/core.ts` — AI Lab core identity
- `src/agents/writing-assistant/instructions.ts` — Writing Studio system
- `src/agents/writing-assistant/instructions/examples.ts` — Verified corpus examples
- `src/agents/shared/voice.ts` — Shared voice module
- `src/agents/voice-authenticity/scoring.ts` — Voice scoring engine
- `src/lib/services/simplified/voice-fidelity.service.ts` — 75-point fidelity service
- `_docs/alan-hirsch/content-research/shared/voice-style-reference/` — Voice analysis docs
