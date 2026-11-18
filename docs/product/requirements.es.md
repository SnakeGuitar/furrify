# Requisitos de Furrify

[English](requirements.md) · Español

Traducción de la fuente autoritativa en inglés. Este documento define el producto para humanos. El encargo actual confirma la pila técnica y sustituye la descripción previa de backend opcional. Las propuestas requieren aprobación en el [registro de decisiones](../humans/decisions.es.md).

## Propósito y alcance

Furrify ayuda a compradores adultos a encontrar talleres independientes para fursuits y accesorios. El comprador describe su encargo y autoriza la presentación. El personal revisa, selecciona y registra el resultado. El maker autoriza la exposición de su perfil y obras y aporta información de disponibilidad. La forma de administrar makers y sus permisos sigue pendiente.

La versión transaccional añade cotizaciones, pedidos, pagos y devoluciones al recorrido anterior de explicación, solicitudes, revisión, selección, perfiles y contacto. Las reglas RN-001 a RN-018 delimitan esas capacidades. Quedan fuera comisiones de ilustración, redes sociales y las operaciones excluidas por RN-011.

El prototipo actual solo consulta dos talleres ficticios mediante códigos locales, con estados vacío, error e inválido. La primera versión funcional completa sigue propuesta. “Implementado” describe código inspeccionado. “Verificado” requiere evidencia de una ejecución concreta, que esta revisión documental no genera.

## Glosario

- Maker o taller es el fabricante independiente.
- Solicitud es la necesidad del comprador pendiente de revisión.
- Recomendación es una propuesta justificada de maker.
- Vinculación es el proceso de autorización y presentación entre partes.
- Portafolio es el conjunto de obras autorizadas para mostrarse.
- Personal es el equipo interno con permisos de revisión.

## Reglas de negocio

El origen de las confirmadas es el encargo del usuario. Las propuestas son recomendaciones de diseño. Las condiciones y restricciones están en cada enunciado. No se han autorizado excepciones adicionales.

| ID | Condición y restricción | Origen y estado | RF |
|---|---|---|---|
| RN-001 | Solo compradores adultos. Antes de aceptar una solicitud, establecer mayoría de edad según una política por aprobar. Una declaración registra una afirmación y no verifica efectivamente la edad. | Alcance confirmado, método pendiente | RF-002 |
| RN-002 | Una solicitud enviada requiere producto, presupuesto, referencias, país, idioma y plazo. Formatos, moneda y tratamiento de referencias ausentes pendientes de aprobación. | Campos confirmados, validación pendiente | RF-002 |
| RN-003 | Publicar perfiles y obras solo con autorización del titular. Evidencia y revocación pendientes de aprobación. | Confirmada | RF-006, RF-013 |
| RN-004 | Al preparar recomendaciones, el personal selecciona manualmente hasta tres makers distintos por solicitud. No hay excepciones definidas al límite. | Confirmada | RF-004, RF-011 |
| RN-005 | Cada recomendación publicada debe explicar la compatibilidad del maker con la solicitud. La publicación requiere justificación no vacía. | Confirmada | RF-004, RF-005, RF-011 |
| RN-006 | Antes de publicar, comprobar elegibilidad y disponibilidad. Se propone revisar perfil autorizado, producto pertinente y disponibilidad actual. Criterios y frecuencia de revisión por aprobar. | Propuesta | RF-004, RF-011 |
| RN-007 | Antes de compartir datos de contacto o iniciar una presentación, obtener autorización para destinatario y datos previstos. Partes necesarias, caducidad y retirada pendientes. | Principio confirmado, política pendiente | RF-007, RF-012 |
| RN-008 | Las transiciones propuestas requieren autoridad del actor. Conservar el estado previo ante fallo. Reapertura y cancelación pendientes. | Propuesta | RF-002, RF-003, RF-011, RF-008 |
| RN-009 | Sin makers compatibles, mostrar ese resultado sin inventar recomendaciones. Se propone permitir reanudar la selección mediante revisión interna. Reintento y notificación pendientes. | Propuesta | RF-005, RF-011 |
| RN-010 | Registrar resultado de la vinculación con autor y fecha. Categorías propuestas son presentado, rechazado y sin compatibilidad. Cierre y corrección pendientes. | Capacidad confirmada, categorías propuestas | RF-008 |
| RN-011 | La vinculación se amplía con contratación y pagos. Se mantienen excluidos fabricación, chat, logística avanzada, seguimiento de fabricación y garantías de entrega. La exclusión anterior de pagos queda sustituida por el encargo transaccional. | Confirmada, alcance actualizado | RF-001, RF-017 |
| RN-012 | Cotizaciones vigentes fijan alcance, importe, moneda, maker y vencimiento. Solo titular puede aceptar o rechazar una revisión emitida y vigente. Cambios requieren nueva revisión y aceptación. Sin excepciones aprobadas. | Confirmada por alcance; políticas pendientes | RF-014, RF-015 |
| RN-013 | Un pedido conserva una instantánea de la cotización aceptada y una sola contraparte maker. Se propone un pedido activo por solicitud, dejando las otras recomendaciones sin contratar. Política multipedido pendiente. | Propuesta, pendiente de aprobación | RF-016 |
| RN-014 | Solo comprador autorizado inicia pago del pedido. Importe, moneda y receptor provienen de condiciones aceptadas y modelo comercial aprobado. Ningún dato enviado por navegador puede sustituirlos. | Confirmada por alcance; políticas pendientes | RF-017, RF-018 |
| RN-015 | Un pago se confirma solo con evidencia autenticada del proveedor y correspondencia comprobada. Aprobación y retorno no son cobro. Un resultado incierto mantiene la obligación sin autorizar cobro duplicado. | Confirmada por alcance; políticas pendientes | RF-018, RF-019, RF-020 |
| RN-016 | Solo actor aprobado puede autorizar devolución, por importe no superior a lo capturado menos devoluciones completadas o reservadas. Pendientes e inciertos no se declaran completados. Política comercial pendiente. | Confirmada por alcance; políticas pendientes | RF-021 |
| RN-017 | Cancelación de pedido y devolución son decisiones distintas. No cancelar mientras cobro sea incierto. Anticipos, efectos de cancelación y comisiones requieren aprobación humana. | Propuesta, pendiente de aprobación | RF-022, RF-021 |
| RN-018 | Resultado de recomendación, vinculación y pedido se registran separados. Contratar un maker no marca las otras recomendaciones contratadas. Finalizar pedido no demuestra fabricación o entrega garantizada por Furrify. | Confirmada por alcance; políticas pendientes | RF-008, RF-023 |

