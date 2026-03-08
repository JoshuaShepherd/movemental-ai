# Glossary

> **Plain language definitions** for key terms in the type safety chain

**Version**: 1.1.0  
**Last Updated**: January 2026

---

## Core Terms

### Drizzle

**What it is**: A TypeScript ORM (Object-Relational Mapping) library for SQL databases.

**What it does**: 
- Defines database schema in TypeScript
- Generates SQL migrations
- Provides type-safe database queries

**Where it's used**: Layer 1 (Database Schema)

**File**: `db/schema.ts`

**Example**:
```typescript
export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
});
```

---

### Zod

**What it is**: A TypeScript-first schema validation library.

**What it does**:
- Validates data at runtime
- Generates TypeScript types via `z.infer<>`
- Ensures data matches expected structure
- **Single source of truth for all TypeScript types**

**Where it's used**: Layer 2 (Zod Schemas)

**Directory**: `lib/schemas/`

**Example**:
```typescript
const OrganizationsSelectSchema = createSelectSchema(schema.organizations);
type Organizations = z.infer<typeof OrganizationsSelectSchema>;
```

---

### drizzle-zod

**What it is**: A library that generates Zod schemas from Drizzle schemas.

**What it does**:
- Auto-generates `createSelectSchema` for reading data
- Auto-generates `createInsertSchema` for creating data
- Auto-generates `createUpdateSchema` for updating data

**Where it's used**: Layer 2 (Zod Schemas)

**Example**:
```typescript
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-zod';

export const BooksSelectSchema = createSelectSchema(schema.books);
export const BooksInsertSchema = createInsertSchema(schema.books);
export const BooksUpdateSchema = createUpdateSchema(schema.books);
```

---

### Services

**What it is**: Business logic layer that handles data operations.

**What it does**:
- Implements CRUD operations (Create, Read, Update, Delete)
- Validates inputs/outputs with Zod
- Enforces business rules
- Handles errors with `Result<T>` pattern
- Enforces tenant boundaries

**Where it's used**: Layer 3 (Services)

**Directory**: `lib/services/simplified/`

**Example**:
```typescript
async findById(id: string): Promise<Result<OnboardingResponses>> {
  // Validate, query database, return result
}
```

---

### Routes

**What it is**: HTTP endpoints that handle web requests.

**What it does**:
- Receives HTTP requests (GET, POST, PATCH, DELETE)
- Validates request data with Zod
- Calls services for business logic
- Returns HTTP responses

**Where it's used**: Layer 4 (API Routes)

**Directory**: `app/api/simplified/`

**Example**:
```typescript
export async function GET(req: NextRequest) {
  const result = await onboardingResponsesService.findMany();
  return NextResponse.json({ success: true, data: result.data });
}
```

---

### Hooks

**What it is**: React hooks that fetch data using React Query.

**What it does**:
- Fetches data from API routes
- Manages loading/error states
- Caches data for performance
- Invalidates cache on mutations

**Where it's used**: Layer 5 (React Hooks)

**Directory**: `hooks/simplified/`

**Example**:
```typescript
export function useOnboardingResponses() {
  return useQuery({
    queryKey: ['onboarding-responses'],
    queryFn: () => fetch('/api/simplified/onboarding-responses').then(r => r.json()),
  });
}
```

---

### React Query

**What it is**: A data fetching library for React.

**What it does**:
- Manages server state
- Caches data automatically
- Handles loading/error states
- Provides optimistic updates

**Where it's used**: Layer 5 (React Hooks)

**Example**:
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['onboarding-responses'],
  queryFn: fetchOnboardingResponses,
});
```

---

### Tenant

**What it is**: An organization or customer that has isolated data.

**What it does**:
- Provides data isolation
- Allows multiple organizations on same platform
- Each tenant has separate data

**Where it's used**: Throughout the application (multi-tenant architecture)

**Example**:
- Tenant A: `tenant-a.example.com` → sees only Tenant A's data
- Tenant B: `tenant-b.example.com` → sees only Tenant B's data

---

### Organization

**What it is**: Same as "tenant" - an organization using the platform.

**What it does**:
- Represents a customer/tenant
- Has isolated data
- Can have multiple users

**Where it's used**: Database schema, tenant resolution

**Schema**: `db/schema.ts` - `organizations` table

---

### Result<T>

**What it is**: A type that represents success or failure.

**What it does**:
- Explicitly handles errors (no exceptions)
- Type-safe error handling
- Forces error checking

**Where it's used**: Layer 3 (Services)

**Example**:
```typescript
type Result<T> = 
  | { ok: true; data: T }
  | { ok: false; error: ServiceError };

// Success
return { ok: true, data: entity };

