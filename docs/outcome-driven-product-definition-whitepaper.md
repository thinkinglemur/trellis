# Outcome-Driven Product Definition

**An interactive method for defining products, deriving data models, designing experiences, and verifying prototypes — upstream of specification in a Federated Modular Architecture**

*Draft for review — September 2026 · Companion to "Federated Modular Architecture for Agentic Software Development"*

---

## Executive Summary

Specification pipelines fail before they start. A specification generated from a vague brief inherits the vagueness; a prototype built from a feature list rather than from outcomes becomes a picture people argue about; a data model invented rather than derived accumulates entities no workflow needs; and an MVP defined by feature count rather than by testable value ships too much and proves too little. In an agentic pipeline these defects are amplified, because every downstream artefact — SPEC, ARCH, TICKETS, modules — is generated faithfully from the defective upstream one.

This paper defines **Outcome-Driven Product Definition (ODPD)**: a six-stage method that runs before any technical specification is written. A product owner works **interactively** with an agent to build a Product Definition Document (PDD) whose load-bearing content is a set of explicit **use cases** — actors, preconditions, numbered steps, and rigorously stated **outcome descriptors**. From the use cases the owner **derives** (not invents) a data model. An MVP is defined as the **smallest testable value**: the minimal subset of use cases that delivers one complete outcome end-to-end. An agent acting as **researcher and interaction designer** then conducts competitive product research and user research where participants are available, designs the experience against the outcomes, and produces a **visual design specification**, feeding proposed amendments back to the owner, who ratifies every change. A high-fidelity prototype, built by the agent, serves as the **executable specification of the experience layer**, verified by walking every use case through it. Finally, a **trace matrix** — use case × prototype flow × acceptance criterion — gates the handoff into FMA Workflow Zero, where use cases become acceptance criteria and their clustering informs module decomposition, and where ticket assembly follows an **infrastructure-first build order**: local development environment and substrate before any module, and modules ordered so that each is independently verifiable through the UI as soon as one exists.

The method is designed for a **two-person human team** — a product owner and an engineer — with agents filling the researcher, designer, and implementation roles. The intent is a smaller team that achieves more, faster, and correctly the first time. It is explicitly **not** the fastest route to a first demo: the definition, research, design, and verification stages take longer than an ideation session followed by unstructured "vibe coding." The trade is deliberate. Time spent upstream is repaid in the elimination of rework, the reduction of review burden, and the ability to run implementation on bounded agent sessions and smaller models (FMA §8), because what reaches implementation is already correct.

Four recurring delivery failures — undetailed screen states, omitted conventional affordances, entity-shaped workflows, and unverified acceptance criteria — are treated as one class, implicit knowledge, and compensated by converting it to explicit-or-waived artefacts verified mechanically. Security is placed as a property of existing artefacts (abuse cases, data classification, authorisation as contract, CI scanning) rather than a phase, and observability is derived from the PDD as one north-star metric and one funnel per use case, on infrastructure proportionate to an MVP.

The method mirrors the governing idea of FMA at the product layer. In FMA, contracts are the single coupling surface and contract tests are the executable spec that lets agents implement safely. In ODPD, **use cases are the single coupling surface** between owner, designer, engineer, and agent, and **the prototype plus the trace matrix are the executable spec** that lets specification be generated safely. Owner ownership replaces the human governance gate; the trace matrix replaces CI.

---

## 1. Problem Statement

### 1.1 Where product definition fails

1. **Feature lists in place of outcomes.** A feature ("export to CSV") states a capability without stating what the world looks like when it has worked. Downstream, every role fills the gap differently: the designer designs for one interpretation, the engineer builds another, and the test asserts a third.

2. **Batch briefing.** A single up-front brief, however long, cannot surface what the owner has not yet thought about. Batch interviews produce answers of uneven quality: confident where the owner has prior experience, improvised elsewhere, and the improvisations are indistinguishable from the convictions in the resulting document.

3. **Invented data models.** When the model is designed before the use cases are explicit, entities are introduced on speculation. Every speculative entity is a maintenance cost and a source of downstream confusion for agents, which will faithfully build storage, migrations, and endpoints for things nothing uses.

4. **Design divorced from definition.** Research findings are absorbed into design decisions without returning to the definition. The prototype drifts from the PDD; the PDD is no longer true; the spec is generated from the PDD anyway.

5. **The prototype as argument.** Without an explicit verification procedure, a high-fidelity prototype is evidence of nothing in particular. Stakeholders react to it aesthetically and the reaction is mistaken for validation.

6. **MVP by feature count.** "MVP" is routinely defined as a reduced feature list rather than as the smallest thing that can be tested for value. The result is a product that is too large to build quickly and too incomplete to prove anything.

7. **Build order by feature priority.** Tickets are ordered by product importance rather than by verifiability. Teams — and agents — build the most important feature first with no environment to run it in and no interface to verify it through, and the first verifiable moment arrives weeks late.

### 1.2 Amplification under agentic generation

Each of these defects is tolerable, though costly, in a human pipeline where engineers question upstream artefacts. In an agentic pipeline the upstream artefact is the input to generation, and generation is faithful. A speculative entity becomes a module; an ambiguous outcome becomes an untestable acceptance criterion; a feature-ordered ticket list becomes a fan-out that cannot be verified until it is finished. The FMA white paper identified defective specification (F1) as the one failure the architecture cannot verify its way out of. ODPD exists to prevent F1 at source.

### 1.3 The intended team

