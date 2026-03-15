import { Text } from "react-native";
import type { ReactNode } from "react";

type TextVariant = "h1" | "h2" | "body" | "caption";

interface HFTextProps {
  children: ReactNode;
  variant: TextVariant;
  className?: string;
}

const variantClasses: Record<TextVariant, string> = {
  h1: "text-2xl font-bold text-text-primary",
  h2: "text-xl font-semibold text-text-primary",
  body: "text-base text-text-primary",
  caption: "text-sm text-text-secondary",
};

export function HFText({ children, variant, className }: HFTextProps) {
  return (
    <Text className={`${variantClasses[variant]} ${className ?? ""}`}>
      {children}
    </Text>
  );
}
