import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("start-with-why");

export default function Page(){return <ReviewReader title="Start with Why" author="Simon Sinek" slug="start-with-why" pages={14}/>}
