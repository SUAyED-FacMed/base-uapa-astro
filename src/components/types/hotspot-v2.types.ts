/**
 * Tipos para el componente HotspotV2
 * 
 * Usa estos tipos para tener autocompletado y validación de tipos
 * al trabajar con HotspotV2 en archivos .ts o .astro
 */

/**
 * Representa un punto interactivo (hotspot) en la imagen
 */
export interface HotspotPoint {
  /**
   * Posición horizontal en porcentaje (0-100)
   * - 0 = borde izquierdo
   * - 50 = centro
   * - 100 = borde derecho
   */
  x: number;
  
  /**
   * Posición vertical en porcentaje (0-100)
   * - 0 = parte superior
   * - 50 = centro
   * - 100 = parte inferior
   */
  y: number;
  
  /**
   * Título del hotspot que aparece en el tooltip
   */
  title: string;
  
  /**
   * Contenido HTML que se muestra en el tooltip
   * Puede incluir listas, párrafos, negritas, etc.
   */
  content: string;
  
  /**
   * Posición preferida del tooltip relativa al punto
   * Bootstrap ajustará automáticamente si no hay espacio
   * @default 'top'
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Props del componente HotspotV2
 */
export interface HotspotV2Props {
  /**
   * ID único del componente
   * Se genera automáticamente si no se proporciona
   */
  id?: string;
  
  /**
   * Ruta de la imagen sobre la que se colocarán los hotspots
   * Ejemplo: "/img/cont/diagrama.png"
   */
  imageSrc: string;
  
  /**
   * Texto alternativo de la imagen para accesibilidad
   * @default "Imagen con puntos interactivos"
   */
  imageAlt?: string;
  
  /**
   * Array de puntos interactivos
   * Cada punto define su posición (x, y) y contenido
   */
  hotspots: HotspotPoint[];
  
  /**
   * Título opcional que aparece encima del componente
   */
  title?: string;
  
  /**
   * Descripción opcional (acepta HTML)
   */
  description?: string;
  
  /**
   * Ancho máximo del componente
   * @default "650px"
   */
  maxWidth?: string;
  
  /**
   * Ancho del contenedor en porcentaje
   * @default "80%"
   */
  containerWidth?: string;
  
  /**
   * Color del efecto sonar y del punto
   * @default "#f01b18" (rojo)
   */
  sonarColor?: string;
  
  /**
   * Tamaño del punto interactivo
   * @default "15px"
   */
  sonarSize?: string;
  
  /**
   * Clases CSS adicionales para el componente
   */
  className?: string;
}

/**
 * Ejemplo de uso con tipos:
 * 
 * ```astro
 * ---
 * import HotspotV2 from '@/components/HotspotV2.astro';
 * import type { HotspotPoint } from '@/components/types/hotspot-v2.types';
 * 
 * const misPuntos: HotspotPoint[] = [
 *   {
 *     x: 30,
 *     y: 40,
 *     title: "Punto 1",
 *     content: "<p>Descripción del punto</p>",
 *     placement: "top"
 *   },
 *   {
 *     x: 70,
 *     y: 60,
 *     title: "Punto 2",
 *     content: "<ul><li>Item 1</li><li>Item 2</li></ul>"
 *   }
 * ];
 * ---
 * 
 * <HotspotV2
 *   imageSrc="/img/cont/diagrama.png"
 *   imageAlt="Mi diagrama"
 *   hotspots={misPuntos}
 * />
 * ```
 */

/**
 * Validador de coordenadas (opcional, útil para desarrollo)
 */
export function validateHotspotCoordinates(point: HotspotPoint): boolean {
  if (point.x < 0 || point.x > 100) {
    console.warn(`Coordenada X fuera de rango (0-100): ${point.x}`);
    return false;
  }
  
  if (point.y < 0 || point.y > 100) {
    console.warn(`Coordenada Y fuera de rango (0-100): ${point.y}`);
    return false;
  }
  
  return true;
}

/**
 * Helper para crear puntos hotspot con valores por defecto
 */
export function createHotspotPoint(
  x: number,
  y: number,
  title: string,
  content: string,
  placement: HotspotPoint['placement'] = 'top'
): HotspotPoint {
  return { x, y, title, content, placement };
}

/**
 * Preset de colores comunes para sonarColor
 */
export const HOTSPOT_COLORS = {
  red: '#f01b18',      // Rojo por defecto
  blue: '#0066cc',     // Azul
  green: '#28a745',    // Verde
  orange: '#ff8c00',   // Naranja
  purple: '#6f42c1',   // Morado
  cyan: '#17a2b8',     // Cian
  yellow: '#ffc107',   // Amarillo
} as const;

export type HotspotColorPreset = keyof typeof HOTSPOT_COLORS;
