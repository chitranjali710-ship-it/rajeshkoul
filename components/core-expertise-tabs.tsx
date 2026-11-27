"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardCheck,
  Coins,
  Cog,
  Cpu,
  Factory,
  Gauge,
  Globe2,
  Handshake,
  Layers3,
  Leaf,
  PanelsTopLeft,
  Settings2,
  TrendingUp,
  Users,
} from "lucide-react";

const expertise = [
  {
    title: "Strategy & Growth",
    description: "Shaping growth agendas, go-to-market approaches and business expansion.",
    cards: [
      { icon: BarChart3, title: "Growth Strategy", text: "Driving revenue growth and stronger business performance." },
      { icon: Globe2, title: "Market Expansion", text: "Entering new markets and scaling operations." },
      { icon: Handshake, title: "Strategic Partnerships", text: "Building and managing high-impact ecosystem collaborations." },
      { icon: Layers3, title: "M&A and Integration", text: "Supporting mergers, acquisitions and seamless integration." },
    ],
  },
  {
    title: "Shared Services & GCCs",
    description: "Setting up, scaling and transforming global capability centres and shared services.",
    cards: [
      { icon: Building2, title: "GCC Set-up & Scale", text: "Establishing mandates, operating models and governance for impact." },
      { icon: ClipboardCheck, title: "Service Design & Transition", text: "Designing service catalogues, SLAs and transition roadmaps." },
      { icon: Gauge, title: "Performance Management", text: "Driving operational efficiency, quality and business outcomes." },
      { icon: Users, title: "Talent & Capability", text: "Building future-ready skills and high-performing global teams." },
    ],
  },
  {
    title: "Digital & Technology Transformation",
    description: "Leveraging digital, analytics and Industry 4.0 to reimagine and scale business operations.",
    cards: [
      { icon: Cog, title: "Process Transformation", text: "Re-engineering and digitising end-to-end business processes." },
      { icon: Cpu, title: "Data, Analytics & AI", text: "Turning data into insights for faster and better decisions." },
      { icon: Factory, title: "Industry 4.0", text: "Driving smart, connected and high-performance operations." },
      { icon: PanelsTopLeft, title: "Customer & Experience Platforms", text: "Enabling integrated, data-driven customer journeys." },
    ],
  },
  {
    title: "ESG & Sustainable Value",
    description: "Embedding sustainability to drive business resilience and long-term value.",
    cards: [
      { icon: Leaf, title: "ESG Roadmap & Integration", text: "Aligning sustainability goals with business strategy and operations." },
      { icon: Layers3, title: "Value Engineering", text: "Unlocking cost, resource and operational value through sustainable solutions." },
      { icon: Users, title: "Purpose-led Value", text: "Creating measurable value for customers, people and communities." },
      { icon: TrendingUp, title: "Impact & Engagement", text: "Tracking progress and driving stakeholder engagement for lasting impact." },
    ],
  },
  {
    title: "Operational Excellence",
    description: "Building lean, high-performing and resilient operations at scale.",
    cards: [
      { icon: TrendingUp, title: "Lean & Process Excellence", text: "Driving a culture of continuous improvement and operational stability." },
      { icon: Settings2, title: "Operating Model & Efficiency", text: "Designing and optimising people, process and technology for scale." },
      { icon: Layers3, title: "Quality & Performance", text: "Strengthening quality, service levels and end-to-end performance." },
      { icon: Coins, title: "Cost & Value Optimisation", text: "Enhancing productivity, reducing waste and unlocking sustainable value." },
    ],
  },
];

export function CoreExpertiseTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabList = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);
  const selected = expertise[active];

  // On narrow screens the tabs are a scrolling chip row: keep the active chip in view.
  useEffect(() => {
    if (!hasInteracted.current) return;
    const list = tabList.current;
    const tab = tabs.current[active];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const target = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active]);

  function selectTab(index: number) {
    hasInteracted.current = true;
    setActive(index);
    tabs.current[index]?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") return selectTab(0);
    if (event.key === "End") return selectTab(expertise.length - 1);
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    selectTab((index + direction + expertise.length) % expertise.length);
  }

  return (
    <div className="core-panel">
      <div className="core-tabs" ref={tabList} role="tablist" aria-label="Industry perspective areas">
        {expertise.map((item, index) => (
          <button
            ref={(element) => { tabs.current[index] = element; }}
            className={active === index ? "active" : ""}
            id={`core-tab-${index}`}
            aria-controls={`core-panel-${index}`}
            aria-selected={active === index}
            role="tab"
            tabIndex={active === index ? 0 : -1}
            onClick={() => { hasInteracted.current = true; setActive(index); }}
            onKeyDown={(event) => handleKeyDown(event, index)}
            key={item.title}
          >
            <b>{String(index + 1).padStart(2, "0")}</b>
            {item.title}
            <ArrowRight aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        className="core-content"
        id={`core-panel-${active}`}
        aria-labelledby={`core-tab-${active}`}
        role="tabpanel"
        key={selected.title}
      >
        <h3><b>{String(active + 1).padStart(2, "0")}</b>{selected.title}</h3>
        <p>{selected.description}</p>
        <div className="core-cards">
          {selected.cards.map(({ icon: Icon, title, text }) => (
            <article className="mini-card" key={title}>
              <span><Icon aria-hidden="true" /></span>
              <div><b>{title}</b><p>{text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
