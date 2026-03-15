export const colors = {
  bg: {
    primary: "#0A0E1A",
    secondary: "#111827",
    tertiary: "#1F2937",
    glass: "rgba(17,24,39,0.8)",
  },
  text: {
    primary: "#F9FAFB",
    secondary: "#9CA3AF",
    muted: "#6B7280",
  },
  accent: {
    cyan: "#00D4FF",
    gold: "#FFB800",
    green: "#10B981",
    red: "#EF4444",
    purple: "#8B5CF6",
  },
} as const;

export const fonts = {
  sans: "Outfit",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const theme = {
  colors,
  fonts,
  spacing,
  radii,
} as const;
