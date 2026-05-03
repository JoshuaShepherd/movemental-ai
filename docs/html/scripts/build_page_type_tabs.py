#!/usr/bin/env python3
"""
Extend docs/html/tabbed-argument-page.html with page-type tabs (about, evidence,
faq, …). Each tab lists all 173 deduped claims ranked by a weighted model:
legacy site-tab routing + strength + keyword hints (aligned with page-audit /
home-consult style page intents). Regenerates meta chips as top page-types by
score for each card.
"""

from __future__ import annotations

import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]  # docs/html
SOURCE_HTML = ROOT / "tabbed-argument-page.html"

# Foot-note: replace whole paragraph when toggling page-type extensions (idempotent runs).
FOOT_ORIGINAL = (
    "    <strong>Coverage audit.</strong> The build script asserts that every item in the deduped set lands on at least one tab. "
    "If any item were missing, the build would have failed with a <code>MISSING from every tab</code> error. "
    "The routing map lives in <code>/tmp/movemental-index/build_tabbed.py</code> "
    "(function <code>OVERRIDES</code> plus <code>default_route</code>) — editing it and re-running regenerates this page. "
    "Source items: 173 unique. Placements: 330. Crossover items: 123. Single-tab items: 50."
)
FOOT_EXTENDED = (
    "    <strong>Coverage audit.</strong> The build script asserts that every item in the deduped set lands on at least one legacy site tab. "
    "If any item were missing, the build would have failed with a <code>MISSING from every tab</code> error. "
    "Legacy site-tab routing map: <code>/tmp/movemental-index/build_tabbed.py</code> "
    "(<code>OVERRIDES</code> plus <code>default_route</code>). "
    "Page-type tabs (about, evidence, faq, methodology, pricing, services, system, terms, walkthrough, who-we-serve): "
    "<code>docs/html/scripts/build_page_type_tabs.py</code> "
    "(<code>PAGE_ANCHORS</code>, <code>WEIGHTS</code>, keyword hints). "
    "Source items: 173 unique. Placements: 330 legacy + 1730 page-type (= 2060). "
    "Crossover items (legacy): 123. Single-tab items (legacy): 50."
)

# Legacy site tabs as they appear after html.unescape of chip text.
OLD_TABS = {
    "Home",
    "Movement Leaders",
    "Churches & Non-Profits",
    "How It Works",
    "Proof & About",
    "Pricing & FAQ",
}

# Base score: legacy tab -> weight for each page type (0–10).
WEIGHTS: dict[str, dict[str, int]] = {
    "about": {
        "Proof & About": 10,
        "Home": 8,
        "Movement Leaders": 5,
        "Churches & Non-Profits": 4,
        "How It Works": 3,
        "Pricing & FAQ": 2,
    },
    "evidence": {
        "Proof & About": 10,
        "Home": 7,
        "How It Works": 6,
        "Movement Leaders": 5,
        "Churches & Non-Profits": 5,
        "Pricing & FAQ": 3,
    },
    "faq": {
        "Pricing & FAQ": 10,
        "Churches & Non-Profits": 8,
        "How It Works": 7,
        "Movement Leaders": 6,
        "Home": 5,
        "Proof & About": 3,
    },
    "methodology": {
        "How It Works": 10,
        "Churches & Non-Profits": 7,
        "Proof & About": 6,
        "Home": 5,
        "Movement Leaders": 5,
        "Pricing & FAQ": 4,
    },
    "pricing": {
        "Pricing & FAQ": 10,
        "Movement Leaders": 5,
        "Churches & Non-Profits": 6,
        "Home": 4,
        "How It Works": 3,
        "Proof & About": 2,
    },
    "services": {
        "How It Works": 9,
        "Movement Leaders": 9,
        "Churches & Non-Profits": 9,
        "Pricing & FAQ": 7,
        "Home": 6,
        "Proof & About": 4,
    },
    "system": {
        "How It Works": 10,
        "Home": 8,
        "Movement Leaders": 6,
        "Churches & Non-Profits": 6,
        "Proof & About": 5,
        "Pricing & FAQ": 3,
    },
    "terms": {
        "Pricing & FAQ": 10,
        "Churches & Non-Profits": 5,
        "How It Works": 3,
        "Home": 2,
        "Movement Leaders": 2,
        "Proof & About": 2,
    },
    "walkthrough": {
        "How It Works": 10,
        "Movement Leaders": 7,
        "Churches & Non-Profits": 7,
        "Pricing & FAQ": 5,
        "Home": 4,
        "Proof & About": 3,
    },
    "who-we-serve": {
        "Movement Leaders": 10,
        "Churches & Non-Profits": 10,
        "Home": 7,
        "Pricing & FAQ": 4,
        "How It Works": 4,
        "Proof & About": 3,
    },
}

