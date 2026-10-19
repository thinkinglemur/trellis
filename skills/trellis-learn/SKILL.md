---
name: trellis-learn
description: >
  ODG launch gate A5 and the learning loop (gate L). Use when the user says "launch", "are we ready to
  launch", "launch checklist", "weekly review", "learn session", "what did we learn", "feedback",
  "retention", "north star", "PMF survey", or the router reaches A5 or a weekly cadence is due. Verifies
  the launch checklist (claims trace, onboarding, telemetry, feedback, support, list size); then runs the
  weekly learn session — metrics vs hypothesis, feedback routing to amendments, hypothesis status, next
  increment or stop — recorded in LEARNING.md. Role: spec tier for synthesis.
---

# Trellis — Learn (A5 + L)

Read `../trellis/references/protocol.md` first. Role: `spec`.
**Requires (A5):** A4 passed/overridden, build complete, METRICS.md, VISUAL-QA suite green.
**Requires (L):** A5 passed; events flowing. **Produces:** launch checklist record, dashboard,
LEARNING.md entries, routed feedback. **Next:** trellis-product-definition (Stage 2) for the next
increment; or stop.

## A5 — Launch gate (every item verified, none waived silently)
`references/launch-checklist.md`. The agent checks; the owner ratifies; the engineer confirms telemetry.
- Claims trace: every claim on landing page, onboarding, launch comms ↔ outcome descriptor with a
  passing e2e test. Untraced → removed, not reworded.
- Onboarding walked against first-run archetype; step count ≤ PDD.
- Telemetry live: activation, retention, revenue, referral events + `invariant.violated` alert.
- Feedback live: in-product control (records UC + screen), support inbox tagged by UC, PMF survey
  trigger on N anchor completions (never at signup).
- Support path: named human, response commitment, route to feedback artefact.
- Owned list at the pre-registered size; launch channels = those with A3 evidence.
- Fault flag off; error tracker on production; final adversarial report classified.

## L — Weekly learn session (30 min, owner + engineer; agent prepares)
1. **North star vs hypothesis**: the value hypothesis verbatim; north-star this week + trend;
   activation rate; retention by cohort; revenue; referral. Dashboard = one page over the events table.
2. **Top three feedback themes** with proposed routing each: new use case | failure path | outcome
   change | defect ticket | reject (reason). Proposals go to the owner via the amendment loop.
3. **Decisions** recorded: ratified/rejected amendments; defects prioritised; channel tests to run;
   things to stop doing.
4. **Hypothesis status**: confirmed | refuted | refined | insufficient data — with evidence.
   confirmed → Stage 2 re-runs with the next hypothesis · refuted → pivot path · refined → PDD
   amendment + re-trace · insufficient → channel decision (audience track), not product decision.
Append to LEARNING.md (`references/learning-template.md`). Every validation/channel result recorded
here is this project's own benchmark for later threshold derivation.

## Rules
- The agent presents; the owner and engineer decide. Never mark a hypothesis confirmed yourself.
- No feature enters except as a use case through the amendment loop and the Stage 2 procedure.
- Stop remains available: an unconfirmed hypothesis with no refinement path within the pre-registered
  window is a stop decision for the owner, with research and audience retained.
Update PIPELINE.md `A5` / `L`; set `next`.
