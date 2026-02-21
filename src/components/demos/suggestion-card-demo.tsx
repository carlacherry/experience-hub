"use client";

import { SuggestionCard } from "@/components/suggestion-card";

export default function SuggestionCardDemo() {
  return (
    <SuggestionCard
      icon="/figma-assets/4794afc92222286db5854f0c3c3cb0dc7f271f09.png"
      title="¿En qué te ayudo?"
      description="Elige un tema para comenzar"
      suggestions={[
        { id: "1", label: "Ver productos en oferta" },
        { id: "2", label: "Consultar mi pedido" },
        { id: "3", label: "Hablar con un asesor" },
      ]}
      onSuggestionClick={(s) => console.log("Sugerencia:", s.label)}
    />
  );
}
