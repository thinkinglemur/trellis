#!/usr/bin/env bash
# Build trellis.plugin (a zip of the repo minus git/scripts) for Claude Code / Cowork install.
set -euo pipefail
cd "$(dirname "$0")/.."
# Guard: Claude Code rejects XML-like tags in SKILL.md descriptions.
for f in skills/*/SKILL.md; do
  if awk '/^---$/{c++} c==1' "$f" | grep -q '<'; then echo "ERROR: angle bracket in frontmatter of $f"; exit 1; fi
done
rm -f trellis.plugin
zip -rq trellis.plugin .claude-plugin skills templates docs README.md LICENSE -x "*.DS_Store"
echo "built trellis.plugin ($(du -h trellis.plugin | cut -f1))"
