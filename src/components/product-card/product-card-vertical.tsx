"use client";

import Image from "next/image";
import { useState } from "react";
import { CounterRow } from "./counter-row";
import { PriceBadge } from "./price-badge";

export interface ProductCardVerticalProps {
  name: string;
  minOrderLabel?: string;
  price: number;
  originalPrice?: number;
  image: string;
  counterLabel?: string;
  initialQty?: number;
  currency?: string;
  onQuantityChange?: (qty: number) => void;
}

export function ProductCardVertical({
  name,
  minOrderLabel,
  price,
  originalPrice,
  image,
  counterLabel = "uds",
  initialQty = 0,
  currency = "Q",
  onQuantityChange,
}: ProductCardVerticalProps) {
  const [qty, setQty] = useState(initialQty);

  function update(delta: number) {
    setQty((prev) => {
      const next = Math.max(0, prev + delta);
      onQuantityChange?.(next);
      return next;
    });
  }

  return (
    <div className="bg-card-surface border border-card-border-subtle rounded-[14px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.06)] p-3 flex flex-col w-[160px] h-[272px] overflow-hidden">
      {/* Thumbnail */}
      <div className="relative w-full h-[116px] rounded-[4px] overflow-hidden shrink-0">
        <Image src={image} alt={name} fill className="object-contain" />
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-1 flex-1 justify-between py-2.5">
        <div className="flex flex-col gap-1">
          <PriceBadge
            price={price}
            originalPrice={originalPrice}
            currency={currency}
            variant="default"
          />
          <div className="flex flex-col gap-0.5">
            {minOrderLabel && (
              <p className="text-[11px] text-text-muted leading-snug">{minOrderLabel}</p>
            )}
            <p className="text-sm text-text-primary leading-snug line-clamp-2 min-h-[2.5rem]">{name}</p>
          </div>
        </div>

        {/* Counter */}
        <CounterRow
          value={qty}
          label={counterLabel}
          onIncrement={() => update(1)}
          onDecrement={() => update(-1)}
        />
      </div>
    </div>
  );
}
