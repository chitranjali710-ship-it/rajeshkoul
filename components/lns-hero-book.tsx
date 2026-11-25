"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The book in The Lean Nervous System hero.
 * - Cross-fades through the book mockups (one every 4.5s).
 *   The first image stays in the layout as the size reference, so
 *   the hero's layout never changes; the others sit on top of it.
 * - A slow float, a soft light sweep across the book, and on desktop
 *   a gentle tilt toward the pointer.
 * All motion is switched off for people who prefer reduced motion.
 */
const BOOKS = [
  "/art/lns-book-cutout.webp",
  "/art/lns-hero-books/lns-hero-book-02.webp",
  "/art/lns-hero-books/lns-hero-book-01.webp",
  "/art/lns-hero-books/lns-hero-book-03.webp",
  "/art/lns-hero-books/lns-hero-book-06.webp",
  "/art/lns-hero-books/lns-hero-book-05.webp",
  "/art/lns-hero-books/lns-hero-book-04.webp",
  "/art/lns-hero-books/lns-hero-book-08.webp",
  "/art/lns-hero-books/lns-hero-book-07.webp",
  "/art/lns-hero-books/lns-hero-book-09.webp",
];

const HOLD_MS = 4500;

export function LnsHeroBook() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // rotate the mockups
  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (still.matches) return;
    let timer = 0;
    const tick = () => {
      if (!document.hidden) setActive((i) => (i + 1) % BOOKS.length);
    };
    timer = window.setInterval(tick, HOLD_MS);
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
    <div ref={ref} className="lns-book-product" aria-label="The Lean Nervous System book">
      {BOOKS.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={index === 0 ? "The Lean Nervous System by Rajesh Koul" : ""}
          aria-hidden={index === 0 ? undefined : true}
          className={`lns-book-slide${index === active ? " is-active" : ""}`}
          decoding="async"
          loading={index < 2 ? "eager" : "lazy"}
        />
      ))}
      <span
        className="lns-book-shine"
        aria-hidden="true"
        style={{ WebkitMaskImage: `url("${BOOKS[active]}")`, maskImage: `url("${BOOKS[active]}")` }}
      />
    </div>
  );
}
