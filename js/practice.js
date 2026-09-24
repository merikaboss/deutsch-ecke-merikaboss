/* ============================================================
   Deutsch Ecke — Übungsbuch engine

   Builds the markup for one practice unit and marks the answers.
   It renders into the Written Book's reader flow, so the sections
   here are ordinary book markup (h2 / p / table / info-box) and get
   the book's typography and pagination for free.

   The same engine serves all three parts — Lesen, Schreiben and
   Sprechen. A unit only brings the sections it needs.

   Unit fields (all optional except id, title, aufgaben):
     intro          short paragraph under the title
     lernen         "So geht's" blocks, see renderBlock()
     text/schilder  a reading text or a set of short notices
     wortschatz     [[de, en]]
     redemittel     [{ titel, zeilen: [[de, en]] }]
     aufgaben       tasks, see renderTask()
     uebersetzung   English version of the reading text

   Task types:
     rf       richtig / falsch     antwort: true | false
     mc       multiple choice      optionen: [], antwort: index
     luecke   type the answer      antwort: [accepted], woerter?: []
     feld     a form to fill in    felder: [{ label, antwort: [] }]
     frei     free writing         punkte?, woerter?, muster, checkliste?
     sprechen say it out loud      karte?, stichworte?, muster

   Nothing is sent anywhere. Results are kept on the device.
   ============================================================ */
