"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, SunMoon } from "lucide-react";
import { sdkNav, chatShellNav, overviewNav } from "@/lib/sdk-nav";
import { themes } from "@/lib/themes";
import { useTheme } from "@/lib/theme-context";

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { active, setActive } = useTheme();
  const [themeOpen, setThemeOpen] = useState(false);

  return (
    <aside className="w-60 shrink-0 border-r border-[#e5e5e5] min-h-screen bg-white sticky top-0 overflow-y-auto">
      <div className="px-5 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xs text-[#989898] hover:text-black transition-colors">
            ← Home
          </Link>
          {onClose && (
            <button onClick={onClose} aria-label="Close menu" className="md:hidden text-[#989898] hover:text-black">
              <X size={16} />
            </button>
          )}
        </div>
        <p className="text-xs font-semibold text-[#989898] uppercase tracking-widest mt-6 mb-3">
          Overview
        </p>
        <nav className="flex flex-col gap-0.5 mb-6">
          {overviewNav.map(({ slug, name }) => {
            const isActive = pathname === `/sdk/${slug}`;
            return (
              <Link
                key={slug}
                href={`/sdk/${slug}`}
                className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-black text-white font-medium"
                    : "text-[#333] hover:bg-[#f3f3f3]"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        <p className="text-xs font-semibold text-[#989898] uppercase tracking-widest mb-3">
          Chat Shell
        </p>
        <nav className="flex flex-col gap-0.5 mb-6">
          {chatShellNav.map(({ slug, name }) => {
            const isActive = pathname === `/sdk/${slug}`;
            return (
              <Link
                key={slug}
                href={`/sdk/${slug}`}
                className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-black text-white font-medium"
                    : "text-[#333] hover:bg-[#f3f3f3]"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        <p className="text-xs font-semibold text-[#989898] uppercase tracking-widest mb-3">
          Components
        </p>
        <nav className="flex flex-col gap-0.5">
          {sdkNav.map(({ slug, name }) => {
            const isActive = pathname === `/sdk/${slug}`;
            return (
              <Link
                key={slug}
                href={`/sdk/${slug}`}
                className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-black text-white font-medium"
                    : "text-[#333] hover:bg-[#f3f3f3]"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Theme picker */}
      <div className="px-5 py-4 border-t border-[#e5e5e5]">
        <button
          onClick={() => setThemeOpen((o) => !o)}
          className="flex items-center gap-2 text-[#989898] hover:text-black transition-colors"
          aria-label="Toggle theme picker"
        >
          <SunMoon size={16} />
          <span className="text-xs text-[#989898]">{active.label}</span>
        </button>
        {themeOpen && (
          <div className="flex flex-col gap-0.5 mt-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => { setActive(theme); setThemeOpen(false); }}
                className={`text-sm px-3 py-1.5 rounded-lg text-left transition-colors ${
                  theme.id === active.id
                    ? "bg-black text-white font-medium"
                    : "text-[#333] hover:bg-[#f3f3f3]"
                }`}
              >
                {theme.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