KEYWORDS: dict[str, tuple[str, ...]] = {
    "terms": (
        "privacy",
        "terms of",
        " legal ",
        "liabilit",
        "warranty",
        "disclaimer",
        "contract",
        "intellectual property",
        "data retention",
        "gdpr",
        "acceptable use",
        " tos",
        "governance",
        "compliance",
    ),
    "pricing": (
        "$",
        "pricing",
        " fee",
        "fees",
        "cost",
        "10%",
        "90/",
        "revenue",
        "subscription",
        "retainer",
        "invoice",
        "economics",
        "venture builder",
    ),
    "methodology": (
        "scenius",
        "verification",
        "editorial",
        "workflow",
        "process",
        "how we",
        "method",
        "rubric",
        "criteria",
        "assess",
        "protocol",
        "framework",
    ),
    "evidence": (
        "%",
        "study",
        "research",
        "survey",
        "data shows",
        "statistic",
        "audit",
        "benchmark",
        "measured",
        "cohort",
    ),
    "walkthrough": (
        "step ",
        "first ",
        " then ",
        "onboarding",
        "when you",
        "journey",
        " flow",
        "timeline",
        "week ",
    ),
    "who-we-serve": (
        "movement leader",
        "church ",
        "churches",
        "board",
        "non-profit",
        "nonprofit",
        "pastor",
        "denomination",
        "organization",
        "institution",
        "network",
    ),
    "system": (
        "platform",
        "infrastructure",
        "database",
        "integration",
        " api",
        "architecture",
        "search",
        "discover",
        "seo",
        "stack",
        "supabase",
    ),
    "services": (
        "deliverable",
        "package",
        "includes",
        "offer",
        "engagement",
        "scope",
        "what you get",
        "sprint",
        "build",
    ),
    "about": (
        "founder",
        "charter",
        "mission",
        "story",
        "movemental is built",
        "alan hirsch",
        "who we are",
        "vision",
    ),
    "faq": (
        "objection",
        "faq",
        "question",
        "why not",
        "compared to",
        "versus",
        " vs ",
        "myth",
        "worry",
    ),
}

PAGE_LABELS = {
    "about": "About",
    "evidence": "Evidence",
    "faq": "FAQ",
    "methodology": "Methodology",
    "pricing": "Pricing",
    "services": "Services",
    "system": "System",
    "terms": "Terms",
    "walkthrough": "Walkthrough",
    "who-we-serve": "Who We Serve",
}

PAGE_ROUTES = {
    "about": "`/about`",
    "evidence": "`/evidence` · case studies · metrics",
    "faq": "`/faq`",
    "methodology": "`/methodology`",
    "pricing": "`/pricing`",
    "services": "`/services`",
    "system": "`/system`",
    "terms": "`/terms` · privacy · acceptable use",
    "walkthrough": "`/walkthrough` · product tour",
    "who-we-serve": "`/who-we-serve`",
}

PAGE_DESCS = {
    "about": "Origin, mission, charter, founder voice, and why Movemental exists — the narrative layer buyers trust before mechanics.",
    "evidence": "Quantified proof, research citations, audits, and track-record claims that survive a skeptical finance or comms review.",
    "faq": "Objections, comparisons, scope boundaries, and plain-language answers — what sales hears after the first serious call.",
    "methodology": "How credibility is produced and verified — scenius, editorial standards, assessment rubrics, and AI posture.",
    "pricing": "Commercial model, unit economics, what costs what, and why the structure aligns incentives with outcomes.",
    "services": "Named deliverables, packaging, sprints vs. retainers, and what clients actually receive week to week.",
    "system": "Platform architecture, data flows, discovery/SEO network effects, integrations, and technical trust signals.",
    "terms": "Legal surfaces — liability, IP, data use, acceptable use, privacy posture, and board-risk language.",
    "walkthrough": "End-to-end journey from first conversation to live site — onboarding, milestones, and what 'done' looks like.",
    "who-we-serve": "ICPs and personas — movement leaders vs. orgs, pains by segment, and fit language for each lane.",
}

