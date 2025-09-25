# Optimización de Configuración: Eliminación de Duplicación

## Problema Identificado

Anteriormente teníamos duplicación de datos entre dos arrays:

1. **`navigation.menuItems`** - Contenía títulos e IDs (como `href: "#contenido1"`)
2. **`sections`** - Contenía los mismos títulos e IDs duplicados

## Solución Implementada

### 1. Eliminación del Array `sections`

Removimos completamente el array `sections` del archivo `uapa-config.ts` ya que era redundante.

### 2. Extracción Dinámica desde Navegación

Modificamos `format-utils.ts` para extraer automáticamente la información de secciones desde la navegación:

```typescript
function extractSectionsFromNavigation(): Array<{id: string, title: string}> {
  const sections: Array<{id: string, title: string}> = [];
  
  function extractFromItems(items: NavItem[]) {
    items.forEach(item => {
      if (item.href && item.href.startsWith('#')) {
        const id = item.href.substring(1); // Remover el #
        sections.push({ id, title: item.label });
      }
      if (item.children) {
        extractFromItems(item.children); // Recursivo para submenús
      }
    });
  }
  
  extractFromItems(UAPA_CONFIG.navigation.menuItems);
  return sections;
}
```

### 3. Función `getSectionConfig` Actualizada

La función ahora extrae dinámicamente la información:

```typescript
export function getSectionConfig(sectionId: string) {
  const sections = extractSectionsFromNavigation();
  const sectionIndex = sections.findIndex(s => s.id === sectionId);
  
  if (sectionIndex === -1) {
    return null;
  }
  
  const section = sections[sectionIndex];
  const variant = getZebraVariant(sectionIndex);
  
  return {
    title: section.title,
    variant,
    index: sectionIndex
  };
}
```

## Beneficios

### ✅ **Una Sola Fuente de Verdad**
- Solo la navegación define títulos y IDs de secciones
- No hay riesgo de inconsistencias entre arrays

### ✅ **Menos Código de Mantenimiento**
- Un array menos que mantener sincronizado
- Cambios automáticos: si modificas la navegación, las secciones se actualizan automáticamente

### ✅ **Patrón Zebra Automático Preservado**
- El patrón zebra sigue funcionando basado en el orden en la navegación
- Primera sección = claro, segunda = oscuro, etc.

### ✅ **Funcionalidad Completa**
- Soporte para submenús (recursivo)
- Manejo de secciones anidadas
- Título automático desde navegación

## Uso del Sistema Optimizado

### Para Crear un Nuevo Proyecto:

1. **Solo configura la navegación** en `uapa-config.ts`:
```typescript
navigation: {
  menuItems: [
    { label: "Introducción", href: "#introduccion" },
    { 
      label: "Contenido", 
      children: [
        { label: "Tema 1", href: "#tema1" },
        { label: "Tema 2", href: "#tema2" }
      ]
    }
  ]
}
```

2. **Las secciones se generan automáticamente**:
```astro
<Section id="introduccion">  <!-- Título y variante automáticos -->
<Section id="tema1">         <!-- Título y variante automáticos -->
<Section id="tema2">         <!-- Título y variante automáticos -->
```

### Orden de Procesamiento:

El sistema extrae las secciones en el siguiente orden:
1. Items de nivel superior con `href`
2. Items anidados en `children` (recursivamente)
3. Calcula zebra pattern basado en este orden

## Ejemplo de Flujo Completo

**Configuración en `uapa-config.ts`:**
```typescript
navigation: {
  menuItems: [
    { label: "Introducción", href: "#intro" },        // Índice 0 → claro
    { 
      label: "Contenido",
      children: [
        { label: "Capítulo 1", href: "#cap1" },       // Índice 1 → oscuro
        { label: "Capítulo 2", href: "#cap2" }        // Índice 2 → claro
      ]
    }
  ]
}
```

**Uso en componentes:**
```astro
<Section id="intro" />   <!-- "Introducción" + variante claro -->
<Section id="cap1" />    <!-- "Capítulo 1" + variante oscuro -->
<Section id="cap2" />    <!-- "Capítulo 2" + variante claro -->
```

## Migración Exitosa

- ✅ Build completado sin errores
- ✅ Patrón zebra funcionando
- ✅ Títulos automáticos desde navegación
- ✅ Reducción de código duplicado
- ✅ Sistema más mantenible

Esta optimización mantiene toda la funcionalidad previa mientras elimina la duplicación de datos y simplifica el mantenimiento del proyecto.