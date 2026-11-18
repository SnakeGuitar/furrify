# ADR 002 · Functional architecture

English · [Español](002-functional-architecture.es.md)

**Status** Accepted by the user, implementation pending.

**Context** The local prototype needs a functional successor.

**Decision** Keep React, TypeScript and Vite. Use ASP.NET Core with C#, PostgreSQL, Docker and Compose. Organize one deployable backend as a modular monolith with Clean Architecture.

**Consequences** Modules protect capabilities and data. Domain remains independent of frameworks. Versions and additional libraries remain pending. ADR 001 stays scoped to the current demo.
