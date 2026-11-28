"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Search, X } from "lucide-react";
import { CountryFlag, type FlagCode } from "@/components/country-flags";
import "./lns-global-stores.css";

/*
 * Amazon stores that sell The Lean Nervous System, plus the country picker
 * dialog used by the purchase section (components/lns-purchase.tsx).
 */

export type Region = "Asia-Pacific" | "Europe" | "Americas" | "Middle East & Africa";
export type Store = { code: FlagCode; country: string; short: string; domain: string; url: string; region: Region };

const ASIN = "9372542253";
const store = (code: FlagCode, country: string, short: string, domain: string, region: Region): Store =>
  ({ code, country, short, domain, url: `https://www.${domain}/dp/${ASIN}`, region });

/* India is the home store and always the default selection. */
export const STORES: Store[] = [
  store("IN", "India", "India", "amazon.in", "Asia-Pacific"),
  store("US", "United States", "USA", "amazon.com", "Americas"),
  store("GB", "United Kingdom", "UK", "amazon.co.uk", "Europe"),
  store("CA", "Canada", "Canada", "amazon.ca", "Americas"),
  store("AU", "Australia", "Australia", "amazon.com.au", "Asia-Pacific"),
  store("DE", "Germany", "Germany", "amazon.de", "Europe"),
  store("FR", "France", "France", "amazon.fr", "Europe"),
  store("IT", "Italy", "Italy", "amazon.it", "Europe"),
  store("ES", "Spain", "Spain", "amazon.es", "Europe"),
  store("NL", "Netherlands", "Netherlands", "amazon.nl", "Europe"),
  store("SE", "Sweden", "Sweden", "amazon.se", "Europe"),
  store("PL", "Poland", "Poland", "amazon.pl", "Europe"),
  store("BE", "Belgium", "Belgium", "amazon.com.be", "Europe"),
  store("IE", "Ireland", "Ireland", "amazon.ie", "Europe"),
  store("JP", "Japan", "Japan", "amazon.co.jp", "Asia-Pacific"),
  store("SG", "Singapore", "Singapore", "amazon.sg", "Asia-Pacific"),
  store("AE", "UAE", "UAE", "amazon.ae", "Middle East & Africa"),
  store("SA", "Saudi Arabia", "Saudi Arabia", "amazon.sa", "Middle East & Africa"),
  store("BR", "Brazil", "Brazil", "amazon.com.br", "Americas"),
  store("MX", "Mexico", "Mexico", "amazon.com.mx", "Americas"),
  store("TR", "Turkey", "Turkey", "amazon.com.tr", "Europe"),
  store("EG", "Egypt", "Egypt", "amazon.eg", "Middle East & Africa"),
  store("ZA", "South Africa", "South Africa", "amazon.co.za", "Middle East & Africa"),
];

export const HOME_STORE = STORES[0];
const REGIONS: Region[] = ["Asia-Pacific", "Europe", "Americas", "Middle East & Africa"];

type StoreDialogProps = {
  open: boolean;
  selected: Store;
  onChoose: (store: Store) => void;
  onClose: () => void;
};

export function StoreDialog({ open, selected, onChoose, onClose }: StoreDialogProps) {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) { setQuery(""); return; }
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const focusTimer = window.setTimeout(() => {
      if (finePointer) searchRef.current?.focus();
      else dialogRef.current?.focus();
    }, 40);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button, input");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return STORES;
    return STORES.filter(s =>
      s.country.toLowerCase().includes(term) || s.short.toLowerCase().includes(term) || s.domain.includes(term));
  }, [query]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className="lns-store-dialog-layer" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="lns-store-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={dialogRef} tabIndex={-1}>
        <span className="lns-store-dialog-grip" aria-hidden="true" />
        <header className="lns-store-dialog-header">
          <div>
            <h3 id={titleId}>Where are you buying from?</h3>
            <p>The book is sold on {STORES.length} Amazon stores. Pick yours to open the right one.</p>
          </div>
          <button type="button" className="lns-store-dialog-close" onClick={onClose} aria-label="Close country list"><X aria-hidden="true" /></button>
        </header>

        <label className="lns-store-search">
          <Search aria-hidden="true" />
          <span className="sr-only">Search countries</span>
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search a country"
            autoComplete="off"
            enterKeyHint="search"
          />
        </label>

        <div className="lns-store-dialog-body">
          {REGIONS.map(region => {
            const items = filtered.filter(s => s.region === region);
            if (!items.length) return null;
            return <section className="lns-store-region" key={region} aria-label={region}>
              <p className="lns-store-region-title">{region}</p>
              <div className="lns-store-grid">
                {items.map(s => <button
                  type="button"
                  key={s.code}
                  className={`lns-store-option${selected.code === s.code ? " is-active" : ""}`}
                  onClick={() => onChoose(s)}
                  aria-pressed={selected.code === s.code}
                >
                  <CountryFlag code={s.code} />
                  <span className="lns-store-option-text">
                    <strong>{s.country}</strong>
                    <small>{s.domain}</small>
                  </span>
                  {selected.code === s.code ? <Check aria-hidden="true" className="lns-store-option-check" /> : null}
                </button>)}
              </div>
            </section>;
          })}

          {!filtered.length && <p className="lns-store-empty">No match for “{query}”. Try the country’s name in English, such as “Germany” or “Japan”.</p>}
        </div>
      </div>
    </div>,
    // inside the "Get your copy" pop-up, open on top of it rather than behind it
    (document.querySelector("dialog[open]") as HTMLElement | null) ?? document.body,
  );
}
