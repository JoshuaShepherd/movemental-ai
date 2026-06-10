#!/usr/bin/env python3
"""
Build well-organized PDF research dossiers for every onboarded movement leader.

Reads markdown from docs/movement_leader_research/_onboarded_leaders/<slug>/
and writes final PDFs to:

  docs/movement_leader_research/_onboarded_leaders/PDF/<slug>/<slug>.pdf

Requires: pip install markdown weasyprint  (see scripts/requirements-pdf.txt)

Usage:
  python3 scripts/build-onboarded-leaders-pdf.py
  python3 scripts/build-onboarded-leaders-pdf.py kate-coleman dhati-lewis
"""

from __future__ import annotations

import html
import re
import sys
from datetime import date
from pathlib import Path

import markdown
from weasyprint import HTML

REPO_ROOT = Path(__file__).resolve().parents[1]
ONBOARDED_ROOT = REPO_ROOT / "docs" / "movement_leader_research" / "_onboarded_leaders"
PDF_ROOT = ONBOARDED_ROOT / "PDF"
SHARED_REFLECTED = ONBOARDED_ROOT / "reflected-understanding"

SKIP_TOP_LEVEL = {"PDF", "reflected-understanding"}

# Leader-facing dossier order (matches Author Profile sidebar flow).
PRIORITY_RELATIVE_PATHS: list[str] = [
    "README.md",
    "summary.md",
    "profile/identity.md",
    "profile/biography.md",
    "profile/theology.md",
    "profile/calling-profile.md",
    "profile/voice-analysis.md",
    "content/books.md",
    "content/frameworks.md",
    "content/articles.md",
    "content/audio.md",
    "content/videos.md",
    "content/content-audit.md",
    "content/academic.md",
    "content/courses.md",
    "network/organizations.md",
    "network/collaborators.md",
    "network/endorsements.md",
    "network/events.md",
    "analysis/audience-analysis.md",
    "digital-presence/websites.md",
    "digital-presence/platforms.md",
    "digital-presence/newsletters.md",
    "digital-presence/social-media.md",
    "media/press-coverage.md",
    "media/reviews.md",
    "media/citations.md",
    "fragmentation-story.md",
    "@@REFLECTED_UNDERSTANDING@@",
    "welcome-letter.md",
    "@@WELCOME_LETTER_VARIANTS@@",
    "committed-voice.md",
    "_misc/committed-voice.md",
    "@@COLLATED@@",
    "sources.md",
    "digital-presence-discovery.md",
    "_misc/digital-presence-discovery.md",
]

EXCLUDE_DIR_PARTS = {
    "_staff",
    "_misc/collated",
    "_misc/pdf",
    "__pycache__",
}

EXCLUDE_FILE_NAMES = {
    "_tracker.md",
    "AUTHOR_PROFILE_PRESENTATION_STANDARDS.md",
}

