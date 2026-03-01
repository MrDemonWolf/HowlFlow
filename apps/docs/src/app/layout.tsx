import "./global.css";
import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider";

export const metadata: Metadata = {
  title: "HowlFlow — Your ADHD Companion",
  description:
    "Structured like a pack, built for your brain. An iOS app for teens with ADHD.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
