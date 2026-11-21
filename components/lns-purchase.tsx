"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, BookOpen, ChevronDown } from "lucide-react";
import { CountryFlag, type FlagCode } from "@/components/country-flags";
import { HOME_STORE, STORES, StoreDialog, type Store } from "@/components/lns-global-stores";
import "./lns-purchase.css";

const AMAZON_INDIA_URL = "https://amzn.in/d/0iodZYXL";
const FLIPKART_URL = "/contact";
const KINDLE_INDIA_URL = "https://www.amazon.in/Lean-Nervous-System-Organization-Organizational-ebook/dp/B0HQT2M368/ref=tmm_kin_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.9uOkhURb7l7107Ii2dYwJIL-lE-N8AIqrL6Op060f1h3ECs8sfl2o_ROtXThIGQwgiG4W7xn6WwAwQBFQpgJhZHk4h82OoGSthCUxdUh_7KqToMIJtHIZ2Qg1W4bnkvwZQb73pvOns6ijSu11HVp6qc6AAtKHM2HxLyBLPSU2UccAxaCEynVR057StPQ9uCdHJzP4cSUUAMq15dp3vy98M41htMTalaWFufEhoKZxvY.rraHwxwUQQYWgE8iywVh-NrWMjfE6NNs9xY25opXEUA&qid=1795090746&sr=8-1";

/* Each photo has its own backdrop; tall shots are fitted inside the frame instead of cropped. */
const PHOTOS = [
  { src: "/art/lns-purchase-open-books.jpeg", fit: "cover", bg: "#f5f5dd" },
  { src: "/art/lns-purchase-front-back.jpeg", fit: "cover", bg: "#f8e2b8" },
  { src: "/art/lns-purchase-angled-book.jpeg", fit: "contain", bg: "#ffffff" },
  { src: "/art/lns-purchase-floating-book.jpeg", fit: "cover", bg: "#ebe9d0" },
] as const;
const PHOTO_INTERVAL = 4500;

/* Flags shown inline; every other country is in the full list. */
const QUICK: FlagCode[] = ["IN", "US", "GB", "AE", "CA"];

type Option = {
  key: string;
  mark: "amazon" | "flipkart" | "kindle";
  name: string;
  detail: string;
  href: string;
  external: boolean;
  primary?: boolean;
  label: string;
};

function optionsFor(store: Store): Option[] {
  if (store.code === "IN") {
    return [
      { key: "amazon", mark: "amazon", name: "Amazon.in", detail: "Paperback", href: AMAZON_INDIA_URL, external: true, primary: true, label: "Buy the paperback on Amazon.in" },
      { key: "flipkart", mark: "flipkart", name: "Flipkart", detail: "Paperback", href: FLIPKART_URL, external: false, label: "Buy the paperback on Flipkart" },
      { key: "kindle", mark: "kindle", name: "Kindle", detail: "eBook", href: KINDLE_INDIA_URL, external: true, label: "Get the Kindle eBook on Amazon.in" },
    ];
  }
  const name = store.domain.replace(/^amazon/, "Amazon");
  return [
    { key: `amazon-${store.code}`, mark: "amazon", name, detail: `Paperback, sold by Amazon ${store.short}`, href: store.url, external: true, primary: true, label: `Buy the paperback on ${name}` },
  ];
}

function RetailerMark({ mark }: { mark: Option["mark"] }) {
  if (mark === "amazon") {
    return <span className="lnsbuy-mark lnsbuy-mark--amazon" aria-hidden="true">
      <b>a</b>
      <svg viewBox="0 0 24 8"><path d="M2 2.2c6 3.6 13.6 3.8 19.4.6" /><path d="m18.4 1.2 3.4 1.4-1.7 3.1" /></svg>
    </span>;
  }
  if (mark === "flipkart") return <span className="lnsbuy-mark lnsbuy-mark--flipkart" aria-hidden="true"><b>F</b></span>;
  return <span className="lnsbuy-mark lnsbuy-mark--kindle" aria-hidden="true"><BookOpen /></span>;
}

