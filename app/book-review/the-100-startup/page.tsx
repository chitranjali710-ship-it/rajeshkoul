import { ReviewReader } from "@/components/review-reader";
import { reviewMeta } from "../books";
export const metadata = reviewMeta("the-100-startup");

export default function Page(){return <ReviewReader title="The $100 Startup" author="Chris Guillebeau" slug="the-100-startup" pages={16}/>}
