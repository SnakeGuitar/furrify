# Furrify requirements

English · [Español](requirements.es.md)

This is the authoritative human product specification. The current brief confirms the technology choices and supersedes the earlier optional-backend description. Proposals require approval in the [decision register](../humans/decisions.md).

## Purpose and scope

Furrify helps adult buyers find independent workshops for fursuits and accessories. Buyers describe requests and authorize introductions. Staff review requests, curate makers and record outcomes. Makers authorize display of profiles and works and supply availability information. Maker administration and its permissions remain undecided.

The transactional version adds quotes, orders, payments and refunds to the existing information, request, review, selection, profile and contact journey. RN-001 through RN-018 constrain these capabilities. Illustration commissions, social networking and the operations excluded by RN-011 are outside scope.

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
| RN-008 | Proposed lifecycle transitions require staff or buyer authority. Preserve the previous state on failure. Reopening and cancellation policies remain pending. | Proposed | RF-002, RF-003, RF-011, RF-008 |
| RN-009 | If no compatible maker is found, show that outcome without inventing a recommendation. Proposed staff review may resume selection later. Retry and notification policy await approval. | Proposed | RF-005, RF-011 |
| RN-010 | Record the introduction outcome with its author and time. Proposed categories are introduced, declined and no match. Closure and correction policies await approval. | Confirmed capability, proposed categories | RF-008 |
| RN-011 | Introduction scope expands to contracting and payments. Manufacturing, chat, advanced logistics, production tracking and delivery guarantees remain excluded. The earlier payments exclusion is superseded by the transactional brief. | Confirmed, scope updated | RF-001, RF-017 |
| RN-012 | Valid quotes fix scope, amount, currency, maker and expiry. Only their buyer can accept or reject an issued, unexpired revision. Changes require a new revision and acceptance. No exceptions approved. | Confirmed scope; policies pending | RF-014, RF-015 |
| RN-013 | An order preserves an accepted quote snapshot and one maker counterparty. Propose one active order per request, leaving other recommendations uncontracted. Multi-order policy pending. | Proposed, awaiting approval | RF-016 |
| RN-014 | Only the authorized buyer initiates order payment. Amount, currency and recipient derive from accepted terms and approved commercial model. Browser data cannot replace them. | Confirmed scope; policies pending | RF-017, RF-018 |
| RN-015 | Payment is confirmed only by authenticated provider evidence with verified correspondence. Approval and return are not a charge. Uncertainty retains the obligation without authorizing duplicate charging. | Confirmed scope; policies pending | RF-018, RF-019, RF-020 |
| RN-016 | Only an approved actor can authorize a refund, no greater than captured amount less completed or reserved refunds. Pending and uncertain refunds cannot be reported completed. Commercial policy pending. | Confirmed scope; policies pending | RF-021 |
| RN-017 | Order cancellation and refund are distinct decisions. Do not cancel while payment is uncertain. Deposits, cancellation effects and fees require human approval. | Proposed, awaiting approval | RF-022, RF-021 |
| RN-018 | Recommendation, introduction and order outcomes are recorded separately. Hiring one maker does not mark other recommendations contracted. Order closure does not imply Furrify manufacturing or delivery guarantees. | Confirmed scope; policies pending | RF-008, RF-023 |

## Functional requirements

Existing priorities are RF-001/006 Should I1, RF-002–005/007/009–013 Must I1 and RF-008 Should I1. RF-005 retains its implemented demo slice. V1 capabilities are proposed. Access preconditions refer to D-01 and D-02 in the human register. Authorization must be enforced by the server. An unresolved policy blocks final acceptance.

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


### Transactional journey

All capabilities below are proposed and unimplemented. See [journey design](../architecture/contracts.md) for UC and contracts.

| ID | Actor and precondition | Behavior and acceptance | Rules | Alternatives and errors | Priority / increment |
|---|---|---|---|---|---|
| RF-014 Issue quote | Maker authorized for a consent-shared request | Issue revision with scope, money, expiry and terms. Buyer can read that exact revision. | RN-012 | Reject invalid money, foreign access or concurrent revision. | Must / I2 |
| RF-015 Decide quote | Owning buyer, issued unexpired quote | Accept or reject an explicit revision. Repetition creates no new acceptance. Expired or superseded quotes cannot be accepted. | RN-012 | Revision or expiry conflict returns 409. | Must / I2 |
| RF-016 Create and read order | Buyer, valid acceptance and resolved commercial policy | Create order once from acceptance with snapshot. Reload preserves terms despite profile changes. Foreign data remains inaccessible. | RN-013 | Concurrent creation returns existing order or conflict without duplication. | Must / I2 |
| RF-017 Start payment | Owning buyer, payable order | Create attempt and begin provider approval for accepted obligation. Client cannot determine money or recipient. | RN-014 | Cancelled order, active charge or unenabled recipient blocks initiation. | Must / I3 |
| RF-018 Confirm capture | Backend, approved attempt with provider evidence | Capture and apply status only after matching ID, money and recipient. Approval alone remains unpaid. | RN-014, RN-015 | Timeout preserves Unknown, mismatch becomes Quarantined. | Must / I3 |
| RF-019 Process webhook | Authenticated provider, valid event | Store and apply event once. Invalid signatures cannot mutate business state. Old events cannot regress capture. | RN-015 | Verification or DB unavailability returns recoverable response. | Must / I3 |
| RF-020 Reconcile payment | Worker or authorized staff | Query external state for an uncertain operation. After restart recover capture without a second charge. | RN-015 | Exhausted retries escalate without inventing paid or failed outcomes. | Must / I3 |
| RF-021 Manage refund | Buyer requests, approved actor authorizes, backend executes | Request, authorize and refund with reserved amount. Show verified state and preserve order consistency. | RN-016, RN-017 | Excess, concurrency, uncertain capture and missing permission block execution. | Must / I4 |
| RF-022 Cancel order | Actor defined by policy D-09 | Evaluate approved policy, record reason and separate refund. Reject cancellation during uncertain charging. | RN-017 | Pending policy prevents enabling live cancellation. | Should / I4 |
| RF-023 Order outcome and incident | Parties or staff under approved permissions | Record order outcome and incident with author and time. Preserve separate introduction outcome. | RN-018 | Corrections retain audit history, foreign access rejected. | Should / I4 |