## Requisitos funcionales

Prioridades del recorrido existente: RF-001/006 son Should I1, RF-002–005/007/009–013 son Must I1 y RF-008 es Should I1. RF-005 conserva su corte de demo implementado. Las capacidades V1 están propuestas. Las precondiciones de acceso remiten a D-01 y D-02 del registro humano. La autorización debe comprobarse en servidor. Una política pendiente bloquea su aceptación final.

| ID y nombre | Actor y precondición | Comportamiento y resultado observable | Reglas | Errores y excepciones | Implementación |
|---|---|---|---|---|---|
| RF-001 Información del servicio | Visitante, acceso público | Explicar roles y exclusiones antes de solicitar. La revisión de aceptación encuentra todos los límites RN-011 en la página. | RN-011 | Contenido no disponible muestra un error recuperable. | Propuesto |
| RF-002 Crear solicitud | Comprador adulto, política de edad y acceso satisfecha | Validar los seis grupos de datos, persistir y devolver referencia. Entrada rechazada identifica campos y no crea un registro enviado. | RN-001, RN-002, RN-008 | Campos inválidos, fallo de persistencia o reintento conservan consistencia. | Propuesto |
| RF-003 Revisar solicitud | Personal autorizado y solicitud enviada | Abrir detalles, registrar revisión y pasar al siguiente estado permitido. Recargar muestra revisión y autor guardados. | RN-008 | Revisión obsoleta rechaza el cambio y ofrece recargar. | Propuesto |
| RF-004 Seleccionar makers | Personal, solicitud en revisión | Guardar makers distintos con motivos. Se rechaza un cuarto maker o motivo vacío. Recargar conserva la selección aceptada. | RN-004, RN-005, RN-006 | Makers no disponibles o no elegibles requieren revisión. | Propuesto |
| RF-005 Consultar recomendaciones | Comprador autorizado para la solicitud, selección publicada | Mostrar makers publicados y motivos o resultado sin compatibilidad. Borradores inaccesibles. Demo FUR-101 muestra dos talleres ficticios. | RN-005, RN-009 | Acceso ausente, solicitud desconocida, selección vacía y error del adaptador tienen tratamiento diferenciado. | Demo implementada, V1 propuesta |
| RF-006 Consultar perfiles | Visitante o comprador autorizado, permiso de publicación | Mostrar solo perfiles y obras autorizados. Obras revocadas desaparecen de lecturas posteriores. | RN-003 | Perfil retirado o desconocido no disponible. | Propuesto |
| RF-007 Autorizar contacto | Partes necesarias según política aprobada | Registrar aceptación o rechazo para destinatario y datos definidos. Rechazo mantiene datos sin compartir. | RN-007 | Autorización ausente o retirada impide presentación. | Propuesto |
| RF-008 Registrar resultado | Personal, solicitud en estado aprobado para cierre | Persistir categoría aprobada, autor y fecha. Recargar muestra el resultado. | RN-008, RN-010 | Transición inválida o actualización en conflicto rechazada. | Propuesto |
| RF-009 Consultar solicitud propia | Comprador con mecanismo de acceso elegido | Recuperar solicitud propia y estado visible. Referencia ajena no permite revelar detalles. | RN-007, RN-008 | Acceso caducado sigue política de recuperación aprobada. | Propuesto |
| RF-010 Acceso interno | Identidad interna provisionada según método aprobado | Autenticar y autorizar revisión. Sesiones anónimas y de comprador no pueden ejecutar acciones internas. | RN-008 | Sesión caducada exige autenticación sin escritura no autorizada. | Propuesto |
| RF-011 Publicar selección | Personal, solicitud revisada y elegibilidad comprobada | Publicar atómicamente 1–3 recomendaciones justificadas o resultado sin compatibilidad. El comprador ve la revisión completa. | RN-004, RN-005, RN-006, RN-008, RN-009 | Conflictos, motivos ausentes o elegibilidad inválida abortan publicación. | Propuesto |
| RF-012 Establecer contacto | Personal, permisos válidos de todas las partes necesarias | Compartir solo datos aprobados con destinatario autorizado y registrar presentación. Reintento evita registros duplicados. | RN-007, RN-010 | Cambio de permiso o fallo de entrega no se registra como contacto exitoso. | Propuesto |
| RF-013 Mantener makers | Operador autorizado, política de titularidad aprobada | Registrar perfil, permiso de portafolio y disponibilidad. Retirar permiso oculta el contenido en consultas posteriores. | RN-003, RN-006 | Titular desconocido o permiso ausente impide publicación. | Propuesto |


