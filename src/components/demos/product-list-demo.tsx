"use client";

import { ProductList } from "@/components/product-list";

const img = "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";

export default function ProductListDemo() {
  return (
    <ProductList
      products={[
        {
          name: "Sparkling Water 355ml",
          units: "24 units",
          price: 68,
          originalPrice: 70,
          unitPrice: 3.75,
          image: img,
          counters: [{ label: "cases", initial: 5 }, { label: "units", initial: 0 }],
        },
        {
          name: "Orange Juice 3L",
          units: "6 units",
          price: 108,
          originalPrice: 110,
          unitPrice: 18,
          image: img,
          counters: [{ label: "cases", initial: 0 }, { label: "units", initial: 0 }],
        },
        {
          name: "Iced Tea 355ml",
          units: "24 units",
          price: 65,
          image: img,
          counters: [{ label: "cases", initial: 0 }, { label: "units", initial: 0 }],
        },
      ]}
      onSeeAll={() => console.log("See all")}
    />
  );
}
