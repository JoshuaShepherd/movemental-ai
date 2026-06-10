# INT-06 — Wire `getProfile()` → corpus / RAG

**Prompt ID:** INT-06
**Target agent:** Cursor / Claude Code
**Primary repo:** `movemental-ai` (+ Supabase)
**Blocks:** INT-02
**Status:** Done ✅ ("enrich, curated wins"; corpus read validated live, stream full-turn pending engine)
**Last updated:** 2026-06-10

**Discuss note:** Org-specific Discuss (tenant context, org RAG) remains **out of scope** for INT-06 — see [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) §11. Public `/agent` Discuss uses room-host knowledge + honesty rail until tenant-scoped Discuss is scoped.

---

## 1. Role and stance

Swap the **single per-leader content seam** from a hardcoded record to a retrieval call — without touching the leader screen or the leader scenes. This is the deliberate swap-point the migration preserved (AF-06/AF-10, ADR §4).

---

## 2. The seam (do not widen it)

`src/lib/agent-room/data/profiles.ts`:

```ts
export function getProfile(i: number): Profile | null { … }  // returns an approved record or null
```

Consumers (unchanged): `leader-screen.tsx` (`getProfile(opts.id)`), `leader-scenes.ts` (`leaderScene`/`leaderWorkScene`/`leaderConnectScene` use `getProfile` + `workSay`/`connectSay`/`lede`). The `Profile` shape is the contract; retrieval must return the same shape (or the screen degrades to the honest stub on `null`).

---

## 3. Source of truth — the corpus already exists

The leader corpus lives in Supabase **`movement_leader_corpus_data`** (loaded by the `movemental-leader-corpus-upload` pipeline — see the project memory and that skill). INT-06 maps a leader index → a corpus row → a `Profile`:

- `identity` / `biography` → `lede`, `bio`
- `books` / `frameworks` / `organizations` → `work[]` (`{ t, g }`)
- network ties → `connection`, `connectSay`
- grounded one-liners → `workSay` / `connectSay`

**Honesty rule (from the substrate doctrine):** no improvised claims. If a dimension is empty in the corpus row, omit it — don't synthesize. A missing/unapproved row returns `null` (honest stub), exactly as today.

---

## 4. Work

