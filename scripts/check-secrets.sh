#!/usr/bin/env bash
set -euo pipefail

if rg -l --hidden --glob '!.git/**' --glob '!scripts/check-secrets.sh' \
  'BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY|https?://[^/[:space:]]+:[^/@[:space:]]+@|(?i)(private[_-]?key|seed[_-]?phrase|mnemonic|api[_-]?key|admin[_-]?password)[[:space:]]*[:=][[:space:]]*[^[:space:]]{16,}' .; then
  echo "Potential secret found. Review the named files locally. Secret values are intentionally not printed."
  exit 1
fi

echo "No common secret patterns found."
