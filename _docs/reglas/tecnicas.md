# Reglas Técnicas del Proyecto

Este documento detalla las decisiones técnicas reales detectadas en el proyecto.

## Stack Tecnológico
- **Framework**: Next.js 15.1.4 (App Router)
- **Lenguaje**: TypeScript 5.7.3
- **Estilos**: Tailwind CSS 3.4 + CSS Puro (Vanilla CSS en `style.css`)
- **UI Components**: Ant Design (antd 5.29.3)
- **Animaciones**: Framer Motion 11.17
- **Utilidades**: Dayjs (manejo de fechas)

## Convenciones de Desarrollo
- Uso de **variables CSS** en `:root` para la gestión de temas.
- Estructura de componentes en la carpeta `components/`.
- Uso de carpetas con prefijo `(internal)` en App Router para herramientas privadas/profesionales.
- Páginas estáticas HTML en el root (posible fase de migración o coexistencia con Next.js).
- Uso de `clsx` y `tailwind-merge` para gestión dinámica de clases Tailwind.
- Sistema de **portabilidad de datos via JSON** (Import/Export) para persistencia sin base de datos en fase MVP.

## Identidad Visual
- Paleta de colores basada en contrastes de azul oscuro, teal y naranja vibrante.
- Estetica premium con gradientes sutiles y micro-animaciones (Framer Motion).
- Tipografía moderna (Inter).
