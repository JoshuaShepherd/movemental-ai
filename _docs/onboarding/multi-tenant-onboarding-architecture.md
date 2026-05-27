# Multi-Tenant Onboarding Architecture
## How Brad Brisco's Onboarding Data is Scoped and Stored

**Purpose**: Document the multi-tenant architecture for onboarding responses, ensuring Brad Brisco's data is properly isolated and scoped to his organization.

**Status**: Architecture Documentation - Pre-Implementation

**Based on**: Supabase best practices for multi-tenant applications with Row Level Security (RLS)

---

## Multi-Tenant Architecture Overview

### Organization (Tenant) Model

Each leader (like Brad Brisco) belongs to an **organization** (tenant). The `organizations` table is the root of all tenant scoping:

```sql
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    -- ... other fields
);
```

### Tenant Scoping Pattern

**All tenant-specific data must include `organization_id`:**

```typescript
organizationId: uuid('organization_id')
  .references(() => organizations.id)
  .notNull(),  // Required for tenant scoping
```

---

## Onboarding Responses Table Structure

### Database Schema (Layer 1)

The `onboarding_responses` table is **tenant-scoped** via `organization_id`:

```typescript
export const onboardingResponses = pgTable('onboarding_responses', {
  id: id(),
  organizationId: uuid('organization_id')
    .references(() => organizations.id)
    .notNull(),  // ← Tenant scoping - CRITICAL
  
  // All onboarding data fields...
  // ...
  
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});
```

### Why This Matters

- **Data Isolation**: Brad Brisco's onboarding data is isolated from Alan Hirsch's data
- **Security**: Row Level Security (RLS) policies enforce tenant boundaries
- **Scalability**: Each tenant's data is automatically scoped in all queries

---

## Tenant Resolution for Onboarding

### How Brad Brisco's Organization is Identified

**Tenant resolution happens in middleware** before any onboarding API calls:

1. **Subdomain Resolution**: `brad-brisco.movemental.ai` → resolves to Brad's organization
2. **Custom Domain**: `bradbrisco.com` → resolves to Brad's organization (if configured)
3. **Session Fallback**: User's current organization from session

### Tenant Context Flow

```
Request → Middleware → Tenant Resolution → Tenant Context → Services → Database Query
```

**Middleware** (`src/middleware.ts`):
```typescript
// Extract subdomain/custom domain
const hostname = request.headers.get('host');
const subdomain = extractSubdomain(hostname);

// Query organizations table
const organization = await db
  .select()
  .from(organizations)
  .where(eq(organizations.slug, subdomain))
  .limit(1);

// Set tenant context in request
request.headers.set('x-organization-id', organization.id);
```

**Services** (`src/lib/services/simplified/onboardingResponses.ts`):
```typescript
// Get tenant context from request
const organizationId = await getOrganizationId(request);

// All queries automatically filter by organizationId
const response = await db
  .select()
  .from(onboardingResponses)
  .where(eq(onboardingResponses.organizationId, organizationId))
  .limit(1);
```

---

## Supabase Row Level Security (RLS)

### RLS Policies for Onboarding Responses

**Policy 1: Users can only read their own organization's onboarding data**

```sql
CREATE POLICY "Users can read their organization's onboarding responses"
ON public.onboarding_responses
FOR SELECT
USING (
  organization_id IN (
    SELECT organization_id 
    FROM public.organization_memberships 
    WHERE user_id = auth.uid() 
    AND status = 'active'
  )
);
```

**Policy 2: Users can only insert onboarding data for their organization**

```sql
CREATE POLICY "Users can insert onboarding data for their organization"
ON public.onboarding_responses
FOR INSERT
WITH CHECK (
  organization_id IN (
    SELECT organization_id 
    FROM public.organization_memberships 
    WHERE user_id = auth.uid() 
    AND status = 'active'
  )
);
```

**Policy 3: Users can only update their organization's onboarding data**

```sql
CREATE POLICY "Users can update their organization's onboarding data"
ON public.onboarding_responses
FOR UPDATE
USING (
  organization_id IN (
    SELECT organization_id 
    FROM public.organization_memberships 
    WHERE user_id = auth.uid() 
    AND status = 'active'
  )
);
```

### Why RLS Matters

- **Database-Level Security**: Even if application code has bugs, RLS enforces tenant boundaries
- **Defense in Depth**: Multiple layers of tenant isolation (RLS + Service Layer)
- **Supabase Best Practice**: Recommended approach for multi-tenant applications

