import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("purchasing-and-supply-chain-management");

export default function Page(){return <ReviewReader title="Purchasing and Supply Chain Management" author="Monczka et al." slug="purchasing-and-supply-chain-management" pages={14}/>}
