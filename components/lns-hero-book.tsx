"use client";

import { useEffect, useRef } from "react";

const BOOK_SRC = "/art/lns-book-cutout.webp";

/**
 * The book in The Lean Nervous System hero, with motion:
 * - a slow float (book rises and settles, its floor shadow breathes with it)
 * - a soft light sweep across the cover every few seconds
 * - on desktop, the book tilts gently toward the pointer
 * All of it is switched off for people who prefer reduced motion.
 * Layout is unchanged: same wrapper, same image.
 */
export function LnsHeroBook() {
  const ref = useRef<HTMLDivElement>(null);

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
    <div ref={ref} className="lns-book-product" aria-label="The Lean Nervous System book">
      <img src={BOOK_SRC} alt="The Lean Nervous System by Rajesh Koul" />
      <span className="lns-book-shine" aria-hidden="true" />
    </div>
  );
}