ODPD assumes a deliberately small human team: a **product owner**, who holds the definition and ratifies every change to it, and an **engineer**, who holds the technical judgment — feasibility, architecture confirmation, module boundaries, and the review gates in the downstream FMA pipeline. There is no assumption of a dedicated designer, researcher, or product manager. Those roles are performed by agents under the owner's direction: competitive and user research, experience design, visual design specification, and prototype construction.

This is a different proposition from either the traditional cross-functional team or the solo "vibe coder." Against the traditional team it substitutes agent capacity for headcount while preserving the role separation that makes the artefacts trustworthy. Against unstructured agentic building it substitutes a longer, gated definition process for immediate generation. The method is slower to a first screen and faster to a correct product, and it is designed for owners and engineers who would rather build the right thing once than iterate toward it under production pressure.

---

## 2. Design Principles

**P1 — The owner owns the definition.** The PDD is the owner's document throughout. Every other role proposes amendments; only the owner ratifies them. The PDD is versioned, and every downstream artefact declares the PDD version it traces to.

**P2 — Interactive, not batch.** The PDD is built through a sustained, iterative dialogue between the owner and an agent, one use case at a time, with the agent probing for missing actors, unstated preconditions, failure paths, and untestable outcomes as they arise. The owner writes; the agent interrogates and structures.

**P3 — Outcomes are the contract.** Every use case ends in an outcome descriptor precise enough that data model derivation and later test generation are mechanical. An outcome that cannot be observed cannot be specified.

**P4 — Derivation over invention.** The data model is derived from the nouns and state changes in the use cases. Every entity traces to at least one use case; every outcome is expressible as a state change on the model. Anything that fails either direction of the trace is removed or the use cases are amended.

**P5 — The prototype is the executable spec of the experience.** It is verified, not admired: every use case is walked through it step by step, and every outcome descriptor must be demonstrable at the corresponding point.

**P6 — Traceability gates every handoff.** No artefact passes to the next stage with an empty cell in its trace. The trace matrix is the ODPD equivalent of FMA's CI pipeline.

**P7 — MVP is the smallest testable value.** The MVP is defined as the minimal subset of use cases that delivers one complete outcome end-to-end for one actor, such that the value hypothesis can be tested with real usage. It is a selection over the use case set, not a reduced feature list.

**P8 — Infrastructure first, then verifiable increments.** Build order begins with the substrate and the local development environment, then proceeds module by module in an order that keeps the system runnable and each increment verifiable — through the UI where one exists — from the first ticket onward.

**P9 — Agents research and design; humans own and decide.** Research, experience design, visual design specification, and prototype construction are agent roles, performed under the owner's direction and subject to the owner's ratification. The human team is the owner and the engineer. Agent-produced design is held to the same traceability and verification standards as human-produced design — the standards, not the author, are what make the artefacts trustworthy.

---

## 3. Pipeline Overview

| Stage | Owner | Participants | Primary artefact | Gate to next stage |
|---|---|---|---|---|
| 1. Product Definition | Product owner | Owner + agent | PDD v1 (overview, features, use cases) | Every use case has actors, steps, and a rigorous outcome descriptor |
| 2. MVP Definition | Product owner | Owner + agent | MVP use-case subset; backlog | One complete outcome end-to-end; value hypothesis stated |
| 3. Data Model Derivation | Product owner | Owner + agent | Derived data model | Bidirectional trace: entities ↔ use cases complete |
| 4. Research & Experience Design | Product owner | Agent (researcher + designer), owner (ratifier), engineer (feasibility) | Competitive research; user research findings; experience flows; visual design spec; PDD amendments | Every flow maps to use cases; all amendments ratified; PDD version bumped |
| 5. High-Fidelity Prototype | Product owner | Agent (builder), owner + engineer (verifiers) | Prototype; walkthrough record | Every MVP use case walks through with outcomes demonstrable |
| 6. Handoff to Workflow Zero | Product owner | Owner, engineer, agent | Trace matrix; build order | No empty cells; Phase 0 = infrastructure + local dev |

Stages 1–3 are owner-led and agent-assisted. In Stage 4 the agent takes on the researcher and designer roles, with the engineer joining as feasibility reviewer. Stage 5 is agent-built and human-verified. Stage 6 is the bridge into the FMA specification pipeline. The owner is the accountable role at every stage; the agent never ratifies its own output.

---

## 4. Stage 1 — Interactive Product Definition

### 4.1 Entry: the owner's description

The owner begins with a free-form description of any length. No structure is imposed at this point. The agent's first act is to extract from the description a candidate list of actors, features, and implied use cases, and present them back for the owner to correct — establishing from the outset that the owner corrects and the agent structures.

### 4.2 Interactive elaboration

The PDD is built one use case at a time. For each candidate use case the agent:

1. Proposes actors (human roles and system actors) and asks the owner to confirm or amend.
2. Elicits the preconditions — what must already be true.
3. Walks the owner through the steps, one at a time, asking at each step *what does the actor do, and what does the system do in response* until the owner states the outcome.
4. Challenges the outcome descriptor against the rigour format (§4.4) and rewrites it with the owner until it passes.
5. Asks for the failure paths: what happens if a step cannot complete, and what outcome results.
6. Records the use case, assigns it an identifier (`UC-nnn`), and presents a running summary of the PDD before moving to the next.

The agent maintains a **parking list** of gaps it notices — an actor mentioned but never given a use case, a feature with no use case, a noun that appears in steps but never in an outcome — and raises them at natural pauses rather than interrupting the owner's flow.

