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

/**
 * Obtiene la configuración de una sección por su ID y calcula variante zebra
 * @param sectionId ID de la sección
 * @param sections Array de configuración de secciones del UAPA_CONFIG
 * @returns Configuración de la sección con variante automática
 */
export function getSectionConfig(sectionId: string, sections: any[]) {
  const sectionIndex = sections.findIndex(section => section.id === sectionId);
  
  if (sectionIndex === -1) {
    return null;
  }
  
  const sectionData = sections[sectionIndex];
  
  // Calcular variante zebra: par = claro, impar = oscuro
  const variant = sectionIndex % 2 === 0 ? 'claro' : 'oscuro';
  
  return {
    ...sectionData,
    variant,
    index: sectionIndex
  };
}

/**
 * Calcula la variante zebra basada en el índice
 * @param index Índice de la sección (0, 1, 2, ...)
 * @returns 'claro' para índices pares, 'oscuro' para impares
 */
export function getZebraVariant(index: number): 'claro' | 'oscuro' {
  return index % 2 === 0 ? 'claro' : 'oscuro';
}