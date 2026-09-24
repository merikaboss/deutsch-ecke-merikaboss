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
  var SPEED_KEY = "de-vorlesen-speed-v1";

  /* Speed is made when the voice speaks (Piper's length scale), not by
     stretching the finished audio, so slow stays clear and natural
     instead of warbling. Slow is for hearing every sound; fast is still
     comfortably followable. "len" multiplies Piper's length scale; the
     voice does not respond to it one-for-one, so the numbers were
     measured on real sentences: 1.42 gives 0.75× in both voices, 0.67
     gives 1.3× (German) to 1.4× (English). Single words keep their level. */
  var SPEEDS = {
    slow:   { len:1.42, label:"Slow",   tag:"0.75×" },
    normal: { len:1,    label:"Normal", tag:"1×"    },
    fast:   { len:0.67, label:"Fast",   tag:"1.3×"  }
  };
  var speed = SPEEDS[store(SPEED_KEY)] ? store(SPEED_KEY) : "normal";

  /* Silence after each piece, in ms at normal speed. Piper leaves almost
     none at the end of a clip, so without this two German lines ran
     together and sounded like one sentence. */
  var GAP_LINE = 520;       /* end of a line, cell, heading or paragraph */
  var GAP_SENTENCE = 380;   /* . ! ? inside a paragraph */
  var GAP_SWITCH = 60;      /* German to English inside one sentence */

  var stage, flow, track, root;
  var pill, panel, bar, barFill, goBtn, stopBtn, note, errLine, bubble, speedBtn, speedMenu;
  var keepBubbleUntil = 0;
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

  /* finalEnd: this piece closes a line. A line with no full stop
     (a heading, a table cell, "Wie ___ Sie") is given one, so the voice
     lets its tone fall like the end of a sentence instead of carrying on. */
  async function synth(text, isDe, finalEnd) {
    var v = isDe ? de : en;
    if (!v) return null;
    var sp = speed;
    var t = text.trim();
    if (!t) return null;
    if (!/\s/.test(t)) t = t.replace(/[.!?,;:]*$/, ".");   /* a bare word needs an ending */
    else if (finalEnd && !/[.!?…:]["'“”„)\]]*$/.test(t)) t += ".";
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
          (inf.length_scale != null ? inf.length_scale : 1) * 1.1 * SPEEDS[sp].len,
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
    var b = wav(level(all), v.rate);
    b.vlSpeed = sp;               /* so a speed change can tell which clips are stale */
    b.vlSec = all.length / v.rate;
    return b;
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

  var playDone = null;
  function play(blob) {
    return new Promise(function (res) {
      if (audio) { try { audio.pause(); URL.revokeObjectURL(audio.src); } catch (e) {} }
      audio = new Audio(URL.createObjectURL(blob));
      audio.vlSpeed = blob.vlSpeed;
      audio.preservesPitch = true;
      var done = function () { if (playDone === done) playDone = null; res(); };
      playDone = done;
      audio.onended = audio.onerror = done;
      audio.play().catch(done);
    });
  }

  /* the sentence already playing follows a speed change at once (pitch
     kept); everything after it is made fresh at the new speed */
  function setSpeed(s) {
    if (!SPEEDS[s]) return;
    if (s !== speed) speedEpoch++;
    speed = s;
    store(SPEED_KEY, s);
    if (audio && !audio.paused && audio.vlSpeed) {
      audio.playbackRate = SPEEDS[audio.vlSpeed].len / SPEEDS[s].len;
    }
    drawSpeed();
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
        run = { de:isDe, pieces:held, block:block };
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
        if (rg) out.push({ range:rg, text:text.slice(sp.s, sp.e).trim(), de:r.de, block:r.block });
      });
      at = at;
    });
    /* a piece with nothing to say ("·", "—", "___") is never sent to a voice */
    out = out.filter(function (u) { return /[\p{L}\p{N}]/u.test(u.text); });
    /* how much silence follows each piece: the end of a line, the end of
       a sentence, or just a change of voice in the middle of a sentence */
    out.forEach(function (u, i) {
      u.lineEnd = i === out.length - 1 || out[i + 1].block !== u.block;
      u.gap = u.lineEnd ? GAP_LINE : /[.!?…:]["'“”„)\]]*$/.test(u.text) ? GAP_SENTENCE : GAP_SWITCH;
    });
    return out;
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

    /* each reading has its own number, so an older one that is still
       waiting on the engine can never wake up and talk over a new one */
    var id = ++readId;
    var gone = function () { return stopFlag || id !== readId; };
    var make = function (u) { return synth(u.text, u.de, u.lineEnd).catch(function () { return null; }); };

    /* The engine works ahead of the voice, one clip after another, up to
       AHEAD pieces in front. With only one piece of lookahead, a short
       heading followed by a long sentence left a 2–3 s silence while the
       sentence was still being made. */
    var AHEAD = 4, clips = [], chain = Promise.resolve(), epoch = speedEpoch;
    var ensure = function (k) {
      if (k >= units.length || clips[k]) return;
      clips[k] = chain = chain.then(function () { return gone() ? null : make(units[k]); });
    };
    for (var i = 0; i < units.length; i++) {
      if (gone()) break;
      if (epoch !== speedEpoch) {
        /* speed changed: everything prepared ahead is remade at the new speed */
        epoch = speedEpoch;
        for (var k = i; k < clips.length; k++) clips[k] = null;
        chain = Promise.resolve();
      }
      for (var a = i; a <= i + AHEAD; a++) ensure(a);
      var blob = await clips[i];
      if (blob && blob.vlSpeed !== speed && !gone()) blob = await make(units[i]);
      /* a very short piece (a heading, one word) waits for the next one
         to be ready, so the pause comes before it, not in the middle */
      if (blob && blob.vlSec < 1.2 && i + 1 < units.length && !gone()) await clips[i + 1];
      clips[i] = true;
      if (gone()) break;
      if (!blob) continue;
      highlight(units[i].range);
      if (isScrollMode()) follow(units[i].range);
      await play(blob);
      if (gone()) break;
      if (i + 1 < units.length) await pause(units[i].gap * SPEEDS[speed].len);
    }
    if (!gone()) { clearHighlight(); unwatchPage(); setSpeaking(false); }
  }
  var readId = 0, speedEpoch = 0;

  /* scroll view: keep the sentence being read comfortably on screen.
     Only moves when it gets near an edge, so the text doesn't jump on
     every sentence; smooth when the page is visible, instant otherwise
     (a hidden tab never runs the smooth animation). */
  function follow(range) {
    var r = range.getBoundingClientRect(), t = track.getBoundingClientRect();
    if (!r.height) return;
    if (r.top >= t.top + t.height * 0.12 && r.bottom <= t.top + t.height * 0.72) return;
    track.scrollBy({
      top: r.top - (t.top + t.height * 0.3),
      behavior: document.visibilityState === "visible" ? "smooth" : "instant"
    });
  }

  /* a silence that ends at once if reading is stopped */
  var pauseEnd = null;
  function pause(ms) {
    return new Promise(function (res) {
      var t = setTimeout(done, ms);
      function done() { clearTimeout(t); pauseEnd = null; res(); }
      pauseEnd = done;
    });
  }

  /* turning the page stops the reading — it was reading that page */
  /* The scroll event alone is not enough: a browser can hold scroll
     events back (a hidden or throttled tab), and then the old page kept
     talking. A light check of the position every 200 ms backs it up. */
  var watchTimer = null;
  function watchPage(startPage) {
    unwatchPage();
    watchLeft = function () {
      if (currentPage() !== startPage) stop();
    };
    flow.addEventListener("scroll", watchLeft, { passive:true });
    watchTimer = setInterval(watchLeft, 200);
  }
  function unwatchPage() {
    if (watchLeft) { flow.removeEventListener("scroll", watchLeft); watchLeft = null; }
    if (watchTimer) { clearInterval(watchTimer); watchTimer = null; }
  }

  function stop() {
    stopFlag = true;
    if (audio) { try { audio.pause(); } catch (e) {} }
    if (playDone) playDone();
    if (pauseEnd) pauseEnd();
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
      /* Start at the tapped word itself, found by its place in the text.
         (Comparing screen positions failed in page view: the pages sit
         side by side, so earlier pages counted as "below" the word and
         reading went back to the top.) */
      var n = fromRange.startContainer, o = fromRange.startOffset, at = -1;
      for (var i = 0; i < all.length; i++) {
        var c;
        try { c = all[i].range.comparePoint(n, o); } catch (e) { continue; }
        if (c <= 0) { at = i; break; }          /* the word is inside, or before, this piece */
      }
      if (at < 0) return [];
      var first = all[at];
      if (first.range.comparePoint(n, o) === 0) {
        /* the word is in the middle of this sentence: read from the word on */
        var rg = first.range.cloneRange();
        rg.setStart(n, o);
        first = { range:rg, text:rg.toString().trim(), de:first.de, block:first.block,
                  lineEnd:first.lineEnd, gap:first.gap };
      }
      all = [first].concat(all.slice(at + 1));
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
      '<p class="vl-note">One download, kept on this device. Double-tap a word (on a computer: click and hold it) to hear just that word.</p>' +
      '<div class="vl-err"></div>';

    /* speed: a small tag under the mic; tap it for Slow / Normal / Fast */
    speedBtn = document.createElement("button");
    speedBtn.type = "button";
    speedBtn.className = "vl-speed";
    speedMenu = document.createElement("div");
    speedMenu.className = "vl-speedmenu";
    speedMenu.setAttribute("role", "menu");
    Object.keys(SPEEDS).forEach(function (k) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "menuitemradio");
      b.dataset.speed = k;
      b.innerHTML = '<span class="tick"></span><span class="nm"></span><span class="tg"></span>';
      $(".nm", b).textContent = SPEEDS[k].label;
      $(".tg", b).textContent = SPEEDS[k].tag;
      b.addEventListener("click", function () { setSpeed(k); speedMenu.classList.remove("open"); });
      speedMenu.appendChild(b);
    });
    speedBtn.addEventListener("click", function () {
      panel.classList.remove("open");
      speedMenu.classList.toggle("open");
    });

    stage.appendChild(pill);
    stage.appendChild(speedBtn);
    stage.appendChild(speedMenu);
    stage.appendChild(panel);
    drawSpeed();

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
      if (!speedMenu.contains(e.target) && !speedBtn.contains(e.target)) speedMenu.classList.remove("open");
      /* The gesture that opens the word bubble is followed by the
         browser's own click on that same word. Without this, that click
         closed the bubble the instant it appeared (the phone bug). */
      if (Date.now() < keepBubbleUntil) return;
      if (!bubble.contains(e.target)) closeBubble();
    }, true);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeBubble(); speedMenu.classList.remove("open"); }
    });
  }

  function drawSpeed() {
    if (!speedBtn) return;
    speedBtn.textContent = SPEEDS[speed].tag;
    speedBtn.setAttribute("aria-label", "Reading speed: " + SPEEDS[speed].label);
    speedBtn.classList.toggle("changed", speed !== "normal");
    Array.prototype.forEach.call(speedMenu.children, function (b) {
      var on = b.dataset.speed === speed;
      b.classList.toggle("on", on);
      b.setAttribute("aria-checked", on ? "true" : "false");
    });
  }

  function onPill() {
    pill.classList.remove("fresh");
    var badge = $(".vl-new", pill);
    if (badge) badge.remove();
    store(SEEN_KEY, "1");

    if (speaking) { stop(); return; }
    if (de && en) { startReading(); return; }
    if (panel.classList.contains("open")) { panel.classList.remove("open"); return; }
    ensureVoices().then(function (ok) { if (ok) startReading(); });
  }

  /* ─── voices already on this device ────────────────────────────
     The two voices are kept in the browser's Cache Storage after the
     first download, on every page of the site. A new page only has to
     read them back from the device (a few seconds, no internet needed
     for the voices) — the download offer appears again only if the
     person clears the site's data. */

  var MODEL_URLS = [DE, EN].reduce(function (a, v) {
    return a.concat(VOICE_BASE + "/" + v.path, VOICE_BASE + "/" + v.path + ".json");
  }, []);

  async function hasSavedVoices() {
    if (!("caches" in window)) return false;
    try {
      var c = await caches.open(CACHE);
      for (var i = 0; i < MODEL_URLS.length; i++) if (!(await c.match(MODEL_URLS[i]))) return false;
      return true;
    } catch (e) { return false; }
  }

  var waking = null;
  function ensureVoices() {
    if (de && en) return Promise.resolve(true);
    if (waking) return waking;
    waking = hasSavedVoices().then(function (saved) {
      if (!saved) {
        panel.classList.add("open");
        if (!store(GUIDE_KEY)) guide();
        return false;
      }
      pill.classList.add("loading");
      pill.setAttribute("aria-label", "Getting the voices ready");
      return install().then(function () { return true; }, function (e) {
        errLine.textContent = "✕ " + (e && e.message ? e.message : e);
        panel.classList.add("open");
        return false;
      });
    }).then(function (ok) {
      pill.classList.remove("loading");
      if (!speaking) pill.setAttribute("aria-label", "Vorlesen — read this page aloud");
      waking = null;
      return ok;
    });
    return waking;
  }

  async function onGo() {
    if (busy) return;
    busy = true;
    errLine.textContent = "";
    goBtn.disabled = true;
    bar.classList.add("on");
    try {
      await install();
      /* ask the browser to keep the voices even when space runs low —
         without this it may quietly clear them and ask for the download again */
      try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
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
    if (!de || !en) {
      ensureVoices().then(function (ok) { if (ok) startReading(fromRange); });
      return;
    }
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

  /* Phone: double-tap a word. Computer: click and hold a word (a mouse
     double-click works too, but the browser's own word-selection on
     double-click is what people fight with, so hold is the main way). */
  var HOLD_MS = 450;
  var holdTimer = null, holdXY = null, holdOpened = false;

  function onDown(e) {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    if (e.button !== 0) return;
    cancelHold();
    holdXY = [e.clientX, e.clientY];
    holdTimer = setTimeout(function () {
      holdTimer = null;
      var hit = wordAt(holdXY[0], holdXY[1]);
      if (!hit) return;
      holdOpened = true;
      clearSelection();
      showBubble(hit, holdXY[0], holdXY[1]);
    }, HOLD_MS);
  }
  function onMove(e) {
    if (holdTimer && holdXY && (Math.abs(e.clientX - holdXY[0]) > 6 || Math.abs(e.clientY - holdXY[1]) > 6)) cancelHold();
  }
  function cancelHold() { if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; } }

  function onTap(e) {
    cancelHold();
    if (holdOpened) {
      /* releasing the button after a hold: keep the bubble, drop the click */
      holdOpened = false;
      keepBubbleUntil = Date.now() + 400;
      clearSelection();
      lastTap = 0; lastXY = null;
      return;
    }
    var now = Date.now();
    var x = e.clientX, y = e.clientY;
    var near = lastXY && Math.abs(x - lastXY[0]) < 24 && Math.abs(y - lastXY[1]) < 24;
    if (now - lastTap < 400 && near) {
      lastTap = 0; lastXY = null;
      var hit = wordAt(x, y);
      if (hit) { e.preventDefault(); clearSelection(); showBubble(hit, x, y); }
      return;
    }
    lastTap = now; lastXY = [x, y];
  }

  function clearSelection() {
    try { var s = window.getSelection(); if (s && !s.isCollapsed) s.removeAllRanges(); } catch (e) {}
  }

  function closeBubble() {
    if (bubble && bubble.classList.contains("open")) {
      bubble.classList.remove("open");
      if (!speaking) clearHighlight();
    }
  }

  function showBubble(hit, x, y) {
    keepBubbleUntil = Date.now() + 600;
    /* show which word was picked while its options are open */
    if (!speaking) highlight(hit.range);
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
      if (!(await ensureVoices())) return;
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
      { h:"Any single word", p:"Double-tap a word — on a computer, click and hold it — to hear just that word, or to start reading from there." },
      { h:"Speed", p:"The small button under the microphone sets the speed: Slow for hearing every sound, Normal, or Fast." }
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
    flow.addEventListener("pointerdown", onDown);
    flow.addEventListener("pointermove", onMove, { passive:true });
    flow.addEventListener("pointerup", onTap);
    flow.addEventListener("pointercancel", cancelHold);
    /* a mouse double-click selects the word; the bubble replaces that */
    flow.addEventListener("dblclick", function () { if (bubble.classList.contains("open")) clearSelection(); });
    flow.addEventListener("scroll", function () { if (Date.now() > keepBubbleUntil) closeBubble(); }, { passive:true });
    track.addEventListener("scroll", function () { if (Date.now() > keepBubbleUntil) closeBubble(); }, { passive:true });
    window.addEventListener("resize", closeBubble);
    window.addEventListener("pagehide", stop);

    /* switching between page view and scroll view mid-reading stops it:
       the two modes read different amounts, so carrying on would be wrong */
    var wasScroll = isScrollMode();
    new MutationObserver(function () {
      var now = isScrollMode();
      if (now !== wasScroll) { wasScroll = now; if (speaking) stop(); closeBubble(); }
    }).observe(root, { attributes:true, attributeFilter:["class"] });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
