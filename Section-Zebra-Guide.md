# Sistema de Secciones con Patrón Zebra Automático

## Problema Anterior ❌

**Configuración manual repetitiva:**
```typescript
// Antes - hardcodeado y propenso a errores
sections: {
  introduccion: { title: "...", variant: "claro" },
  contenido1: { title: "...", variant: "oscuro" },
  contenido2: { title: "...", variant: "claro" },  // ¿Claro u oscuro?
  contenido3: { title: "...", variant: "oscuro" }, // Fácil de confundirse
  // ...
}
```

**Uso manual en componentes:**
```astro
<Section id="introduccion" title="Introducción" variant="claro" />
<Section id="contenido1" title="Vestibulum..." variant="oscuro" />
<Section id="contenido2" title="Praesent..." variant="claro" />
<!-- Repetitivo y propenso a errores -->
```

## Solución Implementada ✅

### **1. Configuración Simplificada**
```typescript
// src/config/uapa-config.ts
sections: [
  { id: "introduccion", title: "Introducción" },
  { id: "contenido1", title: "Vestibulum sed sollicitudin elit" },
  { id: "contenido2", title: "Praesent eget dui aliquet mollis velit nec" },
  { id: "contenido3", title: "Sed commodo metus non magna rutrum cursus" },
  { id: "contenido4", title: "Etiam consectetur in felis et sollicitudin" },
  // ... más secciones
]
```

### **2. Patrón Zebra Automático**
```typescript
// src/config/format-utils.ts
export function getSectionConfig(sectionId: string, sections: any[]) {
  const sectionIndex = sections.findIndex(section => section.id === sectionId);
  const variant = sectionIndex % 2 === 0 ? 'claro' : 'oscuro'; // ← Automático
  
  return { ...sectionData, variant };
}
```

### **3. Uso Simplificado**
```astro
<!-- Solo necesitas el ID - título y variante automáticos -->
<Section id="introduccion" />
<Section id="contenido1" />  
<Section id="contenido2" />
<Section id="contenido3" />
```

## Cómo Funciona el Patrón Zebra

| **Índice** | **ID** | **Variante Automática** | **Visual** |
|------------|--------|-------------------------|------------|
| 0 | `introduccion` | `claro` | ⬜ Fondo claro |
| 1 | `contenido1` | `oscuro` | ⬛ Fondo oscuro |
| 2 | `contenido2` | `claro` | ⬜ Fondo claro |
| 3 | `contenido3` | `oscuro` | ⬛ Fondo oscuro |
| 4 | `contenido4` | `claro` | ⬜ Fondo claro |

**Fórmula**: `índice % 2 === 0 ? 'claro' : 'oscuro'`

## Ventajas del Sistema

### ✅ **Eliminación de Errores**
- **Antes**: Fácil confundirse con el patrón manual
- **Ahora**: Patrón zebra garantizado automáticamente

### ✅ **Configuración Mínima**
- **Antes**: 3 propiedades por sección (id, title, variant)
- **Ahora**: 2 propiedades por sección (id, title)

### ✅ **Flexibilidad Mantenida**
```astro
<!-- Automático -->
<Section id="contenido1" />

<!-- Override manual si es necesario -->
<Section id="contenido1" variant="claro" />
<Section id="contenido1" title="Título Personalizado" />
```

### ✅ **Mantenimiento Simplificado**
- Agregar nueva sección: Solo añadir al array
- Reordenar secciones: El patrón zebra se adapta automáticamente
- Sin configuración de variantes manuales

## Ejemplos de Uso

### **Configuración Nueva Sección**
```typescript
// Agregar al final del array sections
{ 
  id: "nueva-seccion", 
  title: "Mi Nueva Sección Súper Importante" 
}
// Variante automática: índice 9 → 'oscuro'
```

### **Uso en Componentes**
```astro
<!-- Completamente automático -->
<Section id="nueva-seccion">
  <p>Contenido de la nueva sección...</p>
</Section>

<!-- Con override específico -->
<Section 
  id="nueva-seccion"
  title="Título Override"
  variant="claro"
>
  <p>Contenido personalizado...</p>
</Section>
```

### **Nuevo Proyecto - Configuración Rápida**
```typescript
sections: [
  { id: "intro", title: "Introducción al Curso" },
  { id: "tema1", title: "Fundamentos Teóricos" },
  { id: "tema2", title: "Aplicaciones Prácticas" },
  { id: "ejercicios", title: "Ejercicios y Práctica" },
  { id: "conclusion", title: "Conclusiones y Resumen" }
]
// Patrón zebra: claro → oscuro → claro → oscuro → claro
```

## Compatibilidad

### ✅ **Retrocompatible**
```astro
<!-- Sigue funcionando el uso anterior -->
<Section id="contenido1" title="Título Manual" variant="claro" />

<!-- Pero ahora también funciona automático -->
<Section id="contenido1" />
```

### ✅ **Migración Gradual**
1. Actualiza la configuración a array
2. Usa componentes sin props (automático)
3. Mantén overrides donde sea necesario

**¡Sistema zebra 100% automático y libre de errores!** 🦓✨