---
name: trellis-visual-qa
description: >
  ODPD §10.4 / FMA gate 5. Use when the user says "visual QA", "e2e", "playwright", "generate tests
  from use cases", "acceptance tests", or the router sends them here after modules are scaffolded (and
  again whenever the PDD or visual spec version bumps). Generates the use-case end-to-end suite: steps →
  actions, outcome descriptors → assertions, failure paths → negative tests, plus screenshot comparison
  against the prototype and the step-count invariant. Role: qa (any tier).
---

# Trellis — Visual QA (gate 5)

Read `../trellis/references/protocol.md` first. Role: `qa`.
**Requires:** PDD.md, walkthrough records, VISUAL-SPEC.md, substrate with Playwright. **Produces:**
`tests/e2e/uc-nnn.spec.ts` per use case, `tests/e2e/abuse/ac-nnn.spec.ts`, baseline screenshots.
**Next:** trellis-module-session (per ticket).

## Coverage manifest FIRST (gate 5 is a coverage gate, never a vacuous pass)
Generate `tests/e2e/coverage.json`: for every MVP UC → spec path; happy path; every non-waived failure
path `Fn`; every AC targeting it; every INV refusal + response test; step-count check. `pnpm test:e2e`
runs `scripts/check-coverage` before Playwright: a missing mapping FAILS CI exactly like a failing test.

## Generation rules (one spec file per use case)
- `beforeEach`: establish preconditions via seed/API, not UI clicks (fast, deterministic).
- One `test.step` per PDD step: perform the actor action; assert the system response.
- Outcome: one assertion per clause of the outcome descriptor — entity state (via API/DB helper),
  displayed reference (via UI), each declared side effect (event row in events table; notification stub).
- Failure paths: one negative test per non-waived `Fn`, asserting its outcome descriptor. FT-06/FT-07
  tests set `TRELLIS_FAULT` to inject the dependency failure.
- Invariants: per `INV-nnn`, one test that the violation is REFUSED at the enforcement point and one that
  the RESPONSE occurs (state preserved, `invariant.violated` row written, error state shown with reference).
- Abuse cases: negative tests asserting "must not" (e.g. IDOR returns 403/404, over-posted field ignored,
  classified field absent from event payload).
- **Step-count invariant**: assert the number of user-facing steps ≤ PDD count; fail with a message naming
  the added step.
- **Screenshot comparison**: at each designed state-matrix cell the walkthrough covered, capture and
  compare against the prototype baseline with a tolerance; tokens are shared so diffs are meaningful.
- Tag each test `@uc:UC-nnn @module:<x>` so module sessions can run `--grep` for their tickets.

## Maintenance
Regenerate affected specs on `pdd_version` or `visual_spec_version` bump. Never weaken, skip, or delete an assertion — assertions are add-only. A failing outcome clause is an
implementation defect or an unratified PDD change; route it, don't relax it. You may not waive a failure
class; waivers come from the owner (Stage 1) or federation review.
Update PIPELINE.md `e2e-suite: present`; `next: trellis-module-session`.