## Nonfunctional requirements

RNF-001–005/009–012 are Must. RNF-006–008 are Should with acceptance targets pending. Status expresses approval of the goal. Implementation and evidence are separate in the [acceptance map](acceptance-criteria.md). Operational figures await D-07.

| ID and attribute | Scenario and verifiable criterion | Method | Status |
|---|---|---|---|
| RNF-001 Observability | Local scenarios distinguish success, empty, controlled error and invalid input with correlated events containing no input content. | Inspect events and browser assertions. | Confirmed |
| RNF-002 Automated verification | Every executed check records its exit code and source revision. Failed or skipped checks cannot appear as passed. | Inspect verifier report and exercise a failed check during future harness changes. | Confirmed |
| RNF-003 Authorization | Every protected endpoint checks actor and resource ownership. Cross-buyer access and unauthorized staff writes are rejected. | API integration tests for anonymous, buyer and staff roles. | Confirmed |
| RNF-004 Privacy | Logs exclude personal data, tokens, references and form bodies. Contact disclosure obeys RN-007. Retention and deletion policy pending. | Inspect logs and test consent enforcement. | Confirmed principle |
| RNF-005 Integrity | A failed or concurrent publication cannot leave partial recommendations or more than three makers. Committed requests survive API restart. | PostgreSQL integration tests with rollback, concurrency and restart. | Confirmed |
| RNF-006 Accessibility | Proposed WCAG 2.2 AA target for keyboard, names, focus, status announcements and contrast on core flows. | Manual keyboard and screen reader review plus automated audit. Formal target approval pending. | Proposed |
| RNF-007 Usability | Core tasks work on narrow and wide screens with readable errors, retry and no horizontal form overflow. Device matrix pending. | Responsive walkthrough using the agreed device matrix. | Proposed |
| RNF-008 Performance | Acceptance is blocked until D-07 defines dataset, load, percentile budgets and maximum error rate. Once approved, every measured metric must meet those budgets. | Record load profile and percentile measurements against approved budgets. | Pending |
| RNF-009 Recovery | Restore database and authorized media into a clean environment and demonstrate record consistency. Backup frequency, RPO and RTO pending. | Documented restore rehearsal and failed-dependency tests. | Proposed |
| RNF-010 Maintainability | Module internals are accessed through contracts. Domain has no ASP.NET Core, ORM or database dependency. | Dependency review and future architecture checks. | Confirmed |
| RNF-011 Reproducibility | A clean checkout uses pinned dependencies and documented settings to reproduce fixtures and checks without private accounts for ordinary checks; real Sandbox is a separate credentialed suite. | Clean-environment walkthrough. | Confirmed |
| RNF-012 Container deployment | Compose starts frontend, API and PostgreSQL with readiness checks. Recreating the database container preserves committed data in its volume. | Future Compose startup, restart and recreation acceptance exercise. | Confirmed |

## Additional transactional qualities

All proposed, Must priority, targeting I3–I4.

| ID | Scenario and criterion | Method and assumptions |
|---|---|---|
| RNF-013 | Concurrent or retried acceptance, capture and refund produce one business effect and cannot overcharge or over-refund. | Real PostgreSQL integration with barriers and replay, deterministic external adapter. Commercial policy fixed for fixture. |
| RNF-014 | Every external intention survives restart; verified provider success converges to local state or visible reconciliation block. | Crash after provider success, restart worker and assert one capture and correct order. Retry limits are proposed test configuration. |
| RNF-015 | External notifications cannot mutate state before authenticity and correspondence checks. | Invalid signature, foreign recipient, wrong amount/currency and out-of-order tests. Real delivery remains a separate Sandbox gate. |

Extended glossary. Quote is a versioned offer with expiry. Order is an accepted agreement whose terms are immutable. Payment attempt tracks one charging execution. Capture is a verified monetary fact. Refund is a separate return of funds. Introduction and order outcomes are independent facts.
