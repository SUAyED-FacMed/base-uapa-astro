# Flujo de Trabajo - Base UAPA Astro

## Creación de Nuevos Proyectos

### Opción A: Template Repository (Proyectos Independientes)
```bash
# 1. Crear desde template en GitHub UI
# "Use this template" → Nombre del proyecto

# 2. Clonar el nuevo proyecto
git clone https://github.com/SUAyED-FacMed/uapa-matematicas-i.git
cd uapa-matematicas-i

# 3. Personalizar para el proyecto específico
npm install
```

### Opción B: Con Conexión para Actualizaciones
```bash
# 1. Fork del repositorio base
# 2. Clonar el fork
git clone https://github.com/SUAyED-FacMed/uapa-matematicas-i.git
cd uapa-matematicas-i

# 3. Agregar upstream para actualizaciones
git remote add upstream https://github.com/SUAyED-FacMed/base-uapa-astro.git
```

## Actualización desde Template Base

### Para Proyectos con Conexión (Opción B)
```bash
# 1. Fetch cambios del template base
git fetch upstream main

# 2. Crear branch para merge
git checkout -b update-template

# 3. Merge selectivo de archivos específicos
git checkout upstream/main -- src/components/
git checkout upstream/main -- package.json
# NO actualizar: contenido específico, configuración del proyecto

# 4. Resolver conflictos y commitear
git add .
git commit -m "feat: update components and dependencies from template"

# 5. Merge a main después de revisar
git checkout main
git merge update-template
```

### Para Proyectos Independientes (Opción A)
```bash
# Script manual de sincronización
./scripts/sync-specific-files.sh
```

## Archivos que SÍ se Actualizan
- `src/components/` (componentes base)
- `package.json` (dependencias)
- `astro.config.mjs` (configuración base)
- `public/css/` (estilos base)

## Archivos que NO se Actualizan
- `src/config/` (configuración específica del proyecto)
- `src/pages/` (contenido específico)
- `public/img/cont/` (imágenes del contenido)
- `README.md` (documentación del proyecto)

## Recomendación

**Para tu caso específico:** Usa **Template Repository** + **script de sincronización manual**

### Ventajas:
✅ Proyectos independientes y limpios  
✅ Control total sobre qué actualizar  
✅ No se rompen proyectos existentes  
✅ Historial limpio por proyecto  

### Desventajas:
❌ Actualizaciones manuales  
❌ Requiere disciplina para mantener sincronizado  