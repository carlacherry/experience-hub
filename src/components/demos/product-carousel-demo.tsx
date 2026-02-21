"use client";

import { ProductCarousel } from "@/components/product-carousel";

const img = "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";

export default function ProductCarouselDemo() {
  return (
    <div className="w-full px-2">
      <ProductCarousel
        products={[
          { name: "Pepsi original 3 Litros Pet", minOrderLabel: "Desde 5 cajas", price: 108, originalPrice: 110, image: img },
          { name: "Pepsi Zero 355ml Pet", minOrderLabel: "Desde 3 cajas", price: 65, originalPrice: 68, image: img },
          { name: "Pepsi Light 2 Litros", minOrderLabel: "Desde 4 cajas", price: 92, image: img },
          { name: "Pepsi original 600ml", price: 45, originalPrice: 48, image: img },
        ]}
      />
    </div>
  );
}
