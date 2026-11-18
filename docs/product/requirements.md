# Furrify requirements

English · [Español](requirements.es.md)

This is the authoritative human product specification. The current brief confirms the technology choices and supersedes the earlier optional-backend description. Proposals require approval in the [decision register](../humans/decisions.md).

## Purpose and scope

Furrify helps adult buyers find independent workshops for fursuits and accessories. Buyers describe requests and authorize introductions. Staff review requests, curate makers and record outcomes. Makers authorize display of profiles and works and supply availability information. Maker administration and its permissions remain undecided.

The first functional version covers service information, requests, internal review, manual selection, publication, authorized profiles, contact permission and outcomes. RN-001 through RN-011 constrain these capabilities. Illustration commissions, social networking and the operations excluded by RN-011 are outside scope.

The current prototype only looks up two fictional workshops using local codes, with empty, error and invalid states. The full functional version remains proposed. “Implemented” describes inspected code. “Verified” requires evidence from a specific execution, which this documentation review does not produce.

## Glossary

- Maker or workshop means the independent manufacturer.
- Request means a buyer need awaiting review.
- Recommendation means a justified maker suggestion.
- Introduction means the permission and connection process between parties.
- Portfolio means works authorized for display.
- Staff means the internal team with review permissions.

## Business rules

Confirmed rules originate in the user's brief. Proposed rules are design recommendations. Each statement contains its conditions and constraints. Additional exceptions have not been approved.

| ID | Condition and constraint | Source and status | RF |
|---|---|---|---|
| RN-001 | Adult buyers only. Before accepting a request, establish adulthood under a policy still to be approved. A declaration records an assertion, not effective age verification. | Confirmed scope, pending method | RF-002 |
| RN-002 | A submitted request needs product, budget, references, country, language and deadline. Required formats, currency and treatment of missing references await approval. | Confirmed fields, pending validation | RF-002 |
| RN-003 | Publish profiles and portfolio items only with the owner's authorization. Evidence and revocation procedures await approval. | Confirmed | RF-006, RF-013 |
| RN-004 | During curation, staff manually select at most three distinct makers per request. No exception to the limit is defined. | Confirmed | RF-004, RF-011 |
| RN-005 | Each published recommendation must explain why the maker suits the request. Publication requires a nonempty justification. | Confirmed | RF-004, RF-005, RF-011 |
| RN-006 | Before publication, check maker eligibility and availability. Proposed checks cover authorized profile, relevant product and current availability. Criteria and recheck frequency need approval. | Proposed | RF-004, RF-011 |
| RN-007 | Before sharing contact details or initiating an introduction, obtain authorization for the intended recipient and data. Required parties, expiry and withdrawal handling remain undecided. | Confirmed principle, pending policy | RF-007, RF-012 |
| RN-008 | Proposed lifecycle transitions require staff or buyer authority and an expected record revision. Preserve the previous state on failure. Reopening and cancellation policies remain pending. | Proposed | RF-002, RF-003, RF-011, RF-008 |
| RN-009 | If no compatible maker is found, show that outcome without inventing a recommendation. Proposed staff review may resume selection later. Retry and notification policy await approval. | Proposed | RF-005, RF-011 |
| RN-010 | Record the introduction outcome with its author and time. Proposed categories are introduced, declined and no match. Closure and correction policies await approval. | Confirmed capability, proposed categories | RF-008 |
| RN-011 | The pilot connects buyers and makers. It excludes manufacturing, handling funds, payments, chat, production tracking and delivery guarantees. | Confirmed | RF-001 |

## Functional requirements

All have high priority and target V1 except the RF-005 demo slice. V1 capabilities are proposed. Access preconditions refer to D-01 and D-02 in the human register. Authorization must be enforced by the server. An unresolved policy blocks final acceptance.

