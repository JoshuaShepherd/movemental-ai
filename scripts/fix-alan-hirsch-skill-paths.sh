#!/usr/bin/env bash
# Retarget broken .claude/skills symlinks from legacy alan-hirsch path to movemental-sites/alan-hirsch.
# Canonical layout: ~/Desktop/dev/repos/movemental-sites/alan-hirsch (lowercase dev).
# See docs/build/notes/workspace-four-repo-context-strategy.md
set -euo pipefail

ROOT="${HOME}/Desktop/movemental"
SETTINGS="${ROOT}/.claude/settings.json"
SKILLS_DIR="${ROOT}/.claude/skills"
OLD="${HOME}/Desktop/dev/repos/alan-hirsch/.claude/skills"
NEW="${HOME}/Desktop/dev/repos/movemental-sites/alan-hirsch/.claude/skills"

if [[ ! -d "$SKILLS_DIR" ]]; then
  echo "Missing: $SKILLS_DIR" >&2
  exit 1
fi
if [[ ! -d "$NEW" ]]; then
  echo "Missing tenant skills dir: $NEW" >&2
  exit 1
fi

if [[ -f "$SETTINGS" ]]; then
  cp "$SETTINGS" "${SETTINGS}.bak.$(date +%Y%m%d%H%M)"
  # Normalize Desktop/dev vs Desktop/Dev, then legacy repo folder → movemental-sites
  sed -i '' \
    -e 's|Desktop/Dev/repos/|Desktop/dev/repos/|g' \
    -e 's|dev/repos/alan-hirsch/|dev/repos/movemental-sites/alan-hirsch/|g' \
    "$SETTINGS"
  echo "Updated $SETTINGS (backup with .bak.* alongside)"
fi

fixed=0
skipped=0
while IFS= read -r -d '' linkpath; do
  target=$(readlink "$linkpath")
  if [[ "$target" == "$OLD"/* ]] || [[ "$target" == "${OLD%/}"/* ]]; then
    rel="${target#"$OLD"/}"
    rel="${rel#"${OLD%/}"/}"
    nt="${NEW%/}/$rel"
    if [[ ! -e "$nt" ]]; then
      echo "SKIP missing: $(basename "$linkpath") -> $nt" >&2
      skipped=$((skipped + 1))
      continue
    fi
    rm "$linkpath"
    ln -s "$nt" "$linkpath"
    fixed=$((fixed + 1))
  fi
done < <(find "$SKILLS_DIR" -maxdepth 1 -type l -print0)

echo "Retargeted legacy-path symlinks: $fixed (skipped $skipped)."

# Normalize Dev → dev in symlink targets (macOS may have created Capital Dev)
norm=0
while IFS= read -r -d '' linkpath; do
  target=$(readlink "$linkpath")
  [[ "$target" == *'/Desktop/Dev/repos/'* ]] || continue
  newtarget=$(echo "$target" | sed 's|/Desktop/Dev/repos/|/Desktop/dev/repos/|g')
  [[ "$target" != "$newtarget" ]] || continue
  if [[ -e "$newtarget" ]]; then
    rm "$linkpath"
    ln -s "$newtarget" "$linkpath"
    norm=$((norm + 1))
  fi
done < <(find "$SKILLS_DIR" -maxdepth 1 -type l -print0)
echo "Normalized Dev→dev in targets: $norm"

broken=0
while IFS= read -r -d '' linkpath; do
  [[ -e "$linkpath" ]] || broken=$((broken + 1))
done < <(find "$SKILLS_DIR" -maxdepth 1 -type l ! -exec test -e {} \; -print0)
echo "Broken symlinks remaining under skills: $broken"
