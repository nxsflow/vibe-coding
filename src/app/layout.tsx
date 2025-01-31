import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fynall",
  description: "Nurture your relationships – Achieve your goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
