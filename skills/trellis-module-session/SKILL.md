---
name: trellis-module-session
description: >
  FMA Workflow A — bounded implementation of one ticket in one module. Use when the user assigns a ticket,
  says "implement ticket X", "work on the <name> module", or the router sends them here. Enforces the
  module boundary, the five-gate verification loop, and the escalation policy from models.yaml. Designed
  to run safely on smaller local models. Role: module (any tier).
---

# Trellis — Module Session (Workflow A)

Read `../trellis/references/protocol.md` first. Role: `module`.
**Requires:** ticket from TICKETS.md, module scaffolded, e2e suite present. **Produces:** verified module
change. **Next:** next ticket, or trellis-federation-review if anything was flagged.

The contract: at session end nothing outside `modules/<name>/` has changed and all five gates are green.

## Start
1. One module, one ticket. Ticket tagged `[WORKFLOW-B]` or needing a contract change → STOP, route to
   trellis-federation-review. Non-negotiable however small the change.
2. Load ONLY: the ticket; `modules/<name>/CLAUDE.md`; `packages/contracts/src/` (read-only); the module's
   source/tests; the e2e specs tagged with this ticket's `@uc`. Do not explore the repo. Ticket references
   something outside these → ticket is defective; report, don't roam.
3. Read `models.yaml`: `max_local_cycles` (N), `max_escalation_cycles` (M).

## Loop
1. Write/update the ticket's named tests first. Implement the smallest change.
2. Verify: typecheck → boundary lint → contract tests → module tests → `test:e2e --grep @uc:<ids>`.
3. Green → done. Red → fix, repeat. Emit UseCaseEvent funnel events for the UCs served (they are
   asserted by the e2e suite).
4. After N failed cycles: escalate (summary of task, attempts, failing output) to the escalation role.
   After M escalation cycles: interrupt the operator — the only stop in fast mode.

## Hard rules
- Nothing outside `modules/<name>/`. Not contracts, not other modules, not root config, not templates.
- No weakening/skipping/deleting tests. No refactoring or "improving" beyond the ticket.
- Classified fields never in logs, events, or error payloads.
- Conventional Commits: `feat(<name>): …`.

## End
Report: files changed, five-gate results, escalations, and observations for the federation layer
(duplication noticed, contract friction, workarounds). Observations are reported, never acted on.
Update TICKETS.md status; log in PIPELINE.md.
