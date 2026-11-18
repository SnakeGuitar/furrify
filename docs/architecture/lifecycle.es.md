# Ciclo de vida propuesto

[English](lifecycle.md) · Español

Este diseño desarrolla RN-008 y RN-009 y requiere D-05. Solo RF-005 existe como demo. No hay estados persistentes implementados.

El comprador envía una solicitud completa. El personal revisa y prepara una selección. Publicar pasa a espera de autorización o a sin compatibilidad. Con todos los permisos requeridos, el personal puede presentar y registrar el resultado. Falta decidir cancelación, reapertura, caducidad y cambios después de publicación. Cada transición exige actor autorizado, revisión esperada y escritura atómica. Retirar un permiso bloquea una presentación futura y no borra el historial de hechos ya realizados.

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

La autorización se registra por recomendación y destinatario. AwaitingPermission permanece mientras falte autorización válida. La transición a Introduced requiere definir si basta una presentación o deben resolverse todas las recomendaciones, pendiente en D-05. El diagrama ilustra la opción propuesta de al menos una presentación válida.

## Secuencia crítica propuesta
Errores de validación no crean solicitud enviada. Un conflicto en publicación revierte tanto selección como estado. Las consultas a otros módulos usan contratos dentro del proceso.

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

Este ciclo describe solicitud y vinculación. Cotización, pedido, intento y devolución tienen estados separados en el [modelo transaccional](commerce-model.es.md). Closed aquí no cierra automáticamente un pedido.
