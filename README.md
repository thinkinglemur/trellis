# Trellis

**A guided, gated method for building products with a two-person human team and AI agents.**

Trellis packages two companion white papers as eleven modular agent skills:

- **Outcome-Driven Product Definition (ODPD)** — define the product upstream: interactive use cases with
  rigorous outcomes, a real MVP, a derived data model, agent-led research and design, a verified prototype.
- **Federated Modular Architecture (FMA)** — build it downstream: contract-enforced modules, bounded agent
  sessions, a federation layer as contract authority, five mechanical verification gates, model tiering.

The papers are in `docs/`. Read them before adopting the method; the skills assume you have.

## How it guides you

Every skill reads `PIPELINE.md` at the repo root, checks what it requires, produces its artefacts,
updates the gates, and names the next skill. Run `trellis` with no arguments at any time to be told
where you are and what comes next. Greenfield starts at `trellis-product-definition`; brownfield starts
at `trellis-adopt`.

```
define ──────────────────────► specify ───────► build ───────────────────────► govern
product-definition → experience-design → prototype → workflow-zero → init → new-module → visual-qa → module-session ⇄ federation-review
   G1 G2 G3              G4               G5          G6 G7        Phase 0    Workflow D   gate 5      Workflow A       Workflows B/C
```

## Operating modes

`mode: governed` (default) — every judgment gate is a human decision (owner for product artefacts,
engineer for contracts). `mode: fast` — judgment gates auto-ratify with a recorded review queue; agents
fan out in parallel; only escalation exhaustion interrupts you. Enforcement gates (typecheck, boundary
lint, contract tests, module tests, use-case e2e + visual) never relax in either mode. `trellis promote`
reviews the queue and returns to governed. PDD v1 and MVP selection are owner-ratified in every mode:
humans define, agents run.

## Model tiering

`templates/models.yaml` routes roles: `definition`, `design`, `spec`, `federation` require frontier
models (skills warn/refuse below that); `module` and `qa` default to a quantised local model via
Ollama; `escalation` engages after N failed verification cycles. Verification replaces judgment at the
module tier — that is what makes small models safe there.

## Layout

- `skills/` — eleven skills; `skills/trellis/references/protocol.md` is the shared contract every skill follows
- `templates/` — contracts package, base module, boundary lint, CI (five gates + security), CODEOWNERS,
  models.yaml, PIPELINE.md, root CLAUDE.md
- `docs/` — the two white papers

## Install

Claude Code / Cowork: install `trellis.plugin`. Other agents: the skills are plain markdown; point your
agent at `skills/<name>/SKILL.md` and `templates/`.

## Licence

Apache-2.0 — see `LICENSE`.

## Repository

`scripts/package-plugin.sh` builds `trellis.plugin` from this tree. The plugin and the repo share one
layout, so there is nothing to sync. Contributions: skills are markdown, templates are code — a change to
either should cite the white-paper section it implements or amend the paper in the same PR.
