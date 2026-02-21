"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./sidebar";

export function SdkLayoutClient({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 z-50 h-screen transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <Sidebar onClose={() => setOpen(false)} />
      </div>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-[#e5e5e5] sticky top-0 bg-white z-30">
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="text-black"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-medium text-black">SDK Components</span>
        </div>
        {children}
      </main>
    </div>
  );
}
