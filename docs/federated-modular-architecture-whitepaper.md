# Federated Modular Architecture for Agentic Software Development

**A design pattern for bounding, governing, and scaling AI coding agents through contract-enforced modules and a federation layer**

*Draft for review — June 2026 · Revised September 2026 · Companion: "Outcome-Driven Product Definition"*

---

## Executive Summary

Agentic coding tools degrade predictably as codebases grow. The two dominant failure modes are **context overflow** — the agent cannot hold enough of the system in working memory to reason correctly — and **unbounded blast radius** — nothing structurally prevents the agent from modifying code adjacent to, but outside, the intended scope of a change. Both failure modes are architectural in origin and are therefore best addressed architecturally rather than through prompting alone.

This paper proposes a **Federated Modular Architecture (FMA)**: a system composed of self-contained, contract-bound modules, each owning its own routing, models, and presentation (a vertical-slice MVC pattern), supervised by a **federation layer** that acts as the contract authority. The federation layer — implemented as an orchestrating agent session plus mechanical CI enforcement — reviews interface documentation, detects duplication across modules, proposes the promotion of shared services, and specifies changes to module-scoped agents. Architectural decisions are escalated to a human engineer, who retains final authority over contract changes and shared-service promotion.

The pattern is an evolution of a modular design originally developed for delegating work to human engineers. Its central claim is that the same properties that made modules delegable to people — bounded scope, enforced interfaces, a cloneable base module — make them delegable to agents, **provided the boundaries are converted from social convention into enforced infrastructure**. A secondary economic claim follows: because module agents implement against executable specifications rather than exercising system-wide judgment, routine implementation can be served by smaller, self-hosted models, with frontier-model expenditure concentrated at the federation tier (Section 8).

Two operating modes make the trade between governance and speed explicit: a governed mode in which every judgment gate is a human decision, and a fast mode in which judgment gates auto-ratify with a recorded review queue while enforcement gates never relax (Section 9).

The pattern is consistent with independently emerging industry practice: vertical slice architecture as an agent-friendly code shape, Shopify's modular monolith enabling its internal AI tooling, Nx-style module boundary enforcement and generator scaffolding, the MASAI research framework (which reported a ~40% improvement in successful AI-generated fixes when architectural constraints are embedded in the design), and the broader movement toward domain-bounded repositories with explicit, tooling-enforced API contracts.

---

## 1. Problem Statement

### 1.1 How agentic coding fails at scale

Coding agents perform well on small, well-scoped tasks and degrade non-linearly as project size and change scope grow. The observed failure modes are:

1. **Context overflow.** The agent's effective working memory is finite. As the volume of code relevant to a task grows, retrieval becomes lossy: the agent reasons over an incomplete or stale picture of the system and produces changes that are locally plausible but globally wrong.

2. **Unbounded blast radius.** Agents exhibit a tendency to "improve" code adjacent to the requested change — refactoring, renaming, reformatting, or restructuring components that did not need to change. In a codebase without enforced boundaries, every file is reachable and therefore every file is at risk.

3. **Convention drift.** Conventions held in documentation or in engineers' heads are invisible to an agent unless explicitly surfaced. Over successive agent sessions, undocumented conventions erode and the codebase accumulates stylistic and structural inconsistency, which in turn further degrades agent performance.

4. **Integration regression.** An agent can satisfy local tests within the area it modified while breaking emergent behaviour that spans components, because no single context window contains the cross-component interaction.

5. **Review burden inversion.** As agent throughput rises, the human bottleneck shifts from writing code to reviewing it. Without structural guarantees about what an agent *could not have touched*, every diff requires whole-system vigilance from the reviewer.

### 1.2 Why prompting alone is insufficient

Instructions such as "only modify files in directory X" or "do not refactor unrelated code" are advisory. They reduce, but do not eliminate, out-of-scope modification, and their effectiveness decays over long sessions. A robust solution requires that scope violations be **mechanically impossible or mechanically detected** — by filesystem permissions, dependency lint rules, contract tests, and CI gates — rather than merely discouraged.

