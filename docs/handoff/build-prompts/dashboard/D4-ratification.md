# D4. Publishing a version

**Status** Built — the `publish` screen of `Movemental Dashboard.dc.html`

## The blocking question, answered by the code

This prompt was written blocked on "signatures vs ratifications". Reading
`publishArtifact()` in `charter-dashboard.ts` settles it, and not in favour of
either reading:

```
insert into safety_artifact_publications
  (artifact_id, version_id, public_slug, is_active, published_by_user_id)
update safety_artifacts set status = 'published'
```

**Neither `safety_guidebook_ratifications` nor `safety_guidebook_signatures` is
touched.** The shipped act is not ratification at all — it is *publication*: a
version is bound to a public slug and marked active. The two guidebook tables
exist and nothing in the charter flow reads or writes them.

So the screen was built around the act that ships. Board signing is named on the
page as undesigned rather than invented, which is the honest position while the
tables are ambiguous.

## What the screen does

1. **The five layers, each with the exact version that would be published.** Not
   a summary of the text — the text is the thing being approved, so the rows
   link into the documents.
2. **The version binding, stated as the headline.** "Publishing binds a version,
   not a document." A year later, "what did we actually sign?" has a precise
   answer because the publication row carries `version_id`.
3. **Changed layers flagged.** Where a layer is published at version N and the
   current text is N+1, the row says so and is marked in `--margin-red`. A
   charter is never shown as clean when the public text and the current text
   differ.
4. **No backend.** The page says so; nothing publishes.

## Still open

- Who may publish. `require-safety-api.ts` gates on organization membership, not
  on role. Any member can publish a board document today.
- Whether the guidebook ratification and signature tables should be wired up, or
  dropped. If board signing is a real requirement, it is a build, not a redesign.
