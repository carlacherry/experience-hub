# Experience Hub — Guidelines

Showcase de widgets para el agente conversacional de Yalo. Este documento cubre la arquitectura del proyecto, los componentes construidos y las reglas que se deben seguir al agregar nuevos.

---

## Stack

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js (App Router) | 16 | Framework, routing, SSR |
| TypeScript | 5 | Tipado estático |
| Tailwind CSS | 4 | Estilos (CSS-first config) |
| shadcn/ui | 3 | Primitivos base |
| lucide-react | latest | Iconos |
| next/font/local | — | Fuentes custom (Yalo) |

---

## Estructura del proyecto

```
src/
  app/
    page.tsx                        # Home (3 entry points)
    layout.tsx                      # Root layout + fonts
    globals.css                     # Design tokens + Tailwind theme
    in-app/page.tsx                 # Placeholder
    whatsapp/page.tsx               # Placeholder
    sdk/
      layout.tsx                    # SDK layout (usa SdkLayoutClient)
      page.tsx                      # Redirect a primer componente
      [component]/page.tsx          # Página dinámica de cada widget
  components/
    product-card/                   # Carpeta multi-archivo
      index.ts                      # Exports centralizados
      counter-row.tsx               # Sub-componente compartido
      price-badge.tsx               # Sub-componente compartido
      product-card-horizontal.tsx
      product-card-vertical.tsx
    product-list/
      index.ts
      product-list.tsx
    product-carousel/
      index.ts
      product-carousel.tsx
    suggestion-card.tsx
    suggestion-carousel/
      index.ts
      suggestion-carousel.tsx
    promo-card.tsx
    sdk/
      sidebar.tsx                   # Sidebar con navegación activa
      sdk-layout-client.tsx         # Maneja estado del sidebar en mobile
    demos/                          # Un archivo por widget para el showcase
      product-card-horizontal-demo.tsx
      product-card-vertical-demo.tsx
      product-list-demo.tsx
      product-carousel-demo.tsx
      suggestion-card-demo.tsx
      suggestion-carousel-demo.tsx
      promo-card-demo.tsx
  hooks/
    use-horizontal-scroll.ts        # Hook compartido para carruseles
  lib/
    sdk-nav.ts                      # Config de navegación del SDK
public/
  fonts/                            # Fuentes Yalo (woff)
  figma-assets/                     # Assets exportados desde Figma
```

---

## Widgets construidos

| Componente | Ruta del import | Descripción |
|---|---|---|
| `ProductCardHorizontal` | `@/components/product-card` | Card con imagen lateral, precio promo, precio unitario y N counters |
| `ProductCardVertical` | `@/components/product-card` | Card compacta con imagen superior, precio y 1 counter |
| `ProductList` | `@/components/product-list` | Lista vertical de ProductCardHorizontal. Min 2 / max 5 |
| `ProductCarousel` | `@/components/product-carousel` | Carrusel horizontal de ProductCardVertical. Min 3 / max 5 |
| `SuggestionCard` | `@/components/suggestion-card` | Card iniciador de conversación con chips clickeables |
| `SuggestionCarousel` | `@/components/suggestion-carousel` | Carrusel de SuggestionCards. Min 1 / max 3 |
| `PromoCard` | `@/components/promo-card` | Banner imagen clickeable |

### Sub-componentes compartidos

| Componente | Ruta | Usado por |
|---|---|---|
| `CounterRow` | `@/components/product-card` | ProductCardHorizontal, ProductCardVertical |
| `PriceBadge` | `@/components/product-card` | ProductCardHorizontal, ProductCardVertical |

---

## Design tokens

Definidos en `src/app/globals.css` dentro del bloque `@theme inline`. Se usan como utilities de Tailwind directamente.

### Colores

```css
/* Badge de promoción (verde) */
--color-promo-bg: #ecfdf5
--color-promo-text: #186c54
--color-promo-strikethrough: #0b996d

/* Badge de precio default (azul gris) */
--color-price-badge-bg: #f4fafc
--color-price-badge-text: #1e2125
--color-price-badge-strikethrough: #5c6264

/* Counter */
--color-counter-bg: #f8fafc

/* Bordes de cards */
--color-card-border: #dde4ec
--color-card-border-subtle: #bfc7ce

/* Suggestion Card */
--color-suggestion-card-bg: #f9fafc
--color-suggestion-card-border: #ecedef
--color-suggestion-chip: #deeaff
--color-suggestion-chip-hover: #c8deff

/* Texto */
--color-text-muted: #5e6c78
```

**Uso en clases Tailwind:**
```tsx
// ✅ Correcto — usa el token
<div className="bg-promo-bg text-promo-text border-card-border">

// ❌ Incorrecto — hardcodea el hex
<div className="bg-[#ecfdf5] text-[#186c54] border-[#dde4ec]">
```

### Tipografía

| Utility | Font | Pesos disponibles | Uso |
|---|---|---|---|
| `font-sans` | Suisse Int'l | 400 (Book), 500 (Medium), 600 (SemiBold) | Body, default |
| `font-display` | Tomato Grotesk | 700 (Bold) | Títulos grandes |
| `font-mono` | Simplon Mono | 400 (Regular) | Código / texto técnico |

`font-sans` es el default del `<body>` — no hace falta declararlo explícitamente.

---

## Principios de arquitectura