PAGE_INTENTS = {
    "about": "Establish identity and moral authority in one scroll — who we are, why now, why us.",
    "evidence": "Win the rational buyer — numbers, third-party proof, and repeatable outcomes.",
    "faq": "Defuse doubt fast — short answers to the ten questions that stall deals.",
    "methodology": "Show the engine — how work is decided, verified, and kept theologically grounded.",
    "pricing": "Make the math legible — compare alternatives, expose the model, remove pricing fog.",
    "services": "Make the SKU obvious — what ships, in what order, with what boundaries.",
    "system": "Prove the machine is real — architecture, scale, safety, and discoverability.",
    "terms": "Cover institutional risk — clarity on data, IP, liability, and acceptable use.",
    "walkthrough": "Reduce imagination load — concrete steps, timelines, and artifacts at each stage.",
    "who-we-serve": "Mirror the reader — name their pain, their org type, and why this lane fits.",
}

STRENGTH_ORDER = {"high": 3, "medium": 2, "low": 1}


# Cards include <li>…</li> items inside <ul class="card__sources"> — do not end the
# block at the first </li> (that truncates the card and corrupts regeneration).
CARD_BLOCK = re.compile(
    r'<li class="card[^>]*>.*?</details>\s*</div>\s*</li>',
    re.DOTALL,
)


def extract_cards(html_text: str) -> dict[str, str]:
    seen: dict[str, str] = {}
    for m in CARD_BLOCK.finditer(html_text):
        block = m.group(0)
        mid = re.search(r'data-id="([^"]+)"', block)
        if mid and mid.group(1) not in seen:
            seen[mid.group(1)] = block
    return seen


def parse_legacy_tabs(block: str) -> list[str]:
    m = re.search(
        r'<div class="card__meta">.*?Tabs:</span>\s*(.*?)</div>', block, re.DOTALL
    )
    if not m:
        return []
    inner = m.group(1)
    chips = re.findall(r">([^<]+)</span>", inner)
    return [html.unescape(c.strip()) for c in chips if c.strip()]


def parse_strength(block: str) -> str:
    m = re.search(r'data-strength="([^"]+)"', block)
    return m.group(1) if m else "medium"


def card_blob(block: str) -> str:
    m = re.search(
        r"(<p class=\"card__body\">.*?</p>)", block, re.DOTALL
    )
    body = m.group(1) if m else ""
    m2 = re.search(r"<h4 class=\"card__title\">(.*?)</h4>", block, re.DOTALL)
    title = m2.group(1) if m2 else ""
    # Strip tags for search
    title_t = re.sub(r"<[^>]+>", " ", title)
    raw = html.unescape(title_t + " " + body).lower()
    return raw


def keyword_bonus(page: str, blob: str) -> int:
    kws = KEYWORDS.get(page, ())
    n = 0
    for kw in kws:
        if kw.lower() in blob:
            n += 12 if page == "terms" else 8
    return min(n, 24)


def base_score(page: str, legacy_tabs: list[str]) -> int:
    w = WEIGHTS[page]
    return sum(w.get(t, 0) for t in legacy_tabs if t in OLD_TABS)


def score_card(page: str, legacy_tabs: list[str], blob: str, strength: str) -> float:
    s = base_score(page, legacy_tabs) + keyword_bonus(page, blob)
    s += 0.1 * STRENGTH_ORDER.get(strength, 1)
    return s


# Prefer the legacy hand-order from the site tab that already maps to this page type
# (see panel__eyebrow hints on How It Works / Proof & About / Pricing & FAQ, etc.).
PAGE_ANCHORS: dict[str, str | tuple[str, ...]] = {
    "about": "proof-about",
    "evidence": "proof-about",
    "faq": "pricing-faq",
    "methodology": "how-it-works",
    "pricing": "pricing-faq",
    "services": "how-it-works",
    "system": "how-it-works",
    "terms": "pricing-faq",
    "walkthrough": "how-it-works",
    "who-we-serve": ("movement-leaders", "churches-nonprofits"),
}


