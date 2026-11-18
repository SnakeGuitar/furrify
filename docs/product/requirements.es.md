# Requisitos de Furrify

[English](requirements.md) · Español

Traducción de la fuente autoritativa en inglés. Este documento define el producto para humanos. El encargo actual confirma la pila técnica y sustituye la descripción previa de backend opcional. Las propuestas requieren aprobación en el [registro de decisiones](../humans/decisions.es.md).

## Propósito y alcance

Furrify ayuda a compradores adultos a encontrar talleres independientes para fursuits y accesorios. El comprador describe su encargo y autoriza la presentación. El personal revisa, selecciona y registra el resultado. El maker autoriza la exposición de su perfil y obras y aporta información de disponibilidad. La forma de administrar makers y sus permisos sigue pendiente.

La primera versión funcional cubre explicación, solicitudes, revisión interna, selección manual, publicación, perfiles autorizados, permiso de contacto y resultado. Las reglas RN-001 a RN-011 delimitan esas capacidades. Quedan fuera comisiones de ilustración, redes sociales y las operaciones excluidas por RN-011.

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
| RN-008 | Las transiciones propuestas requieren autoridad del actor y revisión esperada del registro. Conservar el estado previo ante fallo. Reapertura y cancelación pendientes. | Propuesta | RF-002, RF-003, RF-011, RF-008 |
| RN-009 | Sin makers compatibles, mostrar ese resultado sin inventar recomendaciones. Se propone permitir reanudar la selección mediante revisión interna. Reintento y notificación pendientes. | Propuesta | RF-005, RF-011 |
| RN-010 | Registrar resultado de la vinculación con autor y fecha. Categorías propuestas son presentado, rechazado y sin compatibilidad. Cierre y corrección pendientes. | Capacidad confirmada, categorías propuestas | RF-008 |
| RN-011 | El piloto vincula compradores y makers. Excluye fabricación, intermediación de fondos, pagos, chat, seguimiento de fabricación y garantías de entrega. | Confirmada | RF-001 |

## Requisitos funcionales

Todos tienen prioridad alta y objetivo V1 salvo el corte de demo de RF-005. Las capacidades V1 están propuestas. Las precondiciones de acceso remiten a D-01 y D-02 del registro humano. La autorización debe comprobarse en servidor. Una política pendiente bloquea su aceptación final.

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

## Requisitos no funcionales

Prioridad alta para todos. La columna de estado expresa aprobación del objetivo. Implementación y evidencia se distinguen en la [matriz](acceptance-criteria.es.md). Las cifras operativas se decidirán en D-07.

| ID y atributo | Escenario y criterio verificable | Método | Estado |
|---|---|---|---|
| RNF-001 Observabilidad | Escenarios locales distinguen éxito, vacío, error controlado e inválido mediante eventos correlacionados sin contenido introducido. | Inspeccionar eventos y aserciones de navegador. | Confirmado |
| RNF-002 Verificación automatizada | Cada comprobación registra código y revisión. Fallos y omisiones no aparecen aprobados. | Inspeccionar informe y provocar fallo cuando cambie el arnés. | Confirmado |
| RNF-003 Autorización | Cada endpoint protegido comprueba actor y titularidad. Rechazar acceso entre compradores y escrituras internas sin permiso. | Pruebas de integración API por rol. | Confirmado |
| RNF-004 Privacidad | Logs excluyen datos personales, tokens, referencias y formularios. Compartir contacto respeta RN-007. Retención y borrado pendientes. | Inspeccionar logs y comprobar consentimiento. | Principio confirmado |
| RNF-005 Integridad | Publicación fallida o concurrente no deja selección parcial ni más de tres makers. Solicitudes guardadas sobreviven reinicio API. | Integración PostgreSQL con rollback, concurrencia y reinicio. | Confirmado |
| RNF-006 Accesibilidad | Objetivo propuesto WCAG 2.2 AA para teclado, nombres, foco, avisos de estado y contraste en flujos principales. | Revisión manual con teclado y lector más auditoría automática. Objetivo formal por aprobar. | Propuesto |
| RNF-007 Usabilidad | Tareas principales funcionan en pantallas estrechas y anchas con errores legibles, reintento y sin desbordamiento de formulario. Matriz de dispositivos pendiente. | Recorrido responsivo según matriz acordada. | Propuesto |
| RNF-008 Rendimiento | Medir lectura de solicitudes y portafolios con datos y carga acordados. Presupuestos de latencia y concurrencia requieren aprobación. | Registrar carga y percentiles contra objetivos aprobados. | Pendiente |
| RNF-009 Recuperación | Restaurar base y medios autorizados en entorno limpio y demostrar consistencia. Frecuencia, RPO y RTO pendientes. | Ensayo documentado de restauración y fallos de dependencias. | Propuesto |
| RNF-010 Mantenibilidad | Acceder a módulos por contratos. Dominio sin dependencias ASP.NET Core, ORM ni base de datos. | Revisión de dependencias y futuras comprobaciones arquitectónicas. | Confirmado |
| RNF-011 Reproducibilidad | Checkout limpio usa dependencias fijadas y configuración documentada para reproducir fixtures y verificaciones sin cuentas privadas. | Recorrido en entorno limpio. | Confirmado |
| RNF-012 Despliegue en contenedores | Compose inicia frontend, API y PostgreSQL con comprobación de disponibilidad. Recrear contenedor de base conserva datos en volumen. | Futuro ensayo de arranque, reinicio y recreación Compose. | Confirmado |
