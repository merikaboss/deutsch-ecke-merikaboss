/* ============================================================
   Deutsch Ecke — Übungsbuch engine

   Builds the markup for one practice unit and marks the answers.
   It renders into the Written Book's reader flow, so the sections
   here are ordinary book markup (h2 / p / table) and get the
   book's typography and pagination for free.

   Nothing is sent anywhere. The score is kept on the device.
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
     German learners type "ue" for ü and "ss" for ß constantly, and a
     trailing full stop should never cost a mark. Fold all of that away
     before comparing, but keep the model answer exactly as written. */

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

  /* *bold* is the only markup allowed in unit text; everything else escapes. */
  function inline(s) {
    return esc(s).replace(/\*([^*]+)\*/g, "<b>$1</b>");
  }

  /* ---------- sections ---------- */

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
              s.zeilen.map(function (z) { return "<p>" + inline(z) + "</p>"; }).join("") +
              "</div>"
            );
          })
          .join("") +
        "</div>"
      );
    }
    /* Plain book prose. A bordered box would have to fragment across a
       column break on a long text, which is exactly what the reader
       cannot paint cleanly. */
    return (
      '<div class="lesetext">' +
      unit.text.map(function (p) { return "<p>" + inline(p) + "</p>"; }).join("") +
      "</div>"
    );
  }

  function renderTask(t, n) {
    var h =
      '<div class="task" data-n="' + n + '"><div class="t-q"><span class="t-n">' +
      n + '.</span><span>' + inline(t.frage) +
      (t.hinweis ? ' <span class="t-hint">(' + inline(t.hinweis) + ")</span>" : "") +
      "</span></div>";

    if (t.typ === "rf") {
      h +=
        '<div class="opts row">' +
        ["Richtig", "Falsch"].map(function (lab, i) {
          return '<label class="opt"><input type="radio" name="t' + n +
            '" value="' + i + '"><span>' + lab + "</span></label>";
        }).join("") +
        "</div>";
    } else if (t.typ === "mc") {
      h +=
        '<div class="opts">' +
        t.optionen.map(function (o, i) {
          return '<label class="opt"><input type="radio" name="t' + n +
            '" value="' + i + '"><span>' + inline(o) + "</span></label>";
        }).join("") +
        "</div>";
    } else if (t.typ === "frei") {
      h += '<textarea class="frei" rows="3" spellcheck="false"></textarea>';
    } else {
      h += '<input class="gap" type="text" autocomplete="off" autocapitalize="off" spellcheck="false">';
    }

    return h + '<div class="t-fb"></div></div>';
  }

  /* The whole unit as one flowing document, in the order you work through
     it: text, vocabulary, tasks, and only then the English. */
  function render(unit) {
    var h = "";

    h +=
      '<div class="book-header"><div class="book-kicker">' +
      esc(unit.kicker || "Übungsbuch · Lesen") + " &middot; " + esc(unit.id) +
      "</div><h1>" + esc(unit.title) + "</h1>" +
      (unit.subtitle ? '<p class="subtitle">' + esc(unit.subtitle) + "</p>" : "") +
      "</div><div class=\"chapter-body\">";

    if (unit.intro) h += '<p class="u-intro">' + inline(unit.intro) + "</p>";

    h += "<h2>" + (unit.schilder ? "Die Texte" : "Der Text") + "</h2>";
    h += renderText(unit);

    if (unit.wortschatz && unit.wortschatz.length) {
      h += "<h2>Wortschatz</h2>";
      h += "<table><tbody>" +
        unit.wortschatz.map(function (w) {
          return "<tr><td>" + esc(w[0]) + "</td><td>" + esc(w[1]) + "</td></tr>";
        }).join("") +
        "</tbody></table>";
    }

    h += "<h2>Aufgaben</h2>";
    h += '<p class="u-intro">Beantworten Sie die Fragen. Am Ende prüfen Sie Ihre Antworten.</p>';

    var n = 0;
    var lastTeil = null;
    unit.aufgaben.forEach(function (t) {
      if (t.teil && t.teil !== lastTeil) {
        lastTeil = t.teil;
        h += '<div class="teil-head">' + esc(t.teil) + "</div>";
      }
      h += renderTask(t, ++n);
    });

    h +=
      '<div class="task-bar">' +
      '<button type="button" class="btn-check">Antworten prüfen</button>' +
      '<button type="button" class="btn-reset">Noch einmal</button>' +
      '<span class="score" hidden></span>' +
      "</div>";

    if (unit.uebersetzung && unit.uebersetzung.length) {
      h += "<h2>Englische Übersetzung</h2>";
      h += '<p class="u-intro">Only worth reading once you have answered — it is here to check yourself against, not to read alongside the German.</p>';
      h += unit.uebersetzung.map(function (p) { return "<p>" + inline(p) + "</p>"; }).join("");
    }

    return h + "</div>";
  }

  /* ---------- marking ---------- */

  function markTask(node, t) {
    var fb = node.querySelector(".t-fb");
    var typ = t.typ;
    var correct = false;
    var answered = true;

    if (typ === "rf" || typ === "mc") {
      var picked = node.querySelector("input:checked");
      answered = !!picked;
      var want = typ === "rf" ? (t.antwort ? 0 : 1) : t.antwort;
      correct = answered && Number(picked.value) === want;

      Array.prototype.forEach.call(node.querySelectorAll(".opt"), function (o, i) {
        o.classList.remove("right", "wrong", "sel");
        if (i === want) o.classList.add("right");
        else if (answered && Number(picked.value) === i) o.classList.add("wrong");
      });
    } else if (typ === "frei") {
      fb.className = "t-fb muster show";
      fb.innerHTML = "<b>Musterlösung:</b> " + inline(t.muster) +
        (t.warum ? "<br>" + inline(t.warum) : "");
      return { counted: false, correct: false };
    } else {
      var inp = node.querySelector("input.gap");
      answered = !!inp.value.trim();
      correct = matches(inp.value, t.antwort);
      inp.classList.remove("right", "wrong");
      inp.classList.add(correct ? "right" : "wrong");
    }

    fb.className = "t-fb show " + (correct ? "ok" : "no");
    if (correct) {
      fb.innerHTML = "<b>Richtig.</b>" + (t.warum ? " " + inline(t.warum) : "");
    } else {
      var loesung = typ === "rf"
        ? (t.antwort ? "Richtig" : "Falsch")
        : typ === "mc" ? t.optionen[t.antwort] : t.antwort[0];
      fb.innerHTML = "<b>" + (answered ? "Leider nicht." : "Keine Antwort.") +
        "</b> Lösung: " + inline(loesung) +
        (t.warum ? "<br>" + inline(t.warum) : "");
    }

    return { counted: true, correct: correct };
  }

  /* ---------- wiring ----------
     `onReflow(anchorNode)` is handed back to the reader after anything
     that changes the height of the content, so it can re-paginate and
     keep the reader on the page it was already looking at. */

  function wire(unit, host, onReflow) {
    var tasks = Array.prototype.slice.call(host.querySelectorAll(".task"));
    var score = host.querySelector(".score");

    Array.prototype.forEach.call(host.querySelectorAll(".opts"), function (group) {
      group.addEventListener("change", function () {
        Array.prototype.forEach.call(group.querySelectorAll(".opt"), function (o) {
          o.classList.toggle("sel", !!o.querySelector("input:checked"));
        });
      });
    });

    host.querySelector(".btn-check").addEventListener("click", function () {
      var right = 0;
      var total = 0;
      tasks.forEach(function (node, i) {
        var res = markTask(node, unit.aufgaben[i]);
        if (res.counted) {
          total += 1;
          if (res.correct) right += 1;
        }
      });

      score.hidden = false;
      score.textContent = right + " / " + total + " richtig";
      score.classList.toggle("good", total > 0 && right / total >= 0.6);
      saveResult(unit.id, right, total);

      /* Feedback boxes just appeared, so every page after them has moved.
         Re-paginate and stay on the score. */
      if (onReflow) onReflow(score);
    });

    host.querySelector(".btn-reset").addEventListener("click", function () {
      tasks.forEach(function (node) {
        Array.prototype.forEach.call(node.querySelectorAll("input[type=radio]"), function (r) {
          r.checked = false;
        });
        Array.prototype.forEach.call(node.querySelectorAll("input.gap, textarea"), function (f) {
          f.value = "";
          f.classList.remove("right", "wrong");
        });
        Array.prototype.forEach.call(node.querySelectorAll(".opt"), function (o) {
          o.classList.remove("right", "wrong", "sel");
        });
        node.querySelector(".t-fb").className = "t-fb";
      });
      score.hidden = true;
      if (onReflow) onReflow(tasks[0]);
    });
  }

  global.DE_PRACTICE = {
    render: render,
    wire: wire,
    results: readStore,
    normalise: normalise
  };
})(window);
