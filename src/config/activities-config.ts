// Configuración de actividades y evaluaciones
import { UAPA_CONFIG } from './uapa-config.ts';

export const ACTIVITIES_CONFIG = {
  actividad1: {
    id: "actividad1",
    title: "Actividad. Comunicación de riesgos ambientales",
    description: "Cras et tortor ipsum. Suspendisse potenti. Donec suscipit sed nunc vitae mattis. Praesent cursus elit odio, id laoreet nisl vestibulum a. Integer eu feugiat nulla.",
    modalId: "act-1",
    modalTitle: "Actividad. Comunicación de riesgos ambientales",
    iframeSrc: "evaluacion/verdadero_falso/index.html"
  },
  
  actividad2: {
    id: "actividad2", 
    title: "Actividad 2. Quisque pellentesque neque vel turpis gravida mattis",
    description: "Cras et tortor ipsum. Suspendisse potenti. Donec suscipit sed nunc vitae mattis. Praesent cursus elit odio, id laoreet nisl vestibulum a. Integer eu feugiat nulla.",
    modalId: "act-2",
    modalTitle: "Actividad 2. Quisque pellentesque neque vel turpis gravida mattis", 
    iframeSrc: "evaluacion/completar_eligiendo/index.html"
  }
};

export const ASSESSMENTS_CONFIG = {
  autoevaluacion1: {
    id: "autoevaluacion1",
    title: "Autoevaluación. Vestibulum dignissim mauris vel",
    description: "Proin sagittis condimentum luctus. Nullam maximus porttitor ex quis egestas. Suspendisse maximus velit venenatis feugiat tempus.",
    modalId: "autoe-1", 
    modalTitle: "Autoevaluación. Vestibulum dignissim mauris vel",
    iframeSrc: "evaluacion/opcion_multiple/index.html"
  }
};