import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("reinventing-strategy");

export default function Page(){return <ReviewReader title="Reinventing Strategy" author="Willie Pietersen" slug="reinventing-strategy" pages={3}/>}
