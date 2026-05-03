#!/usr/bin/env python3
"""
Remove duplicated skip-link + fixed site-header + site-drawer + main padding-top
rules from docs/html/*.html inline <style> blocks.

Canonical definitions live in docs/html/site-templates/prototype-pages.css
(loaded after site-theme.css). See docs/design/DESIGN.md §14.

Run from repo root:
  python3 scripts/dedupe-docs-html-chrome-css.py
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HTML_DIR = ROOT / "docs" / "html"

MAIN_BLOCK = re.compile(
    r"      main \{\n        padding-top: (?:var\(--site-header-height\)|4rem);\n      \}\n",
    re.MULTILINE,
)

SKIP_PREFIX = "      .skip-link {\n        position: absolute;\n        width: 1px;"
COMMENT_COMPONENTS = "      /* --- 3) COMPONENTS (L4) --- */\n"
COMMENT_HEADER_NAV = "      /* --- 3) HEADER / NAV --- */\n"


def strip_duplicate_chrome(text: str) -> tuple[str, bool]:
    pos = text.find("      .site-header {")
    if pos == -1:
        return text, False

    start = pos
    window_start = max(0, pos - 2200)
    window = text[window_start:pos]
    lb = window.rfind("      .skip-link {")
    if lb != -1:
        abs_lb = window_start + lb
        chunk = text[abs_lb:pos]
        if "position: absolute" in chunk and "width: 1px" in chunk:
            start = abs_lb

    m_main = MAIN_BLOCK.search(text, pos)
    if not m_main:
        return text, False
    end = m_main.end()

    for marker in (COMMENT_COMPONENTS, COMMENT_HEADER_NAV):
        i = text.rfind(marker, start, pos + 1)
        if i != -1 and text[i + len(marker) : pos].strip() == "":
            start = min(start, i)

    new_text = text[:start] + text[end:]
    return new_text, True


def main() -> None:
    targets = sorted(HTML_DIR.glob("*.html"))
    n = 0
    for path in targets:
        if path.name in ("index-old.html",):
            continue
        raw = path.read_text(encoding="utf-8")
        if "prototype-pages.css" not in raw:
            continue
        if "      .site-header {" not in raw:
            continue
        updated, changed = strip_duplicate_chrome(raw)
        if not changed:
            print(f"skip (no main block after header?): {path.relative_to(ROOT)}")
            continue
        if updated == raw:
            continue
        path.write_text(updated, encoding="utf-8")
        print(f"deduped {path.relative_to(ROOT)}")
        n += 1
    print(f"done, {n} files")


if __name__ == "__main__":
    main()
