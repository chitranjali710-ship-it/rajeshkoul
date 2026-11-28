"use client";

import { useEffect, useRef, useState } from "react";
import { OPEN_CONSENT_EVENT, loadAnalytics, readConsent, saveConsent } from "@/lib/analytics";
import "./consent-notice.css";

/*
 * Consent notice for visitor statistics (DPDP Act, 2023 and DPDP Rules, 2025):
 *  - nothing is counted until the visitor clicks "Allow" (no pre-ticked or implied consent)
 *  - "Allow" and "Don't allow" are equally easy to choose
 *  - the notice says what is collected, why, and how to change the choice
 *  - the choice can be changed or withdrawn at any time from "Privacy choices" in the footer
 */
export function ConsentNotice() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<boolean | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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

  useEffect(() => { if (open && current !== null) headingRef.current?.focus(); }, [open, current]);

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

  return <section className="consent-notice" role="region" aria-labelledby="rk-consent-heading">
    <div className="consent-inner">
      <div className="consent-copy">
        <h2 id="rk-consent-heading" ref={headingRef} tabIndex={-1}>Visitor statistics</h2>
        <p>With your permission, I’d like to count visits to this website with Cloudflare Web Analytics, to see which pages are read and how people find them. It records the page, the referring site, your browser and device type, and your country. It sets <strong>no cookies</strong>, isn’t used to identify you, and is never used for advertising.</p>
        <p className="consent-small">
          {current === null
            ? <>Nothing is counted unless you choose “Allow”. </>
            : <>Your current choice: <strong>{current ? "allowed" : "not allowed"}</strong>. </>}
          You can change this at any time from “Privacy choices” at the bottom of every page. <a href="/privacy-policy#visitor-statistics">How your data is handled</a>
        </p>
      </div>
      <div className="consent-actions">
        <button type="button" onClick={() => choose(true)}>Allow</button>
        <button type="button" onClick={() => choose(false)}>Don’t allow</button>
      </div>
    </div>
  </section>;
}
