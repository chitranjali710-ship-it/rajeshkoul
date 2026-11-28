"use client";

import { useEffect, useRef, useState } from "react";
import { OPEN_CONSENT_EVENT, loadAnalytics, readConsent, saveConsent } from "@/lib/analytics";
import "./consent-notice.css";

/*
 * Small cookie/consent card for visitor statistics (DPDP Act, 2023 and DPDP Rules, 2025):
 *  - nothing is counted until the visitor clicks "Accept"
 *  - "Accept" and "Decline" sit side by side and are equally easy to choose
 *  - the full details live in the Privacy Policy; the choice can be changed any time
 *    from "Privacy choices" in the footer
 */
export function ConsentNotice() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<boolean | null>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = readConsent();
    if (saved) {
      setCurrent(saved.analytics);
      if (saved.analytics) loadAnalytics();
    } else {
      setOpen(true);
    }
    const reopen = () => { setCurrent(readConsent()?.analytics ?? null); setOpen(true); };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // When reopened from "Privacy choices", move focus into the card
  useEffect(() => { if (open && current !== null) firstButtonRef.current?.focus(); }, [open, current]);

  const choose = (allow: boolean) => {
    const wasAllowed = current === true;
    saveConsent(allow);
    setCurrent(allow);
    setOpen(false);
    if (allow) loadAnalytics();
    // Withdrawing: reload so the statistics script is no longer running on this page.
    else if (wasAllowed) window.location.reload();
  };

  if (!open) return null;

  return <section className="consent-notice" role="region" aria-label="Cookie preferences">
    <p>
      🍪 This site uses cookie-free analytics to see which pages are helpful.{" "}
      <a href="/privacy-policy#visitor-statistics">Learn more</a>
      {current !== null && <span className="consent-current"> Currently: {current ? "accepted" : "declined"}.</span>}
    </p>
    <div className="consent-actions">
      <button type="button" ref={firstButtonRef} className="consent-decline" onClick={() => choose(false)}>Decline</button>
      <button type="button" className="consent-accept" onClick={() => choose(true)}>Accept</button>
    </div>
  </section>;
}
