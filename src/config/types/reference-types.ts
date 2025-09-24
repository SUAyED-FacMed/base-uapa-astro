// Tipos para el sistema de referencias bibliográficas

export type ReferenceType = 'book' | 'article' | 'chapter' | 'webpage' | 'thesis' | 'conference';

export type CitationStyle = 'apa' | 'vancouver' | 'harvard' | 'mla';

export interface Reference {
  id: string;
  authors: string[];
  year: number;
  title: string;
  type: ReferenceType;
  
  // Para libros
  publisher?: string;
  isbn?: string;
  edition?: string;
  
  // Para artículos
  publication?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  
  // Para capítulos
  editors?: string[];
  bookTitle?: string;
  
  // Para páginas web
  url?: string;
  accessDate?: string;
  
  // Para tesis
  institution?: string;
  degree?: string;
  
  // Para conferencias
  conference?: string;
  location?: string;
}

export interface ReferencesConfig {
  basic: string[];
  complementary: string[];
  options: {
    citationStyle: CitationStyle;
    showMetadata: boolean;
    showAccessDates: boolean;
    showColorExamples?: boolean;
    showDetailsExample?: boolean;
  };
}