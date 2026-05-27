# Platform Architecture at a Glance

> **What kind of site this is** - Technical stack and structure overview

**Version**: 2.0.0  
**Last Updated**: January 2026

---

## Overview

This platform is a **multi-tenant content and learning management system** built on modern web technologies. It provides a shared foundation ("bones") that can be customized for different organizations while maintaining type safety and architectural consistency.

---

## Tech Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js | React framework with App Router | 16.1.4 |
| React | UI library | 19.2.3 |
| TypeScript | Type-safe JavaScript | 5.9.3 |
| Tailwind CSS | Utility-first CSS framework | 4.1.18 |
| shadcn/ui | Component library (Radix-based) | Latest |
| Framer Motion | Animation library | 12.29.0 |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| Next.js API Routes | Server-side API endpoints | Built-in |
| Supabase | PostgreSQL database + authentication | 2.91.0 |
| Drizzle ORM | Type-safe database queries | 0.45.1 |
| drizzle-zod | Schema-to-Zod generation | 0.8.3 |
| Zod | Runtime validation | 4.3.5 |

### Data Layer

| Layer | Technology | Location |
|-------|------------|----------|
| Database | Supabase PostgreSQL | Cloud |
| Schema | Drizzle ORM | `db/schema.ts` |
| Types | Zod schemas | `lib/schemas/` |
| Services | TypeScript classes | `lib/services/simplified/` |
| API Routes | Next.js handlers | `app/api/simplified/` |
| Hooks | React Query | `hooks/simplified/` |

### State Management

| Technology | Purpose | Version |
|------------|---------|---------|
| React Query | Server state management | 5.90.19 |
| Zustand | Client state management | 5.0.10 |
| React Hook Form | Form state management | 7.71.1 |

---

## UI System

### Tailwind + shadcn Usage Rules

**Tailwind CSS**:
- Use utility classes for styling
- Follow design system tokens (defined in `tailwind.config.ts`)
- Never hardcode colors—use design tokens

**shadcn/ui**:
- Components in `components/ui/` are managed by shadcn
- **DO NOT MODIFY** `components/ui/` directly
- Use shadcn components as building blocks
- Customize via props and composition
- Add new components: `npx shadcn@latest add [component]`

**Design System**:
- Color tokens defined in `app/globals.css`
- Exported via `tailwind.config.ts`
- Use semantic color names (e.g., `accent`, `primary`, `secondary`)

---

## Data Layer Posture

### Six-Layer Type Safety Chain

```
Layer 1: Database (Drizzle Schema) → db/schema.ts (Structure SSOT)
Layer 2: Zod Schemas → lib/schemas/ (Types SSOT)
Layer 3: Services → lib/services/simplified/
Layer 4: Routes → app/api/simplified/
Layer 5: Hooks → hooks/simplified/
Layer 6: UI → components/
```

**Key Principles**:
- Types flow downstream, never upstream
- Fix errors bottom-up (Layer 1 → 6)
- Validate each layer before proceeding (`npx tsc --noEmit`)
- Database schema (Layer 1) = Structure SSOT
- Zod schemas (Layer 2) = TypeScript Types SSOT

**See**: [01_OVERVIEW.md](./01_OVERVIEW.md) for complete type safety chain documentation.

---

## Multi-Tenant Posture

### Architecture

**What**: Multiple organizations share the same codebase but have isolated data.

**How**:
- Tenant resolution from subdomain/custom domain/header
- Tenant context available in services via `getOrganizationId(request)`
- All queries automatically filter by `organizationId`
- Tenant boundaries enforced at service layer (Layer 3)

### Tenant Isolation

| Layer | Responsibility |
|-------|---------------|
| Database | Tables include `organizationId` field |
| Services | All queries filter by tenant |
| Routes | Pass request to services |
| UI | Tenant-agnostic (transparent) |

**See**: [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) for detailed tenant scoping information.

---

## File Structure

### Key Directories

