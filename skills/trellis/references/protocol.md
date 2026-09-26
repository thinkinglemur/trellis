# Trellis skill protocol (shared by every Trellis skill)

## Session start — every skill
1. Read `PIPELINE.md` at the repo root. If absent, the project has not been initialised:
   greenfield → run `trellis-product-definition` (it creates PIPELINE.md); brownfield → run `trellis-adopt`.
2. Check `mode` (governed | fast) and apply the ratification rule below.
3. Read `models.yaml` (repo root, else `${CLAUDE_PLUGIN_ROOT}/templates/models.yaml`). If this skill's role
   is in `enforcement.refuse_small_model_for` and the session model is not frontier-tier: warn that defects
   at this stage amplify through every downstream artefact, and require explicit user override to continue.
4. Check this skill's **requires** list against `artefacts`/`gates`. If unmet, say what is missing and which
   skill produces it. Do not improvise the missing artefact.

## Ratification rule
- **governed**: every judgment decision (PDD amendment, MVP scope, data model, visual spec, contract change,
  promotion, walkthrough discrepancy resolution) STOPS and waits for the named human (owner or engineer).
- **fast**: judgment decisions are auto-accepted, recorded where a human decision would be recorded, tagged
  `auto`, and appended to `ratification_queue` in PIPELINE.md. Only escalation exhaustion
  (`max_local_cycles` + `max_escalation_cycles`) interrupts the operator.
- In BOTH modes the owner ratifies PDD v1 (G1) and MVP selection (G2). Never auto-accept those.
- Enforcement gates (typecheck, boundary lint, contract tests, module tests, e2e/visual) NEVER auto-accept.

## Session end — every skill
1. Update PIPELINE.md: `artefacts`, `gates`, versions, `ratification_queue`, and `next`.
2. Append one line to the PIPELINE.md log: `YYYY-MM-DD · <skill> · <outcome> · <gate changes>`.
3. State plainly: what was produced, what gate status changed, and the next skill to run.

## Artefact rules
- Every artefact declares the `pdd_version` (and `visual_spec_version` where relevant) it traces to.
- A PDD version bump invalidates traces for affected use cases; skills re-run affected traces before proceeding.
- Reference files (archetypes, state set, abuse patterns) are read, not copied into artefacts; cite them by id.
- Never mark your own output ratified. Owner ratifies product artefacts; engineer ratifies contracts.
