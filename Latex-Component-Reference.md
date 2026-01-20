# Componente Latex - Referencia Rápida

## Importación

```astro
---
import Latex from "../components/Latex.astro";
---
```

## Props

| Prop | Tipo | Por defecto | Descripción |
|------|------|-------------|-------------|
| `formula` | `string` | requerido | La ecuación LaTeX (sin delimitadores) |
| `display` | `boolean` | `false` | Si `true`, muestra en bloque (centrada); si `false`, en línea |

## Ejemplos rápidos

### Inline (en línea)

```astro
<p>La ecuación de Einstein es <Latex formula="E = mc^2" />.</p>
```

### Display (en bloque)

```astro
<Latex formula="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" display={true} />
```

## Casos de uso comunes

### Fracciones

```astro
<Latex formula="\frac{numerador}{denominador}" />
```

### Subíndices y superíndices

```astro
<Latex formula="x^2 + x_i" />
```

### Raíces

```astro
<Latex formula="\sqrt{x}" />
<Latex formula="\sqrt[n]{x}" />
```

### Símbolos griegos

```astro
<Latex formula="\alpha, \beta, \gamma, \Delta, \Sigma" />
```

### Sumatorias e integrales

```astro
<Latex formula="\sum_{i=1}^{n} x_i" />
<Latex formula="\int_{a}^{b} f(x) dx" />
```

### Matrices

```astro
<Latex formula="\begin{pmatrix} a & b \\ c & d \end{pmatrix}" display={true} />
```

### Ecuaciones con llaves (piecewise)

```astro
<Latex formula="f(x) = \begin{cases} x^2 & \text{si } x > 0 \\ 0 & \text{si } x \leq 0 \end{cases}" display={true} />
```

### Vectores y acentos

```astro
<Latex formula="\vec{v}, \bar{x}, \hat{y}, \dot{x}" />
```

## Notas importantes

⚠️ **NO uses** directamente `$...$` en archivos Astro - causará errores de compilación

✅ **USA** siempre el componente `<Latex>`

✅ **Backslashes simples** en el prop `formula` (no dobles)

## Ver también

- [LaTeX-KaTeX-Guide.md](LaTeX-KaTeX-Guide.md) - Guía completa
- [Documentación de KaTeX](https://katex.org/docs/supported.html) - Funciones soportadas
