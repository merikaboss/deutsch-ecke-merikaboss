/* ============================================================
   Written Book reader.

   Lays the chapter out in real pages using CSS columns and turns
   them sideways — one page on a phone, a two-page spread on a
   wide screen. Paging past the last page carries straight on
   into the next chapter, so there are no prev/next buttons.

   Depends on CHAPTERS (chapters.js) and WRITTEN_CHAPTERS
   (book-progress.js).
   ============================================================ */

(function () {
  "use strict";

  var POS_KEY = "a1-journey-book-position";
  var FONT_KEY = "a1-journey-book-font";
  var MODE_KEY = "a1-journey-book-mode";
  var GAP = 56;
  var FONT_STEPS = [0.92, 1.02, 1.14, 1.28];

  var el = {};
  var chapterId = null;
  var idx = -1;
  var readable = [];
  var page = 0;
  var pages = 1;
  var cols = 1;
  var step = 1;
  var drag = null;
  var settleTimer = null;

  function clamp(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }

  function readableList() {
    var written = (typeof WRITTEN_CHAPTERS !== "undefined") ? WRITTEN_CHAPTERS : [];
    return CHAPTERS.filter(function (c) {
      return written.indexOf(c.id) !== -1;
    });
  }

  function posInReadable(id) {
    for (var i = 0; i < readable.length; i++) {
      if (readable[i].id === id) return i;
    }
    return -1;
  }

  /* ---------- pagination ---------- */

  // Every table goes in a wrapper that scrolls and is capped at one page
  // (see bookreader.css). A table that fragments across a column break is
  // painted across both pages at once by this engine — its box really does
  // span them — and an unsplittable table taller than a page spills onto the
  // facing page. A capped scroller can do neither.
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

  function layout(keepRatio) {
    var ratio = keepRatio && pages > 1 ? page / pages : 0;

    // clientWidth/Height include the track's padding, but the columns are
    // laid out in its content box — measure that, or every page overflows.
    var cs = window.getComputedStyle(el.track);
    var padL = parseFloat(cs.paddingLeft);
    var padR = parseFloat(cs.paddingRight);
    var w = el.track.clientWidth - padL - padR;
    var h = el.track.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (!(w > 0) || !(h > 0)) return;

    // overflow:hidden clips at the padding box, so the gutter has to be at
    // least as wide as the two facing page margins or the next page peeks
    // through. Making it exactly that also gives every page equal margins.
    var gap = padL + padR;

    cols = w >= 900 ? 2 : 1;
    el.stage.classList.toggle("spread", cols === 2);

    var colW = (w - (cols - 1) * gap) / cols;
    el.flow.style.columnWidth = colW + "px";
    el.flow.style.columnGap = gap + "px";
    el.flow.style.height = h + "px";
    // leave room for the padding and heading of the box a table sits in
    el.flow.style.setProperty("--tbl-max", Math.max(220, h - 46) + "px");

    step = w + gap;

    // force reflow before measuring
    var total = el.flow.scrollWidth;
    pages = Math.max(1, Math.round((total + gap) / step));

    page = clamp(keepRatio ? Math.round(ratio * pages) : page, 0, pages - 1);
    apply(false);
    updateMeta();
  }

  // Turning a page scrolls the flow sideways. Transforming the text instead
  // leaves the previous page painted underneath the new one on this engine,
  // so the two pages' words overlap.
  //
  // A smooth scroll restarts from wherever it has got to, so turning several
  // pages quickly leaves the text stranded between two pages, with a strip of
  // the previous one still showing. Snapping once the scrolling has stopped
  // puts the page exactly where it belongs.
  function snapToPage() {
    var want = page * step;
    if (Math.abs(el.flow.scrollLeft - want) > 1) el.flow.scrollLeft = want;
  }

  // `animate` is kept for the callers but deliberately ignored: turns are
  // instant, so a page always lands exactly on its column.
  function apply(animate) {
    el.flow.scrollLeft = page * step;
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(snapToPage, 120);
  }

  function updateMeta() {
    var done = idx >= 0 ? idx : 0;
    var frac = readable.length
      ? (done + (pages > 1 ? page / (pages - 1 || 1) : 1) ) / readable.length
      : 0;
    el.progress.style.width = clamp(frac * 100, 0, 100) + "%";
    el.pageLabel.innerHTML =
      "Page <b>" + (page + 1) + "</b> of " + pages;
    el.chapLabel.innerHTML =
      "Chapter <b>" + (idx + 1) + "</b> of " + readable.length;
    savePosition();
  }

  function savePosition() {
    try {
      localStorage.setItem(POS_KEY, JSON.stringify({ id: chapterId, page: page }));
    } catch (e) {
      /* storage blocked — resume just won't work */
    }
  }

  /* ---------- turning ---------- */

  function turn(dir) {
    if (el.root.classList.contains("scrollmode")) return;
    var target = page + dir;

    if (target < 0) return gotoChapter(idx - 1, "end");
    if (target >= pages) return gotoChapter(idx + 1, "start");

    page = target;
    apply(true);
    updateMeta();
  }

  function gotoChapter(newIdx, where) {
    if (newIdx < 0 || newIdx >= readable.length) return;
    var url = "chapter-" + readable[newIdx].id + ".html";
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
    window.requestAnimationFrame(function () { layout(true); });
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
      window.requestAnimationFrame(function () { layout(false); });
    }
  }

  /* ---------- drawer ---------- */

  function buildDrawer() {
    readable.forEach(function (c, i) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "chapter-" + c.id + ".html";
      if (c.id === chapterId) a.className = "here";
      a.innerHTML =
        '<span class="n">' + (i + 1) + '</span>' +
        '<span class="tt"><span class="de"></span><span class="en"></span></span>';
      a.querySelector(".de").textContent = c.de;
      a.querySelector(".en").textContent = c.en;
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

  /* ---------- end-of-chapter card ---------- */

  function appendEndCard() {
    var next = readable[idx + 1];
    var card = document.createElement("div");
    card.className = "rdr-end";
    if (next) {
      card.innerHTML =
        '<span class="done">End of this chapter</span>' +
        '<span class="nxt"></span>' +
        '<span class="hintline">Keep turning to carry straight on.</span>';
      card.querySelector(".nxt").textContent = "Next: " + next.de + " (" + next.en + ")";
    } else {
      card.innerHTML =
        '<span class="done">You reached the end</span>' +
        '<span class="nxt">That is the whole A1 book.</span>' +
        '<span class="hintline">Open the contents to go back to any chapter.</span>';
    }
    el.flow.appendChild(card);
  }

  /* ---------- gestures ---------- */

  function onDown(e) {
    if (e.target.closest && e.target.closest("a, button, select")) return;
    if (el.root.classList.contains("scrollmode")) return;
    drag = { x: e.clientX, y: e.clientY, t: Date.now() };
  }

  function onUp(e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    var dy = e.clientY - drag.y;
    var d = drag;
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
    el.chapLabel = document.getElementById("rdr-chap-label");
    el.drawer = document.getElementById("rdr-drawer");
    el.drawerList = document.getElementById("rdr-drawer-list");
    el.scrim = document.getElementById("rdr-scrim");
    el.modeBtn = document.getElementById("rdr-mode");

    chapterId = document.body.getAttribute("data-chapter");
    readable = readableList();
    idx = posInReadable(chapterId);

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

    var fontIdx = 1;
    try {
      var saved = localStorage.getItem(FONT_KEY);
      if (saved !== null) fontIdx = parseInt(saved, 10) || 0;
    } catch (e) {}
    el.root.style.setProperty("--rdr-font", FONT_STEPS[clamp(fontIdx, 0, 3)] + "rem");

    document.getElementById("rdr-font").addEventListener("click", function () {
      fontIdx = applyFont((fontIdx + 1) % FONT_STEPS.length);
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
      apply(false);
      updateMeta();
    }
    if (scrollMode) applyMode(true);

    // fonts land after first paint and change how the text flows
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { layout(true); });
    }
    window.addEventListener("load", function () { layout(true); });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
