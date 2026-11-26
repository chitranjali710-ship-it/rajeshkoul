import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("the-resilient-enterprise");

export default function Page(){return <ReviewReader title="The Resilient Enterprise" author="Yossi Sheffi" slug="the-resilient-enterprise" pages={14}/>}
