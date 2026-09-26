# Universal screen state set
Every screen in every flow must resolve each state as `designed` or `waived: <reason>`.

| State | Meaning | Seeded from |
|---|---|---|
| default | data present, actor idle | flow |
| loading | awaiting data/action; includes optimistic vs blocking choice | flow |
| empty | zero items / first run — what the actor does next | archetype |
| partial | some data failed/unavailable; degraded but usable | — |
| error:<Fn> | one per PDD failure path terminating on this screen | PDD failure paths |
| unauthorised | actor lacks `requires` role | route contracts |
| offline/degraded | network lost mid-task; unsaved state preserved? | — |
| success/outcome | the outcome descriptor made visible (reference, confirmation, next action) | PDD outcome |
