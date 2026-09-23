/* ============================================================
   Vorlesen — the reading helper for the Written Book

   Reads the page you are looking at, in German and English, using two
   voices that run inside the browser. Nothing is sent anywhere and
   nothing plays until the reader asks for it.

   How it knows which language to speak: the chapters mark it. German
   carries class "de-word" (shown in gold) or lang="de" (no visible
   change); English glosses carry class "en". The innermost mark wins,
   so a German name inside an English translation is still German.
   Everything unmarked is English. Nothing is guessed at reading time.

   How it knows what is on screen: pages are CSS columns scrolled
   sideways inside .rdr-flow, and one page is exactly the width of
   .rdr-track. Measuring a sentence against that gives its page number,
   so reading can stop at the bottom of the page you are on.

   This file does not modify the reader. It listens and measures.
   ============================================================ */

(function () {
  "use strict";

  var VOICE_BASE = "https://huggingface.co/diffusionstudio/piper-voices/resolve/main";
  var WASM_BASE  = "https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize";
  var ORT_BASE   = "https://cdnjs.cloudflare.com/ajax/libs/onnxruntime-web/1.18.0/";
  var ORT_SRC    = ORT_BASE + "ort.min.js";
  var PHON_SRC   = WASM_BASE + ".js";
  var CACHE      = "de-vorlesen-v1";

  /* Chosen by listening, after four rounds of measuring got it wrong.
     Both are single-speaker recordings: multi-speaker models come apart
     on bare single words, and this book is full of them. */
  var DE = { path:"de/de_DE/thorsten_emotional/medium/de_DE-thorsten_emotional-medium.onnx", sid:4, mb:73 };
  var EN = { path:"en/en_GB/alan/medium/en_GB-alan-medium.onnx", sid:null, mb:60 };
  var TOTAL_MB = DE.mb + EN.mb;

  var SEEN_KEY = "de-vorlesen-seen-v1";
  var GUIDE_KEY = "de-vorlesen-guide-v1";

  var stage, flow, track, root;
  var pill, panel, bar, barFill, goBtn, stopBtn, note, errLine, bubble;
  var de = null, en = null;
  var busy = false, speaking = false, stopFlag = false, audio = null;
  var watchLeft = null;

  function $(s, r) { return (r || document).querySelector(s); }
  function store(k, v) { try { v === undefined ? 0 : localStorage.setItem(k, v); return localStorage.getItem(k); } catch (e) { return null; } }

  /* ─── loading the two libraries only when first needed ─────── */

  function script(src) {
    return new Promise(function (res, rej) {
      if (document.querySelector('script[src="' + src + '"]')) return res();
      var s = document.createElement("script");
      s.src = src;
      s.onload = function () { res(); };
      s.onerror = function () { rej(new Error("Could not load the speech engine.")); };
      document.head.appendChild(s);
    });
  }

  async function grab(url, onProgress) {
    var c = ("caches" in window) ? await caches.open(CACHE) : null;
    var hit = c && await c.match(url);
    if (hit) return await hit.arrayBuffer();
    var res = await fetch(url);
    if (!res.ok) throw new Error("Download failed (" + res.status + ")");
    var total = +(res.headers.get("Content-Length") || 0);
    var rd = res.body.getReader(), parts = [], got = 0;
    for (;;) {
      var r = await rd.read();
      if (r.done) break;
      parts.push(r.value); got += r.value.length;
      if (onProgress) onProgress(got, total);
    }
    var buf = new Uint8Array(got), at = 0;
    parts.forEach(function (p) { buf.set(p, at); at += p.length; });
    if (c) { try { await c.put(url, new Response(buf.slice(0))); } catch (e) {} }
    return buf.buffer;
  }

  async function loadVoice(v, onProgress) {
    var cfgBuf = await grab(VOICE_BASE + "/" + v.path + ".json");
    var cfg = JSON.parse(new TextDecoder().decode(cfgBuf));
    var model = await grab(VOICE_BASE + "/" + v.path, onProgress);
    ort.env.wasm.wasmPaths = ORT_BASE;
    ort.env.wasm.numThreads = 1;      /* Pages sends no COOP/COEP headers */
    ort.env.logLevel = "error";
    var session = await ort.InferenceSession.create(model);
    return { cfg:cfg, session:session, rate:cfg.audio.sample_rate, sid:v.sid };
  }

  async function install() {
    await script(ORT_SRC);
    await script(PHON_SRC);
    var doneMb = 0;
    var tick = function (got, total) {
      var pc = (doneMb + got / 1048576) / TOTAL_MB * 100;
      barFill.style.width = Math.min(99, pc) + "%";
      goBtn.textContent = "Downloading… " + Math.round(doneMb + got / 1048576) + " of " + TOTAL_MB + " MB";
    };
    de = await loadVoice(DE, tick);
    doneMb = DE.mb;
    en = await loadVoice(EN, tick);
    barFill.style.width = "100%";
  }

  /* ─── text to sound ────────────────────────────────────────── */

  function phonemize(text, voice) {
    return new Promise(function (resolve, reject) {
      var out = [];
      createPiperPhonemize({
        print: function (l) { try { out.push(JSON.parse(l).phonemes); } catch (e) {} },
        printErr: function (e) { reject(new Error(String(e))); },
        locateFile: function (p) {
          return /\.wasm$/.test(p) ? WASM_BASE + ".wasm"
               : /\.data$/.test(p) ? WASM_BASE + ".data" : p;
        }
      }).then(function (m) {
        m.callMain(["-l", voice, "--input", JSON.stringify([{ text:text }]), "--espeak_data", "/espeak-ng-data"]);
        out.length ? resolve(out) : reject(new Error("nothing to read"));
      }).catch(reject);
    });
  }

  /* each voice has its own phoneme table — map through it rather than
     trusting the phonemizer's default ids */
  function toIds(ph, cfg) {
    var m = cfg.phoneme_id_map, o = [];
    var add = function (k) { if (m[k]) Array.prototype.push.apply(o, m[k]); };
    add("^"); add("_");
    ph.forEach(function (p) { if (m[p]) { Array.prototype.push.apply(o, m[p]); add("_"); } });
    add("$");
    return o;
  }

  /* volume only: one multiplier for every sample, no tone change */
  function level(x) {
    var peak = 0, i, a;
    for (i = 0; i < x.length; i++) { a = x[i] < 0 ? -x[i] : x[i]; if (a > peak) peak = a; }
    if (peak < 1e-6) return x;
    var g = 0.95 / peak;
    for (i = 0; i < x.length; i++) x[i] *= g;
    return x;
  }

  async function synth(text, isDe) {
    var v = isDe ? de : en;
    if (!v) return null;
    var t = text.trim();
    if (!t) return null;
    if (!/\s/.test(t)) t = t.replace(/[.!?,;:]*$/, ".");   /* a bare word needs an ending */
    var groups = await phonemize(t, v.cfg.espeak.voice);
    var inf = v.cfg.inference || {};
    var parts = [];
    for (var g = 0; g < groups.length; g++) {
      var ids = toIds(groups[g], v.cfg);
      if (ids.length < 4) continue;
      var feeds = {
        input: new ort.Tensor("int64", BigInt64Array.from(ids.map(function (i) { return BigInt(i); })), [1, ids.length]),
        input_lengths: new ort.Tensor("int64", BigInt64Array.from([BigInt(ids.length)])),
        scales: new ort.Tensor("float32", Float32Array.from([
          inf.noise_scale != null ? inf.noise_scale : 0.667,
          (inf.length_scale != null ? inf.length_scale : 1) * 1.1,
          inf.noise_w != null ? inf.noise_w : 0.8
        ]))
      };
      if (v.sid != null) feeds.sid = new ort.Tensor("int64", BigInt64Array.from([BigInt(v.sid)]));
      var out = await v.session.run(feeds);
      parts.push(out.output.data);
    }
    if (!parts.length) return null;
    var n = parts.reduce(function (a, p) { return a + p.length; }, 0);
    var all = new Float32Array(n), at = 0;
    parts.forEach(function (p) { all.set(p, at); at += p.length; });
    return wav(level(all), v.rate);
  }

  function wav(x, rate) {
    var n = x.length, dv = new DataView(new ArrayBuffer(44 + n * 2));
    var put = function (o, s) { for (var i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)); };
    put(0, "RIFF"); dv.setUint32(4, 36 + n * 2, true); put(8, "WAVEfmt ");
    dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true);
    dv.setUint32(24, rate, true); dv.setUint32(28, rate * 2, true);
    dv.setUint16(32, 2, true); dv.setUint16(34, 16, true);
    put(36, "data"); dv.setUint32(40, n * 2, true);
    for (var i = 0; i < n; i++) {
      var s = Math.max(-1, Math.min(1, x[i]));
      dv.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return new Blob([dv.buffer], { type:"audio/wav" });
  }

  function play(blob) {
    return new Promise(function (res) {
      if (audio) { try { audio.pause(); URL.revokeObjectURL(audio.src); } catch (e) {} }
      audio = new Audio(URL.createObjectURL(blob));
      audio.onended = audio.onerror = function () { res(); };
      audio.play().catch(function () { res(); });
    });
  }

  /* ─── reading the page ─────────────────────────────────────── */

  function isGerman(el) {
    var m = el && el.closest(".de-word, .en, [lang]");
    if (!m) return false;
    if (m.classList.contains("de-word")) return true;
    if (m.classList.contains("en")) return false;
    return /^de\b/i.test(m.getAttribute("lang"));   /* <html lang="en"> lands here too */
  }

  /* Collect every sentence in the flow as a Range, tagged with its
     language. Ranges are used rather than element text so a sentence
     that is split across a column break can still be located exactly. */
  function collect() {
    var units = [];
    var walker = document.createTreeWalker(flow, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        /* skip the furniture: the syllabus kicker, the link to the topic
           sheet, the end-of-chapter card and our own controls. None of
           it is the chapter, and read aloud it is just noise. */
        if (p.closest(".book-kicker, .image-link, .rdr-end, .vl-pill, .vl-panel, script, style")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    /* A run must never cross a block boundary. Without this, a table
       cell's pronunciation glues onto the next row's number and comes
       out as "nool7" — the cells are separate things being said. */
    var BLOCK = "td,th,li,p,h1,h2,h3,h4,h5,h6,figcaption,blockquote,dt,dd," +
                ".book-title,.book-sub,.exercise-item";

    /* Spaces and punctuation belong to no language. They ride along with
       the run they sit in, so a space between two German spans stays a
       space ("Ich sehe" + "den Mann", not "Ich seheden Mann") and a lone
       "___ (" between two German words doesn't split them into separate
       utterances with a pause in between. */
    var NEUTRAL = /^[^\p{L}\p{N}]*$/u;
    var node, run = null, lastBlock = null, held = [];
    while ((node = walker.nextNode())) {
      var block = node.parentElement.closest(BLOCK) || flow;
      if (block !== lastBlock) { run = null; held = []; }
      lastBlock = block;
      if (NEUTRAL.test(node.nodeValue)) {
        if (run) run.pieces.push(node); else held.push(node);
        continue;
      }
      var isDe = isGerman(node.parentElement);
      if (!run || run.de !== isDe) {
        run = { de:isDe, pieces:held };
        held = [];
        units.push(run);
      }
      run.pieces.push(node);
    }

    /* split each language run into sentences, each with its own Range */
    var out = [];
    units.forEach(function (r) {
      var text = r.pieces.map(function (n) { return n.nodeValue; }).join("");
      if (!text.trim()) return;
      var re = /[^.!?…]+[.!?…]*/g, m, at = 0;
      var spans = [];
      while ((m = re.exec(text))) {
        if (m[0].trim()) spans.push({ s:m.index, e:m.index + m[0].length });
      }
      if (!spans.length) spans = [{ s:0, e:text.length }];
      spans.forEach(function (sp) {
        var rg = rangeFor(r.pieces, sp.s, sp.e);
        if (rg) out.push({ range:rg, text:text.slice(sp.s, sp.e).trim(), de:r.de });
      });
      at = at;
    });
    /* a piece with nothing to say ("·", "—", "___") is never sent to a voice */
    return out.filter(function (u) { return /[\p{L}\p{N}]/u.test(u.text); });
  }

  /* map a character span across the run's text nodes into a Range */
  function rangeFor(nodes, s, e) {
    var pos = 0, rg = document.createRange(), started = false;
    for (var i = 0; i < nodes.length; i++) {
      var len = nodes[i].nodeValue.length;
      if (!started && s < pos + len) { rg.setStart(nodes[i], s - pos); started = true; }
      if (started && e <= pos + len) { rg.setEnd(nodes[i], e - pos); return rg; }
      pos += len;
    }
    if (started) { rg.setEnd(nodes[nodes.length - 1], nodes[nodes.length - 1].nodeValue.length); return rg; }
    return null;
  }

  function pageStep() { return track.clientWidth; }          /* one page == the track's width */
  function currentPage() { return Math.round(flow.scrollLeft / pageStep()); }

  function pageOf(range) {
    var r = range.getBoundingClientRect();
    if (!r.width && !r.height) return -1;
    var f = flow.getBoundingClientRect();
    return Math.floor((r.left - f.left + flow.scrollLeft) / pageStep() + 0.002);
  }

  function isScrollMode() { return root.classList.contains("scrollmode"); }

  /* highlight without touching layout: the Highlight API when it exists,
     otherwise a background on the containing element */
  var hl = null, hlEl = null;
  function highlight(range) {
    clearHighlight();
    if (window.CSS && CSS.highlights && window.Highlight) {
      try {
        hl = new Highlight(range);
        CSS.highlights.set("vl-now", hl);
        return;
      } catch (e) {}
    }
    var el = range.startContainer.parentElement;
    if (el) { el.classList.add("vl-now"); hlEl = el; }
  }
  function clearHighlight() {
    if (window.CSS && CSS.highlights) { try { CSS.highlights.delete("vl-now"); } catch (e) {} }
    hl = null;
    if (hlEl) { hlEl.classList.remove("vl-now"); hlEl = null; }
  }

  async function read(units) {
    if (!units.length) { setSpeaking(false); return; }
    stopFlag = false;
    setSpeaking(true);

    var pageAtStart = isScrollMode() ? null : currentPage();
    if (pageAtStart !== null) watchPage(pageAtStart);

    var pending = synth(units[0].text, units[0].de);
    for (var i = 0; i < units.length; i++) {
      if (stopFlag) break;
      var blob = await pending;
      if (i + 1 < units.length) pending = synth(units[i + 1].text, units[i + 1].de);
      if (stopFlag) break;
      if (!blob) continue;
      highlight(units[i].range);
      if (isScrollMode()) {
        var el = units[i].range.startContainer.parentElement;
        if (el && el.scrollIntoView) el.scrollIntoView({ block:"center", behavior:"smooth" });
      }
      await play(blob);
    }
    clearHighlight();
    unwatchPage();
    setSpeaking(false);
  }

  /* turning the page stops the reading — it was reading that page */
  function watchPage(startPage) {
    unwatchPage();
    watchLeft = function () {
      if (currentPage() !== startPage) stop();
    };
    flow.addEventListener("scroll", watchLeft, { passive:true });
  }
  function unwatchPage() {
    if (watchLeft) { flow.removeEventListener("scroll", watchLeft); watchLeft = null; }
  }

  function stop() {
    stopFlag = true;
    if (audio) { try { audio.pause(); } catch (e) {} }
    clearHighlight();
    unwatchPage();
    setSpeaking(false);
  }

  function setSpeaking(on) {
    speaking = on;
    pill.classList.toggle("speaking", on);
    pill.setAttribute("aria-label", on ? "Stop reading" : "Vorlesen — read this page aloud");
    stopBtn.style.display = on ? "block" : "none";
  }

  function unitsForNow(fromRange) {
    var all = collect();
    if (fromRange) {
      var startTop = fromRange.getBoundingClientRect();
      var seen = false;
      all = all.filter(function (u) {
        if (seen) return true;
        var r = u.range.getBoundingClientRect();
        if (r.top > startTop.top - 2 || (Math.abs(r.top - startTop.top) < 2 && r.left >= startTop.left - 2)) {
          seen = true; return true;
        }
        return false;
      });
    }
    if (isScrollMode()) return all;
    var p = currentPage();
    return all.filter(function (u) { return pageOf(u.range) === p; });
  }

  /* ─── the pill, panel and guide ────────────────────────────── */

  function icon(name) {
    return '<svg class="icon-svg" aria-hidden="true"><use href="../../assets/icons.svg#icon-' + name + '"></use></svg>';
  }

  function build() {
    pill = document.createElement("button");
    pill.type = "button";
    pill.className = "vl-pill";
    pill.innerHTML = icon("mic");
    pill.setAttribute("aria-label", "Vorlesen — read this page aloud");

    if (!store(SEEN_KEY)) {
      pill.classList.add("fresh");
      var badge = document.createElement("span");
      badge.className = "vl-new";
      badge.textContent = "NEU";
      pill.appendChild(badge);
    }

    panel = document.createElement("div");
    panel.className = "vl-panel";
    panel.innerHTML =
      "<h4>Vorlesen</h4>" +
      "<p>Reads this page to you — German in a German voice, English in an English one.</p>" +
      '<button class="vl-go" type="button">Download the voices (' + TOTAL_MB + " MB)</button>" +
      '<div class="vl-bar"><i></i></div>' +
      '<button class="vl-stop" type="button">Stop reading</button>' +
      '<p class="vl-note">One download, kept on this device. Double-tap any word to hear just that word.</p>' +
      '<div class="vl-err"></div>';

    stage.appendChild(pill);
    stage.appendChild(panel);

    bar = $(".vl-bar", panel);
    barFill = $(".vl-bar i", panel);
    goBtn = $(".vl-go", panel);
    stopBtn = $(".vl-stop", panel);
    note = $(".vl-note", panel);
    errLine = $(".vl-err", panel);
    stopBtn.style.display = "none";

    bubble = document.createElement("div");
    bubble.className = "vl-bubble";
    document.body.appendChild(bubble);

    pill.addEventListener("click", onPill);
    goBtn.addEventListener("click", onGo);
    stopBtn.addEventListener("click", function () { stop(); });
    document.addEventListener("click", function (e) {
      if (!panel.contains(e.target) && e.target !== pill && !pill.contains(e.target)) panel.classList.remove("open");
      if (!bubble.contains(e.target)) bubble.classList.remove("open");
    });
  }

  function onPill() {
    pill.classList.remove("fresh");
    var badge = $(".vl-new", pill);
    if (badge) badge.remove();
    store(SEEN_KEY, "1");

    if (speaking) { stop(); return; }
    if (de && en) { startReading(); return; }
    panel.classList.toggle("open");
    if (panel.classList.contains("open") && !store(GUIDE_KEY)) guide();
  }

  async function onGo() {
    if (busy) return;
    busy = true;
    errLine.textContent = "";
    goBtn.disabled = true;
    bar.classList.add("on");
    try {
      await install();
      goBtn.textContent = "Ready";
      note.textContent = "Ready. It will start reading now — press the button again to stop.";
      setTimeout(function () { panel.classList.remove("open"); startReading(); }, 500);
    } catch (e) {
      errLine.textContent = "✕ " + (e && e.message ? e.message : e);
      goBtn.textContent = "Try again";
    }
    goBtn.disabled = false;
    busy = false;
  }

  function startReading(fromRange) {
    if (!de || !en) { panel.classList.add("open"); return; }
    if (speaking) stop();
    setTimeout(function () { read(unitsForNow(fromRange)); }, 60);
  }

  /* ─── double-tap a word ────────────────────────────────────── */

  var lastTap = 0, lastXY = null;

  function wordAt(x, y) {
    var range = null;
    if (document.caretRangeFromPoint) range = document.caretRangeFromPoint(x, y);
    else if (document.caretPositionFromPoint) {
      var p = document.caretPositionFromPoint(x, y);
      if (p) { range = document.createRange(); range.setStart(p.offsetNode, p.offset); range.collapse(true); }
    }
    if (!range || range.startContainer.nodeType !== 3) return null;
    var node = range.startContainer, text = node.nodeValue, i = range.startOffset;
    var isWord = function (c) { return c && /[^\s.,;:!?()"'„“»«\-–—]/.test(c); };
    if (!isWord(text[i]) && !isWord(text[i - 1])) return null;
    var s = i, e = i;
    while (s > 0 && isWord(text[s - 1])) s--;
    while (e < text.length && isWord(text[e])) e++;
    if (e <= s) return null;
    var rg = document.createRange();
    rg.setStart(node, s); rg.setEnd(node, e);
    return { range:rg, word:text.slice(s, e), de:isGerman(node.parentElement) };
  }

  function onTap(e) {
    var now = Date.now();
    var x = e.clientX, y = e.clientY;
    var near = lastXY && Math.abs(x - lastXY[0]) < 24 && Math.abs(y - lastXY[1]) < 24;
    if (now - lastTap < 400 && near) {
      lastTap = 0; lastXY = null;
      var hit = wordAt(x, y);
      if (hit) { e.preventDefault(); showBubble(hit, x, y); }
      return;
    }
    lastTap = now; lastXY = [x, y];
  }

  function showBubble(hit, x, y) {
    bubble.innerHTML = "";
    var w = document.createElement("div");
    w.className = "w";
    w.textContent = hit.word + (hit.de ? "  · Deutsch" : "  · English");
    bubble.appendChild(w);

    var one = document.createElement("button");
    one.type = "button";
    one.textContent = "Read this word";
    one.onclick = async function () {
      bubble.classList.remove("open");
      if (!de || !en) { panel.classList.add("open"); return; }
      stop();
      setSpeaking(true);
      highlight(hit.range);
      var b = await synth(hit.word, hit.de);
      if (b) await play(b);
      clearHighlight();
      setSpeaking(false);
    };

    var on = document.createElement("button");
    on.type = "button";
    on.textContent = "Read from here";
    on.onclick = function () {
      bubble.classList.remove("open");
      startReading(hit.range);
    };

    bubble.appendChild(one);
    bubble.appendChild(on);
    bubble.classList.add("open");

    var bw = bubble.offsetWidth, bh = bubble.offsetHeight;
    var left = Math.min(Math.max(8, x - bw / 2), window.innerWidth - bw - 8);
    var top = y + 14 + bh > window.innerHeight ? y - bh - 14 : y + 14;
    bubble.style.left = left + "px";
    bubble.style.top = Math.max(8, top) + "px";
  }

  /* ─── first-use guide ──────────────────────────────────────── */

  function guide() {
    var steps = [
      { h:"Vorlesen", p:"It reads the page you are looking at — German in a German voice, English in an English one — and stops at the bottom of the page." },
      { h:"One page at a time", p:"Turn to the next page and press the button again. In scroll view it reads the whole chapter instead." },
      { h:"Any single word", p:"Double-tap a word to hear just that word, or to start reading from there." }
    ];
    var i = 0;
    var wrap = document.createElement("div");
    wrap.className = "vl-guide open";
    /* the guide sits over everything, so its clicks must not reach the
       handler that closes the panel when you tap outside it */
    wrap.addEventListener("click", function (e) { e.stopPropagation(); });
    document.body.appendChild(wrap);

    function draw() {
      var s = steps[i];
      wrap.innerHTML =
        '<div class="card"><h5></h5><p></p><div class="row">' +
        '<span class="dots">' + (i + 1) + " of " + steps.length + "</span>" +
        '<button class="skip" type="button">Skip</button>' +
        '<button class="nxt" type="button">' + (i === steps.length - 1 ? "Got it" : "Next") + "</button>" +
        "</div></div>";
      $("h5", wrap).textContent = s.h;
      $("p", wrap).textContent = s.p;
      $(".skip", wrap).onclick = close;
      $(".nxt", wrap).onclick = function () { i++; i >= steps.length ? close() : draw(); };
    }
    function close() { store(GUIDE_KEY, "1"); wrap.remove(); }
    draw();
  }

  /* ─── start ────────────────────────────────────────────────── */

  function init() {
    root = document.getElementById("rdr");
    stage = document.getElementById("rdr-stage");
    flow = document.getElementById("rdr-flow");
    track = document.getElementById("rdr-track");
    if (!root || !stage || !flow || !track) return;

    build();
    flow.addEventListener("pointerup", onTap);
    window.addEventListener("pagehide", stop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
