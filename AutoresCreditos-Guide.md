# Sistema de Autores y Créditos Optimizado

## Problema Anterior ❌

**Duplicación innecesaria:**
```typescript
// Antes - redundante
authors: {
  full: "Autor A, Autor B, Autor C",           // Para metadatos
  display: "Autor A | Autor B | Autor C"       // Para UI
}
```

**Créditos con formato manual:**
```typescript
// Antes - sin formato automático
credits: [
  { role: "Diseño", name: "Juan, Pedro, María" }  // Sin <br> automático
]
```

## Solución Implementada ✅

### **1. Autores Simplificados**

**Configuración única:**
```typescript
// src/config/uapa-config.ts
authors: [
  "María Teresa Arredondo Garza",
  "Eduardo Mercado Cruz", 
  "Domingo Francisco Javier Aguilar Medina", 
  "Gil Alfonso Magos Guerrero"
]
```

**Formateo automático según contexto:**
```typescript
// src/config/format-utils.ts
export function formatAuthors(authors: string[], format: 'display' | 'full' = 'full'): string {
  if (format === 'display') {
    return authors.join(' | ');        // Para Hero: "Autor A | Autor B"
  }
  return authors.join(', ');           // Para metadatos: "Autor A, Autor B"
}
```

### **2. Créditos con Formato Automático**

**Configuración con comas:**
```typescript
credits: [
  { role: "Coordinación general", name: "Jorge León Martínez" },
  { role: "Diseño gráfico", name: "Diseñador A, Diseñador B, Diseñador C" },  // ← Comas
  { role: "Programación", name: "Dev 1, Dev 2" }
]
```

**Renderizado automático con `<br>`:**
```typescript
export function formatNamesWithBreaks(names: string): string {
  return names
    .split(',')                        // Divide por comas
    .map(name => name.trim())         // Quita espacios
    .filter(name => name.length > 0)  // Filtra vacíos
    .join('<br>');                    // Une con <br>
}
```

## Uso en Componentes

### **Hero.astro (Formato Display)**
```astro
<Hero 
  authors={formatAuthors(UAPA_CONFIG.authors, 'display')}
/>
```
**Resultado**: `"Autor A | Autor B | Autor C"`

### **Layout.astro (Formato Full)**
```astro
<meta name="author" content={formatAuthors(UAPA_CONFIG.authors, 'full')}>
```
**Resultado**: `"Autor A, Autor B, Autor C"`

### **Footer.astro (Créditos con `<br>`)**
```astro
<p set:html={formatNamesWithBreaks(credit.name)}></p>
```

**Entrada**: `"Juan, Pedro, María"`
**Resultado HTML**:
```html
Juan<br>Pedro<br>María
```

## Ventajas del Sistema

### ✅ **Eliminación de Redundancia**
- **Antes**: 2 formatos manuales (`full` + `display`)
- **Ahora**: 1 array, múltiples formatos automáticos

### ✅ **Formato Automático de Créditos**
- **Antes**: `"Juan, Pedro, María"` → Línea horizontal
- **Ahora**: `"Juan, Pedro, María"` → Líneas verticales automáticas

### ✅ **Mantenimiento Simplificado**
- Solo cambias el array de autores
- Los formatos se aplican automáticamente en todos los componentes

### ✅ **Flexibilidad Total**
```typescript
// Diferentes contextos, mismo array fuente
formatAuthors(authors, 'full')     → "A, B, C"      (metadatos)
formatAuthors(authors, 'display')  → "A | B | C"    (UI)
formatNamesWithBreaks("A, B")     → "A<br>B"       (créditos)
```

## Configuración para Nuevo Proyecto

```typescript
// Solo necesitas cambiar esto:
export const UAPA_CONFIG = {
  authors: [
    "Nuevo Autor 1",
    "Nuevo Autor 2",
    "Nuevo Autor 3"
  ],
  
  footer: {
    credits: [
      { role: "Coordinación", name: "Coordinador Principal" },
      { role: "Desarrollo", name: "Dev A, Dev B, Dev C" },      // ← Automáticamente formato vertical
      { role: "Diseño", name: "Diseñador Único" }
    ]
  }
}
```

**Resultado**: Todos los componentes se adaptan automáticamente con el formato correcto. 🎯

## Comparación Visual

| **Antes** | **Ahora** |
|-----------|-----------|
| `authors: { full: "A,B", display: "A\|B" }` | `authors: ["A", "B"]` |
| Formato manual en cada uso | Formato automático contextual |
| `"Juan, Pedro"` → Una línea | `"Juan, Pedro"` → Dos líneas |
| Duplicación de datos | Fuente única de verdad |

**¡Sistema 100% optimizado y DRY (Don't Repeat Yourself)!** ✨