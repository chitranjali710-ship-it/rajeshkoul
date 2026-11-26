import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("balanced-sourcing");

export default function Page(){return <ReviewReader title="Balanced Sourcing" author="Tim Laseter" slug="balanced-sourcing" pages={14}/>}
