# Configuración Centralizada UAPA

## Descripción
Todo el contenido específico del proyecto está centralizado en `src/config/uapa-config.ts`. Esto permite reutilizar los componentes en diferentes proyectos cambiando solo este archivo.

## Estructura de la Configuración

```typescript
// src/config/uapa-config.ts
export const UAPA_CONFIG = {
  // Información principal del proyecto
  title: "Título principal de la UAPA",
  subtitle: "Unidad de Apoyo para el Aprendizaje",
  
  // Metadatos para SEO y head
  description: "Descripción completa del proyecto...",
  keywords: "palabras, clave, separadas, por, comas",
  
  // Información de autores
  authors: {
    full: "Autor 1, Autor 2, Autor 3, Autor 4",           // Para metadatos
    display: "Autor 1 | Autor 2 | Autor 3 | Autor 4"     // Para mostrar en UI
  },
  
  // Configuración del Hero/Portada
  hero: {
    imageCaption: "Pie de imagen de la portada"
  },
  
  // Configuración de navegación
  navigation: {
    showTitle: false,                                      // Mostrar título en navbar
    title: "Título para la navegación",
    menuItems: [
      { label: "Introducción", href: "#introduccion" },
      { 
        label: "Contenido", 
        children: [
          { label: "Tema 1", href: "#tema1" },
          { label: "Tema 2", href: "#tema2" }
        ]
      },
      { label: "Actividades", href: "#actividades" },
      { label: "Fuentes", href: "#fuentes" }
    ]
  }
}
```

## Uso en Componentes

### Layout.astro
```astro
---
import { UAPA_CONFIG } from '../config/uapa-config.ts';

const { 
  title,                                    // Viene como prop obligatoria
  description = UAPA_CONFIG.description,    // Usa config como fallback
  keywords = UAPA_CONFIG.keywords,          // Usa config como fallback
  author = UAPA_CONFIG.authors.full,        // Usa config como fallback
  resources = []
} = Astro.props;
---
```

### Hero.astro
```astro
<Hero 
  title={UAPA_CONFIG.title}
  subtitle={UAPA_CONFIG.subtitle}
  authors={UAPA_CONFIG.authors.display}
  imageCaption={UAPA_CONFIG.hero.imageCaption}
/>
```

### Navigation.astro
```astro
<Navigation 
  menuItems={UAPA_CONFIG.navigation.menuItems}
  showTitle={UAPA_CONFIG.navigation.showTitle}
  title={UAPA_CONFIG.navigation.title}
/>
```

### Referencias y Footer
```astro
<References />  <!-- Usa REFERENCES_CONFIG internamente -->
<Footer />      <!-- Usa UAPA_CONFIG.authors internamente -->
```

## Beneficios de la Centralización

### ✅ **Reutilización de Componentes**
- Los componentes no tienen contenido hardcodeado
- Se pueden usar en cualquier proyecto UAPA
- Solo hay que cambiar el archivo de configuración

### ✅ **Mantenimiento Fácil**
- Un solo lugar para cambiar información del proyecto
- No hay que buscar valores en múltiples archivos
- Reduces errores de inconsistencia

### ✅ **Configuración por Proyecto**
- Cada proyecto tiene su propio `uapa-config.ts`
- Fácil personalización de navegación, autores, etc.
- Flexibilidad total sin tocar componentes

## Archivos de Configuración

```
src/config/
├── uapa-config.ts          # Configuración principal del proyecto
├── activities-config.ts    # Configuración de actividades y evaluaciones
├── references-config.ts    # Referencias bibliográficas
└── types/
    └── reference-types.ts  # Tipos TypeScript para referencias
```

## Ejemplo: Nuevo Proyecto

Para crear un nuevo proyecto, solo necesitas:

1. **Copiar la estructura de componentes**
2. **Cambiar `uapa-config.ts`**:
   ```typescript
   export const UAPA_CONFIG = {
     title: "Nuevo Título",
     description: "Nueva descripción...",
     authors: {
       full: "Nuevos Autores",
       display: "Autor A | Autor B"
     },
     navigation: {
       menuItems: [
         // Nuevos menús específicos del proyecto
       ]
     }
   }
   ```
3. **Actualizar referencias y actividades** en sus respectivos configs

¡Y listo! **Todos los componentes se adaptan automáticamente** al nuevo contenido.

## Flujo de Datos

```
uapa-config.ts → Layout.astro → index.html
             → Hero.astro
             → Navigation.astro
             → Footer.astro
```

**Resultado**: Configuración 100% centralizada y componentes 100% reutilizables.