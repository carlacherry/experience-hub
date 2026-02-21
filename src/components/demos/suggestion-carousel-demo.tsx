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
            title: "¿En qué te ayudo?",
            description: "Elige un tema para comenzar",
            suggestions: [
              { id: "1", label: "Ver productos en oferta" },
              { id: "2", label: "Consultar mi pedido" },
              { id: "3", label: "Hablar con un asesor" },
            ],
            onSuggestionClick: (s) => console.log("Card 1:", s.label),
          },
          {
            icon,
            title: "Explorar categorías",
            description: "¿Qué estás buscando hoy?",
            suggestions: [
              { id: "1", label: "Bebidas" },
              { id: "2", label: "Snacks" },
              { id: "3", label: "Lácteos" },
            ],
            onSuggestionClick: (s) => console.log("Card 2:", s.label),
          },
          {
            icon,
            title: "Novedades",
            description: "Mira lo que llegó esta semana",
            suggestions: [
              { id: "1", label: "Nuevos productos" },
              { id: "2", label: "Promociones activas" },
            ],
            onSuggestionClick: (s) => console.log("Card 3:", s.label),
          },
        ]}
      />
    </div>
  );
}
