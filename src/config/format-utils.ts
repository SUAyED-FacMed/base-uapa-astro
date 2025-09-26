// Utilidades para formatear contenido de la configuración UAPA
import { UAPA_CONFIG, type NavItem } from './uapa-config.ts';

/**
 * Formatea un array de autores según el contexto
 * @param authors Array de nombres de autores
 * @param type 'display' para Hero (solo primero), 'full' para metadatos (todos)
 * @returns String formateado
 */
export function formatAuthors(authors: string[], type: 'display' | 'full'): string {
  if (type === 'display') {
    // Solo el primer autor para display
    return authors[0] || '';
  } else {
    // Todos los autores separados por comas para full
    return authors.join(', ');
  }
}

/**
 * Formatea autores para citas académicas (formato APA en español)
 * Convierte nombres mexicanos y los ordena alfabéticamente por apellido
 * Maneja correctamente la conjunción "y" según número de autores
 * @param authors Array de nombres completos
 * @returns String formateado para citas académicas APA en español
 */
export function formatAuthorsForCitation(authors: string[]): string {
  if (!authors || authors.length === 0) {
    return '';
  }

  // Formatear cada autor individual
  const formattedAuthors = authors.map(author => {
    const parts = author.trim().split(' ');
    if (parts.length < 2) {
      return { formatted: author, sortKey: author }; // Si no tiene apellido, devolver como está
    }
    
    // Para nombres mexicanos: "María Teresa Arredondo Garza"
    let firstNames: string[];
    let lastNames: string[];
    
    if (parts.length >= 3) {
      // Si hay 3 o más palabras, los primeros son nombres, los últimos 2 son apellidos
      firstNames = parts.slice(0, -2);
      lastNames = parts.slice(-2);
    } else {
      // Si hay solo 2 palabras, la primera es nombre, la segunda apellido
      firstNames = parts.slice(0, -1);
      lastNames = parts.slice(-1);
    }
    
    // Crear iniciales de los nombres
    const initials = firstNames.map(name => name.charAt(0).toUpperCase() + '.').join(' ');
    
    // Usar solo el primer apellido para la cita
    const primaryLastName = lastNames[0];
    const formattedAuthor = `${primaryLastName}, ${initials}`;
    
    return {
      formatted: formattedAuthor,
      sortKey: primaryLastName.toLowerCase() // Para ordenamiento alfabético
    };
  });

  // Ordenar alfabéticamente por apellido
  formattedAuthors.sort((a, b) => a.sortKey.localeCompare(b.sortKey));

  // Extraer solo los nombres formateados
  const sortedNames = formattedAuthors.map(author => author.formatted);

  // Aplicar formato APA según número de autores
  if (sortedNames.length === 1) {
    return sortedNames[0];
  } else if (sortedNames.length === 2) {
    // 2 autores: "Apellido, A. y Apellido, B."
    return `${sortedNames[0]} y ${sortedNames[1]}`;
  } else if (sortedNames.length <= 20) {
    // 3-20 autores: "Apellido, A., Apellido, B. y Apellido, C."
    const allButLast = sortedNames.slice(0, -1).join(', ');
    const lastAuthor = sortedNames[sortedNames.length - 1];
    return `${allButLast} y ${lastAuthor}`;
  } else {
    // 21+ autores: "Apellido, A., Apellido, B., ..., Apellido, Z."
    const firstNineteen = sortedNames.slice(0, 19).join(', ');
    const lastAuthor = sortedNames[sortedNames.length - 1];
    return `${firstNineteen}, ..., ${lastAuthor}`;
  }
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
 * Extrae todas las secciones de la navegación (incluyendo hijos)
 * Esto elimina la duplicación entre navigation.menuItems y sections
 * @returns Array de secciones con id y título
 */
function extractSectionsFromNavigation(): Array<{id: string, title: string}> {
  const sections: Array<{id: string, title: string}> = [];
  
  function extractFromItems(items: NavItem[]) {
    items.forEach(item => {
      if (item.href && item.href.startsWith('#')) {
        const id = item.href.substring(1); // Remover el #
        sections.push({ id, title: item.label });
      }
      if (item.children) {
        extractFromItems(item.children);
      }
    });
  }
  
  extractFromItems(UAPA_CONFIG.navigation.menuItems);
  return sections;
}

/**
 * Obtiene la configuración de una sección por su ID extrayendo de la navegación
 * Calcula automáticamente la variante zebra basada en el orden en la navegación
 * @param sectionId ID de la sección
 * @returns Configuración de la sección con variante automática o null si no existe
 */
export function getSectionConfig(sectionId: string) {
  const sections = extractSectionsFromNavigation();
  const sectionIndex = sections.findIndex(s => s.id === sectionId);
  
  if (sectionIndex === -1) {
    return null;
  }
  
  const section = sections[sectionIndex];
  const variant = getZebraVariant(sectionIndex);
  
  return {
    title: section.title,
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

/**
 * Verifica si un string contiene múltiples nombres (tiene comas)
 * @param names String de nombres
 * @returns boolean
 */
export function hasMultipleNames(names: string): boolean {
  return names.includes(',');
}