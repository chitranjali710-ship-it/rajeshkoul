"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

type MobileDisclosureProps = {
  children: React.ReactNode;
  label?: string;
};

export function MobileDisclosure({ children, label = "Read full profile" }: MobileDisclosureProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return <div className={`mobile-disclosure${expanded ? " is-expanded" : ""}`}>
    <div className="mobile-disclosure-copy" id={contentId}>{children}</div>
    <button
      className="mobile-disclosure-toggle"
      type="button"
      aria-controls={contentId}
      aria-expanded={expanded}
      onClick={() => setExpanded(value => !value)}
    >
      <span>{expanded ? "Show less" : label}</span>
      <ChevronDown aria-hidden="true" />
    </button>
  </div>;
}