This is deliberately the inverse of the batch interview used in specification generation. The batch interview is appropriate downstream, where the PDD supplies the answers; it is inappropriate here, where the answers are being discovered.

### 4.3 PDD structure

```
PDD.md
  Version: n
  1. Overview          — problem, audience, value proposition (owner's words, lightly structured)
  2. Actors            — one entry per human role and system actor
  3. Feature list      — each feature references the use cases that realise it
  4. Use cases         — UC-001 … UC-nnn (format in §4.5)
  5. Glossary          — one canonical name per concept
  6. Change log        — every amendment, its proposer, and the owner's ratification
```

### 4.4 Outcome descriptor rigour

An outcome descriptor must satisfy four conditions:

1. **Observable** — it states what exists or is displayed, not what the user feels or understands.
2. **State-expressed** — it names the entities and the states they are in after the use case completes.
3. **Bounded** — it lists every side effect (notifications, events, records) so that nothing happens that the descriptor did not declare.
4. **Testable** — a reader could write a pass/fail check from it without further information.

Weak: *"The user sees that their order went through."*
Compliant: *"An Order exists in state `confirmed` with the submitted line items; the actor is shown the order reference; a confirmation notification has been sent to the actor's registered address; an `order.confirmed` event has been emitted."*

The compliant form is what makes Stage 3 derivation and later test generation mechanical: the nouns (`Order`, line item, notification, event) are entities or side effects, and the states (`confirmed`) are enumerations.

### 4.5 Use case format

```
UC-nnn  <name>
Actors:         <primary actor>; <secondary actors>; <system actors>
Preconditions:  <what must be true>
Steps:
  1. <actor> does <action>
     → system <response>
  2. …
Outcome:        <rigorous outcome descriptor>
Failure paths:
  F1. At step k, <condition> → <outcome descriptor for the failure>
Realises:       <feature ids>
MVP:            yes | no       (set in Stage 2)
```

### 4.6 Versioning and ownership

The PDD is version 1 when the owner declares Stage 1 complete. Thereafter any change — from research, design, engineering, or the owner's own reconsideration — is an **amendment**: proposed by a named role, recorded in the change log, and ratified, amended, or rejected by the owner. Ratification bumps the version. Every downstream artefact (data model, flows, prototype, trace matrix, SPEC) declares the PDD version it traces to; a version bump invalidates the trace for affected use cases until it is re-established.

---

## 5. Stage 2 — MVP Definition

### 5.1 Definition

The MVP is the **smallest subset of use cases that delivers one complete outcome end-to-end for one primary actor**, such that the product's central value hypothesis can be tested with real use. It is selected from the use case set, never assembled from a feature list.

### 5.2 Selection procedure

1. The owner states the **value hypothesis** in one sentence: *"If <actor> can <achieve outcome>, then <observable signal of value>."*
2. The agent identifies the use case whose outcome most directly realises the hypothesis — the **anchor use case**.
3. The agent traces the anchor's preconditions backward: every use case required to make the anchor's preconditions true is included (e.g. the anchor requires an authenticated actor with a saved item, so account creation and item saving are included).
4. The agent traces forward one step: any use case without which the anchor's outcome is unobservable or unusable is included.
5. Everything else is excluded and placed in the backlog with its dependency on the MVP recorded.
6. The owner reviews the result against two tests: *Can a real user get the value?* and *Is there anything here they don't need to get it?* — and removes anything that fails the second.

### 5.3 MVP gate

The MVP is defined when: the value hypothesis is stated; the anchor use case is identified; the included set is closed under preconditions; every included use case is marked `MVP: yes`; and the backlog records the excluded set with dependencies. The backlog's existence is itself a control — it removes the pressure to widen the MVP by reassuring stakeholders that excluded use cases are recorded, not lost.

---

## 6. Stage 3 — Data Model Derivation

### 6.1 Derivation rules

The data model is derived mechanically from the PDD, with the owner reviewing each derivation:

1. **Entities** are the nouns that appear in outcome descriptors and that persist beyond a single use case.
2. **States** are the enumerated values outcome descriptors assign to entities; every state named in any outcome (including failure outcomes) is a member of that entity's state enumeration, and the enumeration is closed.
3. **Relationships** are the associations implied by steps ("the actor adds an item to the order").
4. **Side-effect records** (notifications, events, audit entries) named in outcomes become entities or event types.
5. **Ownership** — each entity is assigned the actor that creates it, which later informs module ownership.

### 6.2 The bidirectional trace

The derivation gate is a two-column check:

- **Entity → use case:** every entity, field, state, and relationship traces to at least one use case step or outcome. Anything without a trace is removed.
- **Use case → model:** every outcome descriptor is expressible as a set of state assertions on the model. Any outcome that cannot be so expressed reveals either a missing entity (add and trace it) or a defective outcome (amend the use case).

The owner ratifies the model as PDD-derived artefact `DATA-MODEL.md` declaring its PDD version. This model is the seed of the SPEC.md data model in Workflow Zero, and — because the FMA specification skill requires a code-generatable Contract Surface — the entity/state rigour established here is what makes that section generatable.

---

## 7. Stage 4 — Research and Experience Design

### 7.1 Inputs and participants

The agent, acting as researcher and interaction designer, receives the ratified PDD (with MVP marking) and the derived data model. Its mandate is to design the experience that achieves the **outcomes**, not to implement the feature list. The owner directs and ratifies; the engineer reviews for feasibility. Where a human designer or researcher is available they occupy the agent's role in this stage and the method is unchanged.

