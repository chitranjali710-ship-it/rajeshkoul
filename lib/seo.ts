import type { Metadata } from "next";

/**
 * Site-wide search and sharing settings.
 * SITE_URL is the live address of the site. Change it here (or set
 * NEXT_PUBLIC_SITE_URL when building) if the domain ever changes.
 */
const envSiteUrl = typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_SITE_URL : undefined;
export const SITE_URL = (envSiteUrl || "https://rajeshkoul.com").replace(/\/+$/, "");
export const SITE_NAME = "Rajesh Koul";
export const DEFAULT_SHARE_IMAGE = "/og/rajesh-koul.jpg";
export const BOOK_SHARE_IMAGE = "/og/lean-nervous-system.jpg";

export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/in/rajeshkoul74/",
  "https://www.youtube.com/@author.rajeshkoul",
  "https://www.instagram.com/author.rajeshkoul/",
  "https://x.com/rkoulfms",
];

/** The site uses trailing slashes, so canonical links do too. */
export function absoluteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = clean.endsWith("/") || clean.includes(".") ? clean : `${clean}/`;
  return `${SITE_URL}${withSlash}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "book" | "profile";
};

/** Title, description, canonical link and share preview for one page. */
export function pageMeta({ title, description, path, image = DEFAULT_SHARE_IMAGE, imageAlt, type = "website" }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const isDefaultImage = image === DEFAULT_SHARE_IMAGE || image === BOOK_SHARE_IMAGE;
  const images = [
    isDefaultImage
      ? { url: image, width: 1200, height: 630, alt: imageAlt ?? title }
      : { url: image, alt: imageAlt ?? title },
  ];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: type === "book" || type === "profile" ? "website" : type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/* ---------- structured data (what Google reads about people, books and articles) ---------- */

export const personJsonLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#rajesh-koul`,
  name: "Rajesh Koul",
  url: absoluteUrl("/about"),
  image: `${SITE_URL}/art/lns-author-portrait.webp`,
  jobTitle: "Transformation Leader, Author & Advisor",
  description:
    "Rajesh Koul helps leaders build adaptive, resilient and high-performing organisations through Lean, digital transformation and systems thinking.",
  sameAs: SOCIAL_PROFILES,
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: absoluteUrl("/"),
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#rajesh-koul` },
};

export const bookJsonLd = {
  "@type": "Book",
  "@id": `${SITE_URL}/#the-lean-nervous-system`,
  name: "The Lean Nervous System",
  alternateName: "The Lean Nervous System: Building Mature, Resilient, and World-Class Organizations",
  author: { "@id": `${SITE_URL}/#rajesh-koul` },
  url: absoluteUrl("/lean-nervous-system"),
  image: `${SITE_URL}${BOOK_SHARE_IMAGE}`,
  description:
    "A practical guide to optimising enterprise health: diagnose organisational maturity across 10 domains and build mature, resilient, world-class organisations.",
  isbn: "9789372542257",
  inLanguage: "en",
  publisher: { "@type": "Organization", name: "BooksClinic Publishing" },
  sameAs: ["https://www.amazon.in/dp/9372542253"],
};

export function articleJsonLd({ title, description, path, image }: { title: string; description: string; path: string; image?: string }) {
  return {
    "@type": "BlogPosting",
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}${DEFAULT_SHARE_IMAGE}`,
    author: { "@id": `${SITE_URL}/#rajesh-koul`, "@type": "Person", name: "Rajesh Koul" },
    publisher: { "@id": `${SITE_URL}/#rajesh-koul` },
    inLanguage: "en",
  };
}

export function jsonLdGraph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
