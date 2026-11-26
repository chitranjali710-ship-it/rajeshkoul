import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("the-design-of-everyday-things");

export default function Page(){return <ReviewReader title="The Design of Everyday Things" author="Donald Norman" slug="the-design-of-everyday-things" pages={14}/>}
