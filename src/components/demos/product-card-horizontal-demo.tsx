"use client";

import { ProductCardHorizontal } from "@/components/product-card";

export default function ProductCardHorizontalDemo() {
  return (
    <ProductCardHorizontal
      name="Pepsi original 355ml Pet"
      units="24 unidades"
      price={68}
      originalPrice={70}
      unitPrice={3.75}
      image="/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png"
      counters={[
        { label: "cajas", initial: 5 },
        { label: "uds", initial: 0 },
      ]}
    />
  );
}
