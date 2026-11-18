# Current and target architecture

English · [Español](overview.es.md)

## Current state
React, TypeScript and Vite display a fictional shortlist. `src/main.tsx` handles UI states, `src/catalog.ts` normalizes codes and reads asynchronous fixtures, and `src/events.ts` emits local events. State lives in memory. Existing scripts check types, domain behavior, build and browser flows. Demo codes are not credentials.

## Target context and containers
Buyers browse and submit, staff review and introduce, and makers authorize their public content. Furrify ends at the introduction and its outcome. The production agreement belongs to buyer and maker.

The confirmed stack is React + TypeScript + Vite, ASP.NET Core with C#, PostgreSQL, Docker and Docker Compose. One modular monolith backend applies Clean Architecture. Backend and container versions and additional libraries remain pending.

```mermaid
flowchart LR
 Buyer -->|HTTPS| Web[React frontend]
 Staff -->|HTTPS| Web
 Maker -->|authorizes content through approved process| Staff
 Web -->|HTTP JSON| API[ASP.NET Core API]
 API -->|SQL| DB[(PostgreSQL)]
```

This diagram describes target actors and runtime boundaries. Maker authorization does not imply an approved self-service account.


```mermaid
flowchart LR
 Buyer[Adult buyer] -->|describes need and grants permission| Furrify
 Staff[Internal staff] -->|reviews and curates| Furrify
 Maker[Independent maker] -->|authorizes profile and works| Furrify
 Furrify -->|publishes justified recommendations| Buyer
 Furrify -->|authorized introduction| Maker
 Buyer <-->|production agreement outside Furrify| Maker
```

## Modules and ownership
| Module | Owned data | Operations and contracts |
|---|---|---|
| Makers | Profile, works, publication permissions, availability | Read authorized profile, check eligibility and maintain content through an operator to be decided. |
| Requests | Buyer request, owner, review, status and concurrency revision | Create, read, review and apply allowed transitions. |
| Matching | Recommendations, reasons, published revision, contact permissions, introduction and outcome | Curate, publish, authorize, introduce and close. Ask Makers for eligibility and Requests for transitions. |
| Access | Staff identities and permissions, buyer access binding according to D-01 | Resolve actor and permissions. Credentials depend on the selected mechanism. |

The following arrows represent in-process application contract calls.

```mermaid
flowchart LR
 API[API composition] -->|resolve actor| Access
 API -->|request use cases| Requests
 API -->|matching use cases| Matching
 API -->|profile use cases| Makers
 Matching -->|eligibility query contract| Makers
 Matching -->|transition contract| Requests
```

Each module exposes explicit contracts and hides entities and persistence. Requests and Makers do not depend on Matching. Access supplies identity to the API, which passes actor context to the use case. Module calls stay in process. Direct reads and writes to another module's tables are prohibited.

## Clean Architecture
Arrows represent compile-time dependencies. At runtime, application code invokes a port whose infrastructure implementation accesses PostgreSQL.

```mermaid
flowchart LR
 API[API composition and HTTP] -->|calls| App[Application use cases and ports]
 API -->|registers adapters| Infra[Infrastructure]
 Infra -->|implements ports| App
 App -->|uses invariants| Domain[Domain]
 Infra -->|maps entities| Domain
```

Domain contains entities and business invariants with no web framework, ORM or PostgreSQL dependencies. Application coordinates use cases and defines persistence ports and module contracts. Infrastructure implements ports and migrations. API validates transport, authenticates, maps errors and composes dependencies.

Proposed structure for later implementation, using separate projects where they protect boundaries.

```text
frontend/                         React application, move only when useful
backend/Furrify.Api/               HTTP and composition root
backend/Modules/{Makers,Requests,Matching,Access}/
  <Module>.Domain/
  <Module>.Application/           public module contracts and ports
  <Module>.Infrastructure/
tests/                            domain, integration and end-to-end
```

This structure is a proposal. CQRS, MediatR, event sourcing, generic repositories and buses require a later concrete need.

## Persistence and integrity
One PostgreSQL database with makers, requests, matching and access schemas is proposed. Each module owns schema migrations. A controlled migration step runs before API replicas and records versions. Test upgrades from the previous release and restore a backup after an irreversible migration. ORM and migration tool choices remain pending.

