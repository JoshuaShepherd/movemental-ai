# Tour: Pastoral-Warm Template → Content Library → Books → Courses → Articles

A short walk through the pastoral-warm template with the main content URLs in order and a quick interpretation of each step (based on `_docs/`).

---

## 1. Pastoral-warm template (home)

**URL:**  
`/templates/library/pastoral-warm/`  
*(Full: `https://<your-origin>/templates/library/pastoral-warm/`)*

**What it is:** The pastoral-warm template is the **home** of this design. It’s one of the public template library options: static HTML + per-folder `css/main.css` under `public/templates/library/pastoral-warm/`. It’s **URL-driven** — you open this path and get that template’s index; no React, no app globals. The design uses warm neutrals, Lora + DM Sans, and semantic tokens (`--bg`, `--accent`, etc.) in its own `:root`. This is the natural starting point for a tour.

---

## 2. Content library (Content Hub)

**URL:**  
`/templates/library/pastoral-warm/content-hub.html`  
*(Full: `https://<your-origin>/templates/library/pastoral-warm/content-hub.html`)*

**What it is:** The **Content Hub** is the main “content library” entry for this template. It’s the central place for discovery: from here users can move into themes, books, courses, articles, and other content. In the platform’s content model this is the hub that supports a **library structure** (tabs or sections by type, card layout, search, filters) and aligns with the idea of a single “library” experience before drilling into Books, Courses, or Articles.

---

## 3. Books

**URL:**  
`/templates/library/pastoral-warm/books.html`  
*(Full: `https://<your-origin>/templates/library/pastoral-warm/books.html`)*

**What it is:** The **Books** listing page. It shows the book catalog (cards with cover, title, author, link). From the docs, books are a core content type: they have detail (`book-detail.html`), optional reader (`book-reader.html`), and can be linked from the hub and from related courses/articles. This URL is the books **listing**; individual books use `book-detail.html?…` (or similar) for the single-book view.

---

## 4. Courses

**URL:**  
`/templates/library/pastoral-warm/courses.html`  
*(Full: `https://<your-origin>/templates/library/pastoral-warm/courses.html`)*

**What it is:** The **Courses** catalog. It lists available courses (card layout: image, title, description/meta, duration or lessons, link). The template system also has course-detail, course-enroll, course-learn, course-overview, and course-player — so this URL is the **entry** to the course product set. Courses are treated as a primary offering (formational arc, curriculum, enrollment) and can cross-link to related books and articles.

---

## 5. Articles

**URL:**  
`/templates/library/pastoral-warm/articles.html`  
*(Full: `https://<your-origin>/templates/library/pastoral-warm/articles.html`)*

**What it is:** The **Articles** listing page. It surfaces articles (cards with image or placeholder, title, excerpt, metadata, link). Article detail is on `article-detail.html`. In the content strategy, articles are part of the same library spine as books and courses — pillar themes and topics link to articles, and articles link back to themes, related courses, and books for a hub-and-spoke, EEAT-friendly structure.

---

## URL order (copy-paste)

1. `/templates/library/pastoral-warm/`
2. `/templates/library/pastoral-warm/content-hub.html`
3. `/templates/library/pastoral-warm/books.html`
4. `/templates/library/pastoral-warm/courses.html`
5. `/templates/library/pastoral-warm/articles.html`

Use your site’s origin (e.g. `https://movemental.ai` or your dev URL) as the base for full links.
