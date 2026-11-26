import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "All Articles | Rajesh Koul",
  description: "Every article and newsletter issue by Rajesh Koul on lean systems, digital transformation, leadership, and sustainable enterprise growth.",
  path: "/blogs/all",
});

export default function AllBlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
