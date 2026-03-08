# Layer 4: Routes (API Endpoints)

> **Type-Safe HTTP Interface** with Next.js App Router

**Layer**: 4 of 6  
**Directory**: `app/api/`  
**Validation**: `pnpm routes:check` → required `{"status":"VALIDATED"}` (or `npx tsc --noEmit`)  
**Status**: ✅ VALIDATED (2026-02-15)

---

## Overview

API routes provide **RESTful HTTP endpoints** using Next.js App Router. They validate requests with Zod schemas, call services for business logic, and return properly typed responses with consistent error handling.

### Key Principles

1. **Input Validation**: All inputs validated with Zod `.parse()` or `.safeParse()`
2. **Service Integration**: All business logic delegated to services (Layer 3)
3. **Result Handling**: Handle `Result<T>` types from services
4. **Consistent Responses**: Standardized response format for success/error
5. **Proper Status Codes**: Use appropriate HTTP status codes
6. **Tenant Transparency**: Tenant scoping handled by services automatically

---

## File Structure

```
app/api/
├── onboarding/
│   └── upload/
│       └── route.ts              # File upload handling
└── simplified/
    └── onboarding-responses/
        ├── route.ts              # GET (read), POST (create), PATCH (update)
        └── complete/
            └── route.ts          # POST (complete onboarding)
```

---

## Current Implementation

### `app/api/simplified/onboarding-responses/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { onboardingResponsesService } from '@/lib/services/simplified/onboardingResponses';
import {
  OnboardingResponsesInsertSchema,
  OnboardingResponsesUpdateSchema,
} from '@/lib/schemas';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    // Service automatically filters by organizationId (tenant scoping)
    const result = await onboardingResponsesService.getOnboardingResponse(request);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error.message },
        { status: result.error.code === 'NO_TENANT' ? 401 : 500 }
      );
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = OnboardingResponsesInsertSchema.parse(body);

    // CRITICAL: organizationId comes from tenant context, not client input
    const { organizationId: _, ...dataWithoutOrgId } = validated as any;

    const result = await onboardingResponsesService.createOnboardingResponse(
      request,
      dataWithoutOrgId
    );

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error.message },
        { status: result.error.code === 'NO_TENANT' ? 401 : 500 }
      );
    }

    return NextResponse.json({ data: result.data }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = OnboardingResponsesUpdateSchema.parse(body);

    const { organizationId: _, ...dataWithoutOrgId } = validated as any;

    const result = await onboardingResponsesService.updateOnboardingResponse(
      request,
      dataWithoutOrgId
    );

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error.message },
        { status: result.error.code === 'NO_TENANT' ? 401 : result.error.code === 'NOT_FOUND' ? 404 : 500 }
      );
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### `app/api/simplified/onboarding-responses/complete/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { onboardingResponsesService } from '@/lib/services/simplified/onboardingResponses';

export async function POST(request: NextRequest) {
  try {
    const result = await onboardingResponsesService.completeOnboardingResponse(request);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error.message },
        { status: result.error.code === 'NO_TENANT' ? 401 : result.error.code === 'NOT_FOUND' ? 404 : 500 }
      );
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Route Conventions

### Structure

```
app/api/simplified/{entity}/
├── route.ts          # Collection handler: GET (list), POST (create)
└── [id]/route.ts     # Resource handler: GET (detail), PATCH (update), DELETE (delete)
```

For our current implementation (single tenant record pattern):
```
app/api/simplified/{entity}/
├── route.ts          # GET (read), POST (create), PATCH (update)
└── complete/
    └── route.ts      # POST (complete/finalize)
```

### HTTP Methods

| Method | Purpose | Success Status | Error Status |
|--------|---------|----------------|--------------|
| GET | Read data | 200 | 401, 404, 500 |
| POST | Create data | 201 | 400, 401, 500 |
| PATCH | Update data | 200 | 400, 401, 404, 500 |
| DELETE | Delete data | 200 | 401, 404, 500 |

---

## Response Format

### Success Response

```typescript
return NextResponse.json(
  { data: result.data },
  { status: 200 }  // or 201 for POST
);
```

### Error Response

```typescript
return NextResponse.json(
  { error: result.error.message },
  { status: 400 }  // appropriate status code
);
```

### Validation Error Response

```typescript
if (error instanceof z.ZodError) {
  return NextResponse.json(
    { error: error.issues },
    { status: 400 }
  );
}
```

---

## Status Code Mapping

| Service Error Code | HTTP Status | Description |
|-------------------|-------------|-------------|
| `NO_TENANT` | 401 | No tenant context (unauthorized) |
| `NOT_FOUND` | 404 | Entity not found |
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `DB_ERROR` | 500 | Database operation failed |
| `PERMISSION_DENIED` | 403 | User lacks permission |
| `DUPLICATE_ENTRY` | 409 | Unique constraint violation |

---

## Input Validation

### With `.parse()` (throws on error)

```typescript
try {
  const validated = OnboardingResponsesInsertSchema.parse(body);
  // Use validated data...
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: error.issues }, { status: 400 });
  }
  // Handle other errors...
}
```

### With `.safeParse()` (returns result)

