"use client";

import { ProductCardHorizontal, ProductCardVertical } from "@/components/product-card";

const imgThumbnail = "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";

export default function ProductCardDemo() {
  return (
    <div className="flex flex-wrap gap-6 items-start justify-center p-8">
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
  );
}
