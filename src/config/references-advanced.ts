// Configuración avanzada de referencias con múltiples formatos
import type { Reference, CitationStyle } from './types/reference-types.ts';

// Opción 1: Referencias con estructura de objetos (más flexible)
export const STRUCTURED_REFERENCES: Reference[] = [
  {
    id: 'arredondo2024',
    authors: ['Arredondo Garza, M.T.', 'Mercado Cruz, E.', 'Aguilar Medina, D.F.J.', 'Magos Guerrero, G.A.'],
    year: 2024,
    title: 'Obesidad, dislipidemias y síndrome metabólico: Guía clínica integral',
    type: 'book',
    publisher: 'Editorial Médica Panamericana',
    isbn: '978-607-15-1234-5'
  },
  {
    id: 'who2023',
    authors: ['Organización Mundial de la Salud'],
    year: 2023,
    title: 'Obesidad y sobrepeso',
    type: 'webpage',
    publication: 'Fichas descriptivas',
    url: 'https://www.who.int/es/news-room/fact-sheets/detail/obesity-and-overweight',
    accessDate: '2024-01-15'
  },
  {
    id: 'insp2022',
    authors: ['Instituto Nacional de Salud Pública'],
    year: 2022,
    title: 'Epidemiología de la obesidad en México',
    type: 'chapter',
    editors: ['Barquera, R.', 'Rivera, J.'],
    bookTitle: 'Nutrición y salud pública en México',
    pages: '125-156',
    publisher: 'Editorial INSP'
  }
];

// Opción 2: Función para generar referencias en diferentes formatos
export const generateReferences = (style: CitationStyle = 'apa') => {
  return STRUCTURED_REFERENCES.map(ref => formatReference(ref, style));
};

// Función auxiliar para formatear referencias
function formatReference(ref: Reference, style: CitationStyle): string {
  switch (style) {
    case 'apa':
      return formatAPA(ref);
    case 'vancouver':
      return formatVancouver(ref);
    case 'harvard':
      return formatHarvard(ref);
    default:
      return formatAPA(ref);
  }
}

function formatAPA(ref: Reference): string {
  const authors = ref.authors.length === 1 
    ? ref.authors[0] 
    : ref.authors.length === 2 
    ? ref.authors.join(' & ')
    : `${ref.authors.slice(0, -1).join(', ')} & ${ref.authors[ref.authors.length - 1]}`;
  
  const year = `(${ref.year})`;
  const title = ref.type === 'book' ? `<em>${ref.title}</em>` : `${ref.title}`;
  
  switch (ref.type) {
    case 'book':
      return `${authors} ${year}. ${title}. ${ref.publisher}.`;
    
    case 'article':
      return `${authors} ${year}. ${ref.title}. <em>${ref.publication}</em>, <em>${ref.volume}</em>(${ref.issue}), ${ref.pages}. ${ref.doi ? `DOI: ${ref.doi}` : ''}`;
    
    case 'webpage':
      return `${authors} ${year}. <strong>${ref.title}</strong>. <em>${ref.publication}</em>. Recuperado de <a href='${ref.url}' target='_blank' class='break'>${ref.url}</a>`;
    
    case 'chapter':
      return `${authors} ${year}. ${ref.title}. En ${ref.editors?.join(' & ')} (Eds.), <em>${ref.bookTitle}</em> (pp. ${ref.pages}). ${ref.publisher}.`;
    
    default:
      return `${authors} ${year}. ${title}.`;
  }
}

function formatVancouver(ref: Reference): string {
  // Implementación del estilo Vancouver (numérico)
  return `${ref.authors.join(', ')}. ${ref.title}. ${ref.publication || ref.publisher}; ${ref.year}.`;
}

function formatHarvard(ref: Reference): string {
  // Implementación del estilo Harvard
  return `${ref.authors.join(', ')} ${ref.year}, '${ref.title}', ${ref.publication || ref.publisher}.`;
}

// Exportar configuración simplificada para uso básico
export const REFERENCES_SIMPLE = {
  basic: generateReferences('apa').slice(0, 2),
  complementary: generateReferences('apa').slice(2),
  options: {
    citationStyle: 'apa' as CitationStyle,
    showMetadata: true,
    showAccessDates: false
  }
};