def extract_panel_order(html_text: str, panel_data: str) -> list[str]:
    m = re.search(
        rf'<section class="panel"[^>]*data-panel="{re.escape(panel_data)}"[^>]*>'
        r".*?<ol class=\"panel__list\">\s*(.*?)\s*</ol>\s*</section>",
        html_text,
        re.DOTALL,
    )
    if not m:
        return []
    return re.findall(r'data-id="([^"]+)"', m.group(1))


def merge_anchor_ranks(*lists: list[str]) -> dict[str, int]:
    rank: dict[str, int] = {}
    pos = 0
    for lst in lists:
        for cid in lst:
            if cid not in rank:
                rank[cid] = pos
                pos += 1
    return rank


def rank_ids_for_page(
    page: str,
    cards: dict[str, str],
    meta: dict[str, tuple[list[str], str, str]],
    html_text: str,
) -> list[str]:
    anchor = PAGE_ANCHORS.get(page)
    anchor_rank: dict[str, int] = {}
    if isinstance(anchor, tuple):
        anchor_rank = merge_anchor_ranks(*[extract_panel_order(html_text, a) for a in anchor])
    elif anchor:
        for i, cid in enumerate(extract_panel_order(html_text, anchor)):
            anchor_rank[cid] = i

    def sort_key(cid: str) -> tuple:
        legacy, strength, blob = meta[cid]
        sc = score_card(page, legacy, blob, strength)
        ar = anchor_rank.get(cid, 10**6)
        return (ar, -sc, -STRENGTH_ORDER.get(strength, 1), cid)

    return sorted(cards.keys(), key=sort_key)


def top_page_types_for_card(
    cid: str, meta: dict[str, tuple[list[str], str, str]], pages: list[str], k: int = 8
) -> list[tuple[str, float]]:
    legacy, strength, blob = meta[cid]
    out: list[tuple[str, float]] = []
    for p in pages:
        sc = score_card(p, legacy, blob, strength)
        out.append((p, sc))
    out.sort(key=lambda x: (-x[1], x[0]))
    return out[:k]


def render_meta_chips(current: str, cid: str, meta: dict, pages: list[str]) -> str:
    parts = ['<span class="card__meta-label">Page types:</span>']
    for p, _sc in top_page_types_for_card(cid, meta, pages):
        label = PAGE_LABELS[p]
        esc = html.escape(label)
        cur = " is-current" if p == current else ""
        parts.append(f'<span class="card__tab-chip{cur}">{esc}</span>')
    return "\n        ".join(parts)


def adapt_card(
    block: str,
    rank: int,
    current_page: str,
    cid: str,
    meta: dict,
    pages: list[str],
    head_n: int,
) -> str:
    strength = parse_strength(block)
    is_head = rank <= head_n
    li_cls = "card card--head" if is_head else "card"
    head_attr = "1" if is_head else "0"
    block = re.sub(
        r'<li class="card[^"]*"',
        f'<li class="{li_cls}"',
        block,
        count=1,
    )
    block = re.sub(r'data-head="[^"]*"', f'data-head="{head_attr}"', block, count=1)
    block = re.sub(
        r"<div class=\"card__rank\">\d+</div>",
        f"<div class=\"card__rank\">{rank}</div>",
        block,
        count=1,
    )
    meta_inner = render_meta_chips(current_page, cid, meta, pages)

    def _meta_repl(m: re.Match) -> str:
        return (
            f'<div class="card__meta">\n        {meta_inner}\n      </div>{m.group(1)}'
        )

    block = re.sub(
        r'<div class="card__meta">.*?</div>(\s*\n\s*<ul class="card__sources">)',
        _meta_repl,
        block,
        count=1,
        flags=re.DOTALL,
    )
    return block


