# ADR 001 · Keep manual shortlists in memory

English · [Español](001-consulta-local.es.md)

**Status** Accepted.

**Context** The repository started empty. The first delivery needs a reproducible product interaction that runs without accounts or external services.

**Decision** Use React, Vite and TypeScript with an asynchronous lookup of predefined shortlists. A demo code selects the scenario.

**Consequences** Developers can exercise loading, recovery and results with the same data on each run. Live reviews, persistence and access control are prerequisites for handling personal information.
