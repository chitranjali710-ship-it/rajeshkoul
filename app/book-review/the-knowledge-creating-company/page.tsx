import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("the-knowledge-creating-company");

export default function Page(){return <ReviewReader title="The Knowledge-Creating Company" author="Ikujiro Nonaka & Hirotaka Takeuchi" slug="the-knowledge-creating-company" pages={14}/>}
