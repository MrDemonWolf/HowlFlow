import { View } from "react-native";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <View
      className={`rounded-lg bg-bg-glass p-md overflow-hidden ${className ?? ""}`}
    >
      {children}
    </View>
  );
}
