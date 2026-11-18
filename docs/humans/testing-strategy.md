# Test strategy and evidence

English · [Español](testing-strategy.es.md)

Future design. No new tools installed or suites implemented. Keep Playwright and the current node:test catalog tests. xUnit supplies C# domain cases and fixtures; WebApplicationFactory exercises the real ASP.NET Core host; Testcontainers supplies disposable PostgreSQL with production semantics. Versions and architecture-check library remain undecided. [Requirements](../product/requirements.md) define acceptance and [payments](../architecture/payments.md) defines recovery.

## Proposed organization

```text
tests/backend/Furrify.Domain.Tests/
tests/backend/Furrify.Application.Tests/
tests/backend/Furrify.Api.IntegrationTests/
tests/backend/Furrify.Architecture.Tests/
tests/system/                     Playwright full journeys
tests/payments/Sandbox.Tests/      explicit real-provider suite
tests/fixtures/                   synthetic builders, approved test policies
tests/support/                    clock, ID source, resource lifecycle helpers
```

Shared fixtures contain minimal builders without duplicated business logic. Hosting utilities belong to integration, Playwright to system. Each fixture's policy snapshot makes assumptions explicit without approving production policy.

## Unit tests
xUnit runs domain and application without API, Docker, PostgreSQL, network or secrets. Parameterized cases cover three-maker/duplicate limits, ownership, forbidden transitions, issued/expired/rejected/accepted quotes, unique order creation and snapshots. Inject a fixed clock and explicitly advance before/at/after expiry. Use per-test deterministic ID sources without global state.

Application doubles replace storage, identity and provider ports only. Keep real entities, validators and rules under test. Money cases cover exponents 0/2/3, supported bounds, negatives, mismatched currency and exact decimal conversion without floats. Payments check Approved is not Captured, recipient/money correspondence, Unknown reservation and bounded refunds. Assert observable state/results and persistable effects, not getters or private interactions. Every case emits RN/RF name, xUnit result and duration.

## API and PostgreSQL integration
One xUnit collection fixture starts a pinned PostgreSQL container on a random host port. Each case creates a unique database (runId/testId), applies real migrations and minimal seeds. Each WebApplicationFactory uses that connection and real backend settings. Create HTTP clients for buyer A/B, maker A/B and distinct staff permissions. EF InMemory and SQLite cannot substitute for PostgreSQL constraints, SQL or transactions.

Every test owns its database and host. Concurrent requests inside a case deliberately share the database and use barriers rather than sleeps. Parallel cases use separate databases. Dispose host, pools and case database, then collection container. Clean up on failure after collecting logs. Label resources with runId for manual cleanup after process death. Missing Docker or inaccessible images are blocked with diagnostics and nonzero exit.

WebApplicationFactory keeps real routes, validation, application, chosen ORM and composition. Replace only PaymentGateway for the deterministic suite and identity for policy cases through a test-host-only authentication scheme. Policy tests check roles/resource ownership, not actual authentication. A separate collection exercises the selected mechanism with valid, expired, invalid-signature sessions/tokens and recovery. Test authentication selection is absent from production binary/configuration.

Cover 400/401/403/404/409/412/422/428, foreign keys, unique indexes, upgrade migrations, publication/acceptance rollback and module collaboration. Two clients accept different quotes for the same request simultaneously: only one proposed active order. Concurrent captures/refunds cannot duplicate or exceed balance. Host restart preserves data. Failure after provider confirmation and before commit checks recovery.

## System tests with dedicated Compose
Unique test Compose project per runId and worker, labeled dedicated networks/volumes and dynamic host ports. Built frontend, real API, real PostgreSQL and migration step precede readiness. API configures a deterministic fake at the external payment port. Playwright does not intercept or replace Furrify API in these suites. A test-environment-only preparation tool loads fixtures; production exposes no seed endpoint.

Preparation checks Docker, builds pinned images, creates an empty test volume, waits for health checks, migrates, seeds and polls readiness with a deadline. Run journeys with separate actor contexts and runId-bound resources. A database per worker removes ordering dependencies. Screenshots supplement UI assertions and authorized state queries.

