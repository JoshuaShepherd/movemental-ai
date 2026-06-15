# Social sharing and Open Graph — end-to-end playbook (movemental)

This document explains **what “sharing” actually means on the web**, how the pieces fit together in a **Next.js App Router** site like movemental, and a **step-by-step checklist** you can follow when you add or change pages.

If you are new to this: you are usually wiring **three different things** that people confuse:

1. **Link previews** — When someone pastes your URL in Slack, iMessage, LinkedIn, X (Twitter), Facebook, etc., the platform fetches your page (or cached metadata) and shows **title, description, image**. This is almost entirely **server metadata** (HTML `<meta>` tags), not buttons in your UI.
2. **“Share this page” buttons** — Optional UI that opens a **compose URL** (`https://twitter.com/intent/tweet?text=…`) or uses the **Web Share API** on supported devices. This is **client-side behavior**; it does not replace metadata.
3. **“Follow us” links** — Simple outbound links to your social profiles in the nav or footer. Same as any other external link; no special platform integration unless you use official embeds or APIs.

Best practice is: **get (1) right first**, then add (2) and (3) where they genuinely help readers.

---

## 1. How link previews work (the part that “just works” when you paste a URL)

1. User pastes `https://movemental.ai/articles/some-slug` into an app.
2. That app’s crawler requests the URL and reads **Open Graph** (`og:*`) and/or **Twitter** (`twitter:*`) meta tags from the HTML (or from caches they maintain).
3. The app renders a **card** using those fields.

**Implication:** You do not “register” the page with Facebook or LinkedIn in code. You **publish correct metadata** on the HTML document for that URL. Debuggers (below) exist only to **inspect** what crawlers see.

**Canonical URL:** Every public page should have one **canonical** URL (scheme + host + path). Avoid duplicate content on `www` vs apex, `http` vs `https`, or trailing slash inconsistencies. Vercel and DNS should redirect to a single preferred host; your metadata should match that host.

---

## 2. Baseline configuration in this repo

### 2.1 `metadataBase` (global default for relative OG URLs)

The root layout sets a default base URL for metadata resolution:

```28:36:src/app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "Movemental | Systems that Fuel Movement",
    template: "%s — Movemental",
  },
  description:
    "Movemental builds integrated systems from your content, knowledge, and work—combining platforms, AI, training and consulting to provide movement leaders, churches, and organizations with digital systems that actually work.",
  metadataBase: new URL("https://movemental.ai"),
};
```

**What this does:** If you set `openGraph.images: ["/og/home.png"]`, Next resolves it to `https://movemental.ai/og/home.png`.

**Operational rule:** `metadataBase` should match **production** canonical origin. Preview deployments often need either absolute URLs built from `VERCEL_URL` or a dedicated `NEXT_PUBLIC_SITE_URL` for previews—see section 7 below.

### 2.2 Per-route `metadata` and `generateMetadata`

**Static pages** export a `metadata` object. Example with Open Graph title/description:

```5:14:src/app/(site)/book/page.tsx
export const metadata: Metadata = {
  title: "From Fragmentation to Movement",
  description:
    "A free book for movement leaders, nonprofits, churches, and institutions. A structural path from scatter field to field — with integration as the load-bearing stage.",
  openGraph: {
    title: "From Fragmentation to Movement",
    description:
      "A structural path from scatter field to field — for movement leaders, nonprofits, churches, and institutions.",
  },
};
```

**Dynamic pages** use `generateMetadata` so each slug gets its own title and description. Articles already follow this pattern:

```15:28:src/app/(site)/articles/[slug]/page.tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.excerpt || undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      type: "article",
    },
  };
}
```

That is the correct **shape** for article-like content: `openGraph.type: "article"` helps some consumers categorize the URL.

---

## 3. Open Graph and Twitter fields — what to actually set

### 3.1 Minimum viable link preview (good enough to ship)

For each important public URL, aim for:

| Concern | Next.js `Metadata` field | Notes |
|--------|---------------------------|--------|
| HTML `<title>` | `title` | Shown in browser tab; often used as fallback. |
| Generic description | `description` | Used by search snippets and some sharers. |
| OG title / description | `openGraph.title`, `openGraph.description` | Often mirrors `title` / `description`. |
| OG URL | `openGraph.url` | **Best practice:** set to the canonical page URL so reshares do not pick a wrong variant. Can be absolute or resolved via `metadataBase`. |
| OG image | `openGraph.images` | **Highest visual impact** for social cards. See section 4. |
| Site name | `openGraph.siteName` | e.g. `"Movemental"`. |
| Locale | `openGraph.locale` | e.g. `"en_US"`. |

