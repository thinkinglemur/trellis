---
name: trellis-adopt
description: >
  Brownfield entry. Use when the user wants to apply Trellis to an EXISTING codebase, says "adopt",
  "trellis adopt", "add trellis to this repo", "retrofit", or the router finds no PIPELINE.md in a repo
  that already has code. Inventories the repo, maps what exists to the Trellis artefact set, reverse-
  derives use cases from the UI and route surface where no PDD exists, and writes PIPELINE.md full of
  explicit gaps so the router can take over. Role: definition (frontier).
---

# Trellis — Adopt (existing project)

Read `../trellis/references/protocol.md` first. Role: `definition`.
**Requires:** an existing repository. **Produces:** ADOPTION.md, PIPELINE.md, draft PDD.md (reverse-
derived, marked unratified). **Next:** whatever the gaps say — usually trellis-product-definition to
ratify the draft PDD, then trellis-init to add missing substrate.

## 1. Inventory (read-only; touch nothing)
Stack, package layout, existing module/boundary structure, routes/UI screens, tests (unit/contract/e2e),
CI, auth, logging/metrics, secrets handling, design tokens/components. Write `ADOPTION.md`.

## 2. Map to the artefact set
For each Trellis artefact: present (path) | partial (what's missing) | missing. Existing equivalents
count — an ADR log is DECISIONS.md, a design system is a partial VISUAL-SPEC.

## 3. Reverse-derive use cases (draft, unratified)
From routes, screens, and tests: one candidate `UC-nnn` per actor-outcome pair observed in the code.
Outcomes stated at the rigour format where the code makes them evident; otherwise marked `TODO owner`.
Abuse-case candidates from archetypes where auth/forms/lists exist. Data model reverse-derived from
schema with classification `TODO owner`. This is a starting point for trellis-product-definition, not a PDD.

## 4. Module decomposition assessment
Does the code already have boundaries? Propose the FMA module map (existing modules, extraction
candidates, the contract surface implied). Do NOT refactor — record the plan; extraction is Workflow B
work under federation review.

## 5. Write PIPELINE.md
From `${CLAUDE_PLUGIN_ROOT}/templates/PIPELINE.md`, with every artefact marked present/partial/missing,
all gates `pending`, mode `governed`, and `next` set to the first gap. Add an `## Adoption plan` section:
ordered gaps, each with the skill that closes it.

Rules: adoption changes no code. It produces an honest map and a plan. Owner ratifies the draft PDD in
trellis-product-definition before anything downstream runs.
