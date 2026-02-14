# Prospective Writers: Supabase MCP, the Write Table, and Why-Movemental-Final

**Purpose:** Walk through using the Supabase MCP to add prospective writers to the `write` table in movemental-ai, plan how to store their content for retrieval, and how that content appears in a custom section at the top of `/why-movemental-final` once they create an account (matched by name).

**Related docs:**  
- [Type Safety Chain Overview](../type/01_OVERVIEW.md) — types flow Database → Zod → Services → API → Hooks → UI  
- [Platform Architecture](../type/11_PLATFORM_ARCHITECTURE_AT_A_GLANCE.md) — stack, Drizzle, Supabase  
- [Why Movemental & How It Works — Full Copy](../site-docs/why-movemental-and-how-it-works-full-copy.md) — section order and copy for `/why-movemental-final`  
- [.cursorrules](../../.cursorrules) — Supabase MCP usage and mandatory workflow  

---

## 1. Goal in one sentence

Prospective writers are added to the database **before** they have an account; their content is stored for retrieval; when someone with the **same name** creates an account, we link them and surface their content in a **custom section near the top** of the Why Movemental page (`/why-movemental-final`).

---

## 2. Table design (for the “write” table and content)

The following is a **plan** so you can add rows via Supabase MCP and later align the codebase (Drizzle schema, Zod, services, API, UI).

### 2.1 `write` table (prospective writers)

Conceptually: one row per **prospective writer** we’re inviting. No `userId` until they sign up; we match by name (and optionally email) when they create an account.

| Column | Type | Purpose |
|--------|------|--------|
| `id` | uuid, PK, default random | Stable id |
| `full_name` | text, not null | Display name; used for name match at signup |
| `email` | text, optional | Optional; can help disambiguate or pre-fill |
| `slug` | text, unique, optional | URL-safe identifier (e.g. `alan-hirsch`) |
| `bio` | text, optional | Short bio for card/section |
| `avatar_url` | text, optional | Headshot URL |
| `role` | text, optional | e.g. "Author", "Pastor & Author" |
| `organization` | text, optional | e.g. "Forge International" |
| `tags` | text[] or jsonb, optional | e.g. `['theology','mission','author']` |
| `linked_user_id` | uuid, nullable, FK → auth.users or user_profiles | Set when we link to a real account (same name) |
| `linked_at` | timestamptz, nullable | When we linked to an account |
| `created_at` | timestamptz | When row was added |
| `updated_at` | timestamptz | Last update |

**Matching rule:** When a user completes signup (or profile creation), we look for a `write` row with the same `full_name` (normalized: trim, case-insensitive or canonical form). If found and `linked_user_id` is null, we set `linked_user_id` and `linked_at`. That row is then “claimed” and can drive the custom section.

### 2.2 Content for retrieval (writer content)

We need a place to store **content** that belongs to a prospective writer so it can be:

- Retrieved for search/RAG or “their work” surfaces.
- Shown in the custom section on why-movemental-final (e.g. “Their voice” or “Coming onto the platform”).

Suggested table: **`write_content`** (or `prospective_writer_content`).

| Column | Type | Purpose |
|--------|------|--------|
| `id` | uuid, PK | |
| `write_id` | uuid, FK → write.id | Which prospective writer this belongs to |
| `title` | text | Article title, book title, etc. |
| `content_type` | text | e.g. `article`, `book`, `talk`, `quote` |
| `body_excerpt` | text, optional | Short excerpt for cards/search |
| `body_full` | text, optional | Full text for retrieval (RAG) |
| `url` | text, optional | Original URL if imported from web |
| `metadata` | jsonb, optional | Flexible (published_at, isbn, etc.) |
| `created_at` / `updated_at` | timestamptz | |

**Retrieval:** When we have a `write_id` (or linked user), we can query `write_content` for that writer and use `body_full` / `body_excerpt` for semantic search or keyword retrieval. Same content can feed the “custom section” (e.g. featured piece or quote).

If you already have a generic “content” or “articles” table that is tenant/user-scoped, an alternative is to add a nullable `write_id` there and keep a single content model; the plan below still applies.

---

## 3. Using Supabase MCP to add prospective writers

