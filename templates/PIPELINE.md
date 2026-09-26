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
  MODULES.md: missing
  substrate: missing        # trellis-init complete, CI green with zero modules
  e2e-suite: missing        # trellis-visual-qa generated tests
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
