import { permanentRedirect } from "next/navigation";

/* This page moved to /leadership-learning-growth/ — old links land there. */
export default function Page() {
  permanentRedirect("/leadership-learning-growth/");
}
