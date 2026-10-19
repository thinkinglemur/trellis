# Dispatch — how work actually fans out

## Topology (depth two, no nesting)
- **Level 0 — phase fan-out across modules**: one coordinator session per module, each in its own git
  worktree (`git worktree add ../wt-<module> -b t/<ticket>`), launched in parallel by the human or a
  launch script. Not by a parent agent: in standard subagent mode subagents do not spawn subagents
  (verify against current harness docs before assuming otherwise).
- **Level 1 — tasks within a ticket**: worker subagents of the coordinator session, one per TASKS.md row
  in the current wave, dispatched together so they run concurrently.
- Merge: each worktree branch merges after its five gates are green; the integration suite runs on the
  merge. Conflicts are rare by construction (modules own disjoint directories; tasks own disjoint files).

## Worker brief (paste into the subagent prompt)
```
You are a Trellis worker. One task, one sitting, disjoint files.
Module: <name>  · Ticket: <id> · Task: <TASKS.md row id> — <task text>
Owned files (edit ONLY these): <list>
Read-only context: modules/<name>/CLAUDE.md, packages/contracts/src/, TASKS.md, tests listed below.
Turn these tests green: <paths/names>
Rules: no file outside owned; no test weakened/skipped/deleted; no contracts change (report instead);
no refactor beyond the task; Conventional Commit scope <name>.
Verify before returning: pnpm typecheck && pnpm lint (e2e is the coordinator's).
Return ONLY the report format below.
```

## Worker report (the only thing a worker returns)
```
task: <id>  status: green | red | blocked
files changed: <list>
tests: <passing/failing names>
cycles used: <n>  escalated: yes/no
blocked on: <contract change | missing file | ambiguous spec> (if any)
observations for federation: <duplication, friction> (if any)
```

## Coordinator rules
- Dispatch a whole wave in one turn so workers run in parallel; wait; read reports; run gates.
- A red worker gets its own report back with the failing output, up to models.yaml cycle limits —
  the coordinator does not fix a worker's files itself until wave 3.
- Shared artefacts, not chat: workers coordinate through TASKS.md, the stubs, and the failing tests.
