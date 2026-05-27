---
description: Open Drizzle Studio GUI to browse database
---

# Drizzle Studio

Open the Drizzle Studio GUI to browse and manage database data.

## Steps

1. Start Drizzle Studio:
   ```bash
   npm run db:studio
   ```

2. Studio will open in your browser (usually at `https://local.drizzle.studio`)

3. You can:
   - Browse all tables
   - View and edit records
   - Run queries
   - See table relationships

## Notes

- Requires database connection (check `.env.local` for `DATABASE_URL`)
- Changes made in Studio are live (be careful in production)
- Use for debugging and data inspection during development
