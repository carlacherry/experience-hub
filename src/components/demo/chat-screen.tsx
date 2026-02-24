"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Mic,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";
import { ProductCarousel } from "@/components/product-carousel";
import { ProductList } from "@/components/product-list";

// ─── Assets ──────────────────────────────────────────────────────────────────

const img = "/7f12ea1300756f144a0fb5daaf68dbfc01103a46.png";

const SUGGESTED_PRODUCTS = [
  { name: "Pepsi Original 355ml", minOrderLabel: "Desde 5 cajas", price: 68, originalPrice: 70, image: img },
  { name: "Pepsi Original 3L Pet", minOrderLabel: "Desde 3 cajas", price: 108, originalPrice: 110, image: img },
  { name: "Pepsi Zero 355ml", minOrderLabel: "Desde 3 cajas", price: 65, originalPrice: 68, image: img },
  { name: "Pepsi Light 2L", minOrderLabel: "Desde 4 cajas", price: 92, image: img },
];

const MORE_PRODUCTS = [
  { name: "7UP 355ml", minOrderLabel: "Desde 4 cajas", price: 58, originalPrice: 62, image: img },
  { name: "Mountain Dew 355ml", minOrderLabel: "Desde 5 cajas", price: 62, image: img },
  { name: "Mirinda Naranja 2L", minOrderLabel: "Desde 3 cajas", price: 78, originalPrice: 82, image: img },
];