// Error
return { ok: false, error: { code: 'NOT_FOUND', message: 'Entity not found' } };
```

---

### Type Safety

**What it is**: Ensuring types are correct at compile-time and runtime.

**What it does**:
- Catches errors before code runs (TypeScript)
- Validates data at runtime (Zod)
- Prevents type mismatches

**Where it's used**: All 6 layers

**Example**:
```typescript
// Compile-time: TypeScript catches this
const response: OnboardingResponses = { title: 123 }; // ❌ Error

// Runtime: Zod validates this
const parsed = OnboardingResponsesSelectSchema.parse({ title: 123 }); // ❌ Error
```

---

### Migration

**What it is**: A script that changes the database schema.

**What it does**:
- Adds/removes tables
- Adds/removes columns
- Modifies column types
- Tracks schema changes in version control

**Where it's used**: Layer 1 (Database Schema)

**Example**:
```bash
# Generate migration
npm run db:generate

# Apply migration
npm run db:push
```

---

### Schema

**What it is**: The structure of data (tables, columns, types).

**What it does**:
- Defines what data looks like
- Enforces data structure
- Provides type information

**Where it's used**: Layer 1 (Drizzle Schema), Layer 2 (Zod Schemas)

**Example**:
```typescript
// Drizzle schema (database structure)
export const organizations = pgTable('organizations', {
  id: uuid('id'),
  name: text('name'),
});

// Zod schema (validation + types)
const OrganizationsSelectSchema = createSelectSchema(schema.organizations);
type Organizations = z.infer<typeof OrganizationsSelectSchema>;
```

---

### Validation

**What it is**: Checking that data matches expected structure.

**What it does**:
- Ensures data is correct
- Catches invalid data early
- Prevents runtime errors

**Where it's used**: Layer 2 (Zod), Layer 3 (Services), Layer 4 (Routes)

**Example**:
```typescript
const parsed = OnboardingResponsesInsertSchema.safeParse(data);
if (!parsed.success) {
  return { error: 'Invalid data' };
}
```

---

### SSOT (Single Source of Truth)

**What it is**: One place where information is defined authoritatively.

**In this architecture**:
- **Layer 1 (Drizzle)**: SSOT for **data structure**
- **Layer 2 (Zod)**: SSOT for **all TypeScript types**

**What it does**:
- Prevents type drift
- Ensures consistency
- Makes changes easier

**Example**:
- Database schema (Layer 1) defines structure
- Zod schemas (Layer 2) export all types
- All other layers derive from Layer 2 types

---

### Unidirectional Flow

**What it is**: Types flow in one direction only (downstream).

**What it does**:
- Prevents type drift
- Maintains architectural integrity
- Makes changes predictable

**Where it's used**: All 6 layers

**Example**:
```
Database → Zod → Services → Routes → Hooks → UI
(types flow downstream, never upstream)
```

---

### Bottom-Up Fixing

**What it is**: Fixing errors starting from the lowest layer.

**What it does**:
- Finds root cause
- Fixes at source
- Maintains type safety

**Where it's used**: Error fixing protocol

**Example**:
```
Error in UI → Check Hook → Check Service → Check Zod → Check Database
Fix at Database → Types flow down → Error resolved
```

---

### z.infer<>

**What it is**: Zod utility to extract TypeScript type from a schema.

**What it does**:
- Converts Zod schema to TypeScript type
- Ensures type matches validation logic
- Single source of truth for types

**Example**:
```typescript
const OrganizationsSelectSchema = createSelectSchema(schema.organizations);
type Organizations = z.infer<typeof OrganizationsSelectSchema>;
// Organizations type has all fields from the schema
```

---

## Quick Reference

| Term | Layer | Purpose |
|------|-------|---------|
| Drizzle | 1 | Database schema definition |
| Zod | 2 | Runtime validation + Type SSOT |
| drizzle-zod | 2 | Auto-generate Zod from Drizzle |
| Services | 3 | Business logic |
| Routes | 4 | HTTP interface |
| Hooks | 5 | Data fetching |
| UI | 6 | Presentation |
| Tenant | All | Data isolation |
| Result<T> | 3 | Error handling |
| Migration | 1 | Schema changes |
| z.infer<> | 2 | Type extraction |

---

## File Locations Quick Reference

| Item | Location |
|------|----------|
| Drizzle Schema | `db/schema.ts` |
| Zod Schemas | `lib/schemas/` |
| Base Schemas | `lib/schemas/base.ts` |
| Entity Schemas | `lib/schemas/index.ts` |
| Services | `lib/services/simplified/` |
| Routes | `app/api/simplified/` |
| Hooks | `hooks/simplified/` |
| UI Components | `components/` |

---

**Remember**: Understanding these terms helps you navigate the type safety chain with confidence.
