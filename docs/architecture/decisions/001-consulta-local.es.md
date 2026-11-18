# ADR 001 · Selección manual en memoria

[English](001-consulta-local.md) · Español

**Estado** Aceptada.

**Contexto** El repositorio comienza vacío. La entrega necesita comprobar una transición de producto sin cuentas ni servicios.

**Decisión** Usar React, Vite y TypeScript con una consulta asíncrona de selecciones predefinidas. Un código de demostración determina el caso reproducible.

**Consecuencias** La interfaz permite ensayar carga, recuperación y resultados con los mismos datos en cada ejecución. Quedan pendientes la revisión real, el almacenamiento y el control de acceso antes de usar información personal.

Esta decisión se limita al prototipo local. La arquitectura funcional confirmada se define en [ADR 002](002-functional-architecture.es.md).
