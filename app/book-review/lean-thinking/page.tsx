import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("lean-thinking");

export default function Page(){return <ReviewReader title="Lean Thinking" author="James P. Womack & Daniel T. Jones" slug="lean-thinking" pages={14}/>}
