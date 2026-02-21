import Image from "next/image";

export interface Suggestion {
  id: string;
  label: string;
}

export interface SuggestionCardProps {
  icon: string;
  title: string;
  description: string;
  suggestions: Suggestion[];
  onSuggestionClick: (suggestion: Suggestion) => void;
}

export function SuggestionCard({
  icon,
  title,
  description,
  suggestions,
  onSuggestionClick,
}: SuggestionCardProps) {
  return (
    <div className="bg-suggestion-card-bg border border-suggestion-card-border rounded-xl p-4 flex flex-col gap-4 w-[244px]">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="relative size-[61px] shrink-0">
          <Image src={icon} alt={title} fill className="object-contain" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-bold text-black leading-snug">{title}</p>
          <p className="text-sm text-black leading-snug">{description}</p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex flex-col gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSuggestionClick(suggestion)}
            aria-label={`Sugerir: ${suggestion.label}`}
            className="bg-suggestion-chip rounded-2xl h-[46px] px-4 text-base text-black text-left hover:bg-suggestion-chip-hover transition-colors w-full"
          >
            {suggestion.label}
          </button>
        ))}
      </div>
    </div>
  );
}
