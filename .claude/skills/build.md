---
description: Run production build and check for errors
---

# Production Build

Run the Next.js production build to catch build-time errors.

## Steps

1. Run the build:
   ```bash
   npm run build
   ```

2. Report results:
   - If successful: Report build stats (pages, size)
   - If failed: Report errors organized by type

## Common Build Issues

| Issue | Solution |
|-------|----------|
| Type errors | Run `/fix-types` |
| Missing env vars | Check `.env.local` |
| Import errors | Check file paths and exports |
| SSR errors | Check for browser-only code in server components |

## Pre-Build Checklist

Before building for production:
```bash
npx tsc --noEmit  # Type check
npm run lint      # Lint check
```
