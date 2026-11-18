# Estrategia de pruebas y evidencia

[English](testing-strategy.md) · Español

Diseño futuro, sin nuevas herramientas instaladas ni suites implementadas. Se conserva Playwright y las pruebas actuales node:test del catálogo. xUnit aporta fixtures y casos de dominio C#; WebApplicationFactory permite probar el host real ASP.NET Core; Testcontainers aporta PostgreSQL desechable con semántica de producción. Versiones y librería de comprobación de arquitectura por decidir. [Requisitos](../product/requirements.es.md) definen aceptación y [pagos](../architecture/payments.es.md) define recuperación.

## Organización propuesta

```text
tests/backend/Furrify.Domain.Tests/
tests/backend/Furrify.Application.Tests/
tests/backend/Furrify.Api.IntegrationTests/
tests/backend/Furrify.Architecture.Tests/
tests/system/                     Playwright full journeys
tests/payments/Sandbox.Tests/      explicit real-provider suite
tests/fixtures/                   synthetic builders, approved test policies
tests/support/                    clock, ID source, resource lifecycle helpers
```
Fixtures compartidos contienen builders mínimos, sin lógica de negocio duplicada. Utilidades de hosting solo en integración, Playwright en sistema. Snapshot de política por fixture explicita supuestos sin aprobarlos para producción.

## Unitarias
xUnit ejecuta dominio y aplicación sin API, Docker, PostgreSQL, red ni secretos. Casos parametrizados comprueban límites tres/duplicados, permisos de titular, transiciones prohibidas, cotización emitida/expirada/rechazada/aceptada, creación única de pedido y snapshot. Usar reloj inyectado fijo con avance explícito para instante antes/en/después de vencimiento. Fuente de IDs determinista por test, sin estado global.

Para aplicación, dobles solo en puertos de almacenamiento, identidad y proveedor. No sustituir entidades, validadores o reglas que se prueban. Dinero comprueba exponentes 0/2/3, límites admitidos, negativos, moneda diferente y conversión decimal exacta sin float. Pagos comprueban que Approved no es Captured, correspondencia de receptor y dinero, Unknown conserva reserva y refunds no exceden captura. Assert sobre estado/salida y efectos persistibles, no getters ni llamadas privadas. Cada caso produce nombre RN/RF, resultado xUnit y duración.

## Integración API y PostgreSQL
Una fixture xUnit por colección levanta contenedor PostgreSQL con versión fijada y puerto host aleatorio. Antes del primer caso crea una base única por caso (runId/testId), aplica migraciones reales y semillas mínimas. Cada WebApplicationFactory usa esa conexión y configuración real del backend. Crear clientes HTTP para buyer A/B, maker A/B y personal con permisos separados. Prohibido usar EF InMemory o SQLite para restricciones, SQL o transacciones.

Cada prueba dispone de su base y host. Pruebas concurrentes dentro de un caso comparten esa base deliberadamente y usan barreras, nunca sleeps. Paralelismo entre casos usa bases distintas. Al terminar, cerrar host, pools y base del caso, luego contenedor de colección. Ejecutar limpieza también en fallo, conservar logs antes. Un runId etiqueta recursos para limpieza manual tras muerte del proceso. Docker ausente o imagen inaccesible es blocked con diagnóstico y salida no cero.

WebApplicationFactory mantiene rutas, validación, aplicación, ORM elegido y composición reales. Reemplaza únicamente PaymentGateway en suite determinista y, para casos de políticas, identidad con un esquema registrado solo por el host de prueba. Tests de políticas prueban roles y recurso, no autenticación real. Una colección separada usa el mecanismo finalmente elegido, con tokens/sesiones válidos, caducados, firma incorrecta y recuperación. La selección de esquema de test no existe en binario/configuración productiva.

Cubrir 400/401/403/404/409/412/422/428, FK, índices únicos, migración desde versión previa, rollback de publicación/aceptación y callbacks entre módulos. Dos clientes aceptan cotizaciones distintas de la misma solicitud al mismo tiempo: solo un pedido activo propuesto. Dos capturas/refunds simultáneos no duplican ni exceden saldo. Reiniciar host conserva datos. Fallo inyectado después de proveedor confirma y antes de commit comprueba recuperación.

## Sistema con Compose exclusivo
Proyecto Compose de prueba único por runId y worker, redes y volúmenes exclusivos etiquetados, puertos host dinámicos. Frontend compilado, API real, PostgreSQL real y paso de migraciones antes de readiness. API configura proveedor falso determinista en puerto externo de pagos. Playwright no intercepta ni sustituye API Furrify en estas suites. Fixtures se cargan por herramienta de preparación exclusiva del entorno de pruebas, no endpoint accesible en producción.

Preparación valida Docker, construye imágenes fijadas, crea volumen de test vacío, espera healthchecks, migra, carga datos y espera readiness con sondeo y plazo. Ejecuta recorridos con contextos distintos por actor y recursos identificados por runId. Una base por worker evita dependencias de orden. Capturas complementan asserts en UI y consulta de estado autorizado.

