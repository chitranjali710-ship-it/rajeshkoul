"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, useSyncExternalStore } from "react";

const phoneQuery = "(max-width: 650px)";

function subscribeToPhoneQuery(callback: () => void) {
  const query = window.matchMedia(phoneQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getPhoneSnapshot() {
  return window.matchMedia(phoneQuery).matches;
}

function getPhoneServerSnapshot() {
  return false;
}

type LnsStoryDisclosureProps = {
  children: React.ReactNode;
  className?: string;
  icon: string;
  meta: string;
  title: string;
};

export function LnsStoryDisclosure({ children, className = "", icon, meta, title }: LnsStoryDisclosureProps) {
  const [expanded, setExpanded] = useState(false);
  const isPhone = useSyncExternalStore(subscribeToPhoneQuery, getPhoneSnapshot, getPhoneServerSnapshot);
  const contentId = useId();
  const isOpen = !isPhone || expanded;

  return <article className={`lns-story-disclosure${isOpen ? " is-expanded" : ""}${className ? ` ${className}` : ""}`}>
    <button
      className="lns-story-panel-toggle"
      type="button"
      aria-controls={contentId}
      aria-expanded={isOpen}
      disabled={!isPhone}
      onClick={() => setExpanded(value => !value)}
    >
      <span className="lns-story-panel-title"><img src={icon} alt="" aria-hidden="true" /><h3>{title}</h3></span>
      <span className="lns-story-panel-meta">{meta}</span>
      <ChevronDown aria-hidden="true" />
    </button>
    <div className="lns-story-panel-content" id={contentId}>{children}</div>
  </article>;
}
