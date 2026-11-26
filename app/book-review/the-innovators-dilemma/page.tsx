import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("the-innovators-dilemma");

export default function Page(){return <ReviewReader title="The Innovator’s Dilemma" author="Clayton M. Christensen" slug="the-innovators-dilemma" pages={14}/>}
