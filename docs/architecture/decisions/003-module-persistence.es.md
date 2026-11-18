# ADR 003 · Persistencia por módulo

[English](003-module-persistence.md) · Español

**Estado** Propuesta técnica, sin aprobación.

**Contexto** Recomendaciones y estado deben publicarse de forma consistente dentro del monolito.

**Decisión propuesta** Una base PostgreSQL, esquemas propios por módulo, FKs coordinadas y transacción compartida por contratos para publicar. Módulos sin acceso directo a tablas ajenas.

**Consecuencias** Protege propiedad lógica y permite atomicidad. Acopla orden de migraciones y unidad transaccional. Requiere prueba de integración antes de validación. Una alternativa es un esquema único con propiedad por tablas, preservando los mismos contratos. El detalle está en la [arquitectura](../overview.es.md).
