# Trabajar en Furrify

[English](AGENTS.md) · Español

Furrify vincula compradores adultos con makers independientes de fursuits y accesorios.
El código actual solo muestra una selección ficticia local.

## Fuentes
- [Índice humano](docs/README.es.md).
- [Requisitos autoritativos en inglés](docs/product/requirements.md).
- [Traducción y reglas](docs/product/requirements.es.md).
- [Arquitectura actual y objetivo](docs/architecture/overview.es.md).
- [Matriz de aceptación](docs/product/acceptance-criteria.es.md).
- [Decisiones reservadas a humanos](docs/humans/decisions.es.md).

## Restricciones
La pila confirmada es React, TypeScript, Vite, ASP.NET Core con C#, PostgreSQL, Docker y Compose.
El backend objetivo es un único monolito modular con Clean Architecture.
Dominio independiente de ASP.NET Core, ORM y PostgreSQL.
Infraestructura implementa puertos interiores.
Comunicación entre módulos por contratos explícitos dentro del proceso.
Cada módulo posee sus datos. Evitar acceso directo a tablas ajenas.
Mantener selección manual de hasta tres makers con motivos.
Respetar permisos de publicación y contacto.
Consultar decisiones pendientes al afectar su alcance.
Una propuesta requiere aprobación antes de tratarla como política confirmada.
Mantener fixtures detrás del adaptador y eventos sin datos sensibles.

## Comandos existentes
Ejecutar desde raíz con Node.js ≥22.18 y npm.

```sh
npm ci
npx playwright install chromium --only-shell
npm run dev
npm run check
npm test
npm run build
npm run browser
npm run verify
```

## Terminar un cambio
Leer únicamente el detalle pertinente mediante estos enlaces.
Seguir el [procedimiento](docs/agents/workflow.es.md).
El inglés es principal. Actualizar traducciones junto a originales.
Usar asuntos de commit en inglés con prefijo Conventional Commits.
Revisar diff, aceptación, documentación y evidencia proporcional.
Para cambios solo documentales, comprobar enlaces, IDs, traducciones y coherencia.
Reportar passed, failed, blocked o not_run según evidencia.
Indicar comandos, resultados, revisión comprobada y rutas de evidencia.
Declarar comprobaciones omitidas y causa.
