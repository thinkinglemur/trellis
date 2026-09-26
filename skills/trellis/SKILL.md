---
name: trellis
description: >
  Trellis router. Use when the user says "trellis", "trellis next", "where are we", "what's next",
  "status", or starts a Trellis project without naming a stage. Reads PIPELINE.md and tells the user
  where the project is in the define → specify → build → govern pipeline, what is blocking, and which
  skill to run next. Also switches operating mode ("trellis fast", "trellis governed") and runs
  promotion ("trellis promote") to review the fast-mode ratification queue.
---

# Trellis — router

Read `references/protocol.md` first.

## No PIPELINE.md present
Ask one question: new project, or existing codebase? New → hand off to `trellis-product-definition`.
Existing → hand off to `trellis-adopt`. Do not create PIPELINE.md yourself.

## `trellis` / `trellis next` / status
1. Read PIPELINE.md. Report in this exact shape, briefly:
   - **Position:** the highest passed gate and the stage that follows it
   - **Blocking:** unmet gates or missing artefacts for the next stage (name them)
   - **Mode:** governed | fast, and the ratification queue length if fast
   - **Next:** the single skill to run, with the one-line reason
2. If `next` in PIPELINE.md disagrees with what the gates imply, trust the gates and correct `next`.
3. Stage → skill map:
   G1–G3 → trellis-product-definition · G4 → trellis-experience-design · G5 → trellis-prototype ·
   G6/G7 → trellis-workflow-zero → trellis-init → trellis-new-module (per MODULES.md row) →
   trellis-visual-qa (generate e2e) → trellis-module-session (per ticket) ·
   [WORKFLOW-B]/promotion → trellis-federation-review

## `trellis fast` / `trellis governed`
Set `mode` in PIPELINE.md. Switching TO fast: confirm G1 and G2 are passed (owner-ratified) — if not,
refuse: humans define, agents run. Switching TO governed from fast: run promotion first.

## `trellis promote`
Present the `ratification_queue` as a batched review, grouped by artefact. For each entry the human
records ratify / amend / reverse. Reversals of contract or promotion decisions become [WORKFLOW-B]
tickets. Clear ratified entries; set mode to governed; log the promotion.

## Rules
- The router never produces artefacts. It reads, reports, routes, and edits PIPELINE.md only.
- Keep the status report under ~12 lines. The user wants direction, not a dashboard.
