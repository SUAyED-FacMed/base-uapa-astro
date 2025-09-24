#!/bin/bash

# Script para actualizar un proyecto derivado con cambios del template base
# Uso: ./update-from-template.sh

TEMPLATE_REPO="https://github.com/SUAyED-FacMed/base-uapa-astro.git"
TEMPLATE_BRANCH="main"

echo "🔄 Actualizando desde template base..."

# Agregar el template como remote si no existe
if ! git remote get-url template >/dev/null 2>&1; then
    echo "➕ Agregando template como remote..."
    git remote add template $TEMPLATE_REPO
fi

# Fetch del template
echo "📥 Descargando cambios del template..."
git fetch template $TEMPLATE_BRANCH

# Crear branch temporal para merge
TEMP_BRANCH="update-from-template-$(date +%Y%m%d-%H%M%S)"
echo "🌿 Creando branch temporal: $TEMP_BRANCH"
git checkout -b $TEMP_BRANCH

# Merge cambios del template
echo "🔀 Aplicando cambios del template..."
git merge template/$TEMPLATE_BRANCH --no-commit --no-ff

echo "✅ Cambios aplicados. Revisa los conflictos si los hay."
echo "📋 Comandos sugeridos:"
echo "   git status                    # Ver estado"
echo "   git add .                     # Agregar cambios"
echo "   git commit -m 'Update from template'"
echo "   git checkout main             # Volver a main"
echo "   git merge $TEMP_BRANCH        # Aplicar cambios"
echo "   git branch -d $TEMP_BRANCH    # Limpiar branch temporal"