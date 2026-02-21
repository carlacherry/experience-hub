"use client";

import { ProductCardVertical } from "@/components/product-card";

export default function ProductCardVerticalDemo() {
  return (
    <ProductCardVertical
      name="Pepsi original 3 Litros Pet"
      minOrderLabel="Desde 5 cajas"
      price={108}
      originalPrice={110}
      image="/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png"
      counterLabel="uds"
      initialQty={0}
    />
  );
}
