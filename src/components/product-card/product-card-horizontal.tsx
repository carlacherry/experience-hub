"use client";

import Image from "next/image";
import { Tag } from "lucide-react";
import { useState } from "react";
import { CounterRow } from "./counter-row";
import { PriceBadge } from "./price-badge";

export interface ProductQuantities {
  [label: string]: number;
}

export interface CounterConfig {
  label: string;
  initial?: number;
}

export interface ProductCardHorizontalProps {
  name: string;
  units: string;
  price: number;
  originalPrice?: number;
  unitPrice?: number;
  image: string;
  counters?: CounterConfig[];
  currency?: string;
  onQuantityChange?: (quantities: ProductQuantities) => void;
}

export function ProductCardHorizontal({
  name,
  units,
  price,
  originalPrice,
  unitPrice,
  image,
  counters = [{ label: "cajas", initial: 0 }, { label: "uds", initial: 0 }],
  currency = "Q",
  onQuantityChange,
}: ProductCardHorizontalProps) {
  const [quantities, setQuantities] = useState<ProductQuantities>(
    Object.fromEntries(counters.map(({ label, initial = 0 }) => [label, initial]))
  );

  function update(label: string, delta: number) {
    setQuantities((prev) => {
      const next = { ...prev, [label]: Math.max(0, prev[label] + delta) };
      onQuantityChange?.(next);
      return next;
    });
  }

  return (
    <div className="bg-card-surface border border-card-border rounded-2xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.06)] px-4 py-3 flex items-center w-full max-w-[383px]">
      <div className="flex gap-2 items-start w-full">
        {/* Thumbnail */}
        <div className="relative w-[90px] h-[127px] rounded-sm shrink-0 overflow-hidden">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-bold text-text-primary leading-snug">{name}</p>
            <p className="text-sm text-slate-600 leading-snug">{units}</p>

            {/* Price Row */}
            <div className="flex gap-2 items-center mt-0.5">
              <PriceBadge
                price={price}
                originalPrice={originalPrice}
                currency={currency}
                variant="promo"
              />
              {unitPrice && (
                <div className="flex items-center gap-1 h-5">
                  <Tag size={10} className="text-slate-500" />
                  <span className="text-xs text-slate-500 leading-none">
                    {currency}{unitPrice.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex flex-col gap-1.5 w-full">
            {counters.map(({ label }) => (
              <CounterRow
                key={label}
                value={quantities[label]}
                label={label}
                onIncrement={() => update(label, 1)}
                onDecrement={() => update(label, -1)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
