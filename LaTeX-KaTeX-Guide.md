# Guía de uso de LaTeX/KaTeX

Esta guía explica cómo habilitar y usar el renderizado de ecuaciones matemáticas con LaTeX en tu proyecto UAPA.

## 📋 Descripción

KaTeX es una biblioteca rápida y ligera para renderizar ecuaciones matemáticas en LaTeX. A diferencia de MathJax, KaTeX es más rápido y no bloquea el renderizado de la página.

## 🚀 Cómo habilitar LaTeX

### Opción 1: Habilitar globalmente (recomendado si usas muchas ecuaciones)

Edita el archivo [src/config/uapa-config.ts](src/config/uapa-config.ts) y cambia:

```typescript
enableLatex: false,  // ❌ Deshabilitado por defecto
```

a:

```typescript
enableLatex: true,   // ✅ Habilitado
```

Esto cargará automáticamente KaTeX en todas las páginas del proyecto.

### Opción 2: Habilitar solo en páginas específicas

Si solo necesitas LaTeX en algunas páginas, déjalo deshabilitado en la configuración global y cárgalo manualmente en las páginas que lo necesiten:

```astro
---
import Layout from "../layouts/Layout.astro";

const recursos = ['katex']; // Cargar KaTeX solo en esta página
---

<Layout 
  title="Página con ecuaciones"
  resources={recursos}
>
  <!-- Contenido -->
</Layout>
```

## ✍️ Cómo escribir ecuaciones

KaTeX soporta varios delimitadores para ecuaciones:

### Ecuaciones en línea (inline)

```markdown
La fórmula de Einstein es $E = mc^2$.
```

Resultado: La fórmula de Einstein es $E = mc^2$.

### Ecuaciones en bloque (display)

```markdown
$$
\int_{a}^{b} f(x) dx = F(b) - F(a)
$$
```

Resultado:
$$
\int_{a}^{b} f(x) dx = F(b) - F(a)
$$

### Sintaxis alternativa con paréntesis/corchetes

También puedes usar la sintaxis de LaTeX estándar:

- Inline: `\( E = mc^2 \)`
- Display: `\[ \int_{a}^{b} f(x) dx \]`

## 📚 Ejemplos de uso

### Ejemplo 1: Ecuación cuadrática

```astro
<p>
  La solución de la ecuación cuadrática $ax^2 + bx + c = 0$ es:
</p>
$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
```

### Ejemplo 2: Matrices

```astro
$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
$$
```

### Ejemplo 3: Sistemas de ecuaciones

```astro
$$
\begin{cases}
x + y = 5 \\
2x - y = 1
\end{cases}
$$
```

### Ejemplo 4: Fracciones y raíces

```astro
<p>
  El área de un círculo es $A = \pi r^2$ y su circunferencia es $C = 2\pi r$.
</p>

<p>
  La desviación estándar se calcula como:
</p>
$$
\sigma = \sqrt{\frac{1}{N}\sum_{i=1}^{N}(x_i - \mu)^2}
$$
```

## 🎨 Características disponibles

KaTeX soporta una amplia gama de funciones matemáticas:

- **Operadores**: `+`, `-`, `\times`, `\div`, `\pm`, `\mp`
- **Relaciones**: `=`, `\neq`, `<`, `>`, `\leq`, `\geq`, `\approx`
- **Funciones**: `\sin`, `\cos`, `\tan`, `\log`, `\ln`, `\exp`
- **Símbolos griegos**: `\alpha`, `\beta`, `\gamma`, `\Delta`, `\Sigma`
- **Integrales**: `\int`, `\iint`, `\iiint`, `\oint`
- **Sumatorias**: `\sum`, `\prod`
- **Límites**: `\lim`, `\sup`, `\inf`
- **Matrices**: `\begin{matrix}`, `\begin{pmatrix}`, `\begin{bmatrix}`
- **Fracciones**: `\frac{a}{b}`, `\dfrac{a}{b}`, `\tfrac{a}{b}`
- **Raíces**: `\sqrt{x}`, `\sqrt[n]{x}`
- **Acentos**: `\hat{x}`, `\bar{x}`, `\vec{x}`, `\dot{x}`, `\ddot{x}`

## 🔧 Configuración avanzada

La configuración de KaTeX está en [src/components/ResourceLoader.astro](src/components/ResourceLoader.astro#L295-L323):

```javascript
renderMathInElement(document.body, {
  delimiters: [
    {left: '$$', right: '$$', display: true},    // Bloques
    {left: '$', right: '$', display: false},     // Inline
    {left: '\\(', right: '\\)', display: false}, // Inline alternativo
    {left: '\\[', right: '\\]', display: true}   // Bloque alternativo
  ],
  throwOnError: false  // No rompe si hay errores de sintaxis
});
```

## 📖 Recursos adicionales

- [Documentación oficial de KaTeX](https://katex.org/)
- [Funciones soportadas](https://katex.org/docs/supported.html)
- [Tabla de símbolos](https://katex.org/docs/support_table.html)

## ⚠️ Notas importantes

1. **Rendimiento**: KaTeX se carga desde CDN (Content Delivery Network) para estar siempre actualizado y aprovechar el caché del navegador.

2. **Versión**: Actualmente se usa KaTeX v0.16.9. Puedes actualizar la versión en [ResourceLoader.astro](src/components/ResourceLoader.astro#L297-L301).

3. **Compatibilidad**: KaTeX es compatible con todos los navegadores modernos.

4. **Escapado**: Si necesitas mostrar símbolos `$` literales sin renderizar, escápalos: `\$`.

## 🐛 Solución de problemas

### Las ecuaciones no se renderizan

1. Verifica que `enableLatex: true` en [uapa-config.ts](src/config/uapa-config.ts)
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que KaTeX se haya cargado (debe aparecer en Console: "KaTeX inicializado correctamente")

### Error de sintaxis en una ecuación

- KaTeX tiene `throwOnError: false`, así que mostrará el LaTeX sin renderizar
- Verifica la sintaxis en la [documentación de KaTeX](https://katex.org/docs/supported.html)
- Asegúrate de escapar correctamente los backslashes en strings de JavaScript

### El símbolo `$` aparece en el texto

- Si quieres usar `$` como símbolo de moneda, escápalo: `\$100`
- O usa los delimitadores alternativos `\(` y `\)` para las ecuaciones
