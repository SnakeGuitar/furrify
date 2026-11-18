# Registro de decisiones humanas

[English](decisions.md) · Español

## Confirmado por el usuario
React + TypeScript + Vite, ASP.NET Core con C#, PostgreSQL, Docker y Docker Compose, monolito modular y Clean Architecture. Selección manual de hasta tres makers y alcance definido en los [requisitos](../product/requirements.es.md). ADR 002 registra estas decisiones. Las versiones actuales de frontend figuran en package-lock.json. Versiones de backend, imágenes, ORM, autenticación y migraciones pendientes.

## Recomendaciones técnicas
Contratos internos explícitos, una transacción para publicación y esquemas por módulo son propuestas de diseño en la [arquitectura](../architecture/overview.es.md). ADR 003 documenta sus consecuencias. Requieren validación antes de implementarse.

## Pendientes ordenados por impacto
Cada fila identifica pregunta, necesidad, opciones, recomendación y efecto de posponer. Ninguna opción de esta tabla está aprobada.

| ID | Pregunta y motivo | Opciones y recomendación | Consecuencia de posponer |
|---|---|---|---|
| D-01 | ¿Cómo accede el comprador a su solicitud y recupera acceso? Protege información personal. | Cuenta, enlace de acceso temporal o código con secreto separado. Evaluar enlace temporal con recuperación definida para reducir fricción. El código de demo es público e insuficiente. | Bloquea contrato de identidad del comprador y aceptación RF-002/009. |
| D-02 | ¿Cómo se asegura la participación adulta y el acceso interno? | Declaración, verificación adicional o proveedor para edad. Para personal, identidad gestionada o credenciales propias. Evaluar proveedor gestionado y mínimo dato de edad retenido. Validación humana necesaria. | Bloquea política de edad y seguridad de solicitudes reales. |
| D-03 | ¿Quién administra makers y cómo acredita y revoca permisos de obras? | Personal delegado o autoservicio. Proponer gestión interna durante piloto y evidencia por obra. | Bloquea publicación real y RF-006/013. |
| D-04 | ¿Quién autoriza qué datos, para quién y cuánto tiempo, y cómo se hace contacto? | Permiso mutuo o por cada divulgación. Proponer consentimiento explícito por destinatario y revisión publicada, con canal de introducción manual inicialmente. Decidir retirada, fallo de entrega y tratamiento de información ya compartida. | Bloquea contacto real RF-007/012. |
| D-05 | ¿Qué estados y resultados acepta el equipo? | Aprobar o ajustar ciclo propuesto, cierre por una presentación o todas resueltas, reapertura, cancelación y expiración. Proponer revisión de casos reales del piloto antes de fijarlo. | Bloquea transiciones definitivas y RF-008/011. |
| D-06 | ¿Qué solicitud está completa y qué maker es compatible/disponible? | Exigir referencia o admitir descripción, moneda explícita, fecha o intervalo. Disponibilidad confirmada por maker o revisada por personal. Recomendar campos con unidades y evidencia de revisión. | Bloquea validación definitiva RF-002/004. |
| D-07 | ¿Qué objetivos operativos y políticas de datos se aprueban? | Definir dispositivos, WCAG, carga, latencia, RPO/RTO, respaldos, retención, borrado y alojamiento de obras. Recomendar medir piloto y ensayar restauración antes de fijar cifras. | Bloquea aceptación cuantitativa RNF-006–009 y despliegue con datos reales. |

## Consolidación de esta revisión
El backend antes opcional pasa a decisión confirmada. ADR 001 se limita al prototipo local. Se conserva significado e ID de RF-001–008 y RNF-001–002 y se amplía aceptación. Se separan RF-009–013 para consulta propia, acceso interno, publicación, presentación y mantenimiento de makers. Implementación de demo y propuesta V1 tienen estados separados. Un registro humano centraliza huecos y evita tratarlos como reglas aprobadas.

## Cambio transaccional confirmado

El encargo actual incluye contratación y pagos con integración PayPal Sandbox real. Sustituye exclusión previa de pagos. Ningún mecanismo de monetización está aprobado. [ADR 004](../architecture/decisions/004-transactional-scope.es.md).

## Prioridad de nuevas decisiones

D-08, D-09 y D-10 preceden habilitación financiera; D-01/02 y D-11 preceden acceso real. D-03/04/05/06/07 siguen vigentes.

| ID | Pregunta | Opciones y recomendación | Consecuencia, bloqueos y trabajo posible |
|---|---|---|---|
| D-08 | ¿Quién recibe el dinero y cuál es la comisión? | A maker sin comisión, B maker con comisión, C Furrify con transferencia. Recomendar validar A primero sin aprobarlo comercialmente. | Afecta receptor de pedido, onboarding y adaptador; bloquea cobro real y producción. Contratos y falso pueden diseñarse con A explícito. |
| D-09 | ¿Se paga total o anticipos, en qué monedas, con qué cancelación y cambios? | Total inicial o calendario de obligaciones; recomendar un pago total solo como fixture inicial. Decidir vigencia, límites, redondeo y efectos de cambios. | Bloquea acuerdo real y aceptación final RF-014–018/022; permite modelo de obligaciones y snapshot. |
| D-10 | ¿Quién autoriza reembolsos y cómo se tratan comisiones, incidencias y disputas? | Maker, personal delegado o revisión conjunta. Recomendar autorización explícita separada de solicitud. | Bloquea ejecución real RF-021/023 y operación; permite reservas, idempotencia y Sandbox con política ficticia. |
| D-11 | ¿Cómo se acredita maker y qué puede ver/emitir? | Cuenta propia o personal delegado, roles por maker. Recomendar identidad explícita y acceso solo a solicitud compartida por permiso. | Bloquea datos reales y cotización efectiva; permite contratos y pruebas de permisos. |
| D-12 | ¿Una solicitud puede contratar más de un maker? | Un pedido activo o varios por producto. Proponer uno activo para primer recorrido. | Afecta unicidad y resultados; mientras pendiente probar supuesto de uno sin marcar otras recomendaciones contratadas. |
