# TASKS.md — <module> · ticket <T-nnn> · coordinator session <date>
> Execution plan for ONE ticket. Tasks are the unit of execution (one worker, one sitting, disjoint files).
> Tickets are the unit of acceptance. Workers edit only the files listed in their task.

Ticket: T-nnn <title> · UCs: UC-nnn · acceptance: <outcome descriptor ids>
Gate order: typecheck → lint → contract → module → e2e (e2e only after 1–4 green)

| id | wave | task | owns (files, disjoint within a wave) | depends on | worker | status | result |
| A1 | 1 | tests + interface stubs: named tests from ticket; stubs that compile and fail | tests/*, src/<x>.ts (signatures only) | — | | pending | |
| B1 | 2 | implement models | src/models.ts | A1 | | pending | |
| B2 | 2 | implement routes/handlers | src/routes.ts | A1 | | pending | |
| B3 | 2 | implement ui exports | src/ui/* | A1 | | pending | |
| C1 | 3 | coordinator runs the five gates; fixes integration seams only | — | B* | coord | pending | |

Rules: a task touches no file outside `owns`; a wave runs in parallel; waves run in order;
no task may weaken a test; anything needing contracts/ is a [WORKFLOW-B] stop.
