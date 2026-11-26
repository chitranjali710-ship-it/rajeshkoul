import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("the-principles-of-product-development-flow");

export default function Page(){return <ReviewReader title="The Principles of Product Development Flow" author="Donald G. Reinertsen" slug="the-principles-of-product-development-flow" pages={14}/>}
