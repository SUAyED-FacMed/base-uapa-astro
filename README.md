# Base UAPA Astro

Plantilla base para crear **Unidades de Aprendizaje Autodirigido (UAPA)** utilizando Astro y componentes reutilizables.

## 📚 ¿Qué es este proyecto?

Este es un template que permite crear UAPAs de manera eficiente mediante la componetización, incluyendo:

- 🧩 **Componentes reutilizables** para actividades, evaluaciones y recursos
- 🎨 **Estilos UNAM/CUAIEED** preconfigurados  
- 📱 **Diseño responsivo** con Bootstrap 5
- ⚡ **Performance optimizado** con Astro
- 🔧 **Configuración centralizada** para fácil personalización

## 🚀 Estructura del Proyecto

```text
/
├── public/                 # Recursos estáticos
│   ├── css/               # Estilos base y Bootstrap
│   ├── js/                # Scripts del cliente
│   ├── img/               # Imágenes base
│   └── evaluacion/        # Recursos de evaluación
├── src/
│   ├── components/        # Componentes Astro reutilizables
│   ├── config/            # Configuración de contenidos
│   ├── layouts/           # Layout base
│   └── pages/             # Páginas del sitio
└── docs/                  # Documentación y guías
```

## 🛠️ Uso como Template

### Crear nuevo proyecto UAPA

1. **Desde GitHub**: Clic en "Use this template" → "Create a new repository"
2. **Clonar y configurar**:

```bash
git clone https://github.com/tu-usuario/nueva-uapa.git
cd nueva-uapa
npm install
```

3. **Personalizar contenido** en `src/config/`

### Actualizar desde template base

```bash
# Copiar script de actualización
cp scripts/update-from-template.sh ./

# Ejecutar cuando haya actualizaciones
./update-from-template.sh
```

## 🧞 Comandos

| Comando           | Acción                                    |
| :---------------- | :---------------------------------------- |
| `npm install`     | Instalar dependencias                     |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321` |
| `npm run build`   | Construir para producción en `./dist/`   |
| `npm run preview` | Previsualizar build local                 |

## 📖 Documentación

- **[Flujo de Trabajo](./docs/WORKFLOW.md)** - Cómo usar el template y actualizaciones
- **[Guía Git Upstream](./docs/GIT-UPSTREAM-GUIDE.md)** - Configuración de remotes
- **[Configuración Centralizada](./ConfigCentralizada-Guide.md)** - Personalización de contenidos
- **[ResourceLoader](./ResourceLoader-Guide.md)** - Carga de recursos dinámicos

## 🤝 Contribuir

Este template es mantenido por **SUAyED-FacMed**. Para reportar bugs o sugerir mejoras, abre un issue en el repositorio.

---

Desarrollado con ❤️ para la comunidad educativa UNAM
