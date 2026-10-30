# Trellis

**A guided, gated method for building products with a two-person human team and AI agents.**

Trellis packages three companion white papers as seventeen modular agent skills:

- **Outcome-Driven Product Definition (ODPD)** — define the product upstream: interactive use cases with
  rigorous outcomes, a real MVP, a derived data model, agent-led research and design, a verified prototype.
- **Outcome-Driven Growth (ODG)** — make it a business: an audience track from day one, a validation
  gate on behavioural evidence before the build is committed, a launch gate that can only claim what is
  proven, telemetry derived from outcomes, and a weekly learning loop that feeds back into Stage 2.
- **Federated Modular Architecture (FMA)** — build it downstream: contract-enforced modules, bounded agent
  sessions, a federation layer as contract authority, five mechanical verification gates, model tiering.

The papers are in `docs/`. Read them before adopting the method; the skills assume you have.
The [0.6 discovery/factory supplement](docs/discovery-and-factory-supplement.md) specifies the new
skill-level refinements and their implementation boundary.

## How it guides you

Every skill reads `PIPELINE.md` at the repo root, checks what it requires, produces its artefacts,
updates the gates, and names the next skill. Run `trellis` with no arguments at any time to be told
where you are and what comes next. Greenfield starts at `trellis-product-definition`; brownfield starts
at `trellis-adopt`.

```
define ──────────────────────► specify ───────► build ───────────────────────► govern
product-definition → experience-design → prototype → workflow-zero → init → new-module → visual-qa → factory → module-session ⇄ federation-review ⇐ adversarial → learn ─┐
   G1 G2 G3              G4               G5          G6 G7        Phase 0    Workflow D   gate 5      Workflow A       Workflows B/C    Workflow E   A5 L  │
audience ────── A1 ──── A2 ──── A3 ──── validate (A4, blocks G6) ───────────────────────────────────────────────────────────────────────────────────┘
                                                                                                                              └──► new hypothesis → Stage 2
```

## Operating modes

`mode: governed` (default) — every judgment gate is a human decision (owner for product artefacts,
engineer for contracts). `mode: fast` — judgment gates auto-ratify with a recorded review queue; agents
fan out in parallel; missing authority/capability/evidence, uncertain effects and exhausted limits still stop factory execution. Enforcement gates (typecheck, boundary
lint, contract tests, module tests, use-case e2e + visual) never relax in either mode. `trellis promote`
reviews the queue and returns to governed. PDD v1 and MVP selection are owner-ratified in every mode:
humans define, agents run.

## Testing is derived, enforced, and adversarial

Failure paths are derived per step from a failure taxonomy (the owner waives; agents never do). Every
invariant carries an enforcement point and a violation response, with tests for both. Gate 5 asserts a
coverage manifest before it runs a test, so an absent test fails like a failing one. An adversarial
session closes every build phase; its findings are classified by the federation layer with the engineer.
Assertions are add-only.

## Execution: tickets, tasks, and dispatch

Tickets are the unit of acceptance; tasks are the unit of execution. `trellis-module-coordinator` turns
a ticket into `TASKS.md` — disjoint-file tasks in waves (tests and stubs first, then parallel
implementers) — and dispatches worker subagents with a fixed brief and return format. Fan-out across
modules is one coordinator session per worktree; depth is two and workers never nest. Gates run in cost
order and e2e runs only on a green build. A **shell module** owns screen composition, navigation and the
visual spec; other modules export components, never pages, so use cases that cross modules do not show
their seams in the UI.

## Discovery and software-factory delivery

Product definition now starts with a built-in, decision-tree interview: free-form thoughts, facts vs
owner decisions, prerequisite-aware questions, focused or batch rounds, and confirmed understanding
before formal derivation. `DISCOVERY.md` preserves decisions/open questions for resumption. This is a
Trellis-native implementation inspired by grill-me/grilling, not an external skill dependency.

`trellis-factory` wraps existing module workflows with bounded work packets, specialist responsibilities,
independent acceptance, integration checks and five explicit feedback loops. Start with one implementer
and one independent verifier; add specialists only for relevant risks. `WORK-PACKET.md` and `RUN.md`
record scope, evidence, limits and handoffs; they do not install a durable queue or enforce a sandbox.
Unattended recovery requires a capability-checked adapter and an executed recovery pilot. Green tests
or fast-mode review debt never grant merge, deploy, external-send, spending or broader data access.

The normative skill/protocol additions implement discovery and the delivery method. Full profile-aware
routing, machine-readable validators, enforcement fixes and a runnable runtime conformance fixture
remain future work described in the proposal; this release does not claim those are implemented.

## Growth is a track, not a phase

`trellis-audience` starts at Stage 1 and maps actors to the rooms they already use; the owner posts, the
agent drafts. `trellis-validate` derives every threshold per project — researched benchmarks plus the
economic floor, presented for the owner to set; there are no default thresholds — and packages the
build / pivot / stop decision. `trellis-learn` runs the launch gate and the weekly loop. Per-ICP
playbooks (consumer, SMB, enterprise, developer, internal) carry instruments, channel maps, cold-start
routes, compliance posture, and benchmark sources — never threshold values.

## Model tiering

`templates/models.yaml` routes roles: `definition`, `design`, `spec`, `federation` require frontier
models (skills warn/refuse below that); `module` and `qa` default to a quantised local model via
Ollama; `escalation` engages after N failed verification cycles. Verification replaces judgment at the
module tier — that is what makes small models safe there.

## Layout

- `skills/` — seventeen skills; `skills/trellis/references/protocol.md` is the shared contract every skill follows
- `templates/` — contracts package, base module, boundary lint, CI (five gates + security), CODEOWNERS,
  models.yaml, PIPELINE.md, root CLAUDE.md
- `docs/` — the three white papers

## Proposals

- [0001 — Change-scoped engineering and unattended execution](proposals/0001-unattended-engineering-profile.md): proposed workflow profiles, evidence contracts, enforcement refinements and a bounded execution pilot. Partially realised by discovery/factory skill additions; workflow-profile routing and executable runtime enforcement remain proposed.

## Install

Claude Code / Cowork: install `trellis.plugin`. Other agents: the skills are plain markdown; point your
agent at `skills/<name>/SKILL.md` and `templates/`.

## Verification

Run `python3 -m unittest discover -s tests -v` for structural checks of skill names, references,
router entry points and plugin version. These are not behavioural agent/recovery tests. Build the
archive with `bash scripts/package-plugin.sh` (requires `zip`). Adapter behavioural acceptance
scenarios are in `skills/trellis-factory/references/loops.md` and remain to execute per harness.

## Licence

Apache-2.0 — see `LICENSE`.

## Repository

`scripts/package-plugin.sh` builds `trellis.plugin` from this tree. The plugin and the repo share one
layout, so there is nothing to sync. Contributions: skills are markdown, templates are code — a change to
either should cite the white-paper section it implements or amend the paper in the same PR.