The project’s [.cursorrules](../../.cursorrules) require using **Supabase MCP** for database state and schema validation. Use it before and after any schema or data change.

### 3.1 Confirm the `write` table exists and its shape

Before inserting, verify the table and columns:

- **Prompt to use with Supabase MCP:**  
  *“Query the Supabase database to show the structure of the `write` table (columns and types).”*

If the table doesn’t exist yet, create it in Supabase (SQL Editor or migrations), then:

- **Prompt:**  
  *“List the columns of the `write` table via Supabase MCP.”*

Align `db/schema.ts` with that structure (Layer 1), then Zod (Layer 2), etc., per [01_OVERVIEW.md](../type/01_OVERVIEW.md).

### 3.2 Insert one prospective writer (example)

Use Supabase MCP to run an insert. Example (adjust to your actual column names and RLS):

**Example prompt:**  
*“Using Supabase MCP, insert a row into the `write` table: full_name = 'Jane Smith', email = 'jane@example.com', slug = 'jane-smith', bio = 'Author and speaker on formation.', role = 'Author', tags = ['formation','author']. Leave linked_user_id and linked_at null.”*

Or, if you use raw SQL via MCP:

```sql
INSERT INTO write (id, full_name, email, slug, bio, role, tags, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Jane Smith',
  'jane@example.com',
  'jane-smith',
  'Author and speaker on formation.',
  'Author',
  ARRAY['formation','author'],
  now(),
  now()
);
```

Repeat for each prospective writer. Prefer **consistent `full_name`** (e.g. “Alan Hirsch” not “Alan Hirsch” vs “Alan J. Hirsch”) so name matching at signup is reliable.

### 3.3 Add content for retrieval (`write_content`)

After the `write_content` table exists:

**Example prompt:**  
*“Insert into `write_content`: write_id = <uuid of Jane’s write row>, title = 'Soul Care in Community', content_type = 'article', body_excerpt = 'Short excerpt...', body_full = 'Full text for retrieval...'. Set created_at and updated_at to now().”*

Do this for each piece of content you want to use for retrieval and for the custom section.

### 3.4 After any schema or data change

- **Prompt:**  
  *“Query the `write` table via Supabase MCP and return the last 5 rows to verify the data.”*  
- Compare with `db/schema.ts` and Zod types so the six-layer chain stays aligned.

---

## 4. Plan: name match and linking when they create an account

1. **Signup / profile creation**  
   When a new user completes auth (e.g. Supabase Auth) or creates a profile, you have at least: **full name** (and optionally email).

2. **Matching**  
   - Normalize the incoming name (trim, lower-case or canonical form).  
   - Query `write` where `linked_user_id IS NULL` and normalized `full_name` equals the normalized incoming name (and optionally match email if you store it).  
   - If exactly one row: treat as match.

3. **Linking**  
   - Update that `write` row: set `linked_user_id` = new user’s id, `linked_at` = now().  
   - Optionally create an organization or tenant for them and link that to the same user.

4. **Where to run this**  
   - In a Postgres trigger on `auth.users` or your `user_profiles` table, or  
   - In your app after signup (API route or server action) that creates the profile and then runs the match-and-link logic.

Result: that prospective writer row is now “claimed” and can be used to drive the custom section and retrieval.

---

## 5. Plan: custom section at the top of why-movemental-final

**Current order** (see [why-movemental-and-how-it-works-full-copy.md](../site-docs/why-movemental-and-how-it-works-full-copy.md) and `WhyMovementalFinalContainer.tsx`):

1. Hero  
2. Network (Scenius)  
3. Sound Familiar  
4. Trust Collapse  
5. Credibility Crisis  
6. … rest (fragmentation, playbook, transformation, proof, amplification, network-effect, invitation)

**Proposed:** Add a **custom section** “Voices joining” (or “Who’s next” / “Their voice”) that:

- Renders **only when** there is at least one linked writer (i.e. `write.linked_user_id IS NOT NULL`) whose content or profile you want to highlight.
- Sits **near the top** — e.g. after **Hero** and before or after **Network** (e.g. after Network so the graph is still the first “proof”).
- Content source: rows from `write` with `linked_user_id` set, plus their `write_content` (e.g. one featured piece or quote per writer).

