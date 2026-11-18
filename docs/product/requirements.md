# Pilot requirements

English · [Español](requirements.es.md)

This English page is the source of truth for scope and acceptance. The repository started empty, and the pilot brief supplied the product requirements. High priority describes the pilot as a whole. The status column identifies the current implementation.

| ID | Actor | Priority | Behavior and observable acceptance criterion | Status | Source or assumption |
|---|---|---|---|---|---|
| RF-001 | Adult visitor | High | Understand the service. The full landing page explains the roles of the buyer, maker and Furrify. | Proposed | Confirmed. |
| RF-002 | Adult buyer | High | Submit a request with product, budget, references, country, language and deadline. The team can retrieve it for review. | Proposed | Confirmed. Age verification method pending. |
| RF-003 | Internal team | High | Open a received request and record its review in the dashboard. | Proposed | Confirmed. Review states pending. |
| RF-004 | Internal team | High | Manually assign up to three makers and one reason per maker. The dashboard prevents adding a fourth. | Proposed | Confirmed. |
| RF-005 | Buyer | High | Look up a sample shortlist. Two workshops appear with distinct reasons. An empty shortlist shows a message. | Implemented | Justified recommendations confirmed. Codes and fictional data are demo assumptions. |
| RF-006 | Buyer and maker | High | Open a profile and see only portfolio items authorized by their owner. | Proposed | Confirmed. Authorization procedure pending. |
| RF-007 | Parties involved | High | Request permission before making contact and record the response. | Proposed | Confirmed. Responsibility for authorizing each shared detail is pending. |
| RF-008 | Internal team | High | Record and retrieve the outcome of an introduction. | Proposed | Confirmed. Outcome categories pending. |
| RNF-001 | Developer | High | Reproduce success, empty results, failure and invalid input locally. Each attempt has correlated events that omit form content. | Implemented | Local verification confirmed. |
| RNF-002 | Developer | High | Run checks with traceable results. A failure produces a nonzero exit code and appears in the report. | Implemented | Local evidence confirmed. |

The pilot excludes payments, handling funds, chat, production tracking, manufacturing and delivery guarantees. Manual selection is sufficient. The demo uses fictional records throughout.
