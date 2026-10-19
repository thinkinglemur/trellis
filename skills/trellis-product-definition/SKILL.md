---
name: trellis-product-definition
description: >
  ODPD Stages 1–3. Use when the user wants to define a new product or feature area with Trellis, says
  "start a project", "define the product", "write the PDD", "use cases", "MVP", or the router sends them
  here. Builds the Product Definition Document INTERACTIVELY (one use case at a time, outcome rigour
  enforced), proposes abuse cases, selects the MVP as the smallest testable value, and derives a
  classified data model with a bidirectional trace. Owner ratifies everything. Role: definition (frontier).
---

# Trellis — Product Definition (Stages 1–3)

Read `../trellis/references/protocol.md` first. Role: `definition`. This skill creates `PIPELINE.md`
from `${CLAUDE_PLUGIN_ROOT}/templates/PIPELINE.md` if absent.

**Requires:** an owner and a description. **Produces:** PDD.md, MVP.md, DATA-MODEL.md, TRACE.md.
**Gates:** G1, G2, G3 — owner-ratified in every mode. **Next:** trellis-experience-design.

## Stage 1 — PDD (interactive, never batch)
1. Ask for the owner's free-form description. Extract candidate actors, features, and implied use cases.
   Present them back for correction. The owner corrects; you structure.
2. Elaborate ONE use case at a time (format: `references/pdd-template.md`):
   actors → preconditions → steps one at a time ("what does the actor do; what does the system do")
   → outcome → failure paths. Assign `UC-nnn`. Show a running PDD summary after each.
3. Enforce the **outcome rigour format** on every outcome: observable, state-expressed, bounded
   (every side effect listed), testable, violation-specified (what happens if a clause does not hold). Rewrite with the owner until it passes. Never accept
   "the user sees success".
4. Keep a **parking list** of gaps (actor with no use case, feature with no use case, noun in steps that
   never appears in an outcome). Raise it at natural pauses, not mid-use-case.
5. **Failure paths are derived, not elicited**: resolve EVERY step against `references/failure-taxonomy.md`.
   Each step × class → a failure path `Fn` with its own rigorous outcome descriptor, or `waived: <reason>`.
   Only the owner waives. An unresolved cell = incomplete use case = G1 fails. Record each "must" clause
   of every outcome as an invariant candidate `INV-nnn` (enforcement point and violation response are
   assigned in trellis-workflow-zero).
6. **Abuse cases**: for each use case, propose abuse cases from `references/abuse-case-patterns.md`
   by screen/flow archetype. Same format; actor is an attacker or mistaken user; outcome states what
   must NOT happen and what the system does instead. Ids `AC-nnn`. Owner ratifies or waives each.
7. Glossary: one canonical name per concept. Flag synonyms as they appear.
8. Owner declares PDD v1 → G1 passed, `pdd_version: 1`. (This ratification is never auto, even in fast mode.)

## Stage 2 — MVP (smallest testable value)
1. Owner states the value hypothesis: "If <actor> can <outcome>, then <observable signal>."
2. Identify the **anchor use case**. Close the set backward under preconditions; forward one step to
   usability. Everything else → `MVP.md` backlog with dependencies recorded.
3. Owner applies two tests: can a real user get the value? is anything here they don't need?
4. Mark `MVP: yes|no` on every use case. G2 passed on owner ratification (never auto).

## Stage 3 — Data model (derived, never invented)
1. Entities = persistent nouns in outcomes. States = enumerated values outcomes assign (closed set,
   failure outcomes included) PLUS the **allowed transitions** between them (closed; derived from steps). Relationships = associations implied by steps. Side effects → event types.
2. **Classify every entity and field:** public | personal | financial | secret.
3. Assign each entity an owning actor (informs module ownership later).
4. Run the **bidirectional trace**: entity→use case (untraced → remove) and use case→model
   (inexpressible outcome → missing entity or defective outcome). Write `TRACE.md`.
5. Owner ratifies DATA-MODEL.md → G3.

## Rules
- Never add an entity, use case, or feature the owner did not state or ratify.
- Hold the line on rigour even when the owner wants to move faster; that is the job.
- Write PDD.md, MVP.md, DATA-MODEL.md, TRACE.md at the repo root. Update PIPELINE.md; set `next`.
