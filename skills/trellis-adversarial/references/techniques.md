# Adversarial techniques (apply each to each MVP use case)
| Technique | What to do | Targets |
|---|---|---|
| Order | steps out of sequence; skip; repeat an earlier step after a later one | transitions, FT-02 |
| Replay | resend the same request (same/no idempotency key); double-submit in UI | FT-04 |
| Interrupt | abandon mid-flow; reload; kill tab; return later | FT-08, state preservation |
| Concurrency | two actors mutate one entity; same actor in two sessions | FT-05 |
| Fuzz | boundary values, unicode, oversized, empty, wrong types, injection strings | FT-01, ABP-05/06 |
| Fault | `TRELLIS_FAULT=db` / `external` / `queue` at each step and mid-sequence | FT-06, FT-07, INV responses |
| Privilege | call each route as every other role incl. anonymous; swap ids (IDOR) | `requires`, ABP-07/11 |
| State | force entity into each state via API, then attempt every transition incl. illegal | transitions, INV refusal |
| Leakage | inspect logs, events table, error payloads for classified fields | ABP-12, DataClass |
| Step count | count user-facing steps vs PDD; look for added confirmations/detours | step-count invariant |
