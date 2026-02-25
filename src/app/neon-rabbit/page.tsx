import type { Metadata } from "next";
import { ShoppingCart, ChevronRight, Star, Package, Sparkles, Gift } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sandbox",
  robots: "noindex, nofollow",
};

// ─── Mock data ────────────────────────────────────────────────────────────────

const CART_ITEMS = [
  { name: "Pepsi Original 355ml", qty: 5, unit: "cajas", image: "/product-img/Pepsi.png" },
  { name: "7UP 355ml",            qty: 4, unit: "cajas", image: "/product-img/Seven.png" },
  { name: "Lipton Durazno 355ml", qty: 3, unit: "uds",   image: "/product-img/Lipton.png" },
];
const TOTAL_ITEMS = CART_ITEMS.reduce((s, i) => s + i.qty, 0);
const POINTS = 240;

// ─── Proposal 1 — Compact strip ───────────────────────────────────────────────
// Horizontal pill: stacked thumbnails · item count · points badge · arrow

function CartWidget1() {
  return (
    <button className="w-full max-w-[383px] bg-card-surface border border-card-border rounded-2xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.06)] px-4 py-3 flex items-center gap-3 hover:shadow-md transition-shadow">
      {/* Stacked thumbnails */}
      <div className="flex -space-x-2 shrink-0">
        {CART_ITEMS.map((item, i) => (
          <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-[#f8fafc] overflow-hidden relative shrink-0">
            <Image src={item.image} alt={item.name} fill className="object-contain p-0.5" />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex flex-col items-start flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary leading-tight">
          {CART_ITEMS.length} productos · {TOTAL_ITEMS} unidades
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <p className="text-xs text-text-muted">Ganarás {POINTS} pts con este pedido</p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-sm font-semibold text-text-primary">Ver carrito</span>
        <ChevronRight size={16} className="text-text-muted" />
      </div>
    </button>
  );
}

// ─── Proposal 2 — Mini product list ──────────────────────────────────────────
// Card with product rows + points footer row + CTA button

function CartWidget2() {
  return (
    <div className="w-full max-w-[383px] bg-card-surface border border-card-border rounded-2xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.06)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <ShoppingCart size={15} className="text-text-muted" />
          <p className="text-sm font-semibold text-text-primary">Tu carrito</p>
        </div>
        <span className="text-xs text-text-muted">{CART_ITEMS.length} productos</span>
      </div>

      {/* Product rows */}
      <div className="divide-y divide-card-divider">
        {CART_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-md bg-[#f8fafc] relative shrink-0 overflow-hidden">
              <Image src={item.image} alt={item.name} fill className="object-contain p-0.5" />
            </div>
            <p className="text-sm text-text-primary flex-1 truncate">{item.name}</p>
            <p className="text-xs font-semibold text-text-muted shrink-0">{item.qty} {item.unit}</p>
          </div>
        ))}
      </div>

      {/* Points row */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#ecfdf5] border-t border-card-divider">
        <Sparkles size={13} className="text-[#186c54] shrink-0" />
        <p className="text-xs text-[#186c54] font-medium">Ganarás <strong>{POINTS} puntos</strong> al confirmar</p>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4 pt-3">
        <button className="w-full bg-black text-white text-sm font-semibold rounded-xl py-2.5 hover:bg-neutral-800 transition-colors">
          Ir al carrito →
        </button>
      </div>
    </div>
  );
}

// ─── Proposal 3 — Thumbnail grid ─────────────────────────────────────────────
// 3-up image row + totals + points pill + full CTA

function CartWidget3() {
  return (
    <div className="w-full max-w-[383px] bg-card-surface border border-card-border rounded-2xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.06)] p-4 flex flex-col gap-3">
      {/* Thumbnails row */}
      <div className="flex gap-2">
        {CART_ITEMS.map((item, i) => (
          <div key={i} className="flex-1 aspect-square rounded-xl bg-[#f8fafc] relative overflow-hidden border border-card-border-subtle">
            <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-semibold text-text-primary">{CART_ITEMS.length} productos en tu carrito</p>
          <p className="text-xs text-text-muted">{TOTAL_ITEMS} unidades en total</p>
        </div>
        {/* Points pill */}
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1 shrink-0">
          <Star size={11} className="text-amber-500 fill-amber-500" />
          <span className="text-xs font-semibold text-amber-700">+{POINTS} pts</span>
        </div>
      </div>

      {/* CTA */}
      <button className="w-full bg-black text-white text-sm font-semibold rounded-xl py-2.5 flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors">
        <ShoppingCart size={15} />
        Ver carrito
      </button>
    </div>
  );
}

// ─── Proposal 4 — Split card ──────────────────────────────────────────────────
// Left: stacked product names. Right: big points number. Tap whole card.

function CartWidget4() {
  return (
    <button className="w-full max-w-[383px] bg-card-surface border border-card-border rounded-2xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.06)] flex overflow-hidden hover:shadow-md transition-shadow">
      {/* Left */}
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingCart size={14} className="text-text-muted" />
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Carrito</p>
        </div>
        <div className="flex flex-col gap-1">
          {CART_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bfc7ce] shrink-0" />
              <p className="text-sm text-text-primary truncate">{item.qty} {item.unit} {item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px bg-card-divider" />

      {/* Right — points + arrow */}
      <div className="flex flex-col items-center justify-center px-5 gap-1 shrink-0 bg-[#ecfdf5]">
        <Gift size={18} className="text-[#186c54]" />
        <p className="text-2xl font-bold text-[#186c54] leading-none">+{POINTS}</p>
        <p className="text-[10px] text-[#186c54] font-medium leading-tight text-center">puntos<br/>al pedir</p>
        <ChevronRight size={14} className="text-[#186c54] mt-1" />
      </div>
    </button>
  );
}

// ─── Proposal 5 — Receipt preview ────────────────────────────────────────────
// Dashed border, receipt feel, product lines with dot leaders, points at bottom

function CartWidget5() {
  return (
    <button className="w-full max-w-[383px] bg-card-surface border-2 border-dashed border-card-border rounded-2xl shadow-[0px_4px_8px_0px_rgba(0,0,0,0.06)] p-4 hover:border-[#bfc7ce] transition-colors text-left">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Package size={15} className="text-text-primary" />
          <p className="text-sm font-semibold text-text-primary">Resumen de pedido</p>
        </div>
        <span className="text-xs bg-[#deeaff] text-[#1a56db] font-semibold px-2 py-0.5 rounded-full">
          {CART_ITEMS.length} items
        </span>
      </div>

      {/* Product lines */}
      <div className="flex flex-col gap-1.5 mb-3">
        {CART_ITEMS.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <p className="text-sm text-text-primary truncate flex-1">{item.name}</p>
            <div className="flex-1 border-b border-dotted border-[#bfc7ce] mx-1 mb-0.5" />
            <p className="text-sm font-semibold text-text-muted shrink-0">{item.qty} {item.unit}</p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-card-border mb-3" />

      {/* Points + CTA row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Star size={13} className="text-amber-400 fill-amber-400" />
          <p className="text-xs text-text-muted">
            <span className="font-semibold text-text-primary">{POINTS} puntos</span> al confirmar
          </p>
        </div>
        <div className="flex items-center gap-1 text-text-primary">
          <span className="text-sm font-semibold">Ver carrito</span>
          <ChevronRight size={15} />
        </div>
      </div>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const proposals = [
  { id: 1, name: "Compact strip",     desc: "Píldora horizontal con thumbnails apiladas y puntos inline",     component: <CartWidget1 /> },
  { id: 2, name: "Mini product list", desc: "Card con filas de producto, footer de puntos y botón CTA",        component: <CartWidget2 /> },
  { id: 3, name: "Thumbnail grid",    desc: "Grid de imágenes + estadísticas + pill de puntos + CTA",          component: <CartWidget3 /> },
  { id: 4, name: "Split card",        desc: "Panel izquierdo con lista · Panel derecho con puntos destacados", component: <CartWidget4 /> },
  { id: 5, name: "Receipt preview",   desc: "Borde punteado estilo recibo, dot-leaders y línea de puntos",     component: <CartWidget5 /> },
];

export default function SandboxPage() {
  return (
    <div className="min-h-screen bg-white px-8 py-12">
      <h1 className="font-display text-[clamp(48px,8vw,96px)] font-bold leading-none tracking-tight text-black">
        Sandbox
      </h1>
      <p className="mt-3 text-sm text-[#989898]">Experimental. Handle with care.</p>

      {/* Cart widget proposals */}
      <div className="mt-16 flex flex-col gap-16">
        {proposals.map(({ id, name, desc, component }) => (
          <section key={id} className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-mono text-[#989898] uppercase tracking-widest mb-0.5">
                Propuesta {id}
              </p>
              <h2 className="text-xl font-semibold text-black">{name}</h2>
              <p className="text-sm text-[#989898] mt-0.5">{desc}</p>
            </div>
            {/* Chat bubble context */}
            <div className="bg-[#f1f5fc] rounded-2xl p-4 w-fit">
              {component}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
