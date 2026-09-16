/* ============================================================
   Übungsbuch reader.

   The same mechanism as the Written Book reader (js/book-reader.js):
   the unit is laid out in real pages with CSS columns and turned
   sideways — one page on a phone, a two-page spread on a wide
   screen — and paging past the last page carries on into the next
   unit. It shares css/bookreader.css unchanged, so it looks and
   behaves identically.

   Two things a book chapter never had to deal with:

   1. Typed answers. Opening the phone keyboard fires a resize,
      and re-paginating mid-answer would throw you onto another
      page. Re-layout is therefore skipped while a field inside the
      flow has focus, and runs once on blur.

   2. Feedback that appears after marking. It changes the height of
      the content, so everything after it moves. The engine
      re-paginates and then jumps back to the page the anchor
      element actually landed on.

   Which part it reads — Lesen, Schreiben or Sprechen — comes from
   <body data-skill>. Depends on DE_PRACTICE (practice.js) and that
   part's unit file (practice-lesen.js, -schreiben.js, -sprechen.js).
   ============================================================ */

(function () {
  "use strict";

  var POS_KEY = "de-practice-position";
  var FONT_KEY = "a1-journey-book-font";   /* share the book's text size */
  var MODE_KEY = "de-practice-mode";
  var FONT_STEPS = [0.92, 1.02, 1.14, 1.28];
  var START_FONT = 1;

  var el = {};
  var units = [];
  var sk = null;
  var unit = null;
  var idx = 0;
  var page = 0;
  var pages = 1;
  var cols = 1;
  var step = 1;
  var drag = null;
  var settleTimer = null;
  var typing = false;

  function clamp(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }

  /* ---------- pagination ---------- */

  function wrapTables() {
    var tables = el.flow.querySelectorAll("table");
    for (var i = 0; i < tables.length; i++) {
      var t = tables[i];
      if (t.parentNode.className === "tbl-wrap") continue;
      var wrap = document.createElement("div");
      wrap.className = "tbl-wrap";
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    }
  }

  /* Which page a node has ended up on, measured rather than guessed —
     this is what lets the reader hold its place when the content grows. */
  function pageOfNode(node) {
    if (!node) return null;
    var fr = el.flow.getBoundingClientRect();
    var nr = node.getBoundingClientRect();
    return clamp(Math.round((nr.left - fr.left + el.flow.scrollLeft) / step), 0, pages - 1);
  }

  function layout(keepRatio, anchor) {
    var ratio = keepRatio && pages > 1 ? page / pages : 0;

    var cs = window.getComputedStyle(el.track);
    var padL = parseFloat(cs.paddingLeft);
    var padR = parseFloat(cs.paddingRight);
    var w = el.track.clientWidth - padL - padR;
    var h = el.track.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (!(w > 0) || !(h > 0)) return;

    var gap = padL + padR;

    cols = w >= 900 ? 2 : 1;
    el.stage.classList.toggle("spread", cols === 2);

    var colW = (w - (cols - 1) * gap) / cols;
    el.flow.style.columnWidth = colW + "px";
    el.flow.style.columnGap = gap + "px";
    el.flow.style.height = h + "px";
    el.flow.style.setProperty("--tbl-max", Math.max(220, h - 46) + "px");

    step = w + gap;

    var total = el.flow.scrollWidth;
    pages = Math.max(1, Math.round((total + gap) / step));

    if (anchor) {
      /* measure where the anchor landed after the reflow */
      el.flow.scrollLeft = 0;
      var p = pageOfNode(anchor);
      page = p === null ? 0 : p;
    } else {
      page = clamp(keepRatio ? Math.round(ratio * pages) : page, 0, pages - 1);
    }

    apply();
    updateMeta();
  }

  /* A page turn is a sideways scroll of the flow, never a transform:
     a transformed flow becomes a composited layer this engine promotes
     and drops each turn, leaving the old page painted under the new one. */
  function snapToPage() {
    var want = page * step;
    if (Math.abs(el.flow.scrollLeft - want) > 1) el.flow.scrollLeft = want;
  }

  /* Instant, never smooth: a smooth scroll restarts from wherever it got
     to, so quick turns land between two pages. */
  function apply() {
    el.flow.scrollLeft = page * step;
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(snapToPage, 120);
  }

  function updateMeta() {
    var frac = units.length
      ? (idx + (pages > 1 ? page / (pages - 1 || 1) : 1)) / units.length
      : 0;
    el.progress.style.width = clamp(frac * 100, 0, 100) + "%";
    el.pageLabel.innerHTML = "Page <b>" + (page + 1) + "</b> of " + pages;
    el.unitLabel.innerHTML = "Einheit <b>" + (idx + 1) + "</b> of " + units.length;
    savePosition();
  }

  function savePosition() {
    try {
      localStorage.setItem(POS_KEY, JSON.stringify({ id: unit.id, page: page }));
    } catch (e) {}
  }

  /* ---------- turning ---------- */

  function turn(dir) {
    if (el.root.classList.contains("scrollmode")) return;
    var target = page + dir;
    if (target < 0) return gotoUnit(idx - 1, "end");
    if (target >= pages) return gotoUnit(idx + 1, "start");
    page = target;
    apply();
    updateMeta();
  }

  function gotoUnit(newIdx, where) {
    if (newIdx < 0 || newIdx >= units.length) return;
    var url = "unit.html?u=" + units[newIdx].id;
    if (where === "end") url += "#end";
    window.location.href = url;
  }

  /* ---------- font size + mode ---------- */

  function applyFont(i) {
    i = clamp(i, 0, FONT_STEPS.length - 1);
    el.root.style.setProperty("--rdr-font", FONT_STEPS[i] + "rem");
    try {
      localStorage.setItem(FONT_KEY, String(i));
    } catch (e) {}
    window.setTimeout(function () { layout(true); }, 0);
    return i;
  }

  function applyMode(scrollMode) {
    el.root.classList.toggle("scrollmode", scrollMode);
    el.modeBtn.classList.toggle("on", scrollMode);
    el.modeBtn.setAttribute(
      "aria-label",
      scrollMode ? "Switch to page view" : "Switch to scroll view"
    );
    try {
      localStorage.setItem(MODE_KEY, scrollMode ? "scroll" : "page");
    } catch (e) {}
    if (scrollMode) {
      el.flow.scrollLeft = 0;
    } else {
      window.setTimeout(function () { layout(false); }, 0);
    }
  }

  /* ---------- drawer ---------- */

  function buildDrawer() {
    units.forEach(function (u, i) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "unit.html?u=" + u.id;
      if (u.id === unit.id) a.className = "here";
      a.innerHTML =
        '<span class="n">' + (i + 1) + "</span>" +
        '<span class="tt"><span class="de"></span><span class="en"></span></span>';
      a.querySelector(".de").textContent = u.title;
      a.querySelector(".en").textContent = u.subtitle || u.focus;
      li.appendChild(a);
      el.drawerList.appendChild(li);
    });
  }

  function setDrawer(open) {
    el.drawer.classList.toggle("open", open);
    el.scrim.classList.toggle("open", open);
    if (open) {
      var here = el.drawerList.querySelector("a.here");
      if (here) here.scrollIntoView({ block: "center" });
    }
  }

  function appendEndCard() {
    var next = units[idx + 1];
    var card = document.createElement("div");
    card.className = "rdr-end";
    if (next) {
      card.innerHTML =
        '<span class="done">Ende dieser Einheit</span><span class="nxt"></span>' +
        '<span class="hintline">Keep turning to carry straight on.</span>';
      card.querySelector(".nxt").textContent = "Weiter: " + next.title;
    } else if (sk.next) {
      card.innerHTML =
        '<span class="done">Ende von ' + sk.label + "</span>" +
        '<a class="nxt" href="../' + sk.next.key + '/index.html">Weiter mit ' + sk.next.label + " &rarr;</a>" +
        '<span class="hintline">Or open the contents to go back to any unit.</span>';
    } else {
      card.innerHTML =
        '<span class="done">Ende von ' + sk.label + "</span>" +
        '<a class="nxt" href="../index.html">Zurück zum Übungsbuch</a>' +
        '<span class="hintline">Or open the contents to go back to any unit.</span>';
    }
    el.flow.appendChild(card);
  }

  /* ---------- gestures ---------- */

  function onDown(e) {
    /* never start a page-turn drag on something you are meant to tap or type in */
    if (e.target.closest && e.target.closest("a, button, select, input, textarea, label")) return;
    if (el.root.classList.contains("scrollmode")) return;
    drag = { x: e.clientX, y: e.clientY };
  }

  function onUp(e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    var dy = e.clientY - drag.y;
    drag = null;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    turn(dx < 0 ? 1 : -1);
  }

  /* ---------- init ---------- */

  function init() {
    el.root = document.getElementById("rdr");
    if (!el.root) return;

    el.stage = document.getElementById("rdr-stage");
    el.track = document.getElementById("rdr-track");
    el.flow = document.getElementById("rdr-flow");
    el.progress = document.getElementById("rdr-progress");
    el.pageLabel = document.getElementById("rdr-page-label");
    el.unitLabel = document.getElementById("rdr-unit-label");
    el.drawer = document.getElementById("rdr-drawer");
    el.drawerList = document.getElementById("rdr-drawer-list");
    el.scrim = document.getElementById("rdr-scrim");
    el.modeBtn = document.getElementById("rdr-mode");

    sk = DE_PRACTICE.skill(document.body.getAttribute("data-skill") || "lesen");
    units = sk.units;
    var want = new URLSearchParams(location.search).get("u");
    idx = Math.max(0, units.findIndex(function (u) { return u.id === want; }));
    unit = units[idx];
    if (!unit) return;

    document.title = unit.title + " — " + sk.label + " — Übungsbuch — Deutsch Ecke";
    var nameEl = document.getElementById("rdr-name");
    if (nameEl) nameEl.textContent = unit.title;

    el.flow.innerHTML = DE_PRACTICE.render(unit, sk.key);
    /* Re-paginate synchronously. The DOM is already updated by the time
       this runs, and reading scrollWidth forces the layout anyway — doing
       it in requestAnimationFrame would silently never happen while the
       page is hidden, leaving the pages after the feedback unreachable. */
    DE_PRACTICE.wire(unit, el.flow, function (anchor) {
      layout(false, anchor);
    });

    buildDrawer();
    appendEndCard();
    wrapTables();

    document.getElementById("rdr-contents").addEventListener("click", function () {
      setDrawer(true);
    });
    document.getElementById("rdr-drawer-close").addEventListener("click", function () {
      setDrawer(false);
    });
    el.scrim.addEventListener("click", function () { setDrawer(false); });

    var fontIdx = START_FONT;
    try {
      var saved = localStorage.getItem(FONT_KEY);
      if (saved !== null) fontIdx = parseInt(saved, 10);
    } catch (e) {}
    fontIdx = clamp(isNaN(fontIdx) ? START_FONT : fontIdx, 0, FONT_STEPS.length - 1);
    el.root.style.setProperty("--rdr-font", FONT_STEPS[fontIdx] + "rem");

    document.getElementById("rdr-font-in").addEventListener("click", function () {
      fontIdx = applyFont(fontIdx + 1);
    });
    document.getElementById("rdr-font-out").addEventListener("click", function () {
      fontIdx = applyFont(fontIdx - 1);
    });

    el.modeBtn.addEventListener("click", function () {
      applyMode(!el.root.classList.contains("scrollmode"));
    });

    document.getElementById("rdr-turn-back").addEventListener("click", function () { turn(-1); });
    document.getElementById("rdr-turn-fwd").addEventListener("click", function () { turn(1); });

    el.flow.addEventListener("scrollend", snapToPage);

    el.stage.addEventListener("pointerdown", onDown);
    el.stage.addEventListener("pointerup", onUp);
    el.stage.addEventListener("pointercancel", function () { drag = null; });

    /* The keyboard guard. Focusing a field opens the phone keyboard, which
       fires resize; re-paginating then would move the field out from under
       the cursor. Hold the layout still until the field is done with. */
    el.flow.addEventListener("focusin", function (e) {
      if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) {
        typing = true;
        window.setTimeout(snapToPage, 0);
      }
    });
    el.flow.addEventListener("focusout", function (e) {
      if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) {
        typing = false;
        window.setTimeout(snapToPage, 0);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.target && /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      switch (e.key) {
        case "ArrowRight": case "PageDown": case " ": turn(1); break;
        case "ArrowLeft": case "PageUp": turn(-1); break;
        case "Escape": setDrawer(false); break;
        case "c": case "C": setDrawer(!el.drawer.classList.contains("open")); break;
        default: return;
      }
      e.preventDefault();
    });

    var resizeTimer;
    window.addEventListener("resize", function () {
      if (typing) return;           /* keyboard is open — leave the page alone */
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () { layout(true); }, 140);
    });

    var scrollMode = false;
    try {
      scrollMode = localStorage.getItem(MODE_KEY) === "scroll";
    } catch (e) {}

    layout(false);
    if (window.location.hash === "#end") {
      page = pages - 1;
      apply();
      updateMeta();
    }
    if (scrollMode) applyMode(true);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { layout(true); });
    }
    window.addEventListener("load", function () { layout(true); });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
