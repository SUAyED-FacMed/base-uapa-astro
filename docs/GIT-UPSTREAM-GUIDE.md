# Git Remotes y Upstream - Guía Completa

## 1. Situación Inicial (después de hacer fork)

```bash
# Clonaste tu fork
git clone https://github.com/tu-usuario/uapa-matematicas-i.git
cd uapa-matematicas-i

# Solo tienes origin (tu fork)
git remote -v
# origin  https://github.com/tu-usuario/uapa-matematicas-i.git (fetch)
# origin  https://github.com/tu-usuario/uapa-matematicas-i.git (push)
```

## 2. Agregar Upstream (repositorio original)

```bash
# Agregar el repo original como upstream
git remote add upstream https://github.com/SUAyED-FacMed/base-uapa-astro.git

# Verificar
git remote -v
# origin    https://github.com/tu-usuario/uapa-matematicas-i.git (fetch)
# origin    https://github.com/tu-usuario/uapa-matematicas-i.git (push)
# upstream  https://github.com/SUAyED-FacMed/base-uapa-astro.git (fetch)
# upstream  https://github.com/SUAyED-FacMed/base-uapa-astro.git (push)
```

## 3. Flujo de Trabajo Completo

### Actualizar desde Upstream
```bash
# 1. Fetch cambios del repositorio original
git fetch upstream

# 2. Ver qué branches hay disponibles
git branch -r
# origin/main
# upstream/main

# 3. Cambiar a tu rama main
git checkout main

# 4. Merge cambios del upstream
git merge upstream/main

# 5. Push a tu fork
git push origin main
```

### Actualización Selectiva (MÁS SEGURO)
```bash
# 1. Crear branch para revisar cambios
git checkout -b update-from-upstream

# 2. Fetch del upstream
git fetch upstream main

# 3. Ver qué cambió
git log --oneline main..upstream/main
git diff main upstream/main

# 4. Merge o cherry-pick selectivo
git merge upstream/main
# O para archivos específicos:
git checkout upstream/main -- src/components/
git checkout upstream/main -- package.json

# 5. Revisar, commitear y merge a main
git add .
git commit -m "feat: update from upstream template"
git checkout main
git merge update-from-upstream
```

## 4. Visualización del Flujo

```
Tiempo ──────────────────────────────────────────►

Upstream:     A ─── B ─── C ─── D (nuevas features)
              │
              └─fork─┐
Tu Fork:              A ─── E ─── F (tu contenido)
                            │
                            └─fetch upstream─┐
                                             │
Resultado:                                   A ─── E ─── F ─── G
                                                              │
                                                          (merge D)
```

## 5. Comandos Útiles

```bash
# Ver estado de remotes
git remote show upstream
git remote show origin

# Ver diferencias con upstream
git log --graph --oneline --all
git diff upstream/main

# Eliminar upstream si ya no lo necesitas
git remote remove upstream

# Cambiar URL de upstream
git remote set-url upstream nueva-url
```

## 6. Workflow Recomendado para UAPAs

```bash
# Setup inicial (una sola vez por proyecto)
git remote add upstream https://github.com/SUAyED-FacMed/base-uapa-astro.git

# Rutina mensual/cuando haya actualizaciones
git fetch upstream main
git checkout -b sync-template-$(date +%Y%m%d)
git merge upstream/main
# Resolver conflictos si los hay
git checkout main
git merge sync-template-$(date +%Y%m%d)
git push origin main
```

## ⚠️ Importantes Consideraciones

### ✅ Ventajas
- Mantenes conexión con el template original
- Actualizaciones controladas
- Puedes contribuir de vuelta al template

### ⚠️ Cuidados
- **SIEMPRE revisar cambios antes del merge**
- **NO hacer merge directo a main sin revisar**
- **Backup antes de actualizaciones grandes**

### 🚫 Archivos que NO deberías actualizar desde upstream
- Contenido específico del curso (`src/config/activities-config.ts`)
- Imágenes del contenido (`public/img/cont/`)
- Configuración personalizada
- README del proyecto específico