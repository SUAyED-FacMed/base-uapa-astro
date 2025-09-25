// Utilidades para formatear contenido de la configuración UAPA

/**
 * Formatea un array de autores según el contexto
 * @param authors Array de nombres de autores
 * @param format 'display' para Hero (con |), 'full' para metadatos (con comas)
 * @returns String formateado
 */
export function formatAuthors(authors: string[], format: 'display' | 'full' = 'full'): string {
  if (format === 'display') {
    return authors.join(' | ');
  }
  return authors.join(', ');
}

/**
 * Convierte nombres separados por comas a HTML con <br>
 * @param names String con nombres separados por comas
 * @returns String con <br> en lugar de comas
 */
export function formatNamesWithBreaks(names: string): string {
  if (!names.trim()) {
    return '';
  }
  
  return names
    .split(',')
    .map(name => name.trim())
    .filter(name => name.length > 0)
    .join('<br>');
}

/**
 * Verifica si un string contiene múltiples nombres (tiene comas)
 * @param names String de nombres
 * @returns boolean
 */
export function hasMultipleNames(names: string): boolean {
  return names.includes(',');
}