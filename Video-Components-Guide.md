# Componentes de Video YouTube

Este proyecto incluye dos componentes para mostrar videos de YouTube, cada uno con diferentes características de rendimiento y casos de uso.

## VideoYoutube.astro (Tradicional)

Componente que usa iframe tradicional de YouTube.

### Cuándo usar:
- Necesitas compatibilidad máxima con navegadores antiguos
- El video debe reproducirse inmediatamente sin interacción del usuario
- Requieres funcionalidades específicas del player de YouTube que no están disponibles en lite-youtube

### Props:
```astro
<VideoYoutube 
  videoId="1eX4b0rYk1g"           // Required: ID del video de YouTube
  title="Título del video"        // Optional: Título para accesibilidad
  width="col-lg-10"              // Optional: Clase Bootstrap para ancho
  autoplay={false}               // Optional: Reproducción automática
  allowFullscreen={true}         // Optional: Permitir pantalla completa
  className="mi-clase"           // Optional: Clases CSS adicionales
  nocookie={true}               // Optional: Usar youtube-nocookie.com
/>
```

## VideoYoutubeLite.astro (Optimizado)

Componente que usa `@justinribeiro/lite-youtube` para mejor rendimiento.

### Cuándo usar:
- **Recomendado para la mayoría de casos** especialmente en UAPAs
- Páginas con múltiples videos
- Cuando el rendimiento y la velocidad de carga son importantes
- Para mejorar Core Web Vitals y SEO
- Cuando quieres reducir el consumo de datos de los usuarios

### Ventajas:
- ⚡ **Carga 90% más rápido** - solo carga imagen preview inicialmente
- 📱 **Menor consumo de datos** - ideal para dispositivos móviles
- 🎯 **Mejor SEO** - mejores Core Web Vitals
- 🎨 **Misma apariencia** - se ve idéntico al player nativo
- ♿ **Totalmente accesible** - mantiene todas las características de accesibilidad

### Props:
```astro
<VideoYoutubeLite 
  videoId="1eX4b0rYk1g"           // Required: ID del video de YouTube
  title="Título del video"        // Optional: Título para accesibilidad
  width="col-lg-10"              // Optional: Clase Bootstrap para ancho
  autoplay={false}               // Optional: Reproducción automática
  nocookie={true}               // Optional: Usar youtube-nocookie.com
  className="mi-clase"           // Optional: Clases CSS adicionales
  posterquality="hqdefault"      // Optional: Calidad de imagen preview
/>
```

### Opciones de posterquality:
- `default`: 120x90px
- `mqdefault`: 320x180px
- `hqdefault`: 480x360px (recomendado)
- `sddefault`: 640x480px
- `maxresdefault`: 1280x720px (solo disponible en algunos videos)

## Recomendación

**Para UAPAs y contenido educativo, usa `VideoYoutubeLite`** por defecto, ya que:
- Los estudiantes a menudo navegan por múltiples secciones con videos
- La carga rápida mejora la experiencia de aprendizaje
- Reduce costos de datos para estudiantes con conectividad limitada
- Mejora la puntuación de rendimiento del sitio

## Ejemplo de migración

```astro
<!-- Antes (tradicional) -->
<VideoYoutube videoId="1eX4b0rYk1g" title="Video introductorio" />

<!-- Después (optimizado) -->
<VideoYoutubeLite videoId="1eX4b0rYk1g" title="Video introductorio" />
```

Ambos componentes mantienen la misma API y generan el mismo resultado visual, solo cambia el rendimiento.