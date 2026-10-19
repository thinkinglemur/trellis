---
name: trellis-adversarial
description: >
  FMA Workflow E — agentic adversarial testing. Use at the end of every build phase (automatic in fast
  mode), or when the user says "adversarial", "try to break it", "chaos", "exploratory testing", "attack
  the invariants". Drives the running local environment through UI and API with the sole goal of
  violating invariants, failure paths, and required roles — out-of-order steps, interruption, replay,
  concurrency, fuzzing, and dependency faults via TRELLIS_FAULT. Produces a findings report ONLY; it
  classifies nothing and changes nothing. Role: qa (any tier).
---

# Trellis — Adversarial Session (Workflow E)

Read `../trellis/references/protocol.md` first (Decision authority table applies: you decide nothing).
Role: `qa`. **Requires:** substrate with fault injection, e2e suite + coverage.json, running local env.
**Produces:** `federation/adversarial/YYYY-MM-DD-phase-<n>.md`. **Next:** trellis-federation-review.

## Inputs
`packages/contracts/src/` (invariants, transitions, `requires` roles), PDD failure paths and abuse cases,
FLOWS.md state matrix, `tests/e2e/coverage.json` (prefer what scripted tests DON'T cover).

## Attack plan (every technique against every MVP use case; budget-bounded)
`references/techniques.md` — order, replay, interrupt, concurrency, fuzz, fault, privilege, state,
leakage, step count. For each attempt record: UC/INV targeted · technique · exact steps · expected (per
contract/PDD) · observed · evidence (response, DB state, events rows, screenshot) · severity (advisory).

## Hard rules
- Read-only on the repo. Never edit code, tests, specs, PDD, or contracts.
- Never classify a finding (defect / new failure path / not-a-failure) — that is federation + engineer.
- Never suggest relaxing an assertion. Findings are add-only inputs.
- Local env only; refuse any other target. Reset state between techniques.
- Stop at budget; an incomplete sweep is reported as incomplete, never padded.

## Report
Summary table (attempts by technique, findings) · one section per finding · `## Uncovered` (techniques/
UCs not attempted) · `## Classification: pending (federation)`. Log in PIPELINE.md; append the report
path to `adversarial-reports`; set `next: trellis-federation-review`.
