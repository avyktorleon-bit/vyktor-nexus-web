---
name: consolidacion-proyecto
description: Consolida y documenta información existente creando memoria estructural persistente del proyecto sin eliminar datos previos.
---

# Consolidación de Proyecto

Skill técnico para detectar, organizar y preservar conocimiento existente sin modificar el funcionamiento del proyecto.

Objetivo:
Reducir el costo cognitivo de retomar proyectos mediante memoria persistente.

Nivel de libertad: MEDIO.

---

## When to use this skill

- Trabajo previo desordenado
- Retomar proyecto antiguo
- Necesidad de contexto automático

---

## Inputs necesarios

- Acceso al project root
- Estructura real del proyecto
- Archivos existentes

Si falta acceso → solicitar antes de continuar.

---

## Workflow

### Fase 1 — Plan

1. Detectar project root.
2. Verificar `_docs/`.
3. Leer documentación existente.

Checklist:

- estructura comprendida
- tecnologías detectadas
- conocimiento estable identificado

---

### Fase 2 — Validación

Detectar framework mediante:

- estructura de carpetas
- patrones de archivos
- tecnologías
- convenciones

Si no detectable → "No detectado".

Registrar evidencia:

- rutas observadas
- archivos clave
- patrones usados

---

### Fase 3 — Ejecución

Crear/actualizar:

_docs/
├── historial/
├── reglas/
├── estilo/
├── identidad/

Generar o actualizar:

- historial/linea-de-tiempo.md
- reglas/tecnicas.md
- estilo/tokens-visuales.json
- estado-actual.md
- identidad/identidad.md
- version.json

---

### Versionado automático (NUEVO)

Generar `_docs/version.json`:

```json
{
  "version": "vX.Y",
  "author": "VyktorNexus",
  "updated_at": "YYYY-MM-DD HH:MM"
}
```
Fuente de verdad = estado-actual.md.
El UI debe leer este archivo (no escribir versión manual).

________________________________________
UI Version Badge (opcional)
Por defecto:
NO modificar UI.
Solo si se llega a modificar la versión, o el usuario lo solicita explícitamente:
Actualizar badge visual:
Izquierda:
Versión vX.Y
Derecha:
Hecho por VyktorNexus
Registrar cambio en historial.
________________________________________
Fase 4 — Revisión
Verificar:
•	no borrado
•	no sobrescritura
•	idempotencia
•	evidencia registrada
________________________________________
Rules (non-negotiable)
1.	Skill vive solo en .agent/skills.
2.	Docs solo en _docs.
3.	Nunca eliminar información.
4.	Versionar siempre.
5.	Identidad obligatoria.
6.	Registrar solo evidencia real.
7.	Idempotente.
8.	No modificar código.
9.	No crear archivos fuera _docs.
10.	UI solo con autorización explícita.
________________________________________
Arquitectura técnica
Registrar en reglas/tecnicas.md:
•	lenguaje principal
•	plataforma
•	tipo aplicación
•	entry points
•	dependencias
________________________________________
Identidad del proyecto
Debe contener:
•	propósito
•	framework
•	arquitectura técnica
•	stack
•	usuario objetivo
•	nivel de madurez
•	decisiones arquitectónicas
Nunca eliminar versiones previas.
________________________________________
Estado del proyecto
Actualizar _docs/estado-actual.md:
•	versión
•	estado
•	qué está hecho
•	qué falta
•	bloqueos
•	framework
Estado (elegir uno):
•	Prototype
•	Active Development
•	Production
•	Maintenance
________________________________________
Output obligatorio
_docs/
├── historial/linea-de-tiempo.md
├── reglas/tecnicas.md
├── estilo/tokens-visuales.json
├── estado-actual.md
├── version.json
└── identidad/identidad.md
________________________________________
Log format
[YYYY-MM-DD HH:MM]
Tipo: Consolidación | Re-consolidación
Versión: vX.Y
Estado: Activo | Completado
Descripción:
•	Qué se consolidó
•	Qué cambió
•	Qué se detectó nuevo
________________________________________
Manejo de errores
•	Información no detectable → registrar.
•	Ambigüedad → preguntar.
•	Nunca inferir sin evidencia.

---

Este skill es idempotente: puede ejecutarse múltiples veces. Nunca borra historial. Solo agrega y consolida lo nuevo.
