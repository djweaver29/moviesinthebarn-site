#!/usr/bin/env python3
"""
sync-rss-reviews.py — Fetches Letterboxd RSS feeds for each configured reviewer,
extracts reviews for films that appear in events.js, and writes rss-reviews.js.

Runs server-side (e.g. on the Synology NAS) on a schedule. No CORS proxy needed.
The generated file is committed to the repo by the wrapping shell script so the
static site serves a fully pre-built list of reviews.

DO NOT hand-edit rss-reviews.js — it is regenerated every run.
Hand-written reviews live in reviews.js and are merged at render time.
"""

import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

RSS_SOURCES = [
    {"url": "https://letterboxd.com/djweaver29/rss/",      "name": "Dylan W."},
    {"url": "https://letterboxd.com/njh20/rss/",           "name": "Nathan H."},
    {"url": "https://letterboxd.com/andrewacebo/rss/",     "name": "Andrew A."},
    {"url": "https://letterboxd.com/fluffymastodons/rss/", "name": "Jacob L."},
    {"url": "https://letterboxd.com/davidstirpe24/rss/",   "name": "David S."},
    {"url": "https://letterboxd.com/ayoitsmo/rss/",        "name": "Morgan M."},
    {"url": "https://letterboxd.com/samsonite49/rss/",     "name": "Sam H."},
    {"url": "https://letterboxd.com/BigJoe0024/rss/",      "name": "Joe H."},
]

REPO_ROOT   = Path(__file__).resolve().parent.parent
EVENTS_PATH = REPO_ROOT / "events.js"
OUTPUT_PATH = REPO_ROOT / "rss-reviews.js"

NS = {"letterboxd": "https://letterboxd.com"}


def load_event_dates():
    """Return {film_title: {YYYY-MM-DD, ...}} — the set of dates each film
    was actually shown. Used to reject RSS entries where the reviewer watched
    the film on a different day (i.e. not at the barn)."""
    text = EVENTS_PATH.read_text(encoding="utf-8")
    by_title = {}
    # Match title + date within the same event object (no `}` between them).
    for title, date in re.findall(
        r'title:\s*"([^"]+)"[^}]*?date:\s*"(\d{4}-\d{2}-\d{2})"',
        text, flags=re.DOTALL,
    ):
        by_title.setdefault(title, set()).add(date)
    return by_title


def fetch(url, timeout=30):
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "moviesinthebarn-rss-sync/1.0 (+https://moviesinthebarn.org)"},
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


# Letterboxd's description for a rating-only diary entry (no written review) is
# literally "Watched on <Weekday> <Month> <Day>, <Year>." — we want to treat
# those as having no review text so they're dropped, matching the behavior of
# hand-written rating-only entries in reviews.js.
WATCHED_ON_RE = re.compile(r"^Watched on \w+ \w+ \d+,\s+\d{4}\.?$")


def extract_review_text(description_html):
    """Strip the poster <img> Letterboxd injects, return <p> contents joined by \\n\\n.
    Returns '' for diary-only entries (no real review text)."""
    no_img = re.sub(r"<img[^>]*>", "", description_html)
    paras = re.findall(r"<p[^>]*>(.*?)</p>", no_img, flags=re.DOTALL)
    paras = [p.strip() for p in paras if p.strip()]
    if len(paras) == 1 and WATCHED_ON_RE.match(paras[0]):
        return ""
    return "\n\n".join(paras)


def parse_feed(xml_bytes, reviewer_name, event_dates):
    root = ET.fromstring(xml_bytes)
    out = []
    for item in root.iter("item"):
        ft_el = item.find("letterboxd:filmTitle", NS)
        if ft_el is None or not ft_el.text:
            continue
        film_title = ft_el.text.strip()
        valid_dates = event_dates.get(film_title)
        if not valid_dates:
            continue  # film not in our lineup

        watched  = (item.findtext("letterboxd:watchedDate", default="", namespaces=NS) or "").strip()
        if watched not in valid_dates:
            continue  # reviewer watched it on a different day, not at the barn

        desc_el = item.find("description")
        text = extract_review_text(desc_el.text) if (desc_el is not None and desc_el.text) else ""

        rewatch  = (item.findtext("letterboxd:rewatch",     default="", namespaces=NS) or "").strip() == "Yes"
        liked    = (item.findtext("letterboxd:memberLike",  default="", namespaces=NS) or "").strip() == "Yes"
        rating_s = (item.findtext("letterboxd:memberRating", default="", namespaces=NS) or "").strip()
        link     = (item.findtext("link", default="") or "").strip()

        rating = None
        if rating_s:
            try:
                rating = float(rating_s)
            except ValueError:
                pass

        # Rating-only diary entries (no written review) render as a compact
        # rating card — keep them only if there's actually something to show.
        if not text and rating is None and not liked:
            continue

        review = {"name": reviewer_name, "letterboxdUrl": link, "date": watched}
        if text:
            review["text"] = text
        if rewatch:
            review["rewatch"] = True
        if liked:
            review["liked"] = True
        if rating is not None:
            review["rating"] = rating
        out.append((film_title, review))
    return out


def main():
    event_dates = load_event_dates()
    by_title = {}
    errors = []

    for src in RSS_SOURCES:
        try:
            xml = fetch(src["url"])
            for film_title, review in parse_feed(xml, src["name"], event_dates):
                by_title.setdefault(film_title, []).append(review)
        except Exception as e:
            errors.append(f"{src['name']}: {e}")
            print(f"warn: failed {src['name']}: {e}", file=sys.stderr)

    # Stable ordering: films alphabetical, reviews alphabetical by reviewer.
    ordered = {}
    for title in sorted(by_title):
        ordered[title] = sorted(by_title[title], key=lambda r: r["name"].lower())

    header = (
        "// ============================================================\n"
        "// RSS_REVIEWS — Generated by scripts/sync-rss-reviews.py\n"
        "// DO NOT EDIT BY HAND. Regenerated on a schedule from Letterboxd RSS feeds.\n"
        "// Hand-written reviews live in reviews.js and take precedence on dedup.\n"
        "// ============================================================\n\n"
    )
    body = "var RSS_REVIEWS = " + json.dumps(ordered, indent=2, ensure_ascii=False) + ";\n"
    OUTPUT_PATH.write_text(header + body, encoding="utf-8")

    total = sum(len(v) for v in ordered.values())
    print(f"wrote {OUTPUT_PATH.name}: {total} reviews across {len(ordered)} films")

    if errors:
        print(f"{len(errors)} source(s) failed:", *errors, sep="\n  ", file=sys.stderr)
        sys.exit(1)  # nonzero → wrapper shell script skips the commit


if __name__ == "__main__":
    main()
