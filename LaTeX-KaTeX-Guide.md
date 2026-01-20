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

Debido a que Astro usa llaves `{}` para expresiones JavaScript, **no podemos usar la sintaxis tradicional `$...$`** directamente en el HTML. En su lugar, usa el componente `<Latex>`:

### Método recomendado: Componente `<Latex>`

Importa el componente en tu página:

```astro
---
import Latex from "../components/Latex.astro";
---
```

#### Ecuaciones en línea (inline)

```astro
<p>
  La fórmula de Einstein es <Latex formula="E = mc^2" />.
</p>
```

Resultado: La fórmula de Einstein es \(E = mc^2\).

#### Ecuaciones en bloque (display)

```astro
<p>La integral definida:</p>
<Latex formula="\int_{a}^{b} f(x) dx = F(b) - F(a)" display={true} />
```

Resultado:
\[\int_{a}^{b} f(x) dx = F(b) - F(a)\]

### Método alternativo: Sintaxis LaTeX estándar con `set:html`

Si prefieres escribir LaTeX directamente en texto, usa `set:html`:

```astro
<p set:html="La ecuación es \\(E = mc^2\\) donde..."></p>
```

O para bloques:

```astro
<div set:html="\\[\int_{a}^{b} f(x) dx = F(b) - F(a)\\]"></div>
```

**Nota:** Usa **doble backslash** `\\(` y `\\)` (o `\\[` y `\\]`) como delimitadores.

## 📚 Ejemplos de uso

### Ejemplo 1: Ecuación cuadrática

```astro
<p>
  La solución de la ecuación cuadrática <Latex formula="ax^2 + bx + c = 0" /> es:
</p>
<Latex formula="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" display={true} />
```

### Ejemplo 2: Matrices

```astro
<Latex formula="\begin{pmatrix} a & b \\ c & d \end{pmatrix}" display={true} />
```

### Ejemplo 3: Sistemas de ecuaciones

```astro
<Latex formula="\begin{cases} x + y = 5 \\ 2x - y = 1 \end{cases}" display={true} />
```

### Ejemplo 4: Fracciones y raíces en texto

```astro
<p>
  El área de un círculo es <Latex formula="A = \pi r^2" /> y su circunferencia 
  es <Latex formula="C = 2\pi r" />.
</p>

<p>La desviación estándar se calcula como:</p>
<Latex formula="\sigma = \sqrt{\frac{1}{N}\sum_{i=1}^{N}(x_i - \mu)^2}" display={true} />
```

### Ejemplo 5: Uso en tablas

```astro
<table>
  <tr>
    <td>Fórmula</td>
    <td><Latex formula="E = mc^2" /></td>
  </tr>
  <tr>
    <td>Variable</td>
    <td><Latex formula="c \approx 3 \times 10^8 \, m/s" /></td>
  </tr>
</table>
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
    {left: '\\[', right: '\\]', display: true},   // Bloques: \[ ... \]
    {left: '\\(', right: '\\)', display: false}   // Inline: \( ... \)
  ],
  throwOnError: false  // No rompe si hay errores de sintaxis
});
```

**Nota importante:** Se eliminaron los delimitadores `$...$` y `$$...$$` porque causan conflictos con la sintaxis de Astro (que usa `{}` para expresiones JavaScript). Por eso usamos el componente `<Latex>` que maneja esto automáticamente.

## 📖 Recursos adicionales

- [Documentación oficial de KaTeX](https://katex.org/)
- [Funciones soportadas](https://katex.org/docs/supported.html)
- [Tabla de símbolos](https://katex.org/docs/support_table.html)

## 📱 Comportamiento responsivo

El componente `<Latex>` es completamente responsivo:

### Ecuaciones en línea (inline)
- Se ajustan al flujo del texto
- En caso de ser muy largas, tienen scroll horizontal automático
- No rompen el diseño del párrafo

### Ecuaciones en bloque (display)
- Se centran automáticamente
- **Scroll horizontal automático** cuando la ecuación es más ancha que la pantalla
- Indicador visual sutil en móviles cuando hay scroll disponible
- Scrollbar personalizada y discreta

### Ejemplo de ecuación larga

```astro
<Latex 
  formula="f(x) = a_0 + a_1x + a_2x^2 + a_3x^3 + a_4x^4 + a_5x^5 + a_6x^6 + a_7x^7 + \cdots" 
  display={true} 
/>
```

En pantallas pequeñas, esta ecuación tendrá scroll horizontal automático sin romper el diseño.

### Personalización de estilos

Los estilos responsivos están definidos en [public/css/personalizado.css](public/css/personalizado.css):

```css
.katex-display-wrapper {
    overflow-x: auto;
    max-width: 100%;
    padding: 1rem 0;
}
```

Puedes personalizar el tamaño de fuente para móviles si es necesario:

```css
@media (max-width: 768px) {
    .katex-display-wrapper {
        font-size: 0.9em;
    }
}
```

## ⚠️ Notas importantes

1. **Conflicto con sintaxis de Astro**: No uses `$...$` directamente en archivos `.astro` porque las llaves `{}` dentro de las fórmulas LaTeX conflictúan con las expresiones JavaScript de Astro. Siempre usa el componente `<Latex>`.

2. **Rendimiento**: KaTeX se carga desde CDN (Content Delivery Network) para estar siempre actualizado y aprovechar el caché del navegador.

3. **Versión**: Actualmente se usa KaTeX v0.16.9. Puedes actualizar la versión en [ResourceLoader.astro](src/components/ResourceLoader.astro#L297-L301).

4. **Compatibilidad**: KaTeX es compatible con todos los navegadores modernos.

5. **Backslashes**: En el componente `<Latex>`, usa backslashes simples `\`. Si usas `set:html`, usa dobles backslashes `\\`.

## 🐛 Solución de problemas

### Las ecuaciones no se renderizan

1. Verifica que `enableLatex: true` en [uapa-config.ts](src/config/uapa-config.ts) o que hayas añadido `"katex"` al array `resources` en el Layout
2. Asegúrate de haber importado el componente: `import Latex from "../components/Latex.astro";`
3. Abre la consola del navegador (F12) y busca errores
4. Verifica que KaTeX se haya cargado (debe aparecer en Console: "KaTeX inicializado correctamente")

### Error de sintaxis en una ecuación

- KaTeX tiene `throwOnError: false`, así que mostrará el LaTeX sin renderizar si hay errores
- Verifica la sintaxis en la [documentación de KaTeX](https://katex.org/docs/supported.html)
- Asegúrate de usar backslashes simples en el componente `<Latex>`
- Verifica que las llaves `{}` estén balanceadas en la fórmula

### Errores de compilación de Astro

- Si ves errores como "Unexpected token" o problemas con `{}`, asegúrate de estar usando el componente `<Latex>` en lugar de escribir ecuaciones directamente
- No uses `$...$` directamente en archivos `.astro`

### Ejemplos que no funcionan ❌

```astro
<!-- ❌ NO HACER - causa errores -->
<p>La fórmula es $E = mc^2$</p>
<p>$$\frac{a}{b}$$</p>
```

### Ejemplos correctos ✅

```astro
<!-- ✅ CORRECTO - usa el componente -->
<p>La fórmula es <Latex formula="E = mc^2" /></p>
<Latex formula="\frac{a}{b}" display={true} />
```
