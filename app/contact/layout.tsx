import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Rajesh Koul | Start a Meaningful Conversation",
  description: "Connect with Rajesh Koul about The Lean Nervous System, enterprise transformation, leadership talks, educational engagements, and future publications.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
