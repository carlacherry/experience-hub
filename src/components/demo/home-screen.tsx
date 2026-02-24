"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Home, Grid, ShoppingBag, User, MessageCircle, Search, Store } from "lucide-react";
import { ProductCardVertical } from "@/components/product-card/product-card-vertical";
import { LogoPepsiChat } from "@/components/demo/logo-pepsi-chat";

// ─── Assets ──────────────────────────────────────────────────────────────────

const imgPepsi355    = "/26d8a9d1d01a4c25efcdf1bef6122e0b0fbf6a1d.png";
const imgAdrenaline  = "/800d978338bdc8a7292492489829c28cc28ec56e.png";
const imgGatorade68  = "/da57af3f60b829a8214c2acc8c5fff149344177a.png";
const imgPetit       = "/ca7f5214974730d0510a6b1add126297cf417c87.png";
const imgLipton      = "/66ad5f7309642e2e97628d9256d601642fd7f314.png";
const imgGatorade94  = "/b282e665443816fd37c7d7699468c35eac470499.png";

const BANNERS = [
  { src: "/1612c4fa181da6fae0c66cf15c18ef456377bdb0.png", alt: "Pepsi – Sed de más" },
  { src: "/7649b764653432ee3e82cd5bd4a53586993b8250.png", alt: "Banner 2" },
  { src: "/92a23892cae046555186c8d267a5e71892abb945.png", alt: "Banner 3" },
];

const HOME_PRODUCTS = [
  { name: "Pepsi 355ml Pet",             minOrderLabel: "Desde 3 cajas", price: 68,  originalPrice: 70,  image: imgPepsi355   },
  { name: "Adrenaline Rush 355ml lata",  minOrderLabel: "Desde 5 cajas", price: 108, originalPrice: 110, image: imgAdrenaline  },
  { name: "Gatorade Naranja 600ml Pet",  minOrderLabel: "Desde 4 cajas", price: 68,  originalPrice: 70,  image: imgGatorade68  },
  { name: "Petit Fruta Fresca 2L",       minOrderLabel: "Desde 6 uds",   price: 77,                      image: imgPetit       },
  { name: "Lipton Durazno 355ml Pet",    minOrderLabel: "Desde 6 uds",   price: 77,                      image: imgLipton      },
  { name: "Gatorade Naranja 600ml Pet",  minOrderLabel: "Desde 4 cajas", price: 94,                      image: imgGatorade94  },
];

const BRANDS = [
  { name: "Pepsi",    logo: "/4c4fa9521b0e59e9cc9aa0d67836f79889000847.png" },
  { name: "Lipton",   logo: "/5664910d94913741a6d121b83cc06297e6dcd45c.png" },
  { name: "Gatorade", logo: "/5d89ae636a2e67f66a1fabe34abddf646cb03940.png" },
  { name: "Petit",    logo: "/14cff01831ae0f67c2026eac031be3b61c6edb60.png" },
  { name: "Corona",   logo: "/2e7372243056abc9478b0aaf6bf284e6e014193a.png" },
];

// ─── BannerCarousel ───────────────────────────────────────────────────────────

