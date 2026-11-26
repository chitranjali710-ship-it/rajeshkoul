import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("lean-product-playbook");

export default function Page(){return <ReviewReader title="The Lean Product Playbook" author="Dan Olsen" slug="lean-product-playbook" pages={9}/>}
