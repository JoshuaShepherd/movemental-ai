---
type: index
last_researched_date: 2026-05-08
profiles_count: 17
---

# Competitor Profiles — Index

Quick-scan reference for all competitor profiles in `docs/research/competitors/`. Sorted by category, then by slug. See [_summary.md](_summary.md) for the landscape overview and [_competitive-positioning.md](_competitive-positioning.md) for pitch language.

## Profiles

| Slug | Name | Category | Threat today | Threat year 2 | Threat year 5 | Last researched |
|------|------|----------|--------------|---------------|---------------|-----------------|
| [breeze](breeze.md) | Breeze ChMS | chms | low | low | low | 2026-05-08 |
| [planning-center](planning-center.md) | Planning Center | chms | low | medium | medium | 2026-05-08 |
| [pushpay](pushpay.md) | Pushpay | chms | medium | high | high | 2026-05-08 |
| [realm-acs](realm-acs.md) | Realm by ACS Technologies | chms | low | low | medium | 2026-05-08 |
| [subsplash](subsplash.md) | Subsplash (Roper) | chms | medium | high | high | 2026-05-08 |
| [tithely](tithely.md) | Tithe.ly | chms | medium | medium | medium | 2026-05-08 |
| [blackbaud](blackbaud.md) | Blackbaud | nonprofit-crm | medium | high | high | 2026-05-08 |
| [bloomerang](bloomerang.md) | Bloomerang | nonprofit-crm | medium | high | high | 2026-05-08 |
| [salesforce-nonprofit-cloud](salesforce-nonprofit-cloud.md) | Salesforce Nonprofit Cloud / Agentforce Nonprofit | nonprofit-crm | medium | high | high | 2026-05-08 |
| [virtuous](virtuous.md) | Virtuous | nonprofit-crm | high | high | high | 2026-05-08 |
| [auxano](auxano.md) | Auxano (LifeWay) | consultancy | low | low | low | 2026-05-08 |
| [generis](generis.md) | Generis | consultancy | low | low | low | 2026-05-08 |
| [slingshot-group](slingshot-group.md) | Slingshot Group | consultancy | low | low | medium | 2026-05-08 |
| [the-unstuck-group](the-unstuck-group.md) | The Unstuck Group | consultancy | low | low | medium | 2026-05-08 |
| [accenture-nonprofit](accenture-nonprofit.md) | Accenture Nonprofit Practice | big-4 | low | low | medium | 2026-05-08 |
| [deloitte-ai-nonprofit](deloitte-ai-nonprofit.md) | Deloitte AI Nonprofit (Dot Good) | big-4 | low | medium | high | 2026-05-08 |
| [gloo](gloo.md) | Gloo | ai-startup | high | high | high | 2026-05-08 |

## Synthesis documents

- [_summary.md](_summary.md) — One-page landscape overview
- [_competitive-positioning.md](_competitive-positioning.md) — Investor + customer pitch language
- [_tier-5-discovery-2026-05-08.md](_tier-5-discovery-2026-05-08.md) — Tier 5 (emerging AI startups) discovery results

## Methodology

All profiles produced by the [`movemental-competitor-research`](../../../.claude/skills/movemental-competitor-research/SKILL.md) skill, run on 2026-05-08. Each profile includes 4–11 cited sources with URL and accessed date. Profiles to be re-run when:
- A material competitor M&A, IPO, or funding event occurs
- A new venture-backed AI-for-faith competitor emerges (monitor quarterly per Tier 5 cadence note)
- Movemental's pricing or stage structure changes (this would invalidate the overlap tables)
- A profile's `last_researched_date` is older than 12 months (default refresh cadence)

## Maintenance commands

```bash
# Re-run a single profile (will overwrite)
/movemental-competitor-research "Pushpay" --slug pushpay --depth deep

# Run a Tier 5 discovery sweep (quarterly)
/movemental-competitor-research --tier-5-sweep

# Regenerate synthesis docs after profile changes
/movemental-competitor-research --synthesize
```

(The skill reads its instructions from `.claude/skills/movemental-competitor-research/SKILL.md`. Update that file if the methodology needs to change.)
