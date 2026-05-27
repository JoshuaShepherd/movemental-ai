# Template Development Process — Curated Prompts

Prompts for building multi-variant template sites from reference images. These capture the methodology and lessons learned from the Movemental template system.

## Reading Order

| # | File | Purpose |
|---|------|---------|
| 00 | `00-iron-clad-rules.md` | Non-negotiable rules that prevent the token-bypass failure mode. Read first. |
| 01 | `01-mobbin-design-implementation.md` | End-to-end workflow: reference images → analysis → tokens → components → archive. The main build prompt. |
| 02 | `02-template-reference-fidelity-plan.md` | Ensuring each variant matches its reference image (per-variant tokens, reconciliation notes, cohesive-design checklist). |
| 03 | `03-template-reference-second-pass.md` | Scoped cleanup pass for variants that still don't match their reference after the first build. |
| 04 | `04-component-token-migration.md` | Systematic migration of a single component from hardcoded colors to the token system. Use when retrofitting. |

## Reference Images

All source reference images (179 from reference-archive + extras) are consolidated in:

```
_docs/reference-images-all/
```

Organized by page-type prefix (e.g. `books-product-showcase-01.png`, `chat-claude-warm-minimal-01.png`).

## Key Lesson

The architecture (CSS custom properties scoped to wrapper classes, `data-variant` for per-variant overrides) is sound. The failure was execution: components were built with hardcoded Tailwind colors (`text-white`, `bg-gray-900`) instead of token references (`text-[var(--mvmt-on-dark-primary)]`). The `00-iron-clad-rules.md` file exists to prevent this from happening again.
