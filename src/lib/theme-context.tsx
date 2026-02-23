"use client";

import { createContext, useContext, useState } from "react";
import { themes, type Theme } from "./themes";

interface ThemeContextValue {
  active: Theme;
  setActive: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  active: themes[0],
  setActive: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Theme>(themes[0]);
  return (
    <ThemeContext.Provider value={{ active, setActive }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
