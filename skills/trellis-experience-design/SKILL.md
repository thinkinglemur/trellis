---
name: trellis-experience-design
description: >
  ODPD Stage 4 — the agent as researcher and interaction designer. Use when PDD/MVP/data model exist and
  the user says "design the experience", "research competitors", "user research", "flows", "visual spec",
  "design system", or the router sends them here. Runs competitive research per use case, designs user
  research, produces experience flows with a screen state matrix and archetype checks, and writes the
  visual design specification. All amendments route to the owner. Role: design (frontier).
---

# Trellis — Experience Design (Stage 4)

Read `../trellis/references/protocol.md` first. Role: `design`.
**Requires:** G1–G3 passed. **Produces:** RESEARCH.md, FLOWS.md, VISUAL-SPEC.md, PDD amendments.
**Gate:** G4. **Next:** trellis-prototype.

## 1. Competitive research (per MVP use case, not per competitor)
For each MVP use case: search for products delivering an equivalent outcome; record flow shape, step
count, actor burden, input-vs-inference, failure handling, and anything they do the PDD doesn't
anticipate. Sources cited. Output per use case → `RESEARCH.md`:
- **Pattern candidates** (with why they work for this outcome)
- **PDD amendments** (missing precondition/step/failure path) → amendment loop, never absorbed silently
- **Differentiation notes** (where the PDD deliberately departs from the norm — protect it)
Constraints: patterns and behaviours only — never copy visuals, copy, or assets. Research informs how the
owner's outcomes are achieved; it never adds outcomes (competitor feature with no use case → backlog
proposal at most).

## 2. User research (design it; humans conduct it)
Write the protocol and observation guide per use case. If participants exist, the owner/engineer run
sessions; you synthesise. If not, mark `skipped — no participants` per use case in TRACE.md. Never let
competitive research stand in for it silently. Result per use case: confirmed | amend | challenge.

## 3. Amendment loop
Every amendment → owner (governed: stop and wait; fast: auto + queue). Ratified → `pdd_version` bump;
re-run trace for affected use cases. Design only against the ratified version.

## 4. Experience flows → `FLOWS.md`
- Each flow maps to the use cases it realises and the patterns adopted/departed from.
- **Screens are owned by use cases, not modules**: put everything the actor needs for the primary
  purpose on one screen even if it spans entities. Record steps-per-use-case; must not exceed the PDD's.
- **Screen state matrix**: every screen × `references/universal-state-set.md`. Each cell `designed` or
  `waived: <reason>`. PDD failure paths seed the error column. No undesigned-unwaived cell.
- **Archetype check**: classify every screen against `references/screen-archetypes.md`; resolve every
  expected affordance as present | PDD amendment (new use case/failure path → owner) | waived: <reason>.
- Engineer feasibility review: any flow needing state the data model lacks → model amendment or flow fix.

## 5. Visual design specification → `VISUAL-SPEC.md` (template: `references/visual-spec-template.md`)
Tokens · flow-derived component inventory with states · layout principles · content rules bound to the
glossary · accessibility baseline · **rationale per major choice** (no rationale → removal candidate).
Owner ratifies → `visual_spec_version: 1`.

## Gate G4 checklist
- [ ] Competitive research recorded per MVP use case  - [ ] User research done or explicitly skipped
- [ ] Every flow maps to use cases                      - [ ] State matrix: no undesigned-unwaived cell
- [ ] Every screen resolved against its archetype       - [ ] Steps-per-use-case ≤ PDD
- [ ] All amendments ratified (or queued in fast)       - [ ] VISUAL-SPEC ratified
Update PIPELINE.md; set `next: trellis-prototype`.
