# Outcome-Driven Growth

**Audience, validation, launch, telemetry, and the learning loop — the method by which a Trellis product becomes a business**

*Draft for review — October 2026 · Third companion paper to "Federated Modular Architecture for Agentic Software Development" and "Outcome-Driven Product Definition"*

---

## Executive Summary

The first two Trellis papers describe how a two-person human team and a set of agents define a product rigorously and build it correctly. Neither says how anyone comes to use it, whether anyone wanted it, or how the team learns what to do next. A method whose purpose is a successful business cannot stop at a correct product.

This paper defines **Outcome-Driven Growth (ODG)**: a second track that runs alongside the product pipeline from its first day, with its own artefacts, gates, and owner, so that audience, demand evidence, launch readiness, and learning are produced by the same discipline that produces the product — derived from the Product Definition Document, pre-registered before they are measured, ratified by the owner, and traced.

Four failures motivate it. Products wait too long to build an audience, because audience work has no artefact and no gate until launch and therefore loses to work that does. Products are built without demand evidence, because "do people want this?" is answered by enthusiasm rather than by behaviour. Telemetry is bolted on after launch, so the first weeks of real usage — the most informative the product will ever have — are unobserved. And no mechanism turns what is learned into what is built next, so the loop that would make a business out of a product never closes.

ODG answers each structurally. The **audience track** starts at Stage 1 with gates A1–A3 — rooms chosen and participation begun, an owned list, a first conversion test — and supplies the research participants, validation sample, launch list, and first customers that every later stage needs. The **validation gate** (A4) requires behavioural evidence on a ladder from attention to payment, against thresholds the owner pre-registers before the test runs, and makes "build without evidence" a recorded decision rather than a default. The **launch gate** (A5) requires that every claim traces to a tested outcome, that onboarding is verified, and that telemetry and feedback are live before the first user arrives. **Telemetry** extends the events table the product already has with activation, retention, revenue, and referral, and attaches every piece of qualitative feedback to the use case it concerns so that feedback becomes a proposed amendment rather than a pile. The **learning loop** reads the north-star metric against the value hypothesis on a weekly cadence and feeds the result back into Stage 2, turning define → specify → build → govern into a cycle.

Everything in ODG derives from artefacts the method already produces. Positioning is the value hypothesis restated outward; the ideal customer profile is the PDD's actors; messaging is the outcome descriptors, which are true by construction because the end-to-end suite proves them; activation is completion of the anchor use case. The paper adds artefacts, not sources. As with the companion papers, agents perform the researcher, marketer, and analyst roles under the owner's direction, and the owner ratifies every decision.

---

## 1. Problem Statement

### 1.1 A correct product is not a business

The companion papers close the gap between what was defined and what was built. They leave open the gaps between what was built and what was wanted, between what was wanted and who was reached, and between what was learned and what is built next. Each gap has a characteristic failure.

1. **Audience starts too late.** Audience building has the longest lead time of any activity in the pipeline — months to become useful — and the least structure. It has no artefact, no gate, and usually no named owner until launch approaches, at which point it is a sprint with nothing to sprint from. The products that fail for lack of distribution rarely lacked a distribution plan; they lacked an audience when the plan was executed.

2. **Build without demand evidence.** The decision to build is the most expensive decision the team makes and is routinely taken on the weakest evidence available: what people say in interviews, the team's conviction, and investor enthusiasm. The literature is unambiguous that stated interest is a poor predictor of behaviour and that evidence strengthens monotonically with what the prospect gives up to obtain the outcome — attention, an email address, time, money. Few teams pre-commit to a threshold, so whatever evidence arrives is read as "encouraging."

3. **Telemetry as afterthought.** Analytics are typically added after launch, from a vendor's default event set, and answer the vendor's questions rather than the product's. The first cohort of real users — the most informative the product will ever have, because it has no habits yet — passes unobserved. Qualitative feedback arrives through support and social channels into a pile with no defined destination.

4. **No learning mechanism.** The value hypothesis that justified the MVP is never formally revisited. Features are added by opinion, roadmap pressure, or the loudest customer. ODPD's open question — how the next increment is selected once the MVP ships — is the question most products never answer.

### 1.2 Why the method is the right place

Each failure is structural: an activity with no artefact, no gate, and no owner loses to activities that have them. The Trellis method already supplies artefacts, gates, and owners for definition and build. Extending it to growth means giving audience, validation, launch, and learning the same three things. It does not mean the method becomes a marketing platform: ODG owns the gates and the derived artefacts; the execution tooling of marketing — scheduling, content production at volume, advertising operations — stays outside, as design tools and CI vendors stay outside FMA.

