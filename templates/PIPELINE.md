# Trellis pipeline state

> Read by every Trellis skill at session start; updated by every skill at session end.
> Run the `trellis` skill with no arguments to be told where you are and what comes next.

```yaml
mode: governed            # governed | fast   (fast auto-ratifies judgment gates; enforcement never relaxes)
pdd_version: 0
visual_spec_version: 0
artefacts:
  PDD.md: missing
  MVP.md: missing
  DATA-MODEL.md: missing
  RESEARCH.md: missing
  FLOWS.md: missing
  VISUAL-SPEC.md: missing
  prototype: missing
  walkthrough-records: missing
  TRACE.md: missing
  METRICS.md: missing
  SPEC.md: missing
  ARCH.md: missing
  TICKETS.md: missing
  CHANNELS.md: missing
  VALIDATION.md: missing
  POSITIONING.md: missing
  MESSAGING.md: missing
  LEARNING.md: missing
  MODULES.md: missing
  substrate: missing        # trellis-init complete, CI green with zero modules
  e2e-suite: missing        # trellis-visual-qa generated tests
  coverage-manifest: missing # tests/e2e/coverage.json — gate 5a
  adversarial-reports: []   # federation/adversarial/*.md awaiting classification
audience:                   # ODG second track — runs from Stage 1 (needs G1 for A1)
  playbook: unset           # consumer | smb | enterprise | developer | internal
  A1: pending   # rooms mapped, founder + owned channel chosen, participation begun
  A2: pending   # owned list exists; tagged links; validation events flowing
  A3: pending   # first level-2 test run against a pre-registered threshold
  A4: pending   # demand evidence at pre-committed level, or override — BLOCKS G6
  A5: pending   # launch gate
  L:  pending   # first weekly learn session held
validation:
  level: unset              # pre-committed ladder level (owner)
  decision: unset           # build | pivot | stop | override
  override_reason: ""
gates:                      # pending | passed | waived
  G1: pending   # PDD complete, outcomes rigorous
  G2: pending   # MVP closed under preconditions
  G3: pending   # data model bidirectional trace + classification
  G4: pending   # research, flows, state matrix, archetypes, visual spec
  G5: pending   # prototype walkthroughs
  G6: pending   # trace matrix, Phase 0, build order, e2e generated
  G7: pending   # METRICS.md ratified
ratification_queue: []      # fast mode: auto-ratified decisions awaiting human review
next: trellis-product-definition
```

## Log
<!-- one line per skill run: date · skill · outcome · gate changes -->
