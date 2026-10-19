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
   - **Audience track:** highest passed A-gate; flag if the product track is ahead of it (G2 passed
     with A1 pending is behind; G5 passed with A3 pending is behind). A4 pending blocks G6.
   - **Mode:** governed | fast, and the ratification queue length if fast
   - **Next:** the single skill to run, with the one-line reason
2. If `next` in PIPELINE.md disagrees with what the gates imply, trust the gates and correct `next`.
3. Stage → skill map:
   G1–G3 → trellis-product-definition (and, from G1, trellis-audience in parallel: A1–A3) ·
   G4 → trellis-experience-design · G5 → trellis-prototype · A4 → trellis-validate (blocks G6) ·
   G6/G7 → trellis-workflow-zero → trellis-init → trellis-new-module (per MODULES.md row) →
   trellis-visual-qa (generate e2e + coverage) → trellis-module-session (per ticket) or
   trellis-module-coordinator (ticket > one sitting; parallel workers) ·
   phase end → trellis-adversarial → trellis-federation-review (classify) · build complete → trellis-learn
   (A5 launch gate, then weekly L sessions; L feeds Stage 2) ·
   [WORKFLOW-B]/promotion/waivers → trellis-federation-review

## `trellis fast` / `trellis governed`
Set `mode` in PIPELINE.md. Switching TO fast: confirm G1 and G2 are passed (owner-ratified) — if not,
refuse: humans define, agents run. Fast mode builds the things one validates with (landing pages,
instruments, prototypes); the product that reaches A5 is governed-mode work. Switching TO governed from fast: run promotion first.

## `trellis promote`
Present the `ratification_queue` as a batched review, grouped by artefact. For each entry the human
records ratify / amend / reverse. Reversals of contract or promotion decisions become [WORKFLOW-B]
tickets. Clear ratified entries; set mode to governed; log the promotion.

## Rules
- The router never produces artefacts. It reads, reports, routes, and edits PIPELINE.md only.
- Keep the status report under ~12 lines. The user wants direction, not a dashboard.
