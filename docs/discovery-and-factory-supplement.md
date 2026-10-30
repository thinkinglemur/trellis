# Discovery and factory delivery supplement (0.6)

This supplement extends ODPD's interactive definition and FMA's ticket/task dispatch workflows.
The papers remain the architectural basis; these skill-level refinements are normative for the
0.6 delivery method. The wider proposal is not wholly implemented.

## ODPD discovery

Before formal use-case derivation, use the product-definition discovery-interview reference to
explore material intent, constraints and dependent decisions. Keep owner wording distinct from agent
interpretation; research facts rather than solicit guesses. Persist a decision tree and confirmed
understanding in DISCOVERY.md. Confirmation is not G1/G2/G3 ratification. Failure paths still derive
from Trellis's taxonomy; the interview does not transfer that analysis burden to the owner.

## FMA delivery

The factory skill wraps existing module-session/coordinator workflows. Specification, implementation,
independent verification and integration are responsibilities with distinct inputs and authority,
not a mandatory collection of resident agents. Verification accepts exact integrated revisions and
relevant failure paths, never worker self-report alone. Bounded repair cannot weaken policy or invent
product decisions. Operational feedback requires an authorised release; factory improvement proposes
versioned, evaluated changes rather than self-modifying its own acceptance rules.

## Authority and recovery

Governed execution can parallelise. Fast-mode review queues do not confer external-action permissions.
G1/G2/G3 owner ratification and explicit owner-only skill decisions remain human decisions. Missing
authority, capability, required evidence, uncertain effects and exhausted limits stop factory runs.
Only the coordinator writes shared pipeline records during concurrency. Durable claims, cancellation,
reconciliation and stale-result rejection must come from an actual checked execution adapter.

## Delivered versus future

Delivered: interview and factory skill instructions, router/protocol integration, record templates,
feedback/recovery contracts and structural/package verification.
Not delivered: a runtime engine, behavioural sandbox, executable acceptance/schema validator,
profile-aware gate router, security-template fixes, or an executed unattended recovery reference app.
The pilot scenarios in the factory reference are acceptance requirements for future adapters, not
claims of tests already passed. Existing projects need not rewrite their stack or restart discovery
for every change; affected gates still require their existing evidence/authority until profile-aware
routing is implemented.
