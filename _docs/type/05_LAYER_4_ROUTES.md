# Layer 4: Routes (API Endpoints)

> **Type-Safe HTTP Interface** with Next.js App Router

**Layer**: 4 of 6  
**Directory**: `app/api/simplified/`  
**Validation**: `npx tsc --noEmit`  
**Status Required**: No TypeScript errors

---

## Overview

API routes provide **RESTful HTTP endpoints** using Next.js App Router. They validate requests with Zod schemas, call services for business logic, and return properly typed responses with consistent error handling.

### Key Principles

1. **Input Validation**: All inputs validated with Zod `.safeParse()`
2. **Service Integration**: All business logic delegated to services (Layer 3)
3. **Result Handling**: Handle `Result<T>` types from services
4. **Consistent Responses**: Standardized response format for success/error
5. **Proper Status Codes**: Use appropriate HTTP status codes
6. **Type Safety**: All types derived from Zod schemas (Layer 2)

---

## Current Route Structure

```
app/api/
├── onboarding/
│   └── upload/
│       └── route.ts          # File upload handling
└── simplified/
    └── onboarding-responses/
        ├── route.ts          # GET list, POST create
        └── complete/
            └── route.ts      # POST complete onboarding
```

---

## Route Conventions

### Structure

```
app/api/simplified/{entity}/
  ├── route.ts          # List handler (GET, POST)
  └── [id]/route.ts     # Detail handler (GET, PATCH, DELETE)
```

### HTTP Methods

- **GET** `/api/simplified/{entity}` - List entities
- **POST** `/api/simplified/{entity}` - Create entity
- **GET** `/api/simplified/{entity}/[id]` - Get entity by ID
- **PATCH** `/api/simplified/{entity}/[id]` - Update entity
- **DELETE** `/api/simplified/{entity}/[id]` - Delete entity

---

## Validation, Auth, Tenant Scope

### Input Validation

All inputs must be validated with Zod:

```typescript
import { OnboardingResponsesInsertSchema } from '@/lib/schemas';

export async function POST(req: NextRequest) {
  const json = await req.json();
  
  // Validate with Zod
  const parsed = OnboardingResponsesInsertSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } },
      { status: 400 }
    );
  }
  
  // Call service with validated data
  const result = await onboardingResponsesService.create(parsed.data);
  // ...
}
```

### Authentication

Authentication is handled by middleware. Routes receive authenticated user context:

```typescript
// User context available via getServerSession() or similar
// Tenant context available via getTenantContext()
```

### Tenant Scope

Tenant scoping happens automatically in services (Layer 3). Routes don't need to manually filter by tenant—services handle it.

---

## Error Surface Patterns

### Success Response

```typescript
return NextResponse.json(
  { success: true, data: result.data },
  { status: 201 }  // 201 for create, 200 for read/update
);
```

### Error Response

```typescript
return NextResponse.json(
  {
    error: {
      code: result.error.code,
      message: result.error.message
    }
  },
  { status: 400 }  // 400 for validation, 404 for not found, 500 for server errors
);
```

### Status Code Mapping

| Service Error | HTTP Status | Description |
|--------------|-------------|-------------|
| `NOT_FOUND` | 404 | Entity not found |
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `DB_ERROR` | 500 | Database operation failed |
| `PERMISSION_DENIED` | 403 | User lacks permission |
| `DUPLICATE_ENTRY` | 409 | Unique constraint violation |

---

## Common Patterns

### GET (List)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { OnboardingResponsesFiltersSchema } from '@/lib/schemas';
import { onboardingResponsesService } from '@/lib/services/simplified/onboardingResponses';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const filters = {
      limit: Number(url.searchParams.get("limit")) || 25,
      offset: Number(url.searchParams.get("offset")) || 0,
      // ... other filters
    };
    
    const parsed = OnboardingResponsesFiltersSchema.safeParse(filters);
    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid filters' } },
        { status: 400 }
      );
    }
    
    const result = await onboardingResponsesService.findMany(parsed.data);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error.code === 'NOT_FOUND' ? 404 : 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: result.data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
```

### POST (Create)

```typescript
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    
    const parsed = OnboardingResponsesInsertSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } },
        { status: 400 }
      );
    }
    
    const result = await onboardingResponsesService.create(parsed.data);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: result.data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
```

### GET [id] (Get by ID)

```typescript
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const result = await onboardingResponsesService.findById(id);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error.code === 'NOT_FOUND' ? 404 : 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: result.data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
```

### PATCH [id] (Update)

```typescript
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const json = await req.json();
    
    const parsed = OnboardingResponsesUpdateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', message: 'Invalid input' } },
        { status: 400 }
      );
    }
    
    const result = await onboardingResponsesService.update(id, parsed.data);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error.code === 'NOT_FOUND' ? 404 : 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: result.data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
```

### DELETE [id] (Delete)

```typescript
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const result = await onboardingResponsesService.delete(id);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error.code === 'NOT_FOUND' ? 404 : 500 }
      );
    }
    
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
```

---

## Common Failure Modes

### 1. Missing Input Validation

**Problem**: Route accepts invalid data

**Solution**: Always validate with Zod `.safeParse()`:
```typescript
const parsed = OnboardingResponsesInsertSchema.safeParse(json);
if (!parsed.success) {
  return NextResponse.json({ error: ... }, { status: 400 });
}
```

### 2. Not Checking result.ok

**Problem**: Accessing `result.data` without checking `result.ok`

**Solution**: Always check `result.ok`:
```typescript
if (!result.ok) {
  return NextResponse.json({ error: result.error }, { status: 500 });
}
// Now safe to access result.data
```

### 3. Wrong HTTP Status Codes

**Problem**: Using 200 for all responses

**Solution**: Use appropriate status codes:
- `200` - Success (GET, PATCH, DELETE)
- `201` - Created (POST)
- `400` - Validation error
- `404` - Not found
- `500` - Server error

### 4. Not Handling Errors

**Problem**: Unhandled exceptions crash the API

**Solution**: Wrap in try-catch:
```typescript
try {
  // ... route logic
} catch (error) {
  return NextResponse.json(
    { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
    { status: 500 }
  );
}
```

---

## Validation

After making any route changes:

```bash
npx tsc --noEmit
```

**Required Status**: No TypeScript errors

Validation checks:
- ✅ All routes validate inputs with Zod
- ✅ All routes check `result.ok` before accessing data
- ✅ All routes use appropriate HTTP status codes
- ✅ All routes handle errors properly
- ✅ No TypeScript errors in route files

---

## Rules

### ✅ Always Do

- Validate ALL inputs with Zod `.safeParse()`
- Check `result.ok` before accessing `result.data`
- Use appropriate HTTP status codes
- Wrap in try-catch blocks
- Return consistent response format
- Import types from `lib/schemas/`

### ❌ Never Do

- Skip input validation
- Implement business logic in routes
- Access `result.data` without checking `result.ok`
- Use wrong HTTP status codes
- Let exceptions go unhandled

---

## Troubleshooting

### Type Errors

**Problem**: TypeScript errors in routes

**Solution**:
1. Ensure Layer 2 has no TypeScript errors (`npx tsc --noEmit`)
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

- **Layer 5**: Read [06_LAYER_5_HOOKS.md](./06_LAYER_5_HOOKS.md) to understand how hooks call routes
- **Workflow**: Read [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) for complete workflow
- **Glossary**: Read [10_GLOSSARY.md](./10_GLOSSARY.md) for term definitions

---

**Remember**: Routes are the HTTP interface. They validate, delegate to services, and format responses. Never implement business logic in routes.