```typescript
const parsed = OnboardingResponsesInsertSchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { error: parsed.error.issues },
    { status: 400 }
  );
}
// Use parsed.data...
```

---

## Result Handling

Always check `result.ok` before accessing `result.data`:

```typescript
const result = await onboardingResponsesService.getOnboardingResponse(request);

if (!result.ok) {
  // Handle error based on error code
  return NextResponse.json(
    { error: result.error.message },
    { status: mapErrorCodeToStatus(result.error.code) }
  );
}

// Safe to access result.data
return NextResponse.json({ data: result.data });
```

---

## Tenant Scoping

**Routes don't handle tenant scoping directly.** Tenant context is:

1. **Resolved by middleware** or extracted from request in service
2. **Passed to service methods** via the `request` parameter
3. **Enforced by services** (Layer 3) automatically

```typescript
// Route passes request to service - service handles tenant scoping
const result = await onboardingResponsesService.getOnboardingResponse(request);
```

---

## Common Patterns

### GET (Read)

```typescript
export async function GET(request: NextRequest) {
  try {
    const result = await entityService.getEntity(request);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error.message },
        { status: result.error.code === 'NO_TENANT' ? 401 : 500 }
      );
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### POST (Create)

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = EntityInsertSchema.parse(body);

    // Remove organizationId (comes from tenant context, not client)
    const { organizationId: _, ...data } = validated as any;

    const result = await entityService.createEntity(request, data);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error.message },
        { status: result.error.code === 'NO_TENANT' ? 401 : 500 }
      );
    }

    return NextResponse.json({ data: result.data }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### PATCH (Update)

```typescript
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = EntityUpdateSchema.parse(body);

    const { organizationId: _, ...data } = validated as any;

    const result = await entityService.updateEntity(request, data);

    if (!result.ok) {
      const status = result.error.code === 'NO_TENANT' ? 401 
        : result.error.code === 'NOT_FOUND' ? 404 : 500;
      return NextResponse.json({ error: result.error.message }, { status });
    }

    return NextResponse.json({ data: result.data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Common Failure Modes

### 1. Missing Input Validation

**Problem**: Route accepts invalid data

**Solution**: Always validate with Zod:
```typescript
const validated = EntityInsertSchema.parse(body);
```

### 2. Not Checking result.ok

**Problem**: Accessing `result.data` without checking `result.ok`

**Solution**: Always check first:
```typescript
if (!result.ok) {
  return NextResponse.json({ error: result.error.message }, { status: 500 });
}
// Now safe to access result.data
```

### 3. Wrong HTTP Status Codes

**Problem**: Using 200 for all responses

**Solution**: Use appropriate status codes:
- `200` - Success (GET, PATCH, DELETE)
- `201` - Created (POST)
- `400` - Validation error
- `401` - No tenant context
- `404` - Not found
- `500` - Server error

### 4. Not Handling Zod Errors

**Problem**: Zod validation errors not returned properly

**Solution**: Check for `z.ZodError`:
```typescript
if (error instanceof z.ZodError) {
  return NextResponse.json({ error: error.issues }, { status: 400 });
}
```

---

## Validation

After making any route changes:

```bash
npx tsc --noEmit
```

**Required Status**: No TypeScript errors (Layer 4 LOCKED)

Validation checklist:
- ✅ All routes validate inputs with Zod
- ✅ All routes check `result.ok` before accessing data
- ✅ All routes use appropriate HTTP status codes
- ✅ All routes handle errors properly (try-catch)
- ✅ All routes handle Zod validation errors
- ✅ No TypeScript errors in route files

---

## Rules

### ✅ Always Do

- Validate ALL inputs with Zod (`.parse()` or `.safeParse()`)
- Check `result.ok` before accessing `result.data`
- Use appropriate HTTP status codes
- Wrap in try-catch blocks
- Return consistent response format: `{ data }` or `{ error }`
- Import types and schemas from `lib/schemas/`
- Pass `request` to service methods (for tenant context)

### ❌ Never Do

- Skip input validation
- Implement business logic in routes (delegate to services)
- Access `result.data` without checking `result.ok`
- Use wrong HTTP status codes
- Let exceptions go unhandled
- Trust `organizationId` from client input

---

## Troubleshooting

### Type Errors

**Problem**: TypeScript errors in routes

**Solution**:
1. Ensure Layer 2 has no TypeScript errors
2. Verify types are imported from Layer 2 schemas
3. Check that `Result<T>` is handled correctly
4. Review TypeScript error messages

### Validation Errors

**Problem**: Routes accept invalid data

**Solution**:
1. Ensure all inputs are validated with Zod
2. Check that validation happens before service calls
3. Verify Zod schemas are correct (Layer 2)

---

## Next Steps

- **Layer 5**: [06_LAYER_5_HOOKS.md](./06_LAYER_5_HOOKS.md) - React hooks
- **Workflow**: [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) - Complete workflow
- **Glossary**: [10_GLOSSARY.md](./10_GLOSSARY.md) - Term definitions

---

**Remember**: Routes are the HTTP interface. They validate, delegate to services, and format responses. Never implement business logic in routes.
