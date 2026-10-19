---
name: trellis-module-coordinator
description: >
  FMA Workflow A, coordinator form — turns one ticket into a TASKS.md of disjoint-file tasks and
  dispatches worker subagents in waves (tests and stubs first, then parallel implementers), then runs the
  gates. Use when the user says "coordinate ticket X", "fan out", "parallelise this ticket", "dispatch
  workers", or a ticket is larger than one sitting. Runs as the main session of a module worktree;
  workers are its subagents and never nest. Role: module (any tier) for workers; coordinator on the
  spec tier when decomposition is non-obvious.
---

# Trellis — Module Coordinator (Workflow A, dispatching)

Read `../trellis/references/protocol.md` and `references/dispatch.md` first.
**Requires:** one ticket, module scaffolded, e2e suite present. **Produces:** `modules/<name>/TASKS.md`,
a verified ticket. **Next:** next ticket, or trellis-federation-review if anything was flagged.

The coordinator plans, dispatches, and verifies. It writes the stubs wave itself if no worker is
available; it does not implement feature code in parallel with workers.

## 1. Decompose (write TASKS.md from `${CLAUDE_PLUGIN_ROOT}/templates/TASKS.md`)
- By **file ownership, not activity**: every task lists the files it owns; within a wave the sets are
  disjoint. A ticket that cannot be split into disjoint files is one task — that is fine.
- **Wave 1** is always: named tests from the ticket + interface stubs that compile and fail. Nothing
  else starts until wave 1 is green on typecheck + lint.
- **Wave 2**: implementers (models | routes | ui exports | …), parallel, each owning its files.
- **Wave 3**: coordinator runs gates and fixes seams only.
- Anything needing `packages/contracts/` → STOP; [WORKFLOW-B]; do not dispatch.

## 2. Dispatch (per `references/dispatch.md`)
- Workers are subagents of this session (depth 1). Never ask a worker to spawn workers.
- Each worker gets the **brief** (template in dispatch.md): ticket excerpt, task row, owned files,
  module CLAUDE.md, contracts path (read-only), the failing tests it must turn green, the return format.
- Workers return the **report** format only — no transcripts. The coordinator never reads worker
  context; it reads TASKS.md, the diff, and gate output.
- Governed and fast mode both permit this intra-ticket parallelism; precondition ordering applies
  between tickets, not between tasks of one ticket.

## 3. Verify (gate order is cost order)
typecheck → boundary lint → contract tests → module tests → **then** `test:e2e --grep @uc:<ids>`.
Never run e2e while an earlier gate is red. Coverage check runs with e2e. Escalation per models.yaml
applies per task; a task that exhausts its cycles is reported, not absorbed by the coordinator.

## 4. Close
TASKS.md complete; ticket status in TICKETS.md; observations for federation (duplication, contract
friction) reported, never acted on. Log in PIPELINE.md.