def build_panel(
    page: str,
    ordered_ids: list[str],
    cards: dict[str, str],
    meta: dict,
    pages: list[str],
    head_n: int = 25,
) -> str:
    label = PAGE_LABELS[page]
    route = PAGE_ROUTES[page]
    desc = PAGE_DESCS[page]
    intent = PAGE_INTENTS[page]
    lines = [
        f'<section class="panel" id="panel-{page}" role="tabpanel" aria-labelledby="tab-{page}" data-panel="{page}">',
        '  <header class="panel__head">',
        f'    <p class="panel__eyebrow">Page type · {route}</p>',
        f'    <h2 class="panel__title">{html.escape(label)} <span class="panel__count">{len(ordered_ids)}</span></h2>',
        f'    <p class="panel__desc">{html.escape(desc)}</p>',
        f'    <p class="panel__rank-note"><strong>{head_n} hand-ranked head</strong> — expert intent: {html.escape(intent)} · ordering: legacy anchor panel sequence first (see script <code>PAGE_ANCHORS</code>), then composite score (site-tab weights + strength + keyword hints).</p>',
        "  </header>",
        '  <ol class="panel__list">',
        "",
    ]
    for i, cid in enumerate(ordered_ids, start=1):
        raw = cards[cid]
        lines.append(adapt_card(raw, i, page, cid, meta, pages, head_n))
        lines.append("")
    lines.append("  </ol>")
    lines.append("</section>")
    return "\n".join(lines)


def build_tab_buttons(pages: list[str], counts: dict[str, int]) -> str:
    lines: list[str] = []
    for p in pages:
        esc = html.escape(PAGE_LABELS[p])
        lines.append(
            f'<button class="tab" id="tab-{p}" data-tab="{p}" role="tab" aria-selected="false" '
            f'aria-controls="panel-{p}"><span class="tab__label">{esc}</span>'
            f'<span class="tab__count">{counts[p]}</span></button>'
        )
    return "\n".join(lines)


def strip_page_type_injection(text: str) -> str:
    """Remove a prior page-type run so the script can be re-executed safely."""
    if 'id="panel-about"' not in text:
        return text
    marker = '\n\n<section class="panel" id="panel-about"'
    i = text.find(marker)
    if i == -1:
        return text
    prefix = text[:i]
    foot_i = text.find('<p class="foot-note">')
    suffix = text[foot_i:]
    body = prefix + "\n  </div>\n\n  " + suffix
    nav_inj = """<button class="tab" id="tab-about" data-tab="about" role="tab" aria-selected="false" aria-controls="panel-about"><span class="tab__label">About</span><span class="tab__count">173</span></button>
<button class="tab" id="tab-evidence" data-tab="evidence" role="tab" aria-selected="false" aria-controls="panel-evidence"><span class="tab__label">Evidence</span><span class="tab__count">173</span></button>
<button class="tab" id="tab-faq" data-tab="faq" role="tab" aria-selected="false" aria-controls="panel-faq"><span class="tab__label">FAQ</span><span class="tab__count">173</span></button>
<button class="tab" id="tab-methodology" data-tab="methodology" role="tab" aria-selected="false" aria-controls="panel-methodology"><span class="tab__label">Methodology</span><span class="tab__count">173</span></button>
<button class="tab" id="tab-pricing" data-tab="pricing" role="tab" aria-selected="false" aria-controls="panel-pricing"><span class="tab__label">Pricing</span><span class="tab__count">173</span></button>
<button class="tab" id="tab-services" data-tab="services" role="tab" aria-selected="false" aria-controls="panel-services"><span class="tab__label">Services</span><span class="tab__count">173</span></button>
<button class="tab" id="tab-system" data-tab="system" role="tab" aria-selected="false" aria-controls="panel-system"><span class="tab__label">System</span><span class="tab__count">173</span></button>
<button class="tab" id="tab-terms" data-tab="terms" role="tab" aria-selected="false" aria-controls="panel-terms"><span class="tab__label">Terms</span><span class="tab__count">173</span></button>
<button class="tab" id="tab-walkthrough" data-tab="walkthrough" role="tab" aria-selected="false" aria-controls="panel-walkthrough"><span class="tab__label">Walkthrough</span><span class="tab__count">173</span></button>
<button class="tab" id="tab-who-we-serve" data-tab="who-we-serve" role="tab" aria-selected="false" aria-controls="panel-who-we-serve"><span class="tab__label">Who We Serve</span><span class="tab__count">173</span></button>
"""
    body = body.replace(nav_inj, "")
    body = body.replace(
        "<strong>173</strong> unique items · <strong>2060</strong> placements across <strong>16</strong> tabs "
        "(<strong>330</strong> legacy site-route + <strong>1730</strong> page-type, all 173 items on each page-type tab) · "
        "<strong>123</strong> appear on 2+ legacy tabs",
        "<strong>173</strong> unique items · <strong>330</strong> placements across <strong>6</strong> tabs · <strong>123</strong> appear on 2+ tabs",
    )
    old = (
        ' <strong>Page-type tabs (new):</strong> About — identity and founder narrative. Evidence — quantified and third-party proof. FAQ — objections and comparisons. Methodology — how credibility is produced. Pricing — model and unit economics. Services — deliverables and packaging. System — architecture and discovery. Terms — legal and data risk. Walkthrough — journey and milestones. Who we serve — ICPs and segment pains. <strong>Page intents (legacy):</strong> Home —'
    )
    new = ' <strong>Page intents:</strong> Home —'
    body = body.replace(old, new)
    body = body.replace(FOOT_EXTENDED, FOOT_ORIGINAL)
    return body