### 1.3 The intended team, again

ODG assumes the same two-person human team: an owner and an engineer. There is no marketer, analyst, or growth hire. Agents perform competitive and channel research, draft positioning and messaging, build landing pages and instruments, generate dashboards, synthesise feedback, and prepare the weekly learning record. The owner directs, participates personally in the audience track — because founder-led presence is the channel for a team this size — and ratifies every decision. The engineer owns telemetry correctness and the launch substrate.

---

## 2. Design Principles

**P1 — Growth is a track, not a phase.** Audience, validation, launch, and learning run in parallel with definition and build from Stage 1, with their own gates, so they cannot be deferred by default.

**P2 — Derive from the PDD.** Every growth artefact is derived from the Product Definition Document, the MVP, and the data model: positioning from the value hypothesis, ICP from actors, messaging from outcomes, metrics from use cases. ODG adds artefacts, never sources.

**P3 — Behaviour over statements.** Demand evidence is what prospects do, ordered by what they give up: attention, contact, time, money. Statements of interest are research input, not evidence.

**P4 — Pre-register, then measure.** Every test states its hypothesis, threshold, sample, and duration before it runs, and the owner ratifies them. Results are read against the pre-registered threshold only.

**P5 — Claims trace to outcomes.** Nothing is said about the product — on a landing page, in onboarding, in outreach — that does not trace to an outcome descriptor the end-to-end suite proves. The product's truthfulness is a property of the method, not of the copywriter.

**P6 — Instrument outcomes, not screens.** Telemetry is derived from use cases and the value hypothesis, lives on the events table the product already has, and is proportionate to an MVP: one table, one dashboard, one alerting metric.

**P7 — Feedback has a destination.** Every piece of qualitative feedback is attached to a use case and becomes a proposed amendment through the existing loop, or is recorded as rejected with a reason.

**P8 — The loop closes at Stage 2.** Learning produces a confirmed, refuted, or refined value hypothesis, and the next increment is selected by re-running MVP selection against it. Stop is a legitimate result.

**P9 — Humans own and decide; agents research and draft.** As in the companion papers: the agent's role at every judgment point is to make the owner's decision well-informed — benchmarks found, options laid out, consequences stated — never to make it. Two additions here: the owner's personal participation in the audience track is not delegable, because the founder is the channel; and where evidence conflicts, the agent presents the conflict rather than resolving it.

---

## 3. The Two-Track Pipeline

```
product   define ─────── validate ── specify ── build ──────── launch ── learn ──┐
          G1 G2 G3  G4 G5    │       G6 G7     Phase 0 … E      │         L       │
                             │                                   │                │
audience  A1 ── A2 ── A3 ── A4 ───────────────────────────────── A5 ──────────────┤
          rooms  list  first  demand                              launch           │
          chosen exists test  evidence                            ready            │
                                                                                   └──► new hypothesis → Stage 2
```

| Gate | Track | Condition | Depends on |
|---|---|---|---|
| A1 | Audience | Actors mapped to rooms; one founder channel and two or three communities chosen; participation begun as research; CHANNELS.md v1 | G1 (actors exist) |
| A2 | Audience | An owned list exists (newsletter or waitlist); tagged source links in use; validation events flowing to the events table | A1 |
| A3 | Audience | First level-2 test run against a pre-registered threshold; CHANNELS.md carries evidence per channel | A2, G2 (value hypothesis) |
| A4 | Validation | Demand evidence at the pre-committed ladder level (or ICP equivalent), or an owner override with recorded reason | A3; G5 for level-4/5 tests that need a prototype |
| A5 | Launch | Claims traced to outcomes; onboarding verified; telemetry and feedback live; support path exists; list at pre-registered size | A4, G6, build complete |
| L | Learning | First weekly learn session held after launch; hypothesis status recorded; next increment selected or stop recorded | A5 |

The product track cannot pass G6 — the handoff into specification and build — until A4 is passed or overridden. That single dependency is the mechanism that makes "do people want this?" a decision rather than an assumption. The audience track cannot pass A1 until G1, because the actors it maps come from the PDD; it is otherwise independent and runs continuously.

The router (companion paper, ODPD §18) reports both tracks. A project at G3 with A1 still pending is behind, and the router says so.

---

## 4. Derivation — What Growth Inherits From Definition

The PDD, MVP, and data model already contain most of what growth needs. The derivations are mechanical and are performed by agents; the owner ratifies the results.

