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

## Generation rules (one spec file per use case)
- `beforeEach`: establish preconditions via seed/API, not UI clicks (fast, deterministic).
- One `test.step` per PDD step: perform the actor action; assert the system response.
- Outcome: one assertion per clause of the outcome descriptor — entity state (via API/DB helper),
  displayed reference (via UI), each declared side effect (event row in events table; notification stub).
- Failure paths: one negative test each, asserting the failure outcome descriptor.
- Abuse cases: negative tests asserting "must not" (e.g. IDOR returns 403/404, over-posted field ignored,
  classified field absent from event payload).
- **Step-count invariant**: assert the number of user-facing steps ≤ PDD count; fail with a message naming
  the added step.
- **Screenshot comparison**: at each designed state-matrix cell the walkthrough covered, capture and
  compare against the prototype baseline with a tolerance; tokens are shared so diffs are meaningful.
- Tag each test `@uc:UC-nnn @module:<x>` so module sessions can run `--grep` for their tickets.

## Maintenance
Regenerate affected specs on `pdd_version` or `visual_spec_version` bump. Never weaken an assertion to
pass — a failing outcome clause is a defect in the implementation or an unratified PDD change.
Update PIPELINE.md `e2e-suite: present`; `next: trellis-module-session`.