### 1.3 The architectural insight

These failure modes are the same coordination problems that arise when delegating work across a large human team, compressed into a shorter timescale. The historical solution — modular decomposition with enforced interfaces — therefore applies, with one critical amendment: human teams respect boundaries by convention and culture; agents respect boundaries only when the boundaries are infrastructure.

---

## 2. Design Principles

The architecture rests on five principles:

**P1 — Machine-legible boundaries.** Every module boundary must be expressed in a form that tooling can check: workspace package separation, import restrictions, typed interface packages, and per-module agent instructions (e.g. per-directory `CLAUDE.md` files). A boundary that exists only in documentation does not exist for an agent.

**P2 — Bounded context per agent.** Each agent session is scoped to exactly one module. The module must be internally complete — routing, models, business logic, presentation, tests — so that the agent never needs to traverse the wider codebase to complete its task.

**P3 — Contracts as the only coupling.** Modules interact exclusively through versioned, schema-defined interfaces. Cross-module knowledge is forbidden at the import level and verified in CI.

**P4 — Exemplar over instruction.** Agents pattern-match working examples more reliably than they follow abstract rules. A canonical **base module** — cloneable via generator — encodes the architecture as executable precedent rather than prose.

**P5 — Judgment at the federation layer, decisions with the human.** Cross-cutting concerns (contract evolution, shared-service promotion, sequencing of breaking changes) are concentrated in a single federation layer, which prepares and recommends; a human engineer ratifies. Infrastructure enforces, agents propose, humans decide.

---

## 3. The Module Pattern

### 3.1 Module definition

A **module** is a self-contained vertical slice implementing one business capability. Each module:

- Implements a set of mandatory interfaces defined in a shared contracts package (lifecycle, registration, health, and any capability-specific interfaces).
- Follows an internal MVC layout: it owns and self-manages its routes, models/data access, and output/views.
- Carries its own test suite, fixtures, and module-level documentation, including a module-scoped agent instruction file describing its purpose, boundaries, conventions, and forbidden actions.
- Declares its public surface explicitly; everything not exported through the contract is private by construction.
- Owns **data**, not screens. Interface screens are owned by use cases and compose across modules through the contracts package (companion paper §10.3), so a user's primary purpose is served in one place even when it spans several entities.

### 3.2 The base module

A canonical base module serves as the template from which all modules are created. It contains the interface implementations as stubs, the standard folder layout, wired-up test scaffolding, the module instruction file template, and exemplary implementations of common patterns (a sample route, a sample model, a sample view, a sample contract test). New modules are created by generator ("stamp down the template"), never by hand, ensuring structural uniformity across the system — uniformity that directly improves agent pattern-matching.

### 3.3 The shared contracts package

All interfaces, shared types, and event schemas live in a dedicated workspace package (e.g. `@app/contracts`). This package:

- Is the **only** package any module may import from outside itself (beyond approved third-party dependencies).
- Is versioned, with breaking changes requiring a deprecation window.
- Is protected: changes require federation-layer review and human approval (enforced via a CODEOWNERS-style rule).
- Ships with **contract tests** — executable assertions of interface behaviour that every implementing module must pass in CI.
- Carries each entity's **closed state enumeration and allowed transitions**, so an illegal transition is a contract-test failure and a runtime refusal; invariant changes are therefore Workflow B changes by definition (companion paper §13.2).
- Carries **authorisation as contract**: every declared route states its required actor role, and contract tests assert that calls without it are refused. Authorisation is thereby a mechanically verified surface, not a per-module convention.
- Carries the **event schemas** that modules emit, including the use-case funnel events derived upstream from the product definition (companion paper, Observability), so instrumentation is part of the contract rather than an afterthought.

### 3.4 Enforcement infrastructure

The boundaries are made real by:

