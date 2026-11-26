"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

// measure before the first paint in the browser (plain effect on the server)
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * The book in The Lean Nervous System hero.
 * - Cross-fades through the book mockups (one every 4.5s).
 * - Every mockup is drawn at the same visual size: each image is scaled so
 *   the book itself (not its transparent margin or shadow) covers the same
 *   area, as large as the box allows. `box` is the share of the image the
 *   book occupies (left, top, right, bottom), measured from the files.
 * - A slow float, a soft light sweep across the book, and on desktop
 *   a gentle tilt toward the pointer.
 * All motion is switched off for people who prefer reduced motion.
 */
type Book = { src: string; ratio: number; box: [number, number, number, number] };

const BOOKS: Book[] = [
  { src: "/art/lns-book-cutout.webp", ratio: 0.6667, box: [0.126, 0.0703, 0.875, 0.9212] },
  { src: "/art/lns-hero-books/lns-hero-book-02.webp", ratio: 0.9589, box: [0.0205, 0.0197, 0.9812, 0.9819] },
  { src: "/art/lns-hero-books/lns-hero-book-01.webp", ratio: 1.3978, box: [0.0157, 0.0219, 0.9856, 0.9799] },
  { src: "/art/lns-hero-books/lns-hero-book-03.webp", ratio: 0.7571, box: [0.0236, 0.0179, 0.9783, 0.9836] },
  { src: "/art/lns-hero-books/lns-hero-book-06.webp", ratio: 1.8, box: [0.0122, 0.022, 0.9889, 0.98] },
  { src: "/art/lns-hero-books/lns-hero-book-05.webp", ratio: 0.6887, box: [0.025, 0.0172, 0.9771, 0.9842] },
  { src: "/art/lns-hero-books/lns-hero-book-04.webp", ratio: 1.175, box: [0.0166, 0.0194, 0.9848, 0.9822] },
  { src: "/art/lns-hero-books/lns-hero-book-08.webp", ratio: 1.1144, box: [0.0187, 0.0208, 0.9829, 0.9809] },
  { src: "/art/lns-hero-books/lns-hero-book-07.webp", ratio: 1.3218, box: [0.0143, 0.0188, 0.9869, 0.9827] },
  { src: "/art/lns-hero-books/lns-hero-book-09.webp", ratio: 1.0516, box: [0.0159, 0.0167, 0.9854, 0.9847] },
];

const HOLD_MS = 4500;

type Slot = { left: number; top: number; width: number; height: number };

/** Same book area for every image, as large as the box allows. */
function layoutBooks(boxWidth: number, boxHeight: number): Slot[] {
  const parts = BOOKS.map(({ ratio, box: [x0, y0, x1, y1] }) => {
    const contentW = (x1 - x0) * ratio; // book width per 1px of image height
    const contentH = y1 - y0;
    const maxHeight = Math.min(boxHeight / contentH, boxWidth / contentW);
    return { contentW, contentH, area: contentW * contentH, maxHeight };
  });
  const target = Math.min(...parts.map((p) => p.maxHeight * p.maxHeight * p.area));
  return BOOKS.map(({ ratio, box: [x0, y0, x1, y1] }, i) => {
    const height = Math.sqrt(target / parts[i].area);
    const width = height * ratio;
    // centre the book itself (not the whole image) in the box
    const left = boxWidth / 2 - ((x0 + x1) / 2) * width;
    const top = boxHeight / 2 - ((y0 + y1) / 2) * height;
    return { left, top, width, height };
  });
}

const slotStyle = (slot?: Slot): CSSProperties | undefined =>
  slot
    ? ({
        "--slot-left": `${slot.left.toFixed(1)}px`,
        "--slot-top": `${slot.top.toFixed(1)}px`,
        "--slot-width": `${slot.width.toFixed(1)}px`,
        "--slot-height": `${slot.height.toFixed(1)}px`,
      } as CSSProperties)
    : undefined;

export function LnsHeroBook() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [slots, setSlots] = useState<Slot[] | null>(null);

  // size every mockup to the box (only where the CSS gives the box a fixed size)
  const measure = useCallback(() => {
    const book = ref.current;
    if (!book) return;
    const equal = getComputedStyle(book).getPropertyValue("--book-equal").trim() === "1";
    if (!equal || !book.clientWidth || !book.clientHeight) {
      setSlots(null);
      return;
    }
    setSlots(layoutBooks(book.clientWidth, book.clientHeight));
  }, []);

  useIsoLayoutEffect(() => {
    const book = ref.current;
    if (!book) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(book);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // rotate the mockups
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % BOOKS.length);
    }, HOLD_MS);
    return () => window.clearInterval(timer);
  }, []);

  // tilt toward the pointer (desktop)
  useEffect(() => {
    const book = ref.current;
    if (!book) return;
    const canTilt = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const hero = (book.closest(".lns-hero") as HTMLElement | null) ?? book;

    const move = (event: PointerEvent) => {
      if (!canTilt.matches) return;
      const box = book.getBoundingClientRect();
      const x = (event.clientX - (box.left + box.width / 2)) / (hero.clientWidth / 2);
      const y = (event.clientY - (box.top + box.height / 2)) / (hero.clientHeight / 2);
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      book.style.setProperty("--book-tilt-y", `${(clamp(x) * 9).toFixed(2)}deg`);
      book.style.setProperty("--book-tilt-x", `${(clamp(y) * -6).toFixed(2)}deg`);
      book.classList.add("is-tilting");
    };
    const leave = () => {
      book.style.setProperty("--book-tilt-y", "0deg");
      book.style.setProperty("--book-tilt-x", "0deg");
      book.classList.remove("is-tilting");
    };

    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`lns-book-product${slots ? " has-equal-books" : ""}`}
      aria-label="The Lean Nervous System book"
    >
      {BOOKS.map(({ src }, index) => (
        <img
          key={src}
          src={src}
          alt={index === 0 ? "The Lean Nervous System by Rajesh Koul" : ""}
          aria-hidden={index === 0 ? undefined : true}
          className={`lns-book-slide${index === active ? " is-active" : ""}`}
          style={slotStyle(slots?.[index])}
          decoding="async"
          loading={index < 2 ? "eager" : "lazy"}
        />
      ))}
      <span
        className="lns-book-shine"
        aria-hidden="true"
        style={{
          ...slotStyle(slots?.[active]),
          WebkitMaskImage: `url("${BOOKS[active].src}")`,
          maskImage: `url("${BOOKS[active].src}")`,
        }}
      />
    </div>
  );
}
