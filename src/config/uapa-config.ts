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
  
  // Autores
  authors: [
    "María Teresa Arredondo Garza",
    "Eduardo Mercado Cruz", 
    "Domingo Francisco Javier Aguilar Medina", 
    "Gil Alfonso Magos Guerrero"
  ],
  
  // Hero
  hero: {
    imageCaption: "Pie de portada. Tomada de https://suayed.facmed.unam.mx/"
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

  // Configuración de secciones (orden determina patrón zebra automático)
  sections: [
    {
      id: "introduccion",
      title: "Introducción"
    },
    {
      id: "contenido1", 
      title: "Vestibulum sed sollicitudin elit"
    },
    {
      id: "contenido2",
      title: "Praesent eget dui aliquet mollis velit nec"
    },
    {
      id: "contenido3",
      title: "Sed commodo metus non magna rutrum cursus"
    },
    {
      id: "contenido4",
      title: "Etiam consectetur in felis et sollicitudin"
    },
    {
      id: "actividad1",
      title: "Actividad 1"
    },
    {
      id: "actividad2", 
      title: "Actividad 2"
    },
    {
      id: "autoevaluacion1",
      title: "Autoevaluación"
    },
    {
      id: "fuentes-info",
      title: "Fuentes de Información"
    }
  ],

  // Footer y créditos
  footer: {
    showCuaedSection: true,
    showToolsMenu: true,
    showCreditsModal: true,
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