# Webflow handoff

A guide to building this site in Webflow (by hand or with the Webflow MCP) from the code in this repo. The HTML and CSS already follow **Client-First** and Webflow's structure, so the plan is a 1:1 copy: same classes, same values, same variables.

## Files

| File | What it is | In Webflow |
|---|---|---|
| `index.html` | Structure and content, with Client-First classes | Rebuilt in the Designer, element by element |
| `assets/css/webflow.css` | Everything the Designer can do: variables, tag styles, classes, combos, states and breakpoints | Variables + Style panel |
| `assets/css/custom.css` · **Part A** | What the Designer can't express | Client-First `global-styles` embed |
| `assets/css/custom.css` · **Part B** | Local stand-ins for native Webflow features | **Not ported** |
| `assets/js/custom.js` | Custom behaviour (form validation, video, `data-topic`) | Site settings › Custom code › Footer code |
| `assets/js/webflow-preview.js` | Local stand-ins for Navbar, Tabs, scroll and form submission | **Not ported** |
| `assets/img/*` | Images and logos | Assets panel |
| `assets/video/placeholder.mp4` | Placeholder video | Replace with the final video (external hosting or Assets) |

## Conventions (Client-First)

- **Section structure:** `section_[name]` › `padding-global` › `container-large` › `padding-section-large` (or `-medium`) › content.
- **Custom classes:** `[component]_[element]`, for example `hero_dashboard-row` or `platform_signal-label`.
- **Variants:** combo classes prefixed with `is-`, for example `button is-secondary`, `tag is-primary` or `insights_card is-tint`.
- **Global classes** (no underscore): `button`, `tag`, `icon-tile`, `arrow-link_component`, `section-header_component`, `cta-banner_component`.
- **Client-First utility classes:** `page-wrapper`, `main-wrapper`, `padding-global`, `container-large`, `padding-section-large`, `padding-section-medium`.
- **Icons with two classes:** `programs_pillar-icon icon-tile` (custom class + global). The custom class only sets the grid placement (`grid-row: span 2`).
- **Unstyled classes:** some classes only provide structure (`hero_content`, `way_video`, `section-header_title-wrap`…) and have no styles. Create them anyway to keep the structure.
- **Units:** values are in px, matching the approved design. If rem is preferred (Client-First recommends it), the conversion is 1rem = 16px.

## Variables

They all live in `:root` in `webflow.css`. In Webflow, create them with the same names in one collection organised in folders:

- **Colors:** `color-brand/*`, `color-dark/*`, `color-on-dark/*`, `color-light/*`, `color-text/*`, `color-border/*` and the palette folders `color-blue/*`, `color-purple/*`, `color-green/*`, `color-orange/*` and `color-gray/*` (only the steps in use).
- **Typography:** `font/heading` (Public Sans), `font/body` (Inter), `tracking/heading` and `tracking/body`.
- **Radius:** `radius/small` (4px) and `radius/medium` (6px).

The few loose colors outside the variables are only in embedded SVGs or in `custom.css`.

## Breakpoints

| CSS | Webflow |
|---|---|
| base | Desktop (992px+), the starting point |
| `@media (max-width:991px)` | Tablet |
| `@media (max-width:767px)` | Mobile (L) |
| `@media (max-width:479px)` | Mobile |

These are Webflow's four default breakpoints (verified on the test site with the MCP). The large breakpoints (1280px, 1440px, 1920px) are not used, to keep the number of breakpoints down. That's why the gap between menu links is fixed at 24px: at 30px the menu doesn't fit at 992px.

## Tag styles

In `webflow.css`, sections "Tags" and "Typography scale": `body`, `a`, `h1`–`h6` and `p`. In Webflow they go in the Style panel on Body, All Links, All H1–H6 Headings and All Paragraphs.

## Typography

**Rule:** component classes never change the size of a heading or a paragraph. They only set color, margins, max width or, in a few cases, the font family or weight (for example the quote).

**Headings:** each heading takes the size of its tag. To make it look like another level without changing the semantics, add the matching `heading-style-hX` class, for example `<h3 class="programs_pillar-title heading-style-h5">`.

| Level | Size | Weight | Line height | Font |
|---|---|---|---|---|
| h1 / `heading-style-h1` | clamp(2.5rem, 4vw, 3.375rem) | 700 | 1.12 | Public Sans |
| h2 / `heading-style-h2` | clamp(2.125rem, 3.25vw, 2.75rem) | 700 | 1.08 | Public Sans |
| h3 / `heading-style-h3` | clamp(1.75rem, 2.6vw, 2.2rem) | 700 | 1.2 | Public Sans |
| h4 / `heading-style-h4` | clamp(1.5rem, 2.05vw, 1.75rem) | 600 | 1.3 | Public Sans |
| h5 / `heading-style-h5` | clamp(1.25rem, 1.6vw, 1.375rem) | 600 | 1.3 | Public Sans |
| h6 / `heading-style-h6` | .9rem | 600 | 1.2 | Inter |

h1 to h5 use `tracking/heading` and h6 uses `tracking/body`.