### 3.2 Twitter / X card tags

Set `twitter.card` (usually `summary_large_image` when you have an image, else `summary`) and optionally align `twitter:title`, `twitter:description`, `twitter:image`.

In Next.js `Metadata`, use the `twitter` key alongside `openGraph`. Many teams **only** tune `openGraph` and let Twitter fall back—explicit `twitter` fields are clearer and avoid surprises when platforms diverge.

### 3.3 Length and copy

- **Title:** concise; avoid stuffing keywords.
- **Description:** roughly one or two sentences; it should read well **out of context** (because that is how it appears in a feed).
- **Do not** put PII or secrets in descriptions—they are public.

---

## 4. Social preview images (OG images)

### 4.1 Why they matter

Without `og:image`, many networks show a **blank or generic** tile. With a strong image, the same link gets far more attention.

### 4.2 Technical constraints (rules of thumb)

- **Aspect ratio:** `1200×630` is the de facto safe default for Facebook/LinkedIn/Slack/X large cards.
- **File size:** keep images reasonably small (often under ~1 MB; smaller is better for crawlers).
- **Safe zone:** keep critical text and logos inside the center ~90%—some clients crop.

### 4.3 Ways to produce OG images in Next.js

Pick one strategy per route type:

1. **Static asset** — Design in Figma, export PNG/WebP, place under `public/` (e.g. `public/og/book.png`), reference in metadata:  
   `openGraph: { images: [{ url: "/og/book.png", width: 1200, height: 630, alt: "…" }] }`.
2. **Route segment file** — Add `opengraph-image.png` or `opengraph-image.tsx` next to `page.tsx` in the App Router. Next wires the correct `og:image` for that segment. Good for **templates** (title on a branded background).
3. **Dynamic `ImageResponse`** — For many slugs (articles), generate images in `opengraph-image.tsx` using `@vercel/og` / `ImageResponse` so each slug gets a unique image without hand-designing hundreds of files.

**Current movemental note:** article metadata sets text Open Graph fields but does not yet define images in `generateMetadata`. Adding either a **default article OG** image or **per-article** art is the next incremental improvement.

---

## 5. Optional structured data (JSON-LD)

Search engines and some assistants consume **JSON-LD** (`<script type="application/ld+json">`). Common patterns:

- **`Organization`** on the home page or sitewide layout (name, url, logo, sameAs for social profile URLs).
- **`WebSite`** with `potentialAction` of type `SearchAction` if you have on-site search.

This is **not required** for basic Slack/LinkedIn link previews, but it is **good SEO hygiene**. Implement in a small server component or layout helper so it stays valid JSON.

---

## 6. “Share this page” UI — platform URLs vs Web Share API

### 6.1 Web Share API (mobile-first, least maintenance)

On supported browsers (many mobile Safari/Chrome contexts), `navigator.share({ title, text, url })` opens the **native share sheet**. The user picks Messages, Mail, Mastodon client, etc.

**Pattern:**

- Feature-detect: `if (typeof navigator !== "undefined" && navigator.share) { … }`.
- **Always** provide a **fallback** row of links for desktop and unsupported browsers.

**Privacy:** only call `share()` from a **user gesture** (button click), not on page load.

### 6.2 Classic share links (fallbacks)

Build the **current page URL** once on the client, e.g. `const url = encodeURIComponent(window.location.href)` (or use a canonical URL from props if you prefer consistency with `metadata`).

Typical compose URLs (verify periodically—platforms change):

| Network | Pattern | Notes |
|--------|---------|--------|
| **X (Twitter)** | `https://twitter.com/intent/tweet?url=${url}&text=${text}` | `text` should be short; URL carries the page. |
| **LinkedIn** | `https://www.linkedin.com/sharing/share-offsite/?url=${url}` | Usually **url only**; LinkedIn pulls preview from metadata. |
| **Facebook** | `https://www.facebook.com/sharer/sharer.php?u=${url}` | |
| **Bluesky** | Often `https://bsky.app/intent/compose?text=${textAndUrl}` | Combine text + URL in `text` parameter; encoding matters. |
| **Email** | `mailto:?subject=${subject}&body=${body}` | `body` often includes URL + newline. |

