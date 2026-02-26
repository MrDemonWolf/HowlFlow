import { Pressable, Text } from "react-native";
import { tapFeedback } from "@/lib/haptics";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  accessibilityLabel: string;
};

const variantStyles = {
  primary: "bg-hunt-orange",
  secondary: "border border-wolf-blue",
  ghost: "bg-transparent",
} as const;

const variantTextStyles = {
  primary: "text-white",
  secondary: "text-wolf-blue",
  ghost: "text-text-secondary",
} as const;

const sizeStyles = {
  sm: "px-3 py-1.5",
  md: "px-5 py-3",
  lg: "px-6 py-4",
} as const;

const sizeTextStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  size = "md",
  className = "",
  accessibilityLabel,
}: ButtonProps) {
  const handlePress = () => {
    tapFeedback();
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      className={`rounded-xl items-center justify-center ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? "opacity-50" : ""} ${className}`}
    >
      <Text
        className={`font-semibold ${variantTextStyles[variant]} ${sizeTextStyles[size]}`}
        style={{ fontFamily: "Montserrat_600SemiBold" }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
