#!/usr/bin/env bash
# Aggregate headshot/images for Brad Brisco, Alan Hirsch, Josh Shepherd.
# Deduplicates by basename per person; prefers source from movemental-ai.
set -e
TERMINAL_FILE="/Users/joshuashepherd/.cursor/projects/Users-joshuashepherd-Desktop-Dev-repos-movemental-ai/terminals/348108.txt"
ROOT="/Users/joshuashepherd/Desktop/Dev/repos/movemental-ai"
IMGDIR="$ROOT/images"
mkdir -p "$IMGDIR/brad-brisco" "$IMGDIR/alan-hirsch" "$IMGDIR/josh-shepherd"

# One path per line; prefer movemental-ai when same basename (sort so movemental-ai paths come last)
grep -E '^/Users/joshuashepherd.*\.(jpg|jpeg|png|gif|webp|heic)$' "$TERMINAL_FILE" 2>/dev/null | awk -v m="movemental-ai" '{ print (index($0,m)>0 ? "1" : "0"), $0 }' | sort -k1,1n -k2 | cut -d' ' -f2- | while IFS= read -r path; do
  [[ ! -f "$path" ]] && continue
  base=$(basename "$path")
  if echo "$path" | grep -qE '[Bb]rad.*[Bb]risco|[Bb]risco.*[Bb]rad'; then
    echo "brad-brisco	$path"
  elif echo "$path" | grep -qE '[Aa]lan.*[Hh]irsch|[Hh]irsch.*[Aa]lan'; then
    echo "alan-hirsch	$path"
  elif echo "$path" | grep -qE '[Jj]osh.*[Ss]hepherd|[Ss]hepherd.*[Jj]osh'; then
    echo "josh-shepherd	$path"
  fi
done | awk -F'	' -v m="movemental-ai" '
  { person=$1; path=$2; base=path; sub(".*/", "", base); key=person"\t"base;
    in_m = (index(path, m) > 0);
    if (!(key in chosen) || in_m) chosen[key]=path
  }
  END { for (k in chosen) print chosen[k] }
' | while IFS= read -r path; do
  [[ ! -f "$path" ]] && continue
  base=$(basename "$path")
  if echo "$path" | grep -qE '[Bb]rad.*[Bb]risco|[Bb]risco.*[Bb]rad'; then
    cp "$path" "$IMGDIR/brad-brisco/$base" 2>/dev/null && echo "brad-brisco $base"
  elif echo "$path" | grep -qE '[Aa]lan.*[Hh]irsch|[Hh]irsch.*[Aa]lan'; then
    cp "$path" "$IMGDIR/alan-hirsch/$base" 2>/dev/null && echo "alan-hirsch $base"
  elif echo "$path" | grep -qE '[Jj]osh.*[Ss]hepherd|[Ss]hepherd.*[Jj]osh'; then
    cp "$path" "$IMGDIR/josh-shepherd/$base" 2>/dev/null && echo "josh-shepherd $base"
  fi
done

echo "---"
echo "Brad: $(ls -1 "$IMGDIR/brad-brisco" 2>/dev/null | wc -l | tr -d ' ') files"
echo "Alan: $(ls -1 "$IMGDIR/alan-hirsch" 2>/dev/null | wc -l | tr -d ' ') files"
echo "Josh: $(ls -1 "$IMGDIR/josh-shepherd" 2>/dev/null | wc -l | tr -d ' ') files"
ls -la "$IMGDIR"
