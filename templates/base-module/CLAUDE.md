# Module: __MODULE_NAME__

__MODULE_PURPOSE__

## Your scope (hard boundary)
- You may modify files ONLY inside `modules/__MODULE_NAME__/`.
- You may READ `packages/contracts/` but NEVER modify it. If your task
  requires a contract change, STOP and report: that is Workflow B
  (federation review + human ratification), not your job.
- You may not import from, read as a dependency, or reach into any other
  module. Boundary lint will fail your change if you try.

## Structure (MVC — self-managed)
- `src/manifest.ts` — ModuleManifest implementation (contract surface)
- `src/routes.ts`   — route handlers (controller)
- `src/models.ts`   — data access and domain logic (model)
- `src/views.ts`    — response serialisation (view)
- `tests/`          — module tests + contract conformance tests

## Definition of done (verification loop — run ALL before finishing)
1. `pnpm typecheck`
2. `pnpm lint` (from repo root — boundary rules)
3. `pnpm test:contract`
4. `pnpm test`
5. `pnpm test:e2e -- --grep <UC ids this ticket serves>` (gate 5 — use-case e2e + visual)
All five green = done. Any red = fix and re-run. Do not weaken tests to pass.

## Conventions
- Conventional Commits, scope = module name: `feat(__MODULE_NAME__): ...`
- One name per concept; snake_case in DB, camelCase in API.
- Do not refactor, rename, or "improve" code unrelated to your ticket.
