# Traspaso a Webflow

Guía para construir este sitio en Webflow (a mano o con el MCP de Webflow) a partir del código de este repo. El HTML y el CSS ya siguen **Client-First** y la estructura de Webflow, así que la idea es copiar 1:1: mismas clases, mismos valores, mismas variables.

## Archivos

| Archivo | Qué es | En Webflow |
|---|---|---|
| `index.html` | Estructura y contenido, con clases Client-First | Se reconstruye en el Designer, elemento por elemento |
| `assets/css/webflow.css` | Todo lo que se puede hacer en el Designer: variables, estilos de etiquetas, clases, combos, estados y breakpoints | Variables + Style panel |
| `assets/css/custom.css` · **Parte A** | Lo que el Designer no puede expresar | Embed `global-styles` (Client-First) |
| `assets/css/custom.css` · **Parte B** | Sustitutos locales de funciones nativas de Webflow | **No se porta** |
| `assets/js/custom.js` | Comportamiento propio (validación del formulario, video, `data-topic`) | Site settings › Custom code › Footer code |
| `assets/js/webflow-preview.js` | Sustitutos locales de Navbar, Tabs, scroll y envío del formulario | **No se porta** |
| `assets/img/*` | Imágenes y logos | Assets panel |
| `assets/video/placeholder.mp4` | Video provisorio | Reemplazar por el video final (hosting externo o Assets) |

## Convenciones (Client-First)

- **Estructura de cada sección:** `section_[nombre]` › `padding-global` › `container-large` › `padding-section-large` (o `-medium`) › contenido.
- **Clases propias:** `[componente]_[elemento]`, por ejemplo `hero_dashboard-row` o `platform_signal-label`.
- **Variantes:** combo classes con prefijo `is-`, por ejemplo `button is-secondary`, `tag is-primary` o `insights_card is-tint`.
- **Clases globales** (sin guion bajo): `button`, `tag`, `icon-tile`, `arrow-link_component`, `section-header_component`, `cta-banner_component`.
- **Clases de utilidad Client-First:** `page-wrapper`, `main-wrapper`, `padding-global`, `container-large`, `padding-section-large`, `padding-section-medium`.
- **Íconos con dos clases:** `programs_pillar-icon icon-tile` (clase propia + global). La propia solo agrega la ubicación en la grilla (`grid-row: span 2`).
- **Clases sin estilo:** algunas solo dan estructura (`hero_content`, `way_video`, `section-header_title-wrap`…) y no tienen estilos. Se crean igual para respetar la estructura.
- **Unidades:** los valores están en px, igual que el diseño aprobado. Si se prefiere rem (Client-First lo recomienda), la conversión es 1rem = 16px.

## Variables

Todas están en `:root` dentro de `webflow.css`. En Webflow se crean con el mismo nombre, en una colección organizada por carpetas:

- **Colores:** `color-brand/*`, `color-dark/*`, `color-on-dark/*`, `color-light/*`, `color-text/*`, `color-border/*` y `color-tag/*`.
- **Tipografía:** `font/heading` (Public Sans), `font/body` (Inter), `tracking/heading` y `tracking/body`.
- **Bordes:** `radius/small` (4px) y `radius/medium` (6px).

Los colores sueltos que quedan fuera de las variables están solo en SVG embebidos o en `custom.css`.

## Breakpoints

| CSS | Webflow |
|---|---|
| base | Desktop (992px+), punto de partida |
| `@media (min-width:1280px)` | 1280px: solo el espacio entre los links del menú (24 → 30px) |
| `@media (max-width:991px)` | Tablet |
| `@media (max-width:767px)` | Mobile landscape |
| `@media (max-width:478px)` | Mobile portrait |

## Estilos de etiquetas

En `webflow.css`, secciones "Tags" y "Typography scale": `body`, `a`, `h1`–`h6` y `p`. En Webflow van en el Style panel sobre Body, All Links, All H1–H6 Headings y All Paragraphs.

## Tipografía

**Regla:** las clases de componente nunca cambian el tamaño de un heading o un párrafo. Solo definen color, márgenes, ancho máximo o, en algún caso, la familia o el peso (por ejemplo la cita).

**Headings:** cada heading toma el tamaño de su etiqueta. Para que se vea como otro nivel sin cambiar la semántica, se agrega la clase `heading-style-hX` correspondiente, por ejemplo `<h3 class="programs_pillar-title heading-style-h5">`.