function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function measure() {
      if (outerRef.current) {
        // container width minus left+right padding (px-4 = 16px × 2) minus peek (16px)
        setItemWidth(outerRef.current.offsetWidth - 48);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const gap = 8;

  function handleScroll() {
    const el = scrollRef.current;
    if (!el || !itemWidth) return;
    const index = Math.round(el.scrollLeft / (itemWidth + gap));
    setCurrent(Math.max(0, Math.min(index, BANNERS.length - 1)));
  }

  function goTo(i: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * (itemWidth + gap), behavior: "smooth" });
    setCurrent(i);
  }

  return (
    <div ref={outerRef} className="pt-2 pb-1">
      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-2 overflow-x-auto px-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
      >
        {BANNERS.map((banner, i) => (
          <div
            key={i}
            style={itemWidth > 0 ? { minWidth: itemWidth } : {}}
            className="min-w-[80%] h-[169px] rounded-2xl overflow-hidden shrink-0 snap-start"
          >
            <img
              src={banner.src}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-2.5">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Banner ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-250 ${
              i === current ? "w-4 bg-[#0057FF]" : "w-1.5 bg-[#cbd5e1]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface HomeScreenProps {
  onOpenChat: () => void;
  onOpenSearch: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HomeScreen({ onOpenChat, onOpenSearch }: HomeScreenProps) {
  return (
    <div className="flex flex-col w-full h-full bg-white relative">

      {/* A. AppHeader */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#e5e5e5] shrink-0">
        <LogoPepsiChat />
        <button className="flex items-center gap-1.5 text-sm text-[#333] font-medium">
          <Store size={14} className="text-[#555]" />
          <span>Tienda Esperanza</span>
          <ChevronDown size={14} className="text-[#555]" />
        </button>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-20">

        {/* B. SearchBar */}
        <div className="mx-4 my-3">
          <button onClick={onOpenSearch} className="flex items-center gap-2 bg-[#f3f4f6] rounded-full px-4 py-2.5 w-full text-left">
            <Search size={16} className="text-[#9ca3af] shrink-0" />
            <span className="text-sm text-[#9ca3af]">Busca productos o marcas</span>
          </button>
        </div>

        {/* C. BannerCarousel */}
        <BannerCarousel />

        {/* D. SectionRow — Te puede faltar */}
        <div className="px-4 pt-3 pb-2">
          <h2 className="font-semibold text-[18px] text-[#1e293b]">⭐ Te puede faltar</h2>
        </div>

        {/* E. ProductGrid */}
        <div className="grid grid-cols-2 gap-3 px-3 pb-4 justify-items-center">
          {HOME_PRODUCTS.map((product, i) => (
            <ProductCardVertical key={i} {...product} />
          ))}
        </div>

        {/* F. SectionRow — Descubre nuestras marcas */}
        <div className="px-4 pt-2 pb-1">
          <h2 className="font-semibold text-[18px] text-[#1e293b]">💙 Descubre nuestras marcas</h2>
        </div>

        {/* G. BrandScroll */}
        <div className="flex gap-4 overflow-x-auto px-4 py-3 scrollbar-hide">
          {BRANDS.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center gap-1.5 shrink-0">
              <div className="w-12 h-12 rounded-full border border-[#e5e5e5] bg-white flex items-center justify-center shadow-sm overflow-hidden">
                <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] text-[#555] font-medium">{brand.name}</span>
            </div>
          ))}
        </div>

      </div>

      {/* H. BottomNav */}
      <nav className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-3 bg-white border-t border-[#e5e5e5]">
        <button className="flex flex-col items-center gap-0.5">
          <Home size={20} className="text-[#0057FF]" />
          <span className="text-[10px] font-medium text-[#0057FF]">Inicio</span>
        </button>
        <button className="flex flex-col items-center gap-0.5">
          <Grid size={20} className="text-[#94a3b8]" />
          <span className="text-[10px] font-medium text-[#94a3b8]">Portafolio</span>
        </button>
        <button className="flex flex-col items-center gap-0.5">
          <ShoppingBag size={20} className="text-[#94a3b8]" />
          <span className="text-[10px] font-medium text-[#94a3b8]">Pedido</span>
        </button>
        <button className="flex flex-col items-center gap-0.5">
          <User size={20} className="text-[#94a3b8]" />
          <span className="text-[10px] font-medium text-[#94a3b8]">Perfil</span>
        </button>
      </nav>

      {/* I. ChatFAB */}
      <button
        aria-label="Abrir chat con Oris"
        onClick={onOpenChat}
        className="absolute bottom-20 right-4 w-14 h-14 bg-[#0057FF] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#0046cc] active:scale-95 transition-all z-10"
      >
        <MessageCircle size={26} />
      </button>

    </div>
  );
}
