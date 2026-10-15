/**
 * Minimal Markdown → HTML for Movemental article bodies.
 *
 * Deliberately small: the authored files use headings, paragraphs, lists,
 * blockquotes, bold/italic, inline code, links and horizontal rules. Nothing
 * here rewrites, summarises or reflows the author's prose — it only marks it up.
 *
 * Also parses the YAML-ish frontmatter block the repo's own loader reads, and
 * derives the H1 title, the excerpt, the reading time and the heading TOC using
 * the same rules as `src/lib/articles.ts` (240 wpm, H1 authoritative over
 * frontmatter, first non-heading paragraph as excerpt, h2/h3 in the TOC).
 */

const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };
const esc = (s) => s.replace(/[&<>]/g, (c) => ESC[c]);

export function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function splitFrontmatter(raw) {
  const trimmed = raw.replace(/^\uFEFF/, "");
  if (!trimmed.startsWith("---\n") && !trimmed.startsWith("---\r\n")) {
    return { frontmatter: null, body: trimmed };
  }
  const closing = trimmed.indexOf("\n---", 4);
  if (closing === -1) return { frontmatter: null, body: trimmed };
  return {
    frontmatter: trimmed.slice(4, closing),
    body: trimmed.slice(closing + 4).replace(/^\s+/, ""),
  };
}

