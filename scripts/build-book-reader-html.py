#!/usr/bin/env python3
"""
Assemble docs/book-development/manuscript-ordered/*.md into a static e-reader HTML
under docs/html/. Run from repo root:

  python3 scripts/build-book-reader-html.py
"""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
_scripts_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(_scripts_dir))

from movemental_docs_html_path import movemental_docs_html_root

MS_DIR = ROOT / "docs" / "book-development" / "manuscript-ordered"
OUT_READER = movemental_docs_html_root(ROOT) / "books-concept-modern" / "book-reader-from-manuscript.html"

BOOK_TITLE = "Content That Moves"
BOOK_SUBTITLE = "Credibility, voice, and AI — a manuscript for movement leaders"
AUTHOR = "Joshua Shepherd"


def escape_text(s: str) -> str:
    return html.escape(s, quote=False)


def _format_segment_plain(s: str) -> str:
    """Escape HTML, then bold/italic (no links)."""
    s = escape_text(s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", s)
    return s


def inline_format(s: str) -> str:
    """Apply [text](url), **bold**, *italic*."""
    parts: list[str] = []
    pos = 0
    for m in re.finditer(r"\[([^\]]+)\]\(([^)]+)\)", s):
        parts.append(_format_segment_plain(s[pos : m.start()]))
        parts.append(
            f'<a href="{html.escape(m.group(2), quote=True)}">'
            f"{html.escape(m.group(1), quote=False)}</a>"
        )
        pos = m.end()
    parts.append(_format_segment_plain(s[pos:]))
    return "".join(parts)


def paragraph_block(text: str) -> str:
    t = text.strip()
    if not t:
        return ""
    lines = t.split("\n")
    if all(re.match(r"^\d+\.\s+", ln) for ln in lines if ln.strip()):
        items = []
        for ln in lines:
            ln = ln.strip()
            if not ln:
                continue
            m = re.match(r"^\d+\.\s+(.*)$", ln)
            if m:
                items.append(f"<li>{inline_format(m.group(1))}</li>")
        return "<ol>" + "".join(items) + "</ol>"
    if all(ln.strip().startswith("- ") for ln in lines if ln.strip()):
        items = []
        for ln in lines:
            ln = ln.strip()
            if ln.startswith("- "):
                items.append(f"<li>{inline_format(ln[2:])}</li>")
        return "<ul>" + "".join(items) + "</ul>"
    inner = " ".join(ln.strip() for ln in lines)
    return f"<p>{inline_format(inner)}</p>"


def markdown_body_to_html(body: str) -> str:
    """Subset: headings, paragraphs, lists, hr, ---."""
    body = body.strip()
    if not body:
        return ""
    parts: list[str] = []
    blocks = re.split(r"\n{2,}", body)
    first_para = True
    for raw in blocks:
        raw = raw.strip()
        if not raw:
            continue
        if raw == "---":
            parts.append('<hr class="chapter-rule" />')
            continue
        first_line, _, rest = raw.partition("\n")
        fl = first_line.strip()
        if fl.startswith("### "):
            parts.append(f"<h3>{inline_format(fl[4:].strip())}</h3>")
            if rest.strip():
                parts.append(paragraph_block(rest))
            continue
        if fl.startswith("## "):
            parts.append(f"<h2>{inline_format(fl[3:].strip())}</h2>")
            if rest.strip():
                parts.append(paragraph_block(rest))
            continue
        if fl.startswith("# "):
            parts.append(f"<h2>{inline_format(fl[2:].strip())}</h2>")
            if rest.strip():
                parts.append(paragraph_block(rest))
            continue
        out = paragraph_block(raw)
        if out.startswith("<p>") and first_para:
            out = '<p class="drop-cap">' + out[3:]
            first_para = False
        parts.append(out)
    return "\n".join(parts)


def extract_title_and_body(md: str) -> tuple[str, str]:
    md = md.strip()
    if md.startswith("#"):
        line, _, rest = md.partition("\n")
        title = line.lstrip("#").strip()
        return title, rest.strip()
    return "Untitled", md


def chapter_label_from_filename(name: str) -> str:
    m = re.match(r"^(\d{2})-", name)
    if not m:
        return "Chapter"
    n = int(m.group(1))
    if n == 0:
        return "Preface"
    return f"Chapter {n}"


def word_count(text: str) -> int:
    return len(re.findall(r"[A-Za-z0-9']+", text))


def read_chapters() -> list[dict]:
    files = sorted(MS_DIR.glob("[0-9][0-9]-*.md"))
    chapters: list[dict] = []
    for path in files:
        raw = path.read_text(encoding="utf-8")
        title, body = extract_title_and_body(raw)
        slug = path.stem
        wc = word_count(body)
        read_m = max(1, round(wc / 200))
        chapters.append(
            {
                "slug": slug,
                "filename": path.name,
                "title": title,
                "label": chapter_label_from_filename(path.name),
                "read_min": read_m,
                "html": markdown_body_to_html(body),
            }
        )
    return chapters


def build_reader_html(chapters: list[dict]) -> str:
    n = len(chapters)
    templates: list[str] = []
    toc_desktop: list[str] = []
    toc_mobile: list[str] = []
    for i, ch in enumerate(chapters):
        num = i + 1
        tid = f"tpl-ch-{i}"
        active = " is-active" if i == 0 else ""
        aria = ' aria-current="true"' if i == 0 else ""
        templates.append(
            f'    <template id="{tid}">\n'
            f'      <div class="reader-prose">\n{ch["html"]}\n      </div>\n'
            f"    </template>"
        )
        toc_desktop.append(
            f'            <li class="toc-list__item{active}"><a href="#ch-{i}"{aria}>'
            f'<span class="toc-list__num">{num}</span> {escape_text(ch["title"])}</a></li>'
        )
        toc_mobile.append(
            f'        <li class="toc-list__item{active}"><a href="#ch-{i}"{aria}>'
            f'<span class="toc-list__num">{num}</span> {escape_text(ch["title"])}</a></li>'
        )

    templates_joined = "\n\n".join(templates)
    toc_d = "\n".join(toc_desktop)
    toc_m = "\n".join(toc_mobile)

    # Progress ring circumference 2*pi*16 ≈ 100.53
    first = chapters[0]
    return f"""<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{escape_text(BOOK_TITLE)} — reader (draft)</title>
    <meta name="description" content="{escape_text(BOOK_SUBTITLE)}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="../site-templates/site-theme.css" />
    <style>
      .reader {{
        display: flex;
        min-height: calc(100vh - 56px);
      }}
      .reader-header {{
        position: sticky;
        top: 56px;
        z-index: 90;
        background: color-mix(in srgb, var(--card) 92%, transparent);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--border);
      }}
      .reader-header__inner {{
        max-width: var(--container-max);
        margin: 0 auto;
        padding: 10px 24px;
        display: flex;
        align-items: center;
        gap: 16px;
      }}
      .reader-header__back {{
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.82rem;
        font-weight: 500;
        color: var(--muted-foreground);
        flex-shrink: 0;
      }}
      .reader-header__back:hover {{ color: var(--primary); text-decoration: none; }}
      .reader-header__back svg {{ width: 16px; height: 16px; }}
      .reader-header__title {{
        flex: 1;
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: var(--foreground);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
      }}
      .reader-header__controls {{ display: flex; align-items: center; gap: 2px; flex-shrink: 0; }}
      .font-control {{
        display: flex;
        background: var(--section);
        border-radius: var(--radius);
        padding: 2px;
      }}
      .font-control__btn {{
        border: none;
        background: transparent;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: calc(var(--radius) - 1px);
        font-family: var(--font-sans);
        font-weight: 600;
        color: var(--muted-foreground);
        line-height: 1;
        transition: background 0.15s, color 0.15s;
      }}
      .font-control__btn:hover {{ color: var(--foreground); }}
      .font-control__btn.is-active {{
        background: var(--card);
        color: var(--foreground);
        box-shadow: 0 1px 3px rgba(42, 52, 57, 0.08);
      }}
      .font-control__btn:focus-visible {{ outline: 2px solid var(--primary); outline-offset: 1px; }}
      .font-control__btn--sm {{ font-size: 0.72rem; }}
      .font-control__btn--md {{ font-size: 0.85rem; }}
      .font-control__btn--lg {{ font-size: 1rem; }}
      .sidebar-toggle {{
        display: none;
        border: 1px solid var(--border);
        background: var(--card);
        border-radius: var(--radius);
        padding: 6px 10px;
        font-size: 0.78rem;
        font-weight: 600;
        cursor: pointer;
        color: var(--foreground);
        font-family: var(--font-sans);
      }}
      .sidebar-toggle:focus-visible {{ outline: 2px solid var(--primary); outline-offset: 1px; }}
      .reader-progress {{
        position: sticky;
        top: calc(56px + 48px);
        z-index: 89;
        height: 2px;
        background: var(--section);
      }}
      .reader-progress__fill {{
        height: 100%;
        width: 0%;
        background: var(--primary);
        transition: width 0.3s ease;
      }}
      .reader-sidebar {{
        width: 280px;
        flex-shrink: 0;
        background: var(--card);
        border-right: 1px solid var(--border);
        position: sticky;
        top: calc(56px + 50px);
        height: calc(100vh - 56px - 50px);
        overflow-y: auto;
        display: flex;
        flex-direction: column;
      }}
      .reader-sidebar__header {{
        padding: 20px 20px 16px;
        border-bottom: 1px solid var(--border);
      }}
      .reader-sidebar__book-title {{
        margin: 0;
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: var(--foreground);
      }}
      .reader-sidebar__author {{ margin: 4px 0 0; font-size: 0.8rem; color: var(--muted-foreground); }}
      .reader-sidebar__position {{
        margin: 12px 0 0;
        font-size: 0.72rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--muted-foreground);
      }}
      .progress-ring {{
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px 20px;
        border-bottom: 1px solid var(--border);
      }}
      .progress-ring svg {{ width: 40px; height: 40px; transform: rotate(-90deg); }}
      .progress-ring__track {{ fill: none; stroke: var(--section); stroke-width: 3; }}
      .progress-ring__fill {{
        fill: none;
        stroke: var(--primary);
        stroke-width: 3;
        stroke-linecap: round;
        stroke-dasharray: 100.53;
        stroke-dashoffset: 100.53;
        transition: stroke-dashoffset 0.4s ease;
      }}
      .progress-ring__label {{ font-size: 0.78rem; color: var(--muted-foreground); }}
      .progress-ring__label strong {{ color: var(--foreground); font-weight: 600; }}
      .toc-list {{
        list-style: none;
        margin: 0;
        padding: 8px 0;
        flex: 1;
        overflow-y: auto;
      }}
      .toc-list__item a {{
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 20px;
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--muted-foreground);
        text-decoration: none;
        transition: background 0.12s, color 0.12s;
      }}
      .toc-list__item a:hover {{
        background: var(--section);
        color: var(--foreground);
        text-decoration: none;
      }}
      .toc-list__item a:focus-visible {{ outline: 2px solid var(--primary); outline-offset: -2px; }}
      .toc-list__item.is-active a {{
        color: var(--primary);
        font-weight: 600;
        background: color-mix(in srgb, var(--primary) 6%, transparent);
      }}
      .toc-list__num {{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        font-size: 0.72rem;
        font-weight: 600;
        background: var(--section);
        color: var(--muted-foreground);
        flex-shrink: 0;
      }}
      .toc-list__item.is-active .toc-list__num {{
        background: var(--primary);
        color: var(--primary-foreground);
      }}
      .reader-main {{ flex: 1; min-width: 0; display: flex; justify-content: center; padding: 0 24px; }}
      .reader-content {{ width: 100%; max-width: var(--prose-max); padding: 48px 0 80px; }}
      .chapter-label {{
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: color-mix(in srgb, var(--primary) 70%, var(--muted-foreground));
        margin: 0 0 10px;
      }}
      .chapter-title {{
        margin: 0 0 12px;
        font-size: clamp(1.6rem, 3.5vw, 2.25rem);
        font-weight: 600;
        letter-spacing: -0.02em;
        line-height: 1.12;
        color: var(--foreground);
      }}
      .chapter-meta {{ font-size: 0.8rem; color: var(--muted-foreground); margin: 0 0 32px; }}
      .chapter-rule {{ border: none; border-top: 1px solid var(--border); margin: 0 0 32px; }}
      .reader-prose {{ color: var(--muted-foreground); line-height: 1.78; font-size: 1.05rem; }}
      .reader-prose p {{ margin: 0 0 1.35rem; }}
      .reader-prose strong {{ color: var(--foreground); }}
      .reader-prose h2 {{
        margin: 2.5rem 0 1rem;
        font-size: 1.35rem;
        font-weight: 600;
        letter-spacing: -0.02em;
        color: var(--foreground);
        line-height: 1.2;
      }}
      .reader-prose h3 {{
        margin: 2rem 0 0.75rem;
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: var(--foreground);
        line-height: 1.25;
      }}
      .reader-prose .drop-cap::first-letter {{
        float: left;
        font-size: 3.4em;
        line-height: 0.82;
        font-weight: 600;
        color: var(--foreground);
        padding-right: 8px;
        padding-top: 4px;
      }}
      .reader-prose--sm {{ font-size: 0.95rem; line-height: 1.72; }}
      .reader-prose--lg {{ font-size: 1.18rem; line-height: 1.85; }}
      .reader-prose ol, .reader-prose ul {{
        margin: 0 0 1.35rem 1.2rem;
        padding: 0;
        color: var(--muted-foreground);
      }}
      .reader-prose li {{ margin-bottom: 0.5rem; }}
      .chapter-nav {{
        display: flex;
        gap: 12px;
        margin-top: 48px;
        padding-top: 24px;
        border-top: 1px solid var(--border);
      }}
      .chapter-nav__link {{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 16px 18px;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: calc(var(--radius) * 1.5);
        text-decoration: none;
        transition: border-color 0.15s, background 0.15s;
      }}
      .chapter-nav__link:hover {{
        border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
        background: color-mix(in srgb, var(--primary) 3%, var(--card));
        text-decoration: none;
      }}
      .chapter-nav__link:focus-visible {{ outline: 2px solid var(--primary); outline-offset: 1px; }}
      .chapter-nav__link--next {{ text-align: right; }}
      .chapter-nav__dir {{
        font-size: 0.7rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--muted-foreground);
      }}
      .chapter-nav__title {{
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--foreground);
        letter-spacing: -0.01em;
      }}
      .chapter-position {{ text-align: center; margin-top: 16px; font-size: 0.78rem; color: var(--muted-foreground); }}
      .mobile-toc {{ display: none; }}
      .mobile-toc summary {{
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--foreground);
        cursor: pointer;
        list-style: none;
        background: var(--card);
        border-bottom: 1px solid var(--border);
      }}
      .mobile-toc summary::-webkit-details-marker {{ display: none; }}
      .mobile-toc summary::after {{
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        border-right: 2px solid var(--muted-foreground);
        border-bottom: 2px solid var(--muted-foreground);
        transform: rotate(45deg);
        margin-left: auto;
        transition: transform 0.2s;
      }}
      .mobile-toc[open] summary::after {{ transform: rotate(-135deg); }}
      .mobile-toc summary:focus-visible {{ outline: 2px solid var(--primary); outline-offset: -2px; }}
      .mobile-toc .toc-list {{
        background: var(--card);
        border-bottom: 1px solid var(--border);
        max-height: 50vh;
        overflow-y: auto;
      }}
      @media (max-width: 900px) {{
        .reader-sidebar {{ display: none; }}
        .sidebar-toggle {{ display: block; }}
        .mobile-toc {{ display: block; }}
        .reader-header__inner {{ padding: 8px 16px; }}
        .reader-main {{ padding: 0 16px; }}
        .reader-content {{ padding: 32px 0 64px; }}
        .font-control {{ display: none; }}
      }}
      @media (max-width: 600px) {{
        .chapter-nav {{ flex-direction: column; }}
        .chapter-nav__link--next {{ text-align: left; }}
      }}
      @media (prefers-reduced-motion: reduce) {{
        html {{ scroll-behavior: auto; }}
        .reader-progress__fill,
        .progress-ring__fill,
        .font-control__btn,
        .chapter-nav__link {{ transition: none; }}
      }}
    </style>
  </head>
  <body>
    <a class="skip-link" href="#chapter-content">Skip to content</a>
    <header class="site-top">
      <div class="site-top__inner">
        <a href="../homepage-concept-modern/index.html" class="site-brand">Movemental <small>Draft HTML · not production</small></a>
        <button type="button" class="site-nav__toggle" aria-expanded="false" aria-controls="site-nav-list">Menu</button>
        <nav class="site-nav" aria-label="Primary sections">
          <ul id="site-nav-list">
            <li><a href="../homepage-concept-modern/index.html">Home</a></li>
            <li><a href="./index.html">Book hub</a></li>
            <li><a href="../audience-concept-modern/movement-leaders.html">Movement leaders</a></li>
            <li><a href="../audience-concept-modern/churches.html">Churches</a></li>
            <li><a href="../articles-concept-modern/index.html">Writing</a></li>
            <li><a href="./book-ereader.html">E-reader</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="reader-header">
      <div class="reader-header__inner">
        <a href="./index.html" class="reader-header__back" aria-label="Back to book landing">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          Book
        </a>
        <span class="reader-header__title" id="reader-header-title">{escape_text(first["title"])}</span>
        <div class="reader-header__controls">
          <div class="font-control" role="group" aria-label="Font size">
            <button type="button" class="font-control__btn font-control__btn--sm" aria-label="Small text" data-size="sm">A</button>
            <button type="button" class="font-control__btn font-control__btn--md is-active" aria-label="Medium text" data-size="md">A</button>
            <button type="button" class="font-control__btn font-control__btn--lg" aria-label="Large text" data-size="lg">A</button>
          </div>
          <button type="button" class="sidebar-toggle" aria-expanded="false" aria-controls="mobile-toc">Contents</button>
        </div>
      </div>
    </div>

    <div class="reader-progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Reading progress">
      <div class="reader-progress__fill" id="reader-progress-fill"></div>
    </div>

    <details class="mobile-toc" id="mobile-toc">
      <summary id="mobile-toc-summary">Table of contents</summary>
      <ol class="toc-list">
{toc_m}
      </ol>
    </details>

    <main id="main">
      <div class="reader">
        <aside class="reader-sidebar" aria-label="Table of contents">
          <div class="reader-sidebar__header">
            <h2 class="reader-sidebar__book-title">{escape_text(BOOK_TITLE)}</h2>
            <p class="reader-sidebar__author">{escape_text(AUTHOR)}</p>
            <p class="reader-sidebar__position" id="sidebar-position">1 of {n}</p>
          </div>
          <div class="progress-ring">
            <svg viewBox="0 0 36 36" aria-hidden="true">
              <circle class="progress-ring__track" cx="18" cy="18" r="16" />
              <circle class="progress-ring__fill" id="progress-ring-circle" cx="18" cy="18" r="16" />
            </svg>
            <span class="progress-ring__label" id="progress-pct"><strong>0%</strong> through manuscript</span>
          </div>
          <ol class="toc-list" id="toc-desktop">
{toc_d}
          </ol>
        </aside>

        <div class="reader-main">
          <article class="reader-content" id="chapter-content">
            <p class="chapter-label" id="chapter-label">{escape_text(first["label"])}</p>
            <h1 class="chapter-title" id="chapter-title">{escape_text(first["title"])}</h1>
            <p class="chapter-meta" id="chapter-meta">~{first["read_min"]} min read</p>
            <hr class="chapter-rule" />
            <div id="chapter-body-host"></div>
            <nav class="chapter-nav" aria-label="Chapter navigation" id="chapter-nav"></nav>
            <p class="chapter-position" id="chapter-position">1 of {n}</p>
          </article>
        </div>
      </div>
    </main>

{templates_joined}

    <script>
      window.__BOOK_CHAPTERS__ = __BOOK_JSON_PLACEHOLDER__;
    </script>
    <script>
(function () {{
  var chapters = window.__BOOK_CHAPTERS__;
  var n = chapters.length;
  var host = document.getElementById("chapter-body-host");
  var titleEl = document.getElementById("chapter-title");
  var labelEl = document.getElementById("chapter-label");
  var metaEl = document.getElementById("chapter-meta");
  var posEl = document.getElementById("chapter-position");
  var sidePos = document.getElementById("sidebar-position");
  var headTitle = document.getElementById("reader-header-title");
  var navEl = document.getElementById("chapter-nav");
  var ring = document.getElementById("progress-ring-circle");
  var pctLabel = document.getElementById("progress-pct");
  var bar = document.getElementById("reader-progress-fill");
  var barWrap = document.querySelector(".reader-progress");
  var C = 100.53;

  function parseHash() {{
    var m = (location.hash || "").match(/^#ch-(\\d+)$/);
    if (!m) return 0;
    var i = parseInt(m[1], 10);
    if (isNaN(i) || i < 0 || i >= n) return 0;
    return i;
  }}

  function setActiveToc(idx) {{
    document.querySelectorAll(".toc-list__item").forEach(function (li) {{
      li.classList.remove("is-active");
      var a = li.querySelector("a");
      if (a) {{ a.removeAttribute("aria-current"); }}
    }});
    document.querySelectorAll('.toc-list a[href="#ch-' + idx + '"]').forEach(function (a) {{
      var li = a.closest(".toc-list__item");
      if (li) {{
        li.classList.add("is-active");
        a.setAttribute("aria-current", "true");
      }}
    }});
  }}

  function updateProgress(idx) {{
    var pct = n <= 1 ? 100 : Math.round((idx / (n - 1)) * 100);
    if (ring) {{
      ring.style.strokeDashoffset = (C * (1 - pct / 100)).toFixed(2);
    }}
    if (pctLabel) {{
      pctLabel.innerHTML = "<strong>" + pct + "%</strong> through manuscript";
    }}
    if (bar) {{
      bar.style.width = pct + "%";
    }}
    if (barWrap) {{
      barWrap.setAttribute("aria-valuenow", String(pct));
    }}
  }}

  function renderChapter(idx) {{
    var ch = chapters[idx];
    var tpl = document.getElementById("tpl-ch-" + idx);
    if (!tpl || !host) return;
    host.innerHTML = "";
    host.appendChild(tpl.content.cloneNode(true));
    titleEl.textContent = ch.title;
    labelEl.textContent = ch.label;
    metaEl.textContent = "~" + ch.read_min + " min read";
    var num = idx + 1;
    posEl.textContent = num + " of " + n;
    sidePos.textContent = num + " of " + n;
    headTitle.textContent = ch.title;
    document.title = ch.title + " — " + "{escape_text(BOOK_TITLE)}" + " (draft)";
    setActiveToc(idx);
    updateProgress(idx);

    var mobileSum = document.getElementById("mobile-toc-summary");
    if (mobileSum) {{
      mobileSum.textContent = "Section " + num + " of " + n + " — table of contents";
    }}

    navEl.innerHTML = "";
    if (idx > 0) {{
      var prev = chapters[idx - 1];
      var a = document.createElement("a");
      a.href = "#ch-" + (idx - 1);
      a.className = "chapter-nav__link";
      a.innerHTML = '<span class="chapter-nav__dir">← Previous</span><span class="chapter-nav__title"></span>';
      a.querySelector(".chapter-nav__title").textContent = prev.title;
      navEl.appendChild(a);
    }} else {{
      var ph = document.createElement("span");
      ph.className = "chapter-nav__link";
      ph.style.opacity = "0.4";
      ph.style.pointerEvents = "none";
      ph.innerHTML = '<span class="chapter-nav__dir">← Previous</span><span class="chapter-nav__title">—</span>';
      navEl.appendChild(ph);
    }}
    if (idx < n - 1) {{
      var next = chapters[idx + 1];
      var a2 = document.createElement("a");
      a2.href = "#ch-" + (idx + 1);
      a2.className = "chapter-nav__link chapter-nav__link--next";
      a2.innerHTML = '<span class="chapter-nav__dir">Next →</span><span class="chapter-nav__title"></span>';
      a2.querySelector(".chapter-nav__title").textContent = next.title;
      navEl.appendChild(a2);
    }} else {{
      var ph2 = document.createElement("span");
      ph2.className = "chapter-nav__link chapter-nav__link--next";
      ph2.style.opacity = "0.4";
      ph2.style.pointerEvents = "none";
      ph2.innerHTML = '<span class="chapter-nav__dir">Next →</span><span class="chapter-nav__title">—</span>';
      navEl.appendChild(ph2);
    }}
    window.scrollTo(0, 0);
  }}

  function onHash() {{
    renderChapter(parseHash());
  }}

  window.addEventListener("hashchange", onHash);
  if (!location.hash || !/^#ch-\\d+$/.test(location.hash)) {{
    location.replace(location.pathname + location.search + "#ch-0");
  }} else {{
    onHash();
  }}

  document.querySelectorAll(".font-control__btn").forEach(function (btn) {{
    btn.addEventListener("click", function () {{
      document.querySelectorAll(".font-control__btn").forEach(function (b) {{ b.classList.remove("is-active"); }});
      btn.classList.add("is-active");
      var prose = host.querySelector(".reader-prose");
      if (!prose) return;
      prose.classList.remove("reader-prose--sm", "reader-prose--lg");
      var size = btn.getAttribute("data-size");
      if (size === "sm") prose.classList.add("reader-prose--sm");
      if (size === "lg") prose.classList.add("reader-prose--lg");
    }});
  }});

  var sb = document.querySelector(".sidebar-toggle");
  if (sb) sb.addEventListener("click", function () {{
    var toc = document.getElementById("mobile-toc");
    if (toc) {{
      toc.open = !toc.open;
      this.setAttribute("aria-expanded", toc.open);
    }}
  }});
}})();
    </script>
    <script src="../site-templates/site-shell.js" defer></script>
  </body>
</html>
"""


def main() -> None:
    chapters = read_chapters()
    if not chapters:
        raise SystemExit(f"No numbered chapters found under {MS_DIR}")
    slim = [{k: v for k, v in ch.items() if k != "html"} for ch in chapters]
    text = build_reader_html(chapters).replace(
        "__BOOK_JSON_PLACEHOLDER__", json.dumps(slim, ensure_ascii=False)
    )
    OUT_READER.write_text(text, encoding="utf-8")
    print(f"Wrote {OUT_READER.relative_to(ROOT)} ({len(chapters)} sections)")


if __name__ == "__main__":
    main()
