"use client";

import { useEffect, useRef, useState } from "react";

const messages = [
  {
    title: "A Practical Guide to Optimising Enterprise Health",
    text: "Move beyond fragmented KPIs and intuition. Establish a structured, evidence-based view of organisational maturity and health.",
  },
  {
    title: "“The Operating System for Enterprise Transformation”",
    text: "The Lean Nervous System — enabling organisations to sense early, respond intelligently, and sustain performance.",
  },
  {
    title: "From Medical Scans to Organisational MRI",
    text: "Diagnose your enterprise like a system. See where you stand, what is breaking, and what must evolve next.",
  },
  {
    title: "Original & Tested Frameworks for Self-Propagating Change",
    text: "Go beyond improvement projects. Build systems where ideas spread, scale, and sustain without dependency on heroics.",
  },
  {
    title: "A Practical Roadmap to Self-Running Excellence",
    text: "Transition from firefighting and instability → to disciplined, resilient, world-class execution.",
  },
];

export function LnsHeroDeck() {
  const [active, setActive] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [paused, setPaused] = useState(false);
  const track = useRef<HTMLDivElement>(null);

  // Phones show every message as a swipeable card instead of rotating them.
  // Whether the swipe track is in use is decided by CSS, so the layout can change without code edits.
  const isSwipeLayout = () => !!track.current && getComputedStyle(track.current).display !== "none";

  useEffect(() => {
    const list = track.current;
    if (!list) return;
    const onScroll = () => {
      const start = list.getBoundingClientRect().left + parseFloat(getComputedStyle(list).paddingLeft || "0");
      let nearest = 0;
      let best = Infinity;
      Array.from(list.children).forEach((card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - start);
        if (distance < best) { best = distance; nearest = index; }
      });
      setActive(nearest);
    };
    list.addEventListener("scroll", onScroll, { passive: true });
    return () => list.removeEventListener("scroll", onScroll);
  }, []);

  function choose(index: number) {
    setActive(index);
    setExiting(false);
    const list = track.current;
    if (list && isSwipeLayout()) {
      const card = list.children[index] as HTMLElement | undefined;
      if (card) {
        const start = list.getBoundingClientRect().left + parseFloat(getComputedStyle(list).paddingLeft || "0");
        list.scrollTo({ left: list.scrollLeft + card.getBoundingClientRect().left - start, behavior: "smooth" });
      }
    }
  }

  useEffect(() => {
    if (paused || isSwipeLayout() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rotate = window.setTimeout(() => {
      setExiting(true);
      window.setTimeout(() => {
        setActive((current) => (current + 1) % messages.length);
        setExiting(false);
      }, 420);
    }, 4400);

    return () => window.clearTimeout(rotate);
  }, [active, paused]);

  const message = messages[active];

  return (
    <div
      className="lns-deck"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-label="Featured book messages"
    >
      <div className={`lns-deck-message${exiting ? " is-exiting" : ""}`} aria-live="off">
        <h2>{message.title}</h2>
        <p>{message.text}</p>
      </div>
      <div className="lns-deck-track" ref={track} role="group" aria-label="Featured book messages, swipe to read more">
        {messages.map((item) => (
          <article className="lns-deck-card" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="lns-deck-dots" role="group" aria-label="Choose a featured message">
        {messages.map((item, index) => (
          <button
            type="button"
            className={active === index ? "active" : ""}
            aria-label={`Show message ${index + 1}: ${item.title}`}
            aria-pressed={active === index}
            onClick={() => choose(index)}
            key={item.title}
          />
        ))}
      </div>
    </div>
  );
}
