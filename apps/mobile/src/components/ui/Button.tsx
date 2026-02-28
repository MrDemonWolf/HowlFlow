import { Text, TouchableOpacity, type TouchableOpacityProps } from "react-native";
import { clsx } from "clsx";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  title,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const bgClass = {
    primary: "bg-wolf-blue",
    secondary: "bg-bg-card",
    danger: "bg-wolf-red",
  }[variant];

  const textClass = {
    primary: "text-bg-base font-bold",
    secondary: "text-text-secondary font-medium",
    danger: "text-white font-bold",
  }[variant];

  const sizeClass = {
    sm: "px-3 py-1.5",
    md: "px-4 py-2.5",
    lg: "px-6 py-3",
  }[size];

  const textSizeClass = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }[size];

  return (
    <TouchableOpacity
      className={clsx("items-center rounded-xl", bgClass, sizeClass, className)}
      accessibilityRole="button"
      {...props}
    >
      <Text className={clsx(textSizeClass, textClass)}>{title}</Text>
    </TouchableOpacity>
  );
}
