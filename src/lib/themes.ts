export interface Theme {
  id: string;
  label: string;
  wrapperBg: string;
  tokens: Record<string, string>;
}

export const themes: Theme[] = [
  {
    id: "default",
    label: "Default",
    wrapperBg: "#ffffff",
    tokens: {},
  },
  {
    id: "dark",
    label: "Dark",
    wrapperBg: "#1c1c1e",
    tokens: {
      "--color-card-surface":              "#2c2c2e",
      "--color-text-primary":              "#f2f2f7",
      "--color-promo-bg":                  "#0d2d2a",
      "--color-promo-text":                "#34d399",
      "--color-promo-strikethrough":       "#059669",
      "--color-price-badge-bg":            "#2c2c2e",
      "--color-price-badge-text":          "#e5e5ea",
      "--color-price-badge-strikethrough": "#8e8e93",
      "--color-counter-bg":                "#3a3a3c",
      "--color-card-border":               "#3a3a3c",
      "--color-card-border-subtle":        "#48484a",
      "--color-suggestion-card-bg":        "#2c2c2e",
      "--color-suggestion-card-border":    "#3a3a3c",
      "--color-suggestion-chip":           "#1c3a5e",
      "--color-suggestion-chip-hover":     "#1e4a7a",
      "--color-text-muted":                "#8e8e93",
      "--color-card-divider":              "#3a3a3c",
    },
  },
  {
    id: "brand",
    label: "Brand",
    wrapperBg: "#fffaf5",
    tokens: {
      "--color-card-surface":              "#fffaf5",
      "--color-text-primary":              "#1c1917",
      "--color-promo-bg":                  "#fff3e0",
      "--color-promo-text":                "#b45309",
      "--color-promo-strikethrough":       "#d97706",
      "--color-price-badge-bg":            "#fef9f0",
      "--color-price-badge-text":          "#1c1917",
      "--color-price-badge-strikethrough": "#78716c",
      "--color-counter-bg":                "#fef3e2",
      "--color-card-border":               "#f5dfc0",
      "--color-card-border-subtle":        "#e8c99a",
      "--color-suggestion-card-bg":        "#fff7ed",
      "--color-suggestion-card-border":    "#fed7aa",
      "--color-suggestion-chip":           "#ffe4d6",
      "--color-suggestion-chip-hover":     "#ffcdb4",
      "--color-text-muted":                "#92400e",
      "--color-card-divider":              "#f5dfc0",
    },
  },
];
