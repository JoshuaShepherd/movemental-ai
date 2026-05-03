# Sandbox AI for Nonprofits — course content

Source-of-truth markdown for the `sandbox-ai-nonprofits` course. Each `week-NN.md` file uses **machine headers** so the scaffold script can sync into `course_lessons.content`:

- One block per section, starting with a line exactly: `## {section_type}`
- Valid `section_type` values match [docs/articles/COURSE_STRATEGY.md](../../docs/articles/COURSE_STRATEGY.md) (e.g. `video`, `reading`, `chat_dissonance`).
- Week 8 repeats some types; use **duplicate** `## reading` (etc.) headers **in course order** — the importer matches occurrences sequentially.

## Sync to database

```bash
pnpm exec tsx scripts/scaffold-sandbox-ai-nonprofits-course.ts
```

Requires `DATABASE_URL` and at least one row in `organizations` and `user_profiles`, or set `SANDBOX_AI_NONPROFITS_ORG_ID` / `SANDBOX_AI_NONPROFITS_AUTHOR_ID`.

## Related docs

- [course-manifest.json](./course-manifest.json)
- [docs/articles/COURSE_STRATEGY.md](../../docs/articles/COURSE_STRATEGY.md)
- [docs/movemental-offering/03-sandbox-playbook.md](../../docs/movemental-offering/03-sandbox-playbook.md)
- Sandbox articles: [docs/articles/sandbox/](../../docs/articles/sandbox/)