### 1. Un componente, una responsabilidad
Cada componente hace una sola cosa. Si un componente crece en lógica, extraer sub-componentes o hooks.

```
✅ CounterRow solo maneja el UI de un contador
✅ useHorizontalScroll solo maneja el scroll de un contenedor
❌ No mezclar lógica de negocio con layout
```

### 2. Sub-componentes compartidos en carpeta propia
Cuando dos o más componentes comparten lógica visual, extraerla a un archivo propio dentro de la carpeta del dominio.

```
product-card/
  counter-row.tsx     ← compartido entre horizontal y vertical
  price-badge.tsx     ← compartido entre horizontal y vertical
```

### 3. Exports centralizados con index.ts
Toda carpeta multi-archivo debe tener un `index.ts` que re-exporte todo. Los consumidores importan desde el barrel, no desde archivos internos.

```ts
// ✅ Correcto
import { ProductCardHorizontal, CounterRow } from "@/components/product-card";

// ❌ Incorrecto
import { ProductCardHorizontal } from "@/components/product-card/product-card-horizontal";
```

### 4. Lógica reutilizable en hooks
Cualquier lógica de estado que pueda usarse en más de un componente va en `src/hooks/`.

```ts
// ✅ useHorizontalScroll usado por ProductCarousel y SuggestionCarousel
const { scrollRef, canScrollLeft, scrollLeft } = useHorizontalScroll(SCROLL_AMOUNT);
```

### 5. Separar demo de componente
Los componentes en `src/components/` son puros y reutilizables. Los datos de demo van en `src/components/demos/` y solo los usa el showcase.

---

## Reglas para construir nuevos componentes

### Props

- Todas las props requeridas deben ser explícitas en la interfaz.
- Props opcionales con defaults sensatos.
- Exportar siempre la interfaz de props junto al componente.
- Callbacks siguen el patrón `on[Evento]` y son opcionales salvo que el componente no tenga sentido sin ellos.

```ts
// ✅
export interface MyComponentProps {
  title: string;                          // requerida
  description?: string;                   // opcional
  onAction?: (value: string) => void;     // callback opcional
}
export function MyComponent({ title, description, onAction }: MyComponentProps) { ... }
```

### Client vs Server Components

- Por default, todos los componentes son Server Components.
- Agregar `"use client"` solo cuando el componente usa `useState`, `useEffect`, event handlers, o hooks del browser.
- Si un Server Component necesita pasar un callback a un Client Component, envolver en un Client Component intermedio (ver `product-card-demo.tsx`).

### React keys

- Nunca usar `index` como key en listas que pueden cambiar de orden.
- Usar un identificador estable del dato (`id`, `name`, `slug`, etc.).

```tsx
// ✅
{items.map((item) => <Card key={item.id} {...item} />)}

// ❌
{items.map((item, index) => <Card key={index} {...item} />)}
```

### Validación de reglas de negocio

Cuando un componente tiene restricciones (min/max items), validar en desarrollo con un error claro. En producción, hacer fallback seguro con `slice`.

```ts
if (process.env.NODE_ENV === "development") {
  if (items.length < MIN) throw new Error(`MyComponent requires at least ${MIN} items.`);
  if (items.length > MAX) throw new Error(`MyComponent allows a maximum of ${MAX} items.`);
}
const visibleItems = items.slice(0, MAX);
```

### Responsive

- Nunca usar anchos fijos en px como única medida. Combinar con `w-full max-w-[Xpx]`.
- Usar breakpoints de Tailwind (`md:`, `lg:`) para adaptar layout.
- Componentes con scroll horizontal deben tener `overflow-x-auto` en su contenedor.
- El sidebar del SDK usa un patron mobile-first con overlay: hidden por default en mobile, visible en desktop con `md:translate-x-0`.

```tsx
// ✅
<div className="w-full max-w-[383px]">

// ❌
<div className="w-[383px]">
```

### Accesibilidad

- Todos los botones interactivos deben tener `aria-label` descriptivo cuando no tienen texto visible.
- Links con solo imagen deben tener `aria-label` en el `<a>` / `<Link>`.
- Botones deshabilitados deben tener `disabled` attribute (no solo estilos).

```tsx
// ✅
<button aria-label="Reducir cajas" disabled={value === 0}>
  <Minus size={14} />
</button>

// ❌
<button onClick={...}>
  <Minus size={14} />
</button>
```

---

## Agregar un widget nuevo al showcase

1. Construir el componente en `src/components/[nombre]/`
2. Crear `index.ts` con los exports
3. Agregar entrada en `src/lib/sdk-nav.ts`
4. Crear demo en `src/components/demos/[nombre]-demo.tsx`
5. Registrar el demo en `src/app/sdk/[component]/page.tsx` dentro del objeto `demos`

---

## Lo que NO hacer

| ❌ Evitar | ✅ En cambio |
|---|---|
| Colores hex hardcodeados | Usar tokens CSS del `@theme` |
| `key={index}` en listas | Usar ID estable del dato |
| Importar desde archivos internos de una carpeta | Importar desde el `index.ts` |
| Estado en Server Components | Mover a Client Component con `"use client"` |
| Pasar funciones desde Server a Client Component | Crear un wrapper Client Component |
| Anchos fijos sin `max-w` | `w-full max-w-[Xpx]` |
| Lógica duplicada entre componentes | Extraer a hook en `src/hooks/` |
| Componentes que hacen más de una cosa | Dividir en sub-componentes |