### 7.2 Competitive product research

Before designing, the agent researches how comparable products achieve the same or adjacent outcomes. The research is scoped by use case, not by competitor: for each MVP use case, the agent identifies products that deliver an equivalent outcome and records how they do so — flow shape, number of steps, actor burden, where the product asks for input versus infers it, how it handles the failure paths the PDD defines, and what it does that the PDD does not anticipate.

Findings are recorded in a **competitive research record** per use case, with sources, and yield three kinds of output:

- **Pattern candidates** — interaction patterns proven elsewhere that the design may adopt, with the evidence for why they work for this outcome.
- **PDD amendments** — cases where competitor behaviour reveals a missing precondition, step, or failure path in the PDD. These go through the amendment loop (§7.4); they are never absorbed silently into the design.
- **Differentiation notes** — where the PDD's outcome differs deliberately from the market norm, recorded so the design does not regress toward the norm by default.

Two constraints govern this research. First, the agent reports *patterns and behaviours*, not reproductions: no competitor's visual design, copy, or assets are copied into the design or the prototype. Second, competitive research informs the experience of achieving the *owner's* outcomes; it does not add outcomes. A competitor feature with no corresponding use case is at most a backlog candidate proposed to the owner.

### 7.3 User research

Where participants are available, user research is conducted against the use cases: participants are observed attempting the outcomes (using the current prototype, a prior version, a competitor product, or a manual simulation), and findings are recorded per use case. The agent designs the research protocol, produces the observation guide, synthesises findings, and drafts amendments; the owner or engineer conducts sessions or reviews recordings, since participant observation remains a human activity.

Where participants are not available, this step is recorded as skipped for the affected use cases, and the trace matrix (§9.1) carries that as an explicit gap rather than an implicit assumption. Competitive research does not substitute for user research; it substitutes for having no research at all.

Research — competitive or user — produces one of three results for each use case examined:

- **Confirmed** — the use case as written reflects how users achieve the outcome.
- **Amend** — the steps, actors, preconditions, or outcome need to change. The agent drafts an amendment to the PDD.
- **Challenge** — the use case may not be needed, or a missing use case is discovered. Recorded as a proposed addition or removal.

### 7.4 The amendment loop

All amendments return to the owner (P1). The owner ratifies, amends, or rejects each one; ratified amendments bump the PDD version, and the data model trace is re-run for affected use cases. Design proceeds against the ratified version only. This is the mechanism that prevents the prototype drifting from the definition: the definition changes first, in the owner's hands, and the design follows. It applies identically to amendments proposed by an agent and by a human.

### 7.5 Experience flows

Design produces **experience flows**, each explicitly mapped to the use cases it realises and to the competitive patterns it adopts or deliberately departs from. One flow may serve several use cases; one use case may span several flows; but a flow that serves no use case is either superfluous or evidence of a missing use case, and is resolved through the amendment loop before Stage 5. The engineer reviews flows for feasibility against the derived data model — a flow that requires state the model does not hold is either a model amendment or a flow defect, resolved before Stage 5.

### 7.6 Visual design specification

Because no human designer is assumed, the visual layer must be specified explicitly enough that the prototype (Stage 5) and, later, the implementation are generated from it consistently rather than improvised per screen. The agent produces a **visual design specification** covering:

- **Design tokens** — colour palette with semantic roles (surface, text, accent, status), typography scale, spacing scale, radius, elevation, and motion timing.
- **Component inventory** — every component the flows require, with states (default, hover, focus, disabled, loading, error, empty), and the tokens each consumes. The inventory is derived from the flows: a component with no flow is removed.
- **Layout principles** — grid, breakpoints, density, and the rules for how components compose into the screens the flows require.
- **Content rules** — tone, terminology (bound to the PDD glossary so one name per concept holds in the UI), and how outcomes and failures are communicated to the actor.
- **Accessibility baseline** — contrast, focus order, keyboard operation, and screen-reader labelling as non-negotiable requirements, not enhancements.
- **Rationale** — for each major choice, the outcome or research finding it serves. A visual decision with no rationale is a candidate for removal.

The owner ratifies the visual design specification. Once ratified it is a versioned artefact that the prototype declares conformance to, and it becomes an input to Workflow Zero so that the UI modules are built against the same tokens and components the prototype used — closing the gap in which implementation diverges visually from the verified prototype.

---

## 8. Stage 5 — High-Fidelity Prototype

### 8.1 The prototype as executable specification

The prototype is the experience layer's equivalent of FMA's contract tests: an artefact against which conformance can be demonstrated rather than asserted. It is built by the agent from the experience flows and the ratified visual design specification, and covers, at minimum, every MVP use case. The prototype declares the PDD version and the visual specification version it conforms to. The discipline lies in the verification, not the building.

### 8.2 Walkthrough verification

For every MVP use case (and every non-MVP use case the prototype claims to cover), the owner and engineer walk the use case through the prototype — the owner verifying outcomes against the PDD, the engineer verifying that every state the prototype exhibits is a state the data model can hold:

1. Establish the preconditions in the prototype's state.
2. Perform each numbered step as the actor; confirm the system response matches the step.
3. At completion, confirm every clause of the outcome descriptor is demonstrable in the prototype — every entity state, every displayed reference, every declared side effect (or a faithful representation of it).
4. Perform each failure path and confirm its outcome.

