"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production RSC navigation is incompatible with next/link in this deployment. */

import { Wordmark } from "@/components/site-shell";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [["Home", "/home"], ["About", "/about"], ["The Lean Nervous System", "/lean-nervous-system"], ["Blog", "/blogs"], ["Let's Connect", "/contact"]];
const literary = [["Book Review", "/book-review"], ["Leadership, Learning & Growth", "/leadership-learning-growth"], ["Exchanging Ideas & Perspectives", "/exchanging-ideas-perspectives"], ["Industry & Campus Dialogues", "/industry-campus-dialogues"]];

export function LnsHeader() {
  const [open, setOpen] = useState(false);
  const [loungeOpen, setLoungeOpen] = useState(false);
  useEffect(() => { if (!open) setLoungeOpen(false); }, [open]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return <header className="lns-header">
    <a className="lns-logo" href="/home" aria-label="Rajesh Koul home"><Wordmark /></a>
    <button className="lns-menu-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav className={open ? "open" : ""} aria-label="Primary navigation">
      {nav.slice(0, 4).map(([label, href]) => <a className={href === "/lean-nervous-system" ? "active" : ""} href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
      <div className={`lns-dropdown${loungeOpen ? " is-open" : ""}`}><button type="button" aria-haspopup="true" aria-expanded={loungeOpen} onClick={() => setLoungeOpen((value) => !value)}>Literary Lounge <ChevronDown aria-hidden="true" /></button><div className="lns-submenu">{literary.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}</div></div>
      <a href={nav[4][1]} onClick={() => setOpen(false)}>{nav[4][0]}</a>
    </nav>
    <a className="lns-search" href="/blogs" aria-label="Search insights"><Search aria-hidden="true" /></a>
  </header>;
}