| Growth artefact | Derived from | Rule |
|---|---|---|
| **Positioning** (one sentence) | Value hypothesis (MVP.md) | "If *actor* can *outcome*, then *signal*" → "For *actor* who needs *outcome*, *product* does *X*." No new claims. |
| **Ideal customer profile** | PDD actors | One profile per human actor, with the preconditions that make them eligible (from use cases) and the outcome they seek. Segments are not invented. |
| **Messaging** | Outcome descriptors | Each outcome is one benefit claim. The set of claims the product may make is a filter over outcomes: only those with a passing end-to-end test. |
| **Trust messaging** | Abuse cases, data classification | Concrete statements of what the product refuses and protects, each traceable to an AC-nnn or a classified field. |
| **Activation metric** | Anchor use case | First completion of the anchor use case by a new actor. Already the first funnel in METRICS.md. |
| **Retention metric** | Anchor use case | Repeat completion by weekly cohort. |
| **Onboarding** | First-run archetype, anchor use case | The shortest path from signup to the anchor outcome; step count bounded by the PDD. |
| **Launch scope** | MVP.md | What is launched is the MVP; the backlog is the roadmap narrative. |
| **Channel hypotheses** | Actors | Per actor: where they already congregate, and who on the team can already participate there credibly. |

The consequence of P5 is worth stating plainly: a claim that cannot be traced to an outcome descriptor is not permitted on any surface. If the owner wants to make a claim, the route is a use case, an outcome, and a test — not copy.

---

## 5. The Audience Track (A1–A3)

### 5.1 Why it starts at Stage 1

Audience lead time is months; demand tests take weeks; the build decision comes after both. Any sequencing that starts audience work after definition guarantees that the first demand test is run against no audience, which is the most common reason validation is skipped — there is no one to test on. Starting at Stage 1 also makes the audience the source of Stage 4's research participants, which otherwise have to be recruited from nowhere.

### 5.2 Mapping actors to rooms

For each human actor in the PDD, the agent researches and the owner confirms:

- **Rooms** — the specific communities where the actor already discusses the problem: subreddits, Discord and Slack servers, professional groups, forums, newsletters, podcasts. The question is not "which platform" but "which room," because distribution for small teams happens inside high-context communities rather than on mass feeds.
- **Founder channel** — the one public channel on which the owner will be personally present, chosen by where the actor is, not by the owner's preference. Founder-led content consistently outperforms company-page content; the company page is nearly irrelevant for a team of two.
- **Owned channel** — a newsletter or waitlist. The owned list is the only audience asset that survives an algorithm change and is the sample for every later test.
- **Credibility** — honest assessment of whether either human can already participate in each room credibly. If the actors are people neither can reach warmly, that is a finding for the PDD, not a marketing problem.

The result is `CHANNELS.md` v1: per actor, the rooms, the founder channel, the owned channel, and a hypothesis per channel in XYZ form (§6.3), each with its tagged source link.

### 5.3 Participation rules

Participation during the audience track is research, not promotion. The owner and agent answer questions the actor asks, in the actor's rooms, better than anyone else there; the agent drafts, the owner posts under their own name. Nearly every worthwhile community prohibits launches and self-promotion, so the account that will eventually post a validation test must have been useful in the room for months beforehand. The participation record — questions answered, themes observed — is itself input to Stage 4's research, and recurring questions are candidate use cases.

### 5.4 Social channels in 2026

Four properties of the current landscape shape how social is used:

- Reach is algorithmic and personal; the founder's account is the channel.
- Trust has moved to rooms; broadcast feeds produce attention, rooms produce customers.
- Social is search; content that answers the actor's question outlasts content that announces a product.
- AI answer engines are a channel; being the cited source for a problem is the equivalent of ranking first.

Social activity has one role in the validation stage: top of funnel for a tagged landing-page test. Likes, follows, and comments sit below level 1 of the ladder; they measure attention to the founder, not demand for the outcome. A post that produces 40,000 views and twelve sign-ups is a negative result for that channel.

### 5.5 Cold start — when nobody knows you

Validation does not require an audience. It requires a few hundred of the right people once, and ten paying customers for the strongest test. For a team with no audience the routes are borrowed, and each per-ICP playbook (§14) carries the applicable set:

| Route | What it buys | Indicative cost / lead time | Ladder levels served |
|---|---|---|---|
| Paid controlled sample | A few hundred ICP-targeted visits to a landing page on demand | £500–1,500; two weeks | 2–3 (read as a floor) |
| Direct outreach | 100 personalised messages → 10–20 replies → 5–8 conversations → 2–3 pilots or design partners | Owner's time; two to four weeks | 3–5 (B2B) |
| Borrowed rooms | Credibility through usefulness; research by another name | 6–12 weeks to become useful | 1–2, and research |
| Rented audiences | A sponsored slot in a vertical newsletter, podcast, or creator channel | £200–2,000 per placement | 2–3 |
| Pre-aggregated marketplaces | Product Hunt, app and plugin marketplaces, developer registries | Launch timing | 2–4 |
| Concierge | Deliver the outcome by hand to ten people and charge them | Owner's time; no reach required | 5 |