Results are recorded in a **walkthrough record** per use case: pass, or the specific step or outcome clause that failed. A failure is resolved either by amending the prototype or by proposing a PDD amendment through the loop — never by reinterpreting the use case to match the prototype.

### 8.3 Stage gate

Every MVP use case has a passing walkthrough record against the current PDD version.

---

## 9. Stage 6 — Handoff to Workflow Zero

### 9.1 The trace matrix

The handoff artefact is a matrix with one row per use case:

| Use case | PDD ver. | MVP | Data model entities | Research (competitive / user) | Experience flow(s) | Visual spec ver. | Prototype walkthrough | Acceptance criteria (SPEC) | Candidate module |
|---|---|---|---|---|---|---|---|---|---|

An empty cell in any MVP row is a blocker, with one exception: the user-research cell may hold an explicit `skipped — no participants` marker (§7.3), which the owner accepts as a known gap rather than an omission. The matrix is generated by an agent and reviewed by the owner and engineer. It is the input to Workflow Zero, replacing the free-form interview: the specification skill draws its answers from the PDD, data model, flows, and walkthrough records rather than eliciting them fresh.

### 9.2 Use cases as acceptance criteria

Each outcome descriptor becomes, with minimal transformation, the acceptance criterion for the ticket or tickets that implement its use case. Because descriptors are state-expressed and bounded (§4.4), the transformation into named test cases is mechanical — the same property that makes FMA contract tests executable.

### 9.3 Use cases inform module decomposition

Use cases cluster naturally by primary actor and by the entities their outcomes mutate. That clustering is a strong first cut at FMA module boundaries: a module is a set of use cases sharing an actor and an entity-ownership set. Cross-cluster interactions — a use case in one cluster whose outcome emits an event consumed by another — are the contract surface. Workflow Zero confirms the decomposition with the owner and engineering lead, but it begins from this derivation rather than from nothing.

### 9.4 Infrastructure-first build order

Ticket assembly and fan-out in Workflow Zero follow a fixed ordering discipline that this paper makes explicit:

**Phase 0 — Substrate and local development environment.** Before any module ticket: repository scaffold, contracts package seeded from the data model, boundary lint, CI, protected paths, model routing, and a **local development environment** in which the whole system can be run and observed by an engineer or agent (containerised services, seeded database, environment validation). Phase 0 is complete when a clean checkout runs green end-to-end with zero modules.

**Phase 1 — Walking skeleton.** The thinnest vertical path through the anchor use case: the minimal UI shell (if the product has a UI), the module or modules the anchor touches, and the contract between them, implemented only far enough that the anchor's happy path is demonstrable in the local environment. This is the first verifiable moment and it arrives as early as the dependency structure allows.

**Phase 2 onward — MVP use cases in precondition order.** Modules are implemented in the order the MVP selection established (§5.2 step 3): each ticket adds a use case whose preconditions are already satisfiable, so the system stays runnable and every increment is verifiable through the UI as soon as it exists. Fan-out parallelism is permitted within a precondition tier, never across one.

**Verifiability rule.** No ticket is assembled whose acceptance criteria cannot be demonstrated in the local environment at the point in the sequence where it lands. If a UI exists, "demonstrated" means through the UI; if not, through the module's declared route surface. This is the ODPD condition that FMA's Workflow A verification loop (typecheck → lint → contract tests → module tests) assumes but does not itself guarantee.

---

## 10. Compensating for Implicit Knowledge

Four recurring failures in product delivery share one cause: knowledge that one role holds implicitly and assumes another role also holds. Designers leave states undetailed and expect developers to infer them from the design system; developers omit affordances no one drew; developers and agents structure screens around the data model because that is what they can see; and visual verification is skipped because nothing forces it. The compensation is the same in each case — **convert implicit into explicit-or-waived, then verify mechanically** — and each has a defined place in the pipeline.

### 10.1 Screen state matrix (Stage 4)

Component-level states (§7.6) are the wrong grain for this failure; the gap is at the screen. Every screen in every experience flow is checked against a **universal state set** — default, loading, empty, partial, one error state per PDD failure path that terminates on that screen, unauthorised, and offline/degraded. The result is a matrix of screens × states in which every cell is either **designed** or **waived with a reason**. The PDD's failure paths seed the error column mechanically; the remaining columns are a fixed checklist the agent exhausts. An undesigned, unwaived cell fails G4, and the Stage 5 walkthrough covers every designed cell, not only the happy path.

### 10.2 Screen archetype library (Stage 4)

An omitted "forgot password" link is not a design omission; it is a **missing use case**. The design agent runs every screen against a **screen archetype library** — authentication, sign-up, form, list, detail, settings, checkout, onboarding, first-run-empty, and others as the library grows — each carrying an **expected-affordance checklist** drawn from convention (password recovery on a sign-in screen; terms and privacy on a sign-up form; bulk actions and empty state on a list; unsaved-changes handling on a form). Each expected affordance is resolved one of three ways: present in the flow; proposed as a **PDD amendment** (a new use case or failure path, ratified by the owner through §7.4); or **waived** with a reason. The library is therefore a generator of proposed use cases, not a style guide — which is why it lives in the amendment loop rather than the design system. It is maintained as a short reference file, not embedded in skill text, so it can grow without bloating the method.

### 10.3 Screens follow use cases; data follows modules (Stage 6)

