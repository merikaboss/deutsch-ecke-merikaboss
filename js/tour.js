/* ============================================================
   First-visit guide.

   Points at one control at a time with a small card: what the
   button does, then Next. Skip ends it. It runs once per page
   type and is remembered, so it never gets in the way again.

   Add ?tour=1 to any address to see it again.
   ============================================================ */

(function () {
  "use strict";

  var VERSION = "v1";

  // Steps are looked up by the page's data-page. A step is dropped if its
  // element isn't on the page (or is hidden at this screen size), so the
  // same list works on a phone and on a desktop.
  var TOURS = {
    "book-chapter": {
      key: "book",
      steps: [
        {
          sel: "#rdr-turn-fwd",
          title: "Turn the page",
          text: "Tap this arrow for the next page, or swipe the page to the left. The arrow on the other side goes back."
        },
        {
          sel: "#rdr-font-out",
          title: "Text size",
          text: "These two buttons make the text smaller or bigger. Whatever you pick is remembered for next time."
        },
        {
          sel: "#rdr-mode",
          title: "Page view or scrolling",
          text: "Switch between turning pages and one long scroll. Scrolling is handy for the big tables."
        },
        {
          sel: "#rdr-contents",
          title: "All 56 chapters",
          text: "Open the contents to jump straight to any chapter."
        },
        {
          sel: ".rdr-foot-row",
          title: "Where you are",
          text: "The chapter and page you're on, with a progress bar for the whole book."
        }
      ]
    },

    "picture-book-reader": {
      key: "picture",
      steps: [
        {
          sel: "#pbv-canvas",
          title: "The topic sheet",
          text: "Tap the sheet to zoom in so the handwriting is readable, and tap again to fit it back on screen."
        },
        {
          sel: "#pbv-next",
          title: "Next topic",
          text: "These arrows move between the 54 sheets. Swiping sideways does the same."
        },
        {
          sel: "#pbv-zoom-in",
          title: "Zoom",
          text: "Zoom in and out step by step. The size you're at is shown between the two buttons."
        },
        {
          sel: "#pbv-fullscreen",
          title: "Full screen",
          text: "Hide everything else so the sheet fills the whole screen."
        },
        {
          sel: "#pbv-jump",
          title: "Jump to a topic",
          text: "Pick any topic from this list instead of paging through them."
        }
      ]
    },

    "practice-unit": {
      key: "practice",
      steps: [
        {
          sel: ".rdr-title",
          title: "How a unit works",
          text: "Each unit starts with what you need to know, then the tasks. Read it page by page, like the Written Book."
        },
        {
          sel: "#rdr-turn-fwd",
          title: "Turn the page",
          text: "Tap this arrow for the next page, or swipe the page to the left. The arrow on the other side goes back."
        },
        {
          sel: "#rdr-font-out",
          title: "Text size",
          text: "Make the text smaller or bigger. The size is shared with the Written Book and remembered."
        },
        {
          sel: "#rdr-mode",
          title: "Page view or scrolling",
          text: "Switch between turning pages and one long scroll, whichever is easier while you type."
        },
        {
          sel: "#rdr-contents",
          title: "All units",
          text: "Open the list to jump to any unit in this part."
        },
        {
          sel: ".rdr-foot-row",
          title: "Check your answers",
          text: "At the end of the tasks, one button marks everything and explains mistakes. Your result is saved on this device."
        }
      ]
    },

    // No tour on the A1 landing page on purpose: it reveals its cards as you
    // scroll, so a first-visit guide there either points below the fold or
    // fights the animation. The cards already explain both books in words.
  };

  var tour = null;
  var steps = [];
  var at = 0;
  var scrim = null;
  var ring = null;
  var card = null;

  function storeKey() {
    return "de-tour-" + tour.key + "-" + VERSION;
  }

  function seen() {
    try {
      return localStorage.getItem(storeKey()) === "1";
    } catch (e) {
      return false;
    }
  }

  function remember() {
    try {
      localStorage.setItem(storeKey(), "1");
    } catch (e) {
      /* storage blocked — the guide will simply show again */
    }
  }

  function visible(el) {
    if (!el) return false;
    var r = el.getBoundingClientRect();
    if (!(r.width > 4 && r.height > 4)) return false;
    // It must also be on screen: scrolling an ordinary page to reach a step
    // is unreliable here, because the landing page only reveals its cards as
    // you scroll, and a step aimed below the fold would frame an empty patch.
    // A plain overlap test — controls pinned to the very top or bottom edge,
    // like the footer, still count.
    return r.top < window.innerHeight && r.bottom > 0;
  }

  function build() {
    scrim = document.createElement("div");
    scrim.className = "tour-scrim";

    ring = document.createElement("div");
    ring.className = "tour-ring";

    card = document.createElement("div");
    card.className = "tour-card";
    card.setAttribute("role", "dialog");
    card.innerHTML =
      '<h4></h4><p></p>' +
      '<div class="tour-foot">' +
      '<span class="tour-count"></span>' +
      '<span class="tour-btns">' +
      '<button type="button" class="tour-skip">Skip</button>' +
      '<button type="button" class="tour-next">Next</button>' +
      "</span></div>";

    document.body.appendChild(scrim);
    document.body.appendChild(ring);
    document.body.appendChild(card);

    scrim.addEventListener("click", next);
    card.querySelector(".tour-next").addEventListener("click", next);
    card.querySelector(".tour-skip").addEventListener("click", finish);
    window.addEventListener("resize", place);
    document.addEventListener("keydown", onKey, true);
  }

  function place() {
    if (!tour || !steps[at]) return;
    var el = document.querySelector(steps[at].sel);
    if (!el) return;

    var r = el.getBoundingClientRect();
    var pad = 6;
    ring.style.top = (r.top - pad) + "px";
    ring.style.left = (r.left - pad) + "px";
    ring.style.width = (r.width + pad * 2) + "px";
    ring.style.height = (r.height + pad * 2) + "px";

    var cw = card.offsetWidth;
    var ch = card.offsetHeight;
    var gap = 14;
    var vw = window.innerWidth;
    var vh = window.innerHeight;

    // below the control when there is room, otherwise above it
    var top = r.bottom + gap;
    if (top + ch > vh - 10) top = r.top - gap - ch;
    if (top < 10) top = Math.max(10, Math.min(vh - ch - 10, r.bottom + gap));

    var left = r.left + r.width / 2 - cw / 2;
    left = Math.max(12, Math.min(left, vw - cw - 12));

    card.style.top = Math.round(top) + "px";
    card.style.left = Math.round(left) + "px";
  }

  function show() {
    var step = steps[at];
    card.querySelector("h4").textContent = step.title;
    card.querySelector("p").textContent = step.text;
    card.querySelector(".tour-count").textContent =
      (at + 1) + " / " + steps.length;
    card.querySelector(".tour-next").textContent =
      at === steps.length - 1 ? "Got it" : "Next";

    // On an ordinary scrolling page the target may be far down. Scroll to it
    // first, then measure — and measure again a moment later, because the
    // position read immediately after a scroll is still the old one.
    var el = document.querySelector(step.sel);
    if (el && el.scrollIntoView) {
      var r = el.getBoundingClientRect();
      if (r.top < 60 || r.bottom > window.innerHeight - 60) {
        el.scrollIntoView({ block: "center", behavior: "auto" });
      }
    }
    window.requestAnimationFrame(place);
    window.setTimeout(place, 120);
    window.setTimeout(place, 340);
  }

  function next() {
    if (at >= steps.length - 1) return finish();
    at++;
    show();
  }

  function back() {
    if (at === 0) return;
    at--;
    show();
  }

  function onKey(e) {
    if (!tour) return;
    if (e.key === "Escape") finish();
    else if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") next();
    else if (e.key === "ArrowLeft") back();
    else return;
    e.preventDefault();
    e.stopPropagation();
  }

  function finish() {
    if (!tour) return;
    remember();
    document.removeEventListener("keydown", onKey, true);
    window.removeEventListener("resize", place);
    [scrim, ring, card].forEach(function (n) {
      if (n && n.parentNode) n.parentNode.removeChild(n);
    });
    scrim = ring = card = null;
    tour = null;
  }

  function start(force) {
    var page = document.body.getAttribute("data-page");
    var found = TOURS[page];
    if (!found) return;

    tour = found;
    if (!force && seen()) {
      tour = null;
      return;
    }

    steps = found.steps.filter(function (s) {
      return visible(document.querySelector(s.sel));
    });
    if (!steps.length) {
      tour = null;
      return;
    }

    at = 0;
    // Bring the first target into view before anything is drawn, so the very
    // first card is already in the right place rather than jumping there.
    var first = document.querySelector(steps[0].sel);
    if (first && first.scrollIntoView) {
      var fr = first.getBoundingClientRect();
      if (fr.top < 60 || fr.bottom > window.innerHeight - 60) {
        first.scrollIntoView({ block: "center", behavior: "auto" });
      }
    }
    build();
    show();
  }

  window.DE_TOUR = {
    start: function () { if (!tour) start(true); },
    reset: function () {
      var page = document.body.getAttribute("data-page");
      var found = TOURS[page];
      if (!found) return;
      try {
        localStorage.removeItem("de-tour-" + found.key + "-" + VERSION);
      } catch (e) {}
    }
  };

  function boot() {
    var forced = window.location.search.indexOf("tour=1") !== -1;
    // let the reader finish laying the page out first
    window.setTimeout(function () { start(forced); }, forced ? 200 : 700);
  }

  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
})();
