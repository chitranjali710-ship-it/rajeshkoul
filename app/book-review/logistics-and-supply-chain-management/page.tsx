import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("logistics-and-supply-chain-management");

export default function Page(){return <ReviewReader title="Logistics & Supply Chain Management" author="Martin Christopher" slug="logistics-and-supply-chain-management" pages={14}/>}
