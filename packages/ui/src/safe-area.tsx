import { SafeAreaView } from "react-native-safe-area-context";
import type { ReactNode } from "react";

interface SafeAreaProps {
  children: ReactNode;
  className?: string;
}

export function SafeArea({ children, className }: SafeAreaProps) {
  return (
    <SafeAreaView className={`flex-1 bg-bg-primary ${className ?? ""}`}>
      {children}
    </SafeAreaView>
  );
}
