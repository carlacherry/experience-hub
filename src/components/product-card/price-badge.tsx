import { Tag } from "lucide-react";

export interface PriceBadgeProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  variant?: "promo" | "default";
}

export function PriceBadge({
  price,
  originalPrice,
  currency = "Q",
  variant = "default",
}: PriceBadgeProps) {
  if (variant === "promo") {
    return (
      <div className="flex items-center gap-1 bg-promo-bg rounded-full px-2 py-0.5 h-5">
        <Tag size={10} className="text-promo-text" />
        <span className="text-sm font-bold text-promo-text leading-none">
          {currency}{price.toFixed(2)}
        </span>
        {originalPrice && (
          <span className="text-xs text-promo-strikethrough line-through leading-none">
            {currency}{originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 bg-price-badge-bg rounded-full px-2 py-0.5 whitespace-nowrap">
      <span className="text-sm text-price-badge-text leading-snug">
        {currency}{price.toFixed(2)}
      </span>
      {originalPrice && (
        <span className="text-xs text-price-badge-strikethrough line-through leading-snug">
          {currency}{originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}