The sequence for a team with no audience and a six-week validation window: outreach and a paid sample in weeks one and two for a first read; room participation begun at Stage 1 so it is useful by the launch test; concierge if the first read is ambiguous. The validation budget — one to three thousand pounds — is a rounding error against the cost of a build and is stated explicitly in VALIDATION.md.

Compliance is a constraint on outreach, not a footnote: business-to-business outreach under UK and EU rules is defensible on legitimate-interest grounds with an opt-out; consumer cold email is not. The per-ICP playbook says which applies.

### 5.6 Gate A3

The first level-2 test has run against a pre-registered threshold on at least one channel, and `CHANNELS.md` records evidence rather than hypotheses for every channel attempted. The result need not be positive to pass A3 — A3 is a gate on having run the test properly, not on the outcome. The outcome is A4's concern.

---

## 6. Validation (A4)

### 6.1 The question

Stage 5's walkthrough answers "does it work the way we defined?" Validation answers "does anyone want the outcome enough to act?" They are different questions, the second is cheaper, and it must be answered before the build is committed.

### 6.2 The evidence ladder

Evidence strengthens with what the prospect gives up. The ladder, from weakest to strongest pre-build evidence:

| Level | Signal | What it proves | Strength |
|---|---|---|---|
| 1 | Click-through from a post or ad to a landing page | The message attracts attention | Weak |
| 2 | Email address on the landing page | Interest worth an inbox | Moderate |
| 3 | Waitlist with qualifying questions answered; a scheduled call kept; a referral made to advance in a queue | Willingness to spend time | Moderate–strong |
| 4 | Pre-order, deposit, or card on file (refundable); for enterprise, a signed letter of intent or a paid pilot agreement; for developers, an installation against a working stub | Willingness to pay before the product exists | Strong |
| 5 | Payment for a concierge version of the outcome delivered by hand | Willingness to pay for the outcome itself | Strongest |

Levels 1 and 2 are cheap enough to be gamed by curiosity, and the consumer attention market is far more saturated than in the era of the famous waitlist launches. The method's default pre-commitment for anything the product will charge for is **level 4**; the owner may set it lower with a recorded reason.

### 6.3 Pre-registration

Every test is written before it runs, in the form *at least X% of Y will Z within D*, where Y is a defined sample from a defined channel, Z is a ladder action, and D is a duration. The owner ratifies X, the sample size, and D. Results are read against X only. "Encouraging" is not a result. The agent prepares the test and the instruments; it never sets or adjusts the threshold.

**Thresholds are set per project; there are no defaults.** A threshold fixed before the project is understood is the pre-registration failure moved upstream. X is derived in a research step that precedes every test:

1. The agent researches **published benchmarks** for the specific combination of ICP, channel, and ladder action — conversion rates for comparable products and audiences — and presents them with sources, sample context, and a confidence note. A benchmark from a different ICP or channel is reported as such, not silently applied.
2. The agent derives the **economic floor**: the conversion at which the business is viable given the pre-order price or expected plan price, the cost of the channel, and the sample size the budget can buy. This is arithmetic from VALIDATION.md's budget and the positioning's price, not opinion.
3. The owner sets X against both, and records the derivation — benchmark cited, economic floor, and the reasoning for the number chosen — next to the threshold. Where no benchmark exists, the threshold is recorded as **unbenchmarked**, set from the economic floor alone, and the test is marked as one whose result will become the project's first benchmark.

Benchmarks are inputs to the owner's decision, never substitutes for it, and a threshold without its derivation recorded is not pre-registered.

When the benchmark and the economic floor disagree — a published rate well below what the business needs, or well above it — the agent does not reconcile them. It presents the disagreement: both figures, the likely reasons for the gap (a benchmark from a different channel or price point; an economic floor that assumes a sample the budget cannot buy), and what setting X at each would imply for sample size, duration, budget, and the build decision. The owner chooses, and the choice and its reasoning are recorded with the threshold. This is the posture of every agent role in the method: the agent makes the decision well-informed; it does not make the decision.

### 6.4 Tests derive from the outcome, not the product

