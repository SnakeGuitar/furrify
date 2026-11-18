# ADR 004 · Transactional scope and recovery

English · [Español](004-transactional-scope.es.md)

**Status** Transactional scope and PayPal Sandbox confirmed by user. Technical mechanisms proposed.

**Context** The pilot excluded payments and ended at introduction. The current brief requires quotation, contracting, payment and refunds.

**Decision** Supersede the payment exclusion in RN-011 without recycling its ID. Keep the monolith and add Contracting and Payments. Separate entities and states. Use real PayPal Sandbox to validate the adapter with a deterministic fake for ordinary tests.

**Technical proposal** Durable outbound intentions, deduplicated inbox and reconciliation recover external success without local commit. No distributed transaction. Workers require leases, retention and supervised operations.

**Consequences** New scope does not approve recipient, fees, deposits or refund policy. D-08–11 block live enablement. Design and tests can proceed using explicit fixture assumptions. ADR 001 stays demo-only; ADR 002 and 003 retain their stated statuses.
