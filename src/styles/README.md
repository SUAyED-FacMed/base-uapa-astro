# Estilos de Astro

Esta carpeta contiene archivos CSS que son procesados automáticamente por Astro durante el build.

## Archivos

### `personalizado.css`

Estilos personalizados específicos de este proyecto UAPA. Incluye:
- Animaciones personalizadas
- Estilos para botones flotantes (tools menu)
- Alturas responsivas de iframes (actividades y autoevaluaciones)
- Tooltips personalizados
- Otros estilos específicos del proyecto

**Uso:**
Se importa automáticamente en `src/layouts/Layout.astro`.

**Nota:** Reemplaza el archivo deprecado `public/css/personalizado.css`.

### `latex.css`

Estilos para el componente `<Latex>` que renderiza ecuaciones matemáticas con KaTeX.

**Características:**
- Scroll horizontal automático para ecuaciones largas
- Diseño responsivo para móviles y tablets
- Scrollbar personalizada y discreta
- Indicadores visuales de scroll en dispositivos móviles

**Uso:**
Los estilos se importan automáticamente en el componente `src/components/Latex.astro`.

## ¿Por qué aquí y no en `public/css/`?

Los archivos en `public/` se sirven tal cual, sin procesamiento. Los archivos en `src/styles/`:

✅ Son procesados por Astro
✅ Pueden usar características modernas de CSS
✅ Se optimizan y minimizan en producción
✅ Se pueden importar directamente en componentes
✅ Soportan tree-shaking (eliminación de código no usado)
✅ Mejor rendimiento general

Los archivos en `public/css/` son archivos legacy de la plantilla UAPA que deben mantenerse para compatibilidad con recursos externos (acordeones, hotspots, etc).
