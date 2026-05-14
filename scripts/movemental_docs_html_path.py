"""Resolve the Movemental static HTML lab root (former `docs/html`)."""
from __future__ import annotations

import os
from pathlib import Path


def movemental_docs_html_root(repo_root: Path) -> Path:
    env = os.environ.get("MOVEMENTAL_STATIC_HTML_ROOT", "").strip()
    if env:
        return Path(env)
    sibling = repo_root.parent / "1-html" / "labs" / "movemental-ai" / "docs-html"
    if (sibling / "site-templates" / "site-theme.css").is_file():
        return sibling
    external = repo_root / "external" / "1-html" / "labs" / "movemental-ai" / "docs-html"
    if (external / "site-templates" / "site-theme.css").is_file():
        return external
    legacy = repo_root / "docs" / "html"
    if (legacy / "site-templates" / "site-theme.css").is_file():
        return legacy
    raise SystemExit(
        "Static HTML lab not found. Set MOVEMENTAL_STATIC_HTML_ROOT or place "
        "01-Movemental-Core/1-html next to movemental-ai."
    )
