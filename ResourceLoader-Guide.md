# ResourceLoader - Guía de Uso

## Descripción
El componente `ResourceLoader` permite cargar selectivamente los recursos CSS y JavaScript necesarios para cada página, en lugar de cargar todos los recursos automáticamente.

## Uso Básico

### En Layout.astro
```astro
---
import ResourceLoader from '../components/ResourceLoader.astro';

export interface Props {
  title: string;
  description?: string;
  keywords?: string;
  author?: string;
  resources?: string[]; // Array de recursos a cargar
}

const { resources = [] } = Astro.props;
---

<html>
<head>
  <!-- CSS base -->
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/personalizado.css">
  
  <!-- Recursos dinámicos -->
  <ResourceLoader resources={resources} />
</head>
<body>
  <slot />
</body>
</html>
```

### En páginas individuales
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout 
  title="Mi página"
  resources={['acordeon-horizontal', 'carrusel', 'hotspot']}
>
  <!-- Contenido que usa acordeón horizontal, carrusel y hotspot -->
</Layout>
```

## Recursos Disponibles

### Acordeones
- `'acordeon-horizontal'` - Acordeón horizontal con inicialización automática
- `'acordeon-vertical'` - Acordeón vertical

### Ficheros
- `'fichero-horizontal'` - Fichero horizontal con inicialización automática  
- `'fichero-vertical'` - Fichero vertical

### Contenidos Interactivos
- `'carrusel'` - Carrusel de imágenes
- `'folder-contenidos'` - Carpeta de contenidos
- `'hotspot'` - Puntos calientes interactivos
- `'lista-desplegable'` - Lista desplegable

### Hojas y Documentos
- `'hoja-bloc'` - Hoja de bloc de notas
- `'hoja-espiral'` - Hoja espiral
- `'hojas-desordenadas'` - Hojas desordenadas

### Líneas de Tiempo
- `'linea-tiempo-horizontal'` - Línea de tiempo horizontal
- `'linea-tiempo-vertical'` - Línea de tiempo vertical

### Notas
- `'nota-cinta'` - Nota con cinta adhesiva
- `'nota-pin'` - Nota con pin

### Tarjetas
- `'tarjeta-desplegable1'` - Tarjeta desplegable estilo 1
- `'tarjeta-desplegable2'` - Tarjeta desplegable estilo 2
- `'tarjeta-giratoria'` - Tarjeta giratoria

### Otros
- `'triptico'` - Tríptico desplegable

## Ventajas

1. **Performance**: Solo carga los recursos necesarios para cada página
2. **Mantenibilidad**: Fácil agregar/quitar recursos por página
3. **Centralizado**: Toda la configuración está en un solo componente
4. **Automático**: Los scripts de inicialización se ejecutan automáticamente
5. **Debug**: Console.log muestra qué recursos se cargaron

## Ejemplo de Uso Completo

```astro
---
// pages/actividad-1.astro
import Layout from '../layouts/Layout.astro';
---

<Layout 
  title="Actividad 1 - Acordeones y Carrusel"
  resources={['acordeon-horizontal', 'carrusel']}
>
  <main>
    <!-- El acordeón horizontal se inicializará automáticamente -->
    <section class="acordeon-horizontal" id="acordeon-horizontal-1">
      <!-- contenido del acordeón -->
    </section>
    
    <!-- El carrusel también tendrá sus estilos cargados -->
    <section class="carrusel-container">
      <!-- contenido del carrusel -->
    </section>
  </main>
</Layout>
```

## Logs de Desarrollo
En modo desarrollo, el ResourceLoader mostrará en la consola qué recursos se cargaron:
```
Recursos cargados: ['acordeon-horizontal', 'carrusel']
```