ODPD designs from use cases, but the risk of entity-shaped workflows re-enters at Workflow Zero, where backend modules are entity-owned and it is natural to build one screen per module. The rule that prevents this: **screens are owned by use cases; data is owned by modules.** A screen composes information across modules through the contracts package — which is what the contracts package exists for — and presents the actor with everything needed to complete the primary purpose in one place, even when that spans several entities. The verification is a **step-count invariant**: the prototype's step count per use case may not exceed the PDD's, and the implementation's may not exceed the prototype's. A step-count increase is a regression, caught by the walkthrough at Stage 5 and by visual QA (§10.4) at implementation.

### 10.4 Visual QA as the fifth verification gate (Stage 6 and FMA Workflow A)

Acceptance criteria go unverified when verification is a separate activity someone remembers to do. It must instead be a mechanical gate. A use case is already a numbered sequence of steps ending in state assertions — that is an end-to-end test awaiting generation: **steps become actions, outcome descriptors become assertions, failure paths become negative tests.** The Stage 5 walkthrough record is the first draft of that test; at Stage 6 it is generated as an executable browser test (Playwright or equivalent) and becomes the **fifth gate** in FMA's Workflow A verification loop, after typecheck, boundary lint, contract tests, and module tests. Because prototype and implementation share the visual specification's tokens and components, screenshot comparison against the prototype's screens is meaningful rather than noisy, and the step-count invariant of §10.3 is asserted by the same suite.

| Failure | Compensation | Where | Gate |
|---|---|---|---|
| Undetailed screen states | Screen state matrix: designed or waived per cell | Stage 4 | G4 |
| Omitted conventional affordances | Archetype library → present, PDD amendment, or waived | Stage 4 | G4 |
| Entity-shaped workflows | Screens owned by use cases; step-count invariant | Stages 5–6 | G5, G6, FMA gate 5 |
| Unverified acceptance criteria | Use-case-generated E2E and visual tests as FMA's fifth gate | Stage 6 → build | FMA gate 5 |

---

## 11. Security

Security fails in generated pipelines when it is a phase. In ODPD it is a property of artefacts that already exist, placed at four points and deliberately proportionate to an MVP:

1. **Abuse cases (Stage 1).** Alongside use cases, the PDD carries **abuse cases** in the same format: the actor is an attacker or a mistaken legitimate user, and the outcome descriptor states what must *not* happen and what the system does instead. The agent proposes abuse cases per screen archetype (credential stuffing and account enumeration on authentication; injection and over-posting on forms; enumeration and authorisation bypass on detail views). The owner ratifies them as it ratifies use cases; they carry `AC-nnn` identifiers and appear in the trace matrix.
2. **Data classification (Stage 3).** Every derived entity and field is classified — public, personal, financial, secret — as a column in the data model. Classification costs nothing at derivation time and drives handling rules (retention, encryption at rest, redaction in logs and metrics) that would otherwise be decided per module, inconsistently.
3. **Authorisation as contract (FMA contracts package).** Every declared route carries a required actor role; contract tests assert that calls without it are refused. Authorisation thereby becomes a mechanically verified surface rather than a per-module convention.
4. **Substrate and review (FMA Phase 0 and federation review).** Secret handling, dependency audit, and secret scanning are part of the Phase 0 substrate and CI; the base module carries an authentication scaffold. Any contract change touching a classified entity or an authentication surface carries a security section in the federation review artefact.

What the method deliberately excludes at MVP is a full threat-modelling stage; for a two-person team the ratio of time to risk reduced is wrong. Abuse cases, route-level authorisation, data classification, and CI scanning cover the majority of failures that reach small teams in practice. Threat modelling is promoted through Workflow B when the product's exposure changes.

---

## 12. Observability and Metrics

Observability is built in from the first ticket, and kept light. The principle: **instrument outcomes, not screens.** Screen and click instrumentation produces volume; outcome instrumentation produces answers.

### 12.1 Derived from the PDD

The PDD already supplies the analytics schema. Every use case has a start, numbered steps, an outcome, and failure paths, so every use case is a funnel: `uc-nnn.started`, `uc-nnn.step.k`, `uc-nnn.completed`, `uc-nnn.failed_at.k`. The value hypothesis from Stage 2 names the **north-star metric**. The agent derives `METRICS.md` mechanically: one north-star metric; one funnel per MVP use case; failure-path counts; and the events that carry them — which are already declared in outcome descriptors, since a rigorous outcome lists its side effects (§4.4). The owner ratifies `METRICS.md` as it ratifies the data model. Classified fields (§11) are excluded from event payloads by rule.

### 12.2 Technical observability

Each module answers `health()` through its manifest (FMA contracts), emits structured logs with a correlation identifier, and reports errors to a single error tracker. That is the whole technical layer at MVP.

### 12.3 Infrastructure proportionate to an MVP

One events table, one error tracker, health endpoints, structured logs. No metrics platform, no tracing backend, no dashboards until a question exists that the events table cannot answer — at which point the upgrade is a Workflow B change with a stated reason. The pre-configuration is in Phase 0 of the build order (§9.4): the events sink, the error tracker, and the logging convention are part of the substrate, so no module ticket can be assembled without them and no module can ship without emitting its use-case funnel events. That is what "knowing what users are doing from day one" costs — a table and a convention — and it is the maximum the method permits before real usage demands more.

---

## 13. Governance and Change Control

