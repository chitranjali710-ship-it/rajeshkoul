import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, Compass, GraduationCap, Landmark, Layers } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Leadership, Learning & Growth | Rajesh Koul", description: "A space for learning, reflection and sharing perspectives on leadership, organisational excellence and business transformation.", path: "/leadership-learning-growth" });

const outcomes = [
  { icon: GraduationCap, title: "Leadership Learning", text: "Ideas, readings and concepts to strengthen leadership capabilities." },
  { icon: BarChart3, title: "Research & Insights", text: "Emerging themes, case studies and real-world observations." },
  { icon: Landmark, title: "Academic Engagement", text: "Guest lectures, student interactions and collaborative learning." },
  { icon: Layers, title: "Learning Support", text: "Guidance, perspectives and resources to help apply knowledge in practice." },
];

export default function Page(){return <><SiteHeader/><main className="coaching-page">
  <section className="coaching-hero-v2" aria-labelledby="coaching-title">
    <div className="coaching-copy-v2">
      <p className="coaching-eyebrow">LEARN <i/> REFLECT <i/> SHARE <i/> GROW</p>
      <h1 id="coaching-title">Leadership, Learning<br/><span>&amp; Growth</span></h1>
      <p className="coaching-lead">A space for learning, reflection and sharing perspectives on leadership, organisational excellence and business transformation — drawing on my experience as an author, practitioner and lifelong learner.</p>
      <Link className="coaching-cta" href="#coaching-coming-soon">Explore Learning Resources <ArrowRight aria-hidden="true"/></Link>
      <p className="coaching-note"><BookOpen aria-hidden="true"/> Ideas, experiences and resources to support your leadership journey.</p>
    </div>
    <div className="coaching-pathway" aria-label="A learning journey">
      <div className="coaching-pathway-heading">
        <span><BookOpen aria-hidden="true"/></span>
        <div><small>A LEARNING JOURNEY</small><strong>From Insight<br/>to Application.</strong></div>
      </div>
      <div className="coaching-pathway-stages">
        <article><b>01</b><div><h2>Reflect</h2><p>Build clarity on what really matters.</p></div></article>
        <article><b>02</b><div><h2>Learn</h2><p>Explore proven ideas, frameworks and cases.</p></div></article>
        <article><b>03</b><div><h2>Apply</h2><p>Translate insights into practical action.</p></div></article>
        <article><b>04</b><div><h2>Grow</h2><p>Strengthen your leadership and create wider impact.</p></div></article>
      </div>
      <blockquote>“Continuous learning is the cornerstone of effective leadership.”</blockquote>
    </div>
    <div className="coaching-outcomes" aria-label="Areas of learning">
      {outcomes.map(({icon:Icon,title,text},index)=><article className={index===1||index===3?"coaching-outcome coaching-outcome-dark":"coaching-outcome"} key={title}>
        <span><Icon aria-hidden="true"/></span><div><small>0{index+1}</small><h2>{title}</h2><p>{text}</p></div>
      </article>)}
    </div>
  </section>
  <section className="coaching-coming-soon" id="coaching-coming-soon" aria-labelledby="coaching-coming-title">
    <div className="coaching-coming-mark"><Compass aria-hidden="true"/></div>
    <div>
      <p>THE NEXT CHAPTER</p>
      <h2 id="coaching-coming-title">A curated space for learning resources is coming soon.</h2>
    </div>
    <span>COMING SOON</span>
  </section>
</main><SiteFooter/></>}
