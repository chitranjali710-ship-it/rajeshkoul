import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("the-fifth-discipline");

export default function Page(){return <ReviewReader title="The Fifth Discipline" author="Peter M. Senge" slug="the-fifth-discipline" pages={14}/>}
