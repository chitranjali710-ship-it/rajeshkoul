"use client";
import { openConsentNotice } from "@/lib/analytics";

/* Footer link that reopens the visitor-statistics notice so a choice can be changed or withdrawn. */
export function PrivacyChoicesButton() {
  return <button type="button" className="footer-privacy-choices" onClick={openConsentNotice}>Privacy choices</button>;
}