The documented successes tested the outcome: a video of files synchronising, a page offering shoes for sale, a hand-made coupon for a pizza place. Every validation instrument is built from what exists at G2 — the value hypothesis and the anchor use case — which is why validation starts before the prototype. Level 4 and 5 tests benefit from the prototype as a demonstration and are typically run after G5.

### 6.5 Instruments

All are generated by agents in fast mode, because fast mode exists to build the things one validates with:

- **Landing page** from positioning and messaging, with the visual specification's tokens where it exists, and nothing on it that an outcome does not back.
- **Validation events** — `validation.visited`, `validation.email`, `validation.qualified`, `validation.preorder` — written to the same events table the product will use, so the validation funnel and the product funnel are one instrumentation.
- **Tagged source links**, one per channel, post, outreach batch, or placement, so every test is attributable.
- **Pre-order flow** with a refundable deposit, or the ICP equivalent (letter of intent template, pilot agreement).
- **Concierge protocol** — how the outcome will be delivered by hand, what is recorded, what is charged.
- **Outreach assistance** — list building and per-contact personalisation from the actor profile, with hard limits: ICP only, small batches, every batch a pre-registered test.

### 6.6 The decision

A4 produces one of three decisions, recorded in `VALIDATION.md` and ratified by the owner:

- **Build** — the pre-committed threshold was met. G6 may proceed.
- **Pivot** — the threshold was not met and the evidence suggests a different actor, outcome, or channel. The value hypothesis is amended, Stage 2 re-runs, and A3–A4 repeat.
- **Stop** — the threshold was not met and no credible pivot is supported. The project is archived with its research retained, or returned to Stage 1.

Stop must be a result the method respects, or the gate is decorative. The cost of a stop at A4 is the validation budget and a few weeks; the cost of discovering the same thing after a build is the build.

### 6.7 Override

There are legitimate reasons to build without demand evidence: an internal tool with a named sponsor, a contractual build, a regulated product that cannot take pre-orders. The override is an owner decision, recorded in VALIDATION.md with the reason, and visible in PIPELINE.md. The method makes "we built without evidence" a decision rather than a default.

---

## 7. Launch (A5)

Launch is a gate, not an event. The checklist is short and every item is verifiable:

- **Claims trace.** Every claim on the landing page, in onboarding, and in launch communications maps to an outcome descriptor with a passing end-to-end test. Claims without a trace are removed.
- **Onboarding verified.** The path from signup to the anchor outcome has been walked through against the first-run archetype; its step count does not exceed the PDD's.
- **Telemetry live.** Activation, retention, revenue, and referral events are flowing; the dashboard shows them; `invariant.violated` alerts someone.
- **Feedback live.** The in-product feedback control, the support inbox tagged by use case, and the PMF survey trigger are in place before the first user.
- **Support path.** A named human, a response-time commitment proportionate to the MVP, and a route from support to the feedback artefact.
- **List at size.** The owned list meets a pre-registered minimum; the launch-day channels are those with A3 evidence.
- **Fault posture.** The fault-injection flag is off; the error tracker is pointed at production; the adversarial report for the final phase has been classified.

The launch itself follows CHANNELS.md: one primary launch platform chosen by actor, the owned list, and the channels with evidence. Press and social amplification are planned around a mechanic that is already working, not expected to create one.

---

## 8. Telemetry, Analytics, and Feedback

### 8.1 What already exists

The substrate carries product telemetry from Phase 0: use-case funnel events (`started`, `step.k`, `completed`, `failed_at.k`), `invariant.violated`, the error tracker, health endpoints, structured logs with correlation identifiers, and one events table. The principle — instrument outcomes, not screens — is unchanged.

### 8.2 Business telemetry

Four metrics are added, all derivable from the events table and the anchor use case:

| Metric | Definition | Source |
|---|---|---|
| Activation | First completion of the anchor use case by a new actor | `UC-anchor.completed`, first occurrence per actor |
| Retention | Repeat completion of the anchor use case, by weekly signup cohort | Same event, cohort-grouped |
| Revenue | Payment events, by actor and plan; MRR derived | `billing.*` events already in the contract surface |
| Referral | Actor-originated invitations and their conversion | `referral.sent`, `referral.converted` |

These are the numbers the value hypothesis is tested against. The use-case funnels say whether the product works; these say whether it is a business. `METRICS.md` gains a business section at A2, before the product exists, because validation events use the same table.

### 8.3 Qualitative feedback with context

