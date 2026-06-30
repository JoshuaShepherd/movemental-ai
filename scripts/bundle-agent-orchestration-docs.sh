#!/usr/bin/env bash
# Materialize docs/build/agent-orchestration/ into a flat-ish tree with no symlinks
# for Claude.ai project knowledge / zip upload.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/docs/build/agent-orchestration"
OUT="$ROOT/docs/build/agent-orchestration-bundle"

echo "Bundling agent orchestration docs → $OUT" >&2
rm -rf "$OUT"
mkdir -p "$OUT"

# cp -rL follows symlinks (dereference)
cp -rL "$SRC" "$OUT"

# Remove nested bundle if cp created recursion (shouldn't)
rm -rf "$OUT/agent-orchestration-bundle" 2>/dev/null || true

FILE_COUNT="$(find "$OUT" -type f | wc -l | tr -d ' ')"
echo "Done: $FILE_COUNT files in $OUT" >&2
echo "$OUT"
