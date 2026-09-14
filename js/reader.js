/* ============================================================
   Shared reader behavior: Picture Book viewer navigation and
   the "continue where you left off" resume link on the landing
   page. Depends on CHAPTERS from chapters.js being loaded first.
   No frameworks, no build step — plain DOM/localStorage.
   ============================================================ */

(function () {
  "use strict";

  var RESUME_KEY = "a1-journey-picture-book-last";

  function getParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function findIndexById(id) {
    for (var i = 0; i < CHAPTERS.length; i++) {
      if (CHAPTERS[i].id === id) return i;
    }
    return -1;
  }

  function initPictureBookViewer() {
    var idParam = getParam("n");
    var fromParam = getParam("from");
    var idx = idParam ? findIndexById(idParam) : 0;
    if (idx === -1) idx = 0;
    renderChapter(idx, fromParam);

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") goTo(idx + 1, fromParam);
      if (e.key === "ArrowLeft") goTo(idx - 1, fromParam);
    });
  }

  function pageUrl(idx, fromParam) {
    var url = "page.html?n=" + CHAPTERS[idx].id;
    if (fromParam) url += "&from=" + fromParam;
    return url;
  }

  function goTo(newIdx, fromParam) {
    if (newIdx < 0 || newIdx >= CHAPTERS.length) return;
    window.location.href = pageUrl(newIdx, fromParam);
  }

  function renderChapter(idx, fromParam) {
    var chapter = CHAPTERS[idx];
    if (!chapter) return;

    var img = document.getElementById("pb-image");
    var titleDe = document.getElementById("pb-title-de");
    var titleEn = document.getElementById("pb-title-en");
    var syllabusRef = document.getElementById("pb-syllabus-ref");
    var counter = document.getElementById("pb-counter");
    var prevBtn = document.getElementById("pb-prev");
    var nextBtn = document.getElementById("pb-next");
    var jumpSelect = document.getElementById("pb-jump");
    var backWrap = document.getElementById("pb-back-to-book");
    var backLink = document.getElementById("pb-back-link");

    img.src = "../assets/images/" + chapter.file;
    img.alt = chapter.de + " (" + chapter.en + ")";
    titleDe.textContent = chapter.de;
    titleEn.textContent = chapter.en;
    if (syllabusRef) {
      syllabusRef.textContent = chapter.syllabus
        ? (/^\d/.test(chapter.syllabus) ? "Syllabus #" + chapter.syllabus : "(" + chapter.syllabus + ")")
        : "";
    }
    counter.textContent = "Page " + (idx + 1) + " of " + CHAPTERS.length;

    if (backWrap && backLink) {
      if (fromParam && findIndexById(fromParam) !== -1) {
        var fromChapter = CHAPTERS[findIndexById(fromParam)];
        backLink.href = "../book/chapter-" + fromParam + ".html";
        backLink.textContent = "← Back to \"" + fromChapter.de + "\" in the Written Book";
        backWrap.hidden = false;
      } else {
        backWrap.hidden = true;
      }
    }

    if (idx <= 0) {
      prevBtn.classList.add("disabled");
      prevBtn.setAttribute("aria-disabled", "true");
      prevBtn.removeAttribute("href");
    } else {
      prevBtn.classList.remove("disabled");
      prevBtn.removeAttribute("aria-disabled");
      prevBtn.href = pageUrl(idx - 1, fromParam);
    }

    if (idx >= CHAPTERS.length - 1) {
      nextBtn.classList.add("disabled");
      nextBtn.setAttribute("aria-disabled", "true");
      nextBtn.removeAttribute("href");
    } else {
      nextBtn.classList.remove("disabled");
      nextBtn.removeAttribute("aria-disabled");
      nextBtn.href = pageUrl(idx + 1, fromParam);
    }

    if (jumpSelect) {
      jumpSelect.innerHTML = "";
      CHAPTERS.forEach(function (c, i) {
        var opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.id + " — " + c.de;
        if (i === idx) opt.selected = true;
        jumpSelect.appendChild(opt);
      });
      jumpSelect.onchange = function () {
        goTo(findIndexById(jumpSelect.value), fromParam);
      };
    }

    try {
      localStorage.setItem(RESUME_KEY, chapter.id);
    } catch (e) {
      /* private browsing or storage disabled — resume link just won't show */
    }
  }

  function initBookChapter() {
    var currentId = document.body.getAttribute("data-chapter");
    var idx = findIndexById(currentId);
    if (idx === -1) return;

    var prevBtn = document.getElementById("book-prev");
    var nextBtn = document.getElementById("book-next");
    var jumpSelect = document.getElementById("book-jump");
    var written = (typeof WRITTEN_CHAPTERS !== "undefined") ? WRITTEN_CHAPTERS : [currentId];

    var prevIdx = idx - 1;
    while (prevIdx >= 0 && written.indexOf(CHAPTERS[prevIdx].id) === -1) prevIdx--;
    var nextIdx = idx + 1;
    while (nextIdx < CHAPTERS.length && written.indexOf(CHAPTERS[nextIdx].id) === -1) nextIdx++;

    if (prevBtn) {
      if (prevIdx >= 0) {
        prevBtn.href = "chapter-" + CHAPTERS[prevIdx].id + ".html";
        prevBtn.classList.remove("disabled");
        prevBtn.removeAttribute("aria-disabled");
      } else {
        prevBtn.classList.add("disabled");
        prevBtn.setAttribute("aria-disabled", "true");
        prevBtn.removeAttribute("href");
      }
    }

    if (nextBtn) {
      if (nextIdx < CHAPTERS.length && written.indexOf(CHAPTERS[nextIdx].id) !== -1) {
        nextBtn.href = "chapter-" + CHAPTERS[nextIdx].id + ".html";
        nextBtn.classList.remove("disabled");
        nextBtn.removeAttribute("aria-disabled");
      } else {
        nextBtn.classList.add("disabled");
        nextBtn.setAttribute("aria-disabled", "true");
        nextBtn.removeAttribute("href");
      }
    }

    if (jumpSelect) {
      jumpSelect.innerHTML = "";
      CHAPTERS.forEach(function (c) {
        if (written.indexOf(c.id) === -1) return;
        var opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.id + " — " + c.de;
        if (c.id === currentId) opt.selected = true;
        jumpSelect.appendChild(opt);
      });
      jumpSelect.onchange = function () {
        window.location.href = "chapter-" + jumpSelect.value + ".html";
      };
    }
  }

  function initBookToc() {
    var list = document.getElementById("book-toc-list");
    if (!list) return;
    var written = (typeof WRITTEN_CHAPTERS !== "undefined") ? WRITTEN_CHAPTERS : [];

    CHAPTERS.forEach(function (c) {
      var isWritten = written.indexOf(c.id) !== -1;
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = isWritten ? "chapter-" + c.id + ".html" : "#";
      if (!isWritten) {
        a.classList.add("not-ready");
        a.setAttribute("aria-disabled", "true");
        a.onclick = function () { return false; };
      }
      a.innerHTML =
        '<span class="toc-num">' + c.id + '</span>' +
        '<span class="toc-titles">' +
        '<span class="toc-de">' + c.de + '</span>' +
        '<span class="toc-en">' + c.en + '</span>' +
        '</span>' +
        '<span class="toc-status' + (isWritten ? '' : ' pending') + '">' +
        (isWritten ? 'Ready' : 'Coming soon') +
        '</span>';
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function initLandingResumeBanner() {
    var banner = document.getElementById("resume-banner");
    if (!banner) return;
    var lastId;
    try {
      lastId = localStorage.getItem(RESUME_KEY);
    } catch (e) {
      return;
    }
    if (!lastId) return;
    var idx = findIndexById(lastId);
    if (idx === -1) return;
    var chapter = CHAPTERS[idx];
    banner.innerHTML =
      "Continue where you left off: <a href=\"picture-book/page.html?n=" +
      chapter.id +
      "\">" + chapter.de + " (" + chapter.en + ")</a>";
    banner.hidden = false;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var page = document.body.getAttribute("data-page");
    if (page === "picture-book-viewer") initPictureBookViewer();
    if (page === "landing") initLandingResumeBanner();
    if (page === "book-chapter") initBookChapter();
    if (page === "book-toc") initBookToc();
  });
})();
