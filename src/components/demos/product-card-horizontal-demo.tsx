"use client";

import { ProductCardHorizontal } from "@/components/product-card";

export default function ProductCardHorizontalDemo() {
  return (
    <ProductCardHorizontal
      name="Sparkling Water 355ml"
      units="24 units"
      price={68}
      originalPrice={70}
      unitPrice={3.75}
      image="/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png"
      counters={[
        { label: "cases", initial: 5 },
        { label: "units", initial: 0 },
      ]}
    />
  );
}
