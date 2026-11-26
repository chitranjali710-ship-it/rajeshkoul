import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Blogs | Rajesh Koul",
  description: "Ideas and perspectives on lean systems, digital transformation, leadership, and sustainable enterprise growth.",
  path: "/blogs",
});

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
