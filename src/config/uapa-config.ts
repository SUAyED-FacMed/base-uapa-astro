// Tipos para navegación
export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

// Tipos para créditos
export interface CreditItem {
  role: string;
  name: string;
}

// Configuración centralizada del proyecto UAPA
export const UAPA_CONFIG = {
  // Información principal
  title: "Obesidad, Dislipidemias y Síndrome Metabólico",
  subtitle: "Unidad de Apoyo para el Aprendizaje",
  
  // Metadatos
  description: "El sobrepeso y la obesidad son un problema creciente en México que afecta todos los sectores poblacionales debido a malos hábitos alimenticios, sedentarismo, predisposición genética, entre otros, es por eso que la unidad te brindara las herramientas para diagnosticar, estratificar y tratar la obesidad, las dislipidemias y el síndrome metabólico.",
  keywords: "Obesidad, dislipidemias, metabolismo, colesterol",
  
  // Año de publicación (para el aviso legal y las citas)
  year: "2025",
  
  // Autores (aparecen en Hero y en "Cómo citar")
  authors: [
    "María Teresa Arredondo Garza",
    "Eduardo Mercado Cruz", 
    "Domingo Francisco Javier Aguilar Medina", 
    "Gil Alfonso Magos Guerrero"
  ],
  
  // Colaboradores opcionales (solo aparecen en Hero, NO en "Cómo citar")
  // Ejemplo: collaborators: ["Juan Pérez López", "Ana García Martínez"]
  collaborators: [] as string[],
  
  // Hero
  hero: {
    imageCaption: "Pie de portada. <em>Portada</em> tomada de https://suayed.facmed.unam.mx/"
  },
  
  // Navegación
  navigation: {
    showTitle: false,
    title: "Obesidad, Dislipidemias y Síndrome Metabólico",
    menuItems: [
      { label: "Introducción", href: "#introduccion" },
      { 
        label: "Contenido", 
        children: [
          { label: "Vestibulum sed sollicitudin elit", href: "#contenido1" },
          { label: "Praesent eget dui aliquet mollis velit nec", href: "#contenido2" },
          { label: "Sed commodo metus non magna rutrum cursus", href: "#contenido3" },
          { label: "Etiam consectetur in felis et sollicitudin", href: "#contenido4" }
        ]
      },
      {
        label: "Actividades",
        children: [
          { label: "Actividad 1", href: "#actividad1" },
          { label: "Actividad 2", href: "#actividad2" }
        ]
      },
      { label: "Autoevaluación", href: "#autoevaluacion1" },
      { label: "Fuentes", href: "#fuentes-info" }
    ] as NavItem[]
  },

  // Modo de producción: true = CUAED, false = SUAyED
  // CUAED: muestra sección CUAED en footer, NO muestra tools menu ni modal de créditos
  // SUAyED: NO muestra sección CUAED, SÍ muestra tools menu y modal de créditos
  isCuaed: false,

  // Footer y créditos
  footer: {
    // URLs para el menú lateral de herramientas
    toolsMenu: {
      foroUrl: "http://ponteenlinea.facmed.unam.mx/mod/forum/view.php?id=1",
      evaluaUrl: "http://ponteenlinea.facmed.unam.mx/",
      ponteEnLineaUrl: "http://ponteenlinea.facmed.unam.mx/",
      logoutUrl: "http://ponteenlinea.facmed.unam.mx/moodle/login/logout.php"
    },
    credits: [
      { role: "Coordinación general", name: "Jorge León Martínez" },
      { role: "Coordinación de desarrollo", name: "Edith Tapia Rangel" },
      { role: "Coordinación académica", name: "Persona A, Persona B, Persona C" },
      { role: "Elaboración del contenido", name: "Autor 1, Autor 2, Autor 3" },
      { role: "Administración del proyecto", name: "Juan Luis Becerril Gutiérrez" },
      { role: "Coordinación de asesoría pedagógica", name: "Elisa Campero Malo" },
      { role: "Asesoría pedagógica", name: "Pedagogo A, Pedagogo B" },
      { role: "Coordinación de corrección de estilo", name: "Brenda Gómez Sánchez" },
      { role: "Corrección de estilo", name: "Editor 1, Editor 2" },
      { role: "Coordinación de diseño gráfico e integración", name: "Juan de Dios Fuentes Reyes" },
      { role: "Diseño gráfico e integración", name: "Diseñador A, Diseñador B, Diseñador C" },
      { role: "Coordinación de programación de recursos", name: "Juan Luis Becerril Gutiérrez" }
    ]
  }
};

// Funciones helper para formatear autores
export const formatAuthors = {
  // Para metadatos (separados por comas) - SOLO autores
  full: UAPA_CONFIG.authors.join(", "),
  
  // Para Hero (separados por " | ") - autores + colaboradores si existen
  display: (() => {
    const allContributors = [...UAPA_CONFIG.authors];
    if (UAPA_CONFIG.collaborators && UAPA_CONFIG.collaborators.length > 0) {
      allContributors.push(...UAPA_CONFIG.collaborators);
    }
    return allContributors.join(" | ");
  })(),
  
  // Para Footer (con "y" antes del último)
  withAnd: (authors: string[]) => {
    if (authors.length === 0) return "";
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(" y ");
    
    const lastAuthor = authors[authors.length - 1];
    const otherAuthors = authors.slice(0, -1);
    return otherAuthors.join(", ") + " y " + lastAuthor;
  }
};
