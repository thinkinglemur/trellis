# Contracts versioning policy (FMA Workflow B)

- SemVer. Additive = minor. Breaking = major.
- Breaking changes ship with a **deprecation window**: the previous interface
  remains available (deprecated) until every module conforms to the new one.
  Never big-bang swaps (failure mode F3).
- Every change to this package requires a federation review artefact in
  `/federation/reviews/` and human ratification via protected-path review.
- Rollout sequencing is planned by the federation session and recorded in
  the review artefact before any module spec is fanned out.
