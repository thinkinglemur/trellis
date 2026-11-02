# Factory run record

Coordinator/single writer:
Packet identity/revision:
State: prepared | running | awaiting-review | repairing | verified | awaiting-release-decision | blocked | canceled

## Attempts
| Attempt | Parent/finding | Executor/model | Claim/lease reference | Code/spec/test revision | State | Evidence |
|---|---|---|---|---|---|---|
<!-- Do not record secret claim tokens or credentials in shared Markdown. Runtime retains sensitive ownership tokens privately. -->

## Verification and feedback
For each check: objective/acceptance ID, exact command, code revision, result/exit status, artifact
location, reviewer, covered/uncovered requirements, discrepancy and authorised correction.
Worker self-report and independent verification must be distinguishable.

## Recovery/handoff
Last persisted checkpoint, active attempt, interrupted/orphan work, stale results rejected,
reconciliation performed, pending decisions and next permissible action.

## Usage
Observed per-call/model usage including retries/review; distinguish estimates, actual billed cost
and unknown. Do not double-count inclusive parent totals and children.

## Result and release boundary
Integrated revision, acceptance evidence, unresolved findings, release authority reference or
awaiting decision. Verified is not merged/deployed/released. No automatic native-ticket completion.

## Improvement proposals
Recurring classified failure, proposed versioned skill/test/routing change, evaluation and decision.
Never silently revise acceptance or policy to make this run pass.
