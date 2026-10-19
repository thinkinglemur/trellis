---
name: trellis-federation-review
description: >
  FMA Workflows B and C — the contract authority. Use when the user says "federation review",
  "contract change", "promote a shared service", "run the federation", assigns a [WORKFLOW-B] ticket, or a
  module session flagged contract friction or duplication. Reviews contract surfaces only, drafts contract
  changes tests-first, writes per-module specs, plans sequencing, adds a security section where classified
  data or auth is touched, and packages decisions for engineer ratification (auto + queue in fast mode).
  Never implements feature code. Role: federation (frontier).
---

# Trellis — Federation Review (Workflows B & C)

Read `../trellis/references/protocol.md` first. Role: `federation`. Architecture reference:
`references/whitepaper.md`. You review interface surfaces and prepare decisions; the engineer ratifies.

## Inputs — these and ONLY these
Contract diffs/proposals · module manifests (routes, emits, consumes, useCases) · module session reports ·
[WORKFLOW-B] tickets · `federation/adversarial/*.md` findings · `packages/contracts/DECISIONS.md`
(precedent). Never module internals (F4).

## Workflow B — contract change
1. Draft in `packages/contracts/src/` on a branch; version per VERSIONING.md (breaking = major +
   deprecation window; never big-bang).
2. **Contract tests first** in `src/testing.ts`. Routes carry `requires`; events keep classification rules.
3. Per-module specs via `references/module-spec-template.md` — implementable inside the boundary with
   no further questions.
4. Sequencing plan: order, deprecation window, parallelism (governed: within tier; fast: whole phase).
5. **Security section** if the change touches a classified entity or an auth surface: what data, which
   roles, which abuse cases (AC-nnn) apply, what the contract tests assert.
6. Artefact → `federation/reviews/YYYY-MM-DD-<slug>.md` with `## Human decision` block.
   Governed: STOP for engineer ratification. Fast: mark `auto`, queue in PIPELINE.md, proceed to fan-out.
7. On ratification: append to DECISIONS.md; fan out specs (module role, per sequencing).

## Workflow E — classify adversarial findings (with the engineer; never delegated downward)
For each finding in the latest `federation/adversarial/` report: **defect** (violates an existing Fn/INV →
Workflow A ticket, add-only assertions) or **unanticipated failure** (no Fn covers it → proposed failure
path/INV to the owner via amendment loop → regenerate specs via trellis-visual-qa) or **not a failure**
(record why in DECISIONS.md). Contract-level waivers and invariant/transition changes are decided here
and ratified by the engineer. Fast mode: auto + queue.

## Workflow C — promotion
Scan manifests + reports for convergent functionality. Tolerance test: PROVEN duplication with maintenance
cost, not similarity. Rejection is common — record it in DECISIONS.md. Passing candidates → proposal
(abstraction, contract surface, affected modules, migration) → ratification → Workflow B.

## Discipline
Subordinate sessions return summaries, not transcripts. Asked to implement module code → decline, route to
trellis-module-session. Every artefact ends with:
`Decision: [ ] ratify [ ] amend [ ] reject · Notes: · Date: · By: engineer | auto`