**Best practice:**

- Use `encodeURIComponent` on each interpolated fragment.
- Open in `target="_blank"` with `rel="noopener noreferrer"` for security.
- Add **accessible names** (`aria-label="Share this page on LinkedIn"`) because icons alone are unclear.

### 6.3 What not to do

- Do not load third-party **social widgets** (Facebook SDK “like” buttons) unless you have a **privacy/compliance** story—they add weight and tracking surface.
- Do not send users through **link shorteners** for internal URLs unless you have an operational reason; canonical URLs are better for trust and SEO.

---

## 7. Environments: production vs preview URLs

Link previews and canonical URLs should reflect **where the page actually lives**.

- **Production:** `metadataBase` and `openGraph.url` should use `https://movemental.ai` (or your final apex domain).
- **Preview deployments:** crawlers see the **preview** URL. That is normal. If you need previews to show branded cards, set `NEXT_PUBLIC_SITE_URL` (already optional in `src/lib/env.ts`) to the preview origin in that environment, and derive absolute URLs in `generateMetadata` when appropriate.

Avoid hardcoding preview hosts in committed code; tie them to environment variables.

---

## 8. “Follow us” in chrome (footer / nav)

This is simply a **list of outbound HTTPS links** (and optional `rel="me"` on profiles you control for verification on some networks).

**Suggested implementation shape for movemental:**

1. Add a small `socialLinks` array in `src/components/nav/nav-links.ts` (or a dedicated `social-links.ts`) with `{ label, href }` entries.
2. Render a compact row in `SiteFooter` (and optionally `SiteNav`) with the same **inverse footer** token rules already used in `site-footer.tsx`.

No API keys are required for plain links.

---

## 9. Verification and debugging tools

After deploying (or using a tunnel), validate what **crawlers** see:

- **Facebook Sharing Debugger** — `https://developers.facebook.com/tools/debug/` — refreshes Facebook’s cache; shows `og:*` parsing.
- **LinkedIn Post Inspector** — `https://www.linkedin.com/post-inspector/` — similar for LinkedIn.
- **X (Twitter) Card Validator** — historically available as “Card Validator”; if deprecated, use X’s current preview tool or inspect returned HTML meta tags directly.
- **Slack** — unfurling is aggressive; if Slack shows stale data, append a dummy query string once (`?v=2`) or use their unfurl debugger if available to your workspace.

**Local dev:** social crawlers often **cannot** reach `localhost`. Use a **staging URL**, Vercel preview, or a tunnel (ngrok, Cloudflare Tunnel) to test real unfurls.

---

## 10. End-to-end checklist when you add a new public page

1. **Pick the canonical path** (final URL on production).
2. Export **`metadata`** or **`generateMetadata`** from the route:
   - `title`, `description`
   - `openGraph`: `title`, `description`, `type`, **`url`**, **`images`**, `siteName`, `locale` as appropriate
   - `twitter`: `card`, aligned title/description/image
3. If content is time-sensitive or syndicated, set **`alternates.canonical`** in `Metadata` to the canonical URL.
4. Add an **OG image** (static file, segment image, or generated).
5. Deploy to a **publicly reachable** URL and run the tools in section 9.
6. If the page is **important for acquisition**, add a **Share** control (section 6) with Web Share + fallbacks.
7. If you maintain social profiles, ensure they appear under **Follow us** (section 8) and optionally in **`sameAs`** JSON-LD (section 5).

---

## 11. Where to go deeper in Next.js docs

Because Next.js metadata behavior evolves, treat the framework docs as authoritative for API details:

- App Router **Metadata** and **generateMetadata**
- **`opengraph-image` / `twitter-image`** file conventions
- **`ImageResponse`** (dynamic OG images)

This repo’s **`AGENTS.md`** reminder applies: read `node_modules/next/dist/docs/` when a behavior does not match expectations.

---

## Summary

- **Link previews** = correct **`Metadata`** (especially **`openGraph`** + images + canonical URL), not share buttons.
- **Share buttons** = optional **Web Share API** + **encodeURIComponent** compose URLs as fallbacks.
- **Follow links** = normal footer/nav config, optionally mirrored in **JSON-LD `sameAs`**.
- **Test** on real public URLs with the official inspector tools; localhost is usually insufficient.

Following sections 2 through 4 brings movemental in line with common production practice; sections 6 through 8 layer on UX and discovery without locking you into heavy third-party scripts.
