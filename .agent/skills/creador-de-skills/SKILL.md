---
name: creador-de-skills
description: Genera nuevos Agent Skills siguiendo el estándar de Antigravity, incluyendo estructura de carpetas, SKILL.md con YAML y recursos opcionales.
---

# Creador de Skills Antigravity

Este skill permite estandarizar la creación de nuevas capacidades para el agente, asegurando que sigan la estructura de carpetas, el formato YAML y los principios de ejecución requeridos.

## Cuándo usar este skill
- Cuando quieras automatizar una tarea repetitiva mediante un nuevo Skill.
- Cuando necesites convertir un prompt largo o complejo en un procedimiento reutilizable.
- Cuando el usuario pida explícitamente "crea un skill para...".
- Para estandarizar el formato de nuevas herramientas del agente.

## Inputs necesarios
- **Nombre sugerido**: (o se genera uno corto en minúsculas).
- **Descripción operativa**: Qué debe hacer el skill.
- **Nivel de libertad**: (Alta/Media/Baja).
- **Acceso al proyecto**: Para crear las carpetas en `.agent/skills/`.

## Workflow

### Fase 1 — Plan
1. Analizar la tarea solicitada.
2. Definir un `name` corto (slug) y una `description` clara.
3. Determinar el nivel de libertad necesario.

### Fase 2 — Validación
- ¿Es realmente un skill o solo una instrucción?
- ¿Cumple con la estructura mínima (`SKILL.md`, `recursos/`, etc.)?
- ¿Los triggers son claros?

### Fase 3 — Ejecución
1. Crear carpeta en `.agent/skills/<nombre-del-skill>/`.
2. Generar `SKILL.md` con frontmatter YAML.
3. Crear subcarpetas `resources/`, `scripts/`, `examples/` (si aportan valor).
4. Definir el Workflow interno del nuevo skill.

### Fase 4 — Revisión
- Verificar que no haya relleno innecesario.
- Validar que sea idempotente y pida datos faltantes.

---

## Instrucciones y Reglas (Standard)

### Estructura de Carpetas
```
.agent/skills/<nombre>/
├── SKILL.md
├── resources/ (opcional)
├── scripts/ (opcional)
└── examples/ (opcional)
```

### Formato SKILL.md
- **YAML**: `name` (minúsculas y guiones), `description` (tercera persona).
- **Secciones**: When to use, Inputs, Workflow, Rules, Output Format.

---

## Output (Formato exacto)
Al terminar de crear un skill, informa al usuario:
1. Ruta creada.
2. Resumen del Workflow del nuevo skill.
3. Ejemplo de activación.

---

Este skill es idempotente: puede ejecutarse múltiples veces para refinar la estructura del nuevo skill.
