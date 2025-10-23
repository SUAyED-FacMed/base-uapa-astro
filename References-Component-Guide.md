# Guía del Componente References

El componente `References.astro` gestiona las fuentes de información y referencias bibliográficas de una UAPA, con soporte flexible para diferentes tipos de referencias y configuración centralizada.

## Ubicación

- **Componente**: `src/components/References.astro`
- **Configuración**: `src/config/references-config.ts`

## Características

- ✅ Soporte para referencias básicas y complementarias
- ✅ Múltiples secciones por tipo (Bibliografía, Documentos electrónicos, Sitios web, etc.)
- ✅ Mostrar/ocultar secciones dinámicamente
- ✅ Títulos personalizables para cada sección
- ✅ Generación automática de cita de la UAPA
- ✅ Soporte para HTML en las referencias
- ✅ Compatibilidad con arrays simples (legacy)

## Props Disponibles

### Control de Visualización

```typescript
showBasic?: boolean;              // Mostrar sección "Básicas" (default: true)
showComplementary?: boolean;      // Mostrar sección "Complementarias" (default: true)
basicSectionTitle?: string;       // Título personalizado para básicas (default: "Básicas")
complementarySectionTitle?: string; // Título personalizado para complementarias (default: "Complementarias")
```

### Estructura de Referencias

```typescript
basicSections?: ReferenceCategory[];     // Array de secciones para referencias básicas
complementarySections?: ReferenceCategory[]; // Array de secciones para referencias complementarias
```

Donde `ReferenceCategory` es:

```typescript
interface ReferenceCategory {
  title: string;        // Título de la subsección (ej: "Bibliografía", "Documentos electrónicos")
  references: string[]; // Array de referencias en formato HTML
}
```

### Configuración de Cita

```typescript
uapaTitle?: string;   // Título de la UAPA (default: desde UAPA_CONFIG)
uapaAuthors?: string; // Autores formateados (default: desde UAPA_CONFIG)
uapaUrl?: string;     // URL o vínculo de la UAPA (default: "[Vínculo]")
```

### Compatibilidad hacia atrás

```typescript
basicReferences?: string[];        // Array simple de referencias básicas (deprecated)
complementaryReferences?: string[]; // Array simple de referencias complementarias (deprecated)
```

## Uso Básico

### 1. Uso por defecto (desde config)

```astro
<References />
```

Esto usará automáticamente la configuración definida en `references-config.ts`.

### 2. Solo referencias básicas

```astro
<References showComplementary={false} />
```

### 3. Solo referencias complementarias

```astro
<References showBasic={false} />
```

### 4. Sin referencias (solo "Cómo citar")

```astro
<References 
  showBasic={false}
  showComplementary={false}
/>
```

### 5. Con títulos personalizados

```astro
<References 
  basicSectionTitle="Bibliografía recomendada"
  complementarySectionTitle="Recursos en línea"
/>
```

## Configuración Centralizada

### Estructura Recomendada (references-config.ts)

```typescript
export const REFERENCES_CONFIG = {
  basic: {
    sections: [
      {
        title: "Bibliografía",
        references: [
          "Autor, A. (2024). <em>Título del libro</em>. Editorial.",
          "Autor, B. & Autor, C. (2023). Título del capítulo. En D. Editor (Ed.), <em>Título del libro</em> (pp. 100-120). Editorial."
        ]
      },
      {
        title: "Artículos científicos",
        references: [
          "Autor, A. (2024). <strong>Título del artículo</strong>. <em>Revista Científica</em>, 10(2), 15-30."
        ]
      }
    ]
  },
  
  complementary: {
    sections: [
      {
        title: "Documentos electrónicos",
        references: [
          "Organización. (2024). <strong>Título del documento</strong>. Recuperado de <a href='https://ejemplo.com' target='_blank' class='break'>https://ejemplo.com</a>"
        ]
      },
      {
        title: "Sitios web",
        references: [
          "Nombre del sitio. (2024). <em>Título de la página</em>. Disponible en: <a href='https://ejemplo.com' target='_blank' class='break'>https://ejemplo.com</a>"
        ]
      }
    ]
  },
  
  // Arrays legacy (compatibilidad hacia atrás)
  basicLegacy: [],
  complementaryLegacy: []
};
```