| Nivel | Tamaño | Peso | Interlineado | Fuente |
|---|---|---|---|---|
| h1 / `heading-style-h1` | clamp(2.4rem, 4vw, 3.4rem) | 700 | 1.12 | Public Sans |
| h2 / `heading-style-h2` | clamp(2rem, 3.2vw, 2.875rem) | 700 | 1.08 | Public Sans |
| h3 / `heading-style-h3` | 1.7rem | 700 | 1.2 | Public Sans |
| h4 / `heading-style-h4` | 1.375rem | 600 | 1.3 | Public Sans |
| h5 / `heading-style-h5` | 1.25rem | 600 | 1.3 | Public Sans |
| h6 / `heading-style-h6` | .9rem | 600 | 1.2 | Inter |

h1 a h5 usan `tracking/heading` y h6 usa `tracking/body`.

**Párrafos:** el texto base es 1rem con interlineado 1.6 y se hereda en todo el sitio. Encima hay tres tamaños de utilidad:

| Clase | Tamaño | Interlineado |
|---|---|---|
| `text-size-large` | 1.125rem | 1.5 |
| `text-size-small` | .9rem | 1.6 (heredado) |
| `text-size-tiny` | .8125rem | 1.5 |

**Excepción:** los textos de las ilustraciones (dashboard del hero, portal de Platform, nodo de Who we work with), las etiquetas y los links de listas son UI, no texto de lectura. Mantienen tamaños propios en su clase de componente.

## Íconos