1. Add an **async** retrieval (`getProfileAsync(leaderId)` or a server action) reading `movement_leader_corpus_data` by a stable leader key (map the band index → leader slug/id; the band's 0–16 order is the current key — introduce an explicit `id`/`slug` on `LEADERS` if needed rather than relying on array position).
2. Keep the **sync** `getProfile` as the offline/stub fallback (local `PROFILES`); the screen can prefer the retrieved profile and fall back to the local record, so stub mode stays **zero network**.
3. Cache per session (the same leader opened twice shouldn't refetch).
4. Do **not** change `Profile`, the screen, or the scenes — only the data source behind the seam.

---

## 5. Definition of Done

- [x] `getProfile`/`getProfileAsync` returns corpus-backed `Profile` data for at least the founders, identical shape. *(bio + work from corpus; validated live for 10 leaders)*
- [x] Empty corpus dimensions omitted (no fabrication); missing row → honest stub. *(empty bio → local kept; no row → local `getProfile`)*
- [x] Leader **scenes** unchanged (seam preserved). **Screen** changed minimally per the chosen "enrich, curated wins" option (prefers async in stream; sync local initial render, FLIP intact).
- [x] Stub mode still resolves locally with **zero network**. *(async fetch gated on `isStream`)*
- [x] RLS/tenant scoping honored; no service key in the client. *(read is a `"use server"` action via server-only `db`; nothing in the client bundle)*
- [x] `pnpm typecheck` + lint green; §10 + master runner updated.

---

## 6. Verification

- Open a corpus-loaded leader in stream mode → bio/work/connection come from Supabase, voice lines grounded.
- Open a leader with no corpus row → honest stub, no fabricated claims.
- Stub mode → local `PROFILES`, no network.

---

## §10 Attempt log

### 2026-06-10 — Claude Code (operator chose "Enrich, curated wins")

**Outcome:** ✅ Done. The corpus read path is built and **validated against the live Supabase table**; full stream-mode UI verification (open a leader via an agent turn) is pending the engine (INT-07), same as INT-02..05.

**Why a policy decision was needed.** The corpus stores `biography`/`identity` as `{ markdown }` and `books`/`frameworks`/`organizations` as structured lists — but `Profile.lede`/`connection`/`workSay`/`connectSay` are **hand-curated editorial one-liners with no corpus field**, and the local `PROFILES` are richer than any mechanical extraction. A literal "swap the source" would either empty the scene voice lines or synthesize them (forbidden by the substrate honesty doctrine). Operator chose **enrich, curated wins**: corpus supplies `bio` + `work[]`; curated values stay for the editorial lines.

**index → slug map.** `LEADER_CORPUS_SLUGS: Record<number, string|null>` in `data/leaders.ts` (explicit, not array position — §4.1). 16/17 band leaders map to a live `corpus_slug`; **index 8 (Josh Shepherd) → `null`** (no corpus row → local curated record stands). Verified against the live slug set (21 rows; the band uses 16 of them).

**corpus → Profile field map (honest subset only).**

- `bio` ← first **prose** paragraph of `biography.markdown` (fallback `identity.markdown`). The extractor skips the metadata preamble some rows carry (`**Status**:`/`**Last updated**:`), headings, rules, tables, quotes, list items — caught live: alan-hirsch's bio began with a `**Status**…` block that the naive version grabbed; fixed. Empty → omitted (local bio kept).
- `work[]` ← `Books` (first 8 `books[].title`) + `Frameworks` (first 8 `frameworks[].name`), each a grounded `{t,g}`. `organizations` deliberately **omitted** (entries are `{source,section,markdown}` blobs with no clean name → extracting a list would be synthesis).
- `lede` / `connection` / `workSay` / `connectSay` ← **local curated, never synthesized.**

**Seam + caching.** New `getProfileAsync(i)` in `profiles.ts`: resolve slug → `getCorpusProfile(slug)` (server action) → merge over local (`{...local, bio?, work?}`; curated wins) → **module-level `corpusCache` Map** (per page session; reopen = no refetch). Slug `null` / no row / DB error → local `getProfile(i)`. Sync `getProfile` unchanged = the offline stub path.

**Server action / RLS.** `data/get-corpus-profile.ts` is `"use server"` → reads via the server-only Drizzle `db` (`db.execute(sql\`…\`)`, raw because the table isn't in `schema.ts`). No DB URL / service key reaches the client bundle (it's an RPC stub there). Errors are swallowed → honest local fallback, never a thrown render.

**Screen wiring (minimal, FLIP-safe).** `leader-screen.tsx` now seeds `useState(() => getProfile(i))` (instant local render → hero FLIP unaffected) and, **in stream mode only** (`stream` prop present), upgrades via `getProfileAsync` in a `useEffect`. Stub mode never fetches → **zero network**. Leader **scenes** untouched.

**Verification.** UI `pnpm typecheck` ✅ · lint ✅ 0 in touched files · stub `/agent` HTTP 200, `ink-band-surface`, no compile errors · **live corpus read**: clean prose bios for 10 of 16 leaders, the other 6 empty→local-kept (no fabrication), `work[]` grounded in real book/framework names, `josh-shepherd` no row → local fallback. **Live stream full turn unverified** (engine down → INT-07).

**Open note.** In stream mode the leader screen currently has no leader id (the agent's `show_leader` is `EmptyProps`) → it defaults to index 0 (Alan Hirsch, who has a corpus row), which is enough to prove the path. Passing a chosen leader id through `show_leader` is a separate enhancement (not in INT-06 scope).