### Proyecto sin referencias

Si tu proyecto no tiene referencias definidas aún:

```typescript
export const REFERENCES_CONFIG = {
  basic: { sections: [] },
  complementary: { sections: [] },
  basicLegacy: [],
  complementaryLegacy: []
};
```

O usa el helper incluido:

```typescript
import { EMPTY_REFERENCES } from '../config/references-config.ts';

export const REFERENCES_CONFIG = EMPTY_REFERENCES;
```

## Ejemplos de Uso Avanzado

### Ejemplo 1: Referencias solo con bibliografía básica

```typescript
// En references-config.ts
export const REFERENCES_CONFIG = {
  basic: {
    sections: [
      {
        title: "Bibliografía",
        references: [
          "García, M. (2024). <em>Manual de anatomía humana</em>. Editorial Médica.",
          "López, J. & Pérez, A. (2023). Fisiología básica. En R. Martínez (Ed.), <em>Ciencias de la salud</em> (pp. 45-78). Editorial Universitaria."
        ]
      }
    ]
  },
  complementary: { sections: [] },
  basicLegacy: [],
  complementaryLegacy: []
};
```

```astro
<!-- En tu página -->
<References showComplementary={false} />
```

### Ejemplo 2: Solo recursos en línea (sin bibliografía impresa)

```typescript
// En references-config.ts
export const REFERENCES_CONFIG = {
  basic: { sections: [] },
  complementary: {
    sections: [
      {
        title: "Recursos en línea",
        references: [
          "OMS. (2024). <strong>Datos sobre salud global</strong>. <a href='https://www.who.int' target='_blank' class='break'>https://www.who.int</a>",
          "Portal Educativo UNAM. (2024). <em>Recursos didácticos</em>. <a href='https://unam.mx' target='_blank' class='break'>https://unam.mx</a>"
        ]
      }
    ]
  },
  basicLegacy: [],
  complementaryLegacy: []
};
```

```astro
<!-- En tu página -->
<References 
  showBasic={false}
  complementarySectionTitle="Fuentes consultadas"
/>
```

### Ejemplo 3: Referencias mixtas con títulos personalizados

```typescript
// En references-config.ts
export const REFERENCES_CONFIG = {
  basic: {
    sections: [
      {
        title: "Libros de texto",
        references: [
          "Autor, A. (2024). <em>Título</em>. Editorial."
        ]
      },
      {
        title: "Artículos revisados por pares",
        references: [
          "Autor, B. (2024). <strong>Título del artículo</strong>. <em>Revista</em>, 10(2), 15-30."
        ]
      }
    ]
  },
  complementary: {
    sections: [
      {
        title: "Videos educativos",
        references: [
          "Canal Educativo. (2024). <em>Título del video</em> [Video]. YouTube. <a href='https://youtube.com/...' target='_blank' class='break'>https://youtube.com/...</a>"
        ]
      },
      {
        title: "Bases de datos",
        references: [
          "Base de Datos Médica. (2024). Disponible en: <a href='https://ejemplo.com' target='_blank' class='break'>https://ejemplo.com</a>"
        ]
      }
    ]
  },
  basicLegacy: [],
  complementaryLegacy: []
};
```

```astro
<!-- En tu página -->
<References 
  basicSectionTitle="Bibliografía académica"
  complementarySectionTitle="Recursos multimedia"
/>
```

### Ejemplo 4: Referencias definidas directamente en el componente

```astro
<References 
  basicSections={[
    {
      title: "Bibliografía",
      references: [
        "Smith, J. (2024). <em>Medical Anatomy</em>. Publisher.",
        "Johnson, A. (2023). Clinical cases. <em>Journal</em>, 5(1), 10-20."
      ]
    }
  ]}
  complementarySections={[
    {
      title: "Online Resources",
      references: [
        "WHO. (2024). <a href='https://who.int' target='_blank'>https://who.int</a>"
      ]
    }
  ]}
/>
```

