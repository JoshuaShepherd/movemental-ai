# Scenius Network — Node avatar images (beyond Brad & Alan)

> **Purpose:** What additional node images should look like when you add real avatars for other movement leaders (Michael Frost, Deb Hirsch, Lance Ford, etc.) instead of letter placeholders.

**Last updated:** February 2026

---

## Current assets

| Node        | Asset type     | Location / source |
|------------|----------------|-------------------|
| **Alan Hirsch** | Illustration | `public/media-library/images/network/alan-hirsch-illustration-headshot.png` |
| **Brad Brisco** | Photo (headshot) | `public/media-library/images/headshots/brad-brisco/brad-brisco-studio-backdrop-3x4.webp` |
| **All others**  | Letter avatars (fallback) | `ui-avatars.com` (initials on sage background) |

Avatar resolution is in `components/scenius-visualization/network-data.ts`: `avatarUrl(name, id)` returns a local path when `id` is `alan-hirsch` or `brad-brisco`, otherwise the UI Avatars URL.

---

## Spec for “non–Brad and Alan” images (when you add more)

If you commission or add real images for other nodes (e.g. Michael Frost, Deb Hirsch, Lance Ford), use one of these approaches so the graph stays visually consistent.

### Option A — Match Alan (illustration style) — **recommended for consistency**

- **Format:** Digital illustration, not photo.
- **Composition:** Headshot or upper torso; face clearly recognizable.
- **Style:** Clean black outlines; solid or subtly shaded color; recognizable but simplified (vector/cartoon aesthetic).
- **Background:** Solid, preferably **black**, so the asset can be dropped onto the dark graph without visible seams. No complex backgrounds.
- **Colors:** Solid, vibrant where appropriate (e.g. clothing); skin tones and hair with light shading for depth.
- **Output:** PNG with transparency or black background. Square or near-square (e.g. 1:1) works best; the node component clips to a circle and uses `preserveAspectRatio="xMidYMid slice"`.
- **Size:** At least **256×256 px** (nodes display at ~18–56 px radius; 128–256 px source is enough for sharp circles).

**Reference:** `public/media-library/images/network/alan-hirsch-illustration-headshot.png` — use this as the style reference for any new illustration-based node avatars.

### Option B — Match Brad (photo headshot)

- **Format:** Photo (e.g. WebP or PNG).
- **Composition:** Headshot or head-and-shoulders; neutral or studio-style backdrop.
- **Background:** Prefer simple or studio backdrop so the circular clip looks clean; avoid busy backgrounds that clash with the graph.
- **Output:** WebP preferred; square or 3:4 crop. Same size guidance: at least **256 px** on the short edge.
- **Location:** e.g. `public/media-library/images/headshots/<slug>/<slug>-<variant>.webp`, and add a branch in `avatarUrl()` in `network-data.ts` for that node `id`.

---

## Adding a new node image to the codebase

1. Add the file under `public/media-library/images/network/` (illustrations) or `public/media-library/images/headshots/<person-slug>/` (photos).
2. In `components/scenius-visualization/network-data.ts`, in `avatarUrl()`, add a conditional by node `id` (same slug as in `KNOWN_NODES` / persona nodes) returning the path, e.g. `/media-library/images/network/<slug>-illustration-headshot.png`.
3. No change needed in `NetworkNode.tsx` — it already uses `node.avatarUrl` for in-network nodes and clips to a circle.

---

## Summary

- **Alan:** Illustration, black background, clean outlines, headshot → reference for “illustration” node assets.
- **Brad:** Photo headshot → reference for “photo” node assets.
- **Others:** Either match Alan’s illustration style for a unified look, or Brad’s photo style; keep **solid or simple background**, **headshot/upper torso**, and **≥256 px** so circles render sharply.
