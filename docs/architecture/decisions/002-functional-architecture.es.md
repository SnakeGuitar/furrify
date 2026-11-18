# ADR 002 · Arquitectura funcional

[English](002-functional-architecture.md) · Español

**Estado** Aceptada por el usuario, implementación pendiente.

**Contexto** El prototipo local necesita evolucionar a una versión funcional.

**Decisión** Conservar React, TypeScript y Vite. Usar ASP.NET Core con C#, PostgreSQL, Docker y Compose. Organizar un backend desplegable como monolito modular con Clean Architecture.

**Consecuencias** Los módulos protegen capacidades y datos. Dominio independiente de frameworks. Versiones y bibliotecas adicionales pendientes. ADR 001 sigue limitado a la demo actual.