- **In-product feedback control**, present on every screen, which records the use case and screen the actor was in when they used it. The context is what makes feedback actionable; without it, feedback is a pile.
- **Support inbox**, with every conversation tagged by use case on triage (agent-assisted).
- **PMF survey** — the "how would you feel if you could no longer use this?" question — sent to an actor after they have completed the anchor outcome several times, never at signup. The 40% "very disappointed" benchmark is a reference point, not a target; the sample must be actors who have experienced the outcome.
- **Research continuity.** The audience track's rooms continue to supply observed questions and themes after launch.

### 8.4 Feedback becomes amendment

Every feedback theme that recurs is routed, by the agent, to one of: a proposed new use case, a proposed failure path, a proposed outcome change, a defect (ticket), or rejected with a recorded reason. Proposals go to the owner through the amendment loop already defined in ODPD. Feedback therefore lands on a PDD artefact and changes the definition before it changes the product — the same discipline that prevents design drift, applied to the market.

### 8.5 Proportionate infrastructure

One events table; one dashboard over it (cohort retention, activation rate, funnel per MVP use case, revenue, the feedback theme list); one error tracker; one alerting metric. No metrics platform, no warehouse, no tracing backend, no session replay until a question exists that the table cannot answer, at which point the upgrade is a Workflow B change with the question stated. The temptation to instrument everything produces volume and delays the launch; the method forbids it at MVP.

---

## 9. The Learning Loop

### 9.1 The weekly learn session

Thirty minutes, owner and engineer, agent-prepared. The agenda is fixed:

1. **North star against hypothesis.** The value hypothesis stated; the north-star metric this week and trend; the activation and retention cohorts.
2. **Top three feedback themes**, each with its proposed routing (§8.4).
3. **Decisions.** Amendments ratified or rejected; defects prioritised; channel tests to run; anything to stop doing.
4. **Hypothesis status.** Confirmed, refuted, refined, or insufficient data — with the evidence.

The record is `LEARNING.md`, append-only, one entry per session. It is the business's decision log, as `DECISIONS.md` is the architecture's. Every validation and channel result recorded in it is also this project's own benchmark for later tests on the same ICP and channel — the only benchmark whose context is fully known.

### 9.2 Closing the loop at Stage 2

When the hypothesis is **confirmed**, Stage 2 re-runs with a new hypothesis for the next increment: the next outcome the same actor needs, or the same outcome for the next actor, selected from the backlog by the same smallest-testable-value procedure. When **refuted**, the pivot path of §6.6 applies with the advantage of real usage data. When **refined** — the actor or outcome was slightly wrong — the PDD is amended and the affected traces re-run. **Insufficient data** triggers a channel decision, not a product decision: the problem is reach, and the audience track owns it.

Stop remains available after launch. A product that does not confirm its hypothesis within a pre-registered window and shows no refinement path is stopped, with its research and audience retained for the next attempt. The method's commitment is to the business, not to the product.

### 9.3 What the loop forbids

Feature addition by opinion. Any proposed feature must arrive as a use case through the amendment loop, carry an outcome descriptor, and be selected by the Stage 2 procedure against the current hypothesis. The loudest customer gets a use case written up, not a feature built.

---

## 10. Operating Modes and the Two Tracks

Fast mode (FMA §9) acquires a precise purpose under ODG: **fast mode builds the things one validates with; governed mode builds the thing one ships.** Landing pages, pre-order flows, concierge tooling, prototypes, and dashboards are fast-mode work. The product that reaches A5 is governed-mode work, because it carries claims the launch gate must be able to trace.

Pre-registered thresholds never auto-ratify in either mode, and the A4 decision is the owner's in every mode. Fast mode may run tests and prepare instruments; it may not decide that the evidence was sufficient.

---

## 11. Roles, Agents, and Model Tiering

| Stage | Human role | Agent role | Model tier |
|---|---|---|---|
| Audience (A1–A3) | Owner participates personally and ratifies CHANNELS.md | Maps actors to rooms; drafts participation; builds the owned channel; generates tagged links; records evidence | Frontier for mapping and drafting; any tier for tracking |
| Validation (A4) | Owner sets thresholds from the derivation and decides build / pivot / stop | Researches benchmarks per ICP, channel, and level; computes the economic floor; prepares XYZ tests; generates instruments; runs outreach assistance within limits; reports against threshold | Frontier for benchmark research and test design; fast mode for instruments |
| Launch (A5) | Owner ratifies; engineer verifies telemetry and substrate | Traces claims to outcomes; verifies onboarding; checks the gate | Any tier for checking; frontier for claims trace |
| Telemetry and feedback | Engineer owns correctness | Generates events, dashboard, feedback routing; tags support | Any tier |
| Learning (L) | Owner and engineer decide | Prepares the weekly record; routes feedback; proposes amendments | Frontier for synthesis and proposals |

