---
name: trellis-prototype
description: >
  ODPD Stage 5. Use when flows and visual spec are ratified and the user says "build the prototype",
  "prototype", "walkthrough", "verify the prototype", or the router sends them here. Builds a high-
  fidelity prototype from FLOWS.md and VISUAL-SPEC.md, then runs per-use-case walkthrough verification
  with owner and engineer, recording pass/fail per step and per outcome clause. Role: design.
---

# Trellis — Prototype (Stage 5)

Read `../trellis/references/protocol.md` first. Role: `design`.
**Requires:** G4 passed. **Produces:** prototype (Design artefact type or self-contained HTML), walkthrough
records. **Gate:** G5. **Next:** trellis-workflow-zero.

## Build
- From FLOWS.md + VISUAL-SPEC.md only. Declare `pdd_version` and `visual_spec_version` in the prototype.
- Cover every MVP use case, every designed cell of the state matrix, and every failure path.
- Use the visual spec's tokens/components exactly — the implementation will be screenshot-compared to this.
- Represent data-state outcomes a visual can't literally exhibit (event emitted, record created) with an
  explicit convention (e.g. a visible "system state" panel in the prototype). Record the convention.

## Walkthrough verification (owner + engineer)
For every MVP use case, per `references/walkthrough-record-template.md`:
1. Establish preconditions in prototype state.
2. Perform each step as the actor; confirm the system response.
3. At completion, confirm EVERY clause of the outcome descriptor is demonstrable.
4. Perform each failure path. 5. Engineer confirms every exhibited state is one the data model holds.
6. Step count ≤ PDD step count (record both).
Failure → fix the prototype, or propose a PDD amendment through the loop. NEVER reinterpret the use case
to match the prototype. Governed: owner signs each record. Fast: record `auto`, queue.

## Gate G5
Every MVP use case has a passing walkthrough record at current pdd/visual versions.
Update PIPELINE.md; set `next: trellis-workflow-zero`.
