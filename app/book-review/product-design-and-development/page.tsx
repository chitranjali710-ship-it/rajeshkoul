import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("product-design-and-development");

export default function Page(){return <ReviewReader title="Product Design and Development" author="Karl T. Ulrich & Steven D. Eppinger" slug="product-design-and-development" pages={14}/>}
