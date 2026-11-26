import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Book Reviews | Rajesh Koul",
  description: "A curated collection of books that have influenced my thinking on Lean, Strategy, Transformation, Leadership, Innovation, and Business, with my review of each.",
  path: "/book-review",
});

export default function BookReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
