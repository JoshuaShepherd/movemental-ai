# Prospective Writers: Content Source Format

## JSON Format

The seed/import script (`scripts/seed-write-content.ts`) accepts a JSON file with this shape:

```json
{
  "writers": [
    {
      "full_name": "Jane Smith",
      "email": "jane@example.com",
      "slug": "jane-smith",
      "bio": "Author and speaker on formation.",
      "avatar_url": null,
      "role": "Author",
      "organization": "Forge International",
      "tags": ["formation", "author"],
      "content": [
        {
          "title": "Soul Care in Community",
          "content_type": "article",
          "body_excerpt": "Short excerpt for cards...",
          "body_full": "Full text for retrieval...",
          "url": "https://example.com/article",
          "metadata": { "published_at": "2024-06-01" }
        }
      ]
    }
  ]
}
```

## Field Reference

### Writer fields (`write` table)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `full_name` | string | **yes** | Used for name-match linking at signup |
| `email` | string \| null | no | Optional contact email |
| `slug` | string | **yes** | URL-safe identifier; must be unique; used for idempotent upsert |
| `bio` | string \| null | no | Short bio for display cards |
| `avatar_url` | string (URL) \| null | no | Headshot URL |
| `role` | string \| null | no | e.g. "Author", "Pastor & Author" |
| `organization` | string \| null | no | e.g. "Forge International" |
| `tags` | string[] \| null | no | Categorization tags |
| `content` | ContentEntry[] | no | Defaults to `[]` |

> `linked_user_id` and `linked_at` are omitted — they start as null and are set automatically when a user signs up with a matching name.

### Content fields (`write_content` table)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | **yes** | Article/book/talk title |
| `content_type` | string | **yes** | One of: `article`, `book`, `talk`, `quote` (or any string) |
| `body_excerpt` | string \| null | no | Short excerpt for cards and search |
| `body_full` | string \| null | no | Full text for RAG/retrieval |
| `url` | string (URL) \| null | no | Original source URL |
| `metadata` | object \| null | no | Flexible JSON (published_at, isbn, etc.) |

## Running the script

```bash
npx tsx scripts/seed-write-content.ts ./data/prospective-writers-sample.json
```

The script is **idempotent by slug**: writers with an existing slug are skipped (content is still inserted). Validation errors are reported before any database writes.
