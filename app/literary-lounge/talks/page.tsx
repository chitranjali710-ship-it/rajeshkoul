import { permanentRedirect } from "next/navigation";

/* This page moved to /industry-campus-dialogues/ — old links land there. */
export default function Page() {
  permanentRedirect("/industry-campus-dialogues/");
}
