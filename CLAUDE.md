# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Movemental AI is a multi-tenant content and learning management platform for movement leaders built with Next.js 15, TypeScript, React 19, Drizzle ORM, and Supabase.

## Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run lint             # ESLint

# Database (Drizzle ORM)
npm run db:generate      # Generate migrations from schema changes
npm run db:push          # Push schema to database
npm run db:migrate       # Run migrations
npm run db:studio        # Open Drizzle Studio GUI

# Type validation
npx tsc --noEmit         # Validate all layers
```

## Architecture: Six-Layer Type Safety Chain

Types flow unidirectionally downstream. Never upstream.

```
Layer 1: DATABASE       → db/schema.ts (Structure SSOT)
Layer 2: ZOD SCHEMAS    → lib/schemas/ (Types SSOT)
Layer 3: SERVICES       → lib/services/simplified/
Layer 4: API ROUTES     → app/api/simplified/
Layer 5: REACT HOOKS    → hooks/simplified/
Layer 6: UI COMPONENTS  → components/
```

### Key Principles

- **Lock-before-proceed**: Validate each layer with `npx tsc --noEmit` before moving to the next
- **Fix bottom-up**: Type errors must be fixed starting from Layer 1, not the layer where they appear
- **Auto-generation**: All Zod schemas use `drizzle-zod` (createSelectSchema, createInsertSchema)
- **Mandatory type exports**: Every entity needs: `Entity`, `EntityCreate`, `EntityUpdate`, `EntityFilters` via `z.infer<typeof Schema>`

### Multi-Tenant Architecture

All tenant-scoped data includes `organizationId`. Tenant boundaries are enforced at the service layer (Layer 3). Routes extract tenant context via `getOrganizationId(request)` from `lib/middleware/tenant.ts`.

## Key File Locations

| Purpose | Location |
|---------|----------|
| Drizzle schema (SSOT for structure) | `db/schema.ts` |
| Zod schemas (SSOT for types) | `lib/schemas/` |
| Base service class | `lib/services/simplified-base.ts` |
| Result<T> pattern types | `lib/services/types.ts` |
| Tenant middleware | `lib/middleware/tenant.ts` |
| Architecture docs | `_docs/type/01_OVERVIEW.md` |

## Code Patterns

### Services return Result<T>

Services return `{ ok: true, data }` or `{ ok: false, error }` — they never throw.

### Zod schema pattern

```typescript
// Auto-generate from Drizzle, then export inferred types
export const EntitySelectSchema = createSelectSchema(schema.entity);
export type Entity = z.infer<typeof EntitySelectSchema>;
```

### API route response format

```typescript
// Success
return NextResponse.json({ success: true, data }, { status: 200 });

// Error
return NextResponse.json({ error: { code, message } }, { status: 400 });
```

## Do Not Modify

- `components/ui/` — shadcn/ui managed components
- `node_modules/` or `package-lock.json` directly

## Routing Structure

- Public pages: `app/(public)/`
- API routes: `app/api/simplified/`
- Dashboard (in development): `app/dashboard/`
