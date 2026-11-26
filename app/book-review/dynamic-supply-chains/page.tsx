import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("dynamic-supply-chains");

export default function Page(){return <ReviewReader title="Dynamic Supply Chains" author="John Gattorna" slug="dynamic-supply-chains" pages={14}/>}
