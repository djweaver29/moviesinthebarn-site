#!/usr/bin/env python3
"""
build-bookmarklet.py — Minify scripts/letterboxd-to-barn.js into a
`javascript:`-prefixed bookmarklet URI and inject it into
scripts/bookmarklet.html (the install page) so the drag-to-bookmarks
link stays in sync with the source.

Run after editing letterboxd-to-barn.js:
    python3 scripts/build-bookmarklet.py
"""

import re
from pathlib import Path
from urllib.parse import quote

ROOT       = Path(__file__).resolve().parent.parent
SRC_PATH   = ROOT / "scripts" / "letterboxd-to-barn.js"
HTML_PATH  = ROOT / "scripts" / "bookmarklet.html"

def strip_comments_and_minify(src: str) -> str:
    # Drop everything before the IIFE so the header comment block is gone.
    src = src[src.index("(function"):]

    out = []
    i, n = 0, len(src)
    while i < n:
        c = src[i]
        nx = src[i + 1] if i + 1 < n else ""

        # Line comment
        if c == "/" and nx == "/":
            while i < n and src[i] != "\n":
                i += 1
            continue
        # Block comment
        if c == "/" and nx == "*":
            i += 2
            while i < n and not (src[i] == "*" and i + 1 < n and src[i + 1] == "/"):
                i += 1
            i += 2
            continue
        # String / template literal — copy verbatim (handles escapes)
        if c in ("'", '"', "`"):
            quote_ch = c
            out.append(c)
            i += 1
            while i < n:
                ch = src[i]
                out.append(ch)
                i += 1
                if ch == "\\" and i < n:
                    out.append(src[i])
                    i += 1
                    continue
                if ch == quote_ch:
                    break
            continue
        # Regex literal — only at positions where a regex is grammatically valid.
        # Cheap heuristic: previous non-space char suggests regex context.
        if c == "/":
            prev = next((ch for ch in reversed(out) if not ch.isspace()), "")
            if prev in "" or prev in "(,=:[!&|?{};\n" or (
                prev.isalpha() and re.search(r"\b(return|typeof|in|of|instanceof|throw)$", "".join(out))
            ):
                out.append(c)
                i += 1
                in_class = False
                while i < n:
                    ch = src[i]
                    out.append(ch)
                    i += 1
                    if ch == "\\" and i < n:
                        out.append(src[i])
                        i += 1
                        continue
                    if ch == "[":
                        in_class = True
                    elif ch == "]":
                        in_class = False
                    elif ch == "/" and not in_class:
                        # consume regex flags
                        while i < n and src[i].isalpha():
                            out.append(src[i])
                            i += 1
                        break
                continue
        out.append(c)
        i += 1

    text = "".join(out)
    # Collapse whitespace runs
    text = re.sub(r"\s+", " ", text).strip()
    # Tighten around punctuation. Spaces between two word/identifier chars
    # are preserved by `\s+` collapsing to a single space (handled above),
    # so `var foo` stays `var foo`.
    text = re.sub(r"\s*([{}();,:=+\-*<>?!|&\[\]])\s*", r"\1", text)
    return text


def build_html(bookmarklet_href: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Install: Letterboxd → Barn</title>
  <style>
    body {{ font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
           max-width: 640px; margin: 4rem auto; padding: 0 1.5rem;
           color: #222; line-height: 1.5; }}
    h1 {{ font-size: 1.6rem; margin-bottom: 0.5rem; }}
    .install {{
      display: inline-block; margin: 1.25rem 0; padding: 0.6rem 1.1rem;
      background: #1f7a4f; color: #fff; border-radius: 6px;
      font-weight: 600; text-decoration: none; cursor: grab;
    }}
    .install:hover {{ background: #155f3c; }}
    code {{ background: #f3f3f3; padding: 0.1em 0.35em; border-radius: 3px; }}
    ol li {{ margin: 0.4rem 0; }}
    .note {{ color: #666; font-size: 0.92rem; margin-top: 1.5rem; }}
  </style>
</head>
<body>
  <h1>Letterboxd → Barn</h1>
  <p>Drag the button below to your bookmarks bar. Then, on any
  Letterboxd review permalink page, click it to copy a
  <code>reviews.js</code>-formatted snippet to your clipboard.</p>

  <a class="install" href="{bookmarklet_href}">Letterboxd → Barn</a>

  <h2>Usage</h2>
  <ol>
    <li>Open a review on Letterboxd
      (e.g. <code>letterboxd.com/&lt;user&gt;/film/&lt;slug&gt;/</code>
      or <code>/&lt;n&gt;/</code> for a rewatch).</li>
    <li>Click the bookmark.</li>
    <li>Verify the detected fields in the dialog and confirm.</li>
    <li>Paste the snippet into <code>reviews.js</code> under the
        matching film title (or as a new top-level key).</li>
  </ol>

  <p class="note">Source: <code>scripts/letterboxd-to-barn.js</code>.
  Regenerate this page after edits with
  <code>python3 scripts/build-bookmarklet.py</code>.</p>
</body>
</html>
"""


def main():
    src = SRC_PATH.read_text(encoding="utf-8")
    minified = strip_comments_and_minify(src)
    href = "javascript:" + quote(minified, safe="")
    HTML_PATH.write_text(build_html(href), encoding="utf-8")
    print(f"wrote {HTML_PATH.relative_to(ROOT)}  (bookmarklet: {len(href)} chars)")


if __name__ == "__main__":
    main()
