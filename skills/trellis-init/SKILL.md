---
name: trellis-init
description: >
  FMA Phase 0. Use when the user says "trellis init", "scaffold", "set up the substrate", or the router
  sends them here after Workflow Zero. Scaffolds the enforcement + observability + security substrate into
  a pnpm monorepo: contracts package (seeded from SPEC), boundary lint, CI with five gates, CODEOWNERS,
  models.yaml, root CLAUDE.md, events sink, error tracker, logging convention, local dev environment.
  Idempotent — never overwrites.
---

# Trellis — Init (Phase 0)

Read `../trellis/references/protocol.md` first. **Requires:** ARCH.md, SPEC.md, MODULES.md, METRICS.md
(proceed without, but flag). **Produces:** `substrate` artefact. **Next:** trellis-new-module.

Everything here is template copying from `${CLAUDE_PLUGIN_ROOT}/templates/` plus light adaptation.
Skip anything that exists. Simplicity rule: nothing beyond this list without a stated reason in ARCH.md.

1. `pnpm-workspace.yaml` → `packages: ["packages/*", "modules/*"]` if missing.
2. **Contracts** → `packages/contracts/` from template. Generate types/events/schemas from SPEC's Contract
   Surface incl. `requires` on every route, UseCaseEvent funnels, and each entity's closed state
   enumeration + allowed transitions (`transitions.ts`, enforced by contract tests and a runtime guard). Extend `src/testing.ts` with contract
   tests per interface — BEFORE any module exists.
3. **Boundary lint** → `eslint-boundaries.cjs` wired into flat config; root `lint` script.
4. **CI** → `.github/workflows/trellis-ci.yml` (five gates + security substrate).
5. **Protected paths** → `.github/CODEOWNERS` (ask for handle). 6. **models.yaml** → root (ask: local
   Ollama? else set module/qa roles to hosted and note cost).
7. **Root CLAUDE.md** (merge). 8. `federation/reviews/.gitkeep`. 9. `tests/integration/` + `test:integration`.
10. **Observability substrate**: `packages/contracts` already carries UseCaseEvent; add a minimal events
    table migration (one table: id, type, use_case, step, actor_id, correlation_id, occurred_at, payload
    jsonb — classified fields forbidden by lint rule or review), a structured logger with correlation id,
    and error-tracker wiring (env-driven; no-op locally).
11. **Security substrate**: `.env.example` + env validation; secret scanning in CI; dependency audit;
    auth scaffold reference in base module; classified-field redaction in the logger.
12. **Fault injection**: one env flag `TRELLIS_FAULT=<db|external|queue>[:<route>]` honoured by the data
    layer and the external-call wrapper, making that dependency fail on demand. Local/test only; refuse to
    start if set in production. Used by FT-06/FT-07 tests and trellis-adversarial.
13. **Local dev**: `docker-compose.yml` (postgres + app), seed script, `pnpm dev`, `pnpm verify`
    (runs all five gates). Done when a clean checkout runs `pnpm verify` green with zero modules.
13b. **Shell module** (if the product has a UI): stamp `modules/shell` via the base template with
    `role: 'shell'`; its CLAUDE.md declares it owns screen composition, navigation, and VISUAL-SPEC.md
    conformance, may import `@modules/*/ui` only (lint exception), and owns every UC integration ticket.
14. **Growth substrate**: event types `billing.*`, `referral.*`, `validation.*`, `feedback.submitted
    {useCase, screen}` in contracts; feedback control as a base-module component; PMF survey trigger on
    anchor-completion count (config, off until A5); one dashboard page over the events table (activation,
    cohort retention, funnels, revenue, feedback themes). Nothing else — no metrics platform (ODG §8.5).
15. Playwright installed + `test:e2e` script present (suite generated later by trellis-visual-qa).

Verify: `pnpm install && pnpm verify`. Update PIPELINE.md `substrate: present`; `next: trellis-new-module`.
