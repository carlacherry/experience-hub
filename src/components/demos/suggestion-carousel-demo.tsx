"use client";

import { SuggestionCarousel } from "@/components/suggestion-carousel";

const icon = "/figma-assets/4794afc92222286db5854f0c3c3cb0dc7f271f09.png";

export default function SuggestionCarouselDemo() {
  return (
    <div className="w-full px-2">
      <SuggestionCarousel
        cards={[
          {
            icon,
            title: "How can I help?",
            description: "Pick a topic to get started",
            suggestions: [
              { id: "1", label: "View deals" },
              { id: "2", label: "Track my order" },
              { id: "3", label: "Talk to an agent" },
            ],
            onSuggestionClick: (s) => console.log("Card 1:", s.label),
          },
          {
            icon,
            title: "Browse categories",
            description: "What are you looking for today?",
            suggestions: [
              { id: "1", label: "Beverages" },
              { id: "2", label: "Snacks" },
              { id: "3", label: "Dairy" },
            ],
            onSuggestionClick: (s) => console.log("Card 2:", s.label),
          },
          {
            icon,
            title: "What's new",
            description: "See what arrived this week",
            suggestions: [
              { id: "1", label: "New arrivals" },
              { id: "2", label: "Active promotions" },
            ],
            onSuggestionClick: (s) => console.log("Card 3:", s.label),
          },
        ]}
      />
    </div>
  );
}
