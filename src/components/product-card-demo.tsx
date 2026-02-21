"use client";

import { ProductCardHorizontal, ProductCardVertical } from "@/components/product-card";
import { ProductList } from "@/components/product-list";
import { ProductCarousel } from "@/components/product-carousel";

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
