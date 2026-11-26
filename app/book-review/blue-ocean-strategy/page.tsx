import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("blue-ocean-strategy");

export default function Page(){return <ReviewReader title="Blue Ocean Strategy" author="W. Chan Kim & Renée Mauborgne" slug="blue-ocean-strategy" pages={14}/>}
