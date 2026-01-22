# HotspotV2 Component

> 🎯 Componente de hotspots interactivos completamente integrado, sin iframes, con coordenadas como props y totalmente responsivo.

## 🚀 Inicio Rápido

```astro
---
import HotspotV2 from '@/components/HotspotV2.astro';
---

<HotspotV2
  imageSrc="/img/cont/diagrama.png"
  imageAlt="Diagrama anatómico"
  hotspots={[
    {
      x: 30,
      y: 40,
      title: "Punto 1",
      content: "<p>Descripción del punto</p>"
    },
    {
      x: 70,
      y: 60,
      title: "Punto 2",
      content: "<ul><li>Item 1</li><li>Item 2</li></ul>"
    }
  ]}
/>
```

## ✨ Características

- ✅ **Sin iframes**: Todo integrado en el componente
- ✅ **Coordenadas declarativas**: Define posiciones con porcentajes (0-100)
- ✅ **Completamente responsivo**: Funciona en todos los dispositivos
- ✅ **Tooltips Bootstrap 5**: Aprovecha los tooltips nativos
- ✅ **Efecto sonar animado**: Puntos pulsantes que llaman la atención
- ✅ **Personalizable**: Colores, tamaños, posiciones configurables
- ✅ **TypeScript**: Tipos completos para mejor DX
- ✅ **Accesible**: Navegable por teclado

## 📦 Archivos del Sistema

```
src/components/
├── HotspotV2.astro                    # Componente principal
└── types/
    └── hotspot-v2.types.ts            # Definiciones de tipos

docs/
├── HotspotV2-Guide.md                 # Guía completa
└── Hotspot-Comparison.md              # Comparación v1 vs v2

src/pages/
└── hotspot-v2-ejemplos.astro          # Página de ejemplos

public/
└── hotspot-coordinate-tool.html       # Herramienta para encontrar coordenadas
```

## 🛠️ Herramientas

### Coordinate Tool

Usa la herramienta interactiva para encontrar las coordenadas exactas:

1. Abre `/hotspot-coordinate-tool.html` en tu navegador
2. Sube tu imagen
3. Haz clic donde quieras colocar puntos
4. Copia el código generado automáticamente

**Acceso local**: `http://localhost:4321/hotspot-coordinate-tool.html`

## 📖 Documentación

### Guías Completas

- **[HotspotV2-Guide.md](./HotspotV2-Guide.md)** - Guía completa con todos los ejemplos
- **[Hotspot-Comparison.md](./Hotspot-Comparison.md)** - Comparación entre v1 y v2

### Props del Componente

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `imageSrc` | `string` | - | **(Requerido)** Ruta de la imagen |
| `hotspots` | `HotspotPoint[]` | - | **(Requerido)** Array de puntos |
| `imageAlt` | `string` | `"Imagen con puntos..."` | Texto alternativo |
| `title` | `string` | - | Título opcional |
| `description` | `string` | - | Descripción (acepta HTML) |
| `maxWidth` | `string` | `"650px"` | Ancho máximo |
| `containerWidth` | `string` | `"80%"` | Ancho del contenedor |
| `sonarColor` | `string` | `"#f01b18"` | Color de los puntos |
| `sonarSize` | `string` | `"15px"` | Tamaño de los puntos |
| `className` | `string` | `""` | Clases CSS adicionales |

### Estructura HotspotPoint

```typescript
{
  x: number;           // 0-100 (% horizontal)
  y: number;           // 0-100 (% vertical)
  title: string;       // Título del tooltip
  content: string;     // Contenido HTML
  placement?: 'top' | 'bottom' | 'left' | 'right'
}
```

## 💡 Ejemplos

### Con tipos TypeScript