PRINT_CSS = """
@page {
  size: letter;
  margin: 0.72in 0.78in;
  @bottom-center {
    content: counter(page) " / " counter(pages);
    font-size: 8pt;
    color: #64748b;
  }
}
* { box-sizing: border-box; }
html {
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
body {
  font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 10.25pt;
  line-height: 1.58;
  color: #2a3439;
}
.cover {
  min-height: 9.5in;
  margin: -0.72in -0.78in 1.1in;
  padding: 1.05in 0.9in;
  background: linear-gradient(145deg, #19150f 0%, #2a3439 52%, #1a2744 100%);
  color: #f8f4ed;
  page-break-after: always;
}
.cover-kicker {
  font-size: 9pt;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #c4b8a8;
  margin: 0 0 0.55rem;
}
.cover h1 {
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 0.35rem;
  line-height: 1.12;
  border: none;
  color: #faf7f2;
}
.cover-sub {
  font-size: 12.5pt;
  color: #e8dfd3;
  margin: 0 0 1.35rem;
  max-width: 36rem;
}
.cover-meta {
  font-size: 9.25pt;
  color: #a89b8c;
  margin: 0;
}
.cover-accent {
  width: 3.25rem;
  height: 4px;
  background: #19150f;
  border-radius: 2px;
  margin-bottom: 1.1rem;
  box-shadow: 0 0 0 1px rgba(248, 244, 237, 0.15);
}
.toc {
  page-break-after: always;
}
.toc h2 {
  font-size: 1.2rem;
  letter-spacing: -0.02em;
  border-bottom: 2px solid #19150f;
  padding-bottom: 0.35rem;
  margin-top: 0;
  color: #19150f;
}
.toc ol {
  margin: 0.75rem 0 0 1.1rem;
  padding: 0;
}
.toc li {
  margin: 0.22rem 0;
  font-size: 9.25pt;
}
.toc a { color: #19150f; text-decoration: none; }
article.chapter { page-break-before: always; }
article.chapter:first-of-type { page-break-before: avoid; }
article.chapter h2.chapter-heading {
  font-size: 1.28rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #19150f;
  margin: 0 0 0.75rem;
  padding-bottom: 0.32rem;
  border-bottom: 2px solid #19150f;
  page-break-after: avoid;
}
article.chapter .path-label {
  font-size: 8.25pt;
  color: #64748b;
  font-family: ui-monospace, monospace;
  margin: -0.15rem 0 0.85rem;
}
.md-content h1 { font-size: 1.28rem; margin-top: 1em; page-break-after: avoid; color: #19150f; }
.md-content h2 { font-size: 1.1rem; margin-top: 0.95em; page-break-after: avoid; color: #2a3439; }
.md-content h3 { font-size: 1.02rem; margin-top: 0.85em; page-break-after: avoid; }
.md-content h4, .md-content h5, .md-content h6 { margin-top: 0.8em; page-break-after: avoid; }
.md-content p { margin: 0.52em 0; orphans: 3; widows: 3; }
.md-content ul, .md-content ol { margin: 0.48em 0 0.58em 1.15em; padding-left: 0.35em; }
.md-content li { margin: 0.22em 0; }
.md-content blockquote {
  margin: 0.7em 0;
  padding: 0.48em 0.8em;
  border-left: 3px solid #19150f;
  background: #f5f0e8;
  color: #334155;
}
.md-content hr {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 1.15rem 0;
}
.md-content table {
  width: 100%;
  border-collapse: collapse;
  font-size: 8.5pt;
  margin: 0.7em 0;
  page-break-inside: avoid;
}
.md-content th, .md-content td {
  border: 1px solid #e2e8f0;
  padding: 0.32rem 0.42rem;
  text-align: left;
  vertical-align: top;
}
.md-content th { background: #f8fafc; font-weight: 600; color: #19150f; }
.md-content pre, .md-content code {
  font-family: ui-monospace, "Cascadia Code", monospace;
  font-size: 8.5pt;
}
.md-content pre {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.6rem 0.7rem;
  white-space: pre-wrap;
  word-break: break-word;
  page-break-inside: avoid;
}
.md-content code { background: #f1f5f9; padding: 0.07em 0.25em; border-radius: 3px; }
.md-content pre code { background: none; padding: 0; }
.md-content a { color: #19150f; text-decoration: underline; }
"""


def slug_to_title(slug: str) -> str:
    return " ".join(part.capitalize() for part in slug.split("-"))


def display_name_from_summary(summary_path: Path) -> str | None:
    if not summary_path.is_file():
        return None
    first_line = summary_path.read_text(encoding="utf-8").splitlines()[0:3]
    for line in first_line:
        m = re.match(r"^#\s+(.+?)(?:\s+—|\s+-|$)", line.strip())
        if m:
            return m.group(1).strip()
    return None


def is_excluded_relative(rel: str) -> bool:
    rel_posix = rel.replace("\\", "/")
    if rel_posix in EXCLUDE_FILE_NAMES:
        return True
    for part in EXCLUDE_DIR_PARTS:
        if rel_posix == part or rel_posix.startswith(part + "/"):
            return True
    if "/_staff/" in f"/{rel_posix}/" or rel_posix.startswith("_staff/"):
        return True
    # Skip duplicate nested slug folder copies when root-level equivalents exist.
    parts = rel_posix.split("/")
    if len(parts) >= 2 and parts[0] == parts[1]:
        return True
    return False


