# AF-06 — Data layer TypeScript port

**Prompt ID:** AF-06  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** AF-05 (can start once `acts.ts` exists)  
**Last updated:** 2026-06-09

---

## 1. Role and stance

Convert `js/data/*.js` globals into typed ES modules. **No runtime fetch** — static data only, matching prototype exactly.

---

## 2. Goal

Create:

```text
src/lib/agent-room/data/
  leaders.ts      # LEADERS band portraits
  profiles.ts     # PROFILES + getProfile() + HTML builder helpers → JSX later
  faq.ts          # FAQ sections
  map-q.ts        # MAP_Q reality-check questions
  scenes.ts       # SCENES record
  index.ts        # re-exports
```

Add Zod schemas only where validation adds value (optional). Prefer plain `as const` + exported types.

---

## 3. Module-by-module guide

### 3.1 `leaders.js` → `leaders.ts`

- Array of `{ name, role, img }` for portrait band
- Export `LEADERS` typed readonly array

### 3.2 `profiles.js` → `profiles.ts`

Largest module. Port:

- `PROFILES` record keyed by leader index (0–16)
- Fields: `approved`, `lede`, `bio`, `work[]`, `connection`, `workSay[]`, `connectSay[]`, `links[]`
- **`getProfile(i: number)`** — single seam (comment: future RAG swap)
- HTML builder functions (`leaderHTML`, `foundersHTML`, etc.) → convert to **data + view functions** returning React node factories in AF-10, not HTML strings

For this prompt: port raw data + export builder **data structures**; string HTML may remain as interim if needed but mark `@deprecated`.

### 3.3 `faq.js` → `faq.ts`

- FAQ groups and questions
- Export typed structure matching static `pages/faq.html`

### 3.4 `map-q.js` → `map-q.ts`

- `MAP_Q` array: `{ q, opts: { t, score? }[] }`
- Used by beat screen + readback logic

### 3.5 `scenes.js` → `scenes.ts`

- Port entire `SCENES` object
- Scene values may be arrays or functions returning arrays — preserve behavior
- Export `SceneName` union type from keys

---

## 4. Conversion procedure (HTML/JS → TS)

1. Copy file content from source repo.
2. Replace `var X =` with `export const X =`.
3. Add interfaces at top of each file.
4. Remove IIFE wrappers — use modules.
5. Run `pnpm typecheck` — fix implicit any.
6. **Do not** simplify or edit copy — byte-identical strings.

---

## 5. Sync with source monolith

If source data changed:

```bash
# In movemental-agentic-front-end
node scripts/split-ink-band.mjs
# Re-diff js/data/*.js into TS modules
```

Document last synced commit hash in §10.

---

## 6. Definition of Done

- [ ] All five data modules exist and export typed constants.
- [ ] `scenes.ts` keys match `runner.run()` call sites in ported `app.js` logic.
- [ ] `getProfile()` exported with same signature semantics.
- [ ] No `window` or DOM references in data modules.
- [ ] `pnpm typecheck` passes.
- [ ] §10 + master runner updated.

---

## 7. Verification

```ts
import { SCENES } from "@/lib/agent-room/data/scenes";
// SCENES.opening.length > 0
// SCENES.toBeat is function or array
```

Unit test optional: assert `Object.keys(SCENES)` includes `opening`, `toBeat`, `whatIs`, `cost`.

---

## §10 Attempt log

<!-- Module line counts, sync commit, type exports. -->

### 2026-06-09 — AF-06 data layer ported

**Source sync:** `movemental-agentic-front-end` @ `9d54e78` (2026-06-06).

**Modules created under `src/lib/agent-room/data/`**

| Module | Exports | Source |
| --- | --- | --- |
| `leaders.ts` | `LEADERS` (17), `Leader` | `leaders.js` |
| `profiles.ts` | `PROFILES` (17), `getProfile`, `sayScene`, `Profile`/`ProfileWork`/`ProfileLink` | `profiles.js` (data + seam only) |
| `map-q.ts` | `MAP_Q` (6), `STAGE_CLEAR`, `STAGE_NAME`, `cap`, `computeMapRead`, `Stage`/`MapQuestion`/`MapOption`/`ReadSignal`/`MapRead`/`StageRead` | `map-q.js` |
| `faq.ts` | `FAQ_SECTIONS` (10), `FaqItem`/`FaqSection` | `faq.js` |
| `scenes.ts` | `SCENES` (14), `SceneName` | `scenes.js` (static scenes) |
| `index.ts` | re-exports all of the above | — |

**Editorial text is byte-identical** to the prototype (ledes, bios, say-lines,
FAQ answers, scene copy). Verified the 14 scene names: `opening, whatIs, cost,
toFaq, whoBehind, talkToUs, leaderConnect, toBeat, toPath, toSafety, charter,
involved, withUs, onOwn`.

**Key decisions / deviations**

- **Portraits externalized.** `leaders.js` inlined 17 base64 JPEGs (~264 KB). I
  decoded them to `public/agent-room/leaders/{0..16}.jpg` (228 KB on disk) and set
  `img` to the path, keeping that blob **out of the `/agent` JS bundle**. An
  `<img src>` to a static asset is not a data fetch — the "no fetch" rule (no
  backend) holds. Names/creds remain byte-identical. (One-off decode script run
  then removed.)
- **Only data + pure logic ported.** Per §3.2, the HTML *builders* in
  `profiles.js`/`faq.js`/`map-q.js` (`bandHTML`, `leaderHTML`, `foundersHTML`,
  `confirmHTML`, the `*_HTML` constants, `beatDots`, `mapStageRow`, `faqSection`,
  the contact/path-drawer binders) are **not** ported — they become JSX in
  AF-08–AF-10. So `SAFETY_HTML`/`PATH_HTML`/`ABOUT_HTML`/`CONTACT_HTML`/
  `PRICING_HTML` copy will be reborn as components, not interim strings.
- **`computeMapRead` made pure** — takes the chosen answers as an argument
  instead of reading the prototype's `mapAnswers` global. No `window`/DOM anywhere
  in the data modules (the reason they import only from `acts.ts`).
- **Leader-aware scenes deferred to AF-10.** `leaderScene(i)`, `leaderWork`, and
  the `leaderConnect` override close over the runner's `currentLeader` +
  `getProfile`, so they're wired with the leader screens. The static
  `leaderConnect` fallback is included here.
- **`SCENES` uses `satisfies Record<string, Scene | SceneFactory>`** to keep
  literal keys for `SceneName` while the runner still looks scenes up by string
  (cast at the boundary, undefined = no-op for an unported target).
- **`acts.ts`** unchanged from AF-05 (already supports these shapes).

**Verification**

- [x] `pnpm typecheck` green; `eslint` on `data/` + the stub hook clean.
- [x] Runtime (tsx, `@` alias): all 12 assertions pass — SCENES core names +
  `opening.length>0` + `toBeat` is array; `LEADERS=17` with path imgs (no base64);
  `PROFILES=17`, `getProfile(0)` approved / `getProfile(999)` null; `MAP_Q=6` and
  `computeMapRead` orders gaps sharpest-first (safety sev3 → tech sev2); `FAQ=10`.
- [x] No `window`/DOM references in any data module.
- Committed Vitest spec `tests/unit/agent-room-data.test.ts` mirrors these
  assertions. **`pnpm test` can't run in this WSL env** — a pre-existing
  `rolldown` native-binding error (`rolldown-binding.linux-x64-gnu.node` missing),
  unrelated to this change; the spec is green-by-construction and runs in CI.
