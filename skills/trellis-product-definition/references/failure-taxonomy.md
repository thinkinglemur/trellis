# Failure taxonomy — resolve EVERY step of EVERY use case against each class
Result per cell: failure path `Fn` with its own outcome descriptor, or `waived: <reason>` (owner only).

| Class | id | Ask at each step | Typical outcome shape |
|---|---|---|---|
| Invalid input | FT-01 | malformed, out of range, wrong type, empty, too long | refused at step k; actor shown field-level reason; no state change |
| Missing/revoked precondition | FT-02 | precondition became false since start (session expired, item deleted, quota hit) | refused; actor told which precondition; in-progress state preserved |
| Permission | FT-03 | actor lacks `requires` role, or role changed mid-flow | refused 403/404 per enumeration policy; `unauthorised` state |
| Duplicate / replay | FT-04 | same action submitted twice (double-click, retry, replayed request) | idempotent: second attempt is a no-op with same reference, or explicit duplicate refusal |
| Concurrent modification | FT-05 | another actor changed the entity between read and write | conflict surfaced; actor's input preserved; no silent overwrite |
| Dependency failure | FT-06 | data store, external service, or queue times out / errors | fail closed; retry policy stated; actor sees `partial`/`error` state with reference |
| Partial failure mid-sequence | FT-07 | step k succeeds, step k+1 fails in a multi-write outcome | atomic (rollback) or compensating action named; no half-outcome visible |
| Interruption / abandonment | FT-08 | actor closes, navigates away, loses network mid-flow | what is persisted, what is discarded, how to resume |
Side rule: every outcome descriptor clause that "must" hold yields an INVARIANT (INV-nnn) with enforcement point + violation response (see trellis-workflow-zero).
