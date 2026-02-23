export interface NavItem {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  subDescription?: string;
}

export const sdkNav: NavItem[] = [
  {
    slug: "product-card-horizontal",
    name: "Product Card Horizontal",
    shortName: "Card Horizontal",
    description: "Product card with a side image, promotional price, unit price, and quantity controls for boxes and units.",
  },
  {
    slug: "product-card-vertical",
    name: "Product Card Vertical",
    shortName: "Card Vertical",
    description: "Compact product card with a top image, price, minimum order label, and quantity control.",
  },
  {
    slug: "product-list",
    name: "Product List",
    shortName: "Product List",
    description: "Vertical list of Product Card Horizontals with dividers and a 'See all' button. Min 2, max 5 products.",
  },
  {
    slug: "product-carousel",
    name: "Product Carousel",
    shortName: "Prod. Carousel",
    description: "Horizontal carousel of Product Card Verticals. Arrows on desktop, drag on mobile. Min 3, max 5.",
  },
  {
    slug: "suggestions",
    name: "Suggestions",
    shortName: "Suggestions",
    description: "Conversation starter card with an icon, title, description, and clickable suggestion chips.",
    subDescription: "Displayed as a horizontal carousel. Min 1, max 3 cards.",
  },
  {
    slug: "promo-card",
    name: "Promo Card",
    shortName: "Promo Card",
    description: "Clickable image banner with rounded corners. Accepts any image and navigation target.",
  },
];
