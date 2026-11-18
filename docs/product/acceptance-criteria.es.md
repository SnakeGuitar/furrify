# Trazabilidad

[English](acceptance-criteria.md) · Español

Los [requisitos](requirements.es.md) definen los criterios. Esta tabla indica dónde observarlos.

| ID | Punto de observación | Comprobación |
|---|---|---|
| RF-005 | Panel de consulta, adaptador en `src/catalog.ts` | `npm test` comprueba límites, unicidad y motivos. `npm run browser` recorre los cuatro casos en pantalla. |
| RNF-001 | Consola del navegador, `src/events.ts` | El recorrido de navegador comprueba eventos y correlación, errores inesperados y recuperación después de un fallo. |
| RNF-002 | `scripts/verify.mjs` y carpeta de ejecución | Consultar códigos, registros, huella y estados según la [guía de verificación](../agents/verification.es.md). |
| RF-001–004, RF-006–008 | Pantallas futuras | Pendientes de implementación y verificación. |