### Recorrido transaccional

Todas las capacidades siguientes están propuestas y sin implementar. UC y contratos están en [diseño de recorridos](../architecture/contracts.es.md).

| ID | Actor y precondición | Comportamiento y aceptación | Reglas | Alternativas y errores | Prioridad / incremento |
|---|---|---|---|---|---|
| RF-014 Emitir cotización | Maker autorizado para solicitud compartida según consentimiento | Publicar revisión con alcance, dinero, vigencia y condiciones. El comprador puede leer exactamente esa revisión. | RN-012 | Importe inválido, acceso ajeno o revisión concurrente se rechazan. | Must / I2 |
| RF-015 Decidir cotización | Comprador titular, cotización emitida vigente | Aceptar o rechazar revisión explícita. Repetición no genera nueva aceptación. Una cotización expirada o sustituida no se acepta. | RN-012 | Conflicto de revisión o vencimiento produce 409. | Must / I2 |
| RF-016 Generar y consultar pedido | Comprador, aceptación válida y política comercial resuelta | Crear una sola vez pedido desde aceptación con snapshot. Recargar conserva condiciones aunque cambie perfil. Datos ajenos inaccesibles. | RN-013 | Creación concurrente devuelve pedido existente o conflicto sin duplicarlo. | Must / I2 |
| RF-017 Iniciar pago | Comprador titular, pedido pagable | Crear intento e iniciar aprobación de proveedor para obligación aceptada. El cliente no determina dinero ni receptor. | RN-014 | Pedido cancelado, cobro activo o receptor sin habilitar bloquea. | Must / I3 |
| RF-018 Confirmar captura | Backend, intento aprobado con evidencia del proveedor | Capturar y aplicar estado solo tras comprobar ID, dinero y receptor. Aprobación sola mantiene pendiente. | RN-014, RN-015 | Timeout conserva Unknown, discrepancia pasa a Quarantined. | Must / I3 |
| RF-019 Procesar webhook | Proveedor autenticado, evento válido | Guardar y aplicar evento una sola vez. Firma inválida no modifica negocio. Evento antiguo no revierte captura. | RN-015 | Indisponibilidad de verificación o DB responde recuperable. | Must / I3 |
| RF-020 Conciliar pago | Worker o personal autorizado | Consultar estado externo de operación incierta. Tras reiniciar, recuperar captura sin segundo cobro. | RN-015 | Reintentos agotados escalan sin declarar pagado o fallido sin evidencia. | Must / I3 |
| RF-021 Gestionar devolución | Comprador solicita, actor aprobado autoriza, backend ejecuta | Solicitar, autorizar y devolver con reserva de importe. Mostrar estado verificado y conservar pedido coherente. | RN-016, RN-017 | Exceso, concurrencia, captura incierta y falta de permiso bloquean ejecución. | Must / I4 |
| RF-022 Cancelar pedido | Actor definido por política D-09 | Evaluar política aprobada, registrar motivo y separar devolución. Rechazar cancelación con cobro incierto. | RN-017 | Política pendiente impide habilitar cancelación real. | Should / I4 |
| RF-023 Resultado e incidencia de pedido | Partes o personal según permisos aprobados | Registrar resultado propio del pedido e incidencia con autor y fecha. No sobrescribir resultado de vinculación. | RN-018 | Correcciones quedan auditadas, acceso ajeno rechazado. | Should / I4 |

