// ============================================================
// letterboxd-to-barn — Bookmarklet source
// ------------------------------------------------------------
// Run on a Letterboxd review permalink page
//   (e.g. https://letterboxd.com/<user>/film/<slug>/
//    or   https://letterboxd.com/<user>/film/<slug>/<n>/  for rewatches)
// to scrape the review and copy a reviews.js-formatted snippet
// to the clipboard.
//
// To install: open scripts/bookmarklet.html and drag the link
// into your bookmarks bar.
//
// To rebuild the minified bookmarklet after edits:
//   python3 scripts/build-bookmarklet.py
// ============================================================

(function () {
  // username → display name (mirrors RSS_SOURCES in scripts/sync-rss-reviews.py).
  // Keep in sync if reviewers are added.
  var REVIEWER_MAP = {
    djweaver29:      "Dylan W.",
    njh20:           "Nathan H.",
    andrewacebo:     "Andrew A.",
    fluffymastodons: "Jacob L.",
    davidstirpe24:   "David S.",
    ayoitsmo:        "Morgan M.",
    samsonite49:     "Sam H.",
    BigJoe0024:      "Joe H."
  };

  var REVIEW_URL_RE = /letterboxd\.com\/[^\/]+\/film\/[^\/]+\/(?:\d+\/)?$/;
  if (!REVIEW_URL_RE.test(location.href.replace(/[?#].*$/, ""))) {
    if (!confirm("This doesn't look like a Letterboxd review URL. Continue anyway?")) return;
  }

  var $ = function (s) { return document.querySelector(s); };
  var txt = function (el) { return el ? (el.textContent || "").trim() : ""; };

  var canonical = $('link[rel="canonical"]');
  var url = (canonical && canonical.href) ||
            ($('meta[property="og:url"]') || {}).content ||
            location.href.replace(/[?#].*$/, "");

  // og:title shape (current):  "A ★★★ review of <Title> (YYYY)"
  // also handles unrated reviews:  "A review of <Title> (YYYY)"
  var ogTitle = ($('meta[property="og:title"]') || {}).content || "";
  var filmTitle = "";
  var ogFilmMatch = ogTitle.match(/review of\s+(.+?)(?:\s*\((?:19|20)\d{2}\))?\s*$/i);
  if (ogFilmMatch) filmTitle = ogFilmMatch[1].trim();

  // Reviewer username — body data-owner is most reliable; URL path is fallback.
  var username = document.body.dataset.owner ||
    ((location.pathname.match(/^\/([^\/]+)\/film\//) || [])[1] || "");
  var formattedName = REVIEWER_MAP[username] || username;

  // Rating — twitter:data2 is the most reliable signal (e.g. "★★★½").
  var rating = null;
  var twitterRating = ($('meta[name="twitter:data2"]') || {}).content || "";
  if (twitterRating) {
    var stars = (twitterRating.match(/\u2605/g) || []).length;  // ★
    var half  = /\u00bd/.test(twitterRating) ? 0.5 : 0;          // ½
    if (stars + half > 0) rating = stars + half;
  }
  if (rating === null) {
    var ratingEl = document.querySelector('.rating[class*="rated-"]');
    if (ratingEl) {
      var rm = ratingEl.className.match(/rated-(?:large-)?(\d+)/);
      if (rm) rating = parseInt(rm[1], 10) / 2;
    }
  }

  // Review body — `.js-review-body` is the inner block containing only review <p>s.
  var text = "";
  var bodyEl = $('.js-review-body, [itemprop="reviewBody"]');
  if (bodyEl) {
    var ps = bodyEl.querySelectorAll("p");
    if (ps.length) {
      text = Array.prototype.map.call(ps, function (p) { return p.textContent.trim(); })
        .filter(Boolean).join("\n\n");
    } else {
      text = bodyEl.textContent.trim();
    }
  }

  // Liked — heart icon variants. Letterboxd's React component wraps this so we
  // also check inside `.like-link-target` for any liked-state class/attr.
  var liked = !!document.querySelector('.icon-liked, .has-icon-liked, .like-link-target .icon-liked, .like-link-target [class*="liked"]');

  // Rewatch — the `.view-date` paragraph leads with "Rewatched" instead of
  // "Watched" when this is a rewatch. URLs ending in /N/ also imply a rewatch.
  var viewDate = $('.view-date');
  var rewatch = !!(viewDate && /^\s*Rewatched/i.test(viewDate.textContent)) ||
                /\/film\/[^\/]+\/\d+\/?$/.test(location.pathname);

  // Date — pull from the diary link href: /<user>/diary/for/YYYY/MM/DD/
  var date = "";
  var diaryLink = document.querySelector('a[href*="/diary/for/"][href*="/"]');
  // Find the first link whose href has the full YYYY/MM/DD shape.
  var diaryLinks = document.querySelectorAll('a[href*="/diary/for/"]');
  for (var i = 0; i < diaryLinks.length; i++) {
    var hm = diaryLinks[i].getAttribute("href").match(/\/diary\/for\/(\d{4})\/(\d{2})\/(\d{2})\//);
    if (hm) { date = hm[1] + "-" + hm[2] + "-" + hm[3]; break; }
  }
  // Fallback: parse "21 Apr 2026" out of .view-date text.
  if (!date && viewDate) {
    var m = viewDate.textContent.match(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+(\d{4})/i);
    if (m) {
      var months = { Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12 };
      var mm = months[m[2].slice(0, 3).replace(/^./, function (c) { return c.toUpperCase(); })];
      date = m[3] + "-" + String(mm).padStart(2, "0") + "-" + String(parseInt(m[1], 10)).padStart(2, "0");
    }
  }

  // Build the snippet — order matches reviews.js convention.
  var lines = ["    {"];
  lines.push("      name: " + JSON.stringify(formattedName) + ",");
  if (rewatch) lines.push("      rewatch: true,");
  if (rating !== null) lines.push("      rating: " + rating.toFixed(1) + ",");
  if (liked) lines.push("      liked: true,");
  if (text) lines.push("      text: " + JSON.stringify(text) + ",");
  lines.push("      letterboxdUrl: " + JSON.stringify(url) + ",");
  lines.push("      date: " + JSON.stringify(date));
  lines.push("    },");

  var snippet = "  " + JSON.stringify(filmTitle) + ": [\n" + lines.join("\n") + "\n  ],";

  var nameNote = REVIEWER_MAP[username] ? "" : "  (unmapped username — edit before pasting)";
  var preview =
    "Detected:\n" +
    "  Film:    " + (filmTitle || "(missing)") + "\n" +
    "  Name:    " + formattedName + nameNote + "\n" +
    "  Rating:  " + (rating !== null ? rating : "(none)") + "\n" +
    "  Liked:   " + liked + "\n" +
    "  Rewatch: " + rewatch + "\n" +
    "  Date:    " + (date || "(missing)") + "\n" +
    "  URL:     " + url + "\n" +
    "  Text:    " + (text ? text.slice(0, 100) + (text.length > 100 ? "\u2026" : "") : "(none)") + "\n\n" +
    "Copy snippet to clipboard?";

  if (!confirm(preview)) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(snippet).then(
      function () { alert("Copied! Paste it into reviews.js."); },
      function () { window.prompt("Copy this:", snippet); }
    );
  } else {
    window.prompt("Copy this:", snippet);
  }
})();
