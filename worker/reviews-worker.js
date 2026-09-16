/* ============================================================
   Deutsch Ecke — reviews relay (Cloudflare Worker)

   The website cannot write to GitHub by itself: that needs a key,
   and anything in the website's code is public. This Worker holds
   the key as a secret, checks every review, and saves it to the
   `reviews` branch of the site's repository as reviews.json.

   GET  /reviews   -> summary + latest reviews (cached for a minute)
   POST /reviews   -> { stars: 1-5, reaction: key, text: <= 20 words }

   Setup (Cloudflare dashboard):
     Worker > Settings > Variables and Secrets > add
       GITHUB_TOKEN  (type: Secret)  fine-grained token, this repo only,
                                     permission Contents: Read and write
   Nothing about the visitor is stored: no name, no IP, no device.
   ============================================================ */

const REPO = "merikaboss/deutsch-ecke-merikaboss";
const BRANCH = "reviews";
const FILE = "reviews.json";

const ALLOWED_ORIGINS = [
  "https://merikaboss.github.io",
  "http://localhost:8788"
];

const REACTIONS = ["helpful", "clear", "love", "better"];
const MAX_WORDS = 20;
const MAX_CHARS = 160;
const LATEST = 40;
const CACHE_SECONDS = 60;
const RATE_SECONDS = 600; // one review per visitor connection per 10 minutes

/* Blocked outright. Kept short and obvious on purpose — the word
   limit and the link filter do most of the work. */
const BLOCKED = [
  "fuck", "shit", "bitch", "cunt", "pussy", "nigger", "nigga", "faggot",
  "whore", "slut", "porn", "xxx", "rape", "idiot", "stupid", "retard",
  "scheiße", "scheisse", "arschloch", "hure", "fotze", "wichser", "hurensohn",
  "casino", "crypto", "bitcoin", "viagra", "loan", "forex signal", "telegram", "whatsapp me"
];

/* ---------- helpers ---------- */

function cors(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}

function json(data, status, origin, extra) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: Object.assign({ "Content-Type": "application/json; charset=utf-8" }, cors(origin), extra || {})
  });
}

