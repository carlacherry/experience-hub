export interface NavItem {
  slug: string;
  name: string;
  description: string;
}

export const sdkNav: NavItem[] = [
  {
    slug: "product-card-horizontal",
    name: "Product Card Horizontal",
    description: "Card de producto con imagen lateral, precio promocional, precio unitario y controles de cantidad por cajas y unidades.",
  },
  {
    slug: "product-card-vertical",
    name: "Product Card Vertical",
    description: "Card de producto compacta con imagen superior, precio, etiqueta de pedido mínimo y control de cantidad.",
  },
  {
    slug: "product-list",
    name: "Product List",
    description: "Lista vertical de Product Cards Horizontales con separadores y botón 'See all'. Mínimo 2, máximo 5 productos.",
  },
  {
    slug: "product-carousel",
    name: "Product Carousel",
    description: "Carrusel horizontal de Product Cards Verticales. Flechas en desktop, drag en mobile. Mínimo 3, máximo 5.",
  },
  {
    slug: "suggestion-card",
    name: "Suggestion Card",
    description: "Card iniciador de conversación con icono, título, descripción y chips de sugerencias clickeables.",
  },
  {
    slug: "suggestion-carousel",
    name: "Suggestion Carousel",
    description: "Carrusel horizontal de Suggestion Cards. Mínimo 1, máximo 3 cards.",
  },
  {
    slug: "promo-card",
    name: "Promo Card",
    description: "Banner de imagen clickeable con bordes redondeados. Acepta cualquier imagen y destino de navegación.",
  },
];
