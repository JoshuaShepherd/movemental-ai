# Organization Logos — All 3 Movement Leaders

**Last updated:** 2026-02-19

## Summary

| Leader | Orgs in data | Logo files present | Notes |
|--------|--------------|--------------------|--------|
| **Alan Hirsch** | 4 | 4 (webp) | 5Q, 100 Movements, MLC, Forge — tenant JSON updated to `.webp` |
| **Dave Ferguson** | 4 | 4 (png) | Exponential, Community CC, NewThing, Dave Ferguson — scraped and saved |
| **Brad Brisco** | 6 | 6 | 2 SVG (Send Network, New Churches), 2 webp shared (Forge, 100M), 2 png (Missional Press, Missio Alliance) — tenant JSON updated |

**Total unique org logos in this folder:** 14 (some shared across leaders).

---

## Alan Hirsch (4 orgs)

| Organization | File | Format | Status |
|--------------|------|--------|--------|
| 5Q Collective | `5q-collective-logo.webp` | webp | ✅ |
| 100 Movements | `100-movements-logo.webp` | webp | ✅ |
| Movement Leaders Collective | `mlc-logo.webp` | webp | ✅ |
| Forge America | `forge-logo.webp` | webp | ✅ |

---

## Dave Ferguson (4 orgs)

| Organization | File | Format | Status |
|--------------|------|--------|--------|
| Exponential | `exponential-logo.png` | png | ✅ Scraped from exponential.org |
| Community Christian Church | `community-cc-logo.png` | png | ✅ Scraped from communitycc.com |
| NewThing | `newthing-logo.png` | png | ✅ (Exponential logo; NewThing joined Exponential) |
| Dave Ferguson (personal) | `dave-ferguson-logo.png` | png | ✅ Scraped from daveferguson.org |

---

## Brad Brisco (6 orgs)

| Organization | File | Format | Status |
|--------------|------|--------|--------|
| Send Network | `send-network-logo.svg` | svg | ✅ Scraped from namb.net (white logo) |
| New Churches | `new-churches-logo.svg` | svg | ✅ Scraped from newchurches.com |
| Forge America | `forge-logo.webp` | webp | ✅ Shared with Alan |
| 100 Movements | `100-movements-logo.webp` | webp | ✅ Shared with Alan |
| Missional Press | `missional-press-logo.png` | png | ✅ Scraped from missionalpressbooks.com |
| Missio Alliance | `missio-alliance-logo.png` | png | ✅ Scraped (Color-Solid asset; replace with wordmark if preferred) |

---

## Data (tenant JSON)

- **`json-data/tenant/alan.json`** — `logoPath` values updated to `.webp` for all 4 orgs.
- **`json-data/tenant/dave.json`** — unchanged; already references `.png` and all four files exist.
- **`json-data/tenant/brad.json`** — `logoPath` updated: Send Network and New Churches → `.svg`; Forge and 100 Movements → `.webp`.

---

## Where logos were found

- **c:\dev\#source\templates\directories\images\orgs** — Alan’s four were already present as webp (and assorted `image-*` variants). No other logo folders were found under `c:\dev` for Dave/Brad.
- **Missing Dave/Brad logos** — Fetched by scraping org homepages (HTML), extracting image URLs, and downloading into this folder. SVG content was saved with `.svg` extension and tenant JSON updated accordingly.

---

## Optional next steps

1. **Missio Alliance** — Current file is `Color-Solid.png` from their site. If you have a wordmark/logo asset, replace `missio-alliance-logo.png` with that.
2. **NewThing** — Uses Exponential logo; if NewThing provides a distinct legacy logo, add it as `newthing-logo.png` and replace.
3. **Reduce duplication** — Folder contains `image-*-logo-*` responsive variants; consider keeping one canonical file per org if you don’t need multiple sizes.
