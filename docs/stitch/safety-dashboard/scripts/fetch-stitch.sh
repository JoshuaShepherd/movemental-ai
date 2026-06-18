#!/bin/bash
# Fetch Stitch HTML/screenshot assets via curl with redirect handling.
# Usage: scripts/fetch-stitch.sh <url> <output_path>
#
# Google Cloud Storage signed URLs require following redirects and TLS/SNI.
# AI tool built-in fetch often fails on these domains — this script is the
# reliable path.

URL=$1
OUTPUT=$2

if [ -z "$URL" ] || [ -z "$OUTPUT" ]; then
  echo "Usage: $0 <url> <output_path>"
  exit 1
fi

mkdir -p "$(dirname "$OUTPUT")"

echo "Fetching: $(basename "$OUTPUT")..."
curl -L -f -sS --connect-timeout 10 --compressed "$URL" -o "$OUTPUT"

if [ $? -eq 0 ]; then
  SIZE=$(wc -c < "$OUTPUT" | tr -d ' ')
  echo "OK  $OUTPUT ($SIZE bytes)"
  exit 0
else
  echo "FAIL  Could not fetch. Check URL expiration or network."
  rm -f "$OUTPUT"
  exit 1
fi
