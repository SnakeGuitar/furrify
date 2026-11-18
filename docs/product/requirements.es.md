# Requisitos del piloto

[English](requirements.md) · Español

Traducción de los [requisitos en inglés](requirements.md), fuente autoritativa de alcance y aceptación. El directorio inicial estaba vacío. El encargo del piloto es la única fuente de producto disponible. La prioridad alta corresponde al recorrido del piloto, sin implicar que todo forme parte de esta entrega.

| ID | Actor | Prioridad | Comportamiento y criterio observable | Estado | Origen o supuesto |
|---|---|---|---|---|---|
| RF-001 | Visitante adulto | Alta | Entender el servicio. La portada completa explica los roles del comprador, del maker y de Furrify. | propuesto | Confirmado |
| RF-002 | Comprador adulto | Alta | Entregar solicitud con producto, presupuesto, referencias, país, idioma y plazo. El panel puede recuperarla para revisión. | propuesto | Confirmado. Pendiente el mecanismo de comprobación de edad. |
| RF-003 | Equipo interno | Alta | Abrir una solicitud recibida y registrar su revisión desde el panel. | propuesto | Confirmado. Estados pendientes de definición. |
| RF-004 | Equipo interno | Alta | Asociar manualmente hasta tres makers y un motivo por maker. El panel impide un cuarto. | propuesto | Confirmado. |
| RF-005 | Comprador | Alta | Consultar una selección de ejemplo. Aparecen dos talleres con motivos distintos. Una selección vacía muestra un mensaje. | implementado | Presentación justificada confirmada. Código y datos ficticios adoptados para la demo. |
| RF-006 | Comprador y maker | Alta | Abrir un perfil y ver solo obras autorizadas por su titular. | propuesto | Confirmado. Pendiente el procedimiento de autorización. |
| RF-007 | Partes involucradas | Alta | Solicitar autorización antes de establecer contacto y registrar la respuesta. | propuesto | Confirmado. Pendiente definir quién autoriza cada dato. |
| RF-008 | Equipo interno | Alta | Registrar y consultar el resultado del vínculo. | propuesto | Confirmado. Categorías pendientes. |
| RNF-001 | Desarrollador | Alta | Reproducir éxito, vacío, fallo y entrada inválida localmente. Cada intento tiene eventos correlacionados sin contenido del formulario. | implementado | Verificación local confirmada. |
| RNF-002 | Desarrollador | Alta | Ejecutar verificaciones con salidas rastreables. Un fallo produce código distinto de cero y queda en el informe. | implementado | Evidencia local confirmada. |

Fuera de alcance del piloto quedan pagos, intermediación de fondos, chat, seguimiento de fabricación, fabricación propia y garantías de entrega. No se requiere un algoritmo de selección. La demo usa exclusivamente registros inventados.
