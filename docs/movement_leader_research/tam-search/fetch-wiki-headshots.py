#!/usr/bin/env python3
"""
Batch fetch: Wikipedia opensearch + batched pageimages (fewer HTTP calls than per-title REST).
Resume: skips if profiles/<slug>/media/headshot/<slug>-source.* already exists.
"""
from __future__ import annotations

import argparse
import csv
import json
import re
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

# .../docs/intelligence/leader-research/tam-search/thisfile.py → parents[3] == docs repo root
ROOT = Path(__file__).resolve().parents[3]
MD = Path(__file__).resolve().parent / "09-PLAUSIBLE-TAM-ALPHABETIZED.md"
MANIFEST = Path(__file__).resolve().parent / "HEADSHOT-MANIFEST.csv"
UA = "TAM-headshot-fetch/1.0 (movemental docs research; local batch; contact local maintainer)"
DELAY_SEC = 2.0  # reduce 429 bursts from Wikipedia shared infra

CTX = ssl.create_default_context()


def slugify(name: str) -> str:
    s = name.lower().strip()
    s = s.replace("’", "'")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def read_names() -> list[str]:
    text = MD.read_text(encoding="utf-8")
    names = re.findall(r"^\*\*([^*]+)\*\* —", text, re.MULTILINE)
    skip = {"Generated", "Method", "Scope"}
    return [n for n in names if n not in skip]


def urlopen_retry(req: urllib.request.Request, *, max_retries: int = 5) -> bytes:
    delay = 5.0
    last: Exception | None = None
    for attempt in range(max_retries):
        try:
            with urllib.request.urlopen(req, timeout=60, context=CTX) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            last = e
            if e.code in (429, 503, 502, 500):
                time.sleep(delay)
                delay = min(delay * 1.6, 45.0)
                continue
            raise
        except (urllib.error.URLError, TimeoutError, OSError) as e:
            last = e
            time.sleep(delay)
            delay = min(delay * 1.4, 40.0)
    raise last  # type: ignore[misc]


def http_json(url: str) -> dict | list:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return json.loads(urlopen_retry(req).decode("utf-8"))


def opensearch(q: str) -> list[tuple[str, str]]:
    """Return [(title, description), ...] from enwiki opensearch."""
    base = "https://en.wikipedia.org/w/api.php"
    params = urllib.parse.urlencode(
        {
            "action": "opensearch",
            "search": q,
            "limit": "8",
            "namespace": "0",
            "format": "json",
        }
    )
    data = http_json(f"{base}?{params}")
    titles = data[1] if len(data) > 1 else []
    descs = data[2] if len(data) > 2 else []
    out: list[tuple[str, str]] = []
    for i, t in enumerate(titles):
        d = descs[i] if i < len(descs) else ""
        out.append((t, d or ""))
    return out


# Reduce wrong-person matches from common names (still review manually).
_GOOD = (
    "pastor",
    "minister",
    "theologian",
    "christian",
    "church",
    "author",
    "evangelical",
    "missionary",
    "seminary",
    "bible",
    "biblical",
    "disciple",
    "bishop",
    "archbishop",
    "priest",
    "missional",
    "writer",
    "speaker",
    "professor",
    "theology",
    "religious",
    "spiritual",
    "salvation army",
    "apologist",
    "ecclesiastical",
    "worship",
    "preacher",
    "chaplain",
    "pentecostal",
    "baptist",
    "methodist",
    "anglican",
    "presbyterian",
    "evangelist",
    "catholic",
    "orthodox",
    "lutheran",
    "wesleyan",
    "reformed",
    "charismatic",
    "church planting",
    "church-planting",
    "church planter",
    "founder",
    "nonprofit",
    "activist",
    "advocate",
    "coach",
    "consultant",
    "trainer",
    "lecturer",
    "scholar",
    "academic",
    "dean",
)
_BAD = (
    "actor",
    "actress",
    "pianist",
    "football",
    "basketball",
    "politician",
    "journalist",
    "comedian",
    "singer",
    "rapper",
    "musician",
    "baseball",
    "hockey",
    "swimmer",
    "cricketer",
    "pornographic",
    "porn actor",
    "pornographic actor",
    "porn star",
    "adult film",
    "olympic",
    "nfl",
    "nba",
    "television host",
    "tv personality",
    "reality television",
)


def _norm_name(s: str) -> str:
    return re.sub(r"\s+Jr\.?$", "", s, flags=re.I).strip()


def _last_name(display: str) -> str:
    parts = _norm_name(display).split()
    return parts[-1].lower() if parts else ""


def _whole_word(hay: str, word: str) -> bool:
    """Substring checks are unsafe (e.g. 'roberts' in 'robertson' is True)."""
    return re.search(r"\b" + re.escape(word) + r"\b", hay, re.I) is not None


def confidence_match(display: str, title: str, desc: str) -> bool:
    """Require last name as whole word in title+desc; keyword hints reduce wrong careers."""
    blob = f"{title} {desc}".lower()
    last = _last_name(display)
    if not last:
        return False
    if not _whole_word(blob, last):
        return False
    parts = _norm_name(display).split()
    if len(parts) >= 3:
        first_two = f"{parts[0]} {parts[1]}".lower()
        if first_two not in blob:
            # e.g. "John Mark Comer" must not match random "John …" pages
            if not any(g in blob for g in _GOOD):
                return False
    elif len(parts) == 2:
        # "Bobby Harrington" must not match "Bob Harrington" (different first name)
        if not _whole_word(blob, parts[0].lower()):
            return False
    good_hit = any(g in blob for g in _GOOD)
    bad_hit = any(b in blob for b in _BAD)
    if good_hit and not bad_hit:
        return True
    if bad_hit and not good_hit:
        return False
    # Ambiguous (e.g. "coach" + "football") — reject; too many wrong-person risks.
    if good_hit and bad_hit:
        return False
    return False


