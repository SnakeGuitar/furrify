# Trabajar en Furrify

[English](AGENTS.md) · Español

El piloto vincula a compradores adultos con makers independientes. El corte actual permite consultar una selección ficticia. Consulta el [índice](docs/README.es.md), los [requisitos autoritativos](docs/product/requirements.es.md) y la [trazabilidad](docs/product/acceptance-criteria.es.md) antes de cambiar comportamiento.

Desde la raíz, con Node.js ≥22.18 y npm:

- `npm ci` instala las dependencias fijadas.
- `npx playwright install chromium --only-shell` prepara el navegador una vez.
- `npm run dev` arranca Vite.
- `npm run check` ejecuta TypeScript estricto.
- `npm test` comprueba el dominio.
- `npm run build` genera la distribución.
- `npm run browser` prueba la última compilación.
- `npm run verify` ejecuta toda la verificación y escribe evidencias.

Mantén los datos ficticios detrás del adaptador y la selección manual. Los eventos admiten nombres cerrados y un identificador efímero. Excluye texto introducido y detalles de excepciones. Sigue el [procedimiento](docs/agents/workflow.es.md). Un cambio terminado tiene criterios observables, diff revisado, documentación vigente e informe con comandos, resultados y ruta de evidencia. Declara los bloqueos y las comprobaciones pendientes.

El inglés es el idioma principal de la documentación. Actualiza cada página junto con su traducción. Escribe los asuntos de commit en inglés con un prefijo de Conventional Commits, por ejemplo `docs: explain the demo` o `fix: handle empty selections`.
