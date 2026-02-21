"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCardVertical, ProductCardVerticalProps } from "@/components/product-card";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";

const MIN_PRODUCTS = 3;
const MAX_PRODUCTS = 5;
const SCROLL_AMOUNT = 160 + 12; // card width + gap

export interface ProductCarouselProps {
  products: ProductCardVerticalProps[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  if (process.env.NODE_ENV === "development") {
    if (products.length < MIN_PRODUCTS) {
      throw new Error(
        `ProductCarousel requires at least ${MIN_PRODUCTS} products, got ${products.length}.`
      );
    }
    if (products.length > MAX_PRODUCTS) {
      throw new Error(
        `ProductCarousel allows a maximum of ${MAX_PRODUCTS} products, got ${products.length}.`
      );
    }
  }

  const visibleProducts = products.slice(0, MAX_PRODUCTS);
  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight, updateScrollState } =
    useHorizontalScroll(SCROLL_AMOUNT);

  return (
    <div className="relative w-full">
      <button
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        aria-label="Anterior"
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border border-card-border shadow-sm text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-hide"
      >
        {visibleProducts.map((product) => (
          <div key={product.name} className="snap-start shrink-0">
            <ProductCardVertical {...product} />
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        disabled={!canScrollRight}
        aria-label="Siguiente"
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border border-card-border shadow-sm text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
