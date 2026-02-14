# Prompt: Prospective Writers and Content — Remaining Steps (Phase by Phase)

**Audience:** Claude/Cursor agent.  
**Purpose:** Complete all remaining work for (1) prospective movement leader content in the database, (2) name-based linking when users sign up, and (3) verification that the full flow works.  
**Context:** Schema, services, API, hooks, and Voices joining section already exist. Auth (Supabase) is wired; linking on signup and content upload are not.

**Reference:** `_docs/guides/prospective-writers-supabase-mcp-and-why-movemental.md` — table design, matching rule, checklist, implementation status.

---

## Phase 1: Wire name-based linking on signup

**Goal:** When a user completes signup (or confirms email), match their full name to an unlinked row in `write` and set `linked_user_id` and `linked_at`.

### 1.1 Where to run the logic

- **Option A (recommended):** In the auth flow after a session is established — e.g. in the **auth callback** route (`app/auth/callback/route.ts`) after successful `exchangeCodeForSession` or `verifyOtp`, or in a **post-signup hook** that runs once per new user.
- **Option B:** In a **Supabase Database trigger** on `auth.users` (or on a `user_profiles` table if you create one) that calls a small function to find and update `write`.
- Prefer app code (Option A) so you reuse `WriteService` and keep logic in one place.

### 1.2 What to do

1. **Get the user’s full name** after signup:
   - From Supabase Auth: `user.user_metadata.full_name` (sign-up passes this from first + last name in `app/(public)/auth/actions.ts`), or from a profile table if you create one.
   - Normalize: trim, and use the same normalization as `WriteService.findUnlinkedByFullName` (lowercase trim of `full_name`).

2. **Call the write service:**
   - Import `writeService` from `@/lib/services/simplified/write`.
   - Call `writeService.findUnlinkedByFullName(fullName)`.
   - If result is `ok: true` and `data` is non-null (exactly one match), call `writeService.linkWriterToUser(data.id, user.id)`.
   - If `findUnlinkedByFullName` returns multiple rows or the service API changes, follow the current API (e.g. it returns a single `Write | null`).

3. **Handle edge cases:**
   - If `full_name` is missing or empty, skip linking (no error).
   - If no match, skip (no error).
   - Do not overwrite an already linked row (`linkWriterToUser` should only update rows where `linked_user_id` is null; the service may already enforce this).

### 1.3 Files to touch

- `app/auth/callback/route.ts` — after successful auth, get session/user, get `user.user_metadata.full_name` (or equivalent), then run match + link.
- Optionally: a shared helper e.g. `lib/auth/link-prospective-writer.ts` that takes `(userId, fullName)` and runs find + link, and call it from the callback (and from any other place that “creates” or “confirms” a user).

### 1.4 Verification

- Create a test row in `write` with `full_name = 'Test Link User'`, `linked_user_id` null.
- Sign up with first name “Test Link”, last name “User” (so full name “Test Link User”).
- After signup/confirm, query `write` for that row and confirm `linked_user_id` and `linked_at` are set.
- Open `/why-movemental-final` and confirm the “Voices joining” section shows that writer (and their content if `write_content` exists).

---

## Phase 2: Content formatted for upload and upload path

**Goal:** Define a format for prospective writers and their content, and provide a repeatable way to upload them into `write` and `write_content`.

### 2.1 Schema reminder (for formatting)

- **`write`:** `full_name` (required), `email`, `slug`, `bio`, `avatar_url`, `role`, `organization`, `tags` (jsonb array of strings). Omit `linked_user_id` and `linked_at` for new rows (null).
- **`write_content`:** `write_id` (UUID of parent `write`), `title` (required), `content_type` (required; e.g. `article`, `book`, `talk`, `quote`), `body_excerpt`, `body_full`, `url`, `metadata` (jsonb).

Use consistent `full_name` (e.g. “Alan Hirsch” everywhere) so Phase 1 matching works.

### 2.2 Define the source format