export function parseFrontmatter(block) {
  const out = {};
  if (!block) return out;
  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const m = /^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/.exec(line);
    if (!m) continue;
    let v = m[2].trim();
    if (v === "true" || v === "false") { out[m[1]] = v === "true"; continue; }
    if (v === "null" || v === "~") { out[m[1]] = null; continue; }
    if (/^-?\d+$/.test(v)) { out[m[1]] = parseInt(v, 10); continue; }
    if (v.startsWith("[") && v.endsWith("]")) {
      out[m[1]] = v.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
      continue;
    }
    out[m[1]] = v.replace(/^["']|["']$/g, "");
  }
  return out;
}

function inline(text) {
  let s = esc(text);
  s = s.replace(/`([^`]+)`/g, '<code style="font-family:var(--font-mono),ui-monospace,monospace;font-size:.9em;background:var(--surface);padding:.1em .3em;border-radius:3px">$1</code>');
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  s = s.replace(/(^|\s)_([^_\n]+)_/g, "$1<em>$2</em>");
  return s;
}

const H = {
  2: "font-family:var(--font-display),Georgia,serif;font-weight:600;font-size:clamp(1.35rem,2.8vw,1.85rem);line-height:1.16;letter-spacing:-.02em;margin:2.4rem 0 .8rem;text-wrap:pretty",
  3: "font-family:var(--font-display),Georgia,serif;font-weight:600;font-size:clamp(1.1rem,2.2vw,1.35rem);line-height:1.2;letter-spacing:-.014em;margin:1.9rem 0 .6rem;text-wrap:pretty",
  4: "font-family:var(--font-mono),ui-monospace,monospace;font-size:.68rem;letter-spacing:.13em;text-transform:uppercase;color:var(--text-body);margin:1.7rem 0 .5rem",
};
const P = "font-size:1.05rem;line-height:1.72;color:var(--text-strong);margin:0 0 1.15rem;max-width:66ch";
const LI = "font-size:1.03rem;line-height:1.65;color:var(--text-body);margin:0 0 .5rem;max-width:64ch";

/** Render markdown body (frontmatter already stripped) to an HTML string. */
export function renderMarkdown(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  const seen = new Set();
  let para = [];
  let list = null;
  let quote = [];
  let fence = false;
  let fenceBuf = [];

  const flushPara = () => {
    if (!para.length) return;
    out.push(`<p style="${P}">${inline(para.join(" "))}</p>`);
    para = [];
  };
  const flushList = () => {
    if (!list) return;
    const tag = list.ordered ? "ol" : "ul";
    const pad = list.ordered ? "padding-left:1.3rem" : "padding-left:0;list-style:none";
    const items = list.items
      .map((t) =>
        list.ordered
          ? `<li style="${LI}">${inline(t)}</li>`
          : `<li style="${LI};border-left:1px solid var(--border);padding-left:.9rem">${inline(t)}</li>`,
      )
      .join("");
    out.push(`<${tag} style="margin:0 0 1.3rem;${pad};display:grid;gap:.15rem">${items}</${tag}>`);
    list = null;
  };
  const flushQuote = () => {
    if (!quote.length) return;
    out.push(
      `<blockquote style="margin:1.5rem 0;padding:.2rem 0 .2rem 1.1rem;border-left:2px solid var(--margin-red);font-family:var(--font-display),Georgia,serif;font-size:clamp(1.1rem,2.3vw,1.3rem);line-height:1.44;letter-spacing:-.012em;color:var(--text-strong);max-width:56ch">${inline(quote.join(" "))}</blockquote>`,
    );
    quote = [];
  };
  const flushAll = () => { flushPara(); flushList(); flushQuote(); };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (line.trim().startsWith("```")) {
      if (fence) {
        out.push(
          `<pre style="margin:0 0 1.3rem;padding:1rem;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-md);overflow-x:auto"><code style="font-family:var(--font-mono),ui-monospace,monospace;font-size:.86rem;line-height:1.55">${esc(fenceBuf.join("\n"))}</code></pre>`,
        );
        fenceBuf = [];
      } else {
        flushAll();
      }
      fence = !fence;
      continue;
    }
    if (fence) { fenceBuf.push(raw); continue; }

    if (!line.trim()) { flushAll(); continue; }

    const h = /^(#{2,4})\s+(.+?)\s*#*$/.exec(line);
    if (h) {
      flushAll();
      const depth = h[1].length;
      const text = h[2].replace(/[*_`]/g, "").trim();
      let id = slugifyHeading(text);
      let n = 1;
      while (id && seen.has(id)) id = `${slugifyHeading(text)}-${n++}`;
      if (id) seen.add(id);
      out.push(`<h${depth} id="${id}" style="${H[depth]}">${inline(text)}</h${depth}>`);
      continue;
    }
    if (/^#\s+/.test(line)) { flushAll(); continue; }

    if (/^\s*([-*_])\s*\1\s*\1[\s-*_]*$/.test(line)) {
      flushAll();
      out.push('<hr style="border:0;border-top:1px solid var(--border);margin:2.2rem 0">');
      continue;
    }

    const q = /^>\s?(.*)$/.exec(line);
    if (q) { flushPara(); flushList(); quote.push(q[1]); continue; }

    const ul = /^\s*[-*+]\s+(.+)$/.exec(line);
    const ol = /^\s*\d+[.)]\s+(.+)$/.exec(line);
    if (ul || ol) {
      flushPara(); flushQuote();
      const ordered = !!ol;
      if (!list || list.ordered !== ordered) { flushList(); list = { ordered, items: [] }; }
      list.items.push((ul || ol)[1]);
      continue;
    }

    if (list) { list.items[list.items.length - 1] += " " + line.trim(); continue; }
    flushQuote();
    para.push(line.trim());
  }
  if (fence && fenceBuf.length) out.push(`<pre><code>${esc(fenceBuf.join("\n"))}</code></pre>`);
  flushAll();
  return out.join("\n");
}

/** Heading TOC (h2/h3), matching `extractToc` in src/lib/articles.ts. */
export function extractToc(md) {
  const toc = [];
  const seen = new Set();
  let fence = false;
  for (const line of md.split(/\r?\n/)) {
    if (line.startsWith("```")) { fence = !fence; continue; }
    if (fence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "").trim();
    const base = slugifyHeading(text);
    if (!base) continue;
    let id = base;
    let n = 1;
    while (seen.has(id)) id = `${base}-${n++}`;
    seen.add(id);
    toc.push({ id, depth: m[1].length, text });
  }
  return toc;
}

/** 240 wpm, matching `estimateReadTime` in src/lib/articles.ts. */
export function readTime(md) {
  const words = md.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 240))} min read`;
}

/** First non-heading, non-list paragraph, capped at 260 chars. */
export function excerptOf(md) {
  const block = md.split(/\n\s*\n/).find(
    (b) => b && !b.startsWith("#") && !b.startsWith(">") && !b.startsWith("-") && !b.startsWith("*") && !/^\d+\./.test(b),
  );
  return block
    ? block.replace(/\s+/g, " ").replace(/[*_`[\]]/g, "").trim().slice(0, 260)
    : "";
}

/** Full parse of a raw .md file: frontmatter + H1 title + body + derived fields. */
export function parseArticle(raw) {
  const { frontmatter, body: afterFront } = splitFrontmatter(raw);
  const fm = parseFrontmatter(frontmatter);
  const h1 = afterFront.match(/^#\s+(.+?)\s*#*\s*$/m);
  const title = h1 ? h1[1].trim() : fm.title || "";
  let body = h1 ? afterFront.replace(h1[0], "") : afterFront;
  body = body.replace(/^\s*---+\s*\n/, "").trimStart();
  return {
    fm,
    title,
    body,
    html: renderMarkdown(body),
    toc: extractToc(body),
    readTime: readTime(body),
    excerpt: excerptOf(body),
  };
}
