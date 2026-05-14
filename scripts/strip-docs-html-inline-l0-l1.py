#!/usr/bin/env python3
"""
Remove duplicated L0/L1 blocks from docs/html root prototypes:
  :root { ... } + *, html, @media (prefers-reduced-motion), body { ... }

Tokens and base layer must come only from site-templates/site-theme.css
(DESIGN.md / STATIC_HTML_AND_TEMPLATES.md).

Usage (repo root):
  python3 scripts/strip-docs-html-inline-l0-l1.py
"""

from __future__ import annotations

import sys
from pathlib import Path

_scripts_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(_scripts_dir))

from movemental_docs_html_path import movemental_docs_html_root

REPO = Path(__file__).resolve().parents[1]
HTML_DIR = movemental_docs_html_root(REPO)

TARGETS = [
    "index.html",
    "index-old.html",
    "nonprofits.html",
    "how-it-works.html",
    "movement-leaders.html",
    "system.html",
    "churches.html",
    "evidence.html",
    "pricing.html",
    "governance-ethics-system-build.html",
    "content-system-build.html",
    "fundraising-system-build.html",
    "discovery-lab.html",
    "movemental-at-100.html",
    "faq.html",
    "who-is-a-movement-leader.html",
]


def skip_ws_comments(s: str, i: int) -> int:
    n = len(s)
    while i < n:
        if s[i] in " \t\n\r":
            i += 1
            continue
        if s.startswith("/*", i):
            j = s.find("*/", i + 2)
            if j == -1:
                return n
            i = j + 2
            continue
        break
    return i


def consume_balanced_from_open_brace(s: str, open_brace: int) -> int:
    i = open_brace + 1
    depth = 1
    n = len(s)
    while i < n and depth:
        if s[i] == "{":
            depth += 1
        elif s[i] == "}":
            depth -= 1
        i += 1
    return i


def strip_l0_l1(s: str) -> tuple[str, bool]:
    key = "      :root {"
    start = s.find(key)
    if start == -1:
        return s, False

    i = start + len(key)
    depth = 1
    n = len(s)
    while i < n and depth:
        if s[i] == "{":
            depth += 1
        elif s[i] == "}":
            depth -= 1
        i += 1

    pos = skip_ws_comments(s, i)
    while pos < n:
        pos = skip_ws_comments(s, pos)
        if pos >= n:
            break
        line_until_nl = s.find("\n", pos)
        if line_until_nl == -1:
            head = s[pos:]
        else:
            head = s[pos:line_until_nl]
        stripped_head = head.lstrip()
        # Match `body {` / `body{` at start of rule (first line of block)
        first_line = stripped_head.split("\n", 1)[0]
        if first_line.startswith("body") and "{" in first_line:
            ob = s.find("{", pos)
            if ob == -1:
                break
            end_body = consume_balanced_from_open_brace(s, ob)
            tail = skip_ws_comments(s, end_body)
            return s[:start] + s[tail:], True

        ob = s.find("{", pos)
        if ob == -1:
            break
        pos = consume_balanced_from_open_brace(s, ob)

    return s, False


def main() -> None:
    changed = 0
    for name in TARGETS:
        path = HTML_DIR / name
        if not path.is_file():
            print(f"skip (missing): {path.relative_to(REPO)}")
            continue
        raw = path.read_text(encoding="utf-8")
        new, did = strip_l0_l1(raw)
        if not did:
            print(f"unchanged: {path.relative_to(REPO)}")
            continue
        path.write_text(new, encoding="utf-8")
        changed += 1
        print(f"stripped L0/L1: {path.relative_to(REPO)}")
    print(f"done. updated {changed} file(s).")


if __name__ == "__main__":
    main()