function b64decode(b64) {
  const bin = atob(b64.replace(/\n/g, ""));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function b64encode(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function gh(env, path, init) {
  return fetch("https://api.github.com/repos/" + REPO + path, Object.assign({}, init, {
    headers: Object.assign({
      "Authorization": "Bearer " + env.GITHUB_TOKEN,
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "deutsch-ecke-reviews"
    }, (init && init.headers) || {})
  }));
}

async function readFile(env) {
  const res = await gh(env, "/contents/" + FILE + "?ref=" + BRANCH);
  if (res.status === 404) return { list: [], sha: null };
  if (!res.ok) throw new Error("GitHub read failed: " + res.status);
  const body = await res.json();
  let list = [];
  try { list = JSON.parse(b64decode(body.content)); } catch (e) { list = []; }
  return { list: Array.isArray(list) ? list : [], sha: body.sha };
}

function summarise(list) {
  const count = list.length;
  const total = list.reduce((n, r) => n + r.s, 0);
  const stars = [0, 0, 0, 0, 0];
  const reactions = {};
  REACTIONS.forEach((k) => { reactions[k] = 0; });
  list.forEach((r) => {
    stars[r.s - 1] += 1;
    if (reactions[r.r] !== undefined) reactions[r.r] += 1;
  });
  return {
    count: count,
    average: count ? Math.round((total / count) * 10) / 10 : 0,
    stars: stars,
    reactions: reactions,
    latest: list.slice(-LATEST).reverse().map((r) => ({ s: r.s, r: r.r, t: r.t, d: r.d }))
  };
}

function clean(text) {
  return String(text || "")
    .replace(/[\x00-\x1f\x7f<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function problem(text) {
  if (!text) return null;
  if (text.length > MAX_CHARS) return "Too long.";
  if (text.split(" ").filter(Boolean).length > MAX_WORDS) return "Please keep it to 20 words.";
  if (/(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|ru|xyz|top|info|me|de|link|ly)\b|@[a-z0-9_]{2,}|(\+?\d[\s-]?){9,})/i.test(text)) {
    return "Links, handles and phone numbers are not allowed.";
  }
  const low = text.toLowerCase();
  if (BLOCKED.some((w) => low.includes(w))) return "Please keep it friendly.";
  if (/(.)\1{6,}/.test(low)) return "That does not look like a review.";
  return null;
}

/* ---------- handlers ---------- */

async function getReviews(request, env, ctx, origin) {
  const cache = caches.default;
  const key = new Request(new URL("/reviews-cache", request.url).toString());
  const hit = await cache.match(key);
  if (hit) {
    return json(await hit.json(), 200, origin, { "Cache-Control": "public, max-age=" + CACHE_SECONDS });
  }
  const { list } = await readFile(env);
  const data = summarise(list);
  ctx.waitUntil(cache.put(key, new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=" + CACHE_SECONDS }
  })));
  return json(data, 200, origin, { "Cache-Control": "public, max-age=" + CACHE_SECONDS });
}

async function postReview(request, env, ctx, origin) {
  if (!ALLOWED_ORIGINS.includes(origin)) return json({ error: "Not allowed." }, 403, origin);

  let body;
  try { body = await request.json(); } catch (e) { return json({ error: "Bad request." }, 400, origin); }

  /* Bots fill in every field and submit instantly. */
  if (body.website) return json({ ok: true }, 201, origin);
  if (typeof body.elapsed !== "number" || body.elapsed < 3000) {
    return json({ error: "Please take a moment before sending." }, 400, origin);
  }

  const stars = Number(body.stars);
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) return json({ error: "Choose 1 to 5 stars." }, 400, origin);
  const reaction = REACTIONS.includes(body.reaction) ? body.reaction : "";
  const text = clean(body.text);
  const bad = problem(text);
  if (bad) return json({ error: bad }, 400, origin);

  /* Rate limit without storing anything about the visitor: a hashed,
     day-salted connection address lives only in the edge cache. */
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const day = new Date().toISOString().slice(0, 10);
  const rateKey = new Request("https://rate.deutsch-ecke/" + (await sha256(ip + day + REPO)));
  if (await caches.default.match(rateKey)) {
    return json({ error: "Thanks! You already sent a review a moment ago." }, 429, origin);
  }

  const review = { s: stars, r: reaction, t: text, d: new Date().toISOString().slice(0, 10) };

  let saved = null;
  for (let attempt = 0; attempt < 4 && !saved; attempt++) {
    const { list, sha } = await readFile(env);
    list.push(review);
    const res = await gh(env, "/contents/" + FILE, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Add review (" + stars + " stars)",
        content: b64encode(JSON.stringify(list, null, 1)),
        branch: BRANCH,
        sha: sha || undefined,
        committer: { name: "Deutsch Ecke reviews", email: "merikaboss@users.noreply.github.com" }
      })
    });
    if (res.ok) saved = list;
    else if (res.status !== 409 && res.status !== 422) {
      return json({ error: "Could not save right now. Please try again later." }, 502, origin);
    }
  }
  if (!saved) return json({ error: "Busy right now. Please try again." }, 503, origin);

  ctx.waitUntil(Promise.all([
    caches.default.put(rateKey, new Response("1", { headers: { "Cache-Control": "max-age=" + RATE_SECONDS } })),
    caches.default.delete(new Request(new URL("/reviews-cache", request.url).toString()))
  ]));

  return json(summarise(saved), 201, origin);
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    if (url.pathname !== "/reviews") return json({ error: "Not found." }, 404, origin);
    if (!env.GITHUB_TOKEN) return json({ error: "Reviews are not set up yet." }, 503, origin);

    try {
      if (request.method === "GET") return await getReviews(request, env, ctx, origin);
      if (request.method === "POST") return await postReview(request, env, ctx, origin);
      return json({ error: "Method not allowed." }, 405, origin);
    } catch (e) {
      return json({ error: "Something went wrong." }, 500, origin);
    }
  }
};
