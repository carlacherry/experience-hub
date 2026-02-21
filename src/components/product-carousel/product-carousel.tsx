"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCardVertical, ProductCardVerticalProps } from "@/components/product-card";

const MIN_PRODUCTS = 3;
const MAX_PRODUCTS = 5;

const CARD_WIDTH = 160;
const GAP = 12;
const SCROLL_AMOUNT = CARD_WIDTH + GAP;

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    updateScrollState();
  }, []);

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  }

  return (
    <div className="relative w-full">
      {/* Prev arrow */}
      <button
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        aria-label="Anterior"
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border border-[#dde4ec] shadow-sm text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-hide"
      >
        {visibleProducts.map((product, index) => (
          <div key={index} className="snap-start shrink-0">
            <ProductCardVertical {...product} />
          </div>
        ))}
      </div>

      {/* Next arrow */}
      <button
        onClick={scrollRight}
        disabled={!canScrollRight}
        aria-label="Siguiente"
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-9 h-9 rounded-full bg-white border border-[#dde4ec] shadow-sm text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
