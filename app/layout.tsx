import type { Metadata } from "next";
import "./globals.css";
import "./mobile-polish.css";
import "./mobile-refine.css";
import "./site-polish.css";
import { MobileReadMore } from "@/components/mobile-read-more";
import { JsonLd } from "@/components/json-ld";
import { ConsentNotice } from "@/components/consent-notice";
import { SkipLink } from "@/components/skip-link";
import { DEFAULT_SHARE_IMAGE, SITE_NAME, SITE_URL, jsonLdGraph, personJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Rajesh Koul | Transformation Leader, Author & Advisor",
  description: "Rajesh Koul helps leaders build adaptive, resilient and high-performing organisations through Lean, digital transformation and systems thinking.",
  applicationName: SITE_NAME,
  authors: [{ name: "Rajesh Koul", url: SITE_URL }],
  creator: "Rajesh Koul",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [{ url: DEFAULT_SHARE_IMAGE, width: 1200, height: 630, alt: "Rajesh Koul, Transformation Leader, Author & Advisor" }],
  },
  twitter: { card: "summary_large_image", creator: "@rkoulfms", images: [DEFAULT_SHARE_IMAGE] },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className="antialiased">
        <SkipLink />
        <JsonLd data={jsonLdGraph(personJsonLd, websiteJsonLd)} />
        {children}
        <MobileReadMore />
        <ConsentNotice />
      </body>
    </html>
  );
}
