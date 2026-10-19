---
name: trellis-audience
description: >
  ODG audience track, gates A1–A3 — runs from Stage 1 in parallel with product definition. Use when the
  user says "audience", "channels", "where are our users", "newsletter", "waitlist", "build in public",
  "founder channel", or the router flags the audience track behind. Maps PDD actors to the rooms they
  already use, chooses one founder channel and one owned channel, starts participation as research,
  sets up tagged source links and validation events, and runs the first level-2 test. Owner participates
  personally and ratifies CHANNELS.md. Role: audience (frontier).
---

# Trellis — Audience (A1–A3)

Read `../trellis/references/protocol.md` first. Role: `audience`.
**Requires:** G1 (actors exist in PDD.md). **Produces:** CHANNELS.md, owned-channel setup, tagged links,
participation record. **Gates:** A1, A2, A3. **Next:** trellis-validate (once G2 exists and A3 passed).

The agent researches, drafts, and records. The owner posts, participates, and ratifies. The founder
channel is not delegable (ODG P9): never post as the owner; draft for them.

## A1 — Map actors to rooms
Pick the playbook from `references/playbooks/` by the PDD's primary actor (consumer | smb | enterprise |
developer | internal). For EACH human actor:
1. Research the specific **rooms** where this actor already discusses the problem (subreddits, Discord/
   Slack servers, professional groups, forums, newsletters, podcasts). Cite each; note posting rules
   (most ban launches — record the rule).
2. Propose ONE **founder channel** chosen by where the actor is, not the owner's preference.
3. Propose ONE **owned channel** (newsletter or waitlist).
4. **Credibility check** with the owner: can either human participate in each room credibly today?
   If no room is reachable warmly → record it as a PDD-level finding, not a marketing problem.
5. Write CHANNELS.md v1 (`references/channels-template.md`): per channel an XYZ hypothesis WITHOUT a
   number yet — the X is set in trellis-validate per §6.3; here record only Y, Z, D and the tagged link.
Owner ratifies → A1.

## Participation (ongoing, from A1)
Research, not promotion. Each week: the agent lists questions the actor asked in the rooms; drafts
useful answers; the owner posts under their own name. Record themes in CHANNELS.md `## Observed` —
recurring questions are candidate use cases and go to the amendment loop.

## A2 — Owned channel and instrumentation
1. Stand up the owned channel (newsletter or waitlist page). Fast mode may build the page.
2. Tagged source links: one per room, post stream, and outreach batch (`?src=<channel-id>`).
3. Validation events (`validation.visited|email|qualified|preorder`) written to the project's events
   table using the `UseCaseEvent`-shaped schema from the contracts package — if the substrate doesn't
   exist yet, a standalone minimal sink that will be migrated by trellis-init.
A2 when the list exists and the first tagged events arrive.

## A3 — First level-2 test
Requires G2 (value hypothesis). Hand the first test to trellis-validate for threshold derivation and
pre-registration; run it on ONE channel so the result is attributable. A3 passes when the test has run
properly against a pre-registered threshold — regardless of result (the result is A4's concern).
Record evidence per channel in CHANNELS.md.

## Rules
- Never set a threshold here; never read a result as "encouraging"; never post as the owner.
- Social engagement (likes, follows, views) is below ladder level 1 — record it, never count it.
- Outreach follows the playbook's compliance posture; consumer cold email is not permitted.
Update PIPELINE.md `audience` block; set `next`.