Cubrir solicitud del comprador visible al personal, recomendaciones visibles al comprador, cotización del maker aceptada, snapshot de pedido, pago exitoso, rechazo/abandono, reingreso con sesión nueva, acceso ajeno y refund autorizado visible. Cada recorrido incluye entrada inválida o permiso denegado y recuperación pertinente.

Pruebas distintas de persistencia:
- Recargar/reautenticar demuestra continuidad de sesión y lectura.
- Reiniciar API con mismo volumen comprueba recuperación de estado/intención.
- Recrear contenedor PostgreSQL manteniendo volumen de test comprueba persistencia.
- Restaurar respaldo en volumen nuevo de test comprueba recuperación, con inventario de IDs y saldos.

Al finalizar guardar logs, reportes y trazas, luego retirar únicamente proyecto/volúmenes de ese runId tras validar etiquetas. Nunca usar nombres ni volúmenes de desarrollo/producción. Pruebas destructivas se restringen al entorno exclusivo.

## Pagos deterministas
Mantener reales API, lógica y PostgreSQL. El falso ocupa solo PaymentGateway. Catálogo controlado por scenarioId de fixture y reloj: success, decline, pending-then-success, timeout-before-call, timeout-after-provider-success, commit-failure-after-success, invalid-signature, mismatched-amount/currency/recipient, duplicate-event y out-of-order.

El falso mantiene ledger externo separado de transacción PostgreSQL y devuelve mismo resultado para providerKey repetida. Un hook exclusivo del host de prueba falla el commit una vez después de registrar éxito externo. Reiniciar host y procesar webhook o conciliación debe producir una captura, un resumen financiero y una devolución máxima, sin segundo cobro. No alterar lógica productiva para forzar resultados. Controles de escenario y fallo no se compilan ni registran en producción.

## Suite PayPal Sandbox separada
Ejecución explícita autorizada con credenciales de app Sandbox, cuentas ficticias de comprador/vendedor, modelo receptor habilitado y URL HTTPS pública temporal o estable. Registrar la URL y eventos en app correcta; no imponer proveedor de túnel. Nunca usar live credentials ni datos reales. Secretos en almacén de CI/entorno y redactados de reportes.

El adaptador real crea orden, el comprador ficticio aprueba mediante interfaz proveedor, backend captura, consulta orden/captura, recibe webhook real y verifica autenticidad con webhook ID correcto. Autorizar y ejecutar reembolso cuando la cuenta lo permita, consultar y comprobar webhook asociado. Guardar IDs de test de acceso restringido, estados y verificación, no tokens/payloads sensibles. Limpiar/reembolsar transacciones ficticias de acuerdo al escenario y registrar pendientes.

Comparar importe, moneda, receptor y captura a ambos lados. Fallo o capacidad no habilitada queda failed o blocked según causa. Un webhook simulado local no valida entrega real. El adaptador falso no satisface esta suite. La habilitación de producción requiere gate independiente y decisiones comerciales.

## Arquitectura
Prueba automatizable inspecciona referencias de proyectos y paquetes para prohibir Domain → Application/Infrastructure/API/ORM/PayPal, detectar ciclos y aplicar lista permitida entre módulos. Inspección de tipos exportados detecta DTO/contratos permitidos frente a entidades, implementaciones y DbContext accidentales. Internos por defecto, composición API referencia infraestructura para registrar adaptadores.

Referencias no prueban todo acceso indebido SQL. Revisar consultas, migraciones y permisos de base; pruebas por contrato y revisión de diff detectan accesos ajenos que análisis de proyectos no ve. Elegir herramienta después de fijar estructura, sin prometer detección absoluta.

## Contratos de comandos futuros
Estas entradas no son scripts disponibles. Los comandos actuales siguen en AGENTS. Contrato propuesto para wrapper npm, que posteriormente invocará dotnet/Compose/Playwright según suite.

| Comando futuro | Prerrequisitos y alcance | Evidencia |
|---|---|---|
| npm run test:unit | .NET SDK pinned; sin red/Docker, dominio y aplicación | TRX/XML, casos/duración |
| npm run test:integration | Docker, .NET, PostgreSQL image; API HTTP | TRX, migration/container logs, casos SQL |
| npm run test:system | Docker Compose, built images, Playwright Chromium | JUnit/JSON, screenshots, traces, service logs |
| npm run test:architecture | .NET, built assemblies | grafo y violaciones |
| npm run test:payments:sandbox | opt-in, secretos Sandbox, cuentas y HTTPS | reporte separado, estados e IDs restringidos |
| npm run verify (ampliación futura) | estáticos, unitarias, arquitectura, integración y sistema | manifiesto agregado y resultados por suite |

Código 0 solo si todas las comprobaciones obligatorias del comando pasan. Código 1 para fallo, 78 para dependencia/configuración ausente reconocida. Una suite no ejecutada se registra not_run. verify falla si cualquier obligatoria falla, queda blocked o not_run. Sandbox queda fuera del verify habitual sin secretos y se reporta por separado.

