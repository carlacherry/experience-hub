"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { SuggestionCard, SuggestionCardProps } from "@/components/suggestion-card";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";

const MIN_CARDS = 1;
const MAX_CARDS = 3;
const SCROLL_AMOUNT = 244 + 12; // card width + gap

export interface SuggestionCarouselProps {
  cards: SuggestionCardProps[];
}

export function SuggestionCarousel({ cards }: SuggestionCarouselProps) {
  if (process.env.NODE_ENV === "development") {
    if (cards.length < MIN_CARDS) {
      throw new Error(
        `SuggestionCarousel requires at least ${MIN_CARDS} card, got ${cards.length}.`
      );
    }
    if (cards.length > MAX_CARDS) {
      throw new Error(
        `SuggestionCarousel allows a maximum of ${MAX_CARDS} cards, got ${cards.length}.`
      );
    }
  }

  const visibleCards = cards.slice(0, MAX_CARDS);
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
        {visibleCards.map((card) => (
          <div key={card.title} className="snap-start shrink-0">
            <SuggestionCard {...card} />
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
