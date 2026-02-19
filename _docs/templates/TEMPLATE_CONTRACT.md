# Template Contract v1

One contract that both the in-app Movement Leader template and the static library templates (pastoral-warm, institutional, etc.) can converge on. This enables safe CSS isolation, config-driven activation, and a single mental model.

---

## 1. Activation interface

- **Primary attribute:** `data-template="<id>"`  
  Examples: `data-template="pastoral-warm"`, `data-template="movement-leader"`, `data-template="institutional"`.

- **Optional sub-variant:** `data-variant="<variant>"`  
  Used when a template has multiple section or page variants (e.g. Movement Leader’s `data-variant="colorful-headline"`). Library templates may omit this.

- **Rule:** The root of the template’s styled subtree must be an element that carries `data-template`. All template CSS is scoped under that element (or under a single wrapper that has it). No template styles apply outside that subtree.

---

## 2. Token interface

Templates should provide a **minimal, semantic** set of CSS variables so that the app (or shared components) can rely on a stable contract. Naming uses a single prefix to avoid collisions.

### Required tokens (template contract)

| Token | Purpose |
|-------|--------|
| `--tpl-bg` | Page/wrapper background |
| `--tpl-surface` | Card/panel surface (or use `--tpl-bg-elevated` if already in use) |
| `--tpl-text` | Primary text color |
| `--tpl-muted` | Muted/secondary text (or `--tpl-text-muted`) |
| `--tpl-border` | Default border color |
| `--tpl-accent` | Brand/accent and primary actions |
| `--tpl-radius` | Default border radius |
| `--tpl-shadow` | Default shadow (optional) |
| `--tpl-font-heading` | Heading font stack |
| `--tpl-font-body` | Body/UI font stack |

Templates may add more (e.g. `--tpl-bg-warm`, `--tpl-accent-hover`) as long as they are scoped under the same `[data-template="..."]` root.

### Mapping to existing systems

- **Movement Leader:** Today uses `--mvmt-*`. For contract alignment, the wrapper can define `--tpl-*` as aliases of `--mvmt-*` (e.g. `--tpl-bg: var(--mvmt-surface-light);`, `--tpl-accent: var(--mvmt-accent);`) so shared components can use `--tpl-*` when inside any template.
- **Library (e.g. pastoral-warm):** Static `main.css` uses `:root` with `--bg`, `--text`, `--accent`, etc. The **scoped** version (e.g. `pastoral-warm.scoped.css`) should define the same semantics under `[data-template="pastoral-warm"]` using the `--tpl-*` names so that when we later render a leader site with that template in the app, the contract holds.
- **shadcn:** App default theme uses `--background`, `--foreground`, `--primary`, etc. Templates do not have to override these globally. When a page is rendered inside a template wrapper, components can either use the template’s `--tpl-*` for template-specific UI or keep using shadcn tokens; the contract does not require mapping `--tpl-*` to shadcn, but you may set e.g. `--background: var(--tpl-bg)` on the wrapper if you want shadcn components inside the template to inherit the template look.

---

## 3. Scoping rule

- **All** template CSS must be scoped under `[data-template="<id"]` (or under a single wrapper class that is always used together with that attribute).
- **No** global `body` or `html` resets that affect the rest of the app. Resets (e.g. box-sizing, font) apply only to the template’s root or its descendants.
- Static library pages (standalone HTML) remain document-isolated; when we produce a **scoped** version for in-app use, every selector is prefixed with `[data-template="<id"]`.

---

## 4. File and layer conventions

- **Movement Leader:** Lives in `app/styles/templates/movement-leader.css`, wrapped in `@layer components`, imported only in `app/templates/layout.tsx`. Wrapper has `data-template="movement-leader"` and `data-variant` when applicable.
- **Library scoped exemplars:** Live in `app/styles/templates/library/<id>.scoped.css`. Not imported on any live route until a future “leader site with template” route is implemented. Used as proof-of-concept and as the pattern for other library templates.

---

*See also: `_docs/system-status/TEMPLATE_HARDENING_PLAN.md`, `_docs/system-status/TEMPLATE_SYSTEM_STATUS.md`.*