/* Book photos that cross-fade in a framed card. Pauses for reduced motion and hidden tabs. */
function BookPhotos({ start = 0 }: { start?: number }) {
  const [index, setIndex] = useState(start % PHOTOS.length);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (paused) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") setIndex(i => (i + 1) % PHOTOS.length);
    }, PHOTO_INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused]);

  return <div className="lnsbuy-photos" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    <div className="lnsbuy-frame">
      {PHOTOS.map((photo, i) => <img
        key={photo.src}
        src={photo.src}
        alt=""
        style={{ objectFit: photo.fit, backgroundColor: photo.bg }}
        className={i === index ? "is-active" : undefined}
        loading={i === start % PHOTOS.length ? "eager" : "lazy"}
        decoding="async"
      />)}
    </div>
    <div className="lnsbuy-dots" role="group" aria-label="Book photos">
      {PHOTOS.map((photo, i) => <button
        key={photo.src}
        type="button"
        className={i === index ? "is-active" : undefined}
        aria-label={`Show photo ${i + 1} of ${PHOTOS.length}`}
        aria-pressed={i === index}
        onClick={() => setIndex(i)}
      />)}
    </div>
  </div>;
}

export function LnsPurchase({ tone = "light", id }: { tone?: "light" | "dark"; id?: string }) {
  const [selected, setSelected] = useState<Store>(HOME_STORE);
  const [open, setOpen] = useState(false);
  const moreRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const countryLabelId = useId();

  const quick = QUICK.map(code => STORES.find(s => s.code === code)!);
  if (!quick.some(s => s.code === selected.code)) quick.push(selected);

  const close = useCallback(() => {
    setOpen(false);
    moreRef.current?.focus({ preventScroll: true });
  }, []);

  const choose = useCallback((next: Store) => {
    setSelected(next);
    setOpen(false);
    moreRef.current?.focus({ preventScroll: true });
  }, []);

  const options = optionsFor(selected);

  return <section className={`lnsbuy lnsbuy--${tone}`} id={id} aria-labelledby={titleId}>
    <div className="lnsbuy-inner">
      <BookPhotos start={tone === "dark" ? 1 : 0} />

      <div className="lnsbuy-copy">
        <h2 id={titleId}>
          <span className="lnsbuy-lead">Get your copy of</span>
          <span className="lnsbuy-title">The Lean Nervous System</span>
        </h2>

        <div className="lnsbuy-panel">
          <div className="lnsbuy-where">
            <p id={countryLabelId}>Buying from <strong>{selected.country}</strong></p>
            <div className="lnsbuy-flags" role="group" aria-labelledby={countryLabelId}>
              {quick.map(s => <button
                type="button"
                key={s.code}
                className={`lnsbuy-flag${selected.code === s.code ? " is-active" : ""}`}
                aria-pressed={selected.code === s.code}
                aria-label={s.country}
                title={s.country}
                onClick={() => setSelected(s)}
              >
                <CountryFlag code={s.code} />
              </button>)}
            </div>
            <button ref={moreRef} type="button" className="lnsbuy-more" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
              All {STORES.length}<span className="lnsbuy-more-word"> countries</span> <ChevronDown aria-hidden="true" />
            </button>
          </div>

          <ul className={`lnsbuy-options lnsbuy-options--${options.length}`} aria-live="polite">
            {options.map(option => <li key={option.key}>
              <a
                className={`lnsbuy-option${option.primary ? " is-primary" : ""}`}
                href={option.href}
                aria-label={option.label}
                {...(option.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <RetailerMark mark={option.mark} />
                <span className="lnsbuy-option-text">
                  <strong>{option.name}</strong>
                  <small>{option.detail}</small>
                </span>
                <ArrowUpRight aria-hidden="true" className="lnsbuy-option-arrow" />
              </a>
            </li>)}
          </ul>

          <p className="lnsbuy-note">
            {selected.code === "IN"
              ? "Outside India? Choose your country to open your local Amazon store."
              : `Price and delivery are set by Amazon ${selected.short}. Flipkart and the Kindle eBook are listed under India.`}
          </p>
        </div>
      </div>
    </div>

    <StoreDialog open={open} selected={selected} onChoose={choose} onClose={close} />
  </section>;
}
