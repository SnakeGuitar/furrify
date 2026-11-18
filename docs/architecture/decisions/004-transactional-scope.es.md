# ADR 004 · Alcance transaccional y recuperación

[English](004-transactional-scope.md) · Español

**Estado** Alcance y PayPal Sandbox confirmados por usuario. Mecanismos técnicos propuestos.

**Contexto** El piloto excluía pagos y terminaba en vinculación. El encargo actual exige cotización, contratación, pago y devolución.

**Decisión** Sustituir exclusión de pagos de RN-011 sin reciclar su ID. Conservar monolito y añadir Contracting y Payments. Separar entidades y estados. Usar PayPal Sandbox real para validar adaptador, con falso determinista en pruebas habituales.

**Propuesta técnica** Intenciones salientes durables, inbox deduplicado y conciliación resuelven éxito externo sin commit local. Sin transacción distribuida. Worker requiere leases, retención y operación supervisada.

**Consecuencias** Nuevo alcance no aprueba receptor, comisiones, anticipos ni políticas de devolución. D-08–11 bloquean habilitación real. Diseño y pruebas pueden avanzar con supuestos de fixture explícitos. ADR 001 se mantiene solo para demo; ADR 002 y 003 siguen vigentes dentro de sus estados.
