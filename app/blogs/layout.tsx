import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Thought Perspectives on Transformation | Rajesh Koul",
  description: "Practical ideas, frameworks and real-world insights on leadership, organisational excellence, operational performance and sustainable growth.",
  path: "/blogs",
});

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
