#!/usr/bin/env bash
# Builds two upload packages in ./deploy (git-ignored):
#   deploy/ponte-site-infinityfree.zip   contents for InfinityFree's htdocs folder (static React build)
#   deploy/ponte-backend.zip             FastAPI backend for PythonAnywhere (no .env, no database, no venv)
# Usage: scripts/package-hosting.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/deploy"
rm -rf "$OUT" && mkdir -p "$OUT/htdocs"

echo "==> Building frontend"
( cd "$ROOT/frontend" && npm ci --silent && npm run build --silent )
cp -R "$ROOT/frontend/dist/." "$OUT/htdocs/"

# Prototype hosting: keep search engines out until the real domain goes live.
printf 'User-agent: *\nDisallow: /\n' > "$OUT/htdocs/robots.txt"
rm -f "$OUT/htdocs/sitemap.xml"
cat >> "$OUT/htdocs/.htaccess" <<'HT'

# Prototype: do not index.
<IfModule mod_headers.c>
  Header set X-Robots-Tag "noindex, nofollow"
</IfModule>
HT

( cd "$OUT/htdocs" && zip -qr "$OUT/ponte-site-infinityfree.zip" . -x '.DS_Store' )

echo "==> Packaging backend"
( cd "$ROOT" && zip -qr "$OUT/ponte-backend.zip" backend \
    -x 'backend/.venv/*' 'backend/.env' 'backend/*.db' 'backend/*.db-*' \
       '*/__pycache__/*' 'backend/.pytest_cache/*' '*.DS_Store' )

echo "==> Done"
ls -lh "$OUT"/*.zip
echo "htdocs files:"; ( cd "$OUT/htdocs" && find . -type f | sort | head -40 )
