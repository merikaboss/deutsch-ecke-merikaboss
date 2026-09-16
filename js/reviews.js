/* ============================================================
   Deutsch Ecke — public reviews

   A message icon in the header opens a small panel: the average
   rating, reaction counts and the latest short reviews. Anyone can
   add one — stars, an optional reaction, up to 20 words. No account,
   no name, nothing about the visitor is kept.

   Reviews go through a small relay (worker/reviews-worker.js on
   Cloudflare), which checks them and saves them on the `reviews`
   branch of this site's GitHub repository.

   After a few minutes of real reading, a small card asks once for a
   rating. "Not now" hides it for a month; sending a review hides it
   for good.

   Pages only need this one script tag — it loads its own CSS and
   finds the icon sprite relative to itself.
   ============================================================ */

(function () {
  "use strict";

  var script = document.currentScript;
  /* Set once the relay is deployed. data-api on the script tag overrides it (used for testing). */
  var API = (script && script.getAttribute("data-api")) || "";
  var MAX_WORDS = 20;
  var ASK_AFTER_MS = 5 * 60 * 1000;    // active reading time before the card appears
  var SNOOZE_MS = 30 * 24 * 60 * 60 * 1000;
  var TICK_MS = 15000;

  var K_TIME = "de-review-active-ms";
  var K_SENT = "de-review-sent";
  var K_LATER = "de-review-later";

  var REACTIONS = [
    { key: "helpful", label: "Helpful", icon: "thumb" },
    { key: "clear", label: "Easy to follow", icon: "bulb" },
    { key: "love", label: "Love it", icon: "heart" },
    { key: "better", label: "Could be better", icon: "pencil" }
  ];
  var STAR_WORDS = ["", "Not good", "Could be better", "Okay", "Good", "Excellent"];

  if (!API || !script) return;

  var base = script.src.replace(/js\/reviews\.js(\?.*)?$/, "");
  var SPRITE = base + "assets/icons.svg";

  var panel = null;
  var btn = null;
  var prompt = null;
  var data = null;
  var loading = null;
  var openedAt = 0;

  /* ---------- small helpers ---------- */

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, String(value));
    } catch (e) {
      return null;
    }
    return null;
  }

  function icon(name, cls) {
    return '<svg class="icon-svg' + (cls ? " " + cls : "") + '" aria-hidden="true"><use href="' +
      SPRITE + "#icon-" + name + '"></use></svg>';
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function words(s) {
    var m = String(s || "").trim().split(/\s+/).filter(Boolean);
    return m.length;
  }

  function starsHtml(value, cls) {
    var h = '<span class="rv-stars ' + (cls || "") + '" aria-label="' + value + ' of 5 stars">';
    for (var i = 1; i <= 5; i++) {
      var fill = Math.max(0, Math.min(1, value - (i - 1)));
      h += '<span class="rv-s">' + icon("star", "rv-s-empty") +
        '<span class="rv-s-fill" style="width:' + Math.round(fill * 100) + '%">' + icon("star") + "</span></span>";
    }
    return h + "</span>";
  }

  function when(d) {
    var then = new Date(d + "T12:00:00");
    var days = Math.round((Date.now() - then.getTime()) / 86400000);
    if (days <= 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return days + " days ago";
    return then.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  function reaction(key) {
    for (var i = 0; i < REACTIONS.length; i++) if (REACTIONS[i].key === key) return REACTIONS[i];
    return null;
  }

  /* ---------- data ---------- */

  function load(force) {
    if (loading && !force) return loading;
    loading = fetch(API, { method: "GET", mode: "cors" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { data = d; updateBadge(); return d; })
      .catch(function (e) { loading = null; throw e; });
    return loading;
  }

  function updateBadge() {
    if (!btn || !data) return;
    var b = btn.querySelector(".rv-badge");
    if (data.count) {
      b.innerHTML = icon("star", "rv-badge-star") + data.average.toFixed(1);
      b.hidden = false;
      btn.setAttribute("aria-label", "Reviews: " + data.average.toFixed(1) + " of 5 from " + data.count + " ratings");
    }
  }

  /* ---------- panel ---------- */

  function buildPanel() {
    panel = document.createElement("div");
    panel.className = "rv-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Reviews");
    panel.hidden = true;
    document.body.appendChild(panel);

    /* Keys typed in here belong to the panel, not to the page reader
       underneath (which turns pages on arrows and space). */
    panel.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); e.preventDefault(); }
      e.stopPropagation();
    });

    document.addEventListener("pointerdown", function (e) {
      if (panel.hidden) return;
      if (panel.contains(e.target) || (btn && btn.contains(e.target)) || (prompt && prompt.contains(e.target))) return;
      close();
    });
  }

  function place() {
    if (!panel || panel.hidden) return;
    var top = 12;
    if (btn) {
      var r = btn.getBoundingClientRect();
      top = Math.max(12, r.bottom + 10);
    } else {
      var bar = document.querySelector(".rdr-bar");
      if (bar) top = bar.getBoundingClientRect().bottom + 10;
    }
    panel.style.top = Math.round(top) + "px";
    panel.style.maxHeight = "calc(100vh - " + Math.round(top + 16) + "px)";
  }

  function open(view, preset) {
    if (!panel) buildPanel();
    hidePrompt();
    panel.hidden = false;
    if (btn) btn.setAttribute("aria-expanded", "true");
    place();
    if (view === "form") showForm(preset);
    else showList();
  }

  function close() {
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
      btn.focus({ preventScroll: true });
    }
  }

  function head(title, back) {
    return '<div class="rv-head">' +
      (back ? '<button type="button" class="rv-icon-btn rv-back" aria-label="Back to reviews">' + icon("arrow-right", "rv-flip") + "</button>" : "") +
      "<strong>" + esc(title) + "</strong>" +
      '<button type="button" class="rv-icon-btn rv-close" aria-label="Close">' + icon("close") + "</button></div>";
  }

  function wireHead() {
    panel.querySelector(".rv-close").addEventListener("click", close);
    var back = panel.querySelector(".rv-back");
    if (back) back.addEventListener("click", function () { showList(); });
  }

  function showList() {
    panel.innerHTML = head("Reviews") + '<div class="rv-body"><p class="rv-muted">Loading…</p></div>';
    wireHead();
    load().then(renderList, function () {
      panel.querySelector(".rv-body").innerHTML =
        '<p class="rv-muted">Reviews could not be loaded right now.</p>' +
        '<button type="button" class="rv-primary">Leave a review</button>';
      panel.querySelector(".rv-primary").addEventListener("click", function () { showForm(); });
    });
  }

  function renderList() {
    if (panel.hidden) return;
    var d = data;
    var h = '<div class="rv-body">';

    if (!d.count) {
      h += '<p class="rv-empty">No reviews yet. Be the first to say how you find Deutsch Ecke.</p>';
    } else {
      h += '<div class="rv-summary"><span class="rv-avg">' + d.average.toFixed(1) + "</span>" +
        "<div>" + starsHtml(d.average, "rv-big") +
        '<span class="rv-muted">' + d.count + (d.count === 1 ? " rating" : " ratings") + "</span></div></div>";

      var chips = REACTIONS.filter(function (r) { return d.reactions && d.reactions[r.key]; });
      if (chips.length) {
        h += '<div class="rv-chips">' + chips.map(function (r) {
          return '<span class="rv-chip">' + icon(r.icon) + esc(r.label) + " <b>" + d.reactions[r.key] + "</b></span>";
        }).join("") + "</div>";
      }
    }

    h += '<button type="button" class="rv-primary">' + icon("pencil") + " Leave a review</button>";

    if (d.latest && d.latest.length) {
      h += '<ul class="rv-list">' + d.latest.map(function (r) {
        var re = reaction(r.r);
        return "<li>" +
          '<div class="rv-line">' + starsHtml(r.s) + '<span class="rv-date">' + esc(when(r.d)) + "</span></div>" +
          (re ? '<span class="rv-tag">' + icon(re.icon) + esc(re.label) + "</span>" : "") +
          (r.t ? '<p class="rv-text">' + esc(r.t) + "</p>" : "") +
          "</li>";
      }).join("") + "</ul>";
    }

    panel.innerHTML = head("Reviews") + h + "</div>";
    wireHead();
    panel.querySelector(".rv-primary").addEventListener("click", function () { showForm(); });
    place();
  }

  function showForm(presetStars) {
    openedAt = Date.now();
    var state = { stars: presetStars || 0, reaction: "" };

    var h = head("How is Deutsch Ecke?", true) + '<form class="rv-body rv-form" novalidate>';
    h += '<div class="rv-pick" role="radiogroup" aria-label="Your rating">';
    for (var i = 1; i <= 5; i++) {
      h += '<button type="button" class="rv-star-btn" role="radio" aria-checked="false" data-v="' + i +
        '" aria-label="' + i + (i === 1 ? " star" : " stars") + '">' + icon("star") + "</button>";
    }
    h += '</div><p class="rv-star-word" aria-live="polite">Tap the stars</p>';

    h += '<p class="rv-label">What stood out? <span class="rv-muted">(optional)</span></p><div class="rv-reacts">' +
      REACTIONS.map(function (r) {
        return '<button type="button" class="rv-react" aria-pressed="false" data-k="' + r.key + '">' +
          icon(r.icon) + esc(r.label) + "</button>";
      }).join("") + "</div>";

    h += '<label class="rv-label" for="rv-text">A few words <span class="rv-muted">(optional)</span></label>' +
      '<textarea id="rv-text" class="rv-text-in" rows="3" maxlength="160" spellcheck="false" placeholder="Up to 20 words"></textarea>' +
      '<div class="rv-count"><span>0</span> / ' + MAX_WORDS + " words</div>" +
      '<input type="text" name="website" class="rv-hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<p class="rv-error" role="alert" hidden></p>' +
      '<button type="submit" class="rv-primary" disabled>Post review</button>' +
      '<p class="rv-note">Shown publicly without your name. Nothing else about you is saved.</p>' +
      "</form>";

    panel.innerHTML = h;
    wireHead();
    place();

    var form = panel.querySelector("form");
    var starBtns = panel.querySelectorAll(".rv-star-btn");
    var word = panel.querySelector(".rv-star-word");
    var text = panel.querySelector(".rv-text-in");
    var count = panel.querySelector(".rv-count");
    var submit = panel.querySelector('button[type="submit"]');
    var error = panel.querySelector(".rv-error");

    function sync() {
      Array.prototype.forEach.call(starBtns, function (b) {
        var v = Number(b.getAttribute("data-v"));
        b.classList.toggle("on", v <= state.stars);
        b.setAttribute("aria-checked", v === state.stars ? "true" : "false");
      });
      word.textContent = state.stars ? STAR_WORDS[state.stars] : "Tap the stars";
      var n = words(text.value);
      count.querySelector("span").textContent = n;
      count.classList.toggle("over", n > MAX_WORDS);
      submit.disabled = !state.stars || n > MAX_WORDS;
    }

    Array.prototype.forEach.call(starBtns, function (b) {
      b.addEventListener("click", function () {
        state.stars = Number(b.getAttribute("data-v"));
        sync();
      });
    });

    Array.prototype.forEach.call(panel.querySelectorAll(".rv-react"), function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-k");
        state.reaction = state.reaction === k ? "" : k;
        Array.prototype.forEach.call(panel.querySelectorAll(".rv-react"), function (o) {
          var on = o.getAttribute("data-k") === state.reaction;
          o.classList.toggle("on", on);
          o.setAttribute("aria-pressed", on ? "true" : "false");
        });
      });
    });

    text.addEventListener("input", sync);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submit.disabled) return;
      submit.disabled = true;
      submit.textContent = "Posting…";
      error.hidden = true;

      fetch(API, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stars: state.stars,
          reaction: state.reaction,
          text: text.value.trim(),
          website: panel.querySelector(".rv-hp").value,
          elapsed: Date.now() - openedAt
        })
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (body) {
            if (!r.ok) throw new Error(body.error || "Could not post right now. Please try again later.");
            return body;
          });
        })
        .then(function (d) {
          store(K_SENT, new Date().toISOString().slice(0, 10));
          if (d && d.latest) { data = d; loading = Promise.resolve(d); updateBadge(); }
          showThanks();
        })
        .catch(function (err) {
          error.textContent = err.message;
          error.hidden = false;
          submit.textContent = "Post review";
          sync();
        });
    });

    sync();
    if (!state.stars && starBtns[0]) starBtns[0].focus({ preventScroll: true });
  }

  function showThanks() {
    panel.innerHTML = head("Thank you") +
      '<div class="rv-body rv-thanks">' + icon("heart", "rv-thanks-icon") +
      "<p><b>Your review is posted.</b></p>" +
      '<p class="rv-muted">Thank you for taking a moment — it really helps.</p>' +
      '<button type="button" class="rv-primary">See all reviews</button></div>';
    wireHead();
    panel.querySelector(".rv-primary").addEventListener("click", function () { renderList(); });
  }

  /* ---------- header button ---------- */

  function buildButton() {
    var header = document.querySelector(".site-header .wrap-wide, .site-header .wrap");
    if (!header) return;
    btn = document.createElement("button");
    btn.type = "button";
    btn.className = "rv-btn";
    btn.setAttribute("aria-haspopup", "dialog");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Reviews");
    btn.innerHTML = icon("chat") + '<span class="rv-badge" hidden></span>';
    var brand = header.querySelector(".brand");
    if (brand && brand.nextSibling) header.insertBefore(btn, brand.nextSibling);
    else header.appendChild(btn);
    btn.addEventListener("click", function () {
      if (panel && !panel.hidden) close();
      else open("list");
    });
    load().catch(function () {});
  }

  /* ---------- the one-time ask ---------- */

  function hidePrompt() {
    if (prompt && prompt.parentNode) prompt.parentNode.removeChild(prompt);
    prompt = null;
  }

  function mayAsk() {
    if (store(K_SENT)) return false;
    var later = Number(store(K_LATER) || 0);
    if (later && Date.now() - later < SNOOZE_MS) return false;
    if (panel && !panel.hidden) return false;
    if (document.querySelector(".tour-card")) return false;
    var a = document.activeElement;
    if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return false;
    return true;
  }

  function showPrompt() {
    if (prompt || !mayAsk()) return;
    prompt = document.createElement("div");
    prompt.className = "rv-prompt" + (document.querySelector(".rdr, .pbv, #pbv-canvas") ? " in-reader" : "");
    prompt.setAttribute("role", "dialog");
    prompt.setAttribute("aria-label", "Rate Deutsch Ecke");
    var stars = "";
    for (var i = 1; i <= 5; i++) {
      stars += '<button type="button" class="rv-star-btn" data-v="' + i + '" aria-label="' + i +
        (i === 1 ? " star" : " stars") + '">' + icon("star") + "</button>";
    }
    prompt.innerHTML =
      '<button type="button" class="rv-icon-btn rv-close" aria-label="Not now">' + icon("close") + "</button>" +
      "<strong>Enjoying Deutsch Ecke?</strong>" +
      '<p>How do you find it so far? No sign-up, ten seconds.</p>' +
      '<div class="rv-pick">' + stars + "</div>" +
      '<div class="rv-prompt-actions"><button type="button" class="rv-link rv-later">Not now</button>' +
      '<button type="button" class="rv-link rv-see">See reviews</button></div>';
    document.body.appendChild(prompt);

    prompt.addEventListener("keydown", function (e) { e.stopPropagation(); });

    function later() {
      store(K_LATER, Date.now());
      hidePrompt();
    }
    prompt.querySelector(".rv-close").addEventListener("click", later);
    prompt.querySelector(".rv-later").addEventListener("click", later);
    prompt.querySelector(".rv-see").addEventListener("click", function () {
      store(K_LATER, Date.now());
      open("list");
    });
    Array.prototype.forEach.call(prompt.querySelectorAll(".rv-star-btn"), function (b) {
      b.addEventListener("mouseenter", function () {
        var v = Number(b.getAttribute("data-v"));
        Array.prototype.forEach.call(prompt.querySelectorAll(".rv-star-btn"), function (o) {
          o.classList.toggle("on", Number(o.getAttribute("data-v")) <= v);
        });
      });
      b.addEventListener("click", function () {
        store(K_LATER, Date.now());
        open("form", Number(b.getAttribute("data-v")));
      });
    });
  }

  function track() {
    if (store(K_SENT)) return;
    var later = Number(store(K_LATER) || 0);
    if (later && Date.now() - later < SNOOZE_MS) return;

    window.setInterval(function () {
      if (document.visibilityState !== "visible" || !document.hasFocus()) return;
      var t = Number(store(K_TIME) || 0) + TICK_MS;
      store(K_TIME, t);
      if (t >= ASK_AFTER_MS) showPrompt();
    }, TICK_MS);
  }

  /* ---------- start ---------- */

  function start() {
    buildButton();
    track();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, { passive: true });
  }

  var css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = base + "css/reviews.css";
  css.onload = function () {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
    else start();
  };
  document.head.appendChild(css);

  /* ?reviews=ask shows the rating card straight away (for checking it) */
  if (/[?&]reviews=ask\b/.test(location.search)) {
    try { localStorage.removeItem(K_SENT); localStorage.removeItem(K_LATER); } catch (e) {}
    window.setTimeout(function () { showPrompt(); }, 1500);
  }
})();