def collect_markdown_files(leader_dir: Path, slug: str) -> dict[str, Path]:
    """Map relative posix path -> absolute path for includable markdown."""
    found: dict[str, Path] = {}

    for path in sorted(leader_dir.rglob("*.md")):
        rel = path.relative_to(leader_dir).as_posix()
        if is_excluded_relative(rel):
            continue
        # Operator / consulting artifacts at legacy root paths.
        if rel in {
            "gap-analysis.md",
            "movemental-analysis.md",
            "content-analysis.md",
            "identity-verification.md",
        } and (leader_dir / "profile").is_dir():
            continue
        if rel.startswith("analysis/") and rel != "analysis/audience-analysis.md":
            continue
        found[rel] = path

    # Reflected understanding — local folder or shared.
    local_reflected = leader_dir / "reflected-understanding" / f"{slug}.md"
    if local_reflected.is_file():
        found["@@REFLECTED_UNDERSTANDING@@"] = local_reflected
    else:
        shared = SHARED_REFLECTED / f"{slug}.md"
        if shared.is_file():
            found["@@REFLECTED_UNDERSTANDING@@"] = shared

    # Collated substrate at leader root.
    for collated in sorted(leader_dir.glob("*_RESEARCH_COLLATED.md")):
        found["@@COLLATED@@"] = collated
        break
    for collated in sorted(leader_dir.glob("*_DYAD_RESEARCH_COLLATED.md")):
        found["@@COLLATED@@"] = collated
        break

    # Dated welcome-letter variants.
    for welcome in sorted(leader_dir.glob("welcome-letter*.md")):
        if welcome.name == "welcome-letter.md":
            continue
        key = f"@@WELCOME::{welcome.name}@@"
        found[key] = welcome

    return found


def chapter_title(slug: str, rel_key: str) -> str:
    if rel_key == "@@REFLECTED_UNDERSTANDING@@":
        return "A Letter — Reflected Understanding"
    if rel_key == "@@COLLATED@@":
        return "Research Collated (Substrate)"
    if rel_key.startswith("@@WELCOME::"):
        name = rel_key.replace("@@WELCOME::", "").replace("@@", "")
        return name.replace(".md", "").replace("-", " ").title()
    mapping = {
        "README.md": "Research Index",
        "summary.md": "At a Glance — Summary",
        "profile/identity.md": "Author Profile — Identity",
        "profile/biography.md": "Biography",
        "profile/theology.md": "Theological Profile",
        "profile/calling-profile.md": "Vocational Profile",
        "profile/voice-analysis.md": "Voice & Editorial Identity",
        "content/books.md": "Bibliography",
        "content/frameworks.md": "Frameworks",
        "content/articles.md": "Articles & Blog Posts",
        "content/audio.md": "Audio & Podcast",
        "content/videos.md": "Video Content",
        "content/content-audit.md": "Content Audit",
        "content/academic.md": "Academic Work",
        "content/courses.md": "Courses & Training",
        "network/organizations.md": "Organizations & Affiliations",
        "network/collaborators.md": "Collaborators",
        "network/endorsements.md": "Endorsements",
        "network/events.md": "Events",
        "analysis/audience-analysis.md": "Audience & Reach",
        "digital-presence/websites.md": "Websites",
        "digital-presence/platforms.md": "Publishing Platforms",
        "digital-presence/newsletters.md": "Newsletters",
        "digital-presence/social-media.md": "Social Media",
        "media/press-coverage.md": "Press Coverage",
        "media/reviews.md": "Reviews",
        "media/citations.md": "Citations",
        "fragmentation-story.md": "The Fragmentation Story",
        "welcome-letter.md": "Welcome Letter",
        "committed-voice.md": "Committed Voice",
        "_misc/committed-voice.md": "Committed Voice",
        "sources.md": "Sources",
        "digital-presence-discovery.md": "Digital Presence Discovery",
        "_misc/digital-presence-discovery.md": "Digital Presence Discovery",
    }
    if rel_key in mapping:
        return mapping[rel_key]
    return rel_key.replace(".md", "").replace("/", " · ").replace("_", " ").title()


def ordered_chapters(found: dict[str, Path], slug: str) -> list[tuple[str, Path, str]]:
    chapters: list[tuple[str, Path, str]] = []
    used: set[str] = set()

    def add(key: str, path: Path) -> None:
        if key in used:
            return
        used.add(key)
        chapters.append((key, path, chapter_title(slug, key)))

    for token in PRIORITY_RELATIVE_PATHS:
        if token == "@@WELCOME_LETTER_VARIANTS@@":
            for key in sorted(k for k in found if k.startswith("@@WELCOME::")):
                add(key, found[key])
            continue
        if token in found:
            add(token, found[token])

    remaining = sorted(k for k in found if k not in used)
    for key in remaining:
        add(key, found[key])

    return chapters


