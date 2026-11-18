# Ciclo de trabajo

[English](workflow.md) · Español

1. Leer [AGENTS.md](../../AGENTS.es.md) y los requisitos afectados.
2. Anotar en el resumen del cambio los IDs, el resultado esperado y las conductas que deben conservarse.
3. Reproducir el caso previo con la [guía de demo](../humans/demo-guide.es.md). Registrar la referencia de base y las diferencias observadas.
4. Implementar el corte mínimo. Actualizar expectativas cuando cambie legítimamente el comportamiento. Investigar cualquier regresión.
5. Para cambios de código, ejecutar pruebas afectadas y verificación integral. Para cambios solo documentales, revisar enlaces, IDs, paridad de traducciones y coherencia entre reglas y diagramas.
6. Inspeccionar `git status --short`, `git diff`, `git diff --cached` y los archivos nuevos. Revisar también las capturas cuando cambie la interfaz.
7. Actualizar requisitos, recorridos o arquitectura afectados en ambos idiomas. Si cambia la fuente después de verificar, repetir la verificación.
8. Reportar qué cambió, cómo reproducirlo, qué se conservó, resultados por comando, ruta del informe y bloqueos con su causa.
