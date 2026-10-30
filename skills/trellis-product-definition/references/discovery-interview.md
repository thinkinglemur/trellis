# Discovery interview — owner intent before derivation

Use during Stage 1 and whenever Stage 2 exposes an unresolved MVP tradeoff. This is an
adaptive conversation, not a questionnaire or a replacement for Trellis gates. The agent
organises evidence, exposes choices, and recommends; the owner supplies product intent.

## 1. Recover context, then capture freely

Read PIPELINE.md, existing PDD.md/MVP.md, and root DISCOVERY.md if present. Create the
latter from `${CLAUDE_PLUGIN_ROOT}/templates/DISCOVERY.md` if absent. Preserve existing
entries and approved facts; do not reset the interview on a new session.

Invite the owner's free-form account before presenting options: what happened, who was
involved, what they were trying to accomplish, and what should be different. Let them
finish rather than forcing their account into a decision tree. Ask for a recent real
incident, a current-workflow walkthrough, or a concrete example when the account is
abstract. Preserve meaningful owner phrasing alongside the structured interpretation.
Do not require every owner to have an incident: label illustrative examples as hypothetical.

Extract candidate actors, use cases, desired observable outcomes, constraints, non-goals,
and unresolved choices. These are candidates, not automatically approved requirements.
Reflect the account back and invite correction, additions, rejection, or deferral.

## 2. Separate evidence from choices

For each uncertainty, decide what kind of work resolves it:

- **Discoverable fact:** something checkable in authorised source material, existing code,
  documentation, or observed behaviour. Inspect the relevant source first and record its
  provenance and limits. Do not ask the owner to guess a fact that can be checked. If access
  is unavailable or sources conflict, record that limitation rather than inventing an answer.
- **Owner decision:** desired behaviour, audience, scope, priority, policy, or acceptable
  tradeoff. Evidence informs it but cannot choose the owner's intent. Ask the owner.
- **Assumption:** an unverified working belief. Label it, name how it could be checked, and
  identify what depends on it. Neither repetition nor agent confidence turns it into a fact.

Split mixed questions. For example, inspect whether a provider supports cancellation,
then ask what cancellation outcome the product should promise. Existing implementation
is evidence of current behaviour, not authority for what the product ought to do.

## 3. Choose the next material decision

Maintain a small dependency map of unresolved decisions and their downstream effects.
Resolve prerequisites before dependent questions: actor and intended value before detailed
flow; required outcome before persistence; anchor use case before optional MVP scope.
Choose the earliest material blocker, not every imaginable branch of a speculative tree.

Default to **one decision at a time**, within one use case at a time. Ask a clear,
non-leading question in the owner's language, with enough context to answer. Avoid
"You agree we should do X, right?" or treating a forced yes as understanding. Accept
correction, alternatives, "I don't know", and explicit deferral. If useful, the owner may
choose a small batch of independent questions; label each separately and never batch
questions whose answers change the later questions. This does not permit batch generation
or ratification of use cases.

Ground follow-ups in the account:
- "Walk me through the last time this happened. What did each person do next?"
- "What would be observably different after this succeeds? What must remain unchanged?"
- "Which part is essential to the value, and what is deliberately outside this release?"
- "If we exclude this step, can the intended user still reach that outcome?"
- "Who or what is affected by this choice, including notifications or external writes?"

Explain concrete downstream consequences where they help the owner decide: changed
preconditions, side effects, reversibility, privacy, operational effort, testability, or
MVP usability. If offering options, keep them balanced, include the option to propose
another answer, and state uncertainty. Label advice explicitly as **Recommendation**
with reasons and tradeoffs; record an **Owner answer** only when actually supplied.
Do not put the recommendation into the owner's mouth or interpret silence as acceptance.

Use examples and counterexamples to clarify a material ambiguity, not to exhaust an
infinite space of hypotheticals. Stop exploring a branch when it is sufficiently specified
for rigorous outcomes, explicitly out of scope, or deferred with its consequences recorded.

## 4. Keep a durable decision record

Update DISCOVERY.md at meaningful checkpoints and before pausing. Use the supplied template
and retain enough detail to resume without replaying the conversation:

- **Settled:** the answer or verified fact, its source (owner statement or inspected evidence),
  and scope. A settled interview answer is not a ratified product artefact.
- **Open:** the precise unanswered question, its prerequisites, and affected use cases/gates.
- **Assumptions:** provisional statement, verification method, and dependent work.
- **Deferred:** the owner's explicit deferral, reason, revisit trigger or owner, and exact
  downstream work blocked (or why an explicitly excluded scope has no current blocker).
- **Contradictions:** conflicting statements or evidence, sources, and affected decisions.
  Ask for resolution; never silently overwrite one side or choose whichever is convenient.

For each decision give a stable reference, relevant UC/AC identifiers when assigned,
answer/source, status, dependencies, and downstream consequences. Preserve superseded
answers with the reason for change. Keep recommendations separate from answers. Record
shared-understanding confirmation and artefact ratification separately, with their actual
scope and owner response; never prefill either as granted.

At a pause, save a concise account of what is understood, the current use case/step,
remaining blockers and contradictions, and the next prerequisite-aware question. Update
PIPELINE.md with the actual pending gate state and next action. On resume, read that
record and the current artefact versions; briefly restate the checkpoint, invite corrections,
and continue at the next unresolved decision rather than reinterviewing approved facts.

## 5. Confirm understanding, then derive

Before deriving downstream artefacts from the interview, present a concise synthesis of
actors, desired outcomes, non-goals, material decisions, assumptions, unresolved conflicts,
and deferrals with their consequences. Ask the owner what is wrong or missing and obtain
explicit confirmation of the shared understanding. If a correction changes a prerequisite,
revisit only affected answers and dependencies. No response, a partial answer, or agreement
to continue is not blanket confirmation or G1/G2/G3 ratification.

The interview is ready to hand off when material decisions are settled or explicitly
deferred by the owner, contradictions affecting that handoff are resolved or explicitly
blocked, and assumptions/deferred decisions have named downstream blockers. This is not
permission to derive blocked portions or pass a gate with missing required evidence.
Unblocked work may continue within the confirmed scope; otherwise pause for the owner.

The agent still derives every step against the full failure taxonomy and proposes abuse
cases. Do not ask the owner to enumerate all failures, replace taxonomy coverage with
incident anecdotes, or treat a deferred decision as a failure-class waiver. Present
product-intent choices uncovered by derivation through this interview loop. Only the owner
waives failure classes; unresolved cells still fail G1. G1 and G2 still require explicit
owner ratification in every mode, and this skill's G3 owner gate remains unchanged.

## 6. Apply to MVP tradeoffs and later changes

When Stage 2 reveals uncertainty about the value hypothesis, anchor use case, prerequisite
closure, one-step usability, or exclusions, reopen the relevant discovery decision. Ask
about the intended user value and observable signal before recommending cuts. Record
backlog/dependency consequences and obtain confirmation of the revised understanding before
propagating it into MVP.md. If an answer changes the PDD, apply the PDD amendment/version
and affected-trace rules; a scope discussion cannot silently amend an approved outcome.

For later changes, start from the approved baseline and the requested delta. Reinterview
only changed decisions and their dependency closure, preserving unaffected approved facts
and their provenance. Identify affected artefacts, traces, and gates; seek the required
owner decisions again for those changes, not a blanket reapproval of the entire product.

## Inspiration and provenance

Inspired by the decision-tree interviewing approach in
[mattpocock/skills — grilling](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling).
This is original Trellis-native guidance, adapted to its evidence, derivation, persistence,
and owner-gate rules. It does not import, execute, or require that external skill.