## Requisitos no funcionales

RNF-001–005/009–012 son Must. RNF-006–008 son Should con objetivos de aceptación pendientes. La columna de estado expresa aprobación del objetivo. Implementación y evidencia se distinguen en la [matriz](acceptance-criteria.es.md). Las cifras operativas se decidirán en D-07.

| ID y atributo | Escenario y criterio verificable | Método | Estado |
|---|---|---|---|
| RNF-001 Observabilidad | Escenarios locales distinguen éxito, vacío, error controlado e inválido mediante eventos correlacionados sin contenido introducido. | Inspeccionar eventos y aserciones de navegador. | Confirmado |
| RNF-002 Verificación automatizada | Cada comprobación registra código y revisión. Fallos y omisiones no aparecen aprobados. | Inspeccionar informe y provocar fallo cuando cambie el arnés. | Confirmado |
| RNF-003 Autorización | Cada endpoint protegido comprueba actor y titularidad. Rechazar acceso entre compradores y escrituras internas sin permiso. | Pruebas de integración API por rol. | Confirmado |
| RNF-004 Privacidad | Logs excluyen datos personales, tokens, referencias y formularios. Compartir contacto respeta RN-007. Retención y borrado pendientes. | Inspeccionar logs y comprobar consentimiento. | Principio confirmado |
| RNF-005 Integridad | Publicación fallida o concurrente no deja selección parcial ni más de tres makers. Solicitudes guardadas sobreviven reinicio API. | Integración PostgreSQL con rollback, concurrencia y reinicio. | Confirmado |
| RNF-006 Accesibilidad | Objetivo propuesto WCAG 2.2 AA para teclado, nombres, foco, avisos de estado y contraste en flujos principales. | Revisión manual con teclado y lector más auditoría automática. Objetivo formal por aprobar. | Propuesto |
| RNF-007 Usabilidad | Tareas principales funcionan en pantallas estrechas y anchas con errores legibles, reintento y sin desbordamiento de formulario. Matriz de dispositivos pendiente. | Recorrido responsivo según matriz acordada. | Propuesto |
| RNF-008 Rendimiento | Aceptación bloqueada hasta definir en D-07 datos, carga, percentiles y tasa máxima de error. Tras aprobación, cada métrica debe cumplir su objetivo. | Registrar carga y percentiles contra objetivos aprobados. | Pendiente |
| RNF-009 Recuperación | Restaurar base y medios autorizados en entorno limpio y demostrar consistencia. Frecuencia, RPO y RTO pendientes. | Ensayo documentado de restauración y fallos de dependencias. | Propuesto |
| RNF-010 Mantenibilidad | Acceder a módulos por contratos. Dominio sin dependencias ASP.NET Core, ORM ni base de datos. | Revisión de dependencias y futuras comprobaciones arquitectónicas. | Confirmado |
| RNF-011 Reproducibilidad | Checkout limpio usa dependencias fijadas y configuración documentada para reproducir fixtures y verificaciones sin cuentas privadas en comprobaciones habituales; Sandbox real es suite separada con credenciales. | Recorrido en entorno limpio. | Confirmado |
| RNF-012 Despliegue en contenedores | Compose inicia frontend, API y PostgreSQL con comprobación de disponibilidad. Recrear contenedor de base conserva datos en volumen. | Futuro ensayo de arranque, reinicio y recreación Compose. | Confirmado |

## Atributos transaccionales adicionales

Todos propuestos, prioridad Must, objetivo I3–I4.

| ID | Escenario y criterio | Método y supuestos |
|---|---|---|
| RNF-013 | Aceptación, captura y devolución concurrentes o repetidas producen un efecto y no cobran ni devuelven en exceso. | Integración PostgreSQL con barreras y replay, adaptador externo determinista. Política fijada en fixture. |
| RNF-014 | Intención externa sobrevive reinicio; éxito verificado converge a estado local o bloqueo visible de conciliación. | Fallo tras éxito externo, reinicio worker, comprobar captura única y pedido. Límites de reintento son configuración de prueba propuesta. |
| RNF-015 | Notificaciones no modifican negocio sin autenticidad y correspondencia comprobadas. | Firma inválida, receptor ajeno, dinero distinto y eventos fuera de orden. Entrega real requiere gate Sandbox separado. |

Glosario ampliado: cotización es oferta versionada con vigencia. Pedido es acuerdo aceptado inmutable en sus condiciones. Intento de pago representa una ejecución de cobro. Captura es el hecho monetario verificado. Reembolso es devolución separada. Resultado de vinculación y resultado de pedido son hechos independientes.
