---
name: trellis-factory
description: >
  Execute an approved Trellis ticket through bounded specialists and explicit feedback loops.
  Use for factory, unattended engineering, independent verification, repair, integration or recovery.
  Routes implementation to existing module skills; requires evidence, authority and harness checks.
---

# Trellis — Software factory

Read `../trellis/references/protocol.md` first and `references/loops.md` before dispatch.
**Requires:** approved ticket/acceptance, applicable specification and verification prerequisites,
explicit action/usage limits, and a known executor. **Produces:** WORK-PACKET.md and RUN.md
(from the templates), version-bound evidence and a ready-for-decision result, not automatic release.

This is an operating method, NOT an installed scheduler, sandbox or durable queue. Discover harness
capabilities first. If durable claims/restart reconciliation are unavailable, offer an explicitly
supervised run or block unattended execution; never claim recovery has been demonstrated by prose.

## 1. Prepare
- Preserve ticket identity/revision and approved outcomes. Reuse established intent. For disputed or
  missing product decisions use product-definition's discovery interview on the affected delta;
  do not restart whole-product discovery for routine maintenance.
- Map applicable acceptance/failure tests, current code revision, owned/protected paths, dependencies,
  tools/data access, timeout/retry/usage limits and authority into WORK-PACKET.md. Missing limits or
  required authority block dispatch. Existing contracts and relevant gate evidence must hold.
- Check actual harness/model/tool availability. Never silently invent profiles or bypass missing
  capabilities. No mandated vendor, permanent fleet or stack rewrite.

## 2. Assign responsibilities
- **Coordinator/specifier:** prepares the packet, resolves ambiguity, owns durable handoffs and shared
  state. May combine these responsibilities for small work; never invent owner decisions.
- **Implementer:** uses trellis-module-session, or trellis-module-coordinator for disjoint-file waves.
  Reports defects in the spec; cannot silently change acceptance, contracts or verification policy.
- **Independent verifier:** fresh review context, checks actual code/evidence against acceptance and
  relevant negative paths. A worker's self-report is not verification. If independent review is
  unavailable, record awaiting-review, not verified. Roles need not use distinct model vendors.
- **Integrator:** validates combined work against the current base and assembles the result packet.
  Optional security/browser/adversarial specialists are chosen by affected risks, not by agent count.

One authoritative ticket source owns acceptance. An execution queue owns attempts/claims; Markdown
records are projections or single-writer artefacts. Workers emit reports to the coordinator, never
concurrently overwrite PIPELINE.md. Worktrees reduce collisions; they are not security isolation.

## 3. Execute and correct
- Use the named loops in references/loops.md. Test-first on small vertical increments; cost-ordered
  gates remain enforced. Delegate using existing file-owned briefs; no arbitrary nested fan-out.
- Track attempt/claim, actual model and exact code/spec/test revision. A newer diff invalidates
  affected evidence. Missing/skipped required checks, scope violations or unapproved weakening block.
- Reviewer findings return to bounded repair; changed intent/contracts go to the appropriate human
  authority/federation review instead. Exhausted budgets, uncertain effects and absent evidence stop.

## 4. Integrate and hand off
Run relevant checks on the integrated revision, not only individual branches. Record covered and
uncovered acceptance, exact commands/results and artifact paths, pending decisions and usage (unknown
is not zero). `verified` means evidence-backed local acceptance; it is NOT merged, deployed or released.
Those actions need separate explicit authority or a pre-approved bounded policy. Fast-mode review
debt does not grant new tool, spending, data-access or release permissions.

## 5. Observe and improve
After an authorised release, compare operational/user outcomes with the approved objective. Route
failures to investigation; don't infer cause or create new scope from telemetry alone. Repeated
failures may propose versioned skill/test/routing changes evaluated on representative regressions.
Never silently rewrite the rules judging the current run. Update RUN.md and the coordinator's
PIPELINE.md summary; complete the authoritative ticket only under its actual acceptance policy.
