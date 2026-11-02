# Proposal 0001 — Change-scoped engineering and unattended execution

Status: **proposed — not adopted or implemented**  
Date: 2026-10-29  
Scope: refine Trellis's method and acceptance policy; integrate with an existing execution harness rather than build another agent platform.

## Summary

Trellis already provides the useful engineering core: acceptance tickets versus file-owned execution tasks, bounded module sessions, contracts-first integration, cost-ordered gates, shell-owned experience, adversarial testing and human architectural authority.

Extend it with a **profile-aware, change-scoped evidence layer** so an existing product's maintenance does not restart a business launch. Add a narrow **execution-adapter contract** so an unattended team can run this method durably without pretending that Markdown skills are a scheduler or a security boundary.

Preserve the full ODPD + ODG + FMA lifecycle. The proposal is selective applicability and stronger enforcement, not a replacement methodology or permission to bypass decisions.

## 1. Proposed workflow profiles

These names are new proposals, not existing operating modes. Keep `governed`/`fast` separate from workflow profile and change type.

### Product launch

Use the complete definition, MVP, design/prototype, audience/validation, specification, build, launch and learning tracks. Retain owner decisions on outcomes, thresholds and build/pivot/stop.

### Internal/existing product

Adopt once. Recognise existing equivalent artefacts and ratified decisions; record present/partial/missing evidence. Use the internal playbook's sponsor/user-group commitment model rather than impose generic public acquisition requirements. Revisit affected outcomes and evidence when scope changes, not on every ticket.

### Engineering change

Inherit approved product intent and contracts. Record the change's outcome, scope/non-goals, permitted side effects, acceptance tests, relevant failure/abuse paths, affected interfaces and operational/release evidence.

- **Bug:** reproduction, intended behaviour and failing regression test. Escalate disputed/missing intent instead of inventing it.
- **Feature:** approve the outcome/scope delta; perform affected data/design/experience checks. Reopen value validation where genuinely uncertain.
- **Security:** refusal and response tests, classification and permissions; appropriate contract/risk authority. No demand experiment required for a repair.
- **Contract:** compatibility, consumers, migration, transitions and permission changes through Workflow B before dependent implementation.

Each gate gets one explicit assessment: `required`, `satisfied-by-existing-evidence`, `not-applicable` with reason, or `needs-decision`. Preserve `pending`/`passed` for applicable execution gates. A non-applicable requirement is not a passed test or a risk waiver. Waivers retain their existing authority.

Use actual verification surfaces: browser for UI; API, CLI or batch-output checks where appropriate. A separate prototype is warranted by experience uncertainty, not by the mere existence of a maintenance ticket.

### Routing changes required

- Teach adoption, router and pipeline the same applicability/inherited-evidence rules. Today adoption sets every gate pending while routing universally treats A4 as blocking G6.
- Make playbook-specific predicates drive audience/validation checklists, rather than leave internal/enterprise mappings as prose beneath generic acquisition rules.
- Separate A3 test preparation/preregistration from the A4 build/pivot/stop decision; avoid circular audience → validation prerequisites.
- Align G3 logical invariant requirements with G6 physical enforcement evidence; current stages distribute that work inconsistently.
- Define proposed pre-build offers versus claims of shipped/proven capability. Discovery cannot require production E2E evidence before software exists; release claims do require appropriate demonstrated evidence.
- Diagnose missing instrumentation, sample or observation window before classifying insufficient data as a reach/channel failure.

## 2. Make authority unambiguous

Consolidate the never-auto decisions across the shared protocol, individual skills and papers. Distinguish agent-prepared, auto-provisional, human-approved and mechanically-verified records.

Governed execution already permits disjoint-file parallelism. Unattended execution means continuation within an approved envelope; it does **not** require fast mode or confer new permissions.

Fast-mode review debt must not auto-authorise production deploys, merges, migrations, spending, external messages or broader data access. Consequential actions require explicit authority or an already-approved bounded policy. Name the actual human decision-maker; do not fabricate a second human ratifier when one person holds both owner and engineer roles.

## 3. Machine-readable work and evidence contracts

Retain readable skills/specifications, but validate ticket/task/attempt packets with a schema. Minimum fields:

- authoritative ticket ID/revision and acceptance/outcome IDs;
- specification/contract versions and base Git revision;
- owned/protected files, dependencies and permitted tools/data;
- assigned executor and actual model/provider;
- runtime, retry and usage/spend policy references;
- attempt ID, claim ownership token and handoff state;
- diff/artifact references and exact verification commands/results;
- pending decisions and classified failure/recovery information.

A worker's `green` report is a claim. Acceptance must check actual changed paths, exact tested code revision, required-test coverage/execution, prohibited weakening, artifact availability and independent review. Evidence from a previous commit cannot accept a newer diff. Revalidate integrated results against the current base; independently green branches do not prove a green merge.