Cover buyer request visible to staff, published shortlist visible to buyer, maker quote acceptance, order snapshot, successful payment, decline/abandonment, fresh-session return, foreign access and visible authorized refund. Each journey includes invalid input or denied permission and relevant recovery.

Separate persistence exercises:
- Reload/re-authentication proves session continuity and reads.
- API restart with the same volume proves state/intention recovery.
- PostgreSQL container recreation preserving test volume proves persistence.
- Backup restore to a new test volume proves recovery with ID/balance inventory.

Save logs, reports and traces before removing only that runId's project/volumes after checking labels. Never use development/production names or volumes. Destructive exercises are restricted to the dedicated environment.

## Deterministic payments
Keep API, business logic and PostgreSQL real. The fake occupies PaymentGateway only. Fixture scenarioId and clock select success, decline, pending-then-success, timeout-before-call, timeout-after-provider-success, commit-failure-after-success, invalid-signature, mismatched-amount/currency/recipient, duplicate-event and out-of-order.

The fake maintains an external ledger independent of PostgreSQL transactions and returns the same result for repeated providerKey. A test-host-only hook fails commit once after external success is recorded. Restarting host and applying webhook or reconciliation must produce one capture, one financial summary and bounded refunds without a second charge. Do not change production logic to force outcomes. Scenario/fault controls are neither compiled nor registered in production.

## Separate PayPal Sandbox suite
Explicit authorized execution needs Sandbox app credentials, fictional buyer/seller accounts, enabled recipient model and a public HTTPS temporary or stable URL. Register URL/events on the correct app without prescribing a tunnel tool. Never use live credentials or real data. Secrets stay in CI/environment storage and are redacted from reports.

The real adapter creates an order, fictional buyer approves through provider UI, backend captures, queries order/capture, receives a real webhook and verifies authenticity with the correct webhook ID. Authorize/execute a refund where enabled, query and check its associated webhook. Retain restricted test IDs, statuses and verification results, never tokens or sensitive payloads. Clean up/refund fictional transactions according to scenario and report outstanding work.

Compare amount, currency, recipient and capture on both sides. Failure or unavailable capability is failed or blocked according to cause. A locally simulated webhook cannot validate real delivery. The fake adapter cannot satisfy this suite. Production enablement requires an independent gate and commercial decisions.

## Architecture
An automated check inspects project/package references to forbid Domain → Application/Infrastructure/API/ORM/PayPal, detect cycles and enforce module allowlists. Exported-type inspection checks permitted DTO/contracts against accidental entities, implementations or DbContext exposure. Default to internal visibility; API composition references infrastructure to register adapters.

References cannot prove all improper SQL access. Review queries, migrations and database permissions; contract tests and diff review cover foreign-table access unseen by project analysis. Choose tooling after project structure is fixed without promising absolute detection.

## Future command contracts
These entries are not available scripts. AGENTS lists existing commands. Proposed npm wrappers will later invoke dotnet/Compose/Playwright as appropriate.

| Future command | Prerequisites and scope | Evidence |
|---|---|---|
| npm run test:unit | .NET SDK pinned; no network/Docker, domain and application | TRX/XML, cases/duration |
| npm run test:integration | Docker, .NET, PostgreSQL image; API HTTP | TRX, migration/container logs, SQL cases |
| npm run test:system | Docker Compose, built images, Playwright Chromium | JUnit/JSON, screenshots, traces, service logs |
| npm run test:architecture | .NET, built assemblies | graph and violations |
| npm run test:payments:sandbox | opt-in, Sandbox secrets, accounts and HTTPS | separate report, restricted IDs/states |
| npm run verify (future extension) | static, unit, architecture, integration and system | aggregate manifest and per-suite results |

Exit 0 only when all required checks in the command pass. Use 1 for failure and 78 for recognized missing dependency/configuration. Unexecuted suites are not_run. verify fails if any required check fails, is blocked or not_run. Sandbox stays outside ordinary secret-free verify and reports separately.

## Proposed limits and diagnostics
These are adjustable harness limits, not product performance commitments. Unit case 5 s, integration case 60 s and container startup 120 s, system readiness 120 s and journey 90 s, Sandbox operation 60 s and webhook wait 180 s. Validate them in CI. Check prerequisites before waiting. On deadline save latest health, logs and pending operation. Use blocked for missing prerequisites before startup, failed for a case timing out in an available environment. Poll conditions using controlled clocks; avoid fixed sleeps and automatic test retries that turn intermittent failures into passes. A separate diagnostic retry preserves the original failure.

