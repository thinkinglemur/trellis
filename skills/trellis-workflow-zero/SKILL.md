---
name: trellis-workflow-zero
description: >
  ODPD Stage 6 + FMA Workflow Zero. Use when a verified prototype exists (or, without ODPD artefacts,
  when the user wants a spec suite directly) and says "spec", "workflow zero", "generate SPEC/ARCH/
  TICKETS", "tickets", "metrics", or the router sends them here. Produces SPEC.md, ARCH.md, TICKETS.md,
  MODULES.md, METRICS.md, and the trace matrix; derives modules from use-case clustering; assembles
  tickets in infrastructure-first, precondition-ordered build sequence. Role: spec (frontier).
---

# Trellis — Workflow Zero (Stage 6 + specification)

Read `../trellis/references/protocol.md` first. Role: `spec`.
**Requires:** G5 passed (preferred). Without ODPD artefacts, run the batch interview (user's
spec-generator skill if installed at `/mnt/skills/user/spec-generator/SKILL.md`, else a condensed one) —
flag that specs generated without a PDD are unverified. **Produces:** SPEC.md, ARCH.md, TICKETS.md,
MODULES.md, METRICS.md, TRACE.md (matrix). **Gates:** G6, G7. **Next:** trellis-init.

## 1. Trace matrix (G6 input)
One row per use case (abuse cases included): PDD ver · MVP · entities · research (or `skipped`) · flows ·
visual spec ver · walkthrough · acceptance criteria · candidate module. Empty MVP cell = blocker.

## 2. Module decomposition (derived, then confirmed)
Cluster use cases by primary actor and the entities their outcomes mutate → candidate modules (4–9 for
an MVP). Cross-cluster interactions (event emitted in one, consumed in another) = the contract surface.
Present the table; owner + engineer confirm. **Modules own data; screens are owned by use cases** —
UI composes across modules via contracts; never one screen per module.

## 3. Generate
- **SPEC.md** — data model from DATA-MODEL.md (classification preserved); API contract with `requires`
  role per route; `## Contract Surface` (code-generatable types, events `<module>.<entity>.<verb>`,
  UseCaseEvent funnel per UC); invariants incl. abuse-case "must nots".
- **ARCH.md** — stack with reasons (default: TS strict, Node 20, Fastify, Drizzle, Postgres, pnpm, Vitest,
  Playwright, Ollama-primary AI); module table; FMA rules; models.yaml role table; operating modes.
- **METRICS.md** — north-star from the value hypothesis; one funnel per MVP UC
  (`started/step.k/completed/failed_at.k`); failure-path counts; events sink = one table; error tracker;
  no classified fields in payloads. Owner ratifies → G7.
- **MODULES.md** — registry: module · capability · use cases served · owner · status.
- **TICKETS.md** — atomic, ≤5 files, ≥3 named tests each, acceptance criteria = outcome descriptors.
  Every ticket `[module: x]` + `[uc: UC-nnn]`. Contract-touching → `[WORKFLOW-B]`, never module-assignable,
  sequenced before dependents. "Do NOT touch: anything outside modules/<x>/; contracts read-only."

## 4. Build order (mandatory sequence)
- **Phase 0 — substrate + local dev**: repo, contracts seeded from SPEC, boundary lint, CI, protected
  paths, models.yaml, events sink, error tracker, logging convention, auth scaffold, secret scanning,
  containerised local env with seed data. Done = clean checkout green with zero modules.
- **Phase 1 — walking skeleton**: thinnest path through the anchor UC incl. minimal UI shell.
- **Phase 2+ — MVP UCs in precondition order** (from MVP.md). Governed: parallel within a tier only.
  Fast: all modules in a phase in parallel against contracts; verify at phase end.
- **Verifiability rule**: no ticket whose acceptance criteria can't be demonstrated in the local env
  (via UI if it exists) at the point it lands.

## Validation before presenting
- [ ] Every ticket → exactly one module or [WORKFLOW-B]   - [ ] No module→module dependency implied
- [ ] Contract Surface code-generatable                   - [ ] ARCH module table = MODULES.md
- [ ] Every MVP UC has ≥1 ticket and acceptance = outcome  - [ ] Phase 0 tickets first; anchor UC in Phase 1
- [ ] METRICS funnel events appear in Contract Surface     - [ ] Abuse cases → invariants or negative tests
Update PIPELINE.md (G6, G7); set `next: trellis-init`.