- **The owner is the sole ratifier** of PDD amendments, MVP scope, the data model, and the visual design specification. The agent (as researcher and designer) and the engineer propose; the owner decides. The agent never ratifies its own output. This is the product-layer analogue of FMA's human governance gate.
- **Versioning is strict.** Every artefact declares its PDD version. A version bump invalidates traces for affected use cases; work on those use cases pauses until the trace is re-established.
- **Amendments are recorded, not absorbed.** The PDD change log is the audit trail. An amendment that cannot be stated as a change to a use case is not an amendment — it is a design decision internal to Stage 4 and does not touch the PDD.
- **The backlog is a control.** Excluded use cases live in the backlog with their dependencies; MVP scope widens only through an owner-ratified amendment that names the use case and states why the value hypothesis cannot be tested without it.

---

## 14. Verification Gates

| Gate | Checked artefact | Condition | Analogue in FMA |
|---|---|---|---|
| G1 | PDD v1 | Every use case complete; every outcome passes the rigour format | Contract definition |
| G2 | MVP subset | Closed under preconditions; value hypothesis stated; backlog complete | Protected-path review |
| G3 | Data model | Bidirectional trace complete; every entity and field classified (§11) | Contract tests written before fan-out |
| G4 | Research, flows, visual spec | Competitive research recorded per MVP use case; every flow maps to use cases; screen state matrix has no undesigned-unwaived cell; every screen resolved against its archetype checklist; visual spec ratified; all amendments ratified | Federation review artefact |
| G5 | Prototype | Every MVP use case has a passing walkthrough record | Contract conformance |
| G6 | Trace matrix | No empty MVP cells (abuse cases included); Phase 0 defined with events sink, error tracker, and security substrate; build order in precondition sequence; use-case E2E tests generated as FMA gate 5 | CI pipeline |
| G7 | METRICS.md | North-star metric and one funnel per MVP use case derived and ratified; no classified field in any event payload | Contract event schemas |

Gates are checked by agents and ratified by the owner. A gate that fails does not block the stage from continuing its own work; it blocks the handoff to the next stage.

---

## 15. Failure Modes and Mitigations

| # | Failure mode | Description | Mitigation |
|---|---|---|---|
| D1 | Outcome laxity | Descriptors drift back toward "user sees success" under time pressure | Agent enforces rigour format at every use case; G1 is mechanical |
| D2 | Speculative entities | Model gains entities "we'll need later" | Bidirectional trace (G3); anything untraced is removed |
| D3 | Silent design drift | Research findings change the design without changing the PDD | Amendment loop (§7.3); flows must map to ratified use cases (G4) |
| D4 | Prototype as argument | Prototype approved on aesthetics, not walkthrough | G5 requires per-use-case walkthrough records |
| D5 | MVP creep | Use cases added to MVP without a value-hypothesis justification | Backlog with dependencies; scope changes are owner-ratified amendments |
| D6 | Reinterpretation to pass | A failing walkthrough is resolved by reading the use case differently | Rule in §8.2: resolve by prototype change or PDD amendment only |
| D7 | Feature-ordered build | Tickets assembled by product priority; nothing verifiable until late | Phase 0 substrate + local dev; walking skeleton; precondition-ordered fan-out (§9.4) |
| D8 | Batch regression | Agent reverts to batch questioning; owner improvises answers | Skill design: one use case at a time, parking list for gaps |
| D9 | Owner overload | Owner becomes the ratification bottleneck | Batch amendments per research cycle; agent pre-triages by impact; trivial glossary-level changes ratified in bulk |
| D10 | Trace decay | Artefacts fall out of sync after version bumps | Every artefact declares PDD version; agent re-runs affected traces on bump |
| D11 | Derivative design | Agent research regresses the design toward market norms, erasing deliberate differentiation | Differentiation notes recorded in research (§7.2); flows declare adopted and departed-from patterns |
| D12 | Competitor reproduction | Agent copies competitor visuals, copy, or assets into design or prototype | Patterns-not-reproductions constraint (§7.2); owner reviews prototype against the constraint at G5 |
| D13 | Research substitution | Competitive research treated as equivalent to observing users | User-research cell must be explicitly filled or marked skipped; never inferred from competitive findings |
| D14 | Visual improvisation | Prototype and implementation each invent visuals per screen | Ratified visual design specification with tokens and component inventory (§7.6); prototype and UI modules declare conformance |
| D15 | Agent self-ratification | Agent-proposed amendments or designs proceed without owner decision | Structural rule (§13): the agent proposes, only the owner ratifies |

---

## 16. Roles, Agents, and Model Tiering

| Stage | Human role | Agent role | Model tier |
|---|---|---|---|
| 1 | Owner authors and decides | Interrogates, structures, enforces rigour, maintains parking list | Frontier — definition defects are the most amplified in the pipeline |
| 2 | Owner decides scope | Traces preconditions; drafts backlog | Frontier |
| 3 | Owner reviews derivations | Derives model; runs bidirectional trace | Frontier for derivation; any tier for trace checking |
| 4 | Owner directs and ratifies; engineer reviews feasibility | Conducts competitive research; designs and synthesises user research; drafts amendments; designs flows; produces the visual design specification | Frontier — research synthesis, amendment drafting, and design rationale are authorship |
| 5 | Owner and engineer verify by walkthrough | Constructs prototype from flows and visual spec; runs walkthrough checklists | Design tooling for build; any tier for walkthrough recording |
| 6 | Owner and engineer review | Generates trace matrix; derives candidate modules; assembles build order | Frontier — this output seeds Workflow Zero |