On desktop (from about 1360px) the sizes are 54 / 44 / 35.2 / 28 / 22px, roughly a 1.25 step between levels; h1 to h5 shrink gradually on narrower screens down to 40 / 34 / 28 / 24 / 20px. h6 sits outside the ratio on purpose: it's a small Inter label that matches the section eyebrow.

**Paragraphs:** body text is 1rem with a 1.6 line height, inherited across the site. On top of that there are three utility sizes:

| Class | Size | Line height |
|---|---|---|
| `text-size-large` | 1.125rem | 1.5 |
| `text-size-small` | .9rem | 1.6 (inherited) |
| `text-size-tiny` | .8125rem | 1.5 |

**Exception:** the text inside illustrations (hero dashboard, Platform portal, Who we work with node), tags and list links is UI, not reading text. These keep their own sizes in their component class.

## Icons

- **Library:** [Lucide](https://lucide.dev) (ISC license, free for commercial use). The site's SVGs come from `lucide-static@0.460.0`.
- **Adding a new one:** copy the SVG from lucide.dev, remove its class, keep `stroke="currentColor"` and add `aria-hidden="true"`. In Webflow it can go inline (the MCP converts it to DOM elements) or inside a Code Embed with the class on the embed.
- **Stroke width** by size, so every icon looks like it has a similar stroke (about 1.5px):

| Size | `stroke-width` | Where |
|---|---|---|
| 22–24px | 1.75 | Content icons (`icon-tile`, `proof_icon`, quote) |
| 18px | 2 | Hero dashboard |
| 16px | 2.25 | `arrow-link` arrow |
| 14px | 2.5 | Platform signals |

- **Icons in use:** arrow-right, clock, shield, cpu, search-check, award, users, quote, play (filled), user, trending-up, briefcase, house, layers, map-pin, file-check, coins, eye, shield-check, triangle-alert, check and chevron-down (select arrow, in `assets/img/select-chevron.svg`).
- **Not from Lucide:** the Ledgebrook and Stonehaven marks are brand logos, not icons, and are not replaced.

## Native elements

| Part of the site | Webflow element | Notes |
|---|---|---|
| Header | **Navbar** | `navbar_component` (Navbar) › `navbar_container` › `navbar_logo-link` (Brand), `navbar_menu` (Nav Menu) with `navbar_link` (Nav Links), `navbar_divider`, `navbar_login`, `navbar_button`, and `navbar_menu-button` (Menu Button) with two Lucide icons, `navbar_menu-icon` (menu) and `navbar_menu-icon is-close` (x), replacing Webflow's default icon. Collapses on Tablet. |
| MGAs / Reinsurers switch | **Tabs** | `hero_tabs` (Tabs) › `hero_tabs-menu` (Tabs Menu) with `hero_tab-link` (Tab Links), `hero_tabs-content` (Tabs Content) with two `hero_tab-pane`. The active tab is styled in the Current state (`.w--current`). |
| Form | **Form Block** | Sits in `contact_form-wrapper`, a light card on the right of `contact_component` (a 900px dark container with 32px padding and gap, and `contact_content` on the left; they stack from Tablet down). The submit button is `button is-blue`, the variant for light surfaces. `form_component` (Form Block) › `form_form` (Form), `form_message-success` (Success Message), `form_message-error` (Error Message). Fields: `form_input`, `form_input is-select` and `form_input is-text-area`. Two columns (First name | Last name, Work email | Inquiry type) and the message full width (`form_field-wrapper is-full`); one column on Mobile. |
| About cards with a link | **Link Block** | `about_family-card`. The Stonehaven card is a Div, not a link. |
| Lists | **List / List Item** | `proof_list`, `about_family-list`, `insights_*-list`, `footer_link-list`, `programs_orbit-steps` |
| Icons, Platform and hero charts, Ledgebrook logos | **Code Embed** | The class goes on the embed (for example `proof_icon` or `platform_chart-plot`) and the `<svg>` goes inside. |
| Video | **Code Embed** | The whole `video_component` block. Styles are in `custom.css` and behaviour in `custom.js`. |
| Platform ring | **Code Embed** | `programs_orbit-embed` with the `<svg class="orbit-svg">`. The animation is in `custom.css`. |

## Recommended components

- **Navbar** and **Footer.**
- **CTA banner** (`cta-banner_component`). Used three times, with props for title, text, button text, button link, `id` and `data-topic`. Two versions: the base, solid `color-dark/night` with `button is-purple` (Programs and Platform), and `is-light`, solid blue-100 with dark text and `button is-blue` (Leadership); its heading and text take the same `is-light` combo.
- **Section header** (`section-header_component`). Props: eyebrow, title and text. The `is-alternate` variant is for dark sections, and `is-compact` / `is-flush` control the bottom margin.

## Interactions to build

1. **Navbar on scroll** (Page scroll, from about 40px). Mirrors Part B of `custom.css`:
   - `navbar_background`: 60px tall, background `rgba(255,255,255,.92)`, shadow `0 1px 0` `color-border/primary` and blur.
   - `navbar_container`: 60px tall.
   - `navbar_logo`: 36px tall, and the light logo swaps for the dark one (`navbar_logo is-dark`).
   - Navbar text switches to `color-text/primary`.
   - `navbar_divider`: background `rgba(30,52,75,.3)`.
   - `navbar_button`: background `color-brand/blue` and white text (hover `color-brand/blue-dark`).
2. **Open navbar on Tablet and Mobile:** `color-dark/night` background, links stacked with a 12px gap, `navbar_divider` as a full-width line, and Partner login (left) and Contact us (right) on one row. The values are in Part B of `custom.css`.

## Custom code

- **`custom.css` Part A**, in the `global-styles` embed:
  - Focus outline and smooth scrolling.
  - Menu button: swaps the menu icon for the close icon while the menu is open (`.w--open`).
  - Arrow link hover: underline and icon nudge, also when hovering the card.
  - Who we work with ring (conic gradient with a mask).
  - Success message fade-in.
  - Video, Platform ring and the footer "Stonehaven" wordmark.
- **`custom.js`:**
  - Preselects the inquiry type from the `data-topic` attribute.
  - Video.
  - Form validation. Runs before Webflow's submission and stops it if there are errors.
- **Head code** (Site settings › Custom code › Head code): `<meta name="robots" content="noindex, nofollow">` while the site is in review. Also turn on Site settings › SEO › "Disable Webflow subdomain indexing" for the webflow.io staging domain.
- **Custom attributes to add:**
  - `data-topic` on the buttons that preselect the inquiry type.
  - Anchor ids: `#programs`, `#reinsurers`, `#platform`, `#about`, `#team`, `#insights`, `#contact`, `#contact-sec`, `#portal`, `#careers`, `#press`, `#industry-insights`, `#stonehaven-way` and `#claims-philosophy`.
  - The `aria-*` and `role` attributes in the HTML.

## Properties without a Style panel control

In `webflow.css` they're marked with `/* custom property */`. Add them with "+ Add custom property" in the Style panel:

- `text-wrap: balance`
- `clip` (accessible step list)
- `appearance: none` (select)
- `resize: vertical` (textarea)

## MCP connection checks

Test run on Nov 15, 2026 on the "Website Test" site, building the Reinsurers section with `data_whtml_builder` (HTML + CSS in one step).

**Confirmed:**
- [x] **Breakpoints:** Desktop (base), Tablet ≤991, Mobile (L) ≤767 and Mobile ≤479. Tablet styles are saved to their breakpoint.
- [x] **`clamp()`:** saved as-is in `font-size`.
- [x] **`line-height: normal`:** accepted.
- [x] **Radial `70% 60% at 90% 0%` + linear background:** accepted.
- [x] **`text-wrap: balance`:** saved as a class property.
- [x] **Combo classes** (`section-header_eyebrow is-alternate`, `icon-tile is-dark`) and **stacked classes** (`reinsurers_card-title heading-style-h4`).
- [x] **States:** the `button` `:hover` is saved.
- [x] **Attributes:** `id`, `aria-*` and `data-topic` are kept.
- [x] **Tags:** `section`, `h2`/`h3` (Heading with its level), `p` (Paragraph) and `a` (Link).
- [x] **Inline SVG:** converted to DOM elements (`svg`, `path`, `circle`) with their attributes, no Code Embed needed, and keeps `currentColor`.

**Watch out for:**
- **Fonts:** Inter and Public Sans aren't installed automatically ("missing_font"). Add them in Site settings › Fonts (Google Fonts) before building. Also, `font-family` is saved without the fallback list (just "Inter" or "Public Sans").
- **Unstyled classes:** not created. The structural wrappers (`section-header_title-wrap`, `reinsurers_fact-content`) ended up as Divs with no class. To keep them, create them first with `data_style_tool > create_style`, even with no properties.
- **Tag styles:** the test didn't load styles for `h1`–`h6` or `p`, so the heading classes included `margin-top: 0` to override Webflow's default margin. In the real build, tag styles go first.

**Pending:**
- [ ] **Tabs:** confirm the Designer allows the "What we offer" text inside the Tabs Menu and the `h1` between the menu and the content. If not, move the label out of the menu.
- [ ] **Webflow default styles** to override:
  - `.w-input` and `.w-select` are 38px tall with a bottom margin: set height auto and margin 0 (already in `form_input`).
  - `label` is bold by default.
  - `.w-form` has a margin.
  - `.w-form-done` and `.w-form-fail` have their own background and padding.
- [ ] **Success message:** in Webflow the form hides and the message appears. `form_success-content` has a 428px min height so the box doesn't change size on desktop.

## Before launch

- Remove the `concept-banner`.
- Remove the `noindex, nofollow` robots meta tag from the head code.
- Use an absolute URL for `og:image`.
- Replace the video and the bracketed placeholders (`[State]`, `[Name]`, `[MGA name]`, etc.).
- Later: move Press, Insights and Leadership to the CMS without changing the current classes.