```astro
---
import HotspotV2 from '@/components/HotspotV2.astro';
import type { HotspotPoint } from '@/components/types/hotspot-v2.types';

const puntos: HotspotPoint[] = [
  {
    x: 30,
    y: 40,
    title: "Ventrículo izquierdo",
    content: "<p>Bombea sangre oxigenada al cuerpo.</p>",
    placement: "top"
  },
  {
    x: 70,
    y: 60,
    title: "Aurícula derecha",
    content: "<ul><li>Recibe sangre desoxigenada</li><li>Se conecta con la vena cava</li></ul>",
    placement: "bottom"
  }
];
---

<HotspotV2
  imageSrc="/img/cont/corazon.png"
  imageAlt="Anatomía del corazón"
  title="Estructura del Corazón"
  hotspots={puntos}
/>
```

### Con colores personalizados

```astro
<HotspotV2
  imageSrc="/img/cont/mapa.png"
  sonarColor="#0066cc"
  sonarSize="20px"
  hotspots={[...]}
/>
```

### Contenido rico

```astro
<HotspotV2
  imageSrc="/img/cont/diagrama.png"
  hotspots={[
    {
      x: 50,
      y: 30,
      title: "Componente Principal",
      content: `
        <h2>Descripción</h2>
        <p>Texto con <strong>formato</strong>.</p>
        <ul>
          <li>Característica 1</li>
          <li>Característica 2</li>
        </ul>
      `
    }
  ]}
/>
```

## 🎨 Personalización

### Helpers disponibles

```typescript
import { 
  createHotspotPoint, 
  HOTSPOT_COLORS 
} from '@/components/types/hotspot-v2.types';

const punto = createHotspotPoint(50, 50, "Título", "<p>Contenido</p>");

<HotspotV2
  sonarColor={HOTSPOT_COLORS.blue}
  hotspots={[punto]}
/>
```

### CSS personalizado

```astro
<HotspotV2
  className="mi-hotspot-custom"
  ...
/>

<style>
  .mi-hotspot-custom {
    border: 2px solid blue;
  }
</style>
```

## 🔧 Solución de Problemas

### Tooltips no aparecen

Verifica que Bootstrap 5 esté cargado:

```astro
<!-- En Layout.astro -->
<script src="/js/bootstrap.bundle.js"></script>
```

### Puntos mal posicionados

Usa la herramienta `hotspot-coordinate-tool.html` para obtener coordenadas precisas.

### Imagen muy grande/pequeña

Ajusta `maxWidth` y `containerWidth`:

```astro
<HotspotV2
  maxWidth="800px"
  containerWidth="90%"
  ...
/>
```

## 📱 Responsividad

El componente incluye breakpoints automáticos:

- **Desktop**: Tamaño completo según `maxWidth`
- **Tablet** (< 768px): Ancho 95%, tooltips ajustados
- **Mobile** (< 480px): Puntos más pequeños, tooltips compactos

## ♿ Accesibilidad

- ✅ Navegación por teclado con `Tab`
- ✅ Atributos `alt` en imágenes
- ✅ ARIA labels en tooltips
- ✅ Estructura semántica HTML5

## 🆚 vs Hotspot (v1)

| Característica | v1 | v2 |
|----------------|----|----|
| Implementación | iframe | Nativo |
| Coordenadas | CSS hardcoded | Props |
| Responsivo | ❌ | ✅ |
| Rendimiento | Medio | Alto |
| Mantenimiento | Complejo | Simple |
| DX | Bajo | Alto |

**Recomendación**: Usa HotspotV2 para todo nuevo desarrollo.

## 📄 Licencia

Parte del proyecto base-uapa-astro © 2026 SUAyED-FacMed

## 🤝 Contribuir

¿Encontraste un bug o tienes una sugerencia? 
- Revisa la [guía completa](./HotspotV2-Guide.md)
- Consulta los [ejemplos](./src/pages/hotspot-v2-ejemplos.astro)
- Abre un issue en el repositorio

---

**🎯 ¡Listo para usar!** Comienza con los ejemplos y consulta la guía para más detalles.
