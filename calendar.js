// ============================================================
// calendar.js — "Add to Calendar" helpers + film card builder
// ============================================================

function padZ(n) { return String(n).padStart(2, "0"); }

function toICSDate(dateStr, timeStr) {
  // dateStr: "2026-04-07", timeStr: "19:00"
  const [y, m, d] = dateStr.split("-");
  const [h, min] = timeStr.split(":");
  return `${y}${m}${d}T${h}${min}00`;
}

function buildICSContent(event) {
  const start = toICSDate(event.date, event.time);
  // Assume ~2h duration
  const [y, mo, d] = event.date.split("-");
  const [h, min] = event.time.split(":");
  const endH = String(parseInt(h) + 2).padStart(2, "0");
  const end = `${y}${mo}${d}T${endH}${min}00`;
  const now = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15);
  const desc = event.description.replace(/,/g, "\\,").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Movies in the Barn//EN",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:Movies in the Barn: ${event.title}`,
    `DESCRIPTION:${desc}`,
    `DTSTAMP:${now}Z`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
}

function downloadICS(event) {
  const content = buildICSContent(event);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = event.title.replace(/[^a-zA-Z0-9]/g, "_") + ".ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function googleCalURL(event) {
  const fmt = (dateStr, timeStr) => {
    const [y, m, d] = dateStr.split("-");
    const [h, min] = timeStr.split(":");
    const endH = String(parseInt(h) + 2).padStart(2, "0");
    return {
      start: `${y}${m}${d}T${h}${min}00`,
      end: `${y}${m}${d}T${endH}${min}00`
    };
  };
  const { start, end } = fmt(event.date, event.time);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Movies in the Barn: ${event.title}`,
    dates: `${start}/${end}`,
    details: event.description,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// ── Film card builder (used by index.html and lineup.html) ──

// Per-film object-position overrides to center the subject in the circular crop.
// Format: "x% y%" — x pans left/right, y pans up/down.
const POSTER_PAN = {
  "Eephus":                              "center 25%",
  "Dazed and Confused":                  "55% center",
  "The Awful Truth":                     "center 30%",
  "Before Midnight":                     "center 25%",
  "Chronicle":                           "center 25%",
  "Sky High":                            "40% 30%",
  "Robin Hood":                          "center center",
  "The Princess Bride":                  "center center",
  "Mission: Impossible - Ghost Protocol":"center 38%",
  "Annie Get Your Gun":                  "40% 25%",
  "Exam":                                "55% 30%",
  "RED":                                 "center 25%",
  "Seven Brides for Seven Brothers":     "center 25%",
  "Gattaca":                             "40% 30%",
  "BlackBerry":                          "45% 25%",
  "Steve Jobs":                          "40% 30%",
};

// Per-film info bubble placement — positioned away from the image subject.
// "bl" = bottom-left, "br" = bottom-right, "tl" = top-left
const BUBBLE_POS = {
  "Eephus":                              "br",  // subjects spread across upper center
  "Dazed and Confused":                  "bl",  // subject right of center
  "The Awful Truth":                     "br",  // subjects center-left
  "Before Midnight":                     "bl",  // faces upper-center, ground bottom-left clear
  "Chronicle":                           "br",  // boys left-center
  "Sky High":                            "bl",  // subjects upper-center, bottom-left clear
  "Robin Hood":                          "br",  // Robin Hood center-left
  "The Princess Bride":                  "tr",  // couple centered, upper-right clear
  "Mission: Impossible - Ghost Protocol":"bl",  // Cruise dead center
  "Annie Get Your Gun":                  "tl",  // subjects center, upper-left clear
  "Exam":                                "br",  // woman's face upper-center, desk area bottom-right
  "RED":                                 "tr",  // all three faces lower-center, upper-right clear
  "Seven Brides for Seven Brothers":     "br",  // moved to br to avoid Annie's tl on mobile
  "Gattaca":                             "bl",  // Hawke left but face upper, bottom-left clear
  "BlackBerry":                          "bl",  // two leads center-right
  "Steve Jobs":                          "br",  // Fassbender left, Rogen right but faces upper
};

// Seeded random per-title so layout is stable across renders
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return h;
}

// Convert placement code + random jitter into inline CSS for the info bubble.
// Base offset pushes the bubble outward so only ~1/3 overlaps the image (Venn diagram feel).
function infoBubbleStyle(title) {
  const h = Math.abs(hashStr(title));
  const jitterA = -5 + (h % 12);        // -5px to +6px
  const jitterB = -5 + ((h >> 4) % 12); // -5px to +6px
  const base = -35;                      // push outward from stage edge
  const pos = BUBBLE_POS[title] || "bl";

  if (pos === "br") return `bottom:${base + jitterA}px;right:${base + jitterB}px;left:auto`;
  if (pos === "tl") return `top:${base + jitterA}px;left:${base + jitterB}px;bottom:auto`;
  if (pos === "tr") return `top:${base + jitterA}px;right:${base + jitterB}px;left:auto;bottom:auto`;
  // default "bl"
  return `bottom:${base + jitterA}px;left:${base + jitterB}px`;
}

function buildFilmCard(e, featured) {
  const d = new Date(e.date + "T00:00:00");
  const dateStr = d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const today = new Date(); today.setHours(0,0,0,0);
  const isPast = d < today;
  const filmData = JSON.stringify(e).replace(/"/g, "&quot;");

  // Deterministic vertical stagger per film — wide range for organic flow.
  // Per-film overrides for cards that need manual spacing adjustments.
  const STAGGER_OVERRIDE = {
    "Seven Brides for Seven Brothers": 55,  // push down to clear MI above
  };
  const h = Math.abs(hashStr(e.title));
  const cardShift = STAGGER_OVERRIDE[e.title] ?? (-20 + (h >> 12) % 80);

  return `
    <article class="film-bubble-card ${featured ? 'film-bubble-card--featured' : ''} ${isPast ? 'film-bubble-card--past' : ''}"
             data-film="${filmData}"
             data-seed="${h}"
             onclick="openFilmModal(this)"
             role="button"
             tabindex="0"
             style="margin-top:${cardShift}px"
             onkeydown="if(event.key==='Enter'||event.key===' ')openFilmModal(this)">
      <div class="film-bubble-stage">
        <div class="film-bubble-img${e.posterUrl ? '' : ' film-bubble-img--empty'}">
          ${e.posterUrl
            ? `<img src="${e.posterUrl}" alt="${e.title}" loading="lazy" style="object-position:${POSTER_PAN[e.title] || 'center center'}" />`
            : `<span>🎬</span>`
          }
        </div>
        <div class="film-bubble-info" style="${infoBubbleStyle(e.title)}">
          <span class="film-bubble-date">${dateStr}</span>
          <span class="film-bubble-title">${e.title}</span>
        </div>
      </div>
    </article>
  `;
}

// ── Coming Soon list row (boring mode) ──

function buildComingSoonRow(e) {
  const d = new Date(e.date + "T00:00:00");
  const dateStr = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const filmData = JSON.stringify(e).replace(/"/g, "&quot;");
  return `
    <div class="archive-row" data-film="${filmData}" onclick="openFilmModal(this)" style="cursor:pointer;">
      ${e.posterUrl
        ? `<img src="${e.posterUrl}" alt="${e.title}" class="archive-poster" loading="lazy" />`
        : `<div class="archive-poster archive-poster--placeholder"><span>🎬</span></div>`
      }
      <div class="archive-row-info">
        <h3 class="archive-title">${e.title}</h3>
        <p class="archive-meta">${e.releaseYear} &middot; ${e.runtime} &middot; ${e.rating}</p>
        <p class="archive-date">${dateStr}</p>
      </div>
    </div>
  `;
}

// ── View mode toggle ──

function getViewMode() {
  return localStorage.getItem("mitb-mode") || "boring";
}

function setViewMode(mode) {
  localStorage.setItem("mitb-mode", mode);
  document.body.setAttribute("data-mode", mode);

  // Reset inline transforms/z-index on all cards when leaving fun mode
  if (mode === "boring") {
    document.querySelectorAll(".film-bubble-card").forEach(function(card) {
      card.style.zIndex = "";
      var img = card.querySelector(".film-bubble-img");
      var info = card.querySelector(".film-bubble-info");
      if (img) img.style.transform = "";
      if (info) info.style.transform = "";
    });
  }

  // Update toggle button state
  var btn = document.getElementById("mode-toggle");
  if (btn) btn.setAttribute("aria-pressed", mode === "fun");

  // Re-sync navbar/overlay z-indexes so they stay above the hero logo
  if (window._syncChrome) window._syncChrome();

  // Fire custom event so page scripts can re-render
  window.dispatchEvent(new CustomEvent("modechange", { detail: { mode: mode } }));
}

// Apply saved mode on load (before rendering)
(function() {
  var mode = getViewMode();
  document.body.setAttribute("data-mode", mode);
})();

// ── Film modal ──

function initFilmModal() {
  if (document.getElementById("film-modal-overlay")) return;
  const overlay = document.createElement("div");
  overlay.id = "film-modal-overlay";
  overlay.className = "film-modal-overlay";
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("role", "dialog");
  overlay.innerHTML = `
    <div class="film-modal" id="film-modal-box">
      <button class="film-modal-close" onclick="closeFilmModal()" aria-label="Close">&times;</button>
      <div class="film-modal-inner">
        <div class="film-modal-img" id="film-modal-img"></div>
        <div class="film-modal-content">
          <p class="film-modal-date" id="film-modal-date"></p>
          <h2 class="film-modal-title" id="film-modal-title"></h2>
          <p class="film-modal-theme" id="film-modal-theme"></p>
          <p class="film-modal-meta" id="film-modal-meta"></p>
          <p class="film-modal-detail" id="film-modal-detail"></p>
          <p class="film-modal-desc" id="film-modal-desc"></p>
          <div class="film-modal-cal" id="film-modal-cal"></div>
        </div>
      </div>
    </div>
  `;
  overlay.addEventListener("click", function(ev) {
    if (ev.target === overlay) closeFilmModal();
  });
  document.body.appendChild(overlay);
}

function filmSlug(title) {
  return encodeURIComponent(
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  );
}

function openFilmBySlug(slug) {
  const card = document.querySelector(
    `.film-card[data-film]`
  );
  // Search all cards for a matching title
  const cards = document.querySelectorAll(".film-card[data-film]");
  for (const c of cards) {
    const e = JSON.parse(c.dataset.film);
    if (filmSlug(e.title) === slug) {
      openFilmModal(c);
      return true;
    }
  }
  // Also check archive rows — they don't have data-film, so try EVENTS directly
  const match = EVENTS.find(e => filmSlug(e.title) === slug);
  if (match) {
    openFilmModalFromData(match);
    return true;
  }
  return false;
}

function openFilmModalFromData(e) {
  // Build a temporary element with the data attribute and delegate
  const tmp = document.createElement("div");
  tmp.dataset.film = JSON.stringify(e);
  openFilmModal(tmp);
}

// ── JustWatch URL helper ──

const JUSTWATCH_OVERRIDE = {
  // Slug doesn't match auto-generated title
  "The Road Warrior":     "mad-max-2-the-road-warrior",
  "Mission: Impossible - Ghost Protocol": "mission-impossible-iv",
  "Dungeons & Dragons: Honor Among Thieves": "dungeons-and-dragons-2023",
  "Once Upon a Time... in Hollywood": "once-upon-a-time-in-hollywood",
  "Donnie Darko":         "donnie-darko-directors-cut",
  "RRR":                  "roudram-ranam-rudhiram",
  "The Taste of Things":  "la-passion-de-dodin-bouffant",
  "Anatomy of a Fall":    "anatomie-dune-chute",
  "Daddy Longlegs":       "go-get-some-rosemary",
  "Lilo & Stitch":        "lilo-and-stitch",
  "Babette's Feast":      "babettes-feast",
  // Disambiguate from other films with the same title
  "Godzilla":             "godzilla-1954",
  "The Thing":            "thing-the",
  "RED":                  "red-retired-extremely-dangerous",
  "Robin Hood":           "robin-hood-1973",
  "Love Affair":          "love-affair-1939",
  "Little Women":         "little-women-2019",
  "Elvis":                "elvis-2022",
  "The Beguiled":         "the-beguiled-2017",
  "Annette":              "annette-2021",
  "Arrival":              "arrival-2016",
  "Gifted":               "gifted-2017",
  "Parasite":             "parasite-2019",
  "Tully":                "tully-2018",
};

function justwatchUrl(title) {
  const slug = JUSTWATCH_OVERRIDE[title] ||
    title.toLowerCase()
      .replace(/&/g, "and")
      .replace(/['']/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  return "https://www.justwatch.com/us/movie/" + slug;
}

function openFilmModal(card) {
  initFilmModal();
  const e = JSON.parse(card.dataset.film);
  const d = new Date(e.date + "T00:00:00");
  const dateStr = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const today = new Date(); today.setHours(0,0,0,0);
  const isPast = d < today;

  const imgEl = document.getElementById("film-modal-img");
  if (e.posterUrl) {
    const pan = POSTER_PAN[e.title] || "center center";
    imgEl.innerHTML = `<img src="${e.posterUrl}" alt="${e.title}" style="object-position:${pan}" />`;
    imgEl.classList.remove("film-modal-img--empty");
  } else {
    imgEl.innerHTML = `<span>🎬</span>`;
    imgEl.classList.add("film-modal-img--empty");
  }

  document.getElementById("film-modal-date").textContent = dateStr;
  document.getElementById("film-modal-title").textContent = e.title;
  document.getElementById("film-modal-theme").textContent = `${e.month} · ${e.theme}`;
  document.getElementById("film-modal-meta").textContent =
    `${e.releaseYear} · ${e.runtime} · ${e.rating}`;
  const detailEl = document.getElementById("film-modal-detail");
  const searchInput = document.getElementById("search-input");
  const hasSearch = searchInput && searchInput.value.trim().length > 0;
  if (hasSearch) {
    const detailParts = [];
    if (e.director) detailParts.push("Directed by " + e.director);
    if (e.genres && e.genres.length) detailParts.push(e.genres.join(", "));
    if (e.cast && e.cast.length) detailParts.push(e.cast.join(", "));
    detailEl.textContent = detailParts.length ? detailParts.join(" \u00b7 ") : "";
    detailEl.hidden = false;
  } else {
    detailEl.textContent = "";
    detailEl.hidden = true;
  }

  document.getElementById("film-modal-desc").textContent = e.description;

  const calEl = document.getElementById("film-modal-cal");
  if (!isPast) {
    calEl.innerHTML = `
      <p class="film-modal-cal-label">Add to calendar</p>
      <div class="film-modal-cal-options">
        <a href="${googleCalURL(e)}" target="_blank" class="btn-cal">Google Calendar</a>
        <button class="btn-cal btn-cal--outline"
                onclick="downloadICS(${JSON.stringify(e).replace(/"/g, "&quot;")})">
          Apple / Outlook (.ics)
        </button>
      </div>
    `;
  } else {
    const formats = [];
    if (e.has4K) formats.push("4K");
    if (e.hasBluray) formats.push("Blu-ray");
    if (e.hasDVD) formats.push("DVD");
    const borrowLabel = formats.length ? "Borrow " + formats.join(" / ") : "";
    const mailto = "mailto:moviesinthebarn@gmail.com?subject=" +
      encodeURIComponent("Request to borrow " + e.title);

    calEl.innerHTML = `
      <p class="film-modal-cal-label">Where to watch</p>
      <div class="film-modal-cal-options">
        <a href="${justwatchUrl(e.title)}" target="_blank" class="btn-cal">Streaming</a>
        ${borrowLabel ? `<a href="${mailto}" class="btn-cal btn-cal--outline">${borrowLabel}</a>` : ""}
      </div>
    `;
  }

  document.getElementById("film-modal-overlay").classList.add("is-open");
  document.body.style.overflow = "hidden";

  // Update URL hash for sharing
  history.replaceState(null, "", "#" + filmSlug(e.title));
}

function closeFilmModal() {
  const overlay = document.getElementById("film-modal-overlay");
  if (overlay) overlay.classList.remove("is-open");
  document.body.style.overflow = "";

  // Clear URL hash
  history.replaceState(null, "", window.location.pathname + window.location.search);
}

document.addEventListener("keydown", function(ev) {
  if (ev.key === "Escape") closeFilmModal();
});

function toggleCalDropdown(uid) {
  const el = document.getElementById(uid);
  el.classList.toggle("hidden");
}

// Close dropdowns on outside click
document.addEventListener("click", e => {
  if (!e.target.closest(".cal-dropdown-wrap")) {
    document.querySelectorAll(".cal-dropdown").forEach(d => d.classList.add("hidden"));
  }
});

// Open film modal from URL hash on page load
window.addEventListener("DOMContentLoaded", function() {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash) {
    // Small delay to let page scripts render cards/archive first
    setTimeout(function() { openFilmBySlug(decodeURIComponent(hash)); }, 100);
  }
});

// Handle back/forward navigation
window.addEventListener("hashchange", function() {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash) {
    openFilmBySlug(decodeURIComponent(hash));
  } else {
    closeFilmModal();
  }
});

// ── Scrolling placeholder ──
// When the search input placeholder is wider than the input, scroll it in a loop.

(function() {
  function initScrollingPlaceholder(input) {
    if (!input) return;

    var text = input.getAttribute("placeholder") || "";
    input.setAttribute("placeholder", "");

    // Create wrapper and overlay
    var parent = input.parentNode;
    var wrap = document.createElement("div");
    wrap.className = "search-input-wrap";
    parent.insertBefore(wrap, input);
    wrap.appendChild(input);

    var overlay = document.createElement("div");
    overlay.className = "search-placeholder-scroll";
    var inner = document.createElement("span");
    inner.className = "search-placeholder-text";
    inner.textContent = text;
    overlay.appendChild(inner);
    wrap.appendChild(overlay);

    var animId = null;
    var pos = 0;
    var paused = false;
    var needsScroll = false;
    var speed = 0.4; // px per frame
    var pauseAtStart = 120; // frames to pause at start position
    var pauseCount = 0;

    function measure() {
      needsScroll = inner.scrollWidth > overlay.clientWidth;
      if (!needsScroll) {
        pos = 0;
        inner.style.transform = "";
        if (animId) { cancelAnimationFrame(animId); animId = null; }
      } else if (!animId && !paused) {
        pauseCount = pauseAtStart;
        tick();
      }
    }

    function tick() {
      if (paused || !needsScroll) { animId = null; return; }

      if (pauseCount > 0) {
        pauseCount--;
        animId = requestAnimationFrame(tick);
        return;
      }

      var maxScroll = inner.scrollWidth - overlay.clientWidth;
      pos += speed;
      if (pos >= maxScroll + 40) {
        pos = 0;
        pauseCount = pauseAtStart;
      }
      inner.style.transform = "translateX(" + (-pos) + "px)";
      animId = requestAnimationFrame(tick);
    }

    function show() {
      paused = false;
      overlay.style.display = "";
      measure();
    }

    function hide() {
      paused = true;
      overlay.style.display = "none";
      if (animId) { cancelAnimationFrame(animId); animId = null; }
    }

    input.addEventListener("focus", hide);
    input.addEventListener("blur", function() {
      if (!input.value) show();
    });
    input.addEventListener("input", function() {
      if (input.value) hide(); else show();
    });

    window.addEventListener("resize", measure);

    // Initial state
    if (!input.value && document.activeElement !== input) {
      show();
    } else {
      hide();
    }
  }

  // Init after DOM is ready and page scripts have run
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      setTimeout(function() { initScrollingPlaceholder(document.getElementById("search-input")); }, 50);
    });
  } else {
    setTimeout(function() { initScrollingPlaceholder(document.getElementById("search-input")); }, 50);
  }
})();

// ── Organic bubble drift ──
// Scrolling creates a smoothed "wind" that nudges each element along its
// own seeded direction. Elements lerp toward their target at different
// rates (0.015–0.045 per frame) so they settle at different times.
// They stay where they land — no spring back to origin.

(function() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  function isFun() { return document.body.getAttribute("data-mode") === "fun"; }

  var els = [];
  var smoothDelta = 0;          // exponential moving average of scroll velocity
  var lastScroll = window.scrollY;
  var running = false;
  var maxDrift = 14;             // max px from rest

  // Random angle offset each page load so drift direction varies per visit
  var sessionRand = Math.random() * 6.28;

  function init() {
    els = [];
    document.querySelectorAll(".film-bubble-card").forEach(function(card) {
      var img  = card.querySelector(".film-bubble-img");
      var info = card.querySelector(".film-bubble-info");
      if (!img || !info) return;

      var seed = Math.abs(parseInt(card.dataset.seed) || 0);
      var a1 = (seed % 628) / 100 + sessionRand;
      var a2 = ((seed >> 8) % 628) / 100 + sessionRand;

      // Image: slower response
      els.push({
        card: card, el: img,
        dirX: Math.cos(a1), dirY: Math.sin(a1),
        targetX: 0, targetY: 0,
        curX: 0, curY: 0,
        ease: 0.015 + (seed % 20) * 0.0015,   // 0.015–0.045
        gain: 0.6,
        isInfo: false
      });
      // Info bubble: slightly more reactive, different direction
      els.push({
        card: card, el: info,
        dirX: Math.cos(a2), dirY: Math.sin(a2),
        targetX: 0, targetY: 0,
        curX: 0, curY: 0,
        ease: 0.02 + ((seed >> 4) % 20) * 0.0015,  // 0.02–0.05
        gain: 0.85,
        isInfo: true
      });
    });
  }

  function onScroll() {
    if (!isFun()) return;
    var y = window.scrollY;
    var delta = y - lastScroll;
    lastScroll = y;

    // Smooth the scroll velocity so sudden jumps don't cause jitter
    smoothDelta = smoothDelta * 0.7 + delta * 0.3;

    // Accumulate into each element's target position
    for (var i = 0; i < els.length; i++) {
      var e = els[i];

      // Only affect cards near the viewport
      var rect = e.card.getBoundingClientRect();
      var center = rect.top + rect.height / 2;
      var vis = Math.max(0, 1 - Math.abs(center - window.innerHeight / 2) / window.innerHeight);

      // Push the target along this element's direction, scaled by velocity
      e.targetX += e.dirX * smoothDelta * vis * e.gain * 0.15;
      e.targetY += e.dirY * smoothDelta * vis * e.gain * 0.15;

      // Soft clamp: ease targets back when they exceed max drift
      var dist = Math.sqrt(e.targetX * e.targetX + e.targetY * e.targetY);
      if (dist > maxDrift) {
        var scale = maxDrift / dist;
        e.targetX *= scale;
        e.targetY *= scale;
      }
    }

    if (!running) { running = true; tick(); }
  }

  function tick() {
    var stillMoving = false;

    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      var dx = e.targetX - e.curX;
      var dy = e.targetY - e.curY;

      // Lerp toward target at this element's own pace
      e.curX += dx * e.ease;
      e.curY += dy * e.ease;

      var hovered = e.isInfo && e.card.matches(":hover");
      var s = hovered ? " scale(1.05)" : "";
      e.el.style.transform =
        "translate(" + e.curX.toFixed(2) + "px," + e.curY.toFixed(2) + "px)" + s;

      if (Math.abs(dx) > 0.03 || Math.abs(dy) > 0.03) stillMoving = true;
    }

    if (stillMoving) {
      requestAnimationFrame(tick);
    } else {
      running = false;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  window.addEventListener("DOMContentLoaded", function() {
    setTimeout(init, 300);
  });

  // Re-init when switching to fun mode (cards may have been re-rendered)
  window.addEventListener("modechange", function(ev) {
    if (ev.detail && ev.detail.mode === "fun") {
      setTimeout(init, 100);
    }
  });

  // Hover scale needs to combine with current translate
  document.addEventListener("mouseenter", function(ev) {
    if (ev.target.closest(".film-bubble-card") && !running) {
      running = true; tick();
    }
  }, true);
  document.addEventListener("mouseleave", function(ev) {
    if (ev.target.closest(".film-bubble-card") && !running) {
      running = true; tick();
    }
  }, true);
})();

// ── Card z-index promotion ──
// Each card gets an incrementing z-index when activated. Overlapping cards
// that were previously promoted get reset, so only the latest one is on top
// in any overlapping group. Non-overlapping cards keep their z-index.

(function() {
  function isFun() { return document.body.getAttribute("data-mode") === "fun"; }
  var zCounter = 10;

  function rectsOverlap(a, b) {
    return !(a.right < b.left || a.left > b.right ||
             a.bottom < b.top || a.top > b.bottom);
  }

  var nav = document.querySelector(".site-header");
  var overlay = document.getElementById("film-modal-overlay");

  function syncChrome() {
    var navZ = zCounter + 100;
    if (nav) nav.style.zIndex = navZ;
    // Search bar row sticks below nav — keep it one above
    var searchRow = document.querySelector(".section-inner[style]");
    if (searchRow) searchRow.style.zIndex = navZ + 1;
    // Mobile dropdown menu — above logo and search
    var openMenu = document.querySelector(".nav-links.open");
    if (openMenu) openMenu.style.zIndex = navZ + 2;
    if (overlay) overlay.style.zIndex = navZ + 200;
  }
  // Expose so mode toggle can re-sync chrome z-indexes
  window._syncChrome = syncChrome;

  function promote(card) {
    if (!card) return;
    // Lazily grab the overlay if it was created after init
    if (!overlay) overlay = document.getElementById("film-modal-overlay");
    var rect = card.getBoundingClientRect();
    // Demote only overlapping cards back to base
    document.querySelectorAll(".film-bubble-card").forEach(function(other) {
      if (other !== card && rectsOverlap(rect, other.getBoundingClientRect())) {
        other.style.zIndex = "";
      }
    });
    zCounter++;
    card.style.zIndex = zCounter;
    syncChrome();
  }

  var hasPointer = window.matchMedia("(hover: hover)").matches;

  if (hasPointer) {
    // ── Hover promotion only (pointer devices) ──
    document.addEventListener("mouseenter", function(ev) {
      var card = ev.target.closest(".film-bubble-card");
      if (card) promote(card);
    }, true);
  } else {
    // ── Scroll promotion only (touch devices) ──
    var currentScrollCard = null;

    function updateTopCard() {
      var cards = document.querySelectorAll(".film-bubble-card");
      if (!cards.length) return;

      var vpCenter = window.innerHeight / 2;
      var best = null;
      var bestDist = Infinity;

      for (var i = 0; i < cards.length; i++) {
        var rect = cards[i].getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
        var cardCenter = rect.top + rect.height / 2;
        var dist = Math.abs(cardCenter - vpCenter);
        if (dist < bestDist) {
          bestDist = dist;
          best = cards[i];
        }
      }

      if (best && best !== currentScrollCard) {
        promote(best);
        currentScrollCard = best;
      }
    }

    window.addEventListener("scroll", updateTopCard, { passive: true });

    // Cards are built by inline scripts after calendar.js, so poll until they exist
    var initAttempts = 0;
    function tryInit() {
      if (document.querySelectorAll(".film-bubble-card").length > 0) {
        updateTopCard();
      } else if (initAttempts < 20) {
        initAttempts++;
        setTimeout(tryInit, 100);
      }
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", tryInit);
    } else {
      tryInit();
    }
  }

  // Sync mobile menu z-index whenever it opens
  var navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    new MutationObserver(function() {
      if (navLinks.classList.contains("open")) syncChrome();
    }).observe(navLinks, { attributes: true, attributeFilter: ["class"] });
  }
})();
