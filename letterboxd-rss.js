// ============================================================
// LETTERBOXD RSS — Fetches and parses Letterboxd diary RSS feeds
// ============================================================
// To add a new source, push an object to RSS_SOURCES with:
//   url:  The Letterboxd RSS URL (e.g. https://letterboxd.com/<user>/rss/)
//   name: The display name to show on this site for that reviewer
// ============================================================

var RSS_SOURCES = [
  { url: 'https://letterboxd.com/djweaver29/rss/', name: 'Dylan W.' },
  { url: 'https://letterboxd.com/njh20/rss/', name: 'Nathan H.' },
  { url: 'https://letterboxd.com/andrewacebo/rss/', name: 'Andrew A.' },
  { url: 'https://letterboxd.com/fluffymastodons/rss/', name: 'Jacob L.' },
  { url: 'https://letterboxd.com/davidstirpe24/rss/', name: 'David S.' },
  // Add more sources like:
  // { url: 'https://letterboxd.com/<username>/rss/', name: '<Display Name>' },
];

// Fetch all configured RSS feeds in parallel and merge their reviews.
// Returns a promise resolving to { byTitle: { filmTitle: [reviewObject, ...] },
//                                    errors:  [{ name, message }] }
function fetchLetterboxdRSSReviews() {
  var errors = [];
  var fetches = RSS_SOURCES.map(function(source) {
    return fetchSingleRSSFeed(source).catch(function(err) {
      console.warn('Letterboxd RSS unavailable for ' + source.name + ':', err);
      errors.push({ name: source.name, message: err && err.message ? err.message : String(err) });
      return {};
    });
  });

  return Promise.all(fetches).then(function(results) {
    var byTitle = {};
    results.forEach(function(feed) {
      Object.keys(feed).forEach(function(title) {
        if (!byTitle[title]) byTitle[title] = [];
        byTitle[title] = byTitle[title].concat(feed[title]);
      });
    });
    return { byTitle: byTitle, errors: errors };
  });
}

function fetchSingleRSSFeed(source) {
  // CORS proxy (corsproxy.io started returning 403 for free-tier server-side
  // requests in April 2026; codetabs remains free and accepts Letterboxd RSS).
  var proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(source.url);
  return fetch(proxyUrl)
    .then(function(r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    })
    .then(function(xml) { return parseLetterboxdRSS(xml, source.name); });
}

function parseLetterboxdRSS(xml, reviewerName) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(xml, 'text/xml');
  var byTitle = {};

  Array.from(doc.querySelectorAll('item')).forEach(function(item) {
    var filmTitle = lbText(item, 'filmTitle');
    if (!filmTitle) return;

    var descEl = item.querySelector('description');
    if (!descEl) return;
    var reviewText = extractReviewText(descEl.textContent);
    if (!reviewText) return; // diary-only entries have no written review

    var watchedDate = lbText(item, 'watchedDate');
    var rewatch    = lbText(item, 'rewatch') === 'Yes';
    var ratingStr  = lbText(item, 'memberRating');
    var rating     = ratingStr ? parseFloat(ratingStr) : null;
    // <link> is tricky in XML — fall back to <guid>
    var linkEl = item.getElementsByTagName('link')[0] || item.querySelector('guid');
    var link = linkEl ? (linkEl.textContent || linkEl.getAttribute('href') || '').trim() : '';

    var review = { name: reviewerName, text: reviewText, letterboxdUrl: link, date: watchedDate };
    if (rewatch) review.rewatch = true;
    if (rating)  review.rating  = rating;

    if (!byTitle[filmTitle]) byTitle[filmTitle] = [];
    byTitle[filmTitle].push(review);
  });

  return byTitle;
}

// Query a Letterboxd-namespaced element by local name
function lbText(item, name) {
  var el = item.getElementsByTagNameNS('https://letterboxd.com', name)[0]
        || item.getElementsByTagName('letterboxd:' + name)[0]
        || item.getElementsByTagName(name)[0];
  return el ? el.textContent.trim() : '';
}

// Strip the poster image Letterboxd injects; return paragraph text joined by \n\n
function extractReviewText(rawHtml) {
  var div = document.createElement('div');
  div.innerHTML = rawHtml;
  div.querySelectorAll('img, .poster').forEach(function(el) { el.remove(); });
  var paras = Array.from(div.querySelectorAll('p'))
    .map(function(p) { return p.innerHTML.trim(); })
    .filter(Boolean);
  return paras.join('\n\n');
}