- **Librería:** [Lucide](https://lucide.dev) (licencia ISC, libre para uso comercial). Los SVG del sitio salen de `lucide-static@0.460.0`.
- **Cómo agregar uno nuevo:** copiar el SVG desde lucide.dev, quitarle la clase, dejar `stroke="currentColor"` y agregar `aria-hidden="true"`. En Webflow va dentro de un Code Embed, con la clase en el embed.
- **Grosor del trazo** según el tamaño, para que todos se vean con un trazo parecido (unos 1.5px):

| Tamaño | `stroke-width` | Dónde |
|---|---|---|
| 22–24px | 1.75 | Íconos de contenido (`icon-tile`, `proof_icon`, cita) |
| 18px | 2 | Dashboard del hero |
| 16px | 2.25 | Flecha de `arrow-link` |
| 14px | 2.5 | Señales de Platform |

- **Íconos en uso:** arrow-right, clock, shield, cpu, search-check, award, users, quote, play (con relleno), user, trending-up, briefcase, house, layers, map-pin, file-check, triangle-alert, check y chevron-down (flecha del select, en `assets/img/select-chevron.svg`).
- **Fuera de Lucide:** los isotipos de Ledgebrook y Stonehaven son logos de marca, no íconos, y no se reemplazan.

## Elementos nativos

| Parte del sitio | Elemento de Webflow | Notas |
|---|---|---|
| Header | **Navbar** | `navbar_component` (Navbar) › `navbar_container` › `navbar_logo-link` (Brand), `navbar_menu` (Nav Menu) con `navbar_link` (Nav Links), `navbar_divider`, `navbar_login`, `navbar_button`, y `navbar_menu-button` (Menu Button). Se colapsa en Tablet. |
| Selector MGAs / Reinsurers | **Tabs** | `hero_tabs` (Tabs) › `hero_tabs-menu` (Tabs Menu) con `hero_tab-link` (Tab Links), `hero_tabs-content` (Tabs Content) con dos `hero_tab-pane`. El estado activo se estiliza en el estado Current (`.w--current`). |
| Formulario | **Form Block** | `form_component` (Form Block) › `form_form` (Form), `form_message-success` (Success Message), `form_message-error` (Error Message). Campos: `form_input`, `form_input is-select` y `form_input is-text-area`. |
| Cards de About con link | **Link Block** | `about_family-card`. La card de Stonehaven es un Div, no un link. |
| Listas | **List / List Item** | `proof_list`, `about_family-list`, `insights_*-list`, `footer_link-list`, `programs_orbit-steps` |
| Íconos, gráficos de Platform y del hero, logos de Ledgebrook | **Code Embed** | La clase va en el embed (por ejemplo `proof_icon` o `platform_chart-plot`) y el `<svg>` va adentro. |
| Video | **Code Embed** | Todo el bloque `video_component`. Los estilos están en `custom.css` y el comportamiento en `custom.js`. |
| Anillo de Platform | **Code Embed** | `programs_orbit-embed` con el `<svg class="orbit-svg">`. La animación está en `custom.css`. |

## Componentes recomendados

- **Navbar** y **Footer.**
- **CTA banner** (`cta-banner_component`). Se usa tres veces, con props para título, texto, texto del botón, link del botón, `id` y `data-topic`.
- **Section header** (`section-header_component`). Props: eyebrow, título y texto. La variante `is-alternate` se usa en secciones oscuras y `is-compact` / `is-flush` controlan el margen inferior.

## Interacciones a construir

1. **Navbar con scroll** (Page scroll, a partir de unos 40px). Replica la Parte B de `custom.css`:
   - `navbar_background`: alto 60px, fondo `rgba(255,255,255,.92)`, sombra `0 1px 0` `color-border/primary` y blur.
   - `navbar_container`: alto 60px.
   - `navbar_logo`: alto 36px, y se cambia el logo claro por el oscuro (`navbar_logo is-dark`).
   - El texto del navbar pasa a `color-text/primary`.
   - `navbar_divider`: fondo `rgba(30,52,75,.3)`.
   - `navbar_button`: fondo `color-brand/blue` y texto blanco (hover `color-brand/blue-dark`).
2. **Navbar abierto en Tablet y Mobile:** fondo `color-dark/dusk` y menú en columna. Los valores están en la Parte B de `custom.css`.

## Código custom

- **`custom.css` Parte A**, en el embed `global-styles`:
  - Outline de foco y scroll suave.
  - Hover del arrow link: subrayado y desplazamiento del ícono, también al pasar por la card.
  - Anillo de Who we work with (gradiente cónico con máscara).
  - Opciones del select.
  - Aparición suave del mensaje de éxito.
  - Video, anillo de Platform y palabra "Stonehaven" del footer.
- **`custom.js`:**
  - Preselección del tipo de consulta con el atributo `data-topic`.
  - Video.
  - Validación del formulario. Corre antes del envío de Webflow y lo frena si hay errores.
- **Atributos custom a cargar:**
  - `data-topic` en los botones que preseleccionan la consulta.
  - Los ids de las anclas: `#programs`, `#reinsurers`, `#platform`, `#about`, `#team`, `#insights`, `#contact`, `#contact-sec`, `#portal`, `#careers`, `#press`, `#industry-insights`, `#stonehaven-way` y `#claims-philosophy`.
  - Los atributos `aria-*` y `role` que están en el HTML.

## Propiedades sin control en el Style panel

En `webflow.css` están marcadas con `/* custom property */`. Se agregan con "+ Add custom property" en el Style panel:

- `text-wrap: balance`
- `clip` (lista de pasos accesible)
- `appearance: none` (select)
- `resize: vertical` (textarea)

## A verificar al conectar el MCP

- [ ] **`clamp()`:** el Style panel debe aceptarlo en los tamaños de `h2` y `hero_heading`. Si no, pasar a valores fijos por breakpoint.
- [ ] **`line-height: normal`:** si no se acepta, usar 1.21 para Inter y 1.175 para Public Sans.
- [ ] **Fondo de `section_reinsurers` y `section_about`:** es un radial con tamaño `70% 60%` y posición `90% 0%`, más un lineal. Hay que revisar si el editor de gradientes acepta ese tamaño.
- [ ] **Tabs:** confirmar que el Designer permite el texto "What we offer" dentro del Tabs Menu y el `h1` entre el menú y el contenido. Si no, mover el label fuera del menú.
- [ ] **Estilos por defecto de Webflow** que hay que anular:
  - `.w-input` y `.w-select` tienen alto de 38px y margen inferior: hay que poner alto auto y margen 0 (ya está en `form_input`).
  - `label` viene en negrita.
  - `.w-form` trae margen.
  - `.w-form-done` y `.w-form-fail` traen fondo y padding propios.
- [ ] **Mensaje de éxito:** en Webflow el formulario se oculta y aparece el mensaje. `form_success-content` tiene un alto mínimo de 384px para que la caja no cambie de tamaño en desktop.

## Antes de publicar

- Quitar el banner `concept-banner`.
- Usar una URL absoluta en `og:image`.
- Reemplazar el video y los textos entre corchetes (`[State]`, `[Name]`, `[MGA name]`, etc.).
- Más adelante: pasar Press, Insights y Leadership a CMS, sin cambiar las clases actuales.
