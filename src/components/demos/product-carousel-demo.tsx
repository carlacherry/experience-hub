"use client";

import { ProductCarousel } from "@/components/product-carousel";

const img = "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";

export default function ProductCarouselDemo() {
  return (
    <div className="w-full px-2">
      <ProductCarousel
        products={[
          { name: "Orange Juice 3L", minOrderLabel: "From 5 cases", price: 108, originalPrice: 110, image: img },
          { name: "Sparkling Water 355ml", minOrderLabel: "From 3 cases", price: 65, originalPrice: 68, image: img },
          { name: "Lemonade 2L", minOrderLabel: "From 4 cases", price: 92, image: img },
          { name: "Iced Tea 600ml", price: 45, originalPrice: 48, image: img },
        ]}
      />
    </div>
  );
}
