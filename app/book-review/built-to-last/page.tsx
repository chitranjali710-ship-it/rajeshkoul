import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("built-to-last");

export default function Page(){return <ReviewReader title="Built to Last" author="Jim Collins & Jerry I. Porras" slug="built-to-last" pages={14}/>}
