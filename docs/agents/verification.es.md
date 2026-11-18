# Reproducir e interpretar una ejecución

[English](verification.md) · Español

Desde la raíz del repositorio, instalar con `npm ci` y `npx playwright install chromium --only-shell`. En Linux con bibliotecas de sistema ausentes, Playwright ofrece `npx playwright install --with-deps chromium --only-shell`. Ejecutar `npm run verify`. Para aprovechar un Chromium ya instalado se puede indicar su ejecutable mediante `CHROMIUM_PATH`. Este cambio de entorno figura en el informe.

Verify ejecuta tipos, dominio, compilación y navegador. La última etapa abre la distribución en un puerto local libre y usa los casos de la [demo](../humans/demo-guide.es.md). La consola de DevTools permite filtrar por nombre de evento y seguir el identificador de un intento. Solo se registran hora, nivel, evento e identificador.

Cada carpeta ignorada `.evidence/<fecha-uuid>/` conserva `result.json`, `summary.md`, un log por comando ejecutado y `files.json` con hashes por archivo. El resumen incluye los estados de todas las etapas. El JSON conserva revisión Git (nula antes del primer commit), huella del árbol incluido y códigos de salida. Para comparar dos ejecuciones usa `git diff --no-index ruta1/files.json ruta2/files.json`. Un diff puede devolver 1 para indicar diferencias.

| Estado | Significado |
|---|---|
| passed | El comando terminó con código 0. |
| failed | Falló una aserción, compilación u otra operación ejecutada. Consultar el log. |
| blocked | Faltó un prerrequisito reconocido o no se pudo iniciar el comando. El navegador usa código 78 para dependencias ausentes. |
| not_run | La etapa sigue pendiente o la compilación necesaria falló. |

En éxito, el navegador guarda `seleccion.png` y `events.json`. Ante un fallo con contexto abierto conserva `failure.zip` y, si la página sigue disponible, `failure.png`. Abre una traza con `npx playwright show-trace ruta/failure.zip`. Las aserciones deciden el resultado. La captura sirve para inspección humana. El verificador propaga el primer código no exitoso disponible.

Un futuro job de CI puede instalar dependencias y ejecutar el mismo comando integral. Para documentación sola, reportar revisión de enlaces, IDs, traducciones y coherencia. Las pruebas de aplicación quedan not_run por alcance.

Los mecanismos y comandos futuros se definen en la [estrategia humana](../humans/testing-strategy.es.md). Elegir comprobaciones por riesgo y tipo de cambio; no presentar comandos futuros como disponibles ni proveedor falso como Sandbox validado.
