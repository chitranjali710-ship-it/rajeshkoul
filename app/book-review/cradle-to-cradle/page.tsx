import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("cradle-to-cradle");

export default function Page(){return <ReviewReader title="Cradle to Cradle" author="William McDonough & Michael Braungart" slug="cradle-to-cradle" pages={14}/>}