def main() -> None:
    text = SOURCE_HTML.read_text(encoding="utf-8")
    text = strip_page_type_injection(text)
    cards = extract_cards(text)
    assert len(cards) == 173, len(cards)

    pages = list(PAGE_LABELS.keys())
    meta: dict[str, tuple[list[str], str, str]] = {}
    for cid, block in cards.items():
        meta[cid] = (parse_legacy_tabs(block), parse_strength(block), card_blob(block))

    counts = {p: len(rank_ids_for_page(p, cards, meta, text)) for p in pages}
    panels_html = "\n\n".join(
        build_panel(p, rank_ids_for_page(p, cards, meta, text), cards, meta, pages)
        for p in pages
    )
    tabs_html = build_tab_buttons(pages, counts)

    # Insert tab buttons before </nav>
    needle = 'aria-controls="panel-pricing-faq"><span class="tab__label">Pricing &amp; FAQ</span><span class="tab__count">20</span></button>\n  </nav>'
    if needle not in text:
        raise SystemExit("Could not find nav closing anchor for tab injection")
    text = text.replace(needle, needle.replace("  </nav>", tabs_html + "\n  </nav>"))

    # Insert panels before panels wrapper closes (before foot-note)
    needle2 = "  </div>\n\n  <p class=\"foot-note\">"
    if needle2 not in text:
        raise SystemExit("Could not find panels close for panel injection")
    text = text.replace(needle2, "\n\n" + panels_html + "\n\n  </div>\n\n  <p class=\"foot-note\">")

    # Mast stats
    text = text.replace(
        "<strong>173</strong> unique items · <strong>330</strong> placements across <strong>6</strong> tabs · <strong>123</strong> appear on 2+ tabs",
        "<strong>173</strong> unique items · <strong>2060</strong> placements across <strong>16</strong> tabs "
        "(<strong>330</strong> legacy site-route + <strong>1730</strong> page-type, all 173 items on each page-type tab) · "
        "<strong>123</strong> appear on 2+ legacy tabs",
    )

    # Intro: extend rank note
    old_note = "<strong>Page intents:</strong> Home —"
    add = (
        ' <strong>Page-type tabs (new):</strong> About — identity and founder narrative. Evidence — quantified and third-party proof. '
        "FAQ — objections and comparisons. Methodology — how credibility is produced. Pricing — model and unit economics. "
        "Services — deliverables and packaging. System — architecture and discovery. Terms — legal and data risk. "
        "Walkthrough — journey and milestones. Who we serve — ICPs and segment pains. "
        "<strong>Page intents (legacy):</strong> Home —"
    )
    if old_note in text:
        text = text.replace(old_note, add)

    if FOOT_ORIGINAL not in text:
        raise SystemExit("Expected original coverage foot-note not found — fix FOOT_ORIGINAL in build_page_type_tabs.py")
    text = text.replace(FOOT_ORIGINAL, FOOT_EXTENDED)
    text = text.replace(
        'aria-label="Sections of the Movemental site"',
        'aria-label="Movemental site sections (legacy route tabs) and page-type tabs"',
    )

    SOURCE_HTML.write_text(text, encoding="utf-8")
    print("Wrote", SOURCE_HTML)
    print("Panels:", ", ".join(f"{p}={counts[p]}" for p in pages))


if __name__ == "__main__":
    main()
