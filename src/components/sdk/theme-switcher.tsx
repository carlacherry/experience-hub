"use client";

import { useTheme } from "@/lib/theme-context";

export function ThemeSwitcher({ children }: { children: React.ReactNode }) {
  const { active } = useTheme();

  return (
    <div
      style={{ backgroundColor: active.wrapperBg, ...active.tokens } as React.CSSProperties}
      className="rounded-2xl p-4 transition-colors duration-200"
    >
      {children}
    </div>
  );
}
