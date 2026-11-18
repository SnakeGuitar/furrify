# ADR 003 · Module-owned persistence

English · [Español](003-module-persistence.es.md)

**Status** Technical proposal, awaiting approval.

**Context** Recommendations and request state must be published consistently within the monolith.

**Proposed decision** One PostgreSQL database, module-owned schemas, coordinated foreign keys and a transaction shared through contracts for publication. Modules do not access another module's tables directly.

**Consequences** Preserves logical ownership and supports atomicity. Couples migration order and transaction scope. Requires integration testing before validation. An alternative is a single schema with table ownership and the same contracts. See the [architecture](../overview.md).
