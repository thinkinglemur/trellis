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
  `auto`, and appended to `ratification_queue` in PIPELINE.md, subject to the never-auto exceptions
  and factory stop conditions below. Escalation exhaustion always stops execution.
- In BOTH modes the owner ratifies PDD v1 (G1), MVP selection (G2), every validation threshold and its
  derivation, and the A4 build/pivot/stop decision. Never auto-accept those.
- Enforcement gates (typecheck, boundary lint, contract tests, module tests, e2e/visual) NEVER auto-accept.

## Discovery and factory execution
- Product definition uses its discovery-interview reference by default; confirmed understanding is
  not gate ratification. Existing approved intent is inherited, not re-interviewed on every repair.
- Approved implementation tickets route through `trellis-factory`, which delegates to existing module
  skills and requires independent evidence. Direct module sessions still follow their existing gates;
  their self-report alone does not satisfy factory acceptance.
- Factory execution stops for absent authority/capability/evidence, exhausted limits or uncertain
  effects in BOTH modes. Fast mode never grants merge/deploy/send/spend or broader data permissions.
- G3 data-model ratification remains owner-only in every mode, as product-definition requires.
- Explicit never-auto decisions and owner-required skill gates override generic auto+queue wording.
  No automatic classification or rule change may authorise consequential external effects.

## Session end — every skill
1. Update PIPELINE.md: `artefacts`, `gates`, versions, `ratification_queue`, and `next`.
   Under concurrent factory execution, only the coordinator writes shared pipeline state; workers
   return structured reports. Runtime claims/attempts belong to the durable harness, not Markdown.
2. Append one line to the PIPELINE.md log: `YYYY-MM-DD · <skill> · <outcome> · <gate changes>`.
3. State plainly: what was produced, what gate status changed, and the next skill to run.

## Artefact rules
- Every artefact declares the `pdd_version` (and `visual_spec_version` where relevant) it traces to.
- A PDD version bump invalidates traces for affected use cases; skills re-run affected traces before proceeding.
- Reference files (archetypes, state set, abuse patterns) are read, not copied into artefacts; cite them by id.
- Never mark your own output ratified. Owner ratifies product artefacts; engineer ratifies contracts.

## Decision authority (who may decide what — orchestrators with humans, never module agents)
| Decision | Proposed by | Ratified by | Module agent may? |
|---|---|---|---|
| Failure-class waiver, product level (Stage 1) | definition skill | owner | never |
| Failure-class waiver, contract level | federation | engineer | never |
| Invariant change / allowed-transition change | federation | engineer (Workflow B) | never |
| Adversarial finding classification (defect vs new failure path) | federation | engineer (+ owner if PDD amendment) | never |
| Relaxing or deleting any assertion | — | nobody; add-only | never |
| PDD amendment of any kind | any skill | owner | never |
| Validation threshold X (per test, per project; no defaults) | validate skill presents benchmarks + economic floor | owner | never |
| A4 build / pivot / stop / override | validate skill presents options + implications | owner | never |
| Hypothesis status (confirmed/refuted/refined) | learn skill presents evidence | owner + engineer | never |
| Posting as the founder | — | nobody; agent drafts, owner posts | never |
In fast mode eligible "ratified by" decisions become auto + queue; explicit never-auto decisions,
owner-required gates and factory authority/stop conditions take precedence. The "never" column does not change.
