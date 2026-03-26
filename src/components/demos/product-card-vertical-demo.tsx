"use client";

import { ProductCardVertical } from "@/components/product-card";

export default function ProductCardVerticalDemo() {
  return (
    <ProductCardVertical
      name="Orange Juice 3L"
      minOrderLabel="From 5 cases"
      price={108}
      originalPrice={110}
      image="/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png"
      counterLabel="units"
      initialQty={0}
    />
  );
}
