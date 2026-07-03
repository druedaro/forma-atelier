#!/bin/sh
# ─────────────────────────────────────────────
# Forma Atelier — PocketBase local dev server
# ─────────────────────────────────────────────

# Directory where this script lives
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "▸ Starting PocketBase..."
echo "  Admin UI  → http://127.0.0.1:8090/_/"
echo "  REST API  → http://127.0.0.1:8090/api/"
echo ""

"$DIR/pocketbase" serve \
  --dir="$DIR/pb_data" \
  --migrationsDir="$DIR/pb_migrations" \
  --hooksDir="$DIR/pb_hooks" \
  --http="127.0.0.1:8090" \
  --dev