## Formato de Referencias

Las referencias soportan HTML para formato rico:

- **`<em>`**: Para títulos de libros, revistas, etc. (cursiva)
- **`<strong>`**: Para títulos de artículos, capítulos (negrita)
- **`<a>`**: Para enlaces externos
  - Usar `target='_blank'` para abrir en nueva pestaña
  - Usar `class='break'` para URLs largas que necesitan ajuste

### Ejemplos de formato:

```html
<!-- Libro -->
Autor, A. (2024). <em>Título del libro</em>. Editorial.

<!-- Artículo -->
Autor, B. (2024). <strong>Título del artículo</strong>. <em>Nombre de la Revista</em>, 10(2), 15-30.

<!-- Capítulo de libro -->
Autor, C. (2023). Título del capítulo. En D. Editor (Ed.), <em>Título del libro</em> (pp. 100-120). Editorial.

<!-- Recurso en línea -->
Organización. (2024). <strong>Título del recurso</strong>. Recuperado de <a href='https://ejemplo.com' target='_blank' class='break'>https://ejemplo.com</a>

<!-- Sitio web -->
Nombre del Sitio. (2024). <em>Título de la página</em>. Disponible en: <a href='https://ejemplo.com' target='_blank' class='break'>https://ejemplo.com</a>
```

## Sección "Cómo citar"

Esta sección se genera automáticamente y siempre aparece al final. El formato es:

```
Autores (Año). Título. Unidades de Apoyo para el Aprendizaje. CUAED/Facultad de Medicina-UNAM. [Vínculo]
```

Puedes personalizar los valores:

```astro
<References 
  uapaTitle="Mi UAPA Personalizada"
  uapaAuthors="García, M. & López, J."
  uapaUrl="https://mi-uapa.unam.mx"
/>
```

## Buenas Prácticas

1. **Siempre incluye referencias básicas**: Aunque sea opcional, es recomendable tener al menos referencias básicas para validez académica.

2. **Organiza por tipo**: Usa múltiples secciones para diferentes tipos de fuentes (libros, artículos, sitios web, etc.).

3. **Formato consistente**: Mantén un formato consistente según el estilo de citación (APA, MLA, Chicago, etc.).

4. **URLs completas**: Siempre incluye URLs completas y verifica que funcionen.

5. **Fechas de consulta**: Para recursos en línea, incluye la fecha de consulta si es relevante.

6. **Centraliza en config**: Usa `references-config.ts` en lugar de definir referencias inline, facilita el mantenimiento.

## Migración desde arrays simples (legacy)

Si tienes código antiguo con arrays simples:

```astro
<!-- Antes (legacy) -->
<References 
  basicReferences={["Ref 1", "Ref 2"]}
  complementaryReferences={["Ref 3"]}
/>
```

Migra a la nueva estructura:

```astro
<!-- Después (recomendado) -->
<References 
  basicSections={[
    { title: "Bibliografía", references: ["Ref 1", "Ref 2"] }
  ]}
  complementarySections={[
    { title: "Documentos electrónicos", references: ["Ref 3"] }
  ]}
/>
```

O mejor aún, usa la configuración centralizada en `references-config.ts`.

## Notas Importantes

- **Detección automática de contenido**: El componente solo muestra secciones que tengan referencias. Si una sección tiene un array vacío, no se renderiza.

- **Flexibilidad de títulos**: Los títulos de las secciones son completamente personalizables, tanto a nivel de sección principal ("Básicas"/"Complementarias") como de subsecciones ("Bibliografía", "Documentos electrónicos", etc.).

- **Validación de HTML**: Las referencias aceptan HTML y se renderizan con `set:html`, asegúrate de que el HTML sea válido.

- **Sin referencias es válido**: Es perfectamente válido tener un componente References sin referencias básicas ni complementarias, solo mostrará la sección "Cómo citar".
