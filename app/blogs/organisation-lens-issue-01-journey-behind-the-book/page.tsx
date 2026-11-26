import { getNewsletter, NewsletterArticle } from "../_components/newsletter-article";
import { pageMeta } from "@/lib/seo";

const newsletter = getNewsletter("organisation-lens-issue-01-journey-behind-the-book");

export const metadata = pageMeta({
  title: `${newsletter.cardTitle} | The Organisation Lens`,
  description: newsletter.excerpt,
  path: "/blogs/organisation-lens-issue-01-journey-behind-the-book",
  image: newsletter.image,
  type: "article",
});

export default function Page() {
  return <NewsletterArticle newsletter={newsletter} />;
}