| Mechanism | What it enforces |
|---|---|
| Workspace packages (pnpm) | Physical separation; explicit dependency declaration |
| Dependency lint rules (Nx-style boundary rules or eslint import restrictions) | No module-to-module imports; contracts package as sole shared surface |
| Per-module agent instruction files | Scope, conventions, and forbidden actions, loaded automatically into the agent's context |
| Contract test suite | Behavioural conformance to interfaces |
| Cross-module integration test suite | Emergent behaviour across module boundaries |
| Use-case E2E and visual test suite (gate 5) | Coverage manifest first, then acceptance criteria, failure paths, abuse cases, invariant refusal/response, and the step-count invariant; screenshot comparison against the prototype |
| Fault-injection flag in the local substrate | One environment switch that fails the data store or an external call on demand, for Workflow E and dependency-failure tests |
| Security substrate (secret scanning, dependency audit, auth scaffold in base module) | Baseline security without a dedicated phase |
| Events sink, error tracker, structured logging convention | Observability from the first module, proportionate to an MVP |
| Protected-path review rules | Human gate on the contracts package and base module |
| CI pipeline | All of the above, on every change, with fast feedback |

---

## 4. The Federation Layer

### 4.1 Role

The federation layer is the **contract authority** of the system. It does not write feature code. Its responsibilities are:

