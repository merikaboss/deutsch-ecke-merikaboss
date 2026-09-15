/* ============================================================
   Picture Book reader.

   One screen, no scrolling. Page turns happen in place (no
   reload), the sheet can be zoomed and panned, and on touch you
   swipe sideways to turn the page. Depends on CHAPTERS from
   chapters.js.
   ============================================================ */

(function () {
  "use strict";

  var RESUME_KEY = "a1-journey-picture-book-last";
  var MIN_SCALE = 1;
  var MAX_SCALE = 6;
  var TAP_SCALE = 2.4;
  var SWIPE_COMMIT = 60;

  var el = {};
  var idx = 0;
  var fromParam = null;
  var scale = 1;
  var tx = 0;
  var ty = 0;
  var baseScale = 1;
  var userZoomed = false;

  var pointers = new Map();
  var drag = null;
  var pinch = null;

  /* ---------- helpers ---------- */

  function findIndexById(id) {
    for (var i = 0; i < CHAPTERS.length; i++) {
      if (CHAPTERS[i].id === id) return i;
    }
    return -1;
  }

  function clamp(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }

  function stageSize() {
    var r = el.stage.getBoundingClientRect();
    return { w: r.width, h: r.height, left: r.left, top: r.top };
  }

  /* ---------- transform ---------- */

  function clampPan() {
    var s = stageSize();
    if (scale <= 1) {
      tx = 0;
      ty = 0;
      return;
    }
    var minX = s.w - s.w * scale;
    var minY = s.h - s.h * scale;
    tx = clamp(tx, minX, 0);
    ty = clamp(ty, minY, 0);
  }

  function applyTransform(animate) {
    el.canvas.classList.toggle("animate", !!animate);
    el.canvas.style.transform =
      "translate(" + tx + "px, " + ty + "px) scale(" + scale + ")";
    el.stage.classList.toggle("zoomed", scale > 1.01);
    if (el.zoomLevel) el.zoomLevel.textContent = Math.round(scale * 100) + "%";
    if (el.zoomOut) el.zoomOut.classList.toggle("is-off", scale <= MIN_SCALE + 0.01);
    if (el.zoomIn) el.zoomIn.classList.toggle("is-off", scale >= MAX_SCALE - 0.01);
  }

  function zoomAt(newScale, px, py, animate) {
    newScale = clamp(newScale, MIN_SCALE, MAX_SCALE);
    var ratio = newScale / scale;
    tx = px - (px - tx) * ratio;
    ty = py - (py - ty) * ratio;
    scale = newScale;
    clampPan();
    applyTransform(animate);
  }

  function resetZoom(animate) {
    scale = baseScale;
    tx = 0;
    ty = 0;
    clampPan();
    applyTransform(animate);
  }

  /* These sheets are dense multi-column reference pages, so fitting one
     whole on a phone renders it far below its native resolution and the
     handwriting turns to mush. One tap therefore jumps to roughly 1:1
     with the original pixels, which is the size it actually reads at. */
  function readingScale() {
    if (!el.img.clientWidth || !el.img.naturalWidth) return TAP_SCALE;
    return clamp(el.img.naturalWidth / el.img.clientWidth, 2, MAX_SCALE);
  }

  /* ---------- page rendering ---------- */

  function render(newIdx, animateTurn) {
    var chapter = CHAPTERS[newIdx];
    if (!chapter) return;
    idx = newIdx;

    userZoomed = false;
    baseScale = 1;
    resetZoom(false);

    el.titleDe.textContent = chapter.de;
    el.titleEn.textContent = chapter.en;
    el.counter.innerHTML = "<b>" + (idx + 1) + "</b> / " + CHAPTERS.length;
    el.progress.style.width = ((idx + 1) / CHAPTERS.length) * 100 + "%";

    if (el.syllabus) {
      el.syllabus.textContent = chapter.syllabus
        ? (/^\d/.test(chapter.syllabus)
            ? "Syllabus #" + chapter.syllabus
            : "(" + chapter.syllabus + ")")
        : "";
    }

    if (el.jump) el.jump.value = chapter.id;

    el.prev.classList.toggle("is-off", idx <= 0);
    el.next.classList.toggle("is-off", idx >= CHAPTERS.length - 1);

    document.title = chapter.de + " — Picture Book — Deutsch Ecke";

    loadImage(chapter, animateTurn);
    updateUrl(chapter);
    preloadNeighbours();

    try {
      localStorage.setItem(RESUME_KEY, chapter.id);
    } catch (e) {
      /* private browsing — resume link just won't show */
    }
  }

  function loadImage(chapter, animateTurn) {
    var thumb = "../assets/thumbs/" + chapter.file;
    var full = "../assets/images/" + chapter.file;
    var myIdx = idx;

    if (animateTurn) el.stage.classList.add("is-turning");
    el.loading.classList.add("on");

    // show the small version immediately, then sharpen to full size
    el.img.src = thumb;
    el.img.alt = chapter.de + " (" + chapter.en + ")";

    var hi = new Image();
    hi.onload = function () {
      if (myIdx !== idx) return;
      el.img.src = full;
      el.stage.classList.remove("is-turning");
      el.loading.classList.remove("on");
    };
    hi.onerror = function () {
      if (myIdx !== idx) return;
      el.stage.classList.remove("is-turning");
      el.loading.classList.remove("on");
    };
    hi.src = full;

    window.setTimeout(function () {
      if (myIdx === idx) el.stage.classList.remove("is-turning");
    }, 320);
  }

  function preloadNeighbours() {
    [idx - 1, idx + 1].forEach(function (i) {
      if (i < 0 || i >= CHAPTERS.length) return;
      var im = new Image();
      im.src = "../assets/images/" + CHAPTERS[i].file;
    });
  }

  function updateUrl(chapter) {
    var url = "page.html?n=" + chapter.id;
    if (fromParam) url += "&from=" + fromParam;
    try {
      history.replaceState(null, "", url);
    } catch (e) {
      /* file:// or blocked history — URL just won't track */
    }
  }

  function go(delta) {
    var target = idx + delta;
    if (target < 0 || target >= CHAPTERS.length) return;
    render(target, true);
  }

  /* ---------- pointer: pan, pinch, swipe, tap ---------- */

  function isChrome(target) {
    return !!(target.closest && target.closest("button, a, select, .pbv-tools, .pbv-nav"));
  }

  function onPointerDown(e) {
    if (isChrome(e.target)) return;
    el.stage.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 2) {
      userZoomed = true;
      startPinch();
      drag = null;
      return;
    }

    drag = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      startTx: tx,
      startTy: ty,
      moved: 0,
      time: Date.now()
    };
    el.stage.classList.add("grabbing");
  }

  function startPinch() {
    var pts = Array.from(pointers.values());
    var s = stageSize();
    pinch = {
      dist: distance(pts[0], pts[1]),
      scale0: scale,
      tx0: tx,
      ty0: ty,
      cx: (pts[0].x + pts[1].x) / 2 - s.left,
      cy: (pts[0].y + pts[1].y) / 2 - s.top
    };
  }

  function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function onPointerMove(e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.size === 2 && pinch) {
      var pts = Array.from(pointers.values());
      var d = distance(pts[0], pts[1]);
      if (pinch.dist > 0) {
        // measured from where the pinch started, so the gesture can't drift
        var target = clamp(pinch.scale0 * (d / pinch.dist), MIN_SCALE, MAX_SCALE);
        var ratio = target / pinch.scale0;
        tx = pinch.cx - (pinch.cx - pinch.tx0) * ratio;
        ty = pinch.cy - (pinch.cy - pinch.ty0) * ratio;
        scale = target;
        clampPan();
        applyTransform(false);
      }
      return;
    }

    if (!drag || e.pointerId !== drag.id) return;

    var dx = e.clientX - drag.startX;
    var dy = e.clientY - drag.startY;
    drag.moved = Math.max(drag.moved, Math.abs(dx) + Math.abs(dy));

    if (scale > 1.01) {
      tx = drag.startTx + dx;
      ty = drag.startTy + dy;
      clampPan();
      applyTransform(false);
    } else if (Math.abs(dx) > Math.abs(dy)) {
      // rubber-band the sheet sideways to show the page is turning
      var edge =
        (dx > 0 && idx === 0) || (dx < 0 && idx === CHAPTERS.length - 1);
      var pull = dx * (edge ? 0.18 : 0.55);
      el.canvas.classList.remove("animate");
      el.canvas.style.transform = "translate(" + pull + "px, 0) scale(1)";
    }
  }

  function onPointerUp(e) {
    var wasDrag = drag && e.pointerId === drag.id;
    pointers.delete(e.pointerId);
    el.stage.classList.remove("grabbing");

    if (pointers.size < 2) pinch = null;
    if (!wasDrag) return;

    var dx = e.clientX - drag.startX;
    var dy = e.clientY - drag.startY;
    var quick = Date.now() - drag.time < 400;
    var d = drag;
    drag = null;

    if (scale <= 1.01) {
      if (Math.abs(dx) > SWIPE_COMMIT && Math.abs(dx) > Math.abs(dy)) {
        applyTransform(true);
        go(dx < 0 ? 1 : -1);
        return;
      }
      applyTransform(true);
    }

    // a real tap (barely moved) toggles zoom at that point
    if (d.moved < 8 && quick) {
      var s = stageSize();
      userZoomed = true;
      if (scale > baseScale * 1.05) {
        resetZoom(true);
      } else {
        zoomAt(readingScale(), e.clientX - s.left, e.clientY - s.top, true);
      }
    }
  }

  function onWheel(e) {
    e.preventDefault();
    var s = stageSize();
    userZoomed = true;
    var factor = e.deltaY < 0 ? 1.18 : 1 / 1.18;
    zoomAt(scale * factor, e.clientX - s.left, e.clientY - s.top, false);
  }

  /* ---------- fullscreen ---------- */

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(function () {});
    }
  }

  /* ---------- wiring ---------- */

  function buildJump() {
    if (!el.jump) return;
    el.jump.innerHTML = "";
    CHAPTERS.forEach(function (c, i) {
      var opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = i + 1 + ". " + c.de + " — " + c.en;
      el.jump.appendChild(opt);
    });
    el.jump.addEventListener("change", function () {
      var target = findIndexById(el.jump.value);
      if (target !== -1) render(target, true);
    });
  }

  function setupBackToChapter() {
    if (!el.backChapter) return;
    var i = fromParam ? findIndexById(fromParam) : -1;
    if (i === -1) {
      el.backChapter.hidden = true;
      return;
    }
    el.backChapter.hidden = false;
    el.backChapter.href = "../book/chapter-" + fromParam + ".html";
    el.backLabel.textContent = "Back to “" + CHAPTERS[i].de + "”";
  }

  function dismissHint() {
    if (!el.hint) return;
    el.hint.classList.add("gone");
  }

  function init() {
    el.stage = document.getElementById("pbv-stage");
    if (!el.stage) return;

    el.canvas = document.getElementById("pbv-canvas");
    el.img = document.getElementById("pbv-image");
    el.titleDe = document.getElementById("pbv-title-de");
    el.titleEn = document.getElementById("pbv-title-en");
    el.counter = document.getElementById("pbv-counter");
    el.syllabus = document.getElementById("pbv-syllabus");
    el.jump = document.getElementById("pbv-jump");
    el.prev = document.getElementById("pbv-prev");
    el.next = document.getElementById("pbv-next");
    el.zoomIn = document.getElementById("pbv-zoom-in");
    el.zoomOut = document.getElementById("pbv-zoom-out");
    el.zoomLevel = document.getElementById("pbv-zoom-level");
    el.fullscreen = document.getElementById("pbv-fullscreen");
    el.progress = document.getElementById("pbv-progress");
    el.loading = document.getElementById("pbv-loading");
    el.hint = document.getElementById("pbv-hint");
    el.backChapter = document.getElementById("pbv-back-chapter");
    el.backLabel = document.getElementById("pbv-back-label");

    var params = new URLSearchParams(window.location.search);
    fromParam = params.get("from");
    var start = params.get("n") ? findIndexById(params.get("n")) : 0;
    if (start === -1) start = 0;

    buildJump();
    setupBackToChapter();

    el.prev.addEventListener("click", function () { go(-1); });
    el.next.addEventListener("click", function () { go(1); });
    el.zoomIn.addEventListener("click", function () {
      var s = stageSize();
      userZoomed = true;
      zoomAt(scale * 1.5, s.w / 2, s.h / 2, true);
    });
    el.zoomOut.addEventListener("click", function () {
      var s = stageSize();
      userZoomed = true;
      zoomAt(scale / 1.5, s.w / 2, s.h / 2, true);
    });
    if (el.fullscreen) el.fullscreen.addEventListener("click", toggleFullscreen);

    el.stage.addEventListener("pointerdown", onPointerDown);
    el.stage.addEventListener("pointermove", onPointerMove);
    el.stage.addEventListener("pointerup", onPointerUp);
    el.stage.addEventListener("pointercancel", onPointerUp);
    el.stage.addEventListener("wheel", onWheel, { passive: false });
    el.stage.addEventListener("dragstart", function (e) { e.preventDefault(); });

    ["pointerdown", "keydown"].forEach(function (evt) {
      window.addEventListener(evt, dismissHint, { once: true });
    });
    window.setTimeout(dismissHint, 6000);

    document.addEventListener("keydown", function (e) {
      if (e.target && /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      var s = stageSize();
      switch (e.key) {
        case "ArrowRight": go(1); break;
        case "ArrowLeft": go(-1); break;
        case "Home": render(0, true); break;
        case "End": render(CHAPTERS.length - 1, true); break;
        case "+": case "=": zoomAt(scale * 1.5, s.w / 2, s.h / 2, true); break;
        case "-": case "_": zoomAt(scale / 1.5, s.w / 2, s.h / 2, true); break;
        case "0": case "Escape": resetZoom(true); break;
        case "f": case "F": toggleFullscreen(); break;
        default: return;
      }
      e.preventDefault();
    });

    window.addEventListener("resize", function () {
      clampPan();
      applyTransform(false);
    });

    render(start, false);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
