# Human decision register

English · [Español](decisions.es.md)

## Confirmed by the user
React + TypeScript + Vite, ASP.NET Core with C#, PostgreSQL, Docker and Docker Compose, a modular monolith and Clean Architecture. Manual selection of up to three makers and the scope in the [requirements](../product/requirements.md). ADR 002 records these choices. Current frontend versions are in package-lock.json. Backend, image, ORM, authentication and migration versions remain pending.

## Technical recommendations
Explicit internal contracts, a shared publication transaction and module-owned schemas are design proposals in the [architecture](../architecture/overview.md). ADR 003 describes the consequences. Validate them before implementation.

## Outstanding decisions by impact
Each row identifies the question, need, options, recommendation and effect of deferral. No option in this table has been approved.

| ID | Question and reason | Options and recommendation | Effect of deferral |
|---|---|---|---|
| D-01 | How does a buyer access a request and recover access? Personal data needs protection. | Account, temporary access link or code with a separate secret. Evaluate temporary links with defined recovery to reduce friction. The public demo code is insufficient. | Blocks buyer identity contracts and RF-002/009 acceptance. |
| D-02 | How is adult participation established and staff access protected? | Declaration, additional age verification or a provider. For staff, managed identity or own credentials. Evaluate managed identity and minimal retained age data. Human validation required. | Blocks age policy and real-request security. |
| D-03 | Who maintains makers and proves or revokes work permissions? | Delegated staff or self-service. Propose staff management during the pilot with evidence per work. | Blocks real publication and RF-006/013. |
| D-04 | Who authorizes which data, for whom and for how long, and how is contact made? | Mutual permission or permission per disclosure. Propose explicit recipient and published-revision consent, initially with manual introduction. Decide withdrawal, delivery failure and already shared data handling. | Blocks live RF-007/012 contact. |
| D-05 | Which states and outcomes does the team accept? | Approve or adjust lifecycle, closure after one introduction or all recommendations resolved, reopening, cancellation and expiry. Review real pilot cases before fixing policy. | Blocks definitive transitions and RF-008/011. |
| D-06 | What makes a request complete and a maker compatible and available? | Require references or allow description, explicit currency, date or range. Maker-confirmed or staff-reviewed availability. Recommend explicit units and review evidence. | Blocks final RF-002/004 validation. |
| D-07 | Which operational goals and data policies are approved? | Define devices, WCAG target, load, latency, RPO/RTO, backups, retention, deletion and media storage. Measure the pilot and rehearse restore before fixing figures. | Blocks quantitative RNF-006–009 acceptance and real-data deployment. |

## Consolidation in this review
The formerly optional backend becomes confirmed. ADR 001 is scoped to the local prototype. RF-001–008 and RNF-001–002 retain their meaning and IDs with expanded acceptance. RF-009–013 separate owner lookup, staff access, publication, introduction and maker maintenance. Demo implementation and V1 proposal statuses are distinct. One human register centralizes unresolved policy.

## Confirmed transactional change

The current brief includes contracting and payments with real PayPal Sandbox integration. It supersedes the earlier payments exclusion. No monetization mechanism is approved. [ADR 004](../architecture/decisions/004-transactional-scope.md).

## New decision priority

D-08, D-09 and D-10 precede financial enablement; D-01/02 and D-11 precede real access. D-03/04/05/06/07 remain applicable.

| ID | Question | Options and recommendation | Consequences, blockers and work allowed |
|---|---|---|---|
| D-08 | Who receives funds and what fee applies? | A maker without fee, B maker with fee, C Furrify with transfer. Recommend validating A first without commercial approval. | Affects order recipient, onboarding and adapter; blocks live charging and production. Contracts/fake can use explicit A fixtures. |
| D-09 | Full payment or deposits, which currencies, cancellation and amendments? | Full payment or obligation schedule; recommend full payment only as initial fixture. Decide expiry, bounds, rounding and amendment effects. | Blocks real agreement and final RF-014–018/022 acceptance; obligation model and snapshots can proceed. |
| D-10 | Who authorizes refunds and handles fees, incidents and disputes? | Maker, delegated staff or joint review. Recommend explicit authorization separate from request. | Blocks live RF-021/023 and operations; reservations, idempotency and fictional-policy Sandbox can proceed. |
| D-11 | How is maker identity established and what can they view/issue? | Own account or delegated staff, maker-scoped roles. Recommend explicit identity and only consent-shared request access. | Blocks real data and effective quoting; contracts and permission tests can proceed. |
| D-12 | Can one request hire several makers? | One active order or several per product. Propose one active order for first journey. | Affects uniqueness and outcomes; tests can use explicit single-order assumption without marking other recommendations contracted. |
