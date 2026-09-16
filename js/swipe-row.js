/* Mobile swipe rows — adds position dots under the card rows that
   css/swipe-row.css turns sideways on phones, and keeps the active
   dot in step with the swipe. Does nothing on desktop, where the
   rows are still a plain grid. */
(function () {
  var phone = window.matchMedia("(max-width: 760px)");

  function build(row) {
    var cards = Array.prototype.filter.call(row.children, function (el) {
      return el.nodeType === 1;
    });
    if (cards.length < 2) return null;

    var dots = document.createElement("div");
    dots.className = "swipe-dots";
    dots.setAttribute("role", "tablist");
    dots.setAttribute("aria-label", "Card position");

    cards.forEach(function (card, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      var name = card.querySelector("h2, h3");
      b.setAttribute(
        "aria-label",
        "Show " + (name ? name.textContent.trim() : "card " + (i + 1))
      );
      b.addEventListener("click", function () {
        row.scrollTo({
          left: card.offsetLeft - row.offsetLeft,
          behavior: "smooth"
        });
      });
      dots.appendChild(b);
    });

    row.parentNode.insertBefore(dots, row.nextSibling);

    var buttons = dots.children;

    function sync() {
      /* Nearest card to the row's left edge wins — the same rule the
         scroll snapping uses, so the dot never disagrees with what
         is actually on screen. */
      var best = 0;
      var bestGap = Infinity;
      for (var i = 0; i < cards.length; i++) {
        var gap = Math.abs(cards[i].offsetLeft - row.offsetLeft - row.scrollLeft);
        if (gap < bestGap) {
          bestGap = gap;
          best = i;
        }
      }
      for (var j = 0; j < buttons.length; j++) {
        var on = j === best;
        buttons[j].classList.toggle("on", on);
        buttons[j].setAttribute("aria-selected", on ? "true" : "false");
      }
    }

    var ticking = false;
    row.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          ticking = false;
          sync();
        });
      },
      { passive: true }
    );

    window.addEventListener("resize", sync);
    sync();
    return dots;
  }

  function init() {
    if (!phone.matches) return;
    document.querySelectorAll(".level-grid, .path-grid").forEach(function (row) {
      if (row.dataset.swipeRow) return;
      if (build(row)) row.dataset.swipeRow = "1";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* Rotating the phone from landscape back into the query still
     gets dots, without a reload. */
  if (phone.addEventListener) {
    phone.addEventListener("change", init);
  } else if (phone.addListener) {
    phone.addListener(init);
  }
})();
