#!/usr/bin/env python3
"""
Rewrite docs/html/* prototype headers to use a consistent two-tier nav.

Shared CSS for these pages lives in docs/html/site-templates/site-theme.css and
prototype-pages.css; see docs/design/DESIGN.md §14.

This script rewrites headers to use a consistent two-tier nav:
  - Site: cross-links across core HTML prototypes
  - On this page: existing in-document anchors + CTA in the mobile drawer

Run from repo root:
  python3 scripts/sync-docs-html-nav.py
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_DIR = ROOT / "docs" / "html"

# (filename, label) — order is intentional: story → mechanism → proof → commerce
GLOBAL_PAGES: list[tuple[str, str]] = [
    ("index.html", "Home"),
    ("how-it-works.html", "How it works"),
    ("system.html", "System"),
    ("movement-leaders.html", "Leaders"),
    ("nonprofits.html", "Nonprofits"),
    ("churches.html", "Churches"),
    ("evidence.html", "Evidence"),
    ("about.html", "About"),
    ("movemental-at-100.html", "Vision"),
    ("pricing.html", "Pricing"),
    ("faq.html", "FAQ"),
]

# basename -> (in-page links as (href, label), (cta_href, cta_label))
PAGE_CONFIG: dict[str, tuple[list[tuple[str, str]], tuple[str, str]]] = {
    "index.html": (
        [
            ("#problem", "The gap"),
            ("#audiences", "Who it’s for"),
            ("#how", "Mechanism"),
            ("#proof", "Proof"),
        ],
        ("#cta", "Start a conversation"),
    ),
    "how-it-works.html": (
        [
            ("#mechanism", "The movement"),
            ("#inputs", "What enters"),
            ("#ai", "AI"),
            ("#different", "What’s different"),
        ],
        ("#cta", "Start a conversation"),
    ),
    "system.html": (
        [
            ("#problem", "The problem"),
            ("#layers", "Layers"),
            ("#ai", "AI"),
            ("#formation", "Formation"),
        ],
        ("#cta", "See how it works"),
    ),
    "movement-leaders.html": (
        [
            ("#problem", "The problem"),
            ("#recognition", "Is this for me?"),
            ("#qualification", "Qualification"),
            ("#features", "What you get"),
        ],
        ("#cta", "Apply to join"),
    ),
    "nonprofits.html": (
        [
            ("#problem", "The problem"),
            ("#system", "The system"),
            ("#ai", "AI"),
            ("#fit", "Best fit"),
        ],
        ("#cta", "Start a conversation"),
    ),
    "churches.html": (
        [
            ("#problem", "The gap"),
            ("#need", "What churches need"),
            ("#features", "What’s possible"),
            ("#ai", "AI & wisdom"),
        ],
        ("#cta", "Start a conversation"),
    ),
    "evidence.html": (
        [
            ("#summary", "Summary"),
            ("#comparative", "Platform"),
            ("#ai", "AI"),
            ("#formation", "Formation"),
            ("#architecture", "Architecture"),
        ],
        ("#cta", "Talk with Movemental"),
    ),
    "about.html": (
        [
            ("#origin", "Why we exist"),
            ("#principles", "Non-negotiables"),
            ("#serves", "Who we serve"),
        ],
        ("#cta", "Start a conversation"),
    ),
    "movemental-at-100.html": (
        [
            ("#framing", "Framing"),
            ("#world-sees", "Field"),
            ("#leaders-experience", "Leaders"),
            ("#system-sees", "System"),
            ("#site-connections", "Connections"),
        ],
        ("index.html#how", "Get started"),
    ),
    "pricing.html": (
        [
            ("#leaders", "For leaders"),
            ("#orgs", "For organizations"),
            ("#included", "What’s included"),
        ],
        ("#cta", "Start a conversation"),
    ),
    "faq.html": (
        [
            ("#general", "Overview"),
            ("#who", "Audiences"),
            ("#product", "Product"),
            ("#ai", "AI"),
            ("#organizations", "Organizations"),
        ],
        ("index.html#cta", "Start a conversation"),
    ),
    "who-is-a-movement-leader.html": (
        [
            ("#definition", "Definition"),
            ("#marks", "The marks"),
            ("#recognition", "Recognition"),
        ],
        ("index.html#cta", "Start a conversation"),
    ),
    "content-system-build.html": (
        [
            ("#solves", "What it solves"),
            ("#built", "What gets built"),
            ("#matters", "Why it matters"),
            ("#connects", "In the system"),
            ("#outcomes", "Outcomes"),
            ("#fit", "Best fit"),
        ],
        ("#cta", "Start a conversation"),
    ),
    "discovery-lab.html": (
        [
            ("#problem", "The problem"),
            ("#built", "What gets built"),
            ("#pathway", "Pathways"),
            ("#outcomes", "Outcomes"),
        ],
        ("#closing-cta", "Start a conversation"),
    ),
    "fundraising-system-build.html": (
        [
            ("#problem", "The problem"),
            ("#built", "What gets built"),
            ("#why", "Why it matters"),
            ("#pathway", "How it fits"),
        ],
        ("#cta", "Start a conversation"),
    ),
    "governance-ethics-system-build.html": (
        [
            ("#problem", "The problem"),
            ("#built", "What gets built"),
            ("#why", "Why it matters"),
            ("#intersections", "How it fits"),
            ("#outcomes", "Outcomes"),
            ("#fit", "Best fit"),
        ],
        ("#cta", "Start a conversation"),
    ),
}

OLD_NAV_DISPLAY = """      .site-header__nav {
        display: none;
        align-items: center;
        gap: 1.5rem;
      }

      @media (min-width: 900px) {
        .site-header__nav {
          display: flex;
        }
      }
