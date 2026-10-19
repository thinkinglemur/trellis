---
name: trellis-validate
description: >
  ODG validation gate A4 — demand evidence before the build is committed. Use when the user says
  "validate", "validation", "pre-order test", "landing page test", "do people want this", "fake door",
  "concierge", "design partner", or the router reaches A4 or needs a threshold derived for an A3 test.
  Researches benchmarks, computes the economic floor, presents them for the owner to set a threshold,
  pre-registers each test, generates the instruments, reports results against the threshold, and
  packages the build / pivot / stop decision for the owner. Role: audience (frontier).
---

# Trellis — Validate (A4)

Read `../trellis/references/protocol.md` first. Role: `audience`.
**Requires:** G2 (value hypothesis, MVP.md), CHANNELS.md with ≥1 channel; for level-4/5 tests, G5
is preferred (a prototype is a demo). **Produces:** VALIDATION.md, instruments. **Gate:** A4 — blocks G6.
**Next:** trellis-workflow-zero on build; trellis-product-definition (Stage 2) on pivot; stop → archive.

The agent informs the decision; it never makes it. Thresholds, pre-commitment level, and the A4
decision are the owner's in every mode (protocol: these never auto-ratify).

## 1. Pre-commitment level
From the playbook, present the applicable ladder levels with their instruments. The method's position
is level 4 for anything the product will charge for; present it as the method's position with the
reasoning (ODG §6.2), and record the owner's choice and reason in VALIDATION.md.

## 2. Threshold derivation — per test, per project, never defaulted (ODG §6.3)
For each test (`references/validation-template.md`):
a. **Benchmarks**: research published conversion data for THIS ICP × channel × ladder action. For each
   figure record source, year, sample context, price point, and a confidence note (high | medium |
   low | not comparable). A benchmark from a different channel or price point is labelled as such.
b. **Economic floor**: compute from VALIDATION.md's budget, the channel's cost per visit/contact, the
   intended price or deposit, and the sample the budget buys — the conversion at which the business
   is viable. Show the arithmetic.
c. **Present** both to the owner. If they disagree widely: present both figures, the likely reasons for
   the gap, and what X at each would imply for sample size, duration, budget, and the build decision.
   Do NOT reconcile or recommend a number.
d. The owner sets X, sample size, and D. Record X and its full derivation together. No benchmark →
   record `unbenchmarked`; this test's result becomes the project's first benchmark (LEARNING.md).
A test without a recorded derivation is not pre-registered and may not run.

## 3. Instruments (fast mode builds them; governed ratifies first)
- Landing page from POSITIONING.md / MESSAGING.md (derived per `references/derivation.md`); nothing on
  it an outcome descriptor does not back; VISUAL-SPEC tokens if they exist.
- Validation events to the events table; tagged source links per channel/batch.
- Level-4 instrument per playbook: refundable pre-order (Stripe test→live), LOI template, pilot
  agreement, marketplace listing. Level-5: concierge protocol (who delivers, what is recorded, price).
- Outreach assistance within hard limits: ICP only; ≤ playbook batch size; each batch a pre-registered
  test; compliance posture from the playbook; the owner sends.

## 4. Run and report
One channel per test. Report each result as count / rate / vs X — never as a judgement. "Encouraging"
is not a result. Paid-sample results are marked `floor`.

## 5. Decision (owner ratifies; never auto)
Present the three options with what each implies: **build** (X met → G6 may proceed) · **pivot** (X not
met; evidence points to a different actor/outcome/channel → amend hypothesis, Stage 2 re-runs, A3–A4
repeat) · **stop** (archive with research and audience retained, or return to Stage 1). An **override**
(build without evidence) is recorded with the owner's reason and surfaces in PIPELINE.md.
Update PIPELINE.md `validation` block and `A4`; set `next`.
