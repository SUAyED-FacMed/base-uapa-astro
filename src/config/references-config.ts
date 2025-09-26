// Tipos para diferentes categorías de referencias
export interface ReferenceCategory {
  title: string;
  references: string[];
}

// Configuración flexible de referencias por tipo de fuente
export const REFERENCES_CONFIG = {
  // Estructura flexible que permite diferentes tipos de fuentes
  basic: {
    sections: [
      {
        title: "Bibliografía",
        references: [
          "Arredondo Garza, M.T., Mercado Cruz, E., Aguilar Medina, D.F.J. & Magos Guerrero, G.A. (2024). <em>Obesidad, dislipidemias y síndrome metabólico: Guía clínica integral</em>. Editorial Médica Panamericana.",
          "Instituto Nacional de Salud Pública. (2022). Epidemiología de la obesidad en México. En R. Barquera & J. Rivera (Eds.), <em>Nutrición y salud pública en México</em> (pp. 125-156). Editorial INSP."
        ]
      }
    ]
  },
  
  complementary: {
    sections: [
      {
        title: "Documentos electrónicos", 
        references: [
          "Organización Mundial de la Salud. (2023). <strong>Obesidad y sobrepeso</strong>. <em>Fichas descriptivas</em>. Recuperado de <a href='https://www.who.int/es/news-room/fact-sheets/detail/obesity-and-overweight' target='_blank' class='break'>https://www.who.int/es/news-room/fact-sheets/detail/obesity-and-overweight</a>",
          "Lean, M.E., Han, T.S. & Morrison, C.E. (2022). <strong>Waist circumference as a measure for indicating need for weight management</strong>. <em>British Medical Journal</em>, 311, 158-161. Disponible en: <a href='https://www.bmj.com/content/311/6998/158' target='_blank' class='break'>https://www.bmj.com/content/311/6998/158</a>"
        ]
      },
      {
        title: "Sitios web",
        references: [
          "Instituto Nacional de Estadística y Geografía. (2024). <em>Encuesta Nacional de Salud y Nutrición 2023</em>. Recuperado el 15 de marzo de 2024, de <a href='https://www.inegi.org.mx/programas/ensanut/' target='_blank' class='break'>https://www.inegi.org.mx/programas/ensanut/</a>",
          "Secretaría de Salud. (2024). <strong>Portal de datos abiertos en salud</strong>. Disponible en: <a href='https://datos.gob.mx/salud' target='_blank' class='break'>https://datos.gob.mx/salud</a>"
        ]
      }
    ]
  },

  // Compatibilidad hacia atrás - arrays simples (deprecated pero funcional)
  basicLegacy: [
    "Arredondo Garza, M.T., Mercado Cruz, E., Aguilar Medina, D.F.J. & Magos Guerrero, G.A. (2024). <em>Obesidad, dislipidemias y síndrome metabólico: Guía clínica integral</em>. Editorial Médica Panamericana."
  ],
  
  complementaryLegacy: [
    "Organización Mundial de la Salud. (2023). <strong>Obesidad y sobrepeso</strong>. <em>Fichas descriptivas</em>. Recuperado de <a href='https://www.who.int/es/news-room/fact-sheets/detail/obesity-and-overweight' target='_blank' class='break'>https://www.who.int/es/news-room/fact-sheets/detail/obesity-and-overweight</a>"
  ],
  
};