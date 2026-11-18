# Matriz de aceptación

[English](acceptance-criteria.md) · Español

Los [requisitos](requirements.es.md) son la fuente autoritativa. “Propuesto” indica pendiente de implementación, “implementado” indica código inspeccionado y “verificado” exige una ejecución identificada. Esta tarea solo revisa documentación. No renueva evidencia histórica.

| RN | RF / RNF | Módulo responsable | Método de aceptación | Estado |
|---|---|---|---|---|
| RN-001, RN-002 | RF-002, RNF-003/004 | Requests, Access | Edad según política, validación de campos y acceso cruzado rechazado | Propuesto |
| RN-003 | RF-006/013, RNF-004 | Makers | Revocar obra y comprobar que desaparece | Propuesto |
| RN-004–006 | RF-004/011, RNF-005 | Matching, Makers | Publicación atómica, límite tres y revisión de elegibilidad | Propuesto |
| RN-005, RN-009 | RF-005, RNF-001 | Matching, UI | Demo FUR-101, FUR-000, FUR-503 e inválido | Demo implementada, V1 propuesta |
| RN-007 | RF-007/009/012, RNF-003/004 | Matching, Access | Denegar acceso ajeno y contacto sin permisos | Propuesto |
| RN-008 | RF-003/010/011, RNF-005 | Requests, Matching, Access | Transiciones autorizadas y conflicto concurrente | Propuesto |
| RN-010 | RF-008, RNF-005 | Matching | Resultado persiste con autor y fecha | Propuesto |
| RN-011 | RF-001 | UI | Revisar límites en página de servicio | Propuesto |
| Transversal | RNF-001/002/011 | Arnés local | Eventos, códigos de salida y manifiesto fuente | Implementado |
| Transversal | RNF-006/007/008 | UI, API | Auditoría accesible, dispositivos y medición de carga | Propuesto, objetivos pendientes |
| Transversal | RNF-009/010/012 | Infraestructura | Restauración, dependencias y recreación de contenedor | Propuesto |

Comandos actuales y formato de evidencia en la [guía](../agents/verification.es.md). Las pruebas futuras descritas aquí carecen todavía de scripts de backend o Compose.
