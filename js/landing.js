/* Landing page only: scroll reveals, stat count-up, card cursor spotlight. */
(function () {
  "use strict";

  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- scroll reveal ---- */
  var revealables = document.querySelectorAll(".reveal");

  if (calm || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) {
      el.classList.add("in");
    });
  } else {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          revealer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealables.forEach(function (el) {
      revealer.observe(el);
    });
  }

  /* ---- stat count-up ---- */
  function countUp(el) {
    var target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) return;
    var start = performance.now();
    var duration = 1100;

    function tick(now) {
      var p = Math.min((now - start) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var numbers = document.querySelectorAll(".hero-stats .num[data-count]");
  if (!calm && "IntersectionObserver" in window) {
    var counter = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countUp(entry.target);
          counter.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    numbers.forEach(function (el) {
      counter.observe(el);
    });
  }

  /* ---- cursor spotlight on level cards ---- */
  if (!calm && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".level-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
      });
    });
  }
})();
