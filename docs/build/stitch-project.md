# Stitch Source of Truth

## The only project that matters

**Project ID:** `2208910962065880866`

This is the **single** Stitch project that informs the movemental build. Every screen, component, layout, and interaction pattern in this repo is derived from screens inside this project.

Any other Stitch projects in the account (there are many) are out of scope. Do not list, read, fork, or reference them. When any tool requires a project ID, it is always `2208910962065880866` unless the task is explicitly about a different project.

## How to access it

### Via Stitch MCP (preferred for Claude agents)

```ts
// List all screens in the project
mcp__stitch__list_screens({ projectId: "2208910962065880866" })

// Fetch the full project manifest (heavy — prefer list_screens when possible)
mcp__stitch__get_project({ name: "projects/2208910962065880866" })

// Fetch a single screen's HTML/Tailwind source
mcp__stitch__get_screen({ name: "projects/2208910962065880866/screens/<SCREEN_ID>" })
```

`list_projects` responses are large (hundreds of KB). **Never** call it as part of the migration flow — go straight to `list_screens` with the pinned project ID.

### Via the Stitch web UI

<https://stitch.withgoogle.com> → open the project whose URL ends in `2208910962065880866`.

## Scope guardrails

- **Only this project** feeds components into `src/`. If a screen isn't in project `2208910962065880866`, it doesn't belong here.
- **Screens are the unit of work.** Each Stitch screen maps to either a Next.js route (`src/app/...`) or a reusable component tree (`src/components/...`), never both.
- **No mixed sources.** Do not paste HTML from Stitch web UI screenshots; always fetch via `mcp__stitch__get_screen` so the agent has the canonical markup.
