/* ============================================================
   "Continue where you left off" banner on the A1 landing page.

   The Picture Book reader and the Written Book reader each save
   their own position; this shows whichever ones exist.
   Depends on CHAPTERS from chapters.js.
   ============================================================ */

(function () {
  "use strict";

  var PICTURE_KEY = "a1-journey-picture-book-last";
  var BOOK_KEY = "a1-journey-book-position";

  function chapterById(id) {
    for (var i = 0; i < CHAPTERS.length; i++) {
      if (CHAPTERS[i].id === id) return CHAPTERS[i];
    }
    return null;
  }

  function read(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function link(href, label, chapter) {
    var a = document.createElement("a");
    a.href = href;
    a.textContent = chapter.de + " (" + chapter.en + ")";
    var row = document.createElement("div");
    row.className = "resume-row";
    row.appendChild(document.createTextNode(label + " "));
    row.appendChild(a);
    return row;
  }

  function init() {
    var banner = document.getElementById("resume-banner");
    if (!banner || typeof CHAPTERS === "undefined") return;

    var rows = [];

    var pic = chapterById(read(PICTURE_KEY));
    if (pic) {
      rows.push(link("picture-book/page.html?n=" + pic.id, "Picture Book —", pic));
    }

    var raw = read(BOOK_KEY);
    if (raw) {
      try {
        var pos = JSON.parse(raw);
        var ch = chapterById(pos && pos.id);
        if (ch) rows.push(link("book/chapter-" + ch.id + ".html", "Written Book —", ch));
      } catch (e) {
        /* corrupt entry — just skip it */
      }
    }

    if (!rows.length) return;

    var head = document.createElement("strong");
    head.textContent = "Continue where you left off";
    banner.appendChild(head);
    rows.forEach(function (r) { banner.appendChild(r); });
    banner.hidden = false;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