```
├── app/                      # Next.js App Router pages
│   ├── (public)/            # Public pages (fit-check, team, pricing, etc.)
│   ├── api/                 # API routes (Layer 4)
│   │   ├── onboarding/      # File upload routes
│   │   └── simplified/      # Entity API routes
│   │       └── onboarding-responses/
│   └── dashboard/           # Dashboard pages
├── components/              # UI components (Layer 6)
│   └── ui/                 # shadcn/ui components (do not modify)
├── db/                      # Database (Layer 1)
│   ├── index.ts            # Database connection
│   └── schema.ts           # Drizzle schema definitions
├── hooks/                   # React hooks (Layer 5)
│   └── simplified/         # Entity hooks
├── lib/
│   ├── middleware/         # Tenant resolution middleware
│   │   └── tenant.ts       # getOrganizationId()
│   ├── providers/          # React providers (React Query)
│   ├── schemas/            # Zod schemas (Layer 2) - Types SSOT
│   │   ├── index.ts       # Entity schemas
│   │   ├── base.ts        # Base schemas
│   │   ├── fit-check.ts   # Fit Check types
│   │   └── onboarding-path.ts  # Onboarding path types
│   └── services/           # Services (Layer 3)
│       ├── types.ts        # Result<T>, ServiceError
│       ├── simplified-base.ts  # Base service class
│       └── simplified/     # Entity services
└── _docs/                   # Documentation
    └── type/               # Type safety chain documentation
```

---

## Development Workflow

### Adding a Feature

1. **Layer 1**: Add table to Drizzle schema → `npm run db:generate` → `npm run db:push`
2. **Layer 2**: Add Zod schemas + type exports (Filters schema manual)
3. **Layer 3**: Create service extending `SimplifiedService`
4. **Layer 4**: Create routes
5. **Layer 5**: Create hooks with React Query
6. **Layer 6**: Create UI components
7. **Validate**: `npx tsc --noEmit`

**See**: [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) for detailed workflow.

### Validation Command

```bash
# TypeScript type checking (validates all layers at once)
npx tsc --noEmit
```

---

## Key Commands

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Lint code
```

### Database

```bash
npm run db:generate  # Generate migrations
npm run db:push      # Apply migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio
```

### Validation

```bash
npx tsc --noEmit     # Validate all layers
```

---

## Documentation Structure

### Type Safety Chain

- [01_OVERVIEW.md](./01_OVERVIEW.md) - Chain overview and SSOT definitions
- [02_LAYER_1_DATABASE.md](./02_LAYER_1_DATABASE.md) - Database schema
- [03_LAYER_2_ZOD.md](./03_LAYER_2_ZOD.md) - Zod schemas (Types SSOT)
- [04_LAYER_3_SERVICES.md](./04_LAYER_3_SERVICES.md) - Services
- [05_LAYER_4_ROUTES.md](./05_LAYER_4_ROUTES.md) - API routes
- [06_LAYER_5_HOOKS.md](./06_LAYER_5_HOOKS.md) - React hooks
- [07_LAYER_6_UI.md](./07_LAYER_6_UI.md) - UI components
- [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) - Workflow guide
- [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) - Multi-tenant details
- [10_GLOSSARY.md](./10_GLOSSARY.md) - Term definitions

### Platform Overview

- [11_PLATFORM_ARCHITECTURE_AT_A_GLANCE.md](./11_PLATFORM_ARCHITECTURE_AT_A_GLANCE.md) - This document
- [12_PUBLIC_SITEMAP_AND_FEATURES.md](./12_PUBLIC_SITEMAP_AND_FEATURES.md) - Public site structure

---

## Key Principles

### Type Safety

- **Unidirectional flow**: Types flow downstream (Layer 1 → 6)
- **Bottom-up fixing**: Fix errors from lowest layer
- **Validation**: No TypeScript errors before proceeding
- **Structure SSOT**: Database schema (Layer 1)
- **Types SSOT**: Zod schemas (Layer 2)

### Multi-Tenant

- **Tenant isolation**: Data isolated by `organizationId`
- **Service layer enforcement**: Tenant boundaries at Layer 3
- **Transparent to UI**: UI doesn't need to know about tenants

### Code Quality

- **No direct database edits**: Always use migrations
- **No manual type definitions**: Derive from Zod schemas using `z.infer<>`
- **No business logic in routes**: Delegate to services
- **No direct fetching in UI**: Use hooks

---

**Remember**: This is a shared foundation. Customize content and branding per tenant, but maintain the type safety chain and architectural principles.
