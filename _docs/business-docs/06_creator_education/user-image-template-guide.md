# User-Provided Image Integration Guide

This guide outlines how to let users upload a custom image that can replace existing visuals within template experiences, keep that image available for the duration of a session (without persisting it to a database), and adapt current template designs so the variable artwork feels fully native.

---

## 1. Goals & Constraints

- **User control**: Allow an uploaded image to override any default hero, card, or background artwork in the current template system.
- **Session-scoped persistence**: The asset must remain usable while the user stays signed in or within the same browser session, but it should not be saved to long-term storage.
- **Design integrity**: Templates must gracefully handle different aspect ratios, file sizes, and art directions while preserving the Design Game visual rules (contrast, spacing, hover states, etc.).

---

## 2. Image Upload Workflow

1. **Entry points**
   - Global “Custom Artwork” CTA in the design game toolbar or settings drawer.
   - Contextual upload buttons on any template area that supports overrides (hero, cards, callouts).

2. **Upload handling**
   - Accept PNG/JPEG/SVG up to ~5 MB; validate MIME type and dimensions client-side for immediate feedback.
   - Generate responsive renditions after upload (e.g., hero: 1920 px wide, cards: 800 px, thumbnails: 320 px) to avoid layout jank.

3. **Session-only storage**
   - Store the processed binary in memory on the server tied to a session identifier, or keep a signed URL that references an in-memory object store (Redis, in-process cache, or edge KV).
   - Return a short-lived token/reference that templates can request to fetch the image.

4. **Template binding**
   - Maintain a client-side “active artwork” map keyed by template segment (hero, cards, etc.). When the user switches templates, the map gets re-used so the same asset fills the matching slots.

---

## 3. Session Persistence Without a Database

| Option | How it works | Pros | Cons |
| --- | --- | --- | --- |
| **Encrypted session cookie** | Encode a signed URL to a CDN/object cache inside the cookie. Actual binary lives in edge cache or memory bucket. | Zero server session store; easy horizontal scaling. | Cookie size limits (~4 KB) mean the cookie can only hold references, not the file itself. |
| **Server session store (Redis / server memory)** | Save metadata + binary (or signed URL) keyed by session ID. Client keeps only the ID in a cookie. | Simple retrieval; expirable TTL ensures cleanup. | Requires shared cache layer; memory usage needs limits. |
| **Browser Session Storage** | Store base64 string or object URL solely on the client. Templates read from `sessionStorage`. | No backend work; image available across routes/tabs in same session. | Clears on tab close; not accessible to other devices/sessions; size limits per domain. |

**Recommended hybrid**:
1. Upload goes to an edge storage bucket (e.g., Supabase storage or S3) with a short TTL.
2. Server issues a signed URL + metadata and stores it in Redis keyed by session.
3. Client keeps only a session token; every template fetches the signed URL through an API (`GET /session-assets/current`) so the same asset is shared across all templates without hitting the database.

Cleanup: set TTL (e.g., 2 hours). A background job purges expired entries from Redis and the temporary bucket.

---

## 4. Template Design Updates

To ensure the custom image integrates seamlessly:

1. **Consistent slot definition**
   - Define explicit artwork slots in each template (`heroMedia`, `movementCardMedia`, `accentTexture`), rather than hard-coding imports.
   - Accept a `TemplateArtwork` prop object so the same data shape feeds every design variant.

2. **Responsive framing**
   - Wrap images in aspect-ratio utilities (`aspect-[16/9]`, `aspect-square`) with `object-cover` to handle mismatched proportions.
   - Provide fallback gradients/backgrounds when no image is supplied.

3. **Contrast-safe overlays**
   - Because user art can vary wildly, add gradient overlays or tint layers with adjustable opacity to keep text legible (`bg-gradient-to-t from-black/60` etc.), honoring the repository’s contrast rules.

4. **Fallback + status UI**
   - Show skeletons/spinners during upload, and a “Revert to default” control.
   - If the session image expires, degrade gracefully to the template’s native artwork.

5. **Animation polish**
   - When images swap, animate opacity/scale to avoid popping, but keep transitions under 300 ms so the interaction feels immediate.

6. **Accessibility**
   - Let the user add alt text during upload; store it alongside the session image metadata.
   - Templates read `artwork.alt` to keep pages screen-reader friendly.

---

## 5. Integration Steps

1. **API layer**
   - `POST /session-assets`: accepts file, validates, stores in temporary bucket, caches metadata in Redis.
   - `GET /session-assets/current`: returns URLs + alt text keyed by session; templates call this on mount.
   - `DELETE /session-assets`: clears the session cache.

2. **Client state**
   - React context (e.g., `SessionArtworkProvider`) fetches once per session and exposes `artwork` + setters.
   - Templates subscribe to the context so swapping templates reuses the same asset instantly.

3. **Template refactor**
   - Replace static imports with props: `heroImage = artwork.hero ?? defaultHero`.
   - Ensure all components specify explicit text colors/composite overlays to satisfy the Design Rules and Violations log.

4. **Testing**
   - Verify upload → hero replacement → template switch retains the image.
   - Test dark mode, high-contrast, and responsive layouts with varied images.
   - Simulate session expiry to confirm graceful fallback.

---

## 6. Future Enhancements

- **Multiple image slots**: let users upload per-section assets and manage them in a gallery modal.
- **AI-generated variants**: allow on-the-fly stylization (but still store only session-scoped outputs).
- **Prefetching**: download signed URLs via service workers for instant template switching.
- **Design tokens**: expose `artwork` as part of a broader theme object so future components (e.g., AI widgets, LMS modules) can consume it uniformly.

---

By centralizing image data in a session-aware layer and updating templates to consume a shared artwork contract, users can seamlessly apply their own visuals across every design without altering persistent storage or compromising design quality.

