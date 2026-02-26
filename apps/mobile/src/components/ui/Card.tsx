import { View } from "react-native";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <View
      className={`bg-bg-card rounded-2xl p-4 border border-text-dim/15 ${className}`}
    >
      {children}
    </View>
  );
}
