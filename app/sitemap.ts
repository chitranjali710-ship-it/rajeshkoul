import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { books } from "./book-review/books";
import articles from "./blogs/_data/additional-articles.json";
import newsletters from "./blogs/_data/newsletters.json";

/** Every public page, so search engines can find them all. */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  });

  const main = [
    page("/lean-nervous-system", 1, "weekly"),
    page("/home", 0.9, "weekly"),
    page("/about", 0.8),
    page("/blogs", 0.8, "weekly"),
    page("/blogs/all", 0.6, "weekly"),
    page("/book-review", 0.7),
    page("/exchanging-ideas-perspectives", 0.6),
    page("/industry-campus-dialogues", 0.6),
    page("/leadership-learning-growth", 0.6),
    page("/literary-lounge/books", 0.4),
    page("/literary-lounge/podcast", 0.4),
    page("/contact", 0.7, "yearly"),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms-of-use", 0.2, "yearly"),
  ];

  const customArticles = [
    "/blogs/from-execution-engines-to-enterprise-intelligence",
    "/blogs/project-management-and-innovation-a-synthesis-for-success",
  ].map((path) => page(path, 0.7));

  const standardArticles = (articles as { slug: string }[]).map((a) => page(`/blogs/${a.slug}`, 0.7));
  const newsletterIssues = (newsletters as { slug: string }[]).map((n) => page(`/blogs/${n.slug}`, 0.7));
  const reviews = books.map((b) => page(b.href, 0.5));

  const seen = new Set<string>();
  return [...main, ...customArticles, ...standardArticles, ...newsletterIssues, ...reviews].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