**Implementation outline:**

1. **Data**  
   - API route (or server component) that returns linked writers and optionally one piece of content per writer (from `write` + `write_content`).  
   - Or use existing services/hooks once Layer 3–5 exist for `write` / `write_content`.

2. **Component**  
   - New section component, e.g. `VoicesJoiningSection` or `ProspectiveWritersSection`, that:  
     - Fetches linked writers (+ content).  
     - Renders nothing if the list is empty.  
     - Renders cards or a short strip of “these voices are now on the platform” with name, bio, avatar, and one link or quote from `write_content`.

3. **Placement**  
   - In `WhyMovementalFinalContainer`, insert the new section after the Network (and before Sound Familiar), or after Hero if you want it even higher. Update `SECTIONS` and section ids so the nav and a11y stay correct.

4. **Styling**  
   - Reuse typography from `@/components/why-movemental-final/typography` and patterns from existing sections (e.g. `CredibilityCrisisSection`, `SoundFamiliarSection`) so the section feels part of the same page.

---

## 6. Checklist summary

- [ ] **Schema:** `write` table exists in Supabase; columns match plan (or your variant).  
- [ ] **Schema:** `write_content` (or equivalent) exists for content storage and retrieval.  
- [ ] **Drizzle:** `db/schema.ts` updated (Layer 1); then Zod (Layer 2), services (Layer 3), API (Layer 4), hooks (Layer 5).  
- [ ] **Supabase MCP:** Used to confirm table structure and to insert prospective writers into `write`.  
- [ ] **Supabase MCP:** Used to insert content into `write_content` for each writer.  
- [ ] **Matching:** Signup/profile flow runs name match and sets `linked_user_id` + `linked_at` on `write`.  
- [ ] **Retrieval:** Queries use `write` + `write_content` (and optionally linked user id) for search/RAG.  
- [ ] **UI:** New section in why-movemental-final that shows linked writers (+ content) near the top; hidden when there are no linked writers.  

---

## 7. References

| Doc | What it covers |
|-----|----------------|
| `_docs/type/01_OVERVIEW.md` | Six-layer type safety; DB → UI flow |
| `_docs/type/11_PLATFORM_ARCHITECTURE_AT_A_GLANCE.md` | Stack, Drizzle, Supabase |
| `_docs/site-docs/why-movemental-and-how-it-works-full-copy.md` | Section order and copy for `/why-movemental-final` |
| `.cursorrules` | Supabase MCP workflow (query before/after changes, validate schema) |
| `components/why-movemental-final/WhyMovementalFinalContainer.tsx` | Where to add the new section |
| `components/scenius-visualization/network-data.ts` | Similar “author” data shape (for reference only; writers are DB-backed) |

This keeps prospective writers and their content in the database, adds them via Supabase MCP, links them when someone with the same name creates an account, and surfaces them in a dedicated section at the top of why-movemental-final.

---

## 8. Implementation status (done in codebase)

The following has been implemented in the repo:

- **Layer 1:** `db/schema.ts` — `write` and `write_content` tables.
- **Layer 2:** `lib/schemas/index.ts` — Zod schemas and exported types for Write and WriteContent.
- **Layer 3:** `lib/services/simplified/write.ts` — `WriteService` with `listLinkedWriters()`, `getFirstContentByWriteIds()`, `findUnlinkedByFullName()`, `linkWriterToUser()`.
- **Layer 4:** `app/api/simplified/linked-writers/route.ts` — GET returns linked writers plus one featured content per writer.
- **Layer 5:** `hooks/simplified/useLinkedWriters.ts` — React Query hook for the section.
- **Layer 6:** `components/why-movemental-final/VoicesJoiningSection.tsx` — “Voices joining” section; `WhyMovementalFinalContainer` includes it after Network and only shows the nav item when there are linked writers.

**Linking on signup:** When you have a signup or profile-creation flow, call `writeService.findUnlinkedByFullName(fullName)` and, if a match is found, `writeService.linkWriterToUser(match.id, userId)`. No auth flow exists in the repo yet; add this where you create the user or organization (e.g. after Supabase Auth signup or in an onboarding completion handler).
