# Development workflow

English · [Español](workflow.es.md)

1. Read [AGENTS.md](../../AGENTS.md) and the relevant requirements.
2. List the requirement IDs, expected result and behavior to preserve in the change summary.
3. Reproduce the existing behavior using the [demo guide](../humans/demo-guide.md). Record the baseline revision and observed differences.
4. Implement the smallest coherent change. Update expectations when behavior changes intentionally. Investigate regressions.
5. For code changes, run affected tests and complete verification. For documentation-only changes, check links, IDs, translation parity and consistency between rules and diagrams.
6. Inspect `git status --short`, `git diff`, `git diff --cached` and new files. Review screenshots for UI changes.
7. Update affected requirements, walkthroughs and architecture pages in both languages. If the source changes after verification, rerun it.
8. Report what changed, how to reproduce it, preserved behavior, per-command results, the evidence path and reasons for any blocked checks.