An existing issue tracker may own acceptance tickets; an execution harness owns child tasks, attempts and claims. `TICKETS.md`, `TASKS.md` and `PIPELINE.md` must have explicit ownership or be projections, not competing authoritative queues. Concurrent workers should emit structured results to one coordinator/writer or a transactional adapter, not overwrite shared pipeline Markdown independently.

## 4. Execution adapter, not a new orchestration platform

Specify a small harness-neutral interface for submit, claim, status, heartbeat, cancellation, review handoff and result acceptance. A first adapter can target an existing durable queue; executor adapters can invoke different coding agents using the same brief/result contract.

Required semantics:

- atomic claim, bounded lease and attempt ownership;
- deduplicated submission and bounded retry/runtime;
- durable progress/artifact handoff and restart reconciliation;
- stale attempts unable to complete a reclaimed/superseded run;
- explicit cancellation/orphan-process handling;
- independent verification/review and integration acceptance;
- safe retry versus reconciliation of uncertain external effects;
- complete usage provenance across retries, reviewers and child calls.

Validate installed harness capabilities and model availability rather than assume current documentation or example `models.yaml` entries work. Missing capability must fail closed, not silently bypass a gate. Role names do not require a new permanent service/profile for every role.

Use isolated branches/worktrees for independent changes and file-owned tasks inside a coordinated slice. Worktrees reduce collisions; they are not a security sandbox for same-UID workers. Supply least-privilege inputs, keep production credentials out of routine workers, and enforce/check protected paths.

## 5. Close enforcement gaps before unattended dispatch

These are source-reading observations, not claims from executing the templates:

1. **Fail-open security CI.** `templates/ci/trellis-ci.yml` ends the audit/secret-scan chain with `|| true`. This masks tool and finding failures; “first week” has no executable expiry. Separate required checks; make any baseline exception narrow, approved and expiring.
2. **Declared role is not enforced authorisation.** `templates/contracts-package/src/testing.ts` checks that `requires` is truthy. Supply a host-adapter harness exercising actual anonymous/wrong-role/wrong-owner requests, asserting refusal and absence of side effects.
3. **Advisory scope is not a hard boundary.** Per-module instructions and the TS/TSX import lint template do not enforce filesystem ownership or cover arbitrary stacks. Add runner write restrictions where available, exact diff-path checks, stack-specific dependency rules and protection of tests/CI/policy.
4. **CODEOWNERS is not branch protection.** Require verification of effective review/protection configuration and bind consequential approval to the exact action/revision.
5. **Coverage must include executed tests.** The generated `check-coverage` command needs a tested implementation. A manifest pointing to missing, skipped or vacuous tests cannot accept a ticket. Protect mappings/waivers from worker modification.
6. **Behaviour, not self-comparison.** A manifest importing the current contract-version constant does not independently demonstrate compatibility. Pin and test real adapter conformance. Transition guards alone do not prove handlers invoke them or preserve state transactionally under concurrency.
7. **Scaffold-ready is not feature-accepted.** Supply a checked-in runnable fixture and clean-checkout smoke verification. Generated observability, redaction and fault-injection substrate needs its own evidence; fault injection must be unavailable in production.
8. **Versioned evolution, not opportunistic weakening.** Preserve add-only adversarial findings and prohibit weakening to reach green. Define how superseded assertions are retired under an approved contract version without making legitimate Workflow B evolution impossible.

Suggested order: authority/applicability and fail-open enforcement fixes → behavioural/coverage evidence → durable unattended adapter/pilot. Do not make unsafe work persistent and call that reliability.

## 6. Bounded pilot and acceptance

One small, already-authorised change in an existing project, preserving its stack. Begin with synthetic fixtures/read-only sources and one ticket; use two parallel implementers only if file ownership genuinely separates. Independent verification follows. No automatic merge/deploy is assumed.

Target outcome:

> An approved scoped ticket proceeds through bounded implementation, survives interruption, and returns an independently verified, ready-to-review result without the owner reconstructing lost context.

Demonstrate:

- ticket → outcome/spec → required tests → exact code/artifact trace;
- out-of-scope writes rejected or detected before acceptance;
- missing/failing/skipped required tests block completion;
- worker interruption/reclaim and stale completion rejection;
- review rejection/repair plus restart-safe handoff;
- integrated result exercised in the real target environment;
- honest status, handoff and usage evidence; unknown usage is not zero;
- bounded retries and no replay of uncertain consequential effects.

Set operational/spend limits before recurring autonomous work. Expand only after measured recovery, verification and owner-attention outcomes—not agent count or PR volume—justify it.

## Sources and adoption boundary

Primary references: FMA §§2–6, 8–9; ODPD gate/traceability/invariant sections; ODG validation/internal playbook/learning sections; shared skill protocol; coordinator dispatch/module-session/adopt/workflow-zero/federation-review/adversarial/visual-QA skills; supplied templates.

This proposal does not change any existing gate, skill, permission, template or operating mode. Adoption requires review and scoped implementation with executable evidence. It deliberately avoids framework installation, a stack rewrite, a new control plane or unattended execution being implied by a documentation merge.
