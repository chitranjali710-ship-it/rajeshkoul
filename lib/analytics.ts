/*
 * Visitor statistics — Cloudflare Web Analytics (cookie-free).
 *
 * The script only loads AFTER a visitor clicks "Allow" in the consent notice
 * (components/consent-notice.tsx), as India's DPDP Act requires.
 *
 * To switch it on:
 *   1. Cloudflare dashboard → Analytics & Logs → Web Analytics → Add a site → rajeshkoul.com
 *   2. Choose the manual "JS snippet" option (NOT automatic setup — automatic setup
 *      would load the script for everyone, before they have agreed).
 *   3. Copy the token from the snippet, e.g. {"token": "abc123..."}, and paste it below.
 */
export const CF_ANALYTICS_TOKEN = "";

export const CONSENT_KEY = "rk-consent";
export const CONSENT_VERSION = 1;
export const OPEN_CONSENT_EVENT = "rk:open-consent";

export type ConsentRecord = { analytics: boolean; at: string; v: number };

export function readConsent(): ConsentRecord | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    return parsed.v === CONSENT_VERSION ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean) {
  const record: ConsentRecord = { analytics, at: new Date().toISOString(), v: CONSENT_VERSION };
  try { window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record)); } catch { /* storage blocked: choice lasts this visit only */ }
  return record;
}

export function loadAnalytics() {
  if (!CF_ANALYTICS_TOKEN || document.getElementById("cf-web-analytics")) return;
  const script = document.createElement("script");
  script.id = "cf-web-analytics";
  script.defer = true;
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.setAttribute("data-cf-beacon", JSON.stringify({ token: CF_ANALYTICS_TOKEN }));
  document.body.appendChild(script);
}

/* Opens the consent notice again, e.g. from the footer's "Privacy choices" link. */
export function openConsentNotice() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
