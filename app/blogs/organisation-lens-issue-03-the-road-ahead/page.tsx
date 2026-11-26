import { getNewsletter, NewsletterArticle } from "../_components/newsletter-article";
import { pageMeta } from "@/lib/seo";

const newsletter = getNewsletter("organisation-lens-issue-03-the-road-ahead");

export const metadata = pageMeta({
  title: `${newsletter.cardTitle} | The Organisation Lens`,
  description: newsletter.excerpt,
  path: "/blogs/organisation-lens-issue-03-the-road-ahead",
  image: newsletter.image,
  type: "article",
});

export default function Page() {
  return <NewsletterArticle newsletter={newsletter} />;
}