def build_html(slug: str, display_name: str, chapters: list[tuple[str, Path, str]]) -> str:
    md = markdown.Markdown(extensions=["tables", "fenced_code", "nl2br", "sane_lists"])
    toc_entries: list[tuple[str, str]] = []
    chapter_html_parts: list[str] = []

    for index, (key, path, title) in enumerate(chapters, start=1):
        chapter_id = f"ch-{index}"
        raw = path.read_text(encoding="utf-8")
        body = md.convert(raw)
        md.reset()
        rel_label = path.relative_to(REPO_ROOT).as_posix()
        toc_entries.append((chapter_id, title))
        chapter_html_parts.append(
            f'<article class="chapter" id="{chapter_id}">'
            f'<h2 class="chapter-heading">{html.escape(title)}</h2>'
            f'<p class="path-label">{html.escape(rel_label)}</p>'
            f'<div class="md-content">{body}</div>'
            f"</article>"
        )

    toc_html = (
        '<nav class="toc" id="contents"><h2>Contents</h2><ol>'
        + "".join(
            f'<li><a href="#{cid}">{i}. {html.escape(title)}</a></li>'
            for i, (cid, title) in enumerate(toc_entries, start=1)
        )
        + "</ol></nav>"
    )

    today = date.today().strftime("%B %d, %Y")
    cover_html = f"""
    <header class="cover">
      <div class="cover-accent"></div>
      <p class="cover-kicker">Movemental · Onboarded leader research</p>
      <h1>{html.escape(display_name)}</h1>
      <p class="cover-sub">Movement leader research dossier — profile, content catalog, digital presence, fragmentation story, and onboarding materials.</p>
      <p class="cover-meta">Generated {html.escape(today)} · {len(chapters)} sections · Slug: {html.escape(slug)}</p>
    </header>
    """

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>{html.escape(display_name)} — Movement leader research</title>
  <style>{PRINT_CSS}</style>
</head>
<body>
  {cover_html}
  {toc_html}
  {''.join(chapter_html_parts)}
</body>
</html>"""


def build_leader_pdf(slug: str, leader_dir: Path) -> Path | None:
    found = collect_markdown_files(leader_dir, slug)
    if not found:
        print(f"  skip {slug}: no includable markdown")
        return None

    chapters = ordered_chapters(found, slug)
    summary_name = display_name_from_summary(leader_dir / "summary.md")
    display_name = summary_name or slug_to_title(slug)

    out_dir = PDF_ROOT / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    pdf_path = out_dir / f"{slug}.pdf"

    document_html = build_html(slug, display_name, chapters)
    HTML(string=document_html, base_url=str(REPO_ROOT)).write_pdf(str(pdf_path))
    return pdf_path


def leader_slugs(filter_slugs: list[str] | None = None) -> list[str]:
    slugs = sorted(
        p.name
        for p in ONBOARDED_ROOT.iterdir()
        if p.is_dir() and p.name not in SKIP_TOP_LEVEL and not p.name.startswith(".")
    )
    if filter_slugs:
        missing = sorted(set(filter_slugs) - set(slugs))
        if missing:
            print(f"Warning: unknown slug(s): {', '.join(missing)}", file=sys.stderr)
        slugs = [s for s in slugs if s in filter_slugs]
    return slugs


def main() -> int:
    filter_slugs = sys.argv[1:] if len(sys.argv) > 1 else None
    slugs = leader_slugs(filter_slugs)

    print(f"Building PDFs for {len(slugs)} onboarded leader(s) → {PDF_ROOT}")
    built = 0
    skipped = 0

    for slug in slugs:
        leader_dir = ONBOARDED_ROOT / slug
        print(f"• {slug} …", end=" ", flush=True)
        try:
            pdf_path = build_leader_pdf(slug, leader_dir)
        except Exception as exc:  # noqa: BLE001 — batch runner; report and continue
            print(f"ERROR: {exc}")
            skipped += 1
            continue
        if pdf_path is None:
            skipped += 1
            continue
        size_kb = pdf_path.stat().st_size // 1024
        print(f"ok ({size_kb} KB) → {pdf_path.relative_to(REPO_ROOT)}")
        built += 1

    print(f"\nDone: {built} PDF(s) built, {skipped} skipped.")
    return 0 if built else 1


if __name__ == "__main__":
    raise SystemExit(main())
