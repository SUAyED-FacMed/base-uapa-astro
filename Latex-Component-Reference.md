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

✅ **Responsivo automático** - Las ecuaciones largas tienen scroll horizontal

## 📱 Comportamiento responsivo

### Display (bloque)
- Scroll horizontal automático si la ecuación es más ancha que la pantalla
- Indicador visual en móviles cuando hay scroll
- No rompe el diseño

### Inline (en línea)
- Se ajusta al flujo del texto
- Scroll horizontal si es necesario
- No afecta el line-height del párrafo

### Ejemplo de ecuación larga

```astro
<!-- Esta ecuación será scrolleable en móviles -->
<Latex 
  formula="f(x) = a_0 + a_1x + a_2x^2 + a_3x^3 + a_4x^4 + a_5x^5 + \cdots + a_nx^n" 
  display={true} 
/>
```

## Ver también

- [LaTeX-KaTeX-Guide.md](LaTeX-KaTeX-Guide.md) - Guía completa
- [Documentación de KaTeX](https://katex.org/docs/supported.html) - Funciones soportadas