The tiering principle is the same as in FMA §8: judgment and authorship at frontier tier; mechanical checking at any tier. ODPD is more frontier-heavy than FMA because almost every stage involves authorship, and because errors here propagate through the entire downstream pipeline. With the agent occupying the designer and researcher roles, Stage 4 in particular is frontier-only: it is the stage with the most judgment and the least mechanical verification.

---

## 17. Harness Integration

ODPD and FMA are packaged together as one suite of modular skills. The mechanism that makes the suite *guide* a user rather than merely exist is a **pipeline state file** (`PIPELINE.md`) at the repository root, recording which artefacts exist, which gates have passed, the PDD and visual-specification versions each artefact traces to, and the operating mode (FMA §9). Every skill declares the artefacts it requires, the artefacts it produces, and the gate it satisfies; it ends by updating the state file and naming the next skill. A router skill, invoked with no arguments, reads the state and tells the user where the project is and what comes next.

| Skill | Stages / workflows | Reads | Produces |
|---|---|---|---|
| router | — | PIPELINE.md | Position and next step |
| product-definition | Stages 1–3 | Owner description | PDD.md (use and abuse cases), MVP.md, DATA-MODEL.md (classified), TRACE.md |
| experience-design | Stage 4 | PDD, data model | RESEARCH.md, FLOWS.md (with state matrix and archetype resolutions), VISUAL-SPEC.md, amendments |
| prototype | Stage 5 | Flows, visual spec | Prototype; walkthrough records |
| workflow-zero | Stage 6 + specification | All of the above | SPEC/ARCH/TICKETS, METRICS.md, trace matrix, build order |
| init | FMA Phase 0 | ARCH, data model, METRICS | Substrate incl. events sink, error tracker, security scaffold |
| new-module | FMA Workflow D | MODULES.md | Module from template |
| module-session | FMA Workflow A | Ticket, module, contracts | Verified module change (five gates) |
| visual-qa | Stage 6 / FMA gate 5 | Use cases, walkthrough records, visual spec | Generated E2E and screenshot tests; step-count assertions |
| federation-review | FMA Workflows B/C | Contract diffs, module reports | Review artefacts, specs, sequencing; security section where required |
| adopt | Brownfield entry | Existing repository | Inventory, reverse-derived use cases, PIPELINE.md with gaps |

For an existing project, **adopt** inventories the repository, maps what exists to the artefact set, reverse-derives use cases from the interface and route surface where no PDD exists, and writes a state file populated with gaps. From there the router behaves identically; the difference between greenfield and brownfield is only the initial state.

The screen archetype library, the universal state set, and the abuse-case patterns are maintained as short reference files read by the experience-design and product-definition skills, not embedded in skill text, so they grow without bloating the method. The harness's `models.yaml` carries `definition` and `design` roles, both frontier-gated, alongside FMA's `spec`, `federation`, `module`, and `escalation` roles.

---

## 18. Open Questions

1. **Granularity of use cases.** How fine should use cases be before they stop being useful to designers and start being tickets in disguise? A working heuristic — one use case per actor-outcome pair — needs testing across product types.
2. **Evidential weight of research.** Competitive research, user research on a prototype, and user research on a shipped product carry different weight, and the paper does not yet say how the owner should weigh conflicting findings — in particular when competitive patterns and observed user behaviour disagree.
7. **Agent design quality.** Agent-produced visual design is consistent by construction but may be generic. Whether the rationale requirement (§7.6) is sufficient to force distinctive, outcome-driven design, or whether the owner needs an explicit aesthetic-direction step, is untested.
3. **Prototype fidelity threshold.** How high must fidelity be for the walkthrough to be meaningful for data-state outcomes that a visual prototype cannot literally exhibit (an event emitted, a record created)? A representation convention is needed.
4. **Owner capacity.** D9 mitigations assume one owner; multi-owner products (platform + vertical) need a ratification split analogous to FMA's open question on multi-orchestrator scaling.
5. **Backlog-to-MVP promotion cadence.** When the MVP ships and the value hypothesis is confirmed, how is the next increment selected — by re-running the Stage 2 procedure with a new hypothesis, or by dependency order from the backlog?
6. **Walking skeleton for UI-less products.** §9.4 assumes a UI or a route surface as the verification surface; batch and pipeline products need an equivalent definition of "demonstrable."

---

## 19. Conclusion

Federated Modular Architecture made agentic implementation safe by converting boundaries into infrastructure and judgment into verifiable specification. It left one failure unguarded: a defective specification is implemented faithfully everywhere. Outcome-Driven Product Definition closes that gap upstream. The owner builds the definition interactively and owns every change to it; outcomes are stated rigorously enough that the data model is derived rather than invented; the MVP is the smallest testable value, closed under its own preconditions; the experience is designed against outcomes and its prototype is verified by walkthrough; and a trace matrix with no empty cells gates the handoff into specification, where infrastructure and the local environment precede every module and every increment is verifiable from the first.

Implicit knowledge is made explicit or waived and verified mechanically; security and observability are properties of the artefacts the method already produces. The method is built for a two-person human team — owner and engineer — with agents as researcher, designer, and implementer. It is slower to a first screen than unstructured agentic building and faster to a correct product, and it is offered on that basis.

Together the two papers and the harness describe a single pipeline: **define → specify → build → govern**, with an executable artefact and a human decision at every boundary.

---

*Prepared for internal review. Companion to "Federated Modular Architecture for Agentic Software Development" (June 2026).*
