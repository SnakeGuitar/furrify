# Run verification and read the evidence

English · [Español](verification.es.md)

From the repository root, run `npm ci` and `npx playwright install chromium --only-shell`. On Linux, use `npx playwright install --with-deps chromium --only-shell` if system libraries are missing. Run `npm run verify`. To reuse an installed Chromium, set `CHROMIUM_PATH` to its executable. The report records this override.

Verification runs type checks, domain tests, the build and a browser test. The browser opens the build on a free local port and exercises the [demo scenarios](../humans/demo-guide.md). In DevTools, filter the console by event name and follow the operation ID for one attempt. Events contain only a timestamp, level, name and operation ID.

Each ignored `.evidence/<date-uuid>/` directory contains `result.json`, `summary.md`, one log per executed command and per-file hashes in `files.json`. The summary shows every stage. The JSON records the Git revision (null before the first commit), source fingerprint and exit codes. Compare runs with `git diff --no-index path1/files.json path2/files.json`. Exit code 1 from this comparison indicates differences.

| Status | Meaning |
|---|---|
| passed | The command exited with code 0. |
| failed | An assertion, build or other executed operation failed. Check its log. |
| blocked | A recognized prerequisite was missing or the command could not start. The browser check uses code 78 for missing dependencies. |
| not_run | The stage is pending or its prerequisite build failed. |

A successful browser test saves `seleccion.png` and `events.json`. A failure with an open browser context saves `failure.zip` and, if the page is available, `failure.png`. Open the trace with `npx playwright show-trace path/failure.zip`. Assertions determine the outcome. The screenshot supports human inspection. The verifier returns the first available unsuccessful exit code.

A future GitHub CI job can install the dependencies and run the same verification command. For documentation-only work, report link, ID, translation and consistency checks. Application checks remain not_run by scope.

Future mechanisms and commands are defined in the [human strategy](../humans/testing-strategy.md). Select checks by risk and change type; never present future commands as available or a fake provider as validated Sandbox.
