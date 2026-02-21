"use client";

import { useRef, useState, useEffect } from "react";

export function useHorizontalScroll(scrollAmount: number) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }

  return { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight, updateScrollState };
}