1. **Choose a format** the agent (or human) can produce and the script can consume:
   - **JSON (recommended):** e.g. `{ "writers": [ { "full_name": "...", "email": null, "slug": "...", "bio": "...", "role": "...", "organization": null, "tags": ["..."], "content": [ { "title": "...", "content_type": "article", "body_excerpt": "...", "body_full": null, "url": null, "metadata": {} } ] } ] }`.
   - **CSV:** e.g. one CSV for writers (columns = write fields), one for content (columns = write_content fields plus writer slug or full_name to join). Or a single flattened CSV with writer fields + content fields and one row per content item (writer fields repeated).

2. **Document the format** in `_docs/guides/prospective-writers-supabase-mcp-and-why-movemental.md` or a new `_docs/guides/prospective-writers-content-format.md`: field names, required vs optional, allowed `content_type` values, and one minimal example.

### 2.3 Implement an upload path

1. **Add a seed/import script** (e.g. `scripts/seed-write-content.ts` or `scripts/import-prospective-writers.ts`):
   - Accept one argument: path to the source file (JSON or CSV).
   - Load the file; parse into writer records and content records.
   - For each writer: insert into `write` (use Drizzle or raw SQL via the project’s `db`). Capture the generated `id` (UUID).
   - For each content item: set `write_id` to the corresponding writer’s `id`, then insert into `write_content`.
   - Use the existing `db` and schema from `db/schema.ts`; respect unique constraints (`write.slug` if present) and avoid duplicate inserts (e.g. by slug or full_name) or make the script idempotent (e.g. “upsert by slug”).
   - Log progress and any errors (e.g. “Inserted 5 writers, 12 content items” or “Error: …”).

2. **Document how to run the script** in the same guide or in the repo README/CLAUDE.md: e.g. `npx tsx scripts/seed-write-content.ts ./data/prospective-writers.json`.

3. **Optional:** Add a small validation step (e.g. Zod schema derived from the insert schemas) to validate the source file before inserting, and print clear errors for invalid rows.

### 2.4 Verification

- Run the script with a small test file (e.g. one writer, two content items).
- Query `write` and `write_content` via Supabase MCP or SQL to confirm rows exist and foreign keys are correct.
- If the test writer’s name is used in a signup, complete Phase 1 verification again to confirm linking still works.

---

## Phase 3: Verification and optional enhancements

**Goal:** Confirm end-to-end behavior and, optionally, improve fit-check or retrieval.

### 3.1 Verification checklist

- [ ] **Tables:** `write` and `write_content` exist in Supabase; columns match `db/schema.ts` (use Supabase MCP or SQL to list tables/columns).
- [ ] **Data:** At least one prospective writer and one content row exist (from Phase 2 script or manual insert).
- [ ] **Linking:** Sign up with a user whose full name matches a row in `write`; confirm that row has `linked_user_id` and `linked_at` set (Phase 1).
- [ ] **UI:** On `/why-movemental-final`, the “Voices joining” section appears when there is at least one linked writer and shows that writer and their featured content (from `GET /api/simplified/linked-writers`).
- [ ] **No regressions:** Sign-in, sign-up, forgot-password, and auth callback still work; typecheck and lint pass.

### 3.2 Optional enhancements (only if requested or clearly needed)

- **Fit-check name step:** The fit-check “name step” currently redirects to sign-up with `next=/tour` and does not send name/body-of-work to the backend. Optionally add an API route or server action that stores the submitted name (and body of work) in a table or in session, so that after signup you could pre-fill profile or suggest a match (without changing the matching rule: linking still by `write.full_name` at signup).
- **Retrieval/RAG:** If search or RAG is in scope, document or implement queries that use `write` + `write_content` (e.g. by `write_id` or by linked user id) for semantic or keyword retrieval.
- **Admin/ops:** If needed, add a protected API or script to list unlinked writers, or to bulk-import from another source (e.g. CSV from a spreadsheet); keep the same schema and normalization rules.

---

## Output and completion criteria

- **Phase 1:** Name-based linking runs on signup; verification steps pass.
- **Phase 2:** Source format is documented; seed/import script exists, is runnable, and is documented; at least one successful run with test data.
- **Phase 3:** Verification checklist completed; optional items only if specified.

After completion, update `_docs/guides/prospective-writers-supabase-mcp-and-why-movemental.md` section 6 (Checklist summary) and section 8 (Implementation status) so they reflect the new state (linking on signup done, upload path available).
