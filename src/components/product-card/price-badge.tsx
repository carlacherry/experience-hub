import { Tag } from "lucide-react";

interface PriceBadgeProps {
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
      <div className="flex items-center gap-1 bg-[#ecfdf5] rounded-full px-2 py-0.5 h-5">
        <Tag size={10} className="text-[#186c54]" />
        <span className="text-sm font-bold text-[#186c54] leading-none">
          {currency}{price.toFixed(2)}
        </span>
        {originalPrice && (
          <span className="text-xs text-[#0b996d] line-through leading-none">
            {currency}{originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 bg-[#f4fafc] rounded-full px-2 py-0.5 whitespace-nowrap">
      <span className="text-sm text-[#1e2125] leading-snug">
        {price.toFixed(2)}
      </span>
      {originalPrice && (
        <span className="text-xs text-[#5c6264] line-through leading-snug">
          {originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}