const LIST_PRODUCTS = [
  { name: "Pepsi Original 355ml", units: "5 cajas · 24 uds c/u", price: 68, originalPrice: 70, unitPrice: 2.83, image: img, counters: [{ label: "cajas", initial: 5 }, { label: "uds", initial: 0 }] },
  { name: "Pepsi Original 3L Pet", units: "3 cajas · 6 uds c/u", price: 108, originalPrice: 110, unitPrice: 18, image: img, counters: [{ label: "cajas", initial: 3 }, { label: "uds", initial: 0 }] },
  { name: "Pepsi Zero 355ml", units: "3 cajas · 24 uds c/u", price: 65, originalPrice: 68, image: img, counters: [{ label: "cajas", initial: 3 }, { label: "uds", initial: 0 }] },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type WidgetType = "carousel-suggested" | "carousel-more" | "list-cart";

type ChatMessage =
  | { id: string; role: "user" | "agent"; kind: "text"; text: React.ReactNode }
  | { id: string; role: "agent"; kind: "widget"; widget: WidgetType };

type MessageTemplate =
  | { role: "user" | "agent"; kind: "text"; text: React.ReactNode }
  | { role: "agent"; kind: "widget"; widget: WidgetType };

// ─── Script ───────────────────────────────────────────────────────────────────

interface FlowStep {
  messages: MessageTemplate[];
  replies: string[];
  cartDelta?: number;
}

const SCRIPT: Record<string, FlowStep> = {
  "⭐ Pedido sugerido": {
    messages: [
      { role: "agent", kind: "text", text: "Un momento... preparando tu pedido sugerido. 📋" },
      { role: "agent", kind: "widget", widget: "carousel-suggested" },
      { role: "agent", kind: "text", text: "Esto es lo que normalmente pides. Ajusta lo que necesites." },
    ],
    replies: ["Agregar más productos", "Agregar al carrito"],
  },
  "Agregar más productos": {
    messages: [
      { role: "agent", kind: "text", text: "Basado en tu historial, también sueles pedir esto:" },
      { role: "agent", kind: "widget", widget: "carousel-more" },
      { role: "agent", kind: "text", text: "¿Los agrego al carrito?" },
    ],
    replies: ["Sí, agregar", "No, gracias"],
  },
  "📷 Tomar foto ahora": {
    messages: [
      { role: "user", kind: "text", text: "📷 Foto enviada" },
      { role: "agent", kind: "text", text: "Analizando tu foto... 🔍" },
      { role: "agent", kind: "widget", widget: "list-cart" },
      { role: "agent", kind: "text", text: "¡Listo! Encontré estos productos en tu foto. ¿Los agrego al carrito?" },
    ],
    replies: ["Sí, agregar todo", "Ajustar cantidades"],
  },
  "📁 Elegir de galería": {
    messages: [
      { role: "user", kind: "text", text: "🖼️ Foto de galería" },
      { role: "agent", kind: "text", text: "Procesando imagen... 🔍" },
      { role: "agent", kind: "widget", widget: "list-cart" },
      { role: "agent", kind: "text", text: "¡Listo! Identifiqué estos productos. ¿Los agrego al carrito?" },
    ],
    replies: ["Sí, agregar todo", "Ajustar cantidades"],
  },
  "Sí, agregar todo": {
    messages: [
      { role: "agent", kind: "text", text: "¡Perfecto! Todo agregado al carrito. 🛒" },
      {
        role: "agent",
        kind: "text",
        text: (
          <>
            Llevas <strong>18 de 30 cajas</strong> Pepsi Original.{" "}
            ¡Ya casi completas tu desafío! 🏅
          </>
        ),
      },
    ],
    replies: ["Ver mi carrito", "Seguir comprando"],
    cartDelta: 3,
  },
  "Ajustar cantidades": {
    messages: [
      { role: "agent", kind: "text", text: "Claro, toca cualquier producto para ajustar la cantidad." },
    ],
    replies: ["Listo, agregar al carrito"],
  },
  "Listo, agregar al carrito": {
    messages: [
      { role: "agent", kind: "text", text: "¡Perfecto! Todo agregado. 🛒" },
    ],
    replies: ["Ver mi carrito", "Seguir comprando"],
    cartDelta: 3,
  },
  "Seguir comprando": {
    messages: [
      { role: "agent", kind: "text", text: "¡Claro! ¿Qué más necesitas?" },
    ],
    replies: ["⭐ Pedido sugerido", "🏅 Mi desafío", "🎁 Ver promos"],
  },
  "Agregar al carrito": {
    messages: [
      { role: "agent", kind: "text", text: "¡Perfecto! Ya los agregué a tu carrito. 🛒" },
      {
        role: "agent",
        kind: "text",
        text: (
          <>
            Llevas <strong>18 de 30 cajas</strong> Pepsi Original.{" "}
            ¡Ya casi completas tu desafío! 🏅
          </>
        ),
      },
    ],
    replies: ["Ver mi carrito", "¿Qué más me sugieres?"],
    cartDelta: 4,
  },
  "Ver mi carrito": {
    messages: [
      { role: "agent", kind: "text", text: "Aquí está lo que llevas hasta ahora:" },
      { role: "agent", kind: "widget", widget: "list-cart" },
      { role: "agent", kind: "text", text: "¿Confirmamos el pedido?" },
    ],
    replies: ["Sí, confirmar", "No, ajustar"],
  },
  "¿Qué más me sugieres?": {
    messages: [
      { role: "agent", kind: "text", text: "Basado en tu historial, también sueles pedir esto:" },
      { role: "agent", kind: "widget", widget: "carousel-more" },
      { role: "agent", kind: "text", text: "¿Los agrego al carrito?" },
    ],
    replies: ["Sí, agregar", "No, gracias"],
  },
  "Sí, agregar": {
    messages: [
      { role: "agent", kind: "text", text: "¡Listo! Productos agregados. ¿Confirmamos el pedido? ✅" },
    ],
    replies: ["Sí, confirmar", "No, seguir comprando"],
    cartDelta: 3,
  },
  "No, gracias": {
    messages: [
      { role: "agent", kind: "text", text: "Perfecto. ¿Hay algo más en lo que pueda ayudarte?" },
    ],
    replies: ["📦 Armar pedido", "🏅 Mi desafío", "🎁 Ver promos"],
  },
  "Sí, confirmar": {
    messages: [
      { role: "agent", kind: "text", text: "¡Pedido confirmado! ✅ Estará en tu tienda en 24 hrs." },
    ],
    replies: ["📦 Nuevo pedido", "🏅 Ver mi desafío"],
  },
  "No, ajustar": {
    messages: [
      { role: "agent", kind: "text", text: "Claro, tómate el tiempo que necesites. Dime qué quieres cambiar." },
    ],
    replies: ["Cambiar cantidades", "Eliminar un producto", "Cancelar"],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function renderWidget(type: WidgetType) {
  switch (type) {
    case "carousel-suggested":
      return <ProductCarousel products={SUGGESTED_PRODUCTS} />;
    case "carousel-more":
      return <ProductCarousel products={MORE_PRODUCTS} />;
    case "list-cart":
      return <ProductList products={LIST_PRODUCTS} />;
  }
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface ChatScreenProps {
  onBack: () => void;
  entry?: "foto" | "sugerido";
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ChatScreen({ onBack, entry }: ChatScreenProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replies, setReplies] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
    setReplies([]);
    setIsTyping(false);
    setCartCount(0);

    async function init() {
      if (entry === "foto") {
        setIsTyping(true);
        await wait(1000);
        setIsTyping(false);
        setMessages([
          { id: genId(), role: "agent", kind: "text", text: "¡Hola! 📸 Envíame una foto de tu lista de pedido y me encargo de armarlo." },
          { id: genId(), role: "agent", kind: "text", text: "¿Tienes la foto lista?" },
        ]);
        setReplies(["📷 Tomar foto ahora", "📁 Elegir de galería"]);
      } else if (entry === "sugerido") {
        setIsTyping(true);
        await wait(1000);
        setIsTyping(false);
        const step = SCRIPT["⭐ Pedido sugerido"];
        for (let i = 0; i < step.messages.length; i++) {
          const msg = step.messages[i];
          const newMsg: ChatMessage = msg.kind === "widget"
            ? { id: genId(), role: "agent", kind: "widget", widget: msg.widget }
            : { id: genId(), role: msg.role, kind: "text", text: msg.text };
          setMessages((prev) => [...prev, newMsg]);
          if (i < step.messages.length - 1) await wait(500);
        }
        setReplies(step.replies);
      } else {
        setMessages([
          { id: genId(), role: "agent", kind: "text", text: "Hola, soy tu asistente de pedidos. ¿En qué te ayudo hoy?" },
        ]);
        setReplies(["📦 Armar pedido", "⭐ Pedido sugerido", "🏅 Mi desafío", "🎁 Ver promos"]);
      }
    }
    init();
  }, [entry]);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping, replies]);

  const handleReply = useCallback(async (label: string) => {
    setReplies([]);
    setMessages((prev) => [
      ...prev,
      { id: genId(), role: "user", kind: "text", text: label },
    ]);

    const step = SCRIPT[label];
    if (!step) return;

    setIsTyping(true);
    await wait(1100);
    setIsTyping(false);

    for (let i = 0; i < step.messages.length; i++) {
      const msg = step.messages[i];
      const newMsg: ChatMessage = msg.kind === "widget"
        ? { id: genId(), role: "agent", kind: "widget", widget: msg.widget }
        : { id: genId(), role: msg.role, kind: "text", text: msg.text };
      setMessages((prev) => [...prev, newMsg]);
      if (i < step.messages.length - 1) await wait(500);
    }

    if (step.cartDelta) setCartCount((c) => c + step.cartDelta!);
    setReplies(step.replies);
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-[#f0f0f0]">

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#e5e5e5] shrink-0">
        <div className="flex items-center gap-3">
          <button aria-label="Volver" className="text-black" onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <div className="w-9 h-9 rounded-full bg-[#1B5E4C] flex items-center justify-center text-white font-semibold text-sm shrink-0">
            O
          </div>
          <div>
            <p className="text-sm font-semibold text-black leading-tight">Oris</p>
            <p className="text-xs text-green-500 leading-tight">En línea</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Filtros" className="text-[#555]">
            <SlidersHorizontal size={18} />
          </button>
          <button aria-label="Carrito" className="relative text-[#555]">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5 leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Messages */}
      <div ref={messagesRef} className="flex-1 overflow-y-auto py-5 flex flex-col gap-2.5">
        {messages.map((msg) => {
          if (msg.kind === "widget") {
            return (
              <div key={msg.id} className="px-3 w-full">
                {renderWidget(msg.widget)}
              </div>
            );
          }
          if (msg.role === "user") {
            return (
              <div key={msg.id} className="flex justify-end px-4">
                <div className="max-w-[75%] bg-[#1a1a1a] text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed">
                  {msg.text}
                </div>
              </div>
            );
          }
          return (
            <div key={msg.id} className="flex justify-start px-4">
              <p className="max-w-[85%] text-sm text-[#333] leading-relaxed">
                {msg.text}
              </p>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start px-4">
            <div className="bg-white rounded-2xl rounded-bl-sm px-3.5 py-3 flex gap-1 shadow-sm">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#bbb] animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quick replies */}
        {replies.length > 0 && (
          <div className="flex gap-2 flex-wrap px-4 pt-1">
            {replies.map((r) => (
              <button
                key={r}
                onClick={() => handleReply(r)}
                className="px-4 py-2 rounded-full text-sm text-[#222] bg-white border border-[#ddd] hover:bg-[#f5f5f5] active:scale-95 transition-all"
              >
                {r}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-3 py-3 bg-white border-t border-[#e5e5e5] shrink-0">
        <button aria-label="Cámara" className="text-[#999] p-1 shrink-0">
          <Camera size={22} />
        </button>
        <div className="flex-1 bg-[#f0f0f0] rounded-full px-4 py-2.5 text-sm text-[#bbb] select-none">
          Escribe un mensaje...
        </div>
        <button
          aria-label="Nota de voz"
          className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0"
        >
          <Mic size={18} />
        </button>
      </div>

    </div>
  );
}
