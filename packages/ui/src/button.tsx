import { Pressable, Text } from "react-native";
import * as Haptics from "expo-haptics";

type ButtonVariant = "primary" | "secondary" | "gold";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant: ButtonVariant;
  disabled?: boolean;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent-cyan text-bg-primary",
  secondary: "bg-bg-tertiary text-text-primary",
  gold: "bg-accent-gold text-bg-primary",
};

const textVariantClasses: Record<ButtonVariant, string> = {
  primary: "text-bg-primary",
  secondary: "text-text-primary",
  gold: "text-bg-primary",
};

export function Button({
  title,
  onPress,
  variant,
  disabled,
  className,
}: ButtonProps) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={`items-center justify-center rounded-md px-lg py-sm ${variantClasses[variant]} ${disabled ? "opacity-50" : ""} ${className ?? ""}`}
    >
      <Text className={`font-semibold ${textVariantClasses[variant]}`}>
        {title}
      </Text>
    </Pressable>
  );
}
