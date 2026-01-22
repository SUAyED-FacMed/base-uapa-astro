# Componentes Hotspot - Comparativa

## Resumen Rápido

Este proyecto tiene **dos versiones** del componente Hotspot:

| Versión | Archivo | Estado | Uso Recomendado |
|---------|---------|--------|-----------------|
| **v1** | `Hotspot.astro` | ⚠️ Legacy | Solo para compatibilidad con contenido existente |
| **v2** | `HotspotV2.astro` | ✅ **Recomendado** | Todos los nuevos desarrollos |

## HotspotV2 (Recomendado)

### ✅ Ventajas

- **Sin iframes**: Todo el código está integrado directamente en el componente
- **Coordenadas como props**: Define posiciones de forma declarativa y fácil
- **Completamente responsivo**: Se adapta perfectamente a móviles y tablets
- **Mejor rendimiento**: Sin overhead de iframes
- **Más mantenible**: Un solo archivo, código limpio
- **Mejor accesibilidad**: Navegable por teclado (tabindex)
- **Personalizable**: Colores, tamaños y posiciones configurables

### 📝 Uso

```astro
import HotspotV2 from '@/components/HotspotV2.astro';

<HotspotV2
  imageSrc="/img/cont/diagrama.png"
  imageAlt="Descripción"
  hotspots={[
    {
      x: 30,
      y: 40,
      title: "Punto 1",
      content: "<p>Descripción</p>"
    }
  ]}
/>
```

### 📚 Documentación

- **Guía completa**: [HotspotV2-Guide.md](./HotspotV2-Guide.md)
- **Ejemplos**: Ver `/hotspot-v2-ejemplos` en desarrollo

---

## Hotspot (v1 - Legacy)

### ⚠️ Limitaciones

- **Usa iframes**: Requiere archivos HTML separados
- **No responsivo**: Limitaciones en móviles
- **Difícil de mantener**: Coordenadas hardcodeadas en CSS
- **Menos rendimiento**: Overhead de cargar iframes
- **Configuración compleja**: Requiere múltiples archivos

### 📝 Uso (Legacy)

```astro
import Hotspot from '@/components/Hotspot.astro';

<Hotspot
  iframeSrc="/css/recursos/hotspot/index.html"
  iframeHeight="600px"
  title="Mi Hotspot"
/>
```

### ⚠️ Cuándo usar v1

Solo usa `Hotspot.astro` (v1) si:
- Tienes contenido legacy que ya usa iframes
- Necesitas mantener compatibilidad con hotspots existentes
- No puedes migrar a v2 por alguna razón específica

---

## Migración v1 → v2

### Antes (v1):
```astro
<Hotspot
  iframeSrc="/css/recursos/hotspot/mi-hotspot.html"
  iframeHeight="600px"
  title="Anatomía"
/>
```

### Después (v2):
```astro
<HotspotV2
  imageSrc="/img/cont/anatomia.png"
  imageAlt="Anatomía del órgano"
  title="Anatomía"
  hotspots={[
    { x: 30, y: 40, title: "Parte A", content: "<p>Descripción</p>" },
    { x: 70, y: 60, title: "Parte B", content: "<p>Descripción</p>" }
  ]}
/>
```

### Pasos para migrar:

1. **Identifica la imagen** del iframe existente
2. **Determina las coordenadas** de cada punto (puedes usar las herramientas de desarrollo)
3. **Extrae el contenido** de cada tooltip
4. **Crea el array de hotspots** con la estructura de v2
5. **Reemplaza** el componente v1 con v2

---

## Recomendación Final

> 🎯 **Usa HotspotV2 para todo nuevo desarrollo**
>
> Solo mantén Hotspot (v1) para compatibilidad con contenido legacy existente.

Para más información, consulta [HotspotV2-Guide.md](./HotspotV2-Guide.md).
