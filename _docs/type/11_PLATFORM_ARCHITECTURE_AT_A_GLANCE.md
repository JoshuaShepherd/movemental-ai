# Platform Architecture at a Glance

> **What kind of site this is** - Technical stack and structure overview

**Version**: 1.1.0  
**Last Updated**: January 2026

---

## Overview

This platform is a **multi-tenant content and learning management system** built on modern web technologies. It provides a shared foundation ("bones") that can be customized for different organizations while maintaining type safety and architectural consistency.

---

## Tech Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library (do not modify `components/ui/`)

### Backend

- **Next.js API Routes**: Server-side API endpoints
- **Supabase**: PostgreSQL database + authentication
- **Drizzle ORM**: Type-safe database queries
- **Zod**: Runtime validation + TypeScript types

### Data Layer

- **Supabase PostgreSQL**: Primary database
- **Drizzle Schema**: Type-safe database definitions (`db/schema.ts`)
- **Zod Schemas**: Runtime validation + types SSOT (`lib/schemas/`)
- **Services**: Business logic layer (`lib/services/simplified/`)
- **API Routes**: HTTP interface (`app/api/simplified/`)
- **React Hooks**: Data fetching layer (`hooks/simplified/`)

### Deployment

- **Vercel**: Hosting and deployment platform
- **Supabase**: Database hosting

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
- Validate each layer before proceeding
- Database schema (Layer 1) = Structure SSOT
- Zod schemas (Layer 2) = TypeScript Types SSOT

**See**: [01_OVERVIEW.md](./01_OVERVIEW.md) for complete type safety chain documentation.

---

## Agents Posture (High Level)

**What**: AI agents can be integrated to provide content generation, analysis, and assistance.

**How**: 
- Agents operate within the type safety chain
- Agents use services (Layer 3) for data access
- Agents respect tenant boundaries
- Agent outputs validated with Zod schemas

**Note**: This documentation focuses on platform "bones" only. Agent-specific content and voice/style documentation is tenant-specific and not included here.

---

## Deployment Posture

### Vercel

**Platform**: Vercel (Next.js optimized hosting)

**Process**:
1. Code pushed to git repository
2. Vercel automatically builds and deploys
3. Environment variables configured in Vercel dashboard
4. Database migrations run automatically (or manually)

**Environments**:
- **Production**: Main deployment
- **Preview**: Automatic preview deployments for PRs
- **Development**: Local development with `npm run dev`

### Supabase

**Platform**: Supabase (PostgreSQL database)

**Process**:
1. Database schema defined in Drizzle (`db/schema.ts`)
2. Migrations generated with `npm run db:generate`
3. Migrations applied with `npm run db:push`
4. Database accessible via Supabase dashboard

---

## Multi-Tenant Posture (High Level)

### Architecture

**What**: Multiple organizations share the same codebase but have isolated data.

**How**:
- Tenant resolution from subdomain/custom domain
- Tenant context available in services
- All queries automatically filter by `organizationId`
- Tenant boundaries enforced at service layer (Layer 3)

### Tenant Isolation

**Database**: Each tenant-scoped table includes `organizationId` field

**Services**: All queries filter by tenant automatically

**Routes**: Tenant context passed from middleware to services

**UI**: Tenant-agnostic—tenant scoping is transparent

**See**: [09_MULTI_TENANT_NOTES.md](./09_MULTI_TENANT_NOTES.md) for detailed tenant scoping information.

---

## File Structure

### Key Directories

```
├── app/                      # Next.js App Router pages
│   ├── (public)/            # Public pages (fit-check, team, pricing, etc.)
│   ├── api/                 # API routes (Layer 4)
│   │   └── simplified/      # Entity API routes
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
│   ├── providers/          # React providers (React Query)
│   ├── schemas/            # Zod schemas (Layer 2) - Types SSOT
│   │   ├── index.ts       # Entity schemas
│   │   ├── base.ts        # Base schemas
│   │   ├── fit-check.ts   # Fit Check types
│   │   └── onboarding-path.ts  # Onboarding path types
│   └── services/           # Services (Layer 3)
│       └── simplified/     # Entity services
└── _docs/                   # Documentation (single source of truth)
    └── type/               # Type safety chain documentation
```

---

## Development Workflow

### Adding a Feature

1. **Layer 1**: Add table to Drizzle schema → `npm run db:generate` → `npm run db:push`
2. **Layer 2**: Add Zod schemas + type exports (Filters schema manual)
3. **Layer 3**: Create service
4. **Layer 4**: Create routes
5. **Layer 5**: Create hooks
6. **Layer 6**: Create UI components
7. **Validate**: `npx tsc --noEmit`

**See**: [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) for detailed workflow.

### Validation Command

```bash
# TypeScript type checking (validates all layers at once)
npx tsc --noEmit
```

This single command validates all layers. Errors will show the file and line number.

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

## Getting Started

### For Developers

1. **Read**: [01_OVERVIEW.md](./01_OVERVIEW.md) to understand the type safety chain
2. **Read**: [08_CHAIN_WORKFLOW_CHECKLIST.md](./08_CHAIN_WORKFLOW_CHECKLIST.md) for workflow
3. **Read**: [12_PUBLIC_SITEMAP_AND_FEATURES.md](./12_PUBLIC_SITEMAP_AND_FEATURES.md) for site structure

### For Cursor Agents

1. **Understand**: The six-layer type safety chain
2. **Follow**: The workflow checklist when making changes
3. **Validate**: `npx tsc --noEmit` after each layer
4. **Fix**: Errors bottom-up (Layer 1 → 6)

---

**Remember**: This is a shared foundation. Customize content and branding per tenant, but maintain the type safety chain and architectural principles.
