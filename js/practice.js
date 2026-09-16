/* ============================================================
   Deutsch Ecke — Übungsbuch engine
   Renders one practice unit from the data files and marks the
   answers in the browser. Nothing is sent anywhere; the score
   and which units are finished are kept on the device only.
   ============================================================ */
(function (global) {
  "use strict";

  var STORE = "de-practice-v1";

  /* ---------- saved progress ---------- */

  function readStore() {
    try {
      return JSON.parse(localStorage.getItem(STORE) || "{}") || {};
    } catch (e) {
      return {};
    }
  }

  function saveResult(id, right, total) {
    try {
      var s = readStore();
      s[id] = { r: right, t: total, at: Date.now() };
      localStorage.setItem(STORE, JSON.stringify(s));
    } catch (e) {
      /* private mode, blocked storage — the unit still works */
    }
  }

  /* ---------- answer comparison ----------
     German learners type "ue" for ü and "ss" for ß constantly, and
     a trailing full stop should never cost a mark. Fold all of it
     away before comparing, but keep the model answer as written. */

  function normalise(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[.,;!?„“"']/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function matches(given, answers) {
    var g = normalise(given);
    if (!g) return false;
    for (var i = 0; i < answers.length; i++) {
      if (g === normalise(answers[i])) return true;
    }
    return false;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* Task text may contain ___ for a gap and *bold* for emphasis.
     Everything else is escaped. */
  function inline(s) {
    return esc(s).replace(/\*([^*]+)\*/g, "<b>$1</b>");
  }

  /* ---------- rendering ---------- */

  function renderText(unit) {
    if (unit.schilder) {
      return (
        '<div class="schild-grid">' +
        unit.schilder
          .map(function (s, i) {
            return (
              '<div class="schild"><span class="s-nr">' +
              esc(s.nr || String.fromCharCode(65 + i)) +
              "</span>" +
              s.zeilen
                .map(function (z) {
                  return "<p>" + inline(z) + "</p>";
                })
                .join("") +
              "</div>"
            );
          })
          .join("") +
        "</div>"
      );
    }
    return (
      '<div class="lesetext' +
      (unit.brief ? " brief" : "") +
      '">' +
      unit.text
        .map(function (p) {
          return "<p>" + inline(p) + "</p>";
        })
        .join("") +
      "</div>"
    );
  }

  function panel(title, hint, bodyHtml, open) {
    return (
      '<div class="panel' +
      (open ? " open" : "") +
      '"><button type="button">' +
      esc(title) +
      (hint ? ' <span class="hint">' + esc(hint) + "</span>" : "") +
      '<span class="chev">&#9656;</span></button>' +
      '<div class="panel-body">' +
      bodyHtml +
      "</div></div>"
    );
  }

  function renderTask(t, n) {
    var h =
      '<div class="task" data-typ="' +
      esc(t.typ) +
      '" data-n="' +
      n +
      '"><div class="t-q"><span class="t-n">' +
      n +
      '.</span><span>' +
      inline(t.frage) +
      (t.hinweis ? ' <span class="t-hint">(' + inline(t.hinweis) + ")</span>" : "") +
      "</span></div>";

    if (t.typ === "rf") {
      h +=
        '<div class="opts row">' +
        ["Richtig", "Falsch"]
          .map(function (lab, i) {
            return (
              '<label class="opt"><input type="radio" name="t' +
              n +
              '" value="' +
              i +
              '"><span>' +
              lab +
              "</span></label>"
            );
          })
          .join("") +
        "</div>";
    } else if (t.typ === "mc") {
      h +=
        '<div class="opts">' +
        t.optionen
          .map(function (o, i) {
            return (
              '<label class="opt"><input type="radio" name="t' +
              n +
              '" value="' +
              i +
              '"><span>' +
              inline(o) +
              "</span></label>"
            );
          })
          .join("") +
        "</div>";
    } else if (t.typ === "frei") {
      h += '<textarea class="frei" rows="3" spellcheck="false"></textarea>';
    } else {
      h +=
        '<input class="gap" type="text" autocomplete="off" autocapitalize="off" spellcheck="false">';
    }

    h += '<div class="t-fb"></div></div>';
    return h;
  }

  function renderTasks(unit) {
    var h =
      '<section class="aufgaben"><h2>Aufgaben (Tasks)</h2>' +
      '<p class="lead">Beantworten Sie die Fragen. Danach prüfen Sie Ihre Antworten.</p>';
    var n = 0;
    var lastTeil = null;

    unit.aufgaben.forEach(function (t) {
      if (t.teil && t.teil !== lastTeil) {
        lastTeil = t.teil;
        h += '<div class="teil-head">' + esc(t.teil) + "</div>";
      }
      n += 1;
      h += renderTask(t, n);
    });

    h +=
      '<div class="task-bar">' +
      '<button type="button" class="btn-check">Antworten prüfen</button>' +
      '<button type="button" class="btn-reset">Noch einmal</button>' +
      '<span class="score" hidden></span>' +
      "</div></section>";
    return h;
  }

  /* ---------- marking ---------- */

  function markTask(el, t) {
    var fb = el.querySelector(".t-fb");
    var typ = t.typ;
    var correct = false;
    var answered = true;

    if (typ === "rf" || typ === "mc") {
      var picked = el.querySelector("input:checked");
      answered = !!picked;
      var want = typ === "rf" ? (t.antwort ? 0 : 1) : t.antwort;
      correct = answered && Number(picked.value) === want;

      Array.prototype.forEach.call(el.querySelectorAll(".opt"), function (o, i) {
        o.classList.remove("right", "wrong", "sel");
        if (i === want) o.classList.add("right");
        else if (answered && Number(picked.value) === i) o.classList.add("wrong");
      });
    } else if (typ === "frei") {
      var ta = el.querySelector("textarea");
      answered = !!ta.value.trim();
      fb.className = "t-fb muster show";
      fb.innerHTML =
        "<b>Musterlösung:</b> " +
        inline(t.muster) +
        (t.warum ? "<br>" + inline(t.warum) : "");
      return { counted: false, correct: false };
    } else {
      var inp = el.querySelector("input.gap");
      answered = !!inp.value.trim();
      correct = matches(inp.value, t.antwort);
      inp.classList.remove("right", "wrong");
      inp.classList.add(correct ? "right" : "wrong");
    }

    fb.className = "t-fb show " + (correct ? "ok" : "no");
    if (correct) {
      fb.innerHTML = "<b>Richtig.</b>" + (t.warum ? " " + inline(t.warum) : "");
    } else {
      var loesung =
        typ === "rf"
          ? t.antwort
            ? "Richtig"
            : "Falsch"
          : typ === "mc"
          ? t.optionen[t.antwort]
          : t.antwort[0];
      fb.innerHTML =
        "<b>" +
        (answered ? "Leider nicht." : "Keine Antwort.") +
        "</b> Lösung: " +
        inline(loesung) +
        (t.warum ? "<br>" + inline(t.warum) : "");
    }

    return { counted: true, correct: correct };
  }

  /* ---------- wiring ---------- */

  function mount(unit, host) {
    var html = "";

    html +=
      '<header class="unit-head"><div class="u-kicker">' +
      esc(unit.kicker || "Lesen") +
      " &middot; " +
      esc(unit.id) +
      "</div><h1>" +
      esc(unit.title) +
      "</h1>" +
      (unit.subtitle ? '<p class="u-sub">' + esc(unit.subtitle) + "</p>" : "") +
      (unit.intro ? '<p class="unit-intro">' + inline(unit.intro) + "</p>" : "") +
      "</header>";

    html += renderText(unit);

    if (unit.wortschatz && unit.wortschatz.length) {
      html += panel(
        "Wortschatz",
        "the new words in this text",
        "<table class=\"wortschatz\"><tbody>" +
          unit.wortschatz
            .map(function (w) {
              return "<tr><td>" + esc(w[0]) + "</td><td>" + esc(w[1]) + "</td></tr>";
            })
            .join("") +
          "</tbody></table>"
      );
    }

    if (unit.uebersetzung && unit.uebersetzung.length) {
      html += panel(
        "Englische Übersetzung",
        "read the German first, then check",
        unit.uebersetzung
          .map(function (p) {
            return "<p>" + inline(p) + "</p>";
          })
          .join("")
      );
    }

    html += renderTasks(unit);
    host.innerHTML = html;

    /* panels */
    Array.prototype.forEach.call(host.querySelectorAll(".panel > button"), function (b) {
      b.addEventListener("click", function () {
        b.parentNode.classList.toggle("open");
      });
    });

    /* keep the chosen option outlined before marking */
    Array.prototype.forEach.call(host.querySelectorAll(".opts"), function (group) {
      group.addEventListener("change", function () {
        Array.prototype.forEach.call(group.querySelectorAll(".opt"), function (o) {
          o.classList.toggle("sel", !!o.querySelector("input:checked"));
        });
      });
    });

    var tasks = Array.prototype.slice.call(host.querySelectorAll(".task"));
    var score = host.querySelector(".score");

    host.querySelector(".btn-check").addEventListener("click", function () {
      var right = 0;
      var total = 0;
      tasks.forEach(function (el, i) {
        var res = markTask(el, unit.aufgaben[i]);
        if (res.counted) {
          total += 1;
          if (res.correct) right += 1;
        }
      });

      score.hidden = false;
      score.textContent = right + " / " + total + " richtig";
      score.classList.toggle("good", total > 0 && right / total >= 0.6);
      saveResult(unit.id, right, total);
      score.scrollIntoView({ block: "center" });
    });

    host.querySelector(".btn-reset").addEventListener("click", function () {
      tasks.forEach(function (el) {
        Array.prototype.forEach.call(el.querySelectorAll("input[type=radio]"), function (r) {
          r.checked = false;
        });
        Array.prototype.forEach.call(el.querySelectorAll("input.gap, textarea"), function (f) {
          f.value = "";
          f.classList.remove("right", "wrong");
        });
        Array.prototype.forEach.call(el.querySelectorAll(".opt"), function (o) {
          o.classList.remove("right", "wrong", "sel");
        });
        el.querySelector(".t-fb").className = "t-fb";
      });
      score.hidden = true;
      host.scrollIntoView({ block: "start" });
    });
  }

  global.DE_PRACTICE = {
    mount: mount,
    results: readStore,
    normalise: normalise
  };
})(window);