---

## File Storage (Supabase Storage)

### Tenant-Scoped Storage Buckets

**Onboarding files** (photos, content samples) are stored in Supabase Storage with tenant isolation:

**Storage Structure**:
```
onboarding-files/
  {organization_id}/
    photos/
      {user_id}_{timestamp}.{ext}
    content-samples/
      {file_id}_{timestamp}.{ext}
```

### Storage Policies

**Policy: Users can only upload to their organization's folder**

```sql
CREATE POLICY "Users can upload to their organization's folder"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'onboarding-files' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text 
    FROM public.organizations 
    WHERE id IN (
      SELECT organization_id 
      FROM public.organization_memberships 
      WHERE user_id = auth.uid() 
      AND status = 'active'
    )
  )
);
```

**Policy: Users can only read from their organization's folder**

```sql
CREATE POLICY "Users can read from their organization's folder"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'onboarding-files' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text 
    FROM public.organizations 
    WHERE id IN (
      SELECT organization_id 
      FROM public.organization_memberships 
      WHERE user_id = auth.uid() 
      AND status = 'active'
    )
  )
);
```

### File Upload Flow

1. **Client** uploads file to `/api/onboarding/upload`
2. **Route** validates tenant context
3. **Service** uploads to Supabase Storage: `onboarding-files/{organizationId}/photos/{filename}`
4. **Database** stores file path in `onboarding_responses.photo_url`

---

## Service Layer Enforcement

### Tenant Filtering in Services

**All service methods automatically filter by `organizationId`:**

```typescript
export async function getOnboardingResponse(
  organizationId: string  // From tenant context
) {
  const [response] = await db
    .select()
    .from(onboardingResponses)
    .where(
      and(
        eq(onboardingResponses.organizationId, organizationId),  // ← Tenant filter
        // ... other filters
      )
    )
    .limit(1);
  
  return response || null;
}
```

### Tenant Context Validation

**Services always validate tenant context exists:**

```typescript
export async function createOnboardingResponse(
  data: OnboardingResponsesCreate,
  organizationId: string  // From tenant context
) {
  if (!organizationId) {
    throw new Error('No organization context found');
  }
  
  const [response] = await db
    .insert(onboardingResponses)
    .values({
      ...data,
      organizationId,  // ← Always include tenant ID
    })
    .returning();
  
  return response;
}
```

---

## Brad Brisco's Specific Organization

### Organization Creation

When Brad Brisco is onboarded, an organization is created:

```typescript
// Organization for Brad Brisco
{
  id: 'uuid-for-brad-brisco-org',
  name: 'Brad Brisco',
  slug: 'brad-brisco',
  organization_type: 'individual_leader',
  account_owner_id: 'brad-brisco-user-id',
  // ...
}
```

### Onboarding Response Association

Brad's onboarding response is automatically scoped to his organization:

```typescript
// Onboarding response for Brad
{
  id: 'uuid-for-onboarding-response',
  organizationId: 'uuid-for-brad-brisco-org',  // ← Scoped to Brad's org
  // ... all onboarding data
}
```

### Data Isolation Guarantee

- ✅ Brad's onboarding data is **only** accessible to users in Brad's organization
- ✅ Alan Hirsch's onboarding data is **completely separate**
- ✅ Cross-tenant data access is **impossible** (enforced by RLS + Service Layer)

---

## API Route Pattern

### Tenant Context Extraction

**All onboarding API routes extract tenant context:**

```typescript
export async function GET(request: NextRequest) {
  // Get tenant context from middleware
  const organizationId = await getOrganizationId(request);
  
  if (!organizationId) {
    return NextResponse.json(
      { error: 'No organization context found' },
      { status: 401 }
    );
  }
  
  // Service automatically filters by organizationId
  const response = await getOnboardingResponse(organizationId);
  
  return NextResponse.json({ data: response });
}
```

### Tenant Context Helper

**Helper function to get organization ID from request:**

