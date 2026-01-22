# Guía del Componente HotspotV2

## Descripción

`HotspotV2` es un componente completamente rediseñado que integra la funcionalidad de hotspots interactivos directamente en Astro, sin necesidad de iframes. Ofrece:

- ✅ **Sin iframes**: Todo integrado directamente en el componente
- ✅ **Coordenadas como props**: Define posiciones de forma declarativa
- ✅ **Completamente responsivo**: Se adapta a todos los tamaños de pantalla
- ✅ **Tooltips de Bootstrap**: Aprovecha los tooltips nativos de Bootstrap 5
- ✅ **Efecto sonar animado**: Puntos pulsantes que llaman la atención
- ✅ **Personalizable**: Colores, tamaños y posiciones configurables

## Instalación

El componente ya está disponible en `src/components/HotspotV2.astro`. No requiere instalación adicional, solo asegúrate de que Bootstrap 5 esté cargado en tu layout (ya está incluido en el proyecto).

## Uso Básico

```astro
---
import HotspotV2 from '@/components/HotspotV2.astro';
---

<HotspotV2
  imageSrc="/img/cont/mi-imagen.png"
  imageAlt="Anatomía del corazón"
  hotspots={[
    {
      x: 20,
      y: 30,
      title: "Ventrículo izquierdo",
      content: "<p>Descripción del ventrículo izquierdo.</p>"
    },
    {
      x: 80,
      y: 50,
      title: "Aurícula derecha",
      content: "<ul><li>Recibe sangre desoxigenada</li><li>Se conecta con la vena cava</li></ul>"
    }
  ]}
/>
```

## Propiedades (Props)

### Props Requeridas

| Prop | Tipo | Descripción |
|------|------|-------------|
| `imageSrc` | `string` | Ruta de la imagen base sobre la que se colocarán los hotspots |
| `hotspots` | `HotspotPoint[]` | Array de objetos que definen cada punto interactivo |

### Props Opcionales

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `id` | `string` | auto-generado | ID único del componente |
| `imageAlt` | `string` | `"Imagen con puntos interactivos"` | Texto alternativo de la imagen |
| `title` | `string` | - | Título opcional que aparece encima del hotspot |
| `description` | `string` | - | Descripción opcional (acepta HTML) |
| `maxWidth` | `string` | `"650px"` | Ancho máximo del componente |
| `containerWidth` | `string` | `"80%"` | Ancho del contenedor en porcentaje |
| `sonarColor` | `string` | `"#f01b18"` | Color del efecto sonar y del punto |
| `sonarSize` | `string` | `"15px"` | Tamaño del punto interactivo |
| `className` | `string` | `""` | Clases CSS adicionales |

### Estructura de HotspotPoint

Cada punto en el array `hotspots` debe tener la siguiente estructura:

```typescript
{
  x: number;           // Posición X en porcentaje (0-100)
  y: number;           // Posición Y en porcentaje (0-100)
  title: string;       // Título del hotspot
  content: string;     // Contenido HTML del tooltip
  placement?: 'top' | 'bottom' | 'left' | 'right';  // Posición del tooltip
}
```

## Ejemplos de Uso

### Ejemplo 1: Hotspot Básico

```astro
<HotspotV2
  imageSrc="/img/cont/diagrama-celula.png"
  imageAlt="Estructura de la célula"
  hotspots={[
    {
      x: 50,
      y: 30,
      title: "Núcleo",
      content: "<p>El núcleo celular contiene el material genético (ADN) y controla las actividades de la célula.</p>"
    },
    {
      x: 70,
      y: 60,
      title: "Mitocondria",
      content: "<p>La mitocondria es la central energética de la célula, donde se produce el ATP.</p>"
    }
  ]}
/>
```

### Ejemplo 2: Con Título y Descripción

```astro
<HotspotV2
  imageSrc="/img/cont/sistema-nervioso.png"
  imageAlt="Sistema nervioso central"
  title="Estructura del Sistema Nervioso"
  description="Explora las diferentes partes del sistema nervioso haciendo clic en cada punto rojo."
  hotspots={[
    {
      x: 50,
      y: 20,
      title: "Cerebro",
      content: "<h2>Cerebro</h2><ul><li>Controla funciones cognitivas</li><li>Procesa información sensorial</li><li>Regula emociones</li></ul>"
    },
    {
      x: 50,
      y: 80,
      title: "Médula espinal",
      content: "<p>La médula espinal transmite señales entre el cerebro y el resto del cuerpo.</p>"
    }
  ]}
/>
```

