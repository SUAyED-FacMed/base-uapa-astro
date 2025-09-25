# Componente Figure

## Descripción

Componente reutilizable para mostrar imágenes con animaciones AOS y captions opcionales. Estandariza el uso de figuras en todo el proyecto UAPA.

## Características

✅ **Animaciones AOS integradas** por defecto  
✅ **Captions opcionales** con formato consistente  
✅ **Anchos predefinidos** comunes (`w-600`, `w-650`, `w-750`, `w-900`)  
✅ **Clases personalizables** para casos específicos  
✅ **Configuración AOS flexible** (duración, easing, offset, etc.)  
✅ **Imagen responsive** automática con Bootstrap classes

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `src` | `string` | *Requerido* | Ruta de la imagen |
| `alt` | `string` | *Requerido* | Texto alternativo |
| `title` | `string` | `alt` | Título de la imagen |
| `caption` | `string` | `undefined` | Caption opcional |
| `width` | `'w-600'│'w-650'│'w-750'│'w-900'` | `'w-750'` | Ancho de la figura |
| `class` | `string` | `''` | Clases CSS adicionales |
| `aosType` | `string` | `'fade-zoom-in'` | Tipo de animación AOS |
| `aosDuration` | `string│number` | `'800'` | Duración en ms |
| `aosEasing` | `string` | `'ease-in-back'` | Función de easing |
| `aosOffset` | `string│number` | `'150'` | Offset para activación |
| `aosAnchor` | `string` | `'top-bottom'` | Punto de anclaje |

## Ejemplos de Uso

### **Uso Básico**
```astro
<Figure 
  src="img/example.jpg" 
  alt="Descripción de la imagen" 
/>
```

### **Con Caption**
```astro
<Figure 
  src="img/diagram.png" 
  alt="Diagrama explicativo"
  caption="Este diagrama muestra el proceso completo."
/>
```

### **Ancho Personalizado**
```astro
<Figure 
  src="img/wide-image.jpg" 
  alt="Imagen amplia"
  width="w-900"
  caption="Imagen que requiere más espacio."
/>
```

### **Clases Adicionales**
```astro
<Figure 
  src="img/side-image.jpg" 
  alt="Imagen lateral"
  width="w-600"
  class="my-xl-0 float-end"
/>
```

### **Animación Personalizada**
```astro
<Figure 
  src="img/hero-image.jpg" 
  alt="Imagen principal"
  aosType="fade-up"
  aosDuration="1200"
  aosEasing="ease-out-cubic"
/>
```

## Casos de Uso Cubiertos

### **1. Imágenes de Contenido Estándar**
```astro
<!-- Reemplaza esto: -->
<figure class="w-750 mx-auto my-recursos" data-aos="fade-zoom-in" data-aos-once="true"
  data-aos-easing="ease-in-back" data-aos-duration="800" data-aos-anchor-placement="top-bottom"
  data-aos-offset="150">
  <img class="img-fluid rounded d-block w-100" src="img/example.jpg" alt="Ejemplo">
  <figcaption class="text-center">Caption de ejemplo</figcaption>
</figure>

<!-- Por esto: -->
<Figure 
  src="img/example.jpg" 
  alt="Ejemplo"
  caption="Caption de ejemplo"
/>
```

### **2. Imágenes Sin Caption**
```astro
<!-- Reemplaza esto: -->
<figure class="w-600 mx-auto my-recursos my-xl-0" data-aos="fade-zoom-in" data-aos-once="true"
  data-aos-easing="ease-in-back" data-aos-duration="800" data-aos-anchor-placement="top-bottom"
  data-aos-offset="150">
  <img class="img-fluid rounded d-block w-100" src="img/example.png" alt="Sin caption">
</figure>

<!-- Por esto: -->
<Figure 
  src="img/example.png" 
  alt="Sin caption"
  width="w-600"
  class="my-xl-0"
/>
```

### **3. Imágenes Especiales**
```astro
<!-- Para casos específicos: -->
<Figure 
  src="img/highlight.jpg" 
  alt="Imagen destacada"
  width="w-900"
  class="border border-primary shadow"
  caption="Imagen destacada con borde especial"
  aosType="zoom-in"
  aosDuration="1000"
/>
```

## Clases CSS Generadas

El componente genera automáticamente:

```html
<figure class="[width] mx-auto my-recursos [clases-adicionales]">
  <img class="img-fluid rounded d-block w-100" />
  <figcaption class="text-center"> <!-- Solo si hay caption -->
</figure>
```

## Beneficios

### ✅ **Consistencia Visual**
- Todas las imágenes siguen el mismo patrón de diseño
- Animaciones uniformes en todo el proyecto

### ✅ **Código Más Limpio**
- Reduce código repetitivo significativamente
- 7 líneas HTML → 1 línea componente

### ✅ **Fácil Mantenimiento**
- Cambios globales desde un solo archivo
- TypeScript props para mejor DX

### ✅ **Flexibilidad**
- Configuración granular cuando se necesita
- Defaults sensatos para uso común

### ✅ **Performance**
- Animaciones AOS optimizadas
- Imágenes responsive automáticamente

## Migración

Para migrar figuras existentes:

1. **Identifica el patrón actual**
2. **Extrae las props necesarias** (src, alt, width, caption)
3. **Reemplaza con el componente** Figure
4. **Agrega clases especiales** si es necesario

La migración es gradual y no rompe funcionalidad existente.