The division is the same as in the companion papers, with one activity that is not delegable: the owner's personal presence in the audience track. The founder's account is the channel; an agent may draft for it but may not be it.

---

## 12. Verification Gates

| Gate | Artefact | Condition | Analogue |
|---|---|---|---|
| A1 | CHANNELS.md v1 | Rooms per actor; founder and owned channels chosen; participation begun; credibility assessed | G1 |
| A2 | Owned list; events table | List exists; tagged links in use; validation events flowing | Phase 0 |
| A3 | CHANNELS.md with evidence | First level-2 test run against a pre-registered threshold | G5 (a test was run properly) |
| A4 | VALIDATION.md | Pre-committed level met, or owner override recorded; decision build / pivot / stop ratified | G6 (the build gate) |
| A5 | Launch checklist | All items of §7 verified | Gate 5 (coverage, not vacuous) |
| L | LEARNING.md | First session held; hypothesis status recorded; next increment selected or stop recorded | Federation review cadence |

Gates are checked by agents and ratified by the owner. As in ODPD, a failed gate does not stop the stage's own work; it stops the handoff.

---

## 13. Failure Modes and Mitigations

| # | Failure mode | Description | Mitigation |
|---|---|---|---|
| H1 | Audience deferred | Audience work loses to work with artefacts and gates | Audience track with A1–A3 from Stage 1; router reports both tracks |
| H2 | Enthusiasm as evidence | Build decided on interviews, conviction, or investor interest | Evidence ladder; level-4 default; A4 blocks G6 |
| H3 | Threshold after the fact | Success criteria set after seeing results | Pre-registration ratified before the test; results read against X only |
| H3a | Threshold by default | A generic X applied without reference to this project's ICP, channel, or economics | Per-project derivation from benchmarks and the economic floor, recorded with the threshold (§6.3); playbooks carry no values |
| H4 | Vanity signal | Social engagement read as demand | Social is top of funnel only; conversion from tagged source is the metric |
| H5 | Claims drift | Marketing describes a product that was not built | Claims trace to outcomes with passing tests (P5); launch gate removes untraced claims |
| H6 | Instrument everything | Telemetry volume delays launch and answers nothing | Outcome-derived events only; one table, one dashboard; upgrades require a stated question |
| H7 | Feedback pile | Feedback collected with no destination | Use-case context on every item; routing to amendment or rejection with reason |
| H8 | Survey at signup | PMF measured before the outcome has been experienced | Survey triggered after repeated anchor completion |
| H9 | Feature by opinion | Roadmap set by loudest voice | Every feature enters as a use case through the amendment loop and the Stage 2 procedure |
| H10 | Stop refused | Negative evidence rationalised; sunk cost | Stop is a ratified decision with a recorded path; research and audience retained |
| H11 | Outreach as spam | Tooling scales outreach beyond ICP and consent | Hard limits in the skill: ICP only, small batches, every batch a test; compliance in the playbook |
| H12 | Delegated founder | Agent posts as the founder; trust collapses on discovery | Agent drafts; owner posts; the founder channel is not delegable |
| H13 | Paid sample as forecast | Paid-traffic conversion read as organic expectation | Paid results recorded as a floor; organic channels tested separately |
| H14 | Derivative positioning | Agent research regresses positioning toward competitors | Differentiation notes carried from Stage 4; positioning derives from the owner's value hypothesis, not the market's |

---

## 14. Harness Integration

ODG adds three skills to the Trellis harness, a second track to `PIPELINE.md`, four artefacts, and small substrate additions. It deliberately adds no marketing-execution tooling.

| Skill | Gates | Reads | Produces |
|---|---|---|---|
| `trellis-audience` | A1–A3 (ongoing) | PDD actors, MVP | CHANNELS.md; owned-channel setup; tagged links; participation and evidence records |
| `trellis-validate` | A4 | MVP, CHANNELS.md, prototype if present | VALIDATION.md with pre-registered tests; instruments (landing page, events, pre-order or ICP equivalent, concierge protocol, outreach batches); the build / pivot / stop decision for ratification |
| `trellis-learn` | A5, L | METRICS.md, events table, feedback | Launch checklist verification; dashboard; LEARNING.md entries; feedback routing to amendments |

**Per-ICP playbooks** are reference files read by `trellis-audience` and `trellis-validate`, in the pattern of the archetype library: consumer, SMB, enterprise, developer, internal. Each specifies the applicable ladder levels and their instruments (waitlist versus letter of intent versus marketplace listing versus sponsor commitment), the channel map, the cold-start routes, the compliance posture, and the benchmark sources the agent consults when deriving a threshold (§6.3). Playbooks carry no threshold values.

