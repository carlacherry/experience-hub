"use client";

import { ProductList } from "@/components/product-list";

const img = "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";

export default function ProductListDemo() {
  return (
    <ProductList
      products={[
        {
          name: "Pepsi original 355ml Pet",
          units: "24 unidades",
          price: 68,
          originalPrice: 70,
          unitPrice: 3.75,
          image: img,
          counters: [{ label: "cajas", initial: 5 }, { label: "uds", initial: 0 }],
        },
        {
          name: "Pepsi original 3 Litros Pet",
          units: "6 unidades",
          price: 108,
          originalPrice: 110,
          unitPrice: 18,
          image: img,
          counters: [{ label: "cajas", initial: 0 }, { label: "uds", initial: 0 }],
        },
        {
          name: "Pepsi Zero 355ml Pet",
          units: "24 unidades",
          price: 65,
          image: img,
          counters: [{ label: "cajas", initial: 0 }, { label: "uds", initial: 0 }],
        },
      ]}
      onSeeAll={() => console.log("See all")}
    />
  );
}
