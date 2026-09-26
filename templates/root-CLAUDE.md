# Repository rules — Federated Modular Architecture

This repo follows Trellis (FMA). Read before any work:
- `MODULES.md` — module registry and ownership
- `SPEC.md`, `ARCH.md`, `TICKETS.md` — the spec suite (Workflow Zero)
- `models.yaml` — model routing per role

## Session types
- **Module work (Workflow A):** scope yourself to ONE module directory.
  Its `CLAUDE.md` defines your boundary. Follow the trellis-module-session skill.
- **Contract/cross-cutting work (Workflow B/C):** federation sessions only,
  frontier model only, human ratification required. Follow trellis-federation-review.

## Non-negotiables
- `packages/contracts/` and `templates/base-module/` are protected paths.
- Modules never import modules. The contracts package is the only coupling.
- New modules come from the generator (trellis-new-module), never by hand.
