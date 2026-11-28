"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { LnsPurchase } from "@/components/lns-purchase";
import "./lns-buy-dialog.css";

/* Any link to #get-your-copy (e.g. the hero's "Purchase the book") opens the
   "Get your copy" store picker in a pop-up instead of jumping down the page. */
export const BUY_DIALOG_HASH = "#get-your-copy";

export function LnsBuyDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const open = () => { if (!dialog.open) dialog.showModal(); };

    // Capture phase, so the pop-up opens before any page navigation handles the click.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.(`a[href="${BUY_DIALOG_HASH}"]`);
      if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      open();
    };
    document.addEventListener("click", onClick, true);
    if (window.location.hash === BUY_DIALOG_HASH) open();
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return <dialog
    ref={ref}
    className="lns-buy-dialog"
    aria-label="Get your copy of The Lean Nervous System"
    // a click on the dimmed area around the card closes it
    onClick={event => { if (event.target === event.currentTarget) ref.current?.close(); }}
  >
    <button type="button" className="lns-buy-dialog-close" onClick={() => ref.current?.close()} aria-label="Close">
      <X aria-hidden="true" />
    </button>
    <LnsPurchase tone="light" />
  </dialog>;
}
