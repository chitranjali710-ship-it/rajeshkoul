"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
 * On phones, long introductory paragraphs fold to a few lines with a
 * "Read more" button. Nothing is removed: the full text stays in the page
 * (and is visible to search engines and screen readers); it is only clamped
 * visually until the reader expands it. Above 768px nothing happens.
 */
const TARGETS = [
  ".book-section p.lead",
  ".mission-intro > p",
  ".blueprint-header > p",
  ".leadership-header > p",
];

/* Multi-paragraph blocks that fold with a fade on phones only. */
const PHONE_TARGETS = [
  ".lns-book-story .lns-story-narrative > div",
  ".lns-author .lns-author-copy",
];

const MOBILE_QUERY = "(max-width: 768px)";
const PHONE_QUERY = "(max-width: 650px)";
const MIN_LINES_TO_FOLD = 7;

export function MobileReadMore() {
  const pathname = usePathname();

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    let cleanups: Array<() => void> = [];

    const reset = () => {
      cleanups.forEach(fn => fn());
      cleanups = [];
    };

    const apply = () => {
      reset();
      if (!query.matches) return;

      const selectors = window.matchMedia(PHONE_QUERY).matches ? [...TARGETS, ...PHONE_TARGETS] : TARGETS;
      document.querySelectorAll<HTMLElement>(selectors.join(",")).forEach((element, index) => {
        if (element.dataset.readMore) return;
        const lineHeight = parseFloat(getComputedStyle(element).lineHeight) || 24;
        if (element.scrollHeight < lineHeight * MIN_LINES_TO_FOLD) return;

        if (!element.id) element.id = `read-more-${index}`;
        element.dataset.readMore = "collapsed";
        const isPhoneTarget = PHONE_TARGETS.some(selector => element.matches(selector));
        if (isPhoneTarget) element.dataset.readMode = "fade";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "read-more-toggle";
        button.setAttribute("aria-controls", element.id);
        button.setAttribute("aria-expanded", "false");
        button.textContent = "Read more";
        button.addEventListener("click", () => {
          const expanded = element.dataset.readMore === "expanded";
          element.dataset.readMore = expanded ? "collapsed" : "expanded";
          button.setAttribute("aria-expanded", String(!expanded));
          button.textContent = expanded ? "Read more" : "Show less";
          if (expanded) element.scrollIntoView({ block: "nearest" });
        });
        element.after(button);

        cleanups.push(() => {
          button.remove();
          delete element.dataset.readMore;
          delete element.dataset.readMode;
        });
      });
    };

    const phoneQuery = window.matchMedia(PHONE_QUERY);
    const timer = window.setTimeout(apply, 60);
    query.addEventListener("change", apply);
    phoneQuery.addEventListener("change", apply);
    return () => {
      window.clearTimeout(timer);
      query.removeEventListener("change", apply);
      phoneQuery.removeEventListener("change", apply);
      reset();
    };
  }, [pathname]);

  return null;
}
