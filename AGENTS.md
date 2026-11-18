# Working on Furrify

English · [Español](AGENTS.es.md)

The pilot connects adult buyers with independent makers. The prototype displays a fictional, manually curated shortlist. Before changing behavior, read the [documentation index](docs/README.md), [product requirements](docs/product/requirements.md) and [acceptance map](docs/product/acceptance-criteria.md).

Run these commands from the repository root with Node.js 22.18 or later and npm.

| Command | Purpose |
|---|---|
| `npm ci` | Install the locked dependencies. |
| `npx playwright install chromium --only-shell` | Install the browser once. |
| `npm run dev` | Start Vite. |
| `npm run check` | Run strict TypeScript checks. |
| `npm test` | Test the domain behavior. |
| `npm run build` | Build the distribution. |
| `npm run browser` | Test the most recent build in Chromium. |
| `npm run verify` | Run all checks and write evidence. |

Keep fictional data behind the adapter and maker selection manual. Use predefined event names and a temporary operation ID. Omit user input and exception details from events.

Use English as the primary documentation language. Update the English page and its Spanish translation together. Write commit subjects in English with a Conventional Commits prefix, for example `docs: explain the demo` or `fix: handle empty selections`.

Follow the [development workflow](docs/agents/workflow.md). A finished change has observable acceptance criteria, a reviewed diff, current documentation and a report listing commands, results, evidence paths and any blocked or outstanding checks.
