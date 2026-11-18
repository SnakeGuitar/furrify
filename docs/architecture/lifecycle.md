# Proposed request lifecycle

English · [Español](lifecycle.es.md)

This design develops RN-008 and RN-009 and awaits D-05. Only RF-005 exists as a demo. Persistent lifecycle states remain unimplemented.

A buyer submits a complete request. Staff review and curate it. Publication moves it to awaiting permission or no match. With every required permission, staff can introduce the parties and record an outcome. Cancellation, reopening, expiry and post-publication changes need decisions. Every transition requires an authorized actor, expected revision and atomic write. Withdrawal blocks a future introduction and preserves the history of completed actions.

```mermaid
stateDiagram-v2
 [*] --> Submitted: buyer submits valid request
 Submitted --> InReview: staff starts review
 InReview --> Curating: staff accepts for matching
 Curating --> AwaitingPermission: staff publishes 1 to 3 eligible makers
 Curating --> NoMatch: staff records no compatible makers
 NoMatch --> Curating: staff resumes review - proposed
 AwaitingPermission --> Introduced: staff introduces with all required permissions
 Introduced --> Closed: staff records outcome
 NoMatch --> Closed: staff records no-match outcome - proposed
 AwaitingPermission --> Closed: staff records declined outcome - proposed
```

Permission is recorded per recommendation and recipient. AwaitingPermission persists while valid authorization is missing. The transition to Introduced requires deciding whether one introduction is sufficient or all recommendations must be resolved, pending D-05. The diagram illustrates the proposed option of at least one valid introduction.

## Proposed critical sequence
Validation failures create no submitted request. A publication conflict rolls back both shortlist and state. Module queries use in-process contracts.

```mermaid
sequenceDiagram
 actor Buyer
 participant API
 participant Requests
 actor Staff
 participant Matching
 participant Makers
 participant DB as PostgreSQL
 Buyer->>API: Submit request with authorized access
 API->>Requests: Validate actor, age policy and fields
 Requests->>DB: Commit submitted request
 DB-->>Requests: Commit confirmed
 Requests-->>API: Request reference
 API-->>Buyer: Request reference
 Staff->>API: Review with expected revision
 API->>Requests: Record review
 Requests->>DB: Commit review and state
 DB-->>Requests: Commit confirmed
 Requests-->>API: Updated review
 API-->>Staff: Review saved
 Staff->>API: Publish curated selection
 API->>Matching: Authorize staff and validate reasons
 Matching->>Makers: Check eligibility through contract
 Makers-->>Matching: Eligibility and revision
 Matching->>Requests: Transition through contract in shared transaction
 Requests->>DB: Write owned state in shared transaction
 Requests-->>Matching: State prepared
 Matching->>DB: Write recommendations and commit shared transaction
 DB-->>Matching: Commit confirmed
 Matching-->>API: Published revision
 API-->>Staff: Publication complete
 Buyer->>API: Read own published selection
 API->>Matching: ReadPublished with authorized context
 Matching-->>API: Published selection
 API-->>Buyer: Published selection
```

This lifecycle describes requests and introductions. Quote, order, attempt and refund have separate states in the [transactional model](commerce-model.md). Closed here does not automatically close an order.