## CI and harness
Preserve existing scripts, statuses and ignored .evidence directory. Later extend suites: static → unit/architecture → PostgreSQL integration → critical system journeys. Jobs use isolated resources and always publish sanitized failure reports. Sandbox runs explicitly in an authorized secret-enabled environment, not untrusted-origin PRs. Share CI and local command logic.

Proposed result.json extension per check includes runId, revision, sourceHash, suite, environment, fixturePolicyVersion, tool/image versions, startedAt, durationMs, command, exitCode, status, reason and artifacts (logs, TRX/JUnit/JSON, screenshots/traces). Per-file manifest preserves diff comparison. Keep relevant success screenshots and failure traces without brittle pixel comparisons. Skipped checks cannot pass. Keep generated evidence outside Git and restrict Sandbox artifact access.

## Risk and evidence map

| RN / RF / RNF | UC | Level and scenario | Required evidence |
|---|---|---|---|
| RN-001/002/008 / RF-002/003/009/010 / RNF-003/005 | UC-02 | unit + integration + system: valid request, invalid input, foreign buyer, restart | results, sanitized HTTP, snapshot and trace |
| RN-003 / RF-006/013 / RNF-004 | UC-01 | integration + system: permission/revocation | authorized profile and hidden work |
| RN-004–009 / RF-004/005/007/011/012 / RNF-001/013 | UC-03 | unit + integration + system: fourth maker, atomic publish, absent consent, recovery | rollback and visible state |
| RN-012/013 / RF-014/015/016 / RNF-005/013 | UC-04/05 | unit + integration + system: expiry boundary, competing acceptance, snapshot | one order and preserved terms |
| RN-014/015 / RF-017/018/019/020 / RNF-013/014/015 | UC-06–09 | unit + integration + system fake + Sandbox: success, decline, unknown, duplicate, mismatch | fake ledger, one capture, events; separate Sandbox report |
| RN-016/017 / RF-021/022 / RNF-013/014 | UC-10/11 | unit + integration + system + Sandbox: concurrent refund, denied actor, timeout/recovery | reservations, refund and order; enabled capability |
| RN-010/018 / RF-008/023 / RNF-005 | UC-11 | integration + system: independent outcomes, corrected incident | separate entity histories |
| Cross-cutting / RNF-006/007/008 | all | keyboard/screen reader/devices/load against approved targets | audit; performance acceptance blocked by D-07 |
| Cross-cutting / RNF-002/009/010/011/012 | all | architecture + integration + system: graph, clean run, restart, recreate volume, restore | graph, manifest, inventory and restore exercise |

## Complete increments
I1 request to recommendation, I2 quote to order, I3 payment to reconciliation and I4 refund/incident. Each increment requires success, denied/invalid and recovery cases from its rows, current translations/contracts and revision/fingerprint evidence. I3 requires deterministic checks plus separate Sandbox evidence before claiming real integration. I4 requires enabled Sandbox refunds before claiming that capability. Pending policies permit explicit fixtures, not production acceptance. An arbitrary coverage percentage is not a sufficient quality gate.

### Order and completion gates

| Increment | Complete journey | Completion gate |
|---|---|---|
| I1 | Profile → request → review → recommendation → permission and introduction | RN-001–010 unit checks; permission/rollback integration; buyer/staff system journey; D-01–06 approved for real data. |
| I2 | Maker quotes → buyer accepts/rejects → readable order | Expiry, snapshot and competing acceptance pass; immutable price after profile change; D-09/11/12 resolved for live enablement. |
| I3 | Checkout → capture → webhook → reconciliation after restart | Success, decline, Unknown and failed commit pass with fake and real backend; separate Sandbox create/approve/capture/read/webhook evidence; D-08 and capabilities enabled. |
| I4 | Refund request → authorization → execution → read and incident | Concurrent reservation, permissions and recovery checked; Sandbox refund enabled; D-09/10 resolved; restore rehearsal before production. |
