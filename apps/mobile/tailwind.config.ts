import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
} satisfies Config;
