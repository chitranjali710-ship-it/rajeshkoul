import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("learning-in-action");

export default function Page(){return <ReviewReader title="Learning in Action" author="David A. Garvin" slug="learning-in-action" pages={14}/>}
