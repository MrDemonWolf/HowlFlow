import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "HowlFlow — ADHD Daily Companion",
  description:
    "Your wolf-themed ADHD daily companion. Block your time, focus your hunt, dump your thoughts, celebrate your wins.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-wolf-deep text-text-primary">{children}</body>
    </html>
  );
}
