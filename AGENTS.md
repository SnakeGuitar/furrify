# Working on Furrify

English · [Español](AGENTS.es.md)

Furrify connects adult buyers with independent fursuit and accessory makers.
Current code only displays a local fictional shortlist.

## Sources
- [Human documentation index](docs/README.md).
- [Authoritative requirements](docs/product/requirements.md).
- [Current and target architecture](docs/architecture/overview.md).
- [Acceptance map](docs/product/acceptance-criteria.md).
- [Human decision register](docs/humans/decisions.md).

- [Transactional contracts](docs/architecture/contracts.md).
- [Test strategy](docs/humans/testing-strategy.md).

## Constraints
The confirmed stack is React, TypeScript, Vite, ASP.NET Core with C#, PostgreSQL, Docker and Compose.
The target backend is one modular monolith using Clean Architecture.
Domain stays independent of ASP.NET Core, ORM, PostgreSQL and PayPal.
Infrastructure implements inward-defined ports.
Modules communicate through explicit in-process contracts.
Each module owns its data. Avoid direct access to another module's tables.
Keep manual selection of up to three makers with reasons.
Enforce publication and contact permissions.
Consult pending decisions when a change affects their scope.
A proposal requires approval before it becomes confirmed policy.
Keep fixtures behind the adapter and sensitive data out of events.

## Existing commands
Run from the root with Node.js ≥22.18 and npm.

```sh
npm ci
npx playwright install chromium --only-shell
npm run dev
npm run check
npm test
npm run build
npm run browser
npm run verify
```

## Completing a change
Read the relevant details through these links.
Follow the [workflow](docs/agents/workflow.md).
English is primary. Update translations alongside originals.
Use English Conventional Commits subjects.
Review the diff, acceptance, documentation and proportionate evidence.
For documentation-only changes, check links, IDs, translations and consistency.
Report passed, failed, blocked or not_run according to evidence.
Include commands, results, checked revision and evidence paths.
State which checks were omitted and why.

Money changes require unit, integration and system checks; report Sandbox separately. Future commands are specified only in the strategy.
