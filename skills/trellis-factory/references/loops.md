# Feedback and recovery contract

Each loop records objective, observation, discrepancy, permitted correction and stop/escalation.
All implementation/review attempts count towards packet limits; changing executor cannot reset them.

| Loop | Evidence / correction | Stop or escalate |
|---|---|---|
| Implementation | Failing regression → minimal change → cheap checks → targeted repair | Green relevant checks; bounded attempts exhausted; spec/contract ambiguity |
| Acceptance | Independent verifier exercises exact revision, expected vs observed, reproducible findings → bounded repair | Required acceptance demonstrated; missing evidence; changed intent needs owner |
| Integration | Combined revision against current base → contract/integration/use-case checks → seam repair | Exact integrated revision verified; conflicts or protected change needs authority |
| Operational | After authorised release, compare telemetry/user outcome → investigation/proposed change | Observation window complete; insufficient evidence reported unknown, no invented diagnosis |
| Factory improvement | Recurring classified failures → versioned skill/test/routing proposal → regression evaluation | Authorised adoption/rejection; no automatic weakening or self-modified acceptance |

## Run states and guarded transitions

`prepared → running → awaiting-review → repairing → awaiting-review → verified → awaiting-release-decision`

Review may accept directly from awaiting-review. Any nonterminal state can block on missing authority,
capability, evidence, exhausted limits or uncertain effects. Cancellation is distinct from completion.
`verified` requires independent review and applicable tests at the exact integrated revision. Do not
change authoritative business-ticket state merely because an execution attempt ended.

Implementation failures retry only inside limits. Repair gets a new attempt identity linked to its
findings and predecessor. Changed code invalidates affected verification. Changed intent/spec requires
new approval and affected acceptance, not an endless repair loop against a moving target.

## Durable adapter requirements

Unattended operation requires actual atomic claims, bounded leases/heartbeat, persisted attempt IDs,
deduplicated submission, cancellation, artifact handoff, and restart reconciliation. Validate installed
capabilities; use an existing harness rather than assume these are supplied by Trellis Markdown.
Only the active claim may hand off/complete. Superseded workers cannot accept the newer attempt.

On timeout/death: stop or reconcile child processes, preserve evidence, revoke old ownership, then
reclaim within limits. A lost heartbeat means unknown/unresponsive until reconciled, not success.
Retry safe computation; reconcile uncertain external effects before any resend. Reconcile partial
integration and orphan worktrees, rather than assuming a restart rolled them back.

## Required pilot scenarios (not tests claimed executed)

1. Required check absent/failing/skipped → no verified state.
2. Worker writes outside owned paths or weakens tests → no acceptance; report evidence.
3. Review rejects → linked repair attempt → new independent verification at new revision.
4. Worker interrupted and reclaimed → stale completion rejected; handoff survives restart.
5. Independent branches pass but integration fails → no verified integrated result.
6. Missing runtime capability → supervised-only offer or blocked unattended dispatch.
7. No release authority → ready-for-decision only, regardless of green tests or fast mode.
8. Repeated failure → evaluated improvement proposal, never silent policy mutation.

A structural check of these skill files does not prove the pilot behaviours. Each adapter must execute
these scenarios in an isolated environment before claiming unattended conformance.