"""

NEW_NAV_DISPLAY = """      .site-header__clusters {
        display: none;
        flex: 1 1 auto;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;
        gap: 0.35rem 0.75rem;
        min-width: 0;
      }

      @media (min-width: 900px) {
        .site-header__clusters {
          display: flex;
        }
      }

      .site-header__nav {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.45rem 0.85rem;
      }
"""

HEADER_DRAWER_RE = re.compile(
    r"<header class=\"site-header\">\s*"
    r'<div class="site-header__inner[^"]*">\s*'
    r"[\s\S]*?"
    r"</div>\s*</header>\s*"
    r'<div\s[^>]*id="site-drawer"[^>]*>\s*'
    r"[\s\S]*?"
    r"</div>(?=\s*<main id=\"main\">)",
    re.MULTILINE,
)


def global_nav_links(current: str) -> str:
    lines: list[str] = []
    for href, label in GLOBAL_PAGES:
        if href == current:
            lines.append(f'            <a href="{href}" aria-current="page">{label}</a>')
        else:
            lines.append(f'            <a href="{href}">{label}</a>')
    return "\n".join(lines)


def inpage_nav_links(links: list[tuple[str, str]]) -> str:
    return "\n".join(f'            <a href="{h}">{t}</a>' for h, t in links)


def drawer_items(current: str, inpage: list[tuple[str, str]], cta: tuple[str, str]) -> str:
    cta_href, cta_label = cta
    cta_attr = cta_href if cta_href.startswith(("http://", "https://", "#")) else cta_href
    # cta_href is like "index.html#cta" or "#cta"
    parts: list[str] = ['        <li class="site-drawer__label">Site</li>']
    for href, label in GLOBAL_PAGES:
        cur = " aria-current=\"page\"" if href == current else ""
        parts.append(f"        <li><a href=\"{href}\"{cur}>{label}</a></li>")
    parts.append('        <li class="site-drawer__label">On this page</li>')
    for href, label in inpage:
        parts.append(f"        <li><a href=\"{href}\">{label}</a></li>")
    parts.append(f'        <li><a href="{cta_attr}">{cta_label}</a></li>')
    return "\n".join(parts)


def build_header_block(current: str, inpage: list[tuple[str, str]], cta: tuple[str, str]) -> str:
    cta_href, cta_label = cta
    cta_attr = cta_href if (cta_href.startswith("#") or cta_href.startswith("http")) else cta_href
    drawer = drawer_items(current, inpage, cta)
    return f"""    <header class="site-header">
      <div class="site-header__inner site-header__inner--split">
        <a class="site-header__brand" href="index.html">Movemental</a>
        <div class="site-header__clusters">
          <nav class="site-header__nav site-header__nav--global" aria-label="Site">
{global_nav_links(current)}
          </nav>
          <span class="site-header__nav-break" aria-hidden="true"></span>
          <nav class="site-header__nav site-header__nav--page" aria-label="On this page">
{inpage_nav_links(inpage)}
          </nav>
        </div>
        <a class="site-header__cta btn btn--primary" href="{cta_attr}">{cta_label}</a>
        <button
          type="button"
          class="nav-toggle"
          id="nav-toggle"
          aria-expanded="false"
          aria-controls="site-drawer"
          aria-label="Open menu"
        >
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
        </button>
      </div>
    </header>

    <div id="site-drawer" class="site-drawer" hidden aria-label="Mobile navigation">
      <ul>
{drawer}
      </ul>
    </div>

"""


def patch_file(path: Path) -> bool:
    name = path.name
    if name not in PAGE_CONFIG:
        return False
    text = path.read_text(encoding="utf-8")
    if OLD_NAV_DISPLAY not in text:
        print(f"skip (no nav display block): {path.relative_to(ROOT)}")
        return False
    text = text.replace(OLD_NAV_DISPLAY, NEW_NAV_DISPLAY, 1)
    m = HEADER_DRAWER_RE.search(text)
    if not m:
        print(f"skip (no header match): {path.relative_to(ROOT)}")
        return False
    inpage, cta = PAGE_CONFIG[name]
    block = build_header_block(name, inpage, cta)
    text = text[: m.start()] + block + text[m.end() :]
    path.write_text(text, encoding="utf-8")
    print(f"patched {path.relative_to(ROOT)}")
    return True


def main() -> None:
    targets = sorted(HTML_DIR.glob("*.html"))
    n = 0
    for p in targets:
        if p.name == "index-old.html":
            continue
        if p.name in PAGE_CONFIG:
            if patch_file(p):
                n += 1
    print(f"done, {n} files")


if __name__ == "__main__":
    main()