### Ejemplo 3: Personalizado con Colores

```astro
<HotspotV2
  imageSrc="/img/cont/mapa-mundial.png"
  imageAlt="Distribución mundial"
  sonarColor="#0066cc"
  sonarSize="18px"
  maxWidth="800px"
  hotspots={[
    {
      x: 25,
      y: 35,
      title: "América",
      content: "<p>Continente americano con sus características distintivas.</p>",
      placement: "right"
    },
    {
      x: 75,
      y: 40,
      title: "Asia",
      content: "<p>El continente más grande del mundo.</p>",
      placement: "left"
    }
  ]}
/>
```

### Ejemplo 4: Con Contenido Rico (HTML)

```astro
<HotspotV2
  imageSrc="/img/cont/proceso-digestivo.png"
  imageAlt="Sistema digestivo"
  hotspots={[
    {
      x: 50,
      y: 15,
      title: "Esófago",
      content: `
        <h2>Esófago</h2>
        <p><strong>Función principal:</strong> Transportar alimento desde la faringe hasta el estómago.</p>
        <ul>
          <li>Longitud: aproximadamente 25 cm</li>
          <li>Movimiento peristáltico</li>
          <li>Esfínter esofágico inferior</li>
        </ul>
      `
    },
    {
      x: 45,
      y: 35,
      title: "Estómago",
      content: `
        <h2>Estómago</h2>
        <p>Órgano muscular que mezcla y digiere los alimentos.</p>
        <ol>
          <li>Almacena alimento temporalmente</li>
          <li>Secreta ácido clorhídrico</li>
          <li>Produce enzimas digestivas</li>
        </ol>
      `
    }
  ]}
/>
```

### Ejemplo 5: Múltiples Hotspots en Diferentes Posiciones

```astro
<HotspotV2
  imageSrc="/img/cont/esquema-complejo.png"
  imageAlt="Diagrama complejo"
  title="Componentes del Sistema"
  hotspots={[
    {
      x: 20,
      y: 20,
      title: "Componente Superior Izquierdo",
      content: "<p>Descripción del componente.</p>",
      placement: "bottom"
    },
    {
      x: 80,
      y: 20,
      title: "Componente Superior Derecho",
      content: "<p>Descripción del componente.</p>",
      placement: "bottom"
    },
    {
      x: 50,
      y: 50,
      title: "Componente Central",
      content: "<p>Descripción del componente.</p>",
      placement: "top"
    },
    {
      x: 20,
      y: 80,
      title: "Componente Inferior Izquierdo",
      content: "<p>Descripción del componente.</p>",
      placement: "top"
    },
    {
      x: 80,
      y: 80,
      title: "Componente Inferior Derecho",
      content: "<p>Descripción del componente.</p>",
      placement: "top"
    }
  ]}
/>
```

## Posicionamiento de Puntos

### Sistema de Coordenadas

- **X**: 0 = borde izquierdo, 50 = centro, 100 = borde derecho
- **Y**: 0 = parte superior, 50 = centro, 100 = parte inferior

Los puntos se centran automáticamente en las coordenadas especificadas.

### Placement del Tooltip

Puedes controlar dónde aparece el tooltip relativo al punto:

- `top` (default): Aparece arriba del punto
- `bottom`: Aparece debajo del punto
- `left`: Aparece a la izquierda del punto
- `right`: Aparece a la derecha del punto

Bootstrap ajustará automáticamente la posición si no hay espacio suficiente.

## Mejores Prácticas

### 1. Preparación de Imágenes

- **Resolución recomendada**: 1200-1600px de ancho
- **Formato**: PNG o JPG optimizado
- **Tamaño de archivo**: < 500KB para mejor rendimiento
- **Aspecto**: Evita imágenes muy alargadas (verticales u horizontales)

### 2. Posicionamiento de Puntos

```astro
// ❌ Evita puntos muy cerca de los bordes
{ x: 2, y: 98, ... }  // Puede quedar cortado

// ✅ Mantén margen desde los bordes
{ x: 10, y: 85, ... }  // Mejor posicionamiento
```

### 3. Contenido de Tooltips

```astro
// ✅ Usa estructura HTML clara
content: `
  <h2>Título claro</h2>
  <p>Descripción concisa y clara.</p>
  <ul>
    <li>Punto importante 1</li>
    <li>Punto importante 2</li>
  </ul>