1. **Interface review.** Reviewing proposed changes to interface documentation and contract definitions originating from module work.
2. **Duplication detection and promotion.** Periodically scanning module implementations and interface docs for convergent functionality (e.g. three modules independently implementing retry logic) and proposing extraction into a shared service. Duplication is deliberately *tolerated* until promotion is justified — extraction follows proven duplication, never anticipation.
3. **Change specification.** Decomposing approved cross-cutting changes into per-module specifications, each scoped so a module agent can implement it within its bounded context against an executable contract.
4. **Sequencing.** Planning the rollout order of breaking interface changes across modules, using versioned interfaces and deprecation windows rather than big-bang swaps.
5. **Escalation.** Packaging architectural decisions — promotions, breaking changes, new modules — as recommendations with rationale for human ratification.
6. **Security review.** Any contract change touching a classified entity or an authentication surface carries a security section in the review artefact (data classification is inherited from the product definition's derived data model).
7. **Waivers and findings.** Failure-class waivers at the contract level, invariant changes, and the classification of adversarial findings (Workflow E) are federation decisions ratified by the engineer. Module agents never waive a failure class or relax an assertion.

### 4.2 Implementation: workflow, not resident agent

In the current state of tooling, the federation layer is best implemented as a **recurring orchestration workflow plus standing CI gates**, rather than a continuously running agent:

- A scheduled or on-demand **federation review session** (an orchestrating agent run) scans interface docs, contract diffs, and duplication signals, and produces a review report with promotion candidates and specs.
- **CI gates** perform the always-on enforcement (boundary lint, contract tests, protected paths). The infrastructure enforces; the agent session exercises judgment; the human decides.
- For implementation fan-out, the orchestrator spawns **module-scoped subagent sessions**, each receiving only: the relevant spec, the contracts package, and its own module. Subagents return summaries and diffs, not full context, preventing context accumulation at the orchestration level.

### 4.3 The human governance gate

The human engineer sits at the highest-leverage point: architectural decisions rather than line-by-line review. Specifically, human approval is required for:

- Any change to the shared contracts package.
- Creation of a new shared service (promotion).
- Creation or retirement of a module.
- Changes to the base module (since these propagate by precedent).

Module-internal changes that pass module tests, contract tests, and boundary lint may merge under lighter-touch review, because the infrastructure guarantees what the change *could not* have touched.

---

## 5. Operating Model

### 5.1 Workflow A — Module-scoped change (the common case)

1. A task is filed against a single module.
2. A module agent session is opened, scoped to that module's directory plus the contracts package.
3. The agent implements against existing contracts; module tests and contract tests run locally.
4. CI verifies boundary lint, contract conformance, integration tests, and — the fifth gate — the use-case end-to-end and visual tests generated from the product definition (companion paper §10.4). Gate 5 first asserts a **coverage manifest** (every use case the ticket serves has a specification containing its happy path, every non-waived failure path, its abuse cases, and its invariant refusal and response tests); a missing mapping fails exactly as a failing assertion does. A ticket cannot close with uncovered failure paths.
5. Light human review; merge.

No federation involvement. This should be the overwhelming majority of changes.

### 5.1a Execution within a ticket — tasks and dispatch

A ticket is the unit of ownership and acceptance: what done means, with tests. A task is the unit of execution: what one agent does in one sitting, on a set of files it alone owns. The two are different layers, and an architecture that defines only the first leaves the agent to take the cheapest path — one session doing everything serially — however often the word "fan-out" appears in its documentation.

A ticket larger than one sitting is run by a **coordinator**: the main session of a module worktree, which decomposes the ticket into `TASKS.md` by **file ownership, not activity**. Wave one is always the named tests and compiling, failing interface stubs; nothing else starts until that wave passes typecheck and lint. Wave two is parallel implementers, each owning disjoint files. Wave three is the coordinator running the gates and fixing seams only. Workers are dispatched together with a fixed brief (ticket excerpt, task row, owned files, read-only contracts, the tests to turn green) and return only a fixed report; they coordinate through shared artefacts — `TASKS.md`, the stubs, the failing tests — not through messages. Depth is two: coordinators across modules run in parallel worktrees launched by the human or a script, workers are subagents of a coordinator, and workers never nest. Intra-ticket parallelism is permitted in governed and fast mode alike; precondition ordering (companion paper §9.4) is a relation between use cases, not between a ticket's tasks.

Gates run in cost order — typecheck, boundary lint, contract tests, module tests — and the end-to-end gate runs only on a build that has passed the first four. Running the slowest gate on a red build is the single largest avoidable cost in a verification loop.

### 5.1b The shell module

A use case crosses modules; each module owns its own views; the seams appear in the interface. The structural answer is a **shell module** that owns screen composition, navigation, and conformance to the visual specification. Other modules export components through a declared `ui/` surface listed in their manifest and never pages; the shell is the one module permitted to import `@modules/*/ui`, enforced as a lint exception. Tickets are cut as vertical slices per use case: module tickets for data, API, and components, plus one integration ticket owned by the shell that composes the screens and carries gate 5 — the use case's end-to-end and visual tests — as acceptance. This is the concrete mechanism for the companion paper's rule that screens are owned by use cases and data by modules (ODPD §10.3), and it adds one module to the decomposition, not a new layer.

### 5.2 Workflow B — Cross-cutting change

1. A change is identified that affects the shared contract (new interface, breaking modification, new event).
2. The federation session drafts the contract change, writes or updates **contract tests first**, and produces per-module impact specs.
3. The human reviews and ratifies the contract change (or amends/rejects).
4. The contract is published as a new version with a deprecation window where applicable.
5. The federation session fans out per-module specs to module agents, sequenced per the rollout plan.
6. Each module change merges through Workflow A's verification path; the deprecation window closes when all modules conform.

### 5.3 Workflow C — Promotion of a shared service

1. The periodic federation review detects convergent implementations across N modules.
2. A promotion proposal is drafted: the candidate abstraction, the modules affected, the contract it would expose, and the migration plan.
3. The human ratifies, amends, or rejects.
4. On ratification, the shared service is created (itself a module, with a contract), and migration specs are fanned out via Workflow B.

### 5.4 Workflow E — Adversarial session

1. At the end of each build phase (automatically in fast mode; on request in governed mode), an agent on the QA tier is given the running local environment, the contracts package (invariants, transitions, required roles), and the failure paths, with the sole objective of violating invariants: out-of-order steps, mid-flow interruption, replay, concurrent actors, fuzzed input, and dependency faults via the substrate's single fault-injection flag.
2. The session produces a findings report. It classifies nothing and changes nothing.
3. The federation layer classifies each finding with the engineer: a defect against an existing failure path (ticket, Workflow A) or an unanticipated failure (proposed failure path to the owner through the amendment loop, then regeneration of the affected specifications). In fast mode the classification is auto-accepted and queued.
4. Agent-found failures may add assertions and may never relax one.

### 5.5 Workflow D — New module creation

1. The generator stamps a new module from the base module template.
2. The module instruction file is populated (purpose, boundaries, conventions).
3. The module registers its contract surface; contract tests are wired before feature work begins.

---

## 6. Failure Modes and Mitigations

| # | Failure mode | Description | Mitigation |
|---|---|---|---|
| F1 | Federation as single point of failure | A mis-specified change is faithfully implemented wrongly by every module agent | Contract tests written **before** fan-out; specs are executable, not prose; human gate on all contract changes |
| F2 | Spec degradation ("telephone") | Nuance is lost between orchestrator intent and module implementation | Machine-checkable contracts (typed interfaces, schemas, contract test suites); conformance verified by CI, not by orchestrator judgment |
| F3 | Distributed-transaction problem | Breaking changes require coordinated multi-module rollout | Versioned interfaces, deprecation windows, federation-planned sequencing; never big-bang swaps |
| F4 | Context overflow at the federation layer | Orchestrator reviews everything and recreates the original problem one level up | Federation reviews **interface docs and contract diffs only**; implementation internals are the module's concern, verified by module tests; subagents return summaries |
| F5 | Duplication accumulation | Module isolation hides convergent reimplementation | Periodic federation duplication scan; tolerated-then-promoted policy |
| F6 | Boundary erosion | Agents route around boundaries via copy-paste, re-export tricks, or filesystem reach | Boundaries enforced mechanically (lint, package isolation, read-only mounts where available), not conventionally |
| F13 | Fan-out asserted, not operationalised | Documentation says work parallelises; no skill says how to dispatch, so one session does everything | Coordinator form of Workflow A with TASKS.md, worker brief, report format, and worktree topology (Section 5.1a) |
| F14 | Seams in the interface | Each module owns views; cross-module use cases show the joins | Shell module owns composition; modules export components; vertical-slice tickets with gate 5 acceptance (Section 5.1b) |
| F7 | Integration regression | Module-local tests pass while cross-module behaviour breaks | Dedicated cross-module integration suite owned at the federation level, run in CI on every merge |
| F8 | Interface ossification or churn | Contracts change too rarely (workarounds accumulate) or too often (constant migration tax) | Human governance gate calibrates cadence; deprecation windows amortise migration cost; federation review surfaces workaround patterns as promotion/contract-change signals |
| F9 | Base-module drift | The template falls behind live conventions, so new modules are born outdated | Base module treated as protected, versioned artefact; periodic federation review includes template currency check |
| F11 | Vacuous gate | A test gate passes because no test exists for the change | Gate 5 asserts coverage before running (Section 5.1) |
| F12 | Self-weakening verification | An agent relaxes or deletes an assertion to reach green | Module sessions may not waive or weaken; adversarial findings are add-only; waivers are federation decisions |
| F10 | Human rubber-stamping | Governance gate degrades into approval theatre under volume | Limit the gate to genuinely architectural decisions (contracts, promotions, modules); keep Workflow A human-light so reviewer attention is conserved for Workflows B–D |

---

## 7. Prior Art and Supporting Evidence

The pattern is corroborated by several independent strands of practice and research:

**Vertical Slice Architecture (VSA).** VSA groups all code for a business capability — request, validation, handler, response — into one self-contained slice, avoiding cross-slice coupling and extracting shared code only when duplication is proven. It is increasingly recommended specifically because it reduces the agent tendency to "improve everything around" a change. Opinionated agent skills (e.g. dotnet-vsa-webapi for Claude Code) now encode VSA as an architectural playbook for agents.

**Shopify's modular monolith.** Shopify restructured its Rails monolith into bounded contexts with clear interfaces and internal service boundaries, which enabled its internal AI assistant to generate meaningful feature additions without compromising design integrity — a production-scale demonstration that intentional modularity is an AI enabler.

**Nx-style monorepo tooling.** Module boundary lint rules give agents immediate feedback when they import across a forbidden boundary; generators stamp new projects from templates with predictable, convention-matching output. This is the mechanised form of the base-module cloning workflow, and demonstrates the enforcement layer in commercial use.

**MASAI (Modular Architecture for Software-engineering AI Agents, 2024).** Research framework reporting approximately 40% improvement in successful AI-generated fixes when architectural constraints are embedded in the system design — direct empirical support for P1 and P3.

**Federated repository models.** Large engineering organisations are reportedly converging on domain-bounded repositories aligned to team ownership, explicit API contracts enforced by tooling, agent-optimised documentation, and standardised scaffolding — the same pattern at organisational scale.

**The counter-position.** A credible opposing argument holds that agents produce better output with whole-codebase visibility, since repository boundaries are context walls that particularly penalise cross-cutting changes. FMA absorbs this critique by remaining a **monorepo** pattern: full visibility is available when the federation layer needs it, while default agent sessions are scoped narrowly. The boundary is a permission and verification construct, not a visibility wall.

---

## 8. Token Economics and Self-Hosted Models

The architecture changes not only how agents behave but what they cost. This section addresses two consequences: the redistribution of token expenditure, and the viability of running module agents on smaller, self-hosted models.

### 8.1 Token redistribution

In an unbounded codebase, a large fraction of agent token expenditure is **exploration**: reading files to establish relevance, following import chains, and re-attempting work after acting on an incomplete or stale picture of the system. FMA attacks this directly.

**Workflow A becomes cheaper per task.** A module-scoped session begins with a small, known working set — the module directory plus the contracts package — eliminating most exploration and the failed-attempt loops that follow from confusion. Structural uniformity compounds the saving: because every module shares an identical layout and depends on the same stable contracts package, recurring scaffolding tokens achieve high prompt-cache hit rates across sessions.

**Workflow B carries a deliberate premium.** Orchestrated fan-out is materially more expensive than a single session — figures in the region of five to seven times a comparable single-session run are reported for planning-mode agent teams — because orchestrator planning, per-module spec generation, and N parallel implementations are each billed. Three mitigations are built into the design: subagents return summaries and diffs rather than full transcripts; the federation layer reviews contract surfaces only, never implementation internals; and cross-cutting changes are intentionally rare events governed by the human gate.

**Net effect.** Total expenditure is typically flat or reduced, but redistributed: routine module work becomes cheap and cache-friendly, while occasional federation ceremonies are expensive and visible. Critically, spend becomes **legible** — meterable per module, per workflow, and per model tier — which is not achievable when a single agent wanders a monolith.

### 8.2 Verification replaces judgment

The premise underlying frontier-model usage in unbounded codebases is that the model's judgment is the only safety mechanism: it must be intelligent enough not to break things it cannot fully see. FMA inverts this. A module agent does not need to understand the wider system; it needs to satisfy an executable specification — contract tests, module tests, and boundary lint. A weaker model in a tight verification loop **fails loudly and retries**; it cannot fail silently in the way it would when ranging across an unenforced codebase. The architectural requirement is thereby lowered from "smart enough to exercise system-wide judgment" to "capable enough to satisfy a machine-checked spec" — a substantially lower bar, and one within reach of current open-weight coding models.

### 8.3 Model tiering

The recommended deployment assigns models by the judgment demanded at each layer:

| Layer | Model class | Rationale |
|---|---|---|
| Adversarial sessions (Workflow E) | Quantised open-weight model, self-hosted | Exhaustive, mechanical probing against executable invariants; classification of findings is reserved to the federation tier |
| Module agents (Workflow A; Workflow B implementation legs) | Quantised open-weight coding model, self-hosted (e.g. Qwen3-Coder 32B-class at Q4/Q5 via Ollama) | Implementation against a clear spec with executable verification; additional retry iterations are near-free locally |
| Federation layer (review, specs, sequencing, promotion analysis) | Frontier hosted model | Contract review, ambiguity resolution, and spec authorship are precisely where weaker models fail, and a defective spec is amplified across every module (failure mode F1) |
| Escalation path | Frontier hosted model, on demand | Tasks that fail N local verification cycles are escalated with full task context |

The escalation cascade — local model first, hosted frontier model on repeated failure — mirrors the established local-first inference pattern (Ollama primary with hosted OpenAI/Anthropic fallback) and bounds frontier-model spend to the residual of tasks the local tier cannot complete.

### 8.4 Caveats for quantised local models

Three limitations warrant acknowledgment, each with a corresponding architectural answer:

1. **Weaker instruction-following on soft boundaries.** Largely neutralised: FMA boundaries are mechanical (lint, package isolation, protected paths), not instructional. The architecture was designed on the assumption that *no* model reliably honours advisory scope constraints.
2. **Smaller effective context windows.** Neutralised by module scoping, which is independently motivated; the bounded working set that protects a frontier model from overflow fits comfortably within an open-weight model's window.
3. **Patchier tool-calling reliability in agentic harnesses.** Not architecturally mitigated; harness-and-model combinations should be validated empirically before commitment, and tool-calling fidelity treated as a selection criterion alongside raw coding benchmarks.

The honest framing is that FMA does not make small models equivalent to frontier models. It makes the **tasks** small enough, and the **verification** strict enough, that the capability gap ceases to matter for routine work — and routes the work where it does matter to the federation tier.

### 8.5 Economic success criteria

The model-tiering strategy should be evaluated against: (a) the proportion of Workflow A tasks completed by the local tier without escalation (target: substantial majority); (b) frontier-model spend concentrated in federation sessions and escalations rather than routine implementation; (c) cost per merged module change trending down as cache hit rates and template maturity improve; and (d) no degradation in the architectural success criteria of Section 10 attributable to the lower tier.

---

## 9. Operating Modes

The workflows of Section 5 serialise at two points: human ratification (contracts, promotions, and — upstream — the product definition artefacts) and precondition-ordered fan-out. The second exists for *verifiability*, not because modules cannot be built concurrently: contracts-first means every module in a phase can be implemented simultaneously against the contracts package with stubs, and the integration suite reconciles them at the end. When the objective is a rapid prototype rather than a governed build, the architecture should permit that concurrency without abandoning enforcement. Two operating modes, recorded in the pipeline state file, make the choice explicit.

### 9.1 Governed mode (default)

Every judgment gate is a human decision: contract changes and promotions are ratified by the engineer through the federation review artefact; upstream product artefacts are ratified by the owner. Fan-out follows precondition order so that each increment is verifiable through the interface as it lands. This is the mode described throughout this paper.

### 9.2 Fast mode

Fast mode auto-accepts **judgment** gates and never auto-accepts **enforcement** gates.

- **Auto-ratification with a record.** Every decision that would have awaited a human — a contract change, a promotion, a PDD amendment proposed by research, a visual specification, a walkthrough discrepancy resolution — is accepted automatically and recorded in the same place a human decision would be recorded (the review artefact, `DECISIONS.md`, the PDD change log, the walkthrough record), tagged `auto`. The debt is visible, not absent.
- **Concurrent fan-out.** Precondition tiers collapse: all modules in a phase are implemented in parallel against the contracts package; per-tier verifiability is replaced by verification at the end of the phase (integration suite and the use-case E2E gate). Upstream, research and prototype construction parallelise per use case.
- **Adversarial sessions run automatically** at the end of each phase (Workflow E); findings are classified `auto` and queued.
- **Escalation remains the only stop.** The operator is interrupted only when a task exhausts both its local verification cycles and its escalation cycles (Section 8.3). Everything else proceeds.
- **Enforcement is unchanged.** Boundary lint, contract tests, protected paths, the five-gate verification loop, and CI run exactly as in governed mode. A change that fails them fails in fast mode too. This is the line between fast mode and unstructured agentic building: the mechanics that make the codebase trustworthy do not have an off switch.

### 9.3 What fast mode does not auto-accept

The product definition (PDD v1) and the MVP selection are ratified by the owner in every mode. They take minutes, and every downstream artefact is generated from them; auto-accepting the definition is not prototyping but abdication. The division holds in both modes: **humans define; agents run.**

### 9.4 Promotion from fast to governed

A fast-mode build produces a working prototype and a **ratification queue**: every `auto`-tagged decision, batched for review. Promotion to governed mode presents the queue to the owner and engineer for ratification, amendment, or reversal; reversals become Workflow B changes. A prototype built in fast mode is therefore never a black box — it is a governed build with its decisions deferred, and the cost of deferral is the review queue rather than unknown drift.

---

## 10. Implementation Roadmap

A staged adoption path, suitable for piloting on an existing pnpm/TypeScript monorepo:

**Phase 0 — Substrate (1–2 days).**
Confirm workspace package layout; create the `@app/contracts` package; add protected-path review rules for contracts and (future) base module.

**Phase 1 — Pilot modules (1–2 weeks).**
Select two existing feature areas; refactor each into a self-contained module conforming to the layout; write their module instruction files; add boundary lint rules; write initial contract tests. Measure: out-of-scope diff rate and review time per change, before vs after.

**Phase 2 — Base module and generator (a few days).**
Extract the common structure of the pilot modules into a base module template; build a generator that stamps new modules; create the next new module via the generator only.

**Phase 3 — Federation workflow (1 week).**
Author the federation review session as a reusable orchestration prompt/skill: inputs (contract diffs, interface docs, duplication signals), outputs (review report, promotion candidates, per-module specs). Wire the human ratification step. Add the cross-module integration suite to CI.

**Phase 4 — Fan-out at scale (ongoing).**
Run Workflow B end-to-end on a real cross-cutting change with subagent fan-out. Tune spec format until module agents implement reliably against contract tests without clarification rounds.

**Success criteria.** (a) Out-of-scope file modifications per agent PR approach zero; (b) median human review time for Workflow A changes falls materially; (c) contract changes are infrequent, deliberate, and fully sequenced; (d) duplication is detected and promoted rather than discovered accidentally.

---

## 11. Open Questions

1. **Granularity.** What is the optimal module size for agent context windows as model capability grows? Too fine and the contract surface explodes; too coarse and context overflow returns.
2. **Contract test authorship.** Should contract tests be authored by the federation layer, by the proposing module, or adversarially by both? Adversarial authorship may better detect spec ambiguity.
3. **Federation memory.** How much persistent state should the federation layer retain between review sessions (decision records, rejected promotions, deprecation timelines), and in what form (ADRs, a decisions log in the contracts package)?
4. **Multi-orchestrator scaling.** At what system size does a single federation layer itself become a bottleneck, and does the pattern recurse (federations of federations over domains)?
5. **Economic calibration.** Section 8 establishes the tiering strategy, but the equilibrium points remain empirical: at what change frequency does standing enforcement infrastructure plus occasional federation sessions outperform always-on orchestration on cost, and how should the escalation threshold (N failed verification cycles) be tuned as open-weight model capability improves?
6. **Human attention budget.** What ratification volume can one engineer sustain before the governance gate degrades (F10), and what signals indicate the gate should be split by domain?

7. **Fast-mode debt.** How large can the ratification queue grow before promotion becomes impractical, and should fast mode carry a ceiling (decisions, or elapsed phases) after which promotion is forced?

---

## 12. Conclusion

The failure modes of agentic coding at scale — context overflow, unbounded blast radius, convention drift, integration regression — are coordination problems, and modular decomposition with enforced interfaces remains the strongest known answer to coordination problems in software. The amendment demanded by the agent era is that boundaries must graduate from convention to infrastructure: workspace isolation, dependency lint, contract tests, protected paths, and per-module agent instructions.

On that substrate, a federation layer concentrates cross-cutting judgment — contract review, duplication promotion, change specification, rollout sequencing — while a human engineer retains decision authority at the architectural level. Infrastructure enforces; agents propose and implement; humans decide. The division of labour that once made modules delegable to engineers makes them delegable to agents, and positions the system to absorb rising agent throughput without a corresponding rise in review burden or architectural decay.

---

*Prepared for internal review. Sources referenced in Section 7 reflect industry and research material current to mid-2026.*
