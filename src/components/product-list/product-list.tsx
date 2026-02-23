"use client";

import { ProductCardHorizontal, ProductCardHorizontalProps } from "@/components/product-card";

const MIN_PRODUCTS = 2;
const MAX_PRODUCTS = 5;

export interface ProductListProps {
  products: ProductCardHorizontalProps[];
  onSeeAll?: () => void;
  seeAllLabel?: string;
}

export function ProductList({
  products,
  onSeeAll,
  seeAllLabel = "See all",
}: ProductListProps) {
  if (process.env.NODE_ENV === "development") {
    if (products.length < MIN_PRODUCTS) {
      throw new Error(
        `ProductList requires at least ${MIN_PRODUCTS} products, got ${products.length}.`
      );
    }
    if (products.length > MAX_PRODUCTS) {
      throw new Error(
        `ProductList allows a maximum of ${MAX_PRODUCTS} products, got ${products.length}.`
      );
    }
  }

  const visibleProducts = products.slice(0, MAX_PRODUCTS);

  return (
    <div className="bg-card-surface rounded-2xl overflow-hidden w-full max-w-[383px]">
      <div className="flex flex-col divide-y divide-card-divider">
        {visibleProducts.map((product) => (
          <div key={product.name} className="px-4 py-3 flex justify-center">
            <ProductCardHorizontal {...product} />
          </div>
        ))}
      </div>

      {onSeeAll && (
        <div className="flex justify-center py-3 border-t border-card-divider">
          <button
            onClick={onSeeAll}
            className="text-sm text-text-primary underline underline-offset-2 hover:opacity-70"
          >
            {seeAllLabel}
          </button>
        </div>
      )}
    </div>
  );
}
