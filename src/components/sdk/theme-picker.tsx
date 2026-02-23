"use client";

import { themes } from "@/lib/themes";
import { useTheme } from "@/lib/theme-context";

export function ThemePicker() {
  const { active, setActive } = useTheme();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 z-50 flex gap-1 bg-white border border-[#e5e5e5] rounded-full shadow-lg px-2 py-1.5">
      {themes.map((theme) => {
        const isActive = theme.id === active.id;
        return (
          <button
            key={theme.id}
            onClick={() => setActive(theme)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "bg-black text-white"
                : "text-[#333] hover:bg-[#f3f3f3]"
            }`}
          >
            {theme.label}
          </button>
        );
      })}
    </div>
  );
}
