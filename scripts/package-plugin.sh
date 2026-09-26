#!/usr/bin/env bash
# Build trellis.plugin (a zip of the repo minus git/scripts) for Claude Code / Cowork install.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -f trellis.plugin
zip -rq trellis.plugin .claude-plugin skills templates docs README.md LICENSE -x "*.DS_Store"
echo "built trellis.plugin ($(du -h trellis.plugin | cut -f1))"
