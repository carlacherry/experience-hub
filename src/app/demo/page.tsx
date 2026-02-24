"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HomeScreen } from "@/components/demo/home-screen";
import { ChatScreen } from "@/components/demo/chat-screen";
import { SearchScreen } from "@/components/demo/search-screen";

export default function DemoPage() {
  const [view, setView] = useState<"home" | "search" | "chat">("home");
  const [chatEntry, setChatEntry] = useState<"foto" | "sugerido" | undefined>();

  function openChat(entry?: "foto" | "sugerido") {
    setChatEntry(entry);
    setView("chat");
  }

  return (
    <div className="h-screen bg-[#d8d8d8] flex items-center justify-center overflow-hidden">

      {/* Back to hub — desktop: floats in gray area; mobile: fixed top-left pill */}
      <Link
        href="/"
        className="hidden md:flex absolute left-6 top-6 items-center gap-1.5 text-sm font-medium text-[#333] bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full shadow hover:bg-white transition-colors"
      >
        <ArrowLeft size={14} />
        Hub
      </Link>
      <Link
        href="/"
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 text-sm font-medium text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full"
      >
        <ArrowLeft size={14} />
        Hub
      </Link>

      <div className="relative w-full h-[100dvh] md:w-[360px] md:h-[780px] md:rounded-[2.5rem] overflow-hidden md:shadow-2xl">

        {/* Home — slides out left when search or chat opens */}
        <div
          className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            view !== "home" ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <HomeScreen
            onOpenChat={() => openChat()}
            onOpenSearch={() => setView("search")}
          />
        </div>

        {/* Search — slides in from right, slides out right when going to chat */}
        <div
          className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            view === "search" ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <SearchScreen
            isActive={view === "search"}
            onBack={() => setView("home")}
            onOpenFoto={() => openChat("foto")}
            onOpenSugerido={() => openChat("sugerido")}
          />
        </div>

        {/* Chat — slides in from right */}
        <div
          className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            view === "chat" ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ChatScreen onBack={() => setView(chatEntry ? "search" : "home")} entry={chatEntry} />
        </div>

      </div>
    </div>
  );
}