## Límites y diagnóstico propuestos
Son límites del arnés, ajustables y sin comprometer rendimiento del producto. Unitarias por caso 5 s, integración por caso 60 s y arranque de contenedor 120 s, readiness de sistema 120 s y recorrido 90 s, Sandbox operación 60 s y espera webhook 180 s. Son propuestas a validar en CI. Antes de esperar, comprobar dependencia. Al vencer guardar último health, logs y operación pendiente. blocked para dependencia ausente antes de iniciar, failed para timeout de caso en entorno disponible. Polling por condición y reloj controlado; sin sleeps fijos ni reintentos automáticos de test para convertir fallos intermitentes en éxito. Un reintento diagnóstico separado conserva el fallo original.

## CI y arnés
Mantener scripts actuales, estados y carpeta ignorada .evidence. Ampliar después con suites: estáticos → unitarias/arquitectura → integración PostgreSQL → recorridos críticos de sistema. Cada job usa recursos aislados y siempre publica reportes sanitizados al fallar. Sandbox se ejecuta explícitamente en entorno autorizado con secretos, no en PR de origen no confiable. No duplicar lógica CI y comandos locales.

Extensión propuesta de result.json por comprobación: runId, revision, sourceHash, suite, environment, fixturePolicyVersion, tool/image versions, startedAt, durationMs, command, exitCode, status, reason y artifacts (logs, TRX/JUnit/JSON, screenshots/traces). Manifest por archivo conserva comparación con diff. Capturas de éxito pertinentes y trazas de fallo, sin comparar píxeles frágiles. Resultado skipped no pasa. Mantener evidencias fuera de Git y controlar acceso a artefactos Sandbox.

## Matriz de riesgo y evidencia

| RN / RF / RNF | UC | Nivel y escenario | Evidencia requerida |
|---|---|---|---|
| RN-001/002/008 / RF-002/003/009/010 / RNF-003/005 | UC-02 | unit + integration + system: valid request, invalid input, foreign buyer, restart | resultados, HTTP sanitizado, snapshot y traza |
| RN-003 / RF-006/013 / RNF-004 | UC-01 | integration + system: permission/revocation | perfil autorizado y obra retirada |
| RN-004–009 / RF-004/005/007/011/012 / RNF-001/013 | UC-03 | unit + integration + system: fourth maker, atomic publish, absent consent, recovery | rollback y estado visible |
| RN-012/013 / RF-014/015/016 / RNF-005/013 | UC-04/05 | unit + integration + system: expiry boundary, competing acceptance, snapshot | único pedido y términos conservados |
| RN-014/015 / RF-017/018/019/020 / RNF-013/014/015 | UC-06–09 | unit + integration + system fake + Sandbox: success, decline, unknown, duplicate, mismatch | ledger fake, captura única, eventos; reporte Sandbox separado |
| RN-016/017 / RF-021/022 / RNF-013/014 | UC-10/11 | unit + integration + system + Sandbox: concurrent refund, denied actor, timeout/recovery | reservas, devolución y pedido; capacidad habilitada |
| RN-010/018 / RF-008/023 / RNF-005 | UC-11 | integration + system: independent outcomes, corrected incident | historial separado por entidad |
| Transversal / RNF-006/007/008 | all | teclado/lector/dispositivos/carga según objetivos aprobados | auditoría; rendimiento bloqueado hasta D-07 |
| Transversal / RNF-002/009/010/011/012 | all | architecture + integration + system: graph, clean run, restart, recreate volume, restore | grafo, manifiesto, inventario y ensayo de restore |

## Incrementos completos
I1 solicitud a recomendación, I2 cotización a pedido, I3 pago a conciliación e I4 devolución/incidencia. Cada incremento exige casos de éxito, permiso/entrada inválida y recuperación de la fila correspondiente, traducciones y contratos vigentes y evidencia de revisión/huella. I3 requiere suite determinista obligatoria y Sandbox separada para afirmar integración real. I4 requiere devolución Sandbox habilitada para afirmar esa capacidad. Políticas pendientes solo permiten fixtures explícitos, no aceptación productiva. No usar un porcentaje de cobertura arbitrario como gate único.

### Orden y criterios de cierre

| Incremento | Recorrido completo | Gate de cierre |
|---|---|---|
| I1 | Perfil → solicitud → revisión → recomendación → permiso y presentación | Unitarias RN-001–010; integración con permisos y rollback; sistema comprador/personal; políticas D-01–06 aprobadas para datos reales. |
| I2 | Maker cotiza → comprador acepta/rechaza → pedido consultable | Expiración, snapshot y aceptación concurrente pasan; precio inmutable tras cambio de perfil; D-09/11/12 resueltas para habilitación real. |
| I3 | Checkout → captura → webhook → conciliación tras reinicio | Éxito, rechazo, Unknown y commit fallido pasan en falso con backend real; Sandbox creación/aprobación/captura/consulta/webhook probado separadamente; D-08 y credenciales habilitadas. |
| I4 | Solicitud refund → autorización → ejecución → consulta e incidencia | Reserva concurrente, permisos y recuperación comprobados; refund Sandbox habilitado; D-09/10 resueltas; ensayo de restore antes de producción. |