**PIPELINE.md** gains an `audience` block with gates A1–A5 and L, a `validation` field recording level, threshold, and decision, and an `override` field. The router reports both tracks and flags a product track that is ahead of its audience track.

**Substrate additions** (in `trellis-init`): business event types in the contracts package (`billing.*`, `referral.*`, `validation.*`, `feedback.submitted{useCase, screen}`), the feedback control as a base-module component, the PMF survey trigger on anchor-completion count, and one dashboard over the events table. `models.yaml` gains an `audience` role (frontier) and routes `learn` to the `spec` tier.

**Workflow Zero** consumes CHANNELS.md and VALIDATION.md: the launch gate's items become Phase 0 and final-phase tickets, and the claims trace is generated with the trace matrix.

---

## 15. Prior Art

The validation ladder and pre-registration discipline synthesise an established literature: Blank's customer development, Ries's build–measure–learn and the concierge MVP, Savoia's pretotyping and the XYZ hypothesis, Bland and Osterwalder's evidence-strength framework, Fitzpatrick's rule that what people say is not evidence, and Vohra's product–market-fit survey. The documented cases follow the ladder: a demonstration video with a waitlist (Dropbox, 2007), a pricing page behind which nothing existed (Buffer, 2010), queue-position waitlists with referral mechanics (Mailbox, Robinhood, Harry's, 2013), refundable deposits before production (Tesla Model 3, 2016; Pebble on Kickstarter, 2012), and outcomes delivered by hand for payment (Zappos, 1999; Groupon, 2008; Food on the Table). Business-to-business cases substitute warm networks and in-person installation for landing pages (Stripe's founders installing for YC companies; Slack's friendly-company previews; Figma's years of private beta with design teams).

Two observations from the cases shape ODG. Almost none pre-registered a threshold; their signals were overwhelming, which is why they are famous, and the method's pre-registration rule exists for the far larger number of teams whose signals are ambiguous. And every successful test tested the outcome rather than the product, which is why validation in ODG begins at G2 with the value hypothesis rather than waiting for a prototype. The cautionary cases — products that raised capital on belief and ran nothing resembling a level-4 test — are the cases in which capital substituted for evidence; a two-person team does not have that option, which is an advantage.

---

## 16. Open Questions

1. **Benchmark quality.** Published conversion benchmarks are uneven in provenance and often undisclosed in sample and context. The agent reports confidence and presents disagreements for the owner to resolve (§6.3); what the method lacks is a shared vocabulary for benchmark confidence so that two owners reading the same presentation would understand it the same way.
2. **Multi-actor products.** When the anchor use case involves two actors (a marketplace, a collaboration tool), the ladder must be climbed on both sides, and the paper does not yet say how to sequence or weight them.
3. **Audience track for internal products.** A1–A3 assume external actors. For internal tools the "audience" is a sponsor and a user group, and the gates need a mapping.
4. **Concierge-to-product transition.** A level-5 test delivers the outcome by hand; the paper does not yet define how the manual process's learning is captured into use cases and failure paths beyond the amendment loop.
5. **Learning cadence after scale.** Weekly suits the MVP; the right cadence and record structure once the product has many use cases and several hypotheses is untested.
6. **Founder channel succession.** If the founder channel is not delegable, what happens when the team grows and the founder steps back? The method currently has no answer beyond "re-run A1."
7. **AI answer engines as a measured channel.** Attribution from answer-engine citations to landing-page visits is immature; the paper treats it as a channel without yet saying how to test it.

---

## 17. Conclusion

Federated Modular Architecture made building correct. Outcome-Driven Product Definition made what was built the right thing. Outcome-Driven Growth makes the right thing a business: an audience built from the first day because it has artefacts and gates like everything else; a build decision taken on behavioural evidence against a threshold set in advance, with stop as a respected result; a launch that can only claim what it has proven; telemetry derived from the outcomes the product exists to deliver, on infrastructure proportionate to an MVP; feedback that lands on the definition rather than in a pile; and a weekly loop that reads the value hypothesis against reality and chooses the next increment accordingly.

The three papers together describe one cycle — **define, validate, specify, build, launch, learn** — run by two people and a set of agents, with an executable artefact and a human decision at every boundary. The method's claim is not that it is fast to a first screen. It is that it is fast to a correct product that people have demonstrated they want, and that it keeps learning after that.

---

*Prepared for internal review. Companion to "Federated Modular Architecture for Agentic Software Development" (June 2026, revised September and October 2026) and "Outcome-Driven Product Definition" (September 2026, revised October 2026).*
