# Movies in the Barn

Static site for the Movies in the Barn film series — a twice-monthly Tuesday-night screening at the barn. Lists upcoming films, archives past ones, and pulls reviews from contributors' Letterboxd accounts.

Live at [moviesinthebarn.org](https://moviesinthebarn.org). Hosted on GitHub Pages from `main`.

## Layout

| File | What it is |
|---|---|
| `index.html` | Landing page — hero, Now Showing, Coming Soon, Archive, About |
| `film.html` | Per-film page (`?title=<slug>`) — poster, metadata, where-to-watch, reviews |
| `style.css` | All site styles |
| `calendar.js` | Modal + Google/ICS calendar generation for upcoming films |
| `events.js` | **The film lineup.** Each entry: date, title, theme, runtime, poster, etc. |
| `movie-meta.js` | TMDB-sourced director / genre / cast, keyed by title |
| `reviews.js` | Hand-curated reviews. Wins on dedup |
| `rss-reviews.js` | Auto-generated from contributor Letterboxd RSS feeds. **Do not edit by hand** |
| `scripts/sync-rss-reviews.py` | Fetches RSS feeds, filters to films + dates in `events.js`, writes `rss-reviews.js` |
| `scripts/sync-rss-reviews.sh` | Wrapper that runs the Python script and commits if anything changed |

No build step, no framework — open `index.html` in a browser, or serve the directory statically.

## Adding a film

1. Add an entry to `events.js` with the fields shown in the existing examples (title, date, runtime, rating, releaseYear, description, posterUrl).
2. Drop the poster into `images/<year>/`.
3. Optionally add a `MOVIE_META` entry in `movie-meta.js` for director / genres / cast.
4. Commit. GitHub Pages picks it up on push to `main`.

Title strings must match across `events.js`, `movie-meta.js`, and the review files exactly — they're the join key.

## Reviews

Two sources, merged at render time in `film.html`:

- **`reviews.js`** — hand-written entries. Each review has `name`, `text` (optional), `rating` (0.5–5.0, optional), `liked` / `rewatch` flags, `letterboxdUrl`, `date`. Use this for reviews that aren't on Letterboxd, or to override an RSS-pulled one.
- **`rss-reviews.js`** — generated from the Letterboxd RSS feeds listed in `scripts/sync-rss-reviews.py` (`RSS_SOURCES`). The script keeps only entries whose `watchedDate` matches a real screening date in `events.js`, so reviews from outside the barn are filtered out.

Dedup is per-film: an RSS entry is dropped if the same `letterboxdUrl` or reviewer name already appears in the hand-written list.

To add a new contributor's RSS feed, append to `RSS_SOURCES` in `scripts/sync-rss-reviews.py` with their Letterboxd username and display name.

RSS feeds only return ~50 most recent entries. For a contributor's older reviews, add them to `reviews.js` by hand.

## RSS sync

`scripts/sync-rss-reviews.sh` runs on the NAS via Task Scheduler. It:

1. Bails if the working tree has unexpected changes.
2. Fast-forwards to `origin/main`.
3. Runs `sync-rss-reviews.py` to regenerate `rss-reviews.js`.
4. Commits and pushes if the file changed.

To run locally:

```sh
python3 scripts/sync-rss-reviews.py
```

## Slugs

`film.html` resolves a film by `?title=<slug>`, where the slug is `filmSlug(title)` — lowercase, non-alphanumerics replaced with `-`. Defined in `calendar.js`.