`

// ❌ Evita texto muy largo sin estructura
content: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>"
```

### 4. Número de Hotspots

- **Óptimo**: 3-7 puntos por imagen
- **Evita**: Más de 10 puntos (puede ser abrumador)
- **Considera**: Dividir en múltiples imágenes si tienes muchos puntos

### 5. Accesibilidad

El componente incluye:
- `tabindex` para navegación con teclado
- `alt` text para imágenes
- Estructura semántica HTML

Asegúrate de proporcionar:
```astro
<HotspotV2
  imageAlt="Descripción clara de la imagen"  // ✅ Importante para accesibilidad
  ...
/>
```

## Personalización Avanzada

### Cambiar Colores del Sistema

```astro
<HotspotV2
  imageSrc="/img/cont/mi-imagen.png"
  sonarColor="#00aaff"  // Color azul personalizado
  hotspots={[...]}
/>
```

### Ajustar Tamaños

```astro
<HotspotV2
  imageSrc="/img/cont/mi-imagen.png"
  sonarSize="20px"      // Puntos más grandes
  maxWidth="900px"      // Componente más ancho
  containerWidth="90%"  // Ocupa más espacio
  hotspots={[...]}
/>
```

### Estilos CSS Personalizados

Puedes agregar clases personalizadas:

```astro
<HotspotV2
  className="mi-hotspot-personalizado"
  imageSrc="/img/cont/mi-imagen.png"
  hotspots={[...]}
/>

<style>
  .mi-hotspot-personalizado {
    border: 2px solid #0066cc;
    border-radius: 8px;
  }
</style>
```

## Comparación con Hotspot (v1)

| Característica | Hotspot (v1) | HotspotV2 |
|----------------|--------------|-----------|
| Implementación | iframe | Nativo |
| Coordenadas | Hardcodeadas en HTML/CSS | Props configurables |
| Responsividad | Limitada | Completa |
| Rendimiento | Menor (iframe overhead) | Óptimo |
| Mantenimiento | Complejo | Simple |
| Accesibilidad | Limitada | Mejorada |

## Solución de Problemas

### Los tooltips no aparecen

Verifica que Bootstrap 5 esté cargado en tu layout:

```astro
<!-- En Layout.astro -->
<script src="/js/bootstrap.bundle.js"></script>
```

### Los puntos no están en la posición correcta

- Verifica las coordenadas (0-100 para X e Y)
- Asegúrate de que la imagen se cargue completamente
- Prueba con diferentes valores hasta encontrar la posición exacta

### La imagen se ve muy grande/pequeña

Ajusta `maxWidth` y `containerWidth`:

```astro
<HotspotV2
  maxWidth="500px"      // Reduce tamaño máximo
  containerWidth="70%"  // Reduce ancho del contenedor
  ...
/>
```

### Los tooltips se cortan en móvil

El componente ya incluye estilos responsivos, pero puedes ajustar:

```astro
<HotspotV2
  hotspots={[
    {
      x: 50,
      y: 50,
      placement: "top",  // Prueba diferentes posiciones
      ...
    }
  ]}
/>
```

## Migración desde Hotspot (v1)

Si estás usando el componente `Hotspot` con iframes, puedes migrar así:

### Antes (Hotspot v1):
```astro
<Hotspot
  iframeSrc="/css/recursos/hotspot/index.html"
  iframeHeight="600px"
  title="Mi Hotspot"
/>
```

### Después (HotspotV2):
```astro
<HotspotV2
  imageSrc="/img/cont/mi-imagen.png"
  title="Mi Hotspot"
  hotspots={[
    { x: 20, y: 30, title: "Punto 1", content: "<p>Descripción</p>" },
    { x: 80, y: 50, title: "Punto 2", content: "<p>Descripción</p>" }
  ]}
/>
```

## Recursos Adicionales

- [Documentación de Bootstrap Tooltips](https://getbootstrap.com/docs/5.3/components/tooltips/)
- [MDN: CSS Position](https://developer.mozilla.org/es/docs/Web/CSS/position)
- [Guía de Accesibilidad Web](https://www.w3.org/WAI/WCAG21/quickref/)

## Soporte

Si encuentras problemas o tienes sugerencias, puedes:
1. Revisar esta guía completa
2. Verificar los ejemplos de uso
3. Consultar el código fuente en `src/components/HotspotV2.astro`
