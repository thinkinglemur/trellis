---
name: trellis-new-module
description: >
  FMA Workflow D. Use when the user says "new module", "create the <name> module", or the router sends
  them here to work through MODULES.md. Stamps a module from the base template — never by hand — populates
  its CLAUDE.md scope, seeds manifest routes/events/useCases from SPEC, and verifies it is born green.
---

# Trellis — New Module (Workflow D)

Read `../trellis/references/protocol.md` first. **Requires:** substrate present; module in MODULES.md
(absent → architectural change: confirm with owner/engineer, add the row). **Next:** trellis-visual-qa
(once all MVP modules exist) or the next MODULES.md row.

1. Copy `${CLAUDE_PLUGIN_ROOT}/templates/base-module/` → `modules/<name>/`; replace `__MODULE_NAME__`
   and `__MODULE_PURPOSE__` everywhere.
2. Populate CLAUDE.md scope from ARCH.md (entities owned, events emitted/consumed, use cases served).
3. Seed `manifest.ts`: `routes` (with `requires`), `emits`, `consumes`, `useCases` from SPEC.
4. MODULES.md status → `scaffolded`.
5. Verify born green: install, typecheck, test:contract, test for this module. Red template = F9 —
   report it; do not patch around it.
Rules: never modify `templates/base-module/`; never import another module (if the purpose seems to
need it, the interaction belongs in contracts → flag for federation review).
