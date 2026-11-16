"use client";

import { ArrowRight, Network, Target, Users } from "lucide-react";
import { useState } from "react";

const icons = { target: Target, users: Users, network: Network };

type PillarCardProps = {
  step: string;
  icon: keyof typeof icons;
  label: string;
  outcome: string;
  title: string;
  text: string;
};

export function PillarCard({ step, icon, label, outcome, title, text }: PillarCardProps) {
  const [expanded, setExpanded] = useState(false);
  const Icon = icons[icon];

  return <article className={`pillar-card${expanded ? " is-expanded" : ""}`} data-step={step}>
    <div className="pillar-card-top"><span><Icon/></span><b aria-hidden="true">{step}</b></div>
    <small>{label}</small>
    <h3>{title}</h3>
    <p className="pillar-card-copy" id={`pillar-copy-${step}`}>{text}</p>
    <button
      className="pillar-card-toggle"
      type="button"
      aria-expanded={expanded}
      aria-controls={`pillar-copy-${step}`}
      onClick={() => setExpanded(value => !value)}
    >{expanded ? "Show less" : "Read full pillar"}</button>
    <footer><span>{outcome}</span><ArrowRight/></footer>
  </article>;
}