| ID and name | Actor and precondition | Behavior and observable result | Rules | Errors and exceptions | Implementation |
|---|---|---|---|---|---|
| RF-001 Service information | Visitor, public access | Explain roles and exclusions before starting a request. Acceptance review finds all RN-011 boundaries on the service page. | RN-011 | Unavailable content shows a recoverable error. | Proposed |
| RF-002 Create request | Adult buyer, age and access policy satisfied | Validate six input groups, then persist and return a request reference. Rejected input identifies fields and creates no submitted record. | RN-001, RN-002, RN-008 | Invalid fields, failed persistence or retry must preserve consistency. | Proposed |
| RF-003 Review request | Staff, authorized access and submitted request | Open details, record review and move to the allowed next state. Refresh shows saved review and author. | RN-008 | Stale revision rejects the change and offers reload. | Proposed |
| RF-004 Curate makers | Staff, request under review | Save distinct makers with reasons. A fourth maker or blank reason is rejected. Refresh preserves the accepted selection. | RN-004, RN-005, RN-006 | Unavailable or ineligible makers require review. | Proposed |
| RF-005 Read recommendations | Buyer authorized for this request, published selection | Show published makers and reasons, or the explicit no-match outcome. Drafts are inaccessible. Demo FUR-101 shows two fictional workshops. | RN-005, RN-009 | Missing access, unknown request, empty selection and adapter errors have distinct handling. | Demo implemented, V1 proposed |
| RF-006 Read profiles | Visitor or authorized buyer, publication permission | Display only authorized profiles and works. Revoked items disappear from subsequent reads. | RN-003 | Withdrawn or unknown profile is unavailable. | Proposed |
| RF-007 Authorize contact | Required parties identified by approved policy | Record grant or refusal for a recipient and a defined set of data. Declining leaves contact data undisclosed. | RN-007 | Missing or withdrawn authorization prevents introduction. | Proposed |
| RF-008 Record outcome | Staff, request in a state approved for closure | Persist an approved outcome category, author and time. Reload shows the recorded outcome. | RN-008, RN-010 | Invalid transition or conflicting update rejected. | Proposed |
| RF-009 Read own request | Buyer with chosen access mechanism | Retrieve own request and visible status. Another buyer's reference cannot disclose details. | RN-007, RN-008 | Expired access follows the approved recovery policy. | Proposed |
| RF-010 Internal access | Staff identity provisioned through approved method | Authenticate and authorize review operations. Anonymous and buyer sessions cannot perform staff actions. | RN-008 | Expired sessions require authentication, with no unauthorized write. | Proposed |
| RF-011 Publish selection | Staff, reviewed request and eligibility checks complete | Atomically publish 1–3 justified recommendations or explicit no-match result. Buyers see the complete published revision. | RN-004, RN-005, RN-006, RN-008, RN-009 | Conflicts, missing reasons or invalid eligibility abort publication. | Proposed |
| RF-012 Make introduction | Staff, valid permissions for all required parties | Share only approved contact details with the approved recipient and record the introduction. Retry avoids duplicate recorded introductions. | RN-007, RN-010 | Permission change or delivery failure must not be recorded as successful contact. | Proposed |
| RF-013 Maintain maker records | Authorized operator, ownership policy approved | Record maker profile, portfolio permission and availability. Withdraw publication permission and subsequent reads hide affected content. | RN-003, RN-006 | Unknown owner or missing permission prevents publication. | Proposed |

## Nonfunctional requirements

All have high priority. Status expresses approval of the goal. Implementation and evidence are separate in the [acceptance map](acceptance-criteria.md). Operational figures await D-07.

| ID and attribute | Scenario and verifiable criterion | Method | Status |
|---|---|---|---|
| RNF-001 Observability | Local scenarios distinguish success, empty, controlled error and invalid input with correlated events containing no input content. | Inspect events and browser assertions. | Confirmed |
| RNF-002 Automated verification | Every executed check records its exit code and source revision. Failed or skipped checks cannot appear as passed. | Inspect verifier report and exercise a failed check during future harness changes. | Confirmed |
| RNF-003 Authorization | Every protected endpoint checks actor and resource ownership. Cross-buyer access and unauthorized staff writes are rejected. | API integration tests for anonymous, buyer and staff roles. | Confirmed |
| RNF-004 Privacy | Logs exclude personal data, tokens, references and form bodies. Contact disclosure obeys RN-007. Retention and deletion policy pending. | Inspect logs and test consent enforcement. | Confirmed principle |
| RNF-005 Integrity | A failed or concurrent publication cannot leave partial recommendations or more than three makers. Committed requests survive API restart. | PostgreSQL integration tests with rollback, concurrency and restart. | Confirmed |
| RNF-006 Accessibility | Proposed WCAG 2.2 AA target for keyboard, names, focus, status announcements and contrast on core flows. | Manual keyboard and screen reader review plus automated audit. Formal target approval pending. | Proposed |
| RNF-007 Usability | Core tasks work on narrow and wide screens with readable errors, retry and no horizontal form overflow. Device matrix pending. | Responsive walkthrough using the agreed device matrix. | Proposed |
| RNF-008 Performance | Measure request and portfolio reads under an agreed dataset and load. Latency and concurrency budgets require approval before acceptance. | Record load profile and percentile measurements against approved budgets. | Pending |
| RNF-009 Recovery | Restore database and authorized media into a clean environment and demonstrate record consistency. Backup frequency, RPO and RTO pending. | Documented restore rehearsal and failed-dependency tests. | Proposed |
| RNF-010 Maintainability | Module internals are accessed through contracts. Domain has no ASP.NET Core, ORM or database dependency. | Dependency review and future architecture checks. | Confirmed |
| RNF-011 Reproducibility | A clean checkout uses pinned dependencies and documented settings to reproduce fixtures and checks without private accounts. | Clean-environment walkthrough. | Confirmed |
| RNF-012 Container deployment | Compose starts frontend, API and PostgreSQL with readiness checks. Recreating the database container preserves committed data in its volume. | Future Compose startup, restart and recreation acceptance exercise. | Confirmed |
