import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("toyota-way");

export default function Page(){return <ReviewReader title="The Toyota Way" author="Jeffrey K. Liker" slug="toyota-way" pages={5}/>}