One transaction per command protects invariants. Publication updates the shortlist and request state through contracts sharing a transaction scope. Requests retains ownership of its writes. Failed eligibility or transactions publish nothing. Optimistic revisions reject stale updates. Unique request-maker keys prevent duplicates. Proposed cross-schema foreign keys prevent orphan references. They couple migration ordering and require coordination while preserving table ownership.

The following conceptual model is proposed. Prefixes identify owners. Requests owns status, Matching owns recommendations and outcomes. Contact permission binds a recipient and published revision.

```mermaid
erDiagram
 AccessActor ||--o{ RequestsRequest : owns
 RequestsRequest ||--o{ RequestsReview : records
 RequestsRequest ||--o{ MatchingRecommendation : receives
 MakersMaker ||--o{ MakersWork : authorizes
 MakersMaker ||--o{ MatchingRecommendation : selected
 MatchingRecommendation ||--o{ MatchingPermission : requires
 MatchingRecommendation ||--o| MatchingIntroduction : permits
 RequestsRequest ||--o| MatchingOutcome : closes
 RequestsRequest {
  uuid id
  uuid ownerId
  string status
  int revision
 }
 MatchingRecommendation {
  uuid requestId
  uuid makerId
  string reason
  int publishedRevision
 }
 MatchingPermission {
  uuid recipientId
  string dataScope
  string decision
  int publishedRevision
 }
```

AccessActor is a logical identity which may be resolved without a permanent buyer account under D-01. Each permission decision preserves evidence of grant or refusal. MatchingIntroduction is created only after all policy-required permissions are checked. Works and publication permissions need author, time and evidence.

## API and operation
Proposed HTTP resources depend on approved access policies.

| HTTP | Resource |
|---|---|
| GET | /makers, /makers/{id}, /service |
| POST, GET | /requests, /requests/{id} |
| POST | /requests/{id}/reviews |
| PUT | /requests/{id}/recommendations |
| POST | /requests/{id}/publication |
| POST | /recommendations/{id}/permissions |
| POST | /recommendations/{id}/introductions |
| PUT | /requests/{id}/outcome |
| PUT | /makers/{id}, /makers/{id}/works/{workId} |

Staff request lists and maker lists need pagination with a configurable maximum, stable ordering and a cursor or page decision. Enforce public, owner and staff permissions per operation. Staff authentication is mandatory. Provider and session choices are pending. Validate at API and application boundaries and enforce domain invariants. Return 400 for invalid input, 401 for missing authentication, 403 for insufficient permission, 404 under the chosen disclosure policy and 409 for conflicts. Use consistent error bodies with stable codes and correlation, excluding internal details.

Proposed idempotency keys protect creation and introduction retries. Failed external delivery remains pending or failed and cannot count as a completed introduction. D-04 determines the contact channel. Do not hold database transactions open during external delivery.

Separate liveness from readiness checks for database connectivity and applied migrations. Structured logs include timestamp, level, event and correlation. Exclude personal data, references, secrets and tokens. Validate configuration at startup, supply secrets through environment or a deployment secret manager, and exclude local secret files from Git. Back up the database and externally stored works, rehearse restore and agree RPO/RTO.

Future domain tests check business rules. PostgreSQL integration tests check foreign keys, migrations, transactions and concurrency. API tests check authorization and full journeys cover submission through outcome. Local fixtures remain reproducible UI scenarios. See RNF and the acceptance map.

## Docker design
The frontend container serves static assets, with a proposed same-origin API proxy. The API container runs the monolith and alone connects to PostgreSQL over a private Compose network. Publish frontend/API HTTP according to the proxy and environment. PostgreSQL stays internal. A named volume for its data directory preserves records when recreating the container. Removing volumes is a separate destructive operation.

Proposed variables include public URL, database connection, database credentials and identity settings. Vite build variables are public and must exclude secrets. Startup requires database readiness, applied migrations and API readiness before serving operations. Startup ordering alone does not guarantee readiness. Development may mount source and use reload. Deployment uses immutable images, TLS and managed secrets. Image versions, media storage and deployment platform remain pending. This task documents the design only.

## Transition
Approve access, age and consent policies first. Then implement modules and persistence with migrations and authorization tests, replace the local adapter with HTTP while preserving UI states, and prepare containers and restore exercises. Preserve the fictional journey as fixtures. Backend, database and containers remain unimplemented. See [decisions](../humans/decisions.md) and [lifecycle](lifecycle.md).
