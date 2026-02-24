"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, Search, Bell, MessageSquare, ChevronRight } from "lucide-react";
import { LogoPepsiChat } from "@/components/demo/logo-pepsi-chat";

// ─── Assets ──────────────────────────────────────────────────────────────────

const imgFoto    = "/f4fd26a3b39d131034a972a2c85dc82bf5d957c6.png";
const imgSuggest = "/38cfaa3d7747b1703d2c5441f063e15905f108be.png";

const BRANDS = [
  { src: "/077ab6d446b993c5e4f69a0214fe4c855aefd3f7.png", name: "Pepsi" },
  { src: "/bab1e5c9926afe686d21a7515022ed7b5248d113.png", name: "Brahva" },
  { src: "/17aa0e5c0def3e37b8095aec12d57e9034c48a2a.png", name: "Lipton" },
  { src: "/275412a8e970dde31343e396752edf511162b282.png", name: "Salutaris" },
  { src: "/79c4a9a82d5a823121dc21193de9099b2985463e.png", name: "Petit" },
  { src: "/3147b3729e972f51538e20bd22255bf51a685823.png", name: "Brand 6" },
  { src: "/bc44be38f2e86180543e8cd49876f0f8ce7f1e0b.png", name: "Brand 7" },
  { src: "/bb32e09c27737506042c78b25a22378719a6f799.png", name: "Brand 8" },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface SearchScreenProps {
  onBack: () => void;
  onOpenFoto: () => void;
  onOpenSugerido: () => void;
  isActive: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SearchScreen({ onBack, onOpenFoto, onOpenSugerido, isActive }: SearchScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isActive) return;
    // Wait for the slide-in transition (300ms) before focusing
    const t = setTimeout(() => inputRef.current?.focus(), 320);
    return () => clearTimeout(t);
  }, [isActive]);

  return (
    <div className="flex flex-col w-full h-full bg-white">

      {/* Header */}
      <header className="flex items-center justify-between px-2 py-2 bg-white border-b border-[#e5e5e5] shrink-0">
        <button onClick={onBack} aria-label="Volver" className="p-2 text-[#1e293b]">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-1">
          <LogoPepsiChat />
          <button className="p-2 text-[#1e293b]" aria-label="Notificaciones">
            <Bell size={18} />
          </button>
          <button className="p-2 text-[#1e293b]" aria-label="Mensajes">
            <MessageSquare size={18} />
          </button>
        </div>
      </header>

      {/* Search bar — focused state */}
      <div className="mx-4 my-3 shrink-0">
        <div className="flex items-center gap-2 bg-white border-2 border-[#0057FF] rounded-full px-4 py-2.5">
          <Search size={16} className="text-[#9ca3af] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            placeholder="Busca productos o marcas"
            className="flex-1 text-sm text-[#1e293b] placeholder:text-[#9ca3af] bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-6">

        {/* Smart search section */}
        <div className="px-4 pt-2 pb-3 flex items-center gap-2">
          <span className="text-[#f4bb00]">✦</span>
          <h2 className="font-bold text-[17px] text-[#1e293b]">Prueba nuevas formas de buscar</h2>
        </div>

        <div className="mx-4 flex flex-col gap-1">
          <button onClick={onOpenFoto} className="flex items-center gap-3 pl-0.5 pr-4 py-0.5 bg-[#fcfcfc] border border-[#e6e6e6] rounded-xl w-full text-left active:bg-[#f0f0f0] transition-colors">
            <img src={imgFoto} alt="Arma tu pedido con una foto" className="w-[60px] h-[60px] rounded-lg object-cover shrink-0" />
            <span className="flex-1 text-[15px] font-medium text-[#1e293b] leading-snug">Arma tu pedido con una foto</span>
            <ChevronRight size={16} className="text-[#94a3b8] shrink-0" />
          </button>

          <button onClick={onOpenSugerido} className="flex items-center gap-3 pl-0.5 pr-4 py-0.5 bg-[#fcfcfc] border border-[#e6e6e6] rounded-xl w-full text-left active:bg-[#f0f0f0] transition-colors">
            <img src={imgSuggest} alt="Tu pedido sugerido" className="w-[60px] h-[60px] rounded-lg object-cover shrink-0" />
            <span className="flex-1 text-[15px] font-medium text-[#1e293b] leading-snug">Tu pedido sugerido</span>
            <ChevronRight size={16} className="text-[#94a3b8] shrink-0" />
          </button>
        </div>

        {/* Brands section */}
        <div className="px-4 pt-6 pb-3 flex items-center gap-2">
          <span className="text-[#0057FF]">♥</span>
          <h2 className="font-bold text-[17px] text-[#1e293b]">Conoce nuestras marcas</h2>
        </div>

        <div className="grid grid-cols-3 place-items-center gap-y-8 px-6 pb-4">
          {BRANDS.map((brand) => (
            <img
              key={brand.name}
              src={brand.src}
              alt={brand.name}
              className="w-[72px] h-[72px] object-contain"
            />
          ))}
        </div>

      </div>
    </div>
  );
}
