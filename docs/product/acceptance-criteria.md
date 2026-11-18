# Acceptance map

English · [Español](acceptance-criteria.es.md)

The [requirements](requirements.md) are authoritative. “Proposed” means awaiting implementation, “implemented” means inspected code and “verified” requires an identified execution. This task reviews documentation only and does not refresh historical evidence.

| RN | RF / RNF | Responsible module | Acceptance method | Status |
|---|---|---|---|---|
| RN-001, RN-002 | RF-002, RNF-003/004 | Requests, Access | Approved age policy, field validation and cross-owner rejection | Proposed |
| RN-003 | RF-006/013, RNF-004 | Makers | Revoke a work and confirm disappearance | Proposed |
| RN-004–006 | RF-004/011, RNF-005 | Matching, Makers | Atomic publication, three-maker limit and eligibility check | Proposed |
| RN-005, RN-009 | RF-005, RNF-001 | Matching, UI | Demo FUR-101, FUR-000, FUR-503 and invalid input | Demo implemented, V1 proposed |
| RN-007 | RF-007/009/012, RNF-003/004 | Matching, Access | Reject another owner's access and contact without permission | Proposed |
| RN-008 | RF-003/010/011, RNF-005 | Requests, Matching, Access | Authorized transitions and concurrent update conflicts | Proposed |
| RN-010 | RF-008, RNF-005 | Matching | Persist outcome with author and time | Proposed |
| RN-011 | RF-001 | UI | Review service-page boundaries | Proposed |
| Cross-cutting | RNF-001/002/011 | Local harness | Events, exit codes and source manifest | Implemented |
| Cross-cutting | RNF-006/007/008 | UI, API | Accessibility review, device coverage and load measurements | Proposed, targets pending |
| Cross-cutting | RNF-009/010/012 | Infrastructure | Restore, dependency checks and container recreation | Proposed |

Existing commands and evidence format are in the [guide](../agents/verification.md). Future tests described here have no backend or Compose scripts yet.
