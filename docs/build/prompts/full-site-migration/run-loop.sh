#!/usr/bin/env bash
set -euo pipefail

# Movemental Full Site Migration — Loop & Gate Harness
# Usage:
#   bash run-loop.sh progress
#   bash run-loop.sh check <PROMPT_ID>
#   bash run-loop.sh check-all
#   bash run-loop.sh next

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../../../../" && pwd)"
MASTER_RUNNER="${SCRIPT_DIR}/master_runner.md"

cd "${REPO_ROOT}"

show_progress() {
  local total=25
  local done_count
  done_count=$(grep -E '\|\s*FSM-[0-9]+' "${MASTER_RUNNER}" | grep -c '\*\*Done\*\*' || true)
  local percent=$(( (done_count * 100) / total ))

  echo "=========================================================="
  echo " Movemental Full Site Migration Progress: ${done_count}/${total} (${percent}%)"
  echo "=========================================================="
  
  # Draw a 40-char progress bar
  local bar_len=$(( (percent * 40) / 100 ))
  local empty_len=$(( 40 - bar_len ))
  printf "["
  for ((i=0; i<bar_len; i++)); do printf "#"; done
  for ((i=0; i<empty_len; i++)); do printf " "; done
  printf "] %d%%\n" "${percent}"
  echo ""
}

show_next() {
  echo "Searching for next unstarted prompt in master_runner.md..."
  local next_line
  next_line=$(grep -E '\|\s*[0-9]+\s*\|\s*FSM-[0-9]+' "${MASTER_RUNNER}" | grep '\*\*Not started\*\*' | head -n 1 || true)
  if [[ -z "${next_line}" ]]; then
    echo "🎉 All prompts marked Done or none unstarted! Check FSM-30 and FSM-31."
  else
    echo "Next eligible prompt row:"
    echo "${next_line}"
  fi
}

check_prompt() {
  local prompt_id="${1:-}"
  if [[ -z "${prompt_id}" ]]; then
    echo "Error: Please specify prompt ID (e.g., FSM-00, FSM-01, FSM-02)."
    exit 1
  fi

  echo "Checking gate for prompt: ${prompt_id}..."

  case "${prompt_id}" in
    FSM-00)
      echo "--> [FSM-00 Gate] Validating staging scaffold & token variables..."
      pnpm typecheck
      test -f "${REPO_ROOT}/MIGRATION-STATE.md" || { echo "MIGRATION-STATE.md missing"; exit 1; }
      echo "✅ FSM-00 gate passed."
      ;;
    FSM-01)
      echo "--> [FSM-01 Gate] Checking /agent/path/safety candidate..."
      pnpm typecheck
      if [ -d "src/v2/app/agent/path/safety" ] || [ -d "src/app/(site-v2)/v2/agent/path/safety" ]; then
        echo "Safety route directory exists."
      fi
      ! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/safety/ src/v2/app/agent/path/safety/ 2>/dev/null || { echo "Hex found"; exit 1; }
      echo "✅ FSM-01 gate passed."
      ;;
    FSM-02)
      echo "--> [FSM-02 Gate] Checking Home v4 candidate..."
      pnpm typecheck
      ! grep -ri "vouched" src/v2/ 2>/dev/null || { echo "'vouched' copy found (must be 'Built with')"; exit 1; }
      ! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/home/ 2>/dev/null || { echo "Hex found in home"; exit 1; }
      echo "✅ FSM-02 gate passed."
      ;;
    FSM-30)
      echo "--> [FSM-30 Gate] Whole-Suite Testing Gate..."
      pnpm typecheck
      pnpm validate:all
      ! grep -rE "#[0-9A-Fa-f]{6}" src/v2/ --include="*.tsx" --include="*.ts" 2>/dev/null || { echo "Hex detected in src/v2/"; exit 1; }
      pnpm link:check
      pnpm routes:check
      echo "✅ FSM-30 Whole-Suite testing gate passed."
      ;;
    FSM-31)
      echo "--> [FSM-31 Gate] Production Cutover Verification..."
      pnpm validate:all
      pnpm typecheck
      pnpm lint
      pnpm build
      echo "✅ FSM-31 Cutover & build verification passed."
      ;;
    *)
      echo "--> [${prompt_id} Gate] Standard verification pass..."
      pnpm typecheck
      if [ -d "src/v2" ]; then
        ! grep -rE "#[0-9A-Fa-f]{6}" src/v2/ --include="*.tsx" 2>/dev/null || { echo "Hex detected"; exit 1; }
      fi
      echo "✅ ${prompt_id} standard gate passed."
      ;;
  esac
}

check_all() {
  echo "Running baseline checks across repository..."
  pnpm typecheck
  pnpm link:check
  if [ -d "src/v2" ]; then
    echo "Scanning src/v2 for prohibited hex values..."
    local hex_hits
    hex_hits=$(grep -rnE "#[0-9A-Fa-f]{6}" src/v2/ --include="*.tsx" --include="*.ts" || true)
    if [[ -n "${hex_hits}" ]]; then
      echo "❌ Forbidden hex values detected in src/v2/:"
      echo "${hex_hits}"
      exit 1
    fi
    echo "✅ Zero hex in src/v2/"
  fi
  echo "✅ Baseline checks green."
}

ACTION="${1:-progress}"
case "${ACTION}" in
  progress)
    show_progress
    ;;
  next)
    show_next
    ;;
  check)
    check_prompt "${2:-}"
    ;;
  check-all)
    check_all
    ;;
  *)
    echo "Usage: $0 {progress|next|check <PROMPT_ID>|check-all}"
    exit 1
    ;;
esac
