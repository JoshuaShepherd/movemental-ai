# Dashboard route prefix matrix

Single reference for which URL prefixes get workspace chrome (`x-movemental-shell: dashboard` from `proxy.ts`), which Next route group handles them, and how `resolveAuthenticatedShellContext` classifies them.

| Prefix | Route group | `productContext` | Sidebar |
|--------|-------------|------------------|---------|
| `/dashboard`, `/dashboard/*` | `(dashboard)` | `null` | none |
| `/welcome` | `(dashboard)` | `null` | none |
| `/onboarding/*` (rewrites to `/dashboard/onboarding/*`) | `(dashboard)` | `null` | none |
| `/program`, `/program/*` | `(dashboard)` | `null` | none |
| `/admin`, `/admin/*` | `(dashboard)` | `null` | none |
| `/sandboxlive`, `/sandboxlive/*` | `(dashboard)` | `sandbox` | SandboxLive manifest (+ org admin section when applicable) |
| `/safestart`, `/safestart/*` | `(dashboard)` | `safe` | SafeStart manifest |
| `/leader`, `/leader/*` (except `/leader/apply` public) | `(dashboard)` | `leader` (or `null` for apply) | Leader reflection + publish |
| `/agent-runtime` | `(studio)` | *(separate layout — not `AuthenticatedShell`)* | none |

**Related:** [`docs/build/prompts/dashboard-shell-and-navigation-architecture-prompt.md`](../prompts/dashboard-shell-and-navigation-architecture-prompt.md)
