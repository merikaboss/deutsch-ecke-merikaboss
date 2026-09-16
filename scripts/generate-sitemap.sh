#!/bin/bash
# Regenerates sitemap.xml with an accurate <lastmod> per URL, taken from
# real git history. Run manually with `bash scripts/generate-sitemap.sh`,
# or let the "Update sitemap" GitHub Action run it automatically on every
# push to main.
set -euo pipefail
cd "$(dirname "$0")/.."

BASE="https://merikaboss.github.io/deutsch-ecke-merikaboss"

# Last-modified date (ISO 8601) of a file, from git history.
# Falls back to "today" if the file has no git history yet (e.g. brand new).
lastmod() {
  local f="$1"
  local d
  d=$(git log -1 --format=%cI -- "$f" 2>/dev/null || true)
  if [ -z "$d" ]; then
    date -u +"%Y-%m-%dT%H:%M:%S+00:00"
  else
    echo "$d"
  fi
}

# Latest of several files' lastmod — used for the Picture Book viewer,
# since every ?n= page is the same physical file plus shared data/JS.
latest_of() {
  local best=""
  for f in "$@"; do
    local d
    d=$(lastmod "$f")
    if [ -z "$best" ] || [[ "$d" > "$best" ]]; then
      best="$d"
    fi
  done
  echo "$best"
}

PB_SHARED=(a1/picture-book/page.html js/chapters.js js/reader.js css/style.css)
PB_LASTMOD=$(latest_of "${PB_SHARED[@]}")

{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

  echo "  <url><loc>${BASE}/</loc><lastmod>$(lastmod index.html)</lastmod></url>"
  echo "  <url><loc>${BASE}/a1/</loc><lastmod>$(lastmod a1/index.html)</lastmod></url>"
  echo "  <url><loc>${BASE}/a1/picture-book/</loc><lastmod>$(lastmod a1/picture-book/index.html)</lastmod></url>"
  echo "  <url><loc>${BASE}/a1/book/</loc><lastmod>$(lastmod a1/book/index.html)</lastmod></url>"

  for i in $(seq -w 0 53); do
    # Fold in that topic's own image, if it's changed more recently than the shared files.
    img=$(ls a1/assets/images/${i}-*.jpg 2>/dev/null | head -1 || true)
    if [ -n "$img" ]; then
      m=$(latest_of "${PB_SHARED[@]}" "$img")
    else
      m="$PB_LASTMOD"
    fi
    echo "  <url><loc>${BASE}/a1/picture-book/page.html?n=${i}</loc><lastmod>${m}</lastmod></url>"
  done

  for i in $(seq -w 0 53); do
    f="a1/book/chapter-${i}.html"
    echo "  <url><loc>${BASE}/a1/book/chapter-${i}.html</loc><lastmod>$(lastmod "$f")</lastmod></url>"
  done

  # Übungsbuch. Every Lesen unit is the same physical file plus its data,
  # so they share one lastmod, the same way the Picture Book viewer does.
  LESEN_SHARED=(a1/practice/lesen/unit.html js/practice-lesen.js js/practice.js css/practice.css)
  LESEN_LASTMOD=$(latest_of "${LESEN_SHARED[@]}")

  echo "  <url><loc>${BASE}/a1/practice/</loc><lastmod>$(lastmod a1/practice/index.html)</lastmod></url>"
  echo "  <url><loc>${BASE}/a1/practice/lesen/</loc><lastmod>$(lastmod a1/practice/lesen/index.html)</lastmod></url>"

  for u in $(grep -o 'id: "L[0-9]\+"' js/practice-lesen.js | grep -o 'L[0-9]\+'); do
    echo "  <url><loc>${BASE}/a1/practice/lesen/unit.html?u=${u}</loc><lastmod>${LESEN_LASTMOD}</lastmod></url>"
  done

  echo '</urlset>'
} > sitemap.xml

echo "sitemap.xml regenerated."
