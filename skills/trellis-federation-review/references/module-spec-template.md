# Module Spec — [module-name] — [change slug]

> Produced by federation review [YYYY-MM-DD-slug]. Implement via trellis-module-session.
> This spec is complete: if implementation requires information not in this spec plus the
> contracts package, the spec is defective — report back, do not improvise.

## Contract version
Built against @app/contracts vX.Y.Z (this change introduces vX.Y.Z).

## What changes in this module
One paragraph. Precise, bounded.

## Executable acceptance criteria
- [ ] Contract tests pass: `pnpm test:contract` (new assertions: [list])
- [ ] Named module test cases: [at least 3]
- [ ] Boundary lint green, typecheck green

## Do NOT touch
Anything outside `modules/[module-name]/`. The contracts package is read-only — the contract
change has already been ratified and merged before this spec fans out.

## Sequencing
Position in rollout: [n of N]. Blocked by: [none | modules]. Deprecation window closes: [date].
