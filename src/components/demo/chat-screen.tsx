"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Mic,
  Send,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";
import { ProductCarousel } from "@/components/product-carousel";
import { ProductList } from "@/components/product-list";
import { SuggestionCarousel } from "@/components/suggestion-carousel";

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

type WidgetType = "carousel-suggested" | "carousel-more" | "list-cart" | "suggestion-carousel-home";

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
  "📷 Armar con foto": {
    messages: [
      { role: "agent", kind: "text", text: "¡Perfecto! 📸 Envíame una foto de tu lista y me encargo de armarlo." },
      { role: "agent", kind: "text", text: "¿Tienes la foto lista?" },
    ],
    replies: ["📷 Tomar foto ahora", "📁 Elegir de galería"],
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

// ─── FadeIn ───────────────────────────────────────────────────────────────────

function FadeIn({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);
  return (
    <div className={`transition-opacity duration-500 ease-out ${visible ? "opacity-100" : "opacity-0"}`}>
      {children}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
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
  const [inputValue, setInputValue] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesRef = useRef<HTMLDivElement>(null);

  function handleMessagesScroll() {
    const el = messagesRef.current;
    if (!el) return;
    setIsAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 16);
  }

  const showChips = replies.length > 0 && isAtBottom && !inputFocused;

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
        setIsTyping(true);
        await wait(800);
        setIsTyping(false);
        setMessages([
          { id: genId(), role: "agent", kind: "text", text: "¡Hola! ¿En qué te puedo ayudar hoy? 👋" },
        ]);
        await wait(600);
        setMessages((prev) => [
          ...prev,
          { id: genId(), role: "agent", kind: "widget", widget: "suggestion-carousel-home" },
        ]);
        setReplies([]);
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
    if (!step) {
      setIsTyping(true);
      await wait(900);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: genId(), role: "agent", kind: "text", text: "Entendido 👍 ¿Puedo ayudarte con algo más?" },
      ]);
      setReplies(["⭐ Pedido sugerido", "🎁 Ver promos", "🏅 Mi desafío"]);
      return;
    }

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

  function handleSend() {
    const text = inputValue.trim();
    if (!text || isTyping) return;
    setInputValue("");
    handleReply(text);
  }

  function renderWidget(type: WidgetType) {
    switch (type) {
      case "carousel-suggested":
        return <ProductCarousel products={SUGGESTED_PRODUCTS} />;
      case "carousel-more":
        return <ProductCarousel products={MORE_PRODUCTS} />;
      case "list-cart":
        return <ProductList products={LIST_PRODUCTS} />;
      case "suggestion-carousel-home":
        return (
          <SuggestionCarousel
            cards={[
              {
                icon: "/figma-assets/4794afc92222286db5854f0c3c3cb0dc7f271f09.png",
                title: "¿En qué te ayudo?",
                description: "Arma tu pedido con foto, voz o texto",
                suggestions: [
                  { id: "sugerido", label: "⭐ Pedido sugerido" },
                  { id: "foto", label: "📷 Armar con foto" },
                  { id: "promos", label: "🎁 Ver promos" },
                ],
                onSuggestionClick: (s) => handleReply(s.label),
              },
              {
                icon: "/figma-assets/4794afc92222286db5854f0c3c3cb0dc7f271f09.png",
                title: "Beneficios para tu tienda",
                description: "Consulta tus puntos y desafíos activos",
                suggestions: [
                  { id: "desafios", label: "Desafíos activos" },
                  { id: "puntos", label: "Ver mis puntos" },
                  { id: "canjear", label: "Canjear puntos" },
                ],
                onSuggestionClick: (s) => handleReply(s.label),
              },
            ]}
          />
        );
    }
  }

  return (
    <div className="flex flex-col w-full h-full bg-white">

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#f1f5fc] shrink-0">
        <div className="flex items-center gap-3">
          <button aria-label="Volver" className="text-black" onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <img
            src="/be9849271c7b4c3566f244c04c73f47037244c87.png"
            alt="Pepsichat Agent"
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div>
            <p className="text-sm font-semibold text-black leading-tight">Pepsichat Agent</p>
            <p className="text-xs text-[#555] leading-tight">En línea</p>
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
      <div ref={messagesRef} onScroll={handleMessagesScroll} className="flex-1 overflow-y-auto py-5 flex flex-col gap-2.5">
        {messages.map((msg) => {
          if (msg.kind === "widget") {
            return (
              <FadeIn key={msg.id}>
                <div className="px-3 w-full">
                  {renderWidget(msg.widget)}
                </div>
              </FadeIn>
            );
          }
          if (msg.role === "user") {
            return (
              <div key={msg.id} className="flex justify-end px-4">
                <div className="max-w-[75%] bg-[#F9FAFC] text-[#1e293b] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed">
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

      </div>

      {/* Suggestion chips — above composer */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out shrink-0 ${showChips ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col gap-2 px-4 py-3 items-center">
          {replies.slice(0, 2).map((r) => (
            <button
              key={r}
              onClick={() => handleReply(r)}
              className="py-3 px-4 rounded-2xl text-sm font-medium text-[#1e293b] bg-[#F9FAFC] border border-[#ECEDEF] active:scale-[0.98] transition-transform"
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white border-t border-[#e8e8e8] shrink-0">
        <div className="flex-1 flex items-center gap-2 bg-white border border-[#e8e8e8] rounded-full px-4 py-2.5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Escribe un mensaje..."
            className="flex-1 text-[16px] text-[#1e293b] placeholder:text-[#7c8086] bg-transparent outline-none"
          />
          <button aria-label="Cámara" className="text-[#999] shrink-0">
            <Camera size={18} />
          </button>
        </div>
        <button
          onClick={handleSend}
          aria-label={inputValue.trim() ? "Enviar" : "Nota de voz"}
          className="w-12 h-12 rounded-full bg-[#2207F1] flex items-center justify-center text-white shrink-0 transition-transform active:scale-95"
        >
          {inputValue.trim() ? <Send size={18} /> : <Mic size={18} />}
        </button>
      </div>

    </div>
  );
}
