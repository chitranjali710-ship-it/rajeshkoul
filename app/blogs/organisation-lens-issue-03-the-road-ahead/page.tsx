import type { Metadata } from "next";
import { getNewsletter, NewsletterArticle } from "../_components/newsletter-article";

const newsletter = getNewsletter("organisation-lens-issue-03-the-road-ahead");

export const metadata: Metadata = {
  title: `${newsletter.cardTitle} | The Organisation Lens`,
  description: newsletter.excerpt,
};

export default function Page() {
  return <NewsletterArticle newsletter={newsletter} />;
}
