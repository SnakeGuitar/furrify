# Acceptance map

English · [Español](acceptance-criteria.es.md)

The [requirements](requirements.md) define the criteria. Use this map to locate the corresponding checks.

| ID | Where to observe it | Verification |
|---|---|---|
| RF-005 | Lookup panel and adapter in `src/catalog.ts` | `npm test` checks shortlist size, uniqueness and reasons. `npm run browser` exercises all four cases in the UI. |
| RNF-001 | Browser console and `src/events.ts` | The browser test checks event correlation, unexpected errors and recovery after a failed lookup. |
| RNF-002 | `scripts/verify.mjs` and the run directory | Inspect exit codes, logs, source fingerprint and statuses using the [verification guide](../agents/verification.md). |
| RF-001–004, RF-006–008 | Future screens | Implementation and verification pending. |