(function (global) {
  "use strict";

  var STORE = "de-practice-v1";
  var ICONS = "../../../assets/icons.svg";

  var SKILLS = {
    lesen: {
      key: "lesen", label: "Lesen", en: "Reading", teil: 1,
      units: "LESEN_UNITS", gruppen: "LESEN_GRUPPEN",
      aufgaben: "Beantworten Sie die Fragen. Am Ende prüfen Sie alle Antworten auf einmal."
    },
    schreiben: {
      key: "schreiben", label: "Schreiben", en: "Writing", teil: 2,
      units: "SCHREIBEN_UNITS", gruppen: "SCHREIBEN_GRUPPEN",
      aufgaben: "Schreiben Sie direkt in die Felder. „Antworten prüfen“ markiert die kurzen Aufgaben und zeigt bei den längeren Texten eine Musterlösung zum Vergleichen."
    },
    sprechen: {
      key: "sprechen", label: "Sprechen", en: "Speaking", teil: 3,
      units: "SPRECHEN_UNITS", gruppen: "SPRECHEN_GRUPPEN",
      aufgaben: "Sprechen Sie jede Antwort laut — nicht nur im Kopf. Nehmen Sie sich auf, hören Sie die Aufnahme an und vergleichen Sie dann mit der Musterantwort. Zum Schluss bewerten Sie sich selbst."
    }
  };
  var ORDER = ["lesen", "schreiben", "sprechen"];

  function skill(key) {
    var s = SKILLS[key] || SKILLS.lesen;
    return {
      key: s.key,
      label: s.label,
      en: s.en,
      teil: s.teil,
      aufgaben: s.aufgaben,
      units: global[s.units] || [],
      gruppen: global[s.gruppen] || [],
      next: SKILLS[ORDER[ORDER.indexOf(s.key) + 1]] || null
    };
  }

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
      .replace(/[.,;:!?„“"'‚‘’«»()]/g, "")
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
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* *bold*, _italic_ and ~struck out~ are the display markup in unit text.

     Language, for the page reader (Vorlesen), is marked without changing
     anything on screen. Every string has a context — German for the
     material and the tasks, English for explanations and translations —
     and inside it:
       {de:…} / {en:…}   switch language for that stretch (may nest)
       ~…~               always German (a wrong German form)
       in English: *…*   German (bold marks the German being taught)
                   „…“   German (German quotation marks)
     The braces never reach the page; they become <span lang="…">. */
  function inline(s, ctx) {
    ctx = ctx || "de";
    var t = esc(s).replace(/\{(de|en):/g, "\u0001$1\u0002").replace(/\}/g, "\u0003");
    function langAt(str, pos) {
      var stack = [ctx], re = /\u0001(de|en)\u0002|\u0003/g, m;
      while ((m = re.exec(str)) && m.index < pos) { if (m[1]) stack.push(m[1]); else if (stack.length > 1) stack.pop(); }
      return stack[stack.length - 1];
    }
    t = t.replace(/\*([^*]+)\*/g, function (m0, x, off, str) {
      return langAt(str, off) === "en" ? '<b lang="de">' + x + "</b>" : "<b>" + x + "</b>";
    });
    t = t.replace(/~([^~]+)~/g, '<s lang="de">$1</s>');
    t = t.replace(/„([^“]*)“/g, function (m0, x, off, str) {
      return langAt(str, off) === "en" ? '<span lang="de">„' + x + "“</span>" : m0;
    });
    t = t.replace(/(^|[\s(„\u0002])_([^_]+)_/g, "$1<i>$2</i>");
    return t.replace(/\u0001(de|en)\u0002/g, '<span lang="$1">').replace(/\u0003/g, "</span>");
  }

  /* the same text with the language marks taken out, for places that
     show it plainly (unit lists, the contents drawer) */
  function plain(s) {
    return String(s == null ? "" : s).replace(/\{(?:de|en):/g, "").replace(/\}/g, "");
  }

  /* English prose: the element itself carries lang="en" */
  function en(tag, s, cls) {
    return "<" + tag + ' lang="en"' + (cls ? ' class="' + cls + '"' : "") + ">" + inline(s, "en") + "</" + tag + ">";
  }

  function lines(v) {
    return Array.isArray(v) ? v : [v];
  }

  function icon(name) {
    return '<svg class="icon-svg" aria-hidden="true"><use href="' + ICONS + "#icon-" + name + '"></use></svg>';
  }

  function wordCount(s) {
    var m = String(s || "").trim().match(/[A-Za-zÄÖÜäöüß0-9]+/g);
    return m ? m.length : 0;
  }

  /* ---------- teaching blocks ----------
     "text"                                  a paragraph
     { h3: "…" }                              a sub-heading
     { kopf: [..], zeilen: [[..]] }           a table
     { box: "rule|example|mistake", titel, text: [..] | liste: [..] }
     { brief: [lines], titel? }               a message or letter, shown as one
     { liste: [..] }                          a bullet list                      */

  var BOX_ICON = { rule: "rule", example: "chat", mistake: "warning", exercise: "pencil" };

  function renderBlock(b) {
    if (typeof b === "string") return en("p", b);
    if (b.h3) return en("h3", b.h3);
    if (b.zeilen) return renderTable(b.kopf, b.zeilen);
    if (b.brief) return renderBrief(b.brief, b.titel);
    if (b.box) {
      return (
        '<div class="info-box ' + esc(b.box) + '">' +
        (b.titel ? '<h3 lang="en">' + icon(BOX_ICON[b.box] || "rule") + " " + inline(b.titel, "en") + "</h3>" : "") +
        (b.text ? lines(b.text).map(function (p) { return en("p", p); }).join("") : "") +
        (b.liste ? renderList(b.liste, "en") : "") +
        (b.zeilen ? renderTable(b.kopf, b.zeilen) : "") +
        "</div>"
      );
    }
    if (b.liste) return renderList(b.liste, "en");
    return "";
  }

  function renderList(items, ctx) {
    return "<ul>" + items.map(function (i) { return ctx === "en" ? en("li", i) : "<li>" + inline(i) + "</li>"; }).join("") + "</ul>";
  }

  /* A table can't break across pages, and a long one is either pushed
     whole onto the next page (leaving a near-empty page behind) or capped
     into a small scroller. Long tables are therefore cut into short runs
     of rows that sit flush under each other and can break between runs. */
  var TABLE_RUN = 5;

  /* cols: the language of each column, e.g. ["de", "en"] for a word list.
     Lesson tables are German unless a cell says otherwise. */
  function renderTable(kopf, zeilen, cols) {
    if (zeilen.length > TABLE_RUN + 1) {
      var parts = Math.ceil(zeilen.length / TABLE_RUN);
      var size = Math.ceil(zeilen.length / parts);
      var out = "";
      for (var i = 0; i < zeilen.length; i += size) {
        out += tableRun(i === 0 ? kopf : null, zeilen.slice(i, i + size), i > 0, true, cols);
      }
      return out;
    }
    return tableRun(kopf, zeilen, false, false, cols);
  }

  function cell(tag, c, lang) {
    return lang === "en"
      ? "<" + tag + ' lang="en">' + inline(c, "en") + "</" + tag + ">"
      : "<" + tag + ">" + inline(c) + "</" + tag + ">";
  }

  function tableRun(kopf, zeilen, cont, run, cols) {
    cols = cols || [];
    return (
      (cont ? '<table class="run cont">' : run ? '<table class="run">' : "<table>") +
      (kopf ? "<thead><tr>" + kopf.map(function (k, i) { return cell("th", k, cols[i]); }).join("") + "</tr></thead>" : "") +
      "<tbody>" +
      zeilen.map(function (z) {
        return "<tr>" + z.map(function (c, i) { return cell("td", c, cols[i]); }).join("") + "</tr>";
      }).join("") +
      "</tbody></table>"
    );
  }

  /* A letter is plain lines, so it can continue on the next page. */
  function renderBrief(zeilen, titel) {
    return (
      '<div class="brief">' +
      (titel ? '<span class="b-kopf">' + inline(titel) + "</span>" : "") +
      zeilen.map(function (z) {
        return z === "" ? '<p class="b-leer"></p>' : "<p>" + inline(z) + "</p>";
      }).join("") +
      "</div>"
    );
  }

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

  /* ---------- tasks ---------- */

  function renderTask(t, n) {
    var h =
      '<div class="task t-' + esc(t.typ) + '" data-n="' + n + '"><div class="t-q"><span class="t-n">' +
      n + '.</span><span>' + inline(t.frage) +
      (t.hinweis ? ' <span class="t-hint">(' + inline(t.hinweis) + ")</span>" : "") +
      "</span></div>";

    if (t.vorlage) h += renderBrief(t.vorlage, t.vorlageTitel);

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
    } else if (t.typ === "feld") {
      h +=
        '<div class="formular">' +
        t.felder.map(function (f, i) {
          return (
            '<label class="f-row"><span class="f-label">' + inline(f.label) + "</span>" +
            '<input class="gap" type="text" data-f="' + i + '" autocomplete="off" autocapitalize="off" spellcheck="false"></label>'
          );
        }).join("") +
        "</div>";
    } else if (t.typ === "frei") {
      if (t.punkte) {
        h += '<ul class="punkte">' + t.punkte.map(function (p) { return "<li>" + inline(p) + "</li>"; }).join("") + "</ul>";
      }
      h +=
        '<textarea class="frei" rows="' + (t.woerter && t.woerter > 25 ? 7 : 3) + '" spellcheck="false"></textarea>' +
        '<div class="wc"><span class="wc-n">0</span> Wörter' +
        (t.woerter ? " &middot; Ziel: etwa " + t.woerter : "") + "</div>";
    } else if (t.typ === "sprechen") {
      if (t.karte) {
        h +=
          '<div class="karte"><span class="k-thema">' + inline(t.karte.thema) + "</span>" +
          '<span class="k-wort">' + inline(t.karte.wort) + "</span></div>";
      }
      if (t.stichworte) {
        h += '<p class="stichworte"><b>Stichworte:</b> ' + t.stichworte.map(inline).join(" &middot; ") + "</p>";
      }
      h +=
        '<div class="sp-tools">' +
        '<button type="button" class="btn-small sp-rec" hidden>' + icon("mic") + " <span>Aufnehmen</span></button>" +
        '<button type="button" class="btn-small sp-play" hidden>' + icon("play") + ' Anhören</button>' +
        '<button type="button" class="btn-small sp-show">Muster zeigen</button>' +
        "</div>" +
        '<div class="sp-muster">' +
        lines(t.muster).map(function (z) { return "<p>" + inline(z) + "</p>"; }).join("") +
        (t.warum ? '<p class="sp-warum">' + inline(t.warum) + "</p>" : "") +
        '<button type="button" class="btn-small sp-tts" hidden>' + icon("play") + ' Muster anhören</button>' +
        "</div>" +
        '<div class="opts row sp-rate">' +
        ["Geschafft", "Noch üben"].map(function (lab, i) {
          return '<label class="opt"><input type="radio" name="t' + n +
            '" value="' + i + '"><span>' + lab + "</span></label>";
        }).join("") +
        "</div>";
    } else {
      if (t.woerter) {
        h += '<div class="chips">' + t.woerter.map(function (w) { return "<span>" + inline(w) + "</span>"; }).join("") + "</div>";
      }
      h += t.lang
        ? '<textarea class="frei satz" rows="2" spellcheck="false"></textarea>'
        : '<input class="gap" type="text" autocomplete="off" autocapitalize="off" spellcheck="false">';
    }

    return h + '<div class="t-fb"></div></div>';
  }

  /* The whole unit as one flowing document, in the order you work through
     it: what to know, the material, the tasks, and only then the English. */
  function render(unit, skillKey) {
    var sk = skill(skillKey);
    var h = "";

    h +=
      '<div class="book-header"><div class="book-kicker">' +
      "Übungsbuch &middot; " + esc(sk.label) + " &middot; " + esc(unit.id) +
      '</div><h1 lang="de">' + esc(unit.title) + "</h1>" +
      (unit.subtitle ? en("p", unit.subtitle, "subtitle") : "") +
      /* the body is German; English parts carry lang="en" themselves */
      '</div><div class="chapter-body" lang="de">';

    if (unit.intro) h += en("p", unit.intro, "u-intro");

    if (unit.lernen && unit.lernen.length) {
      h += "<h2>" + esc(unit.lernenTitel || "So geht’s") + "</h2>";
      h += unit.lernen.map(renderBlock).join("");
    }

    if (unit.text || unit.schilder) {
      h += "<h2>" + esc(unit.textTitel || (unit.schilder ? "Die Texte" : "Der Text")) + "</h2>";
      h += renderText(unit);
    }

    if (unit.redemittel && unit.redemittel.length) {
      h += "<h2>Redemittel</h2>";
      unit.redemittel.forEach(function (g) {
        if (g.titel) h += "<h3>" + inline(g.titel) + "</h3>";
        h += renderTable(null, g.zeilen, ["de", "en"]);
      });
    }

    if (unit.wortschatz && unit.wortschatz.length) {
      h += "<h2>Wortschatz</h2>";
      h += renderTable(null, unit.wortschatz, ["de", "en"]);
    }

    h += "<h2>Aufgaben</h2>";
    h += '<p class="u-intro">' + inline(unit.aufgabenIntro || sk.aufgaben) + "</p>";

    var n = 0;
    var lastTeil = null;
    unit.aufgaben.forEach(function (t) {
      if (t.teil && t.teil !== lastTeil) {
        lastTeil = t.teil;
        h += '<div class="teil-head">' + esc(t.teil) + "</div>";
        if (t.teilIntro) h += '<p class="teil-intro">' + inline(t.teilIntro) + "</p>";
      }
      h += renderTask(t, ++n);
    });

    /* each button carries a small English line under the German, so a
       beginner knows what it does before pressing it */
    var btn = function (cls, de, en, hidden) {
      return '<button type="button" class="' + cls + '"' + (hidden ? " hidden" : "") + ">" +
        '<span class="b-de">' + de + '</span><span class="b-en" lang="en">' + en + "</span></button>";
    };
    var allSpeaking = unit.aufgaben.every(function (t) { return t.typ === "sprechen"; });
    h +=
      '<div class="task-bar">' +
      btn("btn-check", allSpeaking ? "Auswerten" : "Antworten prüfen", allSpeaking ? "Mark my tasks" : "Check my answers") +
      btn("btn-reset", "Noch einmal", "Start again") +
      '<span class="score" hidden></span>' +
      /* after marking: straight back to the first task, where the
         corrections now sit under every answer */
      btn("btn-review", "Korrekturen ansehen", "See the corrections", true) +
      "</div>";

    if (unit.uebersetzung && unit.uebersetzung.length) {
      h += "<h2>Englische Übersetzung</h2>";
      h += unit.uebersetzung.map(function (p) { return en("p", p); }).join("");
    }

    return h + "</div>";
  }

  /* ---------- marking ----------
     Each task returns how many points it was worth and how many were won.
     Free writing is worth nothing: there is no single right text, so it
     shows a model and a checklist instead of a mark. */

  function markChoice(node, want) {
    var picked = node.querySelector(".opts:not(.sp-rate) input:checked");
    var answered = !!picked;
    Array.prototype.forEach.call(node.querySelectorAll(".opts:not(.sp-rate) .opt"), function (o, i) {
      o.classList.remove("right", "wrong", "sel");
      if (i === want) o.classList.add("right");
      else if (answered && Number(picked.value) === i) o.classList.add("wrong");
    });
    return { answered: answered, correct: answered && Number(picked.value) === want };
  }

  /* the English explanation under a correction — the teacher's "why" */
  function erklBox(erkl) {
    return erkl ? '<span class="t-erkl" lang="en">' + inline(erkl, "en") + "</span>" : "";
  }

  function feedback(fb, correct, answered, loesung, warum, erkl) {
    fb.className = "t-fb show " + (correct ? "ok" : "no");
    if (correct) {
      fb.innerHTML = "<b>Richtig.</b>" + (warum ? " " + inline(warum) : "") + erklBox(erkl);
    } else {
      fb.innerHTML = "<b>" + (answered ? "Leider nicht." : "Keine Antwort.") +
        "</b> Lösung: " + inline(loesung) +
        (warum ? "<br>" + inline(warum) : "") + erklBox(erkl);
    }
  }

  /* the English explanations live in their own file, keyed by unit and
     task number, so the unit files stay as they are */
  function erklFor(unit, i) {
    var e = global.PRACTICE_ERKLAERUNG && global.PRACTICE_ERKLAERUNG[unit.id];
    return (e && e[i]) || "";
  }

  function optionLabel(t, v) {
    return t.typ === "rf" ? ["Richtig", "Falsch"][v] : t.optionen[v];
  }

  function markTask(node, t, erkl) {
    var fb = node.querySelector(".t-fb");
    var res;

    if (t.typ === "rf" || t.typ === "mc") {
      var want = t.typ === "rf" ? (t.antwort ? 0 : 1) : t.antwort;
      res = markChoice(node, want);
      var picked = node.querySelector(".opts:not(.sp-rate) input:checked");
      feedback(fb, res.correct, res.answered, optionLabel(t, want), t.warum, erkl);
      return { points: 1, won: res.correct ? 1 : 0, answered: res.answered, correct: res.correct,
               given: picked ? optionLabel(t, Number(picked.value)) : "", want: optionLabel(t, want) };
    }

    if (t.typ === "feld") {
      var won = 0;
      var falsch = [], wrongFields = [];
      Array.prototype.forEach.call(node.querySelectorAll("input.gap"), function (inp, i) {
        var f = t.felder[i];
        var ok = matches(inp.value, f.antwort);
        inp.classList.remove("right", "wrong");
        inp.classList.add(ok ? "right" : "wrong");
        if (ok) won += 1;
        else {
          falsch.push("<li>" + inline(f.label) + ": <b>" + inline(f.antwort[0]) + "</b></li>");
          wrongFields.push({ label: f.label, want: f.antwort[0], given: inp.value.trim() });
        }
      });
      fb.className = "t-fb show " + (falsch.length ? "no" : "ok");
      fb.innerHTML = (falsch.length
        ? "<b>" + won + " von " + t.felder.length + " Feldern richtig.</b> So muss es heißen:<ul>" + falsch.join("") + "</ul>" +
          (t.warum ? inline(t.warum) : "")
        : "<b>Alle Felder richtig.</b>" + (t.warum ? " " + inline(t.warum) : "")) + erklBox(erkl);
      return { points: t.felder.length, won: won, wrongFields: wrongFields };
    }

    if (t.typ === "frei") {
      fb.className = "t-fb muster show";
      fb.innerHTML =
        "<b>Musterlösung</b>" +
        lines(t.muster).map(function (z) { return z === "" ? '<p class="b-leer"></p>' : "<p>" + inline(z) + "</p>"; }).join("") +
        (t.checkliste
          ? '<b>Prüfen Sie Ihren Text:</b><ul class="check">' +
            t.checkliste.map(function (c) { return "<li>" + inline(c) + "</li>"; }).join("") + "</ul>"
          : "") +
        (t.warum ? "<p>" + inline(t.warum) + "</p>" : "");
      return { points: 0, won: 0 };
    }

    if (t.typ === "sprechen") {
      node.classList.add("shown");
      var rate = node.querySelector(".sp-rate input:checked");
      Array.prototype.forEach.call(node.querySelectorAll(".sp-rate .opt"), function (o) {
        o.classList.remove("right", "wrong");
      });
      if (!rate) {
        fb.className = "t-fb show no";
        fb.innerHTML = "<b>Noch keine Bewertung.</b> Sprechen Sie, vergleichen Sie mit dem Muster und wählen Sie dann oben aus.";
        return { points: 1, won: 0, rated: "" };
      }
      fb.className = "t-fb";
      fb.innerHTML = "";
      return { points: 1, won: rate.value === "0" ? 1 : 0, rated: rate.value === "0" ? "Geschafft" : "Noch üben" };
    }

    /* luecke */
    var inp = node.querySelector("input.gap, textarea.satz");
    var answered = !!inp.value.trim();
    var correct = matches(inp.value, t.antwort);
    inp.classList.remove("right", "wrong");
    inp.classList.add(correct ? "right" : "wrong");
    feedback(fb, correct, answered, t.antwort[0], t.warum, erkl);
    return { points: 1, won: correct ? 1 : 0, answered: answered, correct: correct, given: inp.value.trim(), want: t.antwort[0] };
  }

  /* ---------- speaking tools ----------
     Recording uses the phone's microphone and stays in the browser; the
     recording is thrown away when the page closes. "Muster anhören" uses
     the device's own German voice and only appears if there is one. */

  var recorder = null;

  function germanVoice() {
    if (!global.speechSynthesis) return null;
    var v = global.speechSynthesis.getVoices() || [];
    for (var i = 0; i < v.length; i++) {
      if (/^de([-_]|$)/i.test(v[i].lang)) return v[i];
    }
    return null;
  }

  function speak(text) {
    var voice = germanVoice();
    if (!voice) return;
    global.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = 0.9;
    global.speechSynthesis.speak(u);
  }

  function canRecord() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && global.MediaRecorder);
  }

  function stopRecording() {
    if (recorder && recorder.state === "recording") recorder.stop();
  }

  function toggleRecording(btn, playBtn, onReflow) {
    if (recorder && recorder.state === "recording") {
      var mine = recorder.btn === btn;
      stopRecording();
      if (mine) return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      var chunks = [];
      var rec = new MediaRecorder(stream);
      rec.btn = btn;
      rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
      rec.onstop = function () {
        stream.getTracks().forEach(function (tr) { tr.stop(); });
        btn.classList.remove("on");
        btn.querySelector("span").textContent = "Neu aufnehmen";
        if (playBtn.url) URL.revokeObjectURL(playBtn.url);
        playBtn.url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || "audio/webm" }));
        var wasHidden = playBtn.hidden;
        playBtn.hidden = false;
        if (wasHidden && onReflow) onReflow(btn);
      };
      recorder = rec;
      rec.start();
      btn.classList.add("on");
      btn.querySelector("span").textContent = "Stopp";
    }).catch(function () {
      btn.querySelector("span").textContent = "Kein Mikrofon";
      btn.disabled = true;
    });
  }

  /* ---------- wiring ----------
     `onReflow(anchorNode)` is handed back to the reader after anything
     that changes the height of the content, so it can re-paginate and
     keep the reader on the page it was already looking at. */

  function wire(unit, host, onReflow) {
    var tasks = Array.prototype.slice.call(host.querySelectorAll(".task"));
    current = { unit: unit, host: host, tasks: tasks };
    marked = null;
    var score = host.querySelector(".score");
    var allSpeaking = unit.aufgaben.every(function (t) { return t.typ === "sprechen"; });

    Array.prototype.forEach.call(host.querySelectorAll(".opts"), function (group) {
      group.addEventListener("change", function () {
        Array.prototype.forEach.call(group.querySelectorAll(".opt"), function (o) {
          o.classList.toggle("sel", !!o.querySelector("input:checked"));
        });
      });
    });

    /* live word count for free writing — same height, so no re-layout */
    Array.prototype.forEach.call(host.querySelectorAll(".t-frei"), function (node) {
      var ta = node.querySelector("textarea");
      var out = node.querySelector(".wc-n");
      ta.addEventListener("input", function () { out.textContent = wordCount(ta.value); });
    });

    tasks.forEach(function (node, i) {
      var t = unit.aufgaben[i];
      if (t.typ !== "sprechen") return;

      var show = node.querySelector(".sp-show");
      show.addEventListener("click", function () {
        var on = !node.classList.contains("shown");
        node.classList.toggle("shown", on);
        show.textContent = on ? "Muster ausblenden" : "Muster zeigen";
        if (onReflow) onReflow(show);
      });

      var tts = node.querySelector(".sp-tts");
      tts.addEventListener("click", function () {
        speak(lines(t.muster).map(function (z) {
          return String(z).replace(/^[A-ZÄÖÜ][\wäöüß]*:\s*/, "").replace(/[*_]/g, "");
        }).join(" "));
      });

      if (canRecord()) {
        var rec = node.querySelector(".sp-rec");
        var play = node.querySelector(".sp-play");
        rec.hidden = false;
        rec.addEventListener("click", function () { toggleRecording(rec, play, onReflow); });
        play.addEventListener("click", function () {
          if (play.url) new Audio(play.url).play();
        });
      }
    });

    /* Changing an answer after "Antworten prüfen": that task's old verdict
       goes, so the page never says "Leider nicht" next to an answer that is
       now right, and Vorlesen reads the task as a question again. Pressing
       "Antworten prüfen" once more marks it afresh. Free writing is left
       alone — its model answer is there to compare with while you edit. */
    tasks.forEach(function (node, i) {
      var t = unit.aufgaben[i];
      if (t.typ === "frei") return;
      function onEdit(e) {
        if (!marked || !marked.results[i]) return;
        if (!e.target.matches || !e.target.matches("input, textarea")) return;
        marked.results[i] = null;
        Array.prototype.forEach.call(node.querySelectorAll(".opt"), function (o) {
          o.classList.remove("right", "wrong");
        });
        Array.prototype.forEach.call(node.querySelectorAll("input.gap, textarea"), function (f) {
          f.classList.remove("right", "wrong");
        });
        var fb = node.querySelector(".t-fb");
        fb.className = "t-fb";
        fb.innerHTML = "";
        /* stay on the page with the field being changed, even when the
           task itself starts on the page before */
        if (onReflow) onReflow(e.target);
      }
      node.addEventListener("input", onEdit);
      node.addEventListener("change", onEdit);
    });

    /* The German voice list arrives late on some devices. */
    function offerVoices() {
      if (!germanVoice()) return;
      var hidden = host.querySelectorAll(".sp-tts[hidden]");
      if (!hidden.length) return;
      Array.prototype.forEach.call(hidden, function (b) { b.hidden = false; });
      if (onReflow) onReflow(null);
    }
    if (global.speechSynthesis && host.querySelector(".sp-tts")) {
      offerVoices();
      if (global.speechSynthesis.addEventListener) {
        global.speechSynthesis.addEventListener("voiceschanged", offerVoices);
      }
    }

    host.querySelector(".btn-check").addEventListener("click", function () {
      stopRecording();
      var won = 0;
      var points = 0;
      var results = [];
      tasks.forEach(function (node, i) {
        var res = markTask(node, unit.aufgaben[i], erklFor(unit, i));
        results.push(res);
        points += res.points;
        won += res.won;
      });
      /* kept for the page reader, which talks the learner through them */
      marked = { results: results, won: won, points: points };

      score.hidden = false;
      review.hidden = false;
      if (points === 0) {
        score.textContent = "Vergleichen Sie mit den Musterlösungen";
        score.classList.remove("good");
      } else {
        score.textContent = won + " / " + points + (allSpeaking ? " geschafft" : " richtig");
        score.classList.toggle("good", won / points >= 0.6);
      }
      saveResult(unit.id, won, points);

      Array.prototype.forEach.call(host.querySelectorAll(".sp-show"), function (b) {
        b.textContent = "Muster ausblenden";
      });

      /* Feedback boxes just appeared, so every page after them has moved.
         Re-paginate and stay on the score. */
      if (onReflow) onReflow(score);
    });

    host.querySelector(".btn-reset").addEventListener("click", function () {
      stopRecording();
      marked = null;
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
        Array.prototype.forEach.call(node.querySelectorAll(".wc-n"), function (w) {
          w.textContent = "0";
        });
        var show = node.querySelector(".sp-show");
        if (show) show.textContent = "Muster zeigen";
        node.classList.remove("shown");
        node.querySelector(".t-fb").className = "t-fb";
      });
      score.hidden = true;
      review.hidden = true;
      if (onReflow) onReflow(tasks[0]);
    });

    /* "Korrekturen ansehen": marking leaves you on the score at the end;
       this takes you back to the first task, where every correction now
       sits under its answer. Page view turns to that page; scroll view
       scrolls there. */
    var review = host.querySelector(".btn-review");
    review.addEventListener("click", function () {
      var first = tasks[0];
      if (!first) return;
      var rdr = document.getElementById("rdr");
      if (rdr && rdr.classList.contains("scrollmode")) first.scrollIntoView({ block: "start", behavior: "instant" });
      else if (onReflow) onReflow(first);
    });
  }

  /* ---------- the teacher's voice (for Vorlesen) ----------
     Vorlesen reads the unit page like a book page, except for the tasks:
     for those it asks this code what to say.

     Before "Antworten prüfen" it reads the task as it stands — number,
     question, the choices — and never gives the answer away.
     After marking it talks the learner through each task: what they
     chose, whether that was right, the right answer if not, and why.
     At the score it sums up and names the tasks to look at again. */

  var current = null;   /* { unit, host, tasks } of the unit on screen */
  var marked = null;    /* { results, won, points } after marking */

  /* a marked-up string → spoken parts, each in one language, using the
     same language rules as the page */
  function parts(s, ctx) {
    var box = document.createElement("div");
    box.innerHTML = inline(s, ctx);
    var out = [];
    var walk = function (n, lang) {
      if (n.nodeType === 3) {
        var de = lang === "de";
        var last = out[out.length - 1];
        if (last && last.de === de) last.text += n.nodeValue;
        else out.push({ text: n.nodeValue, de: de });
        return;
      }
      var l = n.getAttribute && n.getAttribute("lang");
      Array.prototype.forEach.call(n.childNodes, function (c) { walk(c, l || lang); });
    };
    walk(box, ctx);
    return out.filter(function (p) { return /[\p{L}\p{N}]/u.test(p.text); });
  }
  function say(text) { return { text: text, de: false }; }            /* English */
  function sag(text) { return { text: text, de: true }; }             /* German */
  /* a blank in a question is read as a short pause */
  function gapless(s) { return String(s).replace(/_{2,}/g, " … "); }

  var PRAISE = ["that's right.", "correct.", "well done, that's right.", "yes, that's correct.", "right."];

  function taskScript(node) {
    var i = current.tasks.indexOf(node);
    var t = current.unit.aufgaben[i];
    if (!t) return null;
    var n = i + 1;
    var pieces = [];
    var q = node.querySelector(".t-q") || node;
    var qp = parts(gapless(t.frage), "de");
    if (qp.length && qp[0].de) qp[0].text = n + ". " + qp[0].text; else qp.unshift(sag(n + "."));
    if (t.hinweis) qp = qp.concat(parts("(" + t.hinweis + ")", "de"));
    pieces.push({ el: q, parts: qp });

    var brief = node.querySelector(".brief");
    if (brief && t.vorlage) pieces.push({ el: brief, parts: parts(lines(t.vorlage).filter(Boolean).join(" \n"), "de") });

    var res = marked && marked.results[i];
    var fb = node.querySelector(".t-fb");
    var fbEl = fb && fb.getClientRects().length ? fb : q;
    var erkl = erklFor(current.unit, i);
    var why = erkl ? parts(erkl, "en") : t.warum ? parts(t.warum, "de") : [];

    /* ----- not marked yet: read the task, never the answer ----- */
    if (!res) {
      if (t.typ === "rf") {
        pieces.push({ el: node.querySelector(".opts") || q, parts: [sag("Richtig oder falsch?")] });
      } else if (t.typ === "mc") {
        Array.prototype.forEach.call(node.querySelectorAll(".opts .opt"), function (o, k) {
          pieces.push({ el: o, parts: parts(t.optionen[k], "de") });
        });
      } else if (t.typ === "feld") {
        Array.prototype.forEach.call(node.querySelectorAll(".f-row"), function (r, k) {
          pieces.push({ el: r, parts: parts(t.felder[k].label, "de") });
        });
      } else if (t.typ === "frei" && t.punkte) {
        Array.prototype.forEach.call(node.querySelectorAll(".punkte li"), function (li, k) {
          pieces.push({ el: li, parts: parts(t.punkte[k], "de") });
        });
      } else if (t.typ === "sprechen") {
        var k = node.querySelector(".karte");
        if (k && t.karte) pieces.push({ el: k, parts: parts(t.karte.thema + ": " + t.karte.wort, "de") });
        var st = node.querySelector(".stichworte");
        if (st && t.stichworte) pieces.push({ el: st, parts: [sag("Stichworte: ")].concat(parts(t.stichworte.join(", "), "de")) });
        /* the learner opened the model answer: read it */
        var mu = node.querySelector(".sp-muster");
        if (node.classList.contains("shown") && mu && mu.getClientRects().length) {
          pieces.push({ el: mu, parts: [say("Here is a model answer.")].concat(parts(lines(t.muster).filter(Boolean).join(" "), "de")) });
        }
      } else if (t.woerter) {
        var ch = node.querySelector(".chips");
        if (ch) pieces.push({ el: ch, parts: [sag("Wörter: ")].concat(parts(t.woerter.join(", "), "de")) });
      }
      return pieces;
    }

    /* ----- marked: talk it through ----- */
    var P = [];
    if (t.typ === "rf" || t.typ === "mc") {
      if (!res.answered) P = [say("You didn't answer this one. The answer is:"), sag(res.want + ".")];
      else if (res.correct) P = [say("You chose"), sag(res.given), say("— " + PRAISE[i % PRAISE.length])];
      else P = [say("You chose"), sag(res.given), say("— that's not right. The answer is:"), sag(res.want + ".")];
    } else if (t.typ === "luecke") {
      if (!res.answered) P = [say("You left this one blank. The answer is:"), sag(res.want + ".")];
      else if (res.correct) P = [say("You wrote"), sag(res.given), say("— " + PRAISE[i % PRAISE.length])];
      else P = [say("You wrote"), sag(res.given), say("— not quite. It should be:"), sag(res.want + ".")];
    } else if (t.typ === "feld") {
      if (!res.wrongFields.length) P = [say("Every field is right. Well done.")];
      else {
        P = [say("You got " + res.won + " of " + res.points + " fields right. Here is what needs changing.")];
        res.wrongFields.forEach(function (f) {
          P = P.concat(parts(f.label, "de"), [say("should be"), sag(f.want + ".")]);
        });
      }
    } else if (t.typ === "frei") {
      P = [say("There isn't one single right answer here. Compare yours with this model answer.")]
        .concat(parts(lines(t.muster).filter(Boolean).join(" \n"), "de"));
      if (t.checkliste) P = P.concat([say("Now check your own text.")], parts(t.checkliste.join(" \n"), "de"));
    } else if (t.typ === "sprechen") {
      P = [say("Here is a model answer.")].concat(parts(lines(t.muster).filter(Boolean).join(" \n"), "de"));
      if (t.warum) P = P.concat(parts(t.warum, "de"));
      P = P.concat(res.rated
        ? [say("You rated this one as"), sag(res.rated + ".")]
        : [say("You haven't rated this one yet. Say it aloud, compare it with the model, then choose"), sag("Geschafft"), say("or"), sag("Noch üben.")]);
      why = [];
    }
    pieces.push({ el: fbEl, parts: P.concat(why) });
    return pieces;
  }

  function barScript(bar) {
    if (!marked) return [];
    var u = current.unit, R = marked.results;
    var allSpeaking = u.aufgaben.every(function (t) { return t.typ === "sprechen"; });
    if (!marked.points) return [{ el: bar, parts: [say("There is no score for free writing. Compare your texts with the model answers above.")] }];
    var P = [];
    if (allSpeaking) P.push(say("You rated " + marked.won + " of " + marked.points + " tasks as done."));
    else P.push(say("You got " + marked.won + " out of " + marked.points + " right."));
    var r = marked.won / marked.points;
    P.push(say(r === 1 ? "Excellent — everything is right." :
               r >= 0.8 ? "Very good work." :
               r >= 0.6 ? "Good — you have passed the mark you need." :
               "Keep going — go through the explanations and try this unit again."));
    var again = [];
    R.forEach(function (x, k) { if (x && x.points && x.won < x.points) again.push(k + 1); });
    if (again.length && again.length <= 8) {
      P.push(say((again.length === 1 ? "Look again at number " : "Look again at numbers ") +
        (again.length === 1 ? again[0] : again.slice(0, -1).join(", ") + " and " + again[again.length - 1]) + "."));
    }
    P.push(say("To see every correction, press"), sag("Korrekturen ansehen."));
    return [{ el: bar, parts: P }];
  }

  global.VORLESEN_SCRIPT = {
    selector: ".task, .task-bar",
    speak: function (el) {
      if (!current || !current.host.contains(el)) return null;
      if (el.classList.contains("task-bar")) return barScript(el);
      return taskScript(el);
    }
  };

  /* ---------- index pages ---------- */

  function renderIndex(skillKey) {
    var sk = skill(skillKey);
    var done = readStore();
    var html = "";

    sk.gruppen.forEach(function (g) {
      var units = sk.units.filter(function (u) { return u.gruppe === g.key; });
      if (!units.length) return;

      html +=
        '<section class="unit-group"><h2>' + esc(g.titel) +
        ' <span class="g-unter">' + esc(g.unter) + "</span></h2><p>" +
        inline(g.text) + '</p><div class="unit-list">';

      units.forEach(function (u) {
        var r = done[u.id];
        html +=
          '<a class="unit-item" href="unit.html?u=' + esc(u.id) + '">' +
          '<div class="u-top"><span class="u-nr">' + esc(u.id) + "</span>" +
          "<span>" + u.aufgaben.length + " Aufgaben</span>" +
          (r ? '<span class="u-done">' + icon("check") + (r.t ? " " + r.r + "/" + r.t : " bearbeitet") + "</span>" : "") +
          '<span class="stufe" aria-label="Stufe ' + u.stufe + ' von 3">' +
          '<i class="on"></i>'.repeat(u.stufe) + "<i></i>".repeat(3 - u.stufe) + "</span>" +
          "</div>" +
          "<h3>" + esc(u.title) + "</h3>" +
          '<div class="u-sub">' + esc(plain(u.subtitle)) + "</div>" +
          '<div class="u-focus">' + esc(u.focus) + "</div>" +
          "</a>";
      });

      html += "</div></section>";
    });

    return html;
  }

  function counts(skillKey) {
    var sk = skill(skillKey);
    return {
      units: sk.units.length,
      tasks: sk.units.reduce(function (n, u) { return n + u.aufgaben.length; }, 0),
      done: sk.units.filter(function (u) { return readStore()[u.id]; }).length
    };
  }

  global.DE_PRACTICE = {
    render: render,
    wire: wire,
    skill: skill,
    renderIndex: renderIndex,
    counts: counts,
    results: readStore,
    normalise: normalise,
    plain: plain
  };
})(window);
