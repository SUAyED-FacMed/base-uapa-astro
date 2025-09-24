#!/bin/bash

# Script para actualizar un proyecto derivado con cambios del template base
# Uso: ./update-from-template.sh

TEMPLATE_REPO="https://github.com/SUAyED-FacMed/base-uapa-astro.git"
TEMPLATE_BRANCH="main"

echo "🔄 Actualizando desde template base..."

# Verificar que estamos en un repositorio git
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "❌ Error: No estás en un repositorio Git"
    exit 1
fi

# Verificar que estamos en branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Cambiando a branch main..."
    git checkout main || {
        echo "❌ Error: No se pudo cambiar a branch main"
        exit 1
    }
fi

# Agregar el template como remote si no existe
if ! git remote get-url template >/dev/null 2>&1; then
    echo "➕ Agregando template como remote..."
    git remote add template $TEMPLATE_REPO
fi

# Fetch del template
echo "📥 Descargando cambios del template..."
git fetch template $TEMPLATE_BRANCH || {
    echo "❌ Error: No se pudo descargar del template"
    exit 1
}

# Verificar si hay cambios nuevos
CHANGES=$(git log --oneline main..template/$TEMPLATE_BRANCH)
if [ -z "$CHANGES" ]; then
    echo "✅ No hay cambios nuevos en el template"
    exit 0
fi

echo "📋 Cambios disponibles en el template:"
echo "$CHANGES"
echo ""

# Crear branch temporal para merge
TEMP_BRANCH="update-from-template-$(date +%Y%m%d-%H%M%S)"
echo "🌿 Creando branch temporal: $TEMP_BRANCH"
git checkout -b $TEMP_BRANCH

# Merge cambios del template
echo "🔀 Aplicando cambios del template..."
if git merge template/$TEMPLATE_BRANCH --allow-unrelated-histories --no-commit --no-ff; then
    echo "✅ Merge exitoso sin conflictos"
    git add .
    git commit -m "feat: update from template $(date +%Y-%m-%d)"
    
    echo "🎉 Cambios aplicados correctamente"
    echo "📋 Comandos sugeridos:"
    echo "   git checkout main             # Volver a main"
    echo "   git merge $TEMP_BRANCH        # Aplicar cambios"
    echo "   git branch -d $TEMP_BRANCH    # Limpiar branch temporal"
else
    MERGE_STATUS=$?
    if [ $MERGE_STATUS -eq 1 ]; then
        echo "⚠️  Hay conflictos que resolver"
        echo "📋 Archivos en conflicto:"
        git status --porcelain | grep "^UU\|^AA\|^DD" | cut -c4-
        echo ""
        echo "🔧 Para resolver conflictos:"
        echo "   1. Edita los archivos en conflicto"
        echo "   2. git add .                      # Marcar como resueltos"
        echo "   3. git commit -m 'feat: update from template $(date +%Y-%m-%d)'"
        echo "   4. git checkout main              # Volver a main"
        echo "   5. git merge $TEMP_BRANCH         # Aplicar cambios"
        echo "   6. git branch -d $TEMP_BRANCH     # Limpiar branch temporal"
        echo ""
        echo "Para abortar: git merge --abort && git checkout main && git branch -D $TEMP_BRANCH"
    else
        echo "❌ Error en el merge"
        git merge --abort
        git checkout main
        git branch -D $TEMP_BRANCH
        exit 1
    fi
fi