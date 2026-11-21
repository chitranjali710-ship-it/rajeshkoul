import type { Metadata } from "next";
import "./globals.css";
import "./mobile-polish.css";
import "./mobile-refine.css";
import "./site-polish.css";
import { MobileReadMore } from "@/components/mobile-read-more";

export const metadata: Metadata = {
  title: "Rajesh Koul | Transformation Leader, Author & Advisor",
  description: "Rajesh Koul helps leaders build adaptive, resilient and high-performing organisations through Lean, digital transformation and systems thinking.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <MobileReadMore />
      </body>
    </html>
  );
}
