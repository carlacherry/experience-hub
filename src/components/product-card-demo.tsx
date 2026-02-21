"use client";

import { ProductCardHorizontal, ProductCardVertical } from "@/components/product-card";
import { ProductList } from "@/components/product-list";
import { ProductCarousel } from "@/components/product-carousel";
import { PromoCard } from "@/components/promo-card";
import { SuggestionCard } from "@/components/suggestion-card";
import { SuggestionCarousel } from "@/components/suggestion-carousel";

const imgThumbnail = "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";

const mockProducts = [
  {
    name: "Pepsi original 355ml Pet",
    units: "24 unidades",
    price: 68,
    originalPrice: 70,
    unitPrice: 3.75,
    image: imgThumbnail,
    counters: [{ label: "cajas", initial: 5 }, { label: "uds", initial: 0 }],
  },
  {
    name: "Pepsi original 3 Litros Pet",
    units: "6 unidades",
    price: 108,
    originalPrice: 110,
    unitPrice: 18,
    image: imgThumbnail,
    counters: [{ label: "cajas", initial: 0 }, { label: "uds", initial: 0 }],
  },
  {
    name: "Pepsi Zero 355ml Pet",
    units: "24 unidades",
    price: 65,
    image: imgThumbnail,
    counters: [{ label: "cajas", initial: 0 }, { label: "uds", initial: 0 }],
  },
];

export default function ProductCardDemo() {
  return (
    <div className="flex flex-wrap gap-8 items-start justify-center p-8">
      <div className="flex flex-col gap-4 items-start">
        <ProductCardHorizontal
          name="Pepsi original 355ml Pet"
          units="24 unidades"
          price={68}
          originalPrice={70}
          unitPrice={3.75}
          image={imgThumbnail}
          counters={[
            { label: "cajas", initial: 5 },
            { label: "uds", initial: 0 },
          ]}
          onQuantityChange={(q) => console.log("Horizontal:", q)}
        />
        <ProductCardVertical
          name="Pepsi original 3 Litros Pet"
          minOrderLabel="Desde 5 cajas"
          price={108}
          originalPrice={110}
          image={imgThumbnail}
          counterLabel="uds"
          initialQty={0}
          onQuantityChange={(q) => console.log("Vertical:", q)}
        />
      </div>

      <ProductList
        products={mockProducts}
        onSeeAll={() => console.log("See all clicked")}
      />

      <div className="w-[560px] px-6">
        <SuggestionCarousel
          cards={[
            {
              icon: "/figma-assets/4794afc92222286db5854f0c3c3cb0dc7f271f09.png",
              title: "¿En qué te ayudo?",
              description: "Elige un tema para comenzar",
              suggestions: [
                { id: "1", label: "Ver productos en oferta" },
                { id: "2", label: "Consultar mi pedido" },
                { id: "3", label: "Hablar con un asesor" },
              ],
              onSuggestionClick: (s) => console.log("Card 1:", s.label),
            },
            {
              icon: "/figma-assets/4794afc92222286db5854f0c3c3cb0dc7f271f09.png",
              title: "Explorar categorías",
              description: "¿Qué estás buscando hoy?",
              suggestions: [
                { id: "1", label: "Bebidas" },
                { id: "2", label: "Snacks" },
                { id: "3", label: "Lácteos" },
              ],
              onSuggestionClick: (s) => console.log("Card 2:", s.label),
            },
            {
              icon: "/figma-assets/4794afc92222286db5854f0c3c3cb0dc7f271f09.png",
              title: "Novedades",
              description: "Mira lo que llegó esta semana",
              suggestions: [
                { id: "1", label: "Nuevos productos" },
                { id: "2", label: "Promociones activas" },
              ],
              onSuggestionClick: (s) => console.log("Card 3:", s.label),
            },
          ]}
        />
      </div>

      <SuggestionCard
        icon="/figma-assets/4794afc92222286db5854f0c3c3cb0dc7f271f09.png"
        title="¿En qué te ayudo?"
        description="Elige un tema para comenzar"
        suggestions={[
          { id: "1", label: "Ver productos en oferta" },
          { id: "2", label: "Consultar mi pedido" },
          { id: "3", label: "Hablar con un asesor" },
        ]}
        onSuggestionClick={(s) => console.log("Sugerencia:", s.label)}
      />

      <PromoCard
        image="/figma-assets/ece298d0ec2c16f10310d45724b276a6035cb503.png"
        alt="Promoción"
        href="#"
      />

      <div className="w-[420px] px-6">
        <ProductCarousel
          products={[
            {
              name: "Pepsi original 3 Litros Pet",
              minOrderLabel: "Desde 5 cajas",
              price: 108,
              originalPrice: 110,
              image: imgThumbnail,
            },
            {
              name: "Pepsi Zero 355ml Pet",
              minOrderLabel: "Desde 3 cajas",
              price: 65,
              originalPrice: 68,
              image: imgThumbnail,
            },
            {
              name: "Pepsi Light 2 Litros",
              minOrderLabel: "Desde 4 cajas",
              price: 92,
              image: imgThumbnail,
            },
            {
              name: "Pepsi original 600ml",
              price: 45,
              originalPrice: 48,
              image: imgThumbnail,
            },
          ]}
        />
      </div>
    </div>
  );
}