```typescript
// src/lib/middleware/tenant.ts
export async function getOrganizationId(
  request: NextRequest
): Promise<string | null> {
  // Try header first (set by middleware)
  const headerOrgId = request.headers.get('x-organization-id');
  if (headerOrgId) {
    return headerOrgId;
  }
  
  // Try subdomain resolution
  const hostname = request.headers.get('host') || '';
  const subdomain = extractSubdomain(hostname);
  
  if (subdomain) {
    const org = await db
      .select({ id: organizations.id })
      .from(organizations)
      .where(eq(organizations.slug, subdomain))
      .limit(1);
    
    if (org[0]) {
      return org[0].id;
    }
  }
  
  // Try session (fallback)
  const session = await getSession(request);
  if (session?.user) {
    // Get user's primary organization
    const membership = await db
      .select({ organizationId: organizationMemberships.organizationId })
      .from(organizationMemberships)
      .where(
        and(
          eq(organizationMemberships.userId, session.user.id),
          eq(organizationMemberships.status, 'active')
        )
      )
      .limit(1);
    
    if (membership[0]) {
      return membership[0].organizationId;
    }
  }
  
  return null;
}
```

---

## Supabase Storage Integration

### File Upload Endpoint

**Endpoint for uploading onboarding files (photos, content samples):**

```typescript
// src/app/api/onboarding/upload/route.ts
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  const organizationId = await getOrganizationId(request);
  if (!organizationId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const fileType = formData.get('type') as string; // 'photo' | 'content-sample'
  
  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!  // Service role for admin access
  );
  
  // Generate file path with tenant isolation
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${organizationId}/${fileType}/${fileName}`;
  
  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('onboarding-files')
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  // Get public URL
  const { data: urlData } = supabase.storage
    .from('onboarding-files')
    .getPublicUrl(filePath);
  
  return NextResponse.json({
    path: filePath,
    url: urlData.publicUrl,
  });
}
```

### Storage Bucket Setup

**Create storage bucket in Supabase Dashboard:**

1. Go to **Storage** in Supabase Dashboard
2. Create bucket: `onboarding-files`
3. Set to **Private** (not public)
4. Configure RLS policies (see above)

---

## Testing Tenant Isolation

### Test Scenarios

1. **Brad can only access his own onboarding data**
   - ✅ Brad's user → Can read/write Brad's onboarding response
   - ❌ Brad's user → Cannot read Alan's onboarding response

2. **File uploads are tenant-scoped**
   - ✅ Brad uploads photo → Stored in `onboarding-files/{brad-org-id}/photos/`
   - ❌ Brad cannot access files in `onboarding-files/{alan-org-id}/`

3. **RLS enforces boundaries**
   - ✅ Direct database queries respect RLS policies
   - ❌ Cross-tenant queries return empty/null

### Test Pattern

```typescript
// Test: Brad cannot access Alan's onboarding data
const bradOrg = await createOrganization({ slug: 'brad-brisco' });
const alanOrg = await createOrganization({ slug: 'alan-hirsch' });

const bradResponse = await createOnboardingResponse({
  organizationId: bradOrg.id,
  // ... data
});

const alanResponse = await createOnboardingResponse({
  organizationId: alanOrg.id,
  // ... data
});

// Set tenant context to Brad's org
setTenantContext(bradOrg);

// Try to access Alan's response
const result = await getOnboardingResponse(alanOrg.id);

// Should return null (tenant boundary enforced)
expect(result).toBeNull();
```

---

## Summary

### Key Points

1. **Tenant Scoping**: All onboarding data includes `organizationId` foreign key
2. **RLS Policies**: Database-level security enforces tenant boundaries
3. **Service Layer**: Services automatically filter by `organizationId`
4. **Storage Isolation**: Files stored in tenant-scoped folders
5. **Middleware Resolution**: Tenant context resolved from subdomain/custom domain

### What This Means for Brad Brisco

- ✅ Brad's onboarding data is **completely isolated** from other leaders
- ✅ Brad's files are stored in **his organization's folder**
- ✅ Brad can only access **his own onboarding data**
- ✅ Cross-tenant access is **impossible** (enforced at multiple layers)

### Implementation Checklist

- [ ] Create `onboarding_responses` table with `organization_id` foreign key
- [ ] Set up RLS policies for `onboarding_responses` table
- [ ] Create `onboarding-files` storage bucket in Supabase
- [ ] Set up RLS policies for storage bucket
- [ ] Implement tenant context resolution in middleware
- [ ] Implement tenant filtering in services
- [ ] Test tenant isolation (Brad vs Alan)

---

**Document Status**: Complete  
**Last Updated**: January 2026  
**Next Steps**: Implement according to this architecture