def pageimages_batch(titles: list[str]) -> dict:
    """Returns MediaWiki query JSON for pageimages on up to 5 titles."""
    if not titles:
        return {}
    base = "https://en.wikipedia.org/w/api.php"
    joined = "|".join(titles[:5])
    params = urllib.parse.urlencode(
        {
            "action": "query",
            "titles": joined,
            "prop": "pageimages|pageprops",
            "format": "json",
            "pithumbsize": "800",
        }
    )
    return http_json(f"{base}?{params}")


def existing_headshot(prof_media: Path, slug: str) -> Path | None:
    if not prof_media.is_dir():
        return None
    for p in prof_media.glob(f"{slug}-source.*"):
        if p.is_file():
            return p
    return None


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    dest.write_bytes(urlopen_retry(req))


def pick_page_from_query(data: dict, titles_order: list[str]) -> tuple[str | None, dict | None]:
    pages = data.get("query", {}).get("pages", {})
    if not pages:
        return None, None
    by_title = {p["title"]: p for p in pages.values() if p.get("title")}
    for wanted in titles_order:
        page = by_title.get(wanted)
        if not page:
            continue
        if "missing" in page:
            continue
        pprops = page.get("pageprops") or {}
        if pprops.get("disambiguation") is not None:
            continue
        thumb = page.get("thumbnail")
        if thumb and thumb.get("source"):
            return wanted, page
    # fallback: any non-disambiguation page with thumbnail
    for page in pages.values():
        if "missing" in page:
            continue
        pprops = page.get("pageprops") or {}
        if pprops.get("disambiguation") is not None:
            continue
        thumb = page.get("thumbnail")
        if thumb and thumb.get("source"):
            return page.get("title"), page
    return None, None


def write_manifest(rows: list[dict]) -> None:
    fieldnames = [
        "slug",
        "display_name",
        "status",
        "source_url",
        "retrieved_utc",
        "file_rel_path",
        "license_note",
        "notes",
    ]
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    with MANIFEST.open("w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(rows)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0, help="only first N names (0=all)")
    args = ap.parse_args()
    names = read_names()
    if args.limit and args.limit > 0:
        names = names[: args.limit]
    rows_out: list[dict] = []

    for i, display in enumerate(names):
        slug = slugify(display)
        prof_media = (
            ROOT
            / "intelligence/leader-research/profiles"
            / slug
            / "media/headshot"
        )
        base_row = {
            "slug": slug,
            "display_name": display,
            "status": "not-found",
            "source_url": "",
            "retrieved_utc": "",
            "file_rel_path": "",
            "license_note": "",
            "notes": "",
        }

        already = existing_headshot(prof_media, slug)
        if already:
            base_row.update(
                {
                    "status": "ok",
                    "source_url": "resumed — see notes",
                    "retrieved_utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
                    "file_rel_path": str(already.relative_to(ROOT)),
                    "license_note": "Wikipedia batch — verify Commons before public use",
                    "notes": "skipped fetch; file already present",
                }
            )
            rows_out.append(base_row)
            continue

        candidates = opensearch(display)
        time.sleep(DELAY_SEC)
        filtered_titles = [
            t for t, d in candidates if confidence_match(display, t, d)
        ]
        if not filtered_titles:
            base_row["notes"] = (
                "no enwiki opensearch hit passing last-name + ministry/author heuristics"
            )
            rows_out.append(base_row)
            continue

        data = pageimages_batch(filtered_titles[:5])
        time.sleep(DELAY_SEC)
        picked, page = pick_page_from_query(data, filtered_titles[:5])
        if not picked or not page:
            base_row["notes"] = (
                "no usable enwiki page with thumbnail in top search results (or disambiguation only)"
            )
            rows_out.append(base_row)
            continue

        img_url = page["thumbnail"]["source"]
        ext = ".jpg"
        if ".png" in img_url.lower():
            ext = ".png"
        elif ".webp" in img_url.lower():
            ext = ".webp"
        out = prof_media / f"{slug}-source{ext}"
        wp_url = (
            "https://en.wikipedia.org/wiki/"
            + urllib.parse.quote(picked.replace(" ", "_"))
        )
        try:
            download(img_url, out)
        except Exception as e:
            base_row["status"] = "error"
            base_row["notes"] = f"download failed: {e}"
            rows_out.append(base_row)
            continue

        base_row.update(
            {
                "status": "ok",
                "source_url": wp_url,
                "retrieved_utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
                "file_rel_path": str(out.relative_to(ROOT)),
                "license_note": "Wikipedia thumbnail — verify Commons file page before public use; may require attribution",
                "notes": f"enwiki title: {picked}",
            }
        )
        rows_out.append(base_row)
        if (i + 1) % 5 == 0:
            write_manifest(rows_out)
        if (i + 1) % 25 == 0:
            print(f"... {i+1}/{len(names)}", flush=True)

    write_manifest(rows_out)
    ok = sum(1 for r in rows_out if r["status"] == "ok")
    nf = sum(1 for r in rows_out if r["status"] == "not-found")
    err = sum(1 for r in rows_out if r["status"] == "error")
    msg = f"Done. ok={ok} not-found={nf} error={err} total={len(rows_out)} manifest={MANIFEST}"
    print(msg, flush=True)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Interrupted.", file=sys.stderr)
        sys.exit(130)
