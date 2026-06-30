# Leader profile screen

**Screen id:** `leader`  
**Role:** Trusted voice profile when a visitor taps a portrait on the home leader band (or engine shows a specific leader).

---

## 1. How you get here

| Trigger | Handler |
| --- | --- |
| Leader portrait tap on home | `leaderScene(i)` |
| Live engine | Leader render with id |
| Sub-scenes | `leaderWork`, `leaderConnect` (voice + chips, may stay on leader sheet) |

---

## 2. Entry choreography (approved profile)

1. **Show** leader screen with leader index `id`.
2. Wait ~520ms.
3. **Say:** *"This is {name}."*
4. Wait ~180ms.
5. **Say:** profile **lede** from approved profiles catalog.
6. **Suggest:**
   - **I want simple next steps** (lead) → beat or safety flow depending on chip label in data
   - **What does {first} work on?** → `leaderWork`
   - **How is {first} connected?** → `leaderConnect`
   - **Back to the leaders** → opening

**No approved profile:** Same intro, then *"One of the leaders behind the path. A fuller profile is coming."* — omits "work on" chip.

---

## 3. What appears on the sheet

Leader name, credentials, portrait, lede and body from `profiles.ts` when approved.

Stub content for leaders without full profile.

**Crumb:** ↑ Home.

---

## 4. Sub-scenes (voice only, same or prior sheet)

### `leaderWork`

Voices `profile.workSay` lines or stub fallback about their movement focus.

Chips: connected?, simple next steps, back to leaders.

### `leaderConnect`

Voices `profile.connectSay` or default network lines — Movemental connection, scenius framing.

Chips: work on?, simple next steps, back to leaders.

---

## 5. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

**Portrait tap** (from home) is sheet UI — LOCAL `leaderScene(i)`, not composer. Dock stays collapsed unless visitor expanded manually.

### Float chips on this screen

| Chip | Collapsed | Expanded |
| --- | --- | --- |
| **I want simple next steps** (lead) | LOCAL → beat or safety flow | LOCAL |
| **What does {first} work on?** | LOCAL → `leaderWork` (voice) | LOCAL |
| **How is {first} connected?** | LOCAL → `leaderConnect` (voice) | LOCAL |
| **Back to the leaders** | LOCAL → opening / home | LOCAL |

Sub-scene chips (work / connect) are voice-only — **no sheet change**.

### Type in the composer on this screen

| Input | Typical result |
| --- | --- |
| *"who"*, *"about"* (navigation) | LOCAL → founders or about |
| Questions about this leader | AGENT — engine may use `file_search` on leader corpus |
| `chatActive` true | AGENT only |

### Sheet vs drawer

Leader profile visible when dock collapsed. AGENT turn expands drawer; profile hidden until collapse. Voice sub-scenes keep leader sheet mounted.

---

## 6. Related pages

- [01-home.md](./01-home.md) — portrait band source
- [18-engine-overlays.md](./18-engine-overlays.md) — network constellation (related)
