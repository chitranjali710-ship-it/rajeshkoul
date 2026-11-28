"use client";

/* "Skip to main content" — the first thing keyboard and screen-reader users reach on every page.
   Hidden until it receives focus with the Tab key. */
export function SkipLink() {
  return <a
    className="skip-link"
    href="#main"
    onClick={(event) => {
      const main = document.querySelector("main");
      if (!main) return;
      event.preventDefault();
      if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
      main.focus();
      main.scrollIntoView();
    }}
  >Skip to main content</a>;